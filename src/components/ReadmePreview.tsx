import { useRef, useState } from 'react';
import { Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ElementRenderer } from '@/components/ElementRenderer';
import type { ElementType } from '@/types/elements';
import { useTheme } from '@/components/theme-provider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ReadmePreviewProps {
  elements: ElementType[];
}

export function ReadmePreview({ elements }: ReadmePreviewProps) {
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Show all elements without filtering based on persona
  const filteredElements = elements;

  const generateMarkdown = (): string =>
    filteredElements
      .map((element) => {
        switch (element.type) {
          case 'header':
            return `# ${element.content}\n\n`;
          case 'text':
            return `${element.content}\n\n`;
          case 'banner':
            return `<div align="center">\n  <h1>${element.content}</h1>\n</div>\n\n`;
          case 'git-contribution':
            return `## 🤝 How to Contribute\n\n1. Fork the repository\n2. Clone your fork: \`git clone https://github.com/${element.username}/${element.repository}.git\`\n3. Create a feature branch: \`git checkout -b feature-name\`\n4. Make your changes and commit: \`git commit -m "Add feature"\`\n5. Push to your fork: \`git push origin feature-name\`\n6. Create a Pull Request\n\n`;
          case 'tech-stack': {
            /* Tech stack element handling */
            const techElement = element as any;
            let badgeStyle = techElement.badgeStyle || '';
            const theme = techElement.theme || 'dark';
            
            // Helper function to create badge URL
            const getBadgeUrl = (tech: string): string => {
              // Get theme color based on theme setting
              let themeColor = '05122A'; // default dark color
              if (theme === 'light') themeColor = 'f8f8f8';
              if (theme === 'blue') themeColor = '0366D6';
              if (theme === 'purple') themeColor = '6F42C1';
              if (theme === 'green') themeColor = '2EA44F';
              if (theme === 'orange') themeColor = 'F97316';
              
              // Process the technology name
              const cleanTechName = tech.toLowerCase().replace(/\s+/g, '-');
              
              // Handle various badge styles
              if (badgeStyle === 'simple-icons') {
                // Simple Icons style - uses shields.io with logo parameter
                return `https://img.shields.io/badge/${tech}-${themeColor}?style=flat&logo=${cleanTechName}`;
              } 
              else if (badgeStyle === 'for-the-badge-colored') {
                return `https://img.shields.io/badge/${tech}-${themeColor}?style=for-the-badge&logoColor=white`;
              }
              else if (badgeStyle === 'flat-colored') {
                return `https://img.shields.io/badge/${tech}-${themeColor}?style=flat&logoColor=white`;
              }
              else if (badgeStyle === 'badge-card') {
                return `https://img.shields.io/static/v1?label=&message=${tech}&color=${themeColor}&style=for-the-badge`;
              }
              else if (badgeStyle === 'badge-glow') {
                return `https://img.shields.io/badge/${tech}-${themeColor}?style=for-the-badge&logoColor=white&labelColor=${themeColor}`;
              }
              else if (badgeStyle === 'skill-icons') {
                // Skill Icons - uses skillicons.dev
                return `https://skillicons.dev/icons?i=${cleanTechName}`;
              }
              else if (badgeStyle === 'flat-icons') {
                // Flat Icons - uses flaticon.com with common technology mappings
                const flatIconMappings: { [key: string]: string } = {
                  'javascript': '5968292', 'typescript': '5968381', 'python': '5968350',
                  'react': '1183672', 'node.js': '5968322', 'java': '5968282',
                  'html': '1051277', 'css': '732190', 'git': '2111288'
                };
                const iconId = flatIconMappings[cleanTechName] || '4248443'; // Default icon if not found
                return `https://cdn-icons-png.flaticon.com/128/${iconId.slice(0, -3)}/${iconId}.png`;
              }
              else if (badgeStyle === 'material-icons') {
                // Material Design Icons - uses Google's Material Icons
                const materialIconMappings: { [key: string]: string } = {
                  'javascript': 'code', 'typescript': 'code', 'python': 'code',
                  'react': 'web', 'node.js': 'dns', 'java': 'code',
                  'html': 'html', 'css': 'css', 'git': 'merge_type'
                };
                const iconName = materialIconMappings[cleanTechName] || 'code'; // Default to code icon
                return `https://fonts.gstatic.com/s/i/materialicons/${iconName}/v12/24px.svg`;
              }
              else if (badgeStyle === 'github-icons') {
                // GitHub File Icons - uses GitHub's repository explore icons
                return `https://github.com/github/explore/raw/main/topics/${cleanTechName}/${cleanTechName}.png`;
              }
              else if (badgeStyle === 'icons8') {
                // Icons8 - uses Icons8 service with color icons
                const icon8Mappings: { [key: string]: string } = {
                  'javascript': 'javascript', 'typescript': 'typescript', 'python': 'python',
                  'react': 'react', 'node.js': 'nodejs', 'java': 'java',
                  'html': 'html-5', 'css': 'css3', 'git': 'git'
                };
                const iconName = icon8Mappings[cleanTechName] || cleanTechName;
                return `https://img.icons8.com/color/48/000000/${iconName}.png`;
              }
              else if (badgeStyle === 'svg-badges') {
                // Custom SVG Badges - inline SVG with dynamic technology name
                // Use a data URI to embed the SVG directly
                const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30"><rect width="120" height="30" rx="15" fill="#${themeColor}"/><text x="60" y="20" font-family="Arial" font-size="14" fill="white" text-anchor="middle">${tech}</text></svg>`;
                const encodedSvg = encodeURIComponent(svgContent);
                return `data:image/svg+xml;utf8,${encodedSvg}`;
              }
              else if (badgeStyle === 'animated-badges') {
                // Animated Badges - uses readme-typing-svg for simple animation
                return `https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=1000&pause=500&color=${themeColor}&center=true&vCenter=true&width=100&height=30&lines=${tech}`;
              }
              else if (badgeStyle === 'devto-badges') {
                // Dev.to style badges
                return `https://img.shields.io/badge/${tech}-0A0A0A?style=for-the-badge&logo=${cleanTechName}&logoColor=white`;
              }
              else if (badgeStyle === 'edge-icons') {
                // Edge Icons - modern icon style
                // This would typically require a real service, using devicon as fallback
                const savedStyle = badgeStyle;
                badgeStyle = 'devicon';
                const fallbackIcon = getBadgeUrl(tech);
                badgeStyle = savedStyle;
                return fallbackIcon;
              }
              else if (badgeStyle === 'devicon-with-text') {
                // For devicon-with-text, we need the devicon URL
                // Use a temporary different style to avoid infinite recursion
                const tempStyle = badgeStyle;
                badgeStyle = 'devicon';
                const iconPath = getBadgeUrl(tech);
                badgeStyle = tempStyle;
                return iconPath;
              }
              else if (badgeStyle === 'devicon') {
                // Map of special cases for technologies that need custom handling
                const techMappings: { [key: string]: string } = {
                  // Languages
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
                  'sql': 'postgresql/postgresql', // Placeholder for general SQL
                  'bash': 'bash/bash',
                  'scala': 'scala/scala',
                  'haskell': 'haskell/haskell',
                  'r': 'r/r',
                  
                  // Frameworks & Libraries
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
                  
                  // Databases
                  'mongodb': 'mongodb/mongodb',
                  'mysql': 'mysql/mysql',
                  'postgresql': 'postgresql/postgresql',
                  'postgres': 'postgresql/postgresql',
                  'firebase': 'firebase/firebase',
                  'redis': 'redis/redis',
                  'sqlite': 'sqlite/sqlite',
                  
                  // Tools & Platforms
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
                
                // Process the technology name
                const cleanTech = tech.toLowerCase().replace(/\s+/g, '').replace(/\.js$/, 'js');
                
                // Use the mapping if available, otherwise use the cleaned tech name
                const techPath = techMappings[cleanTech] || `${cleanTech}/${cleanTech}`;
                
                return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techPath}-original.svg`;
              } else {
                let themeColor = '05122A'; // default dark color
                if (theme === 'light') themeColor = 'f8f8f8';
                if (theme === 'blue') themeColor = '0366D6';
                if (theme === 'purple') themeColor = '6F42C1';
                if (theme === 'green') themeColor = '2EA44F';
                if (theme === 'orange') themeColor = 'F97316';
                
                return `https://img.shields.io/badge/-${tech}-${themeColor}?style=${badgeStyle || 'flat'}`;
              }
            };
            
            // Render based on layout
            if (element.layout === 'badges') {
              // For icon-style layouts, create a markdown table for better layout and compatibility
              if (badgeStyle && (badgeStyle.includes('icon') || 
                  ['devicon', 'simple-icons', 'skill-icons', 'devicon-with-text', 
                   'flat-icons', 'material-icons', 'github-icons', 'icons8', 
                   'svg-badges', 'animated-badges', 'devto-badges', 'edge-icons'].includes(badgeStyle))) {
                
                // Create rows with 6 technologies per row
                const techRows = element.technologies.reduce((acc, tech, index) => {
                  if (index % 6 === 0) acc.push([tech]);
                  else acc[acc.length - 1].push(tech);
                  return acc;
                }, [] as string[][]);
                
                const tableRows = techRows.map(row => {
                  const cells = row.map(tech => {
                    // Handle different badge styles with appropriate HTML
                    if (badgeStyle === 'devicon' || badgeStyle === 'flat-icons' || 
                        badgeStyle === 'material-icons' || badgeStyle === 'github-icons' || 
                        badgeStyle === 'icons8' || badgeStyle === 'edge-icons') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" width="40" height="40" />`;
                    } else if (badgeStyle === 'skill-icons') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" />`;
                    } else if (badgeStyle === 'devicon-with-text') {
                      return `<div align="center"><img src="${getBadgeUrl(tech)}" alt="${tech}" width="40" height="40" /><br>${tech}</div>`;
                    } else if (badgeStyle === 'svg-badges' || badgeStyle === 'animated-badges') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" height="30" />`;
                    } else { // simple-icons, devto-badges and others
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" />`;
                    }
                  });
                  return '| ' + cells.join(' | ') + ' |';
                }).join('\n');
                
                // Create table header and separator based on row length
                const maxCols = Math.max(...techRows.map(row => row.length));
                const header = '|' + ' '.repeat(maxCols * 3 - 1) + '|';
                const separator = '|' + '--|'.repeat(maxCols);
                
                return `## ⚡ Tech Stack\n\n${header}\n${separator}\n${tableRows}\n\n`;
              } else {
                // For regular badge styles, use simple markdown image syntax
                return `## ⚡ Tech Stack\n\n${element.technologies
                  .map(tech => `![${tech}](${getBadgeUrl(tech)})`)
                  .join(' ')}\n\n`;
              }
            } else if (element.layout === 'list') {
              // For list layout, generate simple list with or without badges
              if (badgeStyle) {
                return `## ⚡ Tech Stack\n\n${element.technologies.map((tech) => `- ![${tech}](${getBadgeUrl(tech)})`).join('\n')}\n\n`;
              } else {
                return `## ⚡ Tech Stack\n\n${element.technologies.map((tech) => `- ${tech}`).join('\n')}\n\n`;
              }
            } else if (element.layout === 'inline') {
              // For inline layout, join with bullet separators
              return `## ⚡ Tech Stack\n\n${element.technologies
                .map(tech => badgeStyle ? `![${tech}](${getBadgeUrl(tech)})` : tech)
                .join(' • ')}\n\n`;
            } else if (element.layout === 'grouped') {
              // For grouped layout, separate by categories
              const languages = element.technologies.filter(t => 
                ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++'].includes(t)
              );
              const frameworks = element.technologies.filter(t => 
                ['React', 'Angular', 'Vue', 'Next.js', 'Node.js', 'Express'].includes(t)
              );
              
              let markdown = `## ⚡ Tech Stack\n\n`;
              
              if (languages.length > 0) {
                markdown += `### Languages\n\n`;
                // For icon-style badges, use HTML table layout
                if (badgeStyle && (badgeStyle.includes('icon') || 
                    ['devicon', 'simple-icons', 'skill-icons', 'devicon-with-text', 
                     'flat-icons', 'material-icons', 'github-icons', 'icons8', 
                     'svg-badges', 'animated-badges', 'devto-badges', 'edge-icons'].includes(badgeStyle))) {
                  
                  // Create a row of icons in table format for better compatibility
                  const cells = languages.map(tech => {
                    if (badgeStyle === 'devicon' || badgeStyle === 'flat-icons' || 
                        badgeStyle === 'material-icons' || badgeStyle === 'github-icons' || 
                        badgeStyle === 'icons8' || badgeStyle === 'edge-icons') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" width="40" height="40" />`;
                    } else if (badgeStyle === 'skill-icons') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" />`;
                    } else if (badgeStyle === 'devicon-with-text') {
                      return `<div align="center"><img src="${getBadgeUrl(tech)}" alt="${tech}" width="40" height="40" /><br>${tech}</div>`;
                    } else if (badgeStyle === 'svg-badges' || badgeStyle === 'animated-badges') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" height="30" />`;
                    } else { // simple-icons, devto-badges and others
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" />`;
                    }
                  });
                  
                  const tableRow = '| ' + cells.join(' | ') + ' |';
                  const colCount = languages.length;
                  const header = '|' + ' '.repeat(colCount * 3 - 1) + '|';
                  const separator = '|' + '--|'.repeat(colCount);
                  
                  markdown += `${header}\n${separator}\n${tableRow}\n\n`;
                } else if (badgeStyle) {
                  // For standard badge styles, use markdown image syntax
                  markdown += languages.map(tech => `![${tech}](${getBadgeUrl(tech)})`).join(' ') + '\n\n';
                } else {
                  // For no badge style, use simple list
                  markdown += languages.map(tech => `- ${tech}`).join('\n') + '\n\n';
                }
              }
              
              if (frameworks.length > 0) {
                markdown += `### Frameworks\n\n`;
                // For icon-style badges, use HTML table layout
                if (badgeStyle && (badgeStyle.includes('icon') || 
                    ['devicon', 'simple-icons', 'skill-icons', 'devicon-with-text', 
                     'flat-icons', 'material-icons', 'github-icons', 'icons8', 
                     'svg-badges', 'animated-badges', 'devto-badges', 'edge-icons'].includes(badgeStyle))) {
                  
                  // Create a row of icons in table format for better compatibility
                  const cells = frameworks.map(tech => {
                    if (badgeStyle === 'devicon' || badgeStyle === 'flat-icons' || 
                        badgeStyle === 'material-icons' || badgeStyle === 'github-icons' || 
                        badgeStyle === 'icons8' || badgeStyle === 'edge-icons') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" width="40" height="40" />`;
                    } else if (badgeStyle === 'skill-icons') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" />`;
                    } else if (badgeStyle === 'devicon-with-text') {
                      return `<div align="center"><img src="${getBadgeUrl(tech)}" alt="${tech}" width="40" height="40" /><br>${tech}</div>`;
                    } else if (badgeStyle === 'svg-badges' || badgeStyle === 'animated-badges') {
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" height="30" />`;
                    } else { // simple-icons, devto-badges and others
                      return `<img src="${getBadgeUrl(tech)}" alt="${tech}" />`;
                    }
                  });
                  
                  const tableRow = '| ' + cells.join(' | ') + ' |';
                  const colCount = frameworks.length;
                  const header = '|' + ' '.repeat(colCount * 3 - 1) + '|';
                  const separator = '|' + '--|'.repeat(colCount);
                  
                  markdown += `${header}\n${separator}\n${tableRow}\n\n`;
                } else if (badgeStyle) {
                  // For standard badge styles, use markdown image syntax
                  markdown += frameworks.map(tech => `![${tech}](${getBadgeUrl(tech)})`).join(' ') + '\n\n';
                } else {
                  // For no badge style, use simple list
                  markdown += frameworks.map(tech => `- ${tech}`).join('\n') + '\n\n';
                }
              }
              
              return markdown;
            } else if (element.layout === 'grid') {
              // For grid layout, create a markdown table with 3 techs per row
              
              // Create rows with 3 elements per row
              let markdown = `## ⚡ Tech Stack\n\n`;
              
              // Split technologies into rows of 3
              const rowsOfTech = element.technologies.reduce((acc, tech, index) => {
                if (index % 3 === 0) acc.push([tech]);
                else acc[acc.length - 1].push(tech);
                return acc;
              }, [] as string[][]);
              
              // Generate markdown table for grid layout
              if (badgeStyle && (badgeStyle.includes('icon') || 
                  ['devicon', 'simple-icons', 'skill-icons', 'devicon-with-text', 
                   'flat-icons', 'material-icons', 'github-icons', 'icons8', 
                   'svg-badges', 'animated-badges', 'devto-badges', 'edge-icons'].includes(badgeStyle))) {
                
                // Table header and separator
                const colCount = Math.min(3, Math.max(...rowsOfTech.map(row => row.length)));
                const header = '|' + ' '.repeat(colCount * 5 - 1) + '|';
                const separator = '|' + '----|'.repeat(colCount);
                markdown += `${header}\n${separator}\n`;
                
                // Table rows
                rowsOfTech.forEach(row => {
                  const cells = row.map(tech => {
                    // Handle different badge styles with appropriate HTML
                    if (badgeStyle === 'devicon' || badgeStyle === 'flat-icons' || 
                        badgeStyle === 'material-icons' || badgeStyle === 'github-icons' || 
                        badgeStyle === 'icons8' || badgeStyle === 'edge-icons') {
                      return `<div align="center"><img src="${getBadgeUrl(tech)}" alt="${tech}" width="60" height="60" /><br>${tech}</div>`;
                    } else if (badgeStyle === 'skill-icons') {
                      return `<div align="center"><img src="${getBadgeUrl(tech)}" alt="${tech}" /><br>${tech}</div>`;
                    } else if (badgeStyle === 'devicon-with-text') {
                      return `<div align="center"><img src="${getBadgeUrl(tech)}" alt="${tech}" width="60" height="60" /><br>${tech}</div>`;
                    } else if (badgeStyle === 'svg-badges' || badgeStyle === 'animated-badges') {
                      return `<div align="center"><img src="${getBadgeUrl(tech)}" alt="${tech}" height="30" /><br>${tech}</div>`;
                    } else { // simple-icons, devto-badges and others
                      return `<div align="center"><img src="${getBadgeUrl(tech)}" alt="${tech}" /><br>${tech}</div>`;
                    }
                  });
                  
                  // Pad cells to maintain table structure
                  while (cells.length < colCount) {
                    cells.push('');
                  }
                  
                  markdown += '| ' + cells.join(' | ') + ' |\n';
                });
                
                markdown += '\n';
              } else if (badgeStyle) {
                // For regular badge styles, create a grid-like structure with markdown
                rowsOfTech.forEach(row => {
                  const cells = row.map(tech => `<div align="center">![${tech}](${getBadgeUrl(tech)})<br>${tech}</div>`);
                  markdown += '| ' + cells.join(' | ') + ' |\n';
                });
                
                const colCount = Math.min(3, Math.max(...rowsOfTech.map(row => row.length)));
                const separator = '|' + '----|'.repeat(colCount);
                
                // Insert separator after the first row
                const lines = markdown.split('\n');
                lines.splice(3, 0, separator);
                markdown = lines.join('\n') + '\n\n';
              } else {
                // Simple text grid without badges
                rowsOfTech.forEach(row => {
                  const cells = row.map(tech => `<div align="center">${tech}</div>`);
                  markdown += '| ' + cells.join(' | ') + ' |\n';
                });
                
                const colCount = Math.min(3, Math.max(...rowsOfTech.map(row => row.length)));
                const separator = '|' + '----|'.repeat(colCount);
                
                // Insert separator after the first row
                const lines = markdown.split('\n');
                lines.splice(3, 0, separator);
                markdown = lines.join('\n') + '\n\n';
              }
              
              return markdown;
            }
            return `## ⚡ Tech Stack\n\n${element.technologies.join(', ')}\n\n`;
          }
          case 'image':
            const imageElement = element as any;
            return `![${imageElement.alt}](${imageElement.src})\n\n`;
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
      })
      .join('');

  const copyToClipboard = async () => {
    const markdown = generateMarkdown();
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
    return 'Shows all README elements with complete formatting and styling';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border p-4 bg-muted/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">README Preview</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!filteredElements.length}>
              <Copy className="h-4 w-4" /> Copy
            </Button>
            {copied && <span className="text-green-500 text-sm">Copied!</span>}
            <Button variant="outline" size="sm" onClick={downloadMarkdown} disabled={!filteredElements.length}>
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{getViewModeDescription()}</p>
      </div>

      <Tabs defaultValue="preview" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 w-fit">
          <TabsTrigger value="preview">Visual Preview</TabsTrigger>
          <TabsTrigger value="markdown">Markdown Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="flex-1 overflow-auto p-4">
          <div
            ref={previewRef}
            className="p-10 rounded-2xl shadow-xl max-w-4xl mx-auto border"
            style={{
              background: isDark ? '#18181b' : '#ffffff',
                            fontFamily: 'Inter, sans-serif',
              color: isDark ? '#f3f4f6' : '#1e293b',
              lineHeight: '1.75',
            }}
          >
            {filteredElements.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <p className="text-2xl font-semibold mb-3">Your README is empty</p>
                <p className="text-sm text-gray-500">Add elements from the sidebar to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredElements.map((element) => (
                  <ElementRenderer key={element.id} element={element} isPreview />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="markdown" className="p-6 whitespace-pre-wrap font-mono text-sm">
          {generateMarkdown()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
