import { $game, resetGame } from '@core/api/game/store.game';
import { $config } from '@core/config';
import { wrapAsset } from '@core/utils';
import { clsx } from '@core/utils/clsx';
import { routes } from '@ui/layout/routes';
import { btnSec, contentCenter, vars } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Icon12Chevron } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Avatar, Button, PanelHeader } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { useEffect } from 'react';
import { homeStyles } from './style.css';

export const HomeLayout = () => {
  const { user } = useStore($config);
  const { pts } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        pts: g.userInfo.pts,
      };
    },
  });
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <>
      <PanelHeader separator={false} />
      <div>
        <div className={contentCenter({ direction: 'column' })}>
          <Avatar src={user?.photo_100} size={56} />
          <p className={typography({ variant: 'head', m: 't1.5' })}>
            {user?.first_name} {user?.last_name}
          </p>
          <div className={contentCenter({ direction: 'row' })} style={{ marginBottom: '2rem' }}>
            <img src={wrapAsset('/imgs/trophy.png')} alt="trophy" width="20" height="20" />
            <p className={typography({ variant: 'elo', m: 'l.5' })}>{pts}</p>
          </div>

          <Button
            className={clsx(btnSec.secHome, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
            after={<span className={typography({ variant: 'small' })}>Осталось 3 игры</span>}
            disabled
          >
            <span className={homeStyles.btnContent}>
              <img src={wrapAsset('/imgs/gift.png')} alt="gift" width="28" height="28" />
              Получить
            </span>
          </Button>
        </div>
        <div className={homeStyles.grid}>
          <Button
            onClick={() => routeNavigator.push(routes.game.path)}
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
            onClick={() => routeNavigator.push(routes.rating.path)}
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
            onClick={() => routeNavigator.push(routes.search.path)}
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
            onClick={() => routeNavigator.push(routes.lobby.path)}
          >
            <span className={homeStyles.btnContent}>
              <img src={wrapAsset('/imgs/wrestling.png')} alt="gift" width="28" height="28" />
              Играть с другом
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};
