import { ref } from 'vue';

const visible = ref(false);
const end = ref(false);

const show = () => {
  visible.value = true;
};
const hide = () => {
  visible.value = false;
};

export {
  visible,
  end,
  show,
  hide,
}
