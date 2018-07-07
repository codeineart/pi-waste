'use strict'

import nodemailer from 'nodemailer'

function SendMail (req, res) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'intranetmpm@gmail.com',
      pass: 'hWOEdrATHrOWELeNEighTCHEAtionEyeRBanUoDIet'
    }
  })

  transporter.sendMail({
    from: 'intranetmpm@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.html
  }, (error, info) => {
    if (error) {
      return res.status(500).send({ message: 'Ha ocurrido un error al intentar enviar el e-mail. ' + error })
    } else {
      res.status(200).send()
    }
  })

}

module.exports = {
  SendMail
}
