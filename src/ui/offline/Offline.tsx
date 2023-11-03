import { getUserTokenFX } from '@core/api/friends/effects.config';
import { getUserInfoFX } from '@core/api/game/effects.game';
import { $config, onlineHandleActivate } from '@core/config';
import { getUserDataFX } from '@core/config/effects.config';
import { isDev } from '@core/constants';
import { bg } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Div, Panel, PanelHeader, Spinner, View } from '@vkontakte/vkui';
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
        getUserInfoFX();
        if (hasFriends && !isDev) {
          getUserTokenFX();
        }
      }, 1200);
    }
  }, [online]);

  return (
    <View id="offline" activePanel="offline">
      <Panel id="offline" className={bg()}>
        <PanelHeader separator={false} />
        <Div className={off_div}>
          <AlienOffline className={off_alien} />
        </Div>
        <div className={off_g}>
          <p className={typography({ variant: 'head' })}>Ошибка подключения</p>
        </div>
        <Div
          style={{
            visibility: online ? 'visible' : 'hidden',
          }}
          className={off_container}
        >
          <p className={typography({ variant: 'small' })}>Переподключаемся...</p>
          <Spinner size="small" className={off_mt} />
        </Div>
      </Panel>
    </View>
  );
});
