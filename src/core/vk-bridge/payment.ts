import { isDev } from '@core/constants';
import { FruitsPaidFeatureTypeUI } from '@core/game/types';
import { OrderBoxShowingStatus, ShowSubscriptionBoxResponse } from '@vkontakte/vk-bridge';
import { vkBridge } from './instance';

export const buyPaidFeature = (feature: FruitsPaidFeatureTypeUI): Promise<{ status: OrderBoxShowingStatus }> =>
  isDev ? Promise.resolve({ status: 'success' }) : vkBridge.send('VKWebAppShowOrderBox', { type: 'item', item: feature });
export const buySub = (): Promise<ShowSubscriptionBoxResponse> =>
  isDev
    ? Promise.resolve({ subscriptionId: '1', success: true })
    : vkBridge.send('VKWebAppShowSubscriptionBox', { action: 'create', item: FruitsPaidFeatureTypeUI.FruitsSubFV });
