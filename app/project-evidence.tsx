const evidence = {
  consumed: {
    title: "What earns the next watch?",
    observation: "The report examines Dolly Singh’s 90-second Best Worst Dates and Moment of Silence’s path from Instagram reels to a podcast. It considers how discovery, storytelling and sustained engagement work across formats.",
    reading: "Give the first encounter and the longer relationship different jobs. A format choice should follow the idea and the audience.",
    image: "/assets/work/consumed-formats.webp",
    alt: "Original Consumed spread, Flick vs Flip: the platform dilemma, examining short-form discovery and long-form audience relationships.",
    width: 1600, height: 1056,
    source: "/assets/consumed-2024.pdf#page=11",
    sourceLabel: "Consumed · printed p. 9",
    credit: "Co-authored with Ria Chopra · Stumble × Kommune",
  },
  grass: {
    title: "An opening for conversation.",
    observation: "At Bengaluru’s Ma La Kitchen, a chef’s artwork, books and family tea traditions become openings for conversation. The kitchen itself is part of the experience.",
    reading: "A place can make connection possible while leaving someone free to keep to themselves. That permission is a design choice.",
    image: "/assets/work/touching-grass-kitchen.webp",
    alt: "Original Touching Grass spread on Ma La Kitchen in Bengaluru, showing the chef serving guests at the counter.",
    width: 1500, height: 975,
    source: "/assets/touching-grass-2026.pdf#page=38",
    sourceLabel: "Touching Grass · printed pp. 76–77",
    credit: "Written for District · An example documented in the report",
  },
};

export function ProjectEvidence({ projectId, variant = "card" }: { projectId: string; variant?: "card" | "reader" }) {
  const item = evidence[projectId as keyof typeof evidence];
  if (!item) return null;
  if (variant === "reader") return <section id="reader-evidence" tabIndex={-1} className="reader-original" aria-label="An original spread from the report">
    <div className="reader-original-heading"><h2>Inside the report</h2><a href={item.source} target="_blank" rel="noopener noreferrer">Open this spread <span aria-hidden="true">↗</span></a></div>
    <figure><img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async"/><figcaption><span>{item.sourceLabel}</span><span>{item.credit}</span></figcaption></figure>
  </section>;
  return <section className="project-evidence" aria-label="A closer look at the work">
    <div className="project-evidence-observation"><span className="meta">From the report</span><h4>{item.title}</h4><p>{item.observation}</p><a href={item.source} target="_blank" rel="noopener noreferrer">{item.sourceLabel} <span aria-hidden="true">↗</span></a></div>
    <div className="project-evidence-reading"><span className="meta">My reading</span><p>{item.reading}</p></div>
  </section>;
}
