import { corpus } from "../data/corpus.js";
import { CoOccurrenceModel } from "./Language/CoOccurrenceModel.js";
import { CorpusBuilder } from "./Language/CorpusBuilder.js";

console.log("HowAIUnderstandsLanguage");
console.log("========================");
console.log();
console.log(
  "How does AI understand human language?",
);
console.log();

const builder =
  new CorpusBuilder();

const {
  vocabulary,
  dataset,
} = builder.build(corpus);

const model =
  new CoOccurrenceModel(
    vocabulary,
    dataset,
    1,
  );

model.build();

console.log(
  "Context-Based Semantic Experiment",
);
console.log(
  "---------------------------------",
);
console.log();
console.log(
  `Corpus sentences: ${dataset.size}`,
);
console.log(
  `Vocabulary size:  ${vocabulary.size}`,
);
console.log();

for (const token of ["cat", "dog"]) {
  console.log(
    `Word: ${token}`,
  );

  const results =
    model.mostSimilar(token, 3);

  for (const result of results) {
    console.log(
      `  ${result.token.padEnd(10)} ` +
      `${result.similarity.toFixed(4)}`,
    );
  }

  console.log();
}
