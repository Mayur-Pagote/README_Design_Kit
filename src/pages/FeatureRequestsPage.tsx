import React, { useState, useMemo } from 'react';
import { Filter, Plus, Search, SortAsc } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import type { FeatureRequest, FilterOption, SortOption } from '@/types/FeatureRequest';
import FeatureCard from '@/components/FeatureCard';
import FeatureRequestForm from '@/components/FeatureRequestForm';

const FeatureRequestsPage: React.FC = () => {
  const [features, setFeatures] = useLocalStorage<FeatureRequest[]>('feature-requests', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('votes');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showForm, setShowForm] = useState(false);

  // Voting logic
  const handleVote = (id: string, voteType: 'up' | 'down') => {
  setFeatures((prevFeatures: FeatureRequest[]) => {
    if (!Array.isArray(prevFeatures)) return [];
    const updatedFeatures = prevFeatures.map(feature => {
      if (feature.id !== id) return feature;

      let newVotes = feature.votes;
      let newUserVote: 'up' | 'down' | null = voteType;

      if (feature.userVote === voteType) {
        newUserVote = null;
        newVotes += voteType === 'up' ? -1 : 1;
      } else if (feature.userVote) {
        newVotes += voteType === 'up' ? 2 : -2;
      } else {
        newVotes += voteType === 'up' ? 1 : -1;
      }

      return { ...feature, votes: Math.max(0, newVotes), userVote: newUserVote };
    });

    return [...updatedFeatures];
  });
};


  // Handle new feature submission
  const handleSubmitFeature = (newFeature: Omit<FeatureRequest, 'id' | 'votes' | 'userVote' | 'createdAt'>) => {
    const feature: FeatureRequest = {
      ...newFeature,
      id: Date.now().toString(),
      votes: 1,
      userVote: 'up',
      createdAt: new Date().toISOString()
    };
    setFeatures(prev => [feature, ...prev]);
    setShowForm(false); // Close the form after submission
  };

  // Filtering and sorting
  const filteredAndSortedFeatures = useMemo(() => {
    return features
      .filter(feature => {
        const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterBy === 'all' || feature.status === filterBy;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'votes':
            return b.votes - a.votes;
          case 'trending':
            return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          default:
            return 0;
        }
      });
  }, [features, searchTerm, sortBy, filterBy]);  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-b border-border">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Feature Requests
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share ideas & help shape the future of README Design Kit.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-6 py-8">
        <Card className="shadow-lg border-border/50 hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feature requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div className="flex gap-3 flex-col sm:flex-row lg:flex-nowrap">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-full sm:w-[160px] bg-background border-input focus:border-primary">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="votes">Most Votes</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterBy} onValueChange={(value) => setFilterBy(value as FilterOption)}>
                  <SelectTrigger className="w-full sm:w-[160px] bg-background border-input focus:border-primary">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => setShowForm(true)}
                  disabled={showForm}
                  className="flex items-center gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </div>
            
            {/* Results count */}
            {filteredAndSortedFeatures.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedFeatures.length} feature request{filteredAndSortedFeatures.length !== 1 ? 's' : ''}
                  {searchTerm && ` matching "${searchTerm}"`}
                  {filterBy !== 'all' && ` with status "${filterBy.replace('-', ' ')}"`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feature Requests Grid */}
      <div className="container mx-auto px-6 pb-8">
        {filteredAndSortedFeatures.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Filter className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">No feature requests found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchTerm || filterBy !== 'all' 
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Be the first to submit a feature request and help improve README Design Kit!"
              }
            </p>
            {!searchTerm && filterBy === 'all' && (
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit First Request
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedFeatures.map((feature, index) => (
              <div 
                key={feature.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard feature={feature} onVote={handleVote} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <FeatureRequestForm onSubmit={handleSubmitFeature} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default FeatureRequestsPage;
