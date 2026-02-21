import React from 'react';
import { motion } from 'framer-motion';
import { Award, BadgeCheck, Star, Medal } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const ProfessionalStatusV2 = () => {
  const { t } = useLanguage();

  const badges = [
    { icon: Award, color: '#d4af37' },
    { icon: BadgeCheck, color: '#2c7a7b' },
    { icon: Star, color: '#d69e2e' },
    { icon: Medal, color: '#c53030' },
  ];

  return (
    <section id="professional-status" className="py-24 bg-gradient-to-b from-[#0f1923] to-[#1a3a52] relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#d4af37]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.professionalStatus.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t.professionalStatus.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        {/* Central image with badges around */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {badges.slice(0, 2).map((badge, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex items-center gap-4 hover:border-[#d4af37]/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${badge.color}20` }}>
                    <badge.icon size={22} style={{ color: badge.color }} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.professionalStatus.items?.[i]?.title || t.professionalStatus.title || 'სტატუსი'}</div>
                    <div className="text-white/40 text-xs">{t.professionalStatus.items?.[i]?.description || ''}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] to-[#a08520] rounded-full blur-2xl opacity-20" />
                <img
                  src="https://i.postimg.cc/nL50Zjjc/tamar9.jpg"
                  alt={t.professionalStatus.heading}
                  className="relative w-full h-full rounded-full object-cover border-4 border-[#d4af37]/30"
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg">
                  <Award size={20} className="text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {badges.slice(2, 4).map((badge, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex items-center gap-4 hover:border-[#d4af37]/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${badge.color}20` }}>
                    <badge.icon size={22} style={{ color: badge.color }} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.professionalStatus.items?.[i + 2]?.title || t.professionalStatus.title || 'სტატუსი'}</div>
                    <div className="text-white/40 text-xs">{t.professionalStatus.items?.[i + 2]?.description || ''}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
              {t.professionalStatus.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalStatusV2;
