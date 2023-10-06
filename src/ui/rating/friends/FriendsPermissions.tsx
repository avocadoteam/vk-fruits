import { getUserFriendsFX, getUserTokenFX } from '@core/api/friends/effects.config';
import { btnSec } from '@ui/theme/theme.css';
import { Button, Div, Placeholder, Title } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { memo, useCallback } from 'react';

const loadingCombine = combine([getUserFriendsFX.pending, getUserTokenFX.pending], ([a, b]) => a || b);

export const RatingFriendsPermissions = memo(() => {
  const tokenFetching = useStore(loadingCombine);

  const handleFetchToken = useCallback(() => {
    getUserTokenFX();
  }, []);

  return (
    <Div>
      <Placeholder
        header={
          <Title weight="3" level="3">
            Разрешите доступ к списку друзей
          </Title>
        }
        action={
          <Button
            loading={tokenFetching}
            size="l"
            mode="secondary"
            stretched
            className={btnSec.secBase}
            onClick={handleFetchToken}
          >
            Разрешить
          </Button>
        }
      />
    </Div>
  );
});
