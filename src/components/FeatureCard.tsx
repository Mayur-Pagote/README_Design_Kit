import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Clock, CheckCircle, XCircle, TrendingUp, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Local interface to replace the deleted @types/FeatureRequest
export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdAt: string;
  votes: number;
  status: 'under-review' | 'planned' | 'rejected' | 'completed';
  userVote?: 'up' | 'down' | null;
  trending?: boolean;
}

interface FeatureCardProps {
  feature: FeatureRequest;
  onVote: (id: string, voteType: 'up' | 'down') => void;
  onEdit: (feature: FeatureRequest) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onVote, onEdit }) => {  
  const [edited, setEdited] = useState(false);
  const [editedFeature, setEditedFeature] = useState(feature);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedFeature({
      ...editedFeature,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onEdit(editedFeature);
    setEdited(false);
  };

  const handleCancel = () => {
    setEditedFeature(feature);
    setEdited(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under-review':
        return <Clock size={16} className="text-yellow-500" />;
      case 'planned':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20';
      case 'planned':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              {feature.trending && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  <TrendingUp size={12} className="mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {feature.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Badge variant="outline">{feature.category}</Badge>
              <span>by {feature.author}</span>
              <span>{new Date(feature.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(feature.id, 'up')}
              className={feature.userVote === 'up' ? 'text-primary' : ''}
            >
              <ChevronUp size={20} />
            </Button>
            <span className="font-bold">{feature.votes}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(feature.id, 'down')}
              className={feature.userVote === 'down' ? 'text-destructive' : ''}
            >
              <ChevronDown size={20} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <Badge className={getStatusColor(feature.status)}>
            {getStatusIcon(feature.status)}
            <span className="ml-2">{formatStatus(feature.status)}</span>        
          </Badge>

          <Button variant="outline" size="sm" onClick={() => setEdited(true)}>
            <Pencil size={16} className="mr-1" />
            Edit
          </Button>
        </div>
        
        <Dialog open={edited} onOpenChange={setEdited}>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit Feature Request</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <Input name="title" value={editedFeature.title} onChange={handleChange} />
              <Textarea name="description" value={editedFeature.description} onChange={handleChange} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
