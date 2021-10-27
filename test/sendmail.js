// import pinosendmail from '../src/index';
// import pino from 'pino';
const pino = require('pino');

const options = {
  transport: {
    pipeline: [
      {
        target: '../src/sendmail',
        level: 'error'
      }
    ]
  }
};
const logger = pino(options);
logger.error(new Error('test'));
logger.info('test');
// test('error', async () => {
//   logger.error(new Error('test'));
//   expect(1).toStrictEqual(1);
// });
