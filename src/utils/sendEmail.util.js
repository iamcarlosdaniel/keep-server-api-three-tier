import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
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
    from: process.env.SENDER_EMAIL,
    to: to,
    subject: subject,
    template: template,
    context: {
      url: context.url,
      otp: context.otp,
      firstName: context.firstName,
      noteId: context.noteId,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: " + info.response);
    return {
      message: "Email sent successfully",
    };
  } catch (error) {
    throw {
      status: 500,
      userErrorMessage: "Sending email failed",
      message: error.message,
    };
  }
}
