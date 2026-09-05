# Vibe Coding SOPs

Lecture 9 of the Backend Engineering syllabus: standard operating procedures for
shipping code you didn't entirely write.

This repo is the deck **and** the workshop exercise. No dependencies, no build
step, no install.

```
index.html          the deck — open it in a browser
assets/             deck styles + runtime (vanilla CSS/JS)
legacy-rescue/      the workshop exercise
  SPEC.md           the requirement — the source of truth
  README.md         student instructions
  INSTRUCTOR.md     spoilers, do not hand out
  src/billing.js    the code that shipped
  test/             the tests that shipped, all green, all inadequate
```

## Presenting

Open `index.html` in any browser, or serve it:

```bash
python3 -m http.server 8000    # → http://localhost:8000
```

| Key | |
|---|---|
| `→` `↓` `space` `j` | next slide |
| `←` `↑` `k` | previous slide |
| `home` / `end` | first / last |
| `o` | overview grid — click any slide to jump |
| `n` | speaker notes |
| `t` | light / dark |
| `f` | fullscreen |
| `?` | key map |

Slides are deep-linkable: `index.html#17` opens slide 17.

**Export to PDF:** print the page (`⌘P`), destination *Save as PDF*, landscape,
background graphics on. Each slide becomes one page and the speaker notes are
omitted.

## Running the workshop

Point students at [`legacy-rescue/README.md`](legacy-rescue/README.md). It runs
on Node 20+ with nothing installed:

```bash
cd legacy-rescue && node --test
```

Four tests pass. Four bugs are seeded. The gap between those two sentences is
the lecture.

Instructor answers are in [`legacy-rescue/INSTRUCTOR.md`](legacy-rescue/INSTRUCTOR.md).

## The SOPs

The five checklists from section 9.4, in one place for reference after the talk.

### SOP-1 — Verifying AI-generated code before you commit

1. Read every changed line. If you can't explain a line, it doesn't go in.
2. Verify every external API, config key, and library method against real docs or the actual dependency source — model memory is not a source.
3. Check the imports: no invented packages, no version the lockfile doesn't have.
4. Run the build and the full test suite locally, not just the new test.
5. Diff-read for silently dropped behaviour — auth checks, null handling, error branches, logging.
6. Check for hardcoded values, credentials, and leftover placeholder text.
7. Strip AI authorship trailers before pushing. You are the author.
8. Re-read the diff once more as if a stranger wrote it. Because one did.

### SOP-2 — Setting up a new service

1. Scaffold from the canonical templates. Never copy a live service to seed a new one.
2. Confirm which environment-selection model the infra uses before touching Terraform.
3. Put values where they belong: shared config vs. per-env vars vs. secrets.
4. Wire CI/CD and observability before the first real endpoint.
5. Open a draft PR early so the pipeline runs against a real branch.

### SOP-3 — Database migrations

1. Migrations are forward-only and immutable once merged. Never edit an applied migration.
2. Expand → migrate → contract for anything destructive; never drop a column in the same release that stops writing it.
3. Review the generated SQL by hand — types, nullability, defaults, index coverage.
4. Estimate lock impact on the production row count, not on your local ten rows.
5. Run it against a realistic dataset before it reaches staging.
6. Write the rollback plan down before you apply.

### SOP-4 — API endpoint creation

1. Contract first — define the schema, then generate.
2. Never hand-edit generated sources; change the spec and regenerate.
3. Validate input at the boundary. Authorize on every endpoint, not just the obvious ones.
4. Decide the error contract explicitly: status codes, error body shape, what leaks.
5. Pagination and limits from the start — an unbounded list endpoint is a future outage.
6. Test the happy path, auth failure, validation failure, and empty result.

### SOP-5 — Integration testing

1. Real dependencies in containers over mocks wherever practical.
2. Each test owns its data and cleans up. No ordering dependencies.
3. Tag integration tests separately so unit runs stay fast in CI.
4. Assert on observable behaviour, not internal calls.
5. A flaky test is a failing test — fix it or delete it, never retry it away.

## Editing the deck

Slides are plain `<section class="slide">` elements in `index.html`, in order.
Add one anywhere and it appears; nothing is numbered by hand. `data-section`
drives the label in the bottom bar. A `.notes` block inside a slide is the
speaker note for it.
