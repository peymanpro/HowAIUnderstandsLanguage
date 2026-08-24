import { Sentence } from "../Text/Sentence.js";

export class ContextWindow {
  public constructor(
    public readonly targetIndex: number,
    public readonly tokenIds: readonly number[],
  ) {
    if (!Number.isInteger(targetIndex) || targetIndex < 0) {
      throw new Error(
        "Target index must be a non-negative integer.",
      );
    }

    if (tokenIds.length === 0) {
      throw new Error(
        "Context window must contain at least one token.",
      );
    }

    if (targetIndex >= tokenIds.length) {
      throw new Error(
        "Target index is outside the context window.",
      );
    }
  }

  public get targetTokenId(): number {
    const tokenId = this.tokenIds[this.targetIndex];

    if (tokenId === undefined) {
      throw new Error("Target token ID is unavailable.");
    }

    return tokenId;
  }

  public get contextTokenIds(): number[] {
    return this.tokenIds.filter(
      (_, index) => index !== this.targetIndex,
    );
  }
}

export function createContextWindow(
  sentence: Sentence,
  targetIndex: number,
  radius: number,
): ContextWindow {
  if (!Number.isInteger(radius) || radius <= 0) {
    throw new Error(
      "Context radius must be a positive integer.",
    );
  }

  if (
    !Number.isInteger(targetIndex) ||
    targetIndex < 0 ||
    targetIndex >= sentence.length
  ) {
    throw new Error(
      "Target index is outside the sentence.",
    );
  }

  const start = Math.max(
    0,
    targetIndex - radius,
  );

  const end = Math.min(
    sentence.length,
    targetIndex + radius + 1,
  );

  return new ContextWindow(
    targetIndex - start,
    sentence.tokenIds.slice(start, end),
  );
}
