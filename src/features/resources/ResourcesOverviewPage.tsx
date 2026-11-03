import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  Clock,
  HelpCircle,
  FileCheck2,
  CheckCircle2,
  Sun,
  Calculator,
  Landmark,
  Wrench,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { resourceArticles } from '../../data/resources';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';

interface ResourcesOverviewPageProps {
  isArticlesSubpage?: boolean;
}

export const ResourcesOverviewPage: React.FC<ResourcesOverviewPageProps> = ({
  isArticlesSubpage = false,
}) => {
  const { openGuideModal } = useSolarGuideModal();
  const categories = [
    'All',
    'Fundamentals',
    'Cost & Sizing',
    'Government Schemes',
    'Operations & Care',
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredArticles =
    selectedCategory === 'All'
      ? resourceArticles
      : resourceArticles.filter((a) => a.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Fundamentals':
        return <Sun size={12} />;
      case 'Cost & Sizing':
        return <Calculator size={12} />;
      case 'Government Schemes':
        return <Landmark size={12} />;
      case 'Operations & Care':
        return <Wrench size={12} />;
      default:
        return <BookOpen size={12} />;
    }
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return resourceArticles.length;
    return resourceArticles.filter((a) => a.category === cat).length;
  };

  return (
    <div>
      <SEO
        title={isArticlesSubpage ? 'Solar Guides & Knowledge Articles' : 'Solar Resources & Scheme Guidance'}
        description="Practical educational guides on solar system sizing, installation costs, battery storage, PM Surya Ghar subsidy, PM-KUSUM, and preventive solar care."
        canonicalPath={isArticlesSubpage ? '/resources/guides-articles' : '/resources'}
      />
      <Breadcrumbs
        items={
          isArticlesSubpage
            ? [
                { label: 'Resources', path: '/resources' },
                { label: 'Solar Guides and Articles' },
              ]
            : [{ label: 'Resources' }]
        }
      />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Educational Content Library
            </span>
            <h1 className="page-hero__title">
              {isArticlesSubpage
                ? 'Solar Guides & Articles'
                : 'Solar Resources & Scheme Guides'}
            </h1>
            <p className="page-hero__subtitle">
              Concise guides on solar sizing, roof suitability, battery backup, PM Surya Ghar, PM-KUSUM, and routine care.
            </p>
            <div className="page-hero__actions">
              <Button
                variant="primary"
                size="lg"
                iconLeft={<BookOpen size={18} />}
                onClick={() => openGuideModal('Resources Library')}
              >
                Get a Free Solar Guide
              </Button>
              <Button to="/resources/solar-faqs" variant="outline" size="lg">
                Browse Solar FAQs
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: rooftop solar installation]"
              sublabel="Solar Buyer's Resource Library"
              aspectRatio="16/10"
              variant="white"
              src="/images/page-hero-solar-home.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      {/* Quick Resource Hub Cards */}
      <section className="section-sm bg-white">
        <Container>
          <div className="grid-3">
            <Card variant="soft-green" padding="lg" hoverable>
              <div className="benefit-card__icon">
                <HelpCircle size={22} />
              </div>
              <h3>Solar FAQs</h3>
              <p style={{ margin: '0.4rem 0 0.85rem', fontSize: 'var(--text-sm)' }}>
                Quick answers on rooftop sizing, water pumps, and cloudy-day output.
              </p>
              <Link to="/resources/solar-faqs" className="ui-text-link">
                <span>View Solar FAQs</span>
                <ArrowRight size={16} />
              </Link>
            </Card>

            <Card variant="soft-green" padding="lg" hoverable>
              <div className="benefit-card__icon">
                <FileCheck2 size={22} />
              </div>
              <h3>Subsidy &amp; Scheme Guidance</h3>
              <p style={{ margin: '0.4rem 0 0.85rem', fontSize: 'var(--text-sm)' }}>
                Overview of PM Surya Ghar (residential) and PM-KUSUM (farm pumps).
              </p>
              <Link to="/resources/subsidy-scheme-guidance" className="ui-text-link">
                <span>Read Subsidy Guide</span>
                <ArrowRight size={16} />
              </Link>
            </Card>

            <Card variant="soft-green" padding="lg" hoverable>
              <div className="benefit-card__icon">
                <BookOpen size={22} />
              </div>
              <h3>Free Solar Buyer’s Guide</h3>
              <p style={{ margin: '0.4rem 0 0.85rem', fontSize: 'var(--text-sm)' }}>
                Pre-investment checklist covering utility bills, roof area, and sizing.
              </p>
              <button
                type="button"
                className="ui-text-link"
                onClick={() => openGuideModal('Download Free Solar Guide')}
              >
                <span>Get Free Solar Guide</span>
                <ArrowRight size={16} />
              </button>
            </Card>
          </div>
        </Container>
      </section>

      {/* Educational Topic Cards */}
      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="10 Essential Topics"
            title="Solar Guides Library"
          />

          <div className="filter-tabs" role="tablist" aria-label="Resource categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`filter-tab ${selectedCategory === cat ? 'filter-tab--active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <span className="filter-tab__count">{getCategoryCount(cat)}</span>
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filteredArticles.map((article) => {
              const fallbackImage = '/images/page-hero-solar-home.jpg';
              const cardImage = article.imageSrc || fallbackImage;
              const primaryTakeaway =
                article.keyTakeaways && article.keyTakeaways.length > 0
                  ? article.keyTakeaways[0]
                  : null;

              return (
                <div key={article.id} className="resource-card">
                  <div className="resource-card__media">
                    <img
                      src={cardImage}
                      alt={article.title}
                      className="resource-card__img"
                      loading="lazy"
                    />
                    <div className="resource-card__overlay" />
                    <div className="resource-card__badges">
                      <span className="resource-card__category-badge">
                        {getCategoryIcon(article.category)}
                        <span>{article.category}</span>
                      </span>
                      <span className="resource-card__time-chip">
                        <Clock size={12} />
                        <span>{article.readTime}</span>
                      </span>
                    </div>
                  </div>

                  <div className="resource-card__body">
                    <h3 className="resource-card__title">
                      <Link to={`/resources/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="resource-card__excerpt">{article.excerpt}</p>

                    {primaryTakeaway && (
                      <div className="resource-card__takeaway">
                        <CheckCircle2 size={14} />
                        <span className="resource-card__takeaway-text">{primaryTakeaway}</span>
                      </div>
                    )}

                    <div className="resource-card__footer">
                      <span className="resource-card__doc-hint">
                        <BookOpen size={13} />
                        <span>Detailed Guide</span>
                      </span>
                      <Link
                        to={`/resources/articles/${article.slug}`}
                        className="resource-card__action-btn"
                        aria-label={`Read guide: ${article.title}`}
                      >
                        <span>Read Guide</span>
                        <ArrowRight size={14} className="resource-card__arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        headline="Have a Question About Your Roof or Borewell?"
        supportingCopy="Our Kalahandi team will help you evaluate your exact site."
        prefillTopic="Resources Library Question"
        image="[Image: rooftop solar installation]"
      />
    </div>
  );
};
