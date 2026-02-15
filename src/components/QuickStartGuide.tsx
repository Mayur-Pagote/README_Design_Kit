import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileCode, Component, Info, Box, Text, GithubIcon } from 'lucide-react'; // Removed GitBranch
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

interface QuickStartGuideProps {
  onStartWithTemplate: () => void;
  onStartFromScratch: () => void;
}

export function QuickStartGuide({ onStartFromScratch }: QuickStartGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)} className="pt-3 text-sm text-muted-foreground">
        Need help getting started?
      </Button>
      
      <CommandDialog open={isOpen} onOpenChange={setIsOpen} className="min-w-[600px] min-h-[400px]">
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandGroup heading="Getting Started">
            <CommandItem onSelect={() => handleNavigation('/templates')}>
              <LayoutDashboard className="mr-3 h-5 w-5" />
              <span className="text-base">Browse Templates</span>
            </CommandItem>
            <CommandItem onSelect={onStartFromScratch}>
              <FileCode className="mr-3 h-5 w-5" />
              <span className="text-base">Start from Scratch</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Features">
            <CommandItem onSelect={() => handleNavigation('/drag-drop')}>
              <Box className="mr-3 h-5 w-5" />
              <span className="text-base">Drag and Drop Builder</span>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigation('/elements')}>
              <Component className="mr-3 h-5 w-5" />
              <span className="text-base">Components Library</span>
            </CommandItem>
            {/* Removed Projects CommandItem */}
          </CommandGroup>

          <CommandGroup heading="Help">
            <CommandItem onSelect={() => 
               window.open(
                  'https://github.com/Mayur-Pagote/README_Design_Kit/tree/main/docs','_blank'
                )}>
              <Text className="mr-3 h-5 w-5" />
              <span className="text-base">Documentation</span>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigation('/about')}>
              <GithubIcon className="mr-3 h-5 w-5" />
              <span className="text-base">Github</span>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigation('/about')}>
              <Info className="mr-3 h-5 w-5" />
              <span className="text-base">About Us</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
