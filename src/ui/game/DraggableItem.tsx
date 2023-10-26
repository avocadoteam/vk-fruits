import { itemsSkins } from '@core/game/constants';
import { FruitItems, GameItemNames } from '@core/game/types';
import { wrapAsset } from '@core/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { PropsWithChildren } from 'react';
import { gSt } from './style.css';

type Props = PropsWithChildren<{
  id: string;
  skin?: keyof FruitItems;
  freezed?: boolean;
}>;

export const DraggableItem = ({ id, skin = 'fruits', freezed }: Props) => {
  const { listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: !!freezed,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 2 : undefined,
    opacity: freezed ? 0.5 : undefined,
  };
  const [itemName] = id.split('__') as [GameItemNames, string];

  const item = itemsSkins[skin].find(f => f.name === itemName)!;

  return (
    <div ref={setNodeRef} style={{ ...style, userSelect: 'none' }} {...listeners}>
      <img src={item.src} width={56} height={56} alt={item.name} />
      {isDragging ? null : (
        <div className={gSt.score}>
          {freezed ? <img src={wrapAsset('/imgs/ice.png')} width={16} height={16} /> : `+${item.points}`}
        </div>
      )}
    </div>
  );
};
