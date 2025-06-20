import type { LegalContent } from './privacy-policy';

export const termsOfServiceContent: LegalContent = {
  version: '1.0.0',
  lastUpdated: '2024-03-14',
  sections: [
    {
      title: 'Service Usage',
      content: 'README Design Kit is provided as a free service for developers to create beautiful documentation.',
      items: [
        'Free Tool: README Design Kit is provided as a free service for developers',
        'Fair Use: Reasonable usage limits to ensure service availability for all users',
        'Generated Content: You own all content you generate using our tools'
      ]
    },
    {
      title: 'Acceptable Use',
      content: 'Please use our tool responsibly and in accordance with these guidelines.',
      items: [
        'Developer Purpose: Tool designed for creating GitHub README files and documentation',
        'No Spam: Don\'t use for generating misleading or spam content',
        'Respect APIs: Follow GitHub and other integrated service rate limits'
      ]
    },
    {
      title: 'Service Availability',
      content: 'We strive to provide a reliable service while being transparent about our limitations.',
      items: [
        'Best Effort: We strive for high availability but can\'t guarantee 100% uptime',
        'Updates: Features may change as we improve the toolkit',
        'Community Driven: Open to contributions and feedback from the developer community'
      ]
    },
    {
      title: 'Intellectual Property',
      content: 'We respect your rights and are clear about ownership of content.',
      items: [
        'Your Content: You retain rights to all generated README content',
        'Tool Usage: Free to use for personal and commercial projects',
        'Attribution: Optional but appreciated when sharing generated content'
      ]
    },
    {
      title: 'Contact',
      content: 'If you have any questions about our terms of service, please contact us at:',
      items: [
        'Email: legal@readmedesignkit.com',
        'GitHub: github.com/Mayur-Pagote/README_Design_Kit'
      ]
    }
  ]
}; 