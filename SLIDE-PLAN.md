# Slide Build Plan — Vibe Coding SOPs (English deck)

> A detailed, slide-by-slide blueprint for building the presentation deck. Based on the approved 25-slide design. **All on-slide text is English.** Speaker notes ("Say") are in Vietnamese for delivery.
>
> This file is a spec, not the deck. Build the slides in `index.html` (reveal.js) or any tool, following each slide's **On slide / Layout / Say / Source** block. Does not touch `SCRIPT.md` (Hao's script) or the existing `index.html`.

---

## How to use this

Each slide has four fields:
- **On slide** — the exact English content to render (headline, bullets, table, quote, stats). Keep it terse: one idea per slide, ≤ ~6 words per bullet where possible. The slide is a skeleton; the talk carries the detail.
- **Layout** — the visual treatment (quote, stat tiles, 2-col cards, pipeline, table, code).
- **Say** — lời dẫn tiếng Việt, nói bằng giọng của bạn, không đọc slide.
- **Source** — dẫn chứng để trả lời khi bị hỏi.

**Through-line (một câu cả buổi phục vụ):**
> *AI makes typing cheap. Understanding, reviewing, and being right stay expensive. SOPs are the process for the expensive part.*

Three pillars, repeated at every section: **Context · Verification · Ownership.**

Total: **25 slides**, ~55–60 min + 45 min exercise + 15 min debrief.

---

## Design system (build every slide to this so they read as one deck)

**Palette (dark, "engineering console"):**
| Role | Hex | Use |
|---|---|---|
| Ink (bg) | `#0B0F14` | slide background |
| Surface | `#161F29` | cards |
| Text | `#E7EEF4` | body |
| Muted | `#93A2B0` | secondary text |
| Accent (teal) | `#3FC7D4` | eyebrows, key highlights, progress |
| Warn (amber) | `#E6A24B` | caution slides (performance, medium) |
| Critical (red) | `#F0555B` | security / ReDoS / hard |
| Good (green) | `#57C08A` | "verified / safe" |

Accent is used **sparingly** (labels + one highlight per slide). Amber/red are for risk slides only — they are semantic, not decoration.

**Type:** display = **Archivo** (700/800) for headlines; body = **IBM Plex Sans**; mono = **IBM Plex Mono** for eyebrows, labels, code, data. All support the characters you need. Big projection-friendly sizes; headline ~ 6–9% of slide height.

**Layout rules:** one idea per slide; tables/code scroll inside their own box (never let the slide scroll sideways); tabular numbers for stats; give the correct answer / key line a color, everything else quiet.

**reveal.js mapping:** each *Slide N* = one `<section>`. Section dividers get a distinct look (big number + rail). Multi-part reveals use `<span class="fragment">`. Speaker notes go in `<aside class="notes">`.

```html
<!-- template -->
<section data-sec="7.2 Review">
  <p class="eyebrow">Section 7.2</p>
  <h2>Headline here</h2>
  <ul><li>point</li></ul>
  <aside class="notes">lời dẫn tiếng Việt…</aside>
</section>
```

---

# The 25 slides

## Part 0 — Framing

### Slide 1 · [Opening] — Title
- **On slide:**
  - Eyebrow: `BACKEND ENGINEERING · LECTURE 09`
  - Title: **Vibe Coding SOPs**
  - Tagline: *Standard operating procedures for shipping code you didn't entirely write.*
  - Byline: Nhan Ho × Hao Pham
  - `60 min lecture · 45 min exercise · 15 min debrief`
- **Layout:** hero. Big title, tagline in italic muted, byline in mono.
- **Say:** Chào lớp, bài 9. Xin một lần giơ tay: tuần này ai đã ship code AI sinh ra? Giữ tay. Trong số đó, ai đọc *từng dòng* trước khi merge? Khoảng cách giữa hai lần giơ tay là nội dung hôm nay.
- **Source:** —

