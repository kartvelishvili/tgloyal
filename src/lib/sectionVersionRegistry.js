/**
 * Section Version Registry
 * 
 * Central registry mapping section IDs to available design versions.
 * Active versions are stored in memory and hydrated from Supabase.
 * Default (V1) = the original component, so the public site is unchanged unless admin picks a different version.
 */

import { lazy } from 'react';

// Original (V1) components — eagerly imported in HomePage already, lazy not needed for V1
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import PrivatePracticeSection from '@/components/PrivatePracticeSection';
import ProfessionalStatusSection from '@/components/ProfessionalStatusSection';
import WhyUsSection from '@/components/WhyUsSection';
import ContactSection from '@/components/ContactSection';

// V2 & V3 — lazy loaded so they don't bloat the initial bundle
const HeroV2 = lazy(() => import('@/components/versions/hero/HeroV2'));
const HeroV3 = lazy(() => import('@/components/versions/hero/HeroV3'));

const AboutV2 = lazy(() => import('@/components/versions/about/AboutV2'));
const AboutV3 = lazy(() => import('@/components/versions/about/AboutV3'));

const EducationV2 = lazy(() => import('@/components/versions/education/EducationV2'));
const EducationV3 = lazy(() => import('@/components/versions/education/EducationV3'));

const ExperienceV2 = lazy(() => import('@/components/versions/experience/ExperienceV2'));
const ExperienceV3 = lazy(() => import('@/components/versions/experience/ExperienceV3'));

const PrivatePracticeV2 = lazy(() => import('@/components/versions/privatePractice/PrivatePracticeV2'));
const PrivatePracticeV3 = lazy(() => import('@/components/versions/privatePractice/PrivatePracticeV3'));

const ProfessionalStatusV2 = lazy(() => import('@/components/versions/professionalStatus/ProfessionalStatusV2'));
const ProfessionalStatusV3 = lazy(() => import('@/components/versions/professionalStatus/ProfessionalStatusV3'));

const WhyUsV2 = lazy(() => import('@/components/versions/whyUs/WhyUsV2'));
const WhyUsV3 = lazy(() => import('@/components/versions/whyUs/WhyUsV3'));

const ContactV2 = lazy(() => import('@/components/versions/contact/ContactV2'));
const ContactV3 = lazy(() => import('@/components/versions/contact/ContactV3'));

/* ─── In-memory active versions cache ─── */
let activeVersionsCache = {};

export function getActiveVersions() {
  return activeVersionsCache;
}

export function setActiveVersions(next) {
  activeVersionsCache = next || {};
  window.dispatchEvent(new CustomEvent('section-versions-updated'));
}

export function setActiveVersion(sectionId, versionId) {
  const current = { ...activeVersionsCache };
  if (versionId === 'v1') {
    delete current[sectionId];
  } else {
    current[sectionId] = versionId;
  }
  activeVersionsCache = current;
  window.dispatchEvent(new CustomEvent('section-versions-updated'));
  return current;
}

export function rollbackVersion(sectionId) {
  return setActiveVersion(sectionId, 'v1');
}

export function rollbackAll() {
  activeVersionsCache = {};
  window.dispatchEvent(new CustomEvent('section-versions-updated'));
  return activeVersionsCache;
}

