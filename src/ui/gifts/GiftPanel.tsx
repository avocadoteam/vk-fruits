import { getSkinFromGiftFX } from '@core/api/game/effects.game';
import { itemsSkins } from '@core/game/constants';
import { FruitsItemName } from '@core/game/player';
import { FruitItems } from '@core/game/types';
import { useTimeout } from '@core/hooks/useTimeout';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { bg } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Panel, Spinner } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { useLottie } from 'lottie-react';
import { useState } from 'react';
import giftAnimation from './animation_gift.json';
import { giftSt } from './style.css';

export const GiftPanel = ({ nav }: { nav: string }) => {
  const [requestedForGift, setRequestForGift] = useState(false);
  const [skinFromGift, setSkinFromGift] = useState<FruitsItemName | null>(null);
  const loading = useStore(getSkinFromGiftFX.pending);
  const { View, getDuration } = useLottie({
    animationData: giftAnimation,
    loop: false,
    autoplay: true,
  });
  const duration = getDuration();

  useTimeout(
    () => {
      setRequestForGift(true);
      getSkinFromGiftFX().then(setSkinFromGift);
    },
    duration ? duration * 1000 : null,
  );

  const pack: keyof FruitItems = (skinFromGift?.replace('skin__', '') as keyof FruitItems) ?? 'fruits';
  const skinPack = itemsSkins[pack];

  return (
    <Panel nav={nav} className={bg({ bg: requestedForGift ? 'green' : 'red' })}>
      <PanelHeaderBack />

      <div className={giftSt.wrapper}>
        {requestedForGift ? (
          <>
            <div className={giftSt.bgSkins}>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {skinPack.map((skin, index) => (
                    <img
                      className={giftSt.imgItem({ index: String(index) as '0' })}
                      key={skin.name}
                      src={skin.src}
                      width={50}
                      height={50}
                      alt={skin.name}
                    />
                  ))}
                </>
              )}
            </div>
            {loading ? null : (
              <div>
                <p className={typography({ variant: 'head', align: 'center' })}>Вы получили новый скин</p>
                <p className={typography({ variant: 'small', m: 't1.5', align: 'center' })}>
                  Установить скин можно на странице «Магазина»
                </p>
              </div>
            )}
          </>
        ) : (
          View
        )}
      </div>
    </Panel>
  );
};
