import { AX } from '@core/data/fetcher';
import { qVK } from '@core/data/q-params';
import { gameDomain } from './domain';

export const getUserLobbyFX = gameDomain.createEffect(async () => {
  const { data } = await AX.post('/fruits/lobby' + qVK);

  return data.data.roomId;
});
export const getUserInfoFX = gameDomain.createEffect(async () => {
  const { data } = await AX.get('/fruits/user-info' + qVK);
  return data.data;
});
