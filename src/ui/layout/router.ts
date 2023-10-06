import { createBrowserRouter } from '@vkontakte/vk-mini-apps-router';
import { routes } from './routes';

export const router = createBrowserRouter([routes.main, routes.welcome, routes.shop, routes.rating]);
