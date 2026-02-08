import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FolderTree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { GeneratorState } from './Readme-generator';
import ProgressIndicator from "./ProgressIndicator";
import { parseTreeAndAddIcons } from '@/utils/treeParser';

interface ProjectStructurePageProps {
  state: GeneratorState;
  setState: (state: GeneratorState) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const ProjectStructurePage = ({ state, setState, currentPage, totalPages, nextPage, prevPage }: ProjectStructurePageProps) => {
  const handleTreeChange = (value: string) => {
    setState({
      ...state,
      projectTree: value,
    });
  };

  const handleApplyIcons = () => {
    // This physically adds them to the input text
    const enhanced = parseTreeAndAddIcons(state.projectTree);
    setState({
      ...state,
      projectTree: enhanced,
    });
  };

  const handleInsertExample = () => {
    const example = `. \n├── public/\n│   ├── favicon.ico\n│   └── index.html\n├── src/\n│   ├── assets/\n│   │   └── images/\n│   ├── components/\n│   │   ├── common/\n│   │   ├── layout/\n│   │   └── Header.tsx\n│   ├── hooks/\n│   │   └── useAuth.ts\n│   ├── pages/\n│   │   └── Home.tsx\n│   ├── utils/\n│   │   └── helpers.ts\n│   └── App.tsx\n├── .gitignore\n├── package.json\n├── tailwind.config.js\n└── README.md`;
    setState({
      ...state,
      projectTree: example,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <ProgressIndicator current={currentPage} total={totalPages - 1} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full mb-4 text-sm font-medium border border-purple-500/20">
              <FolderTree className="w-4 h-4" />
              Project Structure
            </div>
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Visualise your Project Structure
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Paste your project file tree below and we'll automatically add smart icons.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-200 flex-1">
                  Input Tree
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleInsertExample}
                    className="text-xs h-9 bg-slate-800/30 hover:bg-slate-700/30 border border-slate-700/50 text-slate-400 transition-all"
                  >
                    Insert Example 📄
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleApplyIcons}
                    className="text-xs h-9 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/40 hover:to-blue-600/40 border border-purple-500/30 text-purple-200 shadow-lg shadow-purple-500/10 backdrop-blur-sm transition-all duration-300"
                  >
                    Apply Icons to Text ✨
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="src/&#10;  components/&#10;    Button.tsx&#10;  App.tsx&#10;package.json"
                value={state.projectTree}
                onChange={(e) => handleTreeChange(e.target.value)}
                className="min-h-[450px] font-mono bg-slate-900/40 border-slate-800 focus:border-purple-500/50 resize-none text-slate-300 custom-scrollbar"
              />
              <p className="text-xs text-slate-500">
                Tip: Copy the output of the `tree` command here.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-slate-200">
                Structure Preview
              </h3>
              <div className="min-h-[450px] p-6 rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-sm whitespace-pre overflow-auto max-h-[450px] custom-scrollbar text-white shadow-2xl">
                {state.projectTree ? (
                  <span className="leading-relaxed">
                    {parseTreeAndAddIcons(state.projectTree)}
                  </span>
                ) : (
                  <span className="text-slate-600 italic">Preview will appear here...</span>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-slate-800/50">
            <Button
              onClick={prevPage}
              variant="outline"
              className="px-8 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={nextPage}
              className="px-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStructurePage;
