import Order from '../../src/domains/Order.js';
import OrderError from '../../src/errors/OrderError.js';

describe('Order 클래스에 대한 테스트', () => {
  test('정상적인 값 반환', () => {
    const input = [
      '양송이수프-1',
      '타파스-1',
      '시저샐러드-1',
      '티본스테이크-1',
      '바비큐립-1',
      '해산물파스타-1',
      '크리스마스파스타-1',
      '초코케이크-1',
      '아이스크림-1',
      '제로콜라-1',
      '레드와인-1',
      '샴페인-1',
    ];
    const expectedResult = {
      totalOrderedList: [
        { category: 'appetizer', menu: '양송이수프', price: 6000, quantity: 1 },
        { category: 'appetizer', menu: '타파스', price: 5500, quantity: 1 },
        { category: 'appetizer', menu: '시저샐러드', price: 8000, quantity: 1 },
        { category: 'main', menu: '티본스테이크', price: 55000, quantity: 1 },
        { category: 'main', menu: '바비큐립', price: 54000, quantity: 1 },
        { category: 'main', menu: '해산물파스타', price: 35000, quantity: 1 },
        { category: 'main', menu: '크리스마스파스타', price: 25000, quantity: 1 },
        { category: 'dessert', menu: '초코케이크', price: 15000, quantity: 1 },
        { category: 'dessert', menu: '아이스크림', price: 5000, quantity: 1 },
        { category: 'drink', menu: '제로콜라', price: 3000, quantity: 1 },
        { category: 'drink', menu: '레드와인', price: 60000, quantity: 1 },
        { category: 'drink', menu: '샴페인', price: 25000, quantity: 1 },
      ],
      totalPrice: 296500,
    };

    const result = Order.getOrderInfoFromInput(input);

    expect(result).toEqual(expectedResult);
  });

  test.each([[['콜라-1', '제로콜라-1']], [['제로콜라-20']], [['바베큐립-10, 제로콜라-2']]])(
    '유효하지 않은 입력값이 들어갔을때, 예외 발생',
    (orderList) => {
      expect(() => Order.getOrderInfoFromInput(orderList)).toThrow(new OrderError());
    },
  );
});
