import type { Fact, FileEntry, Project, SkillGroup, Stat, Study, Work } from './types';

export const profile = {
  name: 'Jorge L. Herrera',
  shortName: 'Jorge Herrera',
  initial: 'J',
  email: 'hello@jorgeherrera.dev',
  linkedin: { label: '/in/jorge-l-herrera', href: 'https://www.linkedin.com/in/jorge-l-herrera' },
  github: { label: '@jorge-l-herrera', href: 'https://github.com/jorge-l-herrera' },
  location: 'Panamá · GMT−5',
  cvHref: '/files/jorge-herrera-cv-en.pdf',
  copyright: '© 2026 Jorge L. Herrera · all rights reserved',
};

export const heroFacts: Fact[] = [
  { label: 'Name', value: 'Jorge L. Herrera' },
  { label: 'Location', value: 'Panamá · GMT−5' },
  { label: 'Experience', value: '5+ years' },
  { label: 'Currently', value: 'Senior SWE · Acme' },
];

export const featuredStack = [
  'Angular',
  'TypeScript',
  'Java',
  'Spring Boot',
  'AWS',
  'Python',
  'Claude',
];

export const stats: Stat[] = [
  { value: '5', suffix: '+', label: 'Years shipping' },
  { value: '15', suffix: '+', label: 'Production projects' },
  { value: '12', label: 'Stacks & tools' },
  { value: '∞', label: 'Cups of coffee' },
];

export const initialWork: Work[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Acme Software',
    loc: 'Panama City + remote',
    period: '2023 — Present',
    current: true,
    desc: 'Leading frontend architecture for a multi-tenant Angular app. Drove the rollout of Claude-assisted features into customer workflows; partnered with backend on a Spring Boot AI gateway. ~40 PR reviews/week and a small mobile spinoff in Ionic.',
    tags: ['Angular', 'TypeScript', 'Spring Boot', 'AWS', 'Claude'],
  },
  {
    role: 'Software Engineer',
    company: 'Banca Digital S.A.',
    loc: 'Panama City',
    period: '2020 — 2023',
    current: false,
    desc: 'Full-stack on the consumer banking app. Built features end-to-end across Angular and Spring Boot, owned the Ionic mobile client for a year, and wrote the migration plan that moved auth onto Firebase. Wrote and maintained the unit-test suite for the public API.',
    tags: ['Angular', 'Ionic', 'Java', 'Firebase', 'JFrog'],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Indra',
    loc: 'Panamá',
    period: '2019 — 2020 (Internship → Full-time)',
    current: false,
    desc: 'First role. Wrote Java microservices and learned what production actually means — incident response, code review etiquette, the discipline of small commits. Built my first Android feature here.',
    tags: [],
  },
];

export const initialStudies: Study[] = [
  {
    period: '2014 — 2019',
    title: 'B.Sc. Software Engineering',
    org: 'Universidad Tecnológica de Panamá',
    desc: 'Senior thesis on real-time event processing. Elective sequences in mobile and machine learning.',
    diploma: 'bsc-diploma.pdf',
  },
  {
    period: '2022 · RENEWED 2025',
    title: 'AWS Solutions Architect',
    org: 'Amazon Web Services · Associate',
    desc: 'Continuing-education work on AI / LLM deployment patterns. Credential downloadable below.',
    diploma: 'aws-saa-certificate.pdf',
  },
];

