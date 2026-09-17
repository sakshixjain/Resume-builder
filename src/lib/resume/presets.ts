import { Resume, PresetId, TemplateMetadata } from "./types";

// ==========================================
// 1. TECH - EXPERIENCED RESUME
// ==========================================
export const techExperiencedResume: Resume = {
  id: "preset-tech-experienced",
  title: "Senior Software Engineer Resume",
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: "Alexander Morgan",
    title: "Senior Full Stack & Cloud Architect",
    email: "alexander.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "https://linkedin.com/in/alexandermorgan",
    github: "https://github.com/alexmorgan-dev",
    photo: "",
  },
  summary:
    "Results-driven Senior Full Stack & Cloud Architect with 6+ years of experience designing, architecting, and scaling high-performance web platforms and distributed microservices. Proven track record of boosting system throughput by 45%, reducing p95 latency by 52%, and leading high-velocity engineering teams using Next.js, TypeScript, Node.js, and AWS.",
  experience: [
    {
      id: "exp-1",
      jobTitle: "Senior Full Stack Engineer & Tech Lead",
      company: "Apex Cloud Technologies",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "",
      current: true,
      description:
        "• Spearheaded migration of legacy monolith to Next.js App Router and serverless microservices, cutting p95 page latency by 52%.\n• Architected a real-time event streaming pipeline processing 10M+ daily transactions using Redis and Kafka pub/sub.\n• Mentored a team of 7 frontend and backend engineers, establishing rigorous automated code quality and CI/CD benchmarks.",
    },
    {
      id: "exp-2",
      jobTitle: "Software Engineer",
      company: "Vanguard Digital Labs",
      location: "Austin, TX",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      description:
        "• Developed reusable TypeScript design system components adopted across 4 major customer-facing SaaS applications.\n• Optimized PostgreSQL relational schemas and query indices, decreasing average database load by 38% under peak traffic.\n• Built end-to-end integration test suites with Playwright and Jest, boosting code coverage from 60% to 94%.",
    },
    {
      id: "exp-3",
      jobTitle: "Junior Software Developer",
      company: "Nexus Interactive",
      location: "Austin, TX",
      startDate: "2018-05",
      endDate: "2019-05",
      current: false,
      description:
        "• Implemented accessible responsive user interfaces adhering to WCAG 2.1 AA standards for high-traffic e-commerce clients.\n• Contributed to RESTful microservice development in Node.js/Express, integrating Stripe subscription billing workflows.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2014-08",
      endDate: "2018-05",
      description: "Magna Cum Laude, Dean's Honor List. President of ACM Student Chapter.",
      gpa: "3.85 / 4.0",
    },
  ],
  skills: [
    { id: "sk-1", name: "TypeScript", level: "Expert", category: "Languages" },
    { id: "sk-2", name: "JavaScript (ES6+)", level: "Expert", category: "Languages" },
    { id: "sk-3", name: "React / Next.js", level: "Expert", category: "Frontend" },
    { id: "sk-4", name: "Node.js / Express", level: "Advanced", category: "Backend" },
    { id: "sk-5", name: "PostgreSQL & Redis", level: "Advanced", category: "Database" },
    { id: "sk-6", name: "GraphQL & REST APIs", level: "Advanced", category: "Backend" },
    { id: "sk-7", name: "AWS (Lambda, S3, ECS)", level: "Advanced", category: "Cloud & DevOps" },
    { id: "sk-8", name: "Docker & Kubernetes", level: "Intermediate", category: "Cloud & DevOps" },
    { id: "sk-9", name: "Tailwind CSS", level: "Expert", category: "Frontend" },
    { id: "sk-10", name: "CI/CD & GitHub Actions", level: "Expert", category: "Tools" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "PulseEngine - Distributed Observability Platform",
      description:
        "High-throughput monitoring engine with real-time log ingestion, automated alerts, and interactive canvas charts handling 100k requests/sec.",
      technologies: "Next.js, TypeScript, Go, ClickHouse, Docker",
      projectUrl: "https://pulseengine.dev",
      githubUrl: "https://github.com/alexmorgan-dev/pulseengine",
      startDate: "2023-01",
      endDate: "2023-09",
    },
    {
      id: "proj-2",
      name: "DevSprint - Collaborative Real-Time Editor",
      description:
        "Collaborative multi-cursor markdown workspace with offline sync, CRDT conflict resolution, and instant PDF/EPUB export.",
      technologies: "React, WebSockets, Yjs, Zustand, Node.js",
      projectUrl: "https://devsprint.app",
      githubUrl: "https://github.com/alexmorgan-dev/devsprint",
      startDate: "2022-04",
      endDate: "2022-11",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023-05",
      url: "https://aws.amazon.com/verification",
    },
    {
      id: "cert-2",
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta",
      date: "2021-11",
      url: "https://coursera.org/verify/meta-front-end",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Intermediate" },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "1st Place Winner - Silicon Valley Hackathon 2023",
      description: "Built an AI-driven accessibility developer tool that transcribes and converts code to audio navigation in real time.",
      date: "2023",
    },
    {
      id: "ach-2",
      title: "Top Open Source Contributor Award",
      description: "Recognized for top contributions to Next.js community ecosystems with over 25,000 GitHub stars.",
      date: "2022",
    },
  ],
  customSections: [],
  sectionOrder: [
    "summary",
    "experience",
    "skills",
    "projects",
    "certifications",
    "education",
    "achievements",
    "languages",
  ],
  sectionVisibility: {
    summary: true,
    experience: true,
    skills: true,
    projects: true,
    certifications: true,
    education: true,
    achievements: true,
    languages: true,
  },
  settings: {
    template: "tech",
    primaryColor: "#2563eb",
    fontFamily: "inter",
    fontSize: "md",
    spacing: "normal",
    margins: "normal",
    showIcons: true,
  },
};

