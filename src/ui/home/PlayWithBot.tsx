import { getBotLobbyFX } from '@core/api/game/effects.game';
import { clsx } from '@core/utils/clsx';
import { FPanel } from '@ui/layout/router';
import { btnSec, vars } from '@ui/theme/theme.css';
import { Icon12Chevron } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Button } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { useCallback } from 'react';
import { homeStyles } from './style.css';

export const PlayWithBot = () => {
  const routeNavigator = useRouteNavigator();
  const loading = useStore(getBotLobbyFX.pending);

  const startGameWithBot = useCallback(() => {
    getBotLobbyFX().then(lobbyId => {
      routeNavigator.push(`/${FPanel.GameFound}/${lobbyId}`);
    });
  }, [routeNavigator]);

  return (
    <Button
      style={{ marginTop: '.5rem' }}
      className={clsx(btnSec.secHome, homeStyles.btnWide)}
      mode="secondary"
      stretched
      size="l"
      after={<Icon12Chevron fill={vars.palette.shade} />}
      onClick={startGameWithBot}
      loading={loading}
    >
      <span className={homeStyles.btnContent}>
        <img src="https://showtime.app-dich.com/imgs/emoji/fears/robot.png" alt="gift" width="28" height="28" />
        Играть с ботом
      </span>
    </Button>
  );
};
