import React from 'react';
import { ChevronUp, ChevronDown, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import type { FeatureRequest } from '@/types/FeatureRequest';

interface FeatureCardProps {
  feature: FeatureRequest;
  onVote: (id: string, voteType: 'up' | 'down') => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onVote }) => {
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
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'planned':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
              {feature.title}
            </h3>
            {feature.trending && (
              <div className="flex items-center space-x-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                <TrendingUp size={12} />
                <span>Trending</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {feature.description}
          </p>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              {feature.category}
            </span>
            <span>by {feature.author}</span>
            <span>{new Date(feature.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => onVote(feature.id, 'up')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              feature.userVote === 'up'
                ? 'bg-purple-100 text-purple-700 shadow-sm'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronUp size={20} />
          </button>
          
          <span className={`font-semibold text-lg ${
            feature.votes > 0 ? 'text-purple-700' : 'text-gray-500'
          }`}>
            {feature.votes}
          </span>
          
          <button
            onClick={() => onVote(feature.id, 'down')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              feature.userVote === 'down'
                ? 'bg-red-100 text-red-700 shadow-sm'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(feature.status)}`}>
          {getStatusIcon(feature.status)}
          <span>{formatStatus(feature.status)}</span>
        </div>
        
        <div className="text-sm text-gray-500">
          {feature.votes} {feature.votes === 1 ? 'vote' : 'votes'}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;