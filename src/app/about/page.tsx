'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';

export default function AboutPage() {
  const { t } = useAppContext();

  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-12">{t.nav.about}</h1>
          <div className="aspect-[21/9] relative rounded-[3rem] overflow-hidden mb-16 bg-slate-100">
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-orange-600 opacity-20" />
          </div>
          <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed">
            {t.about.text}
          </p>
        </div>
      </div>
    </div>
  );
}
