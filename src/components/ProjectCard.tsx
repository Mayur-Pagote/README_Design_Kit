import React from 'react';
import { Star, GitBranch, Sparkles, ExternalLink, Github } from 'lucide-react';

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
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const Icon = project.icon || Sparkles; // ✅ Use a fallback icon if `undefined`

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200">
      {/* Gradient Header */}
      <div className={`h-32 bg-gradient-to-r ${project.gradient || 'from-gray-400 to-gray-600'} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4">
          {project.featured && (
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-medium text-white">Featured</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags Section - ✅ Handles cases where tags might be undefined */}
        {project.tags?.length ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No tags available</p>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{project.stars?.toLocaleString() || "0"}</span> {/* ✅ Ensures stars exist */}
            </div>
            <div className="flex items-center space-x-1">
              <GitBranch className="w-4 h-4" />
              <span>{project.forks || "0"}</span> {/* ✅ Ensures forks exist */}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Github className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
