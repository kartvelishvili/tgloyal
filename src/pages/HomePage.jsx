import React, { useState, useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import useLanguage from '@/hooks/useLanguage';
import { supabase } from '@/lib/customSupabaseClient';
import { getActiveVersions, getActiveComponent, setActiveVersions } from '@/lib/sectionVersionRegistry';

// The order of sections on the page
const SECTION_ORDER = [
  'hero',
  'about',
  'education',
  'experience',
  'privatePractice',
  'professionalStatus',
  'whyUs',
  'contact',
];

const SectionRenderer = ({ sectionId, activeVersions }) => {
  const Component = getActiveComponent(sectionId, activeVersions);
  if (!Component) return null;

  // V1 components are eagerly imported, V2/V3 are lazy
  const versionId = activeVersions[sectionId] || 'v1';
  if (versionId === 'v1') {
    return <Component />;
  }
  // Lazy components need Suspense
  return (
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <Component />
    </Suspense>
  );
};

const HomePage = () => {
  const { t } = useLanguage();
  const [activeVersions, setActiveVersionsState] = useState(getActiveVersions);

  // Listen for version changes from admin panel
  useEffect(() => {
    const handler = () => setActiveVersionsState(getActiveVersions());
    window.addEventListener('section-versions-updated', handler);
    return () => {
      window.removeEventListener('section-versions-updated', handler);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadVersions = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('section_versions')
          .eq('id', 1)
          .single();
        if (!error && data && isMounted) {
          const next = data.section_versions || {};
          setActiveVersions(next);
          setActiveVersionsState(next);
        }
      } catch {}
    };
    loadVersions();
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <meta property="og:title" content={t.seo.title} />
        <meta property="og:description" content={t.seo.description} />
        <meta name="keywords" content={t.seo.keywords} />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        {SECTION_ORDER.map((sectionId) => (
          <SectionRenderer key={`${sectionId}-${activeVersions[sectionId] || 'v1'}`} sectionId={sectionId} activeVersions={activeVersions} />
        ))}
        <Footer />
        <Toaster />
      </div>
    </>
  );
};

export default HomePage;