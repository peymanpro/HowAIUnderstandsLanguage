import { describe, expect, it } from "vitest";
import { Vector } from "../src/Mathematics/Vector.js";
import { EmbeddingTable } from "../src/Embeddings/EmbeddingTable.js";
import { Vocabulary } from "../src/Vocabulary/Vocabulary.js";

describe("EmbeddingTable", () => {
  it("creates deterministic embeddings for vocabulary entries", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 2);
    vocabulary.add("dog", 3);

    const table = new EmbeddingTable(
      vocabulary,
      4,
    );

    table.initialize();

    expect(table.size).toBe(2);
    expect(table.embeddingDimension).toBe(4);

    const cat = table.getForToken("cat");
    const dog = table.getForToken("dog");

    expect(cat.dimension).toBe(4);
    expect(dog.dimension).toBe(4);

    expect(cat.toArray()).toEqual(
      table.getForToken("cat").toArray(),
    );

    expect(cat.toArray()).not.toEqual(
      dog.toArray(),
    );
  });

  it("requires initialization before reading embeddings", () => {
    const vocabulary = new Vocabulary();
    vocabulary.add("cat", 1);

    const table = new EmbeddingTable(
      vocabulary,
      4,
    );

    expect(() =>
      table.getForToken("cat"),
    ).toThrow();
  });

  it("can retrieve embeddings by token id", () => {
    const vocabulary = new Vocabulary();
    vocabulary.add("cat", 1);

    const table = new EmbeddingTable(
      vocabulary,
      3,
    );

    table.initialize();

    const id = vocabulary.getId("cat");

    expect(table.get(id).dimension).toBe(3);
  });

  it("can replace an embedding", () => {
    const vocabulary = new Vocabulary();
    vocabulary.add("cat", 1);

    const table = new EmbeddingTable(
      vocabulary,
      3,
    );

    table.initialize();

    const replacement = new Vector([
      0.1,
      0.2,
      0.3,
    ]);

    table.set(
      vocabulary.getId("cat"),
      replacement,
    );

    expect(
      table.getForToken("cat").toArray(),
    ).toEqual([
      0.1,
      0.2,
      0.3,
    ]);
  });

  it("rejects vectors with the wrong dimension", () => {
    const vocabulary = new Vocabulary();
    vocabulary.add("cat", 1);

    const table = new EmbeddingTable(
      vocabulary,
      3,
    );

    expect(() =>
      table.set(
        vocabulary.getId("cat"),
        new Vector([1, 2]),
      ),
    ).toThrow();
  });

  it("rejects unknown token ids", () => {
    const vocabulary = new Vocabulary();
    vocabulary.add("cat", 1);

    const table = new EmbeddingTable(
      vocabulary,
      3,
    );

    expect(() =>
      table.get(100),
    ).toThrow();

    expect(() =>
      table.set(
        100,
        new Vector([1, 2, 3]),
      ),
    ).toThrow();
  });
});
