import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EmailAuthConfig,
  EmailConfig,
  GlobalConfig,
  GlobalConfigKey,
} from '../../configuration/configs/global.config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { createWelcomEmail } from './templates/welcome.email';

function createTransporter(config?: EmailAuthConfig) {
  return config
    ? createGoogleTransporter(config)
    : createDevelopmentTransporter();
}

async function createDevelopmentTransporter() {
  const ethereal = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: ethereal.user,
      pass: ethereal.pass,
    },
  });
}

function createGoogleTransporter(config: EmailAuthConfig) {
  return Promise.resolve(
    nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.user,
        pass: config.password,
      },
    }),
  );
}

@Injectable()
class EmailService {
  private readonly config: EmailConfig;
  private readonly transporter: Promise<Mail>;
  private readonly isDevelopment: boolean;
  constructor(configService: ConfigService) {
    this.config = configService.get<GlobalConfig>(GlobalConfigKey).email;
    this.transporter = createTransporter(this.config.auth);
    this.isDevelopment = this.config.auth === undefined;
  }

  private async sendMail(mailOptions: Mail.Options) {
    const transporter = await this.transporter;
    const info = await transporter.sendMail({
      from: this.config.sender,
      ...mailOptions,
    });
    Logger.log(`Development Email URL: ${nodemailer.getTestMessageUrl(info)}`);
    return info;
  }

  async sendWelcomeEmail(to: string) {
    return this.sendMail({ to, ...createWelcomEmail() });
  }
}

export { EmailService };
