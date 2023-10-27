import { FruitsPaidFeatureTypeUI } from '@core/game/types';
import { buyPaidFeature } from '@core/vk-bridge/payment';
import { shopDomain } from './domain';

export const buyPaidFeatureFX = shopDomain.createEffect(async (feature: FruitsPaidFeatureTypeUI) => {
  const data = await buyPaidFeature(feature);
  return data.status;
});
