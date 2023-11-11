import OutputView from './views/OutputView.js';

class App {
  async run() {
    this.#printOrderStart();
  }

  #printOrderStart() {
    OutputView.printStartLine();
  }
}

export default App;
