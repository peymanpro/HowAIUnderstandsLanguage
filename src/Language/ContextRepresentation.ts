import { EmbeddingTable } from "../Embeddings/EmbeddingTable.js";
import { Vector } from "../Mathematics/Vector.js";
import { ContextWindow } from "./ContextWindow.js";

export class ContextRepresentation {
  public constructor(
    private readonly embeddings: EmbeddingTable,
  ) {}

  public represent(window: ContextWindow): Vector {
    const contextTokenIds = window.contextTokenIds;

    if (contextTokenIds.length === 0) {
      throw new Error(
        "A context representation requires at least one context token.",
      );
    }

    const vectors = contextTokenIds.map((tokenId) =>
      this.embeddings.get(tokenId),
    );

    const sum = vectors.reduce(
      (accumulator, vector) =>
        accumulator.add(vector),
    );

    return sum.multiply(1 / vectors.length);
  }
}
