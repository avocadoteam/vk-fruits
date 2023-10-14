import { PlayerJoinPayload, TableData } from '@core/game/player';
import { clientPerformCallback } from './callbacks';

export const client = clientPerformCallback(m => ({
  foundGameId: m<(data: { roomId: string }) => void>(),
  playerJoined: m<(data: { userInfo: PlayerJoinPayload }) => void>(),
  playerLeft: m<(data: { userId: number }) => void>(),
  updateTable: m<(data: { tables: TableData[] }) => void>(),
  gameResults: m<(data: { tables: TableData[] }) => void>(),
  errorMessage: m<(error: string) => void>(),
  activeDevice: m<() => void>(),
}));
