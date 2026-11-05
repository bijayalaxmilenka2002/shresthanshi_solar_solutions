import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';

gsap.registerPlugin(ScrollTrigger);

interface StaggeredProductItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  path: string;
  imageSrc: string;
  imageAlt: string;
}

const leftColumnProducts: StaggeredProductItem[] = [
  {
    id: 'prod-commercial-solar',
    title: 'Commercial Solar Systems',
    subtitle: 'Daytime three-phase solar power for shops, offices, workshops & institutions',
    tag: 'Businesses & Institutions',
    path: '/solar-solutions/commercial-solar',
    imageSrc: '/images/solar/commercial-rooftop.jpg',
    imageAlt: 'Commercial Solar Installation',
  },
  {
    id: 'prod-sensor-pumps',
    title: 'Solar Overhead Water Sensor Pumps',
    subtitle: 'Automated solar water pumping & community water filtration systems',
    tag: 'Rural & Community Water',
    path: '/solar-solutions/solar-water-pumps',
    imageSrc: '/images/solar/solar-overhead-sensor-pump.jpg',
    imageAlt: 'Solar Overhead Water Sensor Pump & Community Water System',
  },
];

const rightColumnProducts: StaggeredProductItem[] = [
  {
    id: 'prod-residential-solar',
    title: 'Residential Rooftop Solar',
    subtitle: 'On-grid & hybrid home rooftop solar sized for household utility bills',
    tag: 'Homeowners & Families',
    path: '/solar-solutions/residential-rooftop-solar',
    imageSrc: '/images/solar/residential-rooftop.jpg',
    imageAlt: 'Residential Rooftop Solar Installation',
  },
  {
    id: 'prod-water-pumps',
    title: 'Agricultural Solar Water Pumps',
    subtitle: 'Standalone submersible & surface solar pumps with borewell integration',
    tag: 'Farmers & Agriculture',
    path: '/solar-solutions/solar-water-pumps',
    imageSrc: '/images/existing/SOL-PUMP.jpg',
    imageAlt: 'Agricultural Solar Water Pump System',
  },
];

