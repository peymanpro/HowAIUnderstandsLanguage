import { corpus } from "../data/corpus.js";
import { CoOccurrenceModel } from "./Language/CoOccurrenceModel.js";
import { CorpusBuilder } from "./Language/CorpusBuilder.js";
import { PPMIModel } from "./Language/PPMIModel.js";
import { SemanticComparisonExperiment } from "./Language/SemanticComparisonExperiment.js";

console.log("HowAIUnderstandsLanguage");
console.log("========================");
console.log();
console.log("How does AI understand human language?");
console.log();

const builder = new CorpusBuilder();

const {
  vocabulary,
  dataset,
} = builder.build(corpus);

const coOccurrence =
  new CoOccurrenceModel(
    vocabulary,
    dataset,
    1,
  );

const ppmi =
  new PPMIModel(
    vocabulary,
    dataset,
    1,
  );

coOccurrence.build();
ppmi.build();

const experiment =
  new SemanticComparisonExperiment(
    coOccurrence,
    ppmi,
  );

console.log("Semantic Representation Experiment");
console.log("-----------------------------------");
console.log();
console.log(`Corpus sentences: ${dataset.size}`);
console.log(`Vocabulary size:  ${vocabulary.size}`);
console.log();

const comparisons = [
  [0, 2],
  [0, 3],
  [2, 4],
] as const;

for (const [firstIndex, secondIndex] of comparisons) {
  const comparison = experiment.compare(
    dataset.get(firstIndex),
    dataset.get(secondIndex),
  );

  console.log(`"${comparison.first.text}"`);
  console.log("vs");
  console.log(`"${comparison.second.text}"`);
  console.log();

  console.log(
    `Raw co-occurrence similarity: ` +
    `${comparison.coOccurrenceSimilarity.toFixed(4)}`,
  );

  console.log(
    `PPMI similarity:              ` +
    `${comparison.ppmiSimilarity.toFixed(4)}`,
  );

  console.log();
  console.log("-----------------------------------");
  console.log();
}

console.log("Interpretation");
console.log("-------------");
console.log(
  "Raw co-occurrence counts treat observed context",
);
console.log(
  "frequencies directly as representation.",
);
console.log(
  "PPMI reweights those observations according to",
);
console.log(
  "how informative a context is for a word.",
);
console.log();
console.log(
  "Neither method represents full language understanding.",
);
console.log(
  "They demonstrate how increasingly informative numerical",
);
console.log(
  "representations can be constructed from language data.",
);
