import { AX } from '@core/data/fetcher';
import { qVK } from '@core/data/q-params';
import { ratingDomain } from './domain';

export const getTop100RankFX = ratingDomain.createEffect(async () => {
  const { data } = await AX.get('/fruits/rating/top100' + qVK);
  return data.data;
});
export const getFriendsRatingFX = ratingDomain.createEffect({
  handler: async (ids: number[]) => {
    const { data } = await AX.post('/fruits/rating/friends' + qVK, { ids });
    return data.data;
  },
  name: 'getFriendsRatingFX',
});
