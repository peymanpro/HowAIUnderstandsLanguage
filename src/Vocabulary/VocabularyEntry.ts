import { Vector } from "../Mathematics/Vector.js";

export class VocabularyEntry {
  public constructor(
    public readonly id: number,
    public readonly token: string,
    public readonly frequency: number,
    public readonly vector?: Vector
  ) {
    if (!Number.isInteger(id) || id < 0) {
      throw new Error("Vocabulary entry id must be a non-negative integer.");
    }

    if (token.trim().length === 0) {
      throw new Error("Vocabulary entry token cannot be empty.");
    }

    if (!Number.isInteger(frequency) || frequency < 0) {
      throw new Error("Vocabulary entry frequency must be a non-negative integer.");
    }
  }

  public hasVector(): boolean {
    return this.vector !== undefined;
  }
}
