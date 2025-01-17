import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { EMAIL, EMAIL_PASSWORD, RESEND_API_KEY } from "../config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: RESEND_API_KEY,
  },
});

const handlebarOptions = {
  viewEngine: {
    extname: ".hbs",
    partialsDir: path.resolve("./src/views/email"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/views/email"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));

export async function sendEmail(to, subject, template, context) {
  const mailOptions = {
    from: `keep-noreply@iamcarlosdaniel.com`,
    to: to,
    subject: subject,
    template: template,
    context: {
      domain: context.domain,
      token: context.token,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: " + info.response);
    return "Email sent successfully";
  } catch (error) {
    console.log(error);
    throw new Error("Error sending email");
  }
}
