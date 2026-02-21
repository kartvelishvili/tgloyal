
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import useLanguage from '../hooks/useLanguage';

const EducationSection = () => {
  const { t } = useLanguage();
  const education = t.education.items;

  return (
    <section id="education" className="section-padding bg-[#1a3a52] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://i.postimg.cc/HLjBf4xW/tamar3.jpg"
          alt="Education"
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
          {t.education.title}
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border-l-4 border-[#d4af37] p-6 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#d4af37] p-3 rounded-full flex-shrink-0">
                  <GraduationCap className="text-[#1a3a52]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#d4af37] mb-2">{item.title}</h3>
                  <p className="text-white/90 mb-2">{item.institution}</p>
                  <p className="text-white/70 text-sm">{item.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
