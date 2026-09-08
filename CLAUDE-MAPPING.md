# Slide nào, Claude làm gì bên dưới — bản đối chiếu kèm ví dụ

> Mục đích: khi trình bày một khái niệm trên slide, có ngay một ví dụ thật từ Claude Code (CLI) hoặc nền tảng Claude để chỉ vào. Mỗi mục ghi: khái niệm trên slide → cơ chế của Claude → cách nó chạy bên dưới → ví dụ dùng được. Những chỗ ghi *(kiểm lại doc)* là tính năng có thật nhưng tên cờ hoặc tên key nên tra `code.claude.com/docs` trước khi chiếu.

Ba trụ của deck ứng với ba lớp của Claude Code: **Context** = CLAUDE.md, context window và compaction; **Verification** = tool loop chạy test thật, hooks, subagent review; **Ownership** = permissions, hooks chặn hành động, session log.

---

## Slide 6 · Hallucination is a property, not a bug

**Trên slide:** model dự đoán token; context hữu hạn và mục dần.

**Claude làm gì:** Claude Code không sửa được bản chất dự đoán token, nhưng xử lý context rot bằng ba cơ chế.

- **Auto-compact.** Khi context gần đầy, Claude Code tự tóm tắt lịch sử phiên thành một bản ngắn rồi tiếp tục với bản đó. Bạn cũng gọi tay bằng `/compact`, có thể kèm gợi ý giữ gì: `/compact giữ lại danh sách bug và quyết định về tiền`.
- **`/clear`** xoá lịch sử, giữ CLAUDE.md. Đây chính là "quy tắc hai lần" ở slide 11.
- **Thanh ngữ cảnh** *(kiểm lại doc)*: Claude Code hiển thị mức dùng context trong phiên, để biết lúc nào nên compact.

**Ví dụ để chỉ:** ngay trong system prompt của Claude Code có câu "khi hội thoại dài, một phần hoặc toàn bộ context được tóm tắt và đưa sang cửa sổ tiếp theo". Tức là thanh RAM trên slide 6 là thứ Claude Code đang quản thật.

---

## Slide 7 · Your agent doesn't know. It reasons, acts, and observes.

**Trên slide:** vòng lặp ReAct: reason → act (gọi tool) → observe (kết quả thật) → lặp.

**Claude làm gì:** Claude Code chính là vòng lặp này.

- **Reason:** phần "thinking" của model. Gõ `think`, `think hard`, `ultrathink` trong prompt để tăng ngân sách suy luận trước khi gọi tool.
- **Act:** bộ tool có sẵn: `Read`, `Edit`, `Write`, `Bash`, `Grep`, `Glob`, `WebFetch`, `WebSearch`, cộng tool từ MCP server. Mỗi lời gọi tool là một bước "act".
- **Observe:** output của tool được nạp ngược vào context nguyên văn: nội dung file, stdout của `node --test`, lỗi compile. Model chỉ "biết" thứ nằm trong output đó.
- **Ngân sách bước:** `claude -p "..." --max-turns 20` giới hạn số vòng khi chạy không tương tác.

**Ví dụ để chỉ:** chạy `claude` rồi bảo "sửa cho test pass" trong `legacy-rescue/`. Nhìn transcript: nó đọc `billing.js`, chạy `node --test`, đọc output fail, sửa, chạy lại. Đó là ba nút trên vòng tròn slide 7. Muốn xem thô: `claude -p "..." --output-format stream-json` in từng sự kiện tool call.

---

## Slide 9 · More specific = fewer corrections

**Trên slide:** prompt cụ thể có phạm vi, ràng buộc, tiêu chí thành công.

**Claude làm gì:**

