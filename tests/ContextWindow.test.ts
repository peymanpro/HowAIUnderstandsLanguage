import { describe, expect, it } from "vitest";
import { Sentence } from "../src/Text/Sentence.js";
import { createContextWindow } from "../src/Language/ContextWindow.js";

describe("ContextWindow", () => {
  const sentence = new Sentence(
    "The cat sat on the mat.",
    ["the", "cat", "sat", "on", "the", "mat"],
    [0, 1, 2, 3, 0, 4],
  );

  it("creates a context window around a target token", () => {
    const window = createContextWindow(
      sentence,
      2,
      1,
    );

    expect(window.targetTokenId).toBe(2);
    expect(window.contextTokenIds).toEqual([1, 3]);
  });

  it("limits the window at the beginning of a sentence", () => {
    const window = createContextWindow(
      sentence,
      0,
      2,
    );

    expect(window.targetTokenId).toBe(0);
    expect(window.contextTokenIds).toEqual([1, 2]);
  });

  it("limits the window at the end of a sentence", () => {
    const window = createContextWindow(
      sentence,
      5,
      2,
    );

    expect(window.targetTokenId).toBe(4);
    expect(window.contextTokenIds).toEqual([3, 0]);
  });

  it("rejects an invalid radius", () => {
    expect(() =>
      createContextWindow(sentence, 2, 0),
    ).toThrow();
  });

  it("rejects an invalid target index", () => {
    expect(() =>
      createContextWindow(sentence, 10, 1),
    ).toThrow();
  });
});


