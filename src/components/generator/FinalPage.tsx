import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, RefreshCw, Share2, CheckCircle, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SaveToGitHubDialog } from '@/components/github/SaveToGitHubDialog';
import type { GeneratorState } from './Readme-generator';

interface FinalPageProps {
  state: GeneratorState;
  goToPage: (page: number) => void;
}

const statsAlphaThemes: Record<string, {
  cc: string;
  tc: string;
  ic: string;
  bc: string;
}> = {
  dark: {
    cc: '0d1117',
    tc: 'c9d1d9',
    ic: '58a6ff',
    bc: '30363d',
  },
  radical: {
    cc: '141321',
    tc: 'a9fef7',
    ic: 'fe428e',
    bc: '141321',
  },
  default: {
    cc: 'ffffff',
    tc: '24292f',
    ic: '0969da',
    bc: 'd0d7de',
  },
  gruvbox: {
    cc: '282828',
    tc: 'ebdbb2',
    ic: 'fabd2f',
    bc: '3c3836',
  },
  merko: {
    cc: '0a0f0b',
    tc: '68f596',
    ic: '68f596',
    bc: '1f6f43',
  },
  tokyonight: {
    cc: '1a1b26',
    tc: 'c0caf5',
    ic: '7aa2f7',
    bc: '414868',
  },
};


