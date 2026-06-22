'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Product } from '@/data/products';
import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { language, t, whatsappNumber } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);

  const name = language === 'ar' ? product.nameAr : product.nameEn;
  const hasSecondImage = product.images && product.images.length > 1;
  const mainImage = product.image;
  const secondImage = hasSecondImage ? product.images[1] : null;

  return (
    <div className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300">
      <Link
        href={`/product/${product.id}`}
        prefetch={true}
        className="block aspect-[4/5] relative overflow-hidden bg-zinc-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image */}
        <Image
          src={mainImage}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
            <div className="bg-amber-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
              NEW
            </div>
          )}
          {product.bestSeller && (
            <div className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
              Best Seller
            </div>
          )}
        </div>
        {/* Image dots indicator */}
        {hasSecondImage && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <span className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${!isHovered ? 'bg-amber-400 scale-110' : 'bg-white/50'}`} />
            <span className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered ? 'bg-amber-400 scale-110' : 'bg-white/50'}`} />
          </div>
        )}
      </Link>
      
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${product.id}`} prefetch={true} className="block">
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-xs text-white/40 mt-1">{product.type}</p>
          </Link>
          <div className="flex flex-col items-end">
            {product.oldPrice && product.oldPrice > 0 && (
              <p className="text-[10px] font-bold text-white/30 line-through">
                {product.oldPrice} MAD
              </p>
            )}
            <p className="text-sm font-black text-amber-400 whitespace-nowrap">
              {product.price} <span className="text-[10px] font-normal uppercase text-white/50">MAD</span>
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = `${window.location.origin}/product/${product.id}`;
            let message = '';
            if (language === 'ar') {
              message = `السلام عليكم، أريد طلب هذا المنتج:\n- المنتج: ${name}\n- السعر: ${product.price} MAD\n- الرابط: ${url}`;
            } else if (language === 'fr') {
              message = `Bonjour, je souhaite commander ce produit :\n- Produit : ${name}\n- Prix : ${product.price} MAD\n- Lien : ${url}`;
            } else {
              message = `Hello, I would like to order this product:\n- Product: ${name}\n- Price: ${product.price} MAD\n- Link: ${url}`;
            }
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          }}
          className="mt-4 w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-green-600 text-white py-3 rounded-xl text-xs font-bold hover:bg-green-500 transition-colors shadow-lg shadow-green-600/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.cart.orderWhatsApp}</span>
        </button>
      </div>
    </div>
  );
};
