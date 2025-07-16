import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Type, 
  Code2, 
  Eye, 
  EyeOff, 
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  className?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'markdown',
  className,
  readOnly = false
}) => {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showMinimap, setShowMinimap] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(14);

  const currentTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure markdown syntax highlighting
    monaco.languages.setMonarchTokensProvider('markdown', {
      tokenizer: {
        root: [
          [/^# .*$/, 'custom-h1'],
          [/^## .*$/, 'custom-h2'],
          [/^### .*$/, 'custom-h3'],
          [/^#### .*$/, 'custom-h4'],
          [/^##### .*$/, 'custom-h5'],
          [/^###### .*$/, 'custom-h6'],
          [/^\* .*$/, 'custom-list'],
          [/^- .*$/, 'custom-list'],
          [/^\+ .*$/, 'custom-list'],
          [/^> .*$/, 'custom-quote'],
          [/```[\s\S]*?```/, 'custom-code-block'],
          [/`[^`]*`/, 'custom-inline-code'],
          [/\*\*[^*]*\*\*/, 'custom-bold'],
          [/\*[^*]*\*/, 'custom-italic'],
          [/!\[.*?\]\(.*?\)/, 'custom-image'],
          [/\[.*?\]\(.*?\)/, 'custom-link'],
        ]
      }
    });

    // Define enhanced dark theme for better visibility
    monaco.editor.defineTheme('readme-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'custom-h1', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'custom-h2', foreground: '4EC9B0', fontStyle: 'bold' },
        { token: 'custom-h3', foreground: 'DCDCAA', fontStyle: 'bold' },
        { token: 'custom-h4', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'custom-h5', foreground: '9CDCFE', fontStyle: 'bold' },
        { token: 'custom-h6', foreground: 'CE9178', fontStyle: 'bold' },
        { token: 'custom-list', foreground: '4FC1FF' },
        { token: 'custom-quote', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'custom-code-block', foreground: 'D4D4D4', background: '1E1E1E' },
        { token: 'custom-inline-code', foreground: 'F44747', background: '2D2D30' },
        { token: 'custom-bold', foreground: 'FFFFFF', fontStyle: 'bold' },
        { token: 'custom-italic', foreground: 'FFFFFF', fontStyle: 'italic' },
        { token: 'custom-image', foreground: 'FFCD3C' },
        { token: 'custom-link', foreground: '3794FF' },
      ],
      colors: {
        'editor.background': '#0D1117',
        'editor.foreground': '#E6EDF3',
        'editorLineNumber.foreground': '#7D8590',
        'editorLineNumber.activeForeground': '#E6EDF3',
        'editor.selectionBackground': '#264F78',
        'editor.lineHighlightBackground': '#161B22',
        'editorCursor.foreground': '#E6EDF3',
        'editorWhitespace.foreground': '#484F58',
        'editorIndentGuide.background': '#21262D',
        'editorIndentGuide.activeBackground': '#30363D',
        'editor.findMatchBackground': '#264F78',
        'editor.findMatchHighlightBackground': '#264F7866',
        'scrollbarSlider.background': '#484F5833',
        'scrollbarSlider.hoverBackground': '#484F5844',
        'scrollbarSlider.activeBackground': '#484F5888',
      }
    });

    // Define enhanced light theme
    monaco.editor.defineTheme('readme-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'custom-h1', foreground: '0066CC', fontStyle: 'bold' },
        { token: 'custom-h2', foreground: '008080', fontStyle: 'bold' },
        { token: 'custom-h3', foreground: '795E26', fontStyle: 'bold' },
        { token: 'custom-h4', foreground: 'AF00DB', fontStyle: 'bold' },
        { token: 'custom-h5', foreground: '001080', fontStyle: 'bold' },
        { token: 'custom-h6', foreground: 'A31515', fontStyle: 'bold' },
        { token: 'custom-list', foreground: '0451A5' },
        { token: 'custom-quote', foreground: '008000', fontStyle: 'italic' },
        { token: 'custom-code-block', foreground: '24292F', background: 'F6F8FA' },
        { token: 'custom-inline-code', foreground: 'E10E00', background: 'F6F8FA' },
        { token: 'custom-bold', foreground: '24292F', fontStyle: 'bold' },
        { token: 'custom-italic', foreground: '24292F', fontStyle: 'italic' },
        { token: 'custom-image', foreground: 'D4A622' },
        { token: 'custom-link', foreground: '0969DA' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#24292F',
        'editorLineNumber.foreground': '#656D76',
        'editorLineNumber.activeForeground': '#24292F',
        'editor.selectionBackground': '#ADD6FF',
        'editor.lineHighlightBackground': '#F6F8FA',
        'editorCursor.foreground': '#24292F',
        'editorWhitespace.foreground': '#D1D9E0',
        'editorIndentGuide.background': '#D1D9E0',
        'editorIndentGuide.activeBackground': '#656D76',
        'editor.findMatchBackground': '#FFDF5D',
        'editor.findMatchHighlightBackground': '#FFDF5D66',
        'scrollbarSlider.background': '#D1D9E033',
        'scrollbarSlider.hoverBackground': '#D1D9E044',
        'scrollbarSlider.activeBackground': '#D1D9E088',
      }
    });

    // Set the custom theme based on current theme
    monaco.editor.setTheme(currentTheme === 'dark' ? 'readme-dark' : 'readme-light');
  };

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleMinimap = () => {
    setShowMinimap(!showMinimap);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 10));
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize });
    }
  }, [fontSize]);

  // Update theme when it changes
  useEffect(() => {
    if (editorRef.current) {
      const newTheme = currentTheme === 'dark' ? 'readme-dark' : 'readme-light';
      editorRef.current.updateOptions({ theme: newTheme });
    }
  }, [currentTheme]);

  return (
    <div className={cn(
      "h-full flex flex-col bg-background",
      isFullscreen && "fixed inset-0 z-50",
      className
    )}>
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center space-x-2">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Markdown Editor</span>
          <Badge variant="outline" className="text-xs">
            {language}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={decreaseFontSize}
            className="h-7 w-7 p-0"
            title="Decrease font size"
          >
            <Type className="h-3 w-3" />
          </Button>
          
          <span className="text-xs text-muted-foreground px-1">
            {fontSize}px
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={increaseFontSize}
            className="h-7 w-7 p-0"
            title="Increase font size"
          >
            <Type className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMinimap}
            className="h-7 w-7 p-0"
            title={showMinimap ? "Hide minimap" : "Show minimap"}
          >
            {showMinimap ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="h-7 w-7 p-0"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          value={value}
          language={language}
          theme={currentTheme === 'dark' ? 'readme-dark' : 'readme-light'}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace",
            fontLigatures: true,
            lineHeight: 1.6,
            minimap: {
              enabled: showMinimap,
            },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            glyphMargin: true,
            folding: true,
            renderLineHighlight: 'all',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly,
            cursorStyle: 'line',
            mouseWheelZoom: true,
            padding: {
              top: 16,
              bottom: 16,
            },
            suggest: {
              showWords: true,
              showSnippets: true,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            parameterHints: {
              enabled: true,
            },
            hover: {
              enabled: true,
            },
            bracketPairColorization: {
              enabled: true,
            },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 border-t bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Lines: {value.split('\n').length}</span>
          <span>Characters: {value.length}</span>
          <span>Words: {value.trim() ? value.trim().split(/\s+/).length : 0}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span>UTF-8</span>
          <span>{language.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
