import deepFreeze from '../../utils/deepFreeze.js';

const RESULT_MESSAGES = deepFreeze({
  result_start: (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  ordered_menu_list: (menu, quantity) => `${menu} ${quantity}개`,
});

export default RESULT_MESSAGES;