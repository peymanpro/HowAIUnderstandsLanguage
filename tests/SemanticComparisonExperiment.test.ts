import { describe, expect, it } from "vitest";
import { CoOccurrenceModel } from "../src/Language/CoOccurrenceModel.js";
import { CorpusBuilder } from "../src/Language/CorpusBuilder.js";
import { PPMIModel } from "../src/Language/PPMIModel.js";
import { SemanticComparisonExperiment } from "../src/Language/SemanticComparisonExperiment.js";

describe("SemanticComparisonExperiment", () => {
  it("compares raw co-occurrence and PPMI representations", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The kitten drinks milk.",
      "The cat likes food.",
      "The kitten likes food.",
      "The car drives fast.",
      "The truck drives fast.",
    ]);

    const coOccurrence =
      new CoOccurrenceModel(
        result.vocabulary,
        result.dataset,
        1,
      );

    const ppmi =
      new PPMIModel(
        result.vocabulary,
        result.dataset,
        1,
      );

    coOccurrence.build();
    ppmi.build();

    const experiment =
      new SemanticComparisonExperiment(
        coOccurrence,
        ppmi,
      );

    const comparison =
      experiment.compare(
        result.dataset.get(0),
        result.dataset.get(1),
      );

    expect(
      comparison.coOccurrenceSimilarity,
    ).toBeGreaterThanOrEqual(-1);

    expect(
      comparison.coOccurrenceSimilarity,
    ).toBeLessThanOrEqual(1);

    expect(
      comparison.ppmiSimilarity,
    ).toBeGreaterThanOrEqual(-1);

    expect(
      comparison.ppmiSimilarity,
    ).toBeLessThanOrEqual(1);
  });

  it("preserves the compared sentences", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The dog drinks water.",
    ]);

    const coOccurrence =
      new CoOccurrenceModel(
        result.vocabulary,
        result.dataset,
        1,
      );

    const ppmi =
      new PPMIModel(
        result.vocabulary,
        result.dataset,
        1,
      );

    coOccurrence.build();
    ppmi.build();

    const experiment =
      new SemanticComparisonExperiment(
        coOccurrence,
        ppmi,
      );

    const comparison =
      experiment.compare(
        result.dataset.get(0),
        result.dataset.get(1),
      );

    expect(comparison.first.text).toBe(
      "The cat drinks milk.",
    );

    expect(comparison.second.text).toBe(
      "The dog drinks water.",
    );
  });
});
