import { SentenceDataset } from "../Text/SentenceDataset.js";
import { SentenceEncoder } from "../Text/SentenceEncoder.js";
import { Tokenizer } from "../Text/Tokenizer.js";
import { Vocabulary } from "../Vocabulary/Vocabulary.js";

export class CorpusBuilder {
  public build(sentences: readonly string[]): {
    vocabulary: Vocabulary;
    dataset: SentenceDataset;
  } {
    const vocabulary = new Vocabulary();
    const tokenizer = new Tokenizer();

    for (const sentence of sentences) {
      const tokens = tokenizer.tokenize(sentence);

      for (const token of tokens) {
        vocabulary.add(token, 1);
      }
    }

    const encoder = new SentenceEncoder(
      tokenizer,
      vocabulary,
    );

    const dataset = new SentenceDataset();

    for (const sentence of sentences) {
      dataset.add(
        encoder.encode(sentence),
      );
    }

    return {
      vocabulary,
      dataset,
    };
  }
}
