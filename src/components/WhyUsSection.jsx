
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, User, Globe, Target } from 'lucide-react';
import useLanguage from '../hooks/useLanguage';

const WhyUsSection = () => {
  const { t } = useLanguage();
  
  const icons = [TrendingUp, Heart, User, Globe, Target];
  const features = t.whyUs.features.map((item, index) => ({
    ...item,
    icon: icons[index]
  }));

  return (
    <section className="section-padding bg-[#1a3a52] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://i.postimg.cc/vmD3pLBB/tamar7.jpg"
          alt="Why Us"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16"
        >
          {t.whyUs.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
            >
              <div className="bg-[#d4af37] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <feature.icon className="text-[#1a3a52]" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#d4af37] text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-white/80 text-center leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
