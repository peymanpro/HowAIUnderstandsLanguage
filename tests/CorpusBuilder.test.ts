import { describe, expect, it } from "vitest";
import { CorpusBuilder } from "../src/Language/CorpusBuilder.js";

describe("CorpusBuilder", () => {
  it("builds one shared vocabulary for the corpus", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat sat.",
      "The dog sat.",
    ]);

    expect(result.dataset.size).toBe(2);
    expect(result.vocabulary.size).toBe(4);

    expect(
      result.vocabulary.getId("the"),
    ).toBe(
      result.dataset.get(0).tokenIds[0],
    );

    expect(
      result.vocabulary.getId("cat"),
    ).toBe(
      result.dataset.get(0).tokenIds[1],
    );

    expect(
      result.vocabulary.getId("dog"),
    ).toBe(
      result.dataset.get(1).tokenIds[1],
    );
  });

  it("accumulates token frequencies across sentences", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat sat.",
      "The dog sat.",
      "The cat slept.",
    ]);

    expect(
      result.vocabulary.getEntryByToken("the").frequency,
    ).toBe(3);

    expect(
      result.vocabulary.getEntryByToken("cat").frequency,
    ).toBe(2);

    expect(
      result.vocabulary.getEntryByToken("sat").frequency,
    ).toBe(2);

    expect(
      result.vocabulary.getEntryByToken("dog").frequency,
    ).toBe(1);
  });

  it("encodes every sentence using the shared vocabulary", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat sat.",
      "The cat sleeps.",
    ]);

    const first = result.dataset.get(0);
    const second = result.dataset.get(1);

    expect(first.tokens).toEqual([
      "the",
      "cat",
      "sat",
    ]);

    expect(second.tokens).toEqual([
      "the",
      "cat",
      "sleeps",
    ]);

    expect(first.tokenIds[0]).toBe(
      second.tokenIds[0],
    );

    expect(first.tokenIds[1]).toBe(
      second.tokenIds[1],
    );
  });

  it("preserves sentence order", () => {
    const builder = new CorpusBuilder();

    const result = builder.build([
      "The cat.",
      "The dog.",
      "The bird.",
    ]);

    expect(result.dataset.get(0).text).toBe(
      "The cat.",
    );

    expect(result.dataset.get(1).text).toBe(
      "The dog.",
    );

    expect(result.dataset.get(2).text).toBe(
      "The bird.",
    );
  });
});

