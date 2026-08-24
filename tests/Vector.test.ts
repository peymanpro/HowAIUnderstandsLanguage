import { describe, expect, it } from "vitest";
import { Vector } from "../src/Mathematics/Vector.js";

describe("Vector", () => {
  it("creates a vector", () => {
    const vector = new Vector([1, 2, 3]);

    expect(vector.dimension).toBe(3);
    expect(vector.toArray()).toEqual([1, 2, 3]);
  });

  it("adds vectors", () => {
    expect(
      new Vector([1, 2, 3])
        .add(new Vector([4, 5, 6]))
        .toArray()
    ).toEqual([5, 7, 9]);
  });

  it("subtracts vectors", () => {
    expect(
      new Vector([1, 2, 3])
        .subtract(new Vector([4, 5, 6]))
        .toArray()
    ).toEqual([-3, -3, -3]);
  });

  it("multiplies by a scalar", () => {
    expect(
      new Vector([1, 2, 3])
        .multiply(2)
        .toArray()
    ).toEqual([2, 4, 6]);
  });

  it("calculates dot product", () => {
    expect(
      new Vector([1, 2, 3]).dot(
        new Vector([4, 5, 6])
      )
    ).toBe(32);
  });

  it("calculates norm", () => {
    expect(new Vector([3, 4]).norm()).toBe(5);
  });

  it("calculates cosine similarity", () => {
    expect(
      new Vector([1, 0]).cosineSimilarity(
        new Vector([1, 0])
      )
    ).toBe(1);
  });

  it("rejects empty vectors", () => {
    expect(() => new Vector([])).toThrow();
  });

  it("rejects non-finite values", () => {
    expect(() => new Vector([1, Number.NaN])).toThrow();
    expect(() => new Vector([1, Number.POSITIVE_INFINITY])).toThrow();
  });

  it("rejects incompatible dimensions", () => {
    const left = new Vector([1, 2]);
    const right = new Vector([1, 2, 3]);

    expect(() => left.add(right)).toThrow();
    expect(() => left.subtract(right)).toThrow();
    expect(() => left.dot(right)).toThrow();
  });

  it("rejects cosine similarity with a zero vector", () => {
    expect(() =>
      new Vector([0, 0]).cosineSimilarity(
        new Vector([1, 0])
      )
    ).toThrow();
  });
});
