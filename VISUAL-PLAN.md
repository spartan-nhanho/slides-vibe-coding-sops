# Kế hoạch hình ảnh — mỗi slide một hình, chữ là phụ

> Bản này thay góc nhìn của `EFFECTS-PLAN.md`: ở đó là "chữ hiện thế nào", ở đây là "**thay chữ bằng gì**". Nguyên tắc: người nghe nhìn hình, người nói cung cấp chữ. Mọi hình là SVG hoặc CSS viết tay trong `index.html`, không ảnh ngoài, không thư viện, để deck vẫn chạy offline và in PDF được. Các hiệu ứng theo bước đã làm vẫn giữ, chỉ đổi thứ được hiện ra.

---

## 0. Ngôn ngữ hình ảnh chung

**Ngân sách chữ:** mỗi slide tối đa **một tiêu đề + 25 từ** ngoài hình. Chữ giải thích chuyển hết xuống speaker notes (đã có trong `SCRIPT.md`). Bảng và bullet chỉ còn ở hai slide (13, 17) và cũng được rút gọn.

**Phong cách minh hoạ:** line-art nét đơn 1.5 px, không tô đặc, màu nét là `--muted`, điểm nhấn duy nhất bằng `--accent` có glow nhẹ, đỏ và amber chỉ cho rủi ro. Nhìn như sơ đồ trên màn hình console, không phải clipart.

**Ba khuôn bố cục dùng lại:**
- **Hình trái, chữ phải** (40/60): sơ đồ SVG bên trái, tiêu đề và một dòng bên phải. Dùng cho 6, 7, 10, 11, 16, 24.
- **Hình toàn khung**: sơ đồ chiếm giữa slide, tiêu đề nhỏ phía trên, caption mono phía dưới. Dùng cho 13, 20, 25, 26, 27.
- **Bộ ba**: ba khối ngang có icon lớn. Dùng cho 3, 4, 15, 18, 23.

**Bộ icon** (một file SVG sprite `assets/icons.svg`, dùng qua `<use>`): brain-chip, database, magnifier, shield-check, pen-signature, terminal, loop, tool-wrench, package-box, skull, lock, eye, book, checklist, person, factory, clock, git-branch. Khoảng 18 icon, mỗi cái 24×24, vẽ tay.

---

## 1. Từng slide

### Slide 1 · Title

- **Hiện tại:** chữ trên nền trơn.
- **Hình:** nền là một **diff khổng lồ mờ** (SVG): 14 dòng ngang, vài dòng xanh `+`, vài dòng đỏ `-`, opacity 0.08, trôi chậm lên trên (60 giây một vòng, gần như không thấy chuyển động). Tiêu đề đè lên. Góc phải dưới: một **con trỏ terminal** nhấp nháy cạnh dòng thời lượng.
- **Chữ còn lại:** tiêu đề, tagline, thời lượng.
- **Ý:** deck nói về code không phải mình viết; ngay từ slide đầu lớp đã nhìn thấy một diff.

### Slide 2 · Mindset shift

- **Hình:** hai hình người line-art cạnh nhau, mỗi hình cao ~40% slide. Trái: người **gõ phím**, phía trên có dòng code chảy ra. Phải: người cầm **kính lúp soi vào một diff** có dấu `+`/`-`. Giữa là mũi tên lớn. Bước 1: hình trái mờ xuống và bị gạch, hình phải sáng lên.
- **Chữ còn lại:** quote một dòng; bỏ đoạn "very fast junior dev…" (vào notes).
- **Ý:** đổi vai nhìn thấy được, không cần đọc.

### Slide 3 · Why this matters

- **Hình:** ba **đồng hồ tròn** (donut) thay ba tile chữ. Donut 1 đỏ 45% (phần còn lại mờ), donut 2 amber 41% có mũi tên đi lên, donut 3 là **hai vòng lồng nhau**: vòng ngoài teal nhạt 92%, vòng trong teal đậm 29%, khoảng hở giữa hai vòng nhấp sáng ở bước 1. Số đếm lên ở tâm.
- **Chữ còn lại:** tiêu đề, dưới mỗi donut một cụm 3–5 từ và nguồn.
- **Ý:** khoảng cách dùng/tin thành một hình rỗng ở giữa hai vòng.

