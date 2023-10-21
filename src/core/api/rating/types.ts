export type RatingState = {
  activeTab: '100' | 'friends';
  top100: RatingResult[];
  friends: RatingResult[];
  friendIds: number[];
};

export type RatingResult = {
  id: string;
  avatar?: string;
  pts: number;
  vkUserId: number;
  firstName?: string;
  lastName?: string;
};
