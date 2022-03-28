import nodemailer, { Transporter } from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";

class SendEmailService {
  private client: Transporter;
  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "marlosilva.f2@gmail.com",
          pass: "qiiivkjdhstqffay",
        },
      });
      this.client = transporter;
    });
  }
  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString("utf8");

    const mailTemplateParse = Handlebars.compile(templateFileContent);
    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "Marlo Marques",
    });
  }
}

export default new SendEmailService();
