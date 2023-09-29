import { $config } from '@core/config';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import { Offline } from '@ui/offline/Offline';
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, Root, ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';

const initialLoadingCombine = combine([getStorageKeys.pending, getUserDataFX.pending], ([a, b]) => a || b);

export const AppLayout = () => {
  const { online, onlineHandleActivate } = useStore($config);
  const initialLoading = useStore(initialLoadingCombine);

  const { view: activeView } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView('default_view')!;

  if (!online || !onlineHandleActivate) {
    return <Offline />;
  }

  return (
    <SplitLayout popout={initialLoading ? <ScreenSpinner /> : null}>
      <SplitCol>
        <Root activeView={activeView!}>
          <View nav="default_view" activePanel={activePanel}>
            <Panel nav="home_panel">
              <PanelHeader separator={false} />
              {/* <HomeLayout /> */}
            </Panel>
          </View>
        </Root>
      </SplitCol>
    </SplitLayout>
  );
};
