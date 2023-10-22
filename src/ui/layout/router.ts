import { createHashRouter } from '@vkontakte/vk-mini-apps-router';
import { routes } from './routes';

export const router = createHashRouter([
  routes.main,
  routes.welcome,
  routes.shop,
  routes.rating,
  routes.search,
  routes.lobby,
  routes.lobbyInvited,
  routes.game,
]);
