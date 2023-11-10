import { itemsSkins } from '@core/game/constants';
import { FruitsGameTable, FruitsGameUserData } from '@core/game/player';
import { FruitItems } from '@core/game/types';
import { client } from '@core/sockets/receiver';
import { gameDomain } from './domain';
import { getBotLobbyFX, getUserInfoFX, getUserLobbyFX } from './effects.game';
import { GameState } from './type';

export const resetGame = gameDomain.createEvent();
export const setLobbyId = gameDomain.createEvent<string>();
export const updateTables = gameDomain.createEvent<FruitsGameTable[]>();
export const setGameResult = gameDomain.createEvent<GameState['gameResult']>();
export const setPlayerDisconnected = gameDomain.createEvent<number>();
const addPlayerLobby = gameDomain.createEvent<FruitsGameUserData[]>();
const setPlayerReady = gameDomain.createEvent<number>();
const setWrongRoom = gameDomain.createEvent<boolean>();

export const $game = gameDomain.createStore<GameState>({
  userInfo: {
    skins: [],
    lvl: 1,
    pts: 0,
    countGifts: 0,
    hasAllSkins: false,
    skinsToBuyMaxCount: 2,
    hasPremium: false,
    daysInRow: 1,
    hasSevenDay: false,
    wins: 0,
    looses: 0,
    hasAdsSkin: false,
  },
  lobbyId: '',
  gameRoom: [],
  wrongRoom: false,
  tables: [],
  gameResult: null,
});

$game.on(getUserInfoFX.doneData, (state, data) => ({
  ...state,
  userInfo: data,
}));
$game.on([getUserLobbyFX.doneData, getBotLobbyFX.doneData], (state, data) => ({
  ...state,
  lobbyId: data,
}));
$game.on(addPlayerLobby, (state, users) => ({
  ...state,
  gameRoom: users,
  wrongRoom: false,
}));
$game.on(setPlayerReady, (state, userId) => ({
  ...state,
  gameRoom: state.gameRoom.map(g => (g.userId === userId ? { ...g, confirmed: true } : g)),
}));
$game.on(setPlayerDisconnected, (state, userId) => ({
  ...state,
  gameRoom: state.gameRoom.filter(g => g.userId !== userId),
}));
$game.on(setWrongRoom, (state, wrongRoom) => ({
  ...state,
  wrongRoom,
}));
$game.on(setLobbyId, (state, lobbyId) => ({
  ...state,
  lobbyId,
}));
$game.on(setGameResult, (state, gameResult) => ({
  ...state,
  gameResult,
}));
$game.on(resetGame, state => ({
  ...state,
  tables: [],
  wrongRoom: false,
  gameResult: null,
}));

$game.on(updateTables, (state, tables) => ({
  ...state,
  tables: tables.map(t => {
    const user = state.gameRoom.find(g => g.userId === t.userId);
    const [, skinName] = user?.selectedSkin.split('__') ?? ['', 'fruits'];
    const pack = itemsSkins[skinName as keyof FruitItems];
    return {
      ...t,
      uiTable: t.table.map(p => {
        if (typeof p === 'number') {
          return pack.find(s => s.points === p) ?? null;
        }

        const freezedFruit = pack.find(s => s.points === p.freezingFruit);
        if (freezedFruit) {
          return {
            ...freezedFruit,
            isFreezed: true,
          };
        }
        return null;
      }),
    };
  }),
}));

client.playerJoined = data => {
  addPlayerLobby(data.users);
};

client.wrongRoom = () => {
  setWrongRoom(true);
};
client.playerConfirmed = data => {
  setPlayerReady(data.userId);
};
