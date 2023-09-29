import { EAdsFormats } from '@vkontakte/vk-bridge';
import { vkBridge } from './instance';

export const getAdsData = () => vkBridge.send('VKWebAppCheckNativeAds');
export const showAdsBanner = () => vkBridge.send('VKWebAppShowBannerAd');

export const openRewardAds = (): Promise<{ result: boolean }> =>
  vkBridge.send('VKWebAppShowNativeAds', { ad_format: EAdsFormats.REWARD });