### Slide 4 · Three pillars

- **Hình:** ba **icon lớn** (kích thước ~18% chiều cao) trong ba cột: brain-chip + database (Context), shield-check (Verify), pen-signature (Ownership). Dưới icon là tên trụ và **một dòng 6 từ**. Ba icon cũng chính là ba chấm HUD phóng to; khi bước 4, ba icon thu nhỏ bay xuống thanh dưới thành HUD (animation transform 600 ms).
- **Chữ còn lại:** tiêu đề, ba tên, ba dòng ngắn.
- **Ý:** lớp nhớ ba hình, không phải ba đoạn văn; HUD sinh ra từ slide này theo nghĩa đen.

### Slide 5 · Divider 01

- **Hình:** mỗi divider có một **minh hoạ nền lớn** bên phải, nét mờ 0.18: divider 01 là một **mạng nút** (nodes + edges) tượng trưng mô hình. Số "01" giữ.

### Slide 6 · Hallucination is a property

- **Hình (trái, 45%):** sơ đồ **dự đoán token**: một dòng chữ mono `the function returns a` và bốn ứng viên token bên dưới với thanh xác suất: `Promise` 0.42, `string` 0.31, `Result` 0.19, `null` 0.08; token cao nhất sáng teal và được "chọn" dù caption nói "plausible, not verified". Dưới đó là **thanh RAM**: một thanh RAM stick vẽ line-art, các ô nhớ tô dần từ trái sang, ô đầu tiên (nhãn "system prompt") mờ đi khi đầy. Bước 3 tách thành bốn thanh nhỏ.
- **Chữ còn lại:** tiêu đề + ba dòng 5 từ: "Predicts the next token" · "Context is finite and rots" · "Split the problem first".
- **Ý:** cả cơ chế và hậu quả đều là hình; bullet dài biến mất.

### Slide 7 · ReAct loop

- **Hình toàn khung:** thay hàng bốn hộp bằng một **vòng tròn** đường kính ~55% chiều cao, ba nút trên vòng: Reason (icon brain), Act (icon wrench), Observe (icon eye). Mũi tên chạy vòng theo bước. Ở nút Observe có một **cổng nhỏ** từ ngoài vòng đi vào, nhãn `tool output`; bước 6 ba chip test/build/lint đi qua cổng đó vào vòng. Ở tâm vòng: chữ `until done` và một bộ đếm `step 1/…` tăng theo bước.
- **Chữ còn lại:** tiêu đề, caption một dòng.
- **Ý:** vòng lặp phải là hình tròn; cổng vào ở Observe nói rõ "sự thật chỉ vào từ đây".

### Slide 8 · Divider 02

- **Hình nền:** một **dòng chảy** bốn nút Prompt → Context → Iterate → Workflow vẽ như đường ống, mờ.

### Slide 9 · Effective prompts

- **Hình:** hai **cửa sổ chat** thay hai box: mỗi cửa sổ có thanh tiêu đề, bong bóng prompt của người, và bong bóng trả lời của model. Cửa sổ trái: prompt mơ hồ, trả lời là một khối test **mờ có dấu `?`** lớn. Cửa sổ phải: prompt có diff `+`, trả lời là khối test **rõ nét có dấu ✓**. Bên dưới, bốn icon nhỏ cho bốn thói quen: example, doc-order, target, tag.
- **Chữ còn lại:** tiêu đề, hai prompt (vì đó là ví dụ), bốn nhãn 2 từ dưới icon.

### Slide 10 · Postgres

