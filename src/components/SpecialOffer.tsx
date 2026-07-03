'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Product } from '@/data/products';
import { MessageCircle, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SpecialOffer: React.FC = () => {
  const { language, t, products, whatsappNumber } = useAppContext();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  // Filter products that cost exactly 89 MAD
  const offerProducts = products.filter((p) => p.price === 89);

  const handleSelect = (productId: string) => {
    if (selectedIds.includes(productId)) {
      setSelectedIds((prev) => prev.filter((id) => id !== productId));
      setShowWarning(false);
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds((prev) => [...prev, productId]);
        setShowWarning(false);
      } else {
        // Already selected 2
        setShowWarning(true);
        // Automatically hide warning after 3 seconds
        setTimeout(() => setShowWarning(false), 3000);
      }
    }
  };

  const selectedProducts = offerProducts.filter((p) => selectedIds.includes(p.id));

  const handleOrder = () => {
    if (selectedProducts.length !== 2) return;

    const [prod1, prod2] = selectedProducts;
    const name1 = language === 'ar' ? prod1.nameAr : prod1.nameEn;
    const name2 = language === 'ar' ? prod2.nameAr : prod2.nameEn;
    const url1 = `${window.location.origin}/product/${prod1.id}`;
    const url2 = `${window.location.origin}/product/${prod2.id}`;

    let message = '';
    if (language === 'ar') {
      message = `السلام عليكم، أريد الاستفادة من العرض الخاص (قبعتين بـ 159 درهم):\n1. ${name1} (${url1})\n2. ${name2} (${url2})\nالمجموع: 159 درهم`;
    } else if (language === 'fr') {
      message = `Bonjour, je souhaite profiter de l'offre spéciale (2 casquettes pour 159 DH) :\n1. ${name1} (${url1})\n2. ${name2} (${url2})\nTotal : 159 DH`;
    } else {
      message = `Hello, I would like to order the special offer (2 hats for 159 MAD):\n1. ${name1} (${url1})\n2. ${name2} (${url2})\nTotal: 159 MAD`;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
            🔥 {language === 'ar' ? 'عرض محدود' : language === 'fr' ? 'Offre Limitée' : 'Limited Offer'}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t.specialOffer.title}
          </h2>
          <p className="text-lg md:text-xl text-amber-400 font-bold mb-3">
            {t.specialOffer.subtitle}
          </p>
          <p className="text-sm text-white/50 max-w-xl mx-auto">
            {t.specialOffer.instruction}
          </p>
        </div>

        {/* Warning notification */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-8 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>
                {language === 'ar'
                  ? 'يمكنك اختيار قبعتين فقط للاستفادة من العرض!'
                  : language === 'fr'
                  ? 'Vous pouvez sélectionner seulement 2 casquettes pour cette offre !'
                  : 'You can only select 2 hats for this offer!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selection status */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="text-sm font-bold text-white/80">
            {t.specialOffer.selectedCount.replace('{count}', selectedIds.length.toString())}
          </div>
          <div className="w-32 bg-zinc-800 h-2.5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="bg-amber-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(selectedIds.length / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {offerProducts.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            const name = language === 'ar' ? product.nameAr : product.nameEn;

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={() => handleSelect(product.id)}
                className={`group relative bg-zinc-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border cursor-pointer select-none transition-all duration-300 ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-lg shadow-amber-400/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Selection Checkmark Overlay */}
                <div
                  className={`absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-400 text-black scale-100 rotate-0'
                      : 'bg-black/40 text-white/40 border border-white/10 scale-90 group-hover:scale-100'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span className="text-[10px] font-bold">1</span>
                  )}
                </div>

                {/* Original Price Badge */}
                <div className="absolute top-3 left-3 z-20 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-white/90 border border-white/5">
                  89 MAD
                </div>

                {/* Image Wrapper */}
                <div className="aspect-[4/5] relative bg-zinc-800 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-amber-400/5 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                {/* Details */}
                <div className="p-3 text-center">
                  <h3 className={`text-xs sm:text-sm font-bold text-white transition-colors duration-300 line-clamp-1 ${isSelected ? 'text-amber-400' : 'group-hover:text-amber-400'}`}>
                    {name}
                  </h3>
                  <p className="text-[10px] text-white/40 mt-0.5">{product.type}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Summary & Order Button Container */}
        <div className="mt-12 max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {selectedIds.length === 2 ? (
              <motion.div
                key="order-active"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-zinc-900 border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-400/5 relative overflow-hidden"
              >
                {/* Decorative border glow */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">
                      {language === 'ar' ? 'العرض جاهز للطلب' : language === 'fr' ? 'OFFRE PRÊTE' : 'OFFER READY'}
                    </span>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-black text-white">159 MAD</span>
                      <span className="text-sm text-white/40 line-through">178 MAD</span>
                      <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-bold">
                        {language === 'ar' ? 'وفر 19 درهم' : language === 'fr' ? 'Économisez 19 DH' : 'Save 19 MAD'}
                      </span>
                    </div>
                    {/* Selected Caps Row */}
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-2">
                      {selectedProducts.map((p) => (
                        <div key={p.id} className="flex items-center gap-1.5 bg-white/5 border border-white/10 py-1 px-2.5 rounded-xl text-xs text-white/80">
                          <div className="relative w-4 h-4 rounded-md overflow-hidden flex-shrink-0">
                            <Image src={p.image} alt="" fill className="object-cover" />
                          </div>
                          <span className="max-w-[80px] truncate">
                            {language === 'ar' ? p.nameAr : p.nameEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleOrder}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-black px-8 py-4 rounded-2xl transition-all transform active:scale-95 shadow-xl shadow-green-600/35 hover:shadow-green-600/50 whitespace-nowrap cursor-pointer text-base"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t.specialOffer.orderNow}</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="order-inactive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 text-center text-white/40 text-sm font-medium"
              >
                {language === 'ar'
                  ? 'يرجى اختيار قبعتين لتفعيل زر الطلب'
                  : language === 'fr'
                  ? 'Veuillez sélectionner 2 casquettes pour activer le bouton de commande'
                  : 'Please select 2 hats to activate the order button'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
