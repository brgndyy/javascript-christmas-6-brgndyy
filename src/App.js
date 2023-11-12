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

  async run() {
    this.#printOrderStart();
    await asyncFnHandlerWithError(this.#selectDate, this);
    await asyncFnHandlerWithError(this.#selectMenu, this);
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

    console.log(orderInput);
  }
}

export default App;
