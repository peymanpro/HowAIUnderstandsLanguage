import { describe, expect, it } from "vitest";
import { SemanticExperiment } from "../src/Language/SemanticExperiment.js";
import { SemanticSentenceRepresentation } from "../src/Language/SemanticSentenceRepresentation.js";
import { SemanticSentenceSimilarity } from "../src/Language/SemanticSentenceSimilarity.js";
import { CorpusBuilder } from "../src/Language/CorpusBuilder.js";
import { CoOccurrenceModel } from "../src/Language/CoOccurrenceModel.js";

describe("SemanticExperiment", () => {
  it("compares two sentences and returns their similarity", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The kitten drinks milk.",
      "The car drives fast.",
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

    const experiment =
      new SemanticExperiment(similarity);

    const comparison =
      experiment.compare(
        result.dataset.get(0),
        result.dataset.get(1),
      );

    expect(comparison.first).toBe(
      result.dataset.get(0),
    );

    expect(comparison.second).toBe(
      result.dataset.get(1),
    );

    expect(comparison.similarity).toBeGreaterThanOrEqual(-1);
    expect(comparison.similarity).toBeLessThanOrEqual(1);
  });
});
