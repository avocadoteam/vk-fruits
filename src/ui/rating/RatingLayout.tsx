import { getUserTokenFX } from '@core/api/friends/effects.config';
import { getTop100RankFX } from '@core/api/rating/effects.rating';
import { $rating, changeRatingActiveTab } from '@core/api/rating/store.rating';
import { $config } from '@core/config';
import { useEventListener } from '@core/hooks/useEventListener';
import { clsx } from '@core/utils/clsx';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { btnSec } from '@ui/theme/theme.css';
import { Icon24ArrowUp } from '@vkontakte/icons';
import { Div, FixedLayout, IconButton, Tabs, TabsItem } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { memo, useCallback, useEffect, useState } from 'react';
import { RatingFriendsPermissions } from './friends/FriendsPermissions';
import { RefreshRatingFriends } from './friends/RefreshRatingFriends';
import { ResultsFriends } from './friends/ResultsFriends';
import { ratingSt } from './style.css';
import { RefreshRank100 } from './top100/RefreshRank100';
import { ResultsRank100 } from './top100/ResultsRank100';

export const RatingLayout = memo(() => {
  const { selectedFriends, selectedTop100 } = useStoreMap({
    store: $rating,
    keys: [],
    fn: rS => {
      const selectedTop100 = rS.activeTab === '100';
      const selectedFriends = rS.activeTab === 'friends';

      return {
        selectedTop100,
        selectedFriends,
      };
    },
  });

  const { hasFriends } = useStoreMap({
    store: $config,
    keys: [],
    fn: cS => {
      return {
        hasFriends: cS.hasFriends,
      };
    },
  });
  const [onTop, setOnTop] = useState(true);

  useEffect(() => {
    setOnTop(document.documentElement.scrollTop === 0);
  }, []);

  useEventListener('scroll', () => setOnTop(document.documentElement.scrollTop === 0));

  const selectTop100 = useCallback(() => {
    changeRatingActiveTab('100');
    getTop100RankFX();
  }, []);

  const selectFriends = useCallback(() => {
    changeRatingActiveTab('friends');
    getUserTokenFX();
  }, []);

  return (
    <>
      <PanelHeaderBack />
      <div>
        <Div>
          <Tabs>
            <TabsItem onClick={selectTop100} selected={selectedTop100} className={ratingSt.tab}>
              Все
            </TabsItem>
            <TabsItem onClick={selectFriends} selected={selectedFriends}>
              Друзья
            </TabsItem>
          </Tabs>
        </Div>
        {selectedTop100 ? (
          <RefreshRank100>
            <ResultsRank100 />
          </RefreshRank100>
        ) : hasFriends ? (
          <RefreshRatingFriends>
            <ResultsFriends />
          </RefreshRatingFriends>
        ) : (
          <RatingFriendsPermissions />
        )}
      </div>
      <FixedLayout vertical="bottom">
        {onTop ? null : (
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={clsx(btnSec.secBase, ratingSt.btnUp)}
          >
            <Icon24ArrowUp />
          </IconButton>
        )}
      </FixedLayout>
    </>
  );
});
