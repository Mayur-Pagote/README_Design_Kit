import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import type { FeatureRequest } from '@/types/FeatureRequest';

interface FeatureRequestFormProps {
  onSubmit: (feature: Omit<FeatureRequest, 'id' | 'votes' | 'userVote' | 'createdAt'>) => void;
  onClose: () => void;
  open?: boolean;
}

const FeatureRequestForm: React.FC<FeatureRequestFormProps> = ({ onSubmit, onClose, open = true }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'UI/UX Improvements',
    'New Components',
    'Performance',
    'Documentation',
    'Integration',
    'Templates',
    'Export Features',
    'Collaboration',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !category || !author.trim()) return;

    setIsSubmitting(true);
    
    try {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        category,
        author: author.trim(),
        status: 'under-review',
        trending: false
      });

      setTitle('');
      setDescription('');
      setCategory('');
      setAuthor('');
      onClose();
    } catch (error) {
      console.error('Error submitting feature request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Submit Feature Request
          </DialogTitle>
          <DialogDescription>
            Share your ideas to help improve README Design Kit
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-medium text-foreground">
              Your Name *
            </Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              className="bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Feature Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, concise title"
              className="bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-foreground">
              Category *
            </Label>
            <Select value={category} onValueChange={setCategory} required disabled={isSubmitting}>
              <SelectTrigger className="bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="hover:bg-muted transition-colors duration-200">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description *
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe your feature request in detail. What problem does it solve? How should it work?"
              className="bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 resize-none"
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Be specific about the use case and expected behavior.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="hover:bg-muted transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim() || !category || !author.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureRequestForm;