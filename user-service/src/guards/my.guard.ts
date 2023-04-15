import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AuthService } from 'auth/auth.service';

/**
 * 오직 내 정보만 가져 올 수 있도록 제한하는 가드!
 * 내가 구현해서 뿌듯함!!
 */
@Injectable()
export class MyGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    const jwtString = request.headers.authorization?.split('Bearer ')[1];
    const { userId } = this.authService.verify(jwtString);
    const requestedUserId = request.params.id;
    return userId === requestedUserId;
  }
}
