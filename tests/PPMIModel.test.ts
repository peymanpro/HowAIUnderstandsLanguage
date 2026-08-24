import { describe, expect, it } from "vitest";
import { CorpusBuilder } from "../src/Language/CorpusBuilder.js";
import { PPMIModel } from "../src/Language/PPMIModel.js";

describe("PPMIModel", () => {
  it("builds non-negative context vectors", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The cat likes milk.",
      "The dog drinks water.",
      "The dog likes food.",
    ]);

    const model = new PPMIModel(
      result.vocabulary,
      result.dataset,
      1,
    );

    model.build();

    const vector =
      model.getVector("cat");

    expect(vector.dimension).toBe(
      result.vocabulary.size,
    );

    expect(
      vector.toArray().every(
        (value) => value >= 0,
      ),
    ).toBe(true);
  });

  it("produces a positive similarity for shared context", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The cat likes milk.",
      "The dog drinks milk.",
      "The dog likes milk.",
    ]);

    const model = new PPMIModel(
      result.vocabulary,
      result.dataset,
      1,
    );

    model.build();

    expect(
      model.similarity("cat", "dog"),
    ).toBeGreaterThan(0);
  });

  it("produces deterministic vectors", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat drinks milk.",
      "The dog drinks milk.",
    ]);

    const model = new PPMIModel(
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

  it("rejects invalid radius", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat sleeps.",
    ]);

    expect(() =>
      new PPMIModel(
        result.vocabulary,
        result.dataset,
        0,
      ),
    ).toThrow();
  });
});
