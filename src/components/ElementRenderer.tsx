import type { ElementType } from '@/types/elements';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ElementRendererProps {
  element: ElementType;
  isPreview?: boolean;
  viewMode?: 'developer' | 'recruiter' | 'client';
  showVisibilityIndicator?: boolean;
}

/**
 * visibilityMap maps element types to the personas that are allowed to see them.
 * Keys have been updated to match the actual element.type values used in the palette and switch logic.
 */
const visibilityMap: Record<string, string[]> = {
  header: ['developer', 'recruiter', 'client'],
  text: ['developer', 'recruiter', 'client'],
  badge: ['developer', 'recruiter'],
  installation: ['developer'],
  usage: ['developer', 'client'],
  'code-block': ['developer'],
  features: ['developer', 'recruiter', 'client'],
  screenshot: ['recruiter', 'client'],
  demo: ['recruiter', 'client'],
  api: ['developer'],
  contributing: ['developer'],
  license: ['developer', 'recruiter'],
  contact: ['developer', 'recruiter', 'client'],
  changelog: ['developer'],
  acknowledgments: ['developer'],
  faq: ['client'],
  support: ['client'],
  sponsors: ['recruiter', 'client'],
  stats: ['recruiter'],
  skills: ['recruiter'],
  'tech-stack': ['developer', 'recruiter'],
  highlights: ['recruiter', 'client'],
  branding: ['client'],
  banner: ['client', 'recruiter'],
  logo: ['client', 'recruiter'],
};

