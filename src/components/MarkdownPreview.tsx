import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownPreviewProps {
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

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
    const content = cleanMarkdown(markdown);
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;