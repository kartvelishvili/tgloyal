import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scale } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const HeroV2 = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="min-h-screen bg-white relative overflow-hidden flex items-center">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a3a52 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 pt-24 lg:pt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a3a52]/5 rounded-full mb-6"
            >
              <Scale size={14} className="text-[#d4af37]" />
              <span className="text-[#1a3a52] text-sm font-medium">{t.hero.subtitle}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3a52] leading-tight mb-6"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#1a3a52] text-white font-semibold rounded-xl hover:bg-[#234e68] transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-[#1a3a52]/20"
              >
                {t.hero.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-[#1a3a52]/20 text-[#1a3a52] font-semibold rounded-xl hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300"
              >
                {t.hero.learnMore}
              </button>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-8 mt-12 pt-8 border-t border-gray-100"
            >
              {[
                { number: '15+', label: t.hero.stats?.[0] || 'წლის გამოცდილება' },
                { number: '500+', label: t.hero.stats?.[1] || 'წარმატებული საქმე' },
                { number: '98%', label: t.hero.stats?.[2] || 'კმაყოფილი კლიენტი' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-[#d4af37]">{stat.number}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative pt-24 lg:pt-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#d4af37]/20 to-[#1a3a52]/20 rounded-3xl blur-2xl" />
              <img
                src="https://i.postimg.cc/nL50Zjjc/tamar9.jpg"
                alt={t.hero.title}
                className="relative rounded-2xl w-full h-[500px] lg:h-[600px] object-cover shadow-2xl"
              />
              {/* Decorative gold accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#d4af37] rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-4 border-[#1a3a52] rounded-xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroV2;
