"use client";

import { useEffect } from "react";

/**
 * Global scroll-triggered reveal observer.
 * Adds `is-visible` class to elements with `reveal-on-scroll`
 * when they enter the viewport.
 */
export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "50px 0px 0px 0px" }
    );

    function observeAll() {
      const elements = document.querySelectorAll(
        ".reveal-on-scroll:not(.is-visible)"
      );
      elements.forEach((el) => observer.observe(el));
    }

    // Initial observation
    observeAll();

    // Re-observe after dynamic content loads (e.g. async server components)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

