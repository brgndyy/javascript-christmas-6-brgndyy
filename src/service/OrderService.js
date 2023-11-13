import OrderError from '../errors/OrderError.js';
import ORDER_CONFIG_DATA from '../database/configData/orderConfigData.js';
import DELIMITER from '../constants/delimiters/delimiter.js';
import ALL_MENU_DATA from '../database/menus/allMenu.js';

class OrderService {
  /**
   * @type { object[] } 데이터베이스에서 받아온 모든 메뉴 데이터
   */

  #allMenu = ALL_MENU_DATA;

  /**
   * 입력 받은 주문을 형식에 맞춰 재정립해주는 함수
   * @param { object[] } orderList 총 주문내역
   * @returns
   */

  accumulateOrderData(orderList) {
    return orderList.reduce((acc, order) => this.#processOrder(acc, order), {
      totalPrice: 0,
      totalQuantity: 0,
      foodOrdered: false,
      totalOrderedList: [],
    });
  }

  /**
   * 주문 내역이 메뉴판에 존재하는지 확인 후, 업데이트 해주는 함수
   */

  #processOrder(acc, { menu, quantity }) {
    const foundMenu = this.#findMenu(menu);

    if (!foundMenu) {
      throw new OrderError();
    }

    this.#updateAccumulatedData(acc, foundMenu, quantity);
    this.#updateTotalOrderedList(acc, foundMenu, quantity);
    return acc;
  }

  /**
   * 각각 메뉴에 대해 총 가격, 수량, 카테고리 검증
   * @param { object } acc
   * @param { object } menu
   * @param { number } quantity
   */

  #updateAccumulatedData(acc, menu, quantity) {
    const individualMenuTotalPrice = this.#calculateMenuPrice(menu, quantity);
    acc.totalPrice += individualMenuTotalPrice;
    acc.totalQuantity += quantity;
    acc.foodOrdered = acc.foodOrdered || this.#isFood(menu);
  }

  /**
   * 총 주문한 내역 리스트 형식에 맞춰 업데이트
   * @param { object } acc
   * @param { object } menu
   * @param { number } quantity
   */

  #updateTotalOrderedList(acc, menu, quantity) {
    const totalMenuPrice = this.#calculateMenuPrice(menu, quantity);
    acc.totalOrderedList.push({
      menu: menu.menu,
      quantity,
      category: menu.category,
      price: totalMenuPrice,
    });
  }

  /**
   * 해당 메뉴에 대한 총 주문 금액 계산 함수
   * @param { object } menu
   * @param { number } quantity
   * @returns
   */

  #calculateMenuPrice(menu, quantity) {
    return menu.price * quantity;
  }

  /**
   * 주문 음식 카테고리에 대한 검증 (음료만 시키는가?)
   * @param { object } menu
   */

  #isFood(menu) {
    return !menu.category || menu.category !== ORDER_CONFIG_DATA.invalid_only_category;
  }

  /**
   * 주문 내역 입력값을 메뉴와 수량으로 객체화 해주는 함수
   * @param { string[] } orderList
   */

  parseOrderList(orderList) {
    return orderList.map((orderItem) => {
      const [menu, quantityStr] = orderItem.split(DELIMITER.dash);
      const quantity = Number(quantityStr);
      return { menu, quantity };
    });
  }

  /**
   * 데이터베이스에서 해당 함수가 존재하는지 찾는 함수
   * @param { string } menuName
   */

  #findMenu(menuName) {
    return this.#allMenu.find((menu) => menu.menu === menuName);
  }
}

export default OrderService;
