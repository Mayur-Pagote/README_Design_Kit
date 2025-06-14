
import ComponentCard from './ComponentCard';

interface PreviewGridProps {
  selectedCategory: string;
  username: string;
}

const componentsData = {
  graphs: [
    {
      title: "GitHub Stats",
      description: "Display your GitHub statistics with a beautiful card",
      imageUrl: "https://github-readme-stats.vercel.app/api?username=mayur-pagote&show_icons=true&theme=radical",
      codeSnippet: "![GitHub Stats](https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=radical)"
    },
    {
      title: "Contribution Graph",
      description: "Show your contribution activity over time",
      imageUrl: "https://github-readme-activity-graph.vercel.app/graph?username=mayur-pagote&theme=react-dark",
      codeSnippet: "![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=react-dark)"
    },
    {
      title: "Streak Stats",
      description: "Display your GitHub streak statistics",
      imageUrl: "https://github-readme-streak-stats.herokuapp.com/?user=mayur-pagote&theme=radical",
      codeSnippet: "![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user={username}&theme=radical)"
    }
  ],
  cards: [
    {
      title: "Profile Summary",
      description: "A comprehensive profile summary card",
      imageUrl: "https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=mayur-pagote&theme=radical",
      codeSnippet: "![Profile Summary](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username={username}&theme=radical)"
    },
    {
      title: "Top Languages",
      description: "Display your most used programming languages",
      imageUrl: "https://github-readme-stats.vercel.app/api/top-langs/?username=mayur-pagote&theme=radical&layout=compact",
      codeSnippet: "![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username={username}&theme=radical&layout=compact)"
    },
    {
      title: "Repository Card",
      description: "Showcase a specific repository",
      imageUrl: "https://github-readme-stats.vercel.app/api/pin/?username=mayur-pagote&repo=readme-design-kit&theme=radical",
      codeSnippet: "![Repo Card](https://github-readme-stats.vercel.app/api/pin/?username={username}&repo=your-repo-name&theme=radical)"
    }
  ],
  animation: [
    {
      title: "Typing Animation",
      description: "Animated typing text effect",
      imageUrl: "https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=F75C7E&width=435&lines=Hello+World!;I'm+a+Developer;Welcome+to+my+Profile!",
      codeSnippet: "![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=F75C7E&width=435&lines=Hello+World!;I'm+{username};Welcome+to+my+Profile!)"
    },
    {
      title: "Snake Game",
      description: "Animated snake eating your contributions",
      imageUrl: "https://github.com/mayur-pagote/mayur-pagote/blob/output/github-contribution-grid-snake.svg",
      codeSnippet: "![Snake animation](https://github.com/{username}/{username}/blob/output/github-contribution-grid-snake.svg)"
    },
    {
      title: "Hand Waving",
      description: "Animated waving hand GIF",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hand%20Waving.gif?raw=true",
      codeSnippet: "![Hand Waving](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hand%20Waving.gif)"
    },
    {
      title: "Blue Line",
      description: "Animated blue line divider",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Blue%20Line.gif?raw=true",
      codeSnippet: "![Blue Line](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Blue%20Line.gif)"
    },
    {
      title: "Blue Pink Line",
      description: "Colorful animated line divider",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Blue%20Pink%20Line.gif?raw=true",
      codeSnippet: "![Blue Pink Line](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Blue%20Pink%20Line.gif)"
    },
    {
      title: "Gmail Thug",
      description: "Cool animated Gmail character",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Gmail%20Thug.gif?raw=true",
      codeSnippet: "![Gmail Thug](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Gmail%20Thug.gif)"
    },
    {
      title: "Kyubey",
      description: "Cute animated character",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Kyubey.gif?raw=true",
      codeSnippet: "![Kyubey](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Kyubey.gif)"
    },
    {
      title: "Pixel Cat",
      description: "Retro pixel art cat animation",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Pixel%20Cat.gif?raw=true",
      codeSnippet: "![Pixel Cat](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Pixel%20Cat.gif)"
    },
    {
      title: "Plumber",
      description: "Animated plumber character",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Plumber.gif?raw=true",
      codeSnippet: "![Plumber](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Plumber.gif)"
    },
    {
      title: "Professional Handshake",
      description: "Professional handshake animation",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Professional%20Handshake.gif?raw=true",
      codeSnippet: "![Professional Handshake](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Professional%20Handshake.gif)"
    },
    {
      title: "RGB Line Medium",
      description: "Medium RGB animated line",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/RGB%20Line%20Medium.gif?raw=true",
      codeSnippet: "![RGB Line Medium](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/RGB%20Line%20Medium.gif)"
    },
    {
      title: "RGB Line Thick",
      description: "Thick RGB animated line",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/RGB%20Line%20Thick.gif?raw=true",
      codeSnippet: "![RGB Line Thick](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/RGB%20Line%20Thick.gif)"
    },
    {
      title: "RGB Line Thin",
      description: "Thin RGB animated line",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/RGB%20Line%20Thin.gif?raw=true",
      codeSnippet: "![RGB Line Thin](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/RGB%20Line%20Thin.gif)"
    },
    {
      title: "Rabbit Happy",
      description: "Happy rabbit animation",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Rabit%20Happy.gif?raw=true",
      codeSnippet: "![Rabbit Happy](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Rabit%20Happy.gif)"
    },
    {
      title: "Star Light Line",
      description: "Sparkling star line animation",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Star%20Light%20Line.gif?raw=true",
      codeSnippet: "![Star Light Line](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Star%20Light%20Line.gif)"
    }
  ],
  counter: [
    {
      title: "Profile Views",
      description: "Track profile visits with a counter",
      imageUrl: "https://komarev.com/ghpvc/?username=mayur-pagote&color=blueviolet&style=flat-square&label=Profile+Views",
      codeSnippet: "![Profile Views](https://komarev.com/ghpvc/?username={username}&color=blueviolet&style=flat-square&label=Profile+Views)"
    }
  ],
  emojis: [
    {
      title: "Developer Emojis",
      description: "Collection of developer-themed emojis",
      imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIxMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMzMzMyI+8J+UpSDwn5qAIPCfkZjwn46J8J+OryDwn5KbIPCfmIzigJDvuI/wn5OFPC90ZXh0Pjwvc3ZnPg==",
      codeSnippet: "🔥 🚀 👨‍💻🎉🎯 💛 😌‍🏽👅"
    },
    {
      title: "Alien Monster",
      description: "Cute alien monster emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Alien%20Monster.png?raw=true",
      codeSnippet: "![Alien Monster](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Alien%20Monster.png)"
    },
    {
      title: "Brain",
      description: "Brain emoji for intelligence",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Brain.png?raw=true",
      codeSnippet: "![Brain](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Brain.png)"
    },
    {
      title: "Bug",
      description: "Bug emoji for debugging",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Bug.png?raw=true",
      codeSnippet: "![Bug](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Bug.png)"
    },
    {
      title: "Comet",
      description: "Shooting star comet",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Comet.png?raw=true",
      codeSnippet: "![Comet](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Comet.png)"
    },
    {
      title: "Confused Face",
      description: "Confused expression emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Confused%20Face.png?raw=true",
      codeSnippet: "![Confused Face](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Confused%20Face.png)"
    },
    {
      title: "Eyes",
      description: "Watching eyes emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Eyes.png?raw=true",
      codeSnippet: "![Eyes](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Eyes.png)"
    },
    {
      title: "Firm Hand Waving",
      description: "Hand waving gesture",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Firm%20Hand%20Waving.png?raw=true",
      codeSnippet: "![Firm Hand Waving](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Firm%20Hand%20Waving.png)"
    },
    {
      title: "Firm Handshake",
      description: "Professional handshake emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Firm%20Handshake.png?raw=true",
      codeSnippet: "![Firm Handshake](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Firm%20Handshake.png)"
    },
    {
      title: "Flame",
      description: "Fire flame emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Flame.png?raw=true",
      codeSnippet: "![Flame](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Flame.png)"
    },
    {
      title: "Flexed Biceps",
      description: "Strong arm emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Flexed%20Biceps.png?raw=true",
      codeSnippet: "![Flexed Biceps](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Flexed%20Biceps.png)"
    },
    {
      title: "Heart and Fire",
      description: "Passionate heart with fire",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Heart%20and%20Fire.png?raw=true",
      codeSnippet: "![Heart and Fire](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Heart%20and%20Fire.png)"
    },
    {
      title: "Hot Cup",
      description: "Hot coffee cup emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hot%20Cup.png?raw=true",
      codeSnippet: "![Hot Cup](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hot%20Cup.png)"
    },
    {
      title: "Hourglass",
      description: "Time hourglass emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hourglass.png?raw=true",
      codeSnippet: "![Hourglass](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Hourglass.png)"
    },
    {
      title: "Man Technologist",
      description: "Male developer emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Man%20Technologist.png?raw=true",
      codeSnippet: "![Man Technologist](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Man%20Technologist.png)"
    },
    {
      title: "Musical Notes",
      description: "Music notes emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Musical%20Notes.png?raw=true",
      codeSnippet: "![Musical Notes](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Musical%20Notes.png)"
    },
    {
      title: "Nerd Face",
      description: "Geeky nerd face emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Nerd%20Face.png?raw=true",
      codeSnippet: "![Nerd Face](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Nerd%20Face.png)"
    },
    {
      title: "Robot",
      description: "Robot face emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Roboto.png?raw=true",
      codeSnippet: "![Robot](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Roboto.png)"
    },
    {
      title: "Rocket",
      description: "Rocket launch emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Rocket.png?raw=true",
      codeSnippet: "![Rocket](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Rocket.png)"
    },
    {
      title: "Spiral",
      description: "Spiral design element",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Spiral.png?raw=true",
      codeSnippet: "![Spiral](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Spiral.png)"
    },
    {
      title: "Star",
      description: "Shining star emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Star.png?raw=true",
      codeSnippet: "![Star](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Star.png)"
    },
    {
      title: "Thinking Face",
      description: "Thoughtful thinking emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Thinking%20Face.png?raw=true",
      codeSnippet: "![Thinking Face](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Thinking%20Face.png)"
    },
    {
      title: "Wing Left",
      description: "Left wing design element",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Wing%20Left.png?raw=true",
      codeSnippet: "![Wing Left](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Wing%20Left.png)"
    },
    {
      title: "Wing Right",
      description: "Right wing design element",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Wing%20Right.png?raw=true",
      codeSnippet: "![Wing Right](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Wing%20Right.png)"
    },
    {
      title: "Writing",
      description: "Writing hand emoji",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Writing.png?raw=true",
      codeSnippet: "![Writing](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Writing.png)"
    }
  ],
  quotes: [
    {
      title: "Dev Quotes",
      description: "Inspirational quotes for developers",
      imageUrl: "https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical",
      codeSnippet: "![Dev Quotes](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical)"
    }
  ],
  languages: [
    {
      title: "Language Stats Donut",
      description: "Programming languages in donut chart format",
      imageUrl: "https://github-readme-stats.vercel.app/api/top-langs/?username=mayur-pagote&theme=radical&layout=donut",
      codeSnippet: "![Languages](https://github-readme-stats.vercel.app/api/top-langs/?username={username}&theme=radical&layout=donut)"
    }
  ],
  repos: [
    {
      title: "Repository Stats",
      description: "Detailed repository information card",
      imageUrl: "https://github-readme-stats.vercel.app/api/pin/?username=mayur-pagote&repo=readme-design-kit&theme=radical",
      codeSnippet: "![Repo Stats](https://github-readme-stats.vercel.app/api/pin/?username={username}&repo=your-repo-name&theme=radical)"
    }
  ],
  dividers: [
    {
      title: "Multicolor Segregated Line",
      description: "Colorful segmented divider line",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Multicolor%20Segregated%20Line.png?raw=true",
      codeSnippet: "![Multicolor Segregated Line](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Multicolor%20Segregated%20Line.png)"
    },
    {
      title: "Multicolor Static Line",
      description: "Static colorful divider line",
      imageUrl: "https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Multicolor%20Static%20Line.png?raw=true",
      codeSnippet: "![Multicolor Static Line](https://github.com/Mayur-Pagote/README_Design_Kit/blob/main/public/Assets/Multicolor%20Static%20Line.png)"
    }
  ]
};

const PreviewGrid = ({ selectedCategory, username }: PreviewGridProps) => {
  const components = componentsData[selectedCategory as keyof typeof componentsData] || componentsData.graphs;

  return (
    <div className="flex-1 p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component, index) => (
            <ComponentCard
              key={`${selectedCategory}-${index}`}
              title={component.title}
              description={component.description}
              imageUrl={component.imageUrl.replace(/mayur-pagote/g, username)}
              codeSnippet={component.codeSnippet}
              username={username}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewGrid;
