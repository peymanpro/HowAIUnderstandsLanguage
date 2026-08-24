ADR-001: First-Principles NLP Architecture

Status

Accepted

Context

HowAIUnderstandsLanguage is an educational NLP project designed to answer one question:

How does AI turn human language into numerical representations and extract semantic relationships from them?

The project intentionally avoids ready-made NLP and language-modeling frameworks.

The objective is not to build a production NLP framework or a complete language model.

The objective is to expose the underlying progression from symbolic language to mathematical representation.

Decision

The implementation follows this conceptual pipeline:

Raw Text
   ↓
Tokenization
   ↓
Vocabulary
   ↓
Token IDs
   ↓
Vector Representation
   ↓
Context
   ↓
Co-occurrence
   ↓
PPMI
   ↓
Word Representation
   ↓
Sentence Representation
   ↓
Sentence Similarity

The implementation is divided into the following conceptual areas:

Mathematics
Text
Vocabulary
Embeddings
Language

Each area owns a distinct responsibility.

Architectural Boundaries

Mathematics

Provides reusable numerical primitives such as vectors and similarity operations.

Text

Represents raw text, tokens, sentences, datasets, and encoding.

Vocabulary

Maps tokens to stable numeric identifiers and stores basic token statistics.

Embeddings

Provides numerical representations associated with vocabulary items.

Language

Contains contextual and semantic models built from corpus observations.

Context Representation

The initial semantic representation is based on local context.

Words are represented according to the contexts in which they occur.

Two levels are implemented:

Raw co-occurrence counts.

PPMI-weighted co-occurrence representations.

This demonstrates how a representation can become more informative without introducing a neural language model.

Sentence Representation

Sentence representations are constructed by aggregating word-level representations.

Sentence similarity is measured using cosine similarity.

This is intentionally a simplified semantic representation.

It is not treated as a claim of human-level language understanding.

Experimental Verification

The project does not rely solely on unit-test correctness.

It also performs experiments comparing representations.

Raw co-occurrence was observed to produce overly high sentence similarities.

PPMI produced more discriminative values in the demonstrated corpus.

These observations are treated as part of the project's results and limitations.

Scope Boundary

Attention and Transformer architectures are intentionally excluded from this repository.

They represent important but separate mechanisms and are better explored as independent projects.

This repository therefore stops at the point where it has demonstrated the transition:

Language
   ↓
Numerical Representation
   ↓
Context
   ↓
Semantic Relationship

Consequences

The resulting architecture remains:

small

inspectable

mathematically explicit

testable

experimentally verifiable

The project avoids unnecessary framework abstractions and avoids claiming capabilities that the implemented methods do not provide.

The architecture also provides a clear conceptual foundation for future work on more advanced language-modeling mechanisms.