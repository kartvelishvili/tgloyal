import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations as defaultTranslations } from '@/lib/translations';
import DesignManager from '@/components/admin/DesignManager';
import { supabase } from '@/lib/customSupabaseClient';
import {
  Eye, EyeOff, LogOut, Save, ChevronDown, ChevronRight, Globe, RotateCcw,
  Search, Check, X, Users, FileText, Mail, Phone, Clock, Trash2,
  UserPlus, Shield, LayoutDashboard, MessageSquare, User, ChevronLeft, Palette,
  Facebook, Linkedin, Instagram, Youtube, Send, Share2, Plus, Link2,
  ArrowUp, ArrowDown, Code2
} from 'lucide-react';

/* ═══════════════════════════════════════════
   Constants & Utilities
   ═══════════════════════════════════════════ */
const STORAGE_KEY = 'tglegal_admin_session';
const TRANSLATIONS_STORAGE_KEY = 'tglegal_translations_override';
const ADMINS_STORAGE_KEY = 'tglegal_admins';
const LEADS_STORAGE_KEY = 'tglegal_leads';
const SOCIAL_LINKS_STORAGE_KEY = 'tglegal_social_links';
const FOOTER_HTML_STORAGE_KEY = 'tglegal_footer_html';

const DEFAULT_ADMIN = { email: 'qartvela.ge@gmial.com', password: 'Qartvela2786', name: 'მთავარი ადმინი', role: 'super', createdAt: Date.now() };

const DEFAULT_SOCIAL_LINKS = [
  { id: 'default-1', type: 'facebook', label: 'Facebook', url: '', icon: 'Facebook', sort_order: 1, visible: true },
  { id: 'default-2', type: 'linkedin', label: 'LinkedIn', url: '', icon: 'Linkedin', sort_order: 2, visible: true },
  { id: 'default-3', type: 'email', label: 'Email', url: '', icon: 'Mail', sort_order: 3, visible: true },
];

const ICON_OPTIONS = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Linkedin', label: 'LinkedIn' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Youtube', label: 'YouTube' },
  { value: 'Mail', label: 'Email' },
  { value: 'Phone', label: 'ტელეფონი' },
  { value: 'Globe', label: 'ვებსაიტი' },
  { value: 'Send', label: 'Telegram' },
  { value: 'Share2', label: 'გაზიარება' },
  { value: 'MessageSquare', label: 'შეტყობინება' },
];

const ICON_COMPONENTS = { Facebook, Linkedin, Instagram, Youtube, Mail, Phone, Globe, Send, Share2, MessageSquare };

