import { Project, Experience, SkillCategory, LabDevice } from '../types';

export const PERSONAL_DETAILS = {
  name: 'Ruthvik Goud',
  email: 'bathiniruthvik380@gmail.com',
  github: 'https://github.com/ruthvikgoud16',
  linkedin: 'https://linkedin.com/in/ruthvikgoud16',
  instagram: 'https://instagram.com/ruthviikk._',
  roles: ['ECE Student', 'Google Process Associate', 'AI & Technology Enthusiast', 'Hackathon Builder'],
  oneLiner: 'Electronics and Communication Engineering (ECE) student building autonomous AI agents, exploring IoT embedded systems, and driving Google Process support.',
  bio: 'I am a motivated first-year Electronics and Communication Engineering (ECE) student at Sreenidhi Institute of Science and Technology (SNIST), Hyderabad, combined with professional experience in the Google Process at Concentrix. Deeply passionate about Artificial Intelligence, Data Analytics, and Embedded Systems, I excel in bridging hardware-software interfaces. From winning HackPrix Season 2 (CrisisOS) and building auto-dispatch pipelines to creating collaborative drones (ESP32) and AI agent systems (AutoOps), I love continuous learning and building high-impact tech.',
  education: {
    degree: 'Bachelor of Technology (B.Tech) - Electronics and Communication Engineering (ECE)',
    institution: 'Sreenidhi Institute of Science and Technology (SNIST), Hyderabad',
    graduation: 'Expected Graduation: 2029',
    status: 'Current Status: First Year – First Semester',
    studyAreas: [
      'Basic Electronics',
      'Problem Solving Techniques',
      'Engineering Mathematics',
      'Communication Skills',
      'Programming Fundamentals',
      'Digital Fundamentals (Basics)'
    ]
  },
  languages: ['English', 'Telugu', 'Hindi'],
  interests: [
    'Artificial Intelligence',
    'Data Analytics',
    'Embedded Systems',
    'Electronics & Communication',
    'Front-End Development',
    'Semiconductor Technologies',
    'Innovation & Product Development',
    'Emerging Technologies',
    'IoT & Robotics',
    'Technical Content & Digital Marketing'
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'crisisos',
    title: 'CrisisOS Command',
    subtitle: 'HackPrix S2 Winner - Real-time Disaster Response Command Center',
    description: 'A multi-agent operating system simulator with integrated real-time WebSockets, automated GPT-4 hazard dispatch routing, and emergency fallback networks.',
    longDescription: 'Developed within 36 hours for HackPrix Season 2, winning 1st place overall. CrisisOS serves as a high-fidelity disaster management command system combining live sensor feeds, dynamic multi-agent assignment rosters, and localized LLM-driven crisis routing grids to direct rescue teams in real-time during extreme emergencies.',
    category: 'web',
    tech: ['React', 'FastAPI', 'WebSockets', 'GPT-4', 'Tailwind', 'Vector DB'],
    github: 'https://github.com/ruthvikgoud16/crisis-os',
    live: 'https://crisisos.vercel.app',
    impactMetrics: [
      '1st Place HackPrix Season 2 Winner',
      'Sub-50ms live socket broadcast latency',
      'Autonomous orchestration of 5 rescue agents'
    ]
  },
  {
    id: 'autoops',
    title: 'AutoOps Enterprise Agent',
    subtitle: 'NVIDIA Open Hackathons (Ongoing) - Multi-Agent Enterprise Automation Platform',
    description: 'A sophisticated multi-agent system coordinating Planner, Retriever, Execution, Validation, and Supervisor specialists using NVIDIA NIM.',
    longDescription: 'Created for the NVIDIA Open Hackathons. AutoOps automates complex enterprise workflows like document processing, data entry, search retrieval, and reporting. Leveraging Llama models, LangGraph, and high-performance inference through NVIDIA NIM, it runs a feedback loops ecosystem with complete human-in-the-loop safety hooks.',
    category: 'ai',
    tech: ['NVIDIA NIM', 'Llama Models', 'LangGraph', 'LangChain', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/ruthvikgoud16/autoops-agent',
    live: '#',
    impactMetrics: [
      'Active development for NVIDIA Open Hackathons by Team AgentForge',
      'Dynamic multi-agent orchestration grid',
      'Context-aware reasoning and RAG vector searches'
    ]
  },
  {
    id: 'redrob-truth-engine',
    title: 'Redrob Truth Engine',
    subtitle: 'India.Runs Hackathon (Ongoing) - AI Candidate Verification & Trust Layer',
    description: 'An AI-native candidate validation platform that analyzes claims, spots contradictions, and calculates trust ratings automatically.',
    longDescription: 'Created alongside my team "Future AI Builders" for India.Runs Track 1. The Redrob Truth Engine validates resume and bio statements prior to interviews, checking for underlying conflicts, generating deep reference reports, and creating unified secure scores.',
    category: 'ai',
    tech: ['Python', 'AI Systems', 'Workflow Innovation', 'React', 'FastAPI', 'Semantic Scoring'],
    github: 'https://github.com/ruthvikgoud16/redrob-truth-engine',
    live: '#',
    impactMetrics: [
      'Participating in Track 1 for AI Systems & Workflow Innovation',
      'Automated semantic truth validation logs',
      'Real-time recruitment workflow pipeline acceleration'
    ]
  },
  {
    id: 'talentlens',
    title: 'TalentLens AI',
    subtitle: 'Enterprise Candidate Screening & Semantic Skill Map',
    description: 'Autonomous CV screening pipeline harnessing semantic analysis, dense vector embeddings, custom query expansion, and LangChain agents.',
    longDescription: 'TalentLens leverages Retrieval-Augmented Generation (RAG) coupled with PostgreSQL + pgvector to automatically categorize thousands of candidate submissions. It detects underlying skill competencies, ranks matching alignment scores, and provides structured explanatory feedback.',
    category: 'ai',
    tech: ['LangChain', 'Llama 3', 'FastAPI', 'Supabase', 'pgvector', 'React'],
    github: 'https://github.com/ruthvikgoud16/talent-lens',
    live: '#',
    impactMetrics: [
      'Auto-evaluated 500+ resumes in trials',
      '94% skill alignment matching score accuracy',
      'Reduced parsing time by 12x vs manual screeners'
    ]
  },
  {
    id: 'career-chatbot',
    title: 'AI Career Guidance Chatbot',
    subtitle: 'Python NLP Career Advisory System',
    description: 'Intelligent desktop chatbot helping students find appropriate profession directions based on interests and basic NLP calculations.',
    longDescription: 'Developed a python-based interface executing natural language parsing to match student qualifications and soft skill inputs with diverse modern tech career opportunities.',
    category: 'ai',
    tech: ['Python', 'NLP library', 'Tkinter UI', 'Data Models'],
    github: 'https://github.com/ruthvikgoud16/ai-career-chatbot',
    live: '#',
    impactMetrics: [
      'Interactive guidance workflows',
      'NLP matching scoring system',
      'Instant custom suggestions generation'
    ]
  },
  {
    id: 'mental-health-app',
    title: 'Mental Health Support App',
    subtitle: 'Responsive Wellness Resource Hub',
    description: 'A dedicated web helper delivering support modules, mindful resources, and contact routes for emotional assistance.',
    longDescription: 'A fully responsive client-side interface built with native HTML, CSS, and interactive JavaScript to present accessible self-care activities, tracking, and quick help links.',
    category: 'web',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive UI', 'State Storage'],
    github: 'https://github.com/ruthvikgoud16/mental-health-app',
    live: '#',
    impactMetrics: [
      '100% accessible mobile layout',
      'Interactive mood self-appraisals',
      'Resource directory mapping'
    ]
  },
  {
    id: 'distance-sensor',
    title: 'Arduino Smart Distance Sensor',
    subtitle: 'Ultrasonic Proximity Detector & Alert System',
    description: 'Arduino board project tracking objects, computing obstacle distances, and signaling alerts via buzzer and flash configurations.',
    longDescription: 'Designed and engineered using HC-SR04 ultrasonic sensor, Arduino MCU, and custom alerts code to enable obstacle prevention with instant microsecond-scale warning triggers.',
    category: 'hardware',
    tech: ['Arduino Uno', 'C++', 'HC-SR04 Ultrasonic Sensor', 'Buzzers & LEDs', 'Analog Circuits'],
    github: 'https://github.com/ruthvikgoud16/arduino-distance-sensor',
    live: '#',
    impactMetrics: [
      'Precise distance measurement within 2cm - 400cm',
      'Immediate physical warning triggers',
      'Simple modular hardware build pattern'
    ]
  },
  {
    id: 'safety-wristband',
    title: 'Personal Safety Bracelet Concept',
    subtitle: 'GPS + Panic Alert Wearable Device',
    description: 'Proposed safety wearable designed to capture coordinates and transmit telemetry alerts automatically to contacts on trigger.',
    longDescription: 'A custom ECE conceptual design featuring microcontrollers, a tiny GPS transceiver, and cellular modules designed to auto-broadcast a localized help text signal during critical security threats.',
    category: 'concept',
    tech: ['GPS Tracking', 'Panic Alert Logic', 'Telemetry Beacon', 'Embedded Circuitry'],
    github: 'https://github.com/ruthvikgoud16/safety-wristband',
    live: '#',
    impactMetrics: [
      'Integrated physical SOS trigger strategy',
      'Low power circuit architecture design',
      'Automatic coordinate-linked contact alarm loops'
    ]
  },
  {
    id: 'esp32-drone',
    title: 'Autonomous ESP32 Drone Hover',
    subtitle: 'Makers Arena 2.0 Coimbatore - Collaborative Aerial Avionics',
    description: 'ESP32 flight controller firmware managing real-time attitude heading telemetry, precise gyro calculations, and microsecond ESC pulse loops.',
    longDescription: 'Assembled and calibrated alongside my engineering team at Makers Arena 2.0 2026 in Coimbatore. Configured PID self-leveling loops and high-frequency communication links to ensure high-accuracy stable physical flight.',
    category: 'hardware',
    tech: ['ESP32', 'C++', 'Gyro (MPU6050)', 'PID Feedback Loop', 'ESC Signals', 'RTOS Core Interfacing'],
    github: 'https://github.com/ruthvikgoud16/esp32-drone',
    live: '#',
    impactMetrics: [
      'Assembled at Makers Arena 2026, Coimbatore',
      'Highly balanced microsecond ESC signals',
      'True gyro attitude alignment metrics'
    ]
  }
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: 'exp-concentrix',
    title: 'Customer Support Associate',
    organization: 'Google Process at Concentrix',
    period: 'Present',
    role: 'Google Process Support Engine',
    description: 'Assisting Google customers with product and service inquiries, solving account and search logistics, and maintaining top support scores under fast performance constraints. Leveraged CRM tools and collaborative frameworks.',
    achievement: 'Strengthened strong analytical thinking, incident solution pathways, and customer relation professionalism.',
    iconType: 'work',
    tags: ['Google Process', 'Concentrix', 'Customer Support', 'Problem Solving', 'Team Collaboration']
  },
  {
    id: 'exp-hackprix',
    title: 'Winner (1st Place)',
    organization: 'HackPrix Season 2',
    period: '2025',
    role: 'Lead Architect & AI Designer',
    description: 'Led our core team to conceptualize and program CrisisOS, a crisis dispatch terminal combining live WebSockets data feeding and automated multi-agent GPT solutions.',
    achievement: 'Placed 1st Place overall out of over 100+ hardware and software competitors.',
    iconType: 'trophy',
    tags: ['CrisisOS', 'React', 'FastAPI', 'WebSockets', 'GPT Orchestrator']
  },
  {
    id: 'exp-agentforge',
    title: 'NVIDIA Hackathon Developer',
    organization: 'NVIDIA Open Hackathons (Active / In-Progress)',
    period: '2026',
    role: 'Team Lead & AI Architect',
    description: 'Spearheading team "AgentForge" to build AutoOps: Autonomous Enterprise Workflow Agent, orchestrating multi-agent networks powered by NVIDIA NIM for automated systems pipeline.',
    achievement: 'Designing custom system topology mapping out five specialized planning and validation agent units.',
    iconType: 'event',
    tags: ['NVIDIA NIM', 'LangGraph', 'Multi-Agent', 'AutoOps', 'Llama Models']
  },
  {
    id: 'exp-redrob',
    title: 'India.Runs Systems Developer',
    organization: 'India.Runs Hackathon (Ongoing / Active)',
    period: '2026',
    role: 'Systems Developer & Partner',
    description: 'Coordinating with team "Future AI Builders" to program Redrob Truth Engine, targeting candidate credential credibility checks automatically.',
    achievement: 'Actively designing semantic truth validation matrices and onboarding recruitment flows.',
    iconType: 'event',
    tags: ['AI Verification', 'Truth Engine', 'Workflow Innovation', 'Python']
  },
  {
    id: 'exp-makers',
    title: 'Core Hardware Builder',
    organization: 'Makers Arena 2.0 (Coimbatore)',
    period: '2026',
    role: 'Avionics Firmware developer',
    description: 'Assembled, coded, and test-flew an ESP32 microsecond drone system in partnership with Coimbatore engineering specialists.',
    achievement: 'Integrated gyro interrupt routines and PID motor leveling controllers successfully in C++.',
    iconType: 'event',
    tags: ['Makers Arena 2.0', 'ESP32 Code', 'Drone Telemetry', 'MPU6050 Gyro']
  },
  {
    id: 'exp-delegate',
    title: 'Invited Delegate / Delegate',
    organization: 'Microsoft Build & Google I/O Extended',
    period: '2026',
    role: 'Community Technology Delegate',
    description: 'Selected to participate in global community actions across major cities including Nepal, Delhi, Mumbai, Visakhapatnam, Coimbatore, and Bangalore.',
    achievement: 'Dived into Google Build with AI, deep LLM deployment pipelines, and advanced microchips roadmap.',
    iconType: 'event',
    tags: ['Microsoft Build 2026', 'Google I/O 2026', 'Build with AI', 'Emerging Tech']
  },
  {
    id: 'exp-education',
    title: 'B.Tech - Electronics & Communication Engineering',
    organization: 'Sreenidhi Institute of Science and Technology (SNIST)',
    period: '2025 - 2029 (Expected)',
    role: 'Undergraduate ECE Student',
    description: 'Rigorous engineering study focusing on analog setups, digital fundamentals, engineering mathematics, sensor inputs, and programming logics.',
    achievement: 'Current Status: First Year – First Semester. Maintaining focused academic progression aligning software-hardware workflows.',
    iconType: 'education',
    tags: ['ECE Core', 'SNIST', 'Basic Electronics', 'Problem Solving', 'Engineering Math']
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'programming-dev',
    title: 'PROGRAMMING & DEVELOPMENT',
    skills: [
      { name: 'Python (Beginner/Intermediate)', level: 85, category: 'ai' },
      { name: 'C Programming (Beginner)', level: 75, category: 'hardware' },
      { name: 'HTML & CSS Developer', level: 90, category: 'frontend' },
      { name: 'Front-End Development Fundamentals', level: 88, category: 'frontend' },
      { name: 'JavaScript & TypeScript', level: 82, category: 'frontend' }
    ]
  },
  {
    id: 'tools-platforms',
    title: 'TOOLS & PLATFORMS',
    skills: [
      { name: 'Visual Studio Code & Git/GitHub', level: 92, category: 'frontend' },
      { name: 'Microsoft Office Suite Services', level: 85, category: 'frontend' },
      { name: 'Google Workspace Ecosystem', level: 90, category: 'backend' },
      { name: 'CRM & Customer Support Tools', level: 88, category: 'backend' }
    ]
  },
  {
    id: 'learning-vectors',
    title: 'AREAS CURRENTLY LEARNING',
    skills: [
      { name: 'Artificial Intelligence Fundamentals', level: 80, category: 'ai' },
      { name: 'Data Analytics & Statistics', level: 78, category: 'ai' },
      { name: 'Electronics Fundamentals (Circuitry)', level: 84, category: 'hardware' },
      { name: 'Embedded Systems Basics & Sensors', level: 82, category: 'hardware' },
      { name: 'Communication Systems & Logic', level: 75, category: 'hardware' }
    ]
  }
];

