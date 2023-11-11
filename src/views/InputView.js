import { Console } from '@woowacourse/mission-utils';
import ORDER_MESSAGES from '../constants/messages/orderMessages.js';

const InputView = {
  async readDate() {
    const inputDateValue = await Console.readLineAsync(ORDER_MESSAGES.select_date);

    return inputDateValue.trim();
  },
};

export default InputView;
