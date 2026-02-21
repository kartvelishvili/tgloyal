
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useLanguage from '../hooks/useLanguage';

const CONTACT_INFO_STORAGE_KEY = 'tglegal_contact_info';

const ContactSection = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [contactInfo, setContactInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(CONTACT_INFO_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { phone: '+995 XXX XXX XXX', email: 'info@gegiadze.ge', address: 'თბილისი, საქართველო', addressEn: 'Tbilisi, Georgia', hours: 'ორშ-პარ: 9:00-18:00', hoursEn: 'Mon-Fri: 9:00-18:00' };
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleUpdate = (e) => setContactInfo(e.detail);
    window.addEventListener('contact-info-updated', handleUpdate);
    return () => window.removeEventListener('contact-info-updated', handleUpdate);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t.contact.messages.error,
        description: t.contact.messages.fillRequired,
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      // Save lead to localStorage for admin panel
      try {
        const LEADS_STORAGE_KEY = 'tglegal_leads';
        const existingLeads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
        const newLead = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          message: formData.message,
          read: false,
          createdAt: Date.now(),
        };
        existingLeads.push(newLead);
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existingLeads));
      } catch (err) {
        // Silently fail storage
      }

      toast({
        title: t.contact.messages.successTitle,
        description: t.contact.messages.successDesc
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfoData = [
    { icon: Phone, label: t.contact.details.phone, value: contactInfo.phone },
    { icon: Mail, label: t.contact.details.email, value: contactInfo.email },
    { icon: MapPin, label: t.contact.details.address, value: language === 'ka' ? contactInfo.address : contactInfo.addressEn },
    { icon: Clock, label: t.contact.details.hours, value: language === 'ka' ? contactInfo.hours : contactInfo.hoursEn }
  ];

  return (
    <section id="contact" className="section-padding bg-[#f8f9fa] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1a3a52]/5 skew-x-12 transform translate-x-1/2"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.contact.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52] mt-3">
            {t.contact.heading}
          </h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto items-start">
          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1a3a52] mb-6 border-b pb-4">{t.contact.infoTitle}</h3>
              <div className="space-y-8">
                {contactInfoData.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-5 group"
                  >
                    <div className="bg-[#1a3a52]/5 p-4 rounded-xl group-hover:bg-[#1a3a52] transition-colors duration-300 shrink-0">
                      <info.icon className="text-[#1a3a52] group-hover:text-[#d4af37] transition-colors duration-300" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a3a52] text-sm uppercase tracking-wide mb-1 opacity-70">{info.label}</h4>
                      <p className="text-gray-800 font-medium text-lg">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#1a3a52] p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <h3 className="text-xl font-bold mb-4 relative z-10">{t.contact.helpTitle}</h3>
              <p className="text-white/80 leading-relaxed relative z-10">
                {t.contact.helpText}
              </p>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border-t-4 border-[#d4af37] order-1 lg:order-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label 
                    htmlFor="name" 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formData.name 
                        ? '-top-2.5 text-xs bg-white px-2 text-[#d4af37] font-bold' 
                        : 'top-4 text-gray-400'
                    }`}
                  >
                    {t.contact.labels.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none transition-all bg-gray-50/50 hover:bg-white text-gray-900"
                    required
                  />
                </div>

                <div className="relative">
                  <label 
                    htmlFor="phone" 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'phone' || formData.phone 
                        ? '-top-2.5 text-xs bg-white px-2 text-[#d4af37] font-bold' 
                        : 'top-4 text-gray-400'
                    }`}
                  >
                    {t.contact.labels.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none transition-all bg-gray-50/50 hover:bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="relative">
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formData.email 
                      ? '-top-2.5 text-xs bg-white px-2 text-[#d4af37] font-bold' 
                      : 'top-4 text-gray-400'
                  }`}
                >
                  {t.contact.labels.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none transition-all bg-gray-50/50 hover:bg-white text-gray-900"
                  required
                />
              </div>

              <div className="relative">
                <label 
                  htmlFor="message" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message 
                      ? '-top-2.5 text-xs bg-white px-2 text-[#d4af37] font-bold' 
                      : 'top-4 text-gray-400'
                  }`}
                >
                  {t.contact.labels.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  rows="5"
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none transition-all resize-none bg-gray-50/50 hover:bg-white text-gray-900"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d4af37] text-white font-bold text-lg py-4 rounded-lg hover:bg-[#b5952f] transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#d4af37]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  t.contact.buttons.submitting
                ) : (
                  <>
                    {t.contact.buttons.submit}
                    <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
