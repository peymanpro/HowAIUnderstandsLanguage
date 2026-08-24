import { VocabularyEntry } from "./VocabularyEntry.js";

export class Vocabulary {
  private readonly entriesById = new Map<number, VocabularyEntry>();
  private readonly idsByToken = new Map<string, number>();

  public add(
    token: string,
    frequency: number,
  ): VocabularyEntry {
    const normalizedToken = this.normalizeToken(token);

    if (!Number.isInteger(frequency) || frequency < 0) {
      throw new Error(
        "Vocabulary frequency must be a non-negative integer.",
      );
    }

    const existingId = this.idsByToken.get(normalizedToken);

    if (existingId !== undefined) {
      const existingEntry = this.entriesById.get(existingId);

      if (existingEntry === undefined) {
        throw new Error(
          `Vocabulary index is inconsistent for token "${normalizedToken}".`,
        );
      }

      const updatedEntry = new VocabularyEntry(
        existingEntry.id,
        existingEntry.token,
        existingEntry.frequency + frequency,
        existingEntry.vector,
      );

      this.entriesById.set(existingId, updatedEntry);

      return updatedEntry;
    }

    const id = this.entriesById.size;

    const entry = new VocabularyEntry(
      id,
      normalizedToken,
      frequency,
    );

    this.entriesById.set(id, entry);
    this.idsByToken.set(normalizedToken, id);

    return entry;
  }

  public get size(): number {
    return this.entriesById.size;
  }

  public contains(token: string): boolean {
    return this.idsByToken.has(
      this.normalizeToken(token),
    );
  }

  public getId(token: string): number {
    const normalizedToken = this.normalizeToken(token);
    const id = this.idsByToken.get(normalizedToken);

    if (id === undefined) {
      throw new Error(
        `Token "${normalizedToken}" does not exist in the vocabulary.`,
      );
    }

    return id;
  }

  public getEntry(id: number): VocabularyEntry {
    const entry = this.entriesById.get(id);

    if (entry === undefined) {
      throw new Error(
        `Vocabulary entry with id ${id} does not exist.`,
      );
    }

    return entry;
  }

  public getEntryByToken(token: string): VocabularyEntry {
    return this.getEntry(this.getId(token));
  }

  public entries(): VocabularyEntry[] {
    return [...this.entriesById.values()];
  }

  public tokens(): string[] {
    return this.entries().map(
      (entry) => entry.token,
    );
  }

  private normalizeToken(token: string): string {
    const normalizedToken = token.trim().toLowerCase();

    if (normalizedToken.length === 0) {
      throw new Error(
        "Vocabulary token cannot be empty.",
      );
    }

    return normalizedToken;
  }
}
