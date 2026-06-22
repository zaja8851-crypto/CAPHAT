'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const { t, language, products } = useAppContext();
  const [filterType, setFilterType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  const types = ['All', ...Array.from(new Set(products.map(p => p.type)))];

  const filteredProducts = products
    .filter(p => filterType === 'All' || p.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'best-seller') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      return 0;
    });

  return (
    <div className="py-12 sm:py-20 bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">{t.nav.shop}</h1>
            <p className="text-white/40">{filteredProducts.length} {language === 'ar' ? 'منتج' : 'products'}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative group">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 bg-zinc-900 border border-white/10 text-white rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
            </div>

            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 bg-zinc-900 border border-white/10 text-white rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                <option value="newest">{t.shop.newest}</option>
                <option value="best-seller">{t.shop.bestSelling}</option>
                <option value="price-low">{t.shop.price}: Low to High</option>
                <option value="price-high">{t.shop.price}: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/40">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
