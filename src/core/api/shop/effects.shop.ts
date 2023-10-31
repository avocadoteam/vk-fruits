import { FruitsPaidFeatureTypeUI } from '@core/game/types';
import { buyPaidFeature, buySub } from '@core/vk-bridge/payment';
import { shopDomain } from './domain';

export const buyPaidFeatureFX = shopDomain.createEffect(async (feature: FruitsPaidFeatureTypeUI) => {
  const data = await buyPaidFeature(feature);
  console.debug('buyPaidFeatureFX', data);
  return data.status;
});
export const buySubFX = shopDomain.createEffect(async () => {
  const data = await buySub();
  return data.success;
});
