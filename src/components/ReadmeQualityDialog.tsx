import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ReadmeQualityResult } from '@/utils/readmeQualityAnalyzer';

interface Props {
  open: boolean;
  onClose: () => void;
  result: ReadmeQualityResult | null;
}

export function ReadmeQualityDialog({ open, onClose, result }: Props) {
  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>README Quality Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold">{result.score}</span>
            <Badge
            className={
                result.score >= 70
                ? 'bg-green-600 text-white'
                : 'bg-yellow-500 text-black'
               }
            >
           / 100
          </Badge>
          </div>

          <div>
            <h4 className="font-semibold">Strengths</h4>
            <ul className="list-disc list-inside text-sm">
              {result.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {result.missing.length > 0 && (
            <div>
              <h4 className="font-semibold">Missing / Weak Areas</h4>
              <ul className="list-disc list-inside text-sm">
                {result.missing.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-semibold">Suggestions</h4>
            <ul className="list-disc list-inside text-sm">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
