import { describe, expect, it } from "vitest";
import { EmbeddingTable } from "../src/Embeddings/EmbeddingTable.js";
import { Vector } from "../src/Mathematics/Vector.js";
import {
  ContextWindow,
} from "../src/Language/ContextWindow.js";
import {
  ContextRepresentation,
} from "../src/Language/ContextRepresentation.js";
import { Vocabulary } from "../src/Vocabulary/Vocabulary.js";

describe("ContextRepresentation", () => {
  it("averages the embeddings of context tokens", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 1);
    vocabulary.add("drinks", 1);
    vocabulary.add("milk", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      3,
    );

    embeddings.initialize();

    embeddings.set(
      vocabulary.getId("cat"),
      new Vector([1, 2, 3]),
    );

    embeddings.set(
      vocabulary.getId("drinks"),
      new Vector([3, 4, 5]),
    );

    embeddings.set(
      vocabulary.getId("milk"),
      new Vector([5, 6, 7]),
    );

    const representation =
      new ContextRepresentation(
        embeddings,
      );

    const window = new ContextWindow(
      1,
      [
        vocabulary.getId("cat"),
        vocabulary.getId("drinks"),
        vocabulary.getId("milk"),
      ],
    );

    expect(representation.represent(window).toArray())
      .toEqual([3, 4, 5]);
  });

  it("preserves the embedding dimension", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 1);
    vocabulary.add("dog", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      4,
    );

    embeddings.initialize();

    const window = new ContextWindow(
      0,
      [
        vocabulary.getId("cat"),
        vocabulary.getId("dog"),
      ],
    );

    const representation =
      new ContextRepresentation(
        embeddings,
      ).represent(window);

    expect(representation.dimension).toBe(4);
  });

  it("rejects a context without neighboring tokens", () => {
    const vocabulary = new Vocabulary();
    vocabulary.add("cat", 1);

    const embeddings = new EmbeddingTable(
      vocabulary,
      3,
    );

    embeddings.initialize();

    const representation =
      new ContextRepresentation(
        embeddings,
      );

    const window = new ContextWindow(
      0,
      [vocabulary.getId("cat")],
    );

    expect(() =>
      representation.represent(window),
    ).toThrow();
  });
});
