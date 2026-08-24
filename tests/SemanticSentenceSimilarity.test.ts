import { describe, expect, it } from "vitest";
import { CoOccurrenceModel } from "../src/Language/CoOccurrenceModel.js";
import {
  SemanticSentenceRepresentation,
} from "../src/Language/SemanticSentenceRepresentation.js";
import {
  SemanticSentenceSimilarity,
} from "../src/Language/SemanticSentenceSimilarity.js";
import { CorpusBuilder } from "../src/Language/CorpusBuilder.js";

describe("SemanticSentenceSimilarity", () => {
  it("compares sentences using context-derived representations", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The kitten drinks milk.",
      "The cat likes food.",
      "The kitten likes food.",
      "The car drives fast.",
      "The truck drives fast.",
    ]);

    const wordModel = new CoOccurrenceModel(
      result.vocabulary,
      result.dataset,
      1,
    );

    wordModel.build();

    const representation =
      new SemanticSentenceRepresentation(
        wordModel,
      );

    const similarity =
      new SemanticSentenceSimilarity(
        representation,
      );

    const first =
      result.dataset.get(0);

    const second =
      result.dataset.get(1);

    expect(
      similarity.between(first, second),
    ).toBeGreaterThan(0);
  });

  it("is symmetric", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The kitten drinks milk.",
    ]);

    const wordModel = new CoOccurrenceModel(
      result.vocabulary,
      result.dataset,
      1,
    );

    wordModel.build();

    const representation =
      new SemanticSentenceRepresentation(
        wordModel,
      );

    const similarity =
      new SemanticSentenceSimilarity(
        representation,
      );

    const first =
      result.dataset.get(0);

    const second =
      result.dataset.get(1);

    expect(
      similarity.between(first, second),
    ).toBeCloseTo(
      similarity.between(second, first),
    );
  });
});
