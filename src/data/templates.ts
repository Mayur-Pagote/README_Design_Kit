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
    thumbnail: '/template-1.png',
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
  {
    id: 'template-2',
    name: 'Template - II',
    description: 'A modern template.',
    category: 'modern',
    tags: ['modern', 'professional'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 95,
    thumbnail: '/template-2.png',
    created: new Date('2026-01-16'),
    updated: new Date('2026-01-16'),
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

      <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">

      <br/>

      <!-- GitHub Stats Header -->
      <h1 align="center"> 📊 GitHub Stats </h1>

      <!-- Summary Cards -->
      <div align="center">
          <!-- Profile Details Card -->
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=transparent" />
          <br/>
          <!-- Stats Card -->
          <img src="https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=radical&cardType=github">
          <br/>
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <!-- Top Languages Card -->
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent" />
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <br/>
          <!-- GitHub Trophies -->
          <img src="https://github-trophies.vercel.app/?username={username}">
          <br/>
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <h1 align="center"> Contribution Graph </h1>
          <!-- Contribution Graph -->
          <img src="https://ssr-contributions-svg.vercel.app/_/{username}?chart=3dbar&gap=0.6&scale=2&flatten=2&animation=wave&animation_duration=4&animation_delay=0.06&animation_amplitude=24&animation_frequency=0.1&animation_wave_center=0_3&format=svg&weeks=34&theme=native">
          
      </div>

      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-3',
    name: 'Template - III',
    description: 'A sleek template.',
    category: 'modern',
    tags: ['modern', 'professional', 'badges', 'clean'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 95,
    thumbnail: '/template-3.png',
    created: new Date('2026-01-16'),
    updated: new Date('2026-01-16'),
    featured: true,
    markdown:`
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header" width="100%"/>
      <h1 align="center"> About Me </h1>

      <!-- Profile Description -->
      <span style="color:#0000FF;"><b>👀 I’m interested in technology.</b></span><br>
      <span style="color:#228B22;"><b>🌱 I’m currently studying Computer Science.</b></span><br>
      <span style="color:#FF69B4;"><b>⚡ Fun fact: The first gigabyte drive cost $40,000!</b></span><br>
      <span style="color:#FFD700;"><b>❤️ Favorite quote: "Help ever, hurt never."</b></span><br>
      <br/>
      <img src="https://komarev.com/ghpvc/?username={username}&style=for-the-badge"/>
      <br> </br>

      <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">

      <br/>

      <!-- GitHub Stats Header -->
      <h1 align="center"> 📊 GitHub Stats </h1>

      <!-- Summary Cards -->
      <div align="center">
          <!-- Profile Details Card -->
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=transparent" />
          <br/>
          <!-- Stats Card -->
          <img src="https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=dracula&cardType=level-alternate">
          <br/>
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <!-- Top Languages Card -->
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent" />
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username={username}&theme=transparent"/>
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <br/>
          <!-- GitHub Trophies -->
          <img src="https://github-trophies.vercel.app/?username={username}">
          <br/>
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <!-- Contribution Graph -->
          <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&radius=16&theme=react&area=true&order=5&custom_title=Contribution%20Graph">
          
      </div>

      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-4',
    name: 'Template - IV',
    description: 'A modern and minimalistic template.',
    category: 'modern',
    tags: ['modern', 'minimal', 'badges', 'clean'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 95,
    thumbnail: '/template-4.png',
    created: new Date('2026-01-16'),
    updated: new Date('2026-01-16'),
    featured: true,
    markdown:`
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header" width="100%"/>
      <br/>
      <h1><img src="https://emojis.slackmojis.com/emojis/images/1531849430/4246/blob-sunglasses.gif?1531849430" width="30"/>Hey! Nice to see you.</h1>

      <!-- Profile Description -->
      <p>Welcome to my page! </br> I'm {username}, Fullstack developer</p>
      <br/>
      <img src="https://komarev.com/ghpvc/?username={username}&style=for-the-badge"/>
      <br/>
      <h1>Tech Stack:</h1>
      <p>
        <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
        <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
        <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
        <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
        <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" />
        <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" />
        <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
        <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
      </p>
      <br/>
      <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
      <br/>

      <!-- GitHub Stats Header -->
      <h1 align="center"> 📊 GitHub Stats </h1>

      <!-- Summary Cards -->
      <div align="center">
          <!-- Profile Details Card -->
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=radical" />
          <br/>
          <!-- Stats Card -->
          <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username={username}&theme=2077" />
          <br/>
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <!-- Top Languages Card -->
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent" />
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username={username}&theme=transparent"/>
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <br/>
          <!-- GitHub Trophies -->
          <h1 align="center"> GitHub Trophies </h1>
          <img src="https://github-trophies.vercel.app/?username={username}">
          <br/>
          <!-- Divider GIF -->
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <br/>
          <!-- Contribution Graph -->
          <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=react-dark&hide_border=false" />
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
