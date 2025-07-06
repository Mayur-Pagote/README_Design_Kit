import React from 'react';
import { Star, GitBranch, Sparkles, ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string;
    tags?: string[]; // ✅ Make `tags` optional
    stars?: number;
    forks?: number;
    gradient?: string;
    icon?: React.ComponentType<{ className?: string }>; // ✅ Ensure `icon` is optional
    featured?: boolean;
    githubUrl?: string;
    websiteUrl?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const Icon = project.icon || Sparkles; // ✅ Use a fallback icon if `undefined`

  const handleGitClick = () => {
    if(project.githubUrl) {
      window.open(project.githubUrl, "_blank", "noopener noreferrer");
    } else {
      alert("Github Repo not available yet");
    }
  };

  const handleWebsiteClick = () => {
    if(project.websiteUrl) {
      window.open(project.websiteUrl, "_blank", "noopener noreferrer");
    } else {
      alert("Website not deployed yet");
    }
  }

  return (
    <Card className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden hover:bg-card/80">
      {/* Gradient Header */}
      <CardHeader className="p-0">
        <div className={`h-32 bg-gradient-to-r ${project.gradient || 'from-primary/60 to-primary/80'} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-background/20"></div>
          <div className="absolute top-4 right-4">
            {project.featured && (
              <Badge variant="secondary" className="bg-background/20 backdrop-blur-sm text-primary-foreground border-0 shadow-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="w-12 h-12 bg-background/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-background/30 group-hover:scale-110 transition-transform duration-200">
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors duration-200">
            {project.description}
          </p>
        </div>

        {/* Tags Section - ✅ Handles cases where tags might be undefined */}
        {project.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{project.tags.length - 3} more
              </Badge>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground/60">No tags available</p>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200">
              <Star className="w-4 h-4" />
              <span className="font-medium">{project.stars?.toLocaleString() || "0"}</span> {/* ✅ Ensures stars exist */}
            </div>
            <div className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200">
              <GitBranch className="w-4 h-4" />
              <span className="font-medium">{project.forks || "0"}</span> {/* ✅ Ensures forks exist */}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
              aria-label="View on GitHub"
              onClick={handleGitClick}
            >
              <Github className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
              aria-label="View project"
              onClick= {handleWebsiteClick}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
