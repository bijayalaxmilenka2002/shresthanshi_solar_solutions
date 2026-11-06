import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, BookOpen, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Logo } from '../common/Logo';
import { MobileMenu } from './MobileMenu';
import { getPrimaryNavigation } from '../../data/navigation';
import { companyConfig } from '../../data/company';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';
import { useQuoteModal } from '../../hooks/useQuoteModal';
import { useSiteSettings } from '../../app/providers';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openGuideModal } = useSolarGuideModal();
  const { openQuoteModal } = useQuoteModal();
  const { settings } = useSiteSettings();
  const navItems = getPrimaryNavigation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Dynamic Announcement Bar (Controllable from Owner Portal) */}
      {settings.announcement.enabled && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            color: '#174B35',
            padding: '0.45rem 0',
            fontSize: '0.8rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Container>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                flexWrap: 'wrap',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  backgroundColor: 'var(--color-soft-green)',
                  color: 'var(--color-forest-green)',
                  border: '1px solid var(--border-medium)',
                  padding: '0.14rem 0.6rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  letterSpacing: '0.02em',
                }}
              >
                {settings.announcement.badge}
              </span>
              <span style={{ color: 'var(--text-body)', fontWeight: 500 }}>
                {settings.announcement.text}
              </span>
              {settings.announcement.linkText && (
                <Link
                  to={settings.announcement.linkUrl || '/resources/subsidy-scheme-guidance'}
                  style={{
                    color: 'var(--color-forest-green)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                  }}
                >
                  <span>{settings.announcement.linkText}</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </div>
          </Container>
        </div>
      )}

      {/* Top Info Bar */}
      <div className="top-bar">
        <Container className="top-bar__inner">
          <div className="top-bar__left">
            <span>{companyConfig.legalName}</span>
            <span className="top-bar__divider">•</span>
            <span>GSTIN: {companyConfig.gstin}</span>
            <span className="top-bar__divider top-bar__hide-sm">•</span>
            <span className="top-bar__hide-sm">Bhubaneswar (HQ) • Kalahandi Department</span>
          </div>
          <div className="top-bar__right">
            <button
              type="button"
              className="top-bar__guide-trigger"
              onClick={() => openGuideModal()}
            >
              <BookOpen size={14} />
              <span>Get a Free Solar Guide</span>
            </button>
            <a href={settings.contact.phoneHref} className="top-bar__phone">
              <Phone size={14} />
              <span>{settings.contact.phoneDisplay}</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Sticky Header */}
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <Container className="site-header__inner">
          <Logo variant="light-bg" />

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="desktop-nav__list">
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isDropdownOpen = activeDropdown === item.label;

                return (
                  <li
                    key={item.path}
                    className={`desktop-nav__item ${hasChildren ? 'desktop-nav__item--has-dropdown' : ''}`}
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    <div className="desktop-nav__link-wrap">
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                          `desktop-nav__link ${isActive ? 'desktop-nav__link--active' : ''}`
                        }
                      >
                        <span className="desktop-nav__label">{item.label}</span>
                        {hasChildren && (
                          <ChevronDown
                            size={14}
                            className={`desktop-nav__chevron ${
                              isDropdownOpen ? 'desktop-nav__chevron--open' : ''
                            }`}
                          />
                        )}
                      </NavLink>
                    </div>

                    {hasChildren && item.children && (
                      <div
                        className={`desktop-dropdown ${
                          isDropdownOpen ? 'desktop-dropdown--open' : ''
                        }`}
                      >
                        <div className="desktop-dropdown__inner">
                          <div className="desktop-dropdown__header">
                            <Link to={item.path} className="desktop-dropdown__overview">
                              <span>View All {item.label}</span>
                              <ArrowUpRight size={15} />
                            </Link>
                          </div>
                          <ul className="desktop-dropdown__list">
                            {item.children.map((sub) => {
                              const isSubActive = sub.path.includes('?')
                                ? (location.pathname + location.search) === sub.path
                                : location.pathname === sub.path && !location.search;

                              return (
                                <li key={sub.path}>
                                  <Link
                                    to={sub.path}
                                    onClick={() => setActiveDropdown(null)}
                                    className={`desktop-dropdown__item ${
                                      isSubActive ? 'desktop-dropdown__item--active' : ''
                                    }`}
                                  >
                                    <span className="desktop-dropdown__title">{sub.label}</span>
                                    {sub.description && (
                                      <span className="desktop-dropdown__desc">{sub.description}</span>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Primary Navigation CTA */}
          <div className="site-header__actions">
            <Button
              type="button"
              variant="primary"
              size="sm"
              iconRight={<ArrowRight size={15} />}
              className="site-header__cta"
              onClick={() => openQuoteModal('Residential Rooftop Solar')}
            >
              Get a Quote
            </Button>

            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
