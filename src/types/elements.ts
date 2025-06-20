// Base
export interface BaseElement {
  id: string;
  type: string;
  content?: string;
  style?: Record<string, string | number>;
}

// Textual elements
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

export interface TitleElement extends BaseElement {
  type: 'title';
  content: string;
}

export interface DescriptionElement extends BaseElement {
  type: 'description';
  content: string;
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

export interface InstallationElement extends BaseElement {
  type: 'installation';
  content: string;
  instructions?: string[];
}

// Strong union type with all known element types
export type ElementType =
  | TextElement
  | TitleElement
  | DescriptionElement
  | HeaderElement
  | BannerElement
  | GitContributionElement
  | TechStackElement
  | ImageElement
  | CodeBlockElement
  | TableElement
  | BadgeElement
  | DividerElement
  | InstallationElement;

// Optional config metadata
export interface ElementConfig {
  type: ElementType['type'];
  name: string;
  icon: string;
  description: string;
  defaultProps: Partial<ElementType>;
}
