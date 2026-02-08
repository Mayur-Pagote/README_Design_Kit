
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Copy, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { smartParseTree } from '@/utils/treeParser';

export default function CustomTreeGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateTree = () => {
    if (!input.trim()) return;
    const tree = smartParseTree(input);
    setOutput(tree);
    toast("Tree generated with emojis! 🌳");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast("Copied to clipboard!");
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full p-6 mb-8 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Wand2 className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">Custom Tree Generator ✨</h3>
          <p className="text-sm text-slate-400">Paste your file list to auto-add emojis. Input on left, magic on right.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Input */}
        <div className="space-y-4 flex flex-col">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-300">Your File List</label>
            <span className="text-xs text-slate-500">Plain text only</span>
          </div>
          <Textarea
            placeholder={`src/\n  components/\n    Header.tsx\n  App.tsx\npackage.json`}
            className="font-mono text-sm flex-grow min-h-[250px] bg-slate-950/80 border-slate-700 focus:ring-purple-500/50 resize-none p-4 leading-relaxed"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={generateTree} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.01]">
            <Wand2 className="w-5 h-5 mr-2" />
            Generate Emoji Tree
          </Button>
        </div>

        {/* Right Column: Output Preview */}
        <div className="space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-300">Emoji Preview</label>
            {output && (
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 text-xs hover:bg-slate-800 text-purple-300 hover:text-purple-200">
                <Copy className="w-3 h-3 mr-1.5" /> Copy Markdown
              </Button>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex-grow min-h-[250px] shadow-inner group">
            {output ? (
              <pre className="absolute inset-0 p-5 text-sm font-mono text-emerald-400/90 whitespace-pre-wrap overflow-y-auto custom-scrollbar leading-relaxed">
                {output.replace(/```bash\n|\n```/g, '')}
              </pre>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 space-y-3">
                <Wand2 className="w-8 h-8 opacity-20" />
                <p className="text-sm">Preview will appear here...</p>
              </div>
            )}
            {output && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-slate-800 text-[10px] px-2 py-1 rounded text-slate-400">bash</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
