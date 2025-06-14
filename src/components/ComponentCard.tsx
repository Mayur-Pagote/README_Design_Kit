
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

import { toast } from 'sonner';

interface ComponentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  codeSnippet: string;
  username: string;
}

export default function ComponentCard({ title, description, imageUrl, codeSnippet, username }: ComponentCardProps) {

  const handleCopyLink = async () => {
    try {
      const formattedCode = codeSnippet.replace(/\{username\}/g, username);
      await navigator.clipboard.writeText(formattedCode);
      toast
      toast(
        `Copied to clipboard!, ${title} code has been copied to your clipboard.`,
      );
    } catch (err) {
      toast(
        "Failed to copy, Please try again.",
      );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="aspect-video bg-muted flex items-center justify-center p-4">
        <img
          src={imageUrl}
          alt={title}
          className="max-w-full max-h-full object-contain rounded"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button
          onClick={handleCopyLink}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Code
        </Button>
      </div>
    </div>
  );
};

