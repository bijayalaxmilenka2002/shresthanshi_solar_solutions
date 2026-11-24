import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Container } from '@views/components/ui/Container';
import { SectionHeading } from '@views/components/ui/SectionHeading';
import { Accordion } from '@views/components/ui/Accordion';
import { Button } from '@views/components/ui/Button';
import { Breadcrumbs } from '@views/components/common/Breadcrumbs';
import { CTASection } from '@views/components/common/CTASection';
import { SEO } from '@views/components/common/SEO';
import { faqItems } from '@models/data/faqs';
import { useSolarGuideModal } from '@controllers/hooks/useSolarGuideModal';

export const SolarFaqsPage: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();
  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General Solar' },
    { id: 'residential', label: 'Residential Rooftop' },
    { id: 'agricultural', label: 'Solar Water Pumps' },
    { id: 'commercial', label: 'Commercial Solar' },
    { id: 'subsidy', label: 'Subsidies & Schemes' },
    { id: 'maintenance', label: 'Maintenance' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs =
    activeCategory === 'all'
      ? faqItems
      : faqItems.filter((f) => f.category === activeCategory);

  return (
    <div>
      <SEO
        title="Solar FAQs — Common Rooftop, Pump & Subsidy Questions"
        description="Clear, practical answers to solar energy questions in Odisha: system sizing, net-metering, battery needs, rainy season performance, and government subsidies."
        canonicalPath="/resources/solar-faqs"
      />
      <Breadcrumbs
        items={[
          { label: 'Resources', path: '/resources' },
          { label: 'Solar FAQs' },
        ]}
      />

      <section className="page-hero bg-soft-green" style={{ padding: '2rem 0' }}>
        <Container>
          <div
            style={{
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(23, 75, 53, 0.08)',
              border: '1.5px solid var(--border-medium)',
              backgroundColor: '#FFFFFF',
            }}
          >
            <img
              src="/images/solar-faqs-banner.jpg"
              alt="Questions Worth Asking Before Going Solar — Solar Knowledge Base"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '1024 / 341',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Accessible SEO Headings for search crawlers & screen readers */}
          <div className="sr-only">
            <h1>Questions Worth Asking Before Going Solar.</h1>
            <p>
              Straightforward answers to common questions about solar system sizing, roof space, cloudy-day generation, battery storage, agricultural water pumps, and government scheme eligibility.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Interactive FAQ Directory"
            title="Browse Frequently Asked Questions by Topic"
          />

          <div className="filter-tabs" role="tablist" aria-label="FAQ categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`filter-tab ${activeCategory === cat.id ? 'filter-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="faq-container">
            <Accordion items={filteredFaqs} defaultOpenIndex={0} />
          </div>

          <div className="process-cta-bar" style={{ marginTop: '3rem' }}>
            <p>Didn’t find your specific question here? Ask our team directly or request our free guide.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/contact" variant="primary" size="md" iconRight={<ArrowRight size={16} />}>
                Ask Our Team
              </Button>
              <Button
                variant="outline"
                size="md"
                iconLeft={<BookOpen size={16} />}
                onClick={() => openGuideModal('Question from Solar FAQs Page')}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CTASection prefillTopic="Solar FAQs Enquiry" />
    </div>
  );
};

