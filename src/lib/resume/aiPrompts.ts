export interface AISuggestion {
  category: string;
  role: string;
  summary: string;
  bulletPoints: string[];
}

export const AI_ROLE_PRESETS: AISuggestion[] = [
  {
    category: "Engineering",
    role: "Senior Full Stack Software Engineer",
    summary:
      "Results-oriented Senior Full Stack Engineer with 6+ years of specialized experience in cloud-native microservices, Next.js web applications, and distributed databases. Proven leader in boosting engineering velocity, optimizing query throughput by 40%, and delivering high-availability customer-facing products.",
    bulletPoints: [
      "Architected and deployed enterprise Next.js micro-frontends serving 2M+ active monthly users with 99.99% uptime.",
      "Spearheaded database schema optimization and query caching with Redis, reducing p95 query latency by 45%.",
      "Mentored junior and mid-level developers through rigorous code reviews, automated unit tests, and CI/CD best practices.",
    ],
  },
  {
    category: "Engineering",
    role: "Frontend Engineer / React Specialist",
    summary:
      "Creative and detail-oriented Frontend Engineer with deep expertise in React, Next.js, TypeScript, and modern CSS architecture. Passionate about building fluid 60fps micro-animations, accessible design systems, and lightning-fast Core Web Vitals performance.",
    bulletPoints: [
      "Engineered an enterprise design system in React/Tailwind used across 5 core company applications, improving UI consistency by 100%.",
      "Optimized bundle size and Largest Contentful Paint (LCP) from 3.8s down to 0.9s, elevating Lighthouse score to 98.",
      "Integrated responsive state management with Zustand and TanStack Query to achieve seamless offline-first experience.",
    ],
  },
  {
    category: "Data & AI",
    role: "Data Scientist / Machine Learning Engineer",
    summary:
      "Innovative Data Scientist and ML Engineer with background in Python, PyTorch, SQL, and LLM fine-tuning. Experienced in productionizing end-to-end predictive modeling pipelines and transforming messy unstructured data into actionable business intelligence.",
    bulletPoints: [
      "Developed and operationalized predictive churn models in Python/Scikit-Learn, generating $1.2M in retained annual recurring revenue.",
      "Built an automated NLP classification pipeline using HuggingFace Transformers, cutting manual ticket triage time by 70%.",
      "Collaborated with data engineers to construct clean BigQuery data pipelines handling 50M+ daily records.",
    ],
  },
  {
    category: "Product & Design",
    role: "Product Manager",
    summary:
      "Strategic, customer-obsessed Product Manager with extensive experience steering B2B SaaS products from 0 to 1 and scaling to $10M+ ARR. Adept at cross-functional leadership, agile roadmapping, data-driven prioritization, and user research.",
    bulletPoints: [
      "Led end-to-end launch of flagship self-serve analytics tier, driving a 32% increase in free-to-paid conversion rate within 90 days.",
      "Defined OKRs and prioritized feature backlogs in close alignment with C-suite stakeholders, UX designers, and lead architects.",
      "Conducted 50+ qualitative customer interviews to uncover key friction points, directly boosting NPS by 18 points.",
    ],
  },
  {
    category: "Marketing & Growth",
    role: "Digital Marketing & Growth Lead",
    summary:
      "Data-driven Growth Marketer with track record of scaling organic traffic and paid acquisition channels. Specialized in SEO strategy, performance marketing, content engines, and lifecycle email automation.",
    bulletPoints: [
      "Scaled organic search traffic from 50k to 600k monthly unique visitors in 12 months through technical SEO and high-intent content.",
      "Managed $500k quarterly Google Ads & Meta advertising budget, maintaining a 3.4x ROAS across multi-channel funnels.",
      "Implemented automated onboarding nurture sequence increasing 30-day user activation rate by 28%.",
    ],
  },
];

export function generateBulletImprovements(text: string): string[] {
  if (!text.trim()) {
    return [
      "Led key initiatives resulting in measurable improvements across system reliability and user engagement.",
      "Collaborated cross-functionally with team members to deliver core features on time and under budget.",
      "Designed and implemented scalable solutions adhering to modern industry best practices.",
    ];
  }

  // Generate dynamic actionable polish suggestions based on keywords
  const base = text.trim().replace(/^[-•*]\s*/, "");
  return [
    `Spearheaded ${base.toLowerCase()}, improving operational efficiency and reducing system bottlenecks.`,
    `Successfully delivered ${base.toLowerCase()}, driving measurable team productivity and enhanced user satisfaction.`,
    `Architected and optimized ${base.toLowerCase()}, achieving high reliability and seamless cross-team integration.`,
  ];
}
