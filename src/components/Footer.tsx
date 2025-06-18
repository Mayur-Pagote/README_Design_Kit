import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const NAV_SECTIONS = {
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
  };

  const LEGAL_LINKS = [
    { name: 'Privacy Policy', href: '/privacy', icon: Shield },
    { name: 'Terms of Service', href: '/terms', icon: FileText },
  ];

  const SOCIAL_LINKS = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Mayur-Pagote/README_Design_Kit' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@readmedesignkit.com' },
  ];

  const handleNavigate = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 hover:scale-105 transition-transform" aria-label="README Design Kit Home">
              <img src={logg} alt="README Design Kit Logo" className="h-8 object-contain" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Create stunning README files with our comprehensive design toolkit. 
              Beautiful components, drag-and-drop editor, and endless possibilities for your documentation.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ name, icon: Icon, href }) => (
                <Button
                  key={name}
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 transition hover:scale-110 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  asChild
                >
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3">
              {NAV_SECTIONS.main.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link
                    to={href}
                    className={cn(
                      'text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors',
                      'hover:underline',
                      location.pathname === href && 'text-foreground font-medium'
                    )}
                    aria-current={location.pathname === href ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {NAV_SECTIONS.resources.map(({ name, href, external }) => (
                <li key={name}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm hover:underline transition-colors"
                  >
                    {name}
                    {external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-3">
              {NAV_SECTIONS.community.map(({ name, href, external }) => (
                <li key={name}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm hover:underline transition-colors"
                  >
                    {name}
                    {external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span>&copy; 2025 README Design Kit. All rights reserved.</span>
            <span className="text-border">•</span>
            {LEGAL_LINKS.map(({ name, href, icon: Icon }, idx) => (
              <div key={name} className="flex items-center">
                <button
                  onClick={() => handleNavigate(href)}
                  className={cn(
                    'text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition hover:underline group',
                    location.pathname === href && 'text-foreground font-medium'
                  )}
                  aria-label={name}
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  {name}
                </button>
                {idx < LEGAL_LINKS.length - 1 && <span className="text-border ml-4">•</span>}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span>for developers</span>
          </div>
        </div>

        {/* Extra Info */}
        <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
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
    </footer>
  );
}
