import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Clock, CheckCircle, XCircle, TrendingUp, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { FeatureRequest } from '@/types/FeatureRequest';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
        return <Clock size={16} className="text-yellow-500 dark:text-yellow-400" />;
      case 'planned':
        return <CheckCircle size={16} className="text-green-500 dark:text-green-400" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-500 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'planned':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 bg-card border-border animate-scale-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 cursor-default">
                {feature.title}
              </h3>
              {feature.trending && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800 animate-pulse">
                  <TrendingUp size={12} className="mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {feature.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs hover:bg-muted transition-colors duration-200">
                {feature.category}
              </Badge>
              <span className="hover:text-foreground transition-colors duration-200">
                by {feature.author}
              </span>
                
              <span className="hover:text-foreground transition-colors duration-200">
                {new Date(feature.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2" role="group" aria-label="Voting controls">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(feature.id, 'up')}
              className={`p-2 h-auto transition-all duration-200 hover:scale-110 focus:scale-110 ${
                feature.userVote === 'up'
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              aria-label={`Upvote ${feature.title}`}
            >
              <ChevronUp size={20} />
            </Button>
            
            <span 
              className={`font-bold text-lg transition-all duration-200 ${
                feature.votes > 0 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}
              aria-label={`${feature.votes} votes`}
            >
              {feature.votes}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(feature.id, 'down')}
              className={`p-2 h-auto transition-all duration-200 hover:scale-110 focus:scale-110 ${
                feature.userVote === 'down'
                  ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              aria-label={`Downvote ${feature.title}`}
            >
              <ChevronDown size={20} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Badge className={`${getStatusColor(feature.status)} flex items-center gap-2 transition-all duration-200 hover:scale-105`}>
            {getStatusIcon(feature.status)}
            <span>{formatStatus(feature.status)}</span>        
          </Badge>

          <Button
          variant="outline"
          size="sm"
          onClick={() => setEdited(true)}
          className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10"
        >
          <Pencil size={16} />
          Edit
        </Button>


          
          <div className="text-sm text-muted-foreground">
            <span className="hover:text-foreground transition-colors duration-200">
              {feature.votes} {feature.votes === 1 ? 'vote' : 'votes'}
            </span>
          </div>
        </div>
        
        <Dialog open={edited} onOpenChange={setEdited}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Feature Request</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  name="title"
                  value={editedFeature.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  rows={4}
                  value={editedFeature.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  name="category"
                  value={editedFeature.category}
                  onChange={handleChange}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  );
};

export default FeatureCard;