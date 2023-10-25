import { usePrevious } from '@core/hooks/usePrevious';
import { leaveRoom } from '@core/sockets/game';
import { useActiveVkuiLocation, useParams } from '@vkontakte/vk-mini-apps-router';
import { useEffect } from 'react';
import { FPanel } from './router';

const lobbyPanels = [FPanel.Lobby, FPanel.LobbyInvited, FPanel.GameFound];

export const useWatchLeftRoom = () => {
  const { panel: activePanel = FPanel.Home } = useActiveVkuiLocation();
  const params = useParams();
  const lobbyId = params?.id;
  const lastActivePanel = usePrevious(activePanel as FPanel);
  const lastLobbyId = usePrevious(lobbyId);
  const wasItInLobby = lastLobbyId && lastActivePanel && lobbyPanels.includes(lastActivePanel);

  useEffect(() => {
    const leaveIt = () => {
      if (wasItInLobby) {
        leaveRoom(lastLobbyId);
      }
    };
    window.addEventListener('popstate', leaveIt);
    return () => window.removeEventListener('popstate', leaveIt);
  }, [wasItInLobby]);
};
