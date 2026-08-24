import { describe, expect, it } from "vitest";
import { SentenceEncoder } from "../src/Text/SentenceEncoder.js";
import { Tokenizer } from "../src/Text/Tokenizer.js";
import { Vocabulary } from "../src/Vocabulary/Vocabulary.js";

describe("SentenceEncoder", () => {
  it("converts text into tokens and vocabulary ids", () => {
    const tokenizer = new Tokenizer();
    const vocabulary = new Vocabulary();

    vocabulary.add("the", 3);
    vocabulary.add("cat", 2);
    vocabulary.add("sat", 2);

    const encoder = new SentenceEncoder(
      tokenizer,
      vocabulary,
    );

    const sentence = encoder.encode(
      "The cat sat.",
    );

    expect(sentence.text).toBe(
      "The cat sat.",
    );

    expect(sentence.tokens).toEqual([
      "the",
      "cat",
      "sat",
    ]);

    expect(sentence.tokenIds).toEqual([
      0,
      1,
      2,
    ]);
  });

  it("normalizes input using the tokenizer", () => {
    const tokenizer = new Tokenizer();
    const vocabulary = new Vocabulary();

    vocabulary.add("the", 1);
    vocabulary.add("cat", 1);

    const encoder = new SentenceEncoder(
      tokenizer,
      vocabulary,
    );

    const sentence = encoder.encode(
      "  THE   CAT! ",
    );

    expect(sentence.tokens).toEqual([
      "the",
      "cat",
    ]);

    expect(sentence.tokenIds).toEqual([
      0,
      1,
    ]);
  });

  it("rejects an unknown token", () => {
    const tokenizer = new Tokenizer();
    const vocabulary = new Vocabulary();

    vocabulary.add("the", 1);

    const encoder = new SentenceEncoder(
      tokenizer,
      vocabulary,
    );

    expect(() =>
      encoder.encode("The dog."),
    ).toThrow();
  });

  it("rejects empty input", () => {
    const tokenizer = new Tokenizer();
    const vocabulary = new Vocabulary();

    const encoder = new SentenceEncoder(
      tokenizer,
      vocabulary,
    );

    expect(() =>
      encoder.encode("   "),
    ).toThrow();
  });
});
