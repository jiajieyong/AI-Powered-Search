import { Module } from '@nestjs/common';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { FileHandlerService } from 'src/fileHandler/fileHandler.service';
import { ChromaController } from './chroma.controller';
import { ChromaService } from './chroma.service';

//TO-DO: handle the providers into their own modules
@Module({
  providers: [ChromaService, EmbeddingService, FileHandlerService],
  controllers: [ChromaController],
})
export class ChromaModule {}
