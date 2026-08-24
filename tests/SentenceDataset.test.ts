import { describe, expect, it } from "vitest";
import { Sentence } from "../src/Text/Sentence.js";
import { SentenceDataset } from "../src/Text/SentenceDataset.js";

describe("SentenceDataset", () => {
  it("starts empty", () => {
    const dataset = new SentenceDataset();

    expect(dataset.size).toBe(0);
    expect(dataset.all()).toEqual([]);
  });

  it("adds sentences", () => {
    const dataset = new SentenceDataset();

    const first = new Sentence(
      "The cat sat.",
      ["the", "cat", "sat"],
      [0, 1, 2],
    );

    const second = new Sentence(
      "The dog sat.",
      ["the", "dog", "sat"],
      [0, 3, 2],
    );

    dataset.add(first);
    dataset.add(second);

    expect(dataset.size).toBe(2);
    expect(dataset.get(0)).toBe(first);
    expect(dataset.get(1)).toBe(second);
  });

  it("returns a copy of its sentences", () => {
    const dataset = new SentenceDataset();

    const sentence = new Sentence(
      "The cat.",
      ["the", "cat"],
      [0, 1],
    );

    dataset.add(sentence);

    const sentences = dataset.all();

    sentences.pop();

    expect(dataset.size).toBe(1);
  });

  it("rejects an invalid index", () => {
    const dataset = new SentenceDataset();

    expect(() => dataset.get(0)).toThrow();
  });
});
