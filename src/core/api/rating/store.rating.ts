import { forward } from 'effector';
import { getUserFriendsFX } from '../friends/effects.config';
import { ratingDomain } from './domain';
import { getFriendsRatingFX, getTop100RankFX } from './effects.rating';
import { RatingState } from './types';

export const changeRatingActiveTab = ratingDomain.createEvent<RatingState['activeTab']>();

export const $rating = ratingDomain.createStore<RatingState>({
  activeTab: '100',
  friends: [],
  top100: [],
  friendIds: [],
});

$rating.on(getTop100RankFX.doneData, (state, data) => ({
  ...state,
  top100: data.top100,
  userPosition: data.userPosition,
}));
$rating.on(getFriendsRatingFX.doneData, (state, data) => ({
  ...state,
  friends: data,
}));
$rating.on(changeRatingActiveTab, (state, activeTab) => ({
  ...state,
  activeTab,
}));
$rating.on(getUserFriendsFX.doneData, (state, { items }) => ({
  ...state,
  friendIds: items,
}));

forward({
  from: getUserFriendsFX.doneData.map(({ items }) => items),
  to: getFriendsRatingFX,
});
