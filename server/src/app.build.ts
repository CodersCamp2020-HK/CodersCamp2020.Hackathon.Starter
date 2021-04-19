import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./config/swagger.config";

export function appFactory() {
    return NestFactory.create(AppModule)
        .then((app) => app.setGlobalPrefix('/api'))
        .then((app) => setupSwagger(app));
}