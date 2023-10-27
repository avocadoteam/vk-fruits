import { isDev } from '@core/constants';
import { FruitsPaidFeatureTypeUI } from '@core/game/types';
import { OrderBoxShowingStatus } from '@vkontakte/vk-bridge';
import { vkBridge } from './instance';

export const buyPaidFeature = (feature: FruitsPaidFeatureTypeUI): Promise<{ status: OrderBoxShowingStatus }> =>
  isDev ? Promise.resolve({ status: 'success' }) : vkBridge.send('VKWebAppShowOrderBox', { type: 'item', item: feature });
