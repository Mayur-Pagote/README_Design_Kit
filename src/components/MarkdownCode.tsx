import { useState } from 'react';
import { Button } from './ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownCodeProps {
  markdown: string;
}

const cleanMarkdown = (markdown: string) => {
  if (!markdown) return '';
  
  const lines = markdown.split('\n');
  
  if (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  
  const minIndent = lines.reduce((min, line) => {
    if (line.trim() === '') return min;
    const indent = line.match(/^ */)?.[0].length || 0;
    return Math.min(min, indent);
  }, Infinity);

  if (minIndent === Infinity) return markdown;
  
  return lines
    .map(line => (line.length >= minIndent ? line.slice(minIndent) : line))
    .join('\n');
};

const MarkdownCode = ({ markdown }: MarkdownCodeProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const content = cleanMarkdown(markdown);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter language="markdown" style={a11yDark}>
        {content}
      </SyntaxHighlighter>
      <Button
        onClick={handleCopy}
        className="absolute top-2 right-2"
        variant="secondary"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};

export default MarkdownCode;
