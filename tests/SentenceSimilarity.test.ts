import { describe, expect, it } from "vitest";
import { EmbeddingTable } from "../src/Embeddings/EmbeddingTable.js";
import { SentenceRepresentation } from "../src/Language/SentenceRepresentation.js";
import { SentenceSimilarity } from "../src/Language/SentenceSimilarity.js";
import { Sentence } from "../src/Text/Sentence.js";
import { Vocabulary } from "../src/Vocabulary/Vocabulary.js";
import { Vector } from "../src/Mathematics/Vector.js";

describe("SentenceSimilarity", () => {
  it("returns one for identical sentence representations", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 1);
    vocabulary.add("dog", 1);

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
      vocabulary.getId("dog"),
      new Vector([1, 0]),
    );

    const representation =
      new SentenceRepresentation(
        embeddings,
      );

    const similarity =
      new SentenceSimilarity(
        representation,
      );

    const first = new Sentence(
      "cat",
      ["cat"],
      [vocabulary.getId("cat")],
    );

    const second = new Sentence(
      "dog",
      ["dog"],
      [vocabulary.getId("dog")],
    );

    expect(
      similarity.between(first, second),
    ).toBe(1);
  });

  it("returns zero for orthogonal sentence representations", () => {
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

    const representation =
      new SentenceRepresentation(
        embeddings,
      );

    const similarity =
      new SentenceSimilarity(
        representation,
      );

    const first = new Sentence(
      "cat",
      ["cat"],
      [vocabulary.getId("cat")],
    );

    const second = new Sentence(
      "car",
      ["car"],
      [vocabulary.getId("car")],
    );

    expect(
      similarity.between(first, second),
    ).toBe(0);
  });

  it("is symmetric", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 1);
    vocabulary.add("dog", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      2,
    );

    embeddings.initialize();

    embeddings.set(
      vocabulary.getId("cat"),
      new Vector([1, 1]),
    );

    embeddings.set(
      vocabulary.getId("dog"),
      new Vector([1, 0]),
    );

    const representation =
      new SentenceRepresentation(
        embeddings,
      );

    const similarity =
      new SentenceSimilarity(
        representation,
      );

    const first = new Sentence(
      "cat",
      ["cat"],
      [vocabulary.getId("cat")],
    );

    const second = new Sentence(
      "dog",
      ["dog"],
      [vocabulary.getId("dog")],
    );

    expect(
      similarity.between(first, second),
    ).toBeCloseTo(
      similarity.between(second, first),
    );
  });
});
