import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TemplateThumbnail } from './TemplateThumbnail';
import { templateCategories } from '@/data/templates';
import type { Template } from '@/types/templates';


interface TemplateListItemProps {
  template: Template;
  isFavorite: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onToggleFavorite: () => void;
}

export const TemplateListItem = ({ template, isFavorite, onSelect, onToggleFavorite }: TemplateListItemProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {" "}
        <div className="flex items-center gap-4">
          <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <TemplateThumbnail template={template} className="w-full h-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {template.description}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {
                      templateCategories.find(
                        (c) => c.value === template.category,
                      )?.label
                    }
                  </Badge>
                  {template.featured && (
                    <Badge variant="default" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {template.popularity}% popularity
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onToggleFavorite}>
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
                <Button size="sm" onClick={onSelect}>
                  Use Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
