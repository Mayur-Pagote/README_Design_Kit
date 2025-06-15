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
  ExternalLink,
  Shield,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = {
    main: [
      { name: 'Home', href: '/', icon: Home },
      { name: 'Elements', href: '/elements', icon: Layers },
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
      { name: 'GitHub Discussions', href: '#', external: true },
      { name: 'Discord Server', href: '#', external: true },
      { name: 'Feature Requests', href: '#', external: true },
      { name: 'Bug Reports', href: '#', external: true },
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
        <div className="mt-8 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Contributing to SSOC 2025</h4>
              <p>
                This project is part of Social Summer of Code 2025. 
                We welcome contributions from the community to make README creation easier for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Open Source</h4>
              <p>
                README Design Kit is open source and available on GitHub. 
                Feel free to star the repository, report issues, or contribute new features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
