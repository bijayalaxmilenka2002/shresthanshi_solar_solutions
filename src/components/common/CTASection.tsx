import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { companyConfig } from '../../data/company';

interface CTASectionProps {
  headline?: string;
  supportingCopy?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  image?: string;
  imageSrc?: string;
  prefillTopic?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  headline = 'Plan Your Solar Installation With Clarity.',
  supportingCopy = 'Speak with our engineering team in Bhubaneswar or our established Kalahandi department office for a straightforward assessment.',
  primaryLabel = 'Get a Solar Assessment',
  secondaryLabel = 'Call Our Office',
  image = '[Image: rooftop solar installation]',
  imageSrc = '/images/cta-solar-rooftop.jpg',
  prefillTopic = 'assessment',
}) => {
  return (
    <section className="section cta-banner-section">
      <Container>
        <div className="cta-banner">
          <div className="cta-banner__content">
            <span className="badge badge-inverse" style={{ marginBottom: '0.85rem' }}>
              No-Obligation Assessment
            </span>
            <h2 className="cta-banner__title">{headline}</h2>
            <p className="cta-banner__copy">{supportingCopy}</p>
            <div className="cta-banner__actions">
              <Button
                to={`/contact?intent=${encodeURIComponent(prefillTopic)}`}
                variant="inverse"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                {primaryLabel}
              </Button>
              <Button
                variant="outline-inverse"
                size="lg"
                href={companyConfig.contact.phoneHref}
                iconLeft={<Phone size={18} />}
              >
                {secondaryLabel} ({companyConfig.contact.phoneDisplay})
              </Button>
            </div>
            <p className="cta-banner__trust">
              Clear sizing • Honest scheme guidance • Local Odisha team
            </p>
          </div>
          <div className="cta-banner__visual">
            <ImagePlaceholder
              label={image}
              src={imageSrc}
              aspectRatio="16/10"
              variant="soft-green"
              className="cta-banner__placeholder"
              imgFit="cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
