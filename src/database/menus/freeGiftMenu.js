import ALL_MENU_DATA from './allMenu.js';

export const FREE_GIFT_MENU = ALL_MENU_DATA.filter((item) => item.isFreeGift);

export const TOTAL_FREE_GIFT_PRICE = FREE_GIFT_MENU.reduce((acc, gift) => acc + gift.price, 0);
