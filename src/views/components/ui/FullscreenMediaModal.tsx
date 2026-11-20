import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface FullscreenMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  mediaType?: 'image' | 'video';
  title?: string;
  badge?: string;
  location?: string;
  date?: string;
}

export const FullscreenMediaModal: React.FC<FullscreenMediaModalProps> = ({
  isOpen,
  onClose,
  mediaUrl,
  mediaType = 'image',
  title,
  badge,
  location,
  date,
}) => {
  const [zoomLevel, setZoomLevel] = React.useState(1);

  useEffect(() => {
    if (!isOpen) return;

    setZoomLevel(1);

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.35, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  const isVideo = mediaType === 'video' || mediaUrl.endsWith('.mp4');

  const content = (
    <div
      className="fullscreen-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Full size media preview'}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(5, 15, 10, 0.96)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(0.75rem, 2vw, 1.5rem)',
        overflow: 'hidden',
        animation: 'fadeIn 200ms ease forwards',
      }}
    >
      {/* Top Floating Control Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          width: '100%',
          zIndex: 100000,
          padding: '0.25rem 0.5rem',
        }}
      >
        {/* Left: Back Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Back to website"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.15rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = '#174B35';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* Center: Title / Badge Info (hidden on tiny screens) */}
        {title && (
          <div
            style={{
              color: '#FFFFFF',
              textAlign: 'center',
              maxWidth: '55%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.92rem',
              fontWeight: 600,
            }}
          >
            {badge && (
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#174B35',
                  color: '#86EFAC',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  marginRight: '0.5rem',
                  verticalAlign: 'middle',
                }}
              >
                {badge}
              </span>
            )}
            <span style={{ verticalAlign: 'middle' }}>{title}</span>
          </div>
        )}

        {/* Right: Zoom controls (for images) + Prominent Cross Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!isVideo && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                borderRadius: '999px',
                padding: '2px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom in"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ZoomIn size={17} />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom out"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ZoomOut size={17} />
              </button>
              {zoomLevel !== 1 && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Reset zoom"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    color: '#86EFAC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
          )}

          {/* PROMINENT CLOSE CROSS (✕) BUTTON */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close full size view"
            title="Close (Esc)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              minWidth: '44px',
              height: '44px',
              padding: '0 0.85rem',
              borderRadius: '999px',
              backgroundColor: '#E8F2E8',
              color: '#174B35',
              border: '2px solid #FFFFFF',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.88rem',
              transition: 'transform 0.18s ease, background-color 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#E8F2E8';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={22} strokeWidth={2.5} />
            <span style={{ fontWeight: 800, letterSpacing: '0.02em' }}>Close</span>
          </button>
        </div>
      </header>

      {/* Main Full-Size Display Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'auto',
          padding: '1rem 0',
          cursor: zoomLevel > 1 ? 'grab' : 'default',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {isVideo ? (
          <video
            src={mediaUrl}
            controls
            autoPlay
            playsInline
            style={{
              maxWidth: '96vw',
              maxHeight: '84vh',
              borderRadius: '12px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
              backgroundColor: '#000000',
            }}
          />
        ) : (
          <img
            src={mediaUrl}
            alt={title || 'Full size photo view'}
            style={{
              maxWidth: zoomLevel === 1 ? '96vw' : 'none',
              maxHeight: zoomLevel === 1 ? '84vh' : 'none',
              width: zoomLevel !== 1 ? `${zoomLevel * 100}%` : 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7)',
              transition: 'transform 0.2s ease',
              imageRendering: '-webkit-optimize-contrast',
              display: 'block',
              margin: 'auto',
            }}
          />
        )}
      </main>

      {/* Bottom Footer Information Bar */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          width: '100%',
          padding: '0.4rem 0.75rem',
          color: '#E8F2E8',
          fontSize: '0.8rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {location && (
            <span>📍 {location}</span>
          )}
          {date && (
            <span>🗓 {date}</span>
          )}
        </div>
        <div style={{ opacity: 0.8, fontSize: '0.74rem' }}>
          Click background or press <strong>Esc</strong> to return to website
        </div>
      </footer>
    </div>
  );

  return createPortal(content, document.body);
};
