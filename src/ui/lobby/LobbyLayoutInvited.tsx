import { $game, removePlayerLobby } from '@core/api/game/store.game';
import { $config } from '@core/config';
import { PlayerJoinPayload } from '@core/game/player';
import { joinRoom, leaveRoom } from '@core/sockets/game';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import { Avatar, Button, FixedLayout } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { memo, useEffect } from 'react';

export const LobbyLayoutInvited = memo(() => {
  const params = useParams();

  const lobbyId = params?.id;
  const { gameRoom, wrongRoom } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        gameRoom: g.gameRoom,
        wrongRoom: g.wrongRoom,
      };
    },
  });

  const { userInfo, userId } = useStoreMap({
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
        userId: cf.user?.id ?? 0,
      };
    },
  });

  const opponent = gameRoom.find(g => g.userId !== userId);

  useEffect(
    () => () => {
      if (lobbyId) {
        removePlayerLobby(userId);
        leaveRoom(lobbyId);
      }
    },
    [lobbyId, userId],
  );

  useEffect(() => {
    if (lobbyId) {
      joinRoom(lobbyId, userInfo);
    }
  }, [lobbyId]);

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
            <p className={typography({ variant: 'head', transform: 'up', m: 'b' })}>Такого лобби не существует</p>
          </div>
        </div>
      </>
    );
  }

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
              <Avatar size={96} src={opponent?.avatar} />
              <p className={typography({ variant: 'small' })}>
                {opponent ? opponent.firstName || opponent.lastName : 'Друг'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FixedLayout vertical="bottom">
        <div className={contentCenter()}>
          <Button style={{ margin: '1rem 0 3rem' }} size="l" stretched mode="primary">
            Начать игру
          </Button>
        </div>
      </FixedLayout>
    </>
  );
});
