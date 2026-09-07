# Kịch bản nội dung — Lecture 9: Vibe Coding SOPs (Nhan × Hao)

> Kịch bản cho deck 25 slide (`index.html`, dựng theo `SLIDE-PLAN.md`). Mỗi mục là một slide, đúng thứ tự. Mở slide N bằng `index.html#N`. Chữ trên slide tiếng Anh; nội dung nói tiếng Việt.

## Phân vai

Thông điệp xuyên suốt: **AI làm việc gõ code rẻ đi. Hiểu, review, và đúng thì vẫn đắt như cũ. SOP là quy trình cho phần đắt đó.** Ba trụ nhắc ở mỗi phần: **Context · Verification · Ownership.**

| Khối | Slide | Người | Nội dung | Phút |
|---|---|---|---|---|
| 1 | 1–11 | **Hao** | Mở đầu, foundations, 7.1 workflow | 22 |
| 2 | 12–18 | **Nhan** | 7.2 review, security, 7.3 docs | 16 |
| 3 | 19–20 + bài tập + debrief | **Hao** | Khung SOP, Legacy Rescue | 7 + 45 + 15 |
| 4 | 21–25 | **Nhan** | Checkpoints, frontier, close | 15 |

Ba lần trao mic:

1. **Sau slide 11, Hao → Nhan:** "Đó là cách làm việc với AI cho đúng: context, vòng lặp nhỏ, spec trước. Nhưng làm nhanh mà không review được thì vô nghĩa. Phần quan trọng nhất, review và những chỗ AI hỏng âm thầm, Nhan sẽ dẫn."
2. **Sau slide 18, Nhan → Hao:** "Biết cái gì cần bắt rồi: đúng, an toàn, đủ nhanh, test có nghĩa, và AI không được quyết. Câu hỏi là làm sao bắt nó mỗi lần, kể cả lúc 2 giờ sáng. Hao sẽ đưa khung SOP, rồi cho các bạn thử tay trên code thật."
3. **Sau debrief, Hao → Nhan:** "Các bạn vừa thấy tận mắt test xanh mà code sai. Nhan sẽ kiểm tra lại ba câu, rồi nói về chuyện gì xảy ra khi AI không còn dừng lại để hỏi nữa."

Mỗi slide có bốn phần: **Trên slide** (đang hiện gì), **Nội dung** (nói gì, đủ chi tiết để nói mà không cần nhớ thêm), **Nếu bị hỏi**, **Nguồn**.

---

## Khối 1 · HAO — Slide 1–11

### Slide 1 · HAO — Vibe Coding SOPs

**Trên slide:** title, tagline *Standard operating procedures for shipping code you didn't entirely write*, byline Nhan Ho × Hao Pham, 60 min lecture · 45 min exercise · 15 min debrief.

**Nội dung**

Bài 9: Vibe Coding SOPs. "SOP" là standard operating procedure, quy trình vận hành chuẩn: một việc lặp lại, viết thành các bước cố định, để kết quả như nhau bất kể ai làm và làm lúc nào. Chủ đề hôm nay là quy trình để ship những đoạn code mà bạn không hoàn toàn tự viết, tức là code có AI tham gia.

Hai người dẫn. Hao giữ nửa đầu: vì sao AI sai, và cách làm việc với nó cho đúng. Nhan giữ phần review, docs, security, và phần cuối về tương lai của nghề.

Câu hỏi mở: tuần này ai đã ship code do AI sinh ra? Trong số đó, ai đã đọc từng dòng trước khi merge? Khoảng cách giữa hai con số đó là toàn bộ nội dung của buổi. Mọi người đều dùng AI. Rất ít người review đủ. Buổi này là về phần review đó.

Cấu trúc: 60 phút giảng, 45 phút bài tập trên một hàm thật có bug thật, 15 phút debrief.

---

### Slide 2 · HAO — Mindset shift

**Trên slide:** *"AI doesn't replace you — it forces you up a level."* From code typist → code reviewer. AI is a very fast junior dev who never tires, but sometimes fabricates, occasionally breaks everything.

**Nội dung**

AI không thay bạn. Nó ép bạn lên một bậc. Trước đây bạn là người gõ code; giờ bạn là người review code do một thứ khác gõ.

Mô hình tinh thần đúng: AI là một junior developer cực nhanh, không biết mệt, đọc được mọi tài liệu công khai, nhưng thỉnh thoảng bịa (tên hàm, tên thư viện, hành vi của API), và đôi khi phá sạch mọi thứ vì không hiểu hệ quả. Bạn là tech lead của junior đó. Tech lead không gõ thay junior, nhưng chịu trách nhiệm cho mọi thứ junior merge. Cách một tech lead tốt làm việc với junior chính là SOP: giao việc rõ, cho context, yêu cầu bằng chứng, đọc diff, và ký tên.

Điều bài này không hứa: "code nhanh gấp 10". Bạn sẽ gõ ít hơn, đó là thật. Nhưng gõ chưa bao giờ là nút thắt. Nút thắt là hiểu vấn đề, review được thay đổi, và đúng ở edge case. Ba việc đó AI không làm rẻ đi, và mọi thứ sau slide này là quy trình cho ba việc đó.

Phân biệt hai khái niệm để dùng từ chính xác:
- **Vibe coding**, thuật ngữ Karpathy đặt tháng 2/2025: "fully give in to the vibes, forget that the code even exists". Willison định nghĩa sắc hơn: build phần mềm bằng LLM mà **không review** code nó viết. Hợp cho prototype, đồ chơi, script dùng một lần. Sai chỗ cho production.
- **Vibe engineering**, cũng của Willison: dùng AI ở đẳng cấp kỹ sư, có kiểm chứng, có trách nhiệm. Đó là thứ dạy hôm nay.

**Nếu bị hỏi**
- *"Vậy vibe coding có xấu không?"* Không, nó có chỗ dùng: prototype để xem ý tưởng có đáng làm không, đồ vứt đi. Vấn đề là mang thói quen đó vào code có người dùng thật.

**Nguồn:** Willison — *Not all AI-assisted programming is vibe coding*; *Vibe engineering*; Karpathy, tweet 2/2025.

---

### Slide 3 · HAO — Why this matters

**Trên slide:** *Speed is what AI gives for free. Quality isn't.* Ba stat: 45% AI code fails OWASP Top 10 (Veracode 2025) · ~41% rise in bug rate after adopting AI without process (Uplevel, ~800 devs) · 29% of devs trust AI output, though 92% use it daily (Stack Overflow / GitHub 2025).

**Nội dung**

Ba con số đóng khung vì sao cần quy trình.

**45%**: gần một nửa code AI sinh ra không qua được benchmark OWASP Top 10, theo Veracode 2025. Nghĩa là nếu bạn nhận code AI mà không có bước kiểm tra bảo mật, xác suất mang lỗ hổng đã biết vào production là cỡ tung đồng xu.

**~41%**: bug rate tăng chừng đó ở các đội áp dụng AI **mà không có quy trình**, nghiên cứu Uplevel trên khoảng 800 dev. Từ khoá là "không có quy trình": cùng công cụ, kết quả phụ thuộc vào cách dùng.

**29% và 92%**: 92% dev dùng AI coding tool hằng ngày, nhưng chỉ 29% tin output của nó. Đây là con số quan trọng nhất: người ta dùng thứ mình không tin. Khoảng cách giữa "dùng" và "tin" chính là chỗ SOP sống. SOP là cách biến "tôi không tin nó" thành "tôi có bước để kiểm nó".

Tốc độ là thứ AI cho không. Chất lượng thì không.

**Nếu bị hỏi**
- *"41% nghĩa là AI làm tăng bug?"* Số đo đội áp dụng AI mà thiếu quy trình. Kết luận là quy trình quyết định kết quả, không phải AI tốt hay xấu.
- *"Phương pháp của các báo cáo?"* Trả lời thật: đây là số của báo cáo, tên báo cáo trên slide, không kiểm định lại phương pháp. Không nói thêm con số nào ngoài ba số này.

**Nguồn:** Veracode — *GenAI Code Security Report* 2025; Uplevel; GitHub Octoverse / Stack Overflow Developer Survey 2025.

---

### Slide 4 · HAO — The three pillars

**Trên slide:** *Every SOP answers one of three questions.* 01 CONTEXT · 02 VERIFY · 03 OWNERSHIP.

**Nội dung**

Mọi SOP hôm nay trả lời một trong ba câu hỏi.

**Context.** AI chỉ tốt bằng thứ bạn đưa vào. Nó không biết repo của bạn, convention của team, cái test đang fail, hay stack trace thật, trừ khi bạn đưa. Và context là tài nguyên hữu hạn, đầy lên thì chất lượng giảm, nên phải quản như quản RAM: chỉ nạp thứ cần, dọn thứ không cần.

**Verification.** Thứ gì không kiểm chứng được thì không ship. Bằng chứng là test chạy pass, build xanh, screenshot của màn hình thật. Không phải câu "đã xong" của model. Model không có khả năng tự biết mình sai, nên bằng chứng phải đến từ ngoài model.

**Ownership.** Bạn sở hữu từng dòng đã commit, kể cả dòng AI viết. Với reviewer, với production, với người debug lúc 2 giờ sáng, việc AI viết hay không là vô hình. AI cầm bút, không cầm quyền quyết.

Cách dùng ba trụ: khi nghe một quy tắc, hỏi nó thuộc trụ nào. Quy tắc không thuộc trụ nào thường là quy tắc không quan trọng. Ba trụ sẽ quay lại ở slide 24 dưới dạng khác: guardrail và audit trail cho agent.

