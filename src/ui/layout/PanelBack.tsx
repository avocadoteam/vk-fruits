import { useEventListener } from '@core/hooks/useEventListener';
import { Icon24ChevronCompactLeft } from '@vkontakte/icons';
import { useFirstPageCheck, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { btnBackStyle, headerStyle } from './style.css';

export const PanelHeaderBack = () => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const [onTop, setOnTop] = useState(true);

  useEffect(() => {
    setOnTop(document.documentElement.scrollTop === 0);
  }, []);

  useEventListener('scroll', () => setOnTop(document.documentElement.scrollTop === 0));

  return (
    <PanelHeader
      separator={false}
      before={
        <PanelHeaderButton
          hasActive={false}
          className={btnBackStyle}
          onClick={() => (isFirstPage ? routeNavigator.replace('/') : routeNavigator.back())}
        >
          <Icon24ChevronCompactLeft width={22} height={22} /> Назад
        </PanelHeaderButton>
      }
      className={headerStyle({ onTop })}
    />
  );
};
