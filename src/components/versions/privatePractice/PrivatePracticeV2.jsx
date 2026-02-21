import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const PrivatePracticeV2 = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.privatePractice.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52] mt-3">{t.privatePractice.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
          {t.privatePractice.description && (
            <p className="text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed">{t.privatePractice.description}</p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.privatePractice.services?.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Top color bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#1a3a52] to-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="p-6">
                <div className="w-12 h-12 bg-[#1a3a52]/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/10 transition-colors">
                  <CheckCircle2 size={22} className="text-[#1a3a52] group-hover:text-[#d4af37] transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-[#1a3a52] mb-2 group-hover:text-[#d4af37] transition-colors">
                  {service.title || service}
                </h3>

                {service.description && (
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
                )}

                <div className="flex items-center gap-1 text-[#d4af37] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t.privatePractice.learnMore || 'დეტალურად'}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivatePracticeV2;
