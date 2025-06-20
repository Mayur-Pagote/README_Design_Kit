import type { ElementType } from './elements';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  elements: ElementType[];
  thumbnail: string;
  author: string;
  version: string;
  popularity: number;
  created: Date;
  updated: Date;
  featured: boolean;
}

export type TemplateCategory = 
  | 'personal-projects'
  | 'open-source'
  | 'corporate'
  | 'documentation'
  | 'portfolio'
  | 'startup'
  | 'academic'
  | 'community';

export interface TemplateFilter {
  category?: TemplateCategory;
  tags?: string[];
  search?: string;
  featured?: boolean;
}

export interface TemplateMetadata {
  totalTemplates: number;
  categories: {
    category: TemplateCategory;
    count: number;
  }[];
  popularTags: {
    tag: string;
    count: number;
  }[];
}

export interface UserTemplatePreferences {
  favorites: string[];
  recentlyUsed: string[];
  recentlyViewed: string[];
}
