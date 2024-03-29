import { $game } from '@core/api/game/store.game';
import { $userId } from '@core/config';
import { itemsSkins } from '@core/game/constants';
import { FruitsGameAction } from '@core/game/player';
import { FruitItems, GameItemNames } from '@core/game/types';
import { tickActionEvent } from '@core/sockets/game';
import { wrapAsset } from '@core/utils';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { typography } from '@ui/theme/typography.css';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import { FixedLayout, HorizontalScroll } from '@vkontakte/vkui';
import { useStore, useStoreMap } from 'effector-react';
import { memo, useCallback, useState } from 'react';
import { DraggableItem } from './DraggableItem';
import { DroppableBox } from './DroppableBox';
import { gSt } from './style.css';

export const GameBoard = memo(() => {
  const params = useParams();
  const lobbyId = params?.id ?? '';

  const [isActiveFreeze, activateFreeze] = useState(false);

  const { tables, gameRoom } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        tables: g.tables,
        gameRoom: g.gameRoom,
      };
    },
  });
  const userId = useStore($userId);

  const me = gameRoom.find(g => g.userId === userId);
  const myTable = tables.find(g => g.userId === userId);
  const opponentTable = tables.find(g => g.userId !== userId);
  const [, mySkinName] = me?.selectedSkin.split('__') ?? [];

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  function handleDragEnd({ over, active }: DragEndEvent) {
    const [, index] = (active.id as string).split('__') as [GameItemNames, string];

    if (typeof over?.id === 'number' && myTable?.uiTable[Number(over.id)] && over.id !== Number(index)) {
      const onDropItem = myTable?.uiTable[Number(over.id)];
      const dragItem = myTable?.uiTable[Number(index)];
      if (onDropItem && dragItem && !onDropItem.isFreezed && !dragItem.isFreezed) {
        tickActionEvent({
          actionType: 'unite',
          roomId: lobbyId,
          uniteFruits: [
            {
              points: onDropItem.points,
              position: Number(over.id),
            },
            {
              points: dragItem.points,
              position: Number(index),
            },
          ],
        });
      }
    }
    // else if (typeof over?.id === 'number') {
    // }
  }

  const toggleFreeze = useCallback(() => {
    activateFreeze(v => !v);
  }, []);
  const deactiateFreeze = useCallback(() => {
    activateFreeze(false);
  }, []);

  if (!myTable || !opponentTable) {
    return null;
  }

  const skinPack = itemsSkins[mySkinName as keyof FruitItems];

  return (
    <>
      <div className={gSt.gameBoard}>
        <div className={gSt.container({ isDemo: false, isActiveFreeze })} onClick={deactiateFreeze}>
          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            {myTable.uiTable.map((uit, index) => (
              <DroppableBox key={index} id={index}>
                {uit ? (
                  <DraggableItem
                    id={uit.name + '__' + String(index)}
                    skin={mySkinName as keyof FruitItems}
                    freezed={uit.isFreezed}
                  />
                ) : null}
              </DroppableBox>
            ))}
          </DndContext>
        </div>

        <div className={gSt.opponentContainer({ isActiveFreeze })}>
          {opponentTable.uiTable.map((t, index) => (
            <div className={gSt.box} key={index} style={{ cursor: isActiveFreeze && t ? 'pointer' : 'not-allowed' }}>
              {t ? (
                <div
                  onClick={() => {
                    if (isActiveFreeze) {
                      tickActionEvent({
                        actionType: 'freeze',
                        roomId: lobbyId,
                        target: index as FruitsGameAction['target'],
                      });
                      deactiateFreeze();
                    }
                  }}
                >
                  <img src={t.src} width={56} height={56} />
                  <div className={gSt.score}>
                    {t.isFreezed ? <img src={wrapAsset('/imgs/ice.png')} width={16} height={16} /> : `+${t.points}`}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <FixedLayout vertical="bottom">
        <div className={gSt.horizContainerSpecial}>
          <div className={gSt.buyItem} onClick={toggleFreeze}>
            <img src={wrapAsset('/imgs/ice.png')} width={24} height={24} />
            <p className={typography({ variant: 'small' })}>Заморозка</p>
            <div className={gSt.grBadge2}>-{myTable.actionPrices[0]}</div>
          </div>
        </div>
        <HorizontalScroll showArrows="always">
          <div className={gSt.horizContainer}>
            {skinPack.map((skin, index) => (
              <div
                className={gSt.buyItem}
                key={skin.name}
                onClick={() => {
                  tickActionEvent({
                    actionType: 'buy',
                    roomId: lobbyId,
                    product: (index + 1) as FruitsGameAction['product'],
                  });
                }}
              >
                <img src={skin.src} width={24} height={24} />
                <div className={gSt.grBadge2}>-{myTable.fruitPrices[index]}</div>
              </div>
            ))}
          </div>
        </HorizontalScroll>
      </FixedLayout>
    </>
  );
});

GameBoard.displayName = 'GameBoard';
