
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Shield, Users, Scale, Globe } from 'lucide-react';
import useLanguage from '../hooks/useLanguage';

const ExperienceSection = () => {
  const { t } = useLanguage();
  
  const icons = [Shield, Users, Scale, Briefcase, Shield, Globe];
  const experiences = t.experience.items.map((item, index) => ({
    ...item,
    icon: icons[index]
  }));

  return (
    <section id="experience" className="section-padding bg-[#f5f5f5]">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a52] text-center mb-4"
        >
          {t.experience.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-600 mb-16 text-lg"
        >
          {t.experience.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://i.postimg.cc/6QTYDL3B/tamar4.jpg"
              alt="Professional Experience"
              className="w-full rounded-lg shadow-xl"
            />
          </motion.div>

          <div className="grid gap-4">
            {experiences.slice(0, 3).map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#d4af37]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#1a3a52] p-3 rounded-full flex-shrink-0">
                    <exp.icon className="text-[#d4af37]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a3a52] mb-1">{exp.title}</h3>
                    <p className="text-gray-600 text-sm">{exp.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {experiences.slice(3).map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#d4af37]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#1a3a52] p-3 rounded-full mb-4">
                  <exp.icon className="text-[#d4af37]" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#1a3a52] mb-2">{exp.title}</h3>
                <p className="text-gray-600 text-sm">{exp.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
