import { getTop100RankFX } from '@core/api/rating/effects.rating';
import { Div, PullToRefresh } from '@vkontakte/vkui';
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
      <Div style={{ padding: '0', minHeight: '50vh' }}>{children}</Div>
    </PullToRefresh>
  );
});
