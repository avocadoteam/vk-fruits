import { getUserInfoFX } from '@core/api/game/effects.game';
import { $game } from '@core/api/game/store.game';
import { buyPaidFeatureFX, buySubFX } from '@core/api/shop/effects.shop';
import { $config, setSelectedSkin } from '@core/config';
import { FruitsPaidFeatureTypeUI } from '@core/game/types';
import { useIsIosApp } from '@core/hooks/useIsIosApp';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { wrapAsset } from '@core/utils';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { btnSec, contentCenter, vars } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Icon20InfoCircleOutline } from '@vkontakte/icons';
import { Button, HorizontalScroll, IconButton, Image, Radio, Tooltip } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore, useStoreMap } from 'effector-react';
import { useCallback, useState } from 'react';
import { MultipleGifts } from 'src/assets/svg/MultipleGifts';
import { RoundGift } from 'src/assets/svg/RoundGift';
import { AdsGift } from './AdsGift';
import { sSt } from './style.css';

const loadingBuyCombine = combine(
  [buyPaidFeatureFX.pending, getUserInfoFX.pending, buySubFX.pending],
  ([a, b, c]) => a || b || c,
);

export const ShopLayout = () => {
  const [selectedGifts, selectGift] = useState('1');
  const [isShown, showTooltip] = useState(false);
  const loadingBuy = useStore(loadingBuyCombine);
  const isIOS = useIsIosApp();

  const { hasAllSkins, skinsToBuyMaxCount, skins, hasPremium } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        hasAllSkins: g.userInfo.hasAllSkins,
        skinsToBuyMaxCount: g.userInfo.skinsToBuyMaxCount,
        skins: g.userInfo.skins,
        hasPremium: g.userInfo.hasPremium,
      };
    },
  });

  const { selectedSkin } = useStoreMap({
    store: $config,
    keys: [],
    fn: cf => {
      return {
        selectedSkin: cf.selectedSkin,
      };
    },
  });

  const buyGift = useCallback((item: FruitsPaidFeatureTypeUI) => {
    buyPaidFeatureFX(item).then(done => {
      addToastToQueue({
        id: ToastId.BuyItem,
        toast: {
          type: done ? 'success' : 'error',
          title: done ? 'Спасибо за покупку' : 'Покупка не удалась',
        },
      });
      getUserInfoFX();
    });
  }, []);
  const buySubscription = useCallback(() => {
    buySubFX().then(done => {
      addToastToQueue({
        id: ToastId.BuyItem,
        toast: {
          type: done ? 'success' : 'error',
          title: done ? 'Вы получили все скины и х2 кубков за победу' : 'Покупка не удалась',
        },
      });
      getUserInfoFX();
    });
  }, []);

  return (
    <>
      <PanelHeaderBack />

      <div className={contentCenter({ direction: 'column', alignItems: 'start' })}>
        {!isIOS ? <p className={typography({ variant: 'small', shadow: true, transform: 'up', m: 'l' })}>Покупки</p> : null}

        {hasPremium || !isIOS ? (
          <div className={sSt.box}>
            <div className={contentCenter({ direction: 'column', p: '1' })}>
              <img
                width={32}
                style={{ marginTop: '1rem' }}
                height={32}
                src="https://showtime.app-dich.com/imgs/emoji/veg/avocado.png"
                alt="avocado"
              />
              <p className={typography({ variant: 'head', transform: 'up' })}>Fruit Pass</p>
              <div className={contentCenter({ direction: 'row', gap: '1', p: '0' })}>
                <p className={typography({ variant: 'small', shadow: true })}>Содержит премиальные функции</p>
                <Tooltip
                  isShown={isShown}
                  onClose={() => showTooltip(false)}
                  header={<p className={typography({ variant: 'head', transform: 'up' })}>Fruit Pass</p>}
                  text={
                    <div>
                      <p className={typography({ variant: 'small', m: 't.5' })}>
                        В два раза больше очков за победу + 3 скина каждый месяц
                      </p>
                    </div>
                  }
                  offsetY={10}
                >
                  <IconButton
                    style={{ height: 20, color: vars.palette.white }}
                    hoverMode="opacity"
                    onClick={() => showTooltip(true)}
                  >
                    <Icon20InfoCircleOutline />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className={sSt.btnContainer}>
              {hasPremium ? (
                <p className={typography({ variant: 'small', transform: 'up' })}>Вы уже купили премиум</p>
              ) : (
                <>
                  <Button className={btnSec.secBase} mode="secondary" stretched size="l" onClick={buySubscription}>
                    На месяц за 29 голосов
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : null}

        <AdsGift />
        {hasAllSkins || isIOS ? null : (
          <div className={sSt.box}>
            <div className={contentCenter({ direction: 'column', p: '1' })}>
              <img width={32} style={{ marginTop: '1rem' }} height={32} src={wrapAsset('/imgs/gift.png')} alt="gift" />
              <p className={typography({ variant: 'head', m: 't', transform: 'up' })}>Подарок</p>
              <p className={typography({ variant: 'small', shadow: true })}>Случайный скин из коллекции</p>
            </div>

            <div className={sSt.btnContainer}>
              <Radio
                className={sSt.radio}
                name="gift"
                value="1"
                onChange={e => selectGift(e.target.value)}
                checked={selectedGifts === '1'}
                disabled={loadingBuy}
              >
                <div className={sSt.radioContent}>
                  <RoundGift />
                  <p className={typography({ variant: 'small' })}>1 подарок</p>
                </div>
              </Radio>
              {skinsToBuyMaxCount >= 3 ? (
                <Radio
                  className={sSt.radio}
                  name="gift"
                  value="3"
                  onChange={e => selectGift(e.target.value)}
                  checked={selectedGifts === '3'}
                  disabled={loadingBuy}
                >
                  <div className={sSt.radioContent}>
                    <MultipleGifts />
                    <p className={typography({ variant: 'small' })}>3 подарка</p>
                  </div>
                </Radio>
              ) : null}
            </div>
            <div className={sSt.btnContainer}>
              <Button
                mode="primary"
                stretched
                size="l"
                onClick={() =>
                  buyGift(selectedGifts === '3' ? FruitsPaidFeatureTypeUI.FruitsGift3x : FruitsPaidFeatureTypeUI.FruitsGift)
                }
                loading={loadingBuy}
              >
                Купить за{' '}
                <span className={typography({ variant: 'small', shadow: true, color: 'primary' })}>
                  {selectedGifts === '3' ? '49' : '19'} голосов
                </span>
              </Button>
            </div>
          </div>
        )}

        <p style={{ marginTop: '3rem' }} className={typography({ variant: 'small', shadow: true, transform: 'up', m: 'l' })}>
          Скины
        </p>

        <div className={sSt.box}>
          <div className={contentCenter({ direction: 'column', p: '1' })}>
            <p className={typography({ variant: 'head1', m: 't', transform: 'up' })}>Скины</p>
          </div>

          <HorizontalScroll style={{ width: '100%' }}>
            <div style={{ display: 'flex', padding: '0 1rem' }}>
              {skins.map(skin => (
                <div
                  className={sSt.horCell({ selectedSkin: selectedSkin === skin })}
                  key={skin}
                  onClick={() => setSelectedSkin(skin)}
                >
                  <Image
                    style={{ background: 'transparent' }}
                    borderRadius="l"
                    src={wrapAsset(`/imgs/${skin.replace('skin__', '')}.png`)}
                    withBorder={false}
                  />
                </div>
              ))}
            </div>
          </HorizontalScroll>

          <div className={sSt.btnContainer} />
        </div>
      </div>
    </>
  );
};
