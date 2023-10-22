import { updateTables } from '@core/api/game/store.game';
import { client } from '@core/sockets/receiver';
import { memo, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { GamePlayers } from './GamePlayers';
import { PanelHeaderBackInGame } from './PanelBack';

export const GameLayout = memo(() => {
  useEffect(() => {
    client.updateTable = data => {
      updateTables(data.tables);
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
