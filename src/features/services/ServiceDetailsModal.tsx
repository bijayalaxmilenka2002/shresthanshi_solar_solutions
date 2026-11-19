import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Sun,
  Droplets,
  Wrench,
  Building,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';
import { CompanyService } from '../../types';

interface ServiceDetailsModalProps {
  service: CompanyService | null;
  onClose: () => void;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ service, onClose }) => {
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [service, onClose]);

  if (!service) return null;
  if (typeof document === 'undefined') return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Rooftop Solar':
      case 'Commercial Solar':
        return <Sun size={15} />;
      case 'Solar Water Pumps':
        return <Droplets size={15} />;
      case 'Solar Maintenance':
        return <Wrench size={15} />;
      default:
        return <Building size={15} />;
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-details-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.75rem, 3vw, 1.5rem)',
        animation: 'pageFadeRise 0.22s ease both',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          border: '1.5px solid var(--border-medium)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'heroFadeUp 0.25s ease both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.4rem',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: '#FAFCFA',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.76rem',
                fontWeight: 700,
                backgroundColor: 'var(--color-soft-green)',
                color: 'var(--color-forest-green)',
                border: '1px solid rgba(23, 75, 53, 0.15)',
              }}
            >
              {getCategoryIcon(service.category)}
              <span>{service.category}</span>
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Technical Scope &amp; Details
            </span>
          </div>

          {/* Close Cross Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details modal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              color: 'var(--color-forest-green)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FEE2E2';
              e.currentTarget.style.borderColor = '#EF4444';
              e.currentTarget.style.color = '#B91C1C';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'var(--border-medium)';
              e.currentTarget.style.color = 'var(--color-forest-green)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div style={{ padding: '1.4rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Hero Image Banner */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: 'var(--color-soft-green)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
            }}
          >
            <img
              src={service.imageSrc}
              alt={service.imageAlt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '0.85rem',
                left: '0.85rem',
                right: '0.85rem',
                padding: '0.5rem 0.85rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(23, 75, 53, 0.92)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.78rem',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
                letterSpacing: '0.02em',
              }}
            >
              {service.specsOrHighlight}
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h2
              id="service-details-title"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.55rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                color: 'var(--color-forest-green)',
                marginBottom: '0.55rem',
              }}
            >
              {service.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.94rem',
                lineHeight: 1.65,
                color: 'var(--text-body)',
                margin: 0,
              }}
            >
              {service.description}
            </p>
          </div>

          {/* Key Features & Scope Card */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid var(--border-medium)',
              padding: '1.1rem 1.25rem',
            }}
          >
            <div
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--color-forest-green)',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <ShieldCheck size={16} />
              <span>Full Technical Features &amp; Scope</span>
            </div>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                padding: 0,
                margin: 0,
              }}
            >
              {service.keyFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    color: 'var(--text-body)',
                    backgroundColor: '#FFFFFF',
                    padding: '0.55rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <CheckCircle2
                    size={16}
                    style={{ color: 'var(--color-forest-green)', flexShrink: 0, marginTop: '0.15rem' }}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Clients Banner */}
          <div
            style={{
              backgroundColor: 'var(--color-soft-green)',
              borderRadius: '12px',
              border: '1px solid rgba(23, 75, 53, 0.15)',
              padding: '0.85rem 1rem',
              fontSize: '0.84rem',
              lineHeight: 1.5,
              color: 'var(--color-forest-green)',
            }}
          >
            <strong style={{ fontWeight: 700 }}>Recommended For / Target Clients:</strong>{' '}
            <span style={{ color: 'var(--text-body)' }}>{service.targetClients}</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            padding: '1rem 1.4rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: '#FAFCFA',
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '10px',
              border: '1px solid var(--border-medium)',
              backgroundColor: '#FFFFFF',
              color: 'var(--text-body)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Close
          </button>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <Link
              to={`/contact?intent=service-inquiry&service=${encodeURIComponent(service.slug)}`}
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.15rem',
                borderRadius: '10px',
                border: '1.5px solid var(--color-forest-green)',
                backgroundColor: 'var(--color-soft-green)',
                color: 'var(--color-forest-green)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <PhoneCall size={14} />
              <span>Get Free Quote</span>
            </Link>

            <Link
              to={service.actionPath}
              onClick={onClose}
              className="end-to-end-card__btn"
              style={{
                padding: '0.65rem 1.25rem',
                fontSize: '0.84rem',
                fontWeight: 700,
              }}
            >
              <span>{service.actionText}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
