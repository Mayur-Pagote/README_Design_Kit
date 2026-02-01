
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { GeneratorState } from './Readme-generator';
import ProgressIndicator from "./ProgressIndicator";
import { TECH_STACK_CATEGORIES } from '@/constants/techstack';

interface TechStackPageProps {
  state: GeneratorState;
  setState: (state: GeneratorState) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const TechStackPage = ({ state, setState, currentPage, totalPages, nextPage, prevPage }: TechStackPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const techCategories = TECH_STACK_CATEGORIES;

  const toggleTech = (category: keyof typeof state.techStack, tech: string) => {
    const currentTechs = state.techStack[category];
    const updatedTechs = currentTechs.includes(tech)
      ? currentTechs.filter(t => t !== tech)
      : [...currentTechs, tech];

    setState({
      ...state,
      techStack: {
        ...state.techStack,
        [category]: updatedTechs,
      },
    });
  };

  const isSelected = (category: keyof typeof state.techStack, tech: string) => {
    return state.techStack[category].includes(tech);
  };

  const filteredCategories = Object.entries(techCategories).map(([key, category]) => ({
    key: key as keyof typeof state.techStack,
    ...category,
    items: category.items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const getTotalSelected = () => {
    return Object.values(state.techStack).reduce((total, techs) => total + techs.length, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <ProgressIndicator current={currentPage} total={totalPages - 1} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-foreground px-4 py-2 rounded-full mb-4 text-sm font-medium">
              <Code className="w-4 h-4" />
              Tech Stack
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-primary bg-clip-text text-transparent">
              Add Tech that you use
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Showcase your technical skills and the technologies you work with.
            </p>
            
            <div className="relative max-w-md mx-auto mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search tech..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-slate-600 text-muted-foreground placeholder:text-muted-foreground focus:border-purple-500"
              />
            </div>

            <div className="text-sm text-muted-foreground">
              {getTotalSelected()} technologies selected
            </div>
          </motion.div>

          <div className="space-y-8 mb-12">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-background/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 bg-gradient-to-r ${category.color} rounded-full`}></div>
                  <h3 className="font-bold text-foreground text-lg">{category.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    ({state.techStack[category.key].length} selected)
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.items.map((tech) => (
                    <Badge
                      key={tech}
                      variant={isSelected(category.key, tech) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        isSelected(category.key, tech)
                          ? `bg-gradient-to-r ${category.color} hover:opacity-80 text-white border-0`
                          : 'border-slate-600 text-muted-foreground hover:border-slate-500 hover:bg-primary hover:text-white'
                      }`}
                      onClick={() => toggleTech(category.key, tech)}
                    >
                      {tech}
                      {isSelected(category.key, tech) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={prevPage}
              variant="outline"
              className="flex items-center gap-2 border-slate-600 text-foreground hover:text-foreground/90 hover:border-slate-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>

            <Button
              onClick={nextPage}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;