### Slide 2 · [Opening] — Mindset shift
- **On slide:**
  - Eyebrow: `MINDSET SHIFT`
  - Pull quote: **"AI doesn't replace you — it forces you up a level."**
  - Sub: From *code typist* → *code reviewer*. AI is a very fast junior dev who never tires — but sometimes fabricates, occasionally breaks everything.
- **Layout:** quote slide (oversized quotation mark, big display quote).
- **Say:** Khi dùng AI nghiêm túc, vai trò bạn dịch từ "người gõ code" sang "Tech Lead review code của một Junior Dev". Không hứa "10× faster" — bạn sẽ gõ ít hơn, không phải ship nhiều hơn.
- **Source:** Willison — *Not all AI-assisted programming is vibe coding* / *Vibe engineering*.

### Slide 3 · [Opening] — Why SOPs (the stakes)
- **On slide:**
  - Eyebrow: `WHY THIS MATTERS`
  - Headline: **Speed is what AI gives for free. Quality isn't.**
  - Three stat tiles:
    - `45%` — of AI-generated code fails the OWASP Top 10 benchmark *(Veracode, 2025)*
    - `~41%` — rise in bug rate after adopting AI without process *(Uplevel, ~800 devs)*
    - `29%` — of devs actually trust AI output (though 92% use it daily) *(Stack Overflow / GitHub, 2025)*
- **Layout:** 3 stat tiles (big numbers), red / amber / teal.
- **Say:** Ba con số đóng khung vì sao cần SOP. Dùng nhiều, tin ít, bug tăng — khoảng cách đó chính là chỗ SOP sống.
- **Source:** Veracode GenAI report; Uplevel; GitHub Octoverse / Stack Overflow 2025.

### Slide 4 · [Opening] — The three pillars
- **On slide:**
  - Eyebrow: `THE FRAME`
  - Headline: **Every SOP answers one of three questions**
  - 3 cards:
    - `01 / CONTEXT` — **Context.** AI is only as good as what you feed it. Context is finite — manage it like RAM.
    - `02 / VERIFY` — **Verification.** If you can't verify it, don't ship it. Tests, builds, screenshots — evidence, not promises.
    - `03 / OWNERSHIP` — **Ownership.** You own every committed line, including the ones AI wrote. AI holds the pen, not the decision.
- **Layout:** 3 equal cards.
- **Say:** Cả buổi quay về ba trụ này. Nhắc lại chúng ở mỗi phần.
- **Source:** —

## Part 1 — Why AI gets it wrong

### Slide 5 · [Divider 01] — Foundations
- **On slide:** `01` · Eyebrow `FOUNDATIONS` · **Why AI gets it wrong** · Sub: *Understand how an LLM works and every later SOP has a reason — instead of being dogma.*
- **Layout:** section divider (big stroked number + rail).
- **Say:** Phần khoa học ngắn để mọi SOP sau có gốc.

### Slide 6 · [Foundations] — LLM fundamentals
- **On slide:**
  - Eyebrow: `THE MODEL`
  - Headline: **Hallucination is a property, not a bug**
  - Bullets:
    - **Next-token prediction.** It optimizes for *plausible*, not *correct*. No internal truth-check.
    - **The context window is finite — and rots as it fills.** Performance drops as it fills: the model forgets early instructions, makes more mistakes.
    - **Consequence.** Feed it a 10,000-line file → it forgets the start and fabricates. Fix: **break the problem down before you prompt.**
- **Layout:** 3-point list. Highlight "break the problem down" in accent.
- **Say:** Không có bộ kiểm-sự-thật bên trong. Context là tài nguyên hữu hạn — quản như RAM. Đây là lý do nền cho toàn bộ 7.1.
- **Source:** Karpathy *Intro to LLMs*; Anthropic *Effective Context Engineering*; IBM Research on context windows.

## Part 2 — 7.1 AI-Assisted Workflow

