import { createTransport } from 'nodemailer'
import { CREDENCIALES_EMAIL } from '../config/config.js'

class EmailService {
  #clienteNodemailer

  constructor(credencialesMail) {
    this.#clienteNodemailer = createTransport({
      service: 'gmail',
      port: 587,
      auth: credencialesMail
    })
  }

  async send(destinatario) {
    const mailOptions = {
      from: 'Enviador de mails de compra',
      to: destinatario,
      subject: 'Se aprobó tu compra!',
      text: "Tu compra con el codigo XXX fue aprobada! Gracias por comprar con nosotros.", 
    }
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      console.log(info)
      return info
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const emailService = new EmailService(CREDENCIALES_EMAIL)