import { Console } from '@woowacourse/mission-utils';
import ORDER_MESSAGES from '../constants/messages/orderMessages.js';
import DELIMITER from '../constants/delimiters/delimiter.js';
import DATE_CONFIG_DATA from '../database/configData/dateConfigData.js';

const InputView = {
  async readDate() {
    const inputDateValue = await Console.readLineAsync(
      ORDER_MESSAGES.select_date(DATE_CONFIG_DATA.month_standard),
    );

    return inputDateValue.trim();
  },

  async readMenu() {
    const inputMenuValue = await Console.readLineAsync(ORDER_MESSAGES.select_menu_quantity);

    return inputMenuValue.trim().split(DELIMITER.comma);
  },
};

export default InputView;
