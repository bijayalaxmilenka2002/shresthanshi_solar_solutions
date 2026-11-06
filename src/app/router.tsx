import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { HomePage } from '../features/home/HomePage';
import { ServicesPage } from '../features/services/ServicesPage';
import { SolarSolutionsOverviewPage } from '../features/solar-solutions/SolarSolutionsOverviewPage';
import { ResidentialSolarPage } from '../features/solar-solutions/ResidentialSolarPage';
import { CommercialSolarPage } from '../features/solar-solutions/CommercialSolarPage';
import { SolarWaterPumpsPage } from '../features/solar-solutions/SolarWaterPumpsPage';
import { SolarStreetLightingPage } from '../features/solar-solutions/SolarStreetLightingPage';
import { SolarMaintenancePage } from '../features/solar-solutions/SolarMaintenancePage';
import { WhoWeServeOverviewPage } from '../features/who-we-serve/WhoWeServeOverviewPage';
import { AudienceDetailPage } from '../features/who-we-serve/AudienceDetailPage';
import { ProjectsPage } from '../features/projects/ProjectsPage';
import { AboutPage } from '../features/about/AboutPage';
import { GalleryPage } from '../features/gallery/GalleryPage';
import { MediaPage } from '../features/media/MediaPage';
import { ResourcesOverviewPage } from '../features/resources/ResourcesOverviewPage';
import { SolarFaqsPage } from '../features/resources/SolarFaqsPage';
import { SubsidyGuidancePage } from '../features/resources/SubsidyGuidancePage';
import { ResourceArticleDetailPage } from '../features/resources/ResourceArticleDetailPage';
import { ContactPage } from '../features/contact/ContactPage';
import { LegalPage } from '../features/legal/LegalPages';

// Lazy load Owner Portal so clients never download its bundle
const OwnerPortalPage = lazy(() =>
  import('../features/owner/OwnerPortalPage').then((m) => ({ default: m.OwnerPortalPage }))
);

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Standalone Protected Owner Console (Isolated code chunk, no public links) */}
      <Route
        path="/owner-portal"
        element={
          <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#0F3324' }} />}>
            <OwnerPortalPage />
          </Suspense>
        }
      />

      {/* Public Client Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        {/* All Services (Matching shresthanshi.com/services.html) */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services.html" element={<Navigate to="/services" replace />} />

        {/* Solar Solutions */}
        <Route path="/solar-solutions" element={<SolarSolutionsOverviewPage />} />
        <Route
          path="/solar-solutions/residential-rooftop-solar"
          element={<ResidentialSolarPage />}
        />
        <Route path="/solar-solutions/commercial-solar" element={<CommercialSolarPage />} />
        <Route path="/solar-solutions/solar-water-pumps" element={<SolarWaterPumpsPage />} />
        <Route
          path="/solar-solutions/solar-street-lighting"
          element={<SolarStreetLightingPage />}
        />
        <Route
          path="/solar-solutions/solar-maintenance-support"
          element={<SolarMaintenancePage />}
        />

        {/* Who We Serve */}
        <Route path="/who-we-serve" element={<WhoWeServeOverviewPage />} />
        <Route
          path="/who-we-serve/homeowners"
          element={<AudienceDetailPage audienceId="homeowners" />}
        />
        <Route
          path="/who-we-serve/farmers"
          element={<AudienceDetailPage audienceId="farmers" />}
        />
        <Route
          path="/who-we-serve/businesses-institutions"
          element={<AudienceDetailPage audienceId="businesses-institutions" />}
        />

        {/* Portfolio, About, Gallery, Media */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/media" element={<MediaPage />} />

        {/* Resources */}
        <Route path="/resources" element={<ResourcesOverviewPage />} />
        <Route path="/resources/solar-faqs" element={<SolarFaqsPage />} />
        <Route path="/resources/subsidy-scheme-guidance" element={<SubsidyGuidancePage />} />
        <Route
          path="/resources/guides-articles"
          element={<ResourcesOverviewPage isArticlesSubpage />}
        />
        <Route path="/resources/articles/:slug" element={<ResourceArticleDetailPage />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Footer-Only Legal & Compliance Pages */}
        <Route path="/privacy-policy" element={<LegalPage pageType="privacy" />} />
        <Route path="/terms-and-conditions" element={<LegalPage pageType="terms" />} />
        <Route path="/disclaimer" element={<LegalPage pageType="disclaimer" />} />
        <Route path="/grievance-redressal" element={<LegalPage pageType="grievance" />} />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