function getAdmins() {
  try {
    const saved = localStorage.getItem(ADMINS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  const initial = [DEFAULT_ADMIN];
  localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveAdmins(admins) {
  localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(admins));
}

function getLeads() {
  try {
    const saved = localStorage.getItem(LEADS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function saveLeads(leads) {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
}

function getSocialLinks() {
  try {
    const saved = localStorage.getItem(SOCIAL_LINKS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return DEFAULT_SOCIAL_LINKS;
}

function saveSocialLinksLocal(links) {
  localStorage.setItem(SOCIAL_LINKS_STORAGE_KEY, JSON.stringify(links));
  window.dispatchEvent(new CustomEvent('social-links-updated', { detail: links }));
}

function getFooterHtml() {
  try { return localStorage.getItem(FOOTER_HTML_STORAGE_KEY) || ''; } catch { return ''; }
}

function saveFooterHtmlLocal(html) {
  localStorage.setItem(FOOTER_HTML_STORAGE_KEY, html);
  window.dispatchEvent(new CustomEvent('footer-html-updated', { detail: html }));
}

const SECTION_LABELS = {
  nav: { ka: 'ნავიგაცია', en: 'Navigation', icon: '🧭' },
  hero: { ka: 'მთავარი სექცია', en: 'Hero Section', icon: '🏠' },
  about: { ka: 'ჩვენს შესახებ', en: 'About Us', icon: '📋' },
  education: { ka: 'განათლება', en: 'Education', icon: '🎓' },
  experience: { ka: 'გამოცდილება', en: 'Experience', icon: '💼' },
  privatePractice: { ka: 'კერძო პრაქტიკა', en: 'Private Practice', icon: '⚖️' },
  professionalStatus: { ka: 'პროფესიული სტატუსი', en: 'Professional Status', icon: '🏅' },
  whyUs: { ka: 'რატომ ჩვენ', en: 'Why Us', icon: '⭐' },
  contact: { ka: 'კონტაქტი', en: 'Contact', icon: '📞' },
  footer: { ka: 'ფუტერი', en: 'Footer', icon: '📑' },
  seo: { ka: 'SEO', en: 'SEO', icon: '🔍' },
};

function deepMerge(target, source) {
  const output = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

function setNestedValue(obj, path, value) {
  const result = JSON.parse(JSON.stringify(obj));
  let current = result;
  for (let i = 0; i < path.length - 1; i++) {
    if (current[path[i]] === undefined) current[path[i]] = {};
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
  return result;
}

/* ═══════════════════════════════════════════
   LOGIN SCREEN
   ═══════════════════════════════════════════ */
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Try Supabase first
    try {
      const { data, error: sbError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (!sbError && data) {
        const session = { email: data.email, name: data.name, role: data.role, loginTime: Date.now(), token: btoa(`${email}:${Date.now()}`), source: 'supabase' };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        onLogin(session);
        setLoading(false);
        return;
      }
    } catch {}

    // Fallback to localStorage
    const admins = getAdmins();
    const admin = admins.find(a => a.email === email && a.password === password);
    if (admin) {
      const session = { email: admin.email, name: admin.name, role: admin.role, loginTime: Date.now(), token: btoa(`${email}:${Date.now()}`), source: 'local' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      onLogin(session);
    } else {
      setError('არასწორი ელფოსტა ან პაროლი');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/5 via-transparent to-transparent" />
      <div className="relative bg-[#0a0a0a] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-[#1a1a1a]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#a08520] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#d4af37]/20">
            <Shield className="text-black" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">ადმინ პანელი</h1>
          <p className="text-[#555] text-sm mt-1">შედით სისტემაში</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#666] text-xs font-medium mb-1.5 uppercase tracking-wider">ელფოსტა</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-[#1a1a1a] rounded-xl text-white placeholder-[#333] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/30 transition text-sm"
              placeholder="admin@example.com" required />
          </div>
          <div>
            <label className="block text-[#666] text-xs font-medium mb-1.5 uppercase tracking-wider">პაროლი</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#111] border border-[#1a1a1a] rounded-xl text-white placeholder-[#333] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/30 transition pr-12 text-sm"
                placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-white transition">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs text-center">{error}</div>}
          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-[#a08520] hover:from-[#e0bc42] hover:to-[#b8962e] text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 text-sm shadow-lg shadow-[#d4af37]/10">
            {loading ? 'იტვირთება...' : 'შესვლა'}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   FIELD EDITORS
   ═══════════════════════════════════════════ */
const inputClass = 'w-full px-3 py-2.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white/90 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/20 transition resize-none';

const FieldEditor = ({ label, valueKa, valueEn, onChangeKa, onChangeEn, multiline = false }) => {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="mb-3 p-4 bg-[#0d0d0d] rounded-xl border border-[#161616] hover:border-[#222] transition-colors">
      <div className="text-[10px] text-[#444] font-medium uppercase tracking-widest mb-3">{label}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <label className="flex items-center gap-1.5 text-[10px] text-[#555] mb-1.5">
            <span className="inline-flex items-center justify-center w-5 h-4 rounded bg-red-950/60 text-red-400/80 text-[9px] font-bold">KA</span>
          </label>
          <Tag value={valueKa || ''} onChange={(e) => onChangeKa(e.target.value)} className={inputClass} rows={multiline ? 3 : undefined} />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[10px] text-[#555] mb-1.5">
            <span className="inline-flex items-center justify-center w-5 h-4 rounded bg-blue-950/60 text-blue-400/80 text-[9px] font-bold">EN</span>
          </label>
          <Tag value={valueEn || ''} onChange={(e) => onChangeEn(e.target.value)} className={inputClass} rows={multiline ? 3 : undefined} />
        </div>
      </div>
    </div>
  );
};

const ArrayItemEditor = ({ index, fields, valuesKa, valuesEn, onChangeKa, onChangeEn }) => (
  <div className="p-4 bg-[#0d0d0d] rounded-xl border border-[#161616] mb-2 hover:border-[#222] transition-colors">
    <div className="text-[10px] text-[#d4af37]/70 font-bold mb-3 flex items-center gap-2">
      <span className="w-5 h-5 rounded-md bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-[10px]">{index + 1}</span>
    </div>
    {fields.map((field) => (
      <div key={field} className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
        <div>
          <label className="flex items-center gap-1.5 text-[10px] text-[#555] mb-1">
            <span className="inline-flex items-center justify-center w-5 h-4 rounded bg-red-950/60 text-red-400/80 text-[9px] font-bold">KA</span>
            <span className="text-[#444]">{field}</span>
          </label>
          <input value={(valuesKa && valuesKa[field]) || ''} onChange={(e) => onChangeKa(field, e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[10px] text-[#555] mb-1">
            <span className="inline-flex items-center justify-center w-5 h-4 rounded bg-blue-950/60 text-blue-400/80 text-[9px] font-bold">EN</span>
            <span className="text-[#444]">{field}</span>
          </label>
          <input value={(valuesEn && valuesEn[field]) || ''} onChange={(e) => onChangeEn(field, e.target.value)} className={inputClass} />
        </div>
      </div>
    ))}
  </div>
);

const StringArrayEditor = ({ label, valuesKa, valuesEn, onChangeKa, onChangeEn }) => {
  const maxLen = Math.max((valuesKa || []).length, (valuesEn || []).length);
  return (
    <div className="p-4 bg-[#0d0d0d] rounded-xl border border-[#161616] mb-2 hover:border-[#222] transition-colors">
      <div className="text-[10px] text-[#444] font-medium uppercase tracking-widest mb-3">{label}</div>
      {Array.from({ length: maxLen }).map((_, i) => (
        <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-2">
          <div>
            <label className="text-[10px] text-[#555] mb-1 flex items-center gap-1">
              <span className="inline-flex items-center justify-center w-5 h-4 rounded bg-red-950/60 text-red-400/80 text-[9px] font-bold">KA</span> #{i + 1}
            </label>
            <input value={(valuesKa && valuesKa[i]) || ''} onChange={(e) => onChangeKa(i, e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-[10px] text-[#555] mb-1 flex items-center gap-1">
              <span className="inline-flex items-center justify-center w-5 h-4 rounded bg-blue-950/60 text-blue-400/80 text-[9px] font-bold">EN</span> #{i + 1}
            </label>
            <input value={(valuesEn && valuesEn[i]) || ''} onChange={(e) => onChangeEn(i, e.target.value)} className={inputClass} />
          </div>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════
   SECTION EDITOR ACCORDION
   ═══════════════════════════════════════════ */
const SectionEditor = ({ sectionKey, editedTranslations, setEditedTranslations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const kaSection = editedTranslations.ka[sectionKey];
  const enSection = editedTranslations.en[sectionKey];
  const meta = SECTION_LABELS[sectionKey];

  const updateField = (lang, path, value) => {
    setEditedTranslations((prev) => setNestedValue(prev, [lang, sectionKey, ...path], value));
  };

  const renderFields = (kaObj, enObj, parentPath = []) => {
    if (!kaObj && !enObj) return null;
    const obj = kaObj || enObj;
    return Object.keys(obj).map((key) => {
      const kaVal = kaObj ? kaObj[key] : undefined;
      const enVal = enObj ? enObj[key] : undefined;
      const currentPath = [...parentPath, key];

      if (typeof kaVal === 'string' || typeof enVal === 'string') {
        const isLong = (kaVal && kaVal.length > 80) || (enVal && enVal.length > 80);
        return <FieldEditor key={currentPath.join('.')} label={currentPath.join(' › ')} valueKa={kaVal} valueEn={enVal}
          onChangeKa={(v) => updateField('ka', currentPath, v)} onChangeEn={(v) => updateField('en', currentPath, v)} multiline={isLong} />;
      }
      if (Array.isArray(kaVal) && kaVal.length > 0 && typeof kaVal[0] === 'object') {
        const fields = Object.keys(kaVal[0]);
        return (
          <div key={currentPath.join('.')} className="mb-3">
            <div className="text-[11px] text-[#555] font-medium mb-2 uppercase tracking-wider">{currentPath.join(' › ')}</div>
            {kaVal.map((_, idx) => (
              <ArrayItemEditor key={idx} index={idx} fields={fields} valuesKa={kaVal[idx]} valuesEn={enVal ? enVal[idx] : {}}
                onChangeKa={(f, v) => { const a = [...kaVal]; a[idx] = { ...a[idx], [f]: v }; updateField('ka', currentPath, a); }}
                onChangeEn={(f, v) => { const a = enVal ? [...enVal] : []; a[idx] = { ...(a[idx] || {}), [f]: v }; updateField('en', currentPath, a); }} />
            ))}
          </div>
        );
      }
      if (Array.isArray(kaVal) && kaVal.length > 0 && typeof kaVal[0] === 'string') {
        return <StringArrayEditor key={currentPath.join('.')} label={currentPath.join(' › ')} valuesKa={kaVal} valuesEn={enVal}
          onChangeKa={(idx, v) => { const a = [...kaVal]; a[idx] = v; updateField('ka', currentPath, a); }}
          onChangeEn={(idx, v) => { const a = enVal ? [...enVal] : []; a[idx] = v; updateField('en', currentPath, a); }} />;
      }
      if (typeof kaVal === 'object' && kaVal !== null && !Array.isArray(kaVal)) {
        return (
          <div key={currentPath.join('.')} className="mb-2">
            <div className="text-[11px] text-[#d4af37]/50 font-medium mb-2 pl-3 border-l-2 border-[#d4af37]/15">{key}</div>
            <div className="pl-3">{renderFields(kaVal, enVal, currentPath)}</div>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] mb-2 overflow-hidden hover:border-[#222] transition-colors">
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-[#111] transition group">
        <span className="text-white/80 font-medium text-sm group-hover:text-white transition flex items-center gap-2.5">
          {meta && <span className="text-base">{meta.icon}</span>}
          <span>{meta ? `${meta.ka} / ${meta.en}` : sectionKey}</span>
        </span>
        {isOpen ? <ChevronDown size={15} className="text-[#d4af37]" /> : <ChevronRight size={15} className="text-[#333]" />}
      </button>
      {isOpen && <div className="px-5 pb-5 border-t border-[#161616] pt-4">{renderFields(kaSection, enSection)}</div>}
    </div>
  );
};

/* ═══════════════════════════════════════════
   LEADS PANEL
   ═══════════════════════════════════════════ */
const LeadsPanel = () => {
  const [leads, setLeads] = useState(getLeads);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => setLeads(getLeads()), 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleRead = (id) => {
    const updated = leads.map(l => l.id === id ? { ...l, read: !l.read } : l);
    saveLeads(updated);
    setLeads(updated);
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, read: !selectedLead.read });
  };

  const deleteLead = (id) => {
    if (!window.confirm('წაშალოთ ეს შეტყობინება?')) return;
    const updated = leads.filter(l => l.id !== id);
    saveLeads(updated);
    setLeads(updated);
    if (selectedLead?.id === id) setSelectedLead(null);
  };

  const filteredLeads = filter === 'all' ? leads : filter === 'unread' ? leads.filter(l => !l.read) : leads.filter(l => l.read);
  const unreadCount = leads.filter(l => !l.read).length;

  const formatDate = (ts) => new Date(ts).toLocaleDateString('ka-GE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
          <MessageSquare size={20} className="text-[#d4af37]" />
          ლიდები / შეტყობინებები
          {unreadCount > 0 && <span className="px-2 py-0.5 bg-[#d4af37] text-black text-[10px] font-bold rounded-full">{unreadCount} ახალი</span>}
        </h2>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-5 bg-[#0e0e0e] p-1 rounded-xl border border-[#161616] w-fit">
        {[['all', `ყველა (${leads.length})`], ['unread', `ახალი (${unreadCount})`], ['read', 'წაკითხული']].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition ${filter === key ? 'bg-[#d4af37] text-black shadow-sm' : 'text-[#666] hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>

      {filteredLeads.length === 0 ? (
        <div className="flex-1 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#111] border border-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-[#333]" />
            </div>
            <p className="text-[#555] text-sm font-medium">შეტყობინებები არ არის</p>
            <p className="text-[#333] text-xs mt-1">საკონტაქტო ფორმადან გამოგზავნილი შეტყობინებები აქ გამოჩნდება</p>
          </div>
        </div>
      ) : selectedLead ? (
        /* Lead Detail */
        <div className="flex-1 flex flex-col">
          <button onClick={() => setSelectedLead(null)}
            className="flex items-center gap-1.5 text-[#666] hover:text-white text-xs mb-4 transition w-fit">
            <ChevronLeft size={14} /> უკან დაბრუნება
          </button>
          <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] overflow-hidden flex-1">
            {/* Header */}
            <div className="p-5 border-b border-[#161616] flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">{selectedLead.name}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-1.5 text-[#d4af37] text-xs hover:underline"><Mail size={12} />{selectedLead.email}</a>
                  {selectedLead.phone && <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-1.5 text-[#888] text-xs hover:text-white transition"><Phone size={12} />{selectedLead.phone}</a>}
                </div>
                <div className="flex items-center gap-1.5 text-[#444] text-xs mt-2"><Clock size={11} />{formatDate(selectedLead.createdAt)}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => toggleRead(selectedLead.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selectedLead.read ? 'bg-[#1a1a1a] text-[#888] hover:text-white' : 'bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20'}`}>
                  {selectedLead.read ? 'წაუკითხავად' : 'წაკითხულად'}
                </button>
                <button onClick={() => deleteLead(selectedLead.id)}
                  className="px-3 py-1.5 bg-red-500/10 text-red-400/80 rounded-lg text-xs font-medium hover:bg-red-500/20 hover:text-red-400 transition flex items-center gap-1">
                  <Trash2 size={12} /> წაშლა
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="p-5">
              <div className="bg-[#080808] rounded-xl p-5 border border-[#131313]">
                <p className="text-[#ccc] text-sm leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* List */
        <div className="flex-1 space-y-1.5">
          {filteredLeads.sort((a, b) => b.createdAt - a.createdAt).map((lead) => (
            <div key={lead.id}
              onClick={() => { setSelectedLead(lead); if (!lead.read) toggleRead(lead.id); }}
              className={`group p-4 rounded-xl border cursor-pointer transition-all ${
                lead.read
                  ? 'bg-[#0e0e0e] border-[#161616] hover:border-[#222]'
                  : 'bg-[#0e0e0e] border-l-2 border-l-[#d4af37] border-t-[#161616] border-r-[#161616] border-b-[#161616] hover:bg-[#111]'
              }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!lead.read && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0 animate-pulse" />}
                    <span className={`font-medium text-sm truncate ${lead.read ? 'text-[#888]' : 'text-white'}`}>{lead.name}</span>
                  </div>
                  <p className="text-[#555] text-xs mb-1">{lead.email}</p>
                  <p className="text-[#444] text-xs line-clamp-1">{lead.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-[#444] text-[10px] whitespace-nowrap">{formatDate(lead.createdAt)}</span>
                  <button onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}
                    className="text-[#222] hover:text-red-400 transition opacity-0 group-hover:opacity-100">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   ADMINS MANAGEMENT (Supabase + localStorage fallback)
   ═══════════════════════════════════════════ */
const AdminsPanel = ({ currentSession }) => {
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [dataSource, setDataSource] = useState('local');

  useEffect(() => { loadAdmins(); }, []);

  const loadAdmins = async () => {
    setLoadingAdmins(true);
    try {
      const { data, error: sbErr } = await supabase.from('admins').select('*').order('created_at');
      if (!sbErr && data) {
        setAdmins(data);
        setDataSource('supabase');
        // Sync to localStorage
        saveAdmins(data.map(a => ({ name: a.name, email: a.email, password: a.password, role: a.role, createdAt: new Date(a.created_at).getTime() })));
        setLoadingAdmins(false);
        return;
      }
    } catch {}
    // Fallback to localStorage
    const local = getAdmins();
    setAdmins(local.map(a => ({ ...a, id: a.email, created_at: a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString() })));
    setDataSource('local');
    setLoadingAdmins(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('ყველა ველი სავალდებულოა'); return; }
    if (form.password.length < 6) { setError('პაროლი მინიმუმ 6 სიმბოლო'); return; }
    if (admins.find(a => a.email === form.email)) { setError('ეს ელფოსტა უკვე არსებობს'); return; }

    setSaving(true);
    // Try Supabase first
    try {
      const { data, error: sbErr } = await supabase.from('admins').insert([{
        name: form.name, email: form.email, password: form.password, role: 'admin'
      }]).select();
      if (!sbErr && data) {
        await loadAdmins();
        setForm({ name: '', email: '', password: '' });
        setShowAdd(false);
        setSaving(false);
        return;
      }
    } catch {}
    // Fallback to localStorage
    const local = getAdmins();
    const updated = [...local, { ...form, role: 'admin', createdAt: Date.now() }];
    saveAdmins(updated);
    setAdmins(updated.map(a => ({ ...a, id: a.email, created_at: a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString() })));
    setForm({ name: '', email: '', password: '' });
    setShowAdd(false);
    setSaving(false);
  };

  const handleDelete = async (email) => {
    if (email === DEFAULT_ADMIN.email) return;
    if (!window.confirm('წაშალოთ ეს ადმინი?')) return;
    try {
      const { error: sbErr } = await supabase.from('admins').delete().eq('email', email);
      if (!sbErr) { await loadAdmins(); return; }
    } catch {}
    const local = getAdmins();
    const updated = local.filter(a => a.email !== email);
    saveAdmins(updated);
    setAdmins(updated.map(a => ({ ...a, id: a.email, created_at: a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString() })));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
          <Users size={20} className="text-[#d4af37]" />
          ადმინების მართვა
        </h2>
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 text-[9px] font-bold rounded uppercase ${dataSource === 'supabase' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
            {dataSource === 'supabase' ? '● Supabase' : '● Local'}
          </span>
          {currentSession.role === 'super' && (
            <button onClick={() => setShowAdd(!showAdd)}
              className="px-4 py-2.5 bg-[#d4af37] hover:bg-[#c4a030] text-black text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm shadow-[#d4af37]/10">
              <UserPlus size={14} /> ახალი ადმინი
            </button>
          )}
        </div>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] p-5 mb-5">
          <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <UserPlus size={16} className="text-[#d4af37]" />
            ახალი ადმინის დამატება
          </h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#666] text-[10px] font-medium mb-1.5 uppercase tracking-wider">სახელი</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass} placeholder="სახელი" />
              </div>
              <div>
                <label className="block text-[#666] text-[10px] font-medium mb-1.5 uppercase tracking-wider">ელფოსტა</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass} placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-[#666] text-[10px] font-medium mb-1.5 uppercase tracking-wider">პაროლი</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`${inputClass} pr-10`} placeholder="მინ. 6 სიმბოლო" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-white transition">
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="text-red-400 text-xs bg-red-500/5 border border-red-500/10 rounded-lg p-2">{error}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={saving}
                className="px-5 py-2.5 bg-[#d4af37] text-black text-xs font-bold rounded-lg hover:bg-[#c4a030] transition disabled:opacity-50">
                {saving ? 'იტვირთება...' : 'დამატება'}
              </button>
              <button type="button" onClick={() => { setShowAdd(false); setError(''); }}
                className="px-5 py-2.5 bg-[#1a1a1a] text-[#888] text-xs rounded-lg hover:text-white hover:bg-[#222] transition">გაუქმება</button>
            </div>
          </form>
        </div>
      )}

      {/* Admins List */}
      {loadingAdmins ? (
        <div className="text-center text-[#444] py-10 text-sm">იტვირთება...</div>
      ) : (
        <div className="space-y-1.5">
          {admins.map((admin) => (
            <div key={admin.email}
              className="bg-[#0e0e0e] rounded-xl border border-[#161616] p-4 flex items-center justify-between hover:border-[#222] transition-colors group">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  admin.role === 'super' ? 'bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/10' : 'bg-[#151515] border border-[#1a1a1a]'
                }`}>
                  <User size={16} className={admin.role === 'super' ? 'text-[#d4af37]' : 'text-[#555]'} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">{admin.name}</span>
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${
                      admin.role === 'super' ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-[#1a1a1a] text-[#666]'
                    }`}>{admin.role === 'super' ? 'Super Admin' : 'Admin'}</span>
                  </div>
                  <p className="text-[#555] text-xs mt-0.5">{admin.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#333] text-[10px]">{new Date(admin.created_at).toLocaleDateString('ka-GE')}</span>
                {admin.role !== 'super' && currentSession.role === 'super' && (
                  <button onClick={() => handleDelete(admin.email)}
                    className="text-[#333] hover:text-red-400 transition p-1 opacity-0 group-hover:opacity-100">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   SOCIAL LINKS & FOOTER HTML MANAGEMENT
   ═══════════════════════════════════════════ */
const SocialLinksPanel = () => {
  const [links, setLinks] = useState([]);
  const [footerHtml, setFooterHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newLink, setNewLink] = useState({ label: '', url: '', icon: 'Globe' });
  const [showPreview, setShowPreview] = useState(false);
  const [dataSource, setDataSource] = useState('local');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    let linksLoaded = false;
    let htmlLoaded = false;

    // Try Supabase for links
    try {
      const { data, error } = await supabase.from('social_links').select('*').order('sort_order');
      if (!error && data && data.length > 0) {
        setLinks(data.map(d => ({ ...d, id: d.id || crypto.randomUUID() })));
        saveSocialLinksLocal(data);
        linksLoaded = true;
        setDataSource('supabase');
      }
    } catch {}
    if (!linksLoaded) {
      setLinks(getSocialLinks());
      setDataSource('local');
    }

    // Try Supabase for HTML
    try {
      const { data, error } = await supabase.from('footer_custom_html').select('*').eq('id', 1).single();
      if (!error && data) { setFooterHtml(data.html_content || ''); saveFooterHtmlLocal(data.html_content || ''); htmlLoaded = true; }
    } catch {}
    if (!htmlLoaded) { setFooterHtml(getFooterHtml()); }

    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // Always save to localStorage
    saveSocialLinksLocal(links);
    saveFooterHtmlLocal(footerHtml);

    // Try Supabase
    try {
      await supabase.from('social_links').delete().gte('sort_order', 0);
      if (links.length > 0) {
        const toInsert = links.map((l, i) => ({
          type: l.type || l.icon.toLowerCase(),
          label: l.label,
          url: l.url || '',
          icon: l.icon,
          sort_order: i + 1,
          visible: l.visible !== false,
        }));
        await supabase.from('social_links').insert(toInsert);
      }
      await supabase.from('footer_custom_html').upsert({ id: 1, html_content: footerHtml, updated_at: new Date().toISOString() });
      setDataSource('supabase');
    } catch { setDataSource('local'); }

    setSaving(false);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(null), 2000);
  };

  const addLink = () => {
    if (!newLink.icon) return;
    const link = {
      id: crypto.randomUUID(),
      type: newLink.icon.toLowerCase(),
      label: newLink.label || ICON_OPTIONS.find(o => o.value === newLink.icon)?.label || newLink.icon,
      url: newLink.url,
      icon: newLink.icon,
      sort_order: links.length + 1,
      visible: true,
    };
    setLinks([...links, link]);
    setNewLink({ label: '', url: '', icon: 'Globe' });
    setShowAdd(false);
  };

  const removeLink = (id) => { setLinks(links.filter(l => l.id !== id)); };
  const toggleVisibility = (id) => { setLinks(links.map(l => l.id === id ? { ...l, visible: !l.visible } : l)); };

  const moveLink = (id, direction) => {
    const idx = links.findIndex(l => l.id === id);
    if (idx < 0) return;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= links.length) return;
    const newLinks = [...links];
    [newLinks[idx], newLinks[newIdx]] = [newLinks[newIdx], newLinks[idx]];
    setLinks(newLinks.map((l, i) => ({ ...l, sort_order: i + 1 })));
  };

  const updateLink = (id, field, value) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  if (loading) return <div className="text-center text-[#444] py-16 text-sm">იტვირთება...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
          <Share2 size={20} className="text-[#d4af37]" />
          სოციალური ქსელები & ფუტერი
        </h2>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-[9px] font-bold rounded uppercase ${dataSource === 'supabase' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
            {dataSource === 'supabase' ? '● Supabase' : '● Local'}
          </span>
          <button onClick={handleSave} disabled={saving}
            className={`px-4 py-2 text-xs rounded-lg transition flex items-center gap-1.5 font-bold shadow-sm ${
              saveStatus === 'success' ? 'bg-green-500/15 text-green-400 border border-green-500/20' :
              'bg-[#d4af37] text-black hover:bg-[#c4a030] shadow-[#d4af37]/10'
            }`}>
            {saving ? 'ინახება...' : saveStatus === 'success' ? <><Check size={12} /> შენახულია!</> : <><Save size={12} /> შენახვა</>}
          </button>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm flex items-center gap-2">
            <Link2 size={16} className="text-[#d4af37]" />
            სოც. მედიის ბმულები
          </h3>
          <button onClick={() => setShowAdd(!showAdd)}
            className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#222] text-[#888] hover:text-white text-xs rounded-lg transition flex items-center gap-1.5 border border-[#222]">
            <Plus size={12} /> დამატება
          </button>
        </div>

        {/* Add New Link Form */}
        {showAdd && (
          <div className="bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-[#666] text-[10px] font-medium mb-1.5 uppercase tracking-wider">აიკონი</label>
                <select value={newLink.icon} onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                  className={inputClass}>
                  {ICON_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#666] text-[10px] font-medium mb-1.5 uppercase tracking-wider">სახელი</label>
                <input value={newLink.label} onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  className={inputClass} placeholder="მაგ: Facebook" />
              </div>
              <div>
                <label className="block text-[#666] text-[10px] font-medium mb-1.5 uppercase tracking-wider">ბმული (URL)</label>
                <input value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className={inputClass} placeholder="https://..." />
              </div>
              <div className="flex gap-2">
                <button onClick={addLink} className="px-4 py-2.5 bg-[#d4af37] text-black text-xs font-bold rounded-lg hover:bg-[#c4a030] transition">დამატება</button>
                <button onClick={() => setShowAdd(false)} className="px-3 py-2.5 bg-[#1a1a1a] text-[#666] text-xs rounded-lg hover:text-white transition">✕</button>
              </div>
            </div>
          </div>
        )}

        {/* Links List */}
        <div className="space-y-1.5">
          {links.length === 0 ? (
            <p className="text-[#444] text-sm text-center py-6">ბმულები არ არის დამატებული</p>
          ) : links.map((link, idx) => {
            const IconComp = ICON_COMPONENTS[link.icon] || Globe;
            return (
              <div key={link.id} className={`flex items-center gap-3 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] p-3 group hover:border-[#222] transition ${!link.visible ? 'opacity-40' : ''}`}>
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-[#151515] border border-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <IconComp size={16} className="text-[#d4af37]" />
                </div>

                {/* Label */}
                <input value={link.label} onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                  className="bg-transparent text-white text-sm font-medium border-none outline-none w-24 flex-shrink-0"
                  placeholder="სახელი" />

                {/* URL */}
                <input value={link.url || ''} onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                  className="bg-[#111] border border-[#1a1a1a] rounded px-2 py-1.5 text-white/70 text-xs flex-1 outline-none focus:border-[#d4af37]/30 transition"
                  placeholder="https://..." />

                {/* Icon Selector */}
                <select value={link.icon} onChange={(e) => updateLink(link.id, 'icon', e.target.value)}
                  className="bg-[#111] border border-[#1a1a1a] rounded px-2 py-1.5 text-[#888] text-xs outline-none w-28 flex-shrink-0">
                  {ICON_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => moveLink(link.id, -1)} disabled={idx === 0}
                    className="p-1 text-[#444] hover:text-white transition disabled:opacity-20">
                    <ArrowUp size={12} />
                  </button>
                  <button onClick={() => moveLink(link.id, 1)} disabled={idx === links.length - 1}
                    className="p-1 text-[#444] hover:text-white transition disabled:opacity-20">
                    <ArrowDown size={12} />
                  </button>
                  <button onClick={() => toggleVisibility(link.id)}
                    className={`p-1 transition ${link.visible ? 'text-[#d4af37]' : 'text-[#333]'} hover:text-white`}>
                    {link.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <button onClick={() => removeLink(link.id)}
                    className="p-1 text-[#333] hover:text-red-400 transition">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom HTML Section */}
      <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm flex items-center gap-2">
            <Code2 size={16} className="text-[#d4af37]" />
            HTML კოდი (ფუტერი)
          </h3>
          <button onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-1.5 text-xs rounded-lg transition flex items-center gap-1.5 border ${
              showPreview ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20' : 'bg-[#1a1a1a] text-[#666] border-[#222] hover:text-white'
            }`}>
            <Eye size={12} /> {showPreview ? 'დამალვა' : 'Preview'}
          </button>
        </div>

        <div className="bg-[#d4af37]/5 border border-[#d4af37]/10 rounded-lg p-3 mb-4">
          <p className="text-[#d4af37]/70 text-[11px]">
            ჩაწერეთ HTML კოდი რომელიც გამოჩნდება ფუტერის სოციალური ბმულების ქვემოთ. მაგ: Google Maps iframe, ვიჯეტები და ა.შ.
          </p>
        </div>

        <textarea
          value={footerHtml}
          onChange={(e) => setFooterHtml(e.target.value)}
          className={`${inputClass} font-mono text-xs`}
          rows={6}
          placeholder='<div class="mt-4">...</div>'
        />

        {/* Preview */}
        {showPreview && footerHtml && (
          <div className="mt-4">
            <div className="text-[10px] text-[#444] font-medium uppercase tracking-widest mb-2">Preview:</div>
            <div className="bg-[#1a3a52] rounded-lg p-4 border border-[#2a4a62] overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   CONTENT EDITOR PANEL
   ═══════════════════════════════════════════ */
const ContentEditorPanel = ({ editedTranslations, setEditedTranslations, onSave, onReset, saveStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionKeys = Object.keys(defaultTranslations.ka);

  const filteredSections = searchQuery
    ? sectionKeys.filter((key) => {
        const label = SECTION_LABELS[key];
        const s = searchQuery.toLowerCase();
        if (label && (label.ka.toLowerCase().includes(s) || label.en.toLowerCase().includes(s))) return true;
        if (key.toLowerCase().includes(s)) return true;
        return JSON.stringify(editedTranslations.ka[key] || '').toLowerCase().includes(s) ||
               JSON.stringify(editedTranslations.en[key] || '').toLowerCase().includes(s);
      })
    : sectionKeys;

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
          <FileText size={20} className="text-[#d4af37]" />
          კონტენტის რედაქტირება
        </h2>
        <div className="flex gap-2">
          <button onClick={onReset}
            className="px-3 py-2 bg-[#111] hover:bg-[#1a1a1a] text-[#666] hover:text-orange-300 text-xs rounded-lg transition flex items-center gap-1.5 border border-[#1a1a1a]">
            <RotateCcw size={12} /> აღდგენა
          </button>
          <button onClick={onSave}
            className={`px-4 py-2 text-xs rounded-lg transition flex items-center gap-1.5 font-bold shadow-sm ${
              saveStatus === 'success' ? 'bg-green-500/15 text-green-400 border border-green-500/20' :
              saveStatus === 'error' ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
              'bg-[#d4af37] text-black hover:bg-[#c4a030] shadow-[#d4af37]/10'
            }`}>
            {saveStatus === 'success' ? <><Check size={12} /> შენახულია!</> :
             saveStatus === 'error' ? <><X size={12} /> შეცდომა</> :
             <><Save size={12} /> შენახვა</>}
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#333]" />
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="მოძებნეთ სექცია ან ტექსტი..."
          className="w-full pl-10 pr-4 py-3 bg-[#0e0e0e] border border-[#161616] rounded-xl text-white text-sm placeholder-[#333] focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30 transition" />
      </div>

      <div className="bg-[#d4af37]/5 border border-[#d4af37]/10 rounded-xl p-3.5 mb-5">
        <p className="text-[#d4af37]/70 text-xs">შეცვალეთ ტექსტი ქართულად და ინგლისურად, შემდეგ დააჭირეთ "შენახვა".</p>
      </div>

      {filteredSections.map((k) => (
        <SectionEditor key={k} sectionKey={k} editedTranslations={editedTranslations} setEditedTranslations={setEditedTranslations} />
      ))}
      {filteredSections.length === 0 && <div className="text-center text-[#333] py-16 text-sm">არაფერი მოიძებნა</div>}
    </div>
  );
};

/* ═══════════════════════════════════════════
   DASHBOARD OVERVIEW
   ═══════════════════════════════════════════ */
const DashboardOverview = ({ setActiveTab }) => {
  const leads = getLeads();
  const admins = getAdmins();
  const unread = leads.filter(l => !l.read).length;
  const sections = Object.keys(defaultTranslations.ka).length;

  const stats = [
    { label: 'შეტყობინებები', value: leads.length, icon: MessageSquare, color: '#d4af37', sub: unread > 0 ? `${unread} წაუკითხავი` : 'ყველა წაკითხულია', onClick: () => setActiveTab('leads') },
    { label: 'ადმინები', value: admins.length, icon: Users, color: '#3b82f6', sub: 'აქტიური', onClick: () => setActiveTab('admins') },
    { label: 'სექციები', value: sections, icon: FileText, color: '#10b981', sub: 'რედაქტირებადი', onClick: () => setActiveTab('content') },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5">
        <LayoutDashboard size={20} className="text-[#d4af37]" />
        მთავარი პანელი
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} onClick={s.onClick}
            className="bg-[#0e0e0e] rounded-xl border border-[#161616] p-5 hover:border-[#222] transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}10` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <span className="text-3xl font-bold text-white group-hover:text-[#d4af37] transition">{s.value}</span>
            </div>
            <p className="text-[#999] text-sm font-medium">{s.label}</p>
            <p className="text-[#444] text-xs mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#161616]">
          <h3 className="text-white font-semibold text-sm">ბოლო შეტყობინებები</h3>
          <button onClick={() => setActiveTab('leads')} className="text-[#d4af37] text-xs hover:text-[#e0bc42] transition">ყველას ნახვა →</button>
        </div>
        {leads.length === 0 ? (
          <p className="text-[#444] text-sm text-center py-8">შეტყობინებები არ არის</p>
        ) : (
          <div className="divide-y divide-[#131313]">
            {leads.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5).map((lead) => (
              <div key={lead.id} onClick={() => setActiveTab('leads')}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-[#111] transition cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  {!lead.read && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className={`text-sm truncate ${lead.read ? 'text-[#777]' : 'text-white font-medium'}`}>{lead.name}</p>
                    <p className="text-[#444] text-xs truncate mt-0.5">{lead.message}</p>
                  </div>
                </div>
                <span className="text-[#333] text-[10px] flex-shrink-0 ml-3">
                  {new Date(lead.createdAt).toLocaleDateString('ka-GE', { day: '2-digit', month: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN DASHBOARD LAYOUT
   ═══════════════════════════════════════════ */
const AdminDashboard = ({ session, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editedTranslations, setEditedTranslations] = useState(() => {
    const saved = localStorage.getItem(TRANSLATIONS_STORAGE_KEY);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        return { ka: deepMerge(defaultTranslations.ka, p.ka || {}), en: deepMerge(defaultTranslations.en, p.en || {}) };
      } catch { return JSON.parse(JSON.stringify(defaultTranslations)); }
    }
    return JSON.parse(JSON.stringify(defaultTranslations));
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [leadsCount, setLeadsCount] = useState(0);

  // Poll unread count
  useEffect(() => {
    const update = () => setLeadsCount(getLeads().filter(l => !l.read).length);
    update();
    const interval = setInterval(update, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = useCallback(() => {
    try {
      localStorage.setItem(TRANSLATIONS_STORAGE_KEY, JSON.stringify(editedTranslations));
      window.dispatchEvent(new CustomEvent('translations-updated', { detail: editedTranslations }));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch { setSaveStatus('error'); setTimeout(() => setSaveStatus(null), 3000); }
  }, [editedTranslations]);

  const handleReset = () => {
    if (!window.confirm('ნამდვილად გნებავთ ცვლილებების წაშლა?')) return;
    localStorage.removeItem(TRANSLATIONS_STORAGE_KEY);
    setEditedTranslations(JSON.parse(JSON.stringify(defaultTranslations)));
    window.dispatchEvent(new CustomEvent('translations-updated', { detail: defaultTranslations }));
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(null), 2000);
  };

  const handleLogout = () => { localStorage.removeItem(STORAGE_KEY); onLogout(); };

  const navItems = [
    { id: 'dashboard', label: 'მთავარი', icon: LayoutDashboard },
    { id: 'content', label: 'კონტენტი', icon: FileText },
    { id: 'design', label: 'დიზაინი', icon: Palette },
    { id: 'social', label: 'სოც. მედია', icon: Share2 },
    { id: 'leads', label: 'ლიდები', icon: MessageSquare, badge: leadsCount },
    { id: 'admins', label: 'ადმინები', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-[52px]'} bg-[#0a0a0a] border-r border-[#141414] flex flex-col transition-all duration-300 fixed inset-y-0 left-0 z-50`}>
        {/* Logo */}
        <div className={`border-b border-[#141414] flex items-center ${sidebarOpen ? 'p-4 gap-3' : 'p-2 justify-center'}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#a08520] rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield size={15} className="text-black" />
          </div>
          {sidebarOpen && <span className="text-white font-bold text-xs tracking-wide truncate">TG LEGAL</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-1.5 space-y-0.5 mt-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              title={!sidebarOpen ? item.label : undefined}
              className={`w-full flex items-center gap-2.5 rounded-lg text-xs transition relative ${sidebarOpen ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'} ${
                activeTab === item.id
                  ? 'bg-[#d4af37]/10 text-[#d4af37]'
                  : 'text-[#555] hover:text-white hover:bg-[#111]'
              }`}>
              <item.icon size={16} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate font-medium">{item.label}</span>}
              {sidebarOpen && item.badge > 0 && (
                <span className="ml-auto px-1.5 py-0.5 bg-[#d4af37] text-black text-[9px] font-bold rounded-full min-w-[16px] text-center leading-tight">{item.badge}</span>
              )}
              {!sidebarOpen && item.badge > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-1.5 border-t border-[#141414] space-y-0.5">
          <button onClick={() => navigate('/')} title={!sidebarOpen ? 'საიტი' : undefined}
            className={`w-full flex items-center gap-2.5 rounded-lg text-[#555] hover:text-white hover:bg-[#111] text-xs transition ${sidebarOpen ? 'px-3 py-2' : 'px-0 py-2 justify-center'}`}>
            <Globe size={15} className="flex-shrink-0" />
            {sidebarOpen && <span>საიტის ნახვა</span>}
          </button>
          <button onClick={handleLogout} title={!sidebarOpen ? 'გასვლა' : undefined}
            className={`w-full flex items-center gap-2.5 rounded-lg text-[#555] hover:text-red-400 hover:bg-red-500/5 text-xs transition ${sidebarOpen ? 'px-3 py-2' : 'px-0 py-2 justify-center'}`}>
            <LogOut size={15} className="flex-shrink-0" />
            {sidebarOpen && <span>გასვლა</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-56' : 'ml-[52px]'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-[#141414]">
          <div className="px-5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-[#444] hover:text-white transition p-1 rounded-lg hover:bg-[#111]">
                {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
              <span className="text-white/70 font-medium text-sm">{navItems.find(n => n.id === activeTab)?.label}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#111] border border-[#1a1a1a] flex items-center justify-center">
                <User size={13} className="text-[#666]" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-[11px] font-medium leading-tight">{session.name || session.email.split('@')[0]}</p>
                <p className="text-[#444] text-[10px] leading-tight">{session.role === 'super' ? 'Super Admin' : 'Admin'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-5 max-w-5xl mx-auto">
          {activeTab === 'dashboard' && <DashboardOverview setActiveTab={setActiveTab} />}
          {activeTab === 'content' && (
            <ContentEditorPanel editedTranslations={editedTranslations} setEditedTranslations={setEditedTranslations}
              onSave={handleSave} onReset={handleReset} saveStatus={saveStatus} />
          )}
          {activeTab === 'design' && <DesignManager />}
          {activeTab === 'social' && <SocialLinksPanel />}
          {activeTab === 'leads' && <LeadsPanel />}
          {activeTab === 'admins' && <AdminsPanel currentSession={session} />}
        </div>
      </main>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN PAGE WRAPPER
   ═══════════════════════════════════════════ */
const AdminPage = () => {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (Date.now() - p.loginTime < 24 * 60 * 60 * 1000) {
          const admins = getAdmins();
          if (admins.find(a => a.email === p.email)) return p;
        }
        localStorage.removeItem(STORAGE_KEY);
      } catch { localStorage.removeItem(STORAGE_KEY); }
    }
    return null;
  });

  if (!session) return <AdminLogin onLogin={setSession} />;
  return <AdminDashboard session={session} onLogout={() => setSession(null)} />;
};

export default AdminPage;
