import { Socket } from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let clientCallbacks: { [name: string]: any } = {};

type CallbackMethod = <M>() => M;

export function clientPerformCallback<T>(perform: (c: CallbackMethod) => T): T {
  const callbacks = (clientCallbacks = clientCallbacks || {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pr: any = perform((): any => null);

  Object.keys(pr).forEach(m => {
    callbacks[m] = pr[m];
  });

  return callbacks as T;
}

export function initCallbacks(socket: Socket) {
  Object.keys(clientCallbacks).forEach(m => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const subscribe: Function = socket['on'];

    subscribe.call(socket, m, function () {
      const cb = clientCallbacks[m];
      if (cb) {
        // eslint-disable-next-line prefer-rest-params
        cb.apply(socket, arguments);
      }
    });
  });
}
