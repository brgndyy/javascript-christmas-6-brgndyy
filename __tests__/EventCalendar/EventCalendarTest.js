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

  test.each([['0'], ['32'], ['-3'], ['abc'], ['1 2'], [''], ['   ']])(
    '유효하지 않은 날짜 입력시 예외발생',
    (invalidDate) => {
      expect(() => new EventCalendar(invalidDate)).toThrow(DateError);
    },
  );

  test.each([[1], [2], [8], [9], [15], [16], [22], [23], [29], [30]])(
    '방문 날짜에 해당하는 요일이 금, 토요일인 경우 isWeekend가 true를 반환해야 한다',
    (date) => {
      const calendar = new EventCalendar(date);
      expect(calendar.isWeekend()).toBeTruthy();
    },
  );

  test.each([
    [3],
    [4],
    [5],
    [6],
    [7],
    [10],
    [11],
    [12],
    [13],
    [14],
    [17],
    [18],
    [19],
    [20],
    [21],
    [24],
    [25],
    [26],
    [27],
    [28],
    [31],
  ])(
    '방문 날짜에 해당하는 요일이 일, 월, 화, 수 목요일인 경우 isWeekday가 true를 반환해야 한다',
    (date) => {
      const calendar = new EventCalendar(date);
      expect(calendar.isWeekday()).toBeTruthy();
    },
  );

  test.each([[3], [10], [17], [24], [25], [31]])(
    '방문 날짜에 해당하는 요일이 특별 할인 기간에 알맞을 경우 isSpecialDay가 true를 반환해야 한다',
    (date) => {
      const calendar = new EventCalendar(date);
      expect(calendar.isSpecialDay()).toBeTruthy();
    },
  );

  test('특별 할인 기간에 알맞지 않은 조건일 경우 isSpecialDay가 false를 반환해야 한다', () => {
    const normalDay = DATE_CONFIG_DATA.event_target_date + 1;
    const calendar = new EventCalendar(normalDay);
    expect(calendar.isSpecialDay()).toBeFalsy();
  });

  test('유효한 문자열 입력으로 fromInputString 정적 메서드를 호출하면 날짜를 반환해야 한다.', () => {
    const validInput = '10';
    expect(EventCalendar.fromInputString(validInput)).toBe(10);
  });

  test.each([['abc'], ['1 2'], ['']])(
    '유효하지 않은 문자열 입력으로 fromInputString을 호출하면 예외가 발생해야 함',
    (invalidInput) => {
      expect(() => EventCalendar.fromInputString(invalidInput)).toThrow(DateError);
    },
  );
});
