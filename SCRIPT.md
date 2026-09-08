# Kịch bản nội dung — Lecture 9: Vibe Coding SOPs (Nhân × Hào)

> Kịch bản cho deck 36 slide: 21 slide đầu như cũ, bỏ bài tập và checkpoint, khối Dark Factory 11 slide (23–33) theo đúng năm mục của bản tóm tắt: vấn đề, khung cấp độ, bốn giai đoạn, kiến trúc bốn lớp, rủi ro. Chữ trên slide tiếng Anh; nội dung nói tiếng Việt. Buổi nội bộ, vào thẳng chủ đề. Deck `index.html` đã khớp bản này.

## Phân vai

Thông điệp xuyên suốt: **AI làm việc gõ code rẻ đi. Hiểu, review, và đúng thì vẫn đắt như cũ. SOP là quy trình cho phần đắt đó.** Ba trụ nhắc ở mỗi phần: **Context · Verification · Ownership.**

| Phần | Slide | Người | Nội dung | Phút |
|---|---|---|---|---|
| 1 · SOPs | 1–21 | **Hào** | Mở đầu, foundations, ReAct, 7.1 workflow, agent patterns, 7.2 review và security, 7.3 docs, 7.4 khung SOP | 48 |
| 2 · Dark Factory | 22–36 | **Nhân** | Karpathy 2026, khối Dark Factory (vấn đề, cấp độ, bốn giai đoạn, kiến trúc, rủi ro), observability, discipline survives, close | 35 |

Tổng khoảng 83 phút giảng. Hai phần, hai người, **một lần trao mic** sau slide 21.

**Câu trao mic (sau slide 21, Hào → Nhân):** "Đến đây là toàn bộ SOP: cách đưa AI đúng context, cách kiểm chứng thứ nó viết, và ai ký tên. Câu hỏi còn lại: nếu đẩy tự động đến cùng, không còn ai đọc code, thì kỷ luật đó đi về đâu? Nhân sẽ dẫn phần Dark Factory."

Mỗi slide có bốn phần: **Trên slide**, **Nội dung**, **Nếu bị hỏi** (khi có), **Nguồn**.

## Thứ tự slide

| # | Slide | Người |
|---|---|---|
| 1–4 | Title · Mindset shift · Why this matters · Three pillars | Hào |
| 5–7 | Foundations · Hallucination · ReAct loop | Hào |
| 8–13 | 7.1: prompts · Postgres · context · big tasks · four patterns | Hào |
| 14–18 | 7.2: test rule · slopsquatting · OWASP · green but wrong | Hào |
| 19–20 | 7.3: docs · Diátaxis · ADR | Hào |
| 21 | 7.4 SOP frame | Hào |
| 22 | Karpathy 2026 (cầu nối) | Nhân |
| 23–28 | Dark factory: divider · 1 vấn đề · 2 cấp độ · 3 bốn giai đoạn · giai đoạn 1 · giai đoạn 2 spec | Nhân |
| 29–33 | Dark factory: giai đoạn 2 holdout · vai trò người và giai đoạn 3 · giai đoạn 4 · 4 kiến trúc · 5 rủi ro | Nhân |
| 34–36 | Observability · Why the discipline survives · Close | Nhân |

Nhịp bấm phím của 21 slide đầu và ba slide cuối giữ như `EFFECTS-PLAN.md`. Khối dark factory:

| Slide | Bấm | Thứ tự hiện |
|---|---|---|
| 24 | 6 | năm dòng bảng thời gian → caption |
| 25 | 6 | Level 1 → 2 → 3 → 3.5 → 4 (đỏ) → caption |
| 26 | 5 | Phase 1 → 2 → 3 → 4 → caption |
| 27 | 3 | AGENTS.md + progressive disclosure → build-before-push → linter before/after |
| 28 | 3 | feature spec → bug spec → "Do not assume the root cause" + caption |
| 29 | 4 | Spec → agent → PR → bức tường → holdout, evaluator, verdict + scenario → retry một dòng + caption |
| 30 | 4 | review results → bảng chỉ số dòng 1 → dòng 2, 3 + caption → maintenance agents |
| 31 | 4 | auto-merge everywhere → bot:fix → digital twins → caption |
| 32 | 5 | Inputs → Code generation → bức tường + Validation → Merge & deploy → caption |
| 33 | 5 | bốn rủi ro lần lượt → callout 1.9M |

---

## Phần 1 · HAO — Slide 1–21 · SOPs

### Slide 1 · HAO — Vibe Coding SOPs

**Trên slide:** tiêu đề trên nền một diff mờ trôi chậm; dòng thời lượng gõ ra với con trỏ nhấp nháy.

**Nội dung**

Chủ đề hôm nay: quy trình để ship code có AI tham gia, tức là code mà mình không hoàn toàn tự viết. SOP là standard operating procedure: một việc lặp lại, viết thành các bước cố định, để kết quả như nhau bất kể ai làm và làm lúc nào.

Một câu hỏi để vào bài: tuần này ai đã ship code do AI sinh ra, và trong số đó ai đã đọc từng dòng trước khi merge? Khoảng cách giữa hai con số là nội dung của buổi. Cấu trúc: khoảng tám mươi lăm phút, hỏi đáp xen giữa các phần.

---

### Slide 2 · HAO — Mindset shift

**Trên slide:** quote lớn; bên dưới hai hình người line-art: người gõ phím (bị gạch đỏ ở bước 1) → người cầm kính lúp soi diff (sáng teal).

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

**Trên slide:** ba donut: 45% đỏ, ~41% amber, và donut hai vòng lồng nhau 92% (nhạt) / 29% (đậm); bước 1 vòng hở giữa hai vòng nhấp sáng. Số đếm lên.

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

**Trên slide:** ba icon lớn brain / shield / pen với tên trụ và một dòng; hiện từng cái (spotlight); bước 4 HUD ba chấm C·V·O xuất hiện ở thanh dưới.

**Nội dung**

Mọi SOP hôm nay trả lời một trong ba câu hỏi.

**Context.** AI chỉ tốt bằng thứ bạn đưa vào. Nó không biết repo của bạn, convention của team, cái test đang fail, hay stack trace thật, trừ khi bạn đưa. Và context là tài nguyên hữu hạn, đầy lên thì chất lượng giảm, nên phải quản như quản RAM: chỉ nạp thứ cần, dọn thứ không cần.

**Verification.** Thứ gì không kiểm chứng được thì không ship. Bằng chứng là test chạy pass, build xanh, screenshot của màn hình thật. Không phải câu "đã xong" của model. Model không có khả năng tự biết mình sai, nên bằng chứng phải đến từ ngoài model.

