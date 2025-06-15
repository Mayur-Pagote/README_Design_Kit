export interface LegalContent {
  version: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface LegalSection {
  title: string;
  content: string;
  items?: string[];
}

export const privacyPolicyContent: LegalContent = {
  version: '1.0.0',
  lastUpdated: '2024-03-14',
  sections: [
    {
      title: 'Data Collection & Usage',
      content: 'We are committed to protecting your privacy and ensuring transparency in how we handle data.',
      items: [
        'Generated Content: We don\'t store your generated README components, badges, or custom content',
        'GitHub Integration: If using GitHub API features, we only access public repository data you authorize',
        'Analytics: Basic usage analytics to improve tool functionality (anonymous)',
        'Local Storage: Preferences and recent generations saved locally in your browser'
      ]
    },
    {
      title: 'Third-Party Services',
      content: 'Our tool integrates with several third-party services to provide functionality.',
      items: [
        'GitHub API: For fetching repository statistics and contribution data',
        'CDN Services: For serving badges, icons, and assets',
        'Analytics: Privacy-focused analytics (no personal identification)'
      ]
    },
    {
      title: 'Data Protection',
      content: 'We implement several measures to protect your data and privacy.',
      items: [
        'No Account Required: Use the tool without creating accounts or providing personal info',
        'Client-Side Processing: Most generation happens in your browser',
        'Open Source: Transparent code available for audit'
      ]
    },
    {
      title: 'Contact',
      content: 'If you have any questions about our privacy policy or data practices, please contact us at:',
      items: [
        'Email: privacy@readmedesignkit.com',
        'GitHub: github.com/Mayur-Pagote/README_Design_Kit'
      ]
    }
  ]
}; 