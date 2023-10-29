import { FModal } from '@ui/layout/router';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ModalRoot } from '@vkontakte/vkui';
import { PlayingDaysInRow } from './PlayingDaysInRow';

export const ModalRoots = () => {
  const { modal: activeModal } = useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();

  return (
    <ModalRoot activeModal={activeModal} onClose={() => routeNavigator.hideModal()}>
      <PlayingDaysInRow id={FModal.DaysInRow} />
    </ModalRoot>
  );
};
