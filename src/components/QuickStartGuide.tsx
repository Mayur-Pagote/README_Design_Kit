import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Library, FileText, Save, Star } from 'lucide-react';

interface QuickStartGuideProps {
  onStartWithTemplate: () => void;
  onStartFromScratch: () => void;
}

export function QuickStartGuide({ onStartWithTemplate, onStartFromScratch }: QuickStartGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: Library,
      title: 'Browse Templates',
      description: 'Choose from our curated collection of professional README templates',
      action: 'Start with Template',
      onClick: onStartWithTemplate,
      variant: 'default' as const,
    },
    {
      icon: FileText,
      title: 'Start from Scratch',
      description: 'Begin with a blank canvas and build your README from the ground up',
      action: 'Blank Editor',
      onClick: onStartFromScratch,
      variant: 'outline' as const,
    },
  ];

  const tips = [
    {
      icon: Star,
      text: 'Templates are fully customizable - use them as starting points',
    },
    {
      icon: Save,
      text: 'Save your work as custom templates for future projects',
    },
    {
      icon: Sparkles,
      text: 'All templates are mobile-responsive and modern',
    },
  ];

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)} className="text-sm text-muted-foreground">
        Need help getting started?
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Welcome to README Design Kit
            </DialogTitle>
            <DialogDescription>
              Create beautiful, professional README files in minutes. Choose your starting point:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Quick Start Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant={feature.variant} 
                        onClick={() => {
                          feature.onClick();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-2"
                      >
                        {feature.action}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Tips */}
            <div className="border-t pt-6">
              <h4 className="font-medium mb-3">💡 Quick Tips</h4>
              <div className="space-y-2">
                {tips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{tip.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sample Template Categories */}
            <div className="border-t pt-6">
              <h4 className="font-medium mb-3">📚 Template Categories Available</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Personal Projects',
                  'Open Source',
                  'Corporate',
                  'Startup',
                  'Academic',
                  'Community'
                ].map(category => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                You can always switch between templates and customize everything later
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
