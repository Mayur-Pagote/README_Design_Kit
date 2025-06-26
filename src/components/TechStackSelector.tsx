import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Badge,
} from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// List of common technologies categorized
const techOptions = {
  languages: [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Go',
    'Swift', 'Kotlin', 'Rust', 'Dart', 'HTML', 'CSS', 'SQL', 'Bash', 'Scala', 'Haskell', 'R'
  ],
  frameworks: [
    'React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Nuxt.js', 'Express', 'Django',
    'Flask', 'Spring', 'ASP.NET', 'Laravel', 'Ruby on Rails', 'FastAPI', 'Flutter',
    'React Native', 'TensorFlow', 'PyTorch', 'Node.js'
  ],
  tools: [
    'VS Code', 'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform',
    'AWS', 'Azure', 'GCP', 'Firebase', 'Heroku', 'Vercel', 'Netlify', 'Figma', 'Adobe XD',
    'Webpack', 'Vite', 'NPM', 'Yarn', 'Jest', 'Cypress', 'Postman'
  ],
  databases: [
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Oracle', 'Redis', 'Cassandra', 'DynamoDB',
    'Firebase Firestore', 'Supabase', 'Elasticsearch', 'SQL Server', 'MariaDB'
  ]
};

// Tech stack styling options
const styleOptions = [
  // Basic shield.io styles
  { value: 'flat', label: 'Flat Badges', example: '![Tech](https://img.shields.io/badge/-Tech-05122A?style=flat)' },
  { value: 'flat-square', label: 'Flat Square', example: '![Tech](https://img.shields.io/badge/-Tech-05122A?style=flat-square)' },
  { value: 'plastic', label: 'Plastic', example: '![Tech](https://img.shields.io/badge/-Tech-05122A?style=plastic)' },
  { value: 'for-the-badge', label: 'For The Badge', example: '![Tech](https://img.shields.io/badge/-Tech-05122A?style=for-the-badge)' },
  { value: 'social', label: 'Social', example: '![Tech](https://img.shields.io/badge/-Tech-05122A?style=social)' },
  
  // Icon libraries
  { value: 'devicon', label: 'Dev Icons', example: '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tech/tech-original.svg" width="40" height="40"/>' },
  { value: 'simple-icons', label: 'Simple Icons', example: '<img src="https://img.shields.io/badge/Tech-black?style=flat&logo=tech" />' },
  
  // Additional badge styles
  { value: 'for-the-badge-colored', label: 'For The Badge (Colored)', example: '![Tech](https://img.shields.io/badge/Tech-0366D6?style=for-the-badge&logoColor=white)' },
  { value: 'flat-colored', label: 'Flat Colored', example: '![Tech](https://img.shields.io/badge/Tech-0366D6?style=flat&logoColor=white)' },
  
  // Icon with text styles
  { value: 'devicon-with-text', label: 'Dev Icon with Text', example: '<div align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tech/tech-original.svg" width="40" height="40"/><br>Tech</div>' },
  { value: 'skill-icons', label: 'Skill Icons', example: '<img src="https://skillicons.dev/icons?i=tech" alt="Tech" />' },
  
  // Card-style badges
  { value: 'badge-card', label: 'Badge Card', example: '![Tech](https://img.shields.io/static/v1?label=&message=Tech&color=0366D6&style=for-the-badge)' },
  { value: 'badge-glow', label: 'Glow Effect', example: '![Tech](https://img.shields.io/badge/Tech-0366D6?style=for-the-badge&logoColor=white&labelColor=0366D6)' },
  
  // New badge styles
  { value: 'flat-icons', label: 'Flat Icons', example: '<img src="https://cdn-icons-png.flaticon.com/128/5968/5968292.png" alt="Tech" width="40" height="40"/>' },
  { value: 'material-icons', label: 'Material Icons', example: '<img src="https://fonts.gstatic.com/s/i/materialicons/code/v12/24px.svg" alt="Tech" width="40" height="40"/>' },
  { value: 'github-icons', label: 'GitHub File Icons', example: '<img src="https://github.com/github/explore/raw/main/topics/tech/tech.png" alt="Tech" width="40" height="40"/>' },
  { value: 'icons8', label: 'Icons8', example: '<img src="https://img.icons8.com/color/48/000000/tech.png" alt="Tech" width="40" height="40"/>' },
  { value: 'svg-badges', label: 'SVG Badges', example: '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30"><rect width="120" height="30" rx="15" fill="#0366D6"/><text x="60" y="20" font-family="Arial" font-size="14" fill="white" text-anchor="middle">Tech</text></svg>' },
  { value: 'animated-badges', label: 'Animated Badges', example: '<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=1000&pause=500&color=0366D6&center=true&vCenter=true&width=100&height=30&lines=Tech" alt="Tech"/>' },
  { value: 'devto-badges', label: 'Dev.to Badges', example: '<img src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg" alt="Tech" width="40" height="40"/>' },
  { value: 'edge-icons', label: 'Edge Icons', example: '<img src="https://edgeicons.dev/i/icon-name" alt="Tech" width="40" height="40"/>' }
];

