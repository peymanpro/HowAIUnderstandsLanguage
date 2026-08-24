import { describe, expect, it } from "vitest";
import { EmbeddingTable } from "../src/Embeddings/EmbeddingTable.js";
import { Vector } from "../src/Mathematics/Vector.js";
import { SentenceRepresentation } from "../src/Language/SentenceRepresentation.js";
import { Sentence } from "../src/Text/Sentence.js";
import { Vocabulary } from "../src/Vocabulary/Vocabulary.js";

describe("SentenceRepresentation", () => {
  it("creates a sentence vector by averaging token embeddings", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("the", 1);
    vocabulary.add("cat", 1);
    vocabulary.add("drinks", 1);
    vocabulary.add("milk", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      3,
    );

    embeddings.initialize();

    embeddings.set(
      vocabulary.getId("the"),
      new Vector([0, 1, 2]),
    );

    embeddings.set(
      vocabulary.getId("cat"),
      new Vector([1, 2, 3]),
    );

    embeddings.set(
      vocabulary.getId("drinks"),
      new Vector([2, 3, 4]),
    );

    embeddings.set(
      vocabulary.getId("milk"),
      new Vector([3, 4, 5]),
    );

    const sentence = new Sentence(
      "The cat drinks milk.",
      ["the", "cat", "drinks", "milk"],
      [
        vocabulary.getId("the"),
        vocabulary.getId("cat"),
        vocabulary.getId("drinks"),
        vocabulary.getId("milk"),
      ],
    );

    const representation =
      new SentenceRepresentation(
        embeddings,
      );

    expect(
      representation.represent(sentence).toArray(),
    ).toEqual([
      1.5,
      2.5,
      3.5,
    ]);
  });

  it("preserves embedding dimension", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 1);
    vocabulary.add("milk", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      5,
    );

    embeddings.initialize();

    const sentence = new Sentence(
      "cat milk",
      ["cat", "milk"],
      [
        vocabulary.getId("cat"),
        vocabulary.getId("milk"),
      ],
    );

    const representation =
      new SentenceRepresentation(
        embeddings,
      ).represent(sentence);

    expect(representation.dimension).toBe(5);
  });

  it("rejects a sentence without tokens", () => {
    const vocabulary = new Vocabulary();
    vocabulary.add("cat", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      3,
    );

    embeddings.initialize();

    const sentence = new Sentence(
      "cat",
      [],
      [],
    );

    const representation =
      new SentenceRepresentation(
        embeddings,
      );

    expect(() =>
      representation.represent(sentence),
    ).toThrow();
  });
});
