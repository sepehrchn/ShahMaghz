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
      { threshold: 0.01, rootMargin: "100px 0px 100px 0px" }
    );

    function observeAll() {
      const elements = document.querySelectorAll(
        ".reveal-on-scroll:not(.is-visible)"
      );
      elements.forEach((el) => observer.observe(el));
    }

    // Initial observation
    observeAll();

    // Re-observe after dynamic content loads
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Fail-safe: Reveal everything after 800ms in case observer fails to trigger
    const failSafeTimeout = setTimeout(() => {
      document.querySelectorAll(".reveal-on-scroll:not(.is-visible)").forEach((el) => {
        el.classList.add("is-visible");
      });
    }, 800);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(failSafeTimeout);
    };
  }, []);

  return null;
}

