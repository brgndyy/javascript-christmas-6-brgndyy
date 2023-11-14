import App from '../../src/App.js';
import mockQuestions from '../../src/test/testUtils/mockQuestions.js';
import getLogSpy from '../../src/test/testUtils/getLogSpy.js';
import getOutput from '../../src/test/testUtils/getOutput.js';
import expectLogContains from '../../src/test/testUtils/expectedLogContains.js';
import expectedTestOutput from '../../src/test/data/expectedTestOutput.js';

describe('추가적인 총체적인 어플리케이션 테스트', () => {
  test.each(expectedTestOutput)(
    '각각 테스트 데이터에 대한 테스트',
    async ({ date, orderList, expectedResult }) => {
      const logSpy = getLogSpy();
      mockQuestions([date.toString(), ...orderList]);

      const app = new App();
      await app.run();

      expectLogContains(getOutput(logSpy), expectedResult);
    },
  );
});
