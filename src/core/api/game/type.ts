import { FruitsGameUserData, FruitsItemName, TableData } from '@core/game/player';
import { GameItemNames } from '@core/game/types';

export type GameState = {
  userInfo: {
    skins: FruitsItemName[];
    pts: number;
    lvl: number;
  };
  lobbyId: string;
  gameRoom: FruitsGameUserData[];
  wrongRoom: boolean;
  tables: (TableData & {
    uiTable: ({ name: GameItemNames; points: number; src: string } | null)[];
  })[];
  gameResult: {
    gameType: 'duo' | 'rank';
    isDraw: boolean;
    result: [winner: number, looser: number];
  } | null;
};
