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
      {template.thumbnail && (
        <video autoPlay loop muted playsInline className='w-full h-full object-fill'>
          <source src={iconPath} type="video/mp4" />
        </video>
      )}

      {!template.thumbnail && (
        <img src={iconPath} alt={template.name} className='w-full h-full object-cover' />
      )}
    </div>
  );
}