// Layout options
const layoutOptions = [
  { value: 'list', label: 'Simple List' },
  { value: 'grid', label: 'Grid' },
  { value: 'inline', label: 'Inline' },
  { value: 'grouped', label: 'Grouped by Category' }
];

// Color theme options
const themeOptions = [
  { value: 'dark', label: 'Dark', primary: '#0D1117', secondary: '#161B22', text: '#F0F6FC' },
  { value: 'light', label: 'Light', primary: '#FFFFFF', secondary: '#F6F8FA', text: '#24292E' },
  { value: 'blue', label: 'Blue', primary: '#0366D6', secondary: '#79B8FF', text: '#FFFFFF' },
  { value: 'purple', label: 'Purple', primary: '#6F42C1', secondary: '#B392F0', text: '#FFFFFF' },
  { value: 'green', label: 'Green', primary: '#2EA44F', secondary: '#56D364', text: '#FFFFFF' },
  { value: 'orange', label: 'Orange', primary: '#F97316', secondary: '#FDBA74', text: '#FFFFFF' }
];

interface TechStackSelectorProps {
  onTechStackGenerate: (techStack: {
    technologies: string[];
    style: string;
    layout: string;
    theme: string;
  }) => void;
}

export function TechStackSelector({ onTechStackGenerate }: TechStackSelectorProps) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [customTech, setCustomTech] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('flat');
  const [selectedLayout, setSelectedLayout] = useState('grid');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [activeCategory, setActiveCategory] = useState('languages');

  const handleAddTech = (tech: string) => {
    if (!selectedTechs.includes(tech)) {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const handleAddCustomTech = () => {
    if (customTech.trim() && !selectedTechs.includes(customTech.trim())) {
      setSelectedTechs([...selectedTechs, customTech.trim()]);
      setCustomTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setSelectedTechs(selectedTechs.filter(t => t !== tech));
  };

  const handleGenerate = () => {
    onTechStackGenerate({
      technologies: selectedTechs,
      style: selectedStyle,
      layout: selectedLayout,
      theme: selectedTheme
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Selected Technologies</h3>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-muted/30 rounded-md">
          {selectedTechs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No technologies selected yet</p>
          ) : (
            selectedTechs.map(tech => (
              <Badge key={tech} variant="secondary" className="px-2 py-1">
                {tech}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleRemoveTech(tech)} 
                />
              </Badge>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Add Technologies</h3>
        
        <Tabs defaultValue="languages" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="databases">Databases</TabsTrigger>
          </TabsList>
          
          {Object.keys(techOptions).map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-3 gap-2">
                {techOptions[category as keyof typeof techOptions].map(tech => (
                  <Button 
                    key={tech}
                    variant={selectedTechs.includes(tech) ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleAddTech(tech)}
                    className="justify-start text-left"
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Add custom technology..."
            value={customTech}
            onChange={(e) => setCustomTech(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomTech()}
          />
          <Button onClick={handleAddCustomTech} type="button">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="style-select">Badge Style</Label>
          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
            <SelectTrigger id="style-select" className="mt-1">
              <SelectValue placeholder="Select badge style" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="layout-select">Layout</Label>
          <Select value={selectedLayout} onValueChange={setSelectedLayout}>
            <SelectTrigger id="layout-select" className="mt-1">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              {layoutOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Color Theme</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {themeOptions.map(theme => (
            <div
              key={theme.value}
              className={`border rounded-md p-2 cursor-pointer ${
                selectedTheme === theme.value ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedTheme(theme.value)}
              style={{
                background: theme.primary,
                color: theme.text
              }}
            >
              <div className="text-center text-sm py-1">{theme.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Preview Style</h3>
            <Badge variant="outline">
              {styleOptions.find(s => s.value === selectedStyle)?.label}
            </Badge>
          </div>
          
          <div className="mt-4 p-3 bg-muted/30 rounded-md min-h-[60px] flex items-center justify-center">
            {selectedStyle === 'devicon' ? (
              <div className="text-center">
                <div className="flex gap-2 justify-center">
                  {['react', 'typescript', 'nodejs'].map(tech => (
                    <img 
                      key={tech}
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`}
                      width="40" 
                      height="40"
                      alt={tech}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">DevIcons Style</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex gap-2 justify-center">
                  {['React', 'TypeScript', 'Node.js'].map(tech => (
                    <img 
                      key={tech}
                      src={`https://img.shields.io/badge/-${tech}-05122A?style=${selectedStyle}`}
                      alt={tech}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Shields.io Style</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleGenerate} className="w-full">
        Generate Tech Stack Element
      </Button>
    </div>
  );
}
