export interface AuthorPart {
  t: string;
  bold?: boolean;
}

export interface Publication {
  badges: { text: string; highlight?: boolean }[];
  title: string;
  authors: AuthorPart[];
  citations?: number;
  link?: string;
}

export interface ExperienceItem {
  date: string;
  role: string;
  org: string;
}

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  venue: string;
  year: string;
  visual: "audio" | "network" | "avatar" | "coding";
  link: string;
}

export const navItems = [
  { id: "about", label: "About" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const brand = "CHEN Guang";

export const hero = {
  eyebrow: "PHD STUDENT · AI APPLICATIONS",
  name: ["CHEN", "GUANG"],
  sub: "Turning frontier AI into useful, trustworthy and human-centered applications.",
  now: "SCUT · SCHOOL OF FUTURE TECHNOLOGY · SEP 2026",
};

export const about = {
  statement: "TURNING AI POSSIBILITY INTO REAL-WORLD APPLICATIONS.",
  skills: [
    "AI Applications",
    "Agentic AI",
    "Human-Centered AI",
    "Mixed Methods",
    "Data Science",
    "Virtual Reality",
  ],
  stats: [
    { num: "6", label: "Scholar publications" },
    { num: "34", label: "Scholar citations" },
    { num: "2", label: "h-index" },
  ],
};

export const ctas = [
  {
    href: "#publications",
    kicker: "Academic output",
    title: "Publications",
    desc: "AI, HCI and virtual reality research",
  },
  {
    href: "#projects",
    kicker: "Applied research",
    title: "Projects",
    desc: "From papers to interactive systems",
  },
];

const scholarBase = "https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=vT5MqNYAAAAJ";

export const publications: Publication[] = [
  {
    badges: [{ text: "CHB 2025" }, { text: "27 citations", highlight: true }],
    title: "Avatar-mediated communication in collaborative Virtual Environments: A study on users' attention allocation and perception of social interactions",
    authors: [
      { t: "C. Li, Y. Dai, " },
      { t: "G. Chen", bold: true },
      { t: ", J. Liu, P. Li, H. H. Ip" },
    ],
    citations: 27,
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:u-x6o8ySG0sC`,
  },
  {
    badges: [{ text: "Frontiers in VR 2025" }, { text: "5 citations", highlight: true }],
    title: "Assessing the Effect of Arousal on Performance in a Virtual Reality Narrative Scenario Using Biological Signals",
    authors: [
      { t: "D. Archer, R. C. Li, " },
      { t: "G. Chen", bold: true },
      { t: ", Y. Dai, A. Steed" },
    ],
    citations: 5,
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:d1gkVwhDpl0C`,
  },
  {
    badges: [{ text: "arXiv 2025" }, { text: "2 citations", highlight: true }],
    title: "Investigating Students' Preferences for AI Roles in Mathematical Modelling: Evidence from a Randomized Controlled Trial",
    authors: [
      { t: "W. Zhu, " },
      { t: "G. Chen", bold: true },
      { t: ", Y. Zhu, L. Cai, X. Hu" },
    ],
    citations: 2,
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:2osOgNQ5qMEC`,
  },
  {
    badges: [{ text: "CHI 2026" }, { text: "CCF-A", highlight: true }],
    title: "Agentic Audio Moderator vs Human Moderator in Think-Aloud Usability Testing: Results from a Randomized Controlled Trial",
    authors: [
      { t: "W. Zhu, " },
      { t: "G. Chen", bold: true },
      { t: ", Y. Wang, P. An, J. Du, C. Li" },
    ],
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:UeHWp8X0CEIC`,
  },
  {
    badges: [{ text: "BESC 2025" }, { text: "AI + Education", highlight: true }],
    title: "Theory-Informed vs. Example-Driven Prompting for LLM-Based Qualitative Data Coding in Educational Research",
    authors: [
      { t: "G. Chen", bold: true },
      { t: ", W. Zhu, Y. N. Yang, D. Sun, Z. Wen" },
    ],
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:IjCSPb-OGe4C`,
  },
  {
    badges: [{ text: "SETE 2024" }, { text: "Edu-Metaverse", highlight: true }],
    title: "Towards Effective Collaborative Learning in Edu-Metaverse: A Study on Learners' Anxiety, Perception, and Behaviour",
    authors: [
      { t: "Y. Lu, Y. Jia, " },
      { t: "G. Chen", bold: true },
      { t: ", Y. Wang, P. H. F. Ng, L. Zhou, Q. Li, C. Li" },
    ],
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:u5HHmVD_uO8C`,
  },
];

export const experience: ExperienceItem[] = [
  {
    date: "Sep 2026 — Present",
    role: "PhD Student in Intelligent Science and Technology",
    org: "School of Future Technology · South China University of Technology",
  },
  {
    date: "2024 — 2026",
    role: "Research Assistant",
    org: "PolyU · School of Design & Department of Computing",
  },
  {
    date: "2022 — 2024",
    role: "MSc in Data Science and Analytics",
    org: "The Hong Kong Polytechnic University · GPA 3.44/4.3",
  },
  {
    date: "2017 — 2021",
    role: "BEng in Computer Science and Technology",
    org: "Southwest University · GPA 3.55/5.0",
  },
];

export const projects: Project[] = [
  {
    title: "Agentic Audio Moderator for Usability Testing",
    desc: "A randomized controlled study comparing agentic and human moderators in think-aloud usability testing.",
    tags: ["Agentic AI", "UX Research", "RCT"],
    venue: "CHI",
    year: "2026",
    visual: "audio",
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:UeHWp8X0CEIC`,
  },
  {
    title: "AI Role Preferences in Mathematical Modelling",
    desc: "Investigating how students choose AI teaching roles and how those roles shape mathematical modelling.",
    tags: ["AI in Education", "Human-AI Interaction", "RCT"],
    venue: "arXiv",
    year: "2025",
    visual: "network",
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:2osOgNQ5qMEC`,
  },
  {
    title: "Avatar-Mediated Communication in Collaborative VR",
    desc: "Studying attention allocation and perceived social interaction in avatar-mediated collaborative environments.",
    tags: ["Virtual Reality", "Eye Tracking", "Social HCI"],
    venue: "CHB",
    year: "2025",
    visual: "avatar",
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:u-x6o8ySG0sC`,
  },
  {
    title: "LLM Prompting for Qualitative Research Coding",
    desc: "Comparing theory-informed and example-driven prompting for qualitative coding in educational research.",
    tags: ["LLM", "Qualitative Coding", "EdTech"],
    venue: "BESC",
    year: "2025",
    visual: "coding",
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:IjCSPb-OGe4C`,
  },
];

export const marqueeItems = [
  "SCUT",
  "School of Future Technology",
  "AI Applications",
  "Agentic AI",
  "Human-Centered AI",
  "CHI",
  "CHB",
];

export const contact = {
  email: "guang.chen@connect.polyu.hk",
  scholar: "https://scholar.google.com/citations?user=vT5MqNYAAAAJ&hl=zh-CN",
  github: "https://github.com/chenah",
};
