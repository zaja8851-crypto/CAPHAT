'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { t, language, cart, cartTotal, addOrder, clearCart } = useAppContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add order to context
    addOrder({
      items: cart,
      total: cartTotal,
      customer: {
        name: formData.name,
        email: 'No Email Provided',
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}`,
      },
    });

    clearCart();
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    // ... (rest of the success UI)
    return (
      <div className="py-32 text-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            {language === 'ar' ? 'شكراً لطلبك!' : 'Thank you for your order!'}
          </h1>
          <p className="text-slate-600 mb-10">
            {language === 'ar' ? 'تم استلام طلبك بنجاح. سنقوم بالتواصل معك قريباً.' : 'Your order has been received. We will contact you soon.'}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-orange-600 transition-all"
          >
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900 mb-12">{t.cart.checkout}</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500">{language === 'ar' ? 'الاسم' : 'Name'}</label>
                  <input required name="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500">{language === 'ar' ? 'الهاتف' : 'Phone'}</label>
                  <input required name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                {language === 'ar' ? 'عنوان الشحن' : 'Shipping Address'}
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500">{language === 'ar' ? 'العنوان' : 'Address'}</label>
                  <input required name="address" type="text" value={formData.address} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500">{language === 'ar' ? 'المدينة' : 'City'}</label>
                  <input required name="city" type="text" value={formData.city} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">3</span>
                {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
              </h2>
              <div className="bg-white p-6 border-2 border-orange-600 bg-orange-50/50 rounded-[2rem] flex items-center space-x-6 rtl:space-x-reverse">
                <Truck className="w-10 h-10 text-orange-600" />
                <div>
                  <span className="block font-black text-slate-900 text-xl">{language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</span>
                  <span className="text-sm text-slate-500 mt-1">Pay when you receive your order</span>
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] sticky top-32">
              <h2 className="text-2xl font-black mb-10">{language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{cartTotal} MAD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-bold">Free</span>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xl font-bold">{t.cart.total}</span>
                  <span className="text-3xl font-black text-orange-500">{cartTotal} MAD</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-6 bg-orange-600 text-white rounded-[1.5rem] font-black text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20"
              >
                {language === 'ar' ? 'تأكيد الطلب' : 'Confirm Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
