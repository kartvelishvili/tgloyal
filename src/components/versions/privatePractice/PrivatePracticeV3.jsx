import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const PrivatePracticeV3 = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const services = t.privatePractice.services || [];

  return (
    <section id="services" className="py-24 bg-[#1a3a52] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(30deg, #d4af37 12%, transparent 12.5%, transparent 87%, #d4af37 87.5%, #d4af37), linear-gradient(150deg, #d4af37 12%, transparent 12.5%, transparent 87%, #d4af37 87.5%, #d4af37)', backgroundSize: '80px 140px', backgroundPosition: '0 0, 40px 70px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.privatePractice.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t.privatePractice.heading}</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left: Tab list */}
          <div className="space-y-2">
            {services.map((service, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 rounded-xl flex items-center justify-between group transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-[#d4af37] text-[#1a3a52] shadow-lg shadow-[#d4af37]/20'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className={activeTab === index ? 'text-[#1a3a52]' : 'text-[#d4af37]/50'} />
                  <span className="font-medium text-sm">{service.title || service}</span>
                </div>
                <ChevronRight size={16} className={`transition-transform ${activeTab === index ? 'translate-x-1' : ''}`} />
              </motion.button>
            ))}
          </div>

          {/* Right: Detail panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {services[activeTab] && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 min-h-[300px]"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {services[activeTab].title || services[activeTab]}
                      </h3>
                      <span className="text-[#d4af37]/70 text-sm">{t.privatePractice.subtitle}</span>
                    </div>
                  </div>

                  <p className="text-white/60 leading-relaxed text-lg">
                    {services[activeTab].description || (typeof services[activeTab] === 'string' ? services[activeTab] : 'დეტალური ინფორმაცია მალე დაემატება.')}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <button
                      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-6 py-3 bg-[#d4af37] text-white font-bold rounded-xl hover:bg-[#b5952f] transition-colors"
                    >
                      {t.privatePractice.cta || t.hero.cta || 'დაგვიკავშირდით'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivatePracticeV3;
