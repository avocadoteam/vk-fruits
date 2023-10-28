import { getUserFriendsFX, getUserTokenFX } from '@core/api/friends/effects.config';
import { btnSec } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Button, Div, Placeholder } from '@vkontakte/vkui';
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
        header={<p className={typography({ variant: 'head1', transform: 'up' })}>Разрешите доступ к списку друзей</p>}
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
