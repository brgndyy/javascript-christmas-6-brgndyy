import deepFreeze from '../../utils/deepFreeze.js';

const ORDER_MESSAGES = deepFreeze({
  start_message: (month) => `안녕하세요! 우테코 식당 ${month}월 이벤트 플래너입니다.`,
  select_date: (month) =>
    `${month}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
  select_menu_quantity:
    '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export default ORDER_MESSAGES;
