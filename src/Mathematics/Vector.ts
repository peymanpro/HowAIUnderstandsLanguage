export class Vector {
  private readonly values: number[];

  public constructor(values: readonly number[]) {
    if (values.length === 0) {
      throw new Error("A vector must contain at least one value.");
    }

    if (values.some((value) => !Number.isFinite(value))) {
      throw new Error("Vector values must be finite numbers.");
    }

    this.values = [...values];
  }

  public get dimension(): number {
    return this.values.length;
  }

  public get(index: number): number {
    return this.values[index] ?? this.throwIndexError(index);
  }

  public toArray(): number[] {
    return [...this.values];
  }

  public add(other: Vector): Vector {
    this.ensureSameDimension(other);

    return new Vector(
      this.values.map(
        (value, index) => value + other.get(index)
      )
    );
  }

  public subtract(other: Vector): Vector {
    this.ensureSameDimension(other);

    return new Vector(
      this.values.map(
        (value, index) => value - other.get(index)
      )
    );
  }

  public multiply(scalar: number): Vector {
    if (!Number.isFinite(scalar)) {
      throw new Error("Scalar must be a finite number.");
    }

    return new Vector(
      this.values.map((value) => value * scalar)
    );
  }

  public dot(other: Vector): number {
    this.ensureSameDimension(other);

    return this.values.reduce(
      (sum, value, index) =>
        sum + value * other.get(index),
      0
    );
  }

  public norm(): number {
    return Math.sqrt(this.dot(this));
  }

  public cosineSimilarity(other: Vector): number {
    this.ensureSameDimension(other);

    const leftNorm = this.norm();
    const rightNorm = other.norm();

    if (leftNorm === 0 || rightNorm === 0) {
      throw new Error(
        "Cosine similarity is undefined for zero vectors."
      );
    }

    return this.dot(other) / (leftNorm * rightNorm);
  }

  private ensureSameDimension(other: Vector): void {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Vector dimensions must match. ` +
        `Expected ${this.dimension}, received ${other.dimension}.`
      );
    }
  }

  private throwIndexError(index: number): never {
    throw new RangeError(
      `Vector index ${index} is out of range.`
    );
  }
}
