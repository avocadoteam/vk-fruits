import { $game } from '@core/api/game/store.game';
import { finishWelcomeFX } from '@core/config/effects.config';
import { wrapAsset } from '@core/utils';
import { DemoBoard, DemoBoardProps } from '@ui/game/DemoBoard';
import { FPanel, INITIAL_URL } from '@ui/layout/router';
import { btnSec, contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Button, FixedLayout, PanelHeader } from '@vkontakte/vkui';
import { useStoreMap } from 'effector-react';
import { useCallback } from 'react';

const welcomeData: Record<
  DemoBoardProps['step'],
  {
    img: string;
    title: string;
    subtitle: string;
    btnText: string;
    nextStep: string;
    shouldExit?: boolean;
  }
> = {
  step1: {
    img: wrapAsset('/imgs/w_hi.png'),
    title: 'Салют!',
    subtitle: 'Мы ещё не знакомы? Так чего ждёшь?',
    btnText: 'Пройти обучение',
    nextStep: '/welcome/step2',
  },
  step2: {
    img: wrapAsset('/imgs/w_tip.png'),
    title: 'Это игровое поле',
    subtitle: 'В каждой плитке появляются разные фрукты, которые дают определённое количество очков',
    btnText: 'Так, дальше',
    nextStep: '/welcome/step3',
  },
  step3: {
    img: wrapAsset('/imgs/w_bow.png'),
    title: 'Опа, новый фрукт!',
    subtitle: 'Попробуй их соединить – перетащи один фрукт на другой',
    btnText: 'Что дальше?',
    nextStep: '/welcome/step4',
  },
  step4: {
    img: wrapAsset('/imgs/w_bow.png'),
    title: 'Превращение!',
    subtitle: 'Фрукт первого уровня превратился в фрукт второго – теперь ты получаешь больше очков',
    btnText: 'Что дальше?',
    nextStep: '/welcome/step5',
  },
  step5: {
    img: wrapAsset('/imgs/w_bow.png'),
    title: 'Заморозка!',
    subtitle: 'Фрукт заморожен – теперь ты не получаешь очков на протяжении 15 секунд',
    btnText: 'Что дальше?',
    nextStep: '/welcome/step6',
  },
  step6: {
    img: wrapAsset('/imgs/w_ok.png'),
    title: 'Как победить?',
    subtitle: 'Для победы нужно набрать 1000 очков быстрее своего соперника',
    btnText: 'Всё понятно',
    nextStep: '/',
    shouldExit: true,
  },
};

export const WelcomeLayout = () => {
  const params = useParams();
  const routeNavigator = useRouteNavigator();
  const { lobbyId } = useStoreMap({
    store: $game,
    keys: [],
    fn: g => {
      return {
        lobbyId: g.lobbyId,
      };
    },
  });

  const step = (params?.step as DemoBoardProps['step']) ?? 'step1';
  const stepData = welcomeData[step];

  const onBtnClick = useCallback(() => {
    if (stepData.shouldExit) {
      finishWelcomeFX();
    }
    routeNavigator.replace(lobbyId && step === 'step6' ? `/${FPanel.LobbyInvited}/${lobbyId}` : stepData.nextStep);
  }, [stepData.shouldExit, stepData.nextStep, routeNavigator, lobbyId, step]);

  const skipTutorial = useCallback(() => {
    finishWelcomeFX();
    routeNavigator.replace(lobbyId && step === 'step6' ? `/${FPanel.LobbyInvited}/${lobbyId}` : INITIAL_URL);
  }, [lobbyId, routeNavigator, step]);

  if (!params?.step) {
    return null;
  }

  return (
    <>
      <PanelHeader separator={false} />
      <div style={{ overflow: 'hidden' }}>
        <DemoBoard step={step} />
      </div>

      <FixedLayout vertical="bottom">
        <div className={contentCenter()}>
          <img src={stepData.img} width={96} height={96} alt={stepData.title} />
          <p className={typography({ variant: 'head1', m: 't', align: 'center' })}>{stepData.title}</p>
          <p className={typography({ variant: 'small', m: 't.5', align: 'center' })}>{stepData.subtitle}</p>

          {step === 'step1' ? (
            <Button
              className={btnSec.secBase}
              onClick={skipTutorial}
              style={{ margin: '1rem 0 0' }}
              size="l"
              stretched
              mode="secondary"
            >
              Пропустить обучение
            </Button>
          ) : null}
          <Button onClick={onBtnClick} style={{ margin: '1rem 0 3rem' }} size="l" stretched mode="primary">
            {stepData.btnText}
          </Button>
        </div>
      </FixedLayout>
    </>
  );
};
