import { Global, Module } from '@nestjs/common';
import { TokenService } from './service/token.service';

@Global()
@Module({
  providers: [TokenService],
  exports: [TokenService],
})
export class AuthModule {}