import { CoOccurrenceModel } from "./CoOccurrenceModel.js";
import { PPMIModel } from "./PPMIModel.js";
import { Sentence } from "../Text/Sentence.js";

export interface SemanticMethodComparison {
  readonly first: Sentence;
  readonly second: Sentence;
  readonly coOccurrenceSimilarity: number;
  readonly ppmiSimilarity: number;
}

export class SemanticComparisonExperiment {
  public constructor(
    private readonly coOccurrence: CoOccurrenceModel,
    private readonly ppmi: PPMIModel,
  ) {}

  public compare(
    first: Sentence,
    second: Sentence,
  ): SemanticMethodComparison {
    const coOccurrenceFirst = this.averageWordVectors(
      first,
      (token) => this.coOccurrence.getVector(token),
    );

    const coOccurrenceSecond = this.averageWordVectors(
      second,
      (token) => this.coOccurrence.getVector(token),
    );

    const ppmiFirst = this.averageWordVectors(
      first,
      (token) => this.ppmi.getVector(token),
    );

    const ppmiSecond = this.averageWordVectors(
      second,
      (token) => this.ppmi.getVector(token),
    );

    return {
      first,
      second,
      coOccurrenceSimilarity:
        coOccurrenceFirst.cosineSimilarity(
          coOccurrenceSecond,
        ),
      ppmiSimilarity:
        ppmiFirst.cosineSimilarity(
          ppmiSecond,
        ),
    };
  }

  private averageWordVectors(
    sentence: Sentence,
    getVector: (token: string) => import("../Mathematics/Vector.js").Vector,
  ): import("../Mathematics/Vector.js").Vector {
    if (sentence.tokens.length === 0) {
      throw new Error(
        "Cannot represent a sentence without tokens.",
      );
    }

    const vectors = sentence.tokens.map(getVector);

    const sum = vectors.reduce(
      (accumulator, vector) =>
        accumulator.add(vector),
    );

    return sum.multiply(
      1 / vectors.length,
    );
  }
}
