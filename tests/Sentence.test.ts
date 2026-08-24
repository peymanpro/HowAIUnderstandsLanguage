import { describe, expect, it } from "vitest";
import { Sentence } from "../src/Text/Sentence.js";

describe("Sentence", () => {
  it("stores raw text, tokens and token ids", () => {
    const sentence = new Sentence(
      "The cat sat.",
      ["the", "cat", "sat"],
      [2, 3, 4],
    );

    expect(sentence.text).toBe("The cat sat.");
    expect(sentence.tokens).toEqual([
      "the",
      "cat",
      "sat",
    ]);
    expect(sentence.tokenIds).toEqual([2, 3, 4]);
    expect(sentence.length).toBe(3);
  });

  it("rejects empty text", () => {
    expect(
      () => new Sentence("", [], []),
    ).toThrow();
  });

  it("rejects mismatched token and id counts", () => {
    expect(
      () =>
        new Sentence(
          "The cat sat.",
          ["the", "cat", "sat"],
          [2, 3],
        ),
    ).toThrow();
  });

  it("rejects invalid token ids", () => {
    expect(
      () =>
        new Sentence(
          "The cat.",
          ["the", "cat"],
          [2, -1],
        ),
    ).toThrow();

    expect(
      () =>
        new Sentence(
          "The cat.",
          ["the", "cat"],
          [2, 1.5],
        ),
    ).toThrow();
  });
});
