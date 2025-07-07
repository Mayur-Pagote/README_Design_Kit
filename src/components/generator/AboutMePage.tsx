
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Telescope, Users, HelpCircle, Lightbulb, MessageCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { GeneratorState } from './Readme-generator';
import ProgressIndicator from './ProgressIndicator';

interface AboutMePageProps {
  state: GeneratorState;
  setState: (state: GeneratorState) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const AboutMePage = ({ state, setState, currentPage, totalPages, nextPage, prevPage }: AboutMePageProps) => {
  const updateAboutMe = (field: keyof typeof state.aboutMe, value: string) => {
    setState({
      ...state,
      aboutMe: {
        ...state.aboutMe,
        [field]: value,
      },
    });
  };

  const fields = [
    {
      key: 'currentlyWorking' as const,
      icon: Telescope,
      emoji: '🔭',
      label: "I'm currently working on",
      placeholder: 'e.g., a full-stack web application using React and Node.js',
    },
    {
      key: 'lookingToCollaborate' as const,
      icon: Users,
      emoji: '👯',
      label: "I'm looking to collaborate on",
      placeholder: 'e.g., open source projects, web development, AI/ML projects',
    },
    {
      key: 'lookingForHelp' as const,
      icon: HelpCircle,
      emoji: '🤝',
      label: "I'm looking for help with",
      placeholder: 'e.g., system design, cloud architecture, DevOps practices',
    },
    {
      key: 'currentlyLearning' as const,
      icon: Lightbulb,
      emoji: '🌱',
      label: "I'm currently learning",
      placeholder: 'e.g., Kubernetes, Go programming, machine learning',
    },
    {
      key: 'askMeAbout' as const,
      icon: MessageCircle,
      emoji: '💬',
      label: 'Ask me about',
      placeholder: 'e.g., React, JavaScript, web development, career advice',
    },
    {
      key: 'funFact' as const,
      icon: Zap,
      emoji: '⚡',
      label: 'Fun fact',
      placeholder: 'e.g., I love hiking and have climbed 15 mountains!',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator current={currentPage} total={totalPages - 1} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-4 text-sm font-medium">
              <User className="w-4 h-4" />
              About Me
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Add a small introduction
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Tell the world about yourself! Share what you're working on, what you're passionate about, and what makes you unique.
            </p>
          </motion.div>

          <div className="grid gap-6 mb-12">
            {fields.map((field, index) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{field.emoji}</span>
                      <h3 className="font-semibold text-white">{field.label}</h3>
                    </div>
                    <Textarea
                      placeholder={field.placeholder}
                      value={state.aboutMe[field.key]}
                      onChange={(e) => updateAboutMe(field.key, e.target.value)}
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 transition-colors resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={prevPage}
              variant="outline"
              className="flex items-center gap-2 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>

            <Button
              onClick={nextPage}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