- **Hỏi lại trước khi làm.** Trong plan mode, Claude Code có tool `AskUserQuestion` để hỏi ngược khi yêu cầu mơ hồ (chọn thư viện nào, hành vi ở edge case nào). Đây là bản "make the AI interview you" ở slide 12 dưới dạng cơ chế.
- **Prompt improver trong Anthropic Console.** Trên console.anthropic.com có công cụ viết lại prompt: thêm cấu trúc, ví dụ few-shot, tiêu chí output. Đây là thứ bạn nhắc "Claude viết lại prompt giúp dev". Nó chạy bằng chính Claude với một meta-prompt về best practice.
- **Slash command tuỳ chỉnh** trong `.claude/commands/*.md`: đóng gói một prompt tốt thành lệnh dùng lại, có tham số `$ARGUMENTS`.

**Ví dụ:** file `.claude/commands/test-edge.md`:

```markdown
Write a test for $ARGUMENTS covering the edge case where the user is logged out.
Do not use mocks. Run the test suite afterwards and paste the output.
```

Gõ `/test-edge foo.py` là có prompt bên phải của slide 9, không phải bên trái.

---

## Slide 10 · Don't ask "write me the SQL"

**Trên slide:** đưa schema, index, số dòng, `EXPLAIN ANALYZE`; kiểm với planner.

**Claude làm gì:** không có tính năng riêng, nhưng vòng lặp tool cho phép Claude **tự lấy context** thay vì bạn dán: bảo nó chạy `psql -c '\d orders'` và `EXPLAIN ANALYZE ...` qua `Bash`, rồi đề xuất index, rồi chạy lại `EXPLAIN ANALYZE` để so. Kiểm chứng với planner xảy ra trong cùng phiên.

**Ví dụ prompt:** "Trước khi đề xuất gì, chạy `\d orders`, `\di orders*` và `EXPLAIN ANALYZE <query>`; sau khi đề xuất index, chạy lại EXPLAIN ANALYZE và so hai kết quả."

---

## Slide 11 · A long chat is not a badge of honor

**Trên slide:** compaction, note-taking, sub-agents, just-in-time retrieval; `/clear`; CLAUDE.md.

**Claude làm gì, từng kỹ thuật một:**

| Kỹ thuật trên slide | Cơ chế Claude Code |
|---|---|
| Compaction | `/compact`, auto-compact khi context đầy |
| Note-taking | CLAUDE.md và memory: gõ `#` đầu dòng để lưu một ghi chú vào CLAUDE.md; `/memory` để sửa. Claude Code cũng có thư mục memory tự động theo project *(kiểm lại doc)* |
| Sub-agents | tool `Agent`: agent phụ có context riêng, đọc nhiều file, chỉ trả về tóm tắt. Loại `Explore` là read-only cho việc tìm kiếm |
| Just-in-time retrieval | `Grep`, `Glob`, `Read` theo yêu cầu; MCP server như Context7 để lấy doc thư viện đúng version thay vì nhớ |
| `/clear` | xoá lịch sử phiên |
| Project context file | `CLAUDE.md` ở gốc repo (commit chung), `CLAUDE.local.md` (cá nhân), `~/.claude/CLAUDE.md` (mọi project); `/init` sinh bản đầu; import file khác bằng `@path/to/file` |

**Ví dụ CLAUDE.md** cho repo này:

```markdown
# CLAUDE.md
## Build
- Deck: open index.html, no build. Exercise: cd legacy-rescue && node --test (must stay 4 pass).
## Rules
- Never edit legacy-rescue/src/billing.js on master; the seeded bugs are the lesson.
- No AI co-author trailers on commits.
```

---

## Slide 12 · Big task? Make the AI interview you first

**Trên slide:** Explore → Plan → Code → Commit; cho AI một check tự chạy.

**Claude làm gì:**

- **Plan mode:** bấm `Shift+Tab` để vào chế độ chỉ đọc; Claude đọc repo, hỏi lại, viết kế hoạch, không sửa file cho đến khi bạn duyệt. Bên dưới là permission mode `plan`: mọi tool ghi đều bị chặn.
- **Explore agent** (read-only) cho bước Explore; **Plan agent** cho bước Plan.
- **Check tự chạy:** Claude chạy test bằng `Bash`. Muốn ép, dùng hook `Stop` chạy test khi Claude định kết thúc lượt; test đỏ thì hook trả exit code 2 kèm thông báo, Claude buộc phải sửa tiếp.
- **Commit thường xuyên:** Claude Code commit bằng `git` qua Bash; có thể dùng worktree riêng (`EnterWorktree`, hoặc `git worktree`) để mỗi task một nhánh cách ly.

