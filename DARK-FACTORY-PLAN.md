# Kế hoạch bài học — khối Dark Factory (mở rộng)

> Mở rộng phần Frontier thành một khối riêng, dựa trên bài "dark factory" của một platform lead (8 kỹ sư, ~12 microservice, Java và TypeScript) cùng hai nguồn gốc: StrongDM *The Software Factory* [1] và OpenAI *Harness Engineering* [2]. Chữ trên slide tiếng Anh, lời nói tiếng Việt. Người nói: **Nhân** (khối 4).

## Vị trí trong deck và ảnh hưởng

| Hiện tại | Thay bằng |
|---|---|
| Slide 24 Karpathy 2026 | giữ, làm cầu nối vào khối |
| Slide 25 Dark factory (ladder L1–L5, 1.9M rows) | **thay bằng 12 slide D1–D12 bên dưới** |
| Slide 26 Observability | giữ, đặt sau D12 |
| Slide 27 Why the discipline survives | giữ, sửa nhẹ: earned trust nối với ba chỉ số của Phase 3 |
| Slide 28 Close | giữ |

Deck từ 28 lên 39 slide. Khối này khoảng 22–25 phút. Nếu giữ tổng 60 phút giảng thì phải bỏ bài tập và checkpoint (còn 26 slide cũ, cộng 11 slide mới, trừ slide 25 cũ) hoặc xin thêm giờ. Thang tự động đổi theo bài gốc: **Level 1, 2, 3, 3.5, 4** (bỏ L5 của deck cũ), để khớp nguồn.

Ba trụ vẫn là xương sống: AGENTS.md và linter là **Context**; holdout scenarios và bức tường cách ly là **Verification**; human approve rồi mở dần auto-merge theo chỉ số là **Ownership**. Ghi `data-pillar` tương ứng cho từng slide.

Mạch kể: vấn đề (bottleneck chỉ chuyển chỗ) → định nghĩa và thang tự động → điểm xuất phát → bốn phase, mỗi phase tự có giá trị → kiến trúc bốn lớp và bức tường → rủi ro → nghề thay đổi và việc làm ngay chiều nay.

---

## D1 · Divider · The Dark Factory

- **On slide:** `06` · THE DARK FACTORY · **When no human writes, reviews, or tests the code** · *Humans write specs and acceptance criteria. The system does the rest.*
- **Layout:** divider, nền nhà máy line-art mờ (icon factory).
- **Say:** Slide trước để lại câu hỏi: điểm cuối của thang tự động là gì. Phần này đi vào chi tiết một thiết kế thật, của một platform team tám người, đã đi từ "AI viết, người review" lên "spec vào, code đã test đi ra". Không phải để bảo mọi người làm ngay, mà để thấy khi bỏ người ra khỏi vòng lặp, kỷ luật kiểm chứng phải được xây lại từ đầu như thế nào.

## D2 · The bottleneck didn't disappear. It moved down the hall.

- **On slide:** Eyebrow `THE PROBLEM NOBODY TALKS ABOUT` · Headline **We automated the typing. Only the typing.** · Bảng:

  | Activity | Time | Honest assessment |
  |---|---|---|
  | Waiting for human review | 2–8 h | rubber stamp |
  | Review back-and-forth | 30–90 min | style nitpicks |
  | Manual testing on localhost | 30–60 min | rarely done well |
  | Investigating prod bugs | 30 min–2 h | fix was five lines |
  | Writing boilerplate | hours | zero value |