// ==========================================
// 2. TECH - FRESHER / STUDENT RESUME
// ==========================================
export const techFresherResume: Resume = {
  id: "preset-tech-fresher",
  title: "Entry-Level Software Engineer Resume",
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: "David Chen",
    title: "Computer Science Graduate / Junior Software Engineer",
    email: "david.chen@example.edu",
    phone: "+1 (555) 345-6789",
    location: "Seattle, WA",
    website: "https://davidchen.dev",
    linkedin: "https://linkedin.com/in/davidchen-cs",
    github: "https://github.com/davidchen-dev",
    photo: "",
  },
  summary:
    "High-achieving Computer Science graduate (GPA: 3.92/4.0) with strong foundations in Data Structures, Algorithms, Full-Stack Web Development, and Cloud Computing. Winner of University Hackathon 2024 with proven ability to build scalable React/Node.js web apps and RESTful APIs. Eager to contribute clean, well-tested code to an innovative engineering team.",
  education: [
    {
      id: "edu-fresher-1",
      degree: "B.S. in Computer Science & Engineering",
      institution: "University of Washington",
      location: "Seattle, WA",
      startDate: "2020-09",
      endDate: "2024-06",
      description:
        "Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Systems, Computer Networks, Machine Learning, Web Engineering. Summa Cum Laude.",
      gpa: "3.92 / 4.0",
    },
  ],
  experience: [
    {
      id: "exp-fresher-1",
      jobTitle: "Software Engineering Intern",
      company: "CloudScale Systems",
      location: "Seattle, WA",
      startDate: "2023-06",
      endDate: "2023-09",
      current: false,
      description:
        "• Developed and deployed 12+ RESTful API endpoints in Node.js/TypeScript, improving data retrieval efficiency by 30%.\n• Automated database migration scripts in PostgreSQL and created automated unit tests using Jest achieving 90% test coverage.\n• Participated in daily agile standups, sprint reviews, and peer code reviews with senior engineering mentors.",
    },
    {
      id: "exp-fresher-2",
      jobTitle: "Undergraduate Teaching Assistant (Data Structures)",
      company: "University of Washington",
      location: "Seattle, WA",
      startDate: "2023-09",
      endDate: "2024-05",
      current: false,
      description:
        "• Mentored 80+ undergraduate students in Java memory management, binary search trees, graph algorithms, and asymptotic complexity.\n• Led weekly lab discussions and graded coding assignments with constructive, detailed feedback.",
    },
  ],
  skills: [
    { id: "sk-f-1", name: "Python", level: "Expert", category: "Languages" },
    { id: "sk-f-2", name: "Java", level: "Advanced", category: "Languages" },
    { id: "sk-f-3", name: "TypeScript / JavaScript", level: "Advanced", category: "Languages" },
    { id: "sk-f-4", name: "C / C++", level: "Intermediate", category: "Languages" },
    { id: "sk-f-5", name: "React / Next.js", level: "Advanced", category: "Frontend" },
    { id: "sk-f-6", name: "Tailwind CSS", level: "Advanced", category: "Frontend" },
    { id: "sk-f-7", name: "Node.js & Express", level: "Advanced", category: "Backend" },
    { id: "sk-f-8", name: "PostgreSQL & MongoDB", level: "Intermediate", category: "Databases" },
    { id: "sk-f-9", name: "Git / GitHub & Docker", level: "Advanced", category: "Tools" },
  ],
  projects: [
    {
      id: "proj-f-1",
      name: "Algoverse - Interactive Algorithm Visualizer",
      description:
        "Interactive web application visualising 20+ sorting, pathfinding (Dijkstra, A*), and tree algorithms with step-by-step speed control and execution analysis.",
      technologies: "React, TypeScript, Canvas API, Tailwind CSS, Vercel",
      projectUrl: "https://algoverse.dev",
      githubUrl: "https://github.com/davidchen-dev/algoverse",
      startDate: "2024-01",
      endDate: "2024-04",
    },
    {
      id: "proj-f-2",
      name: "CampusConnect - Student Marketplace Platform",
      description:
        "Full-stack campus marketplace featuring real-time chat, authentication, image uploads, and fuzzy search for 3,000+ registered student users.",
      technologies: "Next.js, Node.js, PostgreSQL, Prisma, Socket.io",
      projectUrl: "https://campusconnect.app",
      githubUrl: "https://github.com/davidchen-dev/campus-connect",
      startDate: "2023-10",
      endDate: "2023-12",
    },
    {
      id: "proj-f-3",
      name: "StudySync - AI Flashcard & Quiz Generator",
      description:
        "Chrome extension and web app using LLM APIs to automatically convert lecture notes and PDFs into active recall flashcards.",
      technologies: "Python, FastAPI, OpenAI API, React, Chrome Extension API",
      projectUrl: "https://studysync-ai.com",
      githubUrl: "https://github.com/davidchen-dev/studysync",
      startDate: "2023-04",
      endDate: "2023-05",
    },
  ],
  certifications: [
    {
      id: "cert-f-1",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024-02",
      url: "https://aws.amazon.com/verification",
    },
  ],
  languages: [
    { id: "lang-f-1", name: "English", proficiency: "Native" },
    { id: "lang-f-2", name: "Mandarin Chinese", proficiency: "Fluent" },
  ],
  achievements: [
    {
      id: "ach-f-1",
      title: "1st Place Winner - DubHacks 2024",
      description: "Built an AI-assisted campus disaster response dispatch tool among 200+ competing collegiate teams.",
      date: "2024",
    },
    {
      id: "ach-f-2",
      title: "Dean's High Honors List (All Quarters)",
      description: "Recognized for maintaining cumulative GPA > 3.9 throughout 4-year undergraduate study.",
      date: "2020 - 2024",
    },
  ],
  customSections: [],
  sectionOrder: [
    "education",
    "skills",
    "projects",
    "experience",
    "achievements",
    "certifications",
    "languages",
  ],
  sectionVisibility: {
    summary: true,
    education: true,
    skills: true,
    projects: true,
    experience: true,
    achievements: true,
    certifications: true,
    languages: true,
  },
  settings: {
    template: "modern",
    primaryColor: "#0284c7",
    fontFamily: "outfit",
    fontSize: "md",
    spacing: "compact",
    margins: "compact",
    showIcons: true,
  },
};

