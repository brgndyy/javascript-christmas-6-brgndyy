import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import App from '../src/App.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe('추가적인 총체적인 어플리케이션 테스트', () => {
  test('크리스마스 이후에 할인 적용 테스트', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['26', '타파스-2,제로콜라-5,양송이수프-1,초코케이크-2,바비큐립-3']);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '타파스 2개',
      '제로콜라 5개',
      '양송이수프 1개',
      '초코케이크 2개',
      '바비큐립 3개',
      '<할인 전 총주문 금액>',
      '224,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '평일 할인: -4,046원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-29,046원',
      '<할인 후 예상 결제 금액>',
      '219,954원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test('크리스마스 당일에 모든 음식 주문 결제 테스트', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions([
      '25',
      '양송이수프-1,타파스-1,시저샐러드-1,티본스테이크-1,바비큐립-1,해산물파스타-1,크리스마스파스타-1,초코케이크-1,아이스크림-1,제로콜라-1,레드와인-1,샴페인-1',
    ]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      '12월 25일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '양송이수프 1개',
      '타파스 1개',
      '시저샐러드 1개',
      '티본스테이크 1개',
      '바비큐립 1개',
      '해산물파스타 1개',
      '크리스마스파스타 1개',
      '초코케이크 1개',
      '아이스크림 1개',
      '제로콜라 1개',
      '레드와인 1개',
      '샴페인 1개',
      '<할인 전 총주문 금액>',
      '296,500원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '평일 할인: -4,046원',
      '증정 이벤트: -25,000원',
      '크리스마스 디데이 할인: -3,400원',
      '특별 할인: -1,000원',
      '<총혜택 금액>',
      '-33,446원',
      '<할인 후 예상 결제 금액>',
      '288,054원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test('12월 31일에 결제 테스트', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['31', '양송이수프-1,바비큐립-1,초코케이크-1,샴페인-1']);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      '12월 31일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '양송이수프 1개',
      '바비큐립 1개',
      '초코케이크 1개',
      '샴페인 1개',
      '<할인 전 총주문 금액>',
      '100,000원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '평일 할인: -2,023원',
      '특별 할인: -1,000원',
      '<총혜택 금액>',
      '-3,023원',
      '<할인 후 예상 결제 금액>',
      '96,977원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });
});
