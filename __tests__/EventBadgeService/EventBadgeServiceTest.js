import EventBadgeService from '../../src/service/EventBadgeService.js';
import EVENT_BADGE_CONFIG_DATA from '../../src/database/configData/eventBageConfigData.js';

describe('EventBadgeService 클래스에 대한 테스트', () => {
  // 충족 조건 테스트
  test.each(EVENT_BADGE_CONFIG_DATA)(
    '혜택 금액이 조건을 충족할때, 조건에 맞는 이벤트 뱃지를 반환한다',
    ({ minPrice, badge }) => {
      const totalDiscountPrice = minPrice;
      const result = EventBadgeService.isEligibleForEventBadge(totalDiscountPrice);
      expect(result).toEqual(badge);
    },
  );

  // 불충족 조건 테스트
  test('혜택 금액이 모든 뱃지의 최소 금액 미만일 때, 뱃지를 반환하지 않는다', () => {
    const totalDiscountPrice =
      Math.min(...EVENT_BADGE_CONFIG_DATA.map((option) => option.minPrice)) - 1;
    const result = EventBadgeService.isEligibleForEventBadge(totalDiscountPrice);
    expect(result).toBeUndefined();
  });
});
