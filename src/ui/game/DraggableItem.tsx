import { itemsSkins } from '@core/game/constants';
import { GameItemNames } from '@core/game/types';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { PropsWithChildren } from 'react';
import { gSt } from './style.css';

type Props = PropsWithChildren<{
  id: string;
}>;

export const DraggableItem = ({ id }: Props) => {
  const { listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 2 : undefined,
  };
  const [itemName] = id.split('__') as [GameItemNames, string];

  const item = itemsSkins.fruits.find(f => f.name === itemName)!;

  return (
    <div ref={setNodeRef} style={style} {...listeners}>
      <img src={item.src} width={56} height={56} alt={item.name} />
      {isDragging ? null : <div className={gSt.score}>+{item.score}</div>}
    </div>
  );
};
