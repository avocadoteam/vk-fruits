import { AX } from '@core/data/fetcher';
import { qVK } from '@core/data/q-params';
import { gameDomain } from './domain';

export const getUserLobby = gameDomain.createEffect(async () => {
  const { data } = await AX.post('/fruits/lobby' + qVK);
  return data;
});
