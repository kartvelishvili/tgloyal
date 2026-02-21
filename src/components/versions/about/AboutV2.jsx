import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Users } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const AboutV2 = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Briefcase, value: '15+', label: t.about.stats?.[0] || 'წლის გამოცდილება' },
    { icon: Users, value: '500+', label: t.about.stats?.[1] || 'კლიენტი' },
    { icon: Award, value: '98%', label: t.about.stats?.[2] || 'წარმატების მაჩვენებელი' },
  ];

  return (
    <section id="about" className="py-24 bg-[#1a3a52] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4af37]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: Image with card overlay */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative">
              <img
                src="https://i.postimg.cc/nL50Zjjc/tamar9.jpg"
                alt={t.about.heading}
                className="rounded-2xl w-full h-[400px] object-cover shadow-2xl"
              />
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl p-5 shadow-2xl"
              >
                <div className="text-3xl font-bold text-[#1a3a52]">15+</div>
                <div className="text-sm text-gray-500 mt-1">{t.about.stats?.[0] || 'წლის გამოცდილება'}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.about.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6 leading-tight">
              {t.about.heading}
            </h2>
            <div className="w-16 h-1 bg-[#d4af37] mb-8" />

            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {t.about.description}
            </p>

            {Array.isArray(t.about.highlights) && (
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {t.about.highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="w-2 h-2 mt-2 bg-[#d4af37] rounded-full shrink-0" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon size={24} className="text-[#d4af37] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutV2;
