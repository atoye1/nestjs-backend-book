import {
  CanActivate,
  Controller,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    // 여기서 req 객체에 담긴 내용을 바탕으로 validation 수행
    // 반환값이 false이면 Nest는 403 Forbidden 응답을 돌려준다.
    return true;
  }
}
