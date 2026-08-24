HowAIUnderstandsLanguage

How does AI understand human language?

HowAIUnderstandsLanguage is a from-scratch exploration of how a machine can turn human language into numerical representations and extract simple semantic relationships from them.

The project is intentionally built without NLP or language-modeling frameworks. Its purpose is not to build another library, but to expose the ideas underneath modern language processing.

The Question

A human sees:

The cat drinks milk.

A machine does not start with the concept of a "cat", "drinking", or "milk".

It starts with symbols.

The project follows what happens next:

Human Language
      │
      ▼
Tokenization
      │
      ▼
Vocabulary
      │
      ▼
Token IDs
      │
      ▼
Vector Representations
      │
      ▼
Context
      │
      ▼
Co-occurrence Statistics
      │
      ▼
PPMI
      │
      ▼
Semantic Word Representation
      │
      ▼
Sentence Representation
      │
      ▼
Sentence Similarity

The central idea is simple:

Before a machine can reason about language, language has to become mathematics.

What This Project Demonstrates

This repository deliberately builds the representation pipeline one layer at a time.

1. Tokenization

Raw text is converted into tokens without using an NLP tokenizer.

"The cat sat on the mat."
            ↓
["the", "cat", "sat", "on", "the", "mat"]

2. Vocabulary

Tokens become stable numerical identifiers.

the  → 0
cat  → 1
sat  → 2
on   → 3
mat  → 4

The vocabulary also tracks token frequency.

Vocabulary and sentence data are deliberately kept as separate concepts.

3. Vectors

The project contains its own small vector mathematics layer.

It supports operations such as:

addition

subtraction

scalar multiplication

dot product

Euclidean norm

cosine similarity

These primitives are later reused by the language representation layers.

4. Word Representations

Each vocabulary item can be associated with a numerical vector.

This makes an important limitation visible:

word → vector

by itself does not mean that a machine understands the word.

A useful representation must capture relationships between words.

5. Context

Words occur with other words.

The project therefore models local context using a configurable context window.

For example:

The cat drinks milk.
        ↑
      target

context:
the, drinks

Context gives the machine information about how a word is used.

6. Co-occurrence

The project builds word-context statistics directly from the corpus.

A word is represented by the pattern of contexts in which it occurs.

This introduces a fundamental NLP idea:

Words that occur in similar contexts can acquire similar numerical representations.

7. PPMI

Raw co-occurrence counts are often dominated by frequent words.

The project therefore also implements Positive Pointwise Mutual Information (PPMI):

PMI(x,y) =
log( P(x,y) / (P(x)P(y)) )

PPMI(x,y) = max(PMI(x,y), 0)

PPMI gives more weight to informative word-context relationships instead of treating every observed co-occurrence equally.

8. Sentence Representation

Word-level representations can be aggregated into a vector for an entire sentence.

word vectors
     ↓
aggregation
     ↓
sentence vector

Two sentences can then be compared numerically using cosine similarity.

This is deliberately simple. It demonstrates the idea of sentence representation without hiding the process inside a pretrained language model.

A Real Experiment

The project does not assume that a method works simply because the implementation looks mathematically plausible.

It compares different representations experimentally.

Using the current small corpus, raw co-occurrence produced very high similarities:

"The cat sat on the mat."
vs
"The cat drinks milk."

0.9464

while:

"The cat sat on the mat."
vs
"The dog likes food."

0.9653

This is a useful failure.

The raw representation sees too many sentences as similar because frequent and shared context information dominates the vector.

After PPMI reweighting:

"The cat sat on the mat."
vs
"The cat drinks milk."

0.6222

and:

"The cat likes milk."
vs
"The cat drinks milk."

0.7883

The representation becomes more discriminative.

This does not prove that the machine understands language.

It demonstrates something more useful for this project:

Better numerical representations can produce better semantic relationships, while still having clear limitations.

Those limitations are part of the result, not something hidden from the reader.

What the Project Does Not Try to Do

This repository intentionally stops before attention and Transformers.

It does not attempt to implement:

a production NLP framework

a pretrained language model

a Transformer

self-attention

a large-scale corpus

a competitive language model

an API abstraction layer around existing AI models

Those are different engineering and research problems.

The purpose here is narrower:

Make the transition from human language to numerical representation understandable from first principles.

More advanced mechanisms such as attention and Transformers are better treated as separate projects once this foundation is understood.

Architecture

