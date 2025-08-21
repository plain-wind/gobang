import { ref } from "vue";
import { defineStore } from "pinia";
import { ShowType } from "@/types/chess";

export const useShowStore = defineStore("show", () => {
  // 是否展示幕布
  const isShowCurtain = ref(false);
  // 展示内容
  const showContent = ref<ShowType>();

  // 点击事件
  const click = (show: ShowType) => {
    isShowCurtain.value = true;
    showContent.value = show;
  };
  // 确认事件
  const confirm = (fn: () => void) => {
    isShowCurtain.value = false;
    fn();
  };
  // 取消事件
  const cancel = () => {
    isShowCurtain.value = false;
  };

  return {
    isShowCurtain,
    showContent,
    click,
    confirm,
    cancel,
  };

});
