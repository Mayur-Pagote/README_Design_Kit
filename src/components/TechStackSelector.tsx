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
import { TECH_STACK_CATEGORIES } from '@/constants/techstack';

// Tech stack styling options
const styleOptions = [
  { value: 'flat', label: 'Flat Badges' },
  { value: 'flat-square', label: 'Flat Square' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'for-the-badge', label: 'For The Badge' },
  { value: 'social', label: 'Social' },
  { value: 'devicon', label: 'Dev Icons' },
  { value: 'simple-icons', label: 'Simple Icons' },
  { value: 'skill-icons', label: 'Skill Icons' }
];

const layoutOptions = [
  { value: 'list', label: 'Simple List' },
  { value: 'grid', label: 'Grid' },
  { value: 'inline', label: 'Inline' },
  { value: 'grouped', label: 'Grouped by Category' }
];

const themeOptions = [
  { value: 'dark', label: 'Dark', primary: '#0D1117', secondary: '#161B22', text: '#F0F6FC' },
  { value: 'light', label: 'Light', primary: '#FFFFFF', secondary: '#F6F8FA', text: '#24292E' },
  { value: 'blue', label: 'Blue', primary: '#0366D6', secondary: '#79B8FF', text: '#FFFFFF' }
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
            <TabsTrigger value="databases">Databases</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          {Object.entries(TECH_STACK_CATEGORIES).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="grid grid-cols-3 gap-2">
                {category.items.map(tech => (
                  <Button 
                    key={tech}
                    variant={selectedTechs.includes(tech) ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleAddTech(tech)}
                    className="justify-start text-left truncate"
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
              className={`border rounded-md p-2 cursor-pointer transition-all ${
                selectedTheme === theme.value ? 'ring-2 ring-primary scale-105' : ''
              }`}
              onClick={() => setSelectedTheme(theme.value)}
              style={{ background: theme.primary, color: theme.text }}
            >
              <div className="text-center text-sm py-1">{theme.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleGenerate} className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
        Generate Tech Stack Element
      </Button>
    </div>
  );
}
