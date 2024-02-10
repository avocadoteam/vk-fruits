import { $game } from '@core/api/game/store.game';
import { $rating } from '@core/api/rating/store.rating';
import { $config } from '@core/config';
import { numberWithSpace, wrapAsset } from '@core/utils';
import { clsx } from '@core/utils/clsx';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Avatar } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { ratingSt } from '../style.css';

type Props = {
  positionInList: number | null;
};

export const PersonalPosition = ({ positionInList }: Props) => {
  const { userPosition } = useStoreMap({
    store: $rating,
    keys: [],
    fn: rS => {
      return {
        userPosition: rS.userPosition,
      };
    },
  });
  const { avatar, firstName, lastName } = useStoreMap({
    store: $config,
    keys: [],
    fn: rS => {
      return {
        avatar: rS.user?.photo_100 ?? '',
        firstName: rS.user?.first_name ?? '',
        lastName: rS.user?.last_name ?? '',
      };
    },
  });
  const { pts } = useStoreMap({
    store: $game,
    keys: [],
    fn: rS => {
      return {
        pts: rS.userInfo.pts,
      };
    },
  });

  if (!userPosition) {
    return null;
  }

  return (
    <>
      <p className={clsx(typography({ variant: 'small', shadow: true }), ratingSt.text)}>Ваша позиция в рейтинге</p>
      <div className={ratingSt.content}>
        <div className={ratingSt.cell()}>
          <div className={contentCenter({ direction: 'row', gap: '1', p: '0' })}>
            <p
              className={typography({ variant: 'small' })}
              style={{ width: '28px', fontSize: Number(userPosition) > 100 ? '.75rem' : undefined }}
            >
              {positionInList ?? Number(userPosition) > 100 ? '100+' : userPosition}
            </p>
            <Avatar size={40} src={avatar} />
            <p className={typography({ variant: 'small', truncate: true })} style={{ maxWidth: '140px' }}>
              {firstName || lastName}
            </p>
          </div>
          <div className={contentCenter({ direction: 'row', gap: '1', justifyContent: 'sb', p: '0' })}>
            <div className={contentCenter({ direction: 'row', p: '0' })}>
              <p className={typography({ variant: 'elo', m: 'l.5' })}>{numberWithSpace(pts)}</p>
              <img src={wrapAsset('/imgs/trophy.png')} alt="trophy" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
