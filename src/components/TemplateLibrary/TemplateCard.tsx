import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TemplateThumbnail } from "./TemplateThumbnail";
import { templateCategories } from "@/data/templates";
import type { Template } from '@/types/templates';

interface TemplateCardProps {
  template: Template;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}

export const TemplateCard = ({ template, isFavorite, onSelect, onToggleFavorite }: TemplateCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer pt-0 flex flex-col h-full">
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <TemplateThumbnail
          template={template}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">
              {template.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {template.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {
                templateCategories.find((c) => c.value === template.category)
                  ?.label
              }
            </Badge>
            {template.featured && (
              <Badge variant="default" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button size="lg" onClick={onSelect} className="flex-1">
            Use Template
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
