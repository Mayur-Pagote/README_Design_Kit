
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';


type ViewMode = 'developer' | 'recruiter' | 'client';

interface PersonaComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PersonaComparisonModal({ isOpen, onClose }: PersonaComparisonModalProps) {
  if (!isOpen) return null;

  // Visibility map - same as in ReadmePreview
  const visibilityMap: Record<string, ViewMode[]> = {
    header: ['developer', 'recruiter', 'client'],
    description: ['developer', 'recruiter', 'client'],
    badges: ['developer', 'recruiter'],
    installation: ['developer'],
    usage: ['developer', 'client'],
    codeblock: ['developer'],
    features: ['developer', 'recruiter', 'client'],
    screenshot: ['recruiter', 'client'],
    demo: ['recruiter', 'client'],
    api: ['developer'],
    contributing: ['developer'],
    license: ['developer', 'recruiter'],
    contact: ['developer', 'recruiter', 'client'],
    changelog: ['developer'],
    roadmap: ['developer', 'recruiter'],
    acknowledgments: ['developer'],
    faq: ['client'],
    support: ['client'],
    sponsors: ['recruiter', 'client'],
    stats: ['recruiter'],
    skills: ['recruiter'],
    tech: ['developer', 'recruiter'],
    highlights: ['recruiter', 'client'],
    branding: ['client'],
    banner: ['client', 'recruiter'],
    logo: ['client', 'recruiter'],
  };

  const personas: ViewMode[] = ['developer', 'recruiter', 'client'];
  
  const getPersonaLabel = (mode: ViewMode) => {
    switch (mode) {
      case 'developer':
        return '👨‍💻 Developer';
      case 'recruiter':
        return '🔍 Recruiter';
      case 'client':
        return '📦 Client';
      default:
        return mode;
    }
  };

  const getElementLabel = (type: string) => {
    const labels: Record<string, string> = {
      header: 'Project Header',
      description: 'Description',
      badges: 'Badges',
      installation: 'Installation',
      usage: 'Usage Examples',
      codeblock: 'Code Blocks',
      features: 'Features',
      screenshot: 'Screenshots',
      demo: 'Demo Links',
      api: 'API Reference',
      contributing: 'Contributing',
      license: 'License',
      contact: 'Contact Info',
      changelog: 'Changelog',
      roadmap: 'Roadmap',
      acknowledgments: 'Acknowledgments',
      faq: 'FAQ',
      support: 'Support',
      sponsors: 'Sponsors',
      stats: 'Statistics',
      skills: 'Skills',
      tech: 'Tech Stack',
      highlights: 'Highlights',
      branding: 'Branding',
      banner: 'Banner',
      logo: 'Logo',
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const isVisible = (elementType: string, persona: ViewMode) => {
    const allowedModes = visibilityMap[elementType] || ['developer', 'recruiter', 'client'];
    return allowedModes.includes(persona);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Persona Visibility Comparison</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[60vh]">
          <p className="text-sm text-gray-600 mb-6">
            This table shows which README elements are visible for each persona type. 
            Use this to understand how your README will appear to different audiences.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">
                    Element Type
                  </th>
                  {personas.map(persona => (
                    <th key={persona} className="border border-gray-200 px-4 py-3 text-center font-medium text-gray-900">
                      {getPersonaLabel(persona)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(visibilityMap).sort().map(elementType => (
                  <tr key={elementType} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">
                      {getElementLabel(elementType)}
                    </td>
                    {personas.map(persona => (
                      <td key={persona} className="border border-gray-200 px-4 py-3 text-center">
                        {isVisible(elementType, persona) ? (
                          <span className="text-green-600 text-lg">✅</span>
                        ) : (
                          <span className="text-red-500 text-lg">❌</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Legend</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span>Visible in this persona</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">❌</span>
                <span>Hidden in this persona</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50">
          <Button onClick={onClose} className="ml-auto block">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}