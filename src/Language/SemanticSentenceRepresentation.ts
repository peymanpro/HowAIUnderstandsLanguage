import { Vector } from "../Mathematics/Vector.js";
import { Sentence } from "../Text/Sentence.js";
import { CoOccurrenceModel } from "./CoOccurrenceModel.js";

export class SemanticSentenceRepresentation {
  public constructor(
    private readonly wordModel: CoOccurrenceModel,
  ) {}

  public represent(sentence: Sentence): Vector {
    if (sentence.tokens.length === 0) {
      throw new Error(
        "A sentence must contain at least one token.",
      );
    }

    const vectors = sentence.tokens.map((token) =>
      this.wordModel.getVector(token),
    );

    const sum = vectors.reduce(
      (accumulator, vector) =>
        accumulator.add(vector),
    );

    return sum.multiply(1 / vectors.length);
  }
}
