import EventCalendar from './EventCalendar.js';
import {
  WEEKEND_EVENT_CONFIG_DATA,
  TARGET_EVENT_CONFIG_DATA,
  WEEK_DAY_EVENT_CONFIG_DATA,
  SPECIAL_EVENT_CONFIG_DATA,
  FREE_GIFT_EVENT_CONFIG_DATA,
  NONE_SALE_PRICE,
} from '../database/configData/eventConfigData.js';
import FREE_GIFT_CONDITION from '../database/configData/freeGiftConfigData.js';
import ORDER_CONFIG_DATA from '../database/configData/orderConfigData.js';
import { TOTAL_FREE_GIFT_PRICE } from '../database/menus/freeGiftMenu.js';
import CalculatorService from '../service/CalculatorService.js';

class DiscountMachine {
  /**
   * @type {EventCalendar } 이벤트 기간의 내용을 담은 클래스
   */

  #eventCalendar;

  /**
   * @type { object[] } 할인 내역, 처음엔 모두 0원으로 초기화 해줍니다.
   */

  #discountList;

  constructor(date) {
    this.#eventCalendar = new EventCalendar(date);
    this.#initializeDiscountList();
  }

  #initializeDiscountList() {
    this.#discountList = {
      [TARGET_EVENT_CONFIG_DATA.title]: NONE_SALE_PRICE,
      [WEEK_DAY_EVENT_CONFIG_DATA.title]: NONE_SALE_PRICE,
      [WEEKEND_EVENT_CONFIG_DATA.title]: NONE_SALE_PRICE,
      [SPECIAL_EVENT_CONFIG_DATA.title]: NONE_SALE_PRICE,
      [FREE_GIFT_EVENT_CONFIG_DATA.title]: NONE_SALE_PRICE,
    };
  }

  #calculateDiscountForTargetEvent() {
    const dateOfMonth = this.#eventCalendar.getDate();
    if (
      dateOfMonth >= TARGET_EVENT_CONFIG_DATA.sale_start_day &&
      dateOfMonth <= TARGET_EVENT_CONFIG_DATA.sale_end_day
    ) {
      return (
        TARGET_EVENT_CONFIG_DATA.sale_basic_price +
        (dateOfMonth - 1) * TARGET_EVENT_CONFIG_DATA.sale_range
      );
    }
    return NONE_SALE_PRICE;
  }

  /**
   * 평일 할인 혜택 계산 함수
   * @param { object[] } orderList
   * @returns { number }
   */

  #calculateDiscountForWeekDay(orderList) {
    if (this.#eventCalendar.isWeekday()) {
      return CalculatorService.calculateQuantityAndPriceFromData(
        orderList,
        WEEK_DAY_EVENT_CONFIG_DATA.sale_category,
        WEEK_DAY_EVENT_CONFIG_DATA.sale_price,
      );
    }
    return NONE_SALE_PRICE;
  }

  #calculateDiscountForWeekend(orderList) {
    if (this.#eventCalendar.isWeekend()) {
      return CalculatorService.calculateQuantityAndPriceFromData(
        orderList,
        WEEKEND_EVENT_CONFIG_DATA.sale_category,
        WEEKEND_EVENT_CONFIG_DATA.sale_price,
      );
    }
    return NONE_SALE_PRICE;
  }

  #calculateSpecialDiscount() {
    if (this.#eventCalendar.isSpecialDay()) {
      return SPECIAL_EVENT_CONFIG_DATA.sale_price;
    }

    return NONE_SALE_PRICE;
  }

  /**
   * 증정 이벤트 조건에 충족 했을때, 증정 이벤트 물품 가격 반환
   * @param { number } totalOrderPrice
   * @returns { number }
   */

  #calculateDiscountForFreeGift(totalOrderPrice) {
    if (totalOrderPrice >= FREE_GIFT_CONDITION.price) {
      return TOTAL_FREE_GIFT_PRICE;
    }
    return NONE_SALE_PRICE;
  }

  /**
   * 해당 이벤트들의 혜택 계산을 도와주는 함수
   * @param { object[] } totalOrderedList
   * @param { number } totalOrderPrice
   * @returns { object[] }
   */

  #calculateAllDiscounts(totalOrderedList, totalOrderPrice) {
    return {
      [TARGET_EVENT_CONFIG_DATA.title]: this.#calculateDiscountForTargetEvent(),
      [WEEK_DAY_EVENT_CONFIG_DATA.title]: this.#calculateDiscountForWeekDay(totalOrderedList),
      [WEEKEND_EVENT_CONFIG_DATA.title]: this.#calculateDiscountForWeekend(totalOrderedList),
      [SPECIAL_EVENT_CONFIG_DATA.title]: this.#calculateSpecialDiscount(),
      [FREE_GIFT_EVENT_CONFIG_DATA.title]: this.#calculateDiscountForFreeGift(totalOrderPrice),
    };
  }

  /**
   * 주문 내역 객체 배열과 총 주문 금액을 받아서, 총 혜택 내역을 반환하는 함수
   * @param { object[] } totalOrderedList
   * @param { number } totalOrderPrice
   * @returns { object[] }
   */

  getAllDiscountList(totalOrderedList, totalOrderPrice) {
    if (totalOrderPrice >= ORDER_CONFIG_DATA.min_discount_price) {
      this.#discountList = this.#calculateAllDiscounts(totalOrderedList, totalOrderPrice);
    }
    return CalculatorService.calculateTotalDataExceptZeroValue(this.#discountList);
  }

  getTotalDiscount() {
    return CalculatorService.calculateTotalValueFromData(this.#discountList);
  }

  getTotalPriceAfterDiscount(totalOrderPrice, totalDiscount) {
    return (
      totalOrderPrice -
      totalDiscount +
      (this.#discountList?.[FREE_GIFT_EVENT_CONFIG_DATA.title] || 0)
    );
  }
}

export default DiscountMachine;
