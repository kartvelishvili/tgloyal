import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const ProfessionalStatusV3 = () => {
  const { t } = useLanguage();

  return (
    <section id="professional-status" className="py-24 bg-gradient-to-b from-[#fffcf5] to-[#f5f0e8] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] via-[#1a3a52] to-[#d4af37]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.professionalStatus.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52] mt-3">{t.professionalStatus.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        {/* Compact profile card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            {/* Image */}
            <div className="md:col-span-2 relative">
              <img
                src="https://i.postimg.cc/nL50Zjjc/tamar9.jpg"
                alt={t.professionalStatus.heading}
                className="w-full h-full min-h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/50 to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#d4af37]/10 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a3a52]">{t.professionalStatus.title || 'თამარ გეგიაძე'}</h3>
                  <p className="text-xs text-[#d4af37]">{t.professionalStatus.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                {t.professionalStatus.description}
              </p>

              {/* Status items */}
              <div className="space-y-3">
                {(t.professionalStatus.items || [{ title: t.professionalStatus.title }]).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-xl"
                  >
                    <CheckCircle size={16} className="text-[#d4af37] shrink-0" />
                    <span className="text-sm text-[#1a3a52] font-medium">{item.title || item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <Award size={14} />
                  <span className="text-xs font-bold tracking-wider uppercase">{t.professionalStatus.badge || 'ვერიფიცირებული პროფესიონალი'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalStatusV3;
