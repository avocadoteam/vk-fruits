import { getUserTokenFX } from '@core/api/friends/effects.config';
import { $config, onlineHandleActivate } from '@core/config';
import { getUserDataFX } from '@core/config/effects.config';
import { isDev } from '@core/constants';
import { Div, Group, Panel, PanelHeader, Spinner, Text, Title, View } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import React from 'react';
import { AlienOffline } from 'src/assets/svg/AlienOffline';
import { off_alien, off_container, off_div, off_g, off_mt } from './style.css';

export const Offline = React.memo(() => {
  const { online, hasFriends } = useStore($config);

  React.useEffect(() => {
    if (online) {
      //offlineRecover
      setTimeout(() => {
        onlineHandleActivate();
        getUserDataFX();
        if (hasFriends && !isDev) {
          getUserTokenFX();
        }
      }, 1200);
    }
  }, [online]);

  return (
    <View id="offline" activePanel="offline">
      <Panel id="offline">
        <PanelHeader separator={false} />
        <Div className={off_div}>
          <AlienOffline className={off_alien} />
        </Div>
        <Group separator="hide" className={off_g}>
          <Title level="2">Ошибка подключения</Title>
        </Group>
        <Div
          style={{
            visibility: online ? 'visible' : 'hidden',
          }}
          className={off_container}
        >
          <Text weight="1">Переподключаемся...</Text>
          <Spinner size="small" className={off_mt} />
        </Div>
      </Panel>
    </View>
  );
});
