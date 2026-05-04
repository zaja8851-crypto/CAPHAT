'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { products } from '@/data/products';
import { Star, ShoppingCart, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t, language, addToCart, products } = useAppContext();
  const product = products.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  if (!product) return <div>Product not found</div>;

  const name = language === 'ar' ? product.nameAr : product.nameEn;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionEn;
  const productImages = product.images || [product.image];

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push('/checkout');
  };

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Single Image Card with Navigation */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 group shadow-sm">
              <Image
                src={productImages[activeImage]}
                alt={`${name} - ${activeImage + 1}`}
                fill
                className="object-cover transition-all duration-500"
              />
              
              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? productImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-600 hover:text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === productImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-600 hover:text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {productImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeImage === idx ? 'w-8 bg-orange-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Image Counter Badge */}
              <div className="absolute top-6 right-6 bg-slate-900/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-slate-900">
                {activeImage + 1} / {productImages.length}
              </div>
            </div>

            {/* Mini Thumbnails for Quick Access */}
            {productImages.length > 1 && (
              <div className="flex space-x-4 rtl:space-x-reverse justify-center">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-orange-600 scale-110 shadow-lg' : 'border-transparent opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {(product as any).promotion && (
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    Promotion
                  </span>
                )}
                {product.newArrival && (
                  <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    New Arrival
                  </span>
                )}
                {product.bestSeller && (
                  <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    Best Seller
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-4">{name}</h1>
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="flex text-orange-600">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          (userRating || 4) >= star ? 'fill-current' : 'text-slate-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  {userRating 
                    ? (language === 'ar' ? `(تقييمك: ${userRating}/5)` : language === 'fr' ? `(Votre note: ${userRating}/5)` : `(Your rating: ${userRating}/5)`)
                    : (language === 'ar' ? '(4.8/5) 124 تقييم' : language === 'fr' ? '(4.8/5) 124 avis' : '(4.8/5) 124 reviews')}
                </span>
              </div>
              <div className="flex items-baseline space-x-3 rtl:space-x-reverse">
                <p className="text-3xl font-black text-slate-900">
                  {product.price} <span className="text-sm font-normal uppercase">MAD</span>
                </p>
                {product.oldPrice && product.oldPrice > 0 && (
                  <p className="text-lg font-bold text-slate-400 line-through">
                    {product.oldPrice} <span className="text-xs font-normal uppercase">MAD</span>
                  </p>
                )}
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-10 text-lg">
              {description}
            </p>

            {/* Quantity */}
            <div className="flex items-center space-x-6 rtl:space-x-reverse mb-10">
              <div className="flex items-center border border-slate-200 rounded-2xl p-1 bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-slate-900 text-white py-5 rounded-[1.5rem] font-black hover:bg-slate-800 transition-all transform active:scale-95"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>{t.cart.add}</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-green-600 text-white py-5 rounded-[1.5rem] font-black hover:bg-green-700 transition-all transform active:scale-95 shadow-xl shadow-green-600/20"
              >
                <CreditCard className="w-6 h-6" />
                <span>{t.cart.buyNow}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <div className="mt-24 pt-24 border-t border-slate-100">
          <div className="flex space-x-12 rtl:space-x-reverse mb-12 border-b border-slate-100">
            <button className="pb-6 text-xl font-black text-slate-900 border-b-4 border-orange-600">
              {t.product.description}
            </button>
            <button className="pb-6 text-xl font-black text-slate-400 hover:text-slate-900 transition-colors">
              {t.product.reviews}
            </button>
          </div>
          <div className="prose prose-lg max-w-none text-slate-600 leading-loose">
            <p>{description}</p>
            <ul className="mt-8 space-y-4">
              <li>High-quality premium materials</li>
              <li>Breathable fabric for maximum comfort</li>
              <li>Adjustable strap for the perfect fit</li>
              <li>Durable stitching for long-lasting use</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
