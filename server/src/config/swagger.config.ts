import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

interface SetupSwaggerOptions {
    readonly title: string,
    readonly description: string,
    readonly version: string,
    readonly path: string
}

const defaultSetupSwaggerOptions: SetupSwaggerOptions = {
    title: 'App example',
    description: 'The app API description',
    version: '1.0.0',
    path: 'api'
}

function createSwaggerDocument(app: INestApplication, options: SetupSwaggerOptions = defaultSetupSwaggerOptions) {
    const config = new DocumentBuilder()
        .setTitle(options.title)
        .setDescription(options.description)
        .setVersion(options.version)
        .build();
    return SwaggerModule.createDocument(app, config);
}

function setupSwagger(app: INestApplication, options: SetupSwaggerOptions = defaultSetupSwaggerOptions) {
    const document = createSwaggerDocument(app, options);
    SwaggerModule.setup(options.path, app, document);
    return app;
}

export { setupSwagger, createSwaggerDocument }
export type { SetupSwaggerOptions }