**Ownership.** Bạn sở hữu từng dòng đã commit, kể cả dòng AI viết. Với reviewer, với production, với người debug lúc 2 giờ sáng, việc AI viết hay không là vô hình. AI cầm bút, không cầm quyền quyết.

Cách dùng ba trụ: khi nghe một quy tắc, hỏi nó thuộc trụ nào. Quy tắc không thuộc trụ nào thường là quy tắc không quan trọng. Ba trụ sẽ quay lại ở slide 5 dưới dạng khác: guardrail và audit trail cho agent.

---

### Slide 5 · HAO — Divider 01 · Foundations

**Trên slide:** divider 01, nền có mạng nút mờ.

**Nội dung**

Phần một, ngắn: vì sao AI sai. Hiểu LLM vận hành ra sao thì mọi SOP sau đều có lý do, thay vì là giáo điều. Ba ý ở slide sau là nền cho toàn bộ phần 7.1.

---

### Slide 6 · HAO — Hallucination is a property, not a bug

**Trên slide:** trái: sơ đồ dự đoán token (`the function returns a` với bốn ứng viên và thanh xác suất, Promise 0.42 được chọn) và thanh RAM 12 ô đầy dần teal→amber→red, nhãn "system prompt" mờ đi; bước 3 tách thành bốn thanh xanh. Phải: tiêu đề + ba dòng ngắn.

**Nội dung**

**Ý 1: model dự đoán token tiếp theo.** Toàn bộ việc LLM làm là: cho một chuỗi văn bản, chọn mảnh chữ tiếp theo có xác suất cao nhất, lặp lại. Nó được huấn luyện để tối ưu "câu chữ nghe hợp lý nhất" theo dữ liệu đã thấy, không phải "đúng nhất". Bên trong không có bộ kiểm-sự-thật, không có bước tra cứu, không có "tôi không chắc". Hệ quả: hallucination không phải bug hiếm gặp; nó là tính chất của cơ chế. Và model bịa vẫn nghe tự tin, vì trong dữ liệu huấn luyện, văn bản đúng thường được viết bằng giọng tự tin, nên giọng tự tin có xác suất cao. Độ tự tin của câu chữ không mang thông tin về độ đúng.

Ví dụ hay gặp: package không tồn tại nhưng tên nghe rất hợp lý; method đã bị xoá từ hai major version trước; config key gần đúng (sai một chữ, không fail lúc compile, fail âm thầm lúc runtime trên staging); trích dẫn tài liệu chưa bao giờ được viết.

**Ý 2: context window hữu hạn, và mục dần khi đầy lên.** Context window là toàn bộ thứ model "nhìn thấy" trong một lần gọi: system prompt, lịch sử hội thoại, file bạn dán, output lệnh, và cả câu nó đang viết. Nó có giới hạn, và quan trọng hơn: chất lượng giảm trước khi hết chỗ. Anthropic ghi rõ trong tài liệu: hiệu năng giảm khi context đầy, model bắt đầu quên chỉ dẫn ban đầu và mắc lỗi nhiều hơn. Lý do kỹ thuật: cơ chế attention so khớp mọi cặp token với nhau, chi phí bậc hai theo độ dài; context càng dài, "ngân sách attention" cho mỗi token càng loãng. Người ta gọi hiện tượng này là context rot.

**Ý 3: hệ quả thực hành.** Ném một file 10.000 dòng vào rồi hỏi, model quên phần đầu và bịa phần sau. Cách xử lý: chia nhỏ bài toán **trước** khi prompt, và quản context chủ động: chỉ nạp file liên quan, tóm tắt lịch sử dài, bắt đầu phiên mới cho task mới.

Câu chốt: context là tài nguyên bạn phải quản như RAM. Mọi SOP hôm nay thực ra là kỹ thuật quản lý một nguồn lực hữu hạn.

**Nếu bị hỏi**
- *"Model mới context một triệu token thì còn vấn đề không?"* Cửa sổ lớn hơn không có nghĩa dùng hết được với cùng chất lượng. Context rot là chất lượng giảm theo độ dài, không phải hết chỗ. Cửa sổ lớn cho phép nạp nhiều hơn, vẫn phải chọn lọc.
- *"RAG hay tool đọc file có giải quyết không?"* Có, đó là kỹ thuật just-in-time retrieval ở slide 11: nạp đúng thứ cần vào đúng lúc, thay vì nạp tất cả từ đầu.
- *"Temperature 0 có hết bịa không?"* Không. Temperature chỉ làm output ổn định hơn giữa các lần chạy; nó vẫn chọn token hợp lý nhất, không phải đúng nhất.

**Nguồn:** Karpathy — *Intro to LLMs*; Anthropic — *Effective Context Engineering for AI Agents*; IBM Research về context window.

---

### Slide 7 · HAO — How your agent actually works: the ReAct loop

**Trên slide:** trái: vòng tròn ReAct với ba nút Reason / Act / Observe (icon), cung mũi tên chạy theo bước, tâm ghi "until done"; bước 5 cổng "tool output · the only way in" vào Observe; bước 6 ba chip test/build/lint đi vào cổng. Phải: tiêu đề + caption.

**Nội dung**

Slide 6 vừa nói model chỉ dự đoán token, không có bộ kiểm-sự-thật. Vậy tại sao agentic tool vẫn sửa được bug thật, chạy được test thật? Vì tool bao quanh model bằng một vòng lặp, và vòng lặp đó có tên: ReAct, viết tắt của Reason + Act.

**Vòng lặp bốn bước:**
1. **Reason.** Model đọc mục tiêu và toàn bộ context hiện có, rồi viết ra suy nghĩ: mình cần biết gì tiếp theo. Ví dụ: "test đang fail ở `billing.test.js`, mình cần đọc `billing.js` trước".
2. **Act.** Model chọn một tool và gọi nó với tham số cụ thể: đọc file, tìm kiếm trong repo, chạy `node --test`, sửa một đoạn code. Tool là thứ deterministic bên ngoài model.
3. **Observe.** Kết quả thật của tool được nạp ngược vào context: nội dung file, output của test, lỗi của compiler. Đây là điểm duy nhất trong cả vòng lặp mà sự thật từ bên ngoài đi vào.
4. **Lặp lại** cho đến khi model kết luận đã xong, hoặc hết ngân sách bước.

Chat thường là một lần: prompt vào, câu trả lời ra, không có bước observe. Agentic là nhiều vòng, mỗi vòng có một lần quan sát thật. Đó là khác biệt cốt lõi giữa hai kiểu tool, và cũng là lý do chúng hỏng khác nhau: chat hỏng bằng cách bịa API vì không có gì để quan sát; agent hỏng bằng cách quan sát sai thứ, hoặc quan sát đúng nhưng kết luận sai.