---

### Slide 5 · HAO — Divider 01 · Foundations

**Trên slide:** 01 · FOUNDATIONS · *Why AI gets it wrong.*

**Nội dung**

Phần một, ngắn: vì sao AI sai. Hiểu LLM vận hành ra sao thì mọi SOP sau đều có lý do, thay vì là giáo điều. Ba ý ở slide sau là nền cho toàn bộ phần 7.1.

---

### Slide 6 · HAO — Hallucination is a property, not a bug

**Trên slide:** Next-token prediction: optimizes for plausible, not correct; no internal truth-check. The context window is finite and rots as it fills. Consequence: a 10,000-line file → it forgets the start and fabricates; fix: break the problem down before you prompt.

**Nội dung**

**Ý 1: model dự đoán token tiếp theo.** Toàn bộ việc LLM làm là: cho một chuỗi văn bản, chọn mảnh chữ tiếp theo có xác suất cao nhất, lặp lại. Nó được huấn luyện để tối ưu "câu chữ nghe hợp lý nhất" theo dữ liệu đã thấy, không phải "đúng nhất". Bên trong không có bộ kiểm-sự-thật, không có bước tra cứu, không có "tôi không chắc". Hệ quả: hallucination không phải bug hiếm gặp; nó là tính chất của cơ chế. Và model bịa vẫn nghe tự tin, vì trong dữ liệu huấn luyện, văn bản đúng thường được viết bằng giọng tự tin, nên giọng tự tin có xác suất cao. Độ tự tin của câu chữ không mang thông tin về độ đúng.

Ví dụ hay gặp: package không tồn tại nhưng tên nghe rất hợp lý; method đã bị xoá từ hai major version trước; config key gần đúng (sai một chữ, không fail lúc compile, fail âm thầm lúc runtime trên staging); trích dẫn tài liệu chưa bao giờ được viết.

**Ý 2: context window hữu hạn, và mục dần khi đầy lên.** Context window là toàn bộ thứ model "nhìn thấy" trong một lần gọi: system prompt, lịch sử hội thoại, file bạn dán, output lệnh, và cả câu nó đang viết. Nó có giới hạn, và quan trọng hơn: chất lượng giảm trước khi hết chỗ. Anthropic ghi rõ trong tài liệu: hiệu năng giảm khi context đầy, model bắt đầu quên chỉ dẫn ban đầu và mắc lỗi nhiều hơn. Lý do kỹ thuật: cơ chế attention so khớp mọi cặp token với nhau, chi phí bậc hai theo độ dài; context càng dài, "ngân sách attention" cho mỗi token càng loãng. Người ta gọi hiện tượng này là context rot.

**Ý 3: hệ quả thực hành.** Ném một file 10.000 dòng vào rồi hỏi, model quên phần đầu và bịa phần sau. Cách xử lý: chia nhỏ bài toán **trước** khi prompt, và quản context chủ động: chỉ nạp file liên quan, tóm tắt lịch sử dài, bắt đầu phiên mới cho task mới.

Câu chốt: context là tài nguyên bạn phải quản như RAM. Mọi SOP hôm nay thực ra là kỹ thuật quản lý một nguồn lực hữu hạn.

**Nếu bị hỏi**
- *"Model mới context một triệu token thì còn vấn đề không?"* Cửa sổ lớn hơn không có nghĩa dùng hết được với cùng chất lượng. Context rot là chất lượng giảm theo độ dài, không phải hết chỗ. Cửa sổ lớn cho phép nạp nhiều hơn, vẫn phải chọn lọc.
- *"RAG hay tool đọc file có giải quyết không?"* Có, đó là kỹ thuật just-in-time retrieval ở slide 10: nạp đúng thứ cần vào đúng lúc, thay vì nạp tất cả từ đầu.
- *"Temperature 0 có hết bịa không?"* Không. Temperature chỉ làm output ổn định hơn giữa các lần chạy; nó vẫn chọn token hợp lý nhất, không phải đúng nhất.

**Nguồn:** Karpathy — *Intro to LLMs*; Anthropic — *Effective Context Engineering for AI Agents*; IBM Research về context window.

---

### Slide 7 · HAO — Divider 02 · 7.1 Workflow

**Trên slide:** 02 · SECTION 7.1 · *AI-Assisted Workflow.* Prompt → Context → Iterate → Workflow for big tasks.

**Nội dung**

Phần 7.1, trái tim của bài. Bốn mục theo thứ tự nhân quả: viết prompt tốt (slide 8, 9), nuôi và dọn context (slide 10), vòng lặp tinh chỉnh và workflow cho task lớn (slide 11). Tất cả đều là hệ quả của slide 6: model chỉ có thứ bạn đưa, và thứ bạn đưa có giới hạn.

---

### Slide 8 · HAO — More specific = fewer corrections

**Trên slide:** ✗ `add tests for foo.py` · ✓ `write a test for foo.py covering the edge case where the user is logged out. avoid mocks.` Caption: show examples, not descriptions · long docs first · include success criteria · name the technique.

**Nội dung**

Cụ thể hơn thì sửa ít hơn.

Prompt bên trái: "add tests for foo.py". Model phải đoán: test cho hàm nào, case nào, dùng mock hay gọi thật, framework nào. Nó sẽ đoán theo kiểu phổ biến nhất trong dữ liệu huấn luyện, tức là không phải kiểu của team bạn, rồi bạn sửa ba vòng.

Prompt bên phải: "viết test cho foo.py, cover edge case user đã logout, không dùng mock". Dài hơn không nhiều, nhưng có ba thứ: phạm vi (edge case nào), ràng buộc (không mock), và ngầm định tiêu chí thành công (test chạy được cho case đó).

Bốn thói quen cụ thể:

1. **Cho ví dụ thay vì mô tả** (few-shot). "validateEmail: `user@example.com` → true, `user@.com` → false, chuỗi rỗng → false" tốt hơn một đoạn văn tả hàm. Ví dụ cố định hành vi; mô tả để ngỏ diễn giải.
2. **Tài liệu dài đặt đầu prompt, câu hỏi đặt cuối.** Model chú ý tốt hơn đến phần cuối, nơi có chỉ thị; tài liệu tham khảo để ở trên.
3. **Đưa sẵn tiêu chí thành công.** "Chạy test sau khi implement", "build phải xanh", "không thay đổi public API". Tiêu chí để model tự kiểm được, và để bạn có cái so.
4. **Gọi đúng tên kỹ thuật** để tra được: few-shot (cho ví dụ), chain-of-thought (yêu cầu nêu các bước suy luận trước khi trả lời), prompt chaining (chia thành nhiều prompt nối tiếp, output cái trước là input cái sau).

Có các khung prompt có tên, ví dụ CREATE: Character (vai), Request (yêu cầu), Examples (ví dụ), Adjustments (ràng buộc), Type of output (định dạng), Extras. Khung chỉ là checklist nhắc đừng quên context; thứ quyết định vẫn là context.

Câu chốt: prompt tồi không phải vì bạn viết dở tiếng Anh. Nó tồi vì bạn giấu context mà chỉ bạn biết.

**Nếu bị hỏi**
- *"'You are an expert' có giúp không?"* Gần như không. Đổi giọng prompt không thêm thông tin. Dán error, dán test, dán file thì thêm thông tin. Khi model sai, hỏi "nó có file chưa?" trước khi hỏi "prompt có hay chưa?".

**Nguồn:** Anthropic — *Claude Code Best Practices*; promptingguide.ai.

---

### Slide 9 · HAO — Don't ask "write me the SQL"

**Trên slide:** BAD PROMPT "Write SQL to get orders by user" → nothing for it to optimize. GOOD PROMPT: schema + existing indexes + row counts + `EXPLAIN ANALYZE` of the current query + the goal. *A bad prompt hides the context only you have.*

**Nội dung**

Ví dụ áp dụng cho một việc thật, và cũng là đáp án cho câu checkpoint Medium.

Prompt tồi: "viết cho tôi câu SQL lấy đơn hàng theo user". Model trả về một câu SELECT đúng cú pháp. Nó không biết bảng orders có 50 triệu dòng, không biết có index gì, không biết câu hiện tại đang seq scan. Nó không có gì để tối ưu, nên nó không tối ưu.

Prompt tốt đưa đúng thứ một DBA cần khi tối ưu:
1. **Schema** các bảng liên quan: cột, kiểu, khoá chính, khoá ngoại.
2. **Index hiện có** trên các bảng đó (`\di` hoặc `pg_indexes`).
3. **Quy mô dữ liệu**: orders khoảng 50 triệu dòng, users khoảng 2 triệu; phân bố lệch nếu có.
4. **Câu query hiện tại kèm output `EXPLAIN ANALYZE`**: để model thấy chính xác thứ planner thấy, seq scan ở đâu, hash join hay nested loop, ước lượng số dòng sai chỗ nào.
5. **Version Postgres**, vì planner và tính năng index khác nhau giữa version.
6. **Mục tiêu rõ**: "giảm seq scan trên orders", "dưới 100 ms ở p95", "không thêm index quá 1 GB".
7. Yêu cầu model **giải thích plan mới** và vì sao nhanh hơn: ép nó suy luận thay vì đoán.

Rồi bước quyết định: chạy `EXPLAIN ANALYZE` thật với câu mới. Kiểm chứng với planner, không phải với model. Đây là trụ Verification áp vào SQL.

