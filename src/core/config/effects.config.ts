import { FruitsItemName } from '@core/game/player';
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
export const setUserSkin = appConfigDomain.createEffect(async (skin: FruitsItemName) => {
  await setStorageValue(Skeys.SelectedSkin, skin);
});
export const getStorageKeys = appConfigDomain.createEffect(async () => {
  const data = await getUserStorageKeys([Skeys.Welcome, Skeys.SecondVisit, Skeys.SelectedSkin]);

  return {
    sawWelcome: data.keys.some(v => v.key === Skeys.Welcome && v.value === 'yes'),
    secondVisit: data.keys.some(v => v.key === Skeys.SecondVisit && v.value === 'yes'),
    selectedSkin:
      (data.keys.find(v => v.key === Skeys.SelectedSkin && !!v.value)?.value as FruitsItemName) ?? 'skin__fruits',
  };
});

export const getUserDataFX = appConfigDomain.createEffect(async () => {
  const user = await getUserData();
  return user;
});
