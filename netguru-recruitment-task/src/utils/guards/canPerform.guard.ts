import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { TokenDto } from '../../auth/dtos/token.dto';

@Injectable()
export class CanPerformAction implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );
    if (!requiredRole) return true;

    try {
      const response: Response = context.switchToHttp().getResponse();
      const tokenData: TokenDto = response.locals.tokenData;

      if (!tokenData) {
        throw new NotFoundException('authorization header not specified');
      }
      if (!tokenData.role) {
        throw new NotFoundException('user role not found');
      }
      const tokenDataRole: string = tokenData.role;
      let hasRole;
      const result = tokenDataRole.localeCompare(requiredRole);
      if (result == 0) {
        hasRole = true;
        return true;
      } else {
        hasRole = false;
        throw new UnauthorizedException(
          'you are not authorized to perform this action',
        );
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