- **Hình (trái 55%):** **cây kế hoạch thực thi** kiểu pgAdmin: nút trên `Result`, dưới là một nút **Seq Scan on orders** vẽ to, đỏ, có nhãn `50M rows · 9120 ms`; bước 3 nút đó co lại và bị thay bằng **Index Scan** nhỏ, xanh, `3.1 ms`, kèm nút con `orders_user_id_idx`. Bên phải là **checklist năm dòng** có icon: schema, index, row count, EXPLAIN ANALYZE, goal; mỗi dòng tick khi người nói đi qua.
- **Chữ còn lại:** tiêu đề, năm nhãn 2 từ, caption "Verify against the planner".

### Slide 11 · Context management

- **Hình:** một **cửa sổ chat cao** bên trái, 8 bong bóng xếp chồng, hai bong bóng cuối viền đỏ "fix #1, fix #2"; một **đồng hồ RAM** bên cạnh chỉ 96%. Bốn kỹ thuật là **bốn icon có nhãn** xếp quanh cửa sổ, mỗi cái có mũi tên chỉ vào chỗ nó tác động: compaction (nén ba bong bóng thành một), note-taking (mũi tên ra file `todo.md`), sub-agent (cửa sổ nhỏ trả về một dòng), retrieval (mũi tên từ ổ đĩa vào). Bước `/clear`: cửa sổ trống, đồng hồ về 4%.
- **Chữ còn lại:** tiêu đề, bốn nhãn, caption.

### Slide 12 · Big task workflow

- **Hình:** giữ bốn bước nhưng vẽ thành **đường ray có ga**: bốn ga trên một đường, ở ga Plan có **rào chắn và con dấu APPROVED** (icon stamp) chỉ mở khi bước 2, ở ga Code có **đèn xanh test** treo trên, ga Commit có icon git-branch; mũi tên ngược từ Commit về Code đã có.
- **Chữ còn lại:** tiêu đề, tên bốn ga, quote Harper Reed một dòng.

### Slide 13 · Four patterns

- **Hình toàn khung:** thay bảng bằng **lưới 2×2 bốn sơ đồ nhỏ**, mỗi ô: một sơ đồ line-art 120×90 + tên pattern + **một dòng "hỏng khi"** màu đỏ + **một dòng "vá bằng"** màu xanh, mỗi dòng dưới 8 từ. Sơ đồ: Planner/Executor là một nút trên và ba nút dưới; Multi-agent là ba nút ngang nối vào một nút người; Memory là ba lớp chồng (session, file, DB); Tool-using là một bàn tay cầm bốn công cụ, một công cụ bị khoá.
- **Chữ còn lại:** tiêu đề, 4×(tên + 2 dòng ngắn).
- **Ý:** bảng 16 ô chữ là slide chán nhất deck; bốn sơ đồ là bốn câu chuyện.

### Slide 14 · Divider 03

- **Hình nền:** một **kính lúp lớn** soi lên ba dòng diff.

### Slide 15 · "You have to test what it writes."

- **Hình:** **chia đôi màn hình** như hai cửa sổ: trái là cửa sổ chat, agent nói `Done ✅ All tests pass.`; phải là terminal thật in `✖ 2 failed`. Quote đè giữa hai cửa sổ. Bước 2: ba con dấu bằng chứng (test output, command, screenshot) đóng lên cửa sổ phải.
- **Chữ còn lại:** quote, attribution.
- **Ý:** "lời model" và "sự thật" đặt cạnh nhau.

### Slide 16 · Slopsquatting

- **Hình (trái 60%):** **sơ đồ tấn công bốn nút** nối bằng mũi tên: LLM (brain-chip) → tên package bịa (package-box có dấu `?`) → registry (kho có attacker đặt gói, icon skull nhỏ trong hộp) → máy dev (terminal `npm install`). Từng nút sáng theo bước; ở nút cuối, hộp mở ra skull đỏ và tile rung. Bên phải: hai số lớn 19.7% và 58% xếp dọc.
- **Chữ còn lại:** tiêu đề, hai số + nhãn, caption SOP.

### Slide 17 · OWASP

