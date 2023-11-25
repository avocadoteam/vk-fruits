import { $game, setLobbyId, setPlayerDisconnected, updateTables } from '@core/api/game/store.game';
import { $config } from '@core/config';
import { PlayerJoinPayload } from '@core/game/player';
import { confirmReady, joinRoom, leaveRoom } from '@core/sockets/game';
import { client } from '@core/sockets/receiver';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { noop } from '@core/utils/noop';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { FPanel } from '@ui/layout/router';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Icon24CheckCircleFillGreen } from '@vkontakte/icons';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Avatar, Button, FixedLayout, Spinner } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { memo, useEffect } from 'react';

export const GameFoundLayout = memo(() => {
  const params = useParams();
  const routeNavigator = useRouteNavigator();

  const {
    gameRoom,
    wrongRoom,
    lobbyId: stateLobbyID,
  } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        gameRoom: g.gameRoom,
        wrongRoom: g.wrongRoom,
        lobbyId: g.lobbyId,
      };
    },
  });

  const lobbyId = params?.id ?? stateLobbyID;

  const { userInfo, userId } = useStoreMap({
    store: $config,
    keys: [],
    fn: cf => {
      const userInfo: PlayerJoinPayload = {
        selectedSkin: cf.selectedSkin,
      };

      return {
        userInfo,
        userId: cf.user?.id ?? 0,
      };
    },
  });

  const opponent = gameRoom.find(g => g.userId !== userId);
  const me = gameRoom.find(g => g.userId === userId);
  const isPlayerReady = !!me?.confirmed;

  useEffect(() => {
    client.backToSearch = leaveReason => {
      addToastToQueue({
        id: ToastId.Game,
        toast: {
          type: 'warn',
          title:
            leaveReason === 'non-confirm'
              ? 'Кто-то не подтвердил готовность. Вы вернулись в очередь.'
              : 'Вы вернулись в очередь.',
        },
      });

      routeNavigator.replace(`/${FPanel.Search}`);
    };
    client.playerLeftRoom = data => {
      addToastToQueue({
        id: ToastId.Game,
        toast: {
          type: 'warn',
          title: 'Вы вернулись в очередь.',
        },
      });

      setPlayerDisconnected(data.userId);

      routeNavigator.replace(`/${FPanel.Search}`);
    };

    return () => {
      client.backToSearch = noop;
      client.playerLeftRoom = noop;
    };
  }, [routeNavigator]);

  useEffect(() => {
    client.gameStarted = () => {
      routeNavigator.replace(`/${FPanel.Game}/${lobbyId}`);
    };
    return () => {
      client.gameStarted = noop;
    };
  }, [lobbyId, routeNavigator]);

  useEffect(() => {
    if (lobbyId) {
      setLobbyId(lobbyId);
      joinRoom(lobbyId, userInfo);
      client.updateTable = data => {
        updateTables(data.tables);
      };
    }
  }, [lobbyId, userInfo]);

  if (!lobbyId || wrongRoom) {
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
            <p className={typography({ variant: 'head', transform: 'up', m: 'b' })}>Такой игры не существует</p>
          </div>
        </div>
      </>
    );
  }

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
          <p className={typography({ variant: 'head', transform: 'up', m: 'b' })}>
            {opponent?.userId === 0 ? 'Игра с ботом' : 'Рейтинговая игра'}
          </p>

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
                src={opponent?.avatar}
                children={
                  opponent?.confirmed ? (
                    <Avatar.Badge>
                      <Icon24CheckCircleFillGreen />
                    </Avatar.Badge>
                  ) : !opponent ? (
                    <Avatar.Overlay visibility="always" theme="dark">
                      <Spinner />
                    </Avatar.Overlay>
                  ) : null
                }
              />
              <p className={typography({ variant: 'small' })}>
                {opponent ? opponent.firstName || opponent.lastName : 'Оппонент'}
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
            disabled={isPlayerReady}
            onClick={() => confirmReady(lobbyId)}
            style={{ margin: '1rem 0 3rem' }}
            size="l"
            stretched
            mode="primary"
          >
            {isPlayerReady ? 'Ожидание других участников' : 'Начать игру'}
          </Button>
        </div>
      </FixedLayout>
    </>
  );
});
