import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'white' | 'soft-green' | 'forest-green' | 'outlined';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hoverable?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  padding = 'md',
  hoverable = false,
  className = '',
  ...rest
}) => {
  const classes = [
    'ui-card',
    `ui-card--${variant}`,
    `ui-card--pad-${padding}`,
    hoverable ? 'ui-card--hoverable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
