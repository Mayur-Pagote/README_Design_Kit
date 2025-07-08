import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Check, 
  AlertTriangle,
  ExternalLink,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { readmeAI } from '@/services/readmeAIService';

interface APIKeySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const APIKeySettings: React.FC<APIKeySettingsProps> = ({
  open,
  onOpenChange
}) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (open) {
      const currentKey = readmeAI.getApiKey();
      setApiKey(currentKey || '');
      setIsConfigured(readmeAI.isConfigured());
    }
  }, [open]);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    setIsTesting(true);
    
    try {
      // Set the API key
      readmeAI.setApiKey(apiKey.trim());
      
      // Test the API key with a simple request
      await readmeAI.answerReadmeQuestion('Test connection');
      
      setIsConfigured(true);
      toast.success('API key saved and verified successfully!');
      onOpenChange(false);
    } catch (error) {
      console.error('API key test failed:', error);
      toast.error('API key verification failed. Please check your key and try again.');
      // Remove the invalid key
      readmeAI.clearApiKey();
      setIsConfigured(false);
    } finally {
      setIsTesting(false);
    }
  };

  const handleRemove = () => {
    readmeAI.clearApiKey();
    setApiKey('');
    setIsConfigured(false);
    toast.success('API key removed');
  };

  const openGeminiConsole = () => {
    window.open('https://aistudio.google.com/app/apikey', '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Key Settings
          </DialogTitle>
          <DialogDescription>
            Configure your Gemini API key to enable AI-powered README generation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            {isConfigured ? (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                <Check className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Not configured
              </Badge>
            )}
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apikey">Gemini API Key</Label>
            <div className="relative">
              <Input
                id="apikey"
                type={showApiKey ? 'text' : 'password'}
                placeholder="Enter your Gemini API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Get API Key Link */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Don't have an API key?</span>
              <Button
                variant="outline"
                size="sm"
                onClick={openGeminiConsole}
                className="ml-2"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Get API Key
              </Button>
            </AlertDescription>
          </Alert>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>How to get your API key:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Click "Get API Key" above</li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API Key"</li>
              <li>Copy the generated key</li>
              <li>Paste it in the field above</li>
            </ol>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          {isConfigured && (
            <Button variant="outline" onClick={handleRemove}>
              Remove Key
            </Button>
          )}
          <Button onClick={handleSave} disabled={isTesting || !apiKey.trim()}>
            {isTesting ? 'Testing...' : 'Save & Test'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeySettings;
