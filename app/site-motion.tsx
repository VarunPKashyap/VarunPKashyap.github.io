"use client";
import { useEffect, useRef } from "react";
import { attachCoverMotion } from "./cover-motion";

export function SiteMotion() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const root = document.documentElement;
    if (!preference.matches && !document.hidden) root.setAttribute("data-site-motion", "ready");
    const header = document.querySelector<HTMLElement>(".site-header");
    const navigation = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header nav a[href^='#']")).map(link => ({
      link,
      section: document.querySelector<HTMLElement>(link.getAttribute("href")!),
    }));
    const elements = document.querySelectorAll<HTMLElement>(".section-top,.work-heading,.publication,.signal-desk,.services-heading,.service-card,.about-grid,.thinking-intro,.thought-list>button,.articulation-intro,.bangalore-break,.digest-intro,.digest-item,.position-section,.contact-big");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -18px 0px" });
    elements.forEach(element => {
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      const stagger = element.matches(".service-card,.publication,.thought-list>button,.digest-item") ? (siblings.indexOf(element) % 3) * 65 : 0;
      element.style.setProperty("--reveal-delay", `${stagger}ms`);
      if (!preference.matches) element.classList.add("reveal-ready");
      if (element.getBoundingClientRect().top < innerHeight - 18) element.classList.add("reveal-visible");
      else observer.observe(element);
    });
    let frame = 0;
    const update = () => {
      frame = 0;
      const extent = document.documentElement.scrollHeight - innerHeight;
      header?.classList.toggle("is-scrolled", scrollY > 40);
      const readingLine = (header?.getBoundingClientRect().bottom ?? 84) + 100;
      navigation.forEach(({link, section}) => {
        const bounds = section?.getBoundingClientRect();
        if (bounds && bounds.top <= readingLine && bounds.bottom > readingLine) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      if (progress.current) progress.current.style.transform = `scaleX(${extent > 0 ? Math.min(1, Math.max(0, scrollY / extent)) : 0})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const revealAll = () => {
      if (preference.matches) {
        root.removeAttribute("data-site-motion");
        observer.disconnect();
        elements.forEach(element => {
          element.classList.remove("reveal-ready");
          element.classList.add("reveal-visible");
        });
      }
    };
    const finishEntrances = () => {
      if (!document.hidden) return;
      root.removeAttribute("data-site-motion");
      elements.forEach(element => {
        if (element.classList.contains("reveal-visible")) element.classList.remove("reveal-ready");
      });
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", revealAll);
    document.addEventListener("visibilitychange", finishEntrances);
    const coverCleanups = Array.from(document.querySelectorAll<HTMLElement>(".publication-image,.editorial-media"))
      .map(cover => attachCoverMotion(cover, preference, finePointer));
    return () => {
      observer.disconnect();
      coverCleanups.forEach(cleanup => cleanup());
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", revealAll);
      document.removeEventListener("visibilitychange", finishEntrances);
      root.removeAttribute("data-site-motion");
      navigation.forEach(({link}) => link.removeAttribute("aria-current"));
      elements.forEach(element => {
        element.classList.remove("reveal-ready", "reveal-visible");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
  return <div ref={progress} className="reading-progress" aria-hidden="true"/>;
}
