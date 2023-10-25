import { RoutesConfig, createHashRouter, createPanel, createRoot, createView } from '@vkontakte/vk-mini-apps-router';

const APP_ROOT = 'fruits';
export const INITIAL_URL = '/';

export enum FView {
  Main = 'main',
}

export enum FPanel {
  Home = '/',
  Welcome = 'welcome',
  Shop = 'shop',
  Rating = 'rating',
  Search = 'search',
  Lobby = 'lobby',
  LobbyInvited = 'lobbyInvited',
  Game = 'game',
  GameFound = 'game-found',
  GameResults = 'game-results',
}

export const routes = RoutesConfig.create([
  createRoot(APP_ROOT, [
    createView(FView.Main, [
      createPanel(FPanel.Home, '/', []),
      createPanel(FPanel.Welcome, `/${FPanel.Welcome}/:step`, []),
      createPanel(FPanel.Shop, `/${FPanel.Shop}`, []),
      createPanel(FPanel.Rating, `/${FPanel.Rating}`, []),
      createPanel(FPanel.Search, `/${FPanel.Search}`, []),
      createPanel(FPanel.Lobby, `/${FPanel.Lobby}`, []),
      createPanel(FPanel.LobbyInvited, `/${FPanel.LobbyInvited}/:id`, []),
      createPanel(FPanel.GameFound, `/${FPanel.GameFound}/:id`, []),
      createPanel(FPanel.Game, `/${FPanel.Game}/:id`, []),
      createPanel(FPanel.GameResults, `/${FPanel.GameResults}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
