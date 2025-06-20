import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import logg from './rdk.svg';
import {
  Menu,
  Home,
  Layers,
  MousePointer,
  Clock,
  Github,
  Star,
  Sparkles,
  Upload,
  Library
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GitHubStarsButton } from '@/components/CustomComps/buttons/github-stars';
import { ModeToggle } from '@/components/mode-toggle';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Templates', href: '/templates', icon: Library, badge: 'New' },
  { name: 'Elements', href: '/elements', icon: Layers },
  {
    name: 'Showcase',
    href: '/showcase',
    icon: Sparkles,
    submenu: [ // ✅ Nested navigation
      { name: 'Projects', href: '/projects', icon: Layers },
      { name: 'Submit Project', href: '/submit', icon: Upload },
    ]
  },
  { name: 'Drag & Drop Editor', href: '/drag-drop', icon: MousePointer, badge: 'Beta' },
  { name: 'Coming Soon', href: '/coming-soon', icon: Clock },
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const NavLink = ({ item, mobile = false }: { item: typeof navigation[0], mobile?: boolean }) => {
    const isActive = location.pathname === item.href;

    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-accent hover:text-accent-foreground",
          mobile && "w-full justify-start"
        )}
        onClick={() => mobile && setIsOpen(false)}
      >
        <item.icon className="h-4 w-4" />
        {item.name}
        {item.badge && (
          <Badge variant="secondary" className="ml-1 text-xs">
            {item.badge}
          </Badge>
        )}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logg}
                alt="README Design Ki"
                className="h-8 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <GitHubStarsButton username="Mayur-Pagote" repo="README_Design_Kit" />
            <Button size="sm" asChild>
              <Link to="/elements">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={logg}
                      alt="README Design Kitt"
                      className="h-8 object-contain ml-5 mt-3"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex flex-col gap-2 mb-6">
                  {navigation.map((item) => (
                    <div key={item.name} className="px-4"> {/* Add left and right padding */}
                      <NavLink item={item} mobile />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-border">
                  {/* Theme Label with horizontal spacing */}
                  <div className="flex items-center justify-between mb-2 px-4">
                    <span className="text-sm font-medium">Theme</span>
                    <ModeToggle />
                  </div>

                  {/* Buttons with horizontal spacing */}
                  <div className="px-4">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a
                        href="https://github.com/Mayur-Pagote/README_Design_Kit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                  </div>

                  <div className="px-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Star className="h-4 w-4 mr-2" />
                      Star Project
                    </Button>
                  </div>

                  <div className="px-4">
                    <Button className="w-full" asChild>
                      <Link to="/elements">Get Started</Link>
                    </Button>
                  </div>
                </div>

              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
