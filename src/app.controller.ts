import { Controller, Get, Param, Res } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('image/:image_id')
  findImage(@Param() param, @Res() res): Observable<Object> {
    const image_name = param.image_id;
    return of(res.sendFile(image_name, { root: './images' }));
  }
}
