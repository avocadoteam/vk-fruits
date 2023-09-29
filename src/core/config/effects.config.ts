import { getUserData, getUserStorageKeys, setStorageValue, Skeys } from '@core/vk-bridge/user';
import { appConfigDomain } from './domain';

export const finishWelcomeFX = appConfigDomain.createEffect(async () => {
  setStorageValue(Skeys.Welcome, 'yes');
});
export const setSecondVisitFX = appConfigDomain.createEffect(async () => {
  await setStorageValue(Skeys.SecondVisit, 'yes');
});
export const setTapticVibration = appConfigDomain.createEffect(async (enable: 'yes' | 'no') => {
  await setStorageValue(Skeys.Taptic, enable);
});
export const getStorageKeys = appConfigDomain.createEffect(async () => {
  const data = await getUserStorageKeys([Skeys.Welcome, Skeys.SecondVisit, Skeys.Taptic]);

  return {
    sawWelcome: data.keys.some(v => v.key === Skeys.Welcome && v.value === 'yes'),
    secondVisit: data.keys.some(v => v.key === Skeys.SecondVisit && v.value === 'yes'),
    taptic: data.keys.some(v => v.key === Skeys.Taptic && v.value === 'yes'),
  };
});

export const getUserDataFX = appConfigDomain.createEffect(async () => {
  const user = await getUserData();
  return user;
});
