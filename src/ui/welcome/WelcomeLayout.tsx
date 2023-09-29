import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Button, FixedLayout, PanelHeader } from '@vkontakte/vkui';

const welcomeData: Record<
  string,
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
    img: '/imgs/w_hi.png',
    title: 'Салют!',
    subtitle: 'Мы ещё не знакомы? Так чего ждёшь?',
    btnText: 'Пройти обучение',
    nextStep: '/welcome/step2',
  },
  step2: {
    img: '/imgs/w_tip.png',
    title: 'Это игровое поле',
    subtitle: 'В каждой плитке появляются разные фрукты, которые дают определённое количество очков',
    btnText: 'Так, дальше',
    nextStep: '/welcome/step3',
  },
  step3: {
    img: '/imgs/w_bow.png',
    title: 'Опа, новый фрукт!',
    subtitle: 'Попробуй их соединить – перетащи один фрукт на другой',
    btnText: 'Что дальше?',
    nextStep: '/welcome/step4',
  },
  step4: {
    img: '/imgs/w_bow.png',
    title: 'Превращение!',
    subtitle: 'Фрукт первого уровня превратился в фрукт второго – теперь ты получаешь больше очков',
    btnText: 'Что дальше?',
    nextStep: '/welcome/step5',
  },
  step5: {
    img: '/imgs/w_ok.png',
    title: 'Как победить?',
    subtitle: 'Для победы нужно набрать 100 очков быстрее своего соперника',
    btnText: 'Всё понятно',
    nextStep: '/',
    shouldExit: true,
  },
};

export const WelcomeLayout = () => {
  const params = useParams();
  const routeNavigator = useRouteNavigator();

  const step = params?.step ?? 'step1';
  const stepData = welcomeData[step];

  return (
    <>
      <PanelHeader separator={false} />
      <div>
        <FixedLayout vertical="bottom">
          <div className={contentCenter()}>
            <img src={stepData.img} width={96} height={96} alt={stepData.title} />
            <p className={typography({ variant: 'head1', m: 't', align: 'center' })}>{stepData.title}</p>
            <p className={typography({ variant: 'small', m: 't.5', align: 'center' })}>{stepData.subtitle}</p>

            <Button
              onClick={() =>
                stepData.shouldExit ? routeNavigator.replace(stepData.nextStep) : routeNavigator.push(stepData.nextStep)
              }
              style={{ margin: '1rem 0 3rem' }}
              size="l"
              stretched
              mode="primary"
            >
              {stepData.btnText}
            </Button>
          </div>
        </FixedLayout>
      </div>
    </>
  );
};
