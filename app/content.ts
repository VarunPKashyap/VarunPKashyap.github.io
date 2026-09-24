export const projects = [
  {
    id: "grass", number: "01", title: "Touching Grass", subtitle: "How India will go out in 2026", organisation: "district", year: "2026", format: "Cultural report", role: "Writer · Cultural insights", image: "/assets/touching-grass.webp",
    summary: "Identity, belonging and the changing social life of going out. A cultural reading of emerging behaviours in urban India.",
    question: "What are people really seeking when they make a plan?",
    context: "Touching Grass maps four connected shifts in how urban India goes out: the pursuit of stories, low-pressure belonging, changing social schedules, and a renewed appetite for physical experience. Together, they raise specific questions about programming, participation and what an experience leaves behind.",
    contribution: "I wrote Touching Grass for district, bringing emerging formats and cultural examples into a framework for how urban India spends its time outside the home.",
    perspective: "An experience can feel complete alone and still make room for connection. Its value can also continue through an object, ritual or shared reference long after the event ends. The detail matters: making interaction possible asks something different of a space than making it compulsory.",
    implication: "How can an experience feel complete for someone arriving alone? Who can make a weekday or morning plan, and who might struggle to join? What stays with people afterwards?",
    qualification: "The report offers interpretation rather than prediction. Its cultural signals are starting points for further inquiry, not a representative measure of every Indian consumer.",
    related: "Four connected shifts: Plot-First Culture · Ambient Belonging · Dual Prime Times · Revolt Against the Rot",
    link: "/assets/touching-grass-2026.pdf", linkLabel: "Download Touching Grass (PDF)"
  },
  {
    id: "consumed", number: "02", title: "Consumed", subtitle: "A deep dive into consumer culture in India", organisation: "Stumble × Kommune", year: "2024", format: "Co-authored report", role: "Co-author, with Ria Chopra", image: "/assets/consumed-cover.jpg",
    summary: "A cultural mapping of Indian consumption, informed by more than 100 expert perspectives across 17 sectors.",
    question: "What can consumption tell us about the lives people are trying to build?",
    context: "The same purchase can carry different meanings: pleasure, practicality, belonging, aspiration. Looking only at the transaction can miss the social context that makes a choice make sense.",
    contribution: "Co-written with Ria Chopra for Stumble and Kommune, Consumed draws on more than 100 experts across 17 sectors. The report brings together interviews, surveys, discussions, workshops and secondary research to map the cultural context of Indian consumption.",
    perspective: "The report observes that experiences can be accumulated and displayed much like possessions, even while screen fatigue draws people towards physical gatherings. It also considers how convenience encourages impulse, and how wider access coexists with the desire for niche recognition. Going offline, buying faster or entering a community does not resolve those tensions by itself.",
    implication: "When should an experience make a choice easier, and when should it leave room to pause? What kinds of recognition does it offer?",
    qualification: "The report brings together industry perspectives. Those voices should be read alongside the particular people, places and category a brand is trying to understand.",
    related: "Published October 2024 · Co-authored with Ria Chopra",
    link: "/assets/consumed-2024.pdf", linkLabel: "Download Consumed (PDF)"
  },
  {
    id: "hannah", number: "03", title: "Breaking Western Narratives", subtitle: "In Cultural Vibrations: Shifting Ground", organisation: "Hannah Grey", year: "2025", format: "Published interview", role: "Interview contributor, with Ria Chopra", image: "/assets/hannah-grey-cover.jpg",
    summary: "An Indian perspective on the assumptions behind global consumer narratives, published in Hannah Grey’s cultural journal.",
    question: "What changes when the place we look from changes?",
    context: "Cultural language travels easily. Its meaning does not always travel with it. A framework can become less useful when the local conditions behind a behaviour disappear from the explanation.",
    contribution: "Ria Chopra and I were interviewed for “Breaking Western Narratives: Fresh Perspectives on Global Consumer Behavior” in Hannah Grey’s Cultural Vibrations: Shifting Ground 2025.",
    perspective: "We questioned why Western observations so readily travel as global insights, while Indian ones remain labelled local. The conversation also explores experienced internet users’ fatigue alongside newer users’ excitement, and how meme-sharing can maintain relationships or provide a language for dissent.",
    implication: "The question I carry into strategy is whose experience an explanation begins with. Access history, language and local circumstances can change what the same technology or behaviour means. Cultural fluency requires keeping those conditions visible.",
    qualification: "",
    related: "Cultural Vibrations: Shifting Ground 2025 · Hannah Grey",
    link: "https://static1.squarespace.com/static/61e5c10ebb3de93bd4890f0c/t/67be0786e724152d6136f05d/1740507025325/Cultural%2BVibrations_%2BShifting%2BGround%2B2025.pdf", linkLabel: "Read Cultural Vibrations (PDF)"
  },
  {
    id: "podcast", number: "04", title: "Uncultured", subtitle: "By Stumble", organisation: "Stumble", year: "Podcast", format: "Conversation series", role: "Co-host, with Ria Chopra", image: "/assets/uncultured-cover.png",
    summary: "Conversations with Ria Chopra on quick commerce, film marketing, AI and the social habits behind the feed.",
    question: "What becomes clearer when a thought has room to develop?",
    context: "Some cultural questions need conversation: an example that complicates a neat explanation, a disagreement that reveals an assumption, a tangent that turns out to matter.",
    contribution: "I co-hosted Uncultured by Stumble with Ria Chopra. Episodes explored the labour behind quick deliveries, the marketing around Heeramandi, developments in AI, and the norms governing online discourse.",
    perspective: "Conversation tests a point of view: it can sharpen an idea, expose an assumption or change the question.",
    implication: "",
    qualification: "",
    related: "Co-hosted with Ria Chopra · Available on Spotify",
    link: "https://open.spotify.com/show/6wis5D4UVsxyDQO8RO4I23", linkLabel: "Listen on Spotify"
  }
];
export type Project = typeof projects[number];
