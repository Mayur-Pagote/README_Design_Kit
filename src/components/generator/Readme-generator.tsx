import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePage from '@/components/generator/WelcomePage';
import AboutMePage from '@/components/generator/AboutMePage';
import GitHubStatsPage from '@/components/generator/GitHubStatsPage';
import SocialLinksPage from '@/components/generator/SocialLinksPage';
import TechStackPage from '@/components/generator/TechStackPage';
import AdditionalStuffPage from '@/components/generator/AdditionalStuffPage';
import FinalPage from '@/components/generator/FinalPage';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full"
        >
            {/* @ts-ignore */}
          <CurrentPageComponent {...getPageProps()} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
