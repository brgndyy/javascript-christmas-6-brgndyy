import OrderError from '../errors/OrderError.js';
import ORDER_CONFIG_DATA from '../database/configData/orderConfigData.js';
import OrderService from '../service/OrderService.js';

class OrderRulesValidator {
  #orderService = new OrderService();

  validateOrderRules(orderList) {
    const { totalPrice, totalQuantity, foodOrdered } =
      this.#orderService.accumulateOrderData(orderList);

    this.#validateOrderLength(totalQuantity);
    this.#validateTotalAmount(totalPrice);
    this.#validateFoodOrdered(foodOrdered);
  }

  #validateOrderLength(totalQuantity) {
    if (totalQuantity > ORDER_CONFIG_DATA.max_quantity) {
      throw new OrderError();
    }
  }

  #validateTotalAmount(totalAmount) {
    if (totalAmount <= ORDER_CONFIG_DATA.zero_price) {
      throw new OrderError();
    }
  }

  #validateFoodOrdered(foodOrdered) {
    if (!foodOrdered) {
      throw new OrderError();
    }
  }
}

export default OrderRulesValidator;
