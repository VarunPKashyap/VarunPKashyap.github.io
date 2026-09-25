import { ArrowUpRight } from "lucide-react";

const services = [
  { number: "01", title: "Brand strategy", question: "People know what we sell. What do we stand for?", work: "Find a position the brand can credibly take, with an argument and principles for what it says and does." },
  { number: "02", title: "Creative strategy", question: "We have the objective. What is the thought?", work: "Turn the audience’s reality into a central thought, a message hierarchy and a brief the team can make from." },
  { number: "03", title: "Content strategy", question: "We’re saying a lot. What should people come to us for?", work: "Set an editorial purpose, recurring topics, a recognisable voice and a clear job for each channel." },
];

export function ServicesSection() {
  return <section id="services" className="services-section">
    <div className="section-top"><span className="meta">03 / Working together</span><span className="meta">Start with the decision</span></div>
    <div className="services-heading"><h2>What can we<br/><em>make clearer?</em></h2><p>Bring a brief, a knotty question or an opportunity. Here are three kinds of decisions I can help with.</p></div>
    <div className="services-grid">
      {services.map(service => <article className="service-card" key={service.number}>
        <span className="service-number">{service.number}</span>
        <h3>{service.title}</h3>
        <p className="service-question">“{service.question}”</p>
        <p className="service-output">{service.work}</p>
      </article>)}
    </div>
    <div className="services-footer"><p>Tell me the question you are working through.</p><a href="mailto:varunpkashyap98@gmail.com?subject=Let%27s%20talk%20strategy">Start a conversation <ArrowUpRight size={19}/></a></div>
  </section>;
}
