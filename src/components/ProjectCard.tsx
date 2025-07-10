import React, { useState } from 'react';
import { Star, GitBranch, Sparkles, ExternalLink, Github, Globe, Heart, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from './ui/textarea';


interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string;
    tags?: string[]; // ✅ Make `tags` optional
    stars?: number;
    forks?: number;
    icon?: React.ComponentType<{ className?: string }>; // ✅ Ensure `icon` is optional
    featured?: boolean;
    githubUrl?: string;
    websiteUrl?: string;
    imageUrl?: string;
    features?: string[];
    author?: string;
    lastUpdated?: string;
    authorSocial?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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

  const handleSocialClick = () => {
    if(project.authorSocial) {
      window.open(project.authorSocial, "_blank", "noopener noreferrer");
    } else {
      alert("Socials not available");
    }
  }

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      setFeedbackSubmitted(true);
      setFeedback('');
      setFeedbackType(null);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFeedbackSubmitted(false);
        setShowFeedback(false);
      }, 3000);
    }
  }
  return (
    <Card className="group p-0 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden hover:bg-card/80">
      {/* Gradient Header */}
      <CardHeader className="p-0 overflow-hidden rounded-t-xl">
        <div className="relative h-32 overflow-hidden flex">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={project.title} className="max-h-full max-w-full object-contain justify-center items-center"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-r from-purple-600 to-blue-600`}>
              <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-background/20"></div>
            </div>
          )}

          <div className="absolute top-4 right-4">
            {project.featured && (
              <Badge variant="secondary" className="bg-background/20 backdrop-blur-sm text-foreground transition-colors border-0 shadow-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <hr></hr>
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
            <span className="font-medium">{project.stars?.toLocaleString() || "0"}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200">
            <GitBranch className="w-4 h-4" />
            <span className="font-medium">{project.forks || "0"}</span>
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
            onClick={handleWebsiteClick}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>

          {/* More Info Button with Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className='text-muted-foreground'
                aria-label="More info"
              >
                More Info
              </Button>
            </DialogTrigger>
            <DialogContent className="template-scroll max-w-4xl max-h-[80vh] overflow-auto">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-5">
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  {project.featured && (
                    <Badge variant="default" className="text-xs ml-1 mt-1 pointer-events-none">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <h3>About this Project</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              <hr></hr>
              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Key Features</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-muted-foreground">
                        <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-primary/5 text-primary border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
              {/* External Links */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Links</h4>
                <div className="flex flex-wrap gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleGitClick}>
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </Button>
                  )}
                  {project.websiteUrl && (
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleWebsiteClick}>
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
                  )}
                  {project.authorSocial && (
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleSocialClick}>
                      <Globe className="w-4 h-4" />
                      Author's Social 
                    </Button>
                  )}
                </div>
              </div>
              {/* Project Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                {project.author && (
                  <div>
                    <span className="font-medium">Author:</span> {project.author}
                  </div>
                )}
                {project.lastUpdated && (
                  <div>
                    <span className="font-medium">Last Updated:</span> {project.lastUpdated}
                  </div>
                )}
              </div>
              <hr></hr>
              {/* Feedback Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Feedback</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFeedback(!showFeedback)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showFeedback ? 'Hide' : 'Add Feedback'}
                  </Button>
                </div>

                {showFeedback && (
                  <div className="space-y-4 animate-in slide-in-from-top-5 duration-300">
                    {feedbackSubmitted ? (
                      <div className="text-center py-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Heart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-green-700 dark:text-green-300 font-medium">Thank you for your feedback!</p>
                      </div>
                    ) : (
                      <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Feedback Type</label>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant={feedbackType === 'positive' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setFeedbackType('positive')}
                              className="gap-2"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              Positive
                            </Button>
                            <Button
                              type="button"
                              variant={feedbackType === 'negative' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setFeedbackType('negative')}
                              className="gap-2"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              Negative
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Your Feedback (Anonymous)</label>
                          <Textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Share your thoughts about this project..."
                            className="min-h-[100px]"
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full gap-2"
                          disabled={!feedback.trim()}
                        >
                          Submit Feedback
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
