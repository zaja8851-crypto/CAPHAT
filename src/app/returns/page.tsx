'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';

export default function ReturnsPage() {
  const { language } = useAppContext();

  const content = {
    ar: {
      title: 'سياسة الاسترجاع',
      intro: 'رضاكم هو هدفنا الأول. إذا لم تكن راضياً عن طلبك، فنحن هنا للمساعدة.',
      sections: [
        {
          title: 'فترة الاسترجاع',
          text: 'يمكنك استبدال أو استرجاع المنتجات خلال 7 أيام من تاريخ استلام الطلب.'
        },
        {
          title: 'شروط الاسترجاع',
          text: 'يجب أن يكون المنتج في حالته الأصلية، غير مستخدم، وبداخل تغليفه الأصلي مع جميع العلامات والملصقات.'
        },
        {
          title: 'طريقة الاسترجاع',
          text: 'يرجى التواصل معنا عبر صفحة "تواصل معنا" أو عبر الواتساب لتنسيق عملية الاسترجاع.'
        },
        {
          title: 'تكاليف الشحن',
          text: 'في حال كان المنتج به عيب مصنعي، نتحمل كامل تكاليف الشحن. في حالات الاستبدال الأخرى، يتحمل العميل تكلفة شحن الإرجاع.'
        },
        {
          title: 'استرداد المبالغ',
          text: 'يتم استرداد المبلغ إلى نفس وسيلة الدفع الأصلية أو عبر تحويل بنكي خلال 5 أيام عمل من استلامنا للمنتج المرتجع.'
        }
      ]
    },
    en: {
      title: 'Return Policy',
      intro: 'Your satisfaction is our priority. If you are not satisfied with your order, we are here to help.',
      sections: [
        {
          title: 'Return Period',
          text: 'You can exchange or return products within 7 days of receiving your order.'
        },
        {
          title: 'Return Conditions',
          text: 'The product must be in its original condition, unused, and in its original packaging with all tags and labels.'
        },
        {
          title: 'How to Return',
          text: 'Please contact us via the "Contact Us" page or WhatsApp to coordinate the return process.'
        },
        {
          title: 'Shipping Costs',
          text: 'If the product has a manufacturing defect, we bear all shipping costs. In other cases, the customer bears the return shipping cost.'
        },
        {
          title: 'Refunds',
          text: 'Refunds are processed to the original payment method or via bank transfer within 5 business days of receiving the returned item.'
        }
      ]
    },
    fr: {
      title: 'Politique de Retour',
      intro: 'Votre satisfaction est notre priorité. Si vous n\'êtes pas satisfait de votre commande, nous sommes là pour vous aider.',
      sections: [
        {
          title: 'Période de retour',
          text: 'Vous pouvez échanger ou retourner des produits dans les 7 jours suivant la réception de votre commande.'
        },
        {
          title: 'Conditions de retour',
          text: 'Le produit doit être dans son état d\'origine, inutilisé, et dans son emballage d\'origine avec toutes les étiquettes.'
        },
        {
          title: 'Comment retourner',
          text: 'Veuillez nous contacter via la page "Contactez-nous" ou via WhatsApp pour coordonner le processus de retour.'
        },
        {
          title: 'Frais d\'expédition',
          text: 'Si le produit présente un défaut de fabrication, nous prenons en charge tous les frais d\'expédition. Dans les autres cas, le client supporte les frais de retour.'
        },
        {
          title: 'Remboursements',
          text: 'Les remboursements sont traités sur le mode de paiement d\'origine ou via virement bancaire dans les 5 jours ouvrables suivant la réception de l\'article retourné.'
        }
      ]
    }
  };

  const current = (content as any)[language];

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-xl shadow-slate-200/50">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter">
            {current.title}
          </h1>
          <p className="text-xl text-slate-600 mb-16 leading-relaxed">
            {current.intro}
          </p>
          <div className="space-y-16">
            {current.sections.map((section: any, idx: number) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                  <span className="w-8 h-1 bg-green-600 rounded-full" />
                  {section.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
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
