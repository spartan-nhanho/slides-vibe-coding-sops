# The Legacy Rescue

A quote calculator carried over from a service nobody maintains. It is
undocumented, badly named, and wrong in ways the existing tests do not catch.

## Run it

```bash
node --test
```

Node 20 or newer. No dependencies, no install, no build step.

All four tests pass. That is the problem.

## Your job

| | Task | Time |
|---|---|---|
| 1 | Use AI to explain what the code does. **Write down your own hypothesis about the bug first.** | 10 min |
| 2 | Refactor toward clean code with AI assistance. Small steps, run the tests between steps. | 15 min |
| 3 | Generate unit tests for the refactored code. | 10 min |
| 4 | Manual: run them, then find **at least two edge cases the AI missed** and add them yourself. | 10 min |

Read [`SPEC.md`](SPEC.md) before you start. It is the requirement; the code is
merely what shipped.

## Rules

- Any model or tool you like.
- You may not commit a fix you cannot explain out loud.
- Every commit is authored by you. No AI co-author trailers.
- Keep a note of every time the model was **confidently wrong**. That is the
  debrief material.

## A hint you will want later

The existing tests were written by running the code and writing down what came
out. Tests derived from an implementation cannot disagree with it — which is why
they are all green and the function is still wrong.
