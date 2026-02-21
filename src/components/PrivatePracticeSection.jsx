
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import useLanguage from '../hooks/useLanguage';

const PrivatePracticeSection = () => {
  const { t } = useLanguage();
  const services = t.privatePractice.services;

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 hidden lg:block">
        <img
          src="https://i.postimg.cc/tg72LtTJ/tamar5.jpg"
          alt="Private Practice"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a52] text-center mb-4"
        >
          {t.privatePractice.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-xl text-gray-600 mb-16"
        >
          {t.privatePractice.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#1a3a52] to-[#2d5a7b] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#d4af37] flex-shrink-0 mt-1" size={24} />
                <p className="text-white text-lg font-medium">{service}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivatePracticeSection;
