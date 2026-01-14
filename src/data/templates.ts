import type { Template, TemplateCategory } from '@/types/templates';

// Sample template data - this would typically come from an API
export const sampleTemplates: Template[] = [
  {
    id: 'template-1',
    name: 'Template - I',
    description: 'A sleek, professional template.',
    category: 'professional',
    tags: ['modern', 'comprehensive'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 95,
    thumbnail: './template-1.png',
    created: new Date('2024-12-01'),
    updated: new Date('2026-01-15'),
    featured: true,
    markdown:`
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header" width="100%"/>
      <h1 align="center"> About Me </h1>

      <!-- Profile Description -->
      <span style="color:#0000FF;"><b>👀 I’m interested in technology.</b></span><br>
      <span style="color:#228B22;"><b>🌱 I’m currently studying Computer Science.</b></span><br>
      <span style="color:#FF69B4;"><b>⚡ Fun fact: The first gigabyte drive cost $40,000!</b></span><br>
      <span style="color:#FFD700;"><b>❤️ Favorite quote: "Help ever, hurt never."</b></span><br>
      <br> </br>

      <img src="https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif" width="100%">

      <!-- GitHub Stats Header -->
    <h1 align="center"> 📊 GitHub Stats </h1>

    <!-- Summary Cards -->
    <div align="center">
        <!-- Profile Details Card -->
        <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=transparent" />
        <!-- Divider GIF -->
        <img src="https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif" width="100%">
        <!-- Top Languages Card -->
        <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent" />
        <!-- Divider GIF -->
        <img src="https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif" width="100%">
        <!-- Stats Card -->
        <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username={username}&theme=transparent" />
        <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username={username}&theme=transparent" />
        <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=react-dark&hide_border=false" width="100%" />
    </div>

    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>
    `,
  },
];

export const templateCategories: { value: TemplateCategory; label: string; description: string }[] = [
  {
    value: 'modern',
    label: 'Modern',
    description: 'Modern Templates',
  },
  {
    value: 'minimal',
    label: 'Minimal',
    description: 'Minimal Templates',
  },
  {
    value: 'professional',
    label: 'Professional',
    description: 'Professional Templates',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Other Templates',
  }
];

export const popularTags = [
  'modern',
  'professional',
  'minimal',
  'comprehensive',
  'badges',
  'tech-stack',
  'clean',
];
