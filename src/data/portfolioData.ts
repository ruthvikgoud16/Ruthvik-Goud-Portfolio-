import { Project, Experience, SkillCategory, LabDevice, LeadershipRole } from '../types';

export const PERSONAL_DETAILS = {
  name: 'Ruthvik Goud',
  email: 'bathiniruthvik380@gmail.com',
  phone: '+91 9392796458',
  github: 'https://github.com/ruthvikgoud16',
  linkedin: 'https://linkedin.com/in/ruthvikgoud16',
  linkedinHandle: 'ruthvikgoud16',
  instagram: 'https://instagram.com/ruthviikk._',
  website: 'https://ruthvikgoud.vercel.app',
  resumeUrl: '/resume.pdf',
  roles: [
    'Incoming AI Engineer Intern @ Sydon AI',
    'AI Engineer | Agentic AI | Multi-Agent Systems | RAG',
    'ECE Student @ Anurag University',
    'OnePlus Student Ambassador'
  ],
  oneLiner:
    'AI engineer working on agentic systems, retrieval, and automation. Incoming AI Engineer Intern at Sydon AI. Previously an AI & Automation Intern at Nimblize and a Data Analyst Intern at Bluestock Fintech.',
  bio: 'I am a first-year Electronics and Communication Engineering student at Anurag University, Hyderabad. I build intelligent systems across retrieval, orchestration, and evaluation. I am starting as an AI Engineer Intern at Sydon AI. Before that I worked as an AI & Automation Intern at Nimblize and a Data Analyst Intern at Bluestock Fintech. I care about answers that stay tied to evidence.',
  education: {
    degree: 'Bachelor of Technology (B.Tech) — Electronics and Communication Engineering',
    institution: 'Anurag University, Hyderabad',
    graduation: 'Expected Graduation: 2030',
    status: 'Current Status: First Year (2026 – 2030)',
    studyAreas: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (C++)',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Engineering Mathematics',
      'Digital System Design'
    ]
  },
  languages: ['English', 'Telugu', 'Hindi'],
  interests: [
    'Multi-Agent AI Systems',
    'GraphRAG & Knowledge Graphs',
    'Embedded Systems & IoT',
    'Cloud & Automation',
    'Community Building',
    'Product Engineering'
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'pramana',
    title: 'Pramāṇa',
    subtitle: 'Evidence-Gated Enterprise Knowledge Multi-Agent System',
    description:
      'Authorization before retrieval. Privacy Gate → Authorization → Hybrid GraphRAG → Draft → Verification → FactCheck → Governance — the system refuses rather than hallucinates.',
    longDescription:
      'Pramāṇa inverts conventional Retrieve → Filter → Generate. Six specialized stages enforce RBAC/ABAC, prompt-injection resistance, Hybrid GraphRAG, evidence mapping, fact-checking, trust scoring, audit logs, provenance, and a compliance seal. If evidence is insufficient, it refuses.',
    category: 'ai',
    featured: true,
    tech: ['LangGraph', 'Hybrid GraphRAG', 'RBAC/ABAC', 'Vector Search', 'Knowledge Graph', 'Python', 'FastAPI'],
    github: 'https://github.com/ruthvikgoud16/pramana',
    impactMetrics: [
      'Six-agent pipeline: Privacy Gate, Retriever, Draft, Verify, FactCheck, Govern',
      'Authorization before retrieval — not post-filter RAG',
      'Refuses when evidence is insufficient'
    ]
  },
  {
    id: 'nimblize',
    title: 'Nimblize',
    subtitle: 'AI & Automation Internship — Competitor Intelligence',
    description:
      'Internship work on competitor-intelligence and recommendation workflows: multi-agent orchestration, retrieval, and evaluation.',
    longDescription:
      'Explored LangGraph agents with RAG, pgvector, RAGAS-style evaluation, FastAPI, Redis queues, and Presidio-based PII filtering. This is the public internship codebase — not a claim that every planned component shipped to production.',
    category: 'ai',
    featured: true,
    tech: ['LangGraph', 'RAG', 'pgvector', 'RAGAS', 'FastAPI', 'Redis', 'Presidio', 'Docker'],
    github: 'https://github.com/ruthvikgoud16/nimblize',
    impactMetrics: [
      'Internship codebase for competitor intelligence and recommendations',
      'Retrieval, orchestration, and evaluation explored in the same stack',
      'Public repo — no private customer data'
    ]
  },
  {
    id: 'resilience-graph',
    title: 'ResilienceGraph',
    subtitle: 'Ontology for Cascading Infrastructure Failures',
    description:
      'Relationship-aware infrastructure graph: power, telecom, water, hospitals, transport, weather, and emergency resources — predict cascade before it hits.',
    longDescription:
      'Demo chain: substation failure → telecom loses backup → hospital connectivity risk → emergency comms risk → affected facilities → backup resource → recommended intervention. Built for ontology / knowledge-graph reasoning, not a flat dashboard.',
    category: 'ai',
    tech: ['Microsoft Fabric', 'Knowledge Graph', 'Ontology', 'Python', 'Graph Reasoning'],
    github: 'https://github.com/ruthvikgoud16/resilience-graph',
    impactMetrics: [
      'Dependency reasoning across critical infrastructure',
      'Designed for Fabric Ontology / knowledge-graph tracks',
      'Intervention recommendations from graph state'
    ]
  },
  {
    id: 'autoops',
    title: 'AutoOps Enterprise Agent',
    subtitle: 'Multi-Agent Enterprise Automation Platform',
    description:
      'Planner, Retriever, Execution, Validation, and Supervisor agents coordinating document workflows with human-in-the-loop safety.',
    longDescription:
      'Enterprise automation across processing, retrieval, and reporting. LangGraph + Llama-class models with supervisor feedback loops and HITL hooks.',
    category: 'ai',
    tech: ['NVIDIA NIM', 'Llama Models', 'LangGraph', 'LangChain', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/ruthvikgoud16/autoops-agent',
    impactMetrics: [
      'Five specialized agent roles in one orchestration grid',
      'Human-in-the-loop validation gates',
      'RAG-backed execution with supervisor review'
    ]
  },
  {
    id: 'talentlens-x',
    title: 'TalentLens X',
    subtitle: 'AI Candidate Discovery & Weighted Ranking',
    description:
      'Semantic matching over a large candidate set with explicit ranking weights: Career 35%, Recruitability 25%, Skills 25%, Semantic Match 15%.',
    longDescription:
      'Vector search plus weighted scoring so rankings are explainable. Built for high-volume candidate discovery rather than keyword filters.',
    category: 'ai',
    tech: ['LangChain', 'Vector Search', 'Python', 'FastAPI', 'React', 'pgvector'],
    github: 'https://github.com/ruthvikgoud16/talent-lens',
    impactMetrics: [
      'Weighted ranking: 35 / 25 / 25 / 15',
      'Semantic match over dense embeddings',
      'Explainable score breakdown per candidate'
    ]
  },
  {
    id: 'redrob-truth-engine',
    title: 'Redrob Truth Engine',
    subtitle: 'AI Candidate Verification & Trust Layer',
    description:
      'Validates resume and bio claims, spots contradictions, and produces a unified trust score before interviews.',
    longDescription:
      'Built with team Future AI Builders. Semantic contradiction checks, reference-style reports, and a single trust rating for recruiting workflows.',
    category: 'ai',
    tech: ['Python', 'FastAPI', 'React', 'Semantic Scoring', 'Workflow Systems'],
    github: 'https://github.com/ruthvikgoud16/redrob-truth-engine',
    impactMetrics: [
      'Automated claim vs. evidence comparison',
      'Contradiction and conflict logs',
      'Recruitment pipeline acceleration'
    ]
  },
  {
    id: 'aero-dot',
    title: 'Aero Dot',
    subtitle: 'ESP32 Programmable Drone — ToF + PID',
    description:
      'Embedded flight controller firmware with time-of-flight sensing, gyro telemetry, and PID self-leveling on ESP32.',
    longDescription:
      'Microsecond ESC pulse loops, MPU-class gyro fusion, ToF ranging, and PID attitude hold. Hardware-software loop closed in C++.',
    category: 'hardware',
    tech: ['ESP32', 'C++', 'ToF Sensing', 'PID Control', 'MPU6050', 'ESC Signals'],
    github: 'https://github.com/ruthvikgoud16/aero-dot',
    impactMetrics: [
      'Closed-loop PID attitude hold',
      'ToF ranging for proximity awareness',
      'Real-time gyro interrupt routines'
    ]
  },
  {
    id: 'nafithah',
    title: 'Nafithah',
    subtitle: 'Tokenized Invoice Financing + On-Chain Credit',
    description:
      'Invoice financing flow with on-chain credit scoring so liquidity and trust sit on the same ledger path.',
    longDescription:
      'Maps invoices to tokenized instruments and a credit score derived on-chain — built as a product prototype for trade finance.',
    category: 'web',
    tech: ['Smart Contracts', 'Credit Scoring', 'Web3', 'React', 'TypeScript'],
    github: 'https://github.com/ruthvikgoud16/nafithah',
    impactMetrics: [
      'On-chain credit scoring model',
      'Tokenized invoice lifecycle',
      'End-to-end financing prototype'
    ]
  },
  {
    id: 'portpulse',
    title: 'PortPulse',
    subtitle: 'Supply-Chain Intelligence PWA',
    description:
      'Progressive web app for supply-chain signals — Firebase backend with Gemini-assisted intelligence overlays.',
    longDescription:
      'PWA for operators who need live logistics context. Firebase for state, Gemini for summarization and exception flags.',
    category: 'web',
    tech: ['PWA', 'Firebase', 'Gemini', 'React', 'TypeScript'],
    github: 'https://github.com/ruthvikgoud16/portpulse',
    impactMetrics: [
      'Offline-capable PWA shell',
      'Gemini exception summaries',
      'Firebase-backed live state'
    ]
  },
  {
    id: 'carbon-intelligence',
    title: 'Carbon Intelligence Suite',
    subtitle: 'CarbonMind · CarbonFlow · CarbonLens · CarbonMirror',
    description:
      'Family of carbon accounting and insight tools spanning measurement, flow, visualization, and mirror-back reporting.',
    longDescription:
      'Unified carbon workstream: ingest, flow modeling, lens views for operators, and mirror reports for stakeholders.',
    category: 'ai',
    tech: ['Python', 'Data Pipelines', 'React', 'Analytics'],
    github: 'https://github.com/ruthvikgoud16/carbon-intelligence',
    impactMetrics: [
      'Four coordinated product surfaces',
      'Measurement through reporting in one suite',
      'Operator + stakeholder views'
    ]
  },
  {
    id: 'career-chatbot',
    title: 'AI Career Guidance Chatbot',
    subtitle: 'Python NLP Career Advisory',
    description:
      'Desktop NLP advisor matching student interests and skills to modern tech career paths.',
    category: 'ai',
    tech: ['Python', 'NLP', 'Tkinter'],
    github: 'https://github.com/ruthvikgoud16/ai-career-chatbot',
    impactMetrics: ['Interactive guidance flows', 'NLP matching scores', 'Instant path suggestions']
  },
  {
    id: 'distance-sensor',
    title: 'Arduino Smart Distance Sensor',
    subtitle: 'Ultrasonic Proximity Detector',
    description:
      'HC-SR04 + Arduino distance tracking with buzzer and LED alert configurations.',
    category: 'hardware',
    tech: ['Arduino Uno', 'C++', 'HC-SR04', 'Analog Circuits'],
    github: 'https://github.com/ruthvikgoud16/arduino-distance-sensor',
    impactMetrics: ['2cm–400cm ranging', 'Immediate physical alerts', 'Modular hardware build']
  },
  {
    id: 'safety-wristband',
    title: 'Personal Safety Bracelet Concept',
    subtitle: 'GPS + Panic Alert Wearable',
    description:
      'Conceptual ECE wearable: MCU, GPS, and cellular path that broadcasts a help signal on trigger.',
    category: 'concept',
    tech: ['GPS Tracking', 'Panic Alert Logic', 'Embedded Circuitry'],
    github: 'https://github.com/ruthvikgoud16/safety-wristband',
    impactMetrics: ['Physical SOS trigger', 'Low-power circuit intent', 'Coordinate-linked alerts']
  }
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: 'exp-sydon',
    title: 'Incoming AI Engineer Intern',
    organization: 'Sydon AI',
    period: 'Starts 28 Oct 2026 · 6 months',
    role: 'Incoming',
    status: 'incoming',
    featured: true,
    logo: '/media/logos/sydon.svg',
    image: '/media/sydon/og.png',
    description:
      'Working on AI systems that connect retrieval with business data to generate grounded, evidence-backed answers. Focus areas include retrieval pipelines, document processing, source attribution, and evaluating answer reliability.',
    achievement:
      'Offer accepted. This describes the work ahead — not completed deliverables. Onboarding is not marked complete.',
    iconType: 'work',
    tags: ['Retrieval', 'Document processing', 'Source attribution', 'Evaluation']
  },
  {
    id: 'exp-bluestock',
    title: 'Data Analyst Intern',
    organization: 'Bluestock Fintech',
    period: '2026 · Completed',
    role: 'Completed',
    status: 'completed',
    logo: '/media/logos/bluestock.png',
    description:
      'Worked on a Mutual Fund Analytics Platform focused on data processing, financial analytics, and business intelligence — SQL, data cleaning, and dashboards.',
    achievement:
      'Completed internship. Exact start and end months are not in the résumé, so they are not shown.',
    iconType: 'work',
    tags: ['SQL', 'Data cleaning', 'Dashboards', 'Analytics'],
    projectUrl: 'https://financial-intelligence.streamlit.app/'
  },
  {
    id: 'exp-nimblize',
    title: 'AI & Automation Intern',
    organization: 'Nimblize',
    period: 'May 2026 · Completed',
    role: 'Completed',
    status: 'completed',
    logo: '/media/logos/nimblize.svg',
    description:
      'Worked on AI-powered competitor intelligence and recommendation workflows, exploring multi-agent orchestration, retrieval-augmented generation, structured data validation, evaluation, and automation.',
    achievement:
      'Completed internship. End month is not on the résumé, so only the known start is shown.',
    iconType: 'work',
    tags: ['Python', 'FastAPI', 'LangGraph', 'RAG', 'PostgreSQL', 'Redis'],
    projectUrl: 'https://github.com/ruthvikgoud16/nimblize'
  },
  {
    id: 'exp-oneplus',
    title: 'Student Ambassador',
    organization: 'OnePlus',
    period: 'Present',
    role: 'Community & Campus Presence',
    logo: '/media/logos/oneplus.svg',
    description:
      'Representing OnePlus on campus and in community forums — campaigns, creator work (including AI-generated gaming avatars), and conversations that connect students to the brand.',
    achievement: 'Selected among ~100 OnePlus Student Ambassadors nationwide.',
    iconType: 'event',
    tags: ['OnePlus', 'Campus Community', 'Brand Campaigns']
  },
  {
    id: 'exp-unstop',
    title: 'Campus Champion',
    organization: 'Unstop',
    period: 'Present',
    role: 'Campus Outreach',
    logo: '/media/logos/unstop.png',
    description:
      'Handling Unstop Campus Champion responsibilities — connecting students to competitions, opportunities, and campus tech activity.',
    achievement: 'Selected Campus Champion; owning campus-facing outreach.',
    iconType: 'event',
    tags: ['Unstop', 'Campus Champion', 'Student Outreach']
  },
  {
    id: 'exp-education',
    title: 'B.Tech — Electronics & Communication Engineering',
    organization: 'Anurag University, Hyderabad',
    period: '2026 – 2030 (Expected)',
    role: 'Undergraduate ECE Student',
    logo: '/media/logos/anurag.svg',
    description:
      'First-year ECE: electronics fundamentals, problem solving, engineering mathematics, programming, and digital basics, alongside internship work.',
    achievement: 'First-year ECE, alongside internship work in AI systems and analytics.',
    iconType: 'education',
    tags: ['ECE', 'Anurag University', 'Embedded', 'Programming']
  }
];

