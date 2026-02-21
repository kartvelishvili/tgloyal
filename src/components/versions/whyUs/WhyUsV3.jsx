import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Clock, Award, Gem, Scale } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const iconMap = [Shield, Users, Clock, Award, Gem, Scale];

const WhyUsV3 = () => {
  const { t } = useLanguage();

  return (
    <section id="whyUs" className="py-24 bg-gradient-to-br from-[#f8f4e8] to-[#ede4d6] relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#d4af37]/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#d4af37]/5 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.whyUs.features?.map((feature, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-center group"
              >
                {/* Icon circle */}
                <div className="relative mx-auto mb-5 w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 rounded-full blur-lg group-hover:blur-xl transition-all" />
                  <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#d4af37]/20 group-hover:border-[#d4af37] transition-colors duration-300">
                    <Icon size={28} className="text-[#1a3a52] group-hover:text-[#d4af37] transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1a3a52] mb-3 group-hover:text-[#d4af37] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm max-w-xs mx-auto">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsV3;
