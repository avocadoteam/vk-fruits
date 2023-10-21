import { useInterval } from '@core/hooks/useInterval';
import { cancelSearch, searchGame } from '@core/sockets/game';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { btnSec, contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Button, FixedLayout } from '@vkontakte/vkui';
import { memo, useEffect, useState } from 'react';

export const SearchLayout = memo(() => {
  const [time, setTime] = useState(0);
  const routeNavigator = useRouteNavigator();
  useInterval(() => setTime(t => t + 1), 1000);

  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  useEffect(() => {
    searchGame();

    return () => {
      cancelSearch();
    };
  }, []);
  return (
    <>
      <PanelHeaderBack />
      <div>
        <div
          style={{
            height: '60vh',
          }}
          className={contentCenter()}
        >
          <p className={typography({ variant: 'head' })}>Поиск</p>
          <p className={typography({ variant: 'head', m: 't.5' })}>соперника</p>
          <p className={typography({ variant: 'head', m: 't' })}>
            {minutes}:{seconds <= 9 ? `0${seconds}` : seconds}
          </p>
        </div>
      </div>

      <FixedLayout vertical="bottom">
        <div className={contentCenter()}>
          <Button
            onClick={() => routeNavigator.back()}
            className={btnSec.secBase}
            style={{ margin: '1rem 0 3rem' }}
            size="l"
            stretched
            mode="secondary"
          >
            Отмена
          </Button>
        </div>
      </FixedLayout>
    </>
  );
});