**Nếu bị hỏi**
- *"EXPLAIN và EXPLAIN ANALYZE khác gì?"* `EXPLAIN` cho plan dự kiến và chi phí ước lượng. `EXPLAIN ANALYZE` chạy thật câu query, cho thời gian và số dòng thực tế từng bước. Đưa cho AI cái thứ hai, vì ước lượng sai là nguyên nhân phổ biến của plan tệ.
- *"Chạy EXPLAIN ANALYZE trên production có an toàn không?"* Nó chạy thật câu query. Với SELECT thì ổn nếu câu đó vốn chạy được; với UPDATE/DELETE phải bọc trong transaction rồi rollback.

**Nguồn:** PostgreSQL docs — *Using EXPLAIN*.

---

### Slide 10 · HAO — A long chat is not a badge of honor

**Trên slide:** 4 TECHNIQUES: compaction · note-taking (todo.md) · sub-agents · just-in-time retrieval. IN PRACTICE: `/clear` between unrelated tasks; corrected twice and still wrong → context is dirty, clear and rewrite. *Clean context + a good prompt almost always beats a long dragging chat.*

**Nội dung**

Phiên chat dài không phải huân chương. Lịch sử hội thoại là đòn bẩy mạnh nhất, vì model nhớ mọi thứ đã nói trong phiên; và cũng là thứ dễ làm hỏng nhất, vì nó nhớ cả sáu lần thử sai và mọi lối rẽ bỏ dở.

Bốn kỹ thuật có tên:

1. **Compaction**: tóm tắt lịch sử hội thoại thành một đoạn ngắn rồi tiếp tục với đoạn đó. Giữ quyết định và trạng thái, bỏ quá trình.
2. **Note-taking**: bộ nhớ ngoài context. Một file `todo.md` hay `NOTES.md` trong repo, model đọc và cập nhật. Trạng thái sống xuyên nhiều phiên, không phụ thuộc vào lịch sử chat.
3. **Sub-agents**: giao việc đọc nhiều file hoặc tìm kiếm cho một agent phụ, chỉ nhận về bản tóm tắt. Context của agent chính không phải gánh 20 file để tìm một hàm.
4. **Just-in-time retrieval**: nạp thông tin khi cần, theo đường dẫn file hoặc câu truy vấn, thay vì đổ hết vào đầu phiên.

Thực hành hằng ngày:
- `/clear` (hoặc phiên mới) giữa các task không liên quan. Task B không cần biết task A.
- Quy tắc hai lần: đã sửa AI hai lần cùng một lỗi mà vẫn sai, context đã bẩn. Nó đang bị neo vào cách hiểu sai trong lịch sử. Clear, viết lại prompt tốt hơn với thông tin từ hai lần sửa. Không sửa lần ba.
- Course-correct sớm: thấy nó đi lệch thì dừng ngay, đừng đợi chạy hết rồi sửa cả cục.

File quy ước dự án (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, tuỳ tool): nạp tự động mỗi phiên, nên mỗi phiên bắt đầu với thông tin đúng thay vì đoán. Nội dung nên có: lệnh build và test đúng của repo (ví dụ "dùng `make test`, không gọi gradle trực tiếp"), code style, các gotcha, quy tắc migration, quy tắc authorship. Quy tắc chọn dòng: nếu phải sửa model cùng một chuyện hai lần, chuyện đó thuộc về file này. Quy tắc giữ ngắn: mỗi dòng tự hỏi "bỏ dòng này thì AI có sai không?", không thì bỏ, vì file này cũng chiếm context.

Câu chốt: context sạch cộng prompt tốt gần như luôn thắng một phiên dài lê thê.

**Nếu bị hỏi**
- *"Nên nạp gì vào context cho một bug?"* Đưa vào: test đang fail, error nguyên văn, file đang sửa, file convention, một ví dụ lân cận của pattern đang dùng. Bỏ ra: cả repo, các lần thử thất bại, file không liên quan "để có context", secret và dữ liệu khách hàng.

**Nguồn:** Anthropic — *Effective Context Engineering*; *Claude Code Best Practices* (failure patterns: kitchen-sink session, correcting over and over).

---

### Slide 11 · HAO — Big task? Make the AI interview you first

**Trên slide:** Explore → Plan → Code → Commit. *"Ask me one question at a time so we can develop a thorough spec…"* — Harper Reed. Core: give the AI a check it can run (test / build / screenshot).

**Nội dung**

Task nhỏ: prompt thẳng. Task lớn, nhiều file, nhiều ngày: bắt AI phỏng vấn bạn trước khi viết dòng code nào.

**Bốn bước, theo Anthropic:**
1. **Explore**: đọc, hiểu, không sửa gì. Nhiều tool có plan mode đúng cho việc này: đọc file, trả lời câu hỏi, không đụng code. Mục đích là tách nghiên cứu khỏi thực thi, để không giải sai bài toán vì hiểu sai codebase.
2. **Plan**: ra một file `spec.md` hoặc kế hoạch từng bước, và bạn duyệt trước khi cho code. Đây là chỗ bạn cầm lái: sửa spec rẻ hơn sửa code.
3. **Code**: bước nhỏ, mỗi bước một test, chạy test giữa các bước. Một thay đổi 600 dòng không review được thì tệ hơn không thay đổi. Chia sao cho mỗi bước kết thúc ở trạng thái chạy được.
4. **Commit**: checkpoint thường xuyên. Bước sau hỏng thì quay về bước trước bằng git, không phải bằng cách prompt tiếp.

**Workflow của Harper Reed**, kể lại được:
- Bắt đầu bằng prompt: "Hỏi tôi từng câu một để cùng xây một spec chi tiết cho ý tưởng này. Chỉ một câu mỗi lần." Model hỏi về phạm vi, dữ liệu, edge case, ràng buộc; bạn trả lời; kết quả là `spec.md` do hai bên cùng viết.
- Từ spec, dùng model sinh `prompt_plan.md` (chuỗi prompt cho từng bước nhỏ, mỗi bước có test) và `todo.md` (danh sách việc, tick dần).
- Thực thi từng bước theo plan. `todo.md` giữ trạng thái xuyên nhiều lần gọi model, đúng kỹ thuật note-taking ở slide 10.

**Cốt lõi khiến agentic tool thực sự chạy được một mình**: cho AI một cách tự kiểm. Test, build, lint, screenshot. Anthropic viết: cho model một check mà nó chạy được, đó là khác biệt giữa phiên bạn phải ngồi canh và phiên bạn có thể bỏ đi. Không có test, agent chỉ có thể **nói** là xong; nó không có cách nào biết mình xong thật.

Hai lưu ý cho vòng lặp tinh chỉnh: output đầu tiên hiếm khi là bản cuối, cứ yêu cầu refactor, đơn giản hoá, đổi tên. Và nhớ training cutoff: thư viện có breaking change sau thời điểm train thì phải dán doc mới vào, không thì model dùng API cũ một cách tự tin.

Câu chốt: task lớn thì spec trước, code sau. Spec là nơi bạn cầm lái.

**Nếu bị hỏi**
- *"Biết khi nào nên dừng và tự viết?"* Ba lần thất bại trên cùng một vấn đề là tín hiệu, không phải lời mời prompt mạnh hơn. Dấu hiệu: model lặp lại cùng ý sai, bạn dán error mà không đọc, diff phình mà test vẫn đỏ, bạn không giải thích được trạng thái hiện tại của code. Đóng tab, tự viết.

**Nguồn:** Anthropic — *Claude Code Best Practices*; Harper Reed — *My LLM codegen workflow atm*; Willison — *How I use LLMs to write code*.

**Handoff → Nhan:** "Đó là cách làm việc với AI cho đúng: context, vòng lặp nhỏ, spec trước. Nhưng làm nhanh mà không review được thì vô nghĩa. Phần quan trọng nhất, review và những chỗ AI hỏng âm thầm, Nhan sẽ dẫn."

---

## Khối 2 · NHAN — Slide 12–18

### Slide 12 · NHAN — Divider 03 · 7.2 Review

**Trên slide:** 03 · SECTION 7.2 · *Code Review Process.* Four axes only you can sign off: Correct · Secure · Fast enough · Meaningful tests.

**Nội dung**

Phần 7.2: code review. Review code AI khác review code người: code người viết có hình dạng trong đầu người viết, reviewer chỉ cần kiểm lại. Code AI không có hình dạng trong đầu ai; review phải dựng hình dạng đó từ đầu. Chậm hơn, không nhanh hơn. Bốn trục, và bốn trục này chỉ con người ký được: đúng, an toàn, đủ nhanh, test có nghĩa. Mỗi trục một SOP.

---

### Slide 13 · NHAN — "You have to test what it writes."

**Trên slide:** quote Willison; *"If you haven't seen it run, it's not a working system."* Make the AI show evidence: test output, the command it ran, a screenshot, not "done".

**Nội dung**

Quy tắc bất di bất dịch, của Simon Willison: bạn phải test thứ nó viết. Chưa thấy nó chạy thì chưa phải hệ thống chạy được.

Vì sao phải nhấn mạnh điều hiển nhiên: AI mắc lỗi kiểu "deeply inhuman". Một junior viết sai thì thường trông sai: tên biến lạ, logic lủng củng. AI viết sai thì trông đúng: đặt tên đẹp, có docstring, có comment, và gọi một method không tồn tại. Reviewer người quen dùng "trông hợp lý" làm bộ lọc đầu, và bộ lọc đó vô hiệu với code AI. Người ta gọi đây là trust-then-verify gap: code càng trông chuyên nghiệp, càng ít bị kiểm.

