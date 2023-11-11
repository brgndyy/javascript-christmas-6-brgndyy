import deepFreeze from '../../utils/deepFreeze.js';

/**
 * 전체적인 연도, 월, 날짜, 요일을 관리하는 날짜 시스템 객체
 */

const YEAR_STANDARD = new Date().getFullYear();

const MONTH_STANDARD = 11;

const MIN_DATE = 1;

const MAX_DATE = new Date(YEAR_STANDARD, MONTH_STANDARD + 1, 0).getDate();

/**
 * 방문 날짜에 해당 하는 요일 반환
 * @param { number } nowDate
 * @returns
 */

const VISIT_DAY = (nowDate) => new Date(YEAR_STANDARD, MONTH_STANDARD, nowDate).getDay();

const DATE_CONFIG_DATA = deepFreeze({
  year_standard: YEAR_STANDARD,
  month_standard: MONTH_STANDARD,
  min_date: MIN_DATE,
  max_date: MAX_DATE,
  visit_day: (nowDate) => VISIT_DAY(nowDate),
});

export default DATE_CONFIG_DATA;