export interface ComponentItem {
  title: string;
  description: string;
  imageUrl: string;
  codeSnippet: string;
}

export const componentsData: Record<string, ComponentItem[]> = {
  graphs: [
    {
      title: "Contribution Graph",
      description: "Simple GitHub contribution activity graph with dark theme",
      imageUrl:
        "https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=react-dark&hide_border=false",
      codeSnippet:
        "![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=react-dark&hide_border=false)",
    },
    {
      title: "Profile Summary Graph",
      description: "Profile details summary from GitHub Profile Summary Cards",
      imageUrl:
        "https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=radical",
      codeSnippet:
        "![Contribution Graph](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=radical)",
    },
    {
      title: "Gradient 3D Animated Graph",
      description:
        "3D bar graph with animated contributions and gradient in purple theme",
      imageUrl:
        "https://ssr-contributions-svg.vercel.app/_/{username}?chart=3dbar&gap=0.6&scale=2&gradient=true&flatten=0&animation=mess&animation_duration=6&animation_loop=true&format=svg&weeks=50&theme=purple&widget_size=large&colors=FF6F61,FF9671,FFC15E,72F2EB,1282A2,FCE2DB,FAD4D8,DBDFFD&dark=true",
      codeSnippet:
        "![Contribution Graph](https://ssr-contributions-svg.vercel.app/_/{username}?chart=3dbar&gap=0.6&scale=2&gradient=true&flatten=0&animation=mess&animation_duration=6&animation_loop=true&format=svg&weeks=50&theme=purple&widget_size=large&colors=FF6F61,FF9671,FFC15E,72F2EB,1282A2,FCE2DB,FAD4D8,DBDFFD&dark=true)",
    },
    {
      title: "Responsive 3D Wave Graph",
      description:
        "Responsive 3D bar graph with wave animation and light/dark mode support",
      imageUrl:
        "https://ssr-contributions-svg.vercel.app/_/{username}?chart=3dbar&gap=0.6&scale=2&flatten=2&animation=wave&animation_duration=4&animation_delay=0.06&animation_amplitude=24&animation_frequency=0.1&animation_wave_center=0_3&format=svg&weeks=34&theme=native",
      codeSnippet:
        "![Contribution Graph](https://ssr-contributions-svg.vercel.app/_/{username}?chart=3dbar&gap=0.6&scale=2&flatten=2&animation=wave&animation_duration=4&animation_delay=0.06&animation_amplitude=24&animation_frequency=0.1&animation_wave_center=0_3&format=svg&weeks=34&theme=native)",
    },
    {
      title: "3D Wave Graph (Pink Theme)",
      description:
        "3D bar GitHub contribution graph in pink theme with wave animation",
      imageUrl:
        "https://ssr-contributions-svg.vercel.app/_/{username}?chart=3dbar&flatten=1&weeks=34&animation=wave&format=svg&gap=0.6&animation_frequency=0.2&animation_amplitude=20&theme=pink",
      codeSnippet:
        "![Contribution Graph](https://ssr-contributions-svg.vercel.app/_/{username}?chart=3dbar&flatten=1&weeks=34&animation=wave&format=svg&gap=0.6&animation_frequency=0.2&animation_amplitude=20&theme=pink)",
    },
    {
      title: "Area Activity Graph with Rounded Corners",
      description:
        "Advanced activity graph with area fill, rounded corners, and custom title",
      imageUrl:
        "https://github-readme-activity-graph.vercel.app/graph?username={username}&radius=16&theme=react&area=true&order=5&custom_title=Contribution%20Graph",
      codeSnippet:
        "![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username={username}&radius=16&theme=react&area=true&order=5&custom_title=Contribution%20Graph)",
    },
  ],
  stats: [
    {
      title: "Tokyo Pulse Card",
      description: "An animated GitHub stats card using the Tokyo Night theme",
      imageUrl:
        "https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=tokyonight",
      codeSnippet:
        "![Stats Card 1](https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=tokyonight)",
    },
    {
      title: "Octocat Classic Card",
      description:
        "An animated GitHub stats card with the Octocat style using the GitHub theme",
      imageUrl:
        "https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=github&cardType=octocat",
      codeSnippet:
        "![Stats Card 2](https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=github&cardType=octocat)",
    },
    {
      title: "Dark Level Meter Card",
      description:
        "An animated stats card with level-alternate layout and Dracula theme",
      imageUrl:
        "https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=dracula&cardType=level-alternate",
      codeSnippet:
        "![Stats Card 3](https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=dracula&cardType=level-alternate)",
    },
    {
      title: "GitHub Dark Matrix",
      description:
        "Animated GitHub stats card with GitHub Dark theme and GitHub layout",
      imageUrl:
        "https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=github-dark&cardType=github",
      codeSnippet:
        "![Stats Card 4](https://awesome-github-stats.azurewebsites.net/user-stats/{username}?theme=github-dark&cardType=github)",
    },
    {
      title: "Minimal Impact Card",
      description:
        "Simple stats card with minimal visual using GitHub Stats Alpha",
      imageUrl:
        "https://github-stats-alpha.vercel.app/api/?username={username}",
      codeSnippet:
        "![Stats Card 6](https://github-stats-alpha.vercel.app/api/?username={username})",
    },
    {
      title: "Profile Summary Stats",
      description:
        "Profile summary stats card with the 2077 theme from GitHub Profile Summary Cards",
      imageUrl:
        "https://github-profile-summary-cards.vercel.app/api/cards/stats?username={username}&theme=2077",
      codeSnippet:
        "![Stats Card 10](https://github-profile-summary-cards.vercel.app/api/cards/stats?username={username}&theme=2077)",
    },
    {
      title: "Stats Bar Card",
      description:
        "A horizontal bar-style GitHub widget showing followers, repositories, stars, and commits",
      imageUrl:
        "https://github-widgetbox.vercel.app/api/profile?username={username}&data=followers,repositories,stars,commits&theme=dark",
      codeSnippet:
        "![Stats Bar Card](https://github-widgetbox.vercel.app/api/profile?username={username}&data=followers,repositories,stars,commits&theme=dark)",
    },
    {
      title: "Productive Hours Card",
      description:
        "Visual representation of the most productive time of day for contributions",
      imageUrl:
        "https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username={username}&theme=transparent",
      codeSnippet:
        "![Productive Hours](https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username={username}&theme=transparent)",
    },
    {
      title: "Contribution Streak Card",
      description:
        "Tracks your GitHub streak stats in a clean and transparent style",
      imageUrl:
        "https://github-readme-streak-stats.herokuapp.com?user={username}&theme=transparent&hide_border=true",
      codeSnippet:
        "![Contribution Streak](https://github-readme-streak-stats.herokuapp.com?user={username}&theme=transparent&hide_border=true)",
    },
  ],
  animation: [
    {
      title: "Typing Animation",
      description: "Animated typing text effect",
      imageUrl:
        "https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=F75C7E&width=435&lines=Hello+World!;I'm+a+Developer;Welcome+to+my+Profile!",
      codeSnippet:
        "![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=F75C7E&width=435&lines=Hello+World!;I'm+{username};Welcome+to+my+Profile!)",
    },
    {
      title: "Hand Waving",
      description: "Animated waving hand GIF",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hand%20Waving.gif?raw=true",
      codeSnippet:
        "![Hand Waving](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hand%20Waving.gif)",
    },
    {
      title: "Gmail Thug",
      description: "Cool animated Gmail character",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Gmail%20Thug.gif?raw=true",
      codeSnippet:
        "![Gmail Thug](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Gmail%20Thug.gif)",
    },
    {
      title: "Kyubey",
      description: "Cute animated character",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Kyubey.gif?raw=true",
      codeSnippet:
        "![Kyubey](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Kyubey.gif)",
    },
    {
      title: "Pixel Cat",
      description: "Retro pixel art cat animation",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Pixel%20Cat.gif?raw=true",
      codeSnippet:
        "![Pixel Cat](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Pixel%20Cat.gif)",
    },
    {
      title: "Plumber",
      description: "Animated plumber character",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Plumber.gif?raw=true",
      codeSnippet:
        "![Plumber](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Plumber.gif)",
    },
    {
      title: "Professional Handshake",
      description: "Professional handshake animation",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Professional%20Handshake.gif?raw=true",
      codeSnippet:
        "![Professional Handshake](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Professional%20Handshake.gif)",
    },
    {
      title: "Rabbit Happy",
      description: "Happy rabbit animation",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Rabit%20Happy.gif?raw=true",
      codeSnippet:
        "![Rabbit Happy](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Rabit%20Happy.gif)",
    },
    {
      title: "Debugging Mode",
      description: "Developer debugging workflow animation",
      imageUrl:
        "https://user-images.githubusercontent.com/74038190/229223156-0cbdaba9-3128-4d8e-8719-b6b4cf741b67.gif",
      codeSnippet:
        "![Debugging Mode](https://user-images.githubusercontent.com/74038190/229223156-0cbdaba9-3128-4d8e-8719-b6b4cf741b67.gif)",
    },
    {
      title: "Late Night Coding",
      description: "Late-night coding animation loop for READMEs",
      imageUrl:
        "https://user-images.githubusercontent.com/74038190/216656934-0dd55b98-a77e-4d26-8865-9147906e0f99.gif",
      codeSnippet:
        "![Late Night Coding](https://user-images.githubusercontent.com/74038190/216656934-0dd55b98-a77e-4d26-8865-9147906e0f99.gif)",
    },
    {
      title: "Loading Developer",
      description: "Developer loading-style animation loop",
      imageUrl:
        "https://user-images.githubusercontent.com/74038190/216655825-c639587f-6eb0-4841-b622-9f522f55d40e.gif",
      codeSnippet:
        "![Loading Developer](https://user-images.githubusercontent.com/74038190/216655825-c639587f-6eb0-4841-b622-9f522f55d40e.gif)",
    },
    {
      title: "Problem Solving Mode",
      description: "Animation symbolizing problem-solving mindset",
      imageUrl:
        "https://user-images.githubusercontent.com/74038190/216654128-ad1c5827-e18e-43a6-974b-3669cbb082b9.gif",
      codeSnippet:
        "![Problem Solving Mode](https://user-images.githubusercontent.com/74038190/216654128-ad1c5827-e18e-43a6-974b-3669cbb082b9.gif)",
    },
    {
      title: "Developer Thinking",
      description: "Developer thinking and planning animation",
      imageUrl:
        "https://user-images.githubusercontent.com/74038190/216654116-d0e8d227-7977-4edc-8d36-63461bda9503.gif",
      codeSnippet:
        "![Developer Thinking](https://user-images.githubusercontent.com/74038190/216654116-d0e8d227-7977-4edc-8d36-63461bda9503.gif)",
    },
    {
      title: "Continuous Development Loop",
      description: "Loop animation representing continuous development",
      imageUrl:
        "https://user-images.githubusercontent.com/74038190/216649417-9acc58df-9186-4132-ad43-819a57babb67.gif",
      codeSnippet:
        "![Continuous Development Loop](https://user-images.githubusercontent.com/74038190/216649417-9acc58df-9186-4132-ad43-819a57babb67.gif)",
    },
    {
      title: "Floating Web Tech Stack",
      description: "Floating animation showcasing web technologies",
      imageUrl:
        "https://user-images.githubusercontent.com/74038190/219923809-b86dc415-a0c2-4a38-bc88-ad6cf06395a8.gif",
      codeSnippet:
        "![Floating Web Tech Stack](https://user-images.githubusercontent.com/74038190/219923809-b86dc415-a0c2-4a38-bc88-ad6cf06395a8.gif)",
    },
  ],
  techStack: [
    {
      title: "Animated JavaScript",
      description: "Animated JavaScript Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="100">`,
    },
    {
      title: "Animated Python",
      description: "Animated Python Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212257472-08e52665-c503-4bd9-aa20-f5a4dae769b5.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212257472-08e52665-c503-4bd9-aa20-f5a4dae769b5.gif" width="100">`,
    },
    {
      title: "Animated GitHub",
      description: "Animated GitHub Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="100">`,
    },
    {
      title: "Animated Visual Studio Code",
      description: "Animated VS Code Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="100">`,
    },
    {
      title: "Animated Vue",
      description: "Animated Vue JS Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212257463-4d082cb4-7483-4eaf-bc25-6dde2628aabd.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212257463-4d082cb4-7483-4eaf-bc25-6dde2628aabd.gif" width="100">`,
    },
    {
      title: "Animated Node",
      description: "Animated Node JS Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif" width="100">`,
    },
    {
      title: "Animated React",
      description: "Animated React JS Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="100">`,
    },
    {
      title: "Animated Sublime Text",
      description: "Animated Sublime Text Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212281756-450d3ffa-9335-4b98-a965-db8a18fee927.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212281756-450d3ffa-9335-4b98-a965-db8a18fee927.gif" width="100">`,
    },
    {
      title: "Animated Bootstrap",
      description: "Animated Bootstrap Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212280805-9bcb336b-8c55-46a8-abf8-ff286ab55472.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212280805-9bcb336b-8c55-46a8-abf8-ff286ab55472.gif" width="100">`,
    },
    {
      title: "Animated Angular",
      description: "Animated Angular JS Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212280823-79088828-a258-4a4d-8d6c-96315d5a07af.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212280823-79088828-a258-4a4d-8d6c-96315d5a07af.gif" width="100">`,
    },
    {
      title: "Animated Android",
      description: "Animated Android Operating System Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212281763-e6ecd7ef-c4aa-45b6-a97c-f33f6bb592bd.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212281763-e6ecd7ef-c4aa-45b6-a97c-f33f6bb592bd.gif" width="100">`,
    },
    {
      title: "Animated iOS",
      description: "Animated iOS Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212281780-0afd9616-8310-46e9-a898-c4f5269f1387.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212281780-0afd9616-8310-46e9-a898-c4f5269f1387.gif" width="100">`,
    },
    {
      title: "Animated Git",
      description: "Animated Git Logo",
      imageUrl: "https://user-images.githubusercontent.com/74038190/212281775-b468df30-4edc-4bf8-a4ee-f52e1aaddc86.gif",
      codeSnippet: `<img src="https://user-images.githubusercontent.com/74038190/212281775-b468df30-4edc-4bf8-a4ee-f52e1aaddc86.gif" width="100">`,
    },
    {
      title: "Animated Express",
      description: "Animated Express JS Logo",
      imageUrl: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/1a797f46-efe4-41e6-9e75-5303e1bbcbfa",
      codeSnippet: `<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/1a797f46-efe4-41e6-9e75-5303e1bbcbfa" width="100">`,
    },
    {
      title: "Animated HTML",
      description: "Animated HTML Logo",
      imageUrl: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/29fd6286-4e7b-4d6c-818f-c4765d5e39a9",
      codeSnippet: `<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/29fd6286-4e7b-4d6c-818f-c4765d5e39a9" width="100">`,
    },
    {
      title: "Animated CSS",
      description: "Animated CSS Logo",
      imageUrl: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/67f477ed-6624-42da-99f0-1a7b1a16eecb",
      codeSnippet: `<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/67f477ed-6624-42da-99f0-1a7b1a16eecb" width="100">`,
    },
    {
      title: "Animated Firebase",
      description: "Animated Google Firebase Logo",
      imageUrl: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/3c16d4f2-b757-4c70-8f42-43d5dddd2c36",
      codeSnippet: `<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/3c16d4f2-b757-4c70-8f42-43d5dddd2c36" width="100">`,
    },
    {
      title: "Animated Ubuntu",
      description: "Animated Ubuntu Logo",
      imageUrl: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/3fb2cdf6-8920-462e-87a4-95af376418aa",
      codeSnippet: `<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/3fb2cdf6-8920-462e-87a4-95af376418aa" width="100">`,
    },
    {
      title: "Animated MongoDB",
      description: "Animated MongoDB Logo",
      imageUrl: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/398b19b1-9aae-4c1f-8bc0-d172a2c08d68",
      codeSnippet: `<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/398b19b1-9aae-4c1f-8bc0-d172a2c08d68" width="100">`,
    },
  ],
  counter: [
    {
      title: "Profile Views",
      description: "Track profile visits with a counter",
      imageUrl:
        "https://komarev.com/ghpvc/?username={username}&color=blueviolet&style=flat-square&label=Profile+Views",
      codeSnippet:
        "![Profile Views](https://komarev.com/ghpvc/?username={username}&color=blueviolet&style=flat-square&label=Profile+Views)",
    },
    {
      title: "Views Counter - Komarev (Short)",
      description: "Compact GitHub profile view counter using Komarev badge.",
      imageUrl:
        "https://komarev.com/ghpvc/?username={username}&abbreviated=true",
      codeSnippet: `<img src="https://komarev.com/ghpvc/?username={username}&abbreviated=true"/>`,
    },
    {
      title: "Views Counter - Komarev Badge",
      description: "Komarev badge-styled counter for profile visitors.",
      imageUrl:
        "https://komarev.com/ghpvc/?username={username}&style=for-the-badge",
      codeSnippet: `<img src="https://komarev.com/ghpvc/?username={username}&style=for-the-badge"/>`,
    },
    {
      title: "Views Counter - GetLoli",
      description: "Profile visitor counter with fun GetLoli themes.",
      imageUrl: "https://count.getloli.com/get/@{username}?theme=rule34",
      codeSnippet: `<img src="https://count.getloli.com/get/@{username}?theme=rule34"/>`,
    },
    {
      title: "Views Counter - Hits.sh",
      description:
        "Advanced visitor badge with GitHub integration and styling.",
      imageUrl:
        "https://hits.sh/github.com/{username}/hits.svg?style=plastic&label=Visitors&color=purple&labelColor=indigo&logo=github",
      codeSnippet: `<img src="https://hits.sh/github.com/{username}/hits.svg?style=plastic&label=Visitors&color=purple&labelColor=indigo&logo=github"/>`,
    },
  ],
  emojis: [
    {
      title: "Developer Emojis",
      description: "Collection of developer-themed emojis",
      imageUrl:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIxMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMzMzMyI+8J+UpSDwn5qAIPCfkZjwn46J8J+OryDwn5KbIPCfmIzigJDvuI/wn5OFPC90ZXh0Pjwvc3ZnPg==",
      codeSnippet: "🔥 🚀 👨‍💻🎉🎯 💛 😌‍🏽👅",
    },
    {
      title: "Alien Monster",
      description: "Cute alien monster emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Alien%20Monster.png?raw=true",
      codeSnippet:
        "![Alien Monster](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Alien%20Monster.png)",
    },
    {
      title: "Brain",
      description: "Brain emoji for intelligence",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Brain.png?raw=true",
      codeSnippet:
        "![Brain](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Brain.png)",
    },
    {
      title: "Bug",
      description: "Bug emoji for debugging",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Bug.png?raw=true",
      codeSnippet:
        "![Bug](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Bug.png)",
    },
    {
      title: "Comet",
      description: "Shooting star comet",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Comet.png?raw=true",
      codeSnippet:
        "![Comet](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Comet.png)",
    },
    {
      title: "Confused Face",
      description: "Confused expression emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Confused%20Face.png?raw=true",
      codeSnippet:
        "![Confused Face](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Confused%20Face.png)",
    },
    {
      title: "Eyes",
      description: "Watching eyes emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Eyes.png?raw=true",
      codeSnippet:
        "![Eyes](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Eyes.png)",
    },
    {
      title: "Firm Hand Waving",
      description: "Hand waving gesture",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Firm%20Hand%20Waving.png?raw=true",
      codeSnippet:
        "![Firm Hand Waving](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Firm%20Hand%20Waving.png)",
    },
    {
      title: "Firm Handshake",
      description: "Professional handshake emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Firm%20Handshake.png?raw=true",
      codeSnippet:
        "![Firm Handshake](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Firm%20Handshake.png)",
    },
    {
      title: "Flame",
      description: "Fire flame emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Flame.png?raw=true",
      codeSnippet:
        "![Flame](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Flame.png)",
    },
    {
      title: "Flexed Biceps",
      description: "Strong arm emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Flexed%20Biceps.png?raw=true",
      codeSnippet:
        "![Flexed Biceps](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Flexed%20Biceps.png)",
    },
    {
      title: "Heart and Fire",
      description: "Passionate heart with fire",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Heart%20and%20Fire.png?raw=true",
      codeSnippet:
        "![Heart and Fire](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Heart%20and%20Fire.png)",
    },
    {
      title: "Hot Cup",
      description: "Hot coffee cup emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hot%20Cup.png?raw=true",
      codeSnippet:
        "![Hot Cup](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hot%20Cup.png)",
    },
    {
      title: "Hourglass",
      description: "Time hourglass emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hourglass.png?raw=true",
      codeSnippet:
        "![Hourglass](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hourglass.png)",
    },
    {
      title: "Man Technologist",
      description: "Male developer emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Man%20Technologist.png?raw=true",
      codeSnippet:
        "![Man Technologist](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Man%20Technologist.png)",
    },
    {
      title: "Musical Notes",
      description: "Music notes emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Musical%20Notes.png?raw=true",
      codeSnippet:
        "![Musical Notes](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Musical%20Notes.png)",
    },
    {
      title: "Nerd Face",
      description: "Geeky nerd face emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Nerd%20Face.png?raw=true",
      codeSnippet:
        "![Nerd Face](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Nerd%20Face.png)",
    },
    {
      title: "Robot",
      description: "Robot face emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Roboto.png?raw=true",
      codeSnippet:
        "![Robot](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Roboto.png)",
    },
    {
      title: "Rocket",
      description: "Rocket launch emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Rocket.png?raw=true",
      codeSnippet:
        "![Rocket](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Rocket.png)",
    },
    {
      title: "Spiral",
      description: "Spiral design element",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Spiral.png?raw=true",
      codeSnippet:
        "![Spiral](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Spiral.png)",
    },
    {
      title: "Star",
      description: "Shining star emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Star.png?raw=true",
      codeSnippet:
        "![Star](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Star.png)",
    },
    {
      title: "Thinking Face",
      description: "Thoughtful thinking emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Thinking%20Face.png?raw=true",
      codeSnippet:
        "![Thinking Face](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Thinking%20Face.png)",
    },
    {
      title: "Wing Left",
      description: "Left wing design element",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Wing%20Left.png?raw=true",
      codeSnippet:
        "![Wing Left](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Wing%20Left.png)",
    },
    {
      title: "Wing Right",
      description: "Right wing design element",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Wing%20Right.png?raw=true",
      codeSnippet:
        "![Wing Right](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Wing%20Right.png)",
    },
    {
      title: "Writing",
      description: "Writing hand emoji",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Writing.png?raw=true",
      codeSnippet:
        "![Writing](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Writing.png)",
    },
  ],
  quotes: [
    {
      title: "Motivational Quote",
      description: "Inspirational quotes for developers",
      imageUrl:
        "https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical",
      codeSnippet:
        "![Dev Quotes](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical)",
    },
    {
      title: "Random Quote (Samuel Layout)",
      description: "Inspirational quote in dark theme with grow-out animation.",
      imageUrl:
        "https://github-readme-quotes-bay.vercel.app/quote?theme=dark&layout=churchill&font=Gabrielle&animation=grow_out_in",
      codeSnippet: `<img height="180em" src="https://github-readme-quotes-bay.vercel.app/quote?theme=dark&layout=churchill&font=Gabrielle&animation=grow_out_in"/>`,
    },
    {
      title: "Horizontal Quote Card",
      description: "Random quote with Samuel layout in dark theme.",
      imageUrl:
        "https://github-readme-quotes-bay.vercel.app/quote?theme=dark&animation=default&layout=samuel&font=default&quoteType=random&bgColor=black",
      codeSnippet: `<img height="180em" src="https://github-readme-quotes-bay.vercel.app/quote?theme=dark&animation=default&layout=samuel&font=default&quoteType=random&bgColor=black"/>`,
    },
    {
      title: "Random Quote (Zeus Layout)",
      description: "Random Zeus layout quote in dark theme.",
      imageUrl:
        "https://github-readme-quotes-bay.vercel.app/quote?theme=dark&animation=default&layout=zues&font=default&quoteType=random&bgColor=black",
      codeSnippet: `<img height="180em" src="https://github-readme-quotes-bay.vercel.app/quote?theme=dark&animation=default&layout=zues&font=default&quoteType=random&bgColor=black"/>`,
    },
    {
      title: "Funny Dev Joke",
      description: "Displays a random developer joke with dark theme styling.",
      imageUrl:
        "https://readme-jokes.vercel.app/api?hideBorder&theme=dark&qColor=%23944bcc&aColor=%23bbdb51",
      codeSnippet: `<img height="180em" src="https://readme-jokes.vercel.app/api?hideBorder&theme=dark&qColor=%23944bcc&aColor=%23bbdb51"/>`,
    },
  ],
  languages: [
    {
      title: "Top Language By Repo",
      description: "Languages used based on repository count.",
      imageUrl:
        "https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent",
      codeSnippet: `<img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username={username}&theme=transparent"/>`,
    },
    {
      title: "Most Commit Language",
      description: "Languages with the highest number of commits.",
      imageUrl:
        "https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username={username}&theme=transparent",
      codeSnippet: `<img height="180em" src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username={username}&theme=transparent"/>`,
    },
  ],
  repos: [
    {
      title: "Top Contributed Repo",
      description: "Displays top contributed repositories of the user.",
      imageUrl:
        "https://github-contributor-stats.vercel.app/api?username={username}&limit=5&theme=transparent&hide_border=true&combine_all_yearly_contributions=true",
      codeSnippet: `<img height="180em" src="https://github-contributor-stats.vercel.app/api?username={username}&limit=5&theme=transparent&hide_border=true&combine_all_yearly_contributions=true"/>`,
    },
    {
      title: "Contributors",
      description: "Displays contributors of a GitHub repository as avatars.",
      imageUrl: "https://contributors-img.web.app/image?repo={username}/{repo}",
      codeSnippet: `<img src="https://contributors-img.web.app/image?repo={username}/{repo}"/>`,
    },
    {
      title: "Stargazers - Light",
      description: "Shows stargazers of a repo in light mode.",
      imageUrl: "https://reporoster.com/stars/{username}/{repo}",
      codeSnippet: `<img src="https://reporoster.com/stars/{username}/{repo}"/>`,
    },
    {
      title: "Stargazers - Dark",
      description: "Stargazers card with dark theme.",
      imageUrl: "https://reporoster.com/stars/dark/{username}/{repo}",
      codeSnippet: `<img src="https://reporoster.com/stars/dark/{username}/{repo}"/>`,
    },
    {
      title: "Forkers - Light",
      description: "Shows users who forked the repository (light mode).",
      imageUrl: "https://reporoster.com/forks/{username}/{repo}",
      codeSnippet: `<img src="https://reporoster.com/forks/{username}/{repo}"/>`,
    },
    {
      title: "Forkers - Dark",
      description: "Forkers in dark theme style.",
      imageUrl: "https://reporoster.com/forks/dark/${username}/${repo}",
      codeSnippet: `<img src="https://reporoster.com/forks/dark/{username}/{repo}"/>`,
    },
    {
      title: "Contributor List",
      description: "Visual list of contributors to a specific repo.",
      imageUrl:
        "https://api.vaunt.dev/v1/github/entities/{username}/repositories/{repo}/contributors?format=svg&limit=54",
      codeSnippet: `<img src="https://api.vaunt.dev/v1/github/entities/{username}/repositories/{repo}/contributors?format=svg&limit=54" width="700" height="250" />`,
    },
    {
      title: "Star History Graph",
      description: "Displays the Star History Graph of a Repository",
      imageUrl: "https://api.star-history.com/svg?repos={username}/{repo}&type=Date",
      codeSnippet: `![Star History Chart](https://api.star-history.com/svg?repos={username}/{repo}&type=Date)`,
    },
  ],
  dividers: [
    {
      title: "RGB Line Thin",
      description: "A thin animated RGB divider line.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/ff67bec3b85c96bfeb4406e7d9d4b593147d16c5/Assets/RGB%20Line%20Thin.gif?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/ff67bec3b85c96bfeb4406e7d9d4b593147d16c5/Assets/RGB%20Line%20Thin.gif" width="1000" height="2" />`,
    },
    {
      title: "RGB Line Medium",
      description: "A medium-thick animated RGB divider line.",
      imageUrl:
        "https://raw.githubusercontent.com/Mayur-Pagote/README_Design_Kit/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/aa28326300247d989c9f7c2eeb177f59577d785b/Assets/RGB%20Line%20Medium.gif?raw=true" width="100%">`,
    },
    {
      title: "RGB Line Thick",
      description: "A thick animated RGB divider line.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/730d340c8008758ac291ebc555f818f851feda0f/Assets/RGB%20Line%20Thick.gif?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/730d340c8008758ac291ebc555f818f851feda0f/Assets/RGB%20Line%20Thick.gif" width="100%" />`,
    },
    {
      title: "Blue Line",
      description: "A thin animated blue divider line.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/ddf2e61e40a672d5148927e186f409efbda38ef5/Assets/Blue%20Line.gif?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/ddf2e61e40a672d5148927e186f409efbda38ef5/Assets/Blue%20Line.gif" width="100%" height="2px" />`,
    },
    {
      title: "Blue Line Thick",
      description: "A thick blue line for dividing sections.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/ddf2e61e40a672d5148927e186f409efbda38ef5/Assets/Blue%20Line.gif?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/ddf2e61e40a672d5148927e186f409efbda38ef5/Assets/Blue%20Line.gif" width="100%">`,
    },
    {
      title: "Blue Pink Line",
      description: "A colorful line combining blue and pink hues.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/4c8a729bb53e68ad274c9a854060a273949a6d35/Assets/Blue%20Pink%20Line.gif?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/4c8a729bb53e68ad274c9a854060a273949a6d35/Assets/Blue%20Pink%20Line.gif" width="100%">`,
    },
    {
      title: "Starlight Line",
      description: "A shimmering starlight line to add visual flair.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/45123f007c79aa8d0c8d9b11b3ff72d6bf4744c7/Assets/Star%20Light%20Line.gif?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/45123f007c79aa8d0c8d9b11b3ff72d6bf4744c7/Assets/Star%20Light%20Line.gif" width="100%">`,
    },
    {
      title: "Multicolor Static Line",
      description: "A colorful static line divider.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/1bb0f2254d2034e5769544f497e47f01b3b9b571/Assets/Multicolor%20Static%20Line.png?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/1bb0f2254d2034e5769544f497e47f01b3b9b571/Assets/Multicolor%20Static%20Line.png" width="100%">`,
    },
    {
      title: "Multicolor Segregated Line",
      description: "A colorful segmented static divider line.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/1bb0f2254d2034e5769544f497e47f01b3b9b571/Assets/Multicolor%20Segregated%20Line.png?raw=true",
      codeSnippet: `<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/1bb0f2254d2034e5769544f497e47f01b3b9b571/Assets/Multicolor%20Segregated%20Line.png" width="100%">`,
    },
    {
      title: "Wave Header",
      description: "A decorative wave for the top of your README.",
      imageUrl:
        "https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header",
      codeSnippet: `<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=header" width="100%"/>`,
    },
    {
      title: "Wave Footer",
      description: "A decorative wave for the bottom of your README.",
      imageUrl:
        "https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer",
      codeSnippet: `<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>`,
    },
  ],
  coding: [
    {
      title: "Leetcode Dark theme with Heatmap",
      description: "Displays Leetcode profile with dark theme and heatmap.",
      imageUrl:
        "https://leetcard.jacoblin.cool/{username}?theme=dark&font=Josefin%20Slab&ext=heatmap",
      codeSnippet: `<img height="180em" src="https://leetcard.jacoblin.cool/{username}?theme=dark&font=Josefin%20Slab&ext=heatmap"/>`,
    },
    {
      title: "Leetcode Problem Stats",
      description: "Leetcode stats with contest details in dark mode.",
      imageUrl:
        "https://leetcard.jacoblin.cool/{username}?ext=contest&theme=dark",
      codeSnippet: `<img height="180em" src="https://leetcard.jacoblin.cool/{username}?ext=contest&theme=dark"/>`,
    },
    {
      title: "Leetcode Light Heatmap",
      description:
        "Custom styled Leetcode card with heatmap and rounded borders.",
      imageUrl:
        "https://leetcard.jacoblin.cool/{username}?ext=heatmap&theme=wtf&font=M+PLUS+Rounded+1c&border=2&radius=20",
      codeSnippet: `<img height="180em" src="https://leetcard.jacoblin.cool/{username}?ext=heatmap&theme=wtf&font=M+PLUS+Rounded+1c&border=2&radius=20"/>`,
    },
    {
      title: "GFG Stats",
      description: "GeeksForGeeks profile statistics card.",
      imageUrl:
        "https://geeks-for-geeks-stats-card.vercel.app/?username={username}",
      codeSnippet: `<img height="180em" src="https://geeks-for-geeks-stats-card.vercel.app/?username={username}"/>`,
    },
    {
      title: "Codeforces Dark Theme Profile Stats",
      description: "Dispalys Codeforces Profile with dark theme",
      imageUrl:
        "https://codeforces-readme-stats.vercel.app/api/card?username=tourist&theme=github_dark&disable_animations=false&show_icons=true&force_username=true",
      codeSnippet: `<img height="180em" src="https://codeforces-readme-stats.vercel.app/api/card?username={username}&theme=github_dark&disable_animations=false&show_icons=true&force_username=true"/>`,
    },
    {
      title: "Codeforces Light Theme Profile Stats",
      description: "Dispalys Codeforces Profile with light theme",
      imageUrl:
        "https://codeforces-readme-stats.vercel.app/api/card?username=tourist&theme=default&disable_animations=false&show_icons=true&force_username=true",
      codeSnippet: `<img height="180em" src="https://codeforces-readme-stats.vercel.app/api/card?username={username}&theme=default&disable_animations=false&show_icons=true&force_username=true"/>`,
    },
    {
      title: "AtCoder Stats",
      description: "Displays AtCoder Profile Statistics",
      imageUrl: "https://atcoder-readme-stats.vercel.app/stats/tourist?show_icons=true&width=450",
      codeSnippet: `![atcoder stats](https://atcoder-readme-stats.vercel.app/stats/{username}?show_icons=true&width=450)`
    },
  ],
  gitanimals: [
    {
      title: "GitAnimals - Line Mode",
      description: "Displays a GitAnimal in line mode for your GitHub profile.",
      imageUrl: "https://render.gitanimals.org/lines/{username}",
      codeSnippet: `<a href="https://www.gitanimals.org/en_US?utm_medium=image&utm_source={username}&utm_content=line">
      <img src="https://render.gitanimals.org/lines/{username}" width="600" height="120"/></a>`,
    },
    {
      title: "GitAnimals - Farm Mode",
      description: "Shows your GitAnimal farm with your GitHub activity.",
      imageUrl: "https://render.gitanimals.org/farms/{username}",
      codeSnippet: `<a href="https://www.gitanimals.org/en_US?utm_medium=image&utm_source={username}&utm_content=farm">
      <img src="https://render.gitanimals.org/farms/{username}" width="600" height="300"/></a>`,
    },
    {
      title: "GitAnimals - Guild Mode",
      description:
        "Renders a static view of the guild with the specified guild ID.",
      imageUrl: "https://render.gitanimals.org/guilds/673932991743754174/draw",
      codeSnippet: `<a href="https://www.gitanimals.org/">
      <img src="https://render.gitanimals.org/guilds/673932991743754174/draw" width="600" height="300" alt="gitanimals"/></a>`,
    },
  ],
  decorations: [
    {
      title: "Wing Left",
      description: "A decorative left wing image for aesthetic enhancement.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/04381e30cf956503e49302a2b1feff0abe3066ec/Assets/Wing%20Left.png?raw=true",
      codeSnippet: `<img height="150" width="150" src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/04381e30cf956503e49302a2b1feff0abe3066ec/Assets/Wing%20Left.png">`,
    },
    {
      title: "Wing Right",
      description: "A decorative right wing image to pair with the left wing.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/04381e30cf956503e49302a2b1feff0abe3066ec/Assets/Wing%20Right.png?raw=true",
      codeSnippet: `<img height="150" width="150" src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/04381e30cf956503e49302a2b1feff0abe3066ec/Assets/Wing%20Right.png">`,
    },
  ],
  socials: [
    {
      title: "Animated LinkedIn",
      description: "Animated LinkedIn icon for profile headers or footers.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/linkedin.gif?raw=true",
      codeSnippet: `<img src = "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/linkedin.gif" width="100">`,
    },
    {
      title: "Animated Instagram",
      description: "Animated Instagram icon for social sections.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/instagram.gif?raw=true",
      codeSnippet: `<img src = "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/instagram.gif" width="100">`,
    },
    {
      title: "Animated Discord",
      description: "Animated Discord icon for gaming and community links.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/discord.gif?raw=true",
      codeSnippet: `<img src = "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/discord.gif" width="100">`,
    },
    {
      title: "Animated Facebook",
      description: "Animated Facebook icon for classic social media presence.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/facebook.gif?raw=true",
      codeSnippet: `<img src = "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/facebook.gif" width="100">`,
    },
    {
      title: "LinkedIn",
      description: "Static LinkedIn logo.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/linkedin-1.png?raw=true",
      codeSnippet: `<img src = "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/linkedin-1.png" width="100">`,
    },
    {
      title: "Instagram",
      description: "Static Instagram logo.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/instagram-1.webp?raw=true",
      codeSnippet: `<img src = "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/instagram-1.webp" width="100">`,
    },
    {
      title: "Discord",
      description: "Static Discord logo.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/discord-1.png?raw=true",
      codeSnippet: `<img src = "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/discord-1.png" width="100">`,
    },
    {
      title: "Facebook",
      description: "Static Facebook logo.",
      imageUrl:
        "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/facebook-1.png?raw=true",
      codeSnippet: `<img src = "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/facebook-1.png" width="100">`,
    },
  ],
    achievements: [
    {
      title: "GitHub Trophies",
      description:
        "Dynamically generated GitHub Stat Trophies",
      imageUrl:
        "https://github-trophies.vercel.app/?username={username}",
      codeSnippet:
        "![](https://github-trophies.vercel.app/?username={username})",
    },
  ],
  discontinued: [
    {
      title: "Vercel Tokyo Stats",
      description:
        "Classic GitHub stats card using Vercel's GitHub Readme Stats with Tokyo Night theme",
      imageUrl:
        "https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&locale=en&theme=tokyonight",
      codeSnippet:
        "![Stats Card 5](https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&locale=en&theme=tokyonight)",
    },
    {
      title: "Synthwave Merge Tracker",
      description:
        "GitHub Readme Stats card showing PR reviews and merge metrics in Synthwave theme",
      imageUrl:
        "https://github-readme-stats.vercel.app/api?username={username}&show=reviews,prs_merged,prs_merged_percentage&show_icons=true&theme=synthwave",
      codeSnippet:
        "![Stats Card 7](https://github-readme-stats.vercel.app/api?username={username}&show=reviews,prs_merged,prs_merged_percentage&show_icons=true&theme=synthwave)",
    },
    {
      title: "High Contrast Insights",
      description:
        "GitHub stats card with rank icon (GitHub logo) and High Contrast theme",
      imageUrl:
        "https://github-readme-stats.vercel.app/api?username={username}&rank_icon=github&theme=highcontrast",
      codeSnippet:
        "![Stats Card 8](https://github-readme-stats.vercel.app/api?username={username}&rank_icon=github&theme=highcontrast)",
    },
    {
      title: "Percentile Rank Card",
      description:
        "GitHub stats card with percentile rank icon and Vision Friendly Dark theme",
      imageUrl:
        "https://github-readme-stats.vercel.app/api?username={username}&rank_icon=percentile&theme=vision-friendly-dark",
      codeSnippet:
        "![Stats Card 9](https://github-readme-stats.vercel.app/api?username={username}&rank_icon=percentile&theme=vision-friendly-dark)",
    },
    {
      title: "Views Counter - Glitch",
      description: "Simple visitor badge using profile-counter from Glitch.",
      imageUrl: "https://profile-counter.glitch.me/{username}/count.svg",
      codeSnippet: `<img src="https://profile-counter.glitch.me/{username}/count.svg" alt="visitor badge"/>`,
    },
    {
      title: "Snake Game",
      description: "Animated snake eating your contributions",
      imageUrl:
        "https://github.com/mayur-pagote/mayur-pagote/blob/output/github-contribution-grid-snake.svg",
      codeSnippet:
        "![Snake animation](https://github.com/{username}/{username}/blob/output/github-contribution-grid-snake.svg)",
    },
    {
      title: "Most Used Language Card 1",
      description: "Displays top 5 most used languages.",
      imageUrl:
        "https://github-readme-stats.vercel.app/api/top-langs/?username={username}&langs_count=5",
      codeSnippet: `<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&langs_count=5"/>`,
    },
    {
      title: "Most Used Language Card 2",
      description: "Compact layout of most used languages.",
      imageUrl:
        "https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact",
      codeSnippet: `<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact"/>`,
    },
    {
      title: "Most Used Language Card 3",
      description: "Donut-vertical layout with dark theme.",
      imageUrl:
        "https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=donut-vertical&theme=dark",
      codeSnippet: `<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=donut-vertical&theme=dark"/>`,
    },
    {
      title: "Most Used Language Card 4",
      description: "Pie chart layout with merko theme.",
      imageUrl:
        "https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=pie&theme=merko",
      codeSnippet: `<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=pie&theme=merko"/>`,
    },
    {
      title: "Most Used Language Card 5",
      description: "Minimal language card without progress bar.",
      imageUrl:
        "https://github-readme-stats.vercel.app/api/top-langs/?username={username}&hide_progress=true",
      codeSnippet: `<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username={username}&hide_progress=true"/>`,
    },
    {
      title: "Repository Stats",
      description: "Detailed repository information card",
      imageUrl:
        "https://github-readme-stats.vercel.app/api/pin/?username={username}&repo={repo}&theme=radical",
      codeSnippet: `![Repo Stats](https://github-readme-stats.vercel.app/api/pin/?username={username}&repo={repo}&theme=radical)`,
    },
    {
      title: "Repo Details",
      description: "Shows a styled pinned GitHub repository card.",
      imageUrl:
        "https://github-readme-stats.vercel.app/api/pin/?username={username}&repo={repo}&theme=dark&title_color=C2FFC7&icon_color=CB9DF0&text_color=ffffff&bg_color=000000",
      codeSnippet: `<img src="https://github-readme-stats.vercel.app/api/pin/?username={username}&repo={repo}&theme=dark&title_color=C2FFC7&icon_color=CB9DF0&text_color=ffffff&bg_color=000000"/>`,
    },
    {
      title: "Codeforces Stats",
      description: "Codeforces rating and contest stats card.",
      imageUrl:
        "https://codeforces-readme-stats.vercel.app/api/card?username={username}",
      codeSnippet: `<img height="180em" src="https://codeforces-readme-stats.vercel.app/api/card?username={username}"/>`,
    },
  ],
};