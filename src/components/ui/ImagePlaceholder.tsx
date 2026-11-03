import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export interface ImagePlaceholderProps {
  /** Exact bracketed placeholder label, e.g. "[Hero image: solar panels on a modern home]" */
  label: string;
  /** Optional secondary hint or location tag */
  sublabel?: string;
  /** Consistent aspect ratio within each section */
  aspectRatio?: '16/10' | '4/3' | '16/9' | '3/4' | '1/1';
  /** Surface color variant using the 3-color brand palette */
  variant?: 'soft-green' | 'white' | 'forest-green';
  /** Optional image path to easily swap in an AI-generated image later */
  src?: string;
  /** Optional object-fit behavior to preserve proportions without awkward cropping */
  imgFit?: 'cover' | 'contain';
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label,
  sublabel,
  aspectRatio = '4/3',
  variant = 'soft-green',
  src,
  imgFit = 'cover',
  className = '',
}) => {
  const formattedLabel = label.startsWith('[') ? label : `[${label}]`;

  return (
    <div
      className={`ui-image-placeholder ui-image-placeholder--surface-${variant} ui-image-placeholder--ratio-${aspectRatio.replace(
        '/',
        '-'
      )} ${src ? 'ui-image-placeholder--has-image' : ''} ${className}`.trim()}
      role="img"
      aria-label={formattedLabel}
      data-image-placeholder={formattedLabel}
    >
      {src ? (
        <img
          src={src}
          alt={formattedLabel}
          className={`ui-image-placeholder__img ui-image-placeholder__img--${imgFit}`}
          loading="lazy"
        />
      ) : (
        <div className="ui-image-placeholder__inner">
          <span className="ui-image-placeholder__icon-badge" aria-hidden="true">
            <ImageIcon size={22} strokeWidth={1.6} />
          </span>
          <span className="ui-image-placeholder__label">{formattedLabel}</span>
          {sublabel && <span className="ui-image-placeholder__sublabel">{sublabel}</span>}
        </div>
      )}
    </div>
  );
};
