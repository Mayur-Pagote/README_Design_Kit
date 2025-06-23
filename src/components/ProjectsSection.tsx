import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const ProjectsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory] = useState<string>('All Projects');
  const [submittedProjects] = useState<Array<any>>(() => {
    const savedProjects = localStorage.getItem("submittedProjects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const filteredProjects = useMemo(() => {
    let filtered = Array.isArray(submittedProjects) ? [...submittedProjects] : []; 

    if (activeCategory !== 'All Projects') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }

    if (searchTerm.trim().length > 0) { 
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(project.tags) ? project.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) : false)
      );
    }

    return filtered;
  }, [searchTerm, activeCategory, submittedProjects]);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-muted/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-in slide-in-from-top-5 duration-700">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Discover & Explore</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-in slide-in-from-top-5 duration-700 delay-100">
            Explore Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-top-5 duration-700 delay-200">
            Find the perfect inspiration for your next project
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom-5 duration-700 delay-300">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
            <Input
              type="text"
              placeholder="Search projects, technologies, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-6 text-lg rounded-2xl border-border/50 bg-background/80 backdrop-blur-sm focus:bg-background transition-all duration-200 hover:border-primary/50"
            />
          </div>
        </div>

        {/* If No Projects Exist, Show Submit Button */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 animate-in fade-in duration-700 delay-400">
            <Card className="max-w-md mx-auto bg-background/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">No projects added yet</h3>
                  <p className="text-muted-foreground">Be the first to showcase your work!</p>
                </div>
                <Link to="/submit">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Your Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700 delay-400">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id || index} 
                className="animate-in slide-in-from-bottom-5 duration-500"
                style={{ animationDelay: `${(index % 6) * 100 + 500}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
