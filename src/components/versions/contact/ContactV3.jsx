import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Check, ArrowRight, ArrowLeft, User, MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useLanguage from '@/hooks/useLanguage';

const ContactV3 = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { label: t.contact.labels?.name || 'სახელი', icon: User },
    { label: t.contact.labels?.email || 'ელფოსტა', icon: Mail },
    { label: t.contact.labels?.message || 'შეტყობინება', icon: MessageCircle },
  ];

  const handleSubmit = () => {
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
      setStep(0);
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: Phone, value: '+995 XXX XXX XXX' },
    { icon: Mail, value: 'info@gegiadze.ge' },
    { icon: MapPin, value: t.contact.details?.addressValue || 'თბილისი' },
    { icon: Clock, value: t.contact.details?.hoursValue || '10:00 - 18:00' },
  ];

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.contact.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52] mt-3">{t.contact.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-[#1a3a52] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-6">{t.contact.infoTitle}</h3>
              <div className="space-y-5">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <info.icon size={16} className="text-[#d4af37]" />
                    </div>
                    <span className="text-white/80 text-sm">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Multi-step form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  <button
                    onClick={() => i <= step && setStep(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      i === step ? 'bg-[#d4af37] text-white shadow-lg shadow-[#d4af37]/20' :
                      i < step ? 'bg-[#1a3a52] text-white' :
                      'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {i < step ? <Check size={14} /> : <s.icon size={14} />}
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 rounded ${i < step ? 'bg-[#1a3a52]' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step content */}
            <div className="bg-gray-50 rounded-2xl p-8 min-h-[250px] border border-gray-100">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <label className="block text-sm font-bold text-[#1a3a52] mb-1">{t.contact.labels.name} *</label>
                    <input
                      type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none transition bg-white text-gray-900"
                      placeholder={t.contact.labels.name} required
                    />
                    <label className="block text-sm font-bold text-[#1a3a52] mb-1 mt-4">{t.contact.labels.phone}</label>
                    <input
                      type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none transition bg-white text-gray-900"
                      placeholder={t.contact.labels.phone}
                    />
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  >
                    <label className="block text-sm font-bold text-[#1a3a52] mb-1">{t.contact.labels.email} *</label>
                    <input
                      type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none transition bg-white text-gray-900"
                      placeholder={t.contact.labels.email} required
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  >
                    <label className="block text-sm font-bold text-[#1a3a52] mb-1">{t.contact.labels.message} *</label>
                    <textarea
                      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none transition resize-none bg-white text-gray-900"
                      placeholder={t.contact.labels.message} required
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft size={16} /> {t.contact.buttons?.back || 'უკან'}
              </button>
              {step < 2 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 bg-[#1a3a52] text-white rounded-xl font-medium hover:bg-[#234e68] transition flex items-center gap-2"
                >
                  {t.contact.buttons?.next || 'შემდეგი'} <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit} disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? t.contact.buttons.submitting : (<>{t.contact.buttons.submit} <Send size={16} /></>)}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactV3;
