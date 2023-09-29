import { $config } from '@core/config';
import { clsx } from '@core/utils/clsx';
import { btnSec, contentCenter, vars } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Icon12Chevron } from '@vkontakte/icons';
import { Avatar, Button, PanelHeader } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { homeStyles } from './style.css';

export const HomeLayout = () => {
  const { user } = useStore($config);
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
            <img src="/imgs/trophy.png" alt="trophy" width="20" height="20" />
            <p className={typography({ variant: 'elo', m: 'l.5' })}>13645</p>
          </div>

          <Button
            className={clsx(btnSec, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
            after={<span className={typography({ variant: 'small' })}>Осталось 3 игры</span>}
            disabled
          >
            <span className={homeStyles.btnContent}>
              <img src="/imgs/gift.png" alt="gift" width="28" height="28" />
              Получить
            </span>
          </Button>
        </div>
        <div className={homeStyles.grid}>
          <Button className={clsx(btnSec, homeStyles.btnWide)} mode="secondary" stretched size="l">
            <span className={homeStyles.btnContent}>
              <img src="/imgs/money_bag.png" alt="gift" width="28" height="28" />
              Магазин
            </span>
          </Button>
          <Button className={clsx(btnSec, homeStyles.btnWide)} mode="secondary" stretched size="l">
            <span className={homeStyles.btnContent}>
              <img src="/imgs/fire.png" alt="gift" width="28" height="28" />
              Рейтинг
            </span>
          </Button>
        </div>
        <div className={contentCenter({ direction: 'column' })} style={{ marginTop: '1rem' }}>
          <Button
            className={clsx(btnSec, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
            after={<Icon12Chevron fill={vars.palette.shade} />}
          >
            <span className={homeStyles.btnContent}>
              <img src="/imgs/mag_glass.png" alt="gift" width="28" height="28" />
              Найти игру
            </span>
          </Button>
          <Button
            style={{ marginTop: '.5rem' }}
            className={clsx(btnSec, homeStyles.btnWide)}
            mode="secondary"
            stretched
            size="l"
            after={<Icon12Chevron fill={vars.palette.shade} />}
          >
            <span className={homeStyles.btnContent}>
              <img src="/imgs/wrestling.png" alt="gift" width="28" height="28" />
              Играть с другом
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};