SOP: bắt AI trưng bằng chứng thay vì lời khẳng định.
- Output của test, nguyên văn, có số pass/fail.
- Lệnh nó đã chạy và kết quả trả về.
- Screenshot màn hình thật với thay đổi UI.
- Không chấp nhận "đã implement và test xong" không kèm output. Với agentic tool, yêu cầu nó chạy test trong cùng phiên và dán kết quả.

Mẹo tổ chức Writer/Reviewer: một phiên (hoặc một agent) viết code, một phiên khác với context sạch review lại diff. Phiên viết có thiên kiến với code nó vừa viết, giống người; phiên sạch không có lịch sử nên đọc như người lạ. Kết hợp với quy tắc cuối của người: đọc lại diff như thể người lạ viết, vì đúng là người lạ viết.

**Nguồn:** Willison — *How I use LLMs to write code*; Anthropic — *Claude Code Best Practices* (writer/reviewer).

---

### Slide 14 · NHAN — When hallucination becomes a supply-chain attack

**Trên slide:** 19.7% of packages LLMs recommend don't exist (576k samples, 16 models) · 58% of hallucinated names repeat across runs · the attacker registers the fake name first, with malware attached. SOP: verify the package exists and is reputable before install; `npm audit` in CI.

**Nội dung**

Slopsquatting, chơi chữ từ typosquatting. Cơ chế:
1. AI gợi ý một package. Tên nghe hợp lý, ví dụ ghép hai từ quen thuộc theo đúng kiểu đặt tên của hệ sinh thái.
2. Package đó không tồn tại. Model bịa, vì tên đó có xác suất cao theo mẫu.
3. Kẻ tấn công biết model hay bịa đúng tên đó, đăng ký sẵn tên đó trên npm hoặc PyPI, kèm mã độc trong install script hoặc trong module.
4. Bạn hoặc agent của bạn chạy `npm install`. Mã độc chạy với quyền của bạn, trên máy dev hoặc trong CI.

Con số, từ nghiên cứu Socket tổng hợp: 576 nghìn mẫu code sinh bởi 16 model. **19.7%** package được gợi ý không tồn tại; 5.2% ở model thương mại, 21.7% ở model open-source. Điểm nguy hiểm nhất: **58%** tên bịa lặp lại qua nhiều lần chạy. Attacker không cần đoán mò; chạy model vài lần với prompt phổ biến, lấy đúng tên nó hay bịa, đăng ký. Mục tiêu trở nên dự đoán được.

Vì sao chuyện này mới: typosquatting cũ dựa vào người gõ nhầm, xác suất thấp và ngẫu nhiên. Slopsquatting dựa vào model gợi ý cùng một tên sai cho hàng nghìn người, xác suất cao và có hệ thống.

SOP, trước khi cài bất kỳ package nào AI gợi ý:
- Kiểm tra nó tồn tại trên registry chính thức, đúng tên, đúng scope.
- Kiểm tra uy tín: tuổi package, số lượt tải hằng tuần, maintainer là ai, repo nguồn có thật và có hoạt động không, có bao nhiêu package khác phụ thuộc vào nó.
- Cảnh giác với package mới tạo, ít lượt tải, không có repo, hoặc tên gần giống một package nổi tiếng.
- `npm audit` (hoặc tương đương) và dependency scanning chạy trong CI, để lưới đỡ là máy, không phải trí nhớ.
- Với agentic tool: không cho agent quyền cài package tự do; cài là bước có người duyệt.

Nối về slide 6: hallucination check ở đó là lời khuyên. Ở đây nó là bước bắt buộc, vì hậu quả không còn là "code không chạy" mà là "máy bị chiếm".

**Nếu bị hỏi**
- *"Lockfile có bảo vệ không?"* Lockfile khoá version của package đã chọn; nó không ngăn chọn nhầm package ngay lần đầu. Bảo vệ lần cài thứ hai, không phải lần đầu.
- *"Private registry hay mirror có giúp không?"* Có, nếu registry chỉ chứa package đã duyệt. Đó là cách biến bước kiểm tra thủ công thành cơ chế.

**Nguồn:** Socket — *The Rise of Slopsquatting*.

---

### Slide 15 · NHAN — What AI generates → OWASP Top 10

**Trên slide:** bảng 5 dòng: Missing auth middleware · IDOR → A01 (High); Hardcoded key · weak hash · `Math.random()` tokens → A02 (High); String-built SQL · XSS → A03 (High); Trusting the client for price / role → A04 (Med); Open CORS · public bucket · debug routes → A05 (Med). SOP: SAST (Semgrep OWASP ruleset, gitleaks) in the pipeline.

**Nội dung**

Khung security có gốc thay vì tự nghĩ danh sách. OWASP Top 10 là danh sách mười loại rủi ro web phổ biến nhất, có tên và số chuẩn, có tài liệu để tra. Bảng này ánh xạ những lỗi AI hay tạo ra vào năm mục đầu.

**A01 Broken Access Control.** Kiểm soát truy cập bị vỡ: người dùng làm được việc không được phép. Cách AI tạo ra: refactor một handler, giữ happy path, đánh rơi middleware kiểm tra auth; hoặc sinh endpoint mới mà quên guard vì prompt không nhắc. IDOR (Insecure Direct Object Reference): đổi `id=17` thành `id=18` trên URL là xem được đơn hàng người khác, vì server lấy theo id mà không kiểm tra chủ sở hữu. Đây là lỗi review AI phổ biến nhất ngoài đời, và test không bắt được vì test sinh từ cùng happy path: cả code lẫn test đều đi qua con đường "user hợp lệ xem đơn của mình".

**A02 Cryptographic Failures.** API key hardcode trong code (AI học từ vô số ví dụ có key giả, nên nó điền một chuỗi trông như key thật); hash mật khẩu bằng MD5 hoặc SHA-1 không salt; `Math.random()` làm token hoặc session id. `Math.random()` không phải bộ sinh ngẫu nhiên mật mã, đoán được từ vài giá trị trước. Thay bằng `crypto.randomBytes`, `crypto.randomUUID`, hoặc CSPRNG của nền tảng.

**A03 Injection.** SQL nối chuỗi vì prompt nói "dynamic filter" và model chọn cách đơn giản nhất; XSS vì render HTML từ input người dùng không escape. Cách chặn: parameterized query, ORM đúng cách, escape theo context.

**A04 Insecure Design.** Tin client cho những thứ client không được quyết: giá gửi lên từ giỏ hàng, role gửi lên trong request body. Code đúng cú pháp, sai thiết kế; không linter nào bắt được, chỉ người đọc hiểu nghiệp vụ mới thấy.

**A05 Security Misconfiguration.** CORS `*` để "cho nó chạy", bucket public, route debug hoặc endpoint admin còn sót lại sau khi thử.

Bằng chứng nghiên cứu: Stanford và NYU thấy dev dùng AI assistant viết code kém an toàn hơn dev viết tay, và tự tin hơn rằng code mình an toàn. Hai hiệu ứng cộng lại là lý do cần lưới đỡ bằng máy.

SOP: đưa SAST (static application security testing) vào pipeline như một lưới cơ khí. Semgrep với ruleset OWASP bắt pattern injection, missing auth, weak crypto. gitleaks quét secret trong diff và lịch sử. Chạy trên mọi PR, fail build khi có finding mức cao. Nó không thay review; nó bắt phần mắt người bỏ khi vội.

**Nếu bị hỏi**
- *"Sao không có A06 đến A10?"* Bảng chọn năm mục AI hay dính nhất. Danh sách đầy đủ ở owasp.org; A06 Vulnerable Components liên hệ trực tiếp với slopsquatting.
- *"SAST có nhiều false positive không?"* Có, nhất là lúc mới bật. Bắt đầu với ruleset hẹp, mức cao, rồi mở dần.

**Nguồn:** OWASP Top 10 (2021); vibe-eval — *OWASP Top 10 for AI code*; nghiên cứu Stanford/NYU về AI assistant và security.

---

### Slide 16 · NHAN — Two places AI is "green but wrong"

**Trên slide:** PERFORMANCE: four smells, N+1 · missing index · unbounded `findAll()` · accidental O(n²); all pass every unit test, all fine on ten rows. BAD TESTS: high coverage ≠ safe; mock overuse; asserting current behavior instead of correct. SOP: a human writes at least one edge-case test the AI missed, and runs it.

**Nội dung**

Hai chỗ code AI xanh mà sai: test pass, CI xanh, và vẫn hỏng ở production.

**Performance, bốn mùi:**
1. **N+1 query**: lấy danh sách 100 đơn hàng, rồi trong vòng lặp gọi thêm một query lấy user của từng đơn. 101 query thay vì 2. Code trông sạch, mỗi dòng đều hợp lý.
2. **Thiếu index**: thêm điều kiện `WHERE status = ?` trên cột mới mà không ai tạo index. Trên bảng 10 dòng không khác gì; trên 50 triệu dòng là full scan.
3. **Unbounded fetch**: `findAll()` hoặc `SELECT *` không `LIMIT` trên bảng đã lớn. Chạy ổn hai năm, rồi một ngày bảng đủ lớn để làm hết memory.
4. **O(n²) vô tình**: `items.filter(x => other.includes(x))`, `includes` lồng trong vòng lặp trên hai list. Mỗi list 10 phần tử thì 100 phép so; mỗi list 10 nghìn thì 100 triệu.

Cả bốn pass mọi unit test, vì unit test chạy trên dữ liệu nhỏ. Cả bốn ổn trên mười dòng. Chúng chỉ lộ ở production, lúc đắt nhất. Không tài liệu nào dạy hay bằng hai ba ví dụ thật từ codebase của team. SOP: yêu cầu AI kèm phân tích độ phức tạp khi sinh code xử lý danh sách hoặc query; với DB, xem `EXPLAIN ANALYZE` như slide 9; review bằng mắt tìm vòng lặp có I/O bên trong.

