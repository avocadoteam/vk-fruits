import { getActivityGiftFX, getUserInfoFX } from '@core/api/game/effects.game';
import { $game } from '@core/api/game/store.game';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { wrapAsset } from '@core/utils';
import { FModal } from '@ui/layout/router';
import { btnSec, contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Icon24Cancel } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Button, IconButton, ModalCard, usePlatform } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { useCallback } from 'react';
import { modalStyle } from './style.css';

export const PlayingDaysInRow = ({ id }: { id: FModal }) => {
  const routeNavigator = useRouteNavigator();
  const loading = useStore(getActivityGiftFX.pending);
  const platform = usePlatform();

  const { daysInRow } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        daysInRow: g.userInfo.daysInRow,
      };
    },
  });

  const getGiftForActivity = useCallback(async () => {
    try {
      await getActivityGiftFX();
      addToastToQueue({
        id: ToastId.Gift,
        toast: {
          type: 'success',
          title: 'Вы получили новый подарок',
        },
      });
    } catch (error) {
      addToastToQueue({
        id: ToastId.Gift,
        toast: {
          type: 'warn',
          title: 'Подарков больше нет!',
        },
      });
    } finally {
      getUserInfoFX();
      routeNavigator.hideModal();
    }
  }, [routeNavigator]);

  return (
    <ModalCard
      id={id}
      onClose={() => routeNavigator.hideModal()}
      children={
        <>
          {platform === 'android' ? (
            <IconButton onClick={() => routeNavigator.hideModal()} className={modalStyle.btnClose}>
              <Icon24Cancel />
            </IconButton>
          ) : null}
          <div className={contentCenter({ gap: '1' })}>
            <img src={wrapAsset('/imgs/gift.png')} width={56} height={56} />
            <p className={typography({ variant: 'head', color: 'primary', align: 'center' })}>Хочешь подарок?</p>
            <p className={typography({ variant: 'small', color: 'primary', align: 'center' })}>
              Играй каждый день в течение 7 дней и получи случайный скин
            </p>
          </div>
        </>
      }
      actions={
        daysInRow >= 7 ? (
          <Button
            loading={loading}
            onClick={getGiftForActivity}
            mode="secondary"
            className={btnSec.green}
            stretched
            size="l"
          >
            Получить подарок
          </Button>
        ) : (
          <div className={contentCenter({ direction: 'row', gap: '.5', m: 'auto' })}>
            <div className={modalStyle.day({ active: daysInRow > 0 })}>1</div>
            <div className={modalStyle.day({ active: daysInRow > 1 })}>2</div>
            <div className={modalStyle.day({ active: daysInRow > 2 })}>3</div>
            <div className={modalStyle.day({ active: daysInRow > 3 })}>4</div>
            <div className={modalStyle.day({ active: daysInRow > 4 })}>5</div>
            <div className={modalStyle.day({ active: daysInRow > 5 })}>6</div>
            <div className={modalStyle.day({ active: daysInRow > 6 })}>7</div>
          </div>
        )
      }
    />
  );
};