// ==========================================
// 3. NON-TECH - EXPERIENCED RESUME
// ==========================================
export const nonTechExperiencedResume: Resume = {
  id: "preset-nontech-experienced",
  title: "Senior Marketing & Growth Director Resume",
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: "Sophia Reynolds",
    title: "Director of Digital Marketing & Growth Strategy",
    email: "sophia.reynolds@example.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    website: "https://sophiareynolds.com",
    linkedin: "https://linkedin.com/in/sophiareynolds-marketing",
    github: "",
    photo: "",
  },
  summary:
    "Strategic, data-driven Director of Marketing with 7+ years of experience leading cross-functional teams, managing $3.5M+ annual budgets, and scaling B2B/B2C revenue from $4M to $18M ARR. Expert in customer acquisition funnels, brand storytelling, marketing automation, P&L management, and conversion rate optimization (CRO).",
  experience: [
    {
      id: "exp-nt-1",
      jobTitle: "Director of Growth Marketing",
      company: "Beacon Global Brands",
      location: "New York, NY",
      startDate: "2021-08",
      endDate: "",
      current: true,
      description:
        "• Managed an 8-person growth marketing team overseeing $3.5M annual omnichannel marketing budget across paid, organic, and email channels.\n• Scaled qualified sales pipeline by 140% YoY, driving an additional $6.2M in annual recurring revenue (ARR).\n• Overhauled organic SEO strategy and content engine, growing inbound organic search traffic from 80k to 520k monthly visits.\n• Spearheaded partnership campaigns with Fortune 500 affiliates, delivering 3.8x Return on Ad Spend (ROAS).",
    },
    {
      id: "exp-nt-2",
      jobTitle: "Senior Performance Marketing Manager",
      company: "Horizon Retail Ventures",
      location: "Boston, MA",
      startDate: "2018-06",
      endDate: "2021-07",
      current: false,
      description:
        "• Spearheaded Google Ads, Meta, and LinkedIn campaign strategy, reducing Customer Acquisition Cost (CAC) by 32%.\n• Designed and executed 50+ rigorous A/B multivariate landing page experiments, boosting checkout conversion by 26%.\n• Collaborated closely with product and sales executives to refine customer onboarding and retention email drip workflows.",
    },
    {
      id: "exp-nt-3",
      jobTitle: "Marketing & Brand Specialist",
      company: "Stratton PR & Media",
      location: "Boston, MA",
      startDate: "2016-09",
      endDate: "2018-05",
      current: false,
      description:
        "• Coordinated national product launches for 14 lifestyle and consumer tech brands, generating 120+ tier-1 press placements.\n• Authored case studies, whitepapers, and executive press releases increasing client brand sentiment metrics by 40%.",
    },
  ],
  education: [
    {
      id: "edu-nt-1",
      degree: "Master of Business Administration (MBA) - Marketing & Strategy",
      institution: "Columbia Business School",
      location: "New York, NY",
      startDate: "2019-09",
      endDate: "2021-05",
      description: "Graduated with Honors. VP of Graduate Marketing Association.",
      gpa: "3.88 / 4.0",
    },
    {
      id: "edu-nt-2",
      degree: "B.A. in Communications & Media Studies",
      institution: "Boston University",
      location: "Boston, MA",
      startDate: "2012-09",
      endDate: "2016-05",
      description: "Summa Cum Laude.",
      gpa: "3.90 / 4.0",
    },
  ],
  skills: [
    { id: "sk-nt-1", name: "Growth Strategy & P&L", level: "Expert", category: "Leadership" },
    { id: "sk-nt-2", name: "Performance Marketing & ROAS", level: "Expert", category: "Marketing" },
    { id: "sk-nt-3", name: "SEO & Content Architecture", level: "Expert", category: "Marketing" },
    { id: "sk-nt-4", name: "Conversion Rate Optimization (CRO)", level: "Expert", category: "Analytics" },
    { id: "sk-nt-5", name: "Google Analytics 4 & Looker Studio", level: "Expert", category: "Analytics" },
    { id: "sk-nt-6", name: "HubSpot & Salesforce CRM", level: "Advanced", category: "Tools" },
    { id: "sk-nt-7", name: "A/B Testing & Customer Funnels", level: "Expert", category: "Marketing" },
    { id: "sk-nt-8", name: "Budgeting & Financial Modeling", level: "Advanced", category: "Business" },
  ],
  projects: [
    {
      id: "proj-nt-1",
      name: "Global Rebrand & Omnichannel Launch Campaign",
      description:
        "Led cross-functional repositioning and digital relaunch across 6 international markets, increasing brand awareness score by 65%.",
      technologies: "HubSpot, Google Analytics, Figma, Klaviyo",
      startDate: "2022-03",
      endDate: "2022-11",
    },
    {
      id: "proj-nt-2",
      name: "Automated Customer Lifecycle Email Engine",
      description:
        "Architected multi-branch behavioural email nurture sequences driving 38% open rates and $1.4M in direct automated re-engagement revenue.",
      technologies: "Salesforce Marketing Cloud, Segment, Mixpanel",
      startDate: "2021-10",
      endDate: "2022-02",
    },
  ],
  certifications: [
    {
      id: "cert-nt-1",
      name: "Google Ads & Google Analytics Certified Professional",
      issuer: "Google",
      date: "2023-01",
      url: "https://skillshop.credential.net",
    },
    {
      id: "cert-nt-2",
      name: "Inbound Marketing & Revenue Operations Specialist",
      issuer: "HubSpot Academy",
      date: "2022-08",
      url: "https://hubspot.com/verify",
    },
  ],
  languages: [
    { id: "lang-nt-1", name: "English", proficiency: "Native" },
    { id: "lang-nt-2", name: "French", proficiency: "Fluent" },
  ],
  achievements: [
    {
      id: "ach-nt-1",
      title: "Marketing Campaign of the Year - AdAge Excellence Award",
      description: "Awarded for viral interactive digital campaign reaching 15M impressions with a 4.2x ROAS.",
      date: "2023",
    },
  ],
  customSections: [],
  sectionOrder: [
    "summary",
    "experience",
    "skills",
    "education",
    "projects",
    "certifications",
    "achievements",
    "languages",
  ],
  sectionVisibility: {
    summary: true,
    experience: true,
    skills: true,
    education: true,
    projects: true,
    certifications: true,
    achievements: true,
    languages: true,
  },
  settings: {
    template: "corporate",
    primaryColor: "#0f766e",
    fontFamily: "merriweather",
    fontSize: "md",
    spacing: "normal",
    margins: "normal",
    showIcons: true,
  },
};

