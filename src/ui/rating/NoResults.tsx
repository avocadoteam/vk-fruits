import { typography } from '@ui/theme/typography.css';
import { memo } from 'react';
import { AlienOffline } from 'src/assets/svg/AlienOffline';

export const NoResults = memo<{ listFetching: boolean; textEmpty?: string }>(
  ({ listFetching, textEmpty = 'Данных нет' }) => {
    return (
      <div>
        <div
          style={{
            height: '40vh',
          }}
        >
          <div
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
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p className={typography({ variant: 'head' })}> {listFetching ? 'Загрузка...' : textEmpty}</p>
        </div>
      </div>
    );
  },
);
