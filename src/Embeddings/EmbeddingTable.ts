import { Vector } from "../Mathematics/Vector.js";
import { Vocabulary } from "../Vocabulary/Vocabulary.js";

export class EmbeddingTable {
  private readonly vectors = new Map<number, Vector>();

  public constructor(
    private readonly vocabulary: Vocabulary,
    private readonly dimension: number,
  ) {
    if (!Number.isInteger(dimension) || dimension <= 0) {
      throw new Error(
        "Embedding dimension must be a positive integer.",
      );
    }
  }

  public get size(): number {
    return this.vectors.size;
  }

  public get embeddingDimension(): number {
    return this.dimension;
  }

  public initialize(): void {
    for (const entry of this.vocabulary.entries()) {
      if (!this.vectors.has(entry.id)) {
        this.vectors.set(
          entry.id,
          this.createDeterministicVector(entry.id),
        );
      }
    }
  }

  public has(tokenId: number): boolean {
    return this.vectors.has(tokenId);
  }

  public get(tokenId: number): Vector {
    if (!this.vocabulary.entries().some(
      (entry) => entry.id === tokenId,
    )) {
      throw new Error(
        `Token id ${tokenId} does not exist in the vocabulary.`,
      );
    }

    const vector = this.vectors.get(tokenId);

    if (vector === undefined) {
      throw new Error(
        `Embedding for token id ${tokenId} has not been initialized.`,
      );
    }

    return vector;
  }

  public set(tokenId: number, vector: Vector): void {
    if (vector.dimension !== this.dimension) {
      throw new Error(
        `Expected embedding dimension ${this.dimension}, ` +
        `received ${vector.dimension}.`,
      );
    }

    if (!this.vocabulary.entries().some(
      (entry) => entry.id === tokenId,
    )) {
      throw new Error(
        `Token id ${tokenId} does not exist in the vocabulary.`,
      );
    }

    this.vectors.set(tokenId, vector);
  }

  public getForToken(token: string): Vector {
    return this.get(
      this.vocabulary.getId(token),
    );
  }

  private createDeterministicVector(
    tokenId: number,
  ): Vector {
    const values = Array.from(
      { length: this.dimension },
      (_, index) => {
        const raw = Math.sin(
          (tokenId + 1) * (index + 1) * 12.9898,
        );

        return Number(raw.toFixed(8));
      },
    );

    return new Vector(values);
  }
}