export const LEADERSHIP_DATA: LeadershipRole[] = [
  {
    id: 'lead-oneplus',
    title: 'OnePlus Student Ambassador',
    organization: 'OnePlus',
    period: 'Present',
    description:
      'Campus and community representation — forum intros, campaign content, and student-facing brand work. Goal: speak clearly, organize people, and build a community around technology.',
    tags: ['Ambassador', 'Community', 'Public Presence'],
    logo: '/media/logos/oneplus.svg'
  },
  {
    id: 'lead-unstop',
    title: 'Unstop Campus Champion',
    organization: 'Unstop',
    period: 'Present',
    description:
      'Campus champion for competitions and opportunity discovery. Connecting classmates to platforms where they can ship and compete.',
    tags: ['Campus Champion', 'Outreach'],
    logo: '/media/logos/unstop.png'
  },
  {
    id: 'lead-react-hyd',
    title: 'Assistant Coordinator',
    organization: 'React Hyderabad',
    period: 'Present',
    description:
      'Helping run React Hyderabad as Assistant Coordinator — meetups, community ops, and keeping the city’s React builders connected.',
    tags: ['Community', 'React', 'Hyderabad'],
    logo: '/media/logos/react-hyderabad.svg'
  },
  {
    id: 'lead-startup-smash',
    title: 'Hyderabad builder rooms',
    organization: 'Startup Smash · StartupParty',
    period: '2026',
    description:
      'In the room at Startup Smash Hyderabad — invite-only founder energy, not a spectator seat. This is how I learn the product side of engineering: sit with people who ship.',
    tags: ['Community', 'Startups', 'Hyderabad'],
    image: '/media/life/startup-smash.jpg'
  }
];

