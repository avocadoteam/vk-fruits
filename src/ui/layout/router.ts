import { createHashRouter } from '@vkontakte/vk-mini-apps-router';
import { routes } from './routes';

export const router = createHashRouter([routes.main]);
