import { Console } from '@woowacourse/mission-utils';
import ORDER_MESSAGES from '../constants/messages/orderMessages.js';
import RESULT_MESSAGES from '../constants/messages/resultMessages.js';
import BANNER_MESSAGES from '../constants/messages/bannerMessages.js';
import DELIMITER from '../constants/delimiters/delimiter.js';
import formatPrice from '../utils/formatPrice.js';

const OutputView = {
  printStartLine() {
    Console.print(ORDER_MESSAGES.start_message);
  },

  /**
   * 방문 날짜 출력 함수
   * @param { number } date 방문 날짜
   */

  printResultStart(date) {
    Console.print(RESULT_MESSAGES.result_start(date));
  },

  /**
   * 총 주문한 내역을 출력 함수
   * @param { object[] } totalOrderedList
   */

  printMenu(totalOrderedList) {
    Console.print(BANNER_MESSAGES.ordered_menu);

    totalOrderedList.forEach(({ menu, quantity }) => {
      Console.print(RESULT_MESSAGES.ordered_menu_list(menu, quantity));
    });
  },

  /**
   * 할인 전 총주문 금액 출력 함수
   * @param { number } totalPrice
   */

  printPriceBeforeDiscount(totalPrice) {
    Console.print(BANNER_MESSAGES.total_price_before_discount);
    Console.print(RESULT_MESSAGES.price_result(formatPrice(totalPrice)));
  },

  /**
   * 증정 메뉴 유무에 따른 증정 메뉴 출력 함수
   * @param { boolean } freeGiftCondition
   */

  printIsEligibleFreeGift(freeGift) {
    Console.print(BANNER_MESSAGES.free_gift);

    if (freeGift.length) {
      freeGift.forEach((gift) => Console.print(RESULT_MESSAGES.free_gift(gift.menu)));
      return;
    }

    Console.print(RESULT_MESSAGES.none_benefit);
  },

  /**
   * 총 할인 내역 객체 리스트를 받아서 출력해주는 함수
   * @param { object[] } discountList
   */

  printDiscountList(discountList) {
    Console.print(BANNER_MESSAGES.discount_list);

    const discountListArr = Object.entries(discountList);

    if (discountListArr.length) {
      discountListArr.forEach(([title, salePrice]) => {
        Console.print(RESULT_MESSAGES.discount_history(title, formatPrice(salePrice)));
      });
      return;
    }

    Console.print(RESULT_MESSAGES.none_benefit);
  },

  /**
   * 총 혜택 금액 출력 함수
   * @param { number } totalDiscount
   */

  printTotalDiscountPrice(totalDiscount) {
    Console.print(BANNER_MESSAGES.total_discount);

    if (totalDiscount) {
      Console.print(RESULT_MESSAGES.total_discount_price_result(formatPrice(totalDiscount)));
      return;
    }

    Console.print(RESULT_MESSAGES.none_price);
  },

  /**
   * 에러메세지 출력함수
   * @param { string } errorMessage
   */

  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  },

  printDivideLine() {
    Console.print(DELIMITER.space);
  },
};

export default OutputView;
