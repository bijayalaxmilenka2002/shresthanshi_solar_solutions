import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, BookOpen, ArrowUpRight, ArrowRight, Clock } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Logo } from '../common/Logo';
import { MobileMenu } from './MobileMenu';
import { getPrimaryNavigation } from '@models/data/navigation';
import { companyConfig } from '@models/data/company';
import { useSolarGuideModal } from '@controllers/hooks/useSolarGuideModal';
import { useQuoteModal } from '@controllers/hooks/useQuoteModal';
import { useSiteSettings, useTrackModal } from '@/app/providers';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openGuideModal } = useSolarGuideModal();
  const { openQuoteModal } = useQuoteModal();
  const { openTrackModal } = useTrackModal();
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

  const handleNavClick = (path: string) => {
    setActiveDropdown(null);
    if (path.includes('#')) {
      const [targetPath, hashPart] = path.split('#');
      const isSamePath =
        !targetPath ||
        location.pathname === targetPath ||
        (location.pathname === '/' && targetPath === '');
      if (isSamePath && hashPart) {
        setTimeout(() => {
          const el = document.getElementById(hashPart);
          if (el) {
            const headerOffset = 90;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth',
            });
          }
        }, 40);
      }
    } else if (path === location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Dynamic Announcement Bar (Controllable from Owner Portal) */}
      {settings?.announcement?.enabled && (
        <aside
          aria-label="Important Announcement"
          style={{
            background: 'linear-gradient(90deg, #062316 0%, #0F3E2B 30%, #174B35 70%, #08281A 100%)',
            color: '#FFFFFF',
            padding: '0.62rem 0',
            fontSize: '0.86rem',
            borderBottom: '2px solid rgba(250, 204, 21, 0.45)',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.28)',
            position: 'relative',
            zIndex: 100,
          }}
        >
          <Container>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  backgroundColor: '#FEF08A',
                  color: '#14532D',
                  border: '1px solid #FDE047',
                  padding: '0.2rem 0.75rem',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.74rem',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#16A34A',
                    display: 'inline-block',
                    animation: 'pulseDot 2s infinite',
                  }}
                />
                <span>{settings?.announcement?.badge || 'Subsidy Alert'}</span>
              </span>

              <span
                style={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {settings?.announcement?.text}
              </span>

              {settings?.announcement?.linkText && (
                <Link
                  to={settings?.announcement?.linkUrl || '/resources/subsidy-scheme-guidance'}
                  style={{
                    backgroundColor: '#86EFAC',
                    color: '#062316',
                    padding: '0.22rem 0.75rem',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.76rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#BBF7D0';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#86EFAC';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>{settings?.announcement?.linkText}</span>
                  <ArrowRight size={13} />
                </Link>
              )}
            </div>
          </Container>
        </aside>
      )}

      {/* Top Info Bar */}
      <div className="top-bar">
        <Container className="top-bar__inner">
          <div className="top-bar__left">
            <span>{companyConfig.legalName}</span>
            <span className="top-bar__divider">•</span>
            <span>GSTIN: {companyConfig.gstin}</span>
            <span className="top-bar__divider top-bar__hide-sm">•</span>
            <span className="top-bar__hide-sm" title="Head Office in Kalahandi, with Sub-Branch in Bhubaneswar, Odisha">Kalahandi (HQ) • Bhubaneswar Sub-Branch</span>
          </div>
          <div className="top-bar__right">
            <button
              type="button"
              className="top-bar__guide-trigger"
              onClick={() => openTrackModal()}
              style={{
                backgroundColor: 'rgba(23, 75, 53, 0.08)',
                color: 'var(--color-forest-green)',
                border: '1px solid var(--border-medium)',
                fontWeight: 700,
              }}
              title="Track your solar application or quote status live"
            >
              <Clock size={13} />
              <span>Track Application</span>
            </button>
            <button
              type="button"
              className="top-bar__guide-trigger"
              onClick={() => openGuideModal()}
            >
              <BookOpen size={14} />
              <span>Get a Free Solar Guide</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <a
                href={companyConfig.contact.primaryPhoneHref}
                className="top-bar__phone"
                title="Primary Contact"
                style={{ fontWeight: 700 }}
              >
                <Phone size={14} />
                <span>{companyConfig.contact.primaryPhoneDisplay}</span>
              </a>
              <span className="top-bar__divider top-bar__hide-sm">•</span>
              <a
                href={companyConfig.contact.secondaryPhoneHref}
                className="top-bar__phone top-bar__hide-sm"
                title="Secondary Contact"
                style={{ opacity: 0.9, fontSize: '0.78rem' }}
              >
                <span>{companyConfig.contact.secondaryPhoneDisplay}</span>
              </a>
            </div>
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
                        onClick={() => handleNavClick(item.path)}
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
                            <Link
                              to={item.path}
                              onClick={() => handleNavClick(item.path)}
                              className="desktop-dropdown__overview"
                            >
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
                                    onClick={() => handleNavClick(sub.path)}
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