export const CORE_STRENGTHS_DATA = [
  'Strong Communication Skills',
  'Analytical & Problem Solving',
  'Customer Relationship Management',
  'Team Collaboration & Leadership',
  'Adaptability & Quick Learning',
  'Time Management & Focus',
  'Critical Thinking Logic',
  'Professional Mindset & Attitude'
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
    shortDesc: 'Stateful long-term recall and deep chronological interaction history saving across sessions.',
    longDesc: 'Formulating recursive graph network indexes that map user feedback, interaction timelines, and contextual nuances. Ensures agent workflows never drop conversational context or project histories.',
    iconName: 'Brain',
    expectedLaunch: 'Q4 2026',
    stack: 'Mem0, LangGraph, NebulaGraph'
  },
  {
    id: 'self-healing',
    title: 'Self-Healing Workflows',
    category: 'self',
    titleLabel: 'Adaptive Automated Fault Fixes',
    shortDesc: 'Autonomous diagnostics and loop correction protocols in continuous integration stages.',
    longDesc: 'A micro-agent watching compile steps and pipeline executions. Upon code crash or data response deviations, the auto-recovery agent reads the traceback log, re-prompts the AI builder with exact boundaries, and hot-fixes runtime memory.',
    iconName: 'ShieldAlert',
    expectedLaunch: 'Q1 2027',
    stack: 'LangChain, Cron, Docker Health'
  },
  {
    id: 'adaptive-agents',
    title: 'Adaptive Learning Agents',
    category: 'adapt',
    titleLabel: 'Reinforcement Tuning Platform',
    shortDesc: 'Automated policy alignment optimizing user actions inside visual workflows dynamically over time.',
    longDesc: 'Integrating lightweight Proximal Policy Optimization (PPO) and Direct Preference Optimization (DPO) mechanisms directly on edge pipelines to train agent responses relative to local customer decisions.',
    iconName: 'Sparkles',
    expectedLaunch: 'Q2 2027',
    stack: 'PyTorch, RLHF, HuggingFace'
  },
  {
    id: 'ent-marketplace',
    title: 'Enterprise Marketplace Integrations',
    category: 'market',
    titleLabel: 'Universal API Interoperability',
    shortDesc: 'Modular marketplace enabling enterprise plugins (CRM, ITSM, ERP) integration in clicking actions.',
    longDesc: 'Standardizing a universal gateway abstraction layer to let AutoOps plug seamlessly into major cloud assets like Salesforce, Jira, HubSpot, and ServiceNow with secure sandbox credentials.',
    iconName: 'Zap',
    expectedLaunch: 'Q3 2027',
    stack: 'Node Gateway, OpenTelemetry'
  },
  {
    id: 'sec-compliance',
    title: 'Enhanced Security & Compliance',
    category: 'sec',
    titleLabel: 'Trust, Guardrails, & ISO Align',
    shortDesc: 'Real-time semantic guardrails block sensitive leaks (PII) before LLM egress gateways.',
    longDesc: 'Developing specialized localized security interceptors that verify token outputs against core privacy requirements, protecting candidate resumes, account numbers, and internal company schemas.',
    iconName: 'Lock',
    expectedLaunch: 'Q4 2026',
    stack: 'Llama Guard, NeMo Guardrails'
  }
];

