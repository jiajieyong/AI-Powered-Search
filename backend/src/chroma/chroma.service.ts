import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChromaClient, Collection } from 'chromadb';
import { OpenAiService } from '../openAi/openAi.service';

@Injectable()
export class ChromaService implements OnModuleInit {
  private chromaClient: ChromaClient;
  private collection: Collection;

  constructor(private readonly openAiService: OpenAiService) {}

  async onModuleInit() {
    console.log('ChromaService initializing...');
    this.chromaClient = new ChromaClient({ path: 'http://localhost:8000' });

    const collectionName = 'my_collection';

    this.collection = await this.chromaClient.getOrCreateCollection({
      name: collectionName,
    });

    console.log('Chroma collection initialized:', this.collection.name);
  }

  getCollection() {
    return this.collection;
  }

  async addDocument(id: string, text: string, metadata: Record<string, any>) {
    const embedding = await this.openAiService.getEmbedding(text);

    await this.collection.upsert({
      ids: [id],
      embeddings: [embedding],
      metadatas: [metadata],
    });

    console.log(
      `Document with ID ${id} added to collection ${this.collection.name}`,
    );
  }

  async queryDocuments(query: string, nResults = 1) {
    const results = await this.collection.query({
      queryTexts: [query],
      nResults,
    });

    return results;
  }
}
