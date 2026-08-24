import { EmbeddingTable } from "./EmbeddingTable.js";

export class WordSimilarity {
  public constructor(
    private readonly embeddings: EmbeddingTable,
  ) {}

  public between(
    firstToken: string,
    secondToken: string,
  ): number {
    const first = this.embeddings.getForToken(
      firstToken,
    );

    const second = this.embeddings.getForToken(
      secondToken,
    );

    return first.cosineSimilarity(second);
  }
}
