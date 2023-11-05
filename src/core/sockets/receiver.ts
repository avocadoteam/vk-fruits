import { FruitsGameTable, FruitsGameUserData } from '@core/game/player';
import { clientPerformCallback } from './callbacks';

export const client = clientPerformCallback(m => ({
  foundGameId: m<(data: { roomId: string }) => void>(),
  playerJoined: m<(data: { users: FruitsGameUserData[] }) => void>(),
  playerLeft: m<(data: { userId: number }) => void>(),
  playerLeftRoom: m<(data: { userId: number }) => void>(),
  playerConfirmed: m<(data: { userId: number }) => void>(),
  updateTable: m<(data: { tables: FruitsGameTable[] }) => void>(),
  gameResults:
    m<
      (data: {
        tables: FruitsGameTable[];
        gameType: 'duo' | 'rank';
        isDraw: boolean;
        result: [winner: number, looser: number];
      }) => void
    >(),
  errorMessage: m<(error: string) => void>(),
  activeDevice: m<() => void>(),
  wrongRoom: m<() => void>(),
  backToSearch: m<(leaveReason: 'non-confirm' | 'disconnect') => void>(),
}));
