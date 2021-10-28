// import { Writable } from 'stream'
import nodemailer from 'nodemailer';
import build from 'pino-abstract-transport';


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


export default async function (opts) {
  return build(async function (source) {
    for await (let obj of source) {
      await notify(obj)
    }
  })
}

// function transport(options) {
//   const myTransportStream = new Writable({
//     autoDestroy: true,
//     write(chunk, enc, cb) {
//       notify(chunk).then().catch(console.log);
//       cb();
//     }
//   });
//   return myTransportStream;
// }

// export default transport;