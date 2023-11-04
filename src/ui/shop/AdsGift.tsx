import { getAdsGiftFX, getUserInfoFX } from '@core/api/game/effects.game';
import { $game } from '@core/api/game/store.game';
import { $config } from '@core/config';
import { hasUserAdsFX, openRewardAdsFX } from '@core/config/effects.config';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { wrapAsset } from '@core/utils';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Button } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore, useStoreMap } from 'effector-react';
import { useCallback, useEffect } from 'react';
import { sSt } from './style.css';
const loadingBuyCombine = combine(
  [getAdsGiftFX.pending, getUserInfoFX.pending, openRewardAdsFX.pending],
  ([a, b, c]) => a || b || c,
);

export const AdsGift = () => {
  const loadingBuy = useStore(loadingBuyCombine);

  const { hasAllSkins, hasAdsSkin, hasPremium } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        hasAllSkins: g.userInfo.hasAllSkins,
        hasAdsSkin: g.userInfo.hasAdsSkin,
        hasPremium: g.userInfo.hasPremium,
      };
    },
  });
  const { hasAds } = useStoreMap({
    store: $config,
    keys: [],
    fn: g => {
      return {
        hasAds: g.hasAds,
      };
    },
  });

  useEffect(() => {
    if (hasPremium || hasAdsSkin) return;
    hasUserAdsFX();
  }, [hasPremium, hasAdsSkin]);

  const watchAds = useCallback(async () => {
    try {
      const isUserWatchedAds = await openRewardAdsFX();
      if (isUserWatchedAds) {
        getAdsGiftFX().then(() => {
          addToastToQueue({
            id: ToastId.Gift,
            toast: {
              type: 'success',
              title: 'Вы получили подарок',
            },
          });
          getUserInfoFX();
        });
      } else {
        addToastToQueue({
          id: ToastId.Gift,
          toast: {
            type: 'error',
            title: 'Упс! Что-то пошло не так',
          },
        });
      }
    } catch (error) {
      addToastToQueue({
        id: ToastId.Gift,
        toast: {
          type: 'error',
          title: 'Упс! Что-то пошло не так',
        },
      });
    }
  }, []);

  return (
    <>
      {hasAllSkins || hasAdsSkin || !hasAds ? null : (
        <div className={sSt.box}>
          <div className={contentCenter({ direction: 'column', p: '1' })}>
            <img width={32} style={{ marginTop: '1rem' }} height={32} src={wrapAsset('/imgs/movie_camera.png')} alt="gift" />
            <p className={typography({ variant: 'head', m: 't', transform: 'up' })}>Подарок</p>
            <p className={typography({ variant: 'small', align: 'center', m: 't.5' })}>
              Случайный скин из коллекции за просмотр рекламы
            </p>
            <p className={typography({ variant: 'small', align: 'center', m: 't.5' })}>
              Скин будет доступен только в течение суток
            </p>
          </div>
          <div className={sSt.btnContainer}>
            <Button mode="primary" stretched size="l" onClick={watchAds} loading={loadingBuy}>
              Посмотреть рекламу
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
