
import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-3 md:gap-4 group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon Container */}
      <div className="relative">
        <motion.div
          className="bg-[#1a3a52] border border-[#d4af37]/50 p-2.5 rounded-xl shadow-lg relative z-10 overflow-hidden"
          whileHover={{ 
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
            borderColor: "rgba(212, 175, 55, 0.8)" 
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Minimalist Themis/Scales SVG */}
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 md:w-10 md:h-10 text-[#d4af37]"
          >
            {/* Central Sword/Pillar - representing Justice/Themis */}
            <path 
              d="M32 4V60" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            
            {/* Balance Beam */}
            <path 
              d="M10 16H54" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            
            {/* Left Scale Pan */}
            <path 
              d="M10 16L18 36H2L10 16Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path 
              d="M2 36C2 40.4183 5.58172 44 10 44C14.4183 44 18 40.4183 18 36" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Right Scale Pan */}
            <path 
              d="M54 16L62 36H46L54 16Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path 
              d="M46 36C46 40.4183 49.5817 44 54 44C58.4183 44 62 40.4183 62 36" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Center Fulcrum Detail */}
            <circle cx="32" cy="16" r="3" fill="#1a3a52" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#d4af37] opacity-20 blur-xl rounded-full -z-10 group-hover:opacity-40 transition-opacity duration-300 transform scale-150"></div>
      </div>
      
      {/* Bilingual Text Block */}
      <div className="flex flex-col justify-center">
        <span className="text-white font-bold text-sm md:text-lg leading-tight tracking-wide font-sans">
          თ.გ. იურიდიული
        </span>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37]/50 to-transparent my-0.5"></div>
        <span className="text-[#d4af37] font-medium text-[0.65rem] md:text-sm tracking-[0.15em] uppercase leading-tight font-sans">
          TG Legal
        </span>
      </div>
    </motion.div>
  );
};

export default Logo;
