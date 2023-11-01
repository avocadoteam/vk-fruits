import { AX } from '@core/data/fetcher';
import { qVK } from '@core/data/q-params';
import { FruitsItemName } from '@core/game/player';
import { gameDomain } from './domain';

export const getUserLobbyFX = gameDomain.createEffect(async () => {
  const { data } = await AX.post('/fruits/lobby' + qVK);

  return data.data.roomId;
});
export const getUserInfoFX = gameDomain.createEffect(async () => {
  const { data } = await AX.get('/fruits/user-info' + qVK);
  return data.data;
});

export const getSkinFromGiftFX = gameDomain.createEffect(async () => {
  const { data } = await AX.get('/fruits/skin-from-gift' + qVK);
  return data.data as FruitsItemName;
});
export const getActivityGiftFX = gameDomain.createEffect(async () => {
  await AX.post('/fruits/gift/sevendays' + qVK);
});
