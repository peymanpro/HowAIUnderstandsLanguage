import { Vocabulary } from "../Vocabulary/Vocabulary.js";
import { Sentence } from "./Sentence.js";
import { Tokenizer } from "./Tokenizer.js";

export class SentenceEncoder {
  public constructor(
    private readonly tokenizer: Tokenizer,
    private readonly vocabulary: Vocabulary,
  ) {}

  public encode(text: string): Sentence {
    if (text.trim().length === 0) {
      throw new Error("Cannot encode an empty sentence.");
    }

    const tokens = this.tokenizer.tokenize(text);

    if (tokens.length === 0) {
      throw new Error("Sentence produced no tokens.");
    }

    const tokenIds = tokens.map((token) =>
      this.vocabulary.getId(token),
    );

    return new Sentence(
      text,
      tokens,
      tokenIds,
    );
  }
}