### Slide 7 · [Divider 02] — 7.1 Workflow
- **On slide:** `02` · `SECTION 7.1` · **AI-Assisted Workflow** · Sub: *Prompt → Context → Iterate → Workflow for big tasks. The heart of the talk.*
- **Layout:** divider.

### Slide 8 · [7.1] — Effective prompts
- **On slide:**
  - Eyebrow: `WRITING EFFECTIVE PROMPTS`
  - Headline: **More specific = fewer corrections**
  - Before / after (two boxes):
    - ✗ Vague: `add tests for foo.py`
    - ✓ With context + criteria: `write a test for foo.py covering the edge case where the user is logged out. avoid mocks.`
  - Caption: *Show examples, not descriptions · long docs first · include success criteria · name the technique (few-shot, chain-of-thought).*
- **Layout:** before/after (red box vs green box, mono).
- **Say:** Prompt tồi không phải vì viết dở tiếng Anh — mà vì bạn giấu context mà chỉ bạn biết.
- **Source:** Anthropic *Claude Code Best Practices*; promptingguide.ai.

### Slide 9 · [7.1] — Worked example: optimizing a Postgres query
- **On slide:**
  - Eyebrow: `EXAMPLE · POSTGRES`
  - Headline: **Don't ask "write me the SQL"**
  - Two cards:
    - `BAD PROMPT` — "Write SQL to get orders by user." → nothing for it to optimize.
    - `GOOD PROMPT` — **Schema + existing indexes + row counts + `EXPLAIN ANALYZE` of the current query + the goal.** It sees what the DB sees.
  - Caption: A bad prompt hides the context only you have.
- **Layout:** 2 cards (bad = neutral, good = green).
- **Say:** Đây cũng là đáp án checkpoint Medium. Kiểm chứng với planner, không với model.
- **Source:** PostgreSQL docs — *Using EXPLAIN*.

### Slide 10 · [7.1] — Context management
- **On slide:**
  - Eyebrow: `CONTEXT MANAGEMENT`
  - Headline: **A long chat is not a badge of honor**
  - Two cards:
    - `4 TECHNIQUES` — **Compaction** (summarize history) · **note-taking** (external memory: todo.md) · **sub-agents** (delegate file reading, get summaries back) · **just-in-time** retrieval.
    - `IN PRACTICE` — `/clear` between unrelated tasks. Corrected the AI twice on the same thing and still wrong? Context is dirty — clear and rewrite a better prompt.
  - Caption: Clean context + a good prompt almost always beats a long dragging chat.
- **Layout:** 2 cards.
- **Say:** Lịch sử hội thoại là đòn bẩy mạnh nhất và cũng dễ làm hỏng nhất.
- **Source:** Anthropic *Effective Context Engineering*; *Claude Code Best Practices* (failure patterns).

### Slide 11 · [7.1] — Spec-driven workflow for big tasks
- **On slide:**
  - Eyebrow: `ITERATIVE REFINEMENT & BIG TASKS`
  - Headline: **Big task? Make the AI interview you first**
  - Pipeline (4 steps): **Explore** (read, understand — no edits) → **Plan** (produce spec.md, you approve) → **Code** (small steps, a test each) → **Commit** (checkpoint often).
  - Caption: *"Ask me one question at a time so we can develop a thorough spec…"* — Harper Reed. Core: give the AI **a check it can run** (test / build / screenshot).
- **Layout:** 4-step pipeline with arrows.
- **Say:** Task nhỏ: prompt thẳng. Task lớn: bắt AI phỏng vấn bạn để ra spec, rồi mới code. Không có test, agent có thể *báo* xong mà chưa từng chạy thật.
- **Source:** Anthropic *Claude Code Best Practices*; Harper Reed *My LLM codegen workflow*.

## Part 3 — 7.2 Code Review

### Slide 12 · [Divider 03] — 7.2 Review
- **On slide:** `03` · `SECTION 7.2` · **Code Review Process** · Sub: *Four axes only you can sign off: Correct · Secure · Fast enough · Meaningful tests.*
- **Layout:** divider.

