import { setAppearance, setOnline } from '@core/config';
import { DefaultUpdateConfigData } from '@vkontakte/vk-bridge';
import { vkBridge } from './instance';

// set client theme
vkBridge.subscribe(({ detail: { type, data } }) => {
  if (type === 'VKWebAppUpdateConfig') {
    const d = data as DefaultUpdateConfigData;
    setAppearance(d.appearance);

    // if (vkBridge.supports('VKWebAppSetViewSettings')) {
    //   const isLight = d.appearance === 'light';
    //   vkBridge.send('VKWebAppSetViewSettings', {
    //     status_bar_style: isLight ? 'dark' : 'light',
    //     action_bar_color: isLight ? colors.light.bg : colors.dark.bg,
    //   });
    // }
  }

  if (type === 'VKWebAppViewRestore') {
    if (window.navigator.onLine) {
      setOnline();
    }
  }

  // if (type === 'VKWebAppChangeFragment') {
  //   const loc = (data as ChangeFragmentResponse).location;
  //   const hashValue = Number(loc);
  //   if (isNaN(hashValue)) {
  //     return;
  //   }
  // }
});

// Init VK  Mini App
vkBridge.send('VKWebAppInit');
