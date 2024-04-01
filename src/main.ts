import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { setupSwagger } from './swagger/swagger.config';

async function main() {
    
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Main');

    app.setGlobalPrefix('api');
    
    app.enableCors({
        origin: process.env.CLIENT_DOMAIN, 
        credentials: true,
    });
    
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    await setupSwagger(app);

    await app.listen(process.env.PORT || 3000);
    logger.log(`Application running on port: ${process.env.PORT || 3000}`);
}
main();
