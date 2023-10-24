import { useEventListener } from '@core/hooks/useEventListener';
import { INITIAL_URL } from '@ui/layout/router';
import { btnBackStyle, headerStyle } from '@ui/layout/style.css';
import { Icon24ChevronCompactLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Alert, PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';

// TODO: if user left during the game, so end it and show results
export const PanelHeaderBackInGame = () => {
  const routeNavigator = useRouteNavigator();
  const [onTop, setOnTop] = useState(true);

  useEffect(() => {
    setOnTop(document.documentElement.scrollTop === 0);
  }, []);

  useEventListener('scroll', () => setOnTop(document.documentElement.scrollTop === 0));

  const popup = (
    <Alert
      actions={[
        {
          title: 'Нет',
          autoClose: true,
          mode: 'cancel',
        },
        {
          title: 'Покинуть',
          autoClose: true,
          mode: 'destructive',
          action: () => setTimeout(() => routeNavigator.replace(INITIAL_URL), 100),
        },
      ]}
      onClose={() => routeNavigator.hidePopout()}
      text="Вы действительно хотите покинуть игру?"
    />
  );

  return (
    <PanelHeader
      separator={false}
      before={
        <PanelHeaderButton hasActive={false} className={btnBackStyle} onClick={() => routeNavigator.showPopout(popup)}>
          <Icon24ChevronCompactLeft width={22} height={22} /> ПОКИНУТЬ ИГРУ
        </PanelHeaderButton>
      }
      className={headerStyle({ onTop })}
    />
  );
};