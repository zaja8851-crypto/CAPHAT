'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const { t } = useAppContext();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[70vh] sm:h-[90vh] min-h-[500px] flex items-center overflow-hidden bg-slate-900">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 sm:bg-black/40" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          style={{ opacity }}
          className="max-w-3xl"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-white font-medium mb-8 sm:mb-10 max-w-xl drop-shadow-lg leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col xs:flex-row">
            <Link
              href="/shop"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-orange-600 text-white rounded-full font-black flex items-center justify-center space-x-2 rtl:space-x-reverse hover:bg-orange-700 transition-all transform hover:scale-105 shadow-2xl shadow-orange-600/30 text-sm sm:text-base"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
};
