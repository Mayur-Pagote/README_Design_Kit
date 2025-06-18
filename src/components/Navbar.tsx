import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import logg from './rdk.svg';
import {
  Menu, Home, Layers, MousePointer, Clock, Github, Star, Sparkles, Upload, ChevronDown, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GitHubStarsButton } from '@/components/CustomComps/buttons/github-stars';
import { ModeToggle } from '@/components/mode-toggle';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Elements', href: '/elements', icon: Layers },
  {
    name: 'Showcase',
    href: '/showcase',
    icon: Sparkles,
    submenu: [
      { name: 'Projects', href: '/projects', icon: Layers },
      { name: 'Submit Project', href: '/submit', icon: Upload },
    ]
  },
  { name: 'Drag & Drop Editor', href: '/drag-drop', icon: MousePointer, badge: 'Beta' },
  { name: 'Coming Soon', href: '/coming-soon', icon: Clock },
];

const NavLink = ({ item, mobile = false }: { item: typeof navigation[0], mobile?: boolean }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.href);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Link
        to={item.href}
        className={cn(
          'relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group',
          isActive
            ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25'
            : 'text-muted-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-accent-foreground hover:shadow-md',
          mobile && 'w-full justify-start'
        )}
        onClick={() => mobile && window.scrollTo(0, 0)}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <item.icon className="h-4 w-4" />
        </motion.div>
        <span className="relative">
          {item.name}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </span>
        {item.badge && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <Badge variant="secondary" className="ml-2 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-sm">
              {item.badge}
            </Badge>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm opacity-50"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
        {!mobile && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            initial={false}
          />
        )}
      </Link>
    </motion.div>
  );
};

const NavLinkGroup = ({ item }: { item: typeof navigation[0] }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:text-accent-foreground transition-all duration-300 group relative"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <item.icon className="h-4 w-4" />
          </motion.div>
          {item.name}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-3 w-3" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            initial={false}
          />
        </motion.button>
      </PopoverTrigger>
      <AnimatePresence>
        {isOpen && (
          <PopoverContent sideOffset={8} align="start" asChild>
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-48 p-2 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 rounded-2xl" />
              <div className="relative space-y-1">
                {item.submenu?.map((sub, index) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={sub.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 group',
                        location.pathname.startsWith(sub.href)
                          ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md'
                          : 'hover:bg-gradient-to-r hover:from-muted/50 hover:to-accent/20 hover:shadow-sm'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-primary"
                      >
                        <sub.icon className="h-4 w-4" />
                      </motion.div>
                      {sub.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </PopoverContent>
        )}
      </AnimatePresence>
    </Popover>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
          : "bg-background/95 backdrop-blur-md border-b border-border/30"
      )}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img 
                  src={logg} 
                  alt="Logo" 
                  className="h-8 object-contain filter dark:invert-0 invert transition-all duration-300" 
                />
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <motion.span 
                className="font-bold text-lg bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hidden sm:block"
                whileHover={{ scale: 1.05 }}
              >
              
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.submenu ? (
                  <NavLinkGroup item={item} />
                ) : (
                  <NavLink item={item} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ModeToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <GitHubStarsButton username="Mayur-Pagote" repo="README_Design_Kit" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <Link to="/elements" className="relative overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="sm" className="px-2 relative group">
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-l border-border/50">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full"
                >
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border/30">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={logg} 
                        alt="Logo" 
                        className="h-8 object-contain filter dark:invert-0 invert transition-all duration-300" 
                      />
                    </motion.div>
                    <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col gap-2 mb-6">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.submenu ? (
                          <div className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold px-4 pt-2 text-muted-foreground">
                              {item.name}
                            </span>
                            {item.submenu.map((sub, subIndex) => (
                              <motion.div
                                key={sub.name}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index * 0.1) + (subIndex * 0.05) }}
                              >
                                <NavLink item={sub} mobile />
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <NavLink item={item} mobile />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-4 pt-6 border-t border-border/30 absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Theme</span>
                      <ModeToggle />
                    </div>
                    <Button variant="outline" className="w-full justify-start hover:bg-gradient-to-r hover:from-accent/20 hover:to-primary/10 transition-all duration-300" asChild>
                      <a
                        href="https://github.com/Mayur-Pagote/README_Design_Kit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <Github className="h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-orange-500/10 transition-all duration-300">
                      <Star className="h-4 w-4 mr-3" />
                      Star Project
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                      <Link to="/elements">Get Started</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}