import nodemailer from 'nodemailer';

export default class SendMessageService {
  constructor() {
    this.userFrom = process.env.MAIL_USER;
    this.userTo = process.env.SERVER_ADMIN;
    this.pass = process.env.MAIL_PASS;
    this.host = process.env.MAIL_HOST;
    this.port = process.env.MAIL_PORT;
  }
  async sendErrors(obj) {
    let transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.userFrom,
        pass: this.pass
      }
    });

    await transporter.sendMail({
      from: this.userFrom, // sender address
      to: this.userTo, // list of receivers
      subject: `[NODEJS FATAL ERROR] ${obj.pid}`, // Subject line
      text: `${obj.err.message}
             ${obj.err.stack}` // plain text body
    });
  }
}
