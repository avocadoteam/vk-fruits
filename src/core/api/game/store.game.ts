import { itemsSkins } from '@core/game/constants';
import { FruitsGameUserData, TableData } from '@core/game/player';
import { FruitItems } from '@core/game/types';
import { client } from '@core/sockets/receiver';
import { gameDomain } from './domain';
import { getUserInfoFX, getUserLobbyFX } from './effects.game';
import { GameState } from './type';

export const resetGame = gameDomain.createEvent();
export const removePlayerLobby = gameDomain.createEvent<number>();
const addPlayerLobby = gameDomain.createEvent<FruitsGameUserData[]>();
const setPlayerReady = gameDomain.createEvent<number>();
const setWrongRoom = gameDomain.createEvent<boolean>();
const updateTables = gameDomain.createEvent<TableData[]>();
const setLobbyId = gameDomain.createEvent<string>();

export const $game = gameDomain.createStore<GameState>({
  userInfo: {
    skins: [],
    lvl: 1,
    pts: 0,
  },
  lobbyId: '',
  gameRoom: [],
  wrongRoom: false,
  tables: [],
});

$game.on(getUserInfoFX.doneData, (state, data) => ({
  ...state,
  userInfo: data,
}));
$game.on(getUserLobbyFX.doneData, (state, data) => ({
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
$game.on(setWrongRoom, (state, wrongRoom) => ({
  ...state,
  wrongRoom,
}));
$game.on(removePlayerLobby, (state, userId) => ({
  ...state,
  gameRoom: state.gameRoom.filter(gr => gr.userId !== userId),
}));
$game.on(setLobbyId, (state, lobbyId) => ({
  ...state,
  lobbyId,
}));
$game.on(resetGame, state => ({
  ...state,
  gameRoom: [],
  lobbyId: '',
  tables: [],
  wrongRoom: false,
}));

$game.on(updateTables, (state, tables) => ({
  ...state,
  tables: tables.map(t => {
    const user = state.gameRoom.find(g => g.userId === t.userId);
    const [, skinName] = user?.selectedSkin.split('__') ?? [];
    const pack = itemsSkins[skinName as keyof FruitItems];
    return {
      ...t,
      uiTable: t.table.map(p => pack.find(s => s.points === p) ?? null),
    };
  }),
}));

client.playerJoined = data => {
  addPlayerLobby(data.users);
};
client.playerLeft = data => {
  removePlayerLobby(data.userId);
};
client.wrongRoom = () => {
  setWrongRoom(true);
};
client.playerConfirmed = data => {
  setPlayerReady(data.userId);
};
client.updateTable = data => {
  updateTables(data.tables);
};
client.foundGameId = data => {
  setLobbyId(data.roomId);
};
