const nodemailer = require('nodemailer')
const smtpConfig = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: ''
  }
}

const mail = async (data) => {
  var transporter = nodemailer.createTransport(smtpConfig);
  let mailOptions = {
    from: '',
    to: '',
    subject: '验证码',
    text: Math.random().toString(36).substr(2,4)
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      return console.log(error);
    }
    console.log(info)
  })
  return {success: true}
}