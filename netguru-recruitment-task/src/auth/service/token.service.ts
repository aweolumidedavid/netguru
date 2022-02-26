import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenDto } from '../dtos/token.dto';
import * as jwt from 'jsonwebtoken';
import { envConfiguration } from '../../utils/config/envConfiguration';
import { NetGuruHttpCodes } from '../../utils/enums/netGuruHttpCodes.enums';

@Injectable()
export class TokenService {
  constructor(private config: ConfigService) {}

  verify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const tokenSecret = this.config.get(envConfiguration.TOKEN_SECRET);
      jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) {
          // send custom code for expired token that the frontend can listen for
          if (err.name === 'TokenExpiredError') {
            throw new HttpException(
              {
                status: NetGuruHttpCodes.TokenExpiredError,
                message: 'jwt expired',
              },
              NetGuruHttpCodes.TokenExpiredError,
            );
          }
          reject(new UnauthorizedException(err));
        }
        resolve(decoded);
      });
    });
  }
 
}
