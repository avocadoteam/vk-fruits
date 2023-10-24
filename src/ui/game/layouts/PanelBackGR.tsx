import { useEventListener } from '@core/hooks/useEventListener';
import { INITIAL_URL } from '@ui/layout/router';
import { btnBackStyle, headerStyle } from '@ui/layout/style.css';
import { Icon24ChevronCompactLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';

export const PanelHeaderBackGR = () => {
  const routeNavigator = useRouteNavigator();
  const [onTop, setOnTop] = useState(true);

  useEffect(() => {
    setOnTop(document.documentElement.scrollTop === 0);
  }, []);

  useEventListener('scroll', () => setOnTop(document.documentElement.scrollTop === 0));

  return (
    <PanelHeader
      separator={false}
      before={
        <PanelHeaderButton hasActive={false} className={btnBackStyle} onClick={() => routeNavigator.replace(INITIAL_URL)}>
          <Icon24ChevronCompactLeft width={22} height={22} />
        </PanelHeaderButton>
      }
      className={headerStyle({ onTop })}
    />
  );
};
