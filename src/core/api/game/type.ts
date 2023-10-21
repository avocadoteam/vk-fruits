import { FruitsGameUserData, FruitsItemName } from '@core/game/player';

export type GameState = {
  userInfo: {
    skins: FruitsItemName[];
    pts: number;
    lvl: number;
  };
  lobbyId: string;
  gameRoom: FruitsGameUserData[];
  wrongRoom: boolean;
};