- **Layout:** bảng năm dòng, cột thời gian đếm lên; caption: *Level 2 autonomy already: AI writes most code, AI reviews PRs, agents fix Dependabot alerts. Tracked two weeks. Still this.*
- **Pillar:** none (framing).
- **Say:** Đội này đã ở Level 2: AI viết phần lớn code, bot review PR, agent tự sửa cảnh báo Dependabot. Nghe rất đẹp trên slide. Rồi tác giả ngồi đo hai tuần xem thời gian đi đâu. Chờ review của người hai đến tám tiếng, mà phần lớn là đóng dấu. Cãi nhau về tên biến. Test tay trên localhost, hiếm khi làm tử tế. Điều tra bug production hai tiếng để sửa năm dòng. Kết luận của ông ấy: chúng ta ăn mừng quá sớm. Đã tự động hoá việc gõ, và chỉ việc gõ. Nút thắt không biến mất, nó dọn nhà xuống cuối hành lang. Đây chính là slide ba của buổi hôm nay nhìn từ bên trong một đội thật. Hai bài viết cùng tuần thay đổi cách ông ấy nghĩ: StrongDM với "software factory", ba kỹ sư, không dòng code nào do người viết hay review; và OpenAI với "harness engineering", một triệu dòng code không viết tay, trong một phần mười thời gian. Cả hai báo cáo tốc độ gấp ba đến mười lần, kéo dài nhiều tháng, trên sản phẩm thật.
- **Source:** bài gốc §1; StrongDM [1]; OpenAI [2].

## D3 · What "dark factory" means, and the autonomy ladder

- **On slide:** Eyebrow `VOCABULARY` · Headline **Lights off. Robots run the floor. Humans write the spec.** · Thang năm nấc:

  | Level | What it looks like |
  |---|---|
  | 1 | AI finishes your sentences. You do everything else. |
  | 2 | AI writes whole functions or files. You review every change. |
  | 3 | AI generates code from specs. Holdout scenarios gate quality. You approve the merge. |
  | 3.5 | Same, except some services auto-merge without you. |
  | 4 | Full dark factory. Specs in, tested code out, merged. Your pipeline deploys it. |

  Caption: *Most teams: Level 2. The hard design problems live between 2 and 3.*
- **Layout:** thang bậc (rung) như slide 25 cũ, nhưng năm nấc 1 / 2 / 3 / 3.5 / 4; nấc 2 có nhãn "you are here"; nấc 4 viền đỏ. Giữ hiệu ứng đèn tắt dần.
- **Pillar:** none.
- **Say:** Trong sản xuất, dark factory là nhà máy chạy tắt đèn: không ai trên sàn, robot làm hết. Với phần mềm: không người viết code, không người review code, không người test tay. Người viết spec và tiêu chí chấp nhận, thế thôi. Thang tự động mượn từ xe tự lái. Level 1, AI hoàn thành câu cho bạn. Level 2, AI viết cả hàm hay cả file, bạn review từng thay đổi; hầu hết team đang ở đây. Level 3, AI sinh code từ spec, holdout scenarios gác chất lượng, bạn duyệt merge. Level 3.5, vài service tự merge không cần bạn. Level 4, dark factory đầy đủ. Khoảng cách từ 2 lên 3 là nơi mọi bài toán thiết kế khó nằm, và là nơi phần còn lại của khối này dành thời gian.
- **Source:** §2.

## D4 · Where you start matters

- **On slide:** Eyebrow `PREREQUISITES` · Headline **Zero to dark factory is a different problem than "team that already trusts agents" to dark factory** · Năm ô có icon: PR review bot (every PR, shared prompt) · Security auto-fix (Dependabot → agent → full test suite → PR) · Renovate every 6 h · Real CI/CD (containers, IaC) · Decent-ish tests (JUnit 5, pytest, Playwright) · Ô thứ sáu nổi bật: **Team buy-in. They'd seen agents do useful work.**
- **Layout:** lưới 3×2 card, card cuối viền teal.
- **Pillar:** context.
- **Say:** Tác giả rất thẳng về điểm xuất phát, vì nó quyết định mọi thứ. Đội đã có bot review PR chạy trên mọi repo, đủ đúng để người ta thật sự đọc comment của nó, và đó là một tiêu chuẩn cao hơn nghe có vẻ. Có agent tự sửa cảnh báo bảo mật trên một service: alert bật lên, agent sinh fix, chạy trọn build và test, pass thì PR xuất hiện; không ai còn nhắc đến nó nữa, lời khen cao nhất cho hạ tầng. Renovate cập nhật dependency mỗi sáu tiếng. CI/CD thật, container, IaC. Test coverage tạm ổn, JUnit 5, pytest, Playwright. Và thứ quan trọng nhất không phải kỹ thuật: cả đội đã tin. Họ đã thấy agent làm việc hữu ích một mình, họ không sợ nó. Mảnh văn hoá này chịu lực ngang với mọi mảnh kỹ thuật. Nếu team bạn chưa ở đây, đừng nhảy sang phase 2; làm phase 1 trước.
- **Source:** §3.

