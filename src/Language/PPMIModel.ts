import { Vector } from "../Mathematics/Vector.js";
import { SentenceDataset } from "../Text/SentenceDataset.js";
import { Vocabulary } from "../Vocabulary/Vocabulary.js";

export class PPMIModel {
  private readonly counts = new Map<number, Map<number, number>>();
  private readonly vectorCache = new Map<number, Vector>();

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
    this.vectorCache.clear();

    for (const sentence of this.dataset.all()) {
      for (
        let targetIndex = 0;
        targetIndex < sentence.tokenIds.length;
        targetIndex++
      ) {
        const targetId = sentence.tokenIds[targetIndex];

        if (targetId === undefined) {
          continue;
        }

        let targetCounts = this.counts.get(targetId);

        if (targetCounts === undefined) {
          targetCounts = new Map<number, number>();
          this.counts.set(targetId, targetCounts);
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

          const contextId =
            sentence.tokenIds[contextIndex];

          if (contextId === undefined) {
            continue;
          }

          targetCounts.set(
            contextId,
            (targetCounts.get(contextId) ?? 0) + 1,
          );
        }
      }
    }
  }

  public getVector(token: string): Vector {
    const tokenId = this.vocabulary.getId(token);

    const cached = this.vectorCache.get(tokenId);

    if (cached !== undefined) {
      return cached;
    }

    if (!this.counts.has(tokenId)) {
      throw new Error(
        `PPMI model has not been built for "${token}".`,
      );
    }

    const totalCount = this.getTotalCount();
    const targetTotal = this.getTargetTotal(tokenId);

    const values: number[] = [];

    for (
      let contextId = 0;
      contextId < this.vocabulary.size;
      contextId++
    ) {
      const coOccurrence =
        this.counts.get(tokenId)?.get(contextId) ?? 0;

      if (coOccurrence === 0) {
        values.push(0);
        continue;
      }

      const contextTotal =
        this.getTargetTotal(contextId);

      const numerator =
        coOccurrence * totalCount;

      const denominator =
        targetTotal * contextTotal;

      const pmi =
        Math.log(numerator / denominator);

      values.push(
        Math.max(0, pmi),
      );
    }

    const vector = new Vector(values);

    this.vectorCache.set(tokenId, vector);

    return vector;
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

  private getTotalCount(): number {
    let total = 0;

    for (const targetCounts of this.counts.values()) {
      for (const count of targetCounts.values()) {
        total += count;
      }
    }

    return total;
  }

  private getTargetTotal(
    tokenId: number,
  ): number {
    let total = 0;

    for (
      const count of this.counts.get(tokenId)?.values()
      ?? []
    ) {
      total += count;
    }

    return total;
  }
}
