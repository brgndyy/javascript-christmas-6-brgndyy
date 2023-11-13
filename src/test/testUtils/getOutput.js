import { EOL as LINE_SEPARATOR } from 'os';

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

export default getOutput;
