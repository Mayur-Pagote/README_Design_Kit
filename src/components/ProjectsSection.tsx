import React, { useState, useEffect, useMemo } from 'react';
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
  const [stars, setStars] = useState<number | null>(null);
  const [forks, setForks] = useState<number | null>(null);

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/Mayur-Pagote/README_Design_Kit");
        if(!response.ok) {
          throw new Error("GitHub API Error");
        }
        const data = await response.json();
        setStars(data.stargazers_count);
        setForks(data.forks_count);
      } catch(error) {
        console.error("Error fetching GitHub stars: ", error);
      }
    };

    fetchRepoStats();
  },[])

  //Demo Project if no project is available

  const demoProject = {
    id: 1,
    title: "README Design Kit",
    description: "README_Design_Kit is an open-source template project meant to help developers and contributors create high-quality, consistent, and appealing README.md files for any type of GitHub project — whether you're building a Python CLI tool, a web app, or participating in open-source programs like SSoC.",
    category: "DevTools",
    tags: ["React", "TypeScript", "Open Source", "Documentation"],
    stars: stars !== null ? stars: 0,
    forks: forks !== null ? forks: 0,
    gradient: "from-purple-600 to-blue-600",
    featured: true,
    githubUrl: "https://github.com/Mayur-Pagote/README_Design_Kit",
    websiteUrl: "https://readme-design-kit.vercel.app/"
  }

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

        {/* If No Projects Exist, Show demo project */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-5 animate-in fade-in duration-700 delay-400 space-y-8">
             <h3 className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                No projects available,&nbsp;
                <Link to="/submit" className="text-primary hover:underline hover:text-primary/80 transition-colors">
                  submit one
                </Link>
                ! Here’s a demo project:
            </h3>

            {/* demo project card */}
            <div className="max-w-md mx-auto">
              <ProjectCard project={demoProject} />
            </div>
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
