import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { resourceArticles } from '../../data/resources';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';

export const ResourceArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openGuideModal } = useSolarGuideModal();

  const article = resourceArticles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const relatedArticles = resourceArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonicalPath={`/resources/articles/${article.slug}`}
        ogImage={article.imageSrc}
        ogType="article"
      />
      <Breadcrumbs
        items={[
          { label: 'Resources', path: '/resources' },
          { label: 'Solar Guides and Articles', path: '/resources/guides-articles' },
          { label: article.title },
        ]}
      />

      <article className="section bg-white">
        <Container>
          <div className="article-layout">
            <div className="article-layout__main">
              <Link to="/resources" className="ui-text-link" style={{ marginBottom: '1.25rem' }}>
                <ArrowLeft size={16} />
                <span>Back to All Solar Resources</span>
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span className="badge">{article.category}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  <Clock size={14} /> {article.readTime}
                </span>
              </div>

              <h1 style={{ fontSize: 'var(--text-4xl)', marginBottom: '1rem' }}>{article.title}</h1>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {article.excerpt}
              </p>

              {article.imageSrc && (
                <div
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginBottom: '2rem',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    maxHeight: '380px',
                  }}
                >
                  <img
                    src={article.imageSrc}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', maxHeight: '380px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              {/* Key Takeaways Box */}
              <Card variant="soft-green" padding="lg" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.875rem' }}>
                  Key Takeaways
                </h2>
                <ul className="feature-list">
                  {article.keyTakeaways.map((pt) => (
                    <li key={pt} className="feature-list-item">
                      <span className="feature-list-icon">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Article Sections */}
              {article.sections.map((sec) => (
                <div key={sec.heading} style={{ marginBottom: '2.25rem' }}>
                  <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: '0.875rem' }}>
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx} style={{ marginBottom: '1rem' }}>
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="feature-list" style={{ marginTop: '1rem' }}>
                      {sec.bullets.map((b) => (
                        <li key={b} className="feature-list-item">
                          <span className="feature-list-icon">
                            <CheckCircle2 size={14} />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Related Solution Action Box */}
              <Card variant="outlined" padding="lg" style={{ marginTop: '2.5rem' }}>
                <h3>Explore the Corresponding Solar Solution</h3>
                <p style={{ margin: '0.5rem 0 1.25rem' }}>
                  See how our engineering team applies these principles in the field across Odisha.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button
                    to={article.relatedSolutionPath}
                    variant="primary"
                    size="md"
                    iconRight={<ArrowRight size={16} />}
                  >
                    {article.relatedSolutionLabel}
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    iconLeft={<BookOpen size={16} />}
                    onClick={() => openGuideModal(`Reading article: ${article.title}`)}
                  >
                    Get a Free Solar Guide
                  </Button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="article-layout__sidebar">
              <Card variant="soft-green" padding="lg">
                <h3>Need a Site-Specific Answer?</h3>
                <p style={{ fontSize: 'var(--text-sm)', margin: '0.5rem 0 1.25rem' }}>
                  Every roof and farmland has unique conditions. Talk to our team in Kalahandi for a straightforward assessment.
                </p>
                <Button to="/contact" variant="primary" size="md" fullWidth>
                  Contact Our Team
                </Button>
              </Card>

              <Card variant="white" padding="lg" style={{ marginTop: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: 'var(--text-lg)' }}>More Solar Guides</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedArticles.map((rel) => (
                    <li key={rel.id} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                      <Link to={`/resources/articles/${rel.slug}`} className="ui-text-link" style={{ fontWeight: 600 }}>
                        <span>{rel.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          </div>
        </Container>
      </article>

      <CTASection prefillTopic={`Article Enquiry: ${article.title}`} />
    </div>
  );
};

