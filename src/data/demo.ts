import type { ElementType } from '@/types/elements';

export const demoElements: ElementType[] = [
  {
    id: 'demo-header-1',
    type: 'header',
    content: '🚀 Awesome Project',
    level: 1,
    hiddenFor: [],
  },
  {
    id: 'demo-text-1',
    type: 'text',
    content: 'This is an amazing project that does incredible things. Built with modern technologies and best practices.',
    style: {
      fontSize: 'lg',
      fontWeight: 'normal',
      textAlign: 'left',
      color: 'text-foreground',
    },
    hiddenFor: ['recruiter'], // example
  },
  {
    id: 'demo-banner-1',
    type: 'banner',
    content: '⭐ Give us a star if you like this project!',
    variant: 'gradient',
    color: 'blue',
    hiddenFor: [],
  },
  {
    id: 'demo-tech-stack-1',
    type: 'tech-stack',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI'],
    layout: 'badges',
    hiddenFor: ['client'],
  },
  {
    id: 'demo-header-2',
    type: 'header',
    content: '📋 Features',
    level: 2,
    hiddenFor: [],
  },
  {
    id: 'demo-table-1',
    type: 'table',
    headers: ['Feature', 'Status', 'Description'],
    rows: [
      ['🎨 Modern UI', '✅ Complete', 'Beautiful and responsive design'],
      ['🔧 Easy Setup', '✅ Complete', 'Quick installation and configuration'],
      ['📱 Mobile Ready', '✅ Complete', 'Works perfectly on all devices'],
      ['🚀 Fast Performance', '🚧 In Progress', 'Optimized for speed'],
    ],
    hiddenFor: [],
  },
  {
    id: 'demo-divider-1',
    type: 'divider',
    dividerStyle: 'stars',
    hiddenFor: [],
  },
  {
    id: 'demo-git-contribution-1',
    type: 'git-contribution',
    username: 'your-username',
    repository: 'awesome-project',
    hiddenFor: ['client'],
  },
  {
    id: 'demo-header-3',
    type: 'header',
    content: '📝 Installation',
    level: 2,
    hiddenFor: [],
  },
  {
    id: 'demo-code-1',
    type: 'code-block',
    content: `# Clone the repository
git clone https://github.com/your-username/awesome-project.git

# Navigate to project directory
cd awesome-project

# Install dependencies
npm install

# Start development server
npm run dev`,
    language: 'bash',
    hiddenFor: [],
  },
  {
    id: 'demo-badge-1',
    type: 'badge',
    content: 'MIT License',
    variant: 'default',
    hiddenFor: [],
  },
];
