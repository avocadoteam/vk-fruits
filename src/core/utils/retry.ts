export function retry<R>(fn: () => Promise<R>, retriesLeft = Number.MAX_SAFE_INTEGER, interval = 500) {
  const BACKOFF_COEFFICIENT = 1.2;
  return new Promise<R>((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(error => {
        setTimeout(() => {
          const left = retriesLeft - 1;
          console.debug('Retrying to load because of error:');
          console.debug('retries left', left);
          if (retriesLeft === 1) {
            console.debug('Failed to load: maximum retries exceeded');
            reject(error);
            return;
          }

          retry(fn, left, interval * BACKOFF_COEFFICIENT).then(resolve, reject);
        }, interval);
      });
  });
}
