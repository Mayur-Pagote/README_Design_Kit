import type { ElementConfig } from '@/types/elements';

export const elementConfigs: ElementConfig[] = [
  {
    type: 'header',
    name: 'Header',
    icon: '📝',
    description: 'Add a header with different sizes (H1-H6)',
    defaultProps: {
      type: 'header',
      content: 'Your Header Here',
      level: 1,
    },
  },
  {
    type: 'text',
    name: 'Text',
    icon: '📄',
    description: 'Add formatted text with styling options',
    defaultProps: {
      type: 'text',
      content: 'Your text content here...',
      style: {
        fontSize: 'md',
        fontWeight: 'normal',
        textAlign: 'left',
        color: 'text-foreground',
      },
    },
  },
  {
    type: 'banner',
    name: 'Banner',
    icon: '🎯',
    description: 'Create eye-catching banners for your README',
    defaultProps: {
      type: 'banner',
      content: 'Welcome to My Project!',
      variant: 'gradient',
      color: 'blue',
    },
  },
  {
    type: 'git-contribution',
    name: 'Git Contribution Guide',
    icon: '🤝',
    description: 'Auto-generate contribution guide with username',
    defaultProps: {
      type: 'git-contribution',
      username: 'your-username',
      repository: 'your-repo',
    },
  },
  {
    type: 'tech-stack',
    name: 'Tech Stack',
    icon: '⚡',
    description: 'Display your technologies and skills',
    defaultProps: {
      type: 'tech-stack',
      technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
      layout: 'badges',
    },
  },
  {
    type: 'image',
    name: 'Image',
    icon: '🖼️',
    description: 'Add images with customizable dimensions',
    defaultProps: {
      type: 'image',
      src: 'https://via.placeholder.com/400x200',
      alt: 'Placeholder image',
      width: '400px',
      height: '200px',
    },
  },
  {
    type: 'code-block',
    name: 'Code Block',
    icon: '💻',
    description: 'Display syntax-highlighted code',
    defaultProps: {
      type: 'code-block',
      content: 'console.log("Hello, World!");',
      language: 'javascript',
    },
  },
  {
    type: 'badge',
    name: 'Badge',
    icon: '🏷️',
    description: 'Add status badges and labels',
    defaultProps: {
      type: 'badge',
      content: 'MIT License',
      variant: 'default',
    },
  },
  {
    type: 'table',
    name: 'Table',
    icon: '📊',
    description: 'Create organized data tables',
    defaultProps: {
      type: 'table',
      headers: ['Feature', 'Status', 'Notes'],
      rows: [
        ['Authentication', '✅ Complete', 'JWT implementation'],
        ['Dashboard', '🚧 In Progress', 'UI components'],
        ['API', '📋 Planned', 'REST endpoints'],
      ],
    },
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: '➖',
    description: 'Add visual separators between sections',
    defaultProps: {
      type: 'divider',
      dividerStyle: 'line',
    },
  },
];
