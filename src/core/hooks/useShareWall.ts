import { appId } from '@core/constants';
import { vkBridge } from '@core/vk-bridge/instance';
import { useCallback } from 'react';

export const useOpenWallShare = () => {
  const shareWall = useCallback((hash: string) => {
    vkBridge.send('VKWebAppShare', { link: `https://vk.com/app${appId}#/${hash}` });
  }, []);

  return {
    shareWall,
  };
};
