import { setGameResult, updateTables } from '@core/api/game/store.game';
import { client } from '@core/sockets/receiver';
import { FPanel } from '@ui/layout/router';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { memo, useEffect } from 'react';
import { GameBoard } from '../GameBoard';
import { GamePlayers } from '../GamePlayers';
import { PanelHeaderBackInGame } from '../PanelBack';

export const GameLayout = memo(() => {
  const routeNavigator = useRouteNavigator();

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
  return (
    <>
      <PanelHeaderBackInGame />
      <GamePlayers />
      <GameBoard />
    </>
  );
});
