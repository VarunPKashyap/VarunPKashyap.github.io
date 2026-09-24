/** Damped pointer movement and light, with no idle animation loop. */
export function attachCoverMotion(cover: HTMLElement, reducedMotion: MediaQueryList, finePointer: MediaQueryList) {
  const document = cover.ownerDocument;
  const view = document.defaultView!;
  const visual = cover.querySelector<HTMLElement>(".work-visual");
  let frame = 0, lastTime = 0;
  let x = 0, y = 0, lift = 0;
  let targetX = 0, targetY = 0, targetLift = 0;
  let pointer: { x: number; y: number } | null = null;
  let disposed = false;
  const canMove = () => !disposed && !reducedMotion.matches && finePointer.matches && !document.hidden;
  const reset = () => {
    view.cancelAnimationFrame(frame);
    frame = lastTime = 0;
    pointer = null;
    x = y = lift = targetX = targetY = targetLift = 0;
    cover.removeAttribute("data-cover-active");
    cover.removeAttribute("data-cover-moving");
    visual?.style.removeProperty("will-change");
    ["--cover-rx", "--cover-ry", "--cover-y", "--cover-light-x", "--cover-light-y"].forEach(name => cover.style.removeProperty(name));
  };
  const draw = (now: number) => {
    frame = 0;
    if (!canMove()) { reset(); return; }
    if (pointer) {
      // Measure the stationary frame once, before any style writes.
      const bounds = cover.getBoundingClientRect();
      if (!bounds.width || !bounds.height || bounds.bottom <= 0 || bounds.top >= view.innerHeight) { reset(); return; }
      const px = Math.max(0, Math.min(1, (pointer.x - bounds.left) / bounds.width));
      const py = Math.max(0, Math.min(1, (pointer.y - bounds.top) / bounds.height));
      targetX = (px - .5) * 10;
      targetY = -(py - .5) * 8;
      targetLift = -7;
      cover.style.setProperty("--cover-light-x", `${(px * 100).toFixed(2)}%`);
      cover.style.setProperty("--cover-light-y", `${(py * 100).toFixed(2)}%`);
      pointer = null;
    }
    const delta = lastTime ? Math.min(64, now - lastTime) : 16.7;
    lastTime = now;
    const response = 1 - Math.exp(-delta / 95);
    x += (targetX - x) * response;
    y += (targetY - y) * response;
    lift += (targetLift - lift) * response;
    const settled = Math.max(Math.abs(targetX - x), Math.abs(targetY - y), Math.abs(targetLift - lift)) < .01;
    if (settled) { x = targetX; y = targetY; lift = targetLift; }
    cover.style.setProperty("--cover-rx", `${y.toFixed(3)}deg`);
    cover.style.setProperty("--cover-ry", `${x.toFixed(3)}deg`);
    cover.style.setProperty("--cover-y", `${lift.toFixed(3)}px`);
    if (!settled) frame = view.requestAnimationFrame(draw);
    else {
      lastTime = 0;
      visual?.style.removeProperty("will-change");
      if (!targetLift) cover.removeAttribute("data-cover-moving");
    }
  };
  const schedule = () => {
    if (frame || !canMove()) return;
    cover.setAttribute("data-cover-moving", "true");
    if (visual) visual.style.willChange = "transform";
    frame = view.requestAnimationFrame(draw);
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || !canMove()) return;
    pointer = { x: event.clientX, y: event.clientY };
    cover.setAttribute("data-cover-active", "true");
    schedule();
  };
  const leave = () => {
    pointer = null;
    targetX = targetY = targetLift = 0;
    cover.removeAttribute("data-cover-active");
    if (x || y || lift) schedule();
  };
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => !entry.isIntersecting)) reset();
  });
  observer.observe(cover);
  cover.addEventListener("pointermove", move, { passive: true });
  cover.addEventListener("pointerleave", leave);
  cover.addEventListener("pointercancel", reset);
  reducedMotion.addEventListener("change", reset);
  finePointer.addEventListener("change", reset);
  document.addEventListener("visibilitychange", reset);
  view.addEventListener("blur", reset);
  return () => {
    disposed = true;
    reset();
    observer.disconnect();
    cover.removeEventListener("pointermove", move);
    cover.removeEventListener("pointerleave", leave);
    cover.removeEventListener("pointercancel", reset);
    reducedMotion.removeEventListener("change", reset);
    finePointer.removeEventListener("change", reset);
    document.removeEventListener("visibilitychange", reset);
    view.removeEventListener("blur", reset);
  };
}
