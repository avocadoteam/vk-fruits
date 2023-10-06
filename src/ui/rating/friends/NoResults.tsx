import { getFriendsRatingFX } from '@core/api/rating/effects.rating';
import { Div, Group, Title } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { memo } from 'react';
import { AlienOffline } from 'src/assets/svg/AlienOffline';

export const NoResultsRatingFriends = memo(() => {
  const listFetching = useStore(getFriendsRatingFX.pending);
  return (
    <Div>
      <Group
        separator="hide"
        style={{
          height: '40vh',
        }}
      >
        <Div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <AlienOffline
            style={{
              display: 'flex',
              marginTop: 'auto',
              marginBottom: '2rem',
              alignSelf: 'center',
            }}
          />
        </Div>
      </Group>
      <Group separator="hide" style={{ textAlign: 'center' }}>
        <Title weight="3" level="3" style={{ marginBottom: '1rem' }}>
          {listFetching ? 'Загрузка...' : 'Данных нет'}
        </Title>
      </Group>
    </Div>
  );
});
