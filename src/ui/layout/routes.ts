export const routes = {
  main: {
    path: '/',
    panel: 'home_panel',
    view: 'home_view',
  },
  welcome: {
    path: '/welcome/:step',
    panel: 'welcome_panel',
    view: 'home_view',
  },
  shop: {
    path: '/shop',
    panel: 'shop_panel',
    view: 'home_view',
  },
  rating: {
    path: '/rating',
    panel: 'rating_panel',
    view: 'home_view',
  },
  search: {
    path: '/search',
    panel: 'search_panel',
    view: 'home_view',
  },
  lobby: {
    path: '/lobby',
    panel: 'lobby_panel',
    view: 'home_view',
  },
  lobbyInvited: {
    path: '/lobby/:id',
    panel: 'lobbyid_panel',
    view: 'home_view',
  },
  gameFound: {
    path: '/game/:id',
    panel: 'gameFound_panel',
    view: 'home_view',
  },
  game: {
    path: '/game',
    panel: 'game_panel',
    view: 'home_view',
  },
  gameResults: {
    path: '/game-results',
    panel: 'gameresults_panel',
    view: 'home_view',
  },
};
