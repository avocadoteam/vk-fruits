import { getFriendsRatingFX } from '@core/api/rating/effects.rating';
import { $rating } from '@core/api/rating/store.rating';
import { numberWithSpace, wrapAsset } from '@core/utils';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Avatar } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { memo } from 'react';
import { NoResults } from '../NoResults';
import { ratingSt } from '../style.css';

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
    <div className={ratingSt.content}>
      {friends.map((friend, index) => (
        <div key={friend.id} className={ratingSt.cell}>
          <div className={contentCenter({ direction: 'row', gap: '1', p: '0' })}>
            <p className={typography({ variant: 'small' })}>{index + 1}</p>
            <Avatar size={40} src={friend.avatar} />
            <p className={typography({ variant: 'small', truncate: true })} style={{ maxWidth: '140px' }}>
              {friend.firstName ?? friend.lastName}
            </p>
          </div>
          <div className={contentCenter({ direction: 'row', gap: '1', justifyContent: 'sb', p: '0' })}>
            <div className={contentCenter({ direction: 'row', p: '0' })}>
              <p className={typography({ variant: 'elo', m: 'l.5' })}>{numberWithSpace(friend.pts)}</p>
              <img src={wrapAsset('/imgs/trophy.png')} alt="trophy" width="20" height="20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
