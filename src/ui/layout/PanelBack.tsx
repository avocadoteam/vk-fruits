import { useEventListener } from '@core/hooks/useEventListener';
import { useIsIosApp } from '@core/hooks/useIsIosApp';
import { Icon24ChevronCompactLeft } from '@vkontakte/icons';
import { useFirstPageCheck, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { useCallback, useEffect, useState } from 'react';
import { btnBackStyle, headerStyle } from './style.css';

type Props = {
  onCb?: () => void;
};

export const PanelHeaderBack = ({ onCb }: Props) => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const [onTop, setOnTop] = useState(true);
  const isIOS = useIsIosApp();

  useEffect(() => {
    setOnTop(document.documentElement.scrollTop === 0);
  }, []);

  useEventListener('scroll', () => setOnTop(document.documentElement.scrollTop === 0));

  const onClick = useCallback(() => {
    onCb?.();
    if (isFirstPage) {
      routeNavigator.replace('/');
    } else {
      routeNavigator.back();
    }
  }, [isFirstPage, onCb, routeNavigator]);

  return (
    <PanelHeader
      separator={false}
      before={
        <PanelHeaderButton hasActive={false} className={btnBackStyle} onClick={onClick}>
          <Icon24ChevronCompactLeft width={22} height={22} />
        </PanelHeaderButton>
      }
      className={headerStyle({ onTop, isIOS })}
    />
  );
};
