// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

const config = process.env.MAIL_URL || {
  sendmail: true,
  path: process.env.MAIL_COMMAND || '/usr/sbin/sendmail',
  debug: process.env.MAIL_DEBUG || true,
  log: process.env.MAIL_LOG || true
};
const mailer = nodemailer.createTransport(config);

module.exports = { config, mailer };
