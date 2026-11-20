import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  inverse = false,
  className = '',
}) => {
  return (
    <div
      className={[
        'ui-section-heading',
        `ui-section-heading--${align}`,
        inverse ? 'ui-section-heading--inverse' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <span
          className={`badge ui-section-heading__eyebrow ${inverse ? 'badge-inverse' : ''}`}
          style={{ marginBottom: '0.875rem' }}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="ui-section-heading__title">{title}</h2>
      {subtitle && <p className="ui-section-heading__subtitle">{subtitle}</p>}
    </div>
  );
};
