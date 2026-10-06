"use client";
import { useEffect, useRef } from "react";

export function SiteMotion() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector<HTMLElement>(".site-header");
    const navigation = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header nav a[href^='#']")).map(link => ({link, section:document.querySelector<HTMLElement>(link.getAttribute("href")!)}));
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {if(entry.isIntersecting){entry.target.setAttribute("data-visible", "");observer?.unobserve(entry.target)}});
    }, {rootMargin:"0px 0px -25px 0px",threshold:.04}) : null;
    const setMotion = () => {
      if(preference.matches || !observer) root.removeAttribute("data-site-motion");
      else root.setAttribute("data-site-motion", "ready");
    };
    items.forEach(item => observer ? observer.observe(item) : item.setAttribute("data-visible", ""));
    let frame = 0;
    const update = () => {
      frame = 0;
      const extent = root.scrollHeight - innerHeight;
      if(progress.current) progress.current.style.transform = `scaleX(${extent>0?Math.min(1,Math.max(0,scrollY/extent)):0})`;
      header?.classList.toggle("is-scrolled", scrollY>30);
      const line = (header?.getBoundingClientRect().bottom ?? 80) + 120;
      navigation.forEach(({link,section}) => {const box=section?.getBoundingClientRect();if(box && box.top<=line && box.bottom>line)link.setAttribute("aria-current","location");else link.removeAttribute("aria-current")});
    };
    const schedule = () => {if(!frame)frame=requestAnimationFrame(update)};
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(schedule) : null;
    const main = document.querySelector("main");
    if (main) resizeObserver?.observe(main);
    setMotion(); update();
    window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);
    preference.addEventListener("change",setMotion);
    return () => {cancelAnimationFrame(frame);observer?.disconnect();resizeObserver?.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);preference.removeEventListener("change",setMotion);root.removeAttribute("data-site-motion")};
  }, []);
  return <div ref={progress} className="reading-progress" aria-hidden="true"/>;
}
