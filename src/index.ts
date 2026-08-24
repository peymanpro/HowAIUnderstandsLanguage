import { corpus } from "../data/corpus.js";
import { CoOccurrenceModel } from "./Language/CoOccurrenceModel.js";
import { CorpusBuilder } from "./Language/CorpusBuilder.js";
import { SemanticExperiment } from "./Language/SemanticExperiment.js";
import { SemanticSentenceRepresentation } from "./Language/SemanticSentenceRepresentation.js";
import { SemanticSentenceSimilarity } from "./Language/SemanticSentenceSimilarity.js";

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

const wordModel = new CoOccurrenceModel(
  vocabulary,
  dataset,
  1,
);

wordModel.build();

const representation =
  new SemanticSentenceRepresentation(
    wordModel,
  );

const similarity =
  new SemanticSentenceSimilarity(
    representation,
  );

const experiment =
  new SemanticExperiment(similarity);

console.log("Corpus");
console.log("------");
console.log(`Sentences:  ${dataset.size}`);
console.log(`Vocabulary: ${vocabulary.size}`);
console.log();

const comparisons = [
  [0, 4],
  [0, 2],
  [0, 3],
] as const;

console.log("Semantic Sentence Similarity");
console.log("----------------------------");

for (const [firstIndex, secondIndex] of comparisons) {
  const comparison = experiment.compare(
    dataset.get(firstIndex),
    dataset.get(secondIndex),
  );

  console.log();
  console.log(`"${comparison.first.text}"`);
  console.log("vs");
  console.log(`"${comparison.second.text}"`);
  console.log(
    `Similarity: ${comparison.similarity.toFixed(4)}`,
  );
}

console.log();
console.log("Interpretation");
console.log("-------------");
console.log(
  "The current model represents words using their observed",
);
console.log(
  "contexts and combines those representations to compare",
);
console.log(
  "sentences numerically.",
);
console.log();
console.log(
  "This is a simplified semantic representation, not full",
);
console.log(
  "language understanding.",
);
