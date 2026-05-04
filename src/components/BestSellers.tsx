'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';

export const BestSellers: React.FC = () => {
  const { t, products } = useAppContext();
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.bestSellers.title}</h2>
          <p className="text-slate-500">{t.bestSellers.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