export const LIFE_FRAMES = [
  {
    id: 'portrait',
    src: '/media/portrait/ruthvik.jpg',
    alt: 'Ruthvik Goud, Hyderabad',
    title: 'This is Ruthvik',
    note: 'Hyderabad. Off-campus, still on the same loop — build, ride, reset.',
  },
  {
    id: 'gym',
    src: '/media/life/gym.jpg',
    alt: 'Ruthvik at the gym',
    title: 'Discipline off the keyboard',
    note: 'Same rule as the agents: if the loop is weak, you do not ship. Gym is the analog version.',
  },
  {
    id: 'builder',
    src: '/media/life/builder-floor.jpg',
    alt: 'Building on the floor with a hiring-intelligence prototype on screen',
    title: 'Human potential on the laptop',
    note: 'Live floor energy — “The Future of Hiring is Human Potential Intelligence” on screen. TalentLens / verification work belongs in rooms like this, not only in GitHub READMEs.',
  },
  {
    id: 'campus',
    src: '/media/campus/anurag-aerial.jpg',
    alt: 'Anurag University campus aerial',
    title: 'Anurag University',
    note: 'B.Tech ECE, 2026–2030. First year. Hardware in class, agents after class.',
  },
  {
    id: 'blocks',
    src: '/media/campus/anurag-blocks.jpg',
    alt: 'E and F blocks at Anurag University',
    title: 'E & F Block',
    note: 'The physical campus — not a stock skyline.',
  },
];

