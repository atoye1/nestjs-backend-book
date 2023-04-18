import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest<Request>();
    const res: Response = ctx.getResponse<Response>();
    const stack = exception.stack;

    if (!(exception instanceof HttpException)) {
      // HttpException만 다루기로 했음
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();

    const logObj = {
      timestamp: new Date(),
      url: req.url,
      response,
      stack,
    };

    this.logger.log('--------------------');
    this.logger.log(JSON.stringify(logObj));
    // for (const key in log) {
    //   this.logger.log(log[key]);
    // }
    this.logger.log('--------------------');
    return res.status((exception as HttpException).getStatus()).json(response);
  }
}
