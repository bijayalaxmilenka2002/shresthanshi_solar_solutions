import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../common/Logo';
import { Button } from '../ui/Button';
import { companyConfig } from '@models/data/company';
import { footerLegalLinks } from '@models/data/navigation';
import { getSolarSolutions } from '@models/data/solutions';
import { useSolarGuideModal } from '@controllers/hooks/useSolarGuideModal';
import { useSiteSettings, useTrackModal } from '@/app/providers';

export const Footer: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();
  const { openTrackModal } = useTrackModal();
  const { settings } = useSiteSettings();
  const solutions = getSolarSolutions();

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          {/* Column 1: Brand & Verified Identity */}
          <div className="site-footer__brand">
            <Logo variant="dark-bg" />
            <p className="site-footer__desc">
              Solar energy, borewell irrigation, and sustainable infrastructure engineered from our Head Office in Kalahandi, with our sub-branch in Bhubaneswar, Odisha.
            </p>
            <div className="site-footer__gst-badge">
              <ShieldCheck size={16} />
              <span>GSTIN: {companyConfig.gstin}</span>
            </div>
            <div style={{ marginTop: '1.15rem' }}>
              <Button
                variant="inverse"
                size="sm"
                iconLeft={<BookOpen size={16} />}
                iconRight={<ArrowRight size={16} />}
                onClick={() => openGuideModal()}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>

          {/* Column 2: Services & Solutions */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Services &amp; Solutions</h3>
            <ul className="site-footer__links">
              <li>
                <Link to="/services"><strong>All Services Overview</strong></Link>
              </li>
              <li>
                <Link to="/solar-solutions/residential-rooftop-solar">Residential Rooftop Solar</Link>
              </li>
              <li>
                <Link to="/solar-solutions/commercial-solar">Commercial Solar Plants</Link>
              </li>
              <li>
                <Link to="/solar-solutions/solar-water-pumps">Solar Water Pumps &amp; Controllers</Link>
              </li>
              <li>
                <Link to="/solar-solutions/solar-street-lighting">Solar Street Lighting Systems</Link>
              </li>
              <li>
                <Link to="/solar-solutions/solar-maintenance-support">Solar Operation, Maintenance &amp; AMC</Link>
              </li>
              <li>
                <Link to="/resources/subsidy-scheme-guidance">PM Surya Ghar Subsidy Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Who We Serve & Company */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Explore</h3>
            <ul className="site-footer__links">
              <li>
                <Link to="/who-we-serve/homeowners">For Homeowners</Link>
              </li>
              <li>
                <Link to="/who-we-serve/farmers">For Farmers</Link>
              </li>
              <li>
                <Link to="/who-we-serve/businesses-institutions">For Businesses &amp; Institutions</Link>
              </li>
              <li>
                <Link to="/who-we-serve/government"><strong>Government &amp; Public Sector</strong></Link>
              </li>
              <li>
                <Link to="/testimonials">Customer Testimonials</Link>
              </li>
              <li>
                <Link to="/licences-and-certifications"><strong>Licences &amp; Certifications</strong></Link>
              </li>
              <li>
                <Link to="/projects">Our Projects</Link>
              </li>
              <li>
                <Link to="/gallery">Project Gallery</Link>
              </li>
              <li>
                <Link to="/about">About Us &amp; Media</Link>
              </li>
              <li>
                <Link to="/resources">Resources &amp; Subsidy</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li style={{ marginTop: '0.4rem' }}>
                <button
                  type="button"
                  onClick={() => openTrackModal()}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-soft-green)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    textAlign: 'left',
                  }}
                >
                  <span>Track Application Status</span>
                  <span style={{ fontSize: '0.65rem', backgroundColor: '#22C55E', color: '#FFFFFF', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 800 }}>LIVE</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Head Office & Verified Contact */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Head Office &amp; Contact</h3>
            <ul className="site-footer__contact-list">
              <li>
                <MapPin size={18} className="site-footer__contact-icon" />
                <span>{settings.contact.address || companyConfig.contact.address.full}</span>
              </li>
              <li>
                <Phone size={18} className="site-footer__contact-icon" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <a href={companyConfig.contact.primaryPhoneHref} style={{ fontWeight: 700 }}>
                    {companyConfig.contact.primaryPhoneDisplay} <span style={{ fontSize: '0.75rem', color: 'var(--color-soft-green)' }}>(Primary)</span>
                  </a>
                  <a href={companyConfig.contact.secondaryPhoneHref} style={{ opacity: 0.9 }}>
                    {companyConfig.contact.secondaryPhoneDisplay} <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>(Secondary)</span>
                  </a>
                </div>
              </li>
              <li>
                <Mail size={18} className="site-footer__contact-icon" />
                <a href={`mailto:${settings.contact.email || companyConfig.contact.email}`}>{settings.contact.email || companyConfig.contact.email}</a>
              </li>
            </ul>
            <div className="site-footer__proprietor">
              <strong>Proprietor:</strong> {settings.contact.proprietor || companyConfig.founder.name}
            </div>

            {/* Social Media Channels (Right Side of Footer) */}
            <div className="site-footer__social">
              <div className="site-footer__social-title">
                Connect With Us
              </div>
              <div className="site-footer__social-list">
                {/* Facebook */}
                <a
                  href={settings?.social?.facebook || companyConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn footer-social-btn--facebook"
                  aria-label="Facebook Page — Shreshtanshi Solar Solutions"
                  title="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={settings?.social?.instagram || companyConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn footer-social-btn--instagram"
                  aria-label="Instagram Profile — Shreshtanshi Solar Solutions"
                  title="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={settings?.social?.youtube || companyConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn footer-social-btn--youtube"
                  aria-label="YouTube Channel — Shreshtanshi Solar Solutions"
                  title="YouTube"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Grievance Links */}
        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            &copy; {new Date().getFullYear()} {companyConfig.legalName}. All rights reserved.
          </p>
          <ul className="site-footer__legal">
            {footerLegalLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};
