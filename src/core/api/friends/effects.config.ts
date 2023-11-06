import { getUserFriends, getUserToken } from '@core/vk-bridge/user';
import { forward } from 'effector';
import { friendsDomain } from './domain';

export const getUserTokenFX = friendsDomain.createEffect({
  handler: async () => {
    const { access_token } = await getUserToken('friends');
    return access_token;
  },
  name: 'getUserTokenFX',
});

export const getUserFriendsFX = friendsDomain.createEffect({
  handler: async (token: string) => {
    const { response } = await getUserFriends(token);
    return response;
  },
  name: 'getUserFriendsFX',
});

forward({
  from: getUserTokenFX.doneData,
  to: getUserFriendsFX,
});
