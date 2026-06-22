'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Mail, Phone, Globe, Link as LinkIcon, Share2, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const { t, language, addMessage, whatsappNumber } = useAppContext();
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
    <div className="py-24 sm:py-32 bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8">{t.nav.contact}</h1>
            <p className="text-xl text-white/40 mb-16 max-w-lg">
              {language === 'ar' ? 'نحن هنا لمساعدتك. تواصل معنا لأي استفسار.' : 'We are here to help you. Contact us for any inquiry.'}
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-green-900/30 rounded-2xl flex items-center justify-center border border-green-500/20">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white/30 uppercase tracking-widest mb-1">WhatsApp</h3>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-white hover:text-green-500 transition-colors">+{whatsappNumber}</a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center border border-amber-400/20">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white/30 uppercase tracking-widest mb-1">Email</h3>
                  <a href="mailto:zaja8851@gmail.com" className="text-xl font-bold text-white hover:text-amber-400 transition-colors">zaja8851@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center border border-amber-400/20">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white/30 uppercase tracking-widest mb-1">Phone</h3>
                  <a href={`tel:+${whatsappNumber}`} className="text-xl font-bold text-white hover:text-amber-400 transition-colors">+{whatsappNumber}</a>
                </div>
              </div>
            </div>

            <div className="mt-20 flex gap-6">
              <a href="#" className="w-12 h-12 bg-zinc-900 text-white/60 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all border border-white/10"><Globe className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 bg-zinc-900 text-white/60 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all border border-white/10"><LinkIcon className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 bg-zinc-900 text-white/60 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all border border-white/10"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-zinc-900 p-10 md:p-16 rounded-[4rem] border border-white/10 shadow-xl shadow-black/50">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-green-900/30 rounded-full flex items-center justify-center border border-green-500/20">
                  <MessageCircle className="w-12 h-12 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    {language === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent Successfully!'}
                  </h2>
                  <p className="text-white/40">
                    {language === 'ar' ? 'شكراً لتواصلك معنا، سنقوم بالرد عليك قريباً.' : 'Thank you for contacting us, we will respond soon.'}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-white/40 ml-1">{language === 'ar' ? 'الاسم' : 'Name'}</label>
                  <input name="name" required type="text" className="w-full px-6 py-4 bg-zinc-800 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-white/40 ml-1">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input name="email" required type="email" className="w-full px-6 py-4 bg-zinc-800 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-white/40 ml-1">{language === 'ar' ? 'الرسالة' : 'Message'}</label>
                  <textarea name="message" required rows={5} className="w-full px-6 py-4 bg-zinc-800 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-white/20" />
                </div>
                <button type="submit" className="w-full py-6 bg-amber-400 text-black rounded-[1.5rem] font-black text-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20">
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
