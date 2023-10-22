import { itemsSkins } from '@core/game/constants';
import { GameItemNames } from '@core/game/types';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { memo, useEffect, useState } from 'react';
import { DraggableItem } from './DraggableItem';
import { DroppableBox } from './DroppableBox';
import { gSt } from './style.css';

export type DemoBoardProps = {
  step: 'step1' | 'step2' | 'step3' | 'step4' | 'step5';
};

const dropBoxes = ['0', '1', '2', '3'];

export const DemoBoard = memo<DemoBoardProps>(({ step }) => {
  const [gameItems, setGameItems] = useState<(GameItemNames | null)[]>(['watermelon', 'watermelon', null, null]);
  const routeNavigator = useRouteNavigator();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (step === 'step4' && !gameItems.includes('green_apple')) {
      setGameItems(['green_apple', null, null, null]);
    }
  }, [gameItems, step]);

  function handleDragEnd({ over, active }: DragEndEvent) {
    const [itemName, index] = (active.id as string).split('__') as [GameItemNames, string];

    if (over?.id && gameItems[Number(over.id)] && over.id !== index) {
      const neeGameItems: (GameItemNames | null)[] = [null, null, null, null];
      neeGameItems[Number(over?.id)] = 'green_apple';
      setGameItems(neeGameItems);
      routeNavigator.replace('/welcome/step4');
    } else if (over?.id) {
      setGameItems(v => {
        const newV = [...v];
        newV[Number(index)] = null;
        newV[Number(over.id)] = itemName;
        return newV;
      });
    }
  }

  const watermelon = itemsSkins.fruits.find(f => f.name === 'watermelon')!;

  const draggable = (id: string) => <DraggableItem id={id} />;

  switch (step) {
    case 'step2':
      return (
        <div className={gSt.container({ isDemo: true })}>
          <div className={gSt.box}>
            <img src={watermelon.src} width={56} height={56} alt={watermelon.name} />
            <div className={gSt.score}>+{watermelon.points}</div>
          </div>
          <div className={gSt.box} />
          <div className={gSt.box} />
          <div className={gSt.box} />
        </div>
      );
    case 'step3':
    case 'step4':
      return (
        <div className={gSt.container({ isDemo: true })}>
          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            {dropBoxes.map((db, index) => (
              <DroppableBox key={db} id={db}>
                {gameItems[index] ? draggable(gameItems[index] + '__' + String(index)) : null}
              </DroppableBox>
            ))}
          </DndContext>
        </div>
      );
    default:
      return null;
  }
});

DemoBoard.displayName = 'DemoBoard';
