'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Star, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t, language, products, whatsappNumber } = useAppContext();
  const product = products.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  if (!product) return <div className="bg-black min-h-screen flex items-center justify-center text-white">Product not found</div>;

  const name = language === 'ar' ? product.nameAr : product.nameEn;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionEn;
  const productImages = product.images || [product.image];

  const handleOrderWhatsApp = () => {
    const url = window.location.href;
    let message = '';
    
    let optionsText = '';
    if (selectedColor) optionsText += `\n- ${language === 'ar' ? 'اللون' : language === 'fr' ? 'Couleur' : 'Color'}: ${selectedColor}`;
    if (selectedSize) optionsText += `\n- ${language === 'ar' ? 'المقاس' : language === 'fr' ? 'Taille' : 'Size'}: ${selectedSize}`;
    
    if (language === 'ar') {
      message = `السلام عليكم، أريد طلب هذا المنتج:\n- المنتج: ${name}\n- السعر: ${product.price} MAD\n- الكمية: ${quantity}${optionsText}\n- الرابط: ${url}`;
    } else if (language === 'fr') {
      message = `Bonjour, je souhaite commander ce produit :\n- Produit : ${name}\n- Prix : ${product.price} MAD\n- Quantité : ${quantity}${optionsText}\n- Lien : ${url}`;
    } else {
      message = `Hello, I would like to order this product:\n- Product: ${name}\n- Price: ${product.price} MAD\n- Quantity: ${quantity}${optionsText}\n- Link: ${url}`;
    }
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-12 sm:py-20 bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10 group shadow-sm">
              <Image
                src={productImages[activeImage]}
                alt={`${name} - ${activeImage + 1}`}
                fill
                className="object-cover transition-all duration-500"
              />
              
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? productImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-400 hover:text-black"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === productImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-400 hover:text-black"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {productImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeImage === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white">
                {activeImage + 1} / {productImages.length}
              </div>
            </div>

            {productImages.length > 1 && (
              <div className="flex space-x-4 rtl:space-x-reverse justify-center">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-amber-400 scale-110 shadow-lg shadow-amber-400/20' : 'border-white/10 opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
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
                  <span className="bg-amber-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    New Arrival
                  </span>
                )}
                {product.bestSeller && (
                  <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    Best Seller
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black text-white mb-4">{name}</h1>
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          (userRating || 4) >= star ? 'fill-current' : 'text-white/20'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm text-white/40 font-medium">
                  {userRating 
                    ? (language === 'ar' ? `(تقييمك: ${userRating}/5)` : language === 'fr' ? `(Votre note: ${userRating}/5)` : `(Your rating: ${userRating}/5)`)
                    : (language === 'ar' ? '(4.8/5) 124 تقييم' : language === 'fr' ? '(4.8/5) 124 avis' : '(4.8/5) 124 reviews')}
                </span>
              </div>
              <div className="flex items-baseline space-x-3 rtl:space-x-reverse">
                <p className="text-3xl font-black text-amber-400">
                  {product.price} <span className="text-sm font-normal uppercase text-white/50">MAD</span>
                </p>
                {product.oldPrice && product.oldPrice > 0 && (
                  <p className="text-lg font-bold text-white/30 line-through">
                    {product.oldPrice} <span className="text-xs font-normal uppercase">MAD</span>
                  </p>
                )}
              </div>
            </div>

            <p className="text-white/60 leading-relaxed mb-10 text-lg">
              {description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-black text-white mb-3 uppercase tracking-wider">
                  {t.product.selectColor}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                        selectedColor === color
                          ? 'border-amber-400 bg-amber-400/10 text-amber-400 shadow-sm'
                          : 'border-white/10 bg-zinc-900 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-black text-white mb-3 uppercase tracking-wider">
                  {t.cart.selectSize}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                        selectedSize === size
                          ? 'border-amber-400 bg-amber-400/10 text-amber-400 shadow-sm'
                          : 'border-white/10 bg-zinc-900 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center space-x-6 rtl:space-x-reverse mb-10">
              <div className="flex items-center border border-white/10 rounded-2xl p-1 bg-zinc-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-xl transition-colors text-white font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-xl transition-colors text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-4">
              <button
                onClick={handleOrderWhatsApp}
                className="w-full flex items-center justify-center space-x-3 rtl:space-x-reverse bg-green-600 text-white py-5 rounded-[1.5rem] font-black hover:bg-green-500 transition-all transform active:scale-95 shadow-xl shadow-green-600/20 text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                <span>{t.cart.orderWhatsApp}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Description Tab */}
        <div className="mt-24 pt-24 border-t border-white/10">
          <div className="flex space-x-12 rtl:space-x-reverse mb-12 border-b border-white/10">
            <button className="pb-6 text-xl font-black text-white border-b-4 border-amber-400">
              {t.product.description}
            </button>
            <button className="pb-6 text-xl font-black text-white/30 hover:text-white transition-colors">
              {t.product.reviews}
            </button>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-white/60 leading-loose">
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
