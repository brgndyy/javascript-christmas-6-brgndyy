import OrderFormatValidator from './OrderFormatValidator.js';
import OrderRulesValidator from './OrderRulesValidator.js';

class OrderValidator {
  /**
   * @type { OrderFormatValidator } 입력값 형식에 대한 유효성 검증을 하는 클래스
   */

  #orderFormatValidator = new OrderFormatValidator();

  /**
   * @type { OrderRulesValidator } 주문 규칙에 대한 유효성 검증을 하는 클래스
   */

  #orderRulesValidator = new OrderRulesValidator();

  /**
   *
   * @param { object } orderList 주문내역
   */

  validate(orderList) {
    this.#orderFormatValidator.validateInputFormat(orderList);
    this.#orderRulesValidator.validateOrderRules(orderList);
  }
}

export default OrderValidator;
