import fs from 'fs/promises';
import path from 'path';
import { ChromaService } from 'src/chroma/chroma.service';

export class FileHandlerService {
  constructor(private readonly chromaService: ChromaService) {}

  //TO-DO: handle other file formats ie. PDF, docx, csv-parser
  async loadFile(filePath: string): Promise<string> {
    const file = await fs.readFile(path.normalize(filePath), {
      encoding: 'utf-8',
    });
    return file;
  }

  chunkText(text: string, maxLength = 500): string[] {
    const sentences = text.split(/(?<=[.?!])\s+/); // Split by sentence
    const chunks: string[] = [];
    let current = '';

    for (const sentence of sentences) {
      if (current.length + sentence.length > maxLength) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current += ' ' + sentence;
      }
    }

    if (current) chunks.push(current.trim());

    return chunks;
  }

  async processAndStoreFile(filePath: string) {
    const text = await this.loadFile(filePath);
    const chunks = this.chunkText(text);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      await this.chromaService.addDocument(i, chunk, {
        filePath,
        index: i,
      });
    }

    console.log(`Processed and stored ${chunks.length} chunks.`);
  }
}
