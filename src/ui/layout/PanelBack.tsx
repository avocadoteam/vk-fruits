import { Icon24ChevronCompactLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { btnBackStyle } from './style.css';

export const PanelHeaderBack = () => {
  const routeNavigator = useRouteNavigator();

  return (
    <PanelHeader
      separator={false}
      before={
        <PanelHeaderButton className={btnBackStyle} onClick={() => routeNavigator.back()}>
          <Icon24ChevronCompactLeft width={22} height={22} /> Назад
        </PanelHeaderButton>
      }
    />
  );
};
