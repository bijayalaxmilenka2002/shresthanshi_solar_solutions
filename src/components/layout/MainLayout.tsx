import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FreeSolarGuideModal } from '../common/FreeSolarGuideModal';
import { QuoteModal } from '../common/QuoteModal';
import { ScrollProgressButton } from '../common/ScrollProgressButton';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const MainLayout: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  useScrollReveal(`${pathname}${search}`);

  return (
    <div className="site-wrapper">
      <Header />
      <main key={pathname} className="site-main page-transition-enter" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollProgressButton />
      <FreeSolarGuideModal />
      <QuoteModal />
    </div>
  );
};
