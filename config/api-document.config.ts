import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class ApiDocumentConfig {
  private readonly documentBuilder = new DocumentBuilder();
  private readonly config: Omit<OpenAPIObject, 'paths'>;
  private readonly documentPath = 'api-docs';
  private document: OpenAPIObject;

  constructor(private readonly app: NestExpressApplication) {
    this.config = this.documentBuilder
      .setTitle('Nest TDD API Document')
      .setDescription('Nest TDD Api Document Description')
      .build();
    this.init();
  }

  private init() {
    this.createDocument();
  }

  private createDocument() {
    this.document = SwaggerModule.createDocument(this.app, this.config);
    SwaggerModule.setup(this.documentPath, this.app, this.document);
  }
}
