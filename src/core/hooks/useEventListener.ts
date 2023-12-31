import { useEffect } from 'react';

export const useEventListener = <K extends keyof DocumentEventMap>(
  eventListen: K,
  callback: (e: DocumentEventMap[K]) => void,
  eventKey?: string,
) => {
  useEffect(() => {
    const eventHandler = (event: DocumentEventMap[K]) => {
      if (event instanceof KeyboardEvent && event.key === eventKey) {
        callback(event);
      } else if (!eventKey) {
        callback(event);
      }
    };

    document.addEventListener(eventListen, eventHandler);
    return () => document.removeEventListener(eventListen, eventHandler);
  }, [eventListen, eventKey, callback]);
};