// ==========================================
// 4. NON-TECH - FRESHER / GRADUATE RESUME
// ==========================================
export const nonTechFresherResume: Resume = {
  id: "preset-nontech-fresher",
  title: "Entry-Level Business & Marketing Resume",
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: "Chloe Bennett",
    title: "Business Administration & Marketing Graduate",
    email: "chloe.bennett@example.edu",
    phone: "+1 (555) 567-8901",
    location: "Chicago, IL",
    website: "https://chloebennett.me",
    linkedin: "https://linkedin.com/in/chloebennett-business",
    github: "",
    photo: "",
  },
  summary:
    "Energetic and detail-oriented Business Administration graduate with a concentration in Marketing and Market Analytics (GPA: 3.88/4.0). Proven leadership as President of the Collegiate Marketing Society and hands-on experience executing social media campaigns, brand research, and client presentations. Passionate about driving measurable customer engagement.",
  education: [
    {
      id: "edu-ntf-1",
      degree: "B.B.A. in Business Administration (Marketing Concentration)",
      institution: "Northwestern University",
      location: "Evanston, IL",
      startDate: "2020-09",
      endDate: "2024-06",
      description:
        "Relevant Coursework: Brand Strategy, Consumer Behavior, Digital Marketing & Analytics, Corporate Finance, Business Statistics, Organizational Leadership. Dean's List for 7 consecutive semesters.",
      gpa: "3.88 / 4.0",
    },
  ],
  experience: [
    {
      id: "exp-ntf-1",
      jobTitle: "Digital Marketing & Social Media Intern",
      company: "Midwest Creative Agency",
      location: "Chicago, IL",
      startDate: "2023-06",
      endDate: "2023-08",
      current: false,
      description:
        "• Created and scheduled 40+ content assets across Instagram, LinkedIn, and TikTok, boosting audience engagement by 48% in 60 days.\n• Conducted competitive market research and analyzed weekly performance metrics using Google Analytics and Meta Business Suite.\n• Assisted senior account leads in designing client pitch decks and quarterly reporting presentations.",
    },
    {
      id: "exp-ntf-2",
      jobTitle: "President & Campaign Lead",
      company: "Northwestern Collegiate Marketing Society",
      location: "Evanston, IL",
      startDate: "2022-09",
      endDate: "2024-05",
      current: false,
      description:
        "• Led an executive board of 6 students overseeing a $15k annual budget and 120+ active student members.\n• Organized the 2023 Annual Midwest Marketing Conference hosting 12 industry keynote speakers and 350+ attendees.\n• Spearheaded corporate sponsorship outreach, securing $8,500 in sponsor funding from local businesses.",
    },
  ],
  skills: [
    { id: "sk-ntf-1", name: "Social Media Strategy & Content", level: "Advanced", category: "Marketing" },
    { id: "sk-ntf-2", name: "Market Research & Competitive Analysis", level: "Advanced", category: "Research" },
    { id: "sk-ntf-3", name: "Google Analytics 4 & Excel (Pivot/VLOOKUP)", level: "Advanced", category: "Analytics" },
    { id: "sk-ntf-4", name: "Canva & Figma Design", level: "Advanced", category: "Creative" },
    { id: "sk-ntf-5", name: "Copywriting & Brand Storytelling", level: "Advanced", category: "Communication" },
    { id: "sk-ntf-6", name: "Public Speaking & Presentations", level: "Expert", category: "Soft Skills" },
    { id: "sk-ntf-7", name: "Project Management & Event Planning", level: "Advanced", category: "Operations" },
  ],
  projects: [
    {
      id: "proj-ntf-1",
      name: "Direct-to-Consumer Brand Launch Strategy (Senior Capstone)",
      description:
        "Conducted quantitative survey of 450+ consumers to develop a comprehensive 20-page go-to-market plan, pricing model, and digital promotional schedule for an eco-friendly consumer product.",
      technologies: "Excel, Qualtrics, Tableau, PowerPoint",
      startDate: "2024-01",
      endDate: "2024-04",
    },
    {
      id: "proj-ntf-2",
      name: "Non-Profit Community Awareness Campaign",
      description:
        "Designed local digital fundraising campaign for Chicago Youth Alliance, generating $12,000 in donor contributions over a 3-week sprint.",
      technologies: "Mailchimp, Meta Ads, Canva",
      startDate: "2023-10",
      endDate: "2023-11",
    },
  ],
  certifications: [
    {
      id: "cert-ntf-1",
      name: "HubSpot Inbound Marketing Certified",
      issuer: "HubSpot Academy",
      date: "2023-11",
      url: "https://hubspot.com/verify",
    },
    {
      id: "cert-ntf-2",
      name: "Google Digital Marketing & E-Commerce Certificate",
      issuer: "Google / Coursera",
      date: "2023-04",
      url: "https://coursera.org/verify/google-marketing",
    },
  ],
  languages: [
    { id: "lang-ntf-1", name: "English", proficiency: "Native" },
    { id: "lang-ntf-2", name: "Spanish", proficiency: "Intermediate" },
  ],
  achievements: [
    {
      id: "ach-ntf-1",
      title: "1st Place Winner - Midwest University Case Study Competition",
      description: "Formulated the winning omnichannel expansion pitch for a major regional beverage brand.",
      date: "2023",
    },
    {
      id: "ach-ntf-2",
      title: "Outstanding Undergraduate Leader of the Year",
      description: "Recognized by University Student Affairs for campus leadership and community service.",
      date: "2024",
    },
  ],
  customSections: [],
  sectionOrder: [
    "education",
    "experience",
    "skills",
    "projects",
    "certifications",
    "achievements",
    "languages",
  ],
  sectionVisibility: {
    summary: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
    certifications: true,
    achievements: true,
    languages: true,
  },
  settings: {
    template: "creative",
    primaryColor: "#7c3aed",
    fontFamily: "outfit",
    fontSize: "md",
    spacing: "normal",
    margins: "normal",
    showIcons: true,
  },
};

