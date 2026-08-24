import { describe, expect, it } from "vitest";
import { Tokenizer } from "../src/Text/Tokenizer.js";

describe("Tokenizer", () => {
  it("tokenizes a simple sentence", () => {
    const tokenizer = new Tokenizer();

    expect(
      tokenizer.tokenize("The cat sat on the mat.")
    ).toEqual([
      "the",
      "cat",
      "sat",
      "on",
      "the",
      "mat",
    ]);
  });

  it("normalizes case", () => {
    const tokenizer = new Tokenizer();

    expect(
      tokenizer.tokenize("The CAT Sat.")
    ).toEqual([
      "the",
      "cat",
      "sat",
    ]);
  });

  it("removes punctuation", () => {
    const tokenizer = new Tokenizer();

    expect(
      tokenizer.tokenize("Hello, world!")
    ).toEqual([
      "hello",
      "world",
    ]);
  });

  it("handles multiple spaces", () => {
    const tokenizer = new Tokenizer();

    expect(
      tokenizer.tokenize("the   cat    sat")
    ).toEqual([
      "the",
      "cat",
      "sat",
    ]);
  });

  it("returns an empty array for empty text", () => {
    const tokenizer = new Tokenizer();

    expect(tokenizer.tokenize("")).toEqual([]);
    expect(tokenizer.tokenize("   ")).toEqual([]);
  });
});
