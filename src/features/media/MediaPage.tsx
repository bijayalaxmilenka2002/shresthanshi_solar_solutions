import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Award,
  Video,
  MapPin,
  Calendar,
  ShieldCheck,
  Search,
  Maximize2,
  Play,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO } from '../../components/common/SEO';
import { CTASection } from '../../components/common/CTASection';
import { mediaItems, mediaCategories, MediaCategory, MediaItem } from '../../data/mediaData';

export const MediaPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as MediaCategory) || 'all';

  const [activeCategory, setActiveCategory] = useState<MediaCategory>(
    mediaCategories.some((c) => c.id === initialCategory) ? initialCategory : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleCategoryChange = (cat: MediaCategory) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: cat }, { replace: true });
    }
  };

  // Filtered Media List
  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        (item.verifiedBy && item.verifiedBy.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mediaItems.length };
    mediaItems.forEach((m) => {
      counts[m.category] = (counts[m.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div>
      <SEO
        title="Verified Media, DISCOM Awards & Field Videos — Kalahandi, Odisha"
        description="Browse official TPWODL awards, MNRE national summit credentials, GPS-tagged rooftop solar installations, and on-site video walkthroughs across Kalahandi and Odisha."
        canonicalPath="/media"
        ogImage="/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg"
      />

      <Breadcrumbs items={[{ label: 'Media & Field Documents' }]} />

      {/* =========================================================================
          PAGE HERO SECTION
          ========================================================================= */}
      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span
              className="badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '1rem',
                backgroundColor: 'var(--color-white)',
                borderColor: 'var(--border-medium)',
              }}
            >
              <ShieldCheck size={14} color="#174B35" />
              <span>Official Proof &amp; Verified Documentation</span>
            </span>
            <h1 className="page-hero__title">
              Authentic Project Media, DISCOM Awards &amp; Field Executions.
            </h1>
            <p className="page-hero__subtitle">
              Transparency matters in solar. Explore our official TPWODL utility awards, national summit invitations from MNRE New Delhi, GPS-verified rooftop installations, and live video walkthroughs filmed on client sites across Kalahandi and western Odisha.
            </p>
          </div>

          <div className="page-hero__visual">
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '2px solid var(--border-medium)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <img
                src="/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg"
                alt="Highest rooftop solar installations award in Kalahandi district"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                loading="eager"
              />
              <div
                style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.82rem',
                  color: 'var(--color-forest-green)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <Award size={16} color="#15803D" />
                <span>District Award: Highest PM Surya Ghar Installations in Kalahandi</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          VERIFICATION HIGHLIGHTS STRIP
          ========================================================================= */}
      <div
        style={{
          backgroundColor: '#174B35',
          color: '#FFFFFF',
          padding: '1.5rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: '#86EFAC' }}>
                Top 100
              </div>
              <div style={{ fontSize: '0.82rem', color: '#E8F2E8', opacity: 0.9 }}>
                Vendor Invitation by MNRE, New Delhi
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: '#86EFAC' }}>
                TPWODL
              </div>
              <div style={{ fontSize: '0.82rem', color: '#E8F2E8', opacity: 0.9 }}>
                Multiple Official Certificates of Appreciation
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: '#86EFAC' }}>
                100%
              </div>
              <div style={{ fontSize: '0.82rem', color: '#E8F2E8', opacity: 0.9 }}>
                GPS-Staggered Real Field Photographic Records
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: '#86EFAC' }}>
                5 HD
              </div>
              <div style={{ fontSize: '0.82rem', color: '#E8F2E8', opacity: 0.9 }}>
                Field Video Walkthroughs with On-Site Audio
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* =========================================================================
          MAIN MEDIA GALLERY SECTION
          ========================================================================= */}
      <section className="section bg-white" style={{ minHeight: '600px' }}>
        <Container>
          {/* Toolbar & Filters */}
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-forest-green)', margin: 0 }}>
                  Browse Documentation &amp; Media
                </h2>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  Showing {filteredMedia.length} of {mediaItems.length} verified records
                </p>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Filter by location, village, award..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    paddingLeft: '38px',
                    paddingRight: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-medium)',
                    fontSize: '0.86rem',
                    outline: 'none',
                    backgroundColor: '#FAFCFA',
                  }}
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {mediaCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.55rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isActive ? '1.5px solid #174B35' : '1.5px solid var(--border-subtle)',
                      backgroundColor: isActive ? '#174B35' : 'var(--color-soft-green)',
                      color: isActive ? '#FFFFFF' : 'var(--color-forest-green)',
                      whiteSpace: 'nowrap',
                      transition: 'all 150ms ease',
                      flexShrink: 0,
                    }}
                  >
                    <span>{cat.label}</span>
                    <span
                      style={{
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(23, 75, 53, 0.15)',
                        color: isActive ? '#FFFFFF' : '#174B35',
                        borderRadius: '999px',
                        padding: '0.1rem 0.45rem',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Media Grid */}
          {filteredMedia.length === 0 ? (
            <Card variant="white" padding="lg" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <Filter size={40} color="#174B35" style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#174B35', marginBottom: '0.5rem' }}>No Media Found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto' }}>
                No records matched "{searchQuery}". Try selecting another category or resetting the search filter.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            </Card>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {filteredMedia.map((item) => {
                const isVideo = item.type === 'video';

                return (
                  <Card
                    key={item.id}
                    variant="white"
                    padding="none"
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1.5px solid var(--border-medium)',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 18px rgba(23, 75, 53, 0.05)',
                      transition: 'transform 200ms ease, box-shadow 200ms ease',
                    }}
                  >
                    {/* Media Display Area */}
                    <div
                      style={{
                        position: 'relative',
                        backgroundColor: '#0F3324',
                        aspectRatio: '16/10',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedMedia(item)}
                    >
                      {isVideo ? (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                          <video
                            src={item.fileUrl}
                            preload="metadata"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                            muted
                            playsInline
                            loop
                            onMouseEnter={(e) => {
                              try {
                                e.currentTarget.play();
                              } catch {}
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'rgba(0,0,0,0.25)',
                              pointerEvents: 'none',
                            }}
                          >
                            <div
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(23, 75, 53, 0.9)',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid rgba(255,255,255,0.7)',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                              }}
                            >
                              <Play size={20} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                            </div>
                          </div>
                          <span
                            style={{
                              position: 'absolute',
                              bottom: '10px',
                              right: '10px',
                              backgroundColor: 'rgba(0,0,0,0.75)',
                              color: '#FFFFFF',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              letterSpacing: '0.04em',
                            }}
                          >
                            VIDEO
                          </span>
                        </div>
                      ) : (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                          <img
                            src={item.fileUrl}
                            alt={item.title}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                              transition: 'transform 300ms ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              backgroundColor: 'rgba(23, 75, 53, 0.85)',
                              color: '#FFFFFF',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backdropFilter: 'blur(4px)',
                            }}
                          >
                            <Maximize2 size={15} />
                          </div>
                        </div>
                      )}

                      {/* Badge Top Left */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: '#174B35',
                          color: '#FFFFFF',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3
                        style={{
                          fontSize: '1.02rem',
                          fontWeight: 700,
                          lineHeight: 1.35,
                          color: 'var(--color-forest-green)',
                          marginBottom: '0.65rem',
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--text-body)',
                          lineHeight: 1.55,
                          marginBottom: '1rem',
                          flex: 1,
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Meta Tags */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem',
                          fontSize: '0.76rem',
                          color: 'var(--text-muted)',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid var(--border-subtle)',
                        }}
                      >
                        {item.location && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <MapPin size={13} style={{ color: 'var(--color-forest-green)', flexShrink: 0 }} />
                            <span style={{ fontWeight: 600, color: 'var(--color-forest-green)' }}>
                              {item.location}
                            </span>
                          </div>
                        )}

                        {item.coordinates && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              📍 GPS: {item.coordinates}
                            </span>
                          </div>
                        )}

                        {item.verifiedBy && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                            <ShieldCheck size={13} style={{ color: '#16A34A', flexShrink: 0 }} />
                            <span style={{ color: '#166534', fontWeight: 600 }}>
                              Verified: {item.verifiedBy}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div style={{ marginTop: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedMedia(item)}
                          style={{
                            width: '100%',
                            padding: '0.6rem 0.85rem',
                            borderRadius: '8px',
                            backgroundColor: 'var(--color-soft-green)',
                            color: 'var(--color-forest-green)',
                            border: '1px solid var(--border-medium)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            cursor: 'pointer',
                            transition: 'all 150ms ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#174B35';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-soft-green)';
                            e.currentTarget.style.color = 'var(--color-forest-green)';
                          }}
                        >
                          {isVideo ? (
                            <>
                              <Play size={14} fill="currentColor" />
                              <span>Play Full Video</span>
                            </>
                          ) : (
                            <>
                              <Maximize2 size={14} />
                              <span>View Full Document</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* =========================================================================
          LIGHTBOX MODAL FOR FULL-RESOLUTION MEDIA INSPECTION
          ========================================================================= */}
      {selectedMedia && (
        <Modal
          isOpen={Boolean(selectedMedia)}
          onClose={() => setSelectedMedia(null)}
          maxWidth="860px"
          titleId="media-modal-title"
        >
          <div style={{ padding: '0.5rem 0' }}>
            {/* Modal Media Content */}
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#0F3324',
                marginBottom: '1.25rem',
                maxHeight: '65vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.fileUrl}
                  controls
                  autoPlay
                  style={{ width: '100%', maxHeight: '65vh', display: 'block', backgroundColor: '#000000' }}
                />
              ) : (
                <img
                  src={selectedMedia.fileUrl}
                  alt={selectedMedia.title}
                  style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block' }}
                />
              )}
            </div>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    backgroundColor: 'var(--color-soft-green)',
                    color: 'var(--color-forest-green)',
                    border: '1px solid var(--border-medium)',
                    padding: '0.2rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                  }}
                >
                  {selectedMedia.badge}
                </span>

                {selectedMedia.date && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    {selectedMedia.date}
                  </span>
                )}
              </div>

              <h2
                id="media-modal-title"
                style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-forest-green)', margin: 0 }}
              >
                {selectedMedia.title}
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                {selectedMedia.description}
              </p>

              {/* Geographic & Verification Details Box */}
              <div
                style={{
                  backgroundColor: 'var(--color-soft-green)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.82rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  marginTop: '0.35rem',
                }}
              >
                {selectedMedia.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <MapPin size={15} color="#174B35" />
                    <strong>Location:</strong> <span>{selectedMedia.location}</span>
                  </div>
                )}
                {selectedMedia.coordinates && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Sparkles size={14} color="#174B35" />
                    <strong>GPS Coordinates:</strong> <code>{selectedMedia.coordinates}</code>
                  </div>
                )}
                {selectedMedia.verifiedBy && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#166534' }}>
                    <ShieldCheck size={15} color="#166534" />
                    <strong>Verification Authority:</strong> <span>{selectedMedia.verifiedBy}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <a
                  href={selectedMedia.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    color: 'var(--color-forest-green)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  <span>Open Full Asset in New Tab</span>
                  <ExternalLink size={13} />
                </a>

                <Button
                  to="/contact?intent=assessment"
                  variant="primary"
                  size="sm"
                  iconRight={<ArrowRight size={15} />}
                  onClick={() => setSelectedMedia(null)}
                >
                  Inquire for Your Property
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* =========================================================================
          BOTTOM CTA SECTION
          ========================================================================= */}
      <CTASection
        headline="Experience Proven Solar Engineering for Your Home, Farm or Business."
        supportingCopy="Our verified field installations and DISCOM awards speak for themselves. Reach out to our technical team in Kalahandi for an honest site assessment."
        primaryLabel="Request Free Site Assessment"
        secondaryLabel="Call Kalahandi Office"
        imageSrc="/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg"
        prefillTopic="assessment"
      />
    </div>
  );
};
