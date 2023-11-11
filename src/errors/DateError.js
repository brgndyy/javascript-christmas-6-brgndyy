import ERROR_MESSAGES from '../constants/messages/errorMessages.js';

class DateError extends Error {
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
    const message = `${DateError.PREFIX} ${ERROR_MESSAGES.not_correct_date}\n`;
    super(message);
    this.name = this.constructor.name;
  }
}

export default DateError;
