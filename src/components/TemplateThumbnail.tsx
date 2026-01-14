import type { Template } from '@/types/templates';
import soon from './soon.svg';

interface TemplateThumbnailProps {
  template: Template;
  className?: string;
}

export function TemplateThumbnail({ template, className = "" }: TemplateThumbnailProps) {
  const iconPath = template.thumbnail || soon;

  return (
    <div className={`relative overflow-hidden border rounded-t-lg bg-white aspect-video ${className}`}>
      <img
        src={iconPath}
        alt={`${template.name} thumbnail`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {template.featured && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full border border-white/30"></div>
        </div>
      )}
    </div>
  );
}