## D5 · Four phases, each worth doing on its own

- **On slide:** Eyebrow `THE DESIGN` · Headline **If you stop after Phase 1, you're still better off** · Pipeline bốn bước: **Phase 1 · Better context** (AGENTS.md, build-before-push, linters that talk to agents) → **Phase 2 · Spec-driven + holdout scenarios** (the core) → **Phase 3 · Remove the human gate** (metrics, one service at a time) → **Phase 4 · Full dark factory** (config, not architecture) · Caption: *Nothing downstream of merge changes. Your deploy pipeline is untouched.*
- **Layout:** pipeline bốn ga như slide 12, mỗi ga có nhãn "pays for itself".
- **Pillar:** none.
- **Say:** Tác giả không tin đề xuất nào chỉ có lãi khi xây xong toàn bộ, vì đó là cách ta ở tháng thứ mười tám với hai bàn tay trắng. Nên thiết kế chia bốn phase, mỗi phase tự có giá trị. Phase 1 cho agent context tốt hơn, không đụng workflow ai. Phase 2 là phần cốt lõi: spec vào, code đã kiểm chứng ra, người vẫn duyệt. Phase 3 bắt đầu bỏ cổng người, từng service một, theo chỉ số. Phase 4 là cấu hình, không phải kiến trúc. Và một điều cần nhớ suốt: toàn bộ thiết kế này không đụng đến pipeline deploy. Nó thay người gõ code và người nheo mắt đọc diff. Mọi thứ sau merge y nguyên như bạn đang có.
- **Source:** §4.

## D6 · Phase 1: give the agents better context

- **On slide:** Eyebrow `PHASE 1 · CONTEXT` · Ba card:
  - `AGENTS.md · progressive disclosure` — ~100 lines. A table of contents, not an encyclopedia: what the service does, architecture, key patterns, directory map. `docs/` holds the deep dives. Agent reads the map, drills in when needed.
  - `BUILD BEFORE PUSH` — agent runs build + full test suite locally before pushing. Fix it there, not in CI ping-pong.
  - `LINTERS THAT TALK TO AGENTS` — encode architectural rules as lint checks. Write the error as an instruction: ✗ "Service layer depends on controller layer." ✓ "Service class imports from controller package. Move the shared type to the model package."
  - Khối code nhỏ: đoạn AGENTS.md rút gọn (What this service does / Architecture / Key patterns / Directory map).
  - Caption: *Written on a Thursday afternoon. Obvious difference by Friday morning. Compounds forever.*
