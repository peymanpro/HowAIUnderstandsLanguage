export class Tokenizer {
  public tokenize(text: string): string[] {
    if (text.trim().length === 0) {
      return [];
    }

    return text
      .toLowerCase()
      .replace(/[.,!?;:()[\]{}"]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 0);
  }
}
