import React from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'inverse' | 'outline-inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  arrowBox?: boolean;
  children: React.ReactNode;
  className?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  to: string;
  href?: undefined;
  onClick?: () => void;
};

type ButtonAsAnchor = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    to?: undefined;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    arrowBox = false,
    children,
    className = '',
    iconLeft,
    iconRight,
    ...rest
  } = props;

  const classes = [
    'ui-btn',
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    fullWidth ? 'ui-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {iconLeft && <span className="ui-btn__icon ui-btn__icon--left">{iconLeft}</span>}
      <span className="ui-btn__label">{children}</span>
      {iconRight && <span className="ui-btn__icon ui-btn__icon--right">{iconRight}</span>}
    </>
  );

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={props.href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type || 'button'} className={classes} {...buttonProps}>
      {content}
    </button>
  );
};
