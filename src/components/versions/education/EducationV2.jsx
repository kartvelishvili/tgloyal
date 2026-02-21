import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const EducationV2 = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1a3a52] via-[#d4af37] to-[#1a3a52]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.education.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52] mt-3">{t.education.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.education.items?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#d4af37]/30 hover:shadow-xl transition-all duration-500"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#1a3a52] to-[#d4af37] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#1a3a52] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#d4af37] transition-colors duration-300">
                  <GraduationCap size={20} className="text-white" />
                </div>
                {item.year && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                    <Calendar size={12} />
                    {item.year}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-[#1a3a52] mb-2 group-hover:text-[#d4af37] transition-colors">
                {item.title}
              </h3>
              {item.institution && (
                <p className="text-sm text-gray-500 mb-3 font-medium">{item.institution}</p>
              )}
              {item.description && (
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationV2;
