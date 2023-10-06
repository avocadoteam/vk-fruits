import { $rating } from '@core/api/rating/store.rating';
import { numberWithSpace } from '@core/utils';
import { typography } from '@ui/theme/typography.css';
import { Avatar, Cell } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { memo } from 'react';
import { NoResultsRatingFriends } from './NoResults';

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

  if (!friends.length) return <NoResultsRatingFriends />;

  return (
    <>
      {friends.map((friendsr, index) => (
        <Cell
          key={friendsr.id}
          before={
            <div>
              {index + 1}
              <Avatar size={40} src={friendsr.avatar} />
            </div>
          }
          size={32}
        >
          <div>
            {friendsr.firstName ?? friendsr.lastName}
            <img src="/imgs/trophy.png" alt="trophy" width="20" height="20" />
            <p className={typography({ variant: 'elo', m: 'l.5' })}>{numberWithSpace(friendsr.points)}</p>
          </div>
        </Cell>
      ))}
    </>
  );
});
