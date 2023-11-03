import { getUserInfoFX } from '@core/api/game/effects.game';
import { $game, resetGame } from '@core/api/game/store.game';
import { $config } from '@core/config';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { wrapAsset } from '@core/utils';
import { clsx } from '@core/utils/clsx';
import { checkAdsBanner, showAdsBanner } from '@core/vk-bridge/ads';
import { FModal, FPanel } from '@ui/layout/router';
import { btnSec, contentCenter, vars } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Icon12Chevron } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Avatar, Button, PanelHeader } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { useCallback, useEffect } from 'react';
import { homeStyles } from './style.css';

export const HomeLayout = () => {
  const { user } = useStore($config);
  const { pts, hasPremium, countGifts, hasSevenDay, wins, looses } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        pts: g.userInfo.pts,
        hasPremium: g.userInfo.hasPremium,
        countGifts: g.userInfo.countGifts,
        hasSevenDay: g.userInfo.hasSevenDay,
        wins: g.userInfo.wins,
        looses: g.userInfo.looses,
      };
    },
  });
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    resetGame();
    getUserInfoFX();
  }, []);

  useEffect(() => {
    if (hasPremium) return;
    checkAdsBanner().then(r => {
      if (!r.result) {
        showAdsBanner();
      }
    });
  }, [hasPremium]);

  const activateGift = useCallback(() => {
    if (!countGifts) {
      if (hasSevenDay) {
        addToastToQueue({
          id: ToastId.Gift,
          toast: {
            type: 'warn',
            title: 'Подарков больше нет',
          },
        });
      } else {
        routeNavigator.showModal(FModal.DaysInRow);
      }
    } else {
      routeNavigator.push(`/${FPanel.Gift}`);
    }
  }, [countGifts, routeNavigator, hasSevenDay]);

  return (
    <>
      <PanelHeader separator={false} />
      <div>
        <div className={contentCenter({ direction: 'column' })}>
          <Avatar src={user?.photo_100} size={56} />
          <p className={typography({ variant: 'head', m: 't1.5' })}>
            {user?.first_name} {user?.last_name}
          </p>
          <div className={contentCenter({ direction: 'row' })}>
            <img src={wrapAsset('/imgs/trophy.png')} alt="trophy" width="20" height="20" />
            <p className={typography({ variant: 'elo', m: 'l.5' })}>{pts}</p>
          </div>
          <div className={contentCenter({ direction: 'row' })} style={{ marginBottom: '2rem' }}>
            <p className={typography({ variant: 'small' })}>
              <span style={{ color: vars.palette.warn }}>{wins}</span> /{' '}
              <span style={{ color: vars.palette.error }}>{looses}</span>
            </p>
          </div>

          <Button
            className={clsx(btnSec.secHome, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
            onClick={activateGift}
          >
            <span className={homeStyles.btnContent}>
              <img src={wrapAsset('/imgs/gift.png')} alt="gift" width="28" height="28" />
              Получить
            </span>
          </Button>
        </div>
        <div className={homeStyles.grid}>
          <Button
            onClick={() => routeNavigator.push(`/${FPanel.Shop}`)}
            className={clsx(btnSec.secHome, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
          >
            <span className={homeStyles.btnContent}>
              <img src={wrapAsset('/imgs/money_bag.png')} alt="gift" width="28" height="28" />
              Магазин
            </span>
          </Button>
          <Button
            onClick={() => routeNavigator.push(`/${FPanel.Rating}`)}
            className={clsx(btnSec.secHome, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
          >
            <span className={homeStyles.btnContent}>
              <img src={wrapAsset('/imgs/fire.png')} alt="gift" width="28" height="28" />
              Рейтинг
            </span>
          </Button>
        </div>
        <div className={contentCenter({ direction: 'column' })} style={{ marginTop: '1rem' }}>
          <Button
            className={clsx(btnSec.secHome, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
            after={<Icon12Chevron fill={vars.palette.shade} />}
            onClick={() => routeNavigator.push(`/${FPanel.Search}`)}
          >
            <span className={homeStyles.btnContent}>
              <img src={wrapAsset('/imgs/mag_glass.png')} alt="gift" width="28" height="28" />
              Найти игру
            </span>
          </Button>
          <Button
            style={{ marginTop: '.5rem' }}
            className={clsx(btnSec.secHome, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
            after={<Icon12Chevron fill={vars.palette.shade} />}
            onClick={() => routeNavigator.push(`/${FPanel.Lobby}`)}
          >
            <span className={homeStyles.btnContent}>
              <img src={wrapAsset('/imgs/wrestling.png')} alt="gift" width="28" height="28" />
              Играть с другом
            </span>
          </Button>
        </div>
        <div className={contentCenter({ direction: 'column' })} style={{ marginTop: '1rem' }}>
          <Button
            className={clsx(btnSec.secHome, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
            after={<Icon12Chevron fill={vars.palette.shade} />}
            onClick={() => routeNavigator.push(`/${FPanel.Welcome}/step2`)}
          >
            <span className={homeStyles.btnContent}>
              <img src={wrapAsset('/imgs/graduation_cap.png')} alt="gift" width="28" height="28" />
              Пройти обучение
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};
