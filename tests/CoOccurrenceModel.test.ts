import { describe, expect, it } from "vitest";
import { CoOccurrenceModel } from "../src/Language/CoOccurrenceModel.js";
import { CorpusBuilder } from "../src/Language/CorpusBuilder.js";

describe("CoOccurrenceModel", () => {
  it("builds context vectors from the corpus", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The cat likes milk.",
      "The dog drinks water.",
      "The dog likes food.",
    ]);

    const model = new CoOccurrenceModel(
      result.vocabulary,
      result.dataset,
      1,
    );

    model.build();

    const cat = model.getVector("cat");

    expect(cat.dimension).toBe(
      result.vocabulary.size,
    );

    expect(cat.norm()).toBeGreaterThan(0);
  });

  it("produces deterministic context vectors", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The cat likes milk.",
    ]);

    const model = new CoOccurrenceModel(
      result.vocabulary,
      result.dataset,
      1,
    );

    model.build();

    expect(
      model.getVector("cat").toArray(),
    ).toEqual(
      model.getVector("cat").toArray(),
    );
  });

  it("produces a similarity value for words with shared context", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The cat likes milk.",
      "The dog drinks milk.",
      "The dog likes milk.",
    ]);

    const model = new CoOccurrenceModel(
      result.vocabulary,
      result.dataset,
      1,
    );

    model.build();

    const similarity = model.similarity(
      "cat",
      "dog",
    );

    expect(similarity).toBeGreaterThan(0);
  });

  it("rejects invalid context radius", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat sleeps.",
    ]);

    expect(
      () =>
        new CoOccurrenceModel(
          result.vocabulary,
          result.dataset,
          0,
        ),
    ).toThrow();
  });
});
