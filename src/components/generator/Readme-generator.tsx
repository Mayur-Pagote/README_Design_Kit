import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePage from '@/components/generator/WelcomePage';
import AboutMePage from '@/components/generator/AboutMePage';
import GitHubStatsPage from '@/components/generator/GitHubStatsPage';
import SocialLinksPage from '@/components/generator/SocialLinksPage';
import TechStackPage from '@/components/generator/TechStackPage';
import AdditionalStuffPage from '@/components/generator/AdditionalStuffPage';
import FinalPage from '@/components/generator/FinalPage';
import LiquidChrome from '../LandingComponents/LiquidChrome';
import Aurora from '../LandingComponents/Aurora';
import { useTheme } from '../theme-provider';

export interface GeneratorState {
  username: string;
  aboutMe: {
    currentlyWorking: string;
    lookingToCollaborate: string;
    lookingForHelp: string;
    currentlyLearning: string;
    askMeAbout: string;
    funFact: string;
  };
  githubStats: {
    theme: string;
    showBorder: boolean;
    showLifetimeCommits: boolean;
    showPrivateCommits: boolean;
  };
  socialLinks: {
    bluesky: string;
    behance: string;
    discord: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    medium: string;
    pinterest: string;
    quora: string;
    reddit: string;
    stackoverflow: string;
    tiktok: string;
    twitch: string;
    x: string;
    youtube: string;
    codepen: string;
  };
  techStack: {
    languages: string[];
    hosting: string[];
    frameworks: string[];
    servers: string[];
    databases: string[];
    design: string[];
    ml: string[];
    cicd: string[];
    other: string[];
  };
  additional: {
    trophies: {
      enabled: boolean;
      theme: string;
      showBorder: boolean;
      showBackground: boolean;
    };
    visitorCount: {
      enabled: boolean;
      color: string;
      icon: string;
    };
    devQuotes: {
      enabled: boolean;
      theme: string;
      layout: string;
    };
    topRepos: {
      enabled: boolean;
    };
  };
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [containerHeight, setContainerHeight] = useState('100vh');
  const containerRef = useRef<HTMLDivElement>(null);
  const [generatorState, setGeneratorState] = useState<GeneratorState>({
    username: '',
    aboutMe: {
      currentlyWorking: '',
      lookingToCollaborate: '',
      lookingForHelp: '',
      currentlyLearning: '',
      askMeAbout: '',
      funFact: '',
    },
    githubStats: {
      theme: 'dark',
      showBorder: false,
      showLifetimeCommits: true,
      showPrivateCommits: false,
    },
    socialLinks: {
      bluesky: '',
      behance: '',
      discord: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      medium: '',
      pinterest: '',
      quora: '',
      reddit: '',
      stackoverflow: '',
      tiktok: '',
      twitch: '',
      x: '',
      youtube: '',
      codepen: '',
    },
    techStack: {
      languages: [],
      hosting: [],
      frameworks: [],
      servers: [],
      databases: [],
      design: [],
      ml: [],
      cicd: [],
      other: [],
    },
    additional: {
      trophies: {
        enabled: false,
        theme: 'radical',
        showBorder: false,
        showBackground: false,
      },
      visitorCount: {
        enabled: false,
        color: 'cyan',
        icon: 'default',
      },
      devQuotes: {
        enabled: false,
        theme: 'radical',
        layout: 'horizontal',
      },
      topRepos: {
        enabled: false,
      },
    },
  });

  const pages = [
    WelcomePage,
    AboutMePage,
    GitHubStatsPage,
    SocialLinksPage,
    TechStackPage,
    AdditionalStuffPage,
    FinalPage,
  ];

  const CurrentPageComponent = pages[currentPage];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageProps = () => {
    const baseProps = {
      state: generatorState,
      setState: setGeneratorState,
    };

    if (currentPage === 0) {
      // WelcomePage props
      return {
        ...baseProps,
        nextPage,
      };
    } else if (currentPage === pages.length - 1) {
      // FinalPage props
      return {
        ...baseProps,
        goToPage,
      };
    } else {
      // Other pages props
      return {
        ...baseProps,
        currentPage,
        totalPages: pages.length,
        nextPage,
        prevPage,
      };
    }
  };

  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Update background height based on content
  useEffect(() => {
    if (containerRef.current) {
      const updateHeight = () => {
        const contentHeight = containerRef.current?.scrollHeight || 0;
        const viewportHeight = window.innerHeight;
        const finalHeight = Math.max(contentHeight, viewportHeight);
        setContainerHeight(`${finalHeight}px`);
      };

      updateHeight();
      window.addEventListener('resize', updateHeight);
      
      // Use MutationObserver to detect content changes
      const observer = new MutationObserver(updateHeight);
      observer.observe(containerRef.current, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      });

      return () => {
        window.removeEventListener('resize', updateHeight);
        observer.disconnect();
      };
    }
  }, [currentPage]);

  return (
    <div ref={containerRef} className="relative overflow-hidden min-h-screen flex flex-col">
      {/* Dynamic background that adapts to content height */}
      <div 
        className="absolute top-0 left-0 w-full -z-10 rounded-b-4xl overflow-hidden opacity-90"
        style={{ height: containerHeight }}
      >
        {isDark ? (
          // Dark mode: Flowing Aurora with vibrant purple gradients
          <Aurora
            colorStops={["#4338ca", "#6366f1", "#8b5cf6"]} 
            amplitude={1.5}
            speed={1.0}
          />
        ) : (
          // Light mode: Subtle LiquidChrome with paper-like colors
          <LiquidChrome
            color={[0.96, 0.97, 0.98]}
            mouseReact={true}
            amplitude={0.08}
            speed={0.6}
          />
        )}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full flex-1"
        >
            {/* @ts-ignore */}
          <CurrentPageComponent {...getPageProps()} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;