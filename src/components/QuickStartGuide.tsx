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
      
      <CommandDialog open={isOpen} onOpenChange={setIsOpen} className="w-[75%] max-w-2xl rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        <CommandInput placeholder="Search commands..." className="h-12 text-base px-4 border-b border-border/50 bg-transparent focus:outline-none focus:ring-0" />

        <CommandList className="max-h-[420px] overflow-y-auto">

          <CommandGroup heading="Getting Started" className="px-3 pt-5 pb-2 text-xs uppercase tracking-wider text-muted-foreground">

            <CommandItem onSelect={() => handleNavigation('/templates')} className="group flex items-center rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-primary/10 data-[selected=true]:bg-primary/10">
              <LayoutDashboard className="mr-3 h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary" />
              <span className="text-base text-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary">Browse Templates</span>
            </CommandItem>

            <CommandItem onSelect={onStartFromScratch} className="group flex items-center rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-primary/10 data-[selected=true]:bg-primary/10">
              <FileCode className="mr-3 h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary" />
              <span className="text-base text-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary">Start from Scratch</span>
            </CommandItem>

          </CommandGroup>


          <CommandGroup heading="Features" className="px-3 pt-6 pb-2 text-xs uppercase tracking-wider text-muted-foreground">

            <CommandItem onSelect={() => handleNavigation('/drag-drop')} className="group flex items-center rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-primary/10 data-[selected=true]:bg-primary/10">
              <Box className="mr-3 h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary" />
              <span className="text-base text-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary">Drag and Drop Builder</span>
            </CommandItem>

            <CommandItem onSelect={() => handleNavigation('/elements')} className="group flex items-center rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-primary/10 data-[selected=true]:bg-primary/10">
              <Component className="mr-3 h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary" />
              <span className="text-base text-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary">Components Library</span>
            </CommandItem>

          </CommandGroup>


          <CommandGroup heading="Help" className="px-3 pt-6 pb-2 text-xs uppercase tracking-wider text-muted-foreground">

            <CommandItem onSelect={() => window.open('https://github.com/Mayur-Pagote/README_Design_Kit/tree/main/docs','_blank')} className="group flex items-center rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-primary/10 data-[selected=true]:bg-primary/10">
              <Text className="mr-3 h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary" />
              <span className="text-base text-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary">Documentation</span>
            </CommandItem>

            <CommandItem onSelect={() => window.open('https://github.com/Mayur-Pagote/README_Design_Kit','_blank')} className="group flex items-center rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-primary/10 data-[selected=true]:bg-primary/10">
              <GithubIcon className="mr-3 h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary" />
              <span className="text-base text-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary">Github</span>
            </CommandItem>

            <CommandItem onSelect={() => handleNavigation('/about')} className="group flex items-center rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-primary/10 data-[selected=true]:bg-primary/10">
              <Info className="mr-3 h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary" />
              <span className="text-base text-foreground transition-colors duration-200 group-hover:text-primary group-data-[selected=true]:text-primary">About Us</span>
            </CommandItem>

          </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  );
}
