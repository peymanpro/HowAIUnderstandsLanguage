import { Vector } from "../Mathematics/Vector.js";
import { Sentence } from "../Text/Sentence.js";
import { SentenceRepresentation } from "./SentenceRepresentation.js";

export class SentenceSimilarity {
  public constructor(
    private readonly representation: SentenceRepresentation,
  ) {}

  public between(
    first: Sentence,
    second: Sentence,
  ): number {
    const firstVector =
      this.representation.represent(first);

    const secondVector =
      this.representation.represent(second);

    return firstVector.cosineSimilarity(
      secondVector,
    );
  }
}
