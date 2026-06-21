'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Language, translations } from '@/translations';
import { Product, products as initialProducts } from '@/data/products';

// ─── Module-level cache (persists across page navigations) ───
const CACHE_TTL = 60_000; // 60 seconds
let _isFetching = false;  // prevent duplicate simultaneous fetches
const _cache: {
  products?: { data: Product[]; ts: number };
  orders?: { data: any[]; ts: number };
  messages?: { data: any[]; ts: number };
} = {};

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  dir: 'ltr' | 'rtl';
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  // Admin stuff
  products: Product[];
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  removeOrder: (id: string) => void;
  // Messaging
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'date'>) => void;
  removeMessage: (id: string) => void;
  fetchAdminData: () => Promise<void>;
  whatsappNumber: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const products = initialProducts;
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load orders and messages from local storage on mount
  useEffect(() => {
    const safeParseLocal = (key: string, setter: any) => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) setter(JSON.parse(saved));
      } catch (e) {}
    };

    safeParseLocal('capzone_orders', setOrders);
    safeParseLocal('capzone_messages', setMessages);
    setIsLoaded(true);
  }, []);

  const fetchAdminData = async () => {
    try {
      const [orderRes, msgRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/messages'),
      ]);
      if (orderRes.ok) {
        const data = await orderRes.json();
        if (Array.isArray(data)) {
          _cache.orders = { data, ts: Date.now() };
          setOrders(data);
          try {
            localStorage.setItem('capzone_orders', JSON.stringify(data));
          } catch (e) {}
        }
      }
      if (msgRes.ok) {
        const data = await msgRes.json();
        if (Array.isArray(data)) {
          _cache.messages = { data, ts: Date.now() };
          setMessages(data);
          try {
            localStorage.setItem('capzone_messages', JSON.stringify(data));
          } catch (e) {}
        }
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = translations[language];
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedColor === color && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
    };
    setOrders(prev => {
      const updated = [newOrder, ...prev];
      _cache.orders = { data: updated, ts: Date.now() };
      try {
        localStorage.setItem('capzone_orders', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const removeOrder = (id: string) => {
    setOrders(prev => {
      const updated = prev.filter(o => o.id !== id);
      _cache.orders = { data: updated, ts: Date.now() };
      try {
        localStorage.setItem('capzone_orders', JSON.stringify(updated));
      } catch (e) {}
      fetch(`/api/orders?id=${id}`, {
        method: 'DELETE',
      }).catch(err => console.error('Failed to delete order from KV:', err));
      return updated;
    });
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'date'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
    };
    setMessages(prev => {
      const updated = [newMessage, ...prev];
      _cache.messages = { data: updated, ts: Date.now() };
      try {
        localStorage.setItem('capzone_messages', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Send single message to KV atomically via PATCH
    fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage)
    }).catch(err => console.error('Failed to save message to KV:', err));
  };

  const removeMessage = (id: string) => {
    setMessages(prev => {
      const updated = prev.filter(m => m.id !== id);
      _cache.messages = { data: updated, ts: Date.now() };
      try {
        localStorage.setItem('capzone_messages', JSON.stringify(updated));
      } catch (e) {}
      fetch(`/api/messages?id=${id}`, {
        method: 'DELETE',
      }).catch(err => console.error('Failed to delete message from KV:', err));
      return updated;
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        products,
        orders,
        addOrder,
        removeOrder,
        messages,
        addMessage,
        removeMessage,
        fetchAdminData,
        whatsappNumber: '212643553936',
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