**Ví dụ hook Stop** trong `.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{ "type": "command", "command": "cd legacy-rescue && node --test >/dev/null 2>&1 || { echo 'tests failing: keep going' >&2; exit 2; }" }]
    }]
  }
}
```

---

## Slide 13 · Every agent pattern has a failure mode. Every SOP step plugs one.

| Pattern | Trong Claude Code | Chỗ SOP tương ứng |
|---|---|---|
| Planner / Executor | Plan mode làm planner; phiên chính hoặc subagent làm executor. Tool `Workflow` cho phép viết script điều phối nhiều agent theo pha (pipeline, parallel) | duyệt kế hoạch trước; mỗi task nhỏ |
| Multi-agent | `Agent` tool, agent tuỳ chỉnh trong `.claude/agents/*.md` (mỗi agent có system prompt, model, tool riêng); `fork` kế thừa context; `/code-review ultra` chạy review nhiều agent trên cloud | Writer/Reviewer tách phiên |
| Memory-augmented | CLAUDE.md (dài hạn), context phiên (ngắn hạn), repo và lockfile (có cấu trúc) | giữ CLAUDE.md ngắn và đúng |
| Tool-using | permissions `allow`/`deny` theo pattern, hooks `PreToolUse`, sandbox cho Bash | quyền tối thiểu; cài và push qua người |

**Ví dụ agent reviewer** `.claude/agents/reviewer.md`:

```markdown
---
name: reviewer
description: Fresh-context review of the current diff. Read-only.
tools: Read, Grep, Glob, Bash
---
Review `git diff` as if a stranger wrote it. List dropped auth checks, string-built SQL,
hardcoded secrets, and tests that assert calls instead of results. Do not edit files.
```

Agent này không thấy lịch sử phiên viết code, đúng ý "phiên context sạch review lại".

---

## Slide 15 · You have to test what it writes.

**Trên slide:** bắt AI trưng bằng chứng; Writer/Reviewer.

**Claude làm gì:**

- Output của `Bash` (kết quả `node --test`) nằm trong transcript, không phải lời model kể lại. Bạn cuộn lên là thấy.
- `/code-review` là skill có sẵn: review diff theo mức effort, có bước "verify" đối nghịch từng finding. `/security-review` cho bảo mật.
- Hook `PostToolUse` sau mỗi `Edit`/`Write` có thể tự chạy test hoặc lint và trả kết quả cho Claude.

**Ví dụ prompt bắt bằng chứng:** "Sau khi sửa, chạy `node --test` và dán nguyên văn output. Không tóm tắt."

---

## Slide 16 · When hallucination becomes a supply-chain attack

**Trên slide:** kiểm package tồn tại và uy tín; không cho agent tự cài.

**Claude làm gì:**

- **Deny rule** trong settings: chặn `npm install` cho đến khi người duyệt.
- **PreToolUse hook**: chạy `npm view <pkg>` kiểm package có thật và tuổi, lượt tải, trước khi cho lệnh chạy.
- Permission prompt mặc định: mọi lệnh Bash lạ đều hỏi người trước.

**Ví dụ** `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(node --test)", "Bash(git diff *)", "Read"],
    "deny":  ["Bash(npm install *)", "Bash(git push *)", "Bash(rm -rf *)"]
  }
}
```

Với deny rule, Claude phải xin và bạn chạy tay, đúng "installs and pushes go through a human".

---

## Slide 17 · What AI generates → OWASP Top 10

**Trên slide:** SAST trong pipeline làm lưới đỡ.

**Claude làm gì:** hook `PostToolUse` chạy Semgrep hoặc gitleaks sau mỗi lần ghi file; nếu có finding, hook in ra và Claude phải sửa trước khi đi tiếp. `/security-review` quét diff nhánh hiện tại theo OWASP. Trong CI, `claude-code-action` trên GitHub có thể review PR tự động.

