import EVENT_BADGE_CONFIG_DATA from '../database/configData/eventBageConfigData.js';

class EventBadgeService {
  /**
   * 이벤트 뱃지에 대한 검증을 수행합니다.
   * @param { number } totalDiscountPrice
   * @returns { string | undefined }
   */

  static isEligibleForEventBadge(totalDiscountPrice) {
    const foundBadge = EVENT_BADGE_CONFIG_DATA.find(
      (option) => totalDiscountPrice >= option.minAmount,
    );
    return foundBadge && foundBadge.badge;
  }
}

export default EventBadgeService;
