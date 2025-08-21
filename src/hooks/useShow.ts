import { storeToRefs } from 'pinia';
import { useShowStore } from '@/stores/show';

export const useShow = () => {
  const showStore = useShowStore();
  const { isShowCurtain, showContent } = storeToRefs(showStore);
  const { click, confirm, cancel } = showStore;

  return { isShowCurtain, showContent, click, confirm, cancel };
};
