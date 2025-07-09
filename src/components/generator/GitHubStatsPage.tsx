
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BarChart3, Settings, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { GeneratorState } from './Readme-generator';
import ProgressIndicator from './ProgressIndicator';

interface GitHubStatsPageProps {
  state: GeneratorState;
  setState: (state: GeneratorState) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const GitHubStatsPage = ({ state, setState, currentPage, totalPages, nextPage, prevPage }: GitHubStatsPageProps) => {
  const [loading, setLoading] = useState(false);
  const [ setGithubData] = useState<any>(null);

  useEffect(() => {
    if (state.username) {
      fetchGitHubData();
    }
  }, [state.username]);

  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${state.username}`);
      if (response.ok) {
        const data = await response.json();
        setGithubData(data);
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateGithubStats = (field: keyof typeof state.githubStats, value: any) => {
    setState({
      ...state,
      githubStats: {
        ...state.githubStats,
        [field]: value,
      },
    });
  };

  const themes = [
    { value: 'dark', label: 'Dark' },
    { value: 'radical', label: 'Radical' },
    { value: 'default', label: 'Default' },
    { value: 'merko', label: 'Merko' },
    { value: 'gruvbox', label: 'Gruvbox' },
    { value: 'tokyonight', label: 'Tokyo Night' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <ProgressIndicator current={currentPage} total={totalPages - 1} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-foreground px-4 py-2 rounded-full mb-4 text-sm font-medium">
              <BarChart3 className="w-4 h-4" />
              GitHub Stats
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-primary bg-clip-text text-transparent">
              Flex your GitHub Stats
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Showcase your GitHub achievements with beautiful, customizable stat cards.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-background/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-foreground">Customization</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Theme</Label>
                    <Select
                      value={state.githubStats.theme}
                      onValueChange={(value) => updateGithubStats('theme', value)}
                    >
                      <SelectTrigger className="bg-background/50 border-slate-600 transition-colors text-muted-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {themes.map((theme) => (
                          <SelectItem key={theme.value} value={theme.value} className="text-white hover:bg-slate-700">
                            {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                  <div className="bg-background/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-medium text-muted-foreground">Minimal Impact Card</h4>
                    <p className="text-muted-foreground text-sm py-3">Simple stats card with minimal visual using GitHub Stats Alpha</p>
                    <img src={`https://github-stats-alpha.vercel.app/api/?username=${state.username}`} alt="Stats Card 6" />
                  </div>
                  </div>
                </div>
              </div>

              {loading && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Please wait for images to load after changing any values</span>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                  <div className="bg-background/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-medium text-foreground">Contribution Streak Card</h4>
                    <p className="text-muted-foreground text-sm">Tracks your GitHub streak stats in a clean and transparent style</p>
                    <img className='w-full h-64 object-contain' src={`https://github-readme-streak-stats.herokuapp.com?user=${state.username}&theme=transparent&hide_border=true`} alt="Stats Card 6" />
                  </div>
              </div>
              <div className="space-y-3">
                  <div className="bg-background/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-medium text-foreground">Most Used Languages</h4>
                    <p className="text-muted-foreground text-sm py-3">Tracks your most used languages in a clean and transparent style</p>
                    <img className='w-full h-64 object-contain' src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${state.username}&layout=compact`} alt="Stats Card 6" />
                  </div>
              </div>
            </motion.div>
          </div>  

          <div className="flex justify-between items-center">
            <Button
              onClick={prevPage}
              variant="outline"
              className="flex items-center gap-2 border-slate-600 text-foreground hover:text-foreground/90 hover:border-slate-500"
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

export default GitHubStatsPage;
