import DATE_CONFIG_DATA from '../database/configData/dateConfigData.js';
import DateError from '../errors/DateError.js';
import DELIMITER from '../constants/delimiters/delimiter.js';

class EventCalendar {
  /**
   * @type { number } 예약 날짜
   */

  #date;

  /**
   * @type { number } 예약 날짜에 따른 방문 할 요일
   */

  #day;

  constructor(date) {
    this.#validate(date);
    this.#date = Number(date);
    this.#day = DATE_CONFIG_DATA.visit_day(this.#date);
  }

  #validate(date) {
    this.#validateSpace(date.toString());
    this.#validateType(Number(date));
    this.#validateRange(Number(date));
  }

  /**
   * 문자열일때, 공백 검증을 위한 유효성 검증
   * @param { string } dateToString
   */

  #validateSpace(dateToString) {
    if (dateToString.includes(DELIMITER.space)) {
      throw new DateError();
    }
  }

  /**
   * 날짜 숫자형 검증
   * @param { number } dateToNumber
   */

  #validateType(dateToNumber) {
    if (Number.isNaN(dateToNumber)) {
      throw new DateError();
    }
  }

  /**
   * 입력 받은 날짜의 범위 유효성 검증
   * @param { number } dateToNumber
   */

  #validateRange(dateToNumber) {
    if (dateToNumber < DATE_CONFIG_DATA.min_date || dateToNumber > DATE_CONFIG_DATA.max_date) {
      throw new DateError();
    }
  }

  getDate() {
    return this.#date;
  }

  getDay() {
    return this.#day;
  }

  /**
   * 사용자에게 입력을 받고 유효성 검증후, 방문 날짜를 반환해주는 함수
   * @param { string } dateInput
   * @returns
   */

  static fromInputString(dateInput) {
    const visitDate = new EventCalendar(dateInput);
    return visitDate.getDate();
  }
}

export default EventCalendar;
