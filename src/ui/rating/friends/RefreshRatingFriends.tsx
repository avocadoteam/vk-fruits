import { getFriendsRatingFX } from '@core/api/rating/effects.rating';
import { $rating } from '@core/api/rating/store.rating';
import { Div, PullToRefresh } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { memo, useCallback } from 'react';

type Props = {
  children: React.ReactNode;
};

export const RefreshRatingFriends = memo<Props>(({ children }) => {
  const listFetching = useStore(getFriendsRatingFX.pending);
  const { friendIds } = useStoreMap({
    store: $rating,
    keys: [],
    fn: rS => {
      return {
        friendIds: rS.friendIds,
      };
    },
  });

  const refresh = useCallback(() => {
    getFriendsRatingFX(friendIds);
  }, [friendIds]);

  return (
    <PullToRefresh onRefresh={refresh} isFetching={listFetching}>
      <Div style={{ padding: '0', minHeight: '50vh' }}>{children}</Div>
    </PullToRefresh>
  );
});