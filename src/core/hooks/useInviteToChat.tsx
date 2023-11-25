import { vkBridge } from '@core/vk-bridge/instance';
import { FPanel } from '@ui/layout/router';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Alert } from '@vkontakte/vkui';
import { useCallback } from 'react';
import { useChatId } from './useChatId';
import { useOpenWallShare } from './useShareWall';

export const useInviteToChat = () => {
  const { hasChatId } = useChatId();
  const routeNavigator = useRouteNavigator();
  const { shareWall } = useOpenWallShare();

  const popup = useCallback(
    (hash: string) => (
      <Alert
        actions={[
          {
            title: 'Потом',
            autoClose: true,
            mode: 'cancel',
          },
          {
            title: 'Поделиться',
            autoClose: true,
            mode: 'default',
            action: () => {
              shareWall(hash);
            },
          },
        ]}
        onClose={() => routeNavigator.hidePopout()}
        text="Временно недоступно. Попробуйте поделиться ссылкой."
      />
    ),
    [routeNavigator, shareWall],
  );

  const share = useCallback(
    (lobbyId: string, config: { closeApp: boolean } = { closeApp: false }) => {
      if (hasChatId) {
        vkBridge
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .send('VKWebAppAddToChat' as any, {
            action_title: 'Присоединиться к лобби',
            hash: `/${FPanel.LobbyInvited}/${lobbyId}`,
            close_app: config.closeApp,
          })
          .then(data => {
            if (!data.result) {
              routeNavigator.showPopout(popup(`/${FPanel.LobbyInvited}/${lobbyId}`));
            } else if (config.closeApp) {
              vkBridge.send('VKWebAppClose');
            }
          })
          .catch(() => {
            routeNavigator.showPopout(popup(`/${FPanel.LobbyInvited}/${lobbyId}`));
          });
      } else {
        shareWall(`/${FPanel.LobbyInvited}/${lobbyId}`);
      }
    },
    [hasChatId, popup, routeNavigator, shareWall],
  );

  return {
    share,
  };
};
