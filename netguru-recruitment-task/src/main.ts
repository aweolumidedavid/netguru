import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfiguration } from './utils/config/envConfiguration';
import { CanPerformAction } from './utils/guards/canPerform.guard';


async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
   const reflector = app.get(Reflector);
    const config = app.get(ConfigService);
    //
    const port = process.env.PORT || config.get(envConfiguration.PORT);

    // use to enforce role access on endpoints that required it
    app.useGlobalGuards(new CanPerformAction(reflector));

    await app.listen(port, () => {
       Logger.debug(`listening on port ${port}`);
    });
}
bootstrap();
