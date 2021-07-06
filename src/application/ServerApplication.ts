import { AppModule } from './di/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

export class ServerApplication {
  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: false,
      }),
    );
    // cors
    app.enableCors();

    await app.listen(3030);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