export const SunchargeShowcaseSections: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxImgsRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Smooth Parallax on Solutions Section only
      mm.add('(min-width: 992px)', () => {
        // Fluid Parallax for the solutions section images matching Suncharge data-speed="0.8"
        const parallaxImgs = parallaxImgsRef.current.filter(Boolean) as HTMLImageElement[];
        parallaxImgs.forEach((img) => {
          const card = img.closest('.suncharge-product-item') || img.parentElement;
          if (!card) return;

          gsap.fromTo(
            img,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        });

        // Smooth viewport reveal for staggered cards
        const productCards = gsap.utils.toArray<HTMLElement>('.suncharge-product-item');
        productCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="suncharge-products-section" aria-label="Our Solar Solutions">
        <Container>
          <div className="suncharge-products-grid">
            {/* Left Column: Sun-Ray Eyebrow + Heading + Staggered Left Cards */}
            <div className="suncharge-products-col suncharge-products-col--left">
              <div className="suncharge-products-intro" data-reveal="up">
                <span className="suncharge-products-eyebrow">
                  <svg
                    width="34"
                    height="21"
                    viewBox="0 0 42.17 25.46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M27.76,25.26a11.23,11.23,0,0,0-10.94-10.9A11.84,11.84,0,0,0,4.56,23.68c-.09.48,2.16.65,2.3,0,.95-4.58,5.18-9,10.08-8.42s8.44,5.24,8.52,10.07c0,.6,2.31.57,2.3,0"
                      transform="translate(-0.28 -0.27)"
                    />
                    <path
                      fill="currentColor"
                      d="M.33,15.29c.29-.43,1.71,0,1.74,0l.11.09.26.24c.22.2.5.46.78.74.55.56,1.07,1.17.92,1.39s-.91,0-1.64-.26c-.37-.14-.73-.29-1-.41l-.33-.14L1,16.87S0,15.73.33,15.29"
                      transform="translate(-0.28 -0.27)"
                    />
                    <path
                      fill="currentColor"
                      d="M7.48,13.65c-.21.16-.72-.14-1.2-.46s-.9-.68-.92-.7L4,10.55c-.68-1-1.38-1.94-1.2-2.13S4,8.86,5,9.63c.47.37.93.78,1.27,1.1.17.15.31.29.41.39l.16.16a7.17,7.17,0,0,1,.52,1.08c.22.55.36,1.14.15,1.29"
                      transform="translate(-0.28 -0.27)"
                    />
                    <path
                      fill="currentColor"
                      d="M8.85,3.77c.25-.06.64.49,1,1.06S10.45,6,10.46,6s.07.36.18.87.24,1.18.37,1.86c.26,1.35.5,2.71.25,2.8s-.93-1.12-1.52-2.39C9.44,8.53,9.17,7.89,9,7.4c-.09-.25-.18-.46-.23-.6l-.1-.25a11.59,11.59,0,0,1-.1-1.36c0-.67.06-1.35.31-1.42"
                      transform="translate(-0.28 -0.27)"
                    />
                    <path
                      fill="currentColor"
                      d="M16.42,10.58c-.52,0-1-3.18-1-3.27s.23-7,.76-7,1.13,6.88,1.13,7-.33,3.31-.85,3.32"
                      transform="translate(-0.28 -0.27)"
                    />
                    <path
                      fill="currentColor"
                      d="M25.06.28c.24.11,0,1.06-.19,2s-.51,1.86-.53,1.91-.23.49-.57,1.18S23,7,22.59,7.91c-.86,1.85-1.67,3.72-1.92,3.65s.11-2.1.66-4.1c.27-1,.58-2,.83-2.74.12-.37.23-.68.31-.9s.12-.36.13-.37.5-.91,1-1.72S24.83.17,25.06.28"
                      transform="translate(-0.28 -0.27)"
                    />
                    <path
                      fill="currentColor"
                      d="M32.82,4.57c.4.33-1.81,3.6-1.87,3.68s-5.84,6.24-6.24,5.9S29.43,7.1,29.5,7s2.93-2.79,3.32-2.45"
                      transform="translate(-0.28 -0.27)"
                    />
                    <path
                      fill="currentColor"
                      d="M39,11.05c.27.45-3,2.87-3.06,2.93s-7.75,4.12-8,3.67,7-5.24,7-5.3,3.76-1.75,4-1.3"
                      transform="translate(-0.28 -0.27)"
                    />
                    <path
                      fill="currentColor"
                      d="M42.45,19.78c.09.52-3.88,1.65-4,1.67s-8.87,1.14-9,.63,8.52-2.47,8.63-2.49,4.22-.32,4.32.19"
                      transform="translate(-0.28 -0.27)"
                    />
                  </svg>
                  <span>OUR SOLUTIONS</span>
                </span>
                <h2 className="suncharge-products-heading">
                  Take a look <br /> at our solutions
                </h2>
              </div>

              {leftColumnProducts.map((item, idx) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="suncharge-product-item"
                >
                  <div className="suncharge-product-item__frame">
                    <div className="suncharge-product-item__img-wrap">
                      <img
                        ref={(el) => {
                          parallaxImgsRef.current[idx] = el;
                        }}
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="suncharge-product-item__img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="suncharge-product-item__caption">
                    <h3 className="suncharge-product-item__title">{item.title}</h3>
                    <p className="suncharge-product-item__sub">{item.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Column: Starts at Top (Staggered Higher than Left Cards) */}
            <div className="suncharge-products-col suncharge-products-col--right">
              {rightColumnProducts.map((item, idx) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="suncharge-product-item"
                >
                  <div className="suncharge-product-item__frame">
                    <div className="suncharge-product-item__img-wrap">
                      <img
                        ref={(el) => {
                          parallaxImgsRef.current[leftColumnProducts.length + idx] = el;
                        }}
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="suncharge-product-item__img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="suncharge-product-item__caption">
                    <h3 className="suncharge-product-item__title">{item.title}</h3>
                    <p className="suncharge-product-item__sub">{item.subtitle}</p>
                  </div>
                </Link>
              ))}

              {/* View All / Explore Solutions Pill CTA Button */}
              <div className="suncharge-products-cta-wrap">
                <Link to="/solar-solutions" className="suncharge-pill-btn suncharge-pill-btn--solid">
                  <span className="suncharge-pill-btn__text">EXPLORE ALL SOLUTIONS</span>
                  <span className="suncharge-pill-btn__circle" aria-hidden="true">
                    <ArrowRight size={17} className="suncharge-pill-btn__arrow-first" />
                    <ArrowRight size={17} className="suncharge-pill-btn__arrow-second" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
  );
};