- **Hình:** **lưới 10 ô** A01…A10 xếp hai hàng, năm ô AI hay dính sáng lên theo bước (đỏ cho High, amber cho Med), năm ô còn lại mờ. Mỗi ô sáng có icon lỗi (khoá mở, chìa khoá, ống tiêm, bản vẽ, bánh răng) và một dòng 4 từ. Bước 6: một **tấm lưới** (pattern kẻ ô) hạ xuống phủ 10 ô, nhãn SAST.
- **Chữ còn lại:** tiêu đề, 5×4 từ, caption.
- **Ý:** thấy "5 trong 10" bằng mắt; bảng biến mất.

### Slide 18 · Green but wrong

- **Hình:** hai sơ đồ cạnh nhau. Trái: **N+1** vẽ thật: một hộp `orders (100)` và một chùm 100 mũi tên mảnh xuống hộp `users`, đếm `101 queries` ở góc; ba mùi còn lại là ba icon nhỏ dưới. Phải: **donut coverage 95%** to, xanh, bên trong ghi `0 rules verified`; cạnh donut một khối test có `expect(spy).toHaveBeenCalled()`. Badge "✓ 4 passed" giữ ở góc.
- **Chữ còn lại:** tiêu đề, ba nhãn, caption một dòng.

### Slide 19 · Divider 04

- **Hình nền:** một **cuốn sách mở** với cây bút, mờ.

### Slide 20 · Docs · Diátaxis · ADR

- **Hình toàn khung:** **lưới Diátaxis 2×2** thật sự: trục ngang "learning ↔ doing", trục dọc "practical ↔ theoretical", bốn ô Tutorial / How-to / Reference / Explanation với icon. Bên phải lưới: một **tờ ADR** vẽ như tài liệu có năm dòng Title/Status/Context/Decision/Consequences và một **con dấu "DRAFTED BY AI"** mờ bị đè bởi con dấu **"DECIDED BY: ______"** chờ ký. Docs-from-code thành một mũi tên nhỏ `code → docs` phía trên lưới.
- **Chữ còn lại:** tiêu đề, nhãn trục, tên bốn ô, năm dòng ADR.

### Slide 21 · Divider 05 · SOP frame

- **Hình:** bốn chip thành một **tấm checklist giấy** (card có kẻ dòng) với bốn ô vuông, tick lần lượt theo bước; dưới cùng dòng chữ ký `signed: ______`. Nền: icon checklist lớn mờ.

### Slide 22 · Legacy Rescue

- **Hình:** bên trái thay danh sách bằng **bản đồ bốn trạm** dọc (1→4) có icon: brain (explain), broom (refactor), flask (tests), magnifier (manual). Bên phải giữ terminal, thêm phía trên một **thẻ file** `billing.js` với bốn **dấu chấm hỏi mờ** rải trong file (không nói là bug, chỉ gợi).
- **Chữ còn lại:** tiêu đề, bốn tên trạm 2 từ, lệnh, câu "passing tests are part of the problem".

### Slide 23 · Checkpoints

- **Hình:** ba card giữ nhưng mỗi card có **icon lớn** thay phần chữ: clipboard-paste (Easy), database + kính lúp (Medium), regex `^(a+)+$` bốc khói (Hard). Câu hỏi giữ nguyên vì là nội dung. Widget ReDoS: thêm **đồ thị thời gian** cạnh bảng số, trục log, đường cong nhân đôi, để "hàm mũ" thấy được.

### Slide 24 · Karpathy 2026

- **Hình (trái 55%):** **dòng thời gian** ngang: mốc Feb 2025 với thẻ "vibe coding" kiểu tweet (avatar tròn, hai dòng chữ giả), mốc Mar 2026 với thẻ "Agentic Engineering", mũi tên nối; thẻ đầu bị gạch ở bước 1. Cuối dòng thời gian, đường kéo dài mờ dần vào bóng tối với dấu `?`, chuẩn bị cho dark factory.
- **Chữ còn lại:** tiêu đề, hai nhãn mốc, caption.

### Slide 25 · Dark factory

