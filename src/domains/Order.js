import OrderValidator from '../validator/OrderValidator.js';
import OrderService from '../service/OrderService.js';

class Order {
  /**
   * @type { object } 주문내역
   */

  #orderList;

  /**
   * @type { OrderService } 주문에 대한 총체적인 로직을 담당하는 클래스
   */

  #orderService = new OrderService();

  /**
   * @type { OrderValidator } 주문내역에 대한 유효성 검증 클래스
   */

  #orderValidator = new OrderValidator();

  constructor(orderList) {
    this.#orderList = this.#orderService.parseOrderList(orderList);
    this.#orderValidator.validate(this.#orderList);
  }

  /**
   * 주문 내역을 입력 받아서, 총 주문내역과 총 주문 금액을 객체화해서 반환 해주는 함수
   * @param { string[] } orderInput 사용자에게 입력받은 주문 입력값
   * @returns { object }
   */

  static getOrderInfoFromInput(orderInput) {
    const orderList = new Order(orderInput);

    return orderList.getOrderInfo();
  }

  getOrderInfo() {
    const { totalOrderedList, totalPrice } = this.#orderService.accumulateOrderData(
      this.#orderList,
    );

    return { totalOrderedList, totalPrice };
  }
}

export default Order;
