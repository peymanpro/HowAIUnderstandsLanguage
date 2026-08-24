import { describe, expect, it } from "vitest";
import { Vector } from "../src/Mathematics/Vector.js";
import { VocabularyEntry } from "../src/Vocabulary/VocabularyEntry.js";

describe("VocabularyEntry", () => {
  it("stores token metadata", () => {
    const entry = new VocabularyEntry(
      3,
      "cat",
      7
    );

    expect(entry.id).toBe(3);
    expect(entry.token).toBe("cat");
    expect(entry.frequency).toBe(7);
    expect(entry.hasVector()).toBe(false);
  });

  it("can store a vector representation", () => {
    const vector = new Vector([0.1, 0.2, 0.3]);

    const entry = new VocabularyEntry(
      3,
      "cat",
      7,
      vector
    );

    expect(entry.hasVector()).toBe(true);
    expect(entry.vector?.toArray()).toEqual([
      0.1,
      0.2,
      0.3
    ]);
  });

  it("rejects negative ids", () => {
    expect(
      () => new VocabularyEntry(-1, "cat", 1)
    ).toThrow();
  });

  it("rejects non-integer ids", () => {
    expect(
      () => new VocabularyEntry(1.5, "cat", 1)
    ).toThrow();
  });

  it("rejects empty tokens", () => {
    expect(
      () => new VocabularyEntry(1, "   ", 1)
    ).toThrow();
  });

  it("rejects negative frequencies", () => {
    expect(
      () => new VocabularyEntry(1, "cat", -1)
    ).toThrow();
  });

  it("rejects non-integer frequencies", () => {
    expect(
      () => new VocabularyEntry(1, "cat", 1.5)
    ).toThrow();
  });
});
