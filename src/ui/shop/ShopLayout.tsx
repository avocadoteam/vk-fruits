import { wrapAsset } from '@core/utils';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { btnSec, contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Button, HorizontalScroll, Image, Radio } from '@vkontakte/vkui';
import { MultipleGifts } from 'src/assets/svg/MultipleGifts';
import { RoundGift } from 'src/assets/svg/RoundGift';
import { sSt } from './style.css';

export const ShopLayout = () => {
  return (
    <>
      <PanelHeaderBack />

      <div className={contentCenter({ direction: 'column', alignItems: 'start' })}>
        <p className={typography({ variant: 'small', shadow: true, transform: 'up', m: 'l' })}>Покупки</p>

        <div className={sSt.box}>
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
        </div>

        <div className={sSt.box}>
          <div className={contentCenter({ direction: 'column', p: '1' })}>
            <img width={32} style={{ marginTop: '1rem' }} height={32} src={wrapAsset('/imgs/gift.png')} alt="gift" />
            <p className={typography({ variant: 'head', m: 't', transform: 'up' })}>Подарок</p>
            <p className={typography({ variant: 'small', shadow: true })}>Случайный скин из коллекции</p>
          </div>

          <div className={sSt.btnContainer}>
            <Radio className={sSt.radio} name="gift" value="1">
              <div className={sSt.radioContent}>
                <RoundGift />
                <p className={typography({ variant: 'small' })}>1 подарок</p>
              </div>
            </Radio>
            <Radio className={sSt.radio} name="gift" value="3">
              <div className={sSt.radioContent}>
                <MultipleGifts />
                <p className={typography({ variant: 'small' })}>3 подарка</p>
              </div>
            </Radio>
          </div>

          <div className={sSt.btnContainer}>
            <Button mode="primary" stretched size="l">
              Купить <span className={typography({ variant: 'small', shadow: true, color: 'primary' })}>249 Р</span>
            </Button>
          </div>
        </div>

        <p style={{ marginTop: '3rem' }} className={typography({ variant: 'small', shadow: true, transform: 'up', m: 'l' })}>
          Скины
        </p>

        <div className={sSt.box}>
          <div className={contentCenter({ direction: 'column', p: '1' })}>
            <p className={typography({ variant: 'head1', m: 't', transform: 'up' })}>Скины</p>
          </div>

          <HorizontalScroll style={{ width: '100%' }}>
            <div style={{ display: 'flex', padding: '0 1rem' }}>
              <div className={sSt.horCell}>
                <Image
                  style={{ background: 'transparent' }}
                  borderRadius="l"
                  src={wrapAsset('/imgs/fruits.png')}
                  withBorder={false}
                />
                <p className={typography({ variant: 'small', align: 'center' })}>Фрукты</p>
              </div>
              <div className={sSt.horCell}>
                <Image
                  style={{ background: 'transparent' }}
                  borderRadius="l"
                  src={wrapAsset('/imgs/vegs.png')}
                  withBorder={false}
                />
                <p className={typography({ variant: 'small', align: 'center' })}>Овощи</p>
              </div>
              <div className={sSt.horCell}>
                <Image
                  style={{ background: 'transparent' }}
                  borderRadius="l"
                  src={wrapAsset('/imgs/sweets.png')}
                  withBorder={false}
                />
                <p className={typography({ variant: 'small', align: 'center' })}>Сладости</p>
              </div>
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
