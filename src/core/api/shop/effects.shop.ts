import { FruitsPaidFeatureTypeUI } from '@core/game/types';
import { buyPaidFeature, buySub } from '@core/vk-bridge/payment';
import { shopDomain } from './domain';

export const buyPaidFeatureFX = shopDomain.createEffect(async (feature: FruitsPaidFeatureTypeUI) => {
  const data = await buyPaidFeature(feature);
  return data.success;
});
export const buySubFX = shopDomain.createEffect(async () => {
  const data = await buySub();
  console.debug('buySubFX', data);
  return data.success;
});
