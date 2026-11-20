import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FreeSolarGuideModal } from '../common/FreeSolarGuideModal';
import { QuoteModal } from '../common/QuoteModal';
import { TrackEnquiryModal } from '../common/TrackEnquiryModal';
import { ScrollProgressButton } from '../common/ScrollProgressButton';
import { useScrollReveal } from '@controllers/hooks/useScrollReveal';
import { useTrackModal } from '@/app/providers';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const MainLayout: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  const { isTrackModalOpen, trackPrefillQuery, closeTrackModal } = useTrackModal();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const scrollToHash = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 90;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        const t1 = setTimeout(scrollToHash, 60);
        const t2 = setTimeout(scrollToHash, 200);
        const t3 = setTimeout(scrollToHash, 450);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash]);

  useScrollReveal(`${pathname}${search}`);

  return (
    <div className="site-wrapper">
      <Header />
      <main key={pathname} className="site-main page-transition-enter" id="main-content">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollProgressButton />
      <FreeSolarGuideModal />
      <QuoteModal />
      <TrackEnquiryModal
        isOpen={isTrackModalOpen}
        onClose={closeTrackModal}
        initialQuery={trackPrefillQuery}
      />
    </div>
  );
};
