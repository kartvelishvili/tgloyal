
import React from 'react';
import { motion } from 'framer-motion';
import useLanguage from '../hooks/useLanguage';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
      aria-label="Toggle Language"
    >
      <div className="relative w-6 h-6 overflow-hidden rounded-full border border-white/30">
        {language === 'ka' ? (
          <img 
            src="https://flagcdn.com/w40/ge.png" 
            alt="Georgian" 
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src="https://flagcdn.com/w40/gb.png" 
            alt="English" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <span className="text-white text-sm font-medium uppercase tracking-wider">
        {language === 'ka' ? 'GEO' : 'ENG'}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