// ==========================================
// 5. ACADEMIC & RESEARCH CV (CURRICULUM VITAE)
// ==========================================
export const academicCVData: Resume = {
  id: "preset-academic-cv",
  title: "Academic & Research Curriculum Vitae (CV)",
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: "Dr. Elena Rostova, Ph.D.",
    title: "Postdoctoral Research Fellow in Computational AI & Machine Learning",
    email: "elena.rostova@stanford.edu",
    phone: "+1 (650) 723-2300",
    location: "Stanford, CA",
    website: "https://elenarostova.academic.site",
    linkedin: "https://linkedin.com/in/dr-elena-rostova",
    github: "https://github.com/elena-rostova-research",
    photo: "",
  },
  summary:
    "Postdoctoral Research Fellow in the Stanford Department of Computer Science with 5+ years of specialized research experience in Transformer Architectures, Multimodal Representation Learning, and Explainable AI. First author of 6 peer-reviewed papers published in NeurIPS, ICML, and IEEE TPAMI (1,400+ citations, h-index: 9). Recipient of NSF Graduate Research Fellowship and $350k in collaborative research grants.",
  education: [
    {
      id: "edu-ac-1",
      degree: "Ph.D. in Computer Science & Artificial Intelligence",
      institution: "Stanford University",
      location: "Stanford, CA",
      startDate: "2019-09",
      endDate: "2024-06",
      description:
        "Dissertation: 'Scalable Attention Mechanisms & Cross-Modal Alignment in Large Language Models.'\nAdvisor: Prof. Michael S. Zhang. Awarded Best Doctoral Dissertation Award in Computer Science.",
      gpa: "4.0 / 4.0",
    },
    {
      id: "edu-ac-2",
      degree: "M.S. in Electrical Engineering & Computer Science",
      institution: "Massachusetts Institute of Technology (MIT)",
      location: "Cambridge, MA",
      startDate: "2017-09",
      endDate: "2019-06",
      description: "Thesis: 'Probabilistic Graphical Models for Genomic Sequence Prediction.' GPA: 3.95/4.0.",
      gpa: "3.95 / 4.0",
    },
    {
      id: "edu-ac-3",
      degree: "B.S. in Applied Mathematics & Computer Science",
      institution: "Carnegie Mellon University (CMU)",
      location: "Pittsburgh, PA",
      startDate: "2013-08",
      endDate: "2017-05",
      description: "Summa Cum Laude, Phi Beta Kappa, President's Scholar.",
      gpa: "3.98 / 4.0",
    },
  ],
  experience: [
    {
      id: "exp-ac-1",
      jobTitle: "Postdoctoral Research Fellow",
      company: "Stanford Artificial Intelligence Laboratory (SAIL)",
      location: "Stanford, CA",
      startDate: "2024-07",
      endDate: "",
      current: true,
      description:
        "• Leading a research group of 4 doctoral students investigating efficient attention sparse matrix kernels and multimodal reasoning in frontier foundation models.\n• Secured $350,000 NSF Collaborative Research Grant in partnership with Stanford Medicine for AI-driven clinical diagnostic assistance.\n• Authored 2 flagship conference papers accepted at NeurIPS 2024 Oral Presentation (Top 1.5% of submissions).",
    },
    {
      id: "exp-ac-2",
      jobTitle: "Graduate Research Assistant & Doctoral Fellow",
      company: "Stanford University",
      location: "Stanford, CA",
      startDate: "2019-09",
      endDate: "2024-06",
      current: false,
      description:
        "• Formulated novel linear-complexity self-attention algorithm reducing transformer GPU memory footprint by 65% while preserving semantic fidelity.\n• Designed open-source PyTorch benchmarking library with 4,000+ GitHub stars adopted by research labs worldwide.\n• Presented findings across 8 international conferences including NeurIPS, ICML, CVPR, and ICLR.",
    },
    {
      id: "exp-ac-3",
      jobTitle: "Graduate Teaching Fellow (CS229: Machine Learning)",
      company: "Stanford University",
      location: "Stanford, CA",
      startDate: "2021-09",
      endDate: "2023-06",
      current: false,
      description:
        "• Delivered weekly discussion sections for 400+ graduate students, covering supervised learning, kernel methods, SVMs, neural networks, and reinforcement learning.\n• Designed midterm examinations and automated Python autograder test suites.",
    },
  ],
  skills: [
    { id: "sk-ac-1", name: "Deep Learning (PyTorch, JAX, TensorFlow)", level: "Expert", category: "AI & ML" },
    { id: "sk-ac-2", name: "LLMs, Transformers & Diffusion Models", level: "Expert", category: "AI & ML" },
    { id: "sk-ac-3", name: "Python, C++, CUDA & GPU Optimization", level: "Expert", category: "Languages" },
    { id: "sk-ac-4", name: "Statistical Modeling & Bayesian Inference", level: "Expert", category: "Mathematics" },
    { id: "sk-ac-5", name: "High-Performance Computing (SLURM, MPI)", level: "Advanced", category: "Systems" },
    { id: "sk-ac-6", name: "Scientific Writing & Grant Proposal Crafting", level: "Expert", category: "Research" },
  ],
  projects: [
    {
      id: "proj-ac-1",
      name: "FastCross: Linear Time Cross-Modal Attention Engine",
      description:
        "Open-source deep learning framework providing sub-quadratic cross-modal attention operators for multimodal vision-language models.",
      technologies: "PyTorch, CUDA, Triton, Python",
      projectUrl: "https://fastcross.ai",
      githubUrl: "https://github.com/elena-rostova-research/fastcross",
      startDate: "2022-01",
      endDate: "2024-03",
    },
  ],
  certifications: [
    {
      id: "cert-ac-1",
      name: "NSF Graduate Research Fellowship (NSF GRFP)",
      issuer: "National Science Foundation",
      date: "2019-2024",
      url: "https://nsfgrfp.org",
    },
  ],
  languages: [
    { id: "lang-ac-1", name: "English", proficiency: "Native" },
    { id: "lang-ac-2", name: "Russian", proficiency: "Native" },
    { id: "lang-ac-3", name: "German", proficiency: "Intermediate" },
  ],
  achievements: [
    {
      id: "ach-ac-1",
      title: "Outstanding Paper Award - NeurIPS 2023",
      description: "Awarded to top 0.2% of submitted papers for breakthrough advances in attention memory optimization.",
      date: "2023",
    },
    {
      id: "ach-ac-2",
      title: "Stanford Centennial Teaching Assistant Award",
      description: "Recognized for excellence in graduate machine learning instruction and curriculum design.",
      date: "2022",
    },
  ],
  customSections: [
    {
      id: "cs-pub",
      title: "Selected Peer-Reviewed Publications",
      items: [
        {
          id: "cs-pub-1",
          title: "Rostova, E., Zhang, M. S., et al. 'Sub-Quadratic Cross-Attention for High-Resolution Vision-Language Models.'",
          subtitle: "Advances in Neural Information Processing Systems (NeurIPS), 2024 (Oral Presentation)",
          date: "2024",
          description: "Proposed linear-scaling kernel reaching 4.8x training speedup on 80GB A100 GPU clusters.",
        },
        {
          id: "cs-pub-2",
          title: "Rostova, E., Chen, L., & Zhang, M. S. 'Disentangled Representation Learning in Multimodal Foundation Architectures.'",
          subtitle: "International Conference on Machine Learning (ICML), 2023",
          date: "2023",
          description: "Established formal convergence bounds for multi-task contrastive loss objectives.",
        },
        {
          id: "cs-pub-3",
          title: "Rostova, E. & Keller, H. 'Probabilistic Sequence Priors for High-Throughput Biomolecular Prediction.'",
          subtitle: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI), 45(8), 9820-9834",
          date: "2022",
          description: "Cited 420+ times.",
        },
      ],
    },
    {
      id: "cs-grants",
      title: "Research Grants & Funding Awards",
      items: [
        {
          id: "cs-grant-1",
          title: "Co-Principal Investigator, National Science Foundation (NSF Grant #234891)",
          subtitle: "$350,000 Total Award — 'Foundational AI Architectures for Explainable Clinical Reasoning'",
          date: "2024 - 2027",
          description: "Collaborative grant spanning Stanford CS and Stanford Medicine.",
        },
      ],
    },
  ],
  sectionOrder: [
    "summary",
    "education",
    "cs-pub",
    "experience",
    "cs-grants",
    "skills",
    "achievements",
    "projects",
    "languages",
  ],
  sectionVisibility: {
    summary: true,
    education: true,
    "cs-pub": true,
    experience: true,
    "cs-grants": true,
    skills: true,
    achievements: true,
    projects: true,
    languages: true,
  },
  settings: {
    template: "academic",
    primaryColor: "#1e3a8a",
    fontFamily: "merriweather",
    fontSize: "md",
    spacing: "normal",
    margins: "spacious",
    showIcons: true,
  },
};

