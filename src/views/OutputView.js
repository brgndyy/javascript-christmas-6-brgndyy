import { Console } from '@woowacourse/mission-utils';
import ORDER_MESSAGES from '../constants/messages/orderMessages.js';

const OutputView = {
  printStartLine() {
    Console.print(ORDER_MESSAGES.start_message);
  },

  /**
   * 에러메세지 출력함수
   * @param { string } errorMessage
   */

  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  },

  printMenu() {
    Console.print('<주문 메뉴>');
    // ...
  },
};

export default OutputView;
