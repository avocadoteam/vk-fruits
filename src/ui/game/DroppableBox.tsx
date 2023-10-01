import { useDroppable } from '@dnd-kit/core';
import { vars } from '@ui/theme/theme.css';
import { PropsWithChildren } from 'react';
import { gSt } from './style.css';

type Props = PropsWithChildren<{
  id: string;
}>;

export const DroppableBox = ({ id, children }: Props) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    border: isOver ? `1px solid ${vars.palette.warn}` : '1px solid transparent',
  };

  return (
    <div className={gSt.box} ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
