'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';

export default function PrivacyPage() {
  const { language } = useAppContext();

  const content = {
    ar: {
      title: 'سياسة الخصوصية',
      intro: 'في HATRIX، نحن نولي أهمية قصوى لخصوصية زوارنا وعملائنا. توضح هذه الوثيقة أنواع المعلومات الشخصية التي نجمعها وكيف نستخدمها.',
      sections: [
        { title: 'المعلومات التي نجمعها', text: 'عند قيامك بطلب منتج، نقوم بجمع المعلومات الضرورية فقط مثل الاسم، رقم الهاتف، وعنوان التوصيل لضمان وصول طلبك بنجاح.' },
        { title: 'كيفية استخدام المعلومات', text: 'نستخدم هذه البيانات لمعالجة طلباتك، والتواصل معك بشأن حالة الطلب، ولتحسين تجربة التسوق الخاصة بك في متجرنا.' },
        { title: 'حماية البيانات', text: 'نحن نستخدم تقنيات أمان متطورة لضمان حماية بياناتك الشخصية من أي وصول غير مصرح به.' },
        { title: 'مشاركة البيانات', text: 'نحن لا نقوم ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أي أطراف ثالثة لأغراض تسويقية.' }
      ]
    },
    en: {
      title: 'Privacy Policy',
      intro: 'At HATRIX, we prioritize the privacy of our visitors and customers. This document outlines the types of personal information we collect and how we use it.',
      sections: [
        { title: 'Information Collection', text: 'When you place an order, we collect only essential information such as name, phone number, and delivery address to ensure successful delivery.' },
        { title: 'How We Use Information', text: 'We use this data to process your orders, communicate regarding order status, and improve your shopping experience.' },
        { title: 'Data Protection', text: 'We employ advanced security technologies to ensure your personal data is protected from unauthorized access.' },
        { title: 'Data Sharing', text: 'We do not sell, rent, or share your personal data with any third parties for marketing purposes.' }
      ]
    },
    fr: {
      title: 'Politique de Confidentialité',
      intro: 'Chez HATRIX, nous accordons une importance capitale à la vie privée de nos visiteurs et clients. Ce document décrit les types d\'informations personnelles que nous collectons et comment nous les utilisons.',
      sections: [
        { title: 'Collecte d\'informations', text: 'Lorsque vous passez une commande, nous collectons uniquement les informations essentielles telles que le nom, le numéro de téléphone et l\'adresse de livraison.' },
        { title: 'Utilisation des informations', text: 'Nous utilisons ces données pour traiter vos commandes, communiquer sur l\'état de la commande et améliorer votre expérience d\'achat.' },
        { title: 'Protection des données', text: 'Nous utilisons des technologies de sécurité avancées pour garantir que vos données personnelles sont protégées contre tout accès non autorisé.' },
        { title: 'Partage des données', text: 'Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins de marketing.' }
      ]
    }
  };

  const current = (content as any)[language];

  return (
    <div className="py-24 bg-black min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-zinc-900 p-12 md:p-20 rounded-[3rem] border border-white/10 shadow-xl shadow-black/50">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter">
            {current.title}
          </h1>
          <p className="text-xl text-white/50 mb-16 leading-relaxed">
            {current.intro}
          </p>
          <div className="space-y-16">
            {current.sections.map((section: any, idx: number) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl font-black text-white flex items-center gap-4">
                  <span className="w-8 h-1 bg-amber-400 rounded-full" />
                  {section.title}
                </h2>
                <p className="text-lg text-white/50 leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
