export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  userVote: 'up' | 'down' | null;
  status: 'under-review' | 'planned' | 'rejected';
  createdAt: string;
  author: string;
  trending?: boolean;
}

export type SortOption = 'votes' | 'trending' | 'newest';
export type FilterOption = 'all' | 'under-review' | 'planned' | 'rejected';