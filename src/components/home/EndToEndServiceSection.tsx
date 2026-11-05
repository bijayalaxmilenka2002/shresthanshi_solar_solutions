import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';

export interface StackServiceItem {
  id: string;
  stepNumber: string;
  stepSubtitle: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  path: string;
  actionText: string;
}

export const stackServiceItems: StackServiceItem[] = [
  {
    id: 'stack-assessment',
    stepNumber: '01',
    stepSubtitle: 'Feasibility & Sizing',
    title: 'Site Assessment & Customized Design',
    description:
      'Every property is unique, so we begin with a detailed site assessment to evaluate energy consumption, shadow patterns, and structural feasibility. We engineer a tailored solar solution that maximizes daily yield, efficiency, and long-term savings.',
    imageSrc: '/images/solar/solar-site-assessment.jpg',
    imageAlt: 'Site Assessment & Customized Design in Odisha',
    path: '/contact?intent=assessment',
    actionText: 'Schedule Assessment',
  },
  {
    id: 'stack-installation',
    stepNumber: '02',
    stepSubtitle: 'Precision Engineering',
    title: 'Professional Fabrication & Installation',
    description:
      'Our certified installation and fabrication team ensures every solar mounting structure and electrical balance-of-system is built with precision, following rigorous standards for earthing pits, weather durability, and DISCOM net-metering readiness.',
    imageSrc: '/images/existing/FBR-1.jpg',
    imageAlt: 'In-House Fabrication & Solar Installation',
    path: '/projects',
    actionText: 'View Installations',
  },
  {
    id: 'stack-maintenance',
    stepNumber: '03',
    stepSubtitle: 'Lifelong Reliability',
    title: 'Ongoing Maintenance and Support',
    description:
      'Our commitment continues long after commissioning with reliable preventive maintenance and dedicated local support. Regular system health checks, panel cleaning, and prompt technical assistance ensure your solar investment performs efficiently for decades.',
    imageSrc: '/images/solar/solar-maintenance.jpg',
    imageAlt: 'Ongoing Solar Maintenance and Support',
    path: '/solar-solutions/solar-maintenance-support',
    actionText: 'Explore Solar Maintenance',
  },
];

export const EndToEndServiceSection: React.FC = () => {
  return (
    <section
      className="end-to-end-section bg-white"
      aria-label="End-to-End Solar Service"
    >
      <Container>
        <div className="end-to-end-header">
          <div className="end-to-end-header__text">
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              Complete Solar Lifecycle
            </span>
            <h2 className="end-to-end-header__title">
              END-TO-END SOLAR SERVICE
            </h2>
            <p className="end-to-end-header__subtitle">
              From consultation to installation and beyond, we handle everything with certified in-house engineering—so you don&apos;t have to.
            </p>
          </div>
          <div className="end-to-end-header__action">
            <Link to="/contact?intent=assessment" className="suncharge-pill-btn">
              <span className="suncharge-pill-btn__text">GET A QUOTE</span>
              <span className="suncharge-pill-btn__circle" aria-hidden="true">
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-first" />
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-second" />
              </span>
            </Link>
          </div>
        </div>

        <div className="end-to-end-grid">
          {stackServiceItems.map((item) => (
            <div key={item.id} className="end-to-end-card">
              <div className="end-to-end-card__media">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="end-to-end-card__img"
                  loading="lazy"
                />
                <div className="end-to-end-card__step-badge">
                  <span>STEP {item.stepNumber}</span>
                  <span className="end-to-end-card__step-sep">•</span>
                  <span>{item.stepSubtitle}</span>
                </div>
              </div>

              <div className="end-to-end-card__body">
                <h3 className="end-to-end-card__title">
                  <Link to={item.path} className="end-to-end-card__title-link">
                    {item.title}
                  </Link>
                </h3>
                <p className="end-to-end-card__desc">{item.description}</p>

                <div className="end-to-end-card__footer">
                  <Link to={item.path} className="end-to-end-card__btn">
                    <span>{item.actionText}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

