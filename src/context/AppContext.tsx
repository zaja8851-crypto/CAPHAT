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
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
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
  fetchAdminData: () => Promise<void>;
  whatsappNumber: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from API on mount – with module-level cache to avoid refetch on navigation
  useEffect(() => {
    const now = Date.now();
    const safeParseLocal = (key: string, setter: any) => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) setter(JSON.parse(saved));
      } catch (e) {}
    };

    // ── Step 1: show products immediately from cache or localStorage ──
    if (_cache.products && now - _cache.products.ts < CACHE_TTL) {
      setProducts(_cache.products.data);
    } else {
      safeParseLocal('capzone_products', setProducts);
    }

    // Load local storage backups if available
    safeParseLocal('capzone_orders', setOrders);
    safeParseLocal('capzone_messages', setMessages);
    setIsLoaded(true);

    // ── Step 2: refresh products from KV only if cache is stale and not already fetching ──
    const needsRefresh = !_cache.products || now - _cache.products.ts >= CACHE_TTL;

    if (!needsRefresh || _isFetching) return;
    _isFetching = true;

    const fetchProducts = async () => {
      try {
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
          const data = await prodRes.json();
          if (Array.isArray(data)) {
            _cache.products = { data, ts: Date.now() };
            setProducts(data);
            try {
              localStorage.setItem('capzone_products', JSON.stringify(data));
            } catch (e) {}
          }
        }
      } catch (error) {
        console.error('Products refresh failed:', error);
      } finally {
        _isFetching = false;
      }
    };
    fetchProducts();
  }, []);

  const saveProductsToKV = (updatedProducts: Product[], immediate = false) => {
    _cache.products = { data: updatedProducts, ts: Date.now() };
    // Reset cache timestamp to 0 so next page load always re-fetches from KV
    // (we update _cache.products.data immediately so the UI stays correct,
    //  but force a server re-read on next mount by expiring the timestamp)
    _isFetching = false;
    try {
      localStorage.setItem('capzone_products', JSON.stringify(updatedProducts));
    } catch (e) {}

    const doSave = () => fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProducts)
    }).then(async (res) => {
      if (!res.ok) throw new Error('Save failed');
      // After confirmed save, expire cache so next mount re-reads fresh data
      if (_cache.products) _cache.products.ts = 0;
    }).catch(err => {
      console.error('Failed to save products to KV:', err);
      // Also expire cache on error to force re-read
      if (_cache.products) _cache.products.ts = 0;
    });

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    if (immediate) {
      doSave();
    } else {
      saveTimeoutRef.current = setTimeout(doSave, 1000);
    }
  };

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

  const addProduct = (product: Product) => {
    setProducts(prev => {
      const updated = [...prev, product];
      saveProductsToKV(updated, true);
      return updated;
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      saveProductsToKV(updated, true);
      return updated;
    });
  };
  
  const removeProduct = (productId: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      saveProductsToKV(updated, true);
      return updated;
    });
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === productId ? { ...p, price: newPrice } : p);
      saveProductsToKV(updated);
      return updated;
    });
  };

  const updateProductImages = (productId: string, newImages: string[]) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === productId ? { ...p, image: newImages[0] || '', images: newImages } : p);
      saveProductsToKV(updated, true);
      return updated;
    });
  };

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
        addProduct,
        updateProduct,
        removeProduct,
        updateProductPrice,
        updateProductImages,
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
