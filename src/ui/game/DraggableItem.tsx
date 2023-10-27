import { itemsSkins } from '@core/game/constants';
import { FruitItems, GameItemNames } from '@core/game/types';
import { wrapAsset } from '@core/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { animated, useSpring } from '@react-spring/web';
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
  const [itemName] = id.split('__') as [GameItemNames, string];
  const item = itemsSkins[skin].find(f => f.name === itemName)!;

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 2 : undefined,
    opacity: freezed ? 0.5 : undefined,
  };

  const [{ x }] = useSpring(
    {
      from: { x: 0 },
      x: itemName ? 1 : 0,
      config: { duration: 1000 },
    },
    [itemName],
  );

  return (
    <>
      <animated.div
        ref={setNodeRef}
        style={{
          ...style,
          userSelect: 'none',
          scale: x.to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          }),
        }}
        {...listeners}
      >
        <img src={item.src} width={56} height={56} alt={item.name} />
      </animated.div>

      {isDragging ? null : (
        <div className={gSt.score}>
          {freezed ? <img src={wrapAsset('/imgs/ice.png')} width={16} height={16} /> : `+${item.points}`}
        </div>
      )}
    </>
  );
};
