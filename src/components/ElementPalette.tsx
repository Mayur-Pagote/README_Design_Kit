import { elementConfigs } from '@/config/elements';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { ElementType } from '@/types/elements';

interface ElementPaletteProps {
  onAddElement: (element: ElementType) => void;
}

export function ElementPalette({ onAddElement }: ElementPaletteProps) {
  const handleAddElement = (config: typeof elementConfigs[0]) => {
    const newElement: ElementType = {
      ...config.defaultProps,
      id: `${config.type}-${Date.now()}`,
    } as ElementType;
    
    onAddElement(newElement);
  };

  return (
    <div className="w-80 h-full border-r border-border bg-background overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Elements</h2>
        <p className="text-sm text-muted-foreground">
          Click to add elements to your README and drag to adjust location
        </p>
      </div>
      
      <div className="p-4 space-y-3">
        {elementConfigs.map((config) => (
          <Card 
            key={config.type} 
            className="cursor-pointer hover:shadow-md transition-shadow group gap-4 py-2"
          >
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{config.icon}</span>
                  <CardTitle className="text-md">{config.name}</CardTitle>
                </div>
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleAddElement(config)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-xs">
                {config.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
