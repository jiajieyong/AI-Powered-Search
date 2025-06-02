import { Module } from '@nestjs/common';
import { OpenAiService } from 'src/openAi/openAi.service';
import { ChromaController } from './chroma.controller';
import { ChromaService } from './chroma.service';

@Module({
  providers: [ChromaService, OpenAiService],
  controllers: [ChromaController],
})
export class ChromaModule {}
