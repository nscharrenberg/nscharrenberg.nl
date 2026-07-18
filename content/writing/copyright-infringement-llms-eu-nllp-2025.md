---
title: 'Copyright infringement by LLMs in the EU: a literature review'
description: 'A summary of our NLLP 2025 paper on how large language models run into EU copyright law, and what to do about it.'
date: '2026-07-18'
tags: [legal-ai, copyright, llm, nllp]
---

Chang Sun and I spent a good part of last year reading through the growing pile of research on
large language models and copyright, trying to figure out where the field actually stands and
where the open problems are. The result is
["Copyright Infringement by Large Language Models in the EU: Misalignment, Safeguards, and the Path Forward"](https://aclanthology.org/2025.nllp-1.9/),
published at the [Natural Legal Language Processing workshop (NLLP 2025)](https://aclanthology.org/venues/nllp/)
in Suzhou. It's a literature review, not an experiment, and it ended up being the groundwork for
[PSALM](/projects), the empirical follow-up I built afterward.

## The core problem

Large language models are trained on enormous amounts of text, a meaningful chunk of which is
copyrighted. Once a model has been trained, it can reproduce fragments of that text, or something
close to it, and under EU copyright law that raises real questions about infringement. The
difficulty is that the legal framework was written with human authors and human copying in mind.
It doesn't map cleanly onto a model that has absorbed a style or a pattern rather than copying a
passage verbatim, and that mismatch is what we mean by misalignment: the gap between what
copyright law was built to catch and what LLMs actually do.

## What we looked at

The paper walks through the technical measures that have been proposed as safeguards, and tries to
be honest about how far each of them actually gets you:

- **Provenance-first data governance** — tracking what a model was trained on well enough to
  answer questions about it later, rather than trying to reconstruct that after the fact.
- **Machine unlearning** — removing the influence of specific training data from an already
  trained model, as a post-hoc fix when provenance tracking wasn't in place from the start.
- **Synthetic data generation** — training on generated data instead of the original copyrighted
  material, which sidesteps some infringement risk but introduces its own questions about how
  faithfully that synthetic data still reflects the source.

None of these are a complete answer on their own, and the paper is fairly direct about that.

## Where we think this needs to go

The more useful part of the paper, at least to me, is the set of concrete gaps it points at:
standardising machine-readable opt-outs so rights holders have an actual mechanism to exclude
their work from training data, disclosure templates so it's clear what a model was trained on,
clearer definitions of some of the core legal terms this all hinges on, and benchmarks that are
actually built with legal experts rather than guessed at by whoever is building the model.

That last point is what led directly to PSALM: if you want a benchmark that legal experts would
recognise as meaningful, you need an evaluation framework grounded in the actual legal doctrine,
not just a similarity score. The full paper, with proper citations and a lot more nuance than fits
here, is on the [NLLP 2025 proceedings page](https://aclanthology.org/2025.nllp-1.9/).
