import { useEventListener } from '@core/hooks/useEventListener';
import { endGame } from '@core/sockets/game';
import { INITIAL_URL } from '@ui/layout/router';
import { btnBackStyle, headerStyle } from '@ui/layout/style.css';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Alert, PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';

export const PanelHeaderBackInGame = () => {
  const routeNavigator = useRouteNavigator();
  const [onTop, setOnTop] = useState(true);
  const params = useParams();
  const lobbyId = params?.id;
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
          action: () => {
            if (lobbyId) {
              endGame(lobbyId);
            } else {
              setTimeout(() => routeNavigator.replace(INITIAL_URL), 100);
            }
          },
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
          ПОКИНУТЬ ИГРУ
        </PanelHeaderButton>
      }
      className={headerStyle({ onTop })}
    />
  );
};
