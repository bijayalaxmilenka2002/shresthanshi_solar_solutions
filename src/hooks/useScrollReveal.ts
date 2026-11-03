import { useEffect } from 'react';

const REVEAL_SELECTOR = [
  '[data-ui-animate]',
  '.ui-section-heading',
  '.page-hero__content',
  '.cta-banner__content',
  '.subsidy-banner__content',
  '.split-showcase__content',
].join(', ');

const STAGGER_CONTAINERS = [
  '.split-showcase',
].join(', ');

export const useScrollReveal = (dependencyKey: string) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const assignStaggerIndices = () => {
      const containers = document.querySelectorAll<HTMLElement>(STAGGER_CONTAINERS);
      containers.forEach((container) => {
        const children = Array.from(container.children) as HTMLElement[];
        children.forEach((child, index) => {
          const staggerSlot = index % 4;
          child.style.setProperty('--stagger-delay', `${staggerSlot * 80}ms`);
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -4% 0px',
        threshold: 0.04,
      }
    );

    const checkAndRevealVisibleElements = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
      targets.forEach((el) => {
        if (!el.classList.contains('reveal-init')) {
          el.classList.add('reveal-init');
        }
        if (prefersReducedMotion) {
          el.classList.add('reveal-visible');
          return;
        }
        if (!el.classList.contains('reveal-visible')) {
          const rect = el.getBoundingClientRect();
          // Reveal any element already in or above the viewport
          if (rect.top < vh * 0.95) {
            el.classList.add('reveal-visible');
            observer.unobserve(el);
          } else {
            observer.observe(el);
          }
        }
      });
    };

    assignStaggerIndices();
    checkAndRevealVisibleElements();

    let rafId = 0;
    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        checkAndRevealVisibleElements();
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    const mainEl = document.getElementById('main-content');
    let mutationObserver: MutationObserver | null = null;
    if (mainEl && 'MutationObserver' in window) {
      mutationObserver = new MutationObserver(() => {
        assignStaggerIndices();
        checkAndRevealVisibleElements();
      });
      mutationObserver.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      cancelAnimationFrame(rafId);
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, [dependencyKey]);
};
