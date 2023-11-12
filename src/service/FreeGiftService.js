import FREE_GIFT_CONDITION_CONFIG_DATA from '../database/configData/freeGiftConfigData.js';
import FREE_GIFT_MENU from '../database/menus/freeGiftMenu.js';

class FreeGiftService {
  /**
   * 무료 증정 혜택에 대한 검증을 수행합니다.
   * @param { number } totalPrice
   * @returns { boolean}
   */

  static isEligibleForFreeGift(totalPrice) {
    return totalPrice > FREE_GIFT_CONDITION_CONFIG_DATA.price && FREE_GIFT_MENU;
  }
}

export default FreeGiftService;