### Slide 13 · [7.2] — The test rule (quote)
- **On slide:**
  - Eyebrow: `THE ONE NON-NEGOTIABLE`
  - Quote: **"You have to test what it writes."**
  - Attribution: *"If you haven't seen it run, it's not a working system." — Simon Willison.* Make the AI show evidence: test output, the command it ran, a screenshot — not "done".
- **Layout:** quote slide.
- **Say:** AI mắc lỗi "deeply inhuman" — bịa thư viện, bịa method, tự tin cả khi sai. Con người dễ bỏ qua vì code *trông* hợp lý.
- **Source:** Willison *How I use LLMs to write code*.

### Slide 14 · [7.2 · Security] — Slopsquatting
- **On slide:**
  - Eyebrow (red): `SECURITY · SLOPSQUATTING`
  - Headline: **When hallucination becomes a supply-chain attack**
  - 3 stat/points:
    - `19.7%` of packages LLMs recommend don't exist (576k samples, 16 models)
    - `58%` of hallucinated names repeat across runs → predictable targets
    - The attacker registers the fake name first, with malware attached
  - Caption: SOP — verify the package exists & is reputable before install · `npm audit` in CI.
- **Layout:** stat tiles or bullet list, red accent.
- **Say:** AI bịa tên package, kẻ xấu đăng ký sẵn kèm mã độc, bạn cài là dính. Biến "hallucination check" từ lời khuyên thành SOP bắt buộc.
- **Source:** Socket — *The Rise of Slopsquatting*.

### Slide 15 · [7.2 · Security] — OWASP mapping
- **On slide:**
  - Eyebrow (amber): `WHAT AI GENERATES → OWASP TOP 10`
  - Table:
    | Flaw AI tends to introduce | OWASP | Severity |
    |---|---|---|
    | Missing auth middleware · IDOR | A01 Broken Access Control | High |
    | Hardcoded key · weak hash · `Math.random()` tokens | A02 Cryptographic Failures | High |
    | String-built SQL · XSS | A03 Injection | High |
    | Trusting client for price/role | A04 Insecure Design | Med |
    | Open CORS · public bucket · debug routes | A05 Security Misconfiguration | Med |
  - Caption: SOP — put SAST (Semgrep OWASP ruleset, gitleaks) in the pipeline as a mechanical net.
- **Layout:** styled table with severity chips.
- **Say:** Khung security có gốc thay vì tự nghĩ. Máy móc bắt cái mắt người bỏ khi vội.
- **Source:** OWASP Top 10; vibe-eval *OWASP Top 10 for AI code*.

### Slide 16 · [7.2 · Perf & Test] — Two places AI is "green but wrong"
- **On slide:**
  - Eyebrow: `PERFORMANCE & TESTING`
  - Two cards:
    - `PERFORMANCE` (amber) — The four smells: **N+1 queries · missing index · unbounded `findAll()` · accidental O(n²)**. All pass every unit test. All fine on ten rows.
    - `BAD TESTS` (red) — High coverage ≠ safe. Mock overuse · asserting *current* behavior instead of *correct* → a green test just freezes the bug.
  - Caption: SOP — a human writes at least one edge-case test the AI missed, and always runs it to see it actually pass.
- **Layout:** 2 cards.
- **Say:** Performance không có bài đọc — dùng ví dụ thật từ codebase. Test dởm: xoá business rule mà test vẫn pass → đó không phải test.
- **Source:** HackerNoon *Limits of LLM-Generated Unit Tests*; arXiv empirical study.

## Part 4 — 7.3 Documentation

### Slide 17 · [Divider 04] — 7.3 Docs
- **On slide:** `04` · `SECTION 7.3` · **Documentation** · Sub: *Give AI the pen — not the decision.*
- **Layout:** divider.

