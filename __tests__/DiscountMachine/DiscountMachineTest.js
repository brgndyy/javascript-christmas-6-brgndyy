import DiscountMachine from '../../src/domains/DiscountMachine.js';

describe('DiscountMachine 클래스 테스트', () => {
  let discountMachine;
  let mockDate;
  let mockOrderPrice;

  beforeEach(() => {
    mockDate = 25;
    mockOrderPrice = 125000;
    discountMachine = new DiscountMachine(mockDate, mockOrderPrice);
  });

  test('getAllDiscountList 메서드가 총 할인 내역을 올바르게 반환하는지 확인', () => {
    const expectedDiscountList = {
      '평일 할인': 4046,
      '특별 할인': 1000,
      '증정 이벤트': 25000,
      '크리스마스 디데이 할인': 3400,
    };
    const mockOrderList = [
      { menu: '해산물파스타', quantity: 1, category: 'main', price: 35000 },
      { menu: '레드와인', quantity: 1, category: 'drink', price: 60000 },
      { menu: '초코케이크', quantity: 2, category: 'dessert', price: 30000 },
    ];
    const result = discountMachine.getAllDiscountList(mockOrderList);
    expect(result).toEqual(expectedDiscountList);
  });

  test('총 주문 금액이 10,000원보다 적을땐 getAllDiscountList 메서드가 작동하지 않는다.', () => {
    const lowOrderPrice = 9000;
    const discountMachineWithLowPrice = new DiscountMachine(mockDate, lowOrderPrice);

    const expectedDiscountList = {};
    const mockOrderList = [{ menu: '타파스', quantity: 1, category: 'main', price: 5500 }];
    const result = discountMachineWithLowPrice.getAllDiscountList(mockOrderList);
    expect(result).toEqual(expectedDiscountList);
  });

  test('getTotalPriceAfterDiscount 메서드가 최종 가격을 올바르게 계산하는지 확인', () => {
    const mockTotalDiscount = 5000;
    const expectedTotalPrice = mockOrderPrice - mockTotalDiscount;
    const result = discountMachine.getTotalPriceAfterDiscount(mockTotalDiscount);
    expect(result).toBe(expectedTotalPrice);
  });
});
