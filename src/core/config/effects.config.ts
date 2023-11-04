import { FruitsItemName } from '@core/game/player';
import { getAdsData, openRewardAds } from '@core/vk-bridge/ads';
import { Skeys, getUserData, getUserStorageKeys, setStorageValue } from '@core/vk-bridge/user';
import { appConfigDomain } from './domain';

export const finishWelcomeFX = appConfigDomain.createEffect(async () => {
  setStorageValue(Skeys.Welcome, 'yes');
});
export const setTapticVibration = appConfigDomain.createEffect(async (enable: 'yes' | 'no') => {
  await setStorageValue(Skeys.Taptic, enable);
});
export const setUserSkin = appConfigDomain.createEffect(async (skin: FruitsItemName) => {
  await setStorageValue(Skeys.SelectedSkin, skin);
});
export const getStorageKeys = appConfigDomain.createEffect(async () => {
  const data = await getUserStorageKeys([Skeys.Welcome, Skeys.SelectedSkin]);

  return {
    sawWelcome: data.keys.some(v => v.key === Skeys.Welcome && v.value === 'yes'),
    selectedSkin:
      (data.keys.find(v => v.key === Skeys.SelectedSkin && !!v.value)?.value as FruitsItemName) ?? 'skin__fruits',
  };
});

export const getUserDataFX = appConfigDomain.createEffect(async () => {
  const user = await getUserData();
  return user;
});

export const hasUserAdsFX = appConfigDomain.createEffect(async () => {
  const data = await getAdsData();
  return data.result;
});
export const openRewardAdsFX = appConfigDomain.createEffect(async () => {
  const data = await openRewardAds();
  return data.result;
});
