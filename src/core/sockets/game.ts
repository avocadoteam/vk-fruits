import { setWSConnected } from '@core/config';
import { BASE_URL } from '@core/constants';
import { FruitsGameAction, PlayerJoinPayload } from '@core/game/player';
import io, { Socket } from 'socket.io-client';
import { initCallbacks } from './callbacks';

const ns = `${BASE_URL}/fruits`;

let connected = false;

let socket: Socket;

export const connectWS = (query: string) => {
  console.debug('connecting');
  if (connected) return;

  socket = io(ns, {
    query: {
      sign: query.replace(/\?vk_/g, 'vk_'),
    },
  });

  initCallbacks(socket);
  console.debug(socket);
  socket.on('connect', () => {
    console.debug('ws connected');
    setWSConnected(true);
    connected = true;
  });
  socket.on('disconnect', () => {
    console.debug('ws disconnected');
    setWSConnected(false);

    connected = false;
  });
};

export const searchGame = () => {
  socket.emit('searchGame');
};

export const joinRoom = (roomId: string, userInfo: PlayerJoinPayload) => {
  socket.emit('joinRoom', { roomId, userInfo });
};

export const leaveRoom = (roomId: string) => {
  socket.emit('leaveRoom', { roomId });
};
export const confirmReady = (roomId: string) => {
  socket.emit('confirmReady', { roomId });
};

export const tickActionEvent = (payload: FruitsGameAction) => {
  socket.emit('actionEvent', payload);
};
