import OrderRulesValidator from '../../src/validator/OrderRulesValidator.js';
import OrderError from '../../src/errors/OrderError.js';
import ORDER_CONFIG_DATA from '../../src/database/configData/orderConfigData.js';

describe('OrderRulesValidator', () => {
  let orderRulesValidator;

  beforeEach(() => {
    orderRulesValidator = new OrderRulesValidator();
  });

  test('주문 리스트에 대한 예외 처리', () => {
    const orderList = [
      [
        { menu: '양송이수프', quantity: 3 },
        { menu: '타파스', quantity: 5 },
        { menu: '제로콜라', quantity: 13 },
      ],
      [
        {
          menu: '양송이수프',
          quantity: ORDER_CONFIG_DATA.max_quantity + 1,
        },
      ],
      [{ menu: '제로콜라', quantity: 3 }],
      [{ menu: '바비큐립', quantity: -1 }],
    ];
    expect(() => orderRulesValidator.validateOrderRules(orderList)).toThrow(OrderError);
  });

  test('총 주문 수량 초과시 예외처리', () => {
    const orderList = [{ menu: '메뉴1', quantity: ORDER_CONFIG_DATA.max_quantity + 1 }];
    expect(() => orderRulesValidator.validateOrderRules(orderList)).toThrow(OrderError);
  });

  test('주문 수량이 음수일때 예외처리', () => {
    const orderList = [{ menu: '저가격 메뉴', quantity: -2 }];
    expect(() => orderRulesValidator.validateOrderRules(orderList)).toThrow(OrderError);
  });

  test('음료만 시켰을때 예외 처리', () => {
    const orderList = [{ menu: '제로콜라', quantity: 3 }];
    expect(() => orderRulesValidator.validateOrderRules(orderList)).toThrow(OrderError);
  });

  test('유효한 주문', () => {
    const orderList = [{ menu: '양송이수프', quantity: 2 }];
    expect(() => orderRulesValidator.validateOrderRules(orderList)).not.toThrow();
  });
});
