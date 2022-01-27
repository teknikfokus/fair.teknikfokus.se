import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.MAIL_TRANSPORT,
        defaults: {
          from: process.env.MAIL_FROM,
        }
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }