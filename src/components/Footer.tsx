'use client';

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { Globe, Link as LinkIcon, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useAppContext();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
              CAPZONE<span className="text-orange-600">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              {t.about.text}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <Link href="#" className="hover:text-orange-600 transition-colors"><Globe className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-orange-600 transition-colors"><LinkIcon className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-orange-600 transition-colors"><Share2 className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">{t.nav.home}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">{t.nav.home}</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">{t.nav.shop}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">{t.footer.returns}</Link></li>
              <li><Link href="/admin" className="text-orange-600 font-bold hover:text-white transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">{t.nav.contact}</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="mailto:zaja8851@gmail.com" className="hover:text-white transition-colors">Email: zaja8851@gmail.com</a></li>
              <li><a href="https://wa.me/212643553936" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp: 0643553936</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
