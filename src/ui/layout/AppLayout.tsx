import { $config } from '@core/config';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import { noop } from '@core/utils/noop';
import { HomeLayout } from '@ui/home/HomeLayout';
import { Offline } from '@ui/offline/Offline';
import { ShopLayout } from '@ui/shop/ShopLayout';
import { bg } from '@ui/theme/theme.css';
import { WelcomeLayout } from '@ui/welcome/WelcomeLayout';
import { useActiveVkuiLocation, useGetPanelForView, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, Root, ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { routes } from './routes';

const initialLoadingCombine = combine([getStorageKeys.pending, getUserDataFX.pending], ([a, b]) => a || b);

export const AppLayout = () => {
  const { online, onlineHandleActivate, sawWelcome } = useStore($config);
  const initialLoading = useStore(initialLoadingCombine);

  const { view: activeView, panelsHistory } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView(routes.main.view)!;
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    if (!sawWelcome && !initialLoading) {
      routeNavigator.replace('/welcome/step1');
    }
  }, [routeNavigator, sawWelcome, initialLoading]);

  if (!online || !onlineHandleActivate) {
    return <Offline />;
  }

  return (
    <SplitLayout popout={initialLoading ? <ScreenSpinner /> : null}>
      <SplitCol>
        <Root activeView={activeView!}>
          <View
            nav={routes.main.view}
            activePanel={activePanel}
            onSwipeBack={activePanel === routes.shop.panel ? routeNavigator.back : noop}
            history={panelsHistory}
          >
            <Panel nav={routes.welcome.panel} className={bg}>
              <WelcomeLayout />
            </Panel>
            <Panel nav={routes.main.panel} className={bg}>
              <HomeLayout />
            </Panel>
            <Panel nav={routes.shop.panel} className={bg}>
              <ShopLayout />
            </Panel>
          </View>
        </Root>
      </SplitCol>
    </SplitLayout>
  );
};
