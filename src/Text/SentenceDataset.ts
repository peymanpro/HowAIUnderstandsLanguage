import { Sentence } from "./Sentence.js";

export class SentenceDataset {
  private readonly sentences: Sentence[] = [];

  public add(sentence: Sentence): void {
    this.sentences.push(sentence);
  }

  public get size(): number {
    return this.sentences.length;
  }

  public get(index: number): Sentence {
    const sentence = this.sentences[index];

    if (sentence === undefined) {
      throw new RangeError(
        `Sentence index ${index} is out of range.`,
      );
    }

    return sentence;
  }

  public all(): Sentence[] {
    return [...this.sentences];
  }
}
