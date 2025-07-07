
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { GeneratorState } from './Readme-generator';

interface WelcomePageProps {
  state: GeneratorState;
  setState: (state: GeneratorState) => void;
  nextPage: () => void;
}

const WelcomePage = ({ state, setState, nextPage }: WelcomePageProps) => {
  const [username, setUsername] = useState(state.username);

  const handleNext = () => {
    if (username.trim()) {
      setState({ ...state, username: username.trim() }); 
      nextPage();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Best Profile Generator
          </motion.div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
            Create Your Perfect
            <br />
            GitHub Profile
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Generate a stunning GitHub profile README in minutes. 
            Showcase your skills, stats, and personality with our intuitive builder.
          </p>

          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-1">
                <div className="flex items-center gap-3 p-4">
                  <Github className="w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Enter your GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-0 bg-transparent text-white placeholder:text-slate-400 focus-visible:ring-0 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!username.trim()}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="mt-8 text-sm text-slate-400">
            <p>✨ No sign-up required • Free forever • Open source</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">GitHub Integration</h3>
                    <p className="text-sm text-slate-400">Real-time stats and data</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Beautiful Themes</h3>
                    <p className="text-sm text-slate-400">Multiple customization options</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">One-Click Export</h3>
                    <p className="text-sm text-slate-400">Copy or download instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
