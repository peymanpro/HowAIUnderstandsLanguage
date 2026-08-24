import { EmbeddingTable } from "../Embeddings/EmbeddingTable.js";
import { Vector } from "../Mathematics/Vector.js";
import { Sentence } from "../Text/Sentence.js";

export class SentenceRepresentation {
  public constructor(
    private readonly embeddings: EmbeddingTable,
  ) {}

  public represent(sentence: Sentence): Vector {
    if (sentence.tokenIds.length === 0) {
      throw new Error(
        "A sentence must contain at least one token.",
      );
    }

    const vectors = sentence.tokenIds.map((tokenId) =>
      this.embeddings.get(tokenId),
    );

    const sum = vectors.reduce(
      (accumulator, vector) =>
        accumulator.add(vector),
    );

    return sum.multiply(1 / vectors.length);
  }
}
