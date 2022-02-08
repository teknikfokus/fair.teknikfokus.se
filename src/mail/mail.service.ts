import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private mailerService: MailerService) { }

  async sendMail(email: string, subject: string, body: string) {
    try {
      await this.mailerService.sendMail({
      to: email,
        subject: subject,
        text: body,
        html: body
      });
    } catch {
      this.logger.warn("Could not send email");
    }
  }
}