### Slide 18 · [7.3] — Docs, Diátaxis, ADR
- **On slide:**
  - Eyebrow: `DOCS · API · ADR`
  - Headline: **AI drafts; a human reviews and decides**
  - 3 cards:
    - `DOCS FROM CODE` — Generate docs *from* real code (safe). Warning: AI docs "sound right but are technically wrong" exactly where it's complex — where docs matter most.
    - `API · DIÁTAXIS` — Four types for four needs: **tutorial · how-to · reference · explanation.** AI writes any fast; *which type for whom* is your call.
    - `ADR` — Title / Status / Context / Decision / Consequences. An ADR is *a decision with its expiry conditions*. **AI may draft it, never decide it** — it fabricates rationale the team never discussed.
- **Layout:** 3 cards.
- **Say:** Cho AI cầm bút, đừng cho AI cầm quyền quyết. Docs và ADR là nơi ranh giới đó rõ nhất.
- **Source:** KnowledgeHut *AI for code documentation*; Diátaxis (diataxis.fr); adr.github.io + Nygard template.

## Part 5 — 7.4 SOPs & Exercise

### Slide 19 · [Divider 05] — 7.4 SOPs
- **On slide:** `05` · `SECTION 7.4` · **SOPs for common tasks** · Sub: *One SOP frame, filled per task.*
- **Layout:** divider.
- **Say:** Phần này phụ thuộc stack của team — trình bày dạng khung SOP rồi mời khán giả điền. (Khung 4 bước: nạp context chuẩn → cho AI cách tự kiểm → verify rủi ro đặc thù → người ký tên. Migration checklist: nhỏ/tăng dần · versioned · có rollback · chạy tự động mọi môi trường · breaking change dùng parallel change.)
- **Source:** Fowler *Evolutionary Database Design*.

### Slide 20 · [Exercise] — The Legacy Rescue
> Uses the real exercise already in this repo: `legacy-rescue/`. See `legacy-rescue/SPEC.md` (requirement) and `legacy-rescue/INSTRUCTOR.md` (answers — do not show).
- **On slide:**
  - Eyebrow (amber): `PRACTICAL EXERCISE · THE LEGACY RESCUE`
  - Headline: **One function. Undocumented, badly named, wrong in ways the tests don't catch.**
  - Setup: `git clone … && cd legacy-rescue && node --test` — Node 20+, no deps. You get `src/billing.js` (a quote calculator) and a **passing** test file. *The passing tests are part of the problem.* Read `SPEC.md` first.
  - 4 tasks: **1)** AI explains the code — *write your own hypothesis first.* **2)** Refactor toward clean code, small steps, tests between. **3)** Generate unit tests. **4)** *Manual:* run them, then find at least two edge cases the AI missed.
- **Layout:** 2-pane (tasks left, setup/command right). Use a mono code block for the command.
- **Say:** Test đang pass là một phần của vấn đề. Spec là yêu cầu; code chỉ là thứ đã ship. Có 4 bug gieo sẵn — đa số tìm ra 2. Đừng nói số bug đến debrief.
- **Source:** `legacy-rescue/` in this repo.
- **The four seeded bugs (instructor only — see INSTRUCTOR.md):** 1) tier boundary uses `>` not `>=` (exactly 100/500/1000 fall to lower tier); 2) free shipping uses pre-discount subtotal; 3) **mutates the caller's order** (calling `calc` twice gives different answers — the real-incident bug nobody finds by reading); 4) tax charged on shipping. Discussion point: money as floats — no test fails today, which is why the rule is "integer cents", not "round carefully". Bug 3 is invisible unless someone writes a test that calls `calc` twice — which generated tests never do, because they're written from the implementation. → This is the punchline for the Hard checkpoint.

### Slide 21 · [Checkpoints] — Three questions
- **On slide:**
  - Eyebrow: `CHECKPOINT QUESTIONS`
  - 3 cards:
    - `EASY` — **Copy-pasting straight from an LLM into prod — what's the danger?**
    - `MEDIUM` — **How do you structure a prompt for a Postgres-optimized SQL query?**
    - `HARD` (red) — **AI generated an email regex. It looks correct. Your SOP to verify it's safe against ReDoS?**
  - Caption: ReDoS — a bad regex → catastrophic backtracking → one crafted request pins a CPU. "Looks right" ≠ "safe".
