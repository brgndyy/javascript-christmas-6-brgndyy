import OrderFormatValidator from '../../src/validator/OrderFormatValidator.js';
import OrderError from '../../src/errors/OrderError.js';

describe('OrderFormatValidator', () => {
  let orderFormatValidator;

  beforeEach(() => {
    orderFormatValidator = new OrderFormatValidator();
  });

  test.each([
    [[{ menu: '양 송이수프', quantity: 1 }]],
    [[{ menu: '양송이수프', quantity: 21 }]],
    [[{ menu: '양송이수프', quantity: -2 }]],
    [[{ menu: '양송이수프', quantity: 'ds' }]],
    [[{ menu: '양송이수프', quantity: '  ' }]],
    [[{ menu: '양송이수프', quantity: '1 2' }]],
    [
      [
        { menu: '양송이수프', quantity: 1 },
        { menu: '양송이수프', quantity: 1 },
      ],
    ],
  ])('유효하지 않은 주문시 예외 발생', (orderList) => {
    expect(() => orderFormatValidator.validateInputFormat(orderList)).toThrow(new OrderError());
  });

  test('유효한 주문 데이터 처리', () => {
    const orderList = [{ menu: '양송이수프', quantity: 1 }];
    expect(() => orderFormatValidator.validateInputFormat(orderList)).not.toThrow();
  });
});
