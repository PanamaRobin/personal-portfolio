export type Work = {
  role: string;
  company: string;
  loc: string;
  period: string;
  current: boolean;
  desc: string;
  tags: string[];
};

export type Study = {
  period: string;
  title: string;
  org: string;
  desc: string;
  /** Filename of the attached diploma; empty string means "no diploma". */
  diploma: string;
};

export type Project = {
  title: string;
  year: string;
  /** Accent-tinted card thumbnail; used to highlight the flagship project. */
  accent: boolean;
  desc: string;
  tags: string[];
  url?: string;
  role: string;
  period: string;
  overview: string;
  /** Labels standing in for screenshots until real images are attached. */
  shots: string[];
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type FileEntry = {
  title: string;
  meta: string;
  kind: string;
  href: string;
  icon: 'doc' | 'award' | 'letter';
  /** Some cards use a pre-translated CTA in the source design. */
  cta?: string;
};

export type Stat = {
  value: string;
  suffix?: string;
  label: string;
};

export type Fact = {
  label: string;
  value: string;
};
