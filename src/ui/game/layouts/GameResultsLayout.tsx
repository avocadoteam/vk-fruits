import { $game } from '@core/api/game/store.game';
import { $userId } from '@core/config';
import { wrapAsset } from '@core/utils';
import { FPanel } from '@ui/layout/router';
import { btnSec, contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Avatar, Button, FixedLayout } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { gSt } from '../style.css';
import { PanelHeaderBackGR } from './PanelBackGR';

export const GameResultsLayout = () => {
  const routeNavigator = useRouteNavigator();

  const { gameRoom, gameResult, tables } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        gameRoom: g.gameRoom,
        gameResult: g.gameResult,
        tables: g.tables,
      };
    },
  });
  const myTable = tables.find(g => g.userId === userId);
  const opponentTable = tables.find(g => g.userId !== userId);
  const userId = useStore($userId);
  const isWinner = gameResult?.result[0] === userId;

  const opponent = gameRoom.find(g => g.userId !== userId);
  const me = gameRoom.find(g => g.userId === userId);

  return (
    <>
      <PanelHeaderBackGR />
      <div style={{ minHeight: '50vh' }} className={contentCenter({ gap: '1' })}>
        <div className={contentCenter({ gap: '1' })} style={{ marginTop: 'auto' }}>
          <p className={typography({ variant: 'head1', transform: 'up' })}>
            {gameResult?.isDraw ? 'НИЧЬЯ' : isWinner ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}
          </p>
          {gameResult?.gameType === 'rank' ? (
            <div className={contentCenter({ direction: 'row', gap: '1', p: '0' })}>
              <p className={typography({ variant: 'eloB', transform: 'up' })} style={{ marginBottom: '2px' }}>
                {gameResult?.isDraw ? '+1' : isWinner ? '+27' : '-27'}
              </p>
              <img src={wrapAsset('/imgs/trophy.png')} alt="trophy" width="28" height="28" />
            </div>
          ) : null}
          <div className={contentCenter({ direction: 'row' })}>
            <div className={contentCenter({ gap: '1' })}>
              <Avatar
                size={96}
                src={me?.avatar}
                children={
                  <Avatar.Badge className={gSt.grBadgeConatiner}>
                    <div className={gSt.grBadge}>{myTable?.points ?? 0}</div>
                  </Avatar.Badge>
                }
              />
              <p className={typography({ variant: 'small' })}>Вы</p>
            </div>
            <p className={typography({ variant: 'head', transform: 'up', mix: true })}>vs</p>
            <div className={contentCenter({ gap: '1' })}>
              <Avatar
                size={96}
                src={opponent?.avatar}
                children={
                  <Avatar.Badge className={gSt.grBadgeConatiner}>
                    <div className={gSt.grBadge}>{opponentTable?.points ?? 0}</div>
                  </Avatar.Badge>
                }
              />
              <p className={typography({ variant: 'small' })}>
                {opponent ? opponent.firstName || opponent.lastName : 'Опонент'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <FixedLayout vertical="bottom">
        <div className={contentCenter({ gap: '1' })}>
          <Button onClick={() => routeNavigator.replace(`/${FPanel.Search}`)} size="l" stretched mode="primary">
            Играть ещё раз
          </Button>
          <Button style={{ marginBottom: '3rem' }} size="l" stretched mode="secondary" className={btnSec.secBase}>
            Поделиться
          </Button>
        </div>
      </FixedLayout>
    </>
  );
};
