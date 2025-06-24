
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

import { toast } from 'sonner';

interface ComponentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  codeSnippet: string;
  username: string;
  repo: string;
}

export default function ComponentCard({ title, description, imageUrl, codeSnippet, username, repo}: ComponentCardProps) {

  const handleCopyLink = async () => {    try {
      const formattedCode = codeSnippet.replace(/\{username\}/g, username).replace(/\{repo\}/g, repo);
      await navigator.clipboard.writeText(formattedCode);
      toast(
        `Copied to clipboard!, ${title} code has been copied to your clipboard.`,
      );
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      toast(
        "Failed to copy, Please try again.",
      );
    }
  };

  const finalImageUrl = imageUrl.replace(/\{username\}/g, username).replace(/\{repo\}/g, repo);
  return (
    <div className="relative bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-lg  opacity-80 hover:opacity-100 hover:shadow-lg  hover:shadow-purple-700/40  hover:border-x-purple-600 hover:border-y-purple-600  cursor-text transition-all duration-500 hover:scale-105 group max-w-sm">
      <div className="aspect-video bg-muted flex items-center justify-center p-4">
        <img
          src={finalImageUrl}
          alt={title}
          className="max-w-full max-h-full object-contain rounded"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button
          onClick={handleCopyLink}
          className="w-full bg-primary hover:bg-primary/60 hover:scale-102 cursor-pointer text-primary-foreground"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Code
        </Button>
      </div>
    </div>
  );
};