**Ba hệ quả cho SOP:**
- **Agent chỉ đáng tin bằng những gì tool cho nó thấy.** Nếu repo không có test, bước observe chỉ có "file đã được ghi", và agent kết luận "xong" vì không có gì phủ định. Cho nó test, build, lint là thêm quan sát thật vào vòng lặp. Đây là lý do của câu "give the AI a check it can run" ở slide 12.
- **Bước Reason là chỗ nó tự tin sai.** Suy nghĩ của model vẫn là văn bản dự đoán; nó có thể "lý luận" rất trôi chảy để đi đến một tool call sai. Vì thế đọc log tool call quan trọng hơn đọc lời giải thích của agent.
- **Bước Act là chỗ phải giới hạn quyền.** Tool nào agent gọi được là quyết định của bạn, không phải của model: đọc file thì thoải mái, chạy test thì được, `git push` hay `rm -rf` hay cài package thì phải qua người. Slide 16 (slopsquatting) và slide 33 (xoá 1.9 triệu dòng) đều là hậu quả của bước Act không bị giới hạn.

**Nếu bị hỏi**
- *"Tool-using và ReAct khác gì nhau?"* Tool-using là khả năng gọi tool; ReAct là vòng lặp xen kẽ suy luận và gọi tool, nạp kết quả về rồi suy luận tiếp. Tool-using không có vòng lặp thì chỉ là một lần gọi API.
- *"Agent có thể tự sửa lỗi của chính nó không?"* Có, nếu bước observe cho nó thấy lỗi. Test fail là một quan sát; "code trông ổn" không phải. Không có test thì agent không có gì để tự sửa.
- *"Agentic tốn token hơn nhiều không?"* Có, mỗi vòng là một lần gọi model với toàn bộ context. Đó là lý do slide 11 nói quản context như RAM: context bẩn tốn tiền ở mọi vòng.

**Nguồn:** Yao et al. — *ReAct: Synergizing Reasoning and Acting in Language Models* (2022); Anthropic — *Building effective agents*; K. Vyas — *Agentic AI Design Pattern: ReAct* và *Tool-Using* (LinkedIn).

---

### Slide 8 · HAO — Divider 02 · 7.1 Workflow

**Trên slide:** divider 02, nền đường ống mờ; lede Prompt → Context → Iterate → Workflow hiện từng từ.

**Nội dung**

Phần 7.1, trái tim của bài. Bốn mục theo thứ tự nhân quả: viết prompt tốt (slide 9, 10), nuôi và dọn context (slide 11), vòng lặp tinh chỉnh và workflow cho task lớn (slide 12). Tất cả đều là hệ quả của slide 6: model chỉ có thứ bạn đưa, và thứ bạn đưa có giới hạn.

---

### Slide 9 · HAO — More specific = fewer corrections

**Trên slide:** hai cửa sổ chat: trái prompt mơ hồ và reply mờ có dấu "?" đỏ; phải prompt có phần thêm dạng diff `+` và reply có ✓; dưới cùng bốn icon thói quen.

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

### Slide 10 · HAO — Don't ask "write me the SQL"

**Trên slide:** trái: cây kế hoạch thực thi Result → Seq Scan on orders (đỏ, 50,000,000 rows · 9120 ms) rồi bị thay bằng Index Scan (xanh, 312 rows · 3.1 ms) → orders_user_id_idx. Phải: checklist năm mục có icon + caption "verify against the planner".

**Nội dung**

Ví dụ áp dụng cho một việc thật.

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

### Slide 11 · HAO — A long chat is not a badge of honor

