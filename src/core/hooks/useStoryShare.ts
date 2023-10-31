import { appId } from '@core/constants';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { getImage, wrapAsset, wrapThousands } from '@core/utils';
import { vkBridge } from '@core/vk-bridge/instance';
import { useCallback, useState } from 'react';

const xBaseOnNumberLength = {
  '8': 205,
  '7': 305,
  '6': 405,
  '5': 505,
  '4': 505,
  '3': 605,
  '2': 655,
  '1': 755,
};

const generateImg = async (pts: number) => {
  const background = await getImage(wrapAsset('/imgs/fruits_story.jpg'));

  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  canvas.width = background.width;
  canvas.height = background.height;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(background, 0, 0);
  ctx.beginPath();

  ctx.font = 'bold 195px SF Pro Rounded';
  ctx.fillStyle = '#FFD84F';

  const text = wrapThousands(pts).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  ctx.fillText(text, xBaseOnNumberLength[String(text.length) as keyof typeof xBaseOnNumberLength] ?? 305, 1390);

  return canvas.toDataURL('image/png');
};

export const useStoryShare = (pts: number) => {
  const [clicked, setClicked] = useState(false);

  const shareStory = useCallback(async () => {
    try {
      setClicked(true);
      const blob = await generateImg(pts);
      vkBridge.send('VKWebAppShowStoryBox', {
        attachment: {
          text: 'open',
          id: 1,
          type: 'url',
          url: `https://vk.com/app${appId}`,
        },
        background_type: 'image',
        blob,
      });
    } catch (e) {
      addToastToQueue({
        id: ToastId.StoryShare,
        toast: {
          type: 'error',
          title: 'Не удалось создать сторис',
        },
      });
    } finally {
      setClicked(false);
    }
  }, [pts]);

  return {
    shareStory,
    clicked,
  };
};
