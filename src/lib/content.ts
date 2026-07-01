export type Locale = "zh" | "en";

export interface Bi {
  zh: string;
  en: string;
}

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
  date: Bi;
  role: Bi;
  org: Bi;
}

export interface Project {
  title: Bi;
  desc: Bi;
  tags: string[];
  venue: string;
  year: string;
  visual: "audio" | "network" | "avatar" | "coding";
  link: string;
}

export const navItems = [
  { id: "about", label: { zh: "关于", en: "About" } },
  { id: "publications", label: { zh: "论文", en: "Publications" } },
  { id: "experience", label: { zh: "经历", en: "Experience" } },
  { id: "projects", label: { zh: "项目", en: "Projects" } },
  { id: "contact", label: { zh: "联系", en: "Contact" } },
] as const;

export const brand: Bi = { zh: "陈光", en: "CHEN Guang" };

export const hero = {
  eyebrow: {
    zh: "智能科学与技术博士生 · AI 应用",
    en: "PHD STUDENT · AI APPLICATIONS",
  },
  nameZh: "陈光",
  nameEn: ["CHEN", "GUANG"],
  sub: {
    zh: "研究如何把前沿人工智能真正转化为可用、可信、以人为本的应用。",
    en: "Turning frontier AI into useful, trustworthy and human-centered applications.",
  },
  now: {
    zh: "华南理工大学 · 未来技术学院 · 2026.09",
    en: "SCUT · SCHOOL OF FUTURE TECHNOLOGY · SEP 2026",
  },
};

export const about = {
  statement: {
    zh: "让人工智能从技术可能走向真实应用。",
    en: "TURNING AI POSSIBILITY INTO REAL-WORLD APPLICATIONS.",
  },
  skills: [
    "AI Applications",
    "Agentic AI",
    "Human-Centered AI",
    "Mixed Methods",
    "Data Science",
    "Virtual Reality",
  ],
  stats: [
    { num: "6", label: { zh: "Google Scholar 论文", en: "Scholar publications" } },
    { num: "34", label: { zh: "Google Scholar 引用", en: "Scholar citations" } },
    { num: "2", label: { zh: "h-index", en: "h-index" } },
  ],
};

export const ctas = [
  {
    href: "#publications",
    kicker: { zh: "学术成果", en: "Academic output" },
    title: { zh: "论文", en: "Publications" },
    desc: { zh: "AI、HCI 与虚拟现实研究", en: "AI, HCI and virtual reality research" },
  },
  {
    href: "#projects",
    kicker: { zh: "应用研究", en: "Applied research" },
    title: { zh: "项目", en: "Projects" },
    desc: { zh: "从论文到可交互系统", en: "From papers to interactive systems" },
  },
];

const scholarBase = "https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=vT5MqNYAAAAJ";

export const publications: Publication[] = [
  {
    badges: [{ text: "CHB 2025" }, { text: "27 citations", highlight: true }],
    title: "Avatar-mediated communication in collaborative Virtual Environments: A study on users’ attention allocation and perception of social interactions",
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
    title: "Investigating Students’ Preferences for AI Roles in Mathematical Modelling: Evidence from a Randomized Controlled Trial",
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
    title: "Towards Effective Collaborative Learning in Edu-Metaverse: A Study on Learners’ Anxiety, Perception, and Behaviour",
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
    date: { zh: "2026.09 — 至今", en: "Sep 2026 — Present" },
    role: { zh: "智能科学与技术 博士生", en: "PhD Student in Intelligent Science and Technology" },
    org: {
      zh: "华南理工大学 · 未来技术学院",
      en: "School of Future Technology · South China University of Technology",
    },
  },
  {
    date: { zh: "2024.03 — 2026.08", en: "2024 — 2026" },
    role: { zh: "科研助理", en: "Research Assistant" },
    org: {
      zh: "香港理工大学 · 设计学院 & 电子计算学系",
      en: "PolyU · School of Design & Department of Computing",
    },
  },
  {
    date: { zh: "2022.08 — 2024.03", en: "2022 — 2024" },
    role: { zh: "数据科学与分析 理学硕士", en: "MSc in Data Science and Analytics" },
    org: {
      zh: "香港理工大学 · GPA 3.44/4.3",
      en: "The Hong Kong Polytechnic University · GPA 3.44/4.3",
    },
  },
  {
    date: { zh: "2017.09 — 2021.06", en: "2017 — 2021" },
    role: { zh: "计算机科学与技术 工学学士", en: "BEng in Computer Science and Technology" },
    org: {
      zh: "西南大学 · GPA 3.55/5.0",
      en: "Southwest University · GPA 3.55/5.0",
    },
  },
];

export const projects: Project[] = [
  {
    title: {
      zh: "面向可用性测试的智能音频主持人",
      en: "Agentic Audio Moderator for Usability Testing",
    },
    desc: {
      zh: "通过随机对照实验比较智能体音频主持人与人类主持人在出声思考测试中的表现与体验。",
      en: "A randomized controlled study comparing agentic and human moderators in think-aloud usability testing.",
    },
    tags: ["Agentic AI", "UX Research", "RCT"],
    venue: "CHI",
    year: "2026",
    visual: "audio",
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:UeHWp8X0CEIC`,
  },
  {
    title: {
      zh: "数学建模学习中的 AI 角色偏好",
      en: "AI Role Preferences in Mathematical Modelling",
    },
    desc: {
      zh: "研究学生如何选择不同的 AI 教学角色，并以随机对照实验评估角色设计对学习过程的影响。",
      en: "Investigating how students choose AI teaching roles and how those roles shape mathematical modelling.",
    },
    tags: ["AI in Education", "Human-AI Interaction", "RCT"],
    venue: "arXiv",
    year: "2025",
    visual: "network",
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:2osOgNQ5qMEC`,
  },
  {
    title: {
      zh: "协作虚拟环境中的化身沟通",
      en: "Avatar-Mediated Communication in Collaborative VR",
    },
    desc: {
      zh: "分析协作虚拟环境中用户的注意分配，以及化身如何改变对社会互动的感知。",
      en: "Studying attention allocation and perceived social interaction in avatar-mediated collaborative environments.",
    },
    tags: ["Virtual Reality", "Eye Tracking", "Social HCI"],
    venue: "CHB",
    year: "2025",
    visual: "avatar",
    link: `${scholarBase}&citation_for_view=vT5MqNYAAAAJ:u-x6o8ySG0sC`,
  },
  {
    title: {
      zh: "面向定性研究的 LLM 提示策略",
      en: "LLM Prompting for Qualitative Research Coding",
    },
    desc: {
      zh: "比较理论驱动与示例驱动提示在教育研究定性数据编码任务中的有效性。",
      en: "Comparing theory-informed and example-driven prompting for qualitative coding in educational research.",
    },
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
