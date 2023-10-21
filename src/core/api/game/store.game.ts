import { FruitsGameUserData } from '@core/game/player';
import { client } from '@core/sockets/receiver';
import { gameDomain } from './domain';
import { getUserInfoFX, getUserLobbyFX } from './effects.game';
import { GameState } from './type';

const addPlayerLobby = gameDomain.createEvent<FruitsGameUserData[]>();
const setPlayerReady = gameDomain.createEvent<number>();
export const removePlayerLobby = gameDomain.createEvent<number>();
const setWrongRoom = gameDomain.createEvent<boolean>();

export const $game = gameDomain.createStore<GameState>({
  userInfo: {
    skins: [],
    lvl: 1,
    pts: 0,
  },
  lobbyId: '',
  gameRoom: [],
  wrongRoom: false,
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