**Trên slide:** trái: cửa sổ chat 8 bong bóng (hai bong bóng cuối viền đỏ fix #1, fix #2) và đồng hồ RAM 96%; bước 5 bong bóng sụp còn một, đồng hồ về xanh 4%. Phải: bốn kỹ thuật với icon sáng lần lượt + dòng `/clear`.

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

### Slide 12 · HAO — Big task? Make the AI interview you first

**Trên slide:** đường ray bốn ga Explore / Plan / Code / Commit có icon; ga Plan có thanh chắn amber và con dấu APPROVED (bước 2); ga Code có đèn giao thông, đèn xanh bật ở bước 6 kèm nhãn "a check it can run"; bước 7 mũi tên nét đứt "checkpoint · roll back" từ Commit về Code. Quote Harper Reed ở dưới.

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
- Thực thi từng bước theo plan. `todo.md` giữ trạng thái xuyên nhiều lần gọi model, đúng kỹ thuật note-taking ở slide 11.

**Cốt lõi khiến agentic tool thực sự chạy được một mình**: cho AI một cách tự kiểm. Test, build, lint, screenshot. Anthropic viết: cho model một check mà nó chạy được, đó là khác biệt giữa phiên bạn phải ngồi canh và phiên bạn có thể bỏ đi. Không có test, agent chỉ có thể **nói** là xong; nó không có cách nào biết mình xong thật.

Hai lưu ý cho vòng lặp tinh chỉnh: output đầu tiên hiếm khi là bản cuối, cứ yêu cầu refactor, đơn giản hoá, đổi tên. Và nhớ training cutoff: thư viện có breaking change sau thời điểm train thì phải dán doc mới vào, không thì model dùng API cũ một cách tự tin.

Câu chốt: task lớn thì spec trước, code sau. Spec là nơi bạn cầm lái.

**Nếu bị hỏi**
- *"Biết khi nào nên dừng và tự viết?"* Ba lần thất bại trên cùng một vấn đề là tín hiệu, không phải lời mời prompt mạnh hơn. Dấu hiệu: model lặp lại cùng ý sai, bạn dán error mà không đọc, diff phình mà test vẫn đỏ, bạn không giải thích được trạng thái hiện tại của code. Đóng tab, tự viết.

**Nguồn:** Anthropic — *Claude Code Best Practices*; Harper Reed — *My LLM codegen workflow atm*; Willison — *How I use LLMs to write code*.

---

### Slide 13 · HAO — Four agent patterns, and the SOP each one needs

**Trên slide:** lưới 2×2 bốn card, mỗi card một sơ đồ nhỏ (planner tree, ba agent → một người, ba lớp memory, bốn tool với install bị khoá đỏ) + tên + dòng ✗ hỏng khi (đỏ) + dòng ✓ vá bằng (xanh); hiện từng card (spotlight).

**Nội dung**

Bốn pattern mà mọi agentic coding tool hiện nay dùng, gọi đúng tên, và với mỗi pattern: nó làm gì, nó hỏng ở đâu, và bước SOP nào trong deck sinh ra để bịt chỗ hỏng đó.

**1. Planner / Executor.** Một vai lập kế hoạch: nhận mục tiêu lớn, chia thành các task có thứ tự và phụ thuộc, nói rõ mỗi task cần tool gì. Các vai thực thi: mỗi task một phạm vi hẹp, trả về kết quả có cấu trúc. Tách "làm gì" khỏi "làm thế nào", giống tổ chức tách chiến lược khỏi vận hành. Chỗ hỏng: plan sai thì mọi bước sau đều sai một cách nhất quán, và executor phạm vi rộng sẽ sửa cả thứ không được giao. SOP: đây chính là Explore → Plan → Code → Commit ở slide 12. Duyệt `spec.md` trước khi có dòng code nào, vì sửa plan rẻ hơn sửa code. Mỗi task nhỏ, một test một bước, để executor không có chỗ đi lạc. Trụ Context.

**2. Multi-agent collaboration.** Thay một agent to làm mọi việc bằng nhiều agent chuyên biệt, có lớp điều phối và lớp giám sát. Trong coding tool: sub-agent đi đọc hai mươi file rồi trả về tóm tắt, sub-agent tìm kiếm, sub-agent review. Chỗ hỏng: vai chồng lấn, không ai sở hữu kết quả cuối, và agent này tin lời agent kia như tin sự thật. SOP: Writer/Reviewer ở slide 15, một phiên viết, một phiên context sạch review. Sub-agent chỉ trả tóm tắt vào context chính (slide 11). Và kết quả cuối luôn có đúng một người ký. Trụ Ownership.

**3. Memory-augmented.** Ba loại bộ nhớ: ngắn hạn là context của phiên và trạng thái task; dài hạn là thứ sống qua nhiều phiên, trong coding tool là `CLAUDE.md`, `AGENTS.md`, `todo.md`; có cấu trúc là repo, lockfile, DB, những nguồn sự thật có thẩm quyền. Chỗ hỏng: bộ nhớ cũ hoặc sai làm agent lặp lại đúng một lỗi ở mọi phiên, và ai cũng tưởng đó là "quy ước". Bài gốc có câu đáng giữ: agent nhớ được thì phải chịu trách nhiệm được, tức bộ nhớ cũng cần người quản. SOP: giữ `CLAUDE.md` ngắn và đúng, mỗi dòng tự hỏi "bỏ đi AI có sai không", và sửa ngay khi nó sai. `/clear` khi context bẩn (slide 11). Trụ Context.

**4. Tool-using.** Agent chọn và gọi tool: đọc, tìm, chạy lệnh, sửa file, cài package, commit, push. Bài gốc nêu bốn điều kiện: tool phải deterministic và định nghĩa rõ; quyền truy cập được kiểm soát; output có cấu trúc; thao tác nhạy cảm phải qua lớp duyệt. Chỗ hỏng: quyền ghi sai và package sai, hai sự cố đã có trong deck (slopsquatting ở slide 16, xoá 1.9 triệu dòng ở slide 33). SOP: quyền tối thiểu cho từng tool; đọc và chạy test thì tự do, cài package, push, chạm production thì qua người. Trụ Verification và Ownership.

Câu chốt: bốn pattern không phải lý thuyết để nhớ. Chúng giải thích vì sao checklist ở slide 21 có đúng những bước đó, và vì sao bỏ một bước là mở lại đúng một chỗ hỏng.

**Nếu bị hỏi**
- *"Tool nào dùng pattern nào?"* Gần như tool nào cũng dùng cả bốn ở mức độ khác nhau; plan mode là Planner/Executor, sub-agent là multi-agent, file quy ước là memory, mọi thứ còn lại là tool-using. Tên gọi trong tool khác nhau, cơ chế giống nhau.
- *"Có nên tự xây multi-agent cho team không?"* Câu hỏi khác bài này. Bài này về dùng tool có sẵn cho đúng; xây agent là chủ đề riêng với chi phí và rủi ro riêng.

**Nguồn:** K. Vyas — *Planner/Executor*, *Multi-Agent Collaboration*, *Memory-Augmented Agent*, *Tool-Using* (LinkedIn); Anthropic — *Building effective agents*, *Claude Code Best Practices*.


---

### Slide 14 · HAO — Divider 03 · 7.2 Review

**Trên slide:** divider 03, nền kính lúp soi diff mờ.

**Nội dung**

Phần 7.2: code review. Review code AI khác review code người: code người viết có hình dạng trong đầu người viết, reviewer chỉ cần kiểm lại. Code AI không có hình dạng trong đầu ai; review phải dựng hình dạng đó từ đầu. Chậm hơn, không nhanh hơn. Bốn trục, và bốn trục này chỉ con người ký được: đúng, an toàn, đủ nhanh, test có nghĩa. Mỗi trục một SOP.

---

### Slide 15 · HAO — "You have to test what it writes."

**Trên slide:** quote gõ ra; dưới là hai pane: trái cửa sổ chat agent nói "Done ✅ all tests pass", phải terminal `node --test` in ✖ 2 failed; bước 2 ba con dấu test output / command it ran / screenshot.

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

### Slide 16 · HAO — When hallucination becomes a supply-chain attack

**Trên slide:** trái: chuỗi tấn công bốn nút LLM suggests → doesn't exist (?) → attacker squats it (skull trong registry) → npm install (đỏ, rung ở bước 4). Phải: hai số lớn 19.7% và 58% đếm lên. Caption SOP.

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

### Slide 17 · HAO — What AI generates → OWASP Top 10

**Trên slide:** lưới 10 ô A01…A10, năm ô AI hay dính sáng lên theo bước (đỏ High, amber Med) với icon và 4 từ; bước 6 tấm lưới SAST hạ xuống phủ lưới.

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

### Slide 18 · HAO — Two places AI is "green but wrong"

**Trên slide:** trái: sơ đồ N+1 (orders (100) tỏa 13 đường xuống users, nhãn "101 queries · 1 + N") và ba icon mùi còn lại sáng amber theo bước; phải: donut coverage 95% xanh với "0 rules verified" đỏ và dòng `expect(spy).toHaveBeenCalled()`. Badge "✓ 4 passed · on 10 rows" cố định góc phải trên, "green" trong tiêu đề đổi đỏ ở bước 7.

**Nội dung**

Hai chỗ code AI xanh mà sai: test pass, CI xanh, và vẫn hỏng ở production.

**Performance, bốn mùi:**
1. **N+1 query**: lấy danh sách 100 đơn hàng, rồi trong vòng lặp gọi thêm một query lấy user của từng đơn. 101 query thay vì 2. Code trông sạch, mỗi dòng đều hợp lý.
2. **Thiếu index**: thêm điều kiện `WHERE status = ?` trên cột mới mà không ai tạo index. Trên bảng 10 dòng không khác gì; trên 50 triệu dòng là full scan.
3. **Unbounded fetch**: `findAll()` hoặc `SELECT *` không `LIMIT` trên bảng đã lớn. Chạy ổn hai năm, rồi một ngày bảng đủ lớn để làm hết memory.
4. **O(n²) vô tình**: `items.filter(x => other.includes(x))`, `includes` lồng trong vòng lặp trên hai list. Mỗi list 10 phần tử thì 100 phép so; mỗi list 10 nghìn thì 100 triệu.

Cả bốn pass mọi unit test, vì unit test chạy trên dữ liệu nhỏ. Cả bốn ổn trên mười dòng. Chúng chỉ lộ ở production, lúc đắt nhất. Không tài liệu nào dạy hay bằng hai ba ví dụ thật từ codebase của team. SOP: yêu cầu AI kèm phân tích độ phức tạp khi sinh code xử lý danh sách hoặc query; với DB, xem `EXPLAIN ANALYZE` như slide 10; review bằng mắt tìm vòng lặp có I/O bên trong.

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

### Slide 19 · HAO — Divider 04 · 7.3 Docs

**Trên slide:** divider 04, nền sách mở mờ.

**Nội dung**

Phần 7.3, documentation, một slide. Nguyên tắc: cho AI cầm bút, không cho AI cầm quyền quyết. Ba việc: docs từ code, API docs theo Diátaxis, và ADR.

---

### Slide 20 · HAO — AI drafts; a human reviews and decides

**Trên slide:** trái: dòng `code → docs` an toàn / `prose → code` drift, rồi lưới Diátaxis 2×2 (trục learning↔doing, practical↔theoretical) với Tutorial / How-to / Explanation / Reference. Phải: tờ ADR-014 năm dòng, con dấu "DRAFTED BY AI" mờ, bước 4 con dấu "DECIDED BY: ____" teal.

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


---

### Slide 21 · HAO — Divider 05 · SOPs for common tasks

**Trên slide:** divider 05, nền checklist mờ; tấm giấy kẻ dòng bốn ô tick lần lượt (chấm C/V/V/O), dòng cuối "signed: ____ · new service · migration · endpoint · integration test".

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

**Handoff → Nhân (lần duy nhất):** "Đến đây là toàn bộ SOP: cách đưa AI đúng context, cách kiểm chứng thứ nó viết, và ai ký tên. Câu hỏi còn lại: nếu đẩy tự động đến cùng, không còn ai đọc code, thì kỷ luật đó đi về đâu? Nhân sẽ dẫn phần Dark Factory."

---

## Phần 2 · NHAN — Slide 22–36 · Dark Factory

### Slide 22 · NHAN — Even Karpathy retired "vibe coding"

**Trên slide:** trái: dòng thời gian, thẻ "vibe coding · Feb 2025" bị gạch đỏ và mờ ở bước 1, thẻ "Agentic Engineering · Mar 2026" sáng teal, đường kéo dài mờ dần tới dấu "?". Phải: tiêu đề, lede, caption "→ the dark factory." gõ ra; nền tối dần.

**Nội dung**

Ba slide cuối nhìn về phía trước.

Karpathy đặt tên "vibe coding" tháng 2/2025: giao phó cho cảm giác, quên code đi. Tháng 3/2026, chính ông khai tử nó và chuyển sang "Agentic Engineering": developer là người giám sát, điều phối các agent tự chạy nhiều bước, và giám sát còn chặt hơn, không lỏng hơn, vì agent làm nhiều việc hơn giữa hai lần người nhìn vào. Người khai sinh thuật ngữ cũng đã nâng cấp nó theo đúng hướng bài hôm nay: từ "quên code đi" sang "quy trình có giám sát".

Cây cầu sang slide sau: nếu mức tự động cứ tăng, agent làm nhiều hơn, người nhìn ít hơn, thì điểm cuối của con đường là gì? Có tên cho nó: dark factory.

**Nguồn:** Karpathy — *Agentic Engineering* (2026); Buttondown — *The end of vibe coding*.

---

### Slide 23 · NHAN — Divider · The Dark Factory

**Trên slide:** 06 · Part two · **THE DARK FACTORY** (tiêu đề lớn) · *When no human writes, reviews, or tests the code.* Humans write specs and acceptance criteria. Automated systems do the rest.

**Nội dung**

Mô hình Dark Factory, nhà máy tối, là một triết lý thiết kế quy trình phát triển phần mềm mà ở đó không có con người tham gia viết code, review code hay kiểm thử thủ công. Con người chỉ đóng vai trò viết đặc tả hệ thống, tức specs, và tiêu chí nghiệm thu; toàn bộ phần việc còn lại do các hệ thống tự động thực hiện.

Khối này đi qua năm mục: vấn đề thực tế của việc áp dụng AI hiện nay, khung cấp độ tự động hoá, lộ trình bốn giai đoạn, kiến trúc bốn lớp, và các rủi ro kèm giải pháp.

**Nguồn:** Bản tóm tắt Dark Factory; StrongDM *The Software Factory*; OpenAI *Harness Engineering*.

---

### Slide 24 · NHAN — 1 · The problem with AI adoption today

**Trên slide:** Headline **Faster typing only moves the bottleneck downstream** · bảng: waiting for human review 2–8 h · review back-and-forth 30–90 min · manual testing on localhost 30–60 min · investigating production bugs 30 min–2 h · writing boilerplate hours · caption: already Level 2, tracked two weeks, still this.

**Nội dung**

Vấn đề thực tế của việc áp dụng AI hiện nay. Nút thắt cổ chai bị dịch chuyển: nhiều tổ chức đang ăn mừng quá sớm khi trang bị các công cụ AI hỗ trợ viết code như Cursor, Copilot, Cody giúp lập trình viên gõ code nhanh hơn. Tuy nhiên, tốc độ viết code nhanh hơn chỉ đẩy nút thắt cổ chai xuống các khâu tiếp theo: lập trình viên vẫn phải chờ review code hàng giờ liền, thường chỉ mang tính thủ tục hoặc bắt lỗi phong cách thiết kế, và mất nhiều thời gian kiểm thử thủ công trên localhost.

Thực trạng lãng phí thời gian: qua khảo sát thời gian làm việc thực tế của một đội kỹ sư, phần lớn thời gian bị lãng phí vào các khâu phi sản xuất. Chờ review PR hai đến tám giờ. Trao đổi qua lại về PR ba mươi đến chín mươi phút. Kiểm thử thủ công ba mươi đến sáu mươi phút. Điều tra bug production có khi hai giờ để sửa năm dòng. Viết boilerplate hàng giờ mà không tạo giá trị.

Kết luận: mới tự động hoá được việc gõ, và chỉ việc gõ. Nút thắt không biến mất, nó chuyển xuống khâu review và kiểm thử.

**Nguồn:** Bản tóm tắt, mục 1.

---

### Slide 25 · NHAN — 2 · Autonomy levels

**Trên slide:** Headline **Five levels, borrowed from self-driving cars** · Level 1 autocomplete · Level 2 whole files, you review every change (you are here) · Level 3 spec → code, holdout scenarios gate, you approve merge · Level 3.5 some services auto-merge · Level 4 full dark factory · caption: most teams at Level 2.

**Nội dung**

Khung cấp độ tự động hoá, lấy cảm hứng từ xe tự lái, để định vị một tổ chức đang ở đâu.

Cấp độ một: AI tự động hoàn thành câu lệnh của bạn, con người làm mọi thứ khác. Cấp độ hai: AI viết toàn bộ hàm hoặc file, con người review từng thay đổi nhỏ; hầu hết các đội ngũ hiện nay đang dừng ở đây. Cấp độ ba: AI tạo code từ các bản đặc tả, các kịch bản holdout đóng vai trò kiểm soát chất lượng, con người phê duyệt lượt merge. Cấp độ ba rưỡi: tương tự cấp ba, nhưng một số dịch vụ tự động merge mà không cần con người. Cấp độ bốn, Full Dark Factory: đặc tả đi vào, mã nguồn đã qua kiểm thử tự động được merge ra, quy trình CI/CD sẵn có tự động deploy.

Khoảng cách khó nhất là từ cấp hai lên cấp ba, vì đó là lúc phải thay người đọc code bằng máy kiểm chứng.

**Nguồn:** Bản tóm tắt, mục 2.

---

### Slide 26 · NHAN — 3 · Phased rollout

**Trên slide:** Headline **Four phases. Each one pays off on its own.** · Phase 1 context optimization · Phase 2 spec-driven + holdout · Phase 3 remove the human gate · Phase 4 full dark factory · caption: nothing downstream of merge changes.

**Nội dung**

Quy trình triển khai bốn giai đoạn. Mỗi giai đoạn đều tự mang lại giá trị độc lập ngay lập tức mà không cần đợi hoàn thành toàn bộ dự án. Giai đoạn một: tối ưu hoá ngữ cảnh cho agent. Giai đoạn hai: phát triển hướng đặc tả với kịch bản holdout. Giai đoạn ba: loại bỏ cổng kiểm soát của con người. Giai đoạn bốn: đạt trạng thái Dark Factory toàn phần. Toàn bộ lộ trình không đụng đến pipeline deploy sẵn có; nó chỉ thay người viết code và người review code.

**Nguồn:** Bản tóm tắt, mục 3.

---

### Slide 27 · NHAN — Phase 1 · Context optimization

**Trên slide:** Headline **Give the agent the right context, not more context** · AGENTS.md mẫu ~100 dòng · card progressive-disclosure docs · card build-before-push · card linters that talk to agents với before/after: ✗ "Service layer depends on controller layer." ✓ "Move the shared type to the model package."

**Nội dung**

Giai đoạn một: tối ưu hoá ngữ cảnh cho agent. Ba việc.

Tài liệu hiển thị thông tin luỹ tiến, progressive disclosure: tạo file AGENTS.md khoảng một trăm dòng làm bản đồ chỉ dẫn tổng quan về cấu trúc dịch vụ, kiến trúc, quy luật code; kết hợp với thư mục docs chứa tài liệu chi tiết về auth, testing, API để agent truy xuất khi cần thiết. Cách tiếp cận này giúp tránh quá tải thông tin cho AI. Nhìn ví dụ bên trái: phần làm gì, kiến trúc, pattern chính, bản đồ thư mục.

Quy tắc build-before-push: ép buộc agent phải tự chạy build và bộ test cục bộ trước khi push code.

Linter hướng dẫn hành động: viết các thông báo lỗi linter dưới dạng chỉ dẫn giải quyết thay vì chỉ mô tả lỗi. Thay vì báo lỗi cấu trúc, linter chỉ rõ: hãy di chuyển type dùng chung sang gói model. Với chỉ dẫn cụ thể, agent sửa đúng ngay lần đầu.

**Nguồn:** Bản tóm tắt, mục 3, giai đoạn 1; OpenAI *Harness Engineering*.

---

### Slide 28 · NHAN — Phase 2 · Spec-driven development

**Trên slide:** Headline **Specs in Markdown: features describe requirements, bugs describe symptoms** · feature spec (goal, requirements, constraints) · bug spec (symptom, expected, "Do not assume the root cause. Investigate the codebase.").

**Nội dung**

Giai đoạn hai: phát triển hướng đặc tả. Đặc tả dạng Markdown. Lập trình viên viết đặc tả tính năng mới, feature spec, mô tả yêu cầu và ràng buộc; hoặc lỗi cần sửa, bug spec, chỉ mô tả triệu chứng để agent tự tìm nguyên nhân gốc rễ.

Bug spec bên phải không nói tôi nghĩ thiếu null check ở dòng bốn mươi bảy. Nó nói endpoint trả năm trăm khi supplier rỗng, đáng lẽ phải trả bốn trăm với lỗi validation, và dòng cuối: đừng giả định nguyên nhân, hãy điều tra codebase. Vì spec là thứ duy nhất máy nhận, chất lượng spec quyết định chất lượng code.


**Nguồn:** Bản tóm tắt, mục 3, giai đoạn 2.

---

### Slide 29 · NHAN — Phase 2 · Holdout scenarios, the core of the system

**Trên slide:** Headline **The coding agent never sees the acceptance tests.** · hình bức tường: Spec → coding agent → PR ‖ THE WALL ‖ holdout scenarios → LLM evaluator → satisfied? 3× 2 of 3 · scenario mẫu SQL Injection Detection · caption: 3 runs, 90% gate, one line on retry, no glue code.

**Nội dung**

Kịch bản holdout, cốt lõi của hệ thống. Đây là các bài kiểm thử chấp nhận viết bằng tiếng Anh tự nhiên theo định dạng BDD, và được lưu trong thư mục cách ly mà agent viết code không thể truy cập.

Một bộ đánh giá độc lập sử dụng LLM để lập kế hoạch thực hiện các cuộc gọi API kiểm thử trên một môi trường triển khai tạm thời, ephemeral deployment, và đánh giá phản hồi. Nhìn ví dụ: gửi câu SQL có DROP TABLE vào endpoint kiểm tra, kết quả phải là không hợp lệ, và lỗi phải nhắc đến câu lệnh bị cấm.

Kịch bản chạy ba lần, đạt tối thiểu hai trên ba để tính là pass nhằm khử tính bất định của LLM, và tổng tỷ lệ pass phải trên chín mươi phần trăm để vượt qua cổng chất lượng. Agent thi trượt chỉ nhận một dòng thông báo, không bao giờ thấy nội dung kịch bản, nên không thể học vẹt bộ đề.

Cách này giải quyết triệt để vấn đề mục nát glue code của các công cụ kiểm thử BDD truyền thống như Cucumber: không có step definition, bộ đánh giá tự thích ứng khi API đổi, bạn chỉ bảo trì văn bản tiếng Anh.

**Nguồn:** Bản tóm tắt, mục 3, giai đoạn 2; StrongDM.

---

### Slide 30 · NHAN — Phase 2 · The human role → Phase 3 · Removing the human gate

**Trên slide:** Headline **Review the report, not the code. Then let the numbers open the gate.** · card Phase 2 review results not code, five minutes not two hours · bảng ba chỉ số: pass rate > 90% (20 PR gần nhất), false positives < 5%, human override < 10% · card maintenance agents.

**Nội dung**

Vai trò con người ở giai đoạn hai: không đọc code từng dòng nữa mà chuyển sang xem xét báo cáo kết quả của các kịch bản kiểm thử, mất khoảng năm phút thay vì hai giờ.

Giai đoạn ba: loại bỏ cổng kiểm soát của con người. Áp dụng tự động merge cho một số dịch vụ đạt chỉ số an toàn: tỷ lệ pass kịch bản trên chín mươi phần trăm trong hai mươi PR gần nhất, tỷ lệ báo lỗi giả dưới năm phần trăm, và tỷ lệ con người ghi đè hoặc từ chối dưới mười phần trăm. Thay đổi thật sự chỉ là một dòng cấu hình, và ai trong team vẫn chặn được trước khi merge.

Kèm theo là Quality Maintenance Agents, agent bảo trì chất lượng, chạy ngầm hằng tuần để quét code trôi dạt, cập nhật tài liệu lỗi thời và tinh chỉnh các bất nhất trong mã nguồn tự động sinh ra.

**Nguồn:** Bản tóm tắt, mục 3, giai đoạn 2 và 3.

---

### Slide 31 · NHAN — Phase 4 · Full dark factory

**Trên slide:** Headline **Specs in. Tested code merged out. Your pipeline deploys it.** · ba card: auto-merge everywhere · issue tracker → specs (bot:fix, dashboards) · digital twins · caption: nothing downstream of merge changes.

**Nội dung**

Giai đoạn bốn: đạt trạng thái Dark Factory toàn phần. Mở rộng tự động merge cho mọi dịch vụ đạt chỉ số. Đồng bộ hoá với hệ thống quản lý task như Jira hay Trello: các thẻ dán nhãn bot fix sẽ tự động kích hoạt tạo spec và chạy qua pipeline. Xây dựng Digital Twins, máy chủ ảo hay mock server giả lập các dịch vụ bên ngoài, để giảm chi phí và độ trễ khi chạy kiểm thử kịch bản; chỉ xây khi cần, bắt đầu từ dịch vụ gây phiền nhất.

Trạng thái cuối: kỹ sư viết spec và kịch bản, hệ thống làm phần còn lại. Mọi thứ sau merge vẫn đi qua pipeline CI/CD cũ.

**Nguồn:** Bản tóm tắt, mục 3, giai đoạn 4.

---

### Slide 32 · NHAN — 4 · Four-layer architecture

**Trên slide:** Headline **Four layers. The boundaries matter more than the guts.** · Inputs (humans): specs, holdout scenarios, AGENTS.md, linter rules · Code generation (autonomous) · THE WALL · Validation (autonomous, isolated) · Merge & deploy (autonomous + your infra) · caption: code generation and validation must be completely isolated.

**Nội dung**

Kiến trúc bốn lớp của hệ thống. Lớp Inputs, con người sở hữu: đặc tả, kịch bản holdout, tài liệu AGENTS.md, luật linter. Lớp Code Generation, tự động: agent đọc spec cộng ngữ cảnh repo, tự sinh mã, build, test tại chỗ, tự review và mở PR. Lớp Validation, tự động và cách ly: chạy CI truyền thống, sau đó bộ đánh giá kịch bản chạy thử trên môi trường tạm thời. Lớp Merge và Deploy, tự động cộng infra sẵn có: tự động merge vào nhánh chính và kích hoạt pipeline CI/CD hiện có để deploy.

Lưu ý cực kỳ quan trọng: lớp Code Generation và lớp Validation phải được cách ly hoàn toàn để tránh tình trạng agent gian lận hoặc học vẹt bộ đề thi. Không có bức tường đó thì không có cổng chất lượng.

**Nguồn:** Bản tóm tắt, mục 4.

---

### Slide 33 · NHAN — 5 · Risks and mitigations

**Trên slide:** Headline **Four things that go wrong, and what catches each** · evaluator approves broken code → 3 runs, 90% gate, audit first 50 PRs, CI/CD still runs · engineers resist → shift the role up to product engineering · API costs → hard cap 3 retries, token alerts · scenarios go stale → LLM evaluation adapts, weekly maintenance · callout 1.9 million rows.

**Nội dung**

Các rủi ro tiềm ẩn và giải pháp. Bộ đánh giá duyệt nhầm code lỗi: giảm thiểu bằng cách chạy kịch bản ba lần, duy trì cổng pass chín mươi phần trăm, kiểm toán thủ công năm mươi PR đầu tiên, và giữ nguyên bộ CI/CD truyền thống chạy sau merge.

Kháng cự từ đội ngũ kỹ sư: kỹ sư thường gắn bản sắc cá nhân với việc trực tiếp viết code. Giải pháp là chuyển dịch vai trò của họ sang việc định nghĩa sản phẩm và kiểm soát chất lượng, kỹ thuật sản phẩm cao cấp hơn.

Chi phí API tăng cao: giới hạn cứng tối đa ba lần thử lại cho mỗi bản đặc tả và thiết lập giám sát token kèm cảnh báo.

Kịch bản kiểm thử bị lỗi thời: đánh giá bằng LLM tự động thích ứng với thay đổi cấu trúc API mà không cần bảo trì glue code, kết hợp bảo trì hằng tuần bởi agent chuyên trách.

Và một sự cố để nhớ: một agent có quyền ghi sai đã xoá một phẩy chín triệu dòng production. Dù tự động đến đâu, người cấp quyền vẫn sở hữu sự cố. Đó là lý do slide sau nói về việc nhìn thấy agent đang làm gì.

**Nguồn:** Bản tóm tắt, mục 5.

---

### Slide 34 · NHAN — If you can't observe it, you can't trust it

**Trên slide:** dashboard: ba ô stat có sparkline (latency 2.1s, tokens 38k, escalations 3/day amber), dòng log, waterfall trace (edit được "approved · nhan@", npm install ⛔ blocked), chuỗi log append-only có ổ khoá; caption ba nhóm metric sáng lần lượt. Đèn bật lại khi vào slide.

**Nội dung**

Khối dark factory vừa để lại câu hỏi: nếu agent tự chạy không ai xem, làm sao biết nó đã làm gì. Câu trả lời có ba lớp, và ba lớp này là điều kiện để bất kỳ nấc nào từ L3 trở lên tồn tại được.

**Logging.** Ghi có cấu trúc từng hành động của agent: request đến, tool nó chọn, tham số nó truyền, kết quả trả về, exception nếu có. Mỗi bản ghi có trace id và timestamp. Trong coding agent: mỗi lần đọc file, mỗi lệnh shell, mỗi lần sửa file là một dòng log, không phải một câu tóm tắt do model tự viết. Log do hệ thống ghi thì đáng tin; "báo cáo" do model viết thì không, vì nó cũng là văn bản dự đoán.

**Tracing.** Nối các log rời thành một đường thực thi: agent đã suy luận bước gì, gọi tool gì, theo thứ tự nào, mỗi bước mất bao lâu. Đây là thứ cho phép trả lời "vì sao nó xoá file đó" bằng cách lần ngược từ hành động về quan sát và suy luận trước đó, thay vì hỏi lại model và nhận một lời giải thích bịa sau sự việc. Tracing cũng cho thấy chỗ tốn thời gian và token, để tối ưu.

**Audit trail.** Bản ghi chống sửa, có kiểm soát truy cập, trả lời ba câu của trách nhiệm: quyết định gì đã được đưa ra, dữ liệu nào đã được đọc, có người duyệt hay không và là ai. Khác log ở chỗ log để debug, audit để chịu trách nhiệm; audit phải append-only, không ai kể cả agent xoá được.

**Ba nhóm metric cần theo dõi**, ngoài "đúng hay sai": vận hành (latency, token tiêu thụ), tin cậy (tỷ lệ fail, tỷ lệ phải escalate lên người), governance (số lần chạm dữ liệu nhạy cảm, số lần vi phạm policy). Tỷ lệ escalate đặc biệt đáng xem: nó là con số nói thẳng agent đang ở nấc nào của thang tự động.

**Stack** phổ biến và mã nguồn mở: OpenTelemetry để sinh log và trace theo chuẩn, Jaeger để xem trace, Prometheus để gom metric, Grafana để nhìn. Đây là cùng stack team backend đã dùng cho service; agent chỉ là một service nữa cần được quan sát.

Nguyên tắc: observability phải là lớp thiết kế từ đầu, không phải monitoring gắn thêm sau khi có sự cố. Câu bài gốc: nếu bạn không quan sát được hành vi của agent, bạn không thể tin nó.

Nối sang slide 5: DeepSeek Harness với session log append-only là một hiện thân cụ thể của lớp audit này. Và nhìn về đầu buổi: đây là trụ Ownership chuyển từ "người ký tên trên PR" thành "hệ thống ghi lại ai đã làm gì, không xoá được".

**Nếu bị hỏi**
- *"Coding tool hiện tại có log kiểu này không?"* Hầu hết ghi lại lịch sử phiên và tool call ở mức cơ bản. Trace id, metric, audit chống sửa thì chưa phải chuẩn; đó là khoảng cách giữa tool cá nhân và agent chạy trong tổ chức.
- *"Log của agent có chứa dữ liệu nhạy cảm không?"* Có thể, vì context có thể chứa secret hoặc dữ liệu khách hàng. Nên audit trail cần kiểm soát truy cập và chính sách lưu trữ, đúng như bài gốc nêu ở phần memory: nhớ được thì phải chịu trách nhiệm được.

**Nguồn:** K. Vyas — *Observability in Agentic AI: Logging, Tracing, Audit Trails* (LinkedIn); OpenTelemetry docs; slide 5 (DeepSeek Harness).

---

### Slide 35 · NHAN — Full autonomy doesn't remove humans — it changes their shape

**Trên slide:** trái: cầu thang bốn bậc read-only → write-to-branch → staging → production, ba ổ khoá mở xanh, bậc cuối ổ khoá amber và hình người "a human holds the lever"; phải: Earned trust, Append-only log với dãy khối #1…#4 nối thêm. Caption peak; hàng ba icon trụ sáng cả ba ở bước 3, HUD sáng cả ba.

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

### Slide 36 · NHAN — You are the one who signs.

**Trên slide:** tiêu đề; dòng terminal `$` gõ ra; bước 2 nét bút vẽ chữ ký trên dòng "signed by" và câu cuối.

**Nội dung**

Bạn là người ký. Ba trụ gói lại thành một câu: tốc độ là phần AI cho không; chất lượng là phần bạn phải tự giữ; SOP là cách giữ nó mà không phải chậm lại.

Câu để mang về: nếu bạn không giải thích được dòng đó, nó không được vào. Đó là SOP ngắn nhất, và là bước một của mọi checklist hôm nay.

Kết thúc, hai người cùng nhận câu hỏi: phần SOP thì Hào, phần Dark Factory thì Nhân.

---

## Q&A dự phòng

**Hao**
- *"Nên dùng tool nào: Copilot, Cursor, Claude Code?"* Chọn theo kiểu việc. Chat và autocomplete cho giải thích, thiết kế, một hàm; hỏng bằng cách bịa API. Agentic cho thay đổi nhiều file, refactor, vòng lặp test; hỏng bằng cách báo test xanh mà không assert gì. Quy trình hôm nay áp cho cả hai, chỉ khác chỗ cần nhìn khi review.
- *"AI viết commit message được không?"* Được nếu bạn đọc và sửa; message mô tả vì sao, không chỉ cái gì. Không AI trailer.
- *"Prompt tiếng Việt có kém hơn không?"* Chất lượng phụ thuộc context nhiều hơn ngôn ngữ. Thuật ngữ kỹ thuật giữ tiếng Anh, còn lại tiếng Việt vẫn ổn.

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
