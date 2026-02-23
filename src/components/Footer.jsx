
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Linkedin, Instagram, Youtube, Mail, Phone, Globe, Send, Share2, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import useLanguage from '../hooks/useLanguage';

const ICON_MAP = { Facebook, Linkedin, Instagram, Youtube, Mail, Phone, Globe, Send, Share2, MessageSquare };
const DEFAULT_SOCIAL_LINKS = [
  { id: 'default-1', type: 'facebook', label: 'Facebook', url: '', icon: 'Facebook', sort_order: 1, visible: true },
  { id: 'default-2', type: 'linkedin', label: 'LinkedIn', url: '', icon: 'Linkedin', sort_order: 2, visible: true },
  { id: 'default-3', type: 'email', label: 'Email', url: '', icon: 'Mail', sort_order: 3, visible: true },
];

const Footer = () => {
  const { t } = useLanguage();
  const [socialLinks, setSocialLinks] = useState(DEFAULT_SOCIAL_LINKS);
  const [footerHtml, setFooterHtml] = useState('');

  useEffect(() => {
    const handleLinksUpdate = (e) => setSocialLinks(e.detail);
    const handleHtmlUpdate = (e) => setFooterHtml(e.detail);
    window.addEventListener('social-links-updated', handleLinksUpdate);
    window.addEventListener('footer-html-updated', handleHtmlUpdate);
    return () => {
      window.removeEventListener('social-links-updated', handleLinksUpdate);
      window.removeEventListener('footer-html-updated', handleHtmlUpdate);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadFooterData = async () => {
      try {
        const { data: linksData, error: linksError } = await supabase
          .from('social_links')
          .select('*')
          .order('sort_order');
        if (!linksError && linksData && isMounted) {
          setSocialLinks(linksData);
        }
      } catch {}

      try {
        const { data: htmlData, error: htmlError } = await supabase
          .from('footer_custom_html')
          .select('*')
          .eq('id', 1)
          .single();
        if (!htmlError && htmlData && isMounted) {
          setFooterHtml(htmlData.html_content || '');
        }
      } catch {}
    };

    loadFooterData();
    return () => { isMounted = false; };
  }, []);

  const visibleLinks = socialLinks.filter(l => l.visible !== false).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <footer className="bg-[#1a3a52] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://i.postimg.cc/nL50Zjjc/tamar9.jpg"
          alt="Footer Decorative"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-[#d4af37] mb-4">{t.footer.name}</h3>
            <p className="text-white/80 leading-relaxed">
              {t.footer.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block text-lg font-semibold text-white mb-4">{t.footer.quickLinks}</span>
            <nav className="space-y-2">
              <button onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })} className="block text-white/70 hover:text-[#d4af37] transition-colors duration-300">{t.nav.home}</button>
              <button onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })} className="block text-white/70 hover:text-[#d4af37] transition-colors duration-300">{t.nav.about}</button>
              <button onClick={() => document.querySelector('#education')?.scrollIntoView({ behavior: 'smooth' })} className="block text-white/70 hover:text-[#d4af37] transition-colors duration-300">{t.nav.education}</button>
              <button onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })} className="block text-white/70 hover:text-[#d4af37] transition-colors duration-300">{t.nav.experience}</button>
              <button onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })} className="block text-white/70 hover:text-[#d4af37] transition-colors duration-300">{t.nav.services}</button>
              <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="block text-white/70 hover:text-[#d4af37] transition-colors duration-300">{t.nav.contact}</button>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block text-lg font-semibold text-white mb-4">{t.footer.followUs}</span>
            <div className="flex gap-4 flex-wrap">
              {visibleLinks.map((link) => {
                const IconComponent = ICON_MAP[link.icon] || Globe;
                const hasUrl = link.url && link.url.trim().length > 0;
                const isMailto = hasUrl && link.url.startsWith('mailto:');

                return hasUrl ? (
                  <a key={link.id} href={link.url} target={isMailto ? undefined : '_blank'} rel="noopener noreferrer"
                    title={link.label}
                    className="bg-white/10 p-3 rounded-full hover:bg-[#d4af37] transition-all duration-300 group">
                    <IconComponent className="text-white group-hover:text-[#1a3a52]" size={20} />
                  </a>
                ) : (
                  <button key={link.id} title={link.label}
                    className="bg-white/10 p-3 rounded-full hover:bg-[#d4af37] transition-all duration-300 group">
                    <IconComponent className="text-white group-hover:text-[#1a3a52]" size={20} />
                  </button>
                );
              })}
            </div>
            {footerHtml && (
              <div className="mt-4" dangerouslySetInnerHTML={{ __html: footerHtml }} />
            )}
          </motion.div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              {t.footer.rights}
            </p>
            <a 
              href="https://smarketer.ge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://i.postimg.cc/8z5hCcGp/smarketer-white.webp" 
                alt="Smarketer.ge" 
                className="h-6 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
