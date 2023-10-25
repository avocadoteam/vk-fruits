import { getUserInfoFX } from '@core/api/game/effects.game';
import { $config } from '@core/config';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import { qVK } from '@core/data/q-params';
import { connectWS } from '@core/sockets/game';
import { client } from '@core/sockets/receiver';
import { GameFoundLayout } from '@ui/game/layouts/GameFoundLayout';
import { GameLayout } from '@ui/game/layouts/GameLayout';
import { GameResultsLayout } from '@ui/game/layouts/GameResultsLayout';
import { HomeLayout } from '@ui/home/HomeLayout';
import { LobbyLayout } from '@ui/lobby/LobbyLayout';
import { LobbyLayoutInvited } from '@ui/lobby/LobbyLayoutInvited';
import { Offline } from '@ui/offline/Offline';
import { RatingLayout } from '@ui/rating/RatingLayout';
import { SearchLayout } from '@ui/search/SearchLayout';
import { ShopLayout } from '@ui/shop/ShopLayout';
import { bg } from '@ui/theme/theme.css';
import { WelcomeLayout } from '@ui/welcome/WelcomeLayout';
import { useActiveVkuiLocation, usePopout, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Alert, Panel, Root, ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useCallback, useEffect } from 'react';
import { FPanel, FView } from './router';

const initialLoadingCombine = combine(
  [getStorageKeys.pending, getUserDataFX.pending, getUserInfoFX.pending],
  ([a, b, c]) => a || b || c,
);

export const AppLayout = () => {
  const { online, onlineHandleActivate, sawWelcome } = useStore($config);
  const initialLoading = useStore(initialLoadingCombine);

  const routerPopout = usePopout();
  const { panelsHistory, view: activeView = FView.Main, panel: activePanel = FPanel.Home } = useActiveVkuiLocation();

  const routeNavigator = useRouteNavigator();
  const onSwipeBack = useCallback(() => routeNavigator.back(), [routeNavigator]);

  const popup = (
    <Alert
      actions={[
        {
          title: 'Нет',
          autoClose: true,
          mode: 'cancel',
        },
        {
          title: 'Переподключиться',
          autoClose: true,
          mode: 'default',
          action: () => {
            connectWS(qVK);
          },
        },
      ]}
      onClose={() => routeNavigator.hidePopout()}
      text="Вы подключились с другого устройства. Хотите переподключиться?"
    />
  );

  useEffect(() => {
    client.activeDevice = () => {
      routeNavigator.showPopout(popup);
    };
  }, []);

  useEffect(() => {
    if (!sawWelcome && !initialLoading) {
      routeNavigator.replace(`/${FPanel.Welcome}/step1`);
    }
  }, [routeNavigator, sawWelcome, initialLoading]);

  if (!online || !onlineHandleActivate) {
    return <Offline />;
  }

  return (
    <SplitLayout popout={initialLoading ? <ScreenSpinner /> : routerPopout}>
      <SplitCol>
        <Root activeView={activeView}>
          <View nav={FView.Main} activePanel={activePanel} onSwipeBack={onSwipeBack} history={panelsHistory}>
            <Panel nav={FPanel.Welcome} className={bg}>
              <WelcomeLayout />
            </Panel>
            <Panel nav={FPanel.Home} className={bg}>
              <HomeLayout />
            </Panel>
            <Panel nav={FPanel.Shop} className={bg}>
              <ShopLayout />
            </Panel>
            <Panel nav={FPanel.Rating} className={bg}>
              <RatingLayout />
            </Panel>
            <Panel nav={FPanel.Search} className={bg}>
              <SearchLayout />
            </Panel>
            <Panel nav={FPanel.Lobby} className={bg}>
              <LobbyLayout />
            </Panel>
            <Panel nav={FPanel.LobbyInvited} className={bg}>
              <LobbyLayoutInvited />
            </Panel>
            <Panel nav={FPanel.Game} className={bg}>
              <GameLayout />
            </Panel>
            <Panel nav={FPanel.GameFound} className={bg}>
              <GameFoundLayout />
            </Panel>
            <Panel nav={FPanel.GameResults} className={bg}>
              <GameResultsLayout />
            </Panel>
          </View>
        </Root>
      </SplitCol>
    </SplitLayout>
  );
};
