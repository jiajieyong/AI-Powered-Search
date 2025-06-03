import { Injectable } from '@nestjs/common';
import { DefaultEmbeddingFunction } from 'chromadb';
import { OpenAI } from 'openai';

@Injectable()
export class EmbeddingService {
  private readonly openai: OpenAI | null;
  private readonly defaultEmbed = new DefaultEmbeddingFunction();

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    this.openai = apiKey ? new OpenAI({ apiKey }) : null;
  }

  async getEmbedding(text: string): Promise<number[][]> {
    if (!this.openai) {
      return this.defaultEmbed.generate([text]);
    }

    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });

    // Extract embeddings from the response
    const embeddings = response.data.map((item) => item.embedding);
    return embeddings;
  }
}