**Test dởm, ba kiểu:**
1. **Lạm dụng mock** đến mức test không kiểm gì thật. Ví dụ: mock `discountFor`, gọi `total(cart)`, rồi assert `discountFor` đã được gọi. Test này xanh dù công thức giảm giá sai hoàn toàn; nó chỉ chứng minh hàm được gọi.
2. **Khẳng định hành vi hiện tại thay vì hành vi đúng.** Test sinh bằng cách chạy code và ghi lại output. Nếu code đang sai, test xanh chỉ đóng băng cái sai lại và chống mọi lần sửa sau. Test đúng phải dẫn xuất từ yêu cầu: "đúng 100 đơn vị thì giảm 10%, tổng 900 đô", số 900 lấy từ spec, không phải từ chạy code.
3. **Coverage cao nhưng khó đọc, khó bảo trì**: nghiên cứu thực nghiệm cho thấy test LLM sinh đạt coverage ổn nhưng kém về readability và maintainability. Coverage là ảo giác an toàn nếu assertion vô nghĩa.

Phép thử một câu: xoá business rule đi mà test vẫn pass, thì đó không phải test.

SOP: người viết ít nhất một test edge case mà AI bỏ sót (biên của ngưỡng, input rỗng, gọi hai lần, số âm), và tự chạy để thấy nó pass thật. Và một thói quen với tiền: dùng cent nguyên (`900_00`) thay vì float đô la, vì float làm tròn đúng trên dữ liệu test và sai trên dữ liệu thật.

Chốt phần 7.2: AI review được style và lỗi rõ. Bốn thứ chỉ con người ký: đúng, an toàn, đủ nhanh, test có nghĩa.

**Nếu bị hỏi**
- *"Coverage bao nhiêu là đủ?"* Câu hỏi sai. Hỏi: mỗi business rule có ít nhất một test sẽ fail nếu rule bị xoá không?

**Nguồn:** HackerNoon — *The Limits of LLM-Generated Unit Tests*; arXiv — *An Empirical Study of Unit Test Generation with LLMs*.

---

### Slide 17 · NHAN — Divider 04 · 7.3 Docs

**Trên slide:** 04 · SECTION 7.3 · *Documentation.* Give AI the pen, not the decision.

**Nội dung**

Phần 7.3, documentation, một slide. Nguyên tắc: cho AI cầm bút, không cho AI cầm quyền quyết. Ba việc: docs từ code, API docs theo Diátaxis, và ADR.

---

### Slide 18 · NHAN — AI drafts; a human reviews and decides

**Trên slide:** DOCS FROM CODE: generate docs from real code (safe); AI docs "sound right but are technically wrong" where it's complex. API · DIÁTAXIS: tutorial · how-to · reference · explanation; which type for whom is your call. ADR: Title / Status / Context / Decision / Consequences; a decision with its expiry conditions; AI may draft, never decide.

**Nội dung**

**Docs từ code.** Quy trình chuẩn: AI viết draft, người duyệt. Hướng đi quan trọng: sinh docs **từ** code thật thì an toàn, vì nguồn sự thật đã check in và model chỉ tóm tắt thứ nó nhìn thấy. Ngược lại, sinh code từ một đoạn văn mô tả thứ bạn ước là có thì trông khớp, và lệch ngay khi một bên thay đổi. Cảnh báo quan trọng nhất: docs AI sinh "nghe rất hợp lý nhưng sai kỹ thuật" đúng ở những chỗ phức tạp nhất, nơi model phải suy diễn thay vì tóm tắt, và đó cũng là nơi cần docs nhất. Người duyệt tập trung vào chỗ phức tạp, không phải chỗ hiển nhiên.

**API docs theo Diátaxis.** Docs không phải một khối. Diátaxis chia theo hai trục: người đọc đang học hay đang làm, và họ cần bước thực hành hay hiểu lý thuyết. Ra bốn loại:
- **Tutorial**: học, cầm tay chỉ việc cho người mới, một đường thẳng từ zero đến kết quả đầu tiên.
- **How-to**: làm một việc cụ thể, có mục tiêu rõ, cho người đã biết cơ bản. "Cách thêm một endpoint có phân trang".
- **Reference**: tra cứu chính xác, đầy đủ, khô. Tham số, kiểu, giá trị trả về, lỗi.
- **Explanation**: hiểu vì sao. Bối cảnh, lựa chọn, đánh đổi.

AI viết loại nào cũng nhanh. Chọn loại nào cho ai là việc của bạn. Phần lớn docs khó dùng vì trộn bốn loại vào một trang: tutorial xen reference, how-to xen explanation, người đọc không tìm được thứ mình cần. Với API docs: spec (OpenAPI) là contract, reference sinh từ spec, và không sửa tay file sinh; sửa spec rồi sinh lại.

**ADR, Architecture Decision Record.** Template Nygard, năm mục: Title (quyết định trong một câu), Status (proposed / accepted / superseded), Context (điều gì đúng lúc quyết định, ràng buộc gì), Decision (chọn gì và lựa chọn nào bị loại, vì sao), Consequences (hệ quả tốt và xấu, điều gì sẽ khiến xem lại). ADR bất biến: quyết định mới thì viết ADR mới supersede cái cũ, không sửa cái cũ, để lịch sử suy nghĩ còn nguyên. Một ADR là một quyết định kèm điều kiện hết hạn; không có điều kiện hết hạn thì nó là trang wiki. Không thuộc về ADR: code chạy thế nào hôm nay, tutorial cho thư viện đã chọn, bốn đoạn mở đầu AI sinh.

Điểm đắt nhất: AI được draft ADR, không được quyết. Model bịa rationale rất trôi chảy, và team sẽ có một tài liệu ghi lý do chưa ai từng bàn. Context và Decision phải do người viết hoặc người sửa từng câu.

**RFC** đi kèm: tài liệu bàn **trước** khi làm, để lấy ý kiến; ADR ghi lại quyết định **đã** chốt. Uber scale từ vài chục lên hàng nghìn kỹ sư nhờ văn hoá viết mọi thứ xuống trước khi làm. AI draft RFC để khởi động thì tốt; người chốt.

Chốt: cho AI cầm bút, đừng cho AI cầm quyền quyết. Docs và ADR là nơi ranh giới đó rõ nhất. Đây là trụ Ownership.

**Nguồn:** KnowledgeHut — *AI for code documentation*; Diátaxis (diataxis.fr); adr.github.io + Nygard template; Pragmatic Engineer — *Scaling engineering via RFCs*.

**Handoff → Hao:** "Biết cái gì cần bắt rồi: đúng, an toàn, đủ nhanh, test có nghĩa, và AI không được quyết. Câu hỏi là làm sao bắt nó mỗi lần, kể cả lúc 2 giờ sáng. Hao sẽ đưa khung SOP, rồi cho các bạn thử tay trên code thật."

---

## Khối 3 · HAO — Slide 19–20, bài tập, debrief

### Slide 19 · HAO — Divider 05 · SOPs for common tasks

**Trên slide:** 05 · SECTION 7.4 · *SOPs for common tasks.* One SOP frame, filled per task. (Slide chỉ có tiêu đề; nội dung dưới đây là nói.)

**Nội dung**

SOP là gì cho đúng: một việc lặp lại, viết thành các bước cố định, để kết quả như nhau bất kể ai làm và mệt đến đâu. Ba điểm phân biệt với tài liệu thường: nó là checklist, không phải bài giảng; nó viết cho ngày tệ nhất của bạn, 2 giờ sáng, đang vội, đang dở việc khác; và nó sống: một sự cố thêm một bước, một bước không ai làm theo thì xoá. Checklist không phải cho người chưa biết; nó cho người đã biết nhưng sẽ bỏ sót khi vội và tự tin. Không ai merge một AI diff tồi vì không biết review; họ merge vì nó trông hợp lý, họ đang vội, và họ tự tin.

Checklist cụ thể phụ thuộc stack của team, nên đây là một khung, và các bạn điền theo task.

**Khung bốn bước, lặp cho mọi loại task:**
1. **Nạp context chuẩn.** Template của team, một PR mẫu tốt gần đây, file convention, schema liên quan. Trụ Context.
2. **Cho AI cách tự kiểm.** Test, build, lint chạy được trong phiên. Không có thì agent chỉ có thể nói là xong.
3. **Verify điểm rủi ro đặc thù của loại task.** Mỗi loại task có một chỗ AI hay hỏng; bước này nhìn đúng chỗ đó.
4. **Người ký tên trước khi merge.** Trụ Ownership.

**Điểm rủi ro và checklist theo từng loại task** (bản đầy đủ trong README của repo):

*Verify code AI trước khi commit* (áp cho mọi task):
- Đọc từng dòng thay đổi; không giải thích được dòng nào thì dòng đó không vào.
- Kiểm tra mọi API bên ngoài, config key, method thư viện với doc thật hoặc source của dependency; trí nhớ của model không phải nguồn.
- Kiểm tra import: không package bịa, không version mà lockfile không có.
- Chạy build và toàn bộ suite ở local, không chỉ test mới.
- Đọc diff tìm hành vi bị rơi: auth check, xử lý null, nhánh lỗi, logging.
- Tìm giá trị hardcode, credential, placeholder còn sót.
- Gỡ AI co-author trailer; bạn là tác giả.
- Đọc lại diff như thể người lạ viết.

