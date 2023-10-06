import { $rating } from '@core/api/rating/store.rating';
import { numberWithSpace } from '@core/utils';
import { typography } from '@ui/theme/typography.css';
import { Avatar, Cell } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { memo } from 'react';
import { NoResultsRankTop100 } from './NoResults';

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

  if (!top100.length) return <NoResultsRankTop100 />;

  return (
    <>
      {top100.map((top100r, index) => (
        <Cell
          key={top100r.id}
          before={
            <div>
              {index + 1}
              <Avatar size={40} src={top100r.avatar} />
            </div>
          }
          size={32}
        >
          <div>
            {top100r.firstName ?? top100r.lastName}
            <img src="/imgs/trophy.png" alt="trophy" width="20" height="20" />
            <p className={typography({ variant: 'elo', m: 'l.5' })}>{numberWithSpace(top100r.points)}</p>
          </div>
        </Cell>
      ))}
    </>
  );
});
