import { getUserFriends, getUserToken } from '@core/vk-bridge/user';
import { forward } from 'effector';
import { friendsDomain } from './domain';

export const getUserTokenFX = friendsDomain.createEffect(async () => {
  const { access_token } = await getUserToken('friends');
  return access_token;
});

export const getUserFriendsFX = friendsDomain.createEffect(async (token: string) => {
  const { response } = await getUserFriends(token);
  return response;
});

forward({
  from: getUserTokenFX.doneData,
  to: getUserFriendsFX,
});
