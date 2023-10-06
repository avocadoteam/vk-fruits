import { AppLayout } from '@ui/layout/AppLayout';
import { Snakbars } from '@ui/snack/Snakbars';
import '@ui/theme/theme.css';
import { AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

export const App = () => {
  return (
    <AppRoot>
      <AppLayout />
      <Snakbars />
    </AppRoot>
  );
};
