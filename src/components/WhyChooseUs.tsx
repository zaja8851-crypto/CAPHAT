'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useAppContext();

  const features = [
    { icon: <Award className="w-8 h-8 text-amber-400" />, title: t.whyChooseUs.highQuality },
    { icon: <Truck className="w-8 h-8 text-amber-400" />, title: t.whyChooseUs.fastShipping },
    { icon: <ShieldCheck className="w-8 h-8 text-amber-400" />, title: t.whyChooseUs.securePayment },
    { icon: <RotateCcw className="w-8 h-8 text-amber-400" />, title: t.whyChooseUs.easyReturn },
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white">{t.whyChooseUs.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-8 bg-zinc-900 rounded-3xl border border-white/10 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/5 transition-all">
              <div className="mb-6 p-4 bg-amber-400/10 rounded-2xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