export const COMMUNITIES_DATA = [
  { id: 'react-hyd', name: 'React Hyderabad', role: 'Assistant Coordinator', logo: '/media/logos/react-hyderabad.svg' },
  { id: 'aic-raise', name: 'AIC RAISE', role: 'Member', logo: '/media/logos/aic-raise.png' },
  { id: 'stackflow', name: 'StackFlow', role: 'Member', logo: '/media/logos/stackflow.png' },
  { id: 'gdg-south', name: 'Google Developers South India', role: 'Member', logo: '/media/logos/gdg-dots.svg' },
  { id: 'oneplus', name: 'OnePlus', role: 'Student Ambassador', logo: '/media/logos/oneplus.svg' },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'ai-systems',
    title: 'AI & AUTOMATION',
    skills: [
      { name: 'LangGraph', level: 88, category: 'ai' },
      { name: 'GraphRAG', level: 86, category: 'ai' },
      { name: 'RAGAS', level: 78, category: 'ai' },
      { name: 'Presidio', level: 80, category: 'ai' },
      { name: 'Python', level: 85, category: 'ai' }
    ]
  },
  {
    id: 'programming-dev',
    title: 'PROGRAMMING & PLATFORMS',
    skills: [
      { name: 'TypeScript', level: 82, category: 'frontend' },
      { name: 'React', level: 88, category: 'frontend' },
      { name: 'FastAPI', level: 80, category: 'backend' },
      { name: 'Redis · Docker', level: 78, category: 'backend' },
      { name: 'C / Embedded', level: 75, category: 'hardware' }
    ]
  },
  {
    id: 'tools-cloud',
    title: 'TOOLS, DATA & CLOUD',
    skills: [
      { name: 'Git', level: 92, category: 'frontend' },
      { name: 'Power BI', level: 84, category: 'backend' },
      { name: 'Fabric', level: 72, category: 'ai' },
      { name: 'AWS', level: 70, category: 'backend' },
      { name: 'Sensors', level: 82, category: 'hardware' }
    ]
  }
];

