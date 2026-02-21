import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ChevronDown } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const EducationV3 = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="education" className="py-24 bg-gradient-to-b from-[#f5f0e8] to-[#ede4d6] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl -mr-48 -mt-48" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a3a52]/5 rounded-full mb-4">
            <GraduationCap size={16} className="text-[#d4af37]" />
            <span className="text-[#1a3a52] text-sm font-medium">{t.education.subtitle}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52]">{t.education.heading}</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {t.education.items?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${openIndex === index ? 'bg-[#d4af37]' : 'bg-[#1a3a52]/5'}`}>
                    <GraduationCap size={18} className={openIndex === index ? 'text-white' : 'text-[#1a3a52]'} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a3a52] group-hover:text-[#d4af37] transition-colors">
                      {item.title}
                    </h3>
                    {item.institution && (
                      <p className="text-sm text-gray-400 mt-0.5">{item.institution}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.year && <span className="text-xs text-[#d4af37] font-medium bg-[#d4af37]/10 px-3 py-1 rounded-full">{item.year}</span>}
                  <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 ml-14">
                      {item.description && (
                        <p className="text-gray-500 leading-relaxed">{item.description}</p>
                      )}
                      {!item.description && (
                        <p className="text-gray-400 italic text-sm">{item.title}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationV3;
