import { $game } from '@core/api/game/store.game';
import { $userId } from '@core/config';
import { FruitItems, GameItemNames } from '@core/game/types';
import { tickActionEvent } from '@core/sockets/game';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useStore, useStoreMap } from 'effector-react';
import { memo } from 'react';
import { DraggableItem } from './DraggableItem';
import { DroppableBox } from './DroppableBox';
import { gSt } from './style.css';

export const GameBoard = memo(() => {
  const { tables, gameRoom, lobbyId } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        tables: g.tables,
        gameRoom: g.gameRoom,
        lobbyId: g.lobbyId,
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
      const onItem = myTable?.uiTable[Number(over.id)];
      const dragItem = myTable?.uiTable[Number(index)];
      if (onItem && dragItem) {
        tickActionEvent({
          actionType: 'unite',
          roomId: lobbyId,
          uniteFruits: [onItem.points, dragItem.points],
        });
      }
    } else if (typeof over?.id === 'number') {
    }
  }

  if (!myTable || !opponentTable) {
    return null;
  }

  return (
    <div className={gSt.gameBoard}>
      <div className={gSt.container({ isDemo: false })}>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          {myTable.uiTable.map((uit, index) => (
            <DroppableBox key={index} id={index}>
              {uit ? <DraggableItem id={uit.name + '__' + String(index)} skin={mySkinName as keyof FruitItems} /> : null}
            </DroppableBox>
          ))}
        </DndContext>
      </div>

      <div className={gSt.opponentContainer}>
        {opponentTable.uiTable.map((t, index) => (
          <div className={gSt.box} key={index}>
            {t ? (
              <div>
                <img src={t.src} width={56} height={56} />
                <div className={gSt.score}>+{t.points}</div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';
