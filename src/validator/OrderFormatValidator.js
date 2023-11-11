import OrderError from '../errors/OrderError.js';
import DELIMITER from '../constants/delimiters/delimiter.js';
import ORDER_CONFIG_DATA from '../database/configData/orderConfigData.js';

class OrderFormatValidator {
  #menuCounts = new Map();

  validateInputFormat(orderList) {
    this.#validateInputFormat(orderList);
  }

  #validateInputFormat(orderList) {
    orderList.forEach(({ menu, quantity }) => {
      this.#validateWhitespace(menu);
      this.#validateQuantityType(quantity);
      this.#validateQuantityRange(quantity);
      this.#validateDuplication(menu);
      this.#menuCounts.set(menu, quantity);
    });
  }

  #validateWhitespace(menu) {
    if (menu.includes(DELIMITER.space)) {
      throw new OrderError();
    }
  }

  #validateQuantityType(quantity) {
    if (Number.isNaN(quantity)) {
      throw new OrderError();
    }
  }

  #validateQuantityRange(quantity) {
    if (quantity < ORDER_CONFIG_DATA.min_quantity || quantity > ORDER_CONFIG_DATA.max_quantity) {
      throw new OrderError();
    }
  }

  #validateDuplication(menu) {
    if (this.#menuCounts.has(menu)) {
      throw new OrderError();
    }
  }
}

export default OrderFormatValidator;