- **Layout:** ba card + một khối `pre` bên phải; trong card 3 dùng before/after box đỏ và xanh.
- **Pillar:** context.
- **Say:** Lợi ích lớn nhất không liên quan gì đến tự động hoá; nó chỉ là cho AI thông tin tốt hơn. Đây chính là Concept "project context files" của Hào ở slide 11, nhưng có số liệu thật. Một, AGENTS.md cho mỗi repo, khoảng một trăm dòng, là mục lục chứ không phải bách khoa: service làm gì, kiến trúc, pattern chính, bản đồ thư mục; chi tiết nằm trong thư mục docs. Ý tưởng từ paper OpenAI gọi là progressive disclosure: agent đọc bản đồ, cần auth thì đào vào docs/auth.md. Bạn không ném wiki năm trăm trang cho người mới sáng đầu tiên. Tác giả viết file đầu tiên chiều thứ năm; sáng thứ sáu, chất lượng PR do agent sinh trên repo đó khác rõ rệt, không tinh tế, mà rõ rệt. Và lợi ích cộng dồn mãi. Hai, build trước khi push: agent chạy build và toàn bộ test ở local, hỏng thì sửa tại chỗ, hết cảnh mở PR chỉ để xem CI đỏ. Ba, linter nói chuyện được với agent: quy tắc kiến trúc mã hoá thành lint check thay vì trang wiki, và mẹo quyết định là viết thông báo lỗi như một chỉ dẫn. "Service phụ thuộc controller" thì agent loay hoay. "Service import từ package controller; service không được phụ thuộc controller; chuyển type dùng chung sang package model" thì agent sửa đúng ngay lần đầu gần như mọi lần. Đây là nội dung mà bất kỳ ai trong phòng cũng làm được chiều nay.
- **Source:** §4.1; OpenAI [2].

## D7 · Phase 2: the spec is the input

- **On slide:** Eyebrow `PHASE 2 · SPEC-DRIVEN` · Headline **Engineer writes a spec. The system produces merge-ready code.** · Hai khối code cạnh nhau:
  - Feature spec: frontmatter `target_repo / target_branch / type: feature`, Goal, Requirements, Constraints (follow existing patterns · full test coverage · no new dependencies).
  - Bug spec: `type: bug-fix`, **Symptom**, **Expected**, và dòng đậm: *Do not assume the root cause. Investigate the codebase.*
  - Caption: *A bug spec describes the symptom and nothing else. Not "the null check is missing on line 47."*
- **Layout:** before/after hai khối mono; dòng "Do not assume the root cause" sáng teal ở bước cuối.
- **Pillar:** context.
- **Say:** Phase 2 là phần thật, mọi thứ khác chỉ là giàn giáo. Đầu vào là một file markdown có frontmatter YAML: repo đích, branch đích, loại. Hai loại. Feature spec nói cần build gì: goal, requirements, constraints. Bug spec chỉ mô tả triệu chứng, và sự khác biệt này quan trọng hơn vẻ ngoài của nó. Bug spec không nói "tôi nghĩ thiếu null check ở dòng 47". Nó nói "endpoint trả 500 khi supplier null, phải trả 400 với lỗi validation nhắc đến supplier", rồi một dòng: đừng giả định nguyên nhân, hãy điều tra codebase. Agent tự đi tìm vì sao. Nối về slide 12: đây là Plan trước Code, nhưng bây giờ spec là đầu vào duy nhất của máy, nên chất lượng spec quyết định tất cả.
- **Source:** §4.2.

## D8 · Holdout scenarios: the wall

