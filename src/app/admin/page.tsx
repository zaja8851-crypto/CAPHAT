'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Plus, Edit2, Package, Users, ShoppingBag, LayoutDashboard, DollarSign, X, Trash2, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

export default function AdminPage() {
  const { 
    orders, removeOrder, messages, removeMessage, fetchAdminData 
  } = useAppContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'messages'>('orders');

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated, fetchAdminData]);

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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-8 hidden lg:block">
        <h2 className="text-2xl font-black mb-12 tracking-tighter">ADMIN PANEL</h2>
        <nav className="space-y-4">
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


      </main>
    </div>
  );
}
