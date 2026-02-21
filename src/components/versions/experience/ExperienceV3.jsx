import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Scale, FileText, Building2, Gavel, ShieldCheck } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const iconMap = [Briefcase, Scale, FileText, Building2, Gavel, ShieldCheck];
const colorMap = ['#d4af37', '#2c7a7b', '#c53030', '#2b6cb0', '#6b46c1', '#d69e2e'];

const ExperienceV3 = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-24 bg-[#fafafa] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.experience.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52] mt-3">{t.experience.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        {/* Masonry-like grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 max-w-6xl mx-auto">
          {t.experience.items?.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            const color = colorMap[index % colorMap.length];
            const isLarge = index % 3 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`break-inside-avoid mb-5 bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 group ${isLarge ? 'pb-8' : ''}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {item.tags?.map((tag, ti) => (
                      <span key={ti} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>

                <h3 className="text-[#1a3a52] font-bold mb-2 group-hover:text-[#d4af37] transition-colors">
                  {item.title || item}
                </h3>

                {item.description && (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.period && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400 font-medium">{item.period}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceV3;
