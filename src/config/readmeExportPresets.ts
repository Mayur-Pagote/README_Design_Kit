import type { ElementType } from '@/types/elements';

export type ReadmeExportPreset =
  | 'default'
  | 'openSource'
  | 'personal'
  | 'professional';

export const README_EXPORT_PRESETS: Record<
  Exclude<ReadmeExportPreset, 'default'>,
  {
    label: string;
    allowedTypes: ElementType['type'][];
  }
> = {
  openSource: {
    label: 'Open Source',
    allowedTypes: [
      'header',
      'text',
      'banner',
      'badge',
      'installation',
      'git-contribution',
      'tech-stack',
      'code-block',
      'table',
      'image',
      'divider',
    ],
  },

  personal: {
    label: 'Personal / Portfolio',
    allowedTypes: [
      'header',
      'text',
      'banner',
      'tech-stack',
      'image',
      'code-block',
      'divider',
    ],
  },

  professional: {
    label: 'Professional / Client',
    allowedTypes: [
      'header',
      'text',
      'banner',
      'image',
      'table',
      'divider',
    ],
  },
};
