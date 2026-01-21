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
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header" width="100%"/>
      <h1 align="center"> About Me </h1>

      <span style="color:#0000FF;"><b>👀 I’m interested in technology.</b></span><br>
      <span style="color:#228B22;"><b>🌱 I’m currently studying Computer Science.</b></span><br>
      <span style="color:#FF69B4;"><b>⚡ Fun fact: The first gigabyte drive cost $40,000!</b></span><br>
      <span style="color:#FFD700;"><b>❤️ Favorite quote: "Help ever, hurt never."</b></span><br>

      <img src="https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif" width="100%">

      <h1 align="center"> 📊 GitHub Stats </h1>

      <div align="center">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=transparent" />
          <img src="https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif" width="100%">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent" />
          <img src="https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif" width="100%">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username={username}&theme=transparent" />
          <img src="https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif" width="100%">
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
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header" width="100%"/>
      <h1 align="center"> About Me </h1>

      <span style="color:#0000FF;"><b>👀 I’m interested in technology.</b></span><br>
      <span style="color:#228B22;"><b>🌱 I’m currently studying Computer Science.</b></span><br>
      <span style="color:#FF69B4;"><b>⚡ Fun fact: The first gigabyte drive cost $40,000!</b></span><br>
      <span style="color:#FFD700;"><b>❤️ Favorite quote: "Help ever, hurt never."</b></span><br>
      <br> </br>

      <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">

      <br/>

      <h1 align="center"> 📊 GitHub Stats </h1>

      <div align="center">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=transparent" />
          <br/>
          <img src="https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=radical&cardType=github">
          <br/>
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent" />
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <br/>
          <img src="https://github-trophies.vercel.app/?username={username}">
          <br/>
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <h1 align="center"> Contribution Graph </h1>
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
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header" width="100%"/>
      <h1 align="center"> About Me </h1>

      <span style="color:#0000FF;"><b>👀 I’m interested in technology.</b></span><br>
      <span style="color:#228B22;"><b>🌱 I’m currently studying Computer Science.</b></span><br>
      <span style="color:#FF69B4;"><b>⚡ Fun fact: The first gigabyte drive cost $40,000!</b></span><br>
      <span style="color:#FFD700;"><b>❤️ Favorite quote: "Help ever, hurt never."</b></span><br>
      <br/>
      <img src="https://komarev.com/ghpvc/?username={username}&style=for-the-badge"/>
      <br> </br>

      <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">

      <br/>

      <h1 align="center"> 📊 GitHub Stats </h1>

      <div align="center">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=transparent" />
          <br/>
          <img src="https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=dracula&cardType=level-alternate">
          <br/>
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent" />
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username={username}&theme=transparent"/>
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <br/>
          <img src="https://github-trophies.vercel.app/?username={username}">
          <br/>
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
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
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header" width="100%"/>
      <h1><img src="https://emojis.slackmojis.com/emojis/images/1531849430/4246/blob-sunglasses.gif?1531849430" width="30"/>Hey! Nice to see you.</h1>
      <p>Welcome to my page! </br> I'm {username}, Fullstack developer</p>
      <img src="https://komarev.com/ghpvc/?username={username}&style=for-the-badge"/>
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
      <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">

      <h1 align="center"> 📊 GitHub Stats </h1>

      <div align="center">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=radical" />
          <br/>
          <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username={username}&theme=2077" />
          <br/>
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent" />
          <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username={username}&theme=transparent"/>
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <br/>
          <h1 align="center"> GitHub Trophies </h1>
          <img src="https://github-trophies.vercel.app/?username={username}">
          <br/>
          <img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">
          <br/>
          <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=react-dark&hide_border=false" />
      </div>
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-5',
    name: 'Template - V',
    description: 'Comprehensive Techy: A detail-rich README with categorical sections and full analytics.',
    category: 'professional',
    tags: ['modern', 'tech-stack', 'badges', 'comprehensive'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 80,
    thumbnail: '/template-5.png',
    created: new Date('2026-01-18'),
    updated: new Date('2026-01-18'),
    featured: true,
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=110&section=header" width="100%"/>
      <h1 align="center">Hey 👋, I'm {username}</h1>
      <h3 align="center">Full Stack Developer | Open Source Enthusiast</h3>
      <p align="center">
        <img src="https://komarev.com/ghpvc/?username={username}&style=for-the-badge" />
        <img src="https://img.shields.io/github/followers/{username}?style=for-the-badge" />
      </p>

      ## 🚀 About Me
      - 🔭 Working on **scalable web applications**
      - 🌱 Learning **System Design & Advanced JavaScript**
      - 👯 Open to **Open Source collaborations**
      - 💬 Ask me about **React, Node.js, APIs**

      ---

      ## 🧠 Tech Stack
      ### 💻 Frontend
      <p>
        <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react"/>
        <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js"/>
        <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript"/>
      </p>
      ### 🛠 Backend
      <p>
        <img src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js"/>
        <img src="https://img.shields.io/badge/Express-404D59?style=for-the-badge&logo=express"/>
      </p>

      ---

      ## 📊 GitHub Analytics
      <p align="center">
        <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=react"/>
      </p>
      <p align="center">
        <img height="180em" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=react"/>
        <img height="180em" src="https://github-readme-streak-stats.herokuapp.com/?user={username}&theme=react"/>
      </p>

      ## 🏆 Achievements
      <p align="center">
        <img src="https://github-trophies.vercel.app/?username={username}&theme=onestar&row=1"/>
      </p>

      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-6',
    name: 'Template - VI',
    description: 'Minimalist Professional: A high-contrast, data-rich README featuring social badges, tech-stack cards, and detailed analytics.',
    category: 'portfolio',
    tags: ['professional', 'minimal', 'clean', 'dynamic'],
    author: 'RDK Team',
    version: '1.2.0',
    popularity: 130,
    created: new Date('2026-01-19'),
    updated: new Date('2026-01-19'),
    featured: true,
    thumbnail: '/template-6.png',
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=rect&color=000000&height=100&text=Welcome&fontSize=50" width="100%"/>
      
      <h1 align="center"> Hi, I'm {username} 👋 </h1>
      
      <p align="center">
        <b>Software Engineer dedicated to building functional, user-centric digital experiences.</b>
      </p>

      <p align="center">
        <a href="https://linkedin.com/in/{username}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
        <a href="https://github.com/{username}"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /></a>
      </p>

      <div align="center">
        <img src="https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js" />
        <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript" />
        <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css" />
        <img src="https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql" />
      </div>

      <br/>

      <div align="center">
        <img height="180em" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=omni&hide_border=true" />
        <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=omni&hide_border=true" />
      </div>

      <br/>

      <div align="center">
        <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&bg_color=ffffff&color=000000&line=000000&point=000000&area=true&hide_border=true" width="100%" />
      </div>

      <br/>
      <p align="center">
        Connect: <a href="mailto:{username}@gmail.com"><b>Email</b></a> • <a href="https://github.com/{username}"><b>Repositories</b></a>
      </p>

      <img src="https://capsule-render.vercel.app/api?type=soft&color=000000&height=50&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-7',
    name: 'Template - VII',
    description: 'Open Source Contributor: A specialized template focusing on program participation, contribution streaks, and real-time PR activity.',
    category: 'open-source',
    tags: ['open-source', 'contributor', 'dynamic', 'stats'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 110,
    thumbnail: '/template-7.png',
    created: new Date('2026-01-20'),
    updated: new Date('2026-01-20'),
    featured: true,
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=header&text=Open%20Source%20Contributor&fontSize=40" width="100%"/>
      
      <p align="center">
        <img src="https://img.shields.io/badge/Latest%20Contribution-Merged-8E44AD?style=for-the-badge&logo=github" />
        <img src="https://img.shields.io/github/issues-pr-raw/{username}/{repo}?style=for-the-badge&label=Active%20PRs&color=2ecc71" />
      </p>

      <h1 align="center"> Hi, I'm {username} 👋 </h1>
      <p align="center"> 🚀 Passionate about contributing to Open Source and building community-driven software. </p>

      ---

      ## 🏆 Open Source Achievements
      <div align="center">
        <img src="https://img.shields.io/badge/Hacktoberfest%20'25-6+%20PRs%20Accepted-9146FF?style=for-the-badge&logo=hacktoberfest" />
        <img src="https://img.shields.io/badge/SWOC%20'25-Rank%2014-blue?style=for-the-badge&logo=github" />
        <img src="https://img.shields.io/badge/GSSoC%20'24-Rank%20483-orange?style=for-the-badge&logo=google-summer-of-code" />
      </div>
      
      ---

      ## 📊 Contribution Analytics
      <p align="center">
        <img height="180em" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=tokyonight&count_private=true" />
        <img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=react"/>
      </p>

      ---
      ## 🔄 Recent Activity Graph
      <div align="center">
        <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=tokyonight&hide_border=true&area=true" width="100%" />
      </div>

      <br/>

      ---

      ## 🛠️ Most Contributed Tech
      <p align="center">
        <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
        <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
        <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
        <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
      </p>

      <br/>
      <img src="https://capsule-render.vercel.app/api?type=soft&color=gradient&height=50&section=footer" width="100%"/>
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
    value: 'portfolio',
    label: 'Portfolio',
    description: 'Personal portfolio templates',
  },
  {
    value: 'open-source',
    label: 'Open Source',
    description: 'Templates for active contributors and program participants',
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
  'open-source',
  'contributor',
  'dynamic',
];