**Ví dụ hook:**

```json
{ "hooks": { "PostToolUse": [{ "matcher": "Edit|Write",
  "hooks": [{ "type": "command", "command": "gitleaks protect --staged --no-banner || { echo 'secret detected, remove it' >&2; exit 2; }" }] }] } }
```

---

## Slide 18 · Two places AI is "green but wrong"

**Trên slide:** N+1, thiếu index; test dởm assert lời gọi.

**Claude làm gì:** không tự phát hiện, nhưng có thể được ép: prompt "kèm phân tích độ phức tạp cho mọi hàm xử lý danh sách", và subagent reviewer với chỉ dẫn "flag any test whose only assertion is toHaveBeenCalled". `/simplify` skill dọn code thừa sau khi Claude sinh.

---

## Slide 20 · AI drafts; a human reviews and decides

**Trên slide:** docs từ code; ADR do AI draft, người quyết.

**Claude làm gì:** `/init` là ví dụ điển hình "docs from code": Claude đọc repo rồi viết CLAUDE.md. Với ADR, viết một slash command `/adr` sinh khung Title/Status/Context/Decision/Consequences và **để trống Decision** cho người điền.

---

## Slide 21 · SOPs for common tasks

**Trên slide:** khung bốn bước: nạp context chuẩn, cho AI cách tự kiểm, verify rủi ro riêng, người ký.

**Claude làm gì:** bốn bước ánh xạ thẳng vào bốn thứ trong `.claude/`:

| Bước | Nơi mã hoá |
|---|---|
| Nạp context chuẩn | `CLAUDE.md` + `@import` template, PR mẫu |
| Cho AI cách tự kiểm | hooks `PostToolUse` / `Stop` chạy test, lint |
| Verify rủi ro riêng | skill hoặc slash command theo loại task (`/migration-check`, `/endpoint-check`) |
| Người ký | permission prompt, deny `git push`, review PR |

**Slide 11 concept 2 nói "AI trailer":** Claude Code mặc định thêm `Co-Authored-By: Claude` vào commit. Tắt bằng `"includeCoAuthoredBy": false` trong settings *(kiểm lại tên key)*. Đây là ví dụ rất trực quan cho bước "strip AI trailers".

---

## Slide 22 · Even Karpathy retired "vibe coding"

**Claude làm gì:** hướng "agentic engineering" hiện rõ trong Claude Code: chạy headless `claude -p`, Agent SDK để nhúng vào pipeline, subagent, hooks. Tất cả đều là "người giám sát agent" chứ không phải "chat rồi dán".

---

## Slide 25 · Autonomy levels

| Cấp | Với Claude |
|---|---|
| 1 | Claude trong IDE gợi ý inline, autocomplete |
| 2 | Claude Code tương tác trong terminal, bạn duyệt từng edit (permission prompt mặc định) |
| 3 | `claude -p` chạy trong CI hoặc `claude-code-action` trên GitHub: sinh PR từ issue, test và hook gác; người bấm merge |
| 3.5 | GitHub Action tự merge khi check xanh cho một số repo |
| 4 | Agent SDK điều phối toàn bộ, không người trong vòng lặp |

Permission mode là cái núm vặn giữa các cấp: `default` (hỏi mọi ghi), `acceptEdits` (tự sửa file, vẫn hỏi lệnh nguy hiểm), `plan` (chỉ đọc), `bypassPermissions` (không hỏi, chỉ dùng trong sandbox).

---

## Slide 27 · Phase 1 · Context optimization

**Trên slide:** AGENTS.md luỹ tiến, build-before-push, linter chỉ dẫn hành động.

**Claude làm gì:**

