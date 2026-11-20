import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light-bg' | 'dark-bg';
  className?: string;
}

/**
 * Official Brand Logo for Shresthanshi Solar Solutions
 * (Prop. Shubham Pratap Singh)
 */
export const Logo: React.FC<LogoProps> = ({ variant = 'light-bg', className = '' }) => {
  const isDarkBg = variant === 'dark-bg';

  return (
    <Link
      to="/"
      className={`brand-logo ${isDarkBg ? 'brand-logo--inverse' : ''} ${className}`.trim()}
      aria-label="Shresthanshi Solar Solutions - Home"
    >
      <img
        src="/images/brand-logo.jpg"
        alt="Shresthanshi Solar Solutions - Prop. Shubham Pratap Singh"
        className="brand-logo__img"
      />
    </Link>
  );
};