HowAIUnderstandsLanguage/
│
├── src/
│   ├── Mathematics/
│   │   └── Vector.ts
│   │
│   ├── Text/
│   │   ├── Tokenizer.ts
│   │   ├── Sentence.ts
│   │   ├── SentenceDataset.ts
│   │   └── SentenceEncoder.ts
│   │
│   ├── Vocabulary/
│   │   ├── Vocabulary.ts
│   │   └── VocabularyEntry.ts
│   │
│   ├── Embeddings/
│   │   ├── EmbeddingTable.ts
│   │   └── WordSimilarity.ts
│   │
│   └── Language/
│       ├── CorpusBuilder.ts
│       ├── ContextWindow.ts
│       ├── ContextRepresentation.ts
│       ├── CoOccurrenceModel.ts
│       ├── PPMIModel.ts
│       ├── SentenceRepresentation.ts
│       ├── SentenceSimilarity.ts
│       ├── SemanticSentenceRepresentation.ts
│       ├── SemanticSentenceSimilarity.ts
│       └── SemanticExperiment.ts
│
├── data/
│   └── corpus.ts
│
├── tests/
│
├── docs/
│   └── architecture/
│       └── adr/
│
├── .github/
│   └── workflows/
│
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── README.md
└── LICENSE

The architecture deliberately separates:

Mathematics
Text
Vocabulary
Embeddings
Language

Each layer represents a real conceptual boundary in the problem.

Design Principles

First principles over black boxes

Core NLP mechanisms are implemented directly rather than hidden behind a framework.

Mathematics remains visible

Vectors, cosine similarity, co-occurrence, PMI and aggregation are explicit in the code.

Data and representation are separate

Vocabulary, sentences, embeddings and semantic models have different responsibilities.

Experiments matter as much as implementation

A model is not considered successful merely because it compiles or passes unit tests.

The project also asks:

What representation does it produce?
What relationships does it discover?
Where does it fail?

Scope is intentional

The repository stops when it has answered its core question rather than accumulating unrelated AI features.

Technology

TypeScript
Node.js
pnpm
Vitest
Git
GitHub Actions

The project is a command-line application.

No React, UI framework, or web application is required.

Constraints

The implementation intentionally avoids ready-made NLP and language-modeling frameworks such as:

Hugging Face
TensorFlow
PyTorch
Transformers.js

The project uses its own mathematical and language-representation code instead.

The objective is not to compete with these frameworks.

The objective is to understand what kinds of computation they make possible.

Verification

The project uses automated tests throughout the implementation.

The tests cover:

vector mathematics

vocabulary behavior

tokenization

sentence representation

dataset construction

embedding lookup

cosine similarity

context windows

context representations

co-occurrence statistics

PPMI

semantic sentence representations

semantic similarity

semantic experiments

Build and test locally with:

pnpm install
pnpm run build
pnpm test
pnpm start

Development Philosophy

The repository follows a progressive implementation strategy:

Question
   ↓
Mathematical Primitive
   ↓
Small Component
   ↓
Automated Test
   ↓
Experiment
   ↓
Observed Result
   ↓
Next Concept

The implementation is therefore intentionally incremental.

Every major concept is introduced only after the previous layer can be inspected and tested.

Relationship to Deep Learning

HowAIUnderstandsLanguage is intentionally complementary to another project:

HowDeepLearningWorks
        │
        │ How does a neural network learn?
        ▼
HowAIUnderstandsLanguage
        │
        │ How can language become numerical meaning?
        ▼
Future AI explorations

The projects are not unrelated demonstrations.

Together they form a single technical direction:

Mathematics
      ↓
Learning
      ↓
Representation
      ↓
Language

Current Status

First-principles NLP exploration — complete for the intended scope.

The repository has demonstrated:

✓ Tokenization from scratch
✓ Vocabulary construction
✓ Token IDs
✓ Vector mathematics
✓ Word vector representation
✓ Context windows
✓ Co-occurrence representations
✓ PPMI representations
✓ Word similarity
✓ Sentence representation
✓ Sentence similarity
✓ Experimental comparison of representations
✓ Automated verification

The project is intentionally frozen at this scope.

Future mechanisms such as attention and Transformers should be explored in separate repositories rather than expanding this project beyond its original purpose.

The Main Takeaway

A machine does not begin by "knowing" what a sentence means.

A useful way to understand the process is:

symbols
   ↓
numbers
   ↓
vectors
   ↓
relationships
   ↓
context
   ↓
representations
   ↓
prediction / comparison

HowAIUnderstandsLanguage makes that transition explicit.

It does not claim that a small statistical model has achieved human-level language understanding.

Instead, it demonstrates the foundation on which increasingly sophisticated language models are built:

Human language becomes useful to a machine when it can be represented mathematically.

License

MIT