import { AX } from '@core/data/fetcher';
import { ratingDomain } from './domain';

export const getTop100RankFX = ratingDomain.createEffect(async () => {
  const { data } = await AX.get('/fruits/rating/top100');
  return data;
});
export const getFriendsRatingFX = ratingDomain.createEffect(async (ids: number[]) => {
  const { data } = await AX.post('/fruits/rating/friends', { data: { ids } });
  return data;
});
