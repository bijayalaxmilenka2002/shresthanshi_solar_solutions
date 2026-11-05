import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, ChevronDown, Phone, BookOpen, Mail } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../ui/Button';
import { getPrimaryNavigation } from '../../data/navigation';
import { companyConfig } from '../../data/company';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';
import { useQuoteModal } from '../../hooks/useQuoteModal';
import { useSiteSettings } from '../../app/providers';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navItems = getPrimaryNavigation();
  const { openGuideModal } = useSolarGuideModal();
  const { openQuoteModal } = useQuoteModal();
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSubmenu = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <div
      className="mobile-menu-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="mobile-menu-drawer">
        <div className="mobile-menu__top">
          <Logo variant="light-bg" />
          <button
            type="button"
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__list">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isExpanded = expandedItem === item.label;

              return (
                <li key={item.path} className="mobile-menu__item">
                  <div className="mobile-menu__row">
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>
                    {hasChildren && (
                      <button
                        type="button"
                        className="mobile-menu__expand"
                        onClick={() => toggleSubmenu(item.label)}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          size={18}
                          className={isExpanded ? 'mobile-menu__chevron--open' : ''}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && isExpanded && item.children && (
                    <ul className="mobile-menu__sublist">
                      <li>
                        <NavLink
                          to={item.path}
                          end
                          onClick={onClose}
                          className="mobile-menu__sublink mobile-menu__sublink--overview"
                        >
                          Overview: All {item.label}
                        </NavLink>
                      </li>
                      {item.children.map((sub) => (
                        <li key={sub.path}>
                          <NavLink
                            to={sub.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `mobile-menu__sublink ${
                                isActive ? 'mobile-menu__sublink--active' : ''
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            onClick={() => {
              onClose();
              openQuoteModal('Residential Rooftop Solar');
            }}
          >
            Get a Quote
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            iconLeft={<BookOpen size={16} />}
            onClick={() => {
              onClose();
              openGuideModal();
            }}
          >
            Get a Free Solar Guide
          </Button>
          <div className="mobile-menu__contact">
            <a href={settings.contact.phoneHref || companyConfig.contact.phoneHref}>
              <Phone size={15} />
              <span>{settings.contact.phoneDisplay || companyConfig.contact.phoneDisplay}</span>
            </a>
            <a href={`mailto:${settings.contact.email || companyConfig.contact.email}`}>
              <Mail size={15} />
              <span>{settings.contact.email || companyConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

