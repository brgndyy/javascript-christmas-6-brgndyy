import asyncFnHandlerWithError from './utils/asyncFnHandlerWithError.js';
import OutputView from './views/OutputView.js';
import InputView from './views/InputView.js';
import EventCalendar from './domains/EventCalendar.js';
import Order from './domains/Order.js';

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

  async run() {
    this.#printOrderStart();
    await asyncFnHandlerWithError(this.#selectDate, this);
    await asyncFnHandlerWithError(this.#selectMenu, this);
    this.#printAllOrderedMenu();
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
}

export default App;
