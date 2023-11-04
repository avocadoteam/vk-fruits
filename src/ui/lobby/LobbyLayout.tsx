import { getUserLobbyFX } from '@core/api/game/effects.game';
import { $game, setPlayerDisconnected, updateTables } from '@core/api/game/store.game';
import { $config } from '@core/config';
import { appId } from '@core/constants';
import { PlayerJoinPayload } from '@core/game/player';
import { useOpenWallShare } from '@core/hooks/useShareWall';
import { confirmReady, joinRoom, leaveRoom } from '@core/sockets/game';
import { client } from '@core/sockets/receiver';
import { wrapAsset } from '@core/utils';
import { noop } from '@core/utils/noop';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { FPanel } from '@ui/layout/router';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Icon24CheckCircleFillGreen } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Avatar, Button, FixedLayout } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { memo, useCallback, useEffect } from 'react';

export const LobbyLayout = memo(() => {
  const routeNavigator = useRouteNavigator();

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
  const { shareWall } = useOpenWallShare(`https://vk.com/app${appId}#/${FPanel.LobbyInvited}/${lobbyId}`);

  const { userInfo, wsConnected, userId } = useStoreMap({
    store: $config,
    keys: [],
    fn: cf => {
      const userInfo: PlayerJoinPayload = {
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
  const me = gameRoom.find(g => g.userId === userId);
  const isPlayerReady = !!me?.confirmed;

  useEffect(() => {
    client.playerLeft = data => {
      setPlayerDisconnected(data.userId);
    };

    return () => {
      client.playerLeft = noop;
    };
  }, []);

  useEffect(() => {
    if (wsConnected) {
      getUserLobbyFX();
    }
  }, [wsConnected]);

  useEffect(() => {
    if (lobbyId) {
      joinRoom(lobbyId, userInfo);
      client.updateTable = data => {
        updateTables(data.tables);

        routeNavigator.replace(`/${FPanel.Game}/${lobbyId}`);
      };
    }

    return () => {
      client.updateTable = noop;
    };
  }, [lobbyId, routeNavigator, userInfo]);

  const addFriend = useCallback(() => {
    if (opponent && lobbyId) return;

    shareWall();
  }, [opponent, shareWall, lobbyId]);

  return (
    <>
      <PanelHeaderBack onCb={() => leaveRoom(lobbyId)} />
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
              <Avatar
                size={96}
                src={me?.avatar}
                children={
                  isPlayerReady ? (
                    <Avatar.Badge>
                      <Icon24CheckCircleFillGreen />
                    </Avatar.Badge>
                  ) : null
                }
              />
              <p className={typography({ variant: 'small' })}>Вы</p>
            </div>
            <p className={typography({ variant: 'head', transform: 'up', mix: true })}>vs</p>
            <div className={contentCenter({ gap: '1' })}>
              <Avatar
                size={96}
                src={opponent ? opponent.avatar : wrapAsset('/imgs/addBig.svg')}
                style={{
                  backgroundColor: 'transparent !important',
                  cursor: opponent ? undefined : 'pointer',
                }}
                onClick={addFriend}
                children={
                  opponent?.confirmed ? (
                    <Avatar.Badge>
                      <Icon24CheckCircleFillGreen />
                    </Avatar.Badge>
                  ) : null
                }
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
          <p className={typography({ variant: 'small', shadow: true, transform: 'up', mix: true, align: 'center' })}>
            Для победы нужно набрать 1000 очков
          </p>
          <Button
            onClick={() => confirmReady(lobbyId)}
            disabled={!opponent || isPlayerReady}
            style={{ margin: '1rem 0 3rem' }}
            size="l"
            stretched
            mode="primary"
          >
            Начать игру
          </Button>
        </div>
      </FixedLayout>
    </>
  );
});
