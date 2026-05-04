'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Plus, Edit2, Package, Users, ShoppingBag, LayoutDashboard, DollarSign, X, Trash2, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

export default function AdminPage() {
  const { products, addProduct, removeProduct, updateProductPrice, updateProductImages, orders, removeOrder, messages, removeMessage } = useAppContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add' | 'messages'>('products');
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Helper to compress image before saving to localStorage
  const compressImage = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // Compress to 70% quality JPG
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const [newProduct, setNewProduct] = useState({
    nameEn: '',
    nameAr: '',
    price: 0,
    oldPrice: 0,
    type: 'Snapback',
    image: '',
    image2: '',
    bestSeller: false,
    newArrival: true,
    promotion: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2003') {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-2xl">
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center tracking-tighter">ADMIN LOGIN</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button
              type="submit"
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.image) {
      alert('Please upload at least the main image.');
      return;
    }

    const images = [newProduct.image];
    if (newProduct.image2) {
      images.push(newProduct.image2);
    }

    console.log('Adding product with images:', images.length);

    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        nameEn: newProduct.nameEn,
        nameAr: newProduct.nameAr,
        price: newProduct.price,
        oldPrice: (newProduct as any).oldPrice,
        type: newProduct.type,
        image: newProduct.image,
        images,
        bestSeller: (newProduct as any).bestSeller,
        newArrival: (newProduct as any).newArrival,
        promotion: (newProduct as any).promotion,
      };
      
      removeProduct(editingProduct.id);
      addProduct(updatedProduct);
      
      alert('Product updated successfully!');
    } else {
      addProduct({
        id: Math.random().toString(36).substr(2, 9),
        nameEn: newProduct.nameEn,
        nameAr: newProduct.nameAr,
        price: newProduct.price,
        oldPrice: (newProduct as any).oldPrice || 0,
        type: newProduct.type,
        image: newProduct.image,
        images,
        colors: ['Standard'],
        sizes: ['Universal'],
        bestSeller: (newProduct as any).bestSeller || false,
        newArrival: (newProduct as any).newArrival || true,
        promotion: (newProduct as any).promotion || false,
        descriptionEn: 'Premium quality cap.',
        descriptionAr: 'قبعة ذات جودة عالية.',
      });
      alert('Product added successfully!');
    }
    
    setNewProduct({
      nameEn: '',
      nameAr: '',
      price: 0,
      oldPrice: 0,
      type: 'Snapback',
      image: '',
      image2: '',
      bestSeller: false,
      newArrival: true,
      promotion: false,
    });
    setEditingProduct(null);
    setActiveTab('products');
  };

  const startEditing = (p: any) => {
    setEditingProduct(p);
    setNewProduct({
      nameEn: p.nameEn,
      nameAr: p.nameAr,
      price: p.price,
      oldPrice: p.oldPrice || 0,
      type: p.type,
      image: p.image,
      image2: p.images && p.images[1] ? p.images[1] : '',
      bestSeller: p.bestSeller,
      newArrival: p.newArrival,
      promotion: (p as any).promotion || false,
    });
    setActiveTab('add');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-8 hidden lg:block">
        <h2 className="text-2xl font-black mb-12 tracking-tighter">ADMIN PANEL</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all ${
              activeTab === 'products' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="font-bold">Products</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all ${
              activeTab === 'orders' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-bold">Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all ${
              activeTab === 'messages' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-bold">Messages</span>
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setNewProduct({
                nameEn: '',
                nameAr: '',
                price: 0,
                oldPrice: 0,
                type: 'Snapback',
                image: '',
                image2: '',
                bestSeller: false,
                newArrival: true,
                promotion: false,
              });
              setActiveTab('add');
            }}
            className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all ${
              activeTab === 'add' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-bold">{editingProduct ? 'Edit Product' : 'Add Product'}</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-center">
          <h1 className="text-4xl font-black text-slate-900 capitalize">{activeTab}</h1>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 rtl:space-x-reverse">
             <div className="p-3 bg-green-50 rounded-xl"><DollarSign className="w-6 h-6 text-green-600" /></div>
             <div>
               <p className="text-xs text-slate-400 font-bold uppercase">Total Revenue</p>
               <p className="text-xl font-black text-slate-900">{orders.reduce((acc, o) => acc + o.total, 0)} MAD</p>
             </div>
          </div>
        </header>

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                        {p.image ? (
                          <img src={p.image} alt={p.nameEn} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-slate-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-sm">{p.nameEn}</h3>
                        <label className="text-[9px] text-orange-600 font-bold cursor-pointer hover:underline block">
                          Change Main
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const compressed = await compressImage(reader.result as string);
                                  const newImages = [...(p.images || [])];
                                  newImages[0] = compressed;
                                  updateProductImages(p.id, newImages);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                        {p.images && p.images[1] ? (
                          <img src={p.images[1]} alt={`${p.nameEn} hover`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100/50">
                            <Plus className="w-4 h-4 text-slate-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="text-[9px] text-slate-500 font-bold cursor-pointer hover:underline block">
                          {p.images && p.images[1] ? 'Change Hover' : 'Add Hover Image'}
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const compressed = await compressImage(reader.result as string);
                                  const newImages = [...(p.images || [])];
                                  newImages[1] = compressed;
                                  updateProductImages(p.id, newImages);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                    <span className="text-sm font-bold text-slate-500">Price</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input 
                        type="number" 
                        value={p.price}
                        onChange={(e) => updateProductPrice(p.id, parseInt(e.target.value) || 0)}
                        className="w-20 bg-transparent text-right font-black text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded px-1"
                      />
                      <span className="text-[10px] font-bold text-slate-400">MAD</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => startEditing(p)}
                      className="flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 bg-slate-900 text-white font-bold hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => removeProduct(p.id)}
                      className="flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-8">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Customer Orders</h2>
              <p className="text-slate-500 font-medium">Review and process purchase requests from your customers.</p>
            </div>
            
            {orders.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-slate-400 font-bold text-xl">No orders received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    {/* Order Header */}
                    <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-orange-600 text-[10px] font-black uppercase rounded-full">Order #{order.id}</span>
                          <span className="text-slate-400 text-xs font-bold">{order.date}</span>
                        </div>
                        <h3 className="text-2xl font-black">{order.customer.name}</h3>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Paid</p>
                        <p className="text-3xl font-black text-orange-500">{order.total} MAD</p>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="p-8 border-b border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/30">
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-slate-400">Shipping Details</p>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                            <MapPin className="w-5 h-5 text-slate-400" />
                          </div>
                          <p className="font-bold text-slate-700 leading-relaxed">{order.customer.address}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-slate-400">Contact Information</p>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                              <Phone className="w-4 h-4 text-green-600" />
                            </div>
                            <a href={`tel:${order.customer.phone}`} className="font-bold text-slate-700 hover:text-orange-600 transition-colors">{order.customer.phone}</a>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                              <Mail className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="font-bold text-slate-500">{order.customer.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-8 space-y-6">
                      <p className="text-[10px] font-black uppercase text-slate-400">Purchased Items</p>
                      <div className="grid grid-cols-1 gap-4">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-orange-200 transition-colors">
                            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                              <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-black text-slate-900">{item.nameAr || item.nameEn}</h4>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                <p className="text-xs font-bold text-slate-500">Qty: <span className="text-orange-600">{item.quantity}</span></p>
                                <p className="text-xs font-bold text-slate-500">Price: <span className="text-slate-900">{item.price} MAD</span></p>
                                {item.selectedColor && (
                                  <p className="text-xs font-bold text-slate-500">Color: <span className="text-slate-900">{item.selectedColor}</span></p>
                                )}
                                {item.selectedSize && (
                                  <p className="text-xs font-bold text-slate-500">Size: <span className="text-slate-900">{item.selectedSize}</span></p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                      <button 
                        onClick={() => removeOrder(order.id)}
                        className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-6 py-3 rounded-2xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        Mark as Delivered & Archive
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Messages</h2>
              <p className="text-slate-500 font-medium">User inquiries from the contact page.</p>
            </div>
            {messages.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100">
                <p className="text-slate-400 font-bold text-xl">No messages yet.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-1">{msg.name}</h3>
                      <p className="text-orange-600 font-bold text-sm">{msg.email}</p>
                    </div>
                    <button 
                      onClick={() => removeMessage(msg.id)}
                      className="text-red-500 hover:bg-red-50 p-3 rounded-full transition-all"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-slate-600 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  <p className="mt-6 text-xs text-slate-400 font-bold uppercase">{msg.date}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-slate-500 font-medium">
                {editingProduct ? `Currently modifying: ${editingProduct.nameEn}` : 'Fill in the details below to list a new premium cap.'}
              </p>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-8 bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">Name (English) *</label>
                  <input
                    required
                    type="text"
                    value={newProduct.nameEn}
                    onChange={(e) => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                    placeholder="e.g. Classic Black Snapback"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">Name (Arabic) *</label>
                  <input
                    required
                    type="text"
                    value={newProduct.nameAr}
                    onChange={(e) => setNewProduct({ ...newProduct, nameAr: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all text-right"
                    placeholder="مثال: قبعة سناباك سوداء كلاسيكية"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">Current Price (MAD) *</label>
                  <input
                    required
                    type="number"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">Old Price (Optional)</label>
                  <input
                    type="number"
                    value={(newProduct as any).oldPrice || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, oldPrice: parseInt(e.target.value) || 0 } as any)}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Category *</label>
                <select
                  value={newProduct.type}
                  onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all cursor-pointer"
                >
                  <option value="Snapback">Snapback</option>
                  <option value="Beanie">Beanie</option>
                  <option value="Trucker">Trucker</option>
                  <option value="Dad Hat">Dad Hat</option>
                </select>
              </div>

                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Marketing Badges</p>
                  <label className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer group">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${newProduct.bestSeller ? 'bg-orange-600 border-orange-600' : 'bg-white border-slate-200 group-hover:border-orange-200'}`}>
                      {newProduct.bestSeller && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={newProduct.bestSeller}
                      onChange={(e) => setNewProduct({ ...newProduct, bestSeller: e.target.checked })}
                    />
                    <span className="font-bold text-slate-700">Best Seller</span>
                  </label>
                  <label className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer group">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${newProduct.newArrival ? 'bg-orange-600 border-orange-600' : 'bg-white border-slate-200 group-hover:border-orange-200'}`}>
                      {newProduct.newArrival && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={newProduct.newArrival}
                      onChange={(e) => setNewProduct({ ...newProduct, newArrival: e.target.checked })}
                    />
                    <span className="font-bold text-slate-700">New Arrival</span>
                  </label>
                  <label className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer group">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${(newProduct as any).promotion ? 'bg-red-600 border-red-600' : 'bg-white border-slate-200 group-hover:border-red-200'}`}>
                      {(newProduct as any).promotion && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={(newProduct as any).promotion}
                      onChange={(e) => setNewProduct({ ...newProduct, promotion: e.target.checked } as any)}
                    />
                    <span className="font-bold text-slate-700">Promotion</span>
                  </label>
                </div>
              
              {/* Images */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Product Images</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image 1 */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase text-center">Image 1 (Main Product) *</p>
                    {!newProduct.image ? (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-200 border-dashed rounded-[2rem] cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-orange-200 transition-all group">
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-3">
                            <Plus className="w-6 h-6 text-slate-400" />
                          </div>
                          <p className="text-sm text-slate-600 font-bold">Upload Image</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = async () => {
                                const compressed = await compressImage(reader.result as string);
                                setNewProduct(prev => ({ ...prev, image: compressed }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    ) : (
                      <div className="relative w-full h-48 rounded-[2rem] overflow-hidden border border-slate-100 group shadow-sm">
                        <img src={newProduct.image} alt="Main Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => setNewProduct({ ...newProduct, image: '' })}
                            className="bg-white text-red-500 p-3 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image 2 */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase text-center">Image 2 (Hover/Angle)</p>
                    {!newProduct.image2 ? (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-200 border-dashed rounded-[2rem] cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-orange-200 transition-all group">
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-3">
                            <Plus className="w-6 h-6 text-slate-400" />
                          </div>
                          <p className="text-sm text-slate-600 font-bold">Upload Optional</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = async () => {
                                const compressed = await compressImage(reader.result as string);
                                setNewProduct(prev => ({ ...prev, image2: compressed }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    ) : (
                      <div className="relative w-full h-48 rounded-[2rem] overflow-hidden border border-slate-100 group shadow-sm">
                        <img src={newProduct.image2} alt="Hover Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => setNewProduct({ ...newProduct, image2: '' })}
                            className="bg-white text-red-500 p-3 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-6 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-orange-600 transition-all transform active:scale-[0.98] shadow-xl shadow-slate-900/10 text-xl"
              >
                {editingProduct ? 'Update Product Details' : 'Add Product to Shop'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
