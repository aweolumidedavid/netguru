import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenDto } from '../../auth/dtos/token.dto';
import { TokenService } from '../../auth/service/token.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) { }
  
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) return next();
    const authorizationHeader = req.headers.authorization;
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer') {
      throw new NotFoundException('please provide a Bearer token');
    }
    
    if (!token) {
      throw new NotFoundException('token not found');
    }

    const tokenData: TokenDto = await this.tokenService.verify(token);
    res.locals.tokenData = tokenData;
    next();
  }
}
