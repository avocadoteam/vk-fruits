import { $game } from '@core/api/game/store.game';
import { leaveRoom } from '@core/sockets/game';
import { useStoreMap } from 'effector-react';
import { useEffect } from 'react';

export const useLeaveRoom = () => {
  const { lobbyId } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        lobbyId: g.lobbyId,
      };
    },
  });

  useEffect(() => {
    return () => {
      if (lobbyId) {
        leaveRoom(lobbyId);
      }
    };
  }, [lobbyId]);
};
