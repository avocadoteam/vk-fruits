import { getSearchParams } from '@core/data/searchParams';

export const useChatId = () => {
  const chatId = getSearchParams().get('vk_chat_id') ?? '';
  return { hasChatId: !!chatId };
};
