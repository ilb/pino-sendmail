const { mailer } = require('../src/mailer');
mailer
  .sendMail({
    to: process.env.SERVER_ADMIN || 'root',
    subject: `[NODEJS FATAL ERROR] ${new Date()}`,
    text: `test mail`
  })
  .then(console.log)
  .catch(console.log);
