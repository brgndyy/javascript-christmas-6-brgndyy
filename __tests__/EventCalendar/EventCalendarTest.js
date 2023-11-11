import EventCalendar from '../../src/domains/EventCalendar.js';
import DateError from '../../src/errors/DateError.js';
import DATE_CONFIG_DATA from '../../src/database/configData/dateConfigData.js';

describe('EventCalendar', () => {
  test('정상적인 날짜 입력', () => {
    const validDate = 15;
    const calendar = new EventCalendar(validDate);
    expect(calendar.getDate()).toBe(validDate);
    expect(calendar.getDay()).toBe(DATE_CONFIG_DATA.visit_day(validDate));
  });

  test.each([[0], [32], [-3], ['abc'], [' 10 '], [' 3'], ['5 ']])(
    '유효하지 않은 날짜 입력시 예외발생',
    (invalidDate) => {
      expect(() => new EventCalendar(invalidDate)).toThrow(DateError);
    },
  );
});
