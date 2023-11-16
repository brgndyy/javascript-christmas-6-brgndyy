import deepFreeze from '../../utils/deepFreeze.js';

/**
 * 전체적인 연도, 월, 날짜, 요일을 관리하는 날짜 시스템 객체
 */

const YEAR_STANDARD = new Date().getFullYear();

const MONTH_STANDARD = 11;

const MIN_DATE = 1;

const MAX_DATE = new Date(YEAR_STANDARD, MONTH_STANDARD + 1, 0).getDate();

const DAY_TO_NUMBER = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const EVENT_TARGET_DATE = 25;

/**
 * 방문 날짜에 해당 하는 요일 반환
 * @param { number } nowDate
 * @returns
 */

const VISIT_DAY = (nowDate) => new Date(YEAR_STANDARD, MONTH_STANDARD, nowDate).getDay();

const DATE_CONFIG_DATA = deepFreeze({
  year_standard: YEAR_STANDARD,
  month_standard: MONTH_STANDARD + 1,
  min_date: MIN_DATE,
  max_date: MAX_DATE,
  day_to_number: DAY_TO_NUMBER,
  event_target_date: EVENT_TARGET_DATE,
  visit_day: (nowDate) => VISIT_DAY(nowDate),
});

export default DATE_CONFIG_DATA;