- **Layout:** 3 cards (hard = red). Full answers in appendix below — put them in speaker notes, don't print them.
- **Say / answers:** see **Appendix A**.
- **Source:** see appendix.

## Part 6 — Frontier & Close

### Slide 22 · [Frontier] — What's next, 2026
- **On slide:**
  - Eyebrow: `WHAT'S NEXT · 2026`
  - Headline: **Even Karpathy retired "vibe coding"**
  - Body: He moved to **Agentic Engineering** (Mar 2026): the dev is a supervisor orchestrating autonomous agents — oversight gets *tighter*. The person who coined the term upgraded it.
  - Caption: If autonomy keeps rising, what's the endpoint? → **the dark factory.**
- **Layout:** headline + short lede + bridging caption.
- **Say:** Người khai sinh thuật ngữ cũng đã nâng cấp nó. Bắc cầu sang Dark Factory.
- **Source:** Karpathy — *Agentic Engineering* (2026).

### Slide 23 · [Frontier] — The Dark Factory
- **On slide:**
  - Eyebrow (red): `THE FRONTIER · DARK FACTORY`
  - Headline: **The end of the ladder: a codebase that ships itself**
  - Autonomy ladder (5 steps): **L1 Assisted** → **L2 +Review** → **L3 +Auto gates** → **L4 Escalate-only** → **L5 Dark factory** (no human in the loop, last step in red).
  - One card / callout: **Real risk** — an agent with the wrong write access **wiped 1.9 million production rows.** You still own the incident.
  - *(Definition line: a "dark factory" = a plant that runs with the lights off, nobody there. For code: write · test · review · ship, autonomously — agents that adapt and judge like a dev, but never stop to ask.)*
- **Layout:** 5-step ladder (compact — you may drop the per-step descriptions to fit) + one red risk callout. **Keep it light — this is the deck's densest stretch; trim to the ladder + the wipe.**
- **Say:** Điểm cuối logic của nấc thang agentic. Mở bằng: "phần này để biết chân trời, không cần nhớ chi tiết — chỉ cần một điều ở slide sau." ĐỪNG để lớp hiểu nhầm "hết cần review" — slide sau hoá giải ngay.
- **Source:** MindStudio *What is a Dark Factory*; HackerNoon *The Dark Factory Pattern*.

### Slide 24 · [Frontier] — Why the discipline survives  ⚠ load-bearing, never rush
- **On slide:**
  - Eyebrow: `WHY THE DISCIPLINE SURVIVES`
  - Headline: **Full autonomy doesn't remove humans — it changes their shape**
  - 2 cards:
    - `EARNED TRUST` (green) — You don't hand over production on day one: **read-only → write-to-branch → staging → production**, expanding access by proven reliability. Limit each agent's blast radius.
    - `DEEPSEEK HARNESS` — Open-source agent harness, "everything is a plugin" (even the agent loop). **Append-only, inspectable session log**: every prompt, tool call, context, token — auditable even when the agent runs itself.
  - Caption: **Today's SOP = the manual version of the same discipline.** This is your Verification + Ownership pillars, encoded into guardrails + audit trails. Discipline scales — it doesn't vanish.
- **Layout:** 2 cards + strong caption. Make the caption the emotional peak.
- **Say:** ⚠️ Cú lật quan trọng nhất của cái kết. Framing bắt buộc: nói *"review đổi hình"*, KHÔNG nói *"hết cần review"*. Nối thẳng về 3 trụ đầu buổi. KHÔNG được lướt slide này.
- **Source:** MindStudio (progressive autonomy, guardrails); DeepSeek Harness (GitHub `deepseek-ai/deepseek-harness`) + The New Stack.