/* ─── Registry ─── */
export const sectionRegistry = {
  hero: {
    id: 'hero',
    label: { ka: 'მთავარი სექცია', en: 'Hero Section' },
    icon: '🏠',
    versions: [
      {
        id: 'v1',
        name: { ka: 'ორიგინალი', en: 'Original' },
        description: { ka: 'სრულ ეკრანზე ფონის სურათით, გრადიენტით და CTA ღილაკებით', en: 'Full-screen with background image, gradient overlay, and CTA buttons' },
        component: HeroSection,
        thumbnail: 'linear-gradient(135deg, #1a3a52 0%, #0d1f2d 100%)',
      },
      {
        id: 'v2',
        name: { ka: 'მინიმალისტური', en: 'Minimalist' },
        description: { ka: 'სუფთა სპლიტ-ლეიაუტი ტექსტით მარცხნივ და სურათით მარჯვნივ', en: 'Clean split-layout with text left and image right' },
        component: HeroV2,
        thumbnail: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      },
      {
        id: 'v3',
        name: { ka: 'მოდერნული ანიმაცია', en: 'Modern Animated' },
        description: { ka: 'ფლოუტინგ ელემენტებით და ბოკეჰ ეფექტით, ცენტრირებული ლეიაუტი', en: 'Floating elements with bokeh effects, centered layout' },
        component: HeroV3,
        thumbnail: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      },
    ],
  },
  about: {
    id: 'about',
    label: { ka: 'ჩვენს შესახებ', en: 'About Us' },
    icon: '📋',
    versions: [
      {
        id: 'v1',
        name: { ka: 'ორიგინალი', en: 'Original' },
        description: { ka: '2 სვეტიანი გრიდი სურათით და ტექსტით', en: '2-column grid with image and text' },
        component: AboutSection,
        thumbnail: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      },
      {
        id: 'v2',
        name: { ka: 'ქარდ-ლეიაუტი', en: 'Card Layout' },
        description: { ka: 'მოდერნული ქარდებით, სტატისტიკით და აქცენტის ფერით', en: 'Modern cards with statistics and accent colors' },
        component: AboutV2,
        thumbnail: 'linear-gradient(135deg, #1a3a52 0%, #2c5f7c 100%)',
      },
      {
        id: 'v3',
        name: { ka: 'ტაიმლაინი', en: 'Timeline' },
        description: { ka: 'პროფილის ტაიმლაინი მილსტოუნებთან და ჰეროიკ ბენერით', en: 'Profile timeline with milestones and heroic banner' },
        component: AboutV3,
        thumbnail: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
      },
    ],
  },
  education: {
    id: 'education',
    label: { ka: 'განათლება', en: 'Education' },
    icon: '🎓',
    versions: [
      {
        id: 'v1',
        name: { ka: 'ორიგინალი', en: 'Original' },
        description: { ka: 'მუქი ფონი, ტაიმლაინის ქარდებით', en: 'Dark background with timeline cards' },
        component: EducationSection,
        thumbnail: 'linear-gradient(135deg, #1a3a52 0%, #0d1f2d 100%)',
      },
      {
        id: 'v2',
        name: { ka: 'გრიდ-ქარდები', en: 'Grid Cards' },
        description: { ka: 'თეთრი ფონი, 3-სვეტიანი გრიდი ამაღლებული ქარდებით', en: 'White background, 3-column grid with elevated cards' },
        component: EducationV2,
        thumbnail: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      },
      {
        id: 'v3',
        name: { ka: 'აკორდეონი', en: 'Accordion' },
        description: { ka: 'ინტერაქტიული აკორდეონი ანიმაციებით', en: 'Interactive accordion with animations' },
        component: EducationV3,
        thumbnail: 'linear-gradient(135deg, #f5f0e8 0%, #ede4d6 100%)',
      },
    ],
  },
  experience: {
    id: 'experience',
    label: { ka: 'გამოცდილება', en: 'Experience' },
    icon: '💼',
    versions: [
      {
        id: 'v1',
        name: { ka: 'ორიგინალი', en: 'Original' },
        description: { ka: 'ნათელი ფონი, სურათი და ქარდების გრიდი', en: 'Light background, image and cards grid' },
        component: ExperienceSection,
        thumbnail: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
      },
      {
        id: 'v2',
        name: { ka: 'ფიჩერ-სტრიპი', en: 'Feature Strip' },
        description: { ka: 'ჰორიზონტალური ქარდები აიქონებით და პროგრეს ინდიკატორებით', en: 'Horizontal cards with icons and progress indicators' },
        component: ExperienceV2,
        thumbnail: 'linear-gradient(135deg, #1a3a52 0%, #234e68 100%)',
      },
      {
        id: 'v3',
        name: { ka: 'მაზონრი გრიდი', en: 'Masonry Grid' },
        description: { ka: 'მასონრი-სტილის ლეიაუტი მცურავ ტეგებთან', en: 'Masonry-style layout with floating tags' },
        component: ExperienceV3,
        thumbnail: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
      },
    ],
  },
  privatePractice: {
    id: 'privatePractice',
    label: { ka: 'კერძო პრაქტიკა', en: 'Private Practice' },
    icon: '⚖️',
    versions: [
      {
        id: 'v1',
        name: { ka: 'ორიგინალი', en: 'Original' },
        description: { ka: '3-სვეტიანი გრიდი გრადიენტული ქარდებით', en: '3-column grid with gradient cards' },
        component: PrivatePracticeSection,
        thumbnail: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      },
      {
        id: 'v2',
        name: { ka: 'ფლიპ ქარდები', en: 'Flip Cards' },
        description: { ka: 'ინტერაქტიული ქარდები hover ეფექტით და დეტალური ხედვით', en: 'Interactive cards with hover effects and detailed view' },
        component: PrivatePracticeV2,
        thumbnail: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      },
      {
        id: 'v3',
        name: { ka: 'ტაბური ლეიაუტი', en: 'Tabbed Layout' },
        description: { ka: 'ტაბების ბაზისი კატეგორიებით და დეტალური აღწერით', en: 'Tab-based with categories and detailed descriptions' },
        component: PrivatePracticeV3,
        thumbnail: 'linear-gradient(135deg, #1a3a52 0%, #2c5f7c 100%)',
      },
    ],
  },
  professionalStatus: {
    id: 'professionalStatus',
    label: { ka: 'პროფესიული სტატუსი', en: 'Professional Status' },
    icon: '🏅',
    versions: [
      {
        id: 'v1',
        name: { ka: 'ორიგინალი', en: 'Original' },
        description: { ka: 'ნათელი ფონი, 2-სვეტი (სურათი + ოქროს გრადიენტის ქარდი)', en: 'Light background, 2-column (image + gold gradient card)' },
        component: ProfessionalStatusSection,
        thumbnail: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
      },
      {
        id: 'v2',
        name: { ka: 'ბეჯების გალერეა', en: 'Badge Gallery' },
        description: { ka: 'ცენტრირებული ბეჯები და სერტიფიკატების ვიზუალიზაცია', en: 'Centered badges and certificates visualization' },
        component: ProfessionalStatusV2,
        thumbnail: 'linear-gradient(135deg, #0f1923 0%, #1a3a52 100%)',
      },
      {
        id: 'v3',
        name: { ka: 'სრული პროფილი', en: 'Full Profile' },
        description: { ka: 'კომპაქტური კარტა დეტალური სტატუსის ინფორმაციით', en: 'Compact card with detailed status information' },
        component: ProfessionalStatusV3,
        thumbnail: 'linear-gradient(135deg, #fffcf5 0%, #f5f0e8 100%)',
      },
    ],
  },
  whyUs: {
    id: 'whyUs',
    label: { ka: 'რატომ ჩვენ', en: 'Why Us' },
    icon: '⭐',
    versions: [
      {
        id: 'v1',
        name: { ka: 'ორიგინალი', en: 'Original' },
        description: { ka: 'მუქი ფონი, 3-სვეტიანი ფიჩერ ქარდები', en: 'Dark background, 3-column feature cards' },
        component: WhyUsSection,
        thumbnail: 'linear-gradient(135deg, #1a3a52 0%, #0d1f2d 100%)',
      },
      {
        id: 'v2',
        name: { ka: 'ნუმერაციული', en: 'Numbered' },
        description: { ka: 'დიდი ნომრები და სტეპ-ბეისد ლეიაუტი', en: 'Large numbers and step-based layout' },
        component: WhyUsV2,
        thumbnail: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      },
      {
        id: 'v3',
        name: { ka: 'აიქონ სექცია', en: 'Icon Section' },
        description: { ka: 'მიზოქტილი აიქონები მრგვალ ფრეიმებში გრადიენტულ ფონზე', en: 'Styled icons in circular frames on gradient background' },
        component: WhyUsV3,
        thumbnail: 'linear-gradient(135deg, #f8f4e8 0%, #ede4d6 100%)',
      },
    ],
  },
  contact: {
    id: 'contact',
    label: { ka: 'კონტაქტი', en: 'Contact' },
    icon: '📞',
    versions: [
      {
        id: 'v1',
        name: { ka: 'ორიგინალი', en: 'Original' },
        description: { ka: 'მარცხენა ინფო + მარჯვენა ფორმა, floating labels', en: 'Left info + right form, floating labels' },
        component: ContactSection,
        thumbnail: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      },
      {
        id: 'v2',
        name: { ka: 'ცენტრირებული', en: 'Centered' },
        description: { ka: 'ცენტრირებული ფორმა რუქის/კონტაქტის ზოლით ზემოთ', en: 'Centered form with map/contact strip above' },
        component: ContactV2,
        thumbnail: 'linear-gradient(135deg, #1a3a52 0%, #2c5f7c 100%)',
      },
      {
        id: 'v3',
        name: { ka: 'მულტი-სტეპი', en: 'Multi-Step' },
        description: { ka: 'ეტაპობრივი ფორმა პროგრეს ბარით', en: 'Step-by-step form with progress bar' },
        component: ContactV3,
        thumbnail: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      },
    ],
  },
};

/**
 * Get the active component for a section.
 * Returns the V1 component if no version is explicitly set.
 */
export function getActiveComponent(sectionId, activeVersionsOverride) {
  const activeVersions = activeVersionsOverride || getActiveVersions();
  const versionId = activeVersions[sectionId] || 'v1';
  const section = sectionRegistry[sectionId];
  if (!section) return null;
  const version = section.versions.find(v => v.id === versionId);
  return version ? version.component : section.versions[0].component;
}

export function getComponentForVersion(sectionId, versionId) {
  const section = sectionRegistry[sectionId];
  if (!section) return null;
  const version = section.versions.find(v => v.id === versionId);
  return version ? version.component : section.versions[0].component;
}
