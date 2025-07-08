import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import logg from './rdk.svg';
import loggd from './rdkd.svg';
import {
  Menu,
  Home,
  Layers,
  Sparkles,
  Upload,
  Library,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GitHubStarsButton } from '@/components/CustomComps/buttons/github-stars';
import { ModeToggle } from '@/components/mode-toggle';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  submenu?: NavItem[];
};

const navigation: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Elements', href: '/elements', icon: Layers },
  { name: 'AI Editor', href: '/readme-editor', icon: Bot, badge: 'New' },
  {
    name: 'More',
    href: '#',
    icon: Sparkles,
    submenu: [
      { name: 'Templates', href: '/templates', icon: Library, badge: 'New' },
      { name: 'Showcase', href: '/showcase', icon: Sparkles },
      { name: 'Others', href: '/others', icon: Upload }
    ]
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const location = useLocation();

  const NavLink = ({
    item,
    mobile = false
  }: {
    item: NavItem;
    mobile?: boolean;
  }) => {
    const isActive = location.pathname === item.href;

    if (item.submenu && !mobile) {
      return (
        <div className="relative">
          <button
            onClick={() => setShowSubMenu(!showSubMenu)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              'text-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </button>
          {showSubMenu && (
            <div className="absolute top-full mt-2 bg-background border border-border rounded-md shadow-md z-50 min-w-[180px]">
              {item.submenu.map((sub: NavItem) => (
                <Link
                  key={sub.name}
                  to={sub.href}
                  onClick={() => setShowSubMenu(false)}
                  className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  {sub.name}
                  {sub.badge && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {sub.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-accent hover:text-accent-foreground',
          mobile && 'w-full justify-start'
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
                  src={loggd}
                  alt="Logo Light"
                  className="h-8 object-contain block dark:hidden"
                />
                <img
                  src={logg}
                  alt="Logo Dark"
                  className="h-8 object-contain hidden dark:block"
                />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <GitHubStarsButton
              username="Mayur-Pagote"
              repo="README_Design_Kit"
            />
            <Button size="sm" asChild>
              <Link to="/elements">Get Started</Link>
            </Button> 
          </div>

          {/* Mobile Menu */}
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
                      src={loggd}
                      alt="Light Logo"
                      className="h-8 object-contain block dark:hidden"
                    />
                    <img
                      src={logg}
                      alt="Dark Logo"
                      className="h-8 object-contain hidden dark:block"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex flex-col gap-2 mb-6">
                  {navigation.map((item) =>
                    item.submenu ? (
                      item.submenu.map((subItem: NavItem) => (
                        <div key={subItem.name} className="px-4">
                          <NavLink item={subItem} mobile />
                        </div>
                      ))
                    ) : (
                      <div key={item.name} className="px-4">
                        <NavLink item={item} mobile />
                      </div>
                    )
                  )}
                </div>

                {/* Mobile Footer */}
                <div className="flex flex-col gap-3 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-2 px-4">
                    <span className="text-sm font-medium">Theme</span>
                    <ModeToggle />
                  </div>
                  <div className="px-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href="https://github.com/Mayur-Pagote/README_Design_Kit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                  <div className="px-4">
                    {/* <Button className="w-full" asChild>
                      <Link to="/elements">Get Started</Link>
                    </Button> */}
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
