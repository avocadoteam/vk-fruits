import { memo } from 'react';
import { GameBoard } from './GameBoard';
import { GamePlayers } from './GamePlayers';
import { PanelHeaderBackInGame } from './PanelBack';

export const GameLayout = memo(() => {
  return (
    <>
      <PanelHeaderBackInGame />
      <GamePlayers />
      <GameBoard />
    </>
  );
});
