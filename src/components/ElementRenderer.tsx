import type { ElementType } from '@/types/elements';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ElementRendererProps {
  element: ElementType;
  isPreview?: boolean;
}

export function ElementRenderer({ element, isPreview = false }: ElementRendererProps) {
  const baseClasses = isPreview ? "pointer-events-none" : "";

  switch (element.type) {    case 'header':
      return (
        <div className={`font-bold mb-4 ${baseClasses}`}>
          {element.level === 1 && <h1 className="text-4xl">{element.content}</h1>}
          {element.level === 2 && <h2 className="text-3xl">{element.content}</h2>}
          {element.level === 3 && <h3 className="text-2xl">{element.content}</h3>}
          {element.level === 4 && <h4 className="text-xl">{element.content}</h4>}
          {element.level === 5 && <h5 className="text-lg">{element.content}</h5>}
          {element.level === 6 && <h6 className="text-base">{element.content}</h6>}
        </div>
      );

    case 'text':
      return (
        <p 
          className={`
            mb-4 
            ${element.style?.fontSize === 'sm' ? 'text-sm' : ''}
            ${element.style?.fontSize === 'lg' ? 'text-lg' : ''}
            ${element.style?.fontSize === 'xl' ? 'text-xl' : ''}
            ${element.style?.fontSize === '2xl' ? 'text-2xl' : ''}
            ${element.style?.fontSize === '3xl' ? 'text-3xl' : ''}
            ${element.style?.fontWeight === 'bold' ? 'font-bold' : ''}
            ${element.style?.fontWeight === 'semibold' ? 'font-semibold' : ''}
            ${element.style?.textAlign === 'center' ? 'text-center' : ''}
            ${element.style?.textAlign === 'right' ? 'text-right' : ''}
            ${baseClasses}
          `}
        >
          {element.content}
        </p>
      );

    case 'banner':
      return (
        <div className={`
          p-6 rounded-lg mb-6 text-center
          ${element.variant === 'gradient' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : ''}
          ${element.variant === 'colored' ? `bg-${element.color}-100 text-${element.color}-800 border border-${element.color}-200` : ''}
          ${element.variant === 'default' ? 'bg-muted text-foreground border' : ''}
          ${baseClasses}
        `}>
          <h2 className="text-2xl font-bold">{element.content}</h2>
        </div>
      );

    case 'git-contribution':
      return (
        <Card className={`p-6 mb-6 ${baseClasses}`}>
          <h3 className="text-xl font-semibold mb-4">🤝 How to Contribute</h3>
          <div className="space-y-3 text-sm">
            <p>1. Fork the repository</p>
            <p>2. Clone your fork: <code className="bg-muted px-2 py-1 rounded">git clone https://github.com/{element.username}/{element.repository}.git</code></p>
            <p>3. Create a feature branch: <code className="bg-muted px-2 py-1 rounded">git checkout -b feature-name</code></p>
            <p>4. Make your changes and commit: <code className="bg-muted px-2 py-1 rounded">git commit -m "Add feature"</code></p>
            <p>5. Push to your fork: <code className="bg-muted px-2 py-1 rounded">git push origin feature-name</code></p>
            <p>6. Create a Pull Request</p>
          </div>
        </Card>
      );

    case 'tech-stack':
      return (
        <div className={`mb-6 ${baseClasses}`}>
          <h3 className="text-xl font-semibold mb-4">⚡ Tech Stack</h3>
          {element.layout === 'badges' && (
            <div className="flex flex-wrap gap-2">
              {element.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">{tech}</Badge>
              ))}
            </div>
          )}
          {element.layout === 'list' && (
            <ul className="list-disc list-inside space-y-1">
              {element.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          )}
          {element.layout === 'grid' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {element.technologies.map((tech, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg text-center">
                  {tech}
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'image':
      return (
        <div className={`mb-6 ${baseClasses}`}>          <img 
            src={element.src} 
            alt={element.alt}
            style={{ 
              width: element.width, 
              height: element.height,
              maxWidth: '100%'
            }}
            className="rounded-lg"
          />
        </div>
      );

    case 'code-block':
      return (
        <div className={`mb-6 ${baseClasses}`}>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className={`language-${element.language}`}>
              {element.content}
            </code>
          </pre>
        </div>
      );

    case 'badge':
      return (
        <div className={`mb-4 ${baseClasses}`}>
          <Badge 
            variant={
              element.variant === 'success' ? 'default' :
              element.variant === 'warning' ? 'secondary' :
              element.variant === 'error' ? 'destructive' :
              'default'
            }
          >
            {element.content}
          </Badge>
        </div>
      );

    case 'table':
      return (
        <div className={`mb-6 overflow-x-auto ${baseClasses}`}>
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                {element.headers.map((header, index) => (
                  <th key={index} className="border border-border p-2 text-left font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {element.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-muted/50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-border p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'divider':
      return (
        <div className={`my-8 ${baseClasses}`}>
          {element.dividerStyle === 'line' && <hr className="border-border" />}
          {element.dividerStyle === 'dots' && (
            <div className="text-center text-muted-foreground">• • •</div>
          )}
          {element.dividerStyle === 'stars' && (
            <div className="text-center text-muted-foreground">⭐ ⭐ ⭐</div>
          )}
        </div>
      );

    default:
      return <div className={`p-4 bg-muted rounded ${baseClasses}`}>Unknown element type</div>;
  }
}
