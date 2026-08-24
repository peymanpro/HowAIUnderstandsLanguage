import { describe, expect, it } from "vitest";
import { CoOccurrenceModel } from "../src/Language/CoOccurrenceModel.js";
import {
  SemanticSentenceRepresentation,
} from "../src/Language/SemanticSentenceRepresentation.js";
import { CorpusBuilder } from "../src/Language/CorpusBuilder.js";

describe("SemanticSentenceRepresentation", () => {
  it("builds a sentence vector from context-derived word vectors", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The cat likes milk.",
      "The dog drinks water.",
      "The dog likes food.",
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

    const vector =
      representation.represent(
        result.dataset.get(0),
      );

    expect(vector.dimension).toBe(
      result.vocabulary.size,
    );

    expect(vector.norm()).toBeGreaterThan(0);
  });

  it("produces deterministic sentence vectors", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The dog drinks water.",
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

    expect(
      representation
        .represent(result.dataset.get(0))
        .toArray(),
    ).toEqual(
      representation
        .represent(result.dataset.get(0))
        .toArray(),
    );
  });
});
