export interface BaseElement {
  id: string;
  type: string;
  content?: string;
  style?: Record<string, any>;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  style: {
    fontSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    fontWeight: 'normal' | 'bold' | 'semibold';
    textAlign: 'left' | 'center' | 'right';
    color: string;
  };
}

export interface HeaderElement extends BaseElement {
  type: 'header';
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface BannerElement extends BaseElement {
  type: 'banner';
  content: string;
  variant: 'default' | 'gradient' | 'colored';
  color: string;
}

export interface GitContributionElement extends BaseElement {
  type: 'git-contribution';
  username: string;
  repository: string;
}

export interface TechStackElement extends BaseElement {
  type: 'tech-stack';
  technologies: string[];
  layout: 'grid' | 'list' | 'badges';
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface CodeBlockElement extends BaseElement {
  type: 'code-block';
  content: string;
  language: string;
}

export interface TableElement extends BaseElement {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export interface BadgeElement extends BaseElement {
  type: 'badge';
  content: string;
  variant: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export interface DividerElement extends BaseElement {
  type: 'divider';
  dividerStyle: 'line' | 'dots' | 'stars';
}

export type ElementType = 
  | TextElement 
  | HeaderElement 
  | BannerElement 
  | GitContributionElement 
  | TechStackElement 
  | ImageElement 
  | CodeBlockElement 
  | TableElement 
  | BadgeElement 
  | DividerElement;

export interface ElementConfig {
  type: string;
  name: string;
  icon: string;
  description: string;
  defaultProps: Partial<ElementType>;
}
