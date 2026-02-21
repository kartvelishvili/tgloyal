import React, { useState, useEffect, Suspense } from 'react';
import {
  sectionRegistry,
  getActiveVersions,
  setActiveVersion,
  rollbackVersion,
  rollbackAll,
  VERSIONS_STORAGE_KEY,
} from '@/lib/sectionVersionRegistry';
import {
  Palette, Eye, Check, RotateCcw, X, ChevronDown, ChevronUp, Monitor, Smartphone
} from 'lucide-react';

/* ─── Preview Modal ─── */
const PreviewModal = ({ section, version, onClose }) => {
  const [device, setDevice] = useState('desktop');
  const Component = version.component;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#161616]">
          <div className="flex items-center gap-3">
            <span className="text-base">{section.icon}</span>
            <div>
              <span className="text-white font-bold text-sm">{section.label.ka}</span>
              <span className="text-[#444] text-xs ml-2">— {version.name.ka}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-[#111] rounded-lg p-0.5 border border-[#1a1a1a]">
              <button onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-md transition ${device === 'desktop' ? 'bg-[#d4af37] text-black' : 'text-[#555] hover:text-white'}`}>
                <Monitor size={14} />
              </button>
              <button onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-md transition ${device === 'mobile' ? 'bg-[#d4af37] text-black' : 'text-[#555] hover:text-white'}`}>
                <Smartphone size={14} />
              </button>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-[#555] hover:text-white hover:bg-[#111] transition">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 overflow-auto bg-white">
          <div
            className={`mx-auto transition-all duration-300 ${device === 'mobile' ? 'max-w-[375px]' : 'w-full'}`}
            style={{ minHeight: '400px' }}
          >
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-400 text-sm">იტვირთება...</div>
              </div>
            }>
              <Component />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Section Version Card ─── */
const VersionCard = ({ section, version, isActive, onActivate, onPreview }) => {
  return (
    <div
      className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden cursor-pointer group ${
        isActive
          ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
          : 'border-[#1a1a1a] hover:border-[#333]'
      }`}
      onClick={onPreview}
    >
      {/* Thumbnail */}
      <div
        className="h-24 w-full relative"
        style={{ background: version.thumbnail || '#111' }}
      >
        {isActive && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-[#d4af37] rounded-full flex items-center justify-center shadow-md">
            <Check size={12} className="text-black" />
          </div>
        )}

        {/* Preview overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onPreview(); }}
              className="px-3 py-1.5 bg-white/90 text-black text-xs font-bold rounded-lg hover:bg-white transition"
            >
              <Eye size={12} className="inline mr-1" /> პრევიუ
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 bg-[#0e0e0e]">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs font-bold ${isActive ? 'text-[#d4af37]' : 'text-white/80'}`}>
            {version.name.ka}
          </span>
          <span className="text-[10px] text-[#444] uppercase tracking-wider font-mono">{version.id}</span>
        </div>
        <p className="text-[10px] text-[#555] leading-relaxed line-clamp-2">{version.description.ka}</p>

        {/* Action button */}
        <div className="mt-2.5 flex gap-1.5">
          {isActive ? (
            <span className="flex-1 text-center px-2 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-bold rounded-lg">
              ✓ აქტიური
            </span>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onActivate(); }}
              className="flex-1 px-2 py-1.5 bg-[#d4af37] text-black text-[10px] font-bold rounded-lg hover:bg-[#c4a030] transition"
            >
              გააქტიურება
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Section Row ─── */
const SectionVersionRow = ({ sectionId, section, activeVersionId, onVersionChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(null);
  const currentVersion = section.versions.find(v => v.id === activeVersionId) || section.versions[0];
  const isDefault = activeVersionId === 'v1';

  return (
    <>
      <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] overflow-hidden hover:border-[#222] transition-colors mb-2">
        {/* Section header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-5 py-4 text-left group"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{section.icon}</span>
            <div>
              <span className="text-white font-medium text-sm group-hover:text-[#d4af37] transition-colors">
                {section.label.ka}
              </span>
              <span className="text-[#444] text-xs ml-2">{section.label.en}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#555] font-medium">აქტიური:</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isDefault ? 'bg-green-500/10 text-green-400' : 'bg-[#d4af37]/10 text-[#d4af37]'}`}>
                {currentVersion.name.ka} ({activeVersionId.toUpperCase()})
              </span>
            </div>
            {!isDefault && (
              <button
                onClick={(e) => { e.stopPropagation(); onVersionChange(sectionId, 'v1'); }}
                className="p-1.5 rounded-lg text-[#555] hover:text-orange-300 hover:bg-orange-500/5 transition"
                title="V1-ზე დაბრუნება"
              >
                <RotateCcw size={13} />
              </button>
            )}
            {isExpanded ? (
              <ChevronUp size={15} className="text-[#d4af37]" />
            ) : (
              <ChevronDown size={15} className="text-[#333]" />
            )}
          </div>
        </button>

        {/* Expanded: version cards */}
        {isExpanded && (
          <div className="px-5 pb-5 border-t border-[#161616] pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {section.versions.map((version) => (
                <VersionCard
                  key={version.id}
                  section={section}
                  version={version}
                  isActive={version.id === activeVersionId}
                  onActivate={() => onVersionChange(sectionId, version.id)}
                  onPreview={() => setPreviewVersion(version)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview modal */}
      {previewVersion && (
        <PreviewModal
          section={section}
          version={previewVersion}
          onClose={() => setPreviewVersion(null)}
        />
      )}
    </>
  );
};

/* ═══════════════════════════════════════════
   MAIN DESIGN MANAGER
   ═══════════════════════════════════════════ */
const DesignManager = () => {
  const [activeVersions, setActiveVersions] = useState(getActiveVersions);
  const [notification, setNotification] = useState(null);

  // Listen for external changes
  useEffect(() => {
    const handler = () => setActiveVersions(getActiveVersions());
    window.addEventListener('section-versions-updated', handler);
    return () => window.removeEventListener('section-versions-updated', handler);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const handleVersionChange = (sectionId, versionId) => {
    setActiveVersion(sectionId, versionId);
    setActiveVersions(getActiveVersions());
    const section = sectionRegistry[sectionId];
    const version = section.versions.find(v => v.id === versionId);
    if (versionId === 'v1') {
      showNotification(`${section.label.ka} — ორიგინალ ვერსიაზე დაბრუნდა`);
    } else {
      showNotification(`${section.label.ka} — ${version.name.ka} გააქტიურდა`);
    }
  };

  const handleRollbackAll = () => {
    if (!window.confirm('ნამდვილად გნებავთ ყველა სექციის ორიგინალ ვერსიაზე დაბრუნება?')) return;
    rollbackAll();
    setActiveVersions({});
    showNotification('ყველა სექცია ორიგინალ ვერსიაზე დაბრუნდა');
  };

  const customizedCount = Object.keys(activeVersions).length;
  const totalSections = Object.keys(sectionRegistry).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
          <Palette size={20} className="text-[#d4af37]" />
          დიზაინის მართვა
        </h2>
        {customizedCount > 0 && (
          <button onClick={handleRollbackAll}
            className="px-3 py-2 bg-[#111] hover:bg-[#1a1a1a] text-[#666] hover:text-orange-300 text-xs rounded-lg transition flex items-center gap-1.5 border border-[#1a1a1a]">
            <RotateCcw size={12} /> ყველას აღდგენა
          </button>
        )}
      </div>

      {/* Info bar */}
      <div className="bg-[#d4af37]/5 border border-[#d4af37]/10 rounded-xl p-3.5 mb-5">
        <p className="text-[#d4af37]/70 text-xs leading-relaxed">
          თითოეულ სექციას აქვს 3 დიზაინ ვერსია. აირჩიეთ სასურველი, გადახედეთ პრევიუში და გააქტიურეთ.
          ორიგინალ ვერსიაზე დაბრუნება ნებისმიერ დროს შეიძლება.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] p-4">
          <div className="text-2xl font-bold text-white">{totalSections}</div>
          <div className="text-[#555] text-xs mt-1">სულ სექცია</div>
        </div>
        <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] p-4">
          <div className="text-2xl font-bold text-[#d4af37]">{customizedCount}</div>
          <div className="text-[#555] text-xs mt-1">შეცვლილი</div>
        </div>
        <div className="bg-[#0e0e0e] rounded-xl border border-[#161616] p-4">
          <div className="text-2xl font-bold text-green-400">{totalSections - customizedCount}</div>
          <div className="text-[#555] text-xs mt-1">ორიგინალი</div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
          notification.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {notification.type === 'success' ? <Check size={14} /> : <X size={14} />}
          {notification.message}
        </div>
      )}

      {/* Sections */}
      {Object.entries(sectionRegistry).map(([sectionId, section]) => (
        <SectionVersionRow
          key={sectionId}
          sectionId={sectionId}
          section={section}
          activeVersionId={activeVersions[sectionId] || 'v1'}
          onVersionChange={handleVersionChange}
        />
      ))}
    </div>
  );
};

export default DesignManager;
