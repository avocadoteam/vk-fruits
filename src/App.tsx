import { $config } from '@core/config';
import { AppLayout } from '@ui/layout/AppLayout';
import { Snakbars } from '@ui/snack/Snakbars';
import { darkTheme, lightTheme } from '@ui/theme/theme.css';
import { AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

export const App = () => {
  const { appearance } = useStore($config);
  useEffect(() => {
    const body = window.document.getElementsByTagName('body')[0];
    if (appearance === 'dark') {
      body.setAttribute('class', body.className.replace(lightTheme, '') + ' ' + darkTheme);
    } else {
      body.setAttribute('class', body.className.replace(darkTheme, '') + ' ' + lightTheme);
    }
  }, [appearance]);

  return (
    <AppRoot>
      <AppLayout />
      <Snakbars />
    </AppRoot>
  );
};