export const CORE_STRENGTHS_DATA = [
  'Multi-Agent System Design',
  'Evidence-Gated Retrieval',
  'Embedded / IoT Prototyping',
  'Community Leadership',
  'Clear Technical Communication',
  'Shipping Under Constraints',
  'Analytical Problem Solving',
  'Ownership Mindset'
];

export interface FutureIdea {
  id: string;
  title: string;
  category: 'mem' | 'self' | 'adapt' | 'market' | 'sec' | 'ece';
  titleLabel: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  expectedLaunch: string;
  stack: string;
}

export const FUTURE_INSIGHTS_DATA: FutureIdea[] = [
  {
    id: 'adv-memory',
    title: 'Advanced Agent Memory',
    category: 'mem',
    titleLabel: 'RAG Context Retention',
    shortDesc: 'Long-term recall across Pramāṇa and Nimblize sessions — chronological graphs, not lost chat.',
    longDesc:
      'Recursive graph indexes mapping feedback, timelines, and project nuance so enterprise agents never drop provenance or conversation state.',
    iconName: 'Brain',
    expectedLaunch: 'Q4 2026',
    stack: 'Mem0, LangGraph, Knowledge Graph'
  },
  {
    id: 'self-healing',
    title: 'Self-Healing Workflows',
    category: 'self',
    titleLabel: 'Adaptive Fault Fixes',
    shortDesc: 'Watchdog agents that read traceback, re-prompt builders, and hot-fix pipeline faults.',
    longDesc:
      'A micro-agent on compile and queue steps. On crash or drift, it binds the log, re-prompts with boundaries, and patches runtime — the AutoOps / Nimblize ops layer.',
    iconName: 'ShieldAlert',
    expectedLaunch: 'Q1 2027',
    stack: 'LangChain, Cron, Docker Health'
  },
  {
    id: 'adaptive-agents',
    title: 'Adaptive Learning Agents',
    category: 'adapt',
    titleLabel: 'Preference Tuning',
    shortDesc: 'Local policy alignment from operator decisions inside visual workflows.',
    longDesc:
      'Lightweight DPO/PPO-style loops on edge pipelines so Nimblize-class agents improve from real user choices, not static prompts.',
    iconName: 'Sparkles',
    expectedLaunch: 'Q2 2027',
    stack: 'PyTorch, RLHF, HuggingFace'
  },
  {
    id: 'ent-marketplace',
    title: 'Enterprise Marketplace Integrations',
    category: 'market',
    titleLabel: 'Universal API Layer',
    shortDesc: 'Plugin gates into CRM, ITSM, and ERP without rewriting the agent core.',
    longDesc:
      'Gateway abstraction so AutoOps and Nimblize plug into Salesforce, Jira, HubSpot, and ServiceNow with sandboxed credentials.',
    iconName: 'Zap',
    expectedLaunch: 'Q3 2027',
    stack: 'Node Gateway, OpenTelemetry'
  },
  {
    id: 'sec-compliance',
    title: 'Evidence & Compliance Guardrails',
    category: 'sec',
    titleLabel: 'Pramāṇa Governance Path',
    shortDesc: 'Semantic PII interceptors and refusal when the evidence graph is thin.',
    longDesc:
      'Localized interceptors on token egress — resumes, account numbers, internal schemas — plus Pramāṇa-style refuse-over-hallucinate.',
    iconName: 'Lock',
    expectedLaunch: 'Q4 2026',
    stack: 'Llama Guard, NeMo Guardrails, GraphRAG'
  }
];

