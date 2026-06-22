'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { t } = useAppContext();

  const reviews = [
    { name: 'Ahmed S.', text: 'The quality of the caps is amazing. Very comfortable and stylish.', rating: 5 },
    { name: 'Sarah M.', text: 'Fast delivery and great customer service. Highly recommended!', rating: 5 },
    { name: 'Khalid A.', text: 'Best caps in the region. The modern designs are exactly what I was looking for.', rating: 4 },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white">{t.testimonials.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-zinc-900 border border-white/10 hover:border-amber-400/30 transition-colors">
              <div className="flex space-x-1 rtl:space-x-reverse mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/60 mb-6 italic">"{review.text}"</p>
              <p className="font-bold text-white">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Newsletter: React.FC = () => {
  const { t } = useAppContext();

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500 rounded-[3rem] p-12 md:p-20 text-center text-black">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">{t.newsletter.title}</h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="flex-1 px-8 py-5 rounded-2xl bg-black/10 border border-black/20 text-black placeholder:text-black/50 focus:outline-none focus:bg-black/20 transition-all"
              />
              <button className="px-10 py-5 bg-black text-amber-400 rounded-2xl font-black hover:bg-zinc-900 transition-all">
                {t.newsletter.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
