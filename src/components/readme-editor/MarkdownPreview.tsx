import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import 'highlight.js/styles/github-dark.css';
import 'highlight.js/styles/github.css';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ 
  content, 
  className 
}) => {
  const { theme } = useTheme();
  
  const currentTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  // Dynamic theme-based styles
  React.useEffect(() => {
    const link = document.querySelector('#highlight-theme') as HTMLLinkElement;
    if (link) {
      link.href = currentTheme === 'dark' 
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    } else {
      const newLink = document.createElement('link');
      newLink.id = 'highlight-theme';
      newLink.rel = 'stylesheet';
      newLink.href = currentTheme === 'dark' 
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
      document.head.appendChild(newLink);
    }
  }, [currentTheme]);

  return (
    <ScrollArea className={cn("h-full w-full", className)}>
      <div className="p-6 max-w-none">
        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h6:text-sm prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-pre:rounded-md prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-muted-foreground prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:text-left prose-td:border prose-td:border-muted-foreground prose-td:px-3 prose-td:py-2 prose-img:rounded-md prose-img:shadow-sm prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80 prose-strong:font-semibold prose-em:italic prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              // Custom components for better styling
              h1: ({ children, ...props }) => (
                <h1 className="flex items-center gap-2 border-b pb-2 mb-4" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2 className="flex items-center gap-2 border-b pb-1 mb-3 mt-8" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="flex items-center gap-2 mb-2 mt-6" {...props}>
                  {children}
                </h3>
              ),
              code: ({
                inline,
                className,
                children,
                ...props
              }: {
                inline?: boolean;
                className?: string;
                children?: React.ReactNode;
                [key: string]: any;
              }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className="relative overflow-x-auto rounded-md bg-muted p-4 text-sm">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code
                    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              blockquote: ({ children, ...props }) => (
                <blockquote 
                  className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4"
                  {...props}
                >
                  {children}
                </blockquote>
              ),
              table: ({ children, ...props }) => (
                <div className="my-6 w-full overflow-y-auto">
                  <table className="w-full border-collapse border border-muted-foreground" {...props}>
                    {children}
                  </table>
                </div>
              ),
              th: ({ children, ...props }) => (
                <th
                  className="border border-muted-foreground bg-muted px-3 py-2 text-left font-semibold"
                  {...props}
                >
                  {children}
                </th>
              ),
              td: ({ children, ...props }) => (
                <td className="border border-muted-foreground px-3 py-2" {...props}>
                  {children}
                </td>
              ),
              img: ({ alt, src, ...props }) => (
                <img
                  alt={alt}
                  src={src}
                  className="rounded-md shadow-sm max-w-full h-auto"
                  {...props}
                />
              ),
              a: ({ href, children, ...props }) => (
                <a
                  href={href}
                  className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc list-inside space-y-1 my-4" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal list-inside space-y-1 my-4" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="leading-relaxed" {...props}>
                  {children}
                </li>
              ),
              hr: ({ ...props }) => (
                <hr className="my-8 border-t border-muted-foreground" {...props} />
              ),
              // Badge-like elements for common patterns
              p: ({ children, ...props }) => {
                // Check if the paragraph contains badge-like markdown
                const content = children?.toString() || '';
                if (content.includes('![') && content.includes('](')) {
                  return (
                    <p className="flex flex-wrap gap-1 items-center my-2" {...props}>
                      {children}
                    </p>
                  );
                }
                return (
                  <p className="leading-relaxed my-4" {...props}>
                    {children}
                  </p>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </ScrollArea>
  );
};

export default MarkdownPreview;
