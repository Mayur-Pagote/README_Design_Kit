import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  Code,
  Sparkles,
  ExternalLink,
  Shield,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = {
    main: [
      { name: 'Home', href: '/', icon: Home },
      { name: 'Elements', href: '/elements', icon: Layers },
      { name: 'Project Showcase', href: '/showcase', icon: Layers },
      { name: 'Drag & Drop Editor', href: '/drag-drop', icon: MousePointer },
      { name: 'Coming Soon', href: '/coming-soon', icon: Clock },
    ],
    resources: [
      { name: 'Documentation', href: '#', external: true },
      { name: 'Tutorials', href: '#', external: true },
      { name: 'Templates', href: '#', external: true },
      { name: 'API Reference', href: '#', external: true },
    ],
    community: [
      { name: 'GitHub Discussions', href: 'https://github.com/Mayur-Pagote/README_Design_Kit/discussions', external: true },
      { name: 'Discord Server', href: 'https://discord.gg/wnF5jG7U', external: true },
      { name: 'Feature Requests', href: 'https://github.com/Mayur-Pagote/README_Design_Kit/issues', external: true },
      { name: 'Bug Reports', href: 'https://github.com/Mayur-Pagote/README_Design_Kit/issues', external: true },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#', external: true },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Mayur-Pagote/README_Design_Kit' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@readmedesignkit.com' },
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
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link 
              to="/" 
              className="flex items-center gap-3 mb-4 transition-transform hover:scale-105"
              aria-label="README Design Kit Home"
            >
              <img 
                src={logg}
                alt="README Design Kit Logo" 
                className="h-8 object-contain"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Create stunning README files with our comprehensive design toolkit. 
              Beautiful components, drag-and-drop editor, and endless possibilities for your documentation.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 transition-all hover:scale-110 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  asChild
                >
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm",
                      "hover:underline",
                      location.pathname === item.href && "text-foreground font-medium"
                    )}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm hover:underline"
                  >
                    {item.name}
                    {item.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-3">
              {navigation.community.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm hover:underline"
                  >
                    {item.name}
                    {item.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 README Design Kit. All rights reserved.</p>
            <span className="text-border">•</span>
            {legalLinks.map((link, index) => (
              <div key={link.name} className="flex items-center">
                <button
                  onClick={() => handleLegalLinkClick(link.href)}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-all",
                    "hover:underline",
                    "flex items-center gap-1.5 group",
                    location.pathname === link.href && "text-foreground font-medium"
                  )}
                  aria-label={link.description}
                >
                  <link.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  {link.name}
                </button>
                {index < legalLinks.length - 1 && (
                  <span className="text-border ml-4">•</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span>for developers</span>
          </div>
        </div>

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
