// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import metadata from '../metadata';

// import authPaths from './auth.document'

export async function setupSwagger(app: INestApplication): Promise<void> {
    const config = new DocumentBuilder()
        .setTitle('ASSETS RESTFUL API')
        .setDescription('assets - endpoints.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    await SwaggerModule.loadPluginMetadata(metadata)
        
    const document = SwaggerModule.createDocument(app, config, {
        // ignoreGlobalPrefix: true
    });

    document.paths = {
        ...document.paths,
        // ...authPaths
    };

    SwaggerModule.setup('/', app, document);
}

