'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Mail, Phone, MapPin, Globe, Link as LinkIcon, Share2, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const { t, language, addMessage } = useAppContext();
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: 'Contact Form Message',
      message: formData.get('message') as string,
    };
    
    addMessage(data);
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="py-24 sm:py-32 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8">{t.nav.contact}</h1>
            <p className="text-xl text-slate-500 mb-16 max-w-lg">
              {language === 'ar' ? 'نحن هنا لمساعدتك. تواصل معنا لأي استفسار.' : 'We are here to help you. Contact us for any inquiry.'}
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp</h3>
                  <a href="https://wa.me/212643553936" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-slate-900 hover:text-green-600 transition-colors">0643553936</a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Email</h3>
                  <a href="mailto:zaja8851@gmail.com" className="text-xl font-bold text-slate-900 hover:text-orange-600 transition-colors">zaja8851@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Phone</h3>
                  <a href="tel:0643553936" className="text-xl font-bold text-slate-900 hover:text-orange-600 transition-colors">0643553936</a>
                </div>
              </div>
            </div>

            <div className="mt-20 flex gap-6">
              <a href="#" className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"><LinkIcon className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-xl shadow-slate-200/50">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">
                    {language === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent Successfully!'}
                  </h2>
                  <p className="text-slate-500">
                    {language === 'ar' ? 'شكراً لتواصلك معنا، سنقوم بالرد عليك قريباً.' : 'Thank you for contacting us, we will respond soon.'}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">{language === 'ar' ? 'الاسم' : 'Name'}</label>
                  <input name="name" required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input name="email" required type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">{language === 'ar' ? 'الرسالة' : 'Message'}</label>
                  <textarea name="message" required rows={5} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600" />
                </div>
                <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-orange-600 transition-all shadow-lg shadow-slate-900/10">
                  {language === 'ar' ? 'إرسال' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
