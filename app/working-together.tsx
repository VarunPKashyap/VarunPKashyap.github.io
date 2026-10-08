
const services = [
  {
    title: "Find the tension",
    situation: "Look at what people do, the conditions around it, and where a neat explanation stops fitting.",
    work: "A question worth pursuing, with the evidence and the gaps kept visible.",
  },
  {
    title: "Shape the argument",
    situation: "Work through the material with the team. Question the interpretation and decide what we can credibly say.",
    work: "A clear point of view, with reasoning someone else can challenge or build on.",
  },
  {
    title: "Make it useful",
    situation: "Bring the argument back to a choice: how to position a brand, frame an idea or give a publication its purpose.",
    work: "A position, a brief or an editorial direction. Specific enough to guide the work and help the team leave things out.",
  },
];

export function ServicesSection() {
  return <section id="services" className="services-section">
    <div className="section-top"><span className="meta">03 / How I work</span></div>
    <div className="services-heading" data-reveal><h2>From an observation<br/><em>to a decision.</em></h2><p>I bring research and a point of view into the room, then work with the team to decide what to make of it.</p></div>
    <div className="services-grid" data-reveal>
      {services.map((service, index) => <article className="service-card" key={service.title}>
        <span className="service-index">0{index + 1}</span><h3>{service.title}</h3>
        <p className="service-question">{service.situation}</p>
        <p className="service-output">{service.work}</p>
      </article>)}
    </div>
    <div className="services-footer"><p>Send me what you’re working on.</p><a href="mailto:varunpkashyap98@gmail.com?subject=Let%27s%20talk%20strategy">Start a conversation</a></div>
  </section>;
}