export const initialProjects: Project[] = [
  {
    title: 'Voyager',
    year: '2025',
    accent: true,
    desc: 'AI customer-support assistant. Angular shell + Claude-backed conversation pipeline; deployed on AWS Lambda + DynamoDB.',
    tags: ['Angular', 'Python', 'Claude', 'AWS'],
    url: 'https://voyager.example.com',
    role: 'Lead frontend & AI integration',
    period: '2025 · 4 months',
    overview:
      'Voyager is a customer-support assistant that drafts and routes replies for a 200-seat support org. I built the Angular operator console and wired a Claude-backed conversation pipeline behind an AWS Lambda + DynamoDB backend.',
    shots: ['Conversation console', 'Claude draft panel', 'Routing rules', 'Analytics dashboard'],
  },
  {
    title: 'Telar',
    year: '2024',
    accent: false,
    desc: 'Field-ops mobile app for energy crews. Ionic on device + Firebase / Cloud Functions on the back, with an offline-first sync I’m proud of.',
    tags: ['Ionic', 'TypeScript', 'Firebase'],
    url: 'https://telar.example.com',
    role: 'Mobile lead',
    period: '2024 · 6 months',
    overview:
      'Telar is a field-operations app for energy crews working in low-connectivity areas. Built in Ionic with an offline-first sync layer over Firebase and Cloud Functions.',
    shots: ['Crew dashboard', 'Work order detail', 'Offline sync state', 'Map view'],
  },
  {
    title: 'Conduit',
    year: '2023',
    accent: false,
    desc: 'Internal DevTools API gateway. Spring Boot routing layer, OpenAPI-first, CircleCI deploy pipeline. Killed three legacy proxies in the process.',
    tags: ['Java', 'Spring Boot', 'CircleCI'],
    role: 'Backend engineer',
    period: '2023 · 3 months',
    overview:
      'Conduit is an internal API gateway that replaced three aging proxy services. OpenAPI-first Spring Boot routing layer with a CircleCI deploy pipeline.',
    shots: ['Gateway topology', 'Route config', 'OpenAPI explorer', 'Deploy pipeline'],
  },
  {
    title: 'Pulso',
    year: '2022',
    accent: false,
    desc: 'Real-time health metrics dashboard. Angular + WebSockets on the front, Python ingest pipeline, deployed across two AWS regions for failover.',
    tags: ['Angular', 'Python', 'AWS'],
    role: 'Full-stack',
    period: '2022 · 5 months',
    overview:
      'Pulso streams real-time health metrics to a live dashboard. Angular + WebSockets on the front, a Python ingest pipeline behind it, deployed across two AWS regions for failover.',
    shots: ['Live dashboard', 'Metric drilldown', 'Alert rules', 'Region failover'],
  },
];

export const skillGroups: SkillGroup[] = [
  { name: 'Languages', items: ['TypeScript', 'Java', 'Python', 'JavaScript', 'Swift'] },
  { name: 'Frameworks', items: ['Angular', 'Spring Boot', 'Ionic', 'Android SDK'] },
  { name: 'Cloud & data', items: ['AWS', 'Firebase', 'JFrog'] },
  {
    name: 'Tooling & process',
    items: ['Git', 'CircleCI', 'Jira', 'Postman', 'Figma', 'Notion', 'Claude'],
  },
];

export const files: FileEntry[] = [
  {
    title: 'CV — English',
    meta: '240 KB · Updated May 2026',
    kind: 'PDF',
    href: '/files/jorge-herrera-cv-en.pdf',
    icon: 'doc',
  },
  {
    title: 'CV — Español',
    meta: '244 KB · Updated May 2026',
    kind: 'PDF',
    href: '/files/jorge-herrera-cv-es.pdf',
    icon: 'doc',
    cta: 'Descargar →',
  },
  {
    title: "Bachelor's Diploma",
    meta: '1.2 MB · 2019',
    kind: 'PDF',
    href: '/files/bsc-diploma.pdf',
    icon: 'award',
  },
  {
    title: 'AWS Solutions Architect',
    meta: '840 KB · 2025 renewal',
    kind: 'PDF',
    href: '/files/aws-saa-certificate.pdf',
    icon: 'award',
  },
  {
    title: 'Java SE Certification',
    meta: '612 KB · 2021',
    kind: 'PDF',
    href: '/files/java-se-certification.pdf',
    icon: 'award',
  },
  {
    title: 'References Letter',
    meta: '380 KB · 2024',
    kind: 'PDF',
    href: '/files/references-letter.pdf',
    icon: 'letter',
  },
];

export const sections = [
  { num: '01', id: 'about', label: 'About' },
  { num: '02', id: 'work', label: 'Work' },
  { num: '03', id: 'studies', label: 'Studies' },
  { num: '04', id: 'stack', label: 'Stack' },
  { num: '05', id: 'projects', label: 'Projects' },
  { num: '06', id: 'files', label: 'Files' },
  { num: '07', id: 'contact', label: 'Contact' },
] as const;

/** Nav omits "Stack" — it matches the source design's six nav links. */
export const navLinks = sections.filter((s) => s.id !== 'stack');
