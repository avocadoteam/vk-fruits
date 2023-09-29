import { $config } from '@core/config';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import { HomeLayout } from '@ui/home/HomeLayout';
import { Offline } from '@ui/offline/Offline';
import { bg } from '@ui/theme/theme.css';
import { WelcomeLayout } from '@ui/welcome/WelcomeLayout';
import { useActiveVkuiLocation, useGetPanelForView, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, Root, ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { routes } from './routes';

const initialLoadingCombine = combine([getStorageKeys.pending, getUserDataFX.pending], ([a, b]) => a || b);

export const AppLayout = () => {
  const { online, onlineHandleActivate, sawWelcome } = useStore($config);
  const initialLoading = useStore(initialLoadingCombine);

  const { view: activeView } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView('default_view')!;
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    if (!sawWelcome) {
      routeNavigator.replace('/welcome/step1');
    }
  }, [routeNavigator, sawWelcome]);

  if (!online || !onlineHandleActivate) {
    return <Offline />;
  }

  return (
    <SplitLayout popout={initialLoading ? <ScreenSpinner /> : null}>
      <SplitCol>
        <Root activeView={activeView!}>
          <View nav={routes.main.view} activePanel={activePanel} className={bg}>
            <Panel nav={routes.main.panel}>
              <PanelHeader separator={false} />
              <HomeLayout />
            </Panel>
          </View>
          <View nav={routes.welcome.view} activePanel={activePanel} className={bg}>
            <Panel nav={routes.welcome.panel}>
              <PanelHeader separator={false} />
              <WelcomeLayout />
            </Panel>
          </View>
        </Root>
      </SplitCol>
    </SplitLayout>
  );
};
