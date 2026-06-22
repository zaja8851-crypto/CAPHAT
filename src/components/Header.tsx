'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { Menu, X, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t, dir } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.shop, href: '/shop' },
    { name: t.nav.contact, href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-amber-400/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-24">
          
          {/* Actions - Language (Left side) */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-3 rounded-2xl hover:bg-white/5 transition-colors flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Globe className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">{language}</span>
            </button>

            {/* Language Dropdown */}
            {isLangOpen && (
              <div className={`absolute top-[calc(100%+0.5rem)] ${language === 'ar' ? 'right-0' : 'left-0'} w-32 bg-black/98 backdrop-blur-2xl border border-amber-400/30 shadow-2xl shadow-amber-400/10 rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300`}>
                <div className="flex flex-col">
                  {(['ar', 'en', 'fr'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangOpen(false);
                      }}
                      className={`px-6 py-3 text-sm font-black uppercase hover:bg-amber-400/10 transition-all text-left rtl:text-right ${
                        language === lang ? 'text-amber-400' : 'text-white/70'
                      }`}
                    >
                      {lang === 'ar' ? 'العربية' : lang === 'en' ? 'English' : 'Français'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logo (Center) */}
          <div className="flex-shrink-0 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
              HAT<span className="text-amber-400">RIX</span>
            </Link>
          </div>

          {/* Menu Button (Right side) */}
          <div className="flex items-center relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-3 rtl:space-x-reverse px-4 sm:px-6 py-3 sm:py-4 bg-amber-400 text-black rounded-[1.2rem] font-black hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20 active:scale-95"
            >
              <span className="hidden sm:inline">{language === 'ar' ? 'القائمة' : 'Menu'}</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Menu Dropdown */}
            {isOpen && (
              <div className={`absolute top-[calc(100%+0.5rem)] ${language === 'ar' ? 'left-0' : 'right-0'} w-[200px] sm:w-64 bg-black/98 backdrop-blur-2xl border border-amber-400/30 shadow-2xl shadow-amber-400/10 rounded-[1.5rem] py-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300`}>
                <nav className="flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-black text-white hover:text-amber-400 hover:bg-amber-400/5 transition-all first:rounded-t-[1.5rem] last:rounded-b-[1.5rem] text-left rtl:text-right"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
