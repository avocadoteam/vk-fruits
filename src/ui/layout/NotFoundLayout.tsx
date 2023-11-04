import { bg, btnSec, contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { AppRoot, Button, Panel, PanelHeader, Root, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { AlienOffline } from 'src/assets/svg/AlienOffline';
import { INITIAL_URL } from './router';

export const NotFoundLayout = () => {
  const routeNavigator = useRouteNavigator();
  return (
    <AppRoot>
      <SplitLayout>
        <SplitCol>
          <Root activeView="404">
            <View nav="404" activePanel="404">
              <Panel nav="404" className={bg()}>
                <PanelHeader separator={false} />
                <div>
                  <div
                    style={{
                      height: '40vh',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <AlienOffline
                        style={{
                          display: 'flex',
                          marginTop: 'auto',
                          marginBottom: '2rem',
                          alignSelf: 'center',
                        }}
                      />
                    </div>
                  </div>
                  <div className={contentCenter({ direction: 'column', gap: '1' })}>
                    <p className={typography({ variant: 'head', align: 'center' })}>Тут ничего нет</p>
                    <Button
                      mode="secondary"
                      size="l"
                      className={btnSec.secBase}
                      onClick={() => routeNavigator.replace(INITIAL_URL)}
                    >
                      На главную
                    </Button>
                  </div>
                </div>
              </Panel>
            </View>
          </Root>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};
