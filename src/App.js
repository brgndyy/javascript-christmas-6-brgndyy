import asyncFnHandlerWithError from './utils/asyncFnHandlerWithError.js';
import OutputView from './views/OutputView.js';
import InputView from './views/InputView.js';
import EventCalendar from './domains/EventCalendar.js';
import Order from './domains/Order.js';
import FreeGiftService from './service/FreeGiftService.js';
import DiscountMachine from './domains/DiscountMachine.js';

class App {
  /**
   * @type { number }  방문 날짜
   */

  #visitDate;

  /**
   * @type { object } 주문한 내역
   */

  #totalOrderedList;

  /**
   * @type { number } 총 주문한 가격
   */

  #totalOrderPrice;

  /**
   * @type { DiscountMachine } 혜택 내역 및 할인률을 계산해줄 클래스
   */

  #discountMachine;

  async run() {
    this.#printOrderStart();
    await asyncFnHandlerWithError(this.#selectDate, this);
    await asyncFnHandlerWithError(this.#selectMenu, this);
    this.#printAllOrderedMenu();
    this.#printOrderResultBeforeDiscount();
    this.#printFreeGiftMenu();
    this.#printDiscountList();
  }

  #printOrderStart() {
    OutputView.printStartLine();
  }

  async #selectDate() {
    const dateInput = await InputView.readDate();
    this.#visitDate = EventCalendar.fromInputString(dateInput);
  }

  async #selectMenu() {
    const orderInput = await InputView.readMenu();
    const { totalOrderedList, totalPrice } = Order.getOrderInfoFromInput(orderInput);

    this.#totalOrderedList = totalOrderedList;
    this.#totalOrderPrice = totalPrice;
  }

  #printAllOrderedMenu() {
    OutputView.printResultStart(this.#visitDate);
    OutputView.printDivideLine();
    OutputView.printMenu(this.#totalOrderedList);
    OutputView.printDivideLine();
  }

  #printOrderResultBeforeDiscount() {
    OutputView.printPriceBeforeDiscount(this.#totalOrderPrice);
    OutputView.printDivideLine();
  }

  #printFreeGiftMenu() {
    const freeGift = FreeGiftService.isEligibleForFreeGift(this.#totalOrderPrice);

    OutputView.printIsEligibleFreeGift(freeGift);
    OutputView.printDivideLine();
  }

  #printDiscountList() {
    this.#discountMachine = new DiscountMachine(this.#visitDate);
    const discountList = this.#discountMachine.getAllDiscountList(
      this.#totalOrderedList,
      this.#totalOrderPrice,
    );

    OutputView.printDiscountList(discountList);
    OutputView.printDivideLine();
  }
}

export default App;
