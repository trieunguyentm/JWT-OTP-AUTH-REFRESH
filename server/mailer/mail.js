import nodemailer from "nodemailer"
import Mailgen from "mailgen"
import dotenv from "dotenv"

dotenv.config()

// Config transporter
const transporterConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.USERNAME_MAIL,
    pass: process.env.PASSWORD_MAIL,
  },
}

// Create transporter
const transporter = nodemailer.createTransport(transporterConfig)

// MailGenerator to gen html body
const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
})

/** POST http://localhost:8080/api/registerMail */
/**
 * username: username of user
 * userEmail: email of user
 * text: text of email
 * subject: subject of email
 */
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body

  // Body of the mail
  const mail = {
    body: {
      name: username,
      intro: text || "Authentication mail",
      outro: "Need help, or have questions? Just reply to this email",
    },
  }
  // Gen emailBody HTML
  const emailBody = MailGenerator.generate(mail)
  // Gen message
  const message = {
    from: process.env.USERNAME_MAIL,
    to: userEmail,
    subject: subject,
    text: text,
    html: emailBody,
  }
  // Send mail to user
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({ msg: "Send mail succesfully" })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}
