import { hideToast, showFirstToast } from '@core/ui-config/effects.uic';
import { $uic } from '@core/ui-config/store.uic';
import { Toast } from '@core/ui-config/types';
import { Icon16Done, Icon16ErrorCircle, Icon16InfoCirle, Icon16WarningTriangle } from '@vkontakte/icons';
import { Avatar, Snackbar } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { memo, useCallback, useEffect, useState } from 'react';
import { snackStyles } from './snack.css';

const showDuration = 3500;

export const Snakbars = memo(() => {
  const [{ type, text, title }, setMessage] = useState<Toast>({ text: '', type: 'error', title: '' });
  const {
    toasts: { queue, visibleId },
  } = useStore($uic);
  const qArr = Object.values(queue);
  useEffect(() => {
    if (qArr.length > 0 && !visibleId) {
      setMessage(qArr[0]);
      showFirstToast();
    }
  }, [queue, visibleId]);

  const hideOnClose = useCallback(() => hideToast(visibleId!), [visibleId]);

  if (!visibleId) {
    return null;
  }

  return (
    <>
      <Snackbar
        layout="vertical"
        onClose={hideOnClose}
        before={
          <Avatar size={24} className={snackStyles.snackAva[type]}>
            <SnackIcon type={type} />
          </Avatar>
        }
        action={text}
        duration={showDuration}
      >
        {title}
      </Snackbar>
    </>
  );
});

const SnackIcon = ({ type }: { type: Toast['type'] }) => {
  switch (type) {
    case 'error':
      return <Icon16ErrorCircle fill="#fff" width={14} height={14} />;
    case 'info':
      return <Icon16InfoCirle fill="#fff" width={14} height={14} />;
    case 'success':
      return <Icon16Done fill="#fff" width={14} height={14} />;
    case 'warn':
      return <Icon16WarningTriangle fill="#fff" width={14} height={14} />;
  }
};
