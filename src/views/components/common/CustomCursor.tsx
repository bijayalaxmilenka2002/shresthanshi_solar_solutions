import React, { useEffect, useRef } from 'react';

/**
 * Recreates Suncharge's `.cursor` follower dot that scales up (`.cursor-active`)
 * when hovering interactive links, buttons, and cards (`scripts.js` lines 163-195).
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || isReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = '1';
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], .ui-card--hoverable, .gallery-card__media, .filter-tab'
      );
      if (interactive) {
        cursor.classList.add('cursor-active');
      } else {
        cursor.classList.remove('cursor-active');
      }
    };

    const onMouseLeaveWindow = () => {
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveWindow, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
    };
  }, []);

  return <div ref={cursorRef} className="suncharge-cursor" aria-hidden="true" />;
};

