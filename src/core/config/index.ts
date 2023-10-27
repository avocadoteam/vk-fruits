import { getUserFriendsFX } from '@core/api/friends/effects.config';
import { getSearchParams } from '@core/data/searchParams';
import { FruitsItemName } from '@core/game/player';
import { AppearanceType, UserInfo } from '@vkontakte/vk-bridge';
import { combine, forward } from 'effector';
import { appConfigDomain } from './domain';
import { finishWelcomeFX, getStorageKeys, getUserDataFX, setTapticVibration, setUserSkin } from './effects.config';

export type ConfigType = {
  appearance: AppearanceType;
  online: boolean;
  onlineHandleActivate: boolean;
  user: UserInfo | null;
  sawWelcome: boolean;
  secondVisit: boolean;
  hasFriends: boolean;
  skipFriends: boolean;
  taptic: boolean;
  wsConnected: boolean;
  selectedSkin: FruitsItemName;
};

export const setAppearance = appConfigDomain.createEvent<AppearanceType>();
export const setOnline = appConfigDomain.createEvent();
export const setOffline = appConfigDomain.createEvent();
export const onlineHandleActivate = appConfigDomain.createEvent();
export const setFriendsAllowed = appConfigDomain.createEvent();
export const setFriendsSkip = appConfigDomain.createEvent();
export const setWSConnected = appConfigDomain.createEvent<boolean>();

export const $config = appConfigDomain.createStore<ConfigType>({
  appearance: 'light',
  online: true,
  onlineHandleActivate: true,
  user: null,
  sawWelcome: false,
  secondVisit: false,
  hasFriends: !!getSearchParams().get('vk_access_token_settings')?.includes('friends'),
  skipFriends: false,
  taptic: true,
  wsConnected: false,
  selectedSkin: 'skin__fruits',
});

export const $userId = combine([$config], ([a]) => a.user?.id ?? 0);

$config
  .on(setAppearance, (state, appearance) => ({
    ...state,
    appearance,
  }))
  .on(setOnline, state => ({
    ...state,
    online: true,
  }))
  .on(setOffline, state => ({
    ...state,
    online: false,
    onlineHandleActivate: false,
  }))
  .on(onlineHandleActivate, state => ({
    ...state,
    online: true,
    onlineHandleActivate: true,
  }))
  .on(setFriendsAllowed, state => ({
    ...state,
    hasFriends: true,
  }))
  .on(setWSConnected, (state, wsConnected) => ({
    ...state,
    wsConnected,
  }))
  .on(setFriendsSkip, state => ({
    ...state,
    skipFriends: true,
  }));

$config.on(getUserDataFX.doneData, (state, user) => ({
  ...state,
  user,
}));
$config.on(getStorageKeys.doneData, (state, { sawWelcome, secondVisit, selectedSkin }) => ({
  ...state,
  sawWelcome,
  secondVisit,
  selectedSkin,
}));
$config.on(finishWelcomeFX.done, state => ({
  ...state,
  sawWelcome: true,
}));

$config.on(setTapticVibration.done, (state, { params }) => ({
  ...state,
  taptic: params === 'yes',
}));
$config.on(setUserSkin.done, (state, { params }) => ({
  ...state,
  selectedSkin: params,
}));

forward({
  from: getUserFriendsFX.doneData,
  to: setFriendsAllowed,
});