*Service mới:* đây là chỗ AI mạnh nhất và an toàn nhất, vì boilerplate, DTO, mapper, config là việc nhàm chán, máy móc, kiểm chứng được ngay. Scaffold từ template chuẩn, không copy một service đang chạy (mang theo sự cố cũ, feature flag chết, account id hardcode). Xác nhận mô hình chọn environment của infra trước khi đụng Terraform. Đặt giá trị đúng chỗ: config chung, biến theo môi trường, secret. Nối CI/CD và observability trước endpoint thật đầu tiên. Verify: đúng convention, đúng phân tầng (controller không gọi thẳng repository).

*Database migration*, theo Fowler: nhỏ và tăng dần; versioned cùng code; forward-only và bất biến sau khi merge, không sửa migration đã apply; có rollback viết ra trước khi apply; chạy tự động giống nhau qua mọi môi trường; breaking change dùng parallel change: expand (thêm cột mới), migrate (ghi cả hai), contract (bỏ cột cũ ở release sau), không bao giờ drop cột trong cùng release ngừng ghi vào nó. Review SQL sinh ra bằng tay: kiểu, nullable, default, index. Ước lượng lock trên số dòng production, không phải mười dòng local. Review DDL thôi là thiếu; xem cả data migration và code truy cập.

*API endpoint:* contract trước, định nghĩa schema rồi sinh code; không sửa tay file sinh. Validate input ở biên. Authorize trên mọi endpoint, không chỉ cái hiển nhiên. Quyết định error contract: status code, hình dạng body, cái gì được lộ. Pagination và limit từ đầu; endpoint list không giới hạn là sự cố tương lai. Test bốn ca: happy path, auth fail, validation fail, kết quả rỗng.

*Integration test:* dependency thật trong container thay vì mock khi khả thi; mỗi test sở hữu dữ liệu và tự dọn, không phụ thuộc thứ tự; tag riêng để unit run vẫn nhanh; assert trên hành vi quan sát được, không phải lời gọi nội bộ; test flaky là test fail, sửa hoặc xoá, không retry cho qua.

Chốt: SOP không phải để trói tay. Nó là context đóng gói sẵn để lần sau bạn và AI làm đúng ngay từ đầu.

**Nếu bị hỏi**
- *"Bảo AI thêm một cột vào bảng 40 triệu dòng, phải kiểm tra gì trước khi apply?"* Default có buộc rewrite cả bảng không (Postgres từ 11 thêm cột với default hằng thì không rewrite, default là biểu thức thì có). Lock ở mức nào và giữ bao lâu. Migration có chạy trong một transaction giữ lock đó suốt không. Tạo index có `CONCURRENTLY` không. Statement timeout và lock timeout đã đặt chưa. Kế hoạch rollback đã viết ra chưa.

**Nguồn:** Fowler — *Evolutionary Database Design*; README của repo (SOP-1 đến SOP-5).

---

### Slide 20 · HAO — The Legacy Rescue

**Trên slide:** *One function. Undocumented, badly named, wrong in ways the tests don't catch.* Bốn task; lệnh `git clone … && cd legacy-rescue && node --test`; `src/billing.js` và một file test pass; *the passing tests are part of the problem*; read `SPEC.md` first; Node 20+, no deps.

**Nội dung**

Bài tập 45 phút trên code thật trong repo.

**Bối cảnh:** `src/billing.js` là một hàm `calc(order, coupon, region)` tính báo giá, kế thừa từ một service không ai bảo trì. Không tài liệu, đặt tên biến một chữ, comment đầu file nói "do not touch unless you have to". Kèm bốn test trong `test/billing.test.js`, cả bốn pass. Test pass là một phần của vấn đề: chúng được viết bằng cách chạy code và ghi lại output, nên không thể mâu thuẫn với code.

**Spec (`SPEC.md`) là nguồn sự thật**, code chỉ là thứ đã ship. Quy tắc trong spec:
1. Subtotal hàng = tổng qty × price trên các dòng qty > 0; dòng null và qty ≤ 0 bỏ qua.
2. Volume discount theo tổng số lượng, tier cao nhất áp dụng: 100 trở lên 10%, 500 trở lên 15%, 1000 trở lên 20%. Ngưỡng bao gồm: đúng 100 được 10%.
3. Coupon giảm theo phần trăm, sau volume discount.
4. Shipping 15 đô, miễn phí khi subtotal **sau mọi discount** trên 500.
5. Tax chỉ trên subtotal hàng đã giảm; shipping không chịu thuế. VN 10%, US 7.25%, còn lại 0%.
6. Làm tròn đến cent.
7. `calc` là hàm thuần: không sửa order truyền vào; gọi hai lần cùng input ra cùng kết quả.
Spec cố ý để ngỏ: tiền có nên là float đô la không.

**Bốn task:**
1. (10 phút) Dùng AI giải thích code làm gì. Viết giả thuyết của mình về bug ra trước khi hỏi. Lý do: nếu hỏi trước, câu trả lời hợp lý đầu tiên của model sẽ thành giả thuyết của bạn, và bạn đã thuê ngoài phần suy nghĩ.
2. (15 phút) Refactor về clean code với AI: tách hàm theo trách nhiệm (subtotal, discount, shipping, tax), đặt tên, bỏ mutation. Bước nhỏ, chạy test giữa các bước.
3. (10 phút) Sinh unit test cho code đã refactor, dẫn xuất từ spec.
4. (10 phút) Làm tay: chạy test, rồi tìm ít nhất hai edge case AI bỏ sót và tự viết test cho chúng.

**Luật:** model hay tool nào cũng được. Không dán fix mà không giải thích được thành lời. Mọi commit mang tên người làm, không AI co-author trailer. Ghi lại mỗi lần model sai một cách tự tin; đó là nguyên liệu debrief. Không nói trước có bao nhiêu bug.

---

### Debrief (15 phút) — HAO

**Ba câu hỏi, đi từng nhóm:**
1. Phần nào AI thực sự làm tốt hơn bạn? Thường: giải thích code nhanh, đặt lại tên, sinh khung test, tách hàm.
2. Nó dẫn bạn đi sai ở đâu, một cách tự tin? Thường: khẳng định "tier boundary đúng", đề xuất `Math.round` làm cách sửa float, bỏ qua dòng `o.items.push`.
3. Bước nào trong khung SOP hoặc ba trụ sẽ bắt được bug bạn bỏ sót?

**Bốn bug được gieo** (chi tiết trong `INSTRUCTOR.md`):

1. **Ngưỡng tier dùng `>` thay vì `>=`.** Code: `if (q > 1000) … else if (q > 500) … else if (q > 100)`. Spec: "100 or more". Đúng 100, 500, 1000 đơn vị rơi xuống tier dưới. Ví dụ: 100 món giá 1 đô, region EU: code ra 115.00, spec ra 105.00 (100 × 0.9 + 15 ship). Loại bug: off-by-one ở biên; test sinh từ code không bắt được vì không ai sinh test đúng tại biên. Model thường tìm ra bug này nếu được đưa spec.

2. **Free shipping tính trên subtotal trước discount.** Code lưu `pre = t` trước khi giảm, rồi `if (pre > 500) ship = 0`. Spec: miễn ship khi subtotal sau mọi discount trên 500. Ví dụ: 600 món giá 0.90: 540 trước giảm, 459 sau giảm 15%; spec vẫn tính ship 15; code ra 459.00, spec ra 474.00. Loại bug: đọc sai thứ tự áp dụng quy tắc; chỉ lộ khi có test mà discount kéo tổng qua ngưỡng 500.

3. **Hàm mutate order của caller.** Code `o.items.push({ sku: 'SHIPPING', qty: 1, price: ship })`. Hàm không thuần: gọi lần hai với cùng order, danh sách có thêm dòng shipping, ra số khác. Ví dụ: order 2 món giá 25, EU: lần một 65.00, lần hai 80.00. Đây là bug gây sự cố thật ngoài đời (retry, tính lại giỏ, hiển thị lại đều gọi hàm nhiều lần), và gần như không ai tìm ra bằng cách đọc. Chỉ lộ khi có test gọi `calc` hai lần, mà test sinh từ implementation không bao giờ làm vậy, vì implementation "chạy đúng" ở lần đầu. Đây là punchline cho câu checkpoint Hard và cho slide 16.

4. **Tax đánh lên cả shipping.** Code `total = (t + ship) * (1 + tax)`. Spec: tax chỉ trên hàng. Ví dụ: 1 món 100 đô ở VN: code ra 126.50, spec ra 125.00; chênh 1.50 là 10% của shipping. Loại bug: gộp sai phạm vi áp thuế; model tìm ra khi được đưa spec, bỏ qua khi chỉ đọc code.

**Điểm thảo luận, không phải bug: tiền là float.** Trên dữ liệu test hiện tại phép nhân và làm tròn tình cờ đúng, nên hôm nay không viết được test nào fail. Câu hỏi cho lớp: làm sao chứng minh nó an toàn? Câu trả lời trung thực: không thể, vì float nhị phân không biểu diễn chính xác phần lớn số thập phân, và lỗi tích luỹ phụ thuộc dữ liệu. Đó là lý do quy tắc là "cent nguyên" chứ không phải "làm tròn cẩn thận". Hầu hết model sẽ tự tin đề xuất `Math.round(x * 100) / 100` như cách sửa float; nó không sửa, nó chính là thứ đang che vấn đề.

