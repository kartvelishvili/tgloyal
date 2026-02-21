import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useLanguage from '@/hooks/useLanguage';

const ContactV2 = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: t.contact.messages.error, description: t.contact.messages.fillRequired, variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const LEADS_STORAGE_KEY = 'tglegal_leads';
        const existingLeads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
        existingLeads.push({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
          name: formData.name, email: formData.email, phone: formData.phone || '', message: formData.message,
          read: false, createdAt: Date.now(),
        });
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existingLeads));
      } catch {}
      toast({ title: t.contact.messages.successTitle, description: t.contact.messages.successDesc });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: Phone, label: t.contact.details.phone, value: '+995 XXX XXX XXX' },
    { icon: Mail, label: t.contact.details.email, value: 'info@gegiadze.ge' },
    { icon: MapPin, label: t.contact.details.address, value: t.contact.details.addressValue },
    { icon: Clock, label: t.contact.details.hours, value: t.contact.details.hoursValue },
  ];

  return (
    <section id="contact" className="py-24 bg-[#1a3a52] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.contact.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t.contact.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        {/* Contact info strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto"
        >
          {contactInfo.map((info, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
              <info.icon size={20} className="text-[#d4af37] shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{info.label}</div>
                <div className="text-white/90 text-sm font-medium">{info.value}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Centered form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.contact.labels.name}
                className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/30 transition"
                required
              />
              <input
                type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t.contact.labels.phone}
                className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/30 transition"
              />
            </div>
            <input
              type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t.contact.labels.email}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/30 transition mb-4"
              required
            />
            <textarea
              value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t.contact.labels.message} rows={5}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/30 transition resize-none mb-6"
              required
            />
            <button
              type="submit" disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? t.contact.buttons.submitting : (<>{t.contact.buttons.submit} <Send size={18} /></>)}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactV2;
