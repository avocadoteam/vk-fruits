import { getUserInfoFX } from '@core/api/game/effects.game';
import { $config } from '@core/config';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import { noop } from '@core/utils/noop';
import { HomeLayout } from '@ui/home/HomeLayout';
import { LobbyLayout } from '@ui/lobby/LobbyLayout';
import { LobbyLayoutInvited } from '@ui/lobby/LobbyLayoutInvited';
import { Offline } from '@ui/offline/Offline';
import { RatingLayout } from '@ui/rating/RatingLayout';
import { SearchLayout } from '@ui/search/SearchLayout';
import { ShopLayout } from '@ui/shop/ShopLayout';
import { bg } from '@ui/theme/theme.css';
import { WelcomeLayout } from '@ui/welcome/WelcomeLayout';
import { useActiveVkuiLocation, useGetPanelForView, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, Root, ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { routes } from './routes';

const initialLoadingCombine = combine(
  [getStorageKeys.pending, getUserDataFX.pending, getUserInfoFX.pending],
  ([a, b, c]) => a || b || c,
);

export const AppLayout = () => {
  const { online, onlineHandleActivate, sawWelcome, wsConnected } = useStore($config);
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
    <SplitLayout popout={initialLoading || !wsConnected ? <ScreenSpinner /> : null}>
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
            <Panel nav={routes.rating.panel} className={bg}>
              <RatingLayout />
            </Panel>
            <Panel nav={routes.search.panel} className={bg}>
              <SearchLayout />
            </Panel>
            <Panel nav={routes.lobby.panel} className={bg}>
              <LobbyLayout />
            </Panel>
            <Panel nav={routes.lobbyInvited.panel} className={bg}>
              <LobbyLayoutInvited />
            </Panel>
          </View>
        </Root>
      </SplitCol>
    </SplitLayout>
  );
};
