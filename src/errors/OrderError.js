import ERROR_MESSAGES from '../constants/messages/errorMessages.js';

class OrderError extends Error {
  /**
   * @type {string}
   */

  static PREFIX = '[ERROR]';

  /**
   * @type {string}
   */
  name;

  /**
   *
   * @param {string} errorMessage
   */

  constructor() {
    const message = `${OrderError.PREFIX} ${ERROR_MESSAGES.not_correct_order}\n`;
    super(message);
    this.name = this.constructor.name;
  }
}

export default OrderError;
