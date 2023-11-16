import ALL_MENU_DATA from '../menus/allMenu.js';
import deepFreeze from '../../utils/deepFreeze.js';

const FREE_GIFT_MENU = ALL_MENU_DATA.filter((item) => item.isFreeGift);

const TOTAL_FREE_GIFT_PRICE = FREE_GIFT_MENU.reduce((acc, gift) => acc + gift.price, 0);

const FREE_GIFT_CONFIG_DATA = deepFreeze({
  menu: FREE_GIFT_MENU,
  total_price: TOTAL_FREE_GIFT_PRICE,
  price_condition: 120000,
});

export default FREE_GIFT_CONFIG_DATA;