- **Hình toàn khung:** vẽ **một nhà máy** line-art: năm gian nối nhau từ trái sang phải, mỗi gian là một nấc L1…L5, có cửa sổ sáng và hình người bên trong (5, 3, 2, 1, 0). Theo bước, đèn từng gian tắt và người biến mất; đến gian L5, cả nhà máy chỉ còn ống khói và một băng chuyền vẫn chạy (animation dịch chuyển nhỏ). Callout 1.9M hiện như **cảnh báo đỏ trên bảng điều khiển** gắn tường nhà máy.
- **Chữ còn lại:** tiêu đề, năm nhãn nấc, callout.
- **Ý:** "dark factory" theo nghĩa đen, không cần định nghĩa bằng chữ.

### Slide 26 · Observability

- **Hình toàn khung:** một **dashboard** kiểu Grafana: hàng trên ba ô stat (latency, tokens, escalations) có sparkline; hàng giữa là waterfall trace đã có; hàng dưới là **dải audit** như chuỗi khối nối nhau có ổ khoá, khối cuối nhãn `approved: nhan@`, một khối đỏ `blocked`. Đèn slide bật lên như đã làm.
- **Chữ còn lại:** tiêu đề, nhãn ô, caption stack.

### Slide 27 · Why the discipline survives

- **Hình:** trái là **cầu thang bốn bậc đi lên** (read-only → branch → staging → production), mỗi bậc có ổ khoá mở dần theo bước, bậc cuối có hình người đứng cạnh cần gạt; phải là **chuỗi khối log** nối nhau như blockchain, khối mới trượt vào, khối đầu có ổ khoá. Bên dưới, ba icon trụ từ slide 4 quay lại, to, sáng cả ba đúng câu chốt.
- **Chữ còn lại:** tiêu đề, nhãn bậc, caption peak.

### Slide 28 · Close

- **Hình:** dòng terminal giữ; bên dưới thêm **dòng chữ ký**: đường kẻ ngang với chữ `signed by` và một **nét bút vẽ chữ ký** (SVG path, stroke-dashoffset) chạy trong 1.2 giây rồi dừng, con trỏ nhấp nháy sau đó.
- **Ý:** "You are the one who signs" thành hành động ký thật.

---

## 2. Thứ tự làm và công sức

| Nhóm | Slide | Việc | Ước |
|---|---|---|---|
| A. Sprite icon + ba khuôn bố cục | toàn deck | 18 icon SVG, CSS `.fig-left`, `.fig-full`, `.trio` | nửa ngày |
| B. Sơ đồ có sẵn khung dữ liệu | 3, 6, 10, 18, 26 | donut, token bars, plan tree, N+1, dashboard | 1 ngày |
| C. Minh hoạ theo câu chuyện | 2, 7, 16, 25, 27, 28 | hình người, vòng tròn, chuỗi tấn công, nhà máy, cầu thang, chữ ký | 1.5 ngày |
| D. Thay bảng bằng lưới hình | 13, 17, 20 | 2×2 sơ đồ, lưới OWASP 10 ô, lưới Diátaxis + tờ ADR | 1 ngày |
| E. Bố cục lại phần còn lại | 1, 4, 9, 11, 12, 15, 21, 22, 23, 24, divider | icon lớn, cửa sổ chat, đường ray, checklist, timeline, nền divider | 1 ngày |

Tổng khoảng năm ngày nếu làm hết; ba ngày nếu bỏ nhóm E. Thứ tự đề xuất A → C → D → B → E: nhóm C đổi cảm giác deck nhiều nhất trên mỗi giờ bỏ ra.

**Ba slide nên làm trước để xem có hợp mắt không:** 7 (vòng tròn ReAct), 16 (chuỗi tấn công), 25 (nhà máy). Nếu ba slide này đúng phong cách, phần còn lại làm theo cùng ngôn ngữ.

**Điều cần bạn quyết:** phong cách line-art nét đơn (như đề xuất) hay khối tô màu phẳng. Line-art hợp nền console và rẻ để vẽ tay bằng SVG; khối tô màu ấm hơn nhưng dễ thành clipart nếu vẽ không đều tay.
