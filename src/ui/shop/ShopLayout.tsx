import { getUserInfoFX } from '@core/api/game/effects.game';
import { $game } from '@core/api/game/store.game';
import { buyPaidFeatureFX } from '@core/api/shop/effects.shop';
import { $config } from '@core/config';
import { setUserSkin } from '@core/config/effects.config';
import { FruitsPaidFeatureTypeUI } from '@core/game/types';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { wrapAsset } from '@core/utils';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Button, HorizontalScroll, Image, Radio } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore, useStoreMap } from 'effector-react';
import { useCallback, useState } from 'react';
import { MultipleGifts } from 'src/assets/svg/MultipleGifts';
import { RoundGift } from 'src/assets/svg/RoundGift';
import { sSt } from './style.css';

const loadingBuyCombine = combine([buyPaidFeatureFX.pending, getUserInfoFX.pending], ([a, b]) => a || b);

export const ShopLayout = () => {
  const [selectedGifts, selectGift] = useState('1');
  const loadingBuy = useStore(loadingBuyCombine);

  const { hasAllSkins, skinsToBuyMaxCount, skins } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        hasAllSkins: g.userInfo.hasAllSkins,
        skinsToBuyMaxCount: g.userInfo.skinsToBuyMaxCount,
        skins: g.userInfo.skins,
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

  const buyGift = useCallback(() => {
    buyPaidFeatureFX(selectedGifts === '3' ? FruitsPaidFeatureTypeUI.Gift3x : FruitsPaidFeatureTypeUI.Gift).then(r => {
      addToastToQueue({
        id: ToastId.BuyItem,
        toast: {
          type: r === 'success' ? 'success' : 'error',
          title: r === 'success' ? 'Спасибо за покупку' : 'Покупка не удалась',
        },
      });
      getUserInfoFX();
    });
  }, [selectedGifts]);

  return (
    <>
      <PanelHeaderBack />

      <div className={contentCenter({ direction: 'column', alignItems: 'start' })}>
        <p className={typography({ variant: 'small', shadow: true, transform: 'up', m: 'l' })}>Покупки</p>

        {/* <div className={sSt.box}>
          <div className={contentCenter({ direction: 'column', p: '1' })}>
            <img
              width={32}
              style={{ marginTop: '1rem' }}
              height={32}
              src="https://showtime.app-dich.com/imgs/emoji/veg/avocado.png"
              alt="avocado"
            />
            <p className={typography({ variant: 'head', m: 't', transform: 'up' })}>Avocado+</p>
            <p className={typography({ variant: 'small', shadow: true })}>Содержит премиальные функции</p>
          </div>

          <div className={sSt.btnContainer}>
            <Button className={btnSec.secBase} mode="secondary" stretched size="l">
              Получить на месяц
            </Button>
            <Button mode="primary" stretched size="l">
              Получить навсегда
            </Button>
          </div>
        </div> */}

        {hasAllSkins ? null : (
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
              <Button mode="primary" stretched size="l" onClick={buyGift} loading={loadingBuy}>
                Купить за{' '}
                <span className={typography({ variant: 'small', shadow: true, color: 'primary' })}>
                  {selectedGifts === '3' ? '50' : '20'} голосов
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
                  onClick={() => setUserSkin(skin)}
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

          <div className={sSt.btnContainer}>
            <Button mode="primary" stretched size="l">
              Выбрать
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
