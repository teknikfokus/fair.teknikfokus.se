import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendMail(email: string, subject: string, body: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      text: body,
      html: body
    });
  }
}