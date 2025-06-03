import { Module } from '@nestjs/common';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { ChromaController } from './chroma.controller';
import { ChromaService } from './chroma.service';

@Module({
  providers: [ChromaService, EmbeddingService],
  controllers: [ChromaController],
})
export class ChromaModule {}
