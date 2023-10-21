import { FruitsGameUserData, TableData } from '@core/game/player';
import { clientPerformCallback } from './callbacks';

export const client = clientPerformCallback(m => ({
  foundGameId: m<(data: { roomId: string }) => void>(),
  playerJoined: m<(data: { users: FruitsGameUserData[] }) => void>(),
  playerLeft: m<(data: { userId: number }) => void>(),
  playerConfirmed: m<(data: { userId: number }) => void>(),
  updateTable: m<(data: { tables: TableData[] }) => void>(),
  gameResults: m<(data: { tables: TableData[] }) => void>(),
  errorMessage: m<(error: string) => void>(),
  activeDevice: m<() => void>(),
  wrongRoom: m<() => void>(),
}));
