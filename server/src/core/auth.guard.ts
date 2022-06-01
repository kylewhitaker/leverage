import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { validateToken } from './validateToken.util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateToken(request.headers.authorization);
  }
}
