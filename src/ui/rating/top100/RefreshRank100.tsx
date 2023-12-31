import { getTop100RankFX } from '@core/api/rating/effects.rating';
import { PullToRefresh } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { memo, useCallback } from 'react';

type Props = {
  children: React.ReactNode;
};

export const RefreshRank100 = memo<Props>(({ children }) => {
  const listFetching = useStore(getTop100RankFX.pending);

  const refreshListOfTop100 = useCallback(() => {
    getTop100RankFX();
  }, []);

  return (
    <PullToRefresh onRefresh={refreshListOfTop100} isFetching={listFetching}>
      <div style={{ minHeight: '50vh', paddingBottom: '110px' }}>{children}</div>
    </PullToRefresh>
  );
});
