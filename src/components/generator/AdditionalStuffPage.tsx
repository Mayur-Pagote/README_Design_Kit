
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, Trophy, Eye, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { GeneratorState } from './Readme-generator';
import ProgressIndicator from './ProgressIndicator';
import { toast } from '../ui/sonner';

interface AdditionalStuffPageProps {
  state: GeneratorState;
  setState: (state: GeneratorState) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const AdditionalStuffPage = ({ state, setState, currentPage, totalPages, nextPage, prevPage }: AdditionalStuffPageProps) => {

  const updateAdditional = (section: keyof typeof state.additional, field: string, value: any) => {
    setState({
      ...state,
      additional: {
        ...state.additional,
        [section]: {
          ...state.additional[section],
          [field]: value,
        },
      },
    });
  };

  const handleComponentToggle = (componentKey: string, enabled: boolean) => {
    updateAdditional(componentKey as any, 'enabled', enabled);
    
    toast(enabled ? 'Component Added' : 'Component Removed', {
      description: `The component has been ${enabled ? 'added to' : 'removed from'} your README.`,
    });
  };

  const components = [
    {
      key: 'trophies' as const,
      title: 'GitHub Trophies',
      icon: Trophy,
      description: 'Showcase your GitHub achievements',
      color: 'from-yellow-500 to-orange-500',
      options: [
        {
          type: 'select',
          key: 'theme',
          label: 'Theme',
          options: [
            { value: 'radical', label: 'Radical' },
            { value: 'flat', label: 'Flat' },
            { value: 'onedark', label: 'One Dark' },
            { value: 'gruvbox', label: 'Gruvbox' },
            { value: 'dracula', label: 'Dracula' },
            { value: 'monokai', label: 'Monokai' }
          ]
        },
        { type: 'switch', key: 'showBorder', label: 'Show Border' },
        { type: 'switch', key: 'showBackground', label: 'Show Background' },
      ]
    },
    {
      
      key: 'visitorCount' as const,
      title: 'Visitor Count',
      icon: Eye,
      description: 'Track profile visits',
      color: 'from-cyan-500 to-blue-500',
      options: [
        {
          type: 'select',
          key: 'color',
          label: 'Color',
          options: [
            { value: 'blue', label: 'Blue' },
            { value: 'green', label: 'Green' },
            { value: 'red', label: 'Red' },
            { value: 'blueviolet', label: 'Purple' },
            { value: 'orange', label: 'Orange' },
          ]
        },
      ]
    },
    {
      key: 'devQuotes' as const,
      title: 'Random Dev Quotes',
      icon: Quote,
      description: 'Inspiring developer quotes',
      color: 'from-purple-500 to-pink-500',
      options: [
        {
          type: 'select',
          key: 'theme',
          label: 'Theme',
          options: [
            { value: 'radical', label: 'Radical' },
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
            { value: 'merko', label: 'Merko' },
          ]
        },
        {
          type: 'select',
          key: 'layout',
          label: 'Layout',
          options: [
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' },
          ]
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator current={currentPage} total={totalPages - 1} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-foreground px-4 py-2 rounded-full mb-4 text-sm font-medium">
              <Plus className="w-4 h-4" />
              Additional Features
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-primary bg-clip-text text-transparent">
              Additional Stuffs to add
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enhance your profile with extra components like trophies, visitor counters, and inspiring quotes.
            </p>
          </motion.div>

          <div className="grid gap-6 mb-12">
            {components.map((component, index) => (
              <motion.div
                key={component.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${component.color} opacity-0 group-hover:opacity-5 rounded-xl blur-sm transition-opacity`}></div>
                  <div className="relative bg-background/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${component.color} rounded-xl flex items-center justify-center`}>
                          <component.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{component.title}</h3>
                          <p className="text-muted-foreground text-sm">{component.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={state.additional[component.key]?.enabled || false}
                        onCheckedChange={(checked) => handleComponentToggle(component.key, checked)}
                        aria-label={`Toggle ${component.title}`}
                      />
                    </div>

                    {(state.additional[component.key]?.enabled) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-700 pt-4 space-y-4"
                      >
                        {component.options.map((option) => (
                          <div key={option.key} className="flex items-center justify-between">
                            <Label className="text-sm text-muted-foreground">{option.label}</Label>
                            {option.type === 'switch' ? (
                              <Switch
                                checked={state.additional[component.key][option.key as keyof typeof state.additional[typeof component.key]] as boolean}
                                onCheckedChange={(checked) => updateAdditional(component.key, option.key, checked)}
                              />
                            ) : (
                              <Select
                                value={String(state.additional[component.key]?.[option.key as keyof typeof state.additional[typeof component.key]] || '')}
                                onValueChange={(value) => updateAdditional(component.key, option.key, value)}
                              >
                                <SelectTrigger className="w-32 bg-background/50 border-slate-600 text-muted-foreground">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                  {option.options?.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value} className="text-white hover:bg-slate-700">
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        ))}

                        <div className="bg-background/50 rounded-lg p-4 mt-4">
                          <div className="text-sm text-muted-foreground mb-2 font-medium">Preview:</div>
                          {component.key === 'trophies' && (
                            <div className="flex gap-2">
                              <div className="w-8 h-8 bg-yellow-500 rounded"></div>
                              <div className="w-8 h-8 bg-orange-500 rounded"></div>
                              <div className="w-8 h-8 bg-purple-500 rounded"></div>
                            </div>
                          )}
                          {component.key === 'visitorCount' && (
                            <div className="text-sm text-muted-foreground">
                              Profile views: <span className="text-cyan-400">1,234</span>
                            </div>
                          )}
                          {component.key === 'devQuotes' && (
                            <div className="text-sm text-muted-foreground italic">
                              "Code is like humor. When you have to explain it, it's bad." - Cory House
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={prevPage}
              variant="outline"
              className="flex items-center gap-2 border-slate-600 text-foreground hover:text-foreground/90 hover:border-slate-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>

            <Button
              onClick={nextPage}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Generate Profile
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalStuffPage;
