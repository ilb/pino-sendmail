import build from 'pino-abstract-transport';
import SendMessageService from './SendMessageService.mjs';

export default async function (opts) {
  const sendMessageService = new SendMessageService();
  return build(async function (source) {
    for await (let obj of source) {
      console.log('from transport', obj);
      sendMessageService.sendErrors(obj);
    }
  });
}
