import { setLobbyId } from '@core/api/game/store.game';
import { setAppearance, setOnline } from '@core/config';
import { FPanel } from '@ui/layout/router';
import { ChangeFragmentResponse, DefaultUpdateConfigData } from '@vkontakte/vk-bridge';
import { vkBridge } from './instance';

// set client theme
vkBridge.subscribe(({ detail: { type, data } }) => {
  if (type === 'VKWebAppUpdateConfig') {
    const d = data as DefaultUpdateConfigData;
    setAppearance(d.appearance);
  }

  if (type === 'VKWebAppViewRestore' && window.navigator.onLine) {
    setOnline();
  }

  if (type === 'VKWebAppChangeFragment') {
    const location = (data as ChangeFragmentResponse).location;
    if (location.includes(FPanel.LobbyInvited)) {
      const friendLobbyId = location.split('/').pop() ?? '';
      setLobbyId(friendLobbyId);
    }
  }
});

// Init VK  Mini App
vkBridge.send('VKWebAppInit');