export function ElementRenderer({ element, isPreview = false, viewMode, showVisibilityIndicator = false }: ElementRendererProps) {
  const baseClasses = isPreview ? "pointer-events-none" : "";

  const isVisible = viewMode ? (() => {
    const allowedModes = visibilityMap[element.type] || ['developer', 'recruiter', 'client'];
    return allowedModes.includes(viewMode);
  })() : true;

  const getPersonaLabel = (mode: string) => {
    switch (mode) {
      case 'developer': return 'Developer';
      case 'recruiter': return 'Recruiter';
      case 'client': return 'Client';
      default: return mode;
    }
  };

  const wrapperClass = `${!isVisible && showVisibilityIndicator ? 'opacity-50 relative' : ''}`;
  const hiddenBadge = showVisibilityIndicator && !isVisible && viewMode ? (
    <div className="absolute top-0 right-0 z-10">
      <Badge 
        variant="secondary" 
        className="bg-red-100 text-red-700 border-red-200 text-xs"
        title={`Hidden in ${getPersonaLabel(viewMode)} mode`}
      >
        Hidden in {getPersonaLabel(viewMode)} mode
      </Badge>
    </div>
  ) : null;

  switch (element.type) {
    case 'header':
      return (
        <div className={`font-bold mb-4 ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
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
        <p className={`mb-4 ${baseClasses} ${wrapperClass} ${
          element.style?.fontSize ? `text-${element.style.fontSize}` : ''
        } ${
          element.style?.fontWeight ? `font-${element.style.fontWeight}` : ''
        } ${
          element.style?.textAlign ? `text-${element.style.textAlign}` : ''
        }`}>
          {hiddenBadge}
          {element.content}
        </p>
      );

    case 'banner':
      return (
        <div className={`p-6 rounded-lg mb-6 text-center ${baseClasses} ${wrapperClass} ${
          element.variant === 'gradient' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' :
          element.variant === 'colored' ? `bg-${element.color}-100 text-${element.color}-800 border border-${element.color}-200` :
          'bg-muted text-foreground border'
        }`}>
          {hiddenBadge}
          <h2 className="text-2xl font-bold">{element.content}</h2>
        </div>
      );

    case 'git-contribution':
      return (
        <Card className={`p-6 mb-6 ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
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
      const techElement = element as any;
      
      const getBadgeUrl = (tech: string): string => {
        let themeColor = '05122A'; 
        if (techElement.theme === 'light') themeColor = 'f8f8f8';
        if (techElement.theme === 'blue') themeColor = '0366D6';
        if (techElement.theme === 'purple') themeColor = '6F42C1';
        if (techElement.theme === 'green') themeColor = '2EA44F';
        if (techElement.theme === 'orange') themeColor = 'F97316';
        
        const cleanTechName = tech.toLowerCase().replace(/\s+/g, '-');
        
        if (techElement.badgeStyle === 'simple-icons') {
          return `https://img.shields.io/badge/${tech}-${themeColor}?style=flat&logo=${cleanTechName}`;
        }
        else if (techElement.badgeStyle === 'for-the-badge-colored') {
          return `https://img.shields.io/badge/${tech}-${themeColor}?style=for-the-badge&logoColor=white`;
        }
        else if (techElement.badgeStyle === 'flat-colored') {
          return `https://img.shields.io/badge/${tech}-${themeColor}?style=flat&logoColor=white`;
        }
        else if (techElement.badgeStyle === 'badge-card') {
          return `https://img.shields.io/static/v1?label=&message=${tech}&color=${themeColor}&style=for-the-badge`;
        }
        else if (techElement.badgeStyle === 'badge-glow') {
          return `https://img.shields.io/badge/${tech}-${themeColor}?style=for-the-badge&logoColor=white&labelColor=${themeColor}`;
        }
        else if (techElement.badgeStyle === 'skill-icons') {
          return `https://skillicons.dev/icons?i=${cleanTechName}`;
        }
        else if (techElement.badgeStyle === 'flat-icons') {
          const flatIconMappings: { [key: string]: string } = {
            'javascript': '5968292', 'typescript': '5968381', 'python': '5968350',
            'react': '1183672', 'node.js': '5968322', 'java': '5968282',
            'html': '1051277', 'css': '732190', 'git': '2111288'
          };
          const iconId = flatIconMappings[cleanTechName] || '4248443'; 
          return `https://cdn-icons-png.flaticon.com/128/${iconId.slice(0, -3)}/${iconId}.png`;
        }
        else if (techElement.badgeStyle === 'material-icons') {
          const materialIconMappings: { [key: string]: string } = {
            'javascript': 'code', 'typescript': 'code', 'python': 'code',
            'react': 'web', 'node.js': 'dns', 'java': 'code',
            'html': 'html', 'css': 'css', 'git': 'merge_type'
          };
          const iconName = materialIconMappings[cleanTechName] || 'code'; 
          return `https://fonts.gstatic.com/s/i/materialicons/${iconName}/v12/24px.svg`;
        }
        else if (techElement.badgeStyle === 'github-icons') {
          return `https://github.com/github/explore/raw/main/topics/${cleanTechName}/${cleanTechName}.png`;
        }
        else if (techElement.badgeStyle === 'icons8') {
          const icon8Mappings: { [key: string]: string } = {
            'javascript': 'javascript', 'typescript': 'typescript', 'python': 'python',
            'react': 'react', 'node.js': 'nodejs', 'java': 'java',
            'html': 'html-5', 'css': 'css3', 'git': 'git'
          };
          const iconName = icon8Mappings[cleanTechName] || cleanTechName;
          return `https://img.icons8.com/color/48/000000/${iconName}.png`;
        }
        else if (techElement.badgeStyle === 'svg-badges') {
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30"><rect width="120" height="30" rx="15" fill="#${themeColor}"/><text x="60" y="20" font-family="Arial" font-size="14" fill="white" text-anchor="middle">${tech}</text></svg>`;
          const encodedSvg = encodeURIComponent(svgContent);
          return `data:image/svg+xml;utf8,${encodedSvg}`;
        }
        else if (techElement.badgeStyle === 'animated-badges') {
          return `https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=1000&pause=500&color=${themeColor}&center=true&vCenter=true&width=100&height=30&lines=${tech}`;
        }
        else if (techElement.badgeStyle === 'devto-badges') {
          return `https://img.shields.io/badge/${tech}-0A0A0A?style=for-the-badge&logo=${cleanTechName}&logoColor=white`;
        }
        else if (techElement.badgeStyle === 'edge-icons') {
          const savedStyle = techElement.badgeStyle;
          techElement.badgeStyle = 'devicon';
          const fallbackIcon = getBadgeUrl(tech);
          techElement.badgeStyle = savedStyle;
          return fallbackIcon;
        }
        else if (techElement.badgeStyle === 'devicon-with-text') {
          const savedStyle = techElement.badgeStyle;
          techElement.badgeStyle = 'devicon';
          const iconPath = getBadgeUrl(tech);
          techElement.badgeStyle = savedStyle;
          return iconPath;
        }
        else if (techElement.badgeStyle === 'devicon') {
          const techMappings: { [key: string]: string } = {
            'javascript': 'javascript/javascript',
            'typescript': 'typescript/typescript',
            'python': 'python/python',
            'java': 'java/java',
            'c#': 'csharp/csharp',
            'c++': 'cplusplus/cplusplus',
            'go': 'go/go',
            'ruby': 'ruby/ruby',
            'php': 'php/php',
            'swift': 'swift/swift',
            'kotlin': 'kotlin/kotlin',
            'rust': 'rust/rust',
            'dart': 'dart/dart',
            'html': 'html5/html5',
            'html5': 'html5/html5',
            'css': 'css3/css3',
            'css3': 'css3/css3',
            'sql': 'postgresql/postgresql',
            'bash': 'bash/bash',
            'scala': 'scala/scala',
            'haskell': 'haskell/haskell',
            'r': 'r/r',
            'react': 'react/react',
            'angular': 'angularjs/angularjs',
            'vue': 'vuejs/vuejs',
            'next.js': 'nextjs/nextjs',
            'nextjs': 'nextjs/nextjs',
            'node.js': 'nodejs/nodejs',
            'nodejs': 'nodejs/nodejs',
            'express': 'express/express',
            'svelte': 'svelte/svelte',
            'tailwindcss': 'tailwindcss/tailwindcss',
            'tailwind': 'tailwindcss/tailwindcss',
            'bootstrap': 'bootstrap/bootstrap',
            'jquery': 'jquery/jquery',
            'flask': 'flask/flask',
            'django': 'django/django',
            'laravel': 'laravel/laravel',
            'spring': 'spring/spring',
            'dotnet': 'dot-net/dot-net',
            '.net': 'dot-net/dot-net',
            'flutter': 'flutter/flutter',
            'electron': 'electron/electron',
            'mongodb': 'mongodb/mongodb',
            'mysql': 'mysql/mysql',
            'postgresql': 'postgresql/postgresql',
            'postgres': 'postgresql/postgresql',
            'firebase': 'firebase/firebase',
            'redis': 'redis/redis',
            'sqlite': 'sqlite/sqlite',
            'docker': 'docker/docker',
            'kubernetes': 'kubernetes/kubernetes',
            'git': 'git/git',
            'github': 'github/github',
            'aws': 'amazonwebservices/amazonwebservices',
            'azure': 'azure/azure',
            'gcp': 'googlecloud/googlecloud',
            'vscode': 'vscode/vscode',
            'visualstudio': 'visualstudio/visualstudio',
            'npm': 'npm/npm',
            'yarn': 'yarn/yarn',
            'webpack': 'webpack/webpack',
            'babel': 'babel/babel',
            'jest': 'jest/jest',
            'figma': 'figma/figma',
          };
          
          const cleanTech = tech.toLowerCase().replace(/\s+/g, '').replace(/\.js$/, 'js');
          const techPath = techMappings[cleanTech] || `${cleanTech}/${cleanTech}`;
          return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techPath}-original.svg`;
        } else {
          const style = techElement.badgeStyle || 'flat';
          let themeColor = '05122A'; 
          if (techElement.theme === 'light') themeColor = 'f8f8f8';
          if (techElement.theme === 'blue') themeColor = '0366D6';
          if (techElement.theme === 'purple') themeColor = '6F42C1';
          if (techElement.theme === 'green') themeColor = '2EA44F';
          if (techElement.theme === 'orange') themeColor = 'F97316';
          
          return `https://img.shields.io/badge/-${tech}-${themeColor}?style=${style}`;
        }
      };
      
      return (
        <div className={`mb-6 ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
          <h3 className="text-xl font-semibold mb-4">⚡ Tech Stack</h3>
          
          {element.layout === 'badges' && (
            <div className="flex flex-wrap gap-2">
              {element.technologies.map((tech, index) => (
                techElement.badgeStyle ? (
                  <img 
                    key={index} 
                    src={getBadgeUrl(tech)} 
                    alt={tech} 
                    className="h-6 mr-1"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      const style = techElement.badgeStyle || 'flat';
                      let themeColor = '05122A';
                      if (techElement.theme === 'light') themeColor = 'f8f8f8';
                      if (techElement.theme === 'blue') themeColor = '0366D6';
                      if (techElement.theme === 'purple') themeColor = '6F42C1';
                      if (techElement.theme === 'green') themeColor = '2EA44F';
                      if (techElement.theme === 'orange') themeColor = 'F97316';
                      target.src = `https://img.shields.io/badge/-${tech}-${themeColor}?style=${style}`;
                    }}
                  />
                ) : (
                  <Badge key={index} variant="secondary">{tech}</Badge>
                )
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
              {element.technologies.map((tech, index) => {
                const bgClass = techElement.theme ? 
                  `bg-${techElement.theme === 'dark' ? 'muted' : techElement.theme}-50` : 'bg-muted';
                
                return (
                  <div key={index} className={`p-3 rounded-lg text-center ${bgClass}`}>
                    {techElement.badgeStyle ? (
                      <div className="flex flex-col items-center justify-center">
                        <img 
                          src={getBadgeUrl(tech)} 
                          alt={tech} 
                          className={`
                            mb-2
                            ${['devicon', 'flat-icons', 'material-icons', 'github-icons', 
                              'icons8', 'edge-icons', 'devicon-with-text'].includes(techElement.badgeStyle || '') ? 'h-10' : 'h-6'}
                            ${techElement.badgeStyle === 'skill-icons' ? 'w-auto' : ''}
                            ${techElement.badgeStyle === 'svg-badges' || techElement.badgeStyle === 'animated-badges' ? 'h-8' : ''}
                          `}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; 
                            let themeColor = '05122A';
                            if (techElement.theme === 'light') themeColor = 'f8f8f8';
                            if (techElement.theme === 'blue') themeColor = '0366D6';
                            if (techElement.theme === 'purple') themeColor = '6F42C1';
                            if (techElement.theme === 'green') themeColor = '2EA44F';
                            if (techElement.theme === 'orange') themeColor = 'F97316';
                            target.src = `https://img.shields.io/badge/-${tech}-${themeColor}?style=flat`;
                          }}
                        />
                        <div className="text-sm">{tech}</div>
                      </div>
                    ) : (
                      <div className="text-sm">{tech}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {element.layout === 'inline' && (
            <div className="inline-flex flex-wrap gap-1 items-center">
              {element.technologies.map((tech, index) => (
                <span key={index}>
                  {techElement.badgeStyle ? (
                    <img 
                      src={getBadgeUrl(tech)} 
                      alt={tech} 
                      className="h-6 inline-block"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        const style = techElement.badgeStyle || 'flat';
                        let themeColor = '05122A';
                        if (techElement.theme === 'light') themeColor = 'f8f8f8';
                        if (techElement.theme === 'blue') themeColor = '0366D6';
                        if (techElement.theme === 'purple') themeColor = '6F42C1';
                        if (techElement.theme === 'green') themeColor = '2EA44F';
                        if (techElement.theme === 'orange') themeColor = 'F97316';
                        target.src = `https://img.shields.io/badge/-${tech}-${themeColor}?style=${style}`;
                      }}
                    />
                  ) : (
                    <Badge key={index} variant="outline" className="mr-1">{tech}</Badge>
                  )}
                  {index < element.technologies.length - 1 && !techElement.badgeStyle && ' • '}
                </span>
              ))}
            </div>
          )}
          
          {element.layout === 'grouped' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {element.technologies.filter(t => 
                    ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++'].includes(t)
                  ).map((tech, index) => (
                    techElement.badgeStyle ? (
                      <img 
                        key={index} 
                        src={getBadgeUrl(tech)} 
                        alt={tech}
                        className="h-6"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; 
                          const style = techElement.badgeStyle || 'flat';
                          let themeColor = '05122A';
                          if (techElement.theme === 'light') themeColor = 'f8f8f8';
                          if (techElement.theme === 'blue') themeColor = '0366D6';
                          if (techElement.theme === 'purple') themeColor = '6F42C1';
                          if (techElement.theme === 'green') themeColor = '2EA44F';
                          if (techElement.theme === 'orange') themeColor = 'F97316';
                          target.src = `https://img.shields.io/badge/-${tech}-${themeColor}?style=${style}`;
                        }}
                      />
                    ) : (
                      <Badge key={index} variant="secondary">{tech}</Badge>
                    )
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {element.technologies.filter(t => 
                    ['React', 'Angular', 'Vue', 'Next.js', 'Node.js', 'Express'].includes(t)
                  ).map((tech, index) => (
                    techElement.badgeStyle ? (
                      <img 
                        key={index} 
                        src={getBadgeUrl(tech)} 
                        alt={tech}
                        className="h-6"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; 
                          const style = techElement.badgeStyle || 'flat';
                          let themeColor = '05122A';
                          if (techElement.theme === 'light') themeColor = 'f8f8f8';
                          if (techElement.theme === 'blue') themeColor = '0366D6';
                          if (techElement.theme === 'purple') themeColor = '6F42C1';
                          if (techElement.theme === 'green') themeColor = '2EA44F';
                          if (techElement.theme === 'orange') themeColor = 'F97316';
                          target.src = `https://img.shields.io/badge/-${tech}-${themeColor}?style=${style}`;
                        }}
                      />
                    ) : (
                      <Badge key={index} variant="secondary">{tech}</Badge>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );

    case 'image':
      return (
        <div className={`mb-6 ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
          <img 
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
        <div className={`mb-6 ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className={`language-${element.language}`}>
              {element.content}
            </code>
          </pre>
        </div>
      );

    case 'badge':
      return (
        <div className={`mb-4 ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
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
        <div className={`mb-6 overflow-x-auto ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
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
        <div className={`my-8 ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
          {element.dividerStyle === 'line' && <hr className="border-border" />}
          {element.dividerStyle === 'dots' && (
            <div className="text-center text-muted-foreground">• • •</div>
          )}
          {element.dividerStyle === 'stars' && (
            <div className="text-center text-muted-foreground">⭐ ⭐ ⭐</div>
          )}
        </div>
      );

    case 'installation':
      return (
        <div className={`mb-6 ${baseClasses} ${wrapperClass}`}>
          {hiddenBadge}
          <h3 className="text-xl font-semibold mb-4">⚙️ Installation</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="language-bash">
              {element.content}
            </code>
          </pre>
        </div>
      );

    default:
      return <div className={`p-4 bg-muted rounded ${baseClasses} ${wrapperClass}`}>{hiddenBadge}Unknown element type</div>;
  }
}
