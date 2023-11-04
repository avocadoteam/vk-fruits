export type RatingState = {
  activeTab: '100' | 'friends';
  top100: RatingResult[];
  friends: RatingResult[];
  friendIds: number[];
  userPosition?: string;
};

export type RatingResult = {
  id: string;
  avatar?: string;
  pts: number;
  userId: number;
  firstName?: string;
  lastName?: string;
};
