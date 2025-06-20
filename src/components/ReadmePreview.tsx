import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ElementRenderer } from './ElementRenderer';
import { Copy, Download, Eye } from 'lucide-react';
import type { ElementType } from '@/types/elements';

interface ReadmePreviewProps {
  elements: ElementType[];
}

export function ReadmePreview({ elements }: ReadmePreviewProps) {
  const [copied, setCopied] = useState(false);

  const generateMarkdown = (): string => {
    return elements.map(element => {
      switch (element.type) {
        case 'header':
          return `${'#'.repeat(element.level || 1)} ${element.content}\n\n`;
        
        case 'text':
          return `${element.content}\n\n`;
        
        case 'banner':
          return `<div align="center">
  <h1>${element.content}</h1>
</div>\n\n`;
        
        case 'git-contribution':
          return `## 🤝 How to Contribute

1. Fork the repository
2. Clone your fork: \`git clone https://github.com/${element.username}/${element.repository}.git\`
3. Create a feature branch: \`git checkout -b feature-name\`
4. Make your changes and commit: \`git commit -m "Add feature"\`
5. Push to your fork: \`git push origin feature-name\`
6. Create a Pull Request\n\n`;
        
        case 'tech-stack':
          if (element.layout === 'badges') {
            return `## ⚡ Tech Stack

${element.technologies.map(tech => `![${tech}](https://img.shields.io/badge/-${tech}-05122A?style=flat&logo=${tech.toLowerCase()})`).join(' ')}\n\n`;
          } else if (element.layout === 'list') {
            return `## ⚡ Tech Stack

${element.technologies.map(tech => `- ${tech}`).join('\n')}\n\n`;
          } else {
            return `## ⚡ Tech Stack

| | | |
|---|---|---|
${element.technologies.reduce((acc, tech, index) => {
  if (index % 3 === 0) {
    acc.push([tech]);
  } else {
    acc[acc.length - 1].push(tech);
  }
  return acc;
}, [] as string[][]).map(row => `| ${row.join(' | ')} |`).join('\n')}\n\n`;
          }
        
        case 'image':
          return `![${element.alt}](${element.src})\n\n`;
        
        case 'code-block':
          return `\`\`\`${element.language}\n${element.content}\n\`\`\`\n\n`;
          case 'badge':
          return `![${element.content}](https://img.shields.io/badge/-${element.content.replace(/\s+/g, '%20')}-brightgreen)\n\n`;
        
        case 'table': {
          const headers = `| ${element.headers.join(' | ')} |`;
          const separator = `| ${element.headers.map(() => '---').join(' | ')} |`;
          const rows = element.rows.map(row => `| ${row.join(' | ')} |`).join('\n');
          return `${headers}\n${separator}\n${rows}\n\n`;
        }
          case 'divider': {
          switch (element.dividerStyle) {
            case 'dots':
              return `<div align="center">• • •</div>\n\n`;
            case 'stars':
              return `<div align="center">⭐ ⭐ ⭐</div>\n\n`;
            default:
              return `---\n\n`;
          }
        }
        
        default:
          return '';
      }
    }).join('');
  };

  const copyToClipboard = async () => {
    const markdown = generateMarkdown();
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Preview Header */}
      <div className="border-b border-border p-4 flex items-center justify-between bg-background">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <h3 className="font-semibold">README Preview</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            {copied ? 'Copied!' : 'Copy Markdown'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadMarkdown}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4 w-fit">
            <TabsTrigger value="preview">Visual Preview</TabsTrigger>
            <TabsTrigger value="markdown">Markdown Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 overflow-y-auto p-4">
            <Card className="p-6 bg-background">
              {elements.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <p className="text-lg mb-2">Your README is empty</p>
                  <p className="text-sm">Add elements from the sidebar to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {elements.map(element => (
                    <div key={element.id}>
                      <ElementRenderer element={element} isPreview={true} />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="markdown" className="flex-1 overflow-y-auto p-4">
            <Card className="p-6 bg-background">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                <code>{generateMarkdown() || '// Your README markdown will appear here'}</code>
              </pre>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
