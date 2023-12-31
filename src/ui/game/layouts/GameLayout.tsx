import { $game, setGameResult, setLobbyId, updateTables } from '@core/api/game/store.game';
import { $config } from '@core/config';
import { PlayerJoinPayload } from '@core/game/player';
import { joinRoom } from '@core/sockets/game';
import { client } from '@core/sockets/receiver';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { FPanel } from '@ui/layout/router';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useStoreMap } from 'effector-react';
import { memo, useEffect } from 'react';
import { GameBoard } from '../GameBoard';
import { GamePlayers } from '../GamePlayers';
import { PanelHeaderBackInGame } from '../PanelBack';

export const GameLayout = memo(() => {
  const routeNavigator = useRouteNavigator();
  const params = useParams();
  const lobbyId = params?.id;

  const { wrongRoom } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        wrongRoom: g.wrongRoom,
      };
    },
  });

  const { userInfo } = useStoreMap({
    store: $config,
    keys: [],
    fn: cf => {
      const userInfo: PlayerJoinPayload = {
        selectedSkin: cf.selectedSkin,
      };

      return {
        userInfo,
      };
    },
  });

  useEffect(() => {
    client.updateTable = data => {
      updateTables(data.tables);
    };
    client.gameResults = data => {
      setGameResult({
        gameType: data.gameType,
        isDraw: data.isDraw,
        result: data.result,
      });
      updateTables(data.tables);
      routeNavigator.replace(`/${FPanel.GameResults}`);
    };
  }, []);

  useEffect(() => {
    if (lobbyId) {
      setLobbyId(lobbyId);
      joinRoom(lobbyId, userInfo);
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
      <PanelHeaderBackInGame />
      <GamePlayers />
      <GameBoard />
    </>
  );
});
