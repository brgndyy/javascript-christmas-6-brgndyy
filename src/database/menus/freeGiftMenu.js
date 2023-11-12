import ALL_MENU_DATA from './allMenu.js';

const FREE_GIFT_MENU = ALL_MENU_DATA.filter((item) => item.isFreeGift);

export default FREE_GIFT_MENU;
