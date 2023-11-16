import EVENT_BADGE_CONFIG_DATA from '../database/configData/eventBageConfigData.js';
import FREE_GIFT_CONFIG_DATA from '../database/configData/freeGiftConfigData.js';

class EligibilityChecker {
  /**
   * 총 금액에 따른 증정 선물 유무 판단 함수
   * @param { number } totalPrice
   * @returns { string | undefined }
   */

  static isEligibleForFreeGift(totalPrice) {
    return totalPrice > FREE_GIFT_CONFIG_DATA.price_condition && FREE_GIFT_CONFIG_DATA.menu;
  }

  /**
   * 총 혜택 금액에 따른 이벤트 뱃지 반환 함수
   * @param { number } totalDiscountPrice
   * @returns { string | undefined}
   */

  static isEligibleForEventBadge(totalDiscountPrice) {
    const foundBadge = EVENT_BADGE_CONFIG_DATA.find(
      (option) => totalDiscountPrice >= option.minPrice,
    );
    return foundBadge && foundBadge.badge;
  }
}

export default EligibilityChecker;
