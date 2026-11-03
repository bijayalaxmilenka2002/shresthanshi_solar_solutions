import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Recreates Suncharge's `.progress-wrap` circular SVG scroll-progress & back-to-top button
 * (`scripts.js` lines 256-297 & `style.css` lines 6999-7050).
 */
export const ScrollProgressButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.transition = 'none';
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 10ms linear';

    const updateProgress = () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? pathLength - (scroll * pathLength) / height : pathLength;
      path.style.strokeDashoffset = `${progress}`;
      setIsActive(scroll > 150);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`progress-wrap ${isActive ? 'active-progress' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          ref={pathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        />
      </svg>
      <span className="progress-wrap__icon" aria-hidden="true">
        <ArrowUp size={16} strokeWidth={2.5} />
      </span>
    </button>
  );
};

