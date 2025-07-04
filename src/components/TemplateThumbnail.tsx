import type { Template } from '@/types/templates';
import svg1 from './1.svg';
import svg2 from './2.svg';
import svg3 from './3.svg';
import svg4 from './4.svg';
import svg5 from './5.svg';
import svg6 from './6.svg';
import soon from './soon.svg';

interface TemplateThumbnailProps {
  template: Template;
  className?: string;
}
const categoryIcons: Record<string, string> = {
  'open-source': svg1,
  'personal-projects': svg2,
  'corporate': svg3,
  'startup': svg4,
  'documentation': svg5,
  'portfolio': svg6,
  'academic': svg5,  
  'community': svg6, 
};

export function TemplateThumbnail({ template, className = "" }: TemplateThumbnailProps) {
  console.log('template.category:', JSON.stringify(template.category));

  const normalizedCategory = template.category.trim().toLowerCase();
  const iconPath = categoryIcons[normalizedCategory] || soon;

  if (!categoryIcons[normalizedCategory]) {
    console.warn(`Unknown template category: "${template.category}" - showing 'soon' placeholder.`);
  }

  return (
    <div className={`relative overflow-hidden border rounded-t-lg bg-white aspect-video ${className}`}>
      <img
        src={iconPath}
        alt={`${template.category} icon`}
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
