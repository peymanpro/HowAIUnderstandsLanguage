export class Sentence {
  public constructor(
    public readonly text: string,
    public readonly tokens: readonly string[],
    public readonly tokenIds: readonly number[],
  ) {
    if (text.trim().length === 0) {
      throw new Error("Sentence text cannot be empty.");
    }

    if (tokens.length !== tokenIds.length) {
      throw new Error(
        "The number of tokens must match the number of token IDs.",
      );
    }

    for (const tokenId of tokenIds) {
      if (!Number.isInteger(tokenId) || tokenId < 0) {
        throw new Error(
          "Sentence token IDs must be non-negative integers.",
        );
      }
    }
  }

  public get length(): number {
    return this.tokens.length;
  }
}
