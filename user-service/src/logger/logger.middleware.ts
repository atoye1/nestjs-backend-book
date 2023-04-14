import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('This is Logger Middleware1');
    next(); // Express에서 처럼 next()를 호출해주지 않으면 요청흐름이 멈춘다.
  }
}
