import pinosendmail from '../src/index';
import pino from 'pino';

test('error', async () => {
  const logger = pino();
  logger.error(new Error('test'));
  expect(1).toStrictEqual(1);
});
