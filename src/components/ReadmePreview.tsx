import { useMemo } from 'react';
import { Download, Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ElementRenderer } from '@/components/ElementRenderer';
import type { ElementType } from '@/types/elements';

type ViewMode = 'developer' | 'recruiter' | 'client';

interface ReadmePreviewProps {
  elements: ElementType[];
  viewMode?: ViewMode;
}

export function ReadmePreview({ elements, viewMode = 'developer' }: ReadmePreviewProps) {
  const filteredElements = useMemo(() => {
    return elements.filter(element => {
      const visibilityMap: Record<string, ViewMode[]> = {
        header: ['developer', 'recruiter', 'client'],
        description: ['developer', 'recruiter', 'client'],
        badges: ['developer', 'recruiter'],
        installation: ['developer'],
        usage: ['developer', 'client'],
        codeblock: ['developer'],
        features: ['developer', 'recruiter', 'client'],
        screenshot: ['recruiter', 'client'],
        demo: ['recruiter', 'client'],
        api: ['developer'],
        contributing: ['developer'],
        license: ['developer', 'recruiter'],
        contact: ['developer', 'recruiter', 'client'],
        changelog: ['developer'],
        roadmap: ['developer', 'recruiter'],
        acknowledgments: ['developer'],
        faq: ['client'],
        support: ['client'],
        sponsors: ['recruiter', 'client'],
        stats: ['recruiter'],
        skills: ['recruiter'],
        tech: ['developer', 'recruiter'],
        highlights: ['recruiter', 'client'],
        branding: ['client'],
        banner: ['client', 'recruiter'],
        logo: ['client', 'recruiter'],
      };

      const allowedModes = visibilityMap[element.type] || ['developer', 'recruiter', 'client'];
      return allowedModes.includes(viewMode);
    });
  }, [elements, viewMode]);

  const generateMarkdown = () => {
  return filteredElements.map(element => {
    switch (element.type) {
      case 'header':
        return `# ${element.content}\n\n`;
      case 'text':
        return `${element.content}\n\n`;
      case 'banner':
        return `<div align="center">\n  <h1>${element.content}</h1>\n</div>\n\n`;
      case 'git-contribution':
        return `## 🤝 How to Contribute

1. Fork the repository  
2. Clone your fork: \`git clone https://github.com/${element.username}/${element.repository}.git\`  
3. Create a feature branch: \`git checkout -b feature-name\`  
4. Make your changes and commit: \`git commit -m "Add feature"\`  
5. Push to your fork: \`git push origin feature-name\`  
6. Create a Pull Request

\n\n`;
      case 'tech-stack':
        if (element.layout === 'badges') {
          return `## ⚡ Tech Stack\n\n${element.technologies
            .map(
              (tech) =>
                `![${tech}](https://img.shields.io/badge/-${tech}-05122A?style=flat&logo=${tech.toLowerCase()})`
            )
            .join(' ')}\n\n`;
        } else if (element.layout === 'list') {
          return `## ⚡ Tech Stack\n\n${element.technologies.map((tech) => `- ${tech}`).join('\n')}\n\n`;
        } else {
          return `## ⚡ Tech Stack\n\n| | | |\n|---|---|---|\n${element.technologies
            .reduce((acc, tech, index) => {
              if (index % 3 === 0) {
                acc.push([tech]);
              } else {
                acc[acc.length - 1].push(tech);
              }
              return acc;
            }, [] as string[][])
            .map((row) => `| ${row.join(' | ')} |`)
            .join('\n')}\n\n`;
        }
      case 'image':
        return `![${element.alt}](${element.src})\n\n`;
      case 'code-block':
        return `\`\`\`${element.language || 'javascript'}\n${element.content}\n\`\`\`\n\n`;
      case 'badge':
        return `![${element.content}](https://img.shields.io/badge/-${element.content.replace(/\s+/g, '%20')}-brightgreen)\n\n`;
      case 'table':
        const headers = `| ${element.headers.join(' | ')} |`;
        const separator = `| ${element.headers.map(() => '---').join(' | ')} |`;
        const rows = element.rows.map((row) => `| ${row.join(' | ')} |`).join('\n');
        return `${headers}\n${separator}\n${rows}\n\n`;
      case 'divider':
        switch (element.dividerStyle) {
          case 'dots':
            return `<div align="center">• • •</div>\n\n`;
          case 'stars':
            return `<div align="center">⭐ ⭐ ⭐</div>\n\n`;
          default:
            return `---\n\n`;
        }
      case 'installation':
        return `## Installation\n\n\`\`\`bash\n${element.content}\n\`\`\`\n\n`;
      default:
        return '';
    }
  }).join('');
};

  const copyToClipboard = async () => {
    const markdown = generateMarkdown();
    await navigator.clipboard.writeText(markdown);
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

  const getViewModeDescription = () => {
    switch (viewMode) {
      case 'developer':
        return 'Shows technical details, code examples, setup instructions, and contribution guidelines';
      case 'recruiter':
        return 'Highlights skills, project achievements, stats, and professional presentation';
      case 'client':
        return 'Focuses on visuals, features, demos, and user-friendly information';
      default:
        return '';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="border-b border-border p-4 bg-muted/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">README Preview</h3>
            <Badge variant="secondary" className="text-xs">
              {viewMode === 'developer' && '👨‍💻 Developer'}
              {viewMode === 'recruiter' && '🔍 Recruiter'}
              {viewMode === 'client' && '📦 Client'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
              disabled={filteredElements.length === 0}
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadMarkdown}
              className="flex items-center gap-2"
              disabled={filteredElements.length === 0}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {getViewModeDescription()}
        </p>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6 bg-background">
        {filteredElements.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No content for {viewMode} view</p>
              <p className="text-sm">
                {viewMode === 'developer' && 'Add technical elements, code blocks, and setup instructions'}
                {viewMode === 'recruiter' && 'Add badges, stats, skills, and project highlights'}
                {viewMode === 'client' && 'Add screenshots, demos, features, and visual elements'}
              </p>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            {filteredElements.map((element) => (
              <ElementRenderer
                key={element.id}
                element={element}
                isPreview={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
