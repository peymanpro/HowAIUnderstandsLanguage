import { SemanticSentenceSimilarity } from "./SemanticSentenceSimilarity.js";
import { Sentence } from "../Text/Sentence.js";

export interface SemanticComparison {
  readonly first: Sentence;
  readonly second: Sentence;
  readonly similarity: number;
}

export class SemanticExperiment {
  public constructor(
    private readonly similarity:
      SemanticSentenceSimilarity,
  ) {}

  public compare(
    first: Sentence,
    second: Sentence,
  ): SemanticComparison {
    return {
      first,
      second,
      similarity: this.similarity.between(
        first,
        second,
      ),
    };
  }
}
