import EventCalendar from './EventCalendar.js';
import EVENT_CONFIG_DATA from '../database/configData/eventConfigData.js';
import ORDER_CONFIG_DATA from '../database/configData/orderConfigData.js';
import DiscountMachineHelper from '../helper/DiscountMachineHelper.js';
import findObjectBySlug from '../utils/findObjFromProperty.js';
import FREE_GIFT_CONFIG_DATA from '../database/configData/freeGiftConfigData.js';

class DiscountMachine {
  /**
   * @type {EventCalendar } 이벤트 기간의 내용을 담은 클래스
   */

  #eventCalendar;

  /**
   * @type { object[] } 할인 내역, 처음엔 모두 0원으로 초기화 해줍니다.
   */

  #discountList;

  /**
   * @type { object } 각각 이벤트 내역에 맞는 할인 적용 함수 모음 객체
   */

  #discountCalculators = {
    weekday: this.#calculateDiscountForWeekDay,
    weekend: this.#calculateDiscountForWeekend,
    special: this.#calculateSpecialDiscount,
    free_gift: this.#calculateDiscountForFreeGift,
    target_event: this.#calculateDiscountForTargetEvent,
  };

  /**
   * @type { number } 총 주문금애
   */

  #totalOrderPrice;

  constructor(date, totalOrderPrice) {
    this.#eventCalendar = new EventCalendar(date);
    this.#totalOrderPrice = totalOrderPrice;
    this.#initializeDiscountList();
  }

  #initializeDiscountList() {
    this.#discountList = EVENT_CONFIG_DATA.reduce((discountList, eventConfig) => {
      return {
        ...discountList,
        [eventConfig.title]: ORDER_CONFIG_DATA.zero_price,
      };
    }, {});
  }

  #calculateDiscountForTargetEvent() {
    const dateOfMonth = this.#eventCalendar.getDate();
    const targetEventConfig = findObjectBySlug(EVENT_CONFIG_DATA, 'target_event');
    if (
      dateOfMonth >= targetEventConfig.sale_start_day &&
      dateOfMonth <= targetEventConfig.sale_end_day
    ) {
      return targetEventConfig.sale_basic_price + (dateOfMonth - 1) * targetEventConfig.sale_range;
    }
    return ORDER_CONFIG_DATA.zero_price;
  }

  /**
   * 평일 할인 혜택 계산 함수
   * @param { object[] } orderList
   * @returns { number }
   */

  #calculateDiscountForWeekDay(orderList) {
    const weekDayEventConfig = findObjectBySlug(EVENT_CONFIG_DATA, 'weekday');
    if (this.#eventCalendar.isWeekday()) {
      return DiscountMachineHelper.calculateQuantityAndPriceFromData(
        orderList,
        weekDayEventConfig.sale_category,
        weekDayEventConfig.sale_price,
      );
    }
    return ORDER_CONFIG_DATA.zero_price;
  }

  #calculateDiscountForWeekend(orderList) {
    const weekendConfig = findObjectBySlug(EVENT_CONFIG_DATA, 'weekend');
    if (this.#eventCalendar.isWeekend()) {
      return DiscountMachineHelper.calculateQuantityAndPriceFromData(
        orderList,
        weekendConfig.sale_category,
        weekendConfig.sale_price,
      );
    }
    return ORDER_CONFIG_DATA.zero_price;
  }

  #calculateSpecialDiscount() {
    const specialConfig = findObjectBySlug(EVENT_CONFIG_DATA, 'special');
    if (this.#eventCalendar.isSpecialDay()) {
      return specialConfig.sale_price;
    }

    return ORDER_CONFIG_DATA.zero_price;
  }

  /**
   * 증정 이벤트 조건에 충족 했을때, 증정 이벤트 물품 가격 반환
   * @param { number } totalOrderPrice
   * @returns { number }
   */

  #calculateDiscountForFreeGift() {
    if (this.#totalOrderPrice >= FREE_GIFT_CONFIG_DATA.price_condition) {
      return FREE_GIFT_CONFIG_DATA.total_price;
    }
    return ORDER_CONFIG_DATA.zero_price;
  }

  /**
   * 해당 이벤트들의 혜택 계산을 도와주는 함수
   * @param { object[] } totalOrderedList
   * @param { number } totalOrderPrice
   * @returns { object[] }
   */

  #calculateAllDiscounts(totalOrderedList) {
    return EVENT_CONFIG_DATA.reduce((discountResults, eventConfig) => {
      const calculator = this.#discountCalculators[eventConfig.slug];
      const discountAmount = calculator.call(this, totalOrderedList);

      return {
        ...discountResults,
        [eventConfig.title]: discountAmount,
      };
    }, {});
  }
  /**
   * 주문 내역 객체 배열과 총 주문 금액을 받아서, 총 혜택 내역을 반환하는 함수
   * @param { object[] } totalOrderedList
   * @param { number } totalOrderPrice
   * @returns { object[] }
   */

  getAllDiscountList(totalOrderedList) {
    if (this.#totalOrderPrice >= ORDER_CONFIG_DATA.min_discount_price) {
      this.#discountList = this.#calculateAllDiscounts(totalOrderedList);
    }
    return DiscountMachineHelper.calculateTotalDataExceptZeroValue(this.#discountList);
  }

  getTotalDiscount() {
    return DiscountMachineHelper.calculateTotalValueFromData(this.#discountList);
  }

  getTotalPriceAfterDiscount(totalDiscount) {
    const freeGiftEventConfig = findObjectBySlug(EVENT_CONFIG_DATA, 'free_gift');
    return (
      this.#totalOrderPrice - totalDiscount + (this.#discountList?.[freeGiftEventConfig.title] || 0)
    );
  }
}

export default DiscountMachine;
