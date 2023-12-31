import { FruitsGameTable, FruitsGameUserData, FruitsItemName } from '@core/game/player';
import { GameItemNames } from '@core/game/types';

export type GameState = {
  userInfo: {
    skins: FruitsItemName[];
    pts: number;
    lvl: number;
    hasAllSkins: boolean;
    hasPremium: boolean;
    countGifts: number;
    skinsToBuyMaxCount: number;
    daysInRow: number;
    hasSevenDay: boolean;
    hasAdsSkin: boolean;
    wins: number;
    looses: number;
  };
  lobbyId: string;
  gameRoom: FruitsGameUserData[];
  wrongRoom: boolean;
  tables: (FruitsGameTable & {
    uiTable: ({ name: GameItemNames; points: number; src: string; isFreezed?: boolean } | null)[];
  })[];
  gameResult: {
    gameType: 'duo' | 'rank' | 'bot';
    isDraw: boolean;
    result: [winner: number, looser: number];
  } | null;
};
