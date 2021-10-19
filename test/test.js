// import pinosendmail from '../src/index';
import pino from 'pino';
const options = {
  transport: {
    pipeline: [
      {
        target: '../src/index.js',
        level: 'error'
      },
      {
        // Use target: 'pino/file' to write to stdout
        // without any change.
        target: 'pino-pretty'
      }
    ]
  }
};
const logger = pino(options);
logger.error(new Error('test'));

// test('error', async () => {
//   logger.error(new Error('test'));
//   expect(1).toStrictEqual(1);
// });
