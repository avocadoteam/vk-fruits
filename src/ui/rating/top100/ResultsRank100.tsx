import { getTop100RankFX } from '@core/api/rating/effects.rating';
import { $rating } from '@core/api/rating/store.rating';
import { numberWithSpace, wrapAsset } from '@core/utils';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Avatar } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { memo, useEffect } from 'react';
import { NoResults } from '../NoResults';
import { ratingSt } from '../style.css';

export const ResultsRank100 = memo(() => {
  const { top100 } = useStoreMap({
    store: $rating,
    keys: [],
    fn: rS => {
      return {
        top100: rS.top100,
      };
    },
  });
  const listFetching = useStore(getTop100RankFX.pending);

  useEffect(() => {
    getTop100RankFX();
  }, []);

  if (!top100.length) return <NoResults listFetching={listFetching} />;

  return (
    <div className={ratingSt.content}>
      {top100.map((top100r, index) => (
        <div key={top100r.id} className={ratingSt.cell}>
          <div className={contentCenter({ direction: 'row', gap: '1', p: '0' })}>
            <p className={typography({ variant: 'small' })}>{index + 1}</p>
            <Avatar size={40} src={top100r.avatar} />
            <p className={typography({ variant: 'small', truncate: true })} style={{ maxWidth: '140px' }}>
              {top100r.firstName ?? top100r.lastName}
            </p>
          </div>
          <div className={contentCenter({ direction: 'row', gap: '1', justifyContent: 'sb', p: '0' })}>
            <div className={contentCenter({ direction: 'row', p: '0' })}>
              <p className={typography({ variant: 'elo', m: 'l.5' })}>{numberWithSpace(top100r.pts)}</p>
              <img src={wrapAsset('/imgs/trophy.png')} alt="trophy" width="20" height="20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
