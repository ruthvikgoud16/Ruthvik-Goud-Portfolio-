export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: 'ai' | 'web' | 'hardware' | 'concept';
  tech: string[];
  github?: string;
  live?: string;
  impactMetrics?: string[];
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  role: string;
  description: string;
  achievement: string;
  iconType: 'education' | 'work' | 'event' | 'trophy';
  tags: string[];
}

export interface SkillItem {
  name: string;
  level: number; // percentage 0-100
  category: 'frontend' | 'backend' | 'ai' | 'hardware';
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface LabDevice {
  id: string;
  name: string;
  type: 'processor' | 'terminal' | 'arduino' | 'satellite' | 'server';
  label: string;
  shortDesc: string;
  longDesc: string;
  color: string; // Tailwind accent color name
  glowColor: string; // Hex or CSS color for box-shadow
  iconName: string;
  stats: {
    achievement: string;
    impact: string;
    stack: string;
  };
  technologies: string[];
  coordinates: { x: number; y: number }; // Percentage position on the PCB SVG grid
}
