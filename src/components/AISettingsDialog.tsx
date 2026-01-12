import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, ExternalLink, Key, Sparkles, Trash2 } from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { toast } from 'sonner';

interface AISettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AISettingsDialog({ isOpen, onClose }: AISettingsDialogProps) {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [creativity, setCreativity] = useState<'concise' | 'balanced' | 'detailed'>('balanced');
  const [style, setStyle] = useState<'professional' | 'casual' | 'technical' | 'creative' | 'recruiter' | 'maintainer'>('professional');

  useEffect(() => {
    if (isOpen) {
      const existingKey = geminiService.getApiKey();
      setHasExistingKey(!!existingKey);
      setApiKey(existingKey || '');
      
      const settings = geminiService.getSettings();
      setCreativity(settings.creativity);
      setStyle(settings.style);
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    try {
      // Test the API key by making a simple request
      setIsTestingConnection(true);
      geminiService.setApiKey(apiKey.trim());
      
      // Save the AI settings
      geminiService.setSettings({ creativity, style });
      
      // Test with a simple request
      await geminiService.enhanceText('Hello world', 'test');
      
      toast.success('API key and settings saved successfully!');
      onClose();
    } catch (error) {
      toast.error('Invalid API key. Please check your key and try again.');
      console.error('API key validation failed:', error);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleClearKey = () => {
    geminiService.clearApiKey();
    setApiKey('');
    setHasExistingKey(false);
    toast.success('API key cleared successfully');
  };

  const openGeminiConsole = () => {
    window.open('https://aistudio.google.com/apikey', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            AI Settings
          </DialogTitle>
          <DialogDescription>
            Configure your Gemini API key and AI preferences to enable intelligent text enhancement and generation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Tabs defaultValue="api-key" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="api-key" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Key
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Preferences
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="api-key" className="space-y-4">
              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  Get your free API key from Google AI Studio. The key is stored locally in your browser and never sent to our servers.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="api-key">Gemini API Key</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openGeminiConsole}
                    className="h-auto p-1 text-xs text-blue-600 hover:text-blue-700"
                  >
                    Get API Key <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                <div className="relative">
                  <Input
                    id="api-key"
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key..."
                    className="pr-16"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="h-6 w-6 p-0"
                    >
                      {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    {hasExistingKey && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClearKey}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• API usage follows Google's terms of service</p>
                <p>• Free tier includes generous usage limits</p>
                <p>• Your data is processed by Google's AI services</p>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Output Length</Label>
                  <p className="text-xs text-muted-foreground mb-2">How detailed should AI responses be?</p>
                  <Select value={creativity} onValueChange={(value: 'concise' | 'balanced' | 'detailed') => setCreativity(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">
                        <div className="flex flex-col">
                          <span className="font-medium">Concise</span>
                          <span className="text-xs text-muted-foreground">Short and to the point (1-2 sentences)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="balanced">
                        <div className="flex flex-col">
                          <span className="font-medium">Balanced</span>
                          <span className="text-xs text-muted-foreground">Moderate length with key details (2-3 sentences)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="detailed">
                        <div className="flex flex-col">
                          <span className="font-medium">Detailed</span>
                          <span className="text-xs text-muted-foreground">Comprehensive with context (3-4 sentences)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Writing Style</Label>
                  <p className="text-xs text-muted-foreground mb-2">What tone should the AI use?</p>
                  <Select value={style} onValueChange={(value: 'professional' | 'casual' | 'technical' | 'creative') => setStyle(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">
                        <div className="flex flex-col">
                          <span className="font-medium">Professional</span>
                          <span className="text-xs text-muted-foreground">Polished, business-appropriate tone</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="casual">
                        <div className="flex flex-col">
                          <span className="font-medium">Casual</span>
                          <span className="text-xs text-muted-foreground">Friendly, approachable tone</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="technical">
                        <div className="flex flex-col">
                          <span className="font-medium">Technical</span>
                          <span className="text-xs text-muted-foreground">Precise, technical language</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="creative">
                        <div className="flex flex-col">
                          <span className="font-medium">Creative</span>
                          <span className="text-xs text-muted-foreground">Engaging, memorable language</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="recruiter">
  <div className="flex flex-col">
    <span className="font-medium">Recruiter Friendly</span>
    <span className="text-xs text-muted-foreground">Focus on metrics & impact</span>
  </div>
</SelectItem>
<SelectItem value="maintainer">
  <div className="flex flex-col">
    <span className="font-medium">OS Maintainer</span>
    <span className="text-xs text-muted-foreground">Community & contribution focus</span>
  </div>
</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="text-sm font-medium mb-2">Preview Example:</p>
                  <p className="text-xs text-muted-foreground">
                    {creativity === 'concise' && style === 'professional' && "I'm a passionate developer focused on creating efficient solutions."}
                    {creativity === 'concise' && style === 'casual' && "Hey! I'm a developer who loves building cool stuff."}
                    {creativity === 'concise' && style === 'technical' && "Software engineer specializing in full-stack development."}
                    {creativity === 'concise' && style === 'creative' && "Code artist crafting digital experiences."}
                    
                    {creativity === 'balanced' && style === 'professional' && "I'm a passionate software developer with expertise in modern web technologies. I focus on creating efficient, scalable solutions that deliver real value to users."}
                    {creativity === 'balanced' && style === 'casual' && "Hey there! I'm a developer who loves building awesome apps and learning new tech. I enjoy solving problems and creating things that people actually want to use."}
                    {creativity === 'balanced' && style === 'technical' && "Software engineer with expertise in React, Node.js, and cloud architecture. I specialize in building scalable applications with focus on performance optimization."}
                    {creativity === 'balanced' && style === 'creative' && "Digital architect weaving code into experiences. I transform ideas into interactive realities using cutting-edge technologies and creative problem-solving."}
                    {creativity === 'balanced' && style === 'recruiter' && "Led a team of 5 developers to ship critical features, resulting in a 30% increase in user retention. Implemented CI/CD pipelines that reduced deployment time by 50%."}
                    {creativity === 'balanced' && style === 'maintainer' && "A lightweight, flexible library for managing global state in React applications. We welcome contributions of all kinds, from bug fixes to documentation improvements."}
                    {creativity === 'concise' && style === 'recruiter' && "Delivered 30% performance boost and reduced build times by 50%."}
  {creativity === 'concise' && style === 'maintainer' && "Open source library for easy React state management. PRs welcome!"}


                    {creativity === 'detailed' && style === 'professional' && "I'm a passionate software developer with extensive experience in modern web technologies and full-stack development. I specialize in creating efficient, scalable solutions that deliver measurable value to businesses and users. My approach combines technical expertise with strategic thinking to build applications that not only function flawlessly but also drive real results."}
                    {creativity === 'detailed' && style === 'casual' && "Hey there! I'm a developer who absolutely loves building awesome applications and diving deep into new technologies. I get excited about solving complex problems and creating things that people genuinely enjoy using. Whether it's a sleek frontend or robust backend, I pour my heart into every project and love collaborating with teams to bring ideas to life."}
                    {creativity === 'detailed' && style === 'technical' && "Software engineer with comprehensive expertise in React, Node.js, TypeScript, and cloud architecture patterns. I specialize in building high-performance, scalable applications with emphasis on code quality, testing strategies, and deployment automation. My experience spans microservices architecture, database optimization, and implementing CI/CD pipelines for enterprise-level applications."}
                    {creativity === 'detailed' && style === 'creative' && "Digital architect and code poet, weaving elegant solutions from the threads of imagination and logic. I transform abstract concepts into tangible, interactive experiences using cutting-edge technologies as my palette. My journey involves crafting not just applications, but digital stories that resonate with users and push the boundaries of what's possible in the digital realm."}
                  {creativity === 'detailed' && style === 'recruiter' && "Spearheaded the migration to microservices architecture, managing a budget of $50k and a team of 5. This initiative improved system reliability by 99.9% and increased user engagement metrics by 30% quarter-over-quarter. My focus is on delivering scalable, high-impact technical solutions that drive business growth."}
{creativity === 'detailed' && style === 'maintainer' && "Empower your React applications with this battle-tested state management solution used by over 10k developers. We represent a diverse community of contributors and maintainers committed to high-quality code. Detailed contribution guidelines are provided to help you get started quickly with your first Pull Request."}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Features enabled:</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                Text Enhancement
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Content Generation
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Smart Suggestions
              </Badge>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!apiKey.trim() || isTestingConnection}
            className="min-w-24"
          >
            {isTestingConnection ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                Testing...
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
