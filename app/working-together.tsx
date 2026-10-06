
const services = [
  { title: "Brand strategy", situation: "The team can list the features but struggles to say why anyone should care.", work: "A position, the evidence behind it, and a clear guide to what the brand should say and do." },
  { title: "Creative strategy", situation: "A campaign has an objective. The idea keeps getting lost in another round of routes.", work: "The central thought, the order of messages, and a brief a creative team can use." },
  { title: "Content strategy", situation: "Posting has become the plan.", work: "An editorial purpose, subjects worth returning to, and a job for each channel." },
];

export function ServicesSection() {
  return <section id="services" className="services-section">
    <div className="section-top"><span className="meta">Working together</span></div>
    <div className="services-heading" data-reveal><h2>What I can<br/><em>help decide.</em></h2><p>I’m most useful when there’s plenty of material and no one can agree what it adds up to.</p></div>
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
