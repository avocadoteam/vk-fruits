import { getUserLobbyFX } from '@core/api/game/effects.game';
import { $game, removePlayerLobby } from '@core/api/game/store.game';
import { $config } from '@core/config';
import { appId } from '@core/constants';
import { PlayerJoinPayload } from '@core/game/player';
import { useOpenWallShare } from '@core/hooks/useShareWall';
import { joinRoom, leaveRoom } from '@core/sockets/game';
import { wrapAsset } from '@core/utils';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Avatar, Button, FixedLayout } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { memo, useCallback, useEffect } from 'react';

export const LobbyLayout = memo(() => {
  const { lobbyId, gameRoom } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        lobbyId: g.lobbyId,
        gameRoom: g.gameRoom,
      };
    },
  });
  const { shareWall } = useOpenWallShare(`https://vk.com/app${appId}#/lobby${lobbyId}`);

  const { userInfo, wsConnected, userId } = useStoreMap({
    store: $config,
    keys: [],
    fn: cf => {
      const userInfo: PlayerJoinPayload = {
        avatar: cf.user?.photo_200 ?? '',
        firstName: cf.user?.first_name ?? '',
        lastName: cf.user?.last_name ?? '',
        selectedSkin: cf.selectedSkin,
      };

      return {
        userInfo,
        wsConnected: cf.wsConnected,
        userId: cf.user?.id ?? 0,
      };
    },
  });

  const opponent = gameRoom.find(g => g.userId !== userId);

  useEffect(
    () => () => {
      removePlayerLobby(userId);
      leaveRoom(lobbyId);
    },
    [lobbyId, userId],
  );
  useEffect(() => {
    if (wsConnected) {
      getUserLobbyFX();
    }
  }, [wsConnected]);

  useEffect(() => {
    if (lobbyId) {
      joinRoom(lobbyId, userInfo);
    }
  }, [lobbyId]);

  const addFriend = useCallback(() => {
    if (opponent && lobbyId) return;

    shareWall();
  }, [opponent, shareWall, lobbyId]);

  return (
    <>
      <PanelHeaderBack />
      <div>
        <div
          style={{
            height: '40vh',
          }}
          className={contentCenter()}
        >
          <p className={typography({ variant: 'head', transform: 'up', m: 'b' })}>Игра с другом</p>

          <div className={contentCenter({ direction: 'row' })}>
            <div className={contentCenter({ gap: '1' })}>
              <Avatar size={96} src={gameRoom.find(g => g.userId === userId)?.avatar} />
              <p className={typography({ variant: 'small' })}>Вы</p>
            </div>
            <p>vs</p>
            <div className={contentCenter({ gap: '1' })}>
              <Avatar
                size={96}
                src={opponent ? opponent.avatar : wrapAsset('/imgs/addBig.svg')}
                style={{
                  backgroundColor: 'transparent',
                }}
                onClick={addFriend}
              />
              <p className={typography({ variant: 'small' })}>
                {opponent ? opponent.firstName || opponent.lastName : 'Пригласить'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FixedLayout vertical="bottom">
        <div className={contentCenter()}>
          <Button disabled={gameRoom.length < 2} style={{ margin: '1rem 0 3rem' }} size="l" stretched mode="primary">
            Начать игру
          </Button>
        </div>
      </FixedLayout>
    </>
  );
});
