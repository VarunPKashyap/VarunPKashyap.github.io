"use client";
import { useEffect, useRef } from "react";

export function SiteMotion() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 761px)");
    const motion = () => {
      if (desktop.matches && !preference.matches) root.setAttribute("data-site-motion", "ready");
      else root.removeAttribute("data-site-motion");
    };
    const header = document.querySelector<HTMLElement>(".site-header");
    const navigation = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header nav a[href^='#']")).map(link => ({
      link, section: document.querySelector<HTMLElement>(link.getAttribute("href")!),
    }));
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).setAttribute("data-visible", "");
          observer?.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 }) : null;
    revealItems.forEach(item => observer ? observer.observe(item) : item.setAttribute("data-visible", ""));
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
    motion(); update();
    window.addEventListener("scroll", schedule, {passive:true});
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", motion);
    desktop.addEventListener("change", motion);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", motion);
      desktop.removeEventListener("change", motion);
      observer?.disconnect();
      root.removeAttribute("data-site-motion");
      navigation.forEach(({link}) => link.removeAttribute("aria-current"));
    };
  }, []);
  return <div ref={progress} className="reading-progress" aria-hidden="true"/>;
}
