import deepFreeze from '../../utils/deepFreeze.js';

const BANNER_MESSAGES = deepFreeze({
  ordered_menu: '<주문 메뉴>',
  total_price_before_discount: '<할인 전 총주문 금액>',
  free_gift: '<증정 메뉴>',
  discount_list: '<혜택 내역>',
  total_discount: '<총혜택 금액>',
  total_price_after_discount: '<할인 후 예상 결제 금액>',
});

export default BANNER_MESSAGES;
