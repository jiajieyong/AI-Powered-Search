import { Controller, Get, Post, Query } from '@nestjs/common';
import { ChromaService } from './chroma.service';

@Controller('api')
export class ChromaController {
  constructor(private readonly chromaService: ChromaService) {}

  @Post('add-document')
  async addDocument(@Query('id') id: number, @Query('text') text: string) {
    await this.chromaService.addDocument(id, text, { source: 'api' });
  }

  @Get('query')
  async query(@Query('q') query: string) {
    const result = await this.chromaService.queryDocuments(query);
    return result;
  }

  @Get('get-collection')
  testChroma() {
    const collection = this.chromaService.getCollection();
    return { message: 'Chroma is working!', collectionName: collection.name };
  }
}