- **AGENTS.md ↔ CLAUDE.md.** Cùng ý tưởng; Claude Code đọc `CLAUDE.md` mọi phiên và `@import` các file docs sâu hơn khi cần. Giữ ngắn vì nó chiếm context.
- **Build-before-push:** hook `PreToolUse` matcher `Bash` kiểm nếu lệnh là `git push` thì chạy test trước; đỏ thì chặn.
- **Linter chỉ dẫn hành động:** hook `PostToolUse` chạy linter; **thông điệp hook in ra stderr với exit 2 được đưa thẳng cho Claude**. Vậy viết thông báo dạng chỉ dẫn ("move the shared type to the model package") là Claude sửa đúng ngay, đúng ý slide.

**Ví dụ hook build-before-push:**

```json
{ "hooks": { "PreToolUse": [{ "matcher": "Bash",
  "hooks": [{ "type": "command", "command": "jq -e '.tool_input.command | test(\"git push\")' >/dev/null && { cd legacy-rescue && node --test >/dev/null 2>&1 || { echo 'run and fix tests before pushing' >&2; exit 2; }; }; exit 0" }] }] } }
```

---

## Slide 28 · Phase 2 · Spec-driven development

**Claude làm gì:** spec Markdown trở thành prompt cho `claude -p`:

```bash
claude -p "$(cat specs/sql-validation.md)" \
  --allowedTools "Read,Edit,Write,Bash(node --test),Bash(git *)" \
  --max-turns 40 --output-format stream-json > run.jsonl
```

Bug spec "đừng giả định nguyên nhân" khớp với cách Claude Code điều tra: nó sẽ `Grep` và chạy test trước khi sửa nếu bạn không gợi ý dòng 47.

---

## Slide 29 · Holdout scenarios, the wall

**Trên slide:** agent không thấy test chấp nhận; evaluator riêng chấm.

**Claude làm gì:** không có sẵn "holdout" nhưng ghép được từ ba mảnh:

1. **Cách ly bằng permissions:** deny `Read(./holdout/**)` cho phiên viết code, hoặc để thư mục holdout ngoài repo mà agent được clone.
2. **Evaluator là một phiên `claude -p` khác** với system prompt "bạn là giám khảo", đọc scenario, gọi API bằng `Bash(curl ...)` lên bản deploy tạm, trả JSON pass/fail. Chạy ba lần, lấy hai.
3. **Worktree hoặc container tạm** cho mỗi PR (`git worktree` hoặc `EnterWorktree`), dỡ sau khi chấm.

**Ví dụ evaluator:**

```bash
claude -p "Read holdout/sql-injection.md. Plan the HTTP calls that test it against $BASE_URL, run them with curl, then answer only {\"pass\": true|false, \"why\": \"...\"}." \
  --allowedTools "Read,Bash(curl *)" --output-format json
```

Bức tường ở đây là: phiên viết code không có quyền đọc `holdout/`, và phiên chấm không có quyền ghi code.

---

## Slide 30 · Review the report, not the code · Phase 3

**Claude làm gì:** kết quả evaluator ghi vào PR như comment qua `claude-code-action` hoặc `gh pr comment`; người đọc báo cáo. Ba chỉ số (pass rate, false positive, override) tính từ log JSONL của các lần chạy. Maintenance agent hằng tuần = một `claude -p` chạy bằng cron hoặc GitHub schedule với prompt "tìm code drift, docs cũ, mở PR nhỏ".

---

## Slide 32 · Four-layer architecture

| Lớp | Thành phần Claude |
|---|---|
| Inputs (người) | spec `.md`, `holdout/`, `CLAUDE.md`, hook và deny rule |
| Code generation | `claude -p` phiên viết, tool Read/Edit/Bash, subagent Explore |
| Validation (cách ly) | CI thường + `claude -p` phiên chấm, quyền khác nhau, worktree riêng |
| Merge & deploy | GitHub Action tự merge khi cả hai xanh; pipeline deploy cũ |

Bức tường = hai phiên `claude -p` với hai bộ `--allowedTools` không giao nhau.

---

## Slide 33 · Risks and mitigations

