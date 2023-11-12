import { Console } from '@woowacourse/mission-utils';
import ORDER_MESSAGES from '../constants/messages/orderMessages.js';
import DELIMITER from '../constants/delimiters/delimiter.js';

const InputView = {
  async readDate() {
    const inputDateValue = await Console.readLineAsync(ORDER_MESSAGES.select_date);

    return inputDateValue.trim();
  },

  async readMenu() {
    const inputMenuValue = await Console.readLineAsync(ORDER_MESSAGES.select_menu_quantity);

    return inputMenuValue.trim().split(DELIMITER.comma);
  },
};

export default InputView;
