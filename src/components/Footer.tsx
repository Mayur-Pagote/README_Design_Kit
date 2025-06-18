import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import logg from './rdk.svg';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  Home,
  Layers,
  MousePointer,
  Clock,
  ExternalLink,
  Shield,
  FileText,
  Star,
  Users,
  Code,
  Sparkles,
  ArrowUpRight,
  Coffee
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const navigation = {
    main: [
      { name: 'Home', href: '/', icon: Home, description: 'Back to homepage' },
      { name: 'Elements', href: '/elements', icon: Layers, description: 'Browse components' },
      { name: 'Project Showcase', href: '/showcase', icon: Sparkles, description: 'Featured projects' },
      { name: 'Drag & Drop Editor', href: '/drag-drop', icon: MousePointer, description: 'Visual editor', badge: 'Beta' },
      { name: 'Coming Soon', href: '/coming-soon', icon: Clock, description: 'Upcoming features' },
    ],
    resources: [
      { name: 'Documentation', href: '#', external: true, description: 'Complete guides' },
      { name: 'Tutorials', href: '#', external: true, description: 'Step-by-step tutorials' },
      { name: 'Templates', href: '#', external: true, description: 'Ready-to-use templates' },
      { name: 'API Reference', href: '#', external: true, description: 'Developer resources' },
    ],
    community: [
      { name: 'GitHub Discussions', href: 'https://github.com/Mayur-Pagote/README_Design_Kit/discussions', external: true, icon: Github },
      { name: 'Discord Server', href: 'https://discord.gg/wnF5jG7U', external: true, icon: Users },
      { name: 'Feature Requests', href: 'https://github.com/Mayur-Pagote/README_Design_Kit/issues', external: true, icon: Sparkles },
      { name: 'Bug Reports', href: 'https://github.com/Mayur-Pagote/README_Design_Kit/issues', external: true, icon: Code },
    ],
    company: [
      { name: 'About', href: '#', description: 'Our story' },
      { name: 'Blog', href: '#', external: true, description: 'Latest updates' },
      { name: 'Careers', href: '#', description: 'Join our team' },
      { name: 'Contact', href: '#', description: 'Get in touch' },
    ],
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      href: 'https://github.com/Mayur-Pagote/README_Design_Kit',
      color: 'hover:bg-gray-900 hover:text-white',
      description: 'Star us on GitHub'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: '#',
      color: 'hover:bg-blue-500 hover:text-white',
      description: 'Follow us on Twitter'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: '#',
      color: 'hover:bg-blue-600 hover:text-white',
      description: 'Connect on LinkedIn'
    },
    { 
      name: 'Email', 
      icon: Mail, 
      href: 'mailto:contact@readmedesignkit.com',
      color: 'hover:bg-red-500 hover:text-white',
      description: 'Send us an email'
    },
  ];

  const handleLegalLinkClick = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  const legalLinks = [
    {
      name: 'Privacy Policy',
      href: '/privacy',
      icon: Shield,
      description: 'Learn about our data collection and privacy practices'
    },
    {
      name: 'Terms of Service',
      href: '/terms',
      icon: FileText,
      description: 'Read our terms of service and usage guidelines'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-muted/20 border-t border-border/50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-50" />
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      <div className="container mx-auto px-6 py-16 relative">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Link 
                to="/" 
                className="flex items-center gap-3 mb-6 transition-all duration-300"
                aria-label="README Design Kit Home"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img 
                    src={logg}
                    alt="README Design Kit Logo" 
                    className="h-10 object-contain filter dark:invert-0 invert transition-all duration-300"
                  />
                  <motion.div
                    className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col"
                >
                 
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground mb-8 max-w-md leading-relaxed"
            >
              Create stunning README files with our comprehensive design toolkit. 
              Beautiful components, drag-and-drop editor, and endless possibilities for your documentation.
            </motion.p>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex gap-3"
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  className="relative"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-11 w-11 p-0 transition-all duration-300 relative overflow-hidden group",
                      "hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      social.color
                    )}
                    asChild
                  >
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.description}
                    >
                      <social.icon className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </a>
                  </Button>
                  <AnimatePresence>
                    {hoveredSocial === social.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover border rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg z-50"
                      >
                        {social.description}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-foreground mb-6 text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Navigation
            </h3>
            <ul className="space-y-4">
              {navigation.main.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-3 text-sm group relative",
                      "hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 rounded-lg p-2 -m-2",
                      location.pathname === item.href && "text-foreground font-medium bg-gradient-to-r from-primary/10 to-accent/10"
                    )}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary"
                    >
                      <item.icon className="h-4 w-4" />
                    </motion.div>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                        {item.badge}
                      </Badge>
                    )}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-foreground mb-6 text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-4">
              {navigation.resources.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-3 text-sm group hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 rounded-lg p-2 -m-2"
                  >
                    <span className="flex-1">{item.name}</span>
                    {item.external && <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-foreground mb-6 text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Community
            </h3>
            <ul className="space-y-4">
              {navigation.community.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-3 text-sm group hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 rounded-lg p-2 -m-2"
                  >
                    {item.icon && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-primary"
                      >
                        <item.icon className="h-4 w-4" />
                      </motion.div>
                    )}
                    <span className="flex-1">{item.name}</span>
                    {item.external && <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Separator className="my-12 bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <motion.p
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2"
            >
              &copy; 2025 README Design Kit. All rights reserved.
            </motion.p>
            <span className="hidden md:block text-border">•</span>
            <div className="flex items-center gap-4">
              {legalLinks.map((link, index) => (
                <motion.div key={link.name} className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLegalLinkClick(link.href)}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-all duration-300",
                      "hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 rounded-lg px-2 py-1",
                      "flex items-center gap-2 group",
                      location.pathname === link.href && "text-foreground font-medium"
                    )}
                    aria-label={link.description}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary"
                    >
                      <link.icon className="h-4 w-4" />
                    </motion.div>
                    {link.name}
                  </motion.button>
                  {index < legalLinks.length - 1 && (
                    <span className="text-border">•</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm text-muted-foreground group"
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </motion.div>
            <span>and</span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Coffee className="h-4 w-4 text-amber-600" />
            </motion.div>
            <span>for developers</span>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/30 hover:border-primary/30 transition-all duration-300"
            >
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                </motion.div>
                Contributing to SSOC 2025
              </h4>
              <p className="leading-relaxed">
                This project is part of Social Summer of Code 2025. 
                We welcome contributions from the community to make README creation easier for everyone.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 border border-border/30 hover:border-accent/30 transition-all duration-300"
            >
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Code className="h-5 w-5 text-accent" />
                </motion.div>
                Open Source
              </h4>
              <p className="leading-relaxed">
                README Design Kit is open source and available on GitHub. 
                Feel free to star the repository, report issues, or contribute new features.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}