import { getSearchParams } from '@core/data/searchParams';

const iosPlatformIdentifications = ['mobile_ipad', 'mobile_iphone', 'mobile_iphone_messenger'];
export const useIsIosApp = () => {
  const platform = getSearchParams().get('vk_platform') ?? '';
  return iosPlatformIdentifications.includes(platform);
};
