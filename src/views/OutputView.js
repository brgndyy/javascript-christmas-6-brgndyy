import { Console } from '@woowacourse/mission-utils';
import ORDER_MESSAGES from '../constants/messages/orderMessages.js';
import RESULT_MESSAGES from '../constants/messages/resultMessages.js';
import BANNER_MESSAGES from '../constants/messages/bannerMessages.js';
import DELIMITER from '../constants/delimiters/delimiter.js';

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
