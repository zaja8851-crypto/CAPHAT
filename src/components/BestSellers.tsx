'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { ProductCard } from './ProductCard';

export const BestSellers: React.FC = () => {
  const { t, products } = useAppContext();
  const bestSellers = products.filter(p => p.bestSeller);

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t.bestSellers.title}</h2>
          <p className="text-white/50">{t.bestSellers.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
