import EligibilityChecker from '../../src/service/EligibilityChecker.js';
import EVENT_BADGE_CONFIG_DATA from '../../src/database/configData/eventBageConfigData.js';
import FREE_GIFT_CONFIG_DATA from '../../src/database/configData/freeGiftConfigData.js';

describe('이벤트 적용 유무 판단을 해주는 유틸리티 클래스 EligibilityChecker 클래스에 관한 테스트 코드', () => {
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

  test('총 주문 금액이 증정 이벤트 조건을 충족할 때 증정 선물을 반환한다', () => {
    const totalPrice = FREE_GIFT_CONFIG_DATA.price_condition + 1;
    const result = EligibilityChecker.isEligibleForFreeGift(totalPrice);

    expect(result).toEqual(FREE_GIFT_CONFIG_DATA.menu);
  });

  test('총 주문 금액이 증정 이벤트 조건을 충족하지 않을 때 false를 반환한다', () => {
    const totalPrice = FREE_GIFT_CONFIG_DATA.price_condition - 1;
    const result = EligibilityChecker.isEligibleForFreeGift(totalPrice);

    expect(result).toBeFalsy();
  });
});
