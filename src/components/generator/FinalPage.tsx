import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, RefreshCw, Share2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { GeneratorState } from './Readme-generator';

interface FinalPageProps {
  state: GeneratorState;
  goToPage: (page: number) => void;
}

const FinalPage = ({ state, goToPage }: FinalPageProps) => {
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);

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
      md += `![${state.username}'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${state.username}&theme=${state.githubStats.theme}&hide_border=${!state.githubStats.showBorder}&include_all_commits=${state.githubStats.showLifetimeCommits}&count_private=${state.githubStats.showPrivateCommits})\n\n`;
      md += `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${state.username}&theme=${state.githubStats.theme}&hide_border=${!state.githubStats.showBorder}&layout=compact)\n\n`;
    }

    // Additional Components
    if (state.additional.trophies.enabled && state.username) {
      md += `## 🏆 GitHub Trophies\n`;
      md += `![](https://github-profile-trophy.vercel.app/?username=${state.username}&theme=${state.additional.trophies.theme}&no-frame=${!state.additional.trophies.showBorder}&no-bg=${!state.additional.trophies.showBackground}&margin-w=4)\n\n`;
    }

    if (state.additional.devQuotes.enabled) {
      md += `## ✍️ Random Dev Quote\n`;
      md += `![](https://quotes-github-readme.vercel.app/api?type=${state.additional.devQuotes.layout}&theme=${state.additional.devQuotes.theme})\n\n`;
    }

    if (state.additional.visitorCount.enabled && state.username) {
      md += `## 👁️ Profile Views\n`;
      md += `![](https://visitcount.itsvg.in/api?id=${state.username}&icon=${state.additional.visitorCount.icon}&color=${state.additional.visitorCount.color})\n\n`;
    }

    if (state.additional.topRepos.enabled && state.username) {
      md += `## 📈 Top Contributed Repo\n`;
      md += `![](https://github-contributor-stats.vercel.app/api?username=${state.username}&limit=5&theme=${state.githubStats.theme}&combine_all_yearly_contributions=true)\n\n`;
    }

    md += `---\n[![](https://visitcount.itsvg.in/api?id=${state.username || 'yourprofile'}&label=Profile%20Views&color=0&icon=0&pretty=false)](https://visitcount.itsvg.in)\n\n`;
    md += `<!-- Proudly created with GitHub Profile README Generator 🚀 -->`;

    setMarkdown(md);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success('Markdown copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full mb-4 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Completed
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Your Awesome Profile is ready! 🎉
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
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
                <h3 className="text-xl font-semibold text-white">Generated Markdown</h3>
                <Button
                  onClick={generateMarkdown}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
              
              <div className="relative">
                <Textarea
                  value={markdown}
                  readOnly
                  className="min-h-[500px] bg-slate-900/50 border-slate-600 text-white font-mono text-sm resize-none"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    className={`${
                      copied 
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
                  onClick={copyToClipboard}
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
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
                <div className="bg-slate-900/50 rounded-lg p-4 max-h-[400px] overflow-y-auto text-sm">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-white whitespace-pre-wrap font-mono text-xs">
                      {markdown.split('\n').slice(0, 30).join('\n')}
                      {markdown.split('\n').length > 30 && '\n...'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">What's next?</h3>
                
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                  <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
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
                    className="flex-1 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
                  >
                    Create New
                  </Button>
                  
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => window.open('https://github.com', '_blank')}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Go to GitHub
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-400 space-y-2">
                  <p>Need help? <a href="#" className="text-purple-400 hover:text-purple-300">Watch tutorial video</a></p>
                  <p>Hey 👋 Help us grow by sharing! 🙏</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
