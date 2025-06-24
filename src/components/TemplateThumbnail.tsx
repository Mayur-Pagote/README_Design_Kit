import type { Template } from '@/types/templates';

interface TemplateThumbnailProps {
  template: Template;
  className?: string;
}

export function TemplateThumbnail({ template, className = "" }: TemplateThumbnailProps) {
  const getGradientForCategory = (category: string) => {
    switch (category) {
      case 'personal-projects':
        return 'from-blue-400 to-purple-600';
      case 'open-source':
        return 'from-green-400 to-blue-600';
      case 'corporate':
        return 'from-gray-600 to-blue-800';
      case 'documentation':
        return 'from-indigo-400 to-purple-600';
      case 'portfolio':
        return 'from-pink-400 to-red-600';
      case 'startup':
        return 'from-orange-400 to-red-600';
      case 'academic':
        return 'from-blue-600 to-indigo-800';
      case 'community':
        return 'from-purple-400 to-pink-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const gradient = getGradientForCategory(template.category);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <div className="absolute inset-0 bg-black/5">
        <div className="p-3 h-full flex flex-col justify-between text-white">
          <div className="space-y-1">
            <div className="h-2 bg-white/80 rounded w-3/4"></div>
            <div className="h-1.5 bg-white/60 rounded w-1/2"></div>
          </div>
          
          <div className="space-y-1">
            <div className="flex gap-1">
              <div className="h-1 bg-white/60 rounded flex-1"></div>
              <div className="h-1 bg-white/60 rounded flex-1"></div>
              <div className="h-1 bg-white/40 rounded flex-1"></div>
            </div>
            <div className="flex gap-1">
              <div className="h-1 bg-white/40 rounded w-8"></div>
              <div className="h-1 bg-white/40 rounded w-6"></div>
            </div>
          </div>
          
          <div className="space-y-0.5">
            <div className="h-1 bg-white/60 rounded w-full"></div>
            <div className="h-1 bg-white/60 rounded w-4/5"></div>
            <div className="h-1 bg-white/40 rounded w-2/3"></div>
          </div>
        </div>
      </div>
      
      {template.featured && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full border border-white/30"></div>
        </div>
      )}
    </div>
  );
}
