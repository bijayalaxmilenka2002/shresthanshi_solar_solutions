import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../common/Logo';
import { Button } from '../ui/Button';
import { companyConfig } from '../../data/company';
import { footerLegalLinks } from '../../data/navigation';
import { getSolarSolutions } from '../../data/solutions';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';
import { useSiteSettings } from '../../app/providers';

export const Footer: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();
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
              Solar energy, borewell irrigation, and sustainable infrastructure across Kalahandi and Odisha.
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
                <Link to="/projects">Our Projects</Link>
              </li>
              <li>
                <Link to="/gallery">Project Gallery</Link>
              </li>
              <li>
                <Link to="/media"><strong>Media &amp; Verification</strong></Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
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
                <a href={settings.contact.phoneHref || companyConfig.contact.phoneHref}>{settings.contact.phoneDisplay || companyConfig.contact.phoneDisplay}</a>
              </li>
              <li>
                <Mail size={18} className="site-footer__contact-icon" />
                <a href={`mailto:${settings.contact.email || companyConfig.contact.email}`}>{settings.contact.email || companyConfig.contact.email}</a>
              </li>
            </ul>
            <div className="site-footer__proprietor">
              <strong>Proprietor:</strong> {settings.contact.proprietor || companyConfig.founder.name}
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