export const LAB_DEVICES_DATA: LabDevice[] = [
  {
    id: 'neural-processor',
    name: 'Neural Processing Unit',
    type: 'processor',
    label: 'AI Chip (T-Lens v2)',
    shortDesc: 'Custom AI silicon driving TalentLens, LLMs, and dense vector matching.',
    longDesc: 'The neural chip manages semantic ranking routines, parsing CV documents using retrieval patterns. It executes pgvector lookups and controls RAG agent memory streams.',
    color: 'emerald',
    glowColor: '#10b981',
    iconName: 'Cpu',
    stats: {
      achievement: 'TalentLens Core Engine',
      impact: 'Ranks CV documents in <5s',
      stack: 'Python, pgvector, LangChain'
    },
    technologies: ['LangChain', 'Llama 3', 'FastAPI', 'Supabase', 'pgvector'],
    coordinates: { x: 50, y: 50 } // Center of the board!
  },
  {
    id: 'crisis-terminal',
    name: 'CrisisOS Command Terminal',
    type: 'terminal',
    label: 'CrisisOS Command Grid',
    shortDesc: 'HackPrix S2 winner terminal directing automated incident routing.',
    longDesc: 'Our central terminal is built to coordinate rescue groups during severe emergencies. Includes simulated process tables, terminal output logs, and continuous WebSocket checks.',
    color: 'cyan',
    glowColor: '#06b6d4',
    iconName: 'Terminal',
    stats: {
      achievement: 'HackPrix S2 1st Place',
      impact: 'WebSocket routing latency <5ms',
      stack: 'FastAPI, React, WebSockets, GPT'
    },
    technologies: ['React', 'FastAPI', 'WebSockets', 'GPT-4 Dispatcher', 'Tailwind'],
    coordinates: { x: 18, y: 25 }
  },
  {
    id: 'arduino-workbench',
    name: 'Arduino Embedded System Controller',
    type: 'arduino',
    label: 'Smart Sensor Node',
    shortDesc: 'Hardware micro-controller connecting pulse sensors and safety bracelets.',
    longDesc: 'A portable microcontroller interfacing analogue sensors to standard wireless endpoints, broadcasting GPS coordinates and biometric state alerts over the ESP8266 firmware layers.',
    color: 'blue',
    glowColor: '#3b82f6',
    iconName: 'Cpu',
    stats: {
      achievement: 'SNIST Hardware Prototype',
      impact: 'Analogue vital readout in 2ms',
      stack: 'C++, Arduino Uno, HC-SR04 Sensor'
    },
    technologies: ['Arduino', 'C++', 'HC-SR04 Sensor', 'Buzzers & LEDs', 'I2C SPI Bus'],
    coordinates: { x: 82, y: 25 }
  },
  {
    id: 'esp32-drone',
    name: 'ESP32 Drone Hover Core',
    type: 'satellite',
    label: 'ESP32 Drone Avionics',
    shortDesc: 'Collaborative aerial drone engineered at Coimbatore with precise PID loop firmware.',
    longDesc: 'Assembled and calibrated alongside my engineering team at Makers Arena 2.0 in Coimbatore (2026). Features real-time attitude heading telemetry, precise gyro calculations, and microsecond ESC pulse control loops.',
    color: 'purple',
    glowColor: '#a855f7',
    iconName: 'Radio',
    stats: {
      achievement: 'Makers Arena 2026 Drone',
      impact: 'Balanced self-leveling attitude loops',
      stack: 'C++, ESP32 Core, Gyro Core Interrupts'
    },
    technologies: ['Makers Arena 2.0', 'ESP32 RTOS', 'PID Feedback', 'Gyro Interfacing'],
    coordinates: { x: 18, y: 75 }
  },
  {
    id: 'server-rack',
    name: 'Cloud Database Server Rack',
    type: 'server',
    label: 'Supabase Server Stack',
    shortDesc: 'Redundant backend server managing pgvector schemas and API gateways.',
    longDesc: 'Multi-threaded cloud stack powering the persistent database states for all projects. Features continuous service checks, live server logs, and automated Dockerized server deployments.',
    color: 'indigo',
    glowColor: '#6366f1',
    iconName: 'Database',
    stats: {
      achievement: 'Enterprise Storage Grid',
      impact: '99.99% database query uptime',
      stack: 'PostgreSQL, Supabase, Vercel, FastAPI'
    },
    technologies: ['Supabase Serverless', 'PostgreSQL', 'FastAPI Rest', 'Docker Container'],
    coordinates: { x: 82, y: 75 }
  }
];

export const MISSION_STATS = {
  currentMission: 'Orchestrating AI Agents & Hardware Cores',
  status: 'ACTIVE',
  projectsCount: '09+',
  hackathonsCount: '05+',
  techCount: '18+',
  uptime: '99.98%'
};

