export const projects = [
  {
    id: "grass", number: "01", title: "Touching Grass", subtitle: "How India will go out in 2026", organisation: "District", year: "2026", format: "Cultural report", role: "Writer · Cultural insights", image: "/assets/touching-grass.webp",
    summary: "Four shifts in how urban India goes out: stories, belonging, new social hours and the value of being there.",
    question: "What are people really seeking when they make a plan?",
    context: "A night out is too narrow a frame for the ways people use a city. The report groups cultural examples into four shifts: Plot-First Culture, Ambient Belonging, Dual Prime Times and Revolt Against the Rot. Each asks a different question about what makes an experience worth leaving home for.",
    contribution: "I wrote the report for District, shaping its editorial frame and bringing together examples of how identity, company, time and physical experience affect going out.",
    perspective: "The choice is rarely as simple as online or offline, together or alone. A physical experience can live on in something people make or share. A person arriving solo may want connection, or may simply want the freedom to choose.",
    implication: "Make room for someone to arrive alone without forcing a social script. Offer something to choose, make or keep. Treat mornings and weekdays as real social occasions, while checking whose schedules allow them.",
    qualification: "The report offers interpretation rather than prediction. Its cultural signals are starting points for further inquiry, not a representative measure of every Indian consumer.",
    related: "Four connected shifts: Plot-First Culture · Ambient Belonging · Dual Prime Times · Revolt Against the Rot",
    link: "/assets/touching-grass-2026.pdf", linkLabel: "Download Touching Grass (PDF)"
  },
  {
    id: "consumed", number: "02", title: "Consumed", subtitle: "A deep dive into consumer culture in India", organisation: "Stumble × Kommune", year: "2024", format: "Co-authored report", role: "Co-author, with Ria Chopra", image: "/assets/consumed-cover.jpg",
    summary: "More than 100 expert perspectives across 17 sectors on convenience, identity and the meanings behind consumption.",
    question: "What can consumption tell us about the lives people are trying to build?",
    context: "The report starts with a wider question than what people buy: what do their choices say about convenience, identity and belonging? Its five chapters examine digital habits, India and Bharat, convenience and conscience, individual worlds and changing relationships.",
    contribution: "Co-written with Ria Chopra for Stumble and Kommune, Consumed draws on more than 100 experts across 17 sectors. The report brings together interviews, surveys, discussions, workshops and secondary research to map the cultural context of Indian consumption.",
    perspective: "Speed can solve a real problem, but it can also shorten the pause in which someone decides whether they want to buy at all. The report holds that tension alongside the ways people seek both wider access and smaller communities of recognition.",
    implication: "Which friction helps a person decide? Where does a choice need explanation or room to pause? What kind of recognition does the experience offer?",
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
