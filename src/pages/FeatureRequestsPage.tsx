import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
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
  }, [features, searchTerm, sortBy, filterBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Feature Requests</h1>
        <p className="text-xl mt-4">Share ideas & help shape the future of README Design Kit.</p>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border rounded-md focus:ring-purple-500"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="p-3 border rounded-md focus:ring-purple-500 bg-white"
          >
            <option value="votes">Most Votes</option>
            <option value="trending">Trending</option>
            <option value="newest">Newest</option>
          </select>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterOption)}
            className="p-3 border rounded-md focus:ring-purple-500 bg-white"
          >
            <option value="all">All Status</option>
            <option value="under-review">Under Review</option>
            <option value="planned">Planned</option>
            <option value="rejected">Rejected</option>
          </select>

          <button
            onClick={() => setShowForm(true)}
            className="p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            disabled={showForm}
          >
            Submit Request
          </button>
        </div>
      </div>

      {/* Feature Requests Grid */}
      <div className="max-w-7xl mx-auto mt-8">
        {filteredAndSortedFeatures.length === 0 ? (
          <div className="text-center py-16">
            <Filter size={48} className="mx-auto text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600 mt-4">No feature requests found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          filteredAndSortedFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} onVote={handleVote} />
          ))
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