export const LAB_DEVICES_DATA: LabDevice[] = [
  {
    id: 'pramana-core',
    name: 'Pramāṇa Governance Core',
    type: 'processor',
    label: 'Evidence Gate (Pramāṇa)',
    shortDesc: 'Authorization-before-retrieval silicon for enterprise GraphRAG.',
    longDesc:
      'Privacy Gate, authorization, Hybrid GraphRAG, draft, verify, fact-check, govern. Refuses when evidence is insufficient. Trust scores, audit logs, provenance.',
    color: 'emerald',
    glowColor: '#10b981',
    iconName: 'Cpu',
    stats: {
      achievement: 'Flagship multi-agent system',
      impact: 'Refuse > hallucinate',
      stack: 'LangGraph, GraphRAG, RBAC'
    },
    technologies: ['LangGraph', 'Hybrid GraphRAG', 'RBAC/ABAC', 'FactCheck', 'Governance'],
    coordinates: { x: 50, y: 50 }
  },
  {
    id: 'nimblize-terminal',
    name: 'Nimblize Intelligence Terminal',
    type: 'terminal',
    label: 'Nimblize AI Intern Stack',
    shortDesc: 'Internship command surface — competitor intel agents in production path.',
    longDesc:
      'LangGraph + RAG + pgvector + RAGAS + Redis queues + Presidio. This node is the professional internship, not a lab toy.',
    color: 'cyan',
    glowColor: '#06b6d4',
    iconName: 'Terminal',
    stats: {
      achievement: 'AI & Automation Intern',
      impact: 'Eval + PII + queues in-path',
      stack: 'LangGraph, FastAPI, Redis'
    },
    technologies: ['LangGraph', 'RAGAS', 'Presidio', 'Redis', 'Docker'],
    coordinates: { x: 18, y: 25 }
  },
  {
    id: 'arduino-workbench',
    name: 'Arduino Embedded Controller',
    type: 'arduino',
    label: 'Smart Sensor Node',
    shortDesc: 'MCU workbench for ranging, alerts, and wearable concepts.',
    longDesc:
      'Analogue sensors to firmware endpoints — HC-SR04 ranging, buzzer/LED alerts, GPS panic-band architecture studies.',
    color: 'blue',
    glowColor: '#3b82f6',
    iconName: 'Cpu',
    stats: {
      achievement: 'Hardware prototype node',
      impact: 'Ranging + alert loops',
      stack: 'C++, Arduino, HC-SR04'
    },
    technologies: ['Arduino', 'C++', 'HC-SR04', 'I2C / SPI'],
    coordinates: { x: 82, y: 25 }
  },
  {
    id: 'aero-dot',
    name: 'Aero Dot Flight Controller',
    type: 'satellite',
    label: 'ESP32 Avionics',
    shortDesc: 'ToF + PID self-leveling drone firmware on ESP32.',
    longDesc:
      'Attitude telemetry, gyro fusion, ToF proximity, microsecond ESC pulses, PID hold. Embedded ECE in the loop.',
    color: 'purple',
    glowColor: '#a855f7',
    iconName: 'Radio',
    stats: {
      achievement: 'Aero Dot avionics',
      impact: 'Closed-loop PID + ToF',
      stack: 'ESP32, C++, PID'
    },
    technologies: ['ESP32', 'PID', 'ToF', 'Gyro Interrupts'],
    coordinates: { x: 18, y: 75 }
  },
  {
    id: 'server-rack',
    name: 'Cloud & Queue Rack',
    type: 'server',
    label: 'API + Vector Store',
    shortDesc: 'FastAPI, Postgres/pgvector, Redis, Docker — the intern runtime.',
    longDesc:
      'Persistent state and job queues for Nimblize and related agents. Service checks, logs, containerized deploys.',
    color: 'indigo',
    glowColor: '#6366f1',
    iconName: 'Database',
    stats: {
      achievement: 'Production-shaped backend',
      impact: 'Queues + vectors online',
      stack: 'PostgreSQL, Redis, FastAPI'
    },
    technologies: ['FastAPI', 'pgvector', 'Redis', 'Docker'],
    coordinates: { x: 82, y: 75 }
  }
];

export const MISSION_STATS = {
  currentMission: 'AI & Automation at Nimblize · ECE at Anurag',
  status: 'ACTIVE',
  projectsCount: '12+',
  internshipsCount: '02',
  techCount: '20+',
  uptime: '99.98%'
};
