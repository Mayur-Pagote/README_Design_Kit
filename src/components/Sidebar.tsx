import { cn } from '@/lib/utils';
import { sidebarCategories } from "../data/sidebarCategories";
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categoryPaths: Record<string, string> = {
  home: '/',
  elements: '/elements',
  templates: '/templates',
  projects: '/projects',
  about: '/about',
  'readme-editor': '/readme-editor',
  'markdown-editor': '/markdown-editor',
  'ai-editor': '/ai-editor-intro',
  'typing-svg': '/typing-svg', 
};

const Sidebar = ({ selectedCategory, onCategorySelect }: SidebarProps) => { 
const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    const path = categoryPaths[categoryId] || '/';
    navigate(path);
  };
  
  return (
    <aside className="w-64 bg-card border-r border-border h-full">
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarCategories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