**Kết quả điển hình:** đa số nhóm tìm ra bug 1 nhanh, bug 4 khi mở spec, và bỏ lỡ hoàn toàn bug 2 và 3. Bài học: test dẫn xuất từ yêu cầu bắt được bug 1, 2, 4; bug 3 cần test về tính thuần của hàm, thứ chỉ có khi người viết nghĩ về hệ quả, không phải về output.

Câu chốt bài tập: AI làm 80% việc trong 5 phút. 20% còn lại, biết nó sai ở đâu, mới là lý do người ta vẫn trả lương cho kỹ sư.

**Handoff → Nhan:** "Các bạn vừa thấy tận mắt test xanh mà code sai. Nhan sẽ kiểm tra lại ba câu, rồi nói về chuyện gì xảy ra khi AI không còn dừng lại để hỏi nữa."

---

## Khối 4 · NHAN — Slide 21–25

### Slide 21 · NHAN — Checkpoint questions

**Trên slide:** EASY: copy-pasting straight from an LLM into prod, what's the danger? MEDIUM: how do you structure a prompt for a Postgres-optimized SQL query? HARD: AI generated an email regex, it looks correct, your SOP to verify it's safe against ReDoS? Caption: ReDoS → catastrophic backtracking → one crafted request pins a CPU.

**Nội dung**

Hỏi từng câu, lấy ý từ lớp trước, rồi chốt. Đáp án không chiếu.

**Easy — nguy hiểm của copy-paste thẳng từ LLM vào production.**

Không phải "nó có thể sai", điều đó đúng với mọi code. Ba tầng nguy hiểm cụ thể:
- **Đúng đắn:** code hợp lý một cách bề mặt, nên sống sót qua lần đọc lướt vốn chỉ bắt code sai rõ ràng. Và sau này không ai có mental model để debug, vì không ai từng nghĩ ra nó. Chưa thấy nó chạy thì chưa phải hệ thống chạy được. Model bịa thư viện và method với giọng tự tin.
- **Bảo mật:** các lỗ hổng OWASP ở slide 15 (secret hardcode, injection, thiếu auth); 45% code AI fail benchmark OWASP; và slopsquatting, cài nhầm package độc do AI bịa tên.
- **Sở hữu và riêng tư:** dán code dự án vào AI public là rò rỉ. Vụ Samsung 2023: kỹ sư dán mã nguồn bán dẫn nội bộ vào ChatGPT để nhờ sửa, ba lần trong 20 ngày; công ty cấm toàn bộ nhân viên dùng. Và người commit vẫn chịu trách nhiệm từng dòng.

Chốt: nguy hiểm không phải AI viết sai, mà là nó sai theo cách trông rất đúng, và bạn ship mà không biết.

**Medium — prompt để lấy SQL tối ưu cho Postgres.**

Checklist sáu mục, khớp slide 9: schema các bảng liên quan; index hiện có; quy mô dữ liệu và phân bố; câu query hiện tại kèm output `EXPLAIN ANALYZE`; version Postgres; mục tiêu rõ (thời gian, tránh full scan, giới hạn index). Yêu cầu model giải thích plan mới vì sao nhanh hơn. Rồi chạy `EXPLAIN ANALYZE` thật với câu mới và so. Kiểm chứng với planner, không phải với model.

**Hard — SOP kiểm tra regex AI sinh có an toàn trước ReDoS.**

ReDoS là gì: Regular expression Denial of Service. Với regex thiết kế kém, gặp input bất thường, engine backtracking rơi vào **catastrophic backtracking**: thử số tổ hợp tăng theo hàm mũ với độ dài input trước khi kết luận không khớp. CPU bị chiếm hoàn toàn. Khác DoS thường cần lượng lớn request, ở đây một request với payload khéo là đủ.

Cơ chế với `^(a+)+$` và input 26 chữ "a" rồi "!": `a+` bên trong có thể nuốt 1 đến 26 chữ a, nhóm bên ngoài lặp lại có thể chia 26 chữ a thành mọi cách phân đoạn; khi gặp "!" không khớp `$`, engine lùi lại thử cách chia khác, tổng cộng cỡ 2 mũ 26 cách. Đo thật trên Node 24: 20 ký tự 5 ms, 22 là 20 ms, 24 là 80 ms, 26 là 320 ms; nhân đôi mỗi khi thêm một chữ. 30 ký tự khoảng 5 giây, 40 ký tự là hơn một giờ.

Ba hình dạng nguy hiểm để nhận diện khi đọc:
- **Nested quantifier**: `(a+)+`, `(x\w{1,10})+y`. Quantifier bọc quantifier.
- **Overlapping alternation**: `(.|\s)*`. Mỗi khoảng trắng khớp được cả hai nhánh, nên 2 mũ n tổ hợp.
- **Sequential quantifier với overlap**: `a.*?b.*?c`, nhiều `.*` liên tiếp có thể chia input theo nhiều cách.

SOP năm bước:
1. **Đọc regex** tìm ba hình dạng trên. "Trông đúng" không phải bằng chứng.
2. **Test với chuỗi ác ý**: prefix mơ hồ dài cộng một ký tự buộc fail, ví dụ `"a".repeat(40) + "!"` cho pattern kiểu `^(a+)+$`. Đo thời gian ở vài độ dài; nếu tăng theo hàm mũ là dính. Test bằng input hợp lệ không phát hiện được gì.
3. **Dùng engine tuyến tính**: RE2 (Go dùng mặc định; có binding cho nhiều ngôn ngữ), hoặc module regex có đảm bảo linear time. Các engine này không backtrack, đổi lại không hỗ trợ backreference và lookaround.
4. **Nếu buộc dùng engine backtracking**: atomic group `(?>…)`, possessive quantifier `a++`, thay `.` bằng negated class như `[^"\n]*`; đặt timeout cho phép so khớp (.NET 4.5+, Ruby 3.2+ có sẵn); giới hạn độ dài input trước khi đưa vào regex.
5. **Tự động hoá**: linter hoặc SAST có rule ReDoS trong CI. Với email, ưu tiên validate đơn giản đã kiểm định hoặc thư viện, thay vì để AI chế regex "thông minh".

Rồi chất vấn tiền đề: validate email bằng regex là sai công cụ. Regex đúng theo RFC 5322 dài hàng nghìn ký tự và vẫn không cho biết địa chỉ có tồn tại. Cách đúng: kiểm tra có `@` và phần sau có dấu chấm, giới hạn độ dài, gửi mail xác nhận. Cách duy nhất biết email tồn tại là gửi thư tới nó.

Chốt: "trông đúng" và "an toàn" là hai câu hỏi khác nhau; AI giỏi cái đầu, dở cái sau. Nối về bài tập: bug 3 cũng vậy, test xanh vì test và code đến từ cùng một sự hiểu sai; kiểm chứng phải đến từ yêu cầu, không từ implementation.

Script demo nếu cần, chạy `node redos.js`, dừng ở 28 ký tự:

```js
const re = /^(a+)+$/;
for (const n of [20, 22, 24, 26, 28]) {
  const s = 'a'.repeat(n) + '!';
  const t = process.hrtime.bigint();
  re.test(s);
  console.log(`n=${n}  ${(Number(process.hrtime.bigint() - t) / 1e6).toFixed(0)} ms`);
}
```

**Nguồn:** Willison; Veracode; Socket; Forbes / AI Incident Database (Samsung, 5/2023); PostgreSQL docs; regular-expressions.info — *Catastrophic Backtracking*; OWASP — *ReDoS*.

---

### Slide 22 · NHAN — Even Karpathy retired "vibe coding"

**Trên slide:** He moved to Agentic Engineering (Mar 2026): the dev is a supervisor orchestrating autonomous agents; oversight gets tighter. *If autonomy keeps rising, what's the endpoint? → the dark factory.*

**Nội dung**

Ba slide cuối nhìn về phía trước.

Karpathy đặt tên "vibe coding" tháng 2/2025: giao phó cho cảm giác, quên code đi. Tháng 3/2026, chính ông khai tử nó và chuyển sang "Agentic Engineering": developer là người giám sát, điều phối các agent tự chạy nhiều bước, và giám sát còn chặt hơn, không lỏng hơn, vì agent làm nhiều việc hơn giữa hai lần người nhìn vào. Người khai sinh thuật ngữ cũng đã nâng cấp nó theo đúng hướng bài hôm nay: từ "quên code đi" sang "quy trình có giám sát".

Cây cầu sang slide sau: nếu mức tự động cứ tăng, agent làm nhiều hơn, người nhìn ít hơn, thì điểm cuối của con đường là gì? Có tên cho nó: dark factory.

**Nguồn:** Karpathy — *Agentic Engineering* (2026); Buttondown — *The end of vibe coding*.

---

### Slide 23 · NHAN — The end of the ladder: a codebase that ships itself

**Trên slide:** ladder L1 Assisted → L2 + Review → L3 + Auto gates → L4 Escalate-only → L5 Dark factory. REAL RISK: an agent with the wrong write access wiped 1.9 million production rows; you still own the incident. Caption: a dark factory runs with the lights off, nobody there; for code: write · test · review · ship autonomously, agents that adapt and judge like a dev but never stop to ask.

**Nội dung**

Mở bằng: phần này để biết chân trời, không cần nhớ chi tiết, chỉ cần một điều ở slide sau.

Dark factory, mượn từ sản xuất: nhà máy chạy tắt đèn vì không có người trong đó. Với phần mềm: viết, test, review, ship, hoàn toàn tự động; agent tự thích nghi và phán đoán như một dev, nhưng không bao giờ dừng lại để hỏi người.

