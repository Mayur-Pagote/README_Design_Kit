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
  {
    id: 'template-8',
    name: 'Template - VIII',
    description: 'The Impact Dashboard: High-impact, zero-scroll layout for modern profiles.',
    category: 'minimal',
    tags: ['minimal', 'dashboard', 'impact', 'short-form'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 120,
    thumbnail: '/template-8.png',
    created: new Date('2026-01-21'),
    updated: new Date('2026-01-21'),
    featured: true,
    markdown: `

  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=header&text=Portfolio.dashboard&fontSize=40" width="100%"/>

  
  <p align="center">
    <b>🚀 CURRENT SPRINT:</b> <code>{repo}</code> <br>
    <b>🎯 PRIMARY FOCUS:</b> <code>Next.js & TypeScript</code> <br>
    <b>⏳ STATUS:</b> <code>Available for Hire</code>
  </p>
  
  ---
  
  <h2 align="center"> 🌟 Flagship Project </h2>
  <p align="center">
    <a href="https://github.com/{username}/{repo}">
      <img src="https://github-readme-stats.vercel.app/api/pin/?username={username}&repo={repo}&theme=dark&show_owner=true" width="100%" />
    </a>
  </p>
  
  <h2 align="center"> 🛠️ Core Tech Stack </h2>
  <p align="center">
    <img src="https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=white" />
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql&logoColor=white" />
  </p>
  
  <h2 align="center"> 📊 Project Contribution Stats </h2>
  <p align="center">
    <img src="https://img.shields.io/github/issues-pr/{username}/{repo}?style=for-the-badge&logo=github&color=000000&labelColor=333333" />
    <img src="https://img.shields.io/github/contributors/{username}/{repo}?style=for-the-badge&logo=github&color=000000&labelColor=333333" />
    <img src="https://img.shields.io/github/forks/{username}/{repo}?style=for-the-badge&logo=github&color=000000&labelColor=333333" />
    <img src="https://img.shields.io/github/stars/{username}/{repo}?style=for-the-badge&logo=github&color=000000&labelColor=333333" />
  </p>
  
  <h2 align="center"> 📈 Overall Graphical Statistics </h2>
  <p align="center">
    <img height="180em" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=dark&hide_border=true" />
    <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=dark&hide_border=true" />
  </p>
    `,
  },
  {
    id: 'template-9',
    name: 'Template - IX',
    description: 'The Creative Coder: A design-centric layout for developers who prioritize visual storytelling and sleek aesthetics.',
    category: 'portfolio',
    tags: ['design', 'aesthetic', 'creative', 'modern'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 140,
    thumbnail: '/template-9.png',
    created: new Date('2026-01-21'),
    updated: new Date('2026-01-21'),
    featured: true,
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=waving&color=00b4d8&height=180&section=header&text=Creative%20Engineer&fontSize=50&animation=fadeIn" width="100%"/>
      
      <div align="center">
        <h1> ✨ Visualizing Code. Designing Impact. ✨ </h1>
        <p> 🎨 <b>Poster Designer turned Full Stack Developer.</b> I build digital experiences that are as functional as they are beautiful. </p>
      </div>

      ---

      <h2 align="center"> 🖌️ The Design Toolbox</h2>
      <p align="center">
        <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
        <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
        <img src="https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
        <img src="https://img.shields.io/badge/Adobe_Photoshop-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white" />
      </p>

      <h2 align="center">🚀 Flagship Creations</h2>
      <p align="center">
        <a href="https://github.com/{username}/{repo}">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username={username}&repo={repo}&theme=transparent&title_color=00b4d8&text_color=777&icon_color=00b4d8&hide_border=true" width="100%" />
        </a>
      </p>

      ---

      <h2 align="center">📊 Aesthetic Analytics</h2>
      <div align="center">
        <img height="180em" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=transparent&title_color=00b4d8&icon_color=00b4d8&text_color=777&hide_border=true" />
        <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=transparent&title_color=00b4d8&text_color=777&hide_border=true" />
      </div>

      <br/>

      <div align="center">
        <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&bg_color=ffffff&color=00b4d8&line=00b4d8&point=00b4d8&area=true&hide_border=true" width="100%" />
      </div>

      <br/>
      <img src="https://capsule-render.vercel.app/api?type=soft&color=00b4d8&height=60&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-10',
    name: 'Template - X (RPG Edition)',
    description: 'The Gamified Developer: Transform your profile into an RPG-style character sheet with a quest log, inventory, and radar stats.',
    category: 'gamified' as TemplateCategory,
    tags: ['gamified', 'interactive', 'rpg', 'stats'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 150,
    thumbnail: '/template-10.png',
    created: new Date('2026-01-22'),
    updated: new Date('2026-01-22'),
    featured: true,
    markdown: `
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=header&text=Adventurer%20Status&fontSize=40" width="100%"/>

      <div align="center">
        <h1> 🎮 Level 25 Developer: {username} </h1>
        <p> <b>Class:</b> Full Stack Mage | <b>Sub-class:</b> UI/UX Alchemist </p>
      </div>



      <h2 align="center"> 🛡️ Equipped Inventory (Tech Stack)</h2>
      <div align="center">
        <table border="0" cellspacing="10" cellpadding="10" align="center">
          <tr>
            <td align="center"><b>Main Hand</b><br/><img src="https://img.shields.io/badge/React-Blade-61DAFB?style=for-the-badge&logo=react" /></td>
            <td align="center"><b>Off-Hand</b><br/><img src="https://img.shields.io/badge/Node.js-Shield-339933?style=for-the-badge&logo=node.js" /></td>
          </tr>
          <tr>
            <td align="center"><b>Armor</b><br/><img src="https://img.shields.io/badge/Tailwind-Plate-38B2AC?style=for-the-badge&logo=tailwind-css" /></td>
            <td align="center"><b>Accessories</b><br/><img src="https://img.shields.io/badge/Figma-Gem-F24E1E?style=for-the-badge&logo=figma" /></td>
          </tr>
        </table>
      </div>

    

      <h2 align="center"> 📊 Ability Radar (Skill Mapping)</h2>
      <div align="center">
        <img height="250em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=github_dark" />
        <img height="250em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=github_dark" />
      </div>
    <br>
    
      <br>
      <div align="center">
      <h2 align="center"> 📜 Active Quest Log</h2><br>
      - Main Quest: Architecting a scalable MERN microservice. <code>(Progress: 75%)</code><br>
      - Side Quest: Contributing 5 PRs to Open Source projects this month. <code>(Progress: 2/5)</code><br>
      - Daily: Solve 2 LeetCode problems. <code>(Streak: 12 days)</code><br>
      </div>
      <br><br>
    

      <h2 align="center"> 🏆 Achievement Trophies</h2>
      <div align="center">
        <img src="https://github-trophies.vercel.app/?username={username}&theme=dracula&no-bg=true&row=1" />
      </div>

      <img src="https://capsule-render.vercel.app/api?type=soft&color=gradient&height=60&section=footer" width="100%"/>
    `,
  },
 
  {
    id: 'template-11',
    name: 'Template - XI',
    description: 'Animated Template',
    category: 'modern',
    tags: ['animated', 'dynamic', 'aesthetic', 'creative'],
    author: 'README Design Kit',
    version: '1.0.0',
    popularity: 200,
    thumbnail: '/template-11.png',
    created: new Date('2026-01-22'),
    updated: new Date('2026-01-22'),
    featured: true,
    markdown: `
  <img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/d48893bd-0757-481c-8d7e-ba3e163feae7" />

  <div align="center">
    <h2> 𝐇𝐞𝐥𝐥𝐨 𝐭𝐡𝐞𝐫𝐞, 𝐟𝐞𝐥𝐥𝐨𝐰 <𝚍𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛𝚜/>!
    <img src="https://user-images.githubusercontent.com/74038190/214644152-52f47eb3-5e31-4f47-8758-05c9468d5596.gif" width="25"/></h2>
  </div>

  <div align="center">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=F75C7E&width=435&lines=Hello+Developers!;I'm+{username};Welcome+to+my+Profile!" />
  </div>

  <h1><img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="40"/>Tech Stack</h1>

  <p style="display: flex; gap: 20px;">
    <img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="60">
    <img src="https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif" width="60">
    <img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/1a797f46-efe4-41e6-9e75-5303e1bbcbfa" width="80">
    <img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/398b19b1-9aae-4c1f-8bc0-d172a2c08d68" width="80">
    <img src="https://user-images.githubusercontent.com/74038190/212281775-b468df30-4edc-4bf8-a4ee-f52e1aaddc86.gif" width="80">
    <img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="50">
    <img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="60">
  </p>

  <br/>

  <h1> 📊 GitHub Stats </h1>
  <div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username={username}&theme=rose&hide_border=false&include_all_commits=false&count_private=false" />
  <br/>
  <img src="https://nirzak-streak-stats.vercel.app/?user={username}&theme=rose&hide_border=false" />
  </div>

  <h1>🏆 GitHub Trophies </h1>
  <img src="https://github-trophies.vercel.app/?username={username}&theme=dracula" />

  <h1> 📈 Contribution Graph </h1>
  <div align="center">
    <img src="https://ssr-contributions-svg.vercel.app/_/{username}?chart=3dbar&flatten=1&weeks=34&animation=wave&format=svg&gap=0.6&animation_frequency=0.2&animation_amplitude=20&theme=pink" />
  </div>

  <h2>📝 Connect</h2>
  <br> 
  <div align="center">
      <a href="https://github.com/{username}" target="_blank">
          <img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 5px;">
      </a>
      <a href="https://x.com/{username}" target="_blank">
          <img src=https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white alt=twitter style="margin-bottom: 5px;">
      </a>
      <a href="https://linkedin.com/in/{username}" target="_blank">
          <img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;">
      </a>
  </div>
    `,
  },
  {
    id: 'template-12',
    name: 'Template - XII (Bento Portfolio)',
    description: 'Modern Bento Grid: A highly organized, modular layout inspired by premium landing pages.',
    category: 'modern',
    tags: ['bento', 'grid', 'modern', 'clean'],
    author: 'README Design Kit',
    version: '1.1.0',
    popularity: 160,
    thumbnail: '/template-12.png',
    created: new Date('2026-01-22'),
    updated: new Date('2026-01-22'),
    featured: true,
    markdown: `
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=header&text=My Developer%20Bento&fontSize=40" width="100%"/>
  
  <div align="center">
    <table border="0" cellspacing="10" cellpadding="10">
      <tr>
        <td width="55%" rowspan="2" valign="top" align="left" style="border: 1px solid #30363d; border-radius: 10px;">
          <h3 align="left">🚀 About Me</h3>
          I am a <b>3rd-year B.Tech Computer Science student</b> specializing in <b>Data Science</b>. 
          My focus is on building scalable full-stack applications with the <b>MERN stack</b> while exploring <b>Machine Learning</b> models like Decision Trees and SVMs.
        </td>
        <td width="45%" valign="top" align="left" style="border: 1px solid #30363d; border-radius: 10px;">
          <h3 align="left">📍 Location</h3>
          Kolkata, India 
        </td>
      </tr>
      <tr>
        <td valign="top" align="left" style="border: 1px solid #30363d; border-radius: 10px;">
  <h3 align="left">🛠️ Tech Stack</h3>
  <br/>
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <br/>
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" />
  <img src="https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white" />
  <img src="https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white" />
  <img src="https://img.shields.io/badge/r-%23276DC3.svg?style=for-the-badge&logo=r&logoColor=white" />
  
</td>
      </tr>
      <tr>
        <td valign="top" align="left" style="border: 1px solid #30363d; border-radius: 10px;">
          <h3 align="left">🌟 Open Source Contributions</h3>
          • <b>Social Winter of Code (SWOC) '26</b> Contributor<br/>
          • <b>GirlScript Summer of Code (GSSoC) '25</b> Contributor
        </td>
        <td valign="top" align="left" style="border: 1px solid #30363d; border-radius: 10px;">
          <h3 align="left">🎨 Creative Side</h3>
          Passionate about <b>Poster Making</b> and designing visual narratives.
        </td>
      </tr>
      <tr>
        <td colspan="2" valign="top" align="left" style="border: 1px solid #30363d; border-radius: 10px;">
          <h3 align="left">💻 Featured Work</h3>
          <b>Project Ecosta:</b> Finalist at IIIT Kalyani's Status Code 2 Hackathon<br/>
          <b>Feeler:</b> A concept app aimed at promoting mental well-being and emotional stress reduction
        </td>
      </tr>
    </table>
  </div>
  
  <br/>
  
  <div align="center">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=dracula&area=true&hide_border=true&radius=15" width="100%" />
  </div>
  
  <br/>
  
  <div align="center">
    <table width="100%" border="0">
      <tr>
        <td align="center" width="50%">
          <img src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=dracula&hide_border=true" />
        </td>
        <td align="center" width="50%">
          <img height="180em" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=transparent&title_color=00b4d8&icon_color=00b4d8&text_color=777&hide_border=true" />
        </td>
      </tr>
    </table>
  </div>
  <br/>
      <img src="https://capsule-render.vercel.app/api?type=soft&color=gradient&height=60&section=footer" width="100%"/>
      `,
  },
  {
    id: 'template-13',
    name: 'Template - XIII',
    description: 'The Ultimate Productivity Suite: Combines Kanban-style project boards, weekly habit trackers, visual skill progress, and comprehensive analytics.',
    category: 'modern',
    tags: ['productivity', 'modern', 'stats', 'comprehensive', 'clean'],
    author: 'README Design Kit',
    version: '1.2.0',
    popularity: 195,
    thumbnail: '/template-13.png',
    created: new Date('2026-01-25'),
    updated: new Date('2026-01-25'),
    featured: true,
    markdown: `
  <img src="https://capsule-render.vercel.app/api?type=waving&color=bd93f9&height=120&section=header&text=Productivity%20Dashboard&fontSize=40" width="100%"/>

  <div align="center">
    <br/>
    <img src="https://img.shields.io/badge/Current%20Focus-Portfolio%20Optimization-blueviolet?style=for-the-badge&logo=target" />
    <img src="https://img.shields.io/badge/Status-Deep%20Work-success?style=for-the-badge&logo=notion" />
    <img src="https://komarev.com/ghpvc/?username={username}&style=for-the-badge&color=708090" />
    <br/><br/>
  </div>

  <div align="center">
    <table border="0" cellpadding="10" cellspacing="10" width="100%">
      <tr>
        <td width="50%" valign="top" style="border: 1px solid #30363d; border-radius: 12px; background-color: #0d1117;">
          <h3 align="left">🚧 Current Sprint</h3>
          <hr>
          <p><b>• Feature:</b> <code>Refactoring Auth</code></p>
          <p><b>• Bug:</b> <code>Fixing UI Glitch</code></p>
          <p><b>• Learning:</b> <code>System Design</code></p>
        </td>
        <td width="50%" valign="top" style="border: 1px solid #30363d; border-radius: 12px; background-color: #0d1117;">
          <h3 align="left">🛠️ Skill Progress</h3>
          <hr>
          <b>MERN Stack</b> <img src="https://geps.dev/progress/85" alt="85%"/> <br/>
          <b>Data Science</b> <img src="https://geps.dev/progress/70" alt="70%"/> <br/>
          <b>Open Source</b> <img src="https://geps.dev/progress/65" alt="65%"/>
        </td>
      </tr>
      <tr>
        <td width="50%" valign="top" style="border: 1px solid #30363d; border-radius: 12px; background-color: #0d1117;">
          <h3 align="left">🗓️ Weekly Habits</h3>
          <hr>
          <table>
            <tr><td><b>Code</b></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>⬜</td><td>⬜</td><td>⬜</td></tr>
            <tr><td><b>OSS</b></td><td>✅</td><td>✅</td><td>⬜</td><td>⬜</td><td>⬜</td><td>⬜</td><td>⬜</td></tr>
            <tr><td><b>Read</b></td><td>✅</td><td>⬜</td><td>✅</td><td>⬜</td><td>✅</td><td>⬜</td><td>⬜</td></tr>
          </table>
        </td>
        <td width="50%" valign="top" style="border: 1px solid #30363d; border-radius: 12px; background-color: #0d1117;">
          <h3 align="left">📚 The Library</h3>
          <hr>
          <p>📖 <b>Reading:</b> <i>Atomic Habits</i></p>
          <p>🎧 <b>Focus:</b> <a href="#">Lofi Beats 2026</a></p>
          <p>✅ <b>Done:</b> <i>Clean Code</i></p>
        </td>
      </tr>
    </table>
  </div>

  <br/>

  <h2 align="center">📊 Real-Time Analytics</h2>
  <div align="center">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=tokyonight&area=true&hide_border=true&radius=10" width="100%" />
    <br/>
    <img height="175em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=tokyonight&hide_border=true" />
    <img height="175em" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=tokyonight&hide_border=true" />
    <br/>
  </div>

  <br/>

  <div align="center">
    <h3>🔗 Connect & Collaborate</h3>
    <a href="https://linkedin.com/in/{username}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
    <a href="mailto:{username}@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
    <a href="https://twitter.com/{username}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" /></a>
  </div>

  <br/>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=bd93f9&height=90&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-14',
    name: 'Template - XIV (The Social Explorer - Pro)',
    description: 'High-End Bento Dashboard: Features a modular identity grid, live voting leaderboard with automated counters, and a social engagement hub.',
    category: 'portfolio',
    tags: ['bento', 'dashboard', 'interactive', 'creative'],
    author: 'README Design Kit',
    version: '2.0.0',
    popularity: 215,
    thumbnail: '/template-14.png',
    created: new Date('2026-01-25'),
    updated: new Date('2026-01-25'),
    featured: true,
    markdown: `
  <img src="https://capsule-render.vercel.app/api?type=waving&color=FF69B4&height=150&section=header&text=The%20Social%20Explorer&fontSize=45&animation=fadeIn" width="100%"/>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1300&color=FF69B4&width=250&lines=Hello+Explorer!;Welcome+to+my+digital+garden!;Let's+build+something+together!" />
</div>

<div align="center">
  <table border="0" width="100%" cellpadding="10" cellspacing="0">
    <tr>
      <td width="50%" rowspan="2" valign="top" style="border: 1px solid #30363d; border-radius: 15px; background-color: #0d1117;">
         <h3 align="left">🚀 About Me</h3>
         <p align="left">I am a <b>Computer Science Engineer</b> specializing in <b>Data Science</b>. I focus on building scalable web apps with the <b>MERN stack</b> and exploring <b>Machine Learning</b> models.</p>
         <hr style="border: 0.1px solid #30363d;">
         <div align="left">
           <img src="https://img.shields.io/badge/Algorithms-SVM%20|%20k--Means-teal?style=flat-square" />
           <img src="https://img.shields.io/badge/Stack-MERN%20|%20Python-blue?style=flat-square" />
         </div>
      </td>
      <td width="25%" valign="top" align="center" style="border: 1px solid #30363d; border-radius: 15px; background-color: #161b22;">
         <h4>📍 Location</h4>
         <p>Kolkata, India 🇮🇳</p>
      </td>
      <td width="25%" valign="top" align="center" style="border: 1px solid #30363d; border-radius: 15px; background-color: #161b22;">
         <h4>🎓 Status</h4>
         <p>3rd Year CSE-DS</p>
      </td>
    </tr>
    <tr>
      <td colspan="2" valign="top" align="center" style="border: 1px solid #30363d; border-radius: 15px; background-color: #161b22;">
         <h4>❄️ Active Open Source</h4>
         <p><b>SWOC '26</b> Contributor | <b>GSSoC '25</b> Contributor</p>
      </td>
    </tr>
  </table>
</div>

<br/>

<div align="center">
  <div style="border: 1px solid #30363d; border-radius: 15px; background-color: #0d1117; padding: 20px; width: 90%; margin-bottom: 20px;">
    <h2 align="center" style="margin-top: 0;">🤝 Join the Community Pulse</h2>
    <p align="center">Help shape this profile! What should I prioritize this month?</p>
    <div align="center">
      <a href="https://github.com/{username}/{repo}/issues/new?title=Word+Cloud+Contribution&body=I+suggest+adding:+">
        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=radical&hide_border=true" width="100%" />
      </a>
    </div>
  </div>
</div>

<div align="center">
  <div style="border: 1px solid #30363d; border-radius: 15px; background-color: #0d1117; padding: 20px; width: 90%; margin-bottom: 20px;">
      <h3 align="center" style="margin-top: 0;">🎨 Creative Pulse</h3>
      <p align="center">Designing: <b>Poster Series '26</b></p>
      <hr style="border: 0.1px solid #30363d; width: 50%;">
      <h3 align="center">✍️ Guestbook</h3>
      <p align="center">Sign the <a href="https://github.com/{username}/{repo}/issues/new?title=Guestbook+Entry&labels=guestbook"><b>Guestbook</b></a>!</p>
  </div>
</div>
      

<hr style="border: 0.1px solid #30363d;">

<div align="center">
  <h3>🌍 What should I build next? 🛠️</h3>
  <p>Every vote creates an issue in this repo—your voice matters!</p>
  <table border="0" cellpadding="8" width="90%">
    <tr style="background-color: #161b22;">
      <td align="left"><b>AI Image Generator</b></td>
      <td align="center">
        <a href="https://github.com/{username}/{repo}/issues/new?title=Vote:+AI+Image+Generator&labels=vote:ai-gen">
          <img src="https://img.shields.io/badge/VOTE-red?style=for-the-badge&logo=openai" />
        </a>
      </td>
      <td align="center">
        <img src="https://img.shields.io/github/issues-search/{username}/{repo}?query=label%3A%22vote%3Aai-gen%22&label=Count&color=red&style=for-the-badge" />
      </td>
    </tr>
    <tr style="background-color: #0d1117;">
      <td align="left"><b>Bento UI Kit</b></td>
      <td align="center">
        <a href="https://github.com/{username}/{repo}/issues/new?title=Vote:+Bento+UI+Kit&labels=vote:bento-ui">
          <img src="https://img.shields.io/badge/VOTE-blue?style=for-the-badge&logo=react" />
        </a>
      </td>
      <td align="center">
        <img src="https://img.shields.io/github/issues-search/{username}/{repo}?query=label%3A%22vote%3Abento-ui%22&label=Count&color=blue&style=for-the-badge" />
      </td>
    </tr>
    <tr style="background-color: #161b22;">
      <td align="left"><b>Web3 Portfolio</b></td>
      <td align="center">
        <a href="https://github.com/{username}/{repo}/issues/new?title=Vote:+Web3+Portfolio&labels=vote:web3">
          <img src="https://img.shields.io/badge/VOTE-green?style=for-the-badge&logo=ethereum" />
        </a>
      </td>
      <td align="center">
        <img src="https://img.shields.io/github/issues-search/{username}/{repo}?query=label%3A%22vote%3Aweb3%22&label=Count&color=green&style=for-the-badge" />
      </td>
    </tr>
  </table>
</div>

<br/>

<h2 align="center">📊 Data Insights</h2>
<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=radical&area=true&hide_border=true&radius=15" width="100%" />
  <br/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=radical&hide_border=true" />
</div>

<br/>

<h3 align="center">🏆 Achievements</h3>
<div align="center">
  <img src="https://github-trophies.vercel.app/?username={username}&theme=radical&no-bg=true&row=1" />
</div>
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=FF69B4&height=100&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-15',
    name: 'Template - XV',
    description: 'A premium, high-energy dashboard featuring dynamic waving headers, interactive contribution snakes, and a modular project matrix.',
    category: 'portfolio',
    tags: ['neon', 'bento', 'animated', 'pro'],
    author: 'README Design Kit',
    version: '3.0.0',
    popularity: 0,
    thumbnail: '/template-15.png',
    created: new Date('2026-01-26'),
    updated: new Date('2026-01-26'),
    featured: true,
    markdown: `
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00FFD1&height=220&section=header&text=%20My%20Developer%20Journey&fontSize=60&animation=fadeIn&fontAlignY=35" width="100%" />
</p>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=00FFD1&center=true&vCenter=true&width=600&lines=Hi, I'm {username};Full+Stack+Developer+(MERN);Data+Science+Enthusiast;Open+Source+Contributor" alt="Typing SVG" />
</div>

<br/>

<table border="0" width="100%" cellpadding="10">
  <tr>
    <td width="65%" valign="top">
      <h2>🚀 About Me</h2>
      <p>I am a <b>Computer Science Engineer</b> specializing in <b>Data Science</b>. Currently in my <b>3rd Year (CSE-DS)</b>, I build scalable web applications while exploring machine learning frontiers.</p>
      <hr style="border: 0.1px solid #30363d;">
      <div align="left">
        <img src="https://img.shields.io/badge/📍%20Location-Kolkata%2C%20India-00FFD1?style=flat-square&logoColor=black" />
        <img src="https://img.shields.io/badge/❄️%20SWOC%20'26-Contributor-blue?style=flat-square" />
        <img src="https://img.shields.io/badge/☀️%20GSSoC%20'25-Contributor-orange?style=flat-square" />
      </div>
      <p><b>Core Focus:</b> SVM, k-Means Clustering, and MERN Stack optimization.</p>
    </td>
    <td width="35%" align="center" valign="middle">
      <img src="https://media1.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" width="100%" style="border-radius: 20px; border: 3px solid #00FFD1;" />
    </td>
  </tr>
</table>

<br/>

<h3 align="center">💻 Tech-Stack Matrix</h3>
<div align="center">
  <table border="0">
    <tr>
      <td align="center"><b>Languages</b></td>
      <td align="center"><b>Technologies</b></td>
    </tr>
    <tr>
      <td>
        <img src="https://img.shields.io/badge/-Python-000?&logo=Python" />
        <img src="https://img.shields.io/badge/-JavaScript-000?&logo=JavaScript" />
        <img src="https://img.shields.io/badge/-Java-000?&logo=Java&logoColor=007396" />
        <img src="https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/-React-000?&logo=React" />
        <img src="https://img.shields.io/badge/-Node.js-000?&logo=node.js" />
        <img src="https://img.shields.io/badge/-Docker-000?&logo=Docker" />
        <img src="https://img.shields.io/badge/-PyTorch-000?&logo=PyTorch" />
      </td>
    </tr>
  </table>
</div>

<br/>

<h3 align="center">🏗️ Featured Projects</h3>
<div align="center">
  <table border="0" cellpadding="10" width="100%">
    <tr style="background-color: #161b22;">
      <td align="left"><b>🪕 Parampara</b></td>
      <td align="center">Rural Heritage & Tourism Platform</td>
      <td align="center"><img src="https://img.shields.io/badge/Status-🚀%20Live-brightgreen" /></td>
    </tr>
    <tr style="background-color: #0d1117;">
      <td align="left"><b>🌿 Ecosta</b></td>
      <td align="center">Wildlife Track & ML Analysis</td>
      <td align="center"><img src="https://img.shields.io/badge/Status-✅%20Stable-blue" /></td>
    </tr>
    <tr style="background-color: #161b22;">
      <td align="left"><b>🧠 Feeler</b></td>
      <td align="center">Mental Health App Concept</td>
      <td align="center"><img src="https://img.shields.io/badge/Status-🛠️%20In--Dev-orange" /></td>
    </tr>
  </table>
</div>

<br/>

<h3 align="center">📊 Growth & Analytics</h3>
<div align="center">
  <img height="180px" src="https://github-readme-stats.vercel.app/api?username={username}&hide_title=true&hide_border=true&show_icons=true&include_all_commits=true&count_private=true&line_height=21&text_color=00FFD1&icon_color=00FFD1&bg_color=0,000000,161b22&theme=dark" />
  <img height="180px" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&hide=html&hide_title=true&hide_border=true&layout=compact&langs_count=6&text_color=00FFD1&icon_color=fff&bg_color=0,000000,161b22&theme=dark" />
</div>

<br/>
<h3 align="center">🏆 Achievements</h3>
<div align="center">
  <img src="https://github-trophies.vercel.app/?username={username}&theme=radical&no-bg=true&row=1" />
</div>

<br/>
<hr style="border: 0.1px solid #00FFD1;">

<div align="center">
  <i>"Keep coding until the keyboard catches fire." 🔥</i>
</div>
    `,
  },
  {
    id: 'template-16',
    name: 'Template - XVI',
    description: 'A fully centered 80s/90s CLI interface featuring ASCII branding, system loading bars, and a live-tail contribution log.',
    category: 'portfolio',
    tags: ['retro', 'terminal', 'centered', 'pro'],
    author: 'README Design Kit',
    version: '3.1.0',
    popularity: 25,
    thumbnail: '/template-16.png',
    created: new Date('2026-01-26'),
    updated: new Date('2026-01-26'),
    featured: true,
    markdown: `
<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=4AF626&center=true&vCenter=true&width=500&lines=root@pritha:~%24+ssh+visitor%40github;Access+Granted...;Welcome+to+The+Ultimate+Terminal" alt="Typing SVG" />

\`\`\`bash
  _____      _ _   _             _____       _ 
 |  __ \\    (_) | | |           |  __ \\     | |
 | |__) | __ _| |_| |__   __ _  | |__) |__ _| |
 |  ___/ '__| | __| '_ \\ / _\` | |  ___/ _\` | |
 | |   | |  | | |_| | | | (_| | | |  | (_| | |
 |_|   |_|  |_|\\__|_| |_|\\__,_| |_|   \\__,_|_|
\`\`\`

### # Neofetch - System Information
**USER** : pritha_pal
<br/>**OS** : Engineering_Student_v3.0 (3rd Year)
<br/>**HOST** : CSE-DS_High_Performance_Cluster
<br/>**LOCATION** : Kolkata, West Bengal, India 🇮🇳
<br/>**SHELL** : /bin/bash (MERN Stack + Data Science)
<br/>**CPU** : ML Core (SVM | KNN | K-Means | PCA)
<br/>**UPTIME** : 6 Semesters and counting...


---

### 🛠️ system_profiler --skills

<table border="0" width="80%">
  <tr>
    <td align="center">
      <b>Proficiency Bars</b><br/>
      MERN Stack<br/>
      \`██████████████████▒▒▒\` 85%<br/>
      Data Science<br/>
      \`██████████████▒▒▒▒▒▒▒\` 70%<br/>
      Java / OOP<br/>
      \`████████████████▒▒▒▒▒\` 80%<br/>
      Design<br/>
      \`███████████████████▒▒\` 90%
    </td>
  </tr>
</table>

<br/>

### 📂 ls -R ~/active_projects/

[**parampara/**](https://github.com/Pri-21-coder/parampara) — <br/>Rural heritage & tourism platform<br/>
[**stayo/**](https://github.com/Pri-21-coder/stayo) — <br/>Interactive Airbnb-style clone<br/>

---

### ⚙️ ls -la ./skills/

\`\`\`javascript
const skills = {
  "languages": ["Python", "JS", "Java"], //
  "web":       ["React", "Node", "Express"], //
  "tools":     ["Docker", "AWS", "EJS"] //
}
\`\`\`

---

### 📈 monitor --analytics (VERBOSE)

<table border="0">
  <tr>
    <td>
      <img height="180px" src="https://github-readme-stats.vercel.app/api?username={username}&hide_title=true&hide_border=true&show_icons=true&include_all_commits=true&count_private=true&line_height=21&text_color=00FFD1&icon_color=00FFD1&bg_color=0,000000,161b22&theme=dark" />
    </td>
    <td>
      <img height="180px" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&hide=html&hide_title=true&layout=compact&langs_count=6&hide_border=true&text_color=00FFD1&icon_color=00FFD1&bg_color=0,000000,161b22" />
    </td>
  </tr>
</table>

<br/>

<img src="https://github-trophies.vercel.app/?username={username}&theme=terminal&no-bg=true&row=1" />

---

### 💬 tail -f ~/contributions.log

✨ **Social Winter of Code Season 6** - Selected Contributor<br/>
🏅 **GSSoC '25** - Open Source Contributor<br/>
🏆 **Status Code 2** - Hackathon Participant (IIIT Kalyani)<br/>
🚀 **DevFest Kolkata** - Attendee & Learner<br/>

<br/>

<table border="0" width="100%">
  <tr>
    <td align="center">
      <code>pritha@github:~$ sudo rm -rf /bugs</code><br/>
      <code>[SUCCESS] Workspace cleared.</code><br/><br/>
      <img src="https://media1.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" width="180" style="border-radius: 15px; border: 2px solid #4AF626;" />
    </td>
  </tr>
</table>

<hr style="border: 0.1px solid #4AF626; width: 50%;">
<i>"Keep coding until the keyboard catches fire." 🔥</i>

</div>
    `,
  },
  {
    id: 'template-17',
    name: 'Template - XVII',
    description: 'A premium, fully-centered hybrid RPG character sheet and vertical career roadmap with a Gold & Cyan color theme.',
    category: 'portfolio',
    tags: ['rpg', 'gamified', 'timeline', 'centered', 'pro'],
    author: 'README Design Kit',
    version: '2.0.0',
    popularity: 75,
    thumbnail: '/template-17.png',
    created: new Date('2026-01-26'),
    updated: new Date('2026-01-26'),
    featured: true,
    markdown: `
<div align="center">

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=FFD700&height=220&section=header&text=The %20Achievement %20Hunter&fontSize=65&animation=fadeIn&fontAlignY=35" width="100%" />


<br/>

<img src="https://img.shields.io/badge/Level-3-FFD700?style=for-the-badge&logo=gamedeveloper&logoColor=black" />
<br/>
**3rd Year Computer Science Engineer | Data Science Specialization**
<br/>
📍 **Kolkata, West Bengal, India**

<br/>

---

### 📊 Base Stats (XP Progress)

**MERN Stack Mastery**
<br/>
\`██████████████████▒▒▒\` 85%
<br/>
*(Focus: Scalable Web Apps & Full-stack Architecture)*

<br/>

**Data Science Core**
<br/>
\`██████████████▒▒▒▒▒▒▒\` 70%
<br/>
*(Focus: SVM, KNN, & K-Means Clustering)*

<br/>

---

### 🗺️ The Explorer's Path (Career Branch)

**2023 — 2024**
<br/>
○
<br/>
|
<br/>
**Foundational Years in CSE**
<br/>
*Built core logic in Java & C++*

<br/>

**August 2025**
<br/>
○
<br/>
|
<br/>
**Status Code 2 Hackathon (IIIT Kalyani)**
<br/>
*Deployed **Ecosta** — Wildlife Track & ML Project*

<br/>

**September 2025**
<br/>
○
<br/>
|
<br/>
**GirlScript Summer of Code '25**
<br/>
*Selected Open Source Contributor*

<br/>

**Current (2026)**
<br/>
●
<br/>
▼
<br/>
**Social Winter of Code (SWOC) Season 6**
<br/>
*Continuing the Open Source Streak*

<br/>

---

### 🎒 Inventory (Tech Slot)

<br/>

<img src="https://img.shields.io/badge/Main_Weapon-Python-FFD700?style=flat-square&logo=python&logoColor=black" />
<img src="https://img.shields.io/badge/Secondary-JavaScript-00FFD1?style=flat-square&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Utility-Java-FFD700?style=flat-square&logo=java&logoColor=black" />

<br/>

<img src="https://img.shields.io/badge/Shield-React-00FFD1?style=flat-square&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Armor-Node.js-FFD700?style=flat-square&logo=node.js&logoColor=black" />
<img src="https://img.shields.io/badge/Storage-MongoDB-00FFD1?style=flat-square&logo=mongodb&logoColor=black" />

<br/>

---

### 📜 Current Quests (Active Projects)

**Quest: Cultural Preservation**
<br/>
[**Project Parampara**](https://github.com/Pri-21-coder/parampara)
<br/>
*Status: Bridging urban progress with rural heritage*

<br/>

**Quest: Global Hospitality**
<br/>
[**Stayo**](https://github.com/Pri-21-coder/stayo)
<br/>
*Status: Interactive Airbnb-style marketplace clone*

<br/>

---

### 🎨 Creative Junctions (Side Skills)

**Poster Making & Visual Design**
<br/>
*Branching out into UI/UX & Graphic Layouts*

<br/>

---

### 📈 System Performance 

<table border="0">
  <tr>
    <td>
      <img height="180px" src="https://github-readme-stats.vercel.app/api?username={username}&hide_title=true&hide_border=true&show_icons=true&include_all_commits=true&count_private=true&line_height=21&text_color=00FFD1&icon_color=00FFD1&bg_color=0,000000,161b22&theme=dark" />
    </td>
    <td>
      <img height="180px" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&hide=html&hide_title=true&layout=compact&langs_count=6&hide_border=true&text_color=FFD700&icon_color=FFD700&bg_color=0,000000,161b22" />
    </td>
  </tr>
</table>

<br/>

---

### 🏆 Achievement Trophy Room

<br/>

<img src="https://github-trophies.vercel.app/?username={username}&theme=radical&no-bg=true&row=1" />

<br/>

---

### 🎯 Future Focus (The Ultimate Goal)

**Achieving MERN Stack Mastery & Advanced AI Implementation**

<br/>


<i>"Designing with purpose, leveling up with code."</i>

<br/>

</div>
<img src="https://capsule-render.vercel.app/api?type=waving&color=FFD700&height=100&section=footer" width="100%"/>
    `,
  },
  {
    id: 'template-18',
    name: 'Template - XVIII',
    description: 'An Animated Template.',
    category: 'modern',
    tags: ['animated', 'dynamic', 'aesthetic'],
    author: 'README Design Kit',
    version: '2.0.0',
    popularity: 75,
    thumbnail: '/template-18.png',
    created: new Date('2026-01-27'),
    updated: new Date('2026-01-27'),
    featured: true,
    markdown: `<p align="center">
      <img src="https://readme-typing-svg.herokuapp.com/?lines=Hello,+There!+👋;This+is+{username}....;Welcome+to+my+profile!&center=true&size=30">
    </p>
    <p align="center">
      <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&center=true&vCenter=true&width=440&height=45&lines=Full-stack+Web+and+App+developer;Experienced+UI%2FUX+Designer;Always+Learning+new+things" />
    </p>
    <p align="center">
      <a href="https://www.linkedin.com/in/{username}"><img src="https://user-images.githubusercontent.com/74038190/235294012-0a55e343-37ad-4b0f-924f-c8431d9d2483.gif" width="50px"></a>
      &#8287;&#8287;&#8287;&#8287;&#8287;
      <a href="https://x.com/{username}"><img width="50px" alt="Twitter" title="Twitter" src="https://user-images.githubusercontent.com/74038190/235294011-b8074c31-9097-4a65-a594-4151b58743a8.gif"/></a>
    </p>
    <div align="center">
      <img src="https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif" />
    </div>
    <details> 
      <summary><h2>🛠️ My Favorite Tools</h2></summary>
      <h3>👨‍💻 Programming and Markup Languages</h3>
      <p>
          <img alt="MIPS Assembly" src="https://custom-icon-badges.demolab.com/badge/Assembly-525252.svg?logo=asm-hex&logoColor=white">
          <img alt="Bash" src="https://img.shields.io/badge/Bash-121011.svg?logo=gnu-bash&logoColor=white">
          <img alt="C" src="https://custom-icon-badges.demolab.com/badge/C-03599C.svg?logo=c-in-hexagon&logoColor=white">
          <img alt="C++" src="https://custom-icon-badges.demolab.com/badge/C++-9C033A.svg?logo=cpp2&logoColor=white">
          <img alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-68217A.svg?logo=cs2&logoColor=white">
          <img alt="Ceylon" src="https://custom-icon-badges.demolab.com/badge/Ceylon-E39842.svg?logo=ceylon&logoColor=white">
          <img alt="CSS" src="https://img.shields.io/badge/CSS-1572B6.svg?logo=css3&logoColor=white">
          <img alt="Google Apps Script" src="https://custom-icon-badges.demolab.com/badge/Google%20Apps%20Script-02569B.svg?logo=gs&logoColor=white">
          <img alt="Groovy" src="https://custom-icon-badges.demolab.com/badge/Groovy-4298B8.svg?logo=apachegroovy&logoColor=white">
          <img alt="HTML" src="https://img.shields.io/badge/HTML-E34F26.svg?logo=html5&logoColor=white">
          <img alt="Java" src="https://custom-icon-badges.demolab.com/badge/Java-007396.svg?logo=java&logoColor=white">
          <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?logo=javascript&logoColor=black">
          <img alt="LaTeX" src="https://img.shields.io/badge/LaTeX-008080.svg?logo=LaTeX&logoColor=white">
          <img alt="Markdown" src="https://img.shields.io/badge/Markdown-000000.svg?logo=markdown&logoColor=white">
          <img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D.svg?logo=node.js&logoColor=white">
          <img alt="PHP" src="https://img.shields.io/badge/PHP-777BB4.svg?logo=php&logoColor=white">
          <img alt="Prolog" src="https://custom-icon-badges.demolab.com/badge/Prolog-E61B23.svg?logo=swi-prolog&logoColor=white">
          <img alt="Python" src="https://img.shields.io/badge/Python-14354C.svg?logo=python&logoColor=white">
          <img alt="R" src="https://img.shields.io/badge/R-276DC3.svg?logo=r&logoColor=white">
          <img alt="Restructured Text" src="https://img.shields.io/badge/Restructured Text-3a4148.svg?logo=readthedocs&logoColor=white">
          <img alt="Scratch" src="https://img.shields.io/badge/Scratch-4D97FF.svg?logo=scratch&logoColor=white">
          <img alt="SQL" src="https://custom-icon-badges.demolab.com/badge/SQL-025E8C.svg?logo=database&logoColor=white">
          <img alt="SVG+XML" src="https://img.shields.io/badge/SVG%2BXML-e0982c.svg?logo=svg&logoColor=white">
          <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white">
      </p>
      <h3>🧰 Frameworks and Libraries</h3>
      <p>
          <img alt="Arduino" src="https://img.shields.io/badge/-Arduino-00979D?logo=Arduino&logoColor=white">
          <img alt="BlissfulJS" src="https://custom-icon-badges.demolab.com/badge/Bliss.js-3dacc2.svg?logo=bliss&logoColor=white">
          <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-7952B3.svg?logo=bootstrap&logoColor=white">
          <img alt="Cordova" src="https://img.shields.io/badge/-Cordova-E8E8E8?logo=apache-cordova&logoColor=black">
          <img alt="Discord.py" src="https://custom-icon-badges.demolab.com/badge/Discord.py-0d1620.svg?logo=dpy">
          <img alt="Electron" src="https://img.shields.io/badge/Electron-20232e.svg?logo=electron&logoColor=white">
          <img alt="Express.js" src="https://img.shields.io/badge/Express.js-404d59.svg?logo=express&logoColor=white">
          <img alt="Flask" src="https://img.shields.io/badge/Flask-000000.svg?logo=flask&logoColor=white">
          <img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub%20Actions-2671E5.svg?logo=github%20actions&logoColor=white">
          <img alt="Gunicorn" src="https://img.shields.io/badge/-Gunicorn-499848.svg?logo=gunicorn&logoColor=white">
          <img alt="JUnit" src="https://custom-icon-badges.demolab.com/badge/JUnit-25A162.svg?logo=check-circle&logoColor=white">
          <img alt="Material Design" src="https://img.shields.io/badge/Material%20Design-0081CB.svg?logo=material-design&logoColor=white">
          <img alt="Nextcord" src="https://custom-icon-badges.demolab.com/badge/Nextcord-0d1620.svg?logo=nextcord">
          <img alt="NumPy" src="https://img.shields.io/badge/Numpy-013243.svg?logo=numpy&logoColor=white">
          <img alt="Pandas" src="https://img.shields.io/badge/Pandas-150458.svg?logo=pandas&logoColor=white">
          <img alt="PHPUnit" src="https://custom-icon-badges.demolab.com/badge/PHPUnit-366488.svg?logo=test-tube&logoColor=white">
          <img alt="Praw" src="https://custom-icon-badges.demolab.com/badge/Praw-ff3c0c.svg?logo=praw">
          <img alt="Pytest" src="https://img.shields.io/badge/Pytest-0A9EDC.svg?logo=pytest&logoColor=white">
          <img alt="React" src="https://img.shields.io/badge/React-20232a.svg?logo=react&logoColor=%2361DAFB">
          <img alt="Slim" src="https://custom-icon-badges.demolab.com/badge/Slim-74a045.svg?logo=slim-php">
          <img alt="Symfony" src="https://img.shields.io/badge/Symfony-111111.svg?logo=symfony&logoColor=white">
          <img alt="SymPy" src="https://img.shields.io/badge/Sympy-3B5526.svg?logo=sympy&logoColor=white">
          <img alt="TensorFlow" src="https://img.shields.io/badge/TensorFlow-FF6F00.svg?logo=TensorFlow&logoColor=white">
          <img alt="Wordpress" src="https://img.shields.io/badge/Wordpress-21759B?logo=wordpress&logoColor=white">
          <img alt="WPF (.Net)" src="https://img.shields.io/badge/WPF-5C2D91?logo=.net&logoColor=white">
      </p>
      <h3>🗄️ Databases and Cloud Hosting</h3>
      <p>
          <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-327FC7.svg?logo=github&logoColor=white">
          <img alt="Heroku" src="https://img.shields.io/badge/Heroku-430098.svg?logo=heroku&logoColor=white">
          <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-4ea94b.svg?logo=mongodb&logoColor=white">
          <img alt="MySQL" src="https://img.shields.io/badge/MySQL-00f.svg?logo=mysql&logoColor=white">
          <img alt="Notion" src="https://img.shields.io/badge/Notion-010101.svg?logo=notion&logoColor=white">
          <img alt="Oracle" src ="https://img.shields.io/badge/Oracle-F00000.svg?logo=oracle&logoColor=white">
          <img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-316192.svg?logo=postgresql&logoColor=white">
          <img alt="Render" src="https://img.shields.io/badge/Render-00979D.svg?logo=render&logoColor=white">
          <img alt="Repl.it" src="https://img.shields.io/badge/Repl.it-0D101E.svg?logo=Replit&logoColor=white">
          <img alt="SQLite" src ="https://img.shields.io/badge/SQLite-07405e.svg?logo=sqlite&logoColor=white">
          <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000.svg?logo=vercel&logoColor=white">
      </p>
      <h3>💻 Software and Tools</h3>
      <p>
          <img alt="Adobe" src="https://img.shields.io/badge/Adobe-FF0000.svg?logo=adobe&logoColor=white">
          <img alt="Android" src="https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white">
          <img alt="Android Studio" src="https://img.shields.io/badge/Android%20Studio-008678.svg?logo=android-studio&logoColor=white">
          <img alt="Arch Linux" src="https://img.shields.io/badge/Arch%20Linux-1793D1.svg?logo=arch-linux&logoColor=white">
          <img alt="Audacity" src="https://img.shields.io/badge/-Audacity-0000CC?logo=audacity&logoColor=white">
          <img alt="Bitwarden" src="https://img.shields.io/badge/-Bitwarden-175DDC?logo=bitwarden&logoColor=white">
          <img alt="Brave" src="https://img.shields.io/badge/-Brave-FB542B?logo=brave&logoColor=white">
          <img alt="Construct 3" src="https://img.shields.io/badge/Construct%203-00b56a.svg?logo=construct-3&logoColor=white">
          <img alt="Dark Reader" src="https://img.shields.io/badge/-Dark%20Reader-141E24?logo=dark-reader&logoColor=white">
          <img alt="Dbeaver" src="https://custom-icon-badges.demolab.com/badge/-Dbeaver-372923?logo=dbeaver-mono&logoColor=white">
          <img alt="Discord" src="https://img.shields.io/badge/-Discord-5865F2.svg?logo=discord&logoColor=white">
          <img alt="Git" src="https://img.shields.io/badge/Git-F05033.svg?logo=git&logoColor=white">
          <img alt="GitHub Desktop" src="https://img.shields.io/badge/GitHub%20Desktop-8034A9.svg?logo=github&logoColor=white">
          <img alt="Google Sheets" src="https://img.shields.io/badge/Sheets-34A853.svg?logo=google%20sheets&logoColor=white">
          <img alt="Inkscape" src="https://img.shields.io/badge/Inkscape-000000?logo=Inkscape&logoColor=white">
          <img alt="Jupyter" src="https://img.shields.io/badge/Jupyter-F37626.svg?logo=Jupyter&logoColor=white">
          <img alt="OBS Studio" src="https://img.shields.io/badge/-OBS-302E31?logo=obs-studio&logoColor=white">
          <img alt="Photopea" src="https://img.shields.io/badge/Photopea-18A497?logo=photopea&logoColor=white">
          <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white">
          <img alt="SonarLint" src="https://img.shields.io/badge/-SonarLint-CB2029?logo=sonarlint&logoColor=white">
          <img alt="Stack Overflow" src="https://img.shields.io/badge/-Stack%20Overflow-FE7A16?logo=stack-overflow&logoColor=white">
          <img alt="Visual Studio Code" src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?logo=visual-studio-code&logoColor=white">
      </p>
    </details>
    <details> 
      <summary><h2>📊 Stats and Activity</h2></summary>
      <h3>🔥 Streak Stats</h3>
      <p>
        <img alt="{username}'s streak" src="https://github-readme-streak-stats-eight.vercel.app/?user={username}&theme=react&hide_border=true&short_numbers=true"/>
      </p>
      <h3>💻 GitHub Profile Stats</h3>
      <img alt="{username}'s Github Stats" src="https://denvercoder1-github-readme-stats.vercel.app/api/?username={username}&show_icons=true&include_all_commits=true&count_private=true&theme=react&hide_border=true&bg_color=1F222E" height="192px"/>
      <img alt="{username}'s Top Languages" src="https://denvercoder1-github-readme-stats.vercel.app/api/top-langs/?username={username}&langs_count=8&layout=compact&theme=react&hide_border=true&bg_color=1F222E&hide=Jupyter%20Notebook,Roff" height="192px"/></a>
      <br/>
      <img alt="{username}'s Activity Graph" src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=react-dark&hide_border=false" />
    </details>
    <h2>🏆 Achievements</h2>
    <div align="center">
      <img src="https://github-trophies.vercel.app/?username={username}" />
    </div>
    `,

  },

  {

    id: 'template-19',
    name: 'Template - XIX',
    description: 'A premium, high-contrast layout that frames the developer as an architect of digital systems. Features a "Blueprint" tech stack and a "Construction Board" for active projects.',
    category: 'professional',
    tags: ['architect', 'premium', 'clean', 'detailed', 'structured'],
    author: 'README Design Kit',
    version: '1.1.0',
    popularity: 110,
    thumbnail: '/template-19.png',
    created: new Date('2026-01-28'),
    updated: new Date('2026-01-28'),
    featured: true,
    markdown: `
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=FF69B4&height=220&section=header&text=DIGITAL%20ARCHITECT&fontSize=75&fontAlignY=40&animation=fadeIn" width="100%" />
  <br/>
  <h2> 🏗️ Principal Architect: {username} </h2>
  <p><b>Computer Science Engineer | AI & ML Specialization</b></p>
  <p><i>Architecting scalable digital systems with logic and aesthetic precision.</i></p>
  <p>
    <a href="https://linkedin.com/in/mayurpagote"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
    &nbsp;
    <a href="https://github.com/{username}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /></a>
  </p>
</div>
<hr />
<h3 align="center"> 📐 Technical Blueprints (The Stack) </h3>
<div align="center">
  <table border="0">
    <tr>
      <td width="300" valign="top" align="center">
        <h4> 🧱 Foundations </h4>
        <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" /><br/>
        <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" /><br/>
        <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" /><br/>
        <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=java&logoColor=white" />
      </td>
      <td width="300" valign="top" align="center">
        <h4> 🎨 Interface </h4>
        <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" /><br/>
        <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" /><br/>
        <img src="https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=black" /><br/>
        <img src="https://img.shields.io/badge/UI/UX_Design-FF61F6?style=flat-square&logo=figma&logoColor=white" />
      </td>
      <td width="300" valign="top" align="center">
        <h4> 🧠 Intelligence </h4>
        <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" /><br/>
        <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white" /><br/>
        <img src="https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white" /><br/>
        <img src="https://img.shields.io/badge/ML_Algorithms-teal?style=flat-square" />
      </td>
    </tr>
  </table>
</div>
<hr />
<h3 align="center"> 🏗️ Active Construction (Project Board) </h3>
<div align="center">
  <table border="0">
    <tr style="background-color: #161b22;">
      <th align="left"> Project </th>
      <th align="center"> Blueprint Type </th>
      <th align="right"> Current Phase </th>
    </tr>
    <tr>
      <td align="left"> 🏰 <b>[Solar_System](https://github.com/{username}/Solar_System)</b> </td>
      <td align="center"> <i>Community Infra</i> </td>
      <td align="right"> <img src="https://img.shields.io/badge/Phase-Auth_&_UI-blueviolet" /> </td>
    </tr>
    <tr>
      <td align="left"> 🏠 <b>[README_Design_Kit](https://github.com/{username}/README_Design_Kit)</b> </td>
      <td align="center"> <i>Marketplace Arc</i> </td>
      <td align="right"> <img src="https://img.shields.io/badge/Phase-Refining_Clone-blue" /> </td>
    </tr>
    <tr>
      <td align="left"> 💵 <b>[Currency_Converter](https://github.com/{username}/Currency_Converter)</b> </td>
      <td align="center"> <i>ML Analysis</i> </td>
      <td align="right"> <img src="https://img.shields.io/badge/Phase-Finalist_Build-brightgreen" /> </td>
    </tr>
  </table>
</div>
<hr />
<h3 align="center"> 📊 System Performance (Analytics) </h3>
<div align="center">
  <img height="180px" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=dark&hide_border=true&title_color=58a6ff&icon_color=58a6ff" />
  <img height="180px" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=dark&hide_border=true&title_color=58a6ff" />
</div>
<br/>
<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=github-dark&area=true&hide_border=true&radius=10" width="100%" />
</div>
<hr />
<h3 align="center"> 🏅 Certified Contributions </h3>
<div align="center">
  <p>
    Selected Contributor: <b>Social Winter of Code (SWOC) Season 6</b> ⭐
    <br/>
    Open Source Contributor: <b>GirlScript Summer of Code (GSSoC) 2025</b> ⭐
    <br/>
    Finalist: <b>"Status Code 2" Hackathon by IIIT Kalyani (Project Ecosta)</b> 🏆
  </p>
  <br/>
  <div align="center">
    <img alt="Live System Visualization" src="https://raw.githubusercontent.com/rahul-jha98/rahul-jha98/main/techstack.gif" width="95%" style="border-radius: 10px; border: 2px solid #30363d;" />
  </div>
  <i>"Building the future, one commit at a time."</i>
  <br/><br/>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=FF69B4&height=60&section=footer" width="100%"/>
</div>
    `,
  },
  {
    id: 'template-20',
    name: 'Template - XX',
    description: 'A premium, centered terminal dashboard. Features large-scale bold headers, a centralized git graph, and organized tech-stack modules.',
    category: 'professional',
    tags: ['terminal', 'git-flow', 'centered', 'bold', 'premium'],
    author: 'README Design Kit',
    version: '4.0.0',
    popularity: 650,
    thumbnail: '/template-20.png',
    created: new Date('2026-01-28'),
    updated: new Date('2026-01-28'),
    featured: true,
    markdown: `
  <div align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=0d1117&height=200&section=header&text=GIT%20FLOW%20v4.0&fontSize=80&fontColor=4AF626&animation=fadeIn" width="100%" />
  
    <br/>
  
    <h1> ⚙️ $ git config --list --global </h1>
    
    <p align="center">
      <b>USER:</b> Mayur Pagote <br/>
      <b>ROLE:</b> Project Admin at Social Winter of Code <br/>
      <b>STACK:</b> Full-Stack (MERN) 
    </p>
  
    <hr width="50%" />
  
    <h1> 🌐 $ git remote -v </h1>
    
    <p align="center">
      <b>ORIGIN:</b> mayur.s.pagote@gmail.com <br/>
      <b>UPSTREAM:</b> github.com/Mayur-Pagote <br/>
      <b>HOST:</b> Kolkata, West Bengal, India <br/>
      <br/>
      <a href="https://linkedin.com/in/mayurpagote"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
      &nbsp;
      <a href="https://github.com/{username}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /></a>
    </p>
  
    <hr width="50%" />
  
    <h1> 🌳 git log --graph --all </h1>
  
    <div align="center">
      <table border="0">
        <tr>
          <td align="left">
            <pre>
  * 🟢 [HEAD -> main] 2026: Proposing "Parampara" for Aperture 3.0
  |
  * 🔵 [branch/oss]   2026: Contributing to Readme_Design_kit
  |
  * 🔴 [branch/swoc]  2026: Selected Contributor @ SWOC Season 6
  | \\
  * 🟡 [branch/gssoc] 2025: Open Source Contributor @ GSSoC '25
  | /
  * 🔵 [branch/hack]  2025: Finalist @ IIIT Kalyani (Project Ecosta)
  | \\
  * 🟠 [branch/dev]   2025: Architected Stayo (Airbnb Clone)
  | /
  * 🟢 [origin/root]  2024: Initialized Career Branch (CSE-DS)
            </pre>
          </td>
        </tr>
      </table>
    </div>
  
    <hr width="50%" />
  
    <h1> 🛠️ git checkout feat/tech-stack </h1>
  
    <table border="0" width="100%">
      <tr>
        <td width="50%" align="center" style="background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 20px;">
          <h3> // Production Engine </h3>
          <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" /> <br/>
          <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <br/>
          <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" /> <br/>
          <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white" />
        </td>
        <td width="50%" align="center" style="background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 20px;">
          <h3> // Intelligence Core </h3>
          <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" /> <br/>
          <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" /> <br/>
          <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" /> <br/>
          <img src="https://img.shields.io/badge/ML_Logic-teal?style=for-the-badge" />
        </td>
      </tr>
    </table>
  
    <br/>
  
    <h1> 🎨 git checkout feat/creative </h1>
    <p align="center">
      <b>POSTER MAKING:</b> Designing visual narratives and digital posters to blend logic with aesthetic <br/>
      <b>OPEN SOURCE:</b> Actively contributing to community-driven projects like Readme_design_kit
    </p>
  
    <hr width="50%" />
  
    <h1> ⚠️ git status </h1>
    <p align="center">
      [ ] <b>Aperture-3.0-Parampara:</b> Refining the proposal for the Parampara rural heritage platform <br/>
      [ ] <b>SWOC-S6:</b> Executing contributions as a selected contributor for Social Winter of Code Season 6 <br/>
      [ ] <b>Parampara-Auth:</b> Implementing authentication systems and enhancing UI components
    </p>
  
    <hr width="50%" />
  
    <h1> 🏅 git tag --list </h1>
    <p align="center">
      🏆 <b>hackathon/finalist-status-code-2</b> <br/>
      ⭐ <b>oss/swoc-season-6-contributor</b> <br/>
      ⭐ <b>oss/gssoc-2025-contributor</b>
    </p>
  
    <hr width="50%" />
  
    <h1> 📈 git show --summary </h1>
    
    <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=github-dark&area=true&hide_border=true&radius=10" width="100%" />
  
    <br/>
  
    <table border="0" width="100%">
      <tr>
        <td align="center"><img height="220px" src="https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=dark&hide_border=true&title_color=4AF626&icon_color=4AF626" /></td>
        <td align="center"><img height="220px" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=dark&hide_border=true&title_color=4AF626" /></td>
      </tr>
    </table>
  
    <br/><br/>
  
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=30&pause=1000&color=4AF626&center=true&vCenter=true&width=600&lines=git+commit+-m+%22Ready+to+Code%22;git+push+origin+main;Connection+Closed." />
  
    <br/>
    
    <img src="https://capsule-render.vercel.app/api?type=waving&color=0d1117&height=100&section=footer" width="100%"/>
  </div>
      `,
  },
  {
    id: 'template-21',
    name: 'Template - XXI',
    description: 'A premium, centered 3-column newspaper layout. Merges the Tech Ticker, Editorial Board, and Lead Story into a cohesive high-contrast dashboard.',
    category: 'portfolio',
    tags: ['newspaper', 'editorial', '3-column', 'bold', 'portfolio', 'centered'],
    author: 'README Design Kit',
    version: '2.5.0',
    popularity: 700,
    thumbnail: '/template-21.png',
    created: new Date('2026-01-29'),
    updated: new Date('2026-01-29'),
    featured: true,
    markdown: `
  <div align="center">
    <img src="https://capsule-render.vercel.app/api?type=rect&color=000000&height=180&text=THE%20DEV%20CHRONICLE&fontSize=85&fontColor=ffffff&fontAlignY=45&animation=fadeIn" width="100%" />
    
    <p align="center" style="font-family: serif; font-size: 1.2em;">
      <b>VOL. 2026 | ISSUE 01</b> &nbsp; — &nbsp; <b>📍 INDIA</b> &nbsp; — &nbsp; <b>🏷️ PRICE: 1 COMMIT</b>
    </p>
  
    <hr style="border: 2px solid #000; width: 100%;" />
    <hr style="border: 0.5px solid #000; width: 100%; margin-top: -8px;" />
  
    <table border="0" width="100%" cellpadding="15" cellspacing="0">
      <tr>
        <td width="30%" valign="top" style="border-right: 2px solid #000;">
          <h1 align="center"><b>☁️ WEATHER</b></h1>
          <p align="center">
          <b>VIBE:</b> ☀️ Tech Enthusiast <br/>
          <b>CODING VIBE:</b> ☕ Learning Bit by Bit <br/>
          <b>STATUS:</b> DIY Explorer
          </p>
          <hr style="width: 70%; border: 0.5px solid #000;"/>
          <h1 align="center"><b>👤 BIOGRAPHY</b></h1>
          <p align="center">
            <b>Mayur Pagote</b> <br/>
            B.Tech Student (CSE) <br/>
            <b>10K+ YouTube Views</b> <br/>
            Educator & Hardware Specialist
          </p>
          <hr style="width: 70%; border: 0.5px solid #000;"/>
          <h1 align="center"><b>🧱 THE STACK</b></h1>
          <p align="center">
            <img src="https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black" />
            <img src="https://img.shields.io/badge/C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white" /> <br/>
            <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />
            <img src="https://img.shields.io/badge/Electronics-FFD700?style=flat-square" /> <br/>
            <img src="https://img.shields.io/badge/Hardware-5E5C5C?style=flat-square" />
          </p>
        </td>
  
        <td width="40%" valign="top" align="center" style="padding: 0 20px;">
          <h1 align="center" style="font-size: 2.8em; line-height: 1.1;"><b>EDUCATOR REACHES VIRAL MILESTONE</b></h1>
          <p align="center"><i>"Learning Bit by Bit" surpasses 10K views and 600+ watch hours.</i></p>
          <br/>
          <img src="https://raw.githubusercontent.com/rahul-jha98/rahul-jha98/main/techstack.gif" width="100%" style="border: 2px solid #000; border-radius: 8px; box-shadow: 5px 5px 0px #000;" />
          <br/><br/>
          <h1 align="center" style="background: #000; color: #fff; padding: 5px;"><b>LEAD STORY: STANFORD TEACHING</b></h1>
          <p align="justify" style="font-family: serif; font-size: 1.1em;">
            Mayur Pagote is currently serving as a <b>Student Teacher</b> at Code in Place by <b>Stanford University</b>. He focuses on making technology accessible to all.
          </p>
          <p align="justify" style="font-family: serif; font-size: 1.1em;">
            Beyond teaching, he acts as a <b>Project Admin</b> in open-source programs and is an <b>Azure & Oracle Certified</b> professional.
          </p>
          <hr style="width: 40%; border: 1px solid #000;"/>
          <h1 align="center"><b>THE COMIC STRIP</b></h1>
          <img src="https://media1.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" width="85%" style="border: 1px solid #000;" />
          <p align="center"><i>"Teaching technology bit by bit."</i></p>
        </td>
  
        <td width="30%" valign="top" style="border-left: 2px solid #000;">
          <h1 align="center"><b>📈 TECH TICKER</b></h1>
          <p align="center" style="font-family: monospace;">
            🟢 <b>PROGRAMMING:</b> ▲ 95% <br/>
            🟢 <b>HARDWARE:</b> ▲ 90% <br/>
            🟢 <b>PYTHON:</b> ▲ 88% <br/>
            🟢 <b>LOGIC:</b> ▲ 92%
          </p>
          <hr style="width: 70%; border: 0.5px solid #000;"/>
          <h1 align="center"><b>🎤 INTERVIEW</b></h1>
          <p align="justify" style="font-size: 0.95em;">
            <b>Q: Your approach?</b> <br/>
            <b>A:</b> "Learning and teaching are two sides of the same coin." <br/><br/>
            <b>Q: Tech Take?</b> <br/>
            <b>A:</b> "Hardware and software must dance together in perfect logic."
          </p>
          <hr style="width: 70%; border: 0.5px solid #000;"/>
          <h1 align="center"><b>📰 CLASSIFIEDS</b></h1>
          <table border="1" width="100%" style="border-collapse: collapse; border: 2px solid #000;">
            <tr>
              <td align="center" style="padding: 10px;">
                <b>CERTIFIED EXPERTISE:</b> <br/> <b>Oracle Certified</b> & <b>Azure Certified</b> Associate
              </td>
            </tr>
          </table>
          <br/>
          <h1 align="center"><b>📞 CONTACT</b></h1>
          <p align="center">
            <a href="mayur.s.pagote@gmail.com">Email</a> • <a href="https://github.com/Mayur-Pagote">GitHub</a>
          </p>
        </td>
      </tr>
    </table>
  
    <hr style="border: 2px solid #000; width: 100%; margin-top: 10px;" />
  
    <h1 align="center"><b>📊 MARKET WRAP: GITHUB ANALYTICS</b></h1>
    <div align="center">
      <img src="https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=github-dark&area=true&hide_border=true&radius=10" width="100%" style="border: 1px solid #000;" />
      <br/><br/>
    </div>
    <hr style="border: 2px solid #000; width: 100%;" />
    <div align="center" style="background-color: #000; padding: 10px 0;">
      <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&pause=1000&color=FFFFFF&center=true&vCenter=true&width=800&lines=BBREAKING+NEWS%3A+Mayur+Pagote+10K+Views+on+YouTube!;LATEST%3A+Secures+Oracle+%26+Azure+Certifications!;UPDATE%3A+SStanford+Code+in+Place+Appoints+Mayur+as+Student+Teacher!;EXCLUSIVE%3A+Mastering+C%2C+C%2B%2B%2C+and+Python+Logic!" />
    </div>
    <hr style="border: 2px solid #000; width: 100%;" />
    <br/>
    <img src="https://capsule-render.vercel.app/api?type=waving&color=000000&height=100&section=footer" width="100%"/>
  </div>
      `,
  }
];

export const templateCategories: { value: TemplateCategory; label: string; description: string }[] = [
  {
    value: 'gamified' as TemplateCategory,
    label: 'Gamified',
    description: 'RPG-style and interactive templates for a unique developer experience.',
  },
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
  'gamified',
  'interactive',
  'rpg',
  'stats',
];