import OrderValidator from '../../src/validator/OrderValidator.js';

describe('OrderValidator', () => {
  let orderValidator;

  beforeEach(() => {
    orderValidator = new OrderValidator();
  });

  test('유효한 주문 데이터 처리', () => {
    const validOrderList = [{ menu: '양송이수프', quantity: 2 }];
    expect(() => orderValidator.validate(validOrderList)).not.toThrow();
  });
});
