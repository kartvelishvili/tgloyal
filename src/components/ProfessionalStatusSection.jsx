
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import useLanguage from '../hooks/useLanguage';

const ProfessionalStatusSection = () => {
  const { t, language } = useLanguage();

  // Handle manual text overrides for Task 2
  const getRoleText = () => {
    if (language === 'ka') {
      return "საქართველოს ადვოკატთა ასოციაციის საემიგრაციო კომიტეტის ხელმძღვანელი";
    }
    return t.professionalStatus.role;
  };

  const getYearText = () => {
    return t.professionalStatus.year.replace(/2025/g, '2026');
  };

  return (
    <section className="section-padding bg-[#f5f5f5]">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://i.postimg.cc/fbkB6jLJ/tamar6.jpg"
              alt="Professional Status"
              className="w-full rounded-lg shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#d4af37] to-[#c49a2f] p-8 md:p-12 rounded-lg shadow-2xl border-4 border-white"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-white p-3 rounded-full">
                <Award className="text-[#1a3a52]" size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {t.professionalStatus.title}
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed">
              {getRoleText()}
            </p>
            <p className="text-white/90 text-lg mt-4">{getYearText()}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalStatusSection;
