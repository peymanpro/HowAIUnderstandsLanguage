import { describe, expect, it } from "vitest";
import { Vocabulary } from "../src/Vocabulary/Vocabulary.js";

describe("Vocabulary", () => {
  it("adds a token and assigns an id", () => {
    const vocabulary = new Vocabulary();

    const entry = vocabulary.add("cat", 3);

    expect(entry.id).toBe(0);
    expect(entry.token).toBe("cat");
    expect(entry.frequency).toBe(3);

    expect(vocabulary.size).toBe(1);
    expect(vocabulary.getId("cat")).toBe(0);
  });

  it("normalizes tokens", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add(" Cat ", 2);

    expect(vocabulary.contains("cat")).toBe(true);
    expect(vocabulary.contains("CAT")).toBe(true);
    expect(vocabulary.getId(" CAT ")).toBe(0);
  });

  it("returns entries by id", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 2);
    vocabulary.add("dog", 4);

    expect(vocabulary.getEntry(0).token).toBe("cat");
    expect(vocabulary.getEntry(1).token).toBe("dog");
  });

  it("returns entries by token", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 2);

    expect(
      vocabulary.getEntryByToken("cat").frequency,
    ).toBe(2);
  });

  it("does not add duplicate normalized tokens", () => {
    const vocabulary = new Vocabulary();

    const first = vocabulary.add("cat", 2);
    const second = vocabulary.add(" CAT ", 3);

    expect(first.id).toBe(0);
    expect(second.id).toBe(0);
    expect(vocabulary.size).toBe(1);

    expect(
      vocabulary.getEntryByToken("cat").frequency,
    ).toBe(5);
  });

  it("returns all entries", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 2);
    vocabulary.add("dog", 4);

    expect(
      vocabulary.entries().map((entry) => entry.token),
    ).toEqual(["cat", "dog"]);
  });

  it("returns all tokens", () => {
    const vocabulary = new Vocabulary();

    vocabulary.add("cat", 2);
    vocabulary.add("dog", 4);

    expect(vocabulary.tokens()).toEqual([
      "cat",
      "dog",
    ]);
  });

  it("throws when a token does not exist", () => {
    const vocabulary = new Vocabulary();

    expect(
      () => vocabulary.getId("cat"),
    ).toThrow();
  });

  it("throws when an id does not exist", () => {
    const vocabulary = new Vocabulary();

    expect(
      () => vocabulary.getEntry(42),
    ).toThrow();
  });
});