### Slide 25 · [Close] — Closing
- **On slide:**
  - Eyebrow: `CLOSE`
  - Headline: **You are the one who signs.**
  - Closing line (mono/terminal style): *"Speed is what AI gives for free. Quality is what you keep — and SOPs are how you keep it without slowing down."*
  - (Optional final line, ties to the exercise): *If you can't explain the line, it doesn't go in.*
- **Layout:** hero / closing. Quiet, decelerated after slide 24.
- **Say:** Một câu để nhớ. Cảm ơn lớp.
- **Source:** —

---

# Appendix A — Checkpoint answers (speaker notes, don't print)

**Easy — danger of copy-pasting from an LLM into production.**
Not "it might be wrong" (all code might). The specific danger: it's **plausible**, so it survives the skim that only catches obviously-broken code — and later nobody has a mental model to debug it. Also: OWASP flaws (hardcoded secrets, SQLi), privacy leaks (the Samsung incident), and you still own it.

**Medium — prompt for a Postgres-optimized query.**
Give it the DDL, existing indexes, row counts, Postgres version, and the current `EXPLAIN ANALYZE`. Ask it to state the plan it expects. Then run real `EXPLAIN`. Verified against the planner, not the model.

**Hard — SOP to verify an AI regex is ReDoS-safe.**
Read the regex for **nested quantifiers** `(a+)+` and **overlapping alternation** `(.|\s)*` — the shapes that cause catastrophic backtracking. Test with **adversarial input** (a long ambiguous prefix + one char that forces a fail, e.g. `"a"×40 + "!"`); measure time — it must not blow up super-linearly. Use a **linear engine (RE2)** · set a **timeout** · **cap input length**. Then challenge the premise: validating email by regex is the wrong tool — check for `@`, cap length, send a confirmation email. One crafted request is enough to pin a CPU. "Looks right" ≠ "safe".

---

# Appendix B — Sources (master list)

- Willison — *Not all AI-assisted programming is vibe coding*, *Vibe engineering*, *How I use LLMs to write code*
- Anthropic — *Claude Code Best Practices*, *Effective Context Engineering for AI Agents*
- Harper Reed — *My LLM codegen workflow atm*
- promptingguide.ai — techniques; PostgreSQL docs — *Using EXPLAIN*
- Socket — *The Rise of Slopsquatting*; OWASP Top 10; vibe-eval — *OWASP Top 10 for AI code*; Veracode — *GenAI Code Security Report*
- HackerNoon — *Limits of LLM-Generated Unit Tests*; arXiv — unit-test generation study
- KnowledgeHut — *AI for code documentation*; Diátaxis (diataxis.fr); adr.github.io + Nygard ADR template
- Martin Fowler — *Evolutionary Database Design*
- Karpathy — *Intro to LLMs*, *Agentic Engineering* (2026)
- MindStudio — *What is a Dark Factory*; HackerNoon — *The Dark Factory Pattern*; DeepSeek Harness (`deepseek-ai/deepseek-harness`) + The New Stack

---

# Appendix C — Build checklist

- [ ] One `<section>` per slide; dividers get the big-number + rail treatment.
- [ ] English on every slide; keep bullets ≤ ~6 words.
- [ ] Stat tiles for slides 3 & 14; tables for 15; before/after for 8; pipeline for 11 & 23; 2-col cards for 4, 9, 10, 16, 18, 24; quotes for 2 & 13.
- [ ] Trim slide 23 to the ladder + the 1.9M-row wipe (drop per-step descriptions if cramped).
- [ ] Slide 24 is load-bearing — build it to land; put the "don't rush / don't say 'no more review'" note in its `<aside class="notes">`.
- [ ] Checkpoint answers (Appendix A) go in speaker notes only, never on the slide.
- [ ] Wire the exercise slide (20) to the real `legacy-rescue/` commands.
- [ ] Dark theme, projection-safe sizes, test on the actual projector aspect ratio.

*Plan for the Vibe Coding SOPs deck — English slides, 25-slide approved design. For build in `slides-vibe-coding-sops`. Sep 2026.*
