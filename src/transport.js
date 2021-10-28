const nodemailer = require('nodemailer');
const build = require('pino-abstract-transport');

const mailerconfig = process.env.MAIL_URL || {
  sendmail: true,
  path: process.env.MAIL_COMMAND || '/usr/sbin/sendmail'
};
const mailer = nodemailer.createTransport(mailerconfig);

async function notify(obj) {
  if (process.env.SERVER_ADMIN) {
    await mailer.sendMail({
      to: process.env.SERVER_ADMIN,
      subject: `[NODEJS FATAL ERROR] ${obj.pid}`,
      text: `${obj.msg}\n${obj.err?.message}\n${obj.err?.stack}`
    });
  } else {
    console.log(obj);
  }
}
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = function (opts) {
  return build(function (source) {
    source.on('data', function (obj) {
      notify(obj).then();
    });
  });
};