| Rủi ro | Cơ chế Claude để đỡ |
|---|---|
| Evaluator duyệt nhầm | chạy ba lần với `--output-format json` rồi vote; giữ CI cũ; người audit 50 PR đầu |
| Kỹ sư kháng cự | bắt đầu từ Phase 1 (CLAUDE.md, hooks) không đổi workflow ai |
| Chi phí | `--max-turns`, giới hạn retry trong script điều phối, theo dõi token qua OpenTelemetry |
| Scenario lỗi thời | evaluator là LLM, đọc scenario tiếng Anh, không step definition |

---

## Slide 34 · If you can't observe your agent, you can't trust it

**Trên slide:** logging, tracing, audit trail.

**Claude làm gì:**

- **Session log:** mọi phiên Claude Code được ghi thành JSONL trong `~/.claude/projects/<repo>/`, gồm từng prompt, tool call, tool output. `claude --resume` đọc lại từ đó. Đây là "append-only session log" của slide 35.
- **Stream JSON:** `claude -p ... --output-format stream-json` phát từng sự kiện để đưa vào hệ thống log của bạn.
- **OpenTelemetry:** Claude Code xuất metric và event qua OTEL khi bật `CLAUDE_CODE_ENABLE_TELEMETRY=1` và cấu hình `OTEL_METRICS_EXPORTER`, `OTEL_LOGS_EXPORTER` *(kiểm lại tên biến)*; đúng stack OpenTelemetry + Prometheus + Grafana trên slide.
- **Audit bằng hook:** hook `PreToolUse` ghi mọi tool call kèm timestamp và user vào một file append-only ngoài repo; hook không thể bị Claude sửa vì nằm trong settings.

**Ví dụ hook audit:**

```json
{ "hooks": { "PreToolUse": [{ "hooks": [{ "type": "command",
  "command": "jq -c '{t: now, user: env.USER, tool: .tool_name, input: .tool_input}' >> ~/.claude/audit.jsonl" }] }] } }
```

---

## Slide 35 · Full autonomy doesn't remove humans, it changes their shape

**Trên slide:** earned trust: read-only → branch → staging → production; audit log.

**Claude làm gì:** chính là thang permission mode và allowlist, mở dần:

| Bậc trên slide | Cấu hình Claude Code |
|---|---|
| read-only | permission mode `plan`, hoặc `--allowedTools "Read,Grep,Glob"` |
| write-to-branch | `acceptEdits` + deny `git push`; làm việc trong worktree |
| staging | allow `Bash(gh pr create *)`; deploy staging do CI làm sau khi check xanh |
| production | `bypassPermissions` chỉ trong sandbox có hook audit và deny `rm -rf`, `DROP` |

Sự cố 1,9 triệu dòng trên slide 33 chính là bậc cuối bị mở quá sớm; deny rule và hook là cách không để nó xảy ra.

---

## Tóm tắt một trang

| Trụ | Khái niệm trên slide | Claude Code |
|---|---|---|
| Context | context rot, `/clear`, CLAUDE.md, progressive disclosure | auto-compact, `/compact`, `/clear`, `CLAUDE.md` + `@import`, `/init`, memory `#` |
| Context | prompt cụ thể, hỏi lại | `AskUserQuestion` trong plan mode, slash command, Console prompt improver |
| Verification | check tự chạy, Writer/Reviewer, SAST, holdout | `Bash` chạy test thật, hooks `PostToolUse`/`Stop`, subagent trong `.claude/agents/`, `/code-review`, `/security-review`, `/code-review ultra`, evaluator bằng `claude -p` riêng |
| Ownership | quyền tối thiểu, không cài/push tự do, audit, trailer | `permissions.allow/deny`, permission modes, `PreToolUse` chặn, session JSONL, OpenTelemetry, `includeCoAuthoredBy` |
| Autonomy levels | 1 → 4 | inline → interactive → `claude -p` trong CI → auto-merge → Agent SDK |

Ba slide mà ví dụ Claude "ăn" nhất khi trình bày: **slide 7** (bật `stream-json` và chỉ vào từng tool call), **slide 16** (deny `npm install` rồi bảo Claude cài, nó phải xin), **slide 27** (hook trả thông báo dạng chỉ dẫn và Claude sửa đúng ngay).
