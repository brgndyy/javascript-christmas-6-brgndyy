import EligibilityChecker from '../../src/service/EligibilityChecker.js';
import EVENT_BADGE_CONFIG_DATA from '../../src/database/configData/eventBageConfigData.js';

describe('EligibilityChecker 클래스의 이벤트 뱃지 조건 충족 판단 함수에 대한 테스트', () => {
  test.each(EVENT_BADGE_CONFIG_DATA)(
    '혜택 금액이 조건을 충족할때, 조건에 맞는 이벤트 뱃지를 반환한다',
    ({ minPrice, badge }) => {
      const totalDiscountPrice = minPrice;
      const result = EligibilityChecker.isEligibleForEventBadge(totalDiscountPrice);
      expect(result).toEqual(badge);
    },
  );

  test('혜택 금액이 모든 뱃지의 최소 금액 미만일 때, 뱃지를 반환하지 않는다', () => {
    const totalDiscountPrice =
      Math.min(...EVENT_BADGE_CONFIG_DATA.map((option) => option.minPrice)) - 1;
    const result = EligibilityChecker.isEligibleForEventBadge(totalDiscountPrice);
    expect(result).toBeUndefined();
  });
});
