import { $game } from '@core/api/game/store.game';
import { $userId } from '@core/config';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Avatar, Spinner } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';

export const GamePlayers = () => {
  const { tables, gameRoom } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        tables: g.tables,
        gameRoom: g.gameRoom,
      };
    },
  });
  const userId = useStore($userId);
  const me = gameRoom.find(g => g.userId === userId);
  const opponent = gameRoom.find(g => g.userId !== userId);
  const myTable = tables.find(g => g.userId === userId);
  const opponentTable = tables.find(g => g.userId !== userId);

  return (
    <div className={contentCenter({ direction: 'row', justifyContent: 'sb' })}>
      <div className={contentCenter({ direction: 'row', gap: '1' })}>
        <Avatar size={48} src={me?.avatar} />
        <p className={typography({ variant: 'head' })}>{myTable?.points ?? 0}</p>
      </div>
      <p className={typography({ variant: 'head', transform: 'up', mix: true })}>vs</p>

      <div className={contentCenter({ direction: 'row', gap: '1' })}>
        <p className={typography({ variant: 'head' })}>{opponentTable?.points ?? 0}</p>
        <Avatar
          size={48}
          src={opponent?.avatar}
          children={
            !opponent ? (
              <Avatar.Overlay visibility="always" theme="dark">
                <Spinner />
              </Avatar.Overlay>
            ) : null
          }
        />
      </div>
    </div>
  );
};
