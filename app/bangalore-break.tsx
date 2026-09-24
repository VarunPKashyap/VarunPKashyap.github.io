const dosaRecs = [
  { name: "Bengaluru Cafe", location: "Bangalore" },
  { name: "SLV", location: "Banashankari, Bangalore" },
  { name: "MTR", location: "Lalbagh Road, Bangalore" },
  { name: "Benne", location: "Mumbai / Delhi" },
  { name: "Rameshwaram Cafe", note: "(it’s not bad, oops)" },
];

const coffeeRecs = [
  { name: "Kahale Coffee", location: "Jayanagar, Bangalore" },
  { name: "Bengaluru Cafe", location: "Bangalore" },
  { name: "By Two Coffee", location: "Bangalore" },
  { name: "Benne", location: "Mumbai / Delhi" },
];

export function BangaloreBreak() {
  return (
    <aside className="bangalore-break" id="bangalore" aria-labelledby="bangalore-title">
      <header className="food-heading">
        <div className="food-eyebrow"><span className="meta">Off the clock</span><span className="food-hometown"><span lang="kn">ಬೆಂಗಳೂರು</span><span className="meta">Bangalore</span></span></div>
        <h2 id="bangalore-title">Dosa first. <span>Filter coffee after.</span></h2>
      </header>
      <div className="food-body">
        <figure className="benne-photo">
          <div className="benne-photo-frame"><img src="/assets/benne-dosa-cutout.png" alt="Golden folded dosa with butter and two chutneys at Benne" width="1254" height="1254" loading="lazy" /></div>
          <figcaption><span>Benne, Mumbai</span><span>Photo via <a href="https://www.vogue.in/content/new-restaurants-in-india-mumbai-pune-delhi-ncr-amritsar-bengaluru-goa-hyderabad-thiruvananthapuram-june-2024" target="_blank" rel="noopener noreferrer">Vogue India</a></span></figcaption>
        </figure>
        <div className="food-recs">
          <section aria-labelledby="dosa-recs-title">
            <h3 id="dosa-recs-title">My dosa recs<span className="food-list-caption">In India</span></h3>
            <ul>
              {dosaRecs.map(place => (
                <li key={place.name}>
                  <span className="food-rec-name">{place.name}</span>
                  {place.location && <span className="food-rec-location">{place.location}</span>}
                  {place.note && <span className="food-rec-aside">{place.note}</span>}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="coffee-recs-title">
            <h3 id="coffee-recs-title">Filter coffee<span className="food-list-caption">My recs</span></h3>
            <ul>
              {coffeeRecs.map(place => (
                <li key={place.name}>
                  <span className="food-rec-name">{place.name}</span>
                  <span className="food-rec-location">{place.location}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </aside>
  );
}
