
import { cn } from '@/lib/utils';

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: 'graphs', name: 'Graphs', icon: '📊' },
  { id: 'cards', name: 'Cards', icon: '🎴' },
  { id: 'counter', name: 'Counter', icon: '🔢' },
  { id: 'animation', name: 'Animation', icon: '✨' },
  { id: 'emojis', name: 'Emojis', icon: '😊' },
  { id: 'quotes', name: 'Quotes', icon: '💭' },
  { id: 'languages', name: 'Languages', icon: '🌐' },
  { id: 'repos', name: 'Repositories', icon: '📁' },
  { id: 'dividers', name: 'Dividers', icon: '➖' },
];

const Sidebar = ({ selectedCategory, onCategorySelect }: SidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border h-full">
      <div className="p-4">
        <nav className="space-y-2">
          {categories.map((category) => (
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
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
