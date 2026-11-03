import React, { useState } from 'react';
import { MapPin, Plus, CheckCircle2, Maximize2 } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { galleryPhotos } from '../../data/projects';
import { GalleryPhoto } from '../../types';

const COLUMNS_PER_ROW = 3;
const INITIAL_ROWS = 5;
const ROWS_PER_LOAD = 5;
const INITIAL_COUNT = COLUMNS_PER_ROW * INITIAL_ROWS; // 15
const INCREMENT_COUNT = COLUMNS_PER_ROW * ROWS_PER_LOAD; // 15

export const GalleryPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const visiblePhotos = galleryPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < galleryPhotos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + INCREMENT_COUNT, galleryPhotos.length));
  };

  return (
    <div>
      <SEO
        title="Field Operations & Project Photo Gallery"
        description="Authentic photographs of solar water pumps, tubewell borewell drilling, rural pipeline distribution, and community works across Odisha."
        canonicalPath="/gallery"
      />
      <Breadcrumbs items={[{ label: 'Gallery' }]} />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              Visual Portfolio
            </span>
            <h1 className="page-hero__title">Project &amp; Field Gallery</h1>
            <p className="page-hero__subtitle">
              Authentic field photographs of residential &amp; commercial rooftop solar plants, agricultural solar water pump arrays, community sensor systems, and street lighting installations across Odisha.
            </p>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: agricultural solar water pumping system in Kalahandi]"
              sublabel="Solar Water Pump Array • Field Execution in Kalahandi"
              aspectRatio="16/10"
              variant="white"
              src="/images/gallery-hero-solar-pump.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <div className="gallery-toolbar">
            <SectionHeading
              eyebrow="Installation Gallery"
              title="Solar &amp; Infrastructure Visuals"
              subtitle={`Showing ${visiblePhotos.length} of ${galleryPhotos.length} verified project photos across Kalahandi and Odisha.`}
            />
          </div>

          {/* 3-Column Desktop Grid with Consistent 4:3 Image Placeholders */}
          <div className="gallery-grid" data-testid="gallery-grid">
            {visiblePhotos.map((photo) => (
              <Card
                key={photo.id}
                variant="soft-green"
                padding="none"
                hoverable
                className="gallery-card"
              >
                <div
                  className="gallery-card__media"
                  onClick={() => setSelectedPhoto(photo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPhoto(photo);
                    }
                  }}
                  aria-label={`View details of ${photo.title}`}
                >
                  <ImagePlaceholder
                    label={photo.image}
                    sublabel={photo.title}
                    aspectRatio="4/3"
                    variant="white"
                    src={photo.imageSrc}
                    imgFit="cover"
                  />
                  <span className="gallery-card__badge">{photo.category}</span>
                  <span className="gallery-card__zoom" aria-hidden="true">
                    <Maximize2 size={16} />
                  </span>
                </div>
                <div className="gallery-card__body">
                  <div className="gallery-card__location">
                    <MapPin size={14} />
                    <span>{photo.location}</span>
                  </div>
                  <h3 className="gallery-card__title">{photo.title}</h3>
                  <p className="gallery-card__caption">{photo.caption}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Control */}
          <div className="gallery-load-more">
            {hasMore ? (
              <div className="gallery-load-more__inner">
                <p className="gallery-load-more__status">
                  Showing {visiblePhotos.length} of {galleryPhotos.length} items
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={<Plus size={18} />}
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              </div>
            ) : (
              <div className="gallery-load-more__complete">
                <CheckCircle2 size={20} />
                <span>All {galleryPhotos.length} verified project photos displayed.</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Lightbox Modal for Gallery Item */}
      <Modal
        isOpen={Boolean(selectedPhoto)}
        onClose={() => setSelectedPhoto(null)}
        titleId="gallery-lightbox-title"
      >
        {selectedPhoto && (
          <div className="gallery-lightbox">
            <div style={{ marginBottom: '1rem' }}>
              <ImagePlaceholder
                label={selectedPhoto.image}
                sublabel={selectedPhoto.title}
                aspectRatio="16/10"
                variant="soft-green"
                src={selectedPhoto.imageSrc}
                imgFit="contain"
              />
            </div>
            <div className="gallery-lightbox__info">
              <span className="badge" style={{ marginBottom: '0.5rem' }}>
                {selectedPhoto.category}
              </span>
              <h3 id="gallery-lightbox-title">{selectedPhoto.title}</h3>
              <p className="gallery-lightbox__loc">
                <MapPin size={15} /> {selectedPhoto.location}
              </p>
              <p style={{ marginTop: '0.5rem' }}>{selectedPhoto.caption}</p>
            </div>
          </div>
        )}
      </Modal>

      <CTASection
        headline="See How Solar Fits Your Property."
        supportingCopy="Contact our team in Kalahandi to discuss rooftop solar, commercial installations, or solar water pumps."
        prefillTopic="Gallery Page Enquiry"
        image="[Project gallery image]"
      />
    </div>
  );
};
