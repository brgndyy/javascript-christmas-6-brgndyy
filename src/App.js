import asyncFnHandlerWithError from './utils/asyncFnHandlerWithError.js';
import OutputView from './views/OutputView.js';
import InputView from './views/InputView.js';
import EventCalendar from './domains/EventCalendar.js';

class App {
  /**
   * @type { number }  방문 날짜
   */

  #visitDate;

  async run() {
    this.#printOrderStart();
    await asyncFnHandlerWithError(this.#selectDate, this);
  }

  #printOrderStart() {
    OutputView.printStartLine();
  }

  async #selectDate() {
    const dateInput = await InputView.readDate();
    this.#visitDate = EventCalendar.fromInputString(dateInput);
  }
}

export default App;
