import { $game } from '@core/api/game/store.game';
import { wrapAsset } from '@core/utils';
import { FModal } from '@ui/layout/router';
import { contentCenter } from '@ui/theme/theme.css';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ModalCard } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { modalStyle } from './style.css';

export const PlayingDaysInRow = ({ id }: { id: FModal }) => {
  const routeNavigator = useRouteNavigator();

  const { daysInRow } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        daysInRow: g.userInfo.daysInRow,
      };
    },
  });

  return (
    <ModalCard
      id={id}
      onClose={() => routeNavigator.hideModal()}
      icon={<img src={wrapAsset('/imgs/gift.png')} width={56} height={56} />}
      header="Хочешь подарок?"
      subheader="Играй каждый день в течение 7 дней и получи случайный скин"
      actions={
        <div className={contentCenter({ direction: 'row', gap: '.5', m: 'auto' })}>
          <div className={modalStyle.day({ active: daysInRow > 0 })}>1</div>
          <div className={modalStyle.day({ active: daysInRow > 1 })}>2</div>
          <div className={modalStyle.day({ active: daysInRow > 2 })}>3</div>
          <div className={modalStyle.day({ active: daysInRow > 3 })}>4</div>
          <div className={modalStyle.day({ active: daysInRow > 4 })}>5</div>
          <div className={modalStyle.day({ active: daysInRow > 5 })}>6</div>
          <div className={modalStyle.day({ active: daysInRow > 6 })}>7</div>
        </div>
      }
    />
  );
};
