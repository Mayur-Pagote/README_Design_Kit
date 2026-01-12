import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, FileArchive, FileText } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { exportComponentCardAsPdf, exportComponentCodeAsZip } from '@/utils/exportUtils';

interface ComponentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  codeSnippet: string;
  username: string;
  repo: string;
}

export default function ComponentCard({ title, description, imageUrl, codeSnippet, username, repo}: ComponentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    try {
      const formattedCode = codeSnippet.replace(/\{username\}/g, username).replace(/\{repo\}/g, repo);
      await navigator.clipboard.writeText(formattedCode);
      toast.success(`${title} code has been copied to your clipboard.`);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      toast.error("Failed to copy, Please try again.");
    }
  };

  const handleExportPdf = async () => {
    if (!cardRef.current) {
      toast.error('Failed to export PDF: Card element not found');
      return;
    }
    
    try {
      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      toast.loading('Generating PDF...', { id: 'pdf-export' });
      await exportComponentCardAsPdf(cardRef.current, sanitizedTitle);
      toast.success('Component exported as PDF!', { id: 'pdf-export' });
    } catch (error) {
      console.error('PDF export failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to export PDF: ${errorMessage}`, { id: 'pdf-export' });
    }
  };

  const handleExportZip = async () => {
    try {
      const formattedCode = codeSnippet.replace(/\{username\}/g, username).replace(/\{repo\}/g, repo);
      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      await exportComponentCodeAsZip(formattedCode, sanitizedTitle);
      toast.success('Component code exported as ZIP!');
    } catch (error) {
      console.error('ZIP export failed:', error);
      toast.error('Failed to export ZIP');
    }
  };

  const finalImageUrl = imageUrl.replace(/\{username\}/g, username).replace(/\{repo\}/g, repo);
  return (
    <div 
      ref={cardRef}
      className="relative bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-lg opacity-90 group transform-gpu transition-all duration-200 ease-out delay-100 hover:-translate-y-2 hover:scale-[1.04] shadow-md hover:shadow-2xl hover:shadow-purple-500/40 hover:opacity-100 hover:border-purple-600 cursor-pointer max-w-sm flex flex-col h-full"
    >
      <div className="aspect-video bg-muted flex items-center justify-center p-4 flex flex-col flex-grow">
        <img
          src={finalImageUrl}
          alt={title}
          className="max-w-full max-h-full object-contain rounded"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
        <div className="flex gap-2">
          <Button
            onClick={handleCopyLink}
            className="flex-1 bg-primary hover:bg-primary/60 text-primary-foreground transform-gpu transition-transform duration-200 ease-out delay-75 hover:-translate-y-0.5 hover:scale-[1.03]"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Code
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-background hover:bg-accent transform-gpu transition-transform duration-200 ease-out delay-75 hover:-translate-y-0.5 hover:scale-[1.03]"
              >
                <Download className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportPdf}>
                <FileText className="h-4 w-4 mr-2" />
                <span className="flex-1">Download as PDF</span>
                <Download className="h-4 w-4 ml-2" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportZip}>
                <FileArchive className="h-4 w-4 mr-2" />
                <span className="flex-1">Download as ZIP</span>
                <Download className="h-4 w-4 ml-2" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

