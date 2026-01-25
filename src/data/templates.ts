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

      ---

      ## 🛡️ Equipped Inventory (Tech Stack)
      <div align="center">
        <table>
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

      ---

      ## 📊 Ability Radar (Skill Mapping)
      <div align="center">
        <img height="250em" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=github_dark" />
        <img height="250em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=github_dark" />
      </div>

      ---

      ## 📜 Active Quest Log
      - [ ] **Main Quest:** Architecting a scalable MERN microservice. <code>(Progress: 75%)</code>
      - [ ] **Side Quest:** Contributing 5 PRs to Open Source projects this month. <code>(Progress: 2/5)</code>
      - [ ] **Daily:** Solve 2 LeetCode problems. <code>(Streak: 12 days)</code>

      ---

      ## 🏆 Achievement Trophies
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