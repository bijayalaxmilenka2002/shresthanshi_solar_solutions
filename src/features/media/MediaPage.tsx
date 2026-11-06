import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  ExternalLink,
  Sparkles,
  ArrowRight,
  Filter,
  X,
  Layers,
  Landmark,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO } from '../../components/common/SEO';
import { CTASection } from '../../components/common/CTASection';
import { mediaItems, mediaCategories, MediaCategory, MediaItem } from '../../data/mediaData';

/**
 * Mobile-optimised Lightbox Video Player Component
 * Supports both landscape (16:9) and vertical portrait (9:16) videos.
 * Handles mobile browser autoplay restrictions with graceful tap-to-play fallback.
 */
const LightboxVideoPlayer: React.FC<{
  src: string;
  poster?: string;
  title: string;
}> = ({ src, poster, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      // Attempt play on mount
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked by mobile browser (normal on iOS/Android without mute)
            setIsPlaying(false);
          });
      }
    }
  }, [src]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    // Only toggle if clicked directly on the overlay, let native controls handle their own clicks
    const v = videoRef.current;
    if (v) {
      if (v.paused) {
        v.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        v.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#000000',
        width: '100%',
        maxHeight: '52vh',
        minHeight: '220px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{
          width: '100%',
          maxHeight: '52vh',
          objectFit: 'contain',
          display: 'block',
          backgroundColor: '#000000',
          margin: '0 auto',
        }}
      />

      {/* Prominent Tap to Play overlay when paused or when mobile autoplay was blocked */}
      {!isPlaying && (
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={`Play ${title}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'background-color 200ms ease',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(23, 75, 53, 0.95)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2.5px solid rgba(255,255,255,0.95)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            <Play size={28} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
          </div>
        </button>
      )}
    </div>
  );
};

export const MediaPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Reactive URL-driven category state: updates instantly when navbar dropdown or browser navigation triggers
  const categoryParam = searchParams.get('category') as MediaCategory | null;
  const activeCategory: MediaCategory =
    categoryParam && mediaCategories.some((c) => c.id === categoryParam)
      ? categoryParam
      : 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleCategoryChange = (cat: MediaCategory) => {
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filtered Media List based on active category & search query
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

  const activeCategoryMeta = mediaCategories.find((c) => c.id === activeCategory);

  return (
    <div>
      <SEO
        title="Verified Media, DISCOM Awards & Field Videos — Kalahandi, Odisha"
        description="Browse official TPWODL awards, MNRE national summit credentials, GPS-tagged rooftop solar installations, and on-site video walkthroughs across Kalahandi and Odisha."
        canonicalPath="/media"
        ogImage="/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg"
      />

      <Breadcrumbs items={[{ label: 'Media & Verification' }]} />

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
              <span>Authentic Project Proof &amp; Verification Hub</span>
            </span>
            <h1 className="page-hero__title">
              Official Awards, Field Installations &amp; Site Videos.
            </h1>
            <p className="page-hero__subtitle">
              Real transparency in solar. Explore our highest-performance DISCOM awards, national summit invitations from MNRE New Delhi, GPS-stamped rooftop installations, and live video walkthroughs.
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
                alt="Highest solar rooftop installations award in Kalahandi district"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  imageRendering: '-webkit-optimize-contrast',
                }}
                loading="eager"
              />
              <div
                style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.85rem',
                  color: 'var(--color-forest-green)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <Award size={16} color="#15803D" />
                <span>District Award: Highest Solar Installations in Kalahandi</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          KEY STATS STRIP
          ========================================================================= */}
      <div
        style={{
          backgroundColor: '#174B35',
          color: '#FFFFFF',
          padding: '1.25rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#86EFAC' }}>
                Top 100
              </div>
              <div style={{ fontSize: '0.82rem', color: '#E8F2E8', opacity: 0.9 }}>
                Vendor Invitation by MNRE, New Delhi
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#86EFAC' }}>
                TPWODL
              </div>
              <div style={{ fontSize: '0.82rem', color: '#E8F2E8', opacity: 0.9 }}>
                Official DISCOM Appreciation Certificates
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#86EFAC' }}>
                100% Real
              </div>
              <div style={{ fontSize: '0.82rem', color: '#E8F2E8', opacity: 0.9 }}>
                GPS-Tagged On-Site Photos
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#86EFAC' }}>
                5 Site Videos
              </div>
              <div style={{ fontSize: '0.82rem', color: '#E8F2E8', opacity: 0.9 }}>
                Live Rooftop Walkthroughs &amp; Testing
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* =========================================================================
          MAIN GALLERY SECTION WITH CATEGORY TABS & FILTER
          ========================================================================= */}
      <section className="section bg-white" style={{ minHeight: '600px', paddingTop: '2.5rem' }}>
        <Container>
          {/* Header & Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-forest-green)', margin: 0 }}>
                {activeCategory === 'all'
                  ? 'All Verified Records & Media'
                  : activeCategoryMeta?.label || 'Project Gallery'}
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                Showing {filteredMedia.length} of {categoryCounts[activeCategory] || mediaItems.length} records
              </p>
            </div>

            {/* Search Input */}
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
                placeholder="Search village, project, award..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  paddingLeft: '38px',
                  paddingRight: searchQuery ? '36px' : '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-medium)',
                  fontSize: '0.86rem',
                  outline: 'none',
                  backgroundColor: '#FAFCFA',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '2px',
                  }}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs Strip — Responsive horizontal scroll with hidden scrollbars */}
          <div className="media-category-tabs" style={{ marginBottom: '1.5rem' }}>
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
                    gap: '0.5rem',
                    padding: '0.6rem 1.15rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: isActive ? '1.5px solid #174B35' : '1.5px solid var(--border-subtle)',
                    backgroundColor: isActive ? '#174B35' : 'var(--color-soft-green)',
                    color: isActive ? '#FFFFFF' : 'var(--color-forest-green)',
                    whiteSpace: 'nowrap',
                    transition: 'all 150ms ease',
                    flexShrink: 0,
                    minHeight: '42px',
                    boxShadow: isActive ? '0 4px 12px rgba(23, 75, 53, 0.2)' : 'none',
                  }}
                >
                  {cat.id === 'all' && <Layers size={14} />}
                  {cat.id === 'awards' && <Award size={14} />}
                  {cat.id === 'videos' && <Video size={14} />}
                  {cat.id === 'installations' && <MapPin size={14} />}
                  {cat.id === 'summits' && <Landmark size={14} />}
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

          {/* Active Filter Notice Bar (if viewing a filtered subset) */}
          {activeCategory !== 'all' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '10px',
                padding: '0.65rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.84rem',
                color: '#166534',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <span>
                  Filtering by <strong>{activeCategoryMeta?.label}</strong> ({filteredMedia.length} results)
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#15803D',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Show All Media &rarr;
              </button>
            </div>
          )}

          {/* Media Grid — Responsive 1-col on mobile phones, multi-col on tablets/desktops */}
          {filteredMedia.length === 0 ? (
            <Card variant="white" padding="lg" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
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
                    handleCategoryChange('all');
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            </Card>
          ) : (
            <div className="media-gallery-grid">
              {filteredMedia.map((item) => {
                const isVideo = item.type === 'video';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedMedia(item);
                      }
                    }}
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid rgba(23, 75, 53, 0.12)',
                      boxShadow: '0 4px 16px rgba(23, 75, 53, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(23, 75, 53, 0.14)';
                      e.currentTarget.style.borderColor = '#174B35';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(23, 75, 53, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(23, 75, 53, 0.12)';
                    }}
                  >
                    {/* Media Visual Container — Large, Clean & Mobile Poster Ready */}
                    <div
                      style={{
                        position: 'relative',
                        backgroundColor: '#0F2B1F',
                        aspectRatio: '4/3',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isVideo ? (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                          <video
                            src={item.fileUrl}
                            poster={item.thumbnailUrl}
                            preload="none"
                            muted
                            playsInline
                            loop
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
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

                          {/* Center Play Icon */}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'rgba(0,0,0,0.22)',
                              pointerEvents: 'none',
                            }}
                          >
                            <div
                              style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(23, 75, 53, 0.92)',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid rgba(255,255,255,0.85)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                              }}
                            >
                              <Play size={22} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
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
                              fontSize: '0.68rem',
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
                              imageRendering: '-webkit-optimize-contrast',
                              transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          />

                          {/* Top-Right Expand Icon on Hover */}
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
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            }}
                          >
                            <Maximize2 size={14} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Body — Clean, Simple Title & Location */}
                    <div
                      style={{
                        padding: '0.9rem 1.1rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.45rem',
                        flex: 1,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '0.98rem',
                          fontWeight: 700,
                          lineHeight: 1.35,
                          color: 'var(--color-forest-green)',
                          margin: 0,
                        }}
                      >
                        {item.title}
                      </h3>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          paddingTop: '0.4rem',
                          borderTop: '1px solid var(--border-subtle)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.location ? (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            <MapPin size={12} color="#174B35" style={{ flexShrink: 0 }} />
                            <span style={{ fontWeight: 600, color: 'var(--color-forest-green)' }}>
                              {item.location.split(',')[0]}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontWeight: 600, color: 'var(--color-forest-green)' }}>
                            Verified Record
                          </span>
                        )}

                        <span
                          style={{
                            fontWeight: 700,
                            color: '#15803D',
                            fontSize: '0.74rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            flexShrink: 0,
                          }}
                        >
                          {isVideo ? 'Watch Video' : 'View Full'} &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* =========================================================================
          LIGHTBOX MODAL FOR CENTERED FULL-RESOLUTION MEDIA & MOBILE VIDEO PLAYBACK
          ========================================================================= */}
      {selectedMedia && (
        <Modal
          isOpen={Boolean(selectedMedia)}
          onClose={() => setSelectedMedia(null)}
          maxWidth="840px"
          className="media-lightbox-panel"
          titleId="media-modal-title"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Centered Media Player Area — Mobile Friendly */}
            {selectedMedia.type === 'video' ? (
              <LightboxVideoPlayer
                src={selectedMedia.fileUrl}
                poster={selectedMedia.thumbnailUrl}
                title={selectedMedia.title}
              />
            ) : (
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#0B2419',
                  maxHeight: '52vh',
                  minHeight: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  position: 'relative',
                }}
              >
                <img
                  src={selectedMedia.fileUrl}
                  alt={selectedMedia.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '52vh',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              </div>
            )}

            {/* Compact Header & Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h2
                  id="media-modal-title"
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--color-forest-green)',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {selectedMedia.title}
                </h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {selectedMedia.location && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: 'var(--color-forest-green)',
                        backgroundColor: 'var(--color-soft-green)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        border: '1px solid var(--border-medium)',
                      }}
                    >
                      <MapPin size={11} color="#174B35" />
                      <span>{selectedMedia.location}</span>
                    </span>
                  )}
                  {selectedMedia.date && (
                    <span
                      style={{
                        fontSize: '0.74rem',
                        color: 'var(--text-muted)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <Calendar size={11} />
                      <span>{selectedMedia.date}</span>
                    </span>
                  )}
                </div>
              </div>

              <p
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                {selectedMedia.description}
              </p>

              {/* Technical / Verification Authority Tag */}
              {(selectedMedia.verifiedBy || selectedMedia.coordinates) && (
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: '#166534',
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '8px',
                    padding: '0.4rem 0.65rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.4rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {selectedMedia.verifiedBy && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <ShieldCheck size={12} color="#16A34A" />
                      <strong>Verified by:</strong> {selectedMedia.verifiedBy}
                    </span>
                  )}
                  {selectedMedia.coordinates && (
                    <span style={{ color: 'var(--text-muted)' }}>
                      📍 {selectedMedia.coordinates}
                    </span>
                  )}
                </div>
              )}

              {/* Bottom Actions Row — Full Touch-friendly Targets on Phone */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.65rem',
                  flexWrap: 'wrap',
                  paddingTop: '0.45rem',
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
                    fontSize: '0.78rem',
                    color: 'var(--color-forest-green)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    padding: '0.4rem 0',
                  }}
                >
                  <span>{selectedMedia.type === 'video' ? 'Open Raw Video' : 'Open Full High-Res'}</span>
                  <ExternalLink size={12} />
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMedia(null)}
                  >
                    Close
                  </Button>
                  <Button
                    to="/contact?intent=assessment"
                    variant="primary"
                    size="sm"
                    iconRight={<ArrowRight size={13} />}
                    onClick={() => setSelectedMedia(null)}
                  >
                    Inquire for Site
                  </Button>
                </div>
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
