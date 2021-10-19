import build from 'pino-abstract-transport';

export default async function (opts) {
  return build(async function (source) {
    for await (let obj of source) {
      console.log(obj);
    }
  });
}
