import EligibilityChecker from '../../src/service/EligibilityChecker.js';
import FREE_GIFT_CONFIG_DATA from '../../src/database/configData/freeGiftConfigData.js';

describe('EligibilityChecker 클래스의 선물 증정 이벤트에 대한 조건 충족 판단 함수 테스트', () => {
  test('총 주문 금액이 증정 이벤트 조건을 충족할 때 증정 선물을 반환한다', () => {
    const totalPrice = FREE_GIFT_CONFIG_DATA.total_price + 1;
    const result = EligibilityChecker.isEligibleForFreeGift(totalPrice);

    expect(result).toEqual(FREE_GIFT_CONFIG_DATA.menu);
  });

  test('총 주문 금액이 증정 이벤트 조건을 충족하지 않을 때 false를 반환한다', () => {
    const totalPrice = FREE_GIFT_CONFIG_DATA.total_price - 1;
    const result = EligibilityChecker.isEligibleForFreeGift(totalPrice);

    expect(result).toBeFalsy();
  });
});
