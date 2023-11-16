import deepFreeze from '../../utils/deepFreeze.js';

const RESULT_MESSAGES = deepFreeze({
  result_start: (month, date) =>
    `${month}월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  ordered_menu_list: (menu, quantity) => `${menu} ${quantity}개`,
  price_result: (price) => `${price}원`,
  none_benefit: '없음',
  free_gift: (gift) => `${gift} 1개`,
  discount_history: (title, salePrice) => `${title}: -${salePrice}원`,
  total_discount_price_result: (price) => `-${price}원`,
  none_price: '0원',
});

export default RESULT_MESSAGES;