Thang tự động năm nấc:
- **L1 Assisted**: autocomplete, chat. Người viết, AI gợi ý. Người quyết mọi thứ.
- **L2 + Review**: agent viết cả PR, người review từng dòng trước khi merge. Hầu hết team hôm nay ở đây, và bài này chủ yếu cho nấc này.
- **L3 + Auto gates**: test, lint, SAST, policy tự chặn PR không đạt; người chỉ review cái đã qua cổng. SOP được mã hoá thành cổng.
- **L4 Escalate-only**: agent tự merge và deploy trong phạm vi đã định; chỉ gọi người khi gặp bất thường hoặc vượt ngưỡng.
- **L5 Dark factory**: không còn người trong vòng lặp thường ngày.

Rủi ro thật, không giả định: một agent với quyền ghi sai đã xoá 1.9 triệu dòng dữ liệu production. Agent không hiểu hệ quả, không dừng để hỏi, và có quyền làm. Người sở hữu sự cố vẫn là người: người cấp quyền, người không đặt giới hạn, người không có backup. Trụ Ownership không mất ở nấc nào.

Không kết luận ở slide này. Câu hỏi để lại: nếu L5 là đích, review có còn cần không? Slide sau trả lời.

**Nguồn:** MindStudio — *What is a Dark Factory*; HackerNoon — *The Dark Factory Pattern*.

---

### Slide 24 · NHAN — Full autonomy doesn't remove humans — it changes their shape

**Trên slide:** EARNED TRUST: read-only → write-to-branch → staging → production, expanding access by proven reliability; limit each agent's blast radius. DEEPSEEK HARNESS: open-source agent harness, everything is a plugin; append-only, inspectable session log. Caption: *Today's SOP = the manual version of the same discipline. Verification + Ownership encoded into guardrails + audit trails. Discipline scales, it doesn't vanish.*

**Nội dung**

Cú lật của cái kết: tự động hoàn toàn không bỏ con người ra khỏi hệ thống. Nó đổi hình con người. Review không mất; review đổi từ đọc từng PR sang thiết kế cổng và đọc log.

**Earned trust.** Không ai giao production cho agent ngày đầu. Quyền được mở dần theo độ tin cậy đã chứng minh: read-only (agent chỉ đọc và đề xuất) → write vào branch (agent tạo PR, người merge) → staging (agent deploy lên môi trường thử) → production (agent deploy thật, có giới hạn). Mỗi nấc là một giai đoạn quan sát: agent làm đúng đủ lâu thì mở nấc tiếp. Và giới hạn blast radius của mỗi agent: quyền tối thiểu cần cho việc của nó, tách credential, không có quyền xoá hàng loạt nếu việc không cần. Đó là bài học 1.9 triệu dòng: thiệt hại của quyền ghi sai không có trần.

**DeepSeek Harness.** Một harness agent mã nguồn mở (harness là lớp bao quanh model: vòng lặp gọi tool, quản context, ghi log). Triết lý "mọi thứ là plugin", kể cả vòng lặp agent, nên từng phần thay được và kiểm được riêng. Điểm quan trọng cho bài này: session log append-only, inspect được: mọi prompt, mọi tool call, mọi context đã nạp, mọi token. Không sửa được, không xoá được, đọc lại được. Khi agent tự chạy không ai xem, log là thứ cho phép trả lời sau đó: nó đã thấy gì, quyết gì, vì sao.

**Nối về đầu buổi.** Earned trust là trụ Verification mã hoá thành cơ chế: không tin lời, chỉ tin hành vi đã quan sát. Audit trail là trụ Ownership mã hoá thành cơ chế: mọi hành động có người chịu trách nhiệm truy ra được. SOP hôm nay là bản thủ công của cùng một kỷ luật. Hôm nay bạn chạy checklist bằng tay; ngày mai bạn viết checklist đó thành guardrail và cổng cho agent. Người viết guardrail phải hiểu SOP, vì guardrail chính là SOP. Kỷ luật scale lên; nó không biến mất.

Câu bắt buộc: "review đổi hình", không bao giờ "hết cần review".

**Nếu bị hỏi**
- *"Học SOP làm gì nếu tương lai là agent?"* Vì guardrail của agent là SOP được mã hoá, và người viết guardrail phải hiểu SOP. Hơn nữa, hầu hết team ở L2 đến L4 nhiều năm nữa, nơi con người vẫn ký.
- *"DeepSeek Harness dùng được ngay không?"* Mã nguồn mở trên GitHub (`deepseek-ai/deepseek-harness`). Ở đây nó là ví dụ về nguyên tắc audit trail, không phải khuyến nghị tool.
- *"Nhóm mình đang ở nấc nào?"* PR do agent viết có người đọc từng dòng không? Có thì L2. Test, lint, SAST tự chặn không? Có thì L3.

**Nguồn:** MindStudio (progressive autonomy, guardrails); DeepSeek Harness (GitHub `deepseek-ai/deepseek-harness`) + The New Stack.

---

### Slide 25 · NHAN — You are the one who signs.

**Trên slide:** *You are the one who signs.* `$ Speed is what AI gives for free. Quality is what you keep — and SOPs are how you keep it without slowing down.` *If you can't explain the line, it doesn't go in.*

**Nội dung**

Bạn là người ký. Ba trụ gói lại thành một câu: tốc độ là phần AI cho không; chất lượng là phần bạn phải tự giữ; SOP là cách giữ nó mà không phải chậm lại.

Câu để mang về, từ chính bài tập: nếu bạn không giải thích được dòng đó, nó không được vào. Đó là SOP ngắn nhất, và là bước một của mọi checklist hôm nay.

Kết thúc, hai người cùng nhận câu hỏi: câu về workflow và bài tập thì Hao, câu về security, docs, và tương lai thì Nhan.

---

## Q&A dự phòng

**Hao**
- *"Nên dùng tool nào: Copilot, Cursor, Claude Code?"* Chọn theo kiểu việc. Chat và autocomplete cho giải thích, thiết kế, một hàm; hỏng bằng cách bịa API. Agentic cho thay đổi nhiều file, refactor, vòng lặp test; hỏng bằng cách báo test xanh mà không assert gì. Quy trình hôm nay áp cho cả hai, chỉ khác chỗ cần nhìn khi review.
- *"AI viết commit message được không?"* Được nếu bạn đọc và sửa; message mô tả vì sao, không chỉ cái gì. Không AI trailer.
- *"Prompt tiếng Việt có kém hơn không?"* Chất lượng phụ thuộc context nhiều hơn ngôn ngữ. Thuật ngữ kỹ thuật giữ tiếng Anh, còn lại tiếng Việt vẫn ổn.
- *"Bài tập áp dụng cho ngôn ngữ khác được không?"* Được. Cốt lõi là spec khác code, và test sinh từ code không bắt được lệch. Chuyển hàm sang ngôn ngữ nào cũng giữ được bốn bug.

**Nhan**
- *"SAST có làm chậm CI không?"* Semgrep chạy vài giây đến vài phút tuỳ repo; chạy trên PR. Rẻ hơn nhiều so với một sự cố A01.
- *"AI reviewer có thay người được không?"* Bắt style và lỗi rõ tốt. Bốn thứ chỉ người ký: đúng, an toàn, đủ nhanh, test có nghĩa. Dùng nó làm lớp đầu, không phải lớp cuối.
- *"Regex email nào an toàn?"* Không có regex email đúng RFC mà vừa an toàn vừa đọc được. Kiểm tra có `@`, giới hạn độ dài, gửi mail xác nhận.
- *"ADR viết lúc nào?"* Khi có quyết định mà sáu tháng sau ai đó sẽ hỏi "tại sao lại làm thế". Một trang, kèm điều kiện hết hạn.
- *"Dark factory có thật chưa?"* Có tổ chức thử ở L4 và L5 cho quy trình hẹp. Điểm chính không phải nó phổ biến chưa, mà là kỷ luật kiểm chứng và trách nhiệm không mất khi lên nấc cao.

## Nguồn

- Willison — *Not all AI-assisted programming is vibe coding*; *Vibe engineering*; *How I use LLMs to write code*
- Anthropic — *Claude Code Best Practices*; *Effective Context Engineering for AI Agents*
- Harper Reed — *My LLM codegen workflow atm*
- promptingguide.ai; PostgreSQL docs — *Using EXPLAIN*
- Karpathy — *Intro to LLMs*; tweet vibe coding (2/2025); *Agentic Engineering* (3/2026)
- Veracode — *GenAI Code Security Report* 2025; Uplevel; GitHub Octoverse / Stack Overflow 2025
- Socket — *The Rise of Slopsquatting*; OWASP Top 10 (2021); vibe-eval — *OWASP Top 10 for AI code*
- regular-expressions.info — *Catastrophic Backtracking*; OWASP — *Regular expression Denial of Service*
- HackerNoon — *The Limits of LLM-Generated Unit Tests*; arXiv — *An Empirical Study of Unit Test Generation with LLMs*
- KnowledgeHut — *AI for code documentation*; Diátaxis (diataxis.fr); adr.github.io + Nygard template; Pragmatic Engineer — *Scaling via RFCs*
- Martin Fowler — *Evolutionary Database Design*
- Forbes / AI Incident Database — Samsung (5/2023)
- MindStudio — *What is a Dark Factory*; HackerNoon — *The Dark Factory Pattern*; DeepSeek Harness (`deepseek-ai/deepseek-harness`) + The New Stack
- Trong repo: `SLIDE-PLAN.md`, `README.md` (SOP-1 đến SOP-5), `legacy-rescue/SPEC.md`, `legacy-rescue/INSTRUCTOR.md`
