import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChromaClient, Collection } from 'chromadb';
import { EmbeddingService } from '../embedding/embedding.service';

@Injectable()
export class ChromaService implements OnModuleInit {
  private chromaClient: ChromaClient;
  private collection: Collection;

  constructor(private readonly embeddingService: EmbeddingService) {}

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

  async addDocument(id: number, chunk: string, metadata: Record<string, any>) {
    const embedding = await this.embeddingService.getEmbedding(chunk);

    await this.collection.upsert({
      ids: [`${this.collection.name}-${id}`],
      embeddings: embedding,
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