const FinalPage = ({ state, goToPage }: FinalPageProps) => {
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);
  const [showGithubDialog, setShowGithubDialog] = useState(false);

  const selectedTheme =
    statsAlphaThemes[state.githubStats.theme] ?? statsAlphaThemes.dark;


  useEffect(() => {
    generateMarkdown();
  }, [state]);

  const generateMarkdown = () => {
    let md = `# Hi 👋, I'm ${state.username || 'Your Name'}\n\n`;

    // About Me Section
    const aboutSections = [];
    if (state.aboutMe.currentlyWorking) aboutSections.push(`🔭 I'm currently working on **${state.aboutMe.currentlyWorking}**`);
    if (state.aboutMe.lookingToCollaborate) aboutSections.push(`👯 I'm looking to collaborate on **${state.aboutMe.lookingToCollaborate}**`);
    if (state.aboutMe.lookingForHelp) aboutSections.push(`🤝 I'm looking for help with **${state.aboutMe.lookingForHelp}**`);
    if (state.aboutMe.currentlyLearning) aboutSections.push(`🌱 I'm currently learning **${state.aboutMe.currentlyLearning}**`);
    if (state.aboutMe.askMeAbout) aboutSections.push(`💬 Ask me about **${state.aboutMe.askMeAbout}**`);
    if (state.aboutMe.funFact) aboutSections.push(`⚡ Fun fact **${state.aboutMe.funFact}**`);

    if (aboutSections.length > 0) {
      md += aboutSections.join('\n\n') + '\n\n';
    }

    // Social Links
    const socialLinks = [];
    if (state.socialLinks.linkedin) socialLinks.push(`[LinkedIn](https://linkedin.com/in/${state.socialLinks.linkedin})`);
    if (state.socialLinks.x) socialLinks.push(`[Twitter](https://twitter.com/${state.socialLinks.x})`);
    if (state.socialLinks.instagram) socialLinks.push(`[Instagram](https://instagram.com/${state.socialLinks.instagram})`);
    if (state.socialLinks.youtube) socialLinks.push(`[YouTube](https://youtube.com/channel/${state.socialLinks.youtube})`);

    if (socialLinks.length > 0) {
      md += `## 🌐 Connect with me:\n${socialLinks.join(' | ')}\n\n`;
    }

    // Tech Stack
    const allTechs = [
      ...state.techStack.languages,
      ...state.techStack.frameworks,
      ...state.techStack.databases,
      ...state.techStack.hosting,
      ...state.techStack.design,
      ...state.techStack.ml,
      ...state.techStack.cicd,
      ...state.techStack.other
    ];

    if (allTechs.length > 0) {
      md += `## 💻 Tech Stack:\n`;
      md += allTechs.map(tech => `![${tech}](https://img.shields.io/badge/${tech.replace(/\s+/g, '%20')}-000000?style=for-the-badge&logo=${tech.toLowerCase().replace(/\s+/g, '')}&logoColor=white)`).join(' ');
      md += '\n\n';
    }

    // GitHub Stats
    if (state.username) {
      md += `## 📊 GitHub Stats:\n`;
      md += `![${state.username}'s GitHub stats](https://github-stats-alpha.vercel.app/api?username=${state.username}
      &cc=${selectedTheme.cc}
      &tc=${selectedTheme.tc}
      &ic=${selectedTheme.ic}
      &bc=${selectedTheme.bc})\n\n`.replace(/\s+/g, '');

      md += `![Top Langs](https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${state.username}&theme=${state.githubStats.theme}&hide_border=${!state.githubStats.showBorder}&layout=compact)\n\n`;
    }

    // Additional Components
    if (state.additional.trophies.enabled && state.username) {
      md += `## 🏆 GitHub Trophies\n`;
      md += `![](https://github-trophies.vercel.app/?username=${state.username}&theme=${state.additional.trophies.theme}&no-frame=${!state.additional.trophies.showBorder}&no-bg=${!state.additional.trophies.showBackground}&margin-w=4)\n\n`;
    }

    if (state.additional.devQuotes.enabled) {
      md += `## ✍️ Random Dev Quote\n`;
      md += `![](https://quotes-github-readme.vercel.app/api?type=${state.additional.devQuotes.layout}&theme=${state.additional.devQuotes.theme})\n\n`;
    }

    if (state.additional.visitorCount.enabled && state.username) {
      md += `## 👁️ Profile Views\n`;
      md += `![](https://komarev.com/ghpvc/?username=${state.username}&style=for-the-badge&color=${state.additional.visitorCount.color})\n\n`;
    }

    md += `<!-- Proudly created with GitHub Profile README Generator 🚀 -->`;

    setMarkdown(md);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded successfully!');
  };

  const renderMarkdownPreview = () => {
    // Simple markdown rendering for preview
    const html = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="my-2 max-w-full h-auto" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-700 px-1 rounded">$1</code>')
      .replace(/\n\n/g, '<br/><br/>');

    return { __html: html };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-foreground px-4 py-2 rounded-full mb-4 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Completed
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Your Awesome Profile is ready! 🎉
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your personalized GitHub profile README has been generated. Copy the code below or download it as a file.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-semibold text-foreground">Generated Markdown</h3>
                <Button
                  onClick={generateMarkdown}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-foreground hover:border-slate-500"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="relative">
                <Card>
                  <CardContent>
                    <ScrollArea className="h-[500px] w-full">
                      <Textarea
                        value={markdown}
                        readOnly
                        className="min-h-[500px] w-full bg-background/50 border-slate-600 text-muted-foreground font-mono text-sm resize-none"
                      />
                    </ScrollArea>
                  </CardContent>
                </Card>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    className={`${copied
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                      } transition-colors`}
                  >
                    {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleCopy}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </Button>

                <Button
                  onClick={downloadMarkdown}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download File
                </Button>

                <Button
                  onClick={() => setShowGithubDialog(true)}
                  className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Save to GitHub
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-background/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Preview</h3>
                <div className="bg-background/60 rounded-lg max-h-[400px] overflow-y-auto text-sm">
                  <div className="prose prose-invert max-w-none p-4">
                    <div dangerouslySetInnerHTML={renderMarkdownPreview()} className="space-y-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">What's next?</h3>

                <div className="bg-background/50 border border-slate-700 rounded-lg p-4">
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                    <li>Copy or download your README.md file</li>
                    <li>Go to your GitHub profile repository</li>
                    <li>Replace the content of your README.md</li>
                    <li>Commit and push the changes</li>
                    <li>Visit your GitHub profile to see the result!</li>
                  </ol>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => goToPage(0)}
                    variant="outline"
                    className="flex-1 border-slate-600 text-foreground hover:border-slate-500"
                  >
                    Create New
                  </Button>

                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => window.open(`https://github.com/${state.username}`, '_blank')}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Go to GitHub
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-400 space-y-2">
                  <p>Hey 👋 Help us grow by sharing! 🙏</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <SaveToGitHubDialog
        open={showGithubDialog}
        onOpenChange={setShowGithubDialog}
        files={[{ path: 'README.md', content: markdown }]}
        defaultMessage="Update README.md created with Readme Design Kit"
      />
    </div>
  );
};

export default FinalPage;
