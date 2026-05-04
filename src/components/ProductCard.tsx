'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Product } from '@/data/products';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t, addToCart } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);

  const name = language === 'ar' ? product.nameAr : product.nameEn;
  const hasSecondImage = product.images && product.images.length > 1;
  const mainImage = product.image;
  const secondImage = hasSecondImage ? product.images[1] : null;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
      <Link
        href={`/product/${product.id}`}
        className="block aspect-[4/5] relative overflow-hidden bg-slate-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image */}
        <Image
          src={mainImage}
          alt={name}
          fill
          className={`object-cover transition-all duration-500 ${
            isHovered && hasSecondImage
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100 group-hover:scale-105'
          }`}
        />
        {/* Second Image (shown on hover) */}
        {hasSecondImage && secondImage && (
          <Image
            src={secondImage}
            alt={`${name} - 2`}
            fill
            className={`object-cover absolute inset-0 transition-all duration-500 ${
              isHovered
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          />
        )}
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {(product as any).promotion && (
            <div className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
              Promotion
            </div>
          )}
          {product.newArrival && (
            <div className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
              NEW
            </div>
          )}
          {product.bestSeller && (
            <div className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
              Best Seller
            </div>
          )}
        </div>
        {/* Image dots indicator */}
        {hasSecondImage && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <span className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${!isHovered ? 'bg-white scale-110' : 'bg-white/50'}`} />
            <span className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered ? 'bg-white scale-110' : 'bg-white/50'}`} />
          </div>
        )}
      </Link>
      
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{product.type}</p>
          </Link>
          <div className="flex flex-col items-end">
            {product.oldPrice && product.oldPrice > 0 && (
              <p className="text-[10px] font-bold text-slate-400 line-through">
                {product.oldPrice} MAD
              </p>
            )}
            <p className="text-sm font-black text-slate-900 whitespace-nowrap">
              {product.price} <span className="text-[10px] font-normal uppercase">MAD</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          className="mt-4 w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-slate-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{t.cart.add}</span>
        </button>
      </div>
    </div>
  );
};
