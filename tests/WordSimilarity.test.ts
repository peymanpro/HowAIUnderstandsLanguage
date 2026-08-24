import { describe, expect, it } from "vitest";
import { Vector } from "../src/Mathematics/Vector.js";
import { EmbeddingTable } from "../src/Embeddings/EmbeddingTable.js";
import { WordSimilarity } from "../src/Embeddings/WordSimilarity.js";
import { Vocabulary } from "../src/Vocabulary/Vocabulary.js";

describe("WordSimilarity", () => {
  it("calculates cosine similarity between two words", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 1);
    vocabulary.add("dog", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      3,
    );

    embeddings.initialize();

    embeddings.set(
      vocabulary.getId("cat"),
      new Vector([1, 0, 0]),
    );

    embeddings.set(
      vocabulary.getId("dog"),
      new Vector([1, 0, 0]),
    );

    const similarity = new WordSimilarity(
      embeddings,
    );

    expect(
      similarity.between("cat", "dog"),
    ).toBe(1);
  });

  it("returns zero for orthogonal vectors", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 1);
    vocabulary.add("car", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      2,
    );

    embeddings.initialize();

    embeddings.set(
      vocabulary.getId("cat"),
      new Vector([1, 0]),
    );

    embeddings.set(
      vocabulary.getId("car"),
      new Vector([0, 1]),
    );

    const similarity = new WordSimilarity(
      embeddings,
    );

    expect(
      similarity.between("cat", "car"),
    ).toBe(0);
  });

  it("can compare a word with itself", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      3,
    );

    embeddings.initialize();

    const similarity = new WordSimilarity(
      embeddings,
    );

    expect(
      similarity.between("cat", "cat"),
    ).toBeCloseTo(1);
  });
});
