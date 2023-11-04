import { BannerAdLocation, EAdsFormats } from '@vkontakte/vk-bridge';
import { vkBridge } from './instance';

export const getAdsData = () => vkBridge.send('VKWebAppCheckNativeAds');

export const checkAdsBanner = () => vkBridge.send('VKWebAppCheckBannerAd');
export const showAdsBanner = () => vkBridge.send('VKWebAppShowBannerAd', { banner_location: BannerAdLocation.BOTTOM });

export const openRewardAds = () => vkBridge.send('VKWebAppShowNativeAds', { ad_format: EAdsFormats.REWARD });
