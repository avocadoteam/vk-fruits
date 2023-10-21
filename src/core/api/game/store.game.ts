import { gameDomain } from './domain';
import { getUserInfoFX } from './effects.game';
import { GameState } from './type';

export const $game = gameDomain.createStore<GameState>({
  userInfo: {
    skins: [],
    lvl: 1,
    pts: 0,
  },
});

$game.on(getUserInfoFX.doneData, (state, data) => ({
  ...state,
  userInfo: data,
}));