// ==========================================
// PRESET REGISTRY METADATA
// ==========================================
export interface PresetInfo {
  id: PresetId;
  name: string;
  role: string;
  track: "tech" | "non-tech" | "academic";
  trackLabel: string;
  level: "experienced" | "fresher" | "academic";
  levelLabel: string;
  badge: string;
  badgeColor: string;
  description: string;
  recommendedTemplate: TemplateMetadata["id"];
  data: Resume;
}

export const RESUME_PRESETS: PresetInfo[] = [
  {
    id: "tech-experienced",
    name: "Tech — Senior / Experienced",
    role: "Senior Full Stack & Cloud Architect",
    track: "tech",
    trackLabel: "Tech & Software",
    level: "experienced",
    levelLabel: "Experienced (6+ Yrs)",
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Tailored for senior developers, engineers, and tech leads. Highlights distributed systems, architecture impact, GitHub, and cloud tech stack.",
    recommendedTemplate: "tech",
    data: techExperiencedResume,
  },
  {
    id: "tech-fresher",
    name: "Tech — Fresher / Junior / Student",
    role: "CS Graduate & Junior Software Engineer",
    track: "tech",
    trackLabel: "Tech & Software",
    level: "fresher",
    levelLabel: "Fresher / Entry Level",
    badge: "Student & Grad",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
    description: "Designed for CS grads & junior devs. Prioritizes education, academic GPA, capstone projects with GitHub links, hackathons, and technical skills.",
    recommendedTemplate: "modern",
    data: techFresherResume,
  },
  {
    id: "nontech-experienced",
    name: "Non-Tech — Senior / Corporate",
    role: "Director of Marketing & Growth Strategy",
    track: "non-tech",
    trackLabel: "Business & Non-Tech",
    level: "experienced",
    levelLabel: "Experienced (7+ Yrs)",
    badge: "Executive",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Engineered for Marketing, Finance, Sales, Operations, and HR managers. Highlights revenue growth, budget P&L, KPI metrics, and team leadership.",
    recommendedTemplate: "corporate",
    data: nonTechExperiencedResume,
  },
  {
    id: "nontech-fresher",
    name: "Non-Tech — Fresher / Graduate",
    role: "Business Administration & Marketing Graduate",
    track: "non-tech",
    trackLabel: "Business & Non-Tech",
    level: "fresher",
    levelLabel: "Fresher / Entry Level",
    badge: "Entry Level",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    description: "Perfect for Business, Marketing, Finance, and Humanities grads. Highlights coursework, case study competitions, internships, and university leadership.",
    recommendedTemplate: "creative",
    data: nonTechFresherResume,
  },
  {
    id: "academic-cv",
    name: "Academic & Research CV (Curriculum Vitae)",
    role: "Doctoral Fellow & Postdoc Researcher",
    track: "academic",
    trackLabel: "Academic & Research",
    level: "academic",
    levelLabel: "Multi-Page CV",
    badge: "Comprehensive CV",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    description: "Standardized Academic CV format designed for Researchers, PhDs, Professors, and Fellows. Dedicated sections for Peer-Reviewed Publications and Grants.",
    recommendedTemplate: "academic",
    data: academicCVData,
  },
];

