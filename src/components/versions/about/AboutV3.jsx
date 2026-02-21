import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const AboutV3 = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 border border-[#d4af37]/10 rounded-full" />
      <div className="absolute top-24 right-24 w-64 h-64 border border-[#1a3a52]/5 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top banner with image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-16 h-[300px] md:h-[350px]"
        >
          <img
            src="https://i.postimg.cc/nL50Zjjc/tamar9.jpg"
            alt={t.about.heading}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52] via-[#1a3a52]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <span className="text-[#d4af37] font-bold tracking-widest uppercase text-sm">{t.about.subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
              {t.about.heading}
            </h2>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left: Main description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t.about.description}
            </p>

            <div className="bg-[#1a3a52] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-[#1a3a52]">TG</span>
                </div>
                <div>
                  <h4 className="font-bold">{t.about.name || 'თამარ გეგიაძე'}</h4>
                  <p className="text-white/60 text-sm">{t.about.title || 'ადვოკატი / იურისტი'}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {t.about.quote || t.about.description?.slice(0, 200)}
              </p>
            </div>
          </motion.div>

          {/* Right: Highlights as timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {Array.isArray(t.about.highlights) && (
              <div className="space-y-6">
                {t.about.highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex gap-4 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37] transition-colors duration-300 shrink-0">
                        <CheckCircle2 size={18} className="text-[#d4af37] group-hover:text-white transition-colors" />
                      </div>
                      {i < t.about.highlights.length - 1 && (
                        <div className="w-px flex-1 bg-[#d4af37]/20 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!Array.isArray(t.about.highlights) && (
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <p className="text-gray-600 leading-relaxed">{t.about.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutV3;
