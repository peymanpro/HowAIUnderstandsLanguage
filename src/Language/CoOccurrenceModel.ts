import { Vector } from "../Mathematics/Vector.js";
import { SentenceDataset } from "../Text/SentenceDataset.js";
import { Vocabulary } from "../Vocabulary/Vocabulary.js";

export interface WordSimilarityResult {
  readonly token: string;
  readonly similarity: number;
}

export class CoOccurrenceModel {
  private readonly counts = new Map<number, Map<number, number>>();

  public constructor(
    private readonly vocabulary: Vocabulary,
    private readonly dataset: SentenceDataset,
    private readonly radius: number,
  ) {
    if (!Number.isInteger(radius) || radius <= 0) {
      throw new Error(
        "Context radius must be a positive integer.",
      );
    }
  }

  public build(): void {
    this.counts.clear();

    for (const sentence of this.dataset.all()) {
      for (
        let targetIndex = 0;
        targetIndex < sentence.tokenIds.length;
        targetIndex++
      ) {
        const targetTokenId =
          sentence.tokenIds[targetIndex];

        if (targetTokenId === undefined) {
          continue;
        }

        let targetCounts =
          this.counts.get(targetTokenId);

        if (targetCounts === undefined) {
          targetCounts =
            new Map<number, number>();

          this.counts.set(
            targetTokenId,
            targetCounts,
          );
        }

        const start = Math.max(
          0,
          targetIndex - this.radius,
        );

        const end = Math.min(
          sentence.tokenIds.length,
          targetIndex + this.radius + 1,
        );

        for (
          let contextIndex = start;
          contextIndex < end;
          contextIndex++
        ) {
          if (contextIndex === targetIndex) {
            continue;
          }

          const contextTokenId =
            sentence.tokenIds[contextIndex];

          if (contextTokenId === undefined) {
            continue;
          }

          targetCounts.set(
            contextTokenId,
            (targetCounts.get(contextTokenId) ?? 0) + 1,
          );
        }
      }
    }
  }

  public getVector(token: string): Vector {
    const tokenId =
      this.vocabulary.getId(token);

    if (!this.counts.has(tokenId)) {
      throw new Error(
        `Co-occurrence model has not been built for "${token}".`,
      );
    }

    const values: number[] = [];

    for (
      let id = 0;
      id < this.vocabulary.size;
      id++
    ) {
      values.push(
        this.counts.get(tokenId)?.get(id) ?? 0,
      );
    }

    return new Vector(values);
  }

  public similarity(
    firstToken: string,
    secondToken: string,
  ): number {
    return this
      .getVector(firstToken)
      .cosineSimilarity(
        this.getVector(secondToken),
      );
  }

  public mostSimilar(
    token: string,
    limit = 5,
  ): WordSimilarityResult[] {
    if (
      !Number.isInteger(limit) ||
      limit <= 0
    ) {
      throw new Error(
        "Similarity result limit must be a positive integer.",
      );
    }

    const targetId =
      this.vocabulary.getId(token);

    const results: WordSimilarityResult[] = [];

    for (
      const entry of this.vocabulary.entries()
    ) {
      if (entry.id === targetId) {
        continue;
      }

      const similarity =
        this.similarity(
          token,
          entry.token,
        );

      if (Number.isFinite(similarity)) {
        results.push({
          token: entry.token,
          similarity,
        });
      }
    }

    return results
      .sort(
        (left, right) =>
          right.similarity -
          left.similarity,
      )
      .slice(0, limit);
  }
}
