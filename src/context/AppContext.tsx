'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Language, translations } from '@/translations';
import { Product, products as initialProducts } from '@/data/products';

// ─── Module-level cache (persists across page navigations) ───
const CACHE_TTL = 60_000; // 60 seconds
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
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
  updateProductImages: (productId: string, newImages: string[]) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  removeOrder: (id: string) => void;
  // Messaging
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'date'>) => void;
  removeMessage: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from API on mount – with module-level cache to avoid refetch on navigation
  useEffect(() => {
    const now = Date.now();
    const safeParseLocal = (key: string, setter: any) => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) setter(JSON.parse(saved));
      } catch (e) {}
    };

    // ── Step 1: show cached or localStorage data IMMEDIATELY (no spinner) ──
    if (_cache.products && now - _cache.products.ts < CACHE_TTL) {
      setProducts(_cache.products.data);
    } else {
      safeParseLocal('capzone_products', setProducts);
    }
    if (_cache.orders && now - _cache.orders.ts < CACHE_TTL) {
      setOrders(_cache.orders.data);
    } else {
      safeParseLocal('capzone_orders', setOrders);
    }
    if (_cache.messages && now - _cache.messages.ts < CACHE_TTL) {
      setMessages(_cache.messages.data);
    } else {
      safeParseLocal('capzone_messages', setMessages);
    }
    setIsLoaded(true);

    // ── Step 2: refresh from KV in background only if cache is stale ──
    const needsRefresh =
      !_cache.products || now - _cache.products.ts >= CACHE_TTL ||
      !_cache.orders   || now - _cache.orders.ts   >= CACHE_TTL ||
      !_cache.messages || now - _cache.messages.ts >= CACHE_TTL;

    if (!needsRefresh) return;

    const fetchData = async () => {
      try {
        const [prodRes, orderRes, msgRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
          fetch('/api/messages'),
        ]);

        if (prodRes.ok) {
          const data = await prodRes.json();
          if (data && data.length > 0) {
            _cache.products = { data, ts: Date.now() };
            setProducts(data);
          }
        }
        if (orderRes.ok) {
          const data = await orderRes.json();
          _cache.orders = { data, ts: Date.now() };
          if (data && data.length > 0) setOrders(data);
        }
        if (msgRes.ok) {
          const data = await msgRes.json();
          _cache.messages = { data, ts: Date.now() };
          if (data && data.length > 0) setMessages(data);
        }
      } catch (error) {
        console.error('Background refresh failed:', error);
      }
    };
    fetchData();
  }, []);

  // Save to API whenever products change
  useEffect(() => {
    if (!isLoaded) return;
    _cache.products = { data: products, ts: Date.now() };
    try {
      localStorage.setItem('capzone_products', JSON.stringify(products));
    } catch(e) {}
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    }).catch(err => console.error('Failed to save products to KV:', err));
  }, [products, isLoaded]);

  // Save to API whenever orders change
  useEffect(() => {
    if (!isLoaded) return;
    _cache.orders = { data: orders, ts: Date.now() };
    try {
      localStorage.setItem('capzone_orders', JSON.stringify(orders));
    } catch(e) {}
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orders)
    }).catch(err => console.error('Failed to save orders to KV:', err));
  }, [orders, isLoaded]);

  // Save to API whenever messages change
  useEffect(() => {
    if (!isLoaded) return;
    _cache.messages = { data: messages, ts: Date.now() };
    try {
      localStorage.setItem('capzone_messages', JSON.stringify(messages));
    } catch(e) {}
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages)
    }).catch(err => console.error('Failed to save messages to KV:', err));
  }, [messages, isLoaded]);

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

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  
  const removeProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, price: newPrice } : p));
  };

  const updateProductImages = (productId: string, newImages: string[]) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, image: newImages[0] || '', images: newImages } : p));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const removeOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'date'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
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
        addProduct,
        removeProduct,
        updateProductPrice,
        updateProductImages,
        orders,
        addOrder,
        removeOrder,
        messages,
        addMessage,
        removeMessage,
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
