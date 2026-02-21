import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Scale, FileText, Building2, Gavel, ShieldCheck } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const iconMap = [Briefcase, Scale, FileText, Building2, Gavel, ShieldCheck];

const ExperienceV2 = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-24 bg-[#1a3a52] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.experience.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t.experience.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {t.experience.items?.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="flex items-start gap-5 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#d4af37]/30 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#a08520] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#d4af37]/20 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#d4af37] transition-colors">
                    {item.title || item}
                  </h3>
                  {item.description && (
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  )}
                  {item.period && (
                    <span className="inline-block mt-2 text-xs text-[#d4af37]/70 font-medium">{item.period}</span>
                  )}
                </div>
                {/* Progress indicator */}
                <div className="hidden sm:flex flex-col items-center gap-1 pt-2">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                  <div className="w-px h-8 bg-[#d4af37]/30" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceV2;
