import deepFreeze from '../../utils/deepFreeze.js';
import { TOTAL_FREE_GIFT_PRICE } from '../menus/freeGiftMenu.js';

const EVENT_CONFIG_DATA = deepFreeze([
  {
    id: 1,
    title: '평일 할인',
    slug: 'weekday',
    sale_price: 2023,
    sale_category: 'dessert',
  },
  {
    id: 2,
    title: '주말 할인',
    slug: 'weekend',
    sale_price: 2023,
    sale_category: 'main',
  },
  {
    id: 3,
    title: '특별 할인',
    slug: 'special',
    sale_price: 1000,
  },
  {
    id: 4,
    title: '증정 이벤트',
    slug: 'free_gift',
    sale_price: TOTAL_FREE_GIFT_PRICE,
  },
  {
    id: 5,
    title: '크리스마스 디데이 할인',
    slug: 'target_event',
    sale_basic_price: 1000,
    sale_range: 100,
    sale_start_day: 1,
    sale_end_day: 25,
  },
]);

export default EVENT_CONFIG_DATA;
