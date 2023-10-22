import { $config } from '@core/config';
import { vkBridge } from '@core/vk-bridge/instance';
import { ErrorBoundary } from '@ui/error-bound';
import { router } from '@ui/layout/router';
import { RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import { attachLogger } from 'effector-logger';
import { useStore } from 'effector-react';
import { App } from './app';

// TODO: removed from prod
attachLogger();

export const Providers = () => {
  const { appearance } = useStore($config);
  return (
    <ConfigProvider appearance={appearance} isWebView={vkBridge.isWebView()}>
      <AdaptivityProvider>
        <ErrorBoundary>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </ErrorBoundary>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
