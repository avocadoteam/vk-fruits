import { $game } from '@core/api/game/store.game';
import { useEventListener } from '@core/hooks/useEventListener';
import { endGame } from '@core/sockets/game';
import { INITIAL_URL } from '@ui/layout/router';
import { btnBackStyle, headerStyle } from '@ui/layout/style.css';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Alert, PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { useEffect, useState } from 'react';

export const PanelHeaderBackInGame = () => {
  const routeNavigator = useRouteNavigator();
  const [onTop, setOnTop] = useState(true);
  const { lobbyId } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        lobbyId: g.lobbyId,
      };
    },
  });

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

  useEffect(() => {
    setOnTop(document.documentElement.scrollTop === 0);
  }, []);

  useEventListener('scroll', () => setOnTop(document.documentElement.scrollTop === 0));

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
