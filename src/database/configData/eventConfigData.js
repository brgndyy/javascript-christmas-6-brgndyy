import deepFreeze from '../../utils/deepFreeze.js';
import FREE_GIFT_MENU from '../menus/freeGiftMenu.js';

export const WEEK_DAY_EVENT_CONFIG_DATA = deepFreeze({
  title: '평일 할인',
  sale_price: 2023,
  sale_category: 'dessert',
});

export const WEEKEND_EVENT_CONFIG_DATA = deepFreeze({
  title: '주말 할인',
  sale_price: 2023,
  sale_category: 'main',
});

export const SPECIAL_EVENT_CONFIG_DATA = deepFreeze({
  title: '특별 할인',
  sale_price: 1000,
});

export const FREE_GIFT_EVENT_CONFIG_DATA = deepFreeze({
  title: '증정 이벤트',
  sale_price: FREE_GIFT_MENU.price,
});

export const TARGET_EVENT_CONFIG_DATA = deepFreeze({
  title: '크리스마스 디데이 할인',
  sale_basic_price: 1000,
  sale_range: 100,
  sale_start_day: 1,
  sale_end_day: 25,
});

export const NONE_SALE_PRICE = deepFreeze(0);
