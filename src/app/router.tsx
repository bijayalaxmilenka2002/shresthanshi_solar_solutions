import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@views/components/layout/MainLayout';
import { HomePage } from '@views/pages/home/HomePage';
import { ServicesPage } from '@views/pages/services/ServicesPage';
import { SolarSolutionsOverviewPage } from '@views/pages/solar-solutions/SolarSolutionsOverviewPage';
import { ResidentialSolarPage } from '@views/pages/solar-solutions/ResidentialSolarPage';
import { CommercialSolarPage } from '@views/pages/solar-solutions/CommercialSolarPage';
import { SolarWaterPumpsPage } from '@views/pages/solar-solutions/SolarWaterPumpsPage';
import { SolarStreetLightingPage } from '@views/pages/solar-solutions/SolarStreetLightingPage';
import { SolarMaintenancePage } from '@views/pages/solar-solutions/SolarMaintenancePage';
import { WhoWeServeOverviewPage } from '@views/pages/who-we-serve/WhoWeServeOverviewPage';
import { AudienceDetailPage } from '@views/pages/who-we-serve/AudienceDetailPage';
import { GovernmentSectorPage } from '@views/pages/who-we-serve/GovernmentSectorPage';
import { ProjectsPage } from '@views/pages/projects/ProjectsPage';
import { AboutPage } from '@views/pages/about/AboutPage';
import { GalleryPage } from '@views/pages/gallery/GalleryPage';
import { MediaPage } from '@views/pages/media/MediaPage';
import { TestimonialsPage } from '@views/pages/testimonials/TestimonialsPage';
import { LicencesPage } from '@views/pages/licences/LicencesPage';
import { ResourcesOverviewPage } from '@views/pages/resources/ResourcesOverviewPage';
import { SolarFaqsPage } from '@views/pages/resources/SolarFaqsPage';
import { SubsidyGuidancePage } from '@views/pages/resources/SubsidyGuidancePage';
import { ResourceArticleDetailPage } from '@views/pages/resources/ResourceArticleDetailPage';
import { ContactPage } from '@views/pages/contact/ContactPage';
import { LegalPage } from '@views/pages/legal/LegalPages';

// Lazy load Owner Portal & Super Admin Portal so clients never download their bundle
const OwnerPortalPage = lazy(() =>
  import('@views/pages/owner/OwnerPortalPage').then((m) => ({ default: m.OwnerPortalPage }))
);
const SuperAdminPortalPage = lazy(() =>
  import('@views/pages/owner/SuperAdminPortalPage').then((m) => ({ default: m.SuperAdminPortalPage }))
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
      <Route path="/owner" element={<Navigate to="/owner-portal" replace />} />

      {/* Standalone Protected Super Admin Oversight Console */}
      <Route
        path="/super-admin"
        element={
          <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#0A2518' }} />}>
            <SuperAdminPortalPage />
          </Suspense>
        }
      />
      <Route path="/super-admin-portal" element={<Navigate to="/super-admin" replace />} />

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
        <Route path="/who-we-serve/government" element={<GovernmentSectorPage />} />

        {/* Portfolio, About, Gallery, Media */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/media" element={<MediaPage />} />

        {/* Testimonials & Licences */}
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/licences-and-certifications" element={<LicencesPage />} />
        <Route path="/licences" element={<Navigate to="/licences-and-certifications" replace />} />
        <Route path="/certifications" element={<Navigate to="/licences-and-certifications" replace />} />

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