export const ALL_TEMPLATES: TemplateMetadata[] = [
  {
    id: "tech",
    name: "Tech & Engineering",
    desc: "Code-inspired layout with technical stack badges, GitHub spotlight, and systems architecture metrics.",
    category: "tech",
    categoryLabel: "Tech & Software",
    level: "all",
    tag: "Developer Focused",
    tagColor: "bg-blue-100 text-blue-800 border-blue-300",
    primaryColor: "#2563eb",
    features: ["Tech Stack Badges", "GitHub & Project Highlights", "System Metrics Accent", "Recruiter Tested"],
  },
  {
    id: "corporate",
    name: "Corporate & Business",
    desc: "Refined business header with KPI metric highlights, leadership competencies, and executive styling for non-tech roles.",
    category: "non-tech",
    categoryLabel: "Business & Non-Tech",
    level: "all",
    tag: "Business & Exec",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    primaryColor: "#0f766e",
    features: ["Core Competencies Grid", "Revenue & KPI Metrics", "Executive Header", "P&L / Strategy Focus"],
  },
  {
    id: "creative",
    name: "Creative & Portfolio",
    desc: "Dynamic layout with modern typography, portfolio showcases, and storytelling summary for design & marketing.",
    category: "creative",
    categoryLabel: "Creative & Design",
    level: "all",
    tag: "Design & Marketing",
    tagColor: "bg-purple-100 text-purple-800 border-purple-300",
    primaryColor: "#7c3aed",
    features: ["Storytelling Narrative", "Portfolio Links Accent", "Editorial Typography", "Modern Aesthetics"],
  },
  {
    id: "academic",
    name: "Academic & Research CV",
    desc: "Comprehensive multi-page format featuring Publications, Grants, Conferences, and Formal Academic styling.",
    category: "academic",
    categoryLabel: "Academic & CV",
    level: "all",
    tag: "Full CV Format",
    tagColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    primaryColor: "#1e3a8a",
    features: ["Peer-Reviewed Publications", "Research Grants & Funding", "Multi-Page Ready", "Formal Academic Serif"],
  },
  {
    id: "modern",
    name: "Modern Sidebar",
    desc: "Two-column design with colorful sidebar accents, structured timeline, and skill badges.",
    category: "universal",
    categoryLabel: "Universal / All Roles",
    level: "all",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-800 border-blue-300",
    primaryColor: "#2563eb",
    supportsPhoto: true,
    features: ["Two-Column Layout", "Profile Photo / Avatar", "Sidebar Skills & Contact", "Experience Timeline", "Universal Appeal"],
  },
  {
    id: "professional",
    name: "Professional ATS",
    desc: "Traditional single-column layout strictly formatted to achieve top scores in Applicant Tracking Systems.",
    category: "universal",
    categoryLabel: "Universal / ATS",
    level: "all",
    tag: "100% ATS Ready",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    primaryColor: "#0f766e",
    features: ["100% ATS-Compliant", "Single-Column Flow", "Clean Section Dividers", "Standard Font Hierarchy"],
  },
  {
    id: "minimal",
    name: "Minimalist Swiss",
    desc: "Refined Scandinavian typography with numbered sections, generous whitespace, and high readability.",
    category: "universal",
    categoryLabel: "Clean & Minimal",
    level: "all",
    tag: "Clean & Sleek",
    tagColor: "bg-slate-100 text-slate-800 border-slate-300",
    primaryColor: "#334155",
    features: ["Generous Whitespace", "Numbered Headers", "Editorial Typography", "Modern Aesthetic"],
  },
  {
    id: "executive",
    name: "Executive Leadership",
    desc: "High-contrast top banner header with metric grid containers engineered for directors and tech leads.",
    category: "non-tech",
    categoryLabel: "Leadership / Senior",
    level: "experienced",
    tag: "Senior Roles",
    tagColor: "bg-amber-100 text-amber-800 border-amber-300",
    primaryColor: "#b45309",
    features: ["Header Card Banner", "Core Competencies Grid", "Highlight Projects", "Leadership Ready"],
  },
];

/**
 * Returns whether a given template ID supports displaying a profile photo/avatar.
 */
export const templateSupportsPhoto = (templateId?: string): boolean => {
  return templateId === "modern";
};
