import { getFriendsRatingFX } from '@core/api/rating/effects.rating';
import { $rating } from '@core/api/rating/store.rating';
import { numberWithSpace, wrapAsset } from '@core/utils';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Avatar, Cell } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { memo } from 'react';
import { NoResults } from '../NoResults';

export const ResultsFriends = memo(() => {
  const { friends } = useStoreMap({
    store: $rating,
    keys: [],
    fn: rS => {
      return {
        friends: rS.friends,
      };
    },
  });
  const listFetching = useStore(getFriendsRatingFX.pending);

  if (!friends.length) return <NoResults listFetching={listFetching} />;

  return (
    <>
      {friends.map((friendsr, index) => (
        <Cell
          key={friendsr.id}
          before={
            <div className={contentCenter({ direction: 'row', gap: '1' })}>
              <p className={typography({ variant: 'small' })}>{index + 1}</p>
              <Avatar size={40} src={friendsr.avatar} />
            </div>
          }
          size={32}
          hasActive={false}
        >
          <div className={contentCenter({ direction: 'row', gap: '1', justifyContent: 'sb' })}>
            <p className={typography({ variant: 'small' })}>{friendsr.firstName ?? friendsr.lastName}</p>
            <div className={contentCenter({ direction: 'row', gap: '1' })}>
              <img src={wrapAsset('/imgs/trophy.png')} alt="trophy" width="20" height="20" />
              <p className={typography({ variant: 'elo', m: 'l.5' })}>{numberWithSpace(friendsr.pts)}</p>
            </div>
          </div>
        </Cell>
      ))}
    </>
  );
});
