import { getUserTokenFX } from '@core/api/friends/effects.config';
import { getFriendsRatingFX, getTop100RankFX } from '@core/api/rating/effects.rating';
import { $rating, changeRatingActiveTab } from '@core/api/rating/store.rating';
import { $config } from '@core/config';
import { PanelHeaderBack } from '@ui/layout/PanelBack';
import { Div, Tabs, TabsItem } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { memo, useCallback } from 'react';
import { RatingFriendsPermissions } from './friends/FriendsPermissions';
import { RefreshRatingFriends } from './friends/RefreshRatingFriends';
import { ResultsFriends } from './friends/ResultsFriends';
import { RefreshRank100 } from './top100/RefreshRank100';
import { ResultsRank100 } from './top100/ResultsRank100';

export const RatingLayout = memo(() => {
  const { selectedFriends, selectedTop100, ids } = useStoreMap({
    store: $rating,
    keys: [],
    fn: rS => {
      const selectedTop100 = rS.activeTab === '100';
      const selectedFriends = rS.activeTab === 'friends';

      return {
        selectedTop100,
        selectedFriends,
        ids: rS.friendIds,
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

  const selectTop100 = useCallback(() => {
    changeRatingActiveTab('100');
    getTop100RankFX();
  }, []);

  const selectFriends = useCallback(() => {
    changeRatingActiveTab('friends');

    if (hasFriends) {
      getFriendsRatingFX(ids);
    } else {
      getUserTokenFX();
    }
  }, [hasFriends, ids]);

  return (
    <>
      <PanelHeaderBack />
      <Div>
        <Tabs>
          <TabsItem onClick={selectTop100} selected={selectedTop100}>
            Все
          </TabsItem>
          <TabsItem onClick={selectFriends} selected={selectedFriends}>
            Друзья
          </TabsItem>
        </Tabs>
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
      </Div>
    </>
  );
});
