import { useLoadingStore } from '@/stores/loading';
import { storeToRefs } from 'pinia';
export const useLoading = () => {
  const loadingStore = useLoadingStore();
  const { visible, end } = storeToRefs(loadingStore);
  const { show, hide } = loadingStore;

  return { visible, end, show, hide };
};
