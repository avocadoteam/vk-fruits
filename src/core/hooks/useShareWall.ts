import { vkBridge } from '@core/vk-bridge/instance';
import { useCallback } from 'react';

export const useOpenWallShare = (link: string) => {
  const shareWall = useCallback(() => {
    vkBridge.send('VKWebAppShare', { link });
  }, [link]);

  return {
    shareWall,
  };
};