- **On slide:** Eyebrow `PHASE 2 · THE PART EVERYONE SKIPS` · Headline **The coding agent never sees the acceptance tests.** · Sơ đồ ba khối: **Spec** → **Coding agent** → PR ‖ bức tường ‖ **Holdout scenarios** (plain-English BDD, in a directory the agent can't read) → **LLM evaluator** (plans API calls → runs them on an ephemeral deployment → judges: satisfied?) · Bên phải một scenario mẫu:

  ```
  # SQL Injection Detection
  POST /api/v1/sql/validate with
    sql: "SELECT * FROM users; DROP TABLE users; --"
  Then valid should be false.
  Errors should mention disallowed statement types.
  ```
  Caption: *Each scenario runs 3×, 2 of 3 must pass. 90% of scenarios must pass. On retry the agent gets one line: "SQL Injection Detection failed: endpoint returned 500." Never the scenario text.*
- **Layout:** hình toàn khung: hai cột, ở giữa một bức tường dọc (rect dày, nhãn "train / test split"); mũi tên từ evaluator về agent chỉ mang một dòng chữ.
- **Pillar:** verify.
- **Say:** Nếu chỉ nhớ một slide của khối này, là slide này. Holdout scenarios là test chấp nhận viết bằng tiếng Anh thường, dạng BDD. Chúng nằm trong thư mục mà coding agent không có quyền đọc. Agent build implementation chỉ từ spec. Rồi một hệ thống hoàn toàn tách biệt, một evaluator chạy bằng LLM, lấy các scenario đó chạy trên thứ agent vừa sinh. Ba bước: evaluator đọc scenario, dùng LLM lên kế hoạch các API call để kiểm hành vi mô tả; thực thi trên một deployment tạm; rồi hỏi LLM: các response có thoả scenario không. Ví dụ trên slide: gửi SQL có DROP TABLE vào endpoint validate, valid phải là false, lỗi phải nhắc statement không được phép. Mỗi scenario chạy ba lần, hai trên ba phải pass, để làm mượt tính không xác định của LLM khi chấm. Cổng tổng: chín mươi phần trăm scenario phải pass. Và điểm phải nhấn mạnh: agent không bao giờ thấy scenario. Nếu fail và được thử lại, nó nhận đúng một dòng, "SQL Injection Detection failed: endpoint returned 500", không phải nội dung scenario. Nó không thể gian lận test. Đây là train/test separation trong machine learning. Bạn không cho model xem dữ liệu đánh giá, nếu cho thì nó overfit. Spec là tập train, scenario là tập test, bức tường giữa hai bên là thứ làm cổng chất lượng có nghĩa. Nối về bài học lớn của buổi: test sinh từ cùng nguồn với code thì không phải kiểm chứng. Holdout scenarios là cách mã hoá bài học đó thành kiến trúc.
- **Source:** §4.2, §5.

## D9 · The machinery: orchestrator, ephemeral environments, no glue code

- **On slide:** Eyebrow `PHASE 2 · PLUMBING` · Ba card:
  - `ORCHESTRATOR` — a Python script behind a GitHub Action. Push a spec → clone target repo → hand spec to the agent → build + tests → open PR. On failure, append the error to the prompt, retry on the same branch. **The agent is one line in a config file. Don't marry a vendor.**
  - `EPHEMERAL ENVIRONMENTS` — each PR deploys as a container revision on existing dev/staging infra. Inherits network, identity, secrets. Five stages: build image → deploy revision → run evaluator → decide → tear down.
  - `WHY THIS KILLS BDD'S BIGGEST PROBLEM` — Cucumber teams drown in step-definition glue. LLM-evaluated scenarios have none: the evaluator figures out how to exercise each scenario every time. You maintain English text. Nothing else.
- **Layout:** ba card, card 3 màu xanh.
- **Pillar:** verify.
- **Say:** Phần máy móc rất ít. Orchestrator là một script Python chạy bởi GitHub Action: kỹ sư push file spec, action clone repo đích, đưa spec cho coding agent, đợi code, chạy build và test, mở PR. Agent fail thì orchestrator nối lỗi vào prompt và thử lại trên cùng branch. Coding agent nằm sau một lớp trừu tượng: đổi nhà cung cấp là một dòng trong file config, đừng cưới bất kỳ AI vendor nào. Scenario cần chỗ để chạy: mỗi PR deploy như một revision container trên hạ tầng dev, staging có sẵn, thừa hưởng network, identity, secret; không có hạ tầng mới. Và một ý tác giả cho là mô hình test tốt hơn cả khi bỏ chuyện AI sang một bên: ông đã ở ba team dùng Cucumber, cả ba đều chết chìm trong bảo trì step definition, đổi format API là bốn mươi step definition nổ. Scenario do LLM chấm không có step definition. Evaluator tự tìm cách chạy scenario mỗi lần; API đổi hình thì evaluator thích nghi. Bạn chỉ bảo trì văn bản tiếng Anh.
- **Source:** §4.2.

## D10 · Humans still approve, then earn the right to step back

- **On slide:** Eyebrow `PHASE 2 → PHASE 3` · Trái: **Phase 2: review results, not code.** "Did the scenarios pass? What's the satisfaction rate?" Five minutes, not two hours. · Phải: **Phase 3: swap "label for review" → "merge", one service at a time, only when:**

  | Metric (last 20 PRs) | Threshold |
  |---|---|
  | Scenario pass rate | > 90% |
  | False positives (scenarios said yes, code was broken) | < 5% |
  | Human override rate (human rejected what scenarios passed) | < 10% |

  Caption: *Any team member can still block before the merge window closes. Weekly maintenance agents sweep drift, stale docs, outdated patterns: garbage collection for the codebase.*
- **Layout:** hai cột; bảng ba dòng bên phải, mỗi dòng có chip ngưỡng; dưới cùng một dòng "GC agents" có icon broom.
- **Pillar:** ownership.
- **Say:** Phase 2 không phải auto-merge. Hệ thống sinh code, chấm theo scenario, và xuất một báo cáo mức thoả mãn. Người nhìn báo cáo, có thể liếc diff, rồi bấm merge. Nhưng để ý cái đã đổi: người không còn đọc code từng dòng, người review kết quả. Scenario pass chưa, tỷ lệ bao nhiêu. Việc năm phút thay vì hai tiếng, một tải nhận thức hoàn toàn khác. Sau đủ nhiều PR mà người chỉ đóng dấu, và tác giả cá là chuyện này đến nhanh hơn bạn đoán, bạn tháo bánh phụ. Không phải mọi nơi cùng lúc: chọn một hai service có scenario coverage tốt, và ba điều phải đúng trên hai mươi PR gần nhất: tỷ lệ scenario pass trên chín mươi phần trăm; tỷ lệ dương tính giả, tức scenario bảo ổn mà code hỏng, dưới năm; tỷ lệ người override, tức người từ chối thứ scenario đã pass, dưới mười. Thay đổi cấu hình thật sự là một dòng: đổi "gắn nhãn chờ review" thành "merge". Ai trong team vẫn chặn được trước khi cửa sổ merge đóng. Phase này còn thêm agent bảo trì hằng tuần: quét code drift, docs cũ, pattern lỗi thời, mở PR dọn dẹp nhỏ đi qua cùng cổng scenario. Không có nó, code do AI sinh tích luỹ những bất nhất nhỏ, trôi dần về bừa bộn. Đây chính là earned trust ở slide sau: quyền mở dần theo bằng chứng, không phải theo tuyên bố.
- **Source:** §4.2, §4.3.

## D11 · Phase 4 and the four-layer architecture

- **On slide:** Eyebrow `PHASE 4 · ARCHITECTURE` · Bốn lớp xếp dọc:

  | Layer | Owner | What's in it |
  |---|---|---|
  | Inputs | Humans | specs · holdout scenarios · AGENTS.md · linter rules |
  | Code generation | Autonomous | agent reads spec + repo knowledge → generates, builds, tests, self-reviews, opens PR |
  | Validation | Autonomous, **isolated** | standard CI, then scenario evaluator on an ephemeral deployment |
  | Merge & deploy | Autonomous + your existing infra | auto-merge, then the pipeline you already have |

  Caption: *Phase 4 is configuration: auto-merge everywhere the numbers are strong, tickets tagged `bot:fix` become specs, dashboards, and digital twins for flaky or costly external dependencies. Without the wall between layers 2 and 3 you don't have a quality gate. You have theater.*
- **Layout:** bốn hàng ngang xếp chồng như tầng, một bức tường dày giữa hàng 2 và 3, nhãn "the wall"; hàng 4 nối sang icon pipeline "unchanged".
- **Pillar:** verify + ownership.
- **Say:** Đến Phase 4 thì phần khó đã xong; đây là cấu hình, không phải kiến trúc. Mở auto-merge cho mọi service có số liệu tốt. Nối issue tracker: ticket gắn nhãn bot fix tự sinh spec và chảy qua pipeline. Dashboard. Mảnh hạ tầng mới duy nhất là digital twin: mock server cho các dependency bên ngoài gây flaky hoặc tốn tiền khi chấm scenario, xây khi cần, bắt đầu từ dịch vụ nào đang gây phiền nhất. Kiến trúc có bốn lớp, và ranh giới quan trọng hơn ruột của từng lớp. Lớp đầu vào thuộc về người: spec, scenario, AGENTS.md, lint rule. Lớp sinh code tự động. Lớp kiểm chứng tự động và cách ly. Lớp merge và deploy dùng chính hạ tầng sẵn có. Điều tác giả nhấn mạnh nhất: lớp sinh code và lớp kiểm chứng phải cách ly hoàn toàn. Agent không thấy scenario, evaluator không biết và không quan tâm code được tạo ra sao. Bức tường đó là cả cuộc chơi. Không có nó, bạn không có cổng chất lượng, bạn có sân khấu kịch.
- **Source:** §4.4, §5.

## D12 · What could go wrong

- **On slide:** Eyebrow `RISKS` · Năm dòng, mỗi dòng rủi ro đỏ và giảm nhẹ xanh:
  - **The evaluator approves bad code.** → 3 runs, 2/3; 90% gate; human audit of the first 50 auto-merged PRs; full CI/CD still runs after merge.
  - **People don't want to stop writing code.** → phase 1 asks nothing; by phase 2 they've seen results; manage it actively.
  - **The coding agent isn't good enough yet.** → it's one config line; swap it in sixty seconds.
  - **Retry costs blow up.** → hard cap 3 attempts per spec; token alerts. StrongDM: ~$1,000/day per engineer-equivalent [1].
  - **Scenarios go stale.** → no glue code; evaluator adapts; weekly drift sweeps.
  - Callout đỏ giữ từ deck cũ: *An agent with the wrong write access wiped 1.9 million production rows. You still own the incident.*
- **Layout:** năm hàng hai cột (✗ / ✓), callout đỏ ở dưới với `.shake`.
- **Pillar:** ownership.
- **Say:** Tác giả không tin đề xuất nào bỏ qua phần này, tôi cũng vậy. Rủi ro lớn nhất: evaluator duyệt code hỏng, vì LLM chấm response theo kỳ vọng tiếng Anh là xác suất. Giảm nhẹ: chạy ba lần lấy hai, cổng chín mươi phần trăm, người audit năm mươi PR auto-merge đầu tiên, và toàn bộ CI/CD cũ vẫn chạy sau merge; thứ gì lọt qua tất cả thì tác giả nói ông vừa ấn tượng vừa sợ. Rủi ro thứ hai là con người: developer gắn danh tính với việc viết code, "việc của bạn giờ là viết spec" nghe không dễ chịu; cách tiếp cận theo phase giúp, nhưng phải quản chủ động. Thứ ba, agent chưa đủ giỏi: nó là một dòng config, đổi trong sáu mươi giây, đừng gắn bó. Thứ tư, chi phí retry: chặn cứng ba lần thử mỗi spec, cảnh báo token; StrongDM báo khoảng một nghìn đô một ngày cho mỗi kỹ sư tương đương, vẫn rẻ hơn lương nhiều. Thứ năm, scenario lỗi thời: ít hơn bạn nghĩ, vì không có glue code để mục, evaluator thích nghi, và agent bảo trì quét mỗi tuần. Và callout cuối là sự cố đã nhắc: một agent với quyền ghi sai xoá một phẩy chín triệu dòng production. Dù tự động đến đâu, người cấp quyền vẫn sở hữu sự cố. Đó là lý do slide tiếp theo nói về observability trước khi nói về niềm tin.
- **Source:** §6; StrongDM [1]; sự cố 1.9M theo MindStudio / HackerNoon (deck cũ).

## D13 · The job changes. Start this afternoon.

- **On slide:** Eyebrow `WHAT IT MEANS` · Trái: **Writing code used to be the floor of the job. Now you decide what to build and how to know it's right. That's the ceiling.** · *Eight people. The sustained output of twenty-five or thirty. Not more hours: the bottleneck is gone.* · Phải, bốn bước có mốc thời gian:
  1. **This afternoon** — write AGENTS.md for your most active repo. ~100 lines. Notice the difference within a day.
  2. **This week** — pick one service. Write five holdout scenarios in plain English. Build a janky evaluator: one LLM call that plans HTTP requests and judges responses. Run it by hand. See how often its judgment matches yours.
  3. **Do not auto-merge yet** — not until 20–30 PRs show the gate and your judgment agree. Earn the trust. Don't declare it.
  4. **Talk to your team** — "we automate the boring parts so you do more of the interesting parts" is true only if you mean it. Don't pile on specs-per-sprint.
- **Layout:** trái quote lớn, phải checklist bốn dòng có mốc mono.
- **Pillar:** all.
- **Say:** Điều tác giả cứ quay lại là nghề đổi hình thế nào. Viết code từng là sàn của việc làm kỹ sư. Trong mô hình này bạn không còn ở sàn; bạn quyết định build gì và làm sao biết nó đúng, đó là trần. Gần với product engineering hơn thứ đa số chúng ta được đào tạo. Điều đó làm bạn hứng hay sợ nói lên phần nào của công việc bạn thấy đáng nhất. Với tám người, phép tính rất thuyết phục: output bền vững của hai mươi lăm đến ba mươi kỹ sư, không phải vì làm nhiều giờ hơn, mà vì nút thắt biến mất. Và lời khuyên cụ thể, theo thứ tự. Chiều nay: viết AGENTS.md cho repo bận nhất, một trăm dòng, thấy khác trong một ngày. Tuần này: chọn một service, viết năm holdout scenario bằng tiếng Anh thường, dựng một evaluator tạm bợ, một lời gọi LLM lên kế hoạch vài HTTP request và chấm response, chạy tay trên localhost, xem LLM chấm trùng với bạn bao nhiêu lần; tiết lộ trước: nhiều đến ngạc nhiên. Chưa auto-merge, cho đến khi có hai ba chục PR chứng minh cổng và phán đoán của bạn gần như luôn trùng. Kiếm được niềm tin, đừng tuyên bố nó. Và nói chuyện với team: "tự động phần chán để bạn làm nhiều phần hay hơn" chỉ đúng nếu bạn thật sự làm vậy; tự động hoá việc code rồi chất thêm spec mỗi sprint là tạo ra một cối xay khác. Toàn bộ khối này nối về ba trụ đầu buổi: AGENTS.md là Context, holdout là Verification, earned trust là Ownership. Cùng kỷ luật, mã hoá vào máy.
- **Source:** §7, §8, §9.

---

## Sau D13

Slide 26 Observability và 27 Why the discipline survives giữ nguyên, nhưng slide 27 nên đổi thanh earned trust thành ba chỉ số của D10 (pass rate, false positive, override) để hai slide nói cùng một ngôn ngữ. Slide 28 đóng.

## Việc phải làm nếu duyệt

1. Thêm 13 slide D1–D13 vào `index.html` thay slide 25, dùng lại component có sẵn (bảng, card, before/after, pipeline, ladder, callout); hai hình mới: bức tường train/test (D8) và bốn tầng kiến trúc (D11).
2. Đổi ladder từ L1–L5 sang 1 / 2 / 3 / 3.5 / 4 ở D3 và mọi chỗ nhắc "L5".
3. Cập nhật `SCRIPT.md` và `SCRIPT-READ.md` phần khối 4, `SLIDE-PLAN.md` addendum, bảng nhịp bấm phím.
4. Quyết định thời lượng: bỏ bài tập và checkpoint để giữ 60 phút, hoặc giữ tất cả và xin 85 phút.

## Nguồn

- Bài gốc (platform lead, 8 kỹ sư): các mục 1–9 như trích.
- [1] StrongDM, *The Software Factory*, 2026, qua simonwillison.net/2026/Feb/7/software-factory/
- [2] OpenAI, *Harness Engineering*, 2026, openai.com/index/harness-engineering/
