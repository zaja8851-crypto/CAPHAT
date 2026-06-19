'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { t, language, cart, removeFromCart, updateQuantity, cartTotal } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;

  if (cart.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-8 text-slate-900">{t.cart.empty}</h1>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 rtl:space-x-reverse px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all"
          >
            {language === 'ar' ? <ArrowRight className="w-5 h-5 rotate-180" /> : <ArrowLeft className="w-5 h-5" />}
            <span>{t.nav.shop}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900 mb-12">{t.cart.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const name = language === 'ar' ? item.nameAr : item.nameEn;
              return (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 flex flex-col xs:flex-row items-center gap-4 sm:gap-6 shadow-sm">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                    <Image src={item.image} alt={name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow text-center xs:text-left rtl:xs:text-right">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">{name}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                    </p>
                    <p className="text-orange-600 font-black mt-2">{item.price} MAD</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 mt-4 xs:mt-0">
                    <div className="flex items-center border border-slate-200 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-lg"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 sticky top-32">
              <h2 className="text-2xl font-black text-slate-900 mb-8">{t.cart.total}</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold">{cartTotal} MAD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">{t.cart.total}</span>
                  <span className="text-2xl font-black text-orange-600">{cartTotal} MAD</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-center hover:bg-orange-600 transition-all shadow-lg shadow-slate-900/10"
              >
                {t.cart.checkout}
              </Link>
              <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
                Taxes calculated at checkout. Secure SSL encrypted payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
