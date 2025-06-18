import React, { useState } from 'react';
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
  Users,
  Code,
  Sparkles,
  ArrowUpRight,
  Coffee
} from 'lucide-react';

export default function Footer() {
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
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-50" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
      
      <div className="container mx-auto px-6 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="group">
              <a 
                href="/" 
                className="flex items-center gap-3 mb-6 transition-all duration-300 hover:scale-105"
                aria-label="README Design Kit Home"
              >
                <div className="relative">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    README Design Kit
                  </span>
                  
                </div>
              </a>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
              Create stunning README files with our comprehensive design toolkit. 
              Beautiful components, drag-and-drop editor, and endless possibilities for your documentation.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <div
                  key={social.name}
                  className="relative"
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <button
                    className={`h-11 w-11 p-0 transition-all duration-300 relative overflow-hidden group rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${social.color}`}
                  >
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.description}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <social.icon className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  </button>
                  {hoveredSocial === social.name && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg z-50">
                      {social.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Navigation
            </h3>
            <ul className="space-y-4">
              {navigation.main.map((item, index) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3 text-sm group relative hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 rounded-lg p-2 -m-2"
                  >
                    <div className="text-blue-600 dark:text-blue-400">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-4">
              {navigation.resources.map((item, index) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3 text-sm group hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 rounded-lg p-2 -m-2"
                  >
                    <span className="flex-1">{item.name}</span>
                    {item.external && <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Community
            </h3>
            <ul className="space-y-4">
              {navigation.community.map((item, index) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3 text-sm group hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 rounded-lg p-2 -m-2"
                  >
                    {item.icon && (
                      <div className="text-blue-600 dark:text-blue-400">
                        <item.icon className="h-4 w-4" />
                      </div>
                    )}
                    <span className="flex-1">{item.name}</span>
                    {item.external && <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center gap-2">
              &copy; 2025 README Design Kit. All rights reserved.
            </p>
            <span className="hidden md:block text-gray-300 dark:text-gray-600">•</span>
            <div className="flex items-center gap-4">
              {legalLinks.map((link, index) => (
                <div key={link.name} className="flex items-center gap-4">
                  <button
                    onClick={() => window.location.href = link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 rounded-lg px-2 py-1 flex items-center gap-2 group"
                    aria-label={link.description}
                  >
                    <div className="text-blue-600 dark:text-blue-400">
                      <link.icon className="h-4 w-4" />
                    </div>
                    {link.name}
                  </button>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 group">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span>and</span>
            <Coffee className="h-4 w-4 text-amber-600" />
            <span>for developers</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <div className="text-blue-600 dark:text-blue-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                Contributing to SSOC 2025
              </h4>
              <p className="leading-relaxed">
                This project is part of Social Summer of Code 2025. 
                We welcome contributions from the community to make README creation easier for everyone.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <div className="text-purple-600 dark:text-purple-400">
                  <Code className="h-5 w-5" />
                </div>
                Open Source
              </h4>
              <p className="leading-relaxed">
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