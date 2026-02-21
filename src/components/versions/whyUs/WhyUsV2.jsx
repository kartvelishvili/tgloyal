import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Clock, Award, Gem, Scale } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const iconMap = [Shield, Users, Clock, Award, Gem, Scale];

const WhyUsV2 = () => {
  const { t } = useLanguage();

  return (
    <section id="whyUs" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.whyUs.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52] mt-3">{t.whyUs.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {t.whyUs.features?.map((feature, index) => {
            const Icon = iconMap[index % iconMap.length];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`flex items-center gap-8 ${isEven ? '' : 'flex-row-reverse'}`}
              >
                {/* Number + Icon */}
                <div className="relative shrink-0 hidden md:block">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1a3a52] to-[#0d1f2d] flex items-center justify-center shadow-xl">
                    <Icon size={32} className="text-[#d4af37]" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#d4af37] rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${isEven ? '' : 'text-right'}`}>
                  <div className="flex items-center gap-3 md:hidden mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1a3a52] flex items-center justify-center">
                      <Icon size={18} className="text-[#d4af37]" />
                    </div>
                    <span className="text-xs font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded">#{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3a52] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsV2;
