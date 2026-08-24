import { Sentence } from "../Text/Sentence.js";
import { SemanticSentenceRepresentation } from "./SemanticSentenceRepresentation.js";

export class SemanticSentenceSimilarity {
  public constructor(
    private readonly representation:
      SemanticSentenceRepresentation,
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
