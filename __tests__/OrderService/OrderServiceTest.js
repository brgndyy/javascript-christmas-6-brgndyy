import OrderService from '../../src/service/OrderService.js';
import OrderError from '../../src/errors/OrderError.js';

describe('OrderService', () => {
  let orderService;

  beforeEach(() => {
    orderService = new OrderService();
  });

  test('유효한 주문 데이터 처리', () => {
    const validOrderList = [
      { menu: '양송이수프', quantity: 2 },
      { menu: '타파스', quantity: 1 },
    ];
    const result = orderService.accumulateOrderData(validOrderList);
    expect(result.totalPrice).toBeGreaterThan(0);
    expect(result.totalQuantity).toBe(3);
    expect(result.foodOrdered).toBe(true);
    expect(result.totalOrderedList.length).toBe(2);
  });

  test('주문 목록 파싱', () => {
    const orderListStr = ['양송이수프-2', '타파스-1'];
    const parsedOrderList = orderService.parseOrderList(orderListStr);
    expect(parsedOrderList).toEqual([
      { menu: '양송이수프', quantity: 2 },
      { menu: '타파스', quantity: 1 },
    ]);
  });

  test('존재하지 않는 메뉴 주문 시 오류 발생', () => {
    const invalidOrderList = [{ menu: '짜장면', quantity: 1 }];
    expect(() => orderService.accumulateOrderData(invalidOrderList)).toThrow(new OrderError());
  });
});
