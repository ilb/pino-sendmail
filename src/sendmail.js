// import build from 'pino-abstract-transport';
const build = require('pino-abstract-transport');
const { mailer } = require('./mailer');

async function notify(obj) {
  console.log(obj);
  await mailer.sendMail({
    to: process.env.SERVER_ADMIN || 'root',
    subject: `[NODEJS FATAL ERROR] ${obj.pid}`,
    text: `${obj.msg}\n${obj.err?.message}\n${obj.err?.stack}`
  });
}
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = function (opts) {
  return build(function (source) {
    source.on('data', function (obj) {
      notify(obj).then();
    });
  });
};
