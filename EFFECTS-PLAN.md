# Kế hoạch hiệu ứng và cách thể hiện — deck 28 slide

> Đề xuất cho `index.html` hiện tại. Mỗi slide có: **Ý chính** (một câu, hiệu ứng phải phục vụ câu này), **Hiện tại** (slide đang thể hiện thế nào), **Đề xuất** (hiệu ứng theo thứ tự bấm phím), **Vì sao**, **Cách làm**, **Ưu tiên** (★★★ phải có · ★★ nên có · ★ nếu dư giờ). Chưa làm gì trong code; đây là bản để duyệt.

---

## 0. Nguyên tắc

1. **Mọi hiệu ứng do người nói điều khiển.** Không autoplay, không loop vô hạn. Phím `→` lật bước tiếp theo trong slide trước, hết bước mới sang slide. `←` lùi bước. Người nói kiểm soát nhịp, không phải animation.
2. **Một slide, một chuyển động chính.** Motion để chỉ tay: "nhìn vào đây". Hai thứ cùng chuyển động là không có gì được chỉ.
3. **Màu là ngữ nghĩa, không phải trang trí.** Teal = điểm nhấn, green = đã kiểm chứng, amber = cẩn thận, red = rủi ro. Hiệu ứng đổi màu chỉ khi ý nghĩa đổi (test xanh thành nghi ngờ, quyền ghi thành sự cố).
4. **Ngắn.** Vào slide: 300 đến 500 ms. Một bước: 200 đến 300 ms. Đếm số: tối đa 900 ms. Không ai chờ animation.
5. **Tôn trọng `prefers-reduced-motion`.** Khi bật, mọi thứ thành fade 150 ms, số hiện ngay, không typewriter.
6. **In PDF và overview** hiện toàn bộ bước, không giấu gì.
7. **Có đường lui.** Widget nào chạy JS (ReDoS, trace) đều có trạng thái tĩnh trông vẫn ổn nếu JS lỗi.

---

## 1. Hạ tầng cần thêm vào runtime (làm một lần, dùng cho cả deck)

| Cơ chế | Cách dùng trong HTML | Việc cần làm trong `deck.js` / `deck.css` |
|---|---|---|
| **Steps** (fragment) | `data-step="1"`, `data-step="2"`… trên bất kỳ element; tuỳ chọn `data-step-fx="fade-up \| spotlight \| strike \| flash \| grow"` | `→` reveal bước kế trong slide hiện tại, `←` ẩn lại; hash `#13.2` để deep-link tới bước; overview và print hiện hết |
| **Spotlight** | `data-step-fx="spotlight"` | Khi bước sáng, các anh em cùng cha mờ xuống opacity .35; bước cuối trả tất cả về bình thường |
| **Count-up** | `<span data-count="45" data-suffix="%" data-prefix="~">` | Khi slide (hoặc bước chứa nó) hiện, đếm từ 0 lên trong 700 ms, easing ease-out, tabular-nums để không nhảy chữ |
| **Typewriter** | `data-type` trên `<p>` hoặc `<pre>`; `data-type-speed="18"` ms/ký tự | Gõ từng ký tự khi hiện; con trỏ `▍` nhấp nháy; skip ngay nếu bấm `→` |
| **Stagger** | `data-stagger="80"` trên container (cards, table tbody, pipeline, ladder) | Con của container fade-up lần lượt cách nhau 80 ms khi slide vào |
| **Pulse / shake** | class `.pulse` (1 chu kỳ 900 ms), `.shake` (300 ms) | Keyframes; tự gỡ class sau khi chạy |
| **Pillar HUD** | `data-pillar="context \| verify \| ownership"` trên `<section>` | Ba chấm nhỏ C · V · O ở thanh chrome dưới, chấm nào sáng theo slide. Nối mọi slide về slide 4 mà không tốn chỗ |
| **Scene tone** | `data-tone="dark \| lit"` trên `<section>` | Chuyển nền: `dark` tối hơn nền chuẩn 40% và tắt gradient (slide 25), `lit` sáng trở lại (slide 26). Transition 600 ms |
| **Widget hook** | `data-widget="redos \| trace \| explain \| clear"` | `deck.js` gọi hàm khởi tạo khi slide active, huỷ khi rời; mỗi widget một file nhỏ trong `assets/widgets/` |

Ước lượng: steps + spotlight + count-up + typewriter + stagger + pulse + HUD + tone khoảng 150 dòng JS, 80 dòng CSS. Widget mỗi cái 40 đến 80 dòng.

---

## 2. Từng slide

### Slide 1 · Vibe Coding SOPs (hero)

- **Ý chính:** đặt đề, không có gì để nhớ ngoài tên bài.
- **Hiện tại:** tĩnh, đã đúng.
- **Đề xuất:** eyebrow hiện trước 0 ms, tiêu đề fade-up 200 ms, tagline 450 ms, dòng runtime typewriter ở 700 ms rồi con trỏ nhấp nháy đến khi sang slide. Không bước.
- **Vì sao:** slide chờ lớp ổn định chỗ ngồi; con trỏ nhấp nháy là tín hiệu "đang chờ bắt đầu" mà không ồn.
- **Cách làm:** `data-stagger="220"` trên `.slide-inner`, `data-type` trên `.runtime`.
- **Ưu tiên:** ★

### Slide 2 · "AI doesn't replace you — it forces you up a level." (quote)

- **Ý chính:** đổi vai: từ người gõ sang người review.
- **Hiện tại:** quote hiện cùng lúc với dòng phụ.
- **Đề xuất:** (vào slide) dấu ngoặc kép lớn scale từ 1.3 về 1, mờ dần; quote hiện theo từng cụm từ, ba nhịp: "AI doesn't replace you" · "—" · "it forces you up a level." (bước 1) dòng phụ hiện; chữ "code typist" bị gạch ngang bằng animation gạch chạy từ trái sang, cùng lúc "code reviewer" sáng teal. (bước 2) phần "sometimes fabricates, occasionally breaks everything" đổi màu amber rồi về muted.
- **Vì sao:** hình ảnh gạch bỏ vai cũ là cả bài trong một giây.
- **Cách làm:** quote chia `<span>` với `data-stagger`; `.strike-run` keyframe `width: 0→100%` của một pseudo-element; bước 1 và 2 bằng `data-step`.
- **Ưu tiên:** ★★★

### Slide 3 · Speed is what AI gives for free. Quality isn't. (3 stat)

- **Ý chính:** dùng nhiều, tin ít, bug tăng; khoảng cách dùng/tin là chỗ SOP sống.
- **Hiện tại:** ba tile hiện đồng thời, số tĩnh.
- **Đề xuất:** (vào slide) ba tile stagger 120 ms; số đếm từ 0 lên: 45%, ~41%, 29%, mỗi số 700 ms bắt đầu lệch nhau 100 ms. (bước 1) trong tile thứ ba, dòng "though 92% use it daily" hiện, và một thanh mảnh dưới số: hai đoạn, đoạn 92 teal nhạt dài hết tile, đoạn 29 teal đậm chồng lên; phần chênh 63 điểm nhấp sáng một nhịp. (bước 2) tiêu đề "Quality isn't." đổi màu từ text sang amber.
- **Vì sao:** khoảng cách 92 và 29 là ý quan trọng nhất; thanh chồng cho thấy nó bằng mắt.
- **Cách làm:** `data-count`; thanh là hai `<div>` width theo %; bước bằng `data-step`.
- **Ưu tiên:** ★★★

### Slide 4 · Every SOP answers one of three questions (3 card)

- **Ý chính:** ba trụ Context, Verification, Ownership; sẽ quay lại suốt bài.
- **Hiện tại:** ba card cùng lúc.
- **Đề xuất:** (bước 1, 2, 3) mỗi card hiện một lần với spotlight: card đang nói sáng, hai card kia mờ. (bước 4) cả ba sáng lại, và **Pillar HUD** xuất hiện lần đầu ở thanh dưới với ba chấm C · V · O sáng cùng lúc, có tooltip nhỏ "these three dots follow every slide". Từ slide này về sau, HUD luôn hiện và sáng chấm tương ứng.
- **Vì sao:** người nói bảo "ba trụ sẽ quay lại ở mỗi phần"; HUD làm việc đó thay người nói, và slide 27 sẽ tận dụng.
- **Cách làm:** `data-step-fx="spotlight"`; HUD trong `#chrome`, đọc `data-pillar` của section.
- **Ưu tiên:** ★★★

### Slide 5 · Divider 01 · Why AI gets it wrong

- **Ý chính:** chuyển phần.
- **Đề xuất:** rail bên trái cao dần từ trên xuống 400 ms; số "01" fade từ scale 1.15 về 1 với stroke mờ rồi rõ; eyebrow, h2, lede stagger 120 ms. Dùng chung cho mọi divider (5, 8, 14, 19, 21).
- **Cách làm:** CSS trên `.divider` khi `.is-active`.
- **Ưu tiên:** ★★

### Slide 6 · Hallucination is a property, not a bug

- **Ý chính:** model dự đoán token; context hữu hạn và mục dần; chia nhỏ trước khi prompt.
- **Hiện tại:** ba bullet tĩnh.
- **Đề xuất:** (bước 1) bullet 1. (bước 2) bullet 2 kèm **context meter**: một thanh ngang dưới bullet, tô dần từ trái sang biểu diễn context đầy lên; khi qua 60% màu chuyển teal sang amber, qua 85% sang red; đồng thời một dòng chữ mờ ở đầu thanh ("first instruction") mờ dần đến mất khi thanh đầy: "quên phần đầu". (bước 3) bullet 3; cụm "break the problem down before you prompt" typewriter màu teal; thanh context reset thành bốn thanh ngắn tách rời, mỗi thanh xanh. 
- **Vì sao:** "context rot" là khái niệm trừu tượng; thanh đầy lên và chữ đầu mờ đi là hình ảnh trực tiếp, và bốn thanh ngắn là cách sửa.
- **Cách làm:** widget `context-meter` nhỏ bằng CSS transition trên width và opacity, kích hoạt theo bước.
- **Ưu tiên:** ★★★

### Slide 7 · Your agent doesn't know. It reasons, acts, and observes. (ReAct)

- **Ý chính:** vòng lặp reason, act, observe; bước observe là chỗ sự thật đi vào; test là quan sát thật.
- **Hiện tại:** pipeline bốn bước thẳng hàng, mũi tên tĩnh.
- **Đề xuất:** (bước 1 đến 4) từng step hiện, mũi tên giữa hai step "vẽ" bằng stroke-dashoffset 200 ms. (bước 5) một đường cong SVG từ step 4 vòng xuống dưới và quay về step 1 vẽ ra, có mũi tên; nhãn "loop" nhỏ ở giữa cung. (bước 6) ba chip "test", "build", "lint" rơi từ trên xuống vào ô Observe, viền green, ô Observe sáng green một nhịp. (bước 7) caption hiện.
- **Vì sao:** vòng lặp phải nhìn thấy là vòng, không phải hàng; chip rơi vào Observe là "cho AI một check tự chạy" bằng hình.
- **Cách làm:** SVG overlay đặt absolute trên `.pipeline`, path với `stroke-dasharray` animate; chip bằng `data-step-fx="fade-up"` với translateY âm.
- **Ưu tiên:** ★★★

### Slide 8 · Divider 02 · AI-Assisted Workflow

- Như slide 5. Thêm: lede "Prompt → Context → Iterate → Workflow" hiện bốn từ lần lượt, mũi tên vẽ giữa các từ, xem trước bốn slide sắp tới.
- **Ưu tiên:** ★★

### Slide 9 · More specific = fewer corrections (before/after)

- **Ý chính:** prompt cụ thể có context và tiêu chí; prompt tồi giấu context chỉ bạn biết.
- **Hiện tại:** hai box hiện cùng lúc.
- **Đề xuất:** (vào slide) box đỏ hiện, nội dung typewriter nhanh. (bước 1) box xanh trượt vào; phần chữ giống box đỏ hiện ngay, phần thêm vào ("covering the edge case where the user is logged out. avoid mocks.") hiện dạng diff: nền green nhạt, dấu `+` ở đầu, typewriter. (bước 2) caption hiện; bốn cụm "examples", "long docs first", "success criteria", "name the technique" lần lượt sáng teal khi người nói đi qua.
- **Vì sao:** nhìn thấy phần "được thêm" là thấy chính xác cái gì làm prompt tốt.
- **Cách làm:** `<mark class="diff-add">` với `data-type`; caption chia span với `data-step`.
- **Ưu tiên:** ★★★

### Slide 10 · Don't ask "write me the SQL" (Postgres)

- **Ý chính:** đưa AI đúng thứ DBA cần, rồi kiểm với planner.
- **Hiện tại:** hai card tĩnh.
- **Đề xuất:** (vào slide) card Bad. (bước 1) card Good spotlight; năm thành phần "Schema", "indexes", "row counts", "EXPLAIN ANALYZE", "goal" sáng lần lượt như chip. (bước 2) một dải `<pre>` mỏng hiện dưới hai card, widget `explain`: dòng `Seq Scan on orders  (cost=0.00..1254000.00 rows=50000000)  actual time=0.8..9120.4 ms` màu red; (bước 3) dòng đó mờ, thay bằng `Index Scan using orders_user_id_idx on orders  actual time=0.02..3.1 ms` màu green, số ms đếm ngược từ 9120 về 3. (bước 4) caption.
- **Vì sao:** "kiểm chứng với planner" trở thành thứ nhìn thấy: cùng câu hỏi, planner trả lời khác nhau.
- **Cách làm:** widget `explain`, hai dòng có sẵn trong HTML, JS chỉ toggle class và chạy count-down.
- **Ưu tiên:** ★★

### Slide 11 · A long chat is not a badge of honor (context)

- **Ý chính:** bốn kỹ thuật quản context; hai lần sửa vẫn sai thì clear.
- **Hiện tại:** hai card chữ.
- **Đề xuất:** (vào slide) card 1; bốn kỹ thuật là bốn từ đậm, (bước 1 đến 4) mỗi từ sáng teal và phần giải thích trong ngoặc hiện theo. (bước 5) card 2 hiện cùng widget `clear`: cạnh card, một cột 8 khối xám chồng lên nhau mô phỏng lịch sử chat, hai khối trên cùng viền red có nhãn "fix #1", "fix #2"; (bước 6) chữ `/clear` trong card sáng, cột khối sụp xuống còn một khối teal nhãn "new prompt". (bước 7) caption.
- **Vì sao:** "context bẩn" là thứ mọi người cảm được nhưng chưa từng nhìn thấy; cột khối sụp là hình ảnh nhớ được.
- **Cách làm:** widget `clear` bằng CSS transform và transition, kích hoạt theo bước.
- **Ưu tiên:** ★★

### Slide 12 · Big task? Make the AI interview you first (pipeline)

- **Ý chính:** explore, plan, code, commit; cho AI một check tự chạy.
- **Hiện tại:** pipeline tĩnh, caption có quote.
- **Đề xuất:** (bước 1 đến 4) từng step hiện, mũi tên vẽ; step Plan có nhãn nhỏ "you approve" hiện chậm hơn 200 ms và viền teal. (bước 5) quote Harper Reed typewriter trong caption. (bước 6) chip "a check it can run" gắn vào dưới step Code, viền green, pulse một nhịp. (bước 7) một dấu tick nhỏ xuất hiện ở step Commit và một mũi tên ngược mờ từ Commit về Code, nhãn "checkpoint".
- **Vì sao:** cùng cấu trúc với slide 7 (cố ý), để lớp thấy pipeline của người và vòng lặp của agent là một hình.
- **Cách làm:** tái dùng SVG overlay của slide 7.
- **Ưu tiên:** ★★★

### Slide 13 · Every agent pattern has a failure mode. Every SOP step plugs one. (bảng 4×4)

- **Ý chính:** mỗi pattern có chỗ hỏng, mỗi bước SOP bịt một chỗ; mỗi dòng là một trụ.
- **Hiện tại:** bảng dày, hiện cùng lúc.
- **Đề xuất:** (bước 1 đến 4) từng dòng hiện với spotlight; trong dòng, ba cột hiện theo thứ tự trái sang phải cách 120 ms: pattern, làm gì, **chỗ hỏng nhấp red một nhịp**, rồi cột SOP hiện với nền green nhạt như "miếng vá". Cuối dòng, một chấm C/V/O sáng khớp với HUD dưới. (bước 5) caption; HUD nhấp cả ba chấm.
- **Vì sao:** bảng bốn cột đọc một lúc là quá tải; đi từng dòng theo nhịp "hỏng rồi vá" biến bảng thành bốn câu chuyện nhỏ.
- **Cách làm:** `data-step` trên `<tr>`, `data-stagger` trên cell; class `.patch` cho cell cuối.
- **Ưu tiên:** ★★★

### Slide 14 · Divider 03 · Code Review Process

- Như slide 5. Lede "Correct · Secure · Fast enough · Meaningful tests" hiện bốn từ lần lượt; đây là mục lục của bốn slide sau.
- **Ưu tiên:** ★★

### Slide 15 · "You have to test what it writes." (quote)

- **Ý chính:** chưa thấy chạy thì chưa phải hệ thống chạy được; bắt AI trưng bằng chứng.
- **Hiện tại:** quote tĩnh.
- **Đề xuất:** (vào slide) quote typewriter tốc độ chậm hơn bình thường (35 ms/ký tự) với con trỏ, cảm giác terminal; kết thúc, dấu ngoặc kép lớn hiện. (bước 1) attribution hiện. (bước 2) trong câu "not 'done'", chữ "done" gạch ngang bằng gạch chạy màu red; ba chữ "test output", "the command it ran", "a screenshot" sáng green lần lượt.
- **Vì sao:** slide này là quy tắc bất di bất dịch; chậm và trần trụi mới đúng trọng lượng.
- **Ưu tiên:** ★★

### Slide 16 · When hallucination becomes a supply-chain attack (slopsquatting)

- **Ý chính:** AI bịa tên package, kẻ xấu đăng ký trước, cài là dính; 19.7% và 58%.
- **Hiện tại:** ba tile tĩnh.
- **Đề xuất:** (vào slide) hai tile số đếm lên 19.7% và 58% (900 ms, red). (bước 1) tile thứ ba hiện; trong tile chạy một mini-terminal ba dòng typewriter: `$ npm install react-validate-utils` → `+ react-validate-utils@1.0.3` (green) → sau 400 ms dòng thứ ba `> postinstall: curl https://… | sh` viền red, tile shake nhẹ 300 ms, viền tile chuyển red đậm. (bước 2) caption SOP hiện; chữ `npm audit` sáng green.
- **Vì sao:** chuỗi cài rồi dính là câu chuyện của slide; ba dòng terminal kể nó nhanh hơn mọi lời.
- **Cách làm:** typewriter theo bước, `.shake`. Tên package trong demo là giả, ghi rõ trong notes để không ai đi cài thử.
- **Ưu tiên:** ★★★

### Slide 17 · What AI generates → OWASP Top 10 (bảng)

- **Ý chính:** lỗi AI hay tạo có tên chuẩn OWASP; SAST là lưới đỡ cơ khí.
- **Hiện tại:** bảng năm dòng, chip severity.
- **Đề xuất:** (vào slide) tiêu đề bảng; (bước 1 đến 5) từng dòng hiện, chip severity pop scale 0.6 về 1 trễ 150 ms sau dòng; chip High nhấp red một nhịp. (bước 6) caption SOP hiện; một đường kẻ ngang nét đứt teal quét từ trái sang phải ngay dưới bảng, nhãn "Semgrep · gitleaks" chạy theo, như một cái lưới hạ xuống dưới năm dòng.
- **Vì sao:** "mechanical net" là ẩn dụ của slide; đường lưới quét qua là cách hình hoá rẻ nhất.
- **Cách làm:** `data-step` trên `<tr>`; `.net-line` width 0 đến 100%.
- **Ưu tiên:** ★★

### Slide 18 · Two places AI is "green but wrong" (perf & tests)

- **Ý chính:** bốn mùi performance đều pass test; test dởm đóng băng cái sai; xoá rule mà test vẫn pass thì không phải test.
- **Hiện tại:** hai card chữ.
- **Đề xuất:** (vào slide) một badge nhỏ góc phải trên "✓ 4 passed" green, cố định suốt slide. (bước 1) card Performance; (bước 2 đến 5) bốn mùi sáng amber lần lượt, badge vẫn green và nhấp một nhịp mỗi lần, kèm số "10 rows" nhỏ dưới badge. (bước 6) card Bad tests. (bước 7) caption; cụm "delete the business rule" hiện kèm một dòng code giả `- if (qty >= 100) discount = 0.10` gạch đỏ trượt ra, badge **vẫn** green và nhấp; đúng lúc đó chữ "green" trong tiêu đề đổi từ text sang red.
- **Vì sao:** cả slide xoay quanh một nghịch lý "xanh mà sai"; badge xanh trơ trơ giữa mọi lỗi là nghịch lý đó bằng hình.
- **Ưu tiên:** ★★★

### Slide 19 · Divider 04 · Documentation

- Như slide 5. Lede "Give AI the pen — not the decision.": chữ "pen" sáng teal, "decision" sáng amber, cách nhau 300 ms.
- **Ưu tiên:** ★

### Slide 20 · AI drafts; a human reviews and decides (3 card)

- **Ý chính:** docs từ code an toàn; Diátaxis bốn loại; ADR do AI draft, không được quyết.
- **Hiện tại:** ba card cùng lúc.
- **Đề xuất:** (bước 1 đến 3) từng card spotlight. Trong card Diátaxis, bốn từ "tutorial · how-to · reference · explanation" hiện lần lượt và tự xếp thành lưới 2×2 nhỏ (learning/doing × practical/theoretical) bên trong card 400 ms sau khi hiện, rồi trở về dạng dòng. Trong card ADR, chữ "never" trong "never decide it" pulse red một nhịp. (bước 4) caption nếu có, không thì kết.
- **Vì sao:** Diátaxis bản chất là 2×2; cho lớp thấy lưới trong một giây là đủ nhớ.
- **Ưu tiên:** ★★

### Slide 21 · Divider 05 · SOPs for common tasks

- **Ý chính:** một khung SOP, điền theo task. Slide chỉ có tiêu đề nhưng người nói 3.5 phút.
- **Hiện tại:** trống nội dung; người nghe không có gì để nhìn.
- **Đề xuất (có thêm nội dung nhẹ, cần bạn duyệt):** giữ divider, thêm bốn chip lớn ở dưới lede hiện theo bước: (bước 1) `1 · Load canonical context` (bước 2) `2 · Give it a check it can run` (bước 3) `3 · Verify the task's own risk` (bước 4) `4 · A human signs`. Chip 1 và 3 gắn chấm C, chip 2 chấm V, chip 4 chấm O; HUD sáng theo. (bước 5) bốn nhãn nhỏ "new service · migration · endpoint · integration test" hiện dưới cùng, mờ, để người nói đi qua từng loại task.
- **Vì sao:** 3.5 phút nói trên một slide trống là chỗ lớp mất tập trung; bốn chip hiện dần giữ mắt mà không biến divider thành slide chữ.
- **Ưu tiên:** ★★★ (nếu chấp nhận thêm nội dung)

### Slide 22 · One function. Undocumented, badly named, wrong in ways the tests don't catch. (bài tập)

- **Ý chính:** test pass là một phần của vấn đề; bốn task; đọc spec trước.
- **Hiện tại:** hai cột tĩnh.
- **Đề xuất:** (vào slide) tiêu đề. (bước 1) khối terminal bên phải: hai lệnh typewriter, rồi output giả lập hiện dần: `✔ small order, no discount, flat shipping` … bốn dòng green, cuối là `ℹ pass 4  fail 0`. (bước 2) dòng "The passing tests are part of the problem" hiện; bốn dấu ✔ nhấp một nhịp rồi đổi thành `?` amber. (bước 3 đến 6) bốn task bên trái hiện từng cái; task 1 cụm "write your own hypothesis first" sáng teal. (bước 7) chip Node 20+ và luật hiện.
- **Vì sao:** lớp phải thấy "4 pass" trước khi nghe "đó là vấn đề"; đổi ✔ thành ? là khoảnh khắc đặt câu hỏi.
- **Cách làm:** output test là text tĩnh trong HTML, typewriter theo bước; thay dấu bằng class.
- **Ưu tiên:** ★★★

### Slide 23 · Checkpoint questions (3 card) + ReDoS

- **Ý chính:** ba câu hỏi, lớp trả lời trước; "trông đúng" không phải "an toàn".
- **Hiện tại:** ba card cùng lúc, caption ReDoS.
- **Đề xuất:** (bước 1, 2, 3) từng card spotlight, card Hard viền red pulse khi hiện. (bước 4) caption ReDoS. (bước 5) **widget `redos` live** trượt lên thay chỗ caption: một khối terminal, người nói bấm `d` để chạy thật trong trình duyệt: lần lượt in `n=20  5 ms`, `n=22  20 ms`, `n=24  80 ms`, `n=26  320 ms`, `n=28  1300 ms`; mỗi dòng kèm một thanh ngang dài theo ms (log scale), thanh cuối red; dòng cuối in `n=40  ≈ 1 hour  (extrapolated)` không chạy thật. Có nút reset. Chạy đúng regex `^(a+)+$` bằng JS của trình duyệt, kết quả thật, thời gian chặn trên khoảng 2 giây.
- **Vì sao:** đây là demo sống duy nhất trong deck mà không cần model, không cần mạng, thời gian đoán được, và nó chứng minh câu "one crafted request pins a CPU" ngay trên máy đang chiếu.
- **Cách làm:** widget đo bằng `performance.now()`, chạy trong `setTimeout` từng n để UI kịp vẽ; giới hạn cứng n ≤ 28; nếu một bước quá 3 giây thì dừng và ghi "stopped".
- **Ưu tiên:** ★★★

### Slide 24 · Even Karpathy retired "vibe coding"

- **Ý chính:** người đặt tên đã nâng cấp nó; bắc cầu sang dark factory.
- **Hiện tại:** tiêu đề, lede, caption.
- **Đề xuất:** (vào slide) tiêu đề; chữ "vibe coding" trong ngoặc kép gạch ngang bằng gạch chạy sau 600 ms, và "Agentic Engineering" trong lede sáng teal khi (bước 1) lede hiện. (bước 2) caption hiện; cụm "the dark factory" typewriter, và toàn slide bắt đầu tối dần 20% trong 800 ms, chuẩn bị cho slide 25.
- **Vì sao:** slide này là cây cầu; ánh sáng giảm dần là cách nói "đang đi vào chỗ tối" mà không cần chữ.
- **Cách làm:** `data-tone` chuyển tiếp; gạch chạy dùng lại của slide 2.
- **Ưu tiên:** ★★

### Slide 25 · The end of the ladder: a codebase that ships itself (dark factory)

- **Ý chính:** năm nấc tự động; L5 không có người; sự cố 1.9 triệu dòng; người vẫn sở hữu sự cố.
- **Hiện tại:** ladder năm ô, callout red, caption định nghĩa.
- **Đề xuất:** slide này mang `data-tone="dark"`: nền tối hơn, gradient tắt, rail không có. (bước 1 đến 5) từng nấc sáng lần lượt trái sang phải; trên mỗi nấc có một hàng hình người nhỏ (SVG): L1 năm người, L2 ba, L3 hai, L4 một, L5 không; khi nấc mới sáng, hình người ở nấc trước mờ đi từng cái. Khi L5 sáng, nền tối thêm 20% nữa, ô L5 viền red và cả HUD ba chấm **tắt** (không còn người nào giữ trụ). (bước 6) callout trượt lên với `.shake` 300 ms; số "1.9 million" đếm lên nhanh 600 ms; chữ "You still own the incident" hiện sau 400 ms và HUD chấm Ownership sáng lại đơn độc. (bước 7) caption định nghĩa hiện mờ.
- **Vì sao:** "tắt đèn" và "không còn người" là nghĩa đen của dark factory; slide tự làm điều đó. HUD tắt rồi chấm Ownership sáng lại một mình là câu trả lời sớm cho slide 27.
- **Cách làm:** SVG người 12×12 inline, opacity theo bước; `data-tone`; HUD có API `hud.off()` / `hud.only('ownership')`.
- **Ưu tiên:** ★★★

### Slide 26 · If you can't observe your agent, you can't trust it. (observability)

- **Ý chính:** logging, tracing, audit trail; ba nhóm metric.
- **Hiện tại:** ba card, caption.
- **Đề xuất:** slide mang `data-tone="lit"`: khi vào, nền sáng trở lại trong 600 ms, gradient bật lại, rail teal trượt vào: "bật đèn". (bước 1) card Logging hiện kèm widget `trace` bên dưới ba card: xuất hiện dòng log đầu tiên `12:04:01.213  trace=7f3a  tool=read_file  path=billing.js  42 ms`. (bước 2) card Tracing; widget chuyển thành waterfall kiểu Jaeger: năm thanh ngang xếp bậc thang theo thời gian, độ dài theo ms, nhãn `reason · read_file · run_tests · edit · run_tests`; thanh `run_tests` thứ hai dài hơn và có nhãn "2 failed → 0 failed". (bước 3) card Audit hiện amber; trên waterfall, thanh `edit` được gắn nhãn `approved: nhan@` viền amber, và một thanh mới `npm install` xuất hiện với dấu ⛔ red nhãn "blocked: not approved". (bước 4) caption metric hiện; ba nhóm sáng lần lượt.
- **Vì sao:** observability là "nhìn thấy"; slide phải cho lớp nhìn thấy một trace thật sự thay vì định nghĩa. Bật đèn sau slide tối là chuyển cảnh mạnh nhất của deck.
- **Cách làm:** widget `trace` bằng HTML div có width và left theo %, dữ liệu tĩnh trong HTML, JS chỉ reveal theo bước.
- **Ưu tiên:** ★★★

### Slide 27 · Full autonomy doesn't remove humans — it changes their shape

- **Ý chính:** earned trust mở quyền dần; audit log append-only; SOP hôm nay là bản thủ công của kỷ luật đó.
- **Hiện tại:** hai card, caption peak.
- **Đề xuất:** (bước 1) card Earned trust; bên trong, chuỗi "read-only → write-to-branch → staging → production" trở thành một thanh tiến trình bốn đoạn, mỗi đoạn tô green lần lượt cách 250 ms, nhãn nhỏ dưới mỗi đoạn "proven"; đoạn production tô cuối và có ổ khoá nhỏ. (bước 2) card DeepSeek Harness; cụm "append-only" có một hàng ba ô log nhỏ nối thêm ô thứ tư trượt vào từ phải, ô đầu có ổ khoá (không sửa được). (bước 3) caption peak: viền trái teal cao dần 400 ms, chữ từ muted sang text; đúng lúc đó HUD sáng cả ba chấm C · V · O và nhấp một nhịp, kèm nhãn nhỏ "same three, mechanised" cạnh HUD trong 2 giây.
- **Vì sao:** đây là cú lật; HUD sáng lại cả ba là "ba trụ không biến mất" bằng chính thứ đã theo lớp suốt buổi.
- **Ưu tiên:** ★★★

### Slide 28 · You are the one who signs. (close)

- **Ý chính:** kết; một câu để nhớ.
- **Hiện tại:** tiêu đề, dòng terminal, dòng cuối.
- **Đề xuất:** (vào slide) tiêu đề fade. (bước 1) dòng terminal typewriter với `$` teal, tốc độ 25 ms, con trỏ nhấp nháy sau khi gõ xong. (bước 2) dòng "If you can't explain the line, it doesn't go in." hiện mờ, rồi con trỏ terminal tiếp tục nhấp nháy đến khi tắt. HUD giữ ba chấm sáng. Không gì khác.
- **Vì sao:** sau slide 27 phải giảm tốc; con trỏ nhấp nháy là hình ảnh "đến lượt bạn".
- **Ưu tiên:** ★★

---

## 3. Bảng tổng hợp và thứ tự làm

| Ưu tiên | Slide | Hiệu ứng chính | Cần hạ tầng |
|---|---|---|---|
| ★★★ | 2 | gạch "code typist", sáng "code reviewer" | steps, strike-run |
| ★★★ | 3 | count-up + thanh 92/29 | count-up, steps |
| ★★★ | 4 | spotlight ba card + HUD xuất hiện | spotlight, HUD |
| ★★★ | 6 | context meter đầy và mục, tách bốn thanh | widget context-meter |
| ★★★ | 7 | vòng lặp SVG vẽ, chip test rơi vào Observe | SVG overlay, steps |
| ★★★ | 9 | diff `+` phần được thêm | typewriter, steps |
| ★★★ | 12 | pipeline + chip "check it can run" + mũi tên checkpoint | SVG overlay |
| ★★★ | 13 | từng dòng hỏng rồi vá, chấm trụ | steps, stagger, HUD |
| ★★★ | 16 | mini-terminal cài package rồi dính | typewriter, shake |
| ★★★ | 18 | badge "4 passed" trơ trơ giữa lỗi | steps, pulse |
| ★★★ | 21 | bốn chip khung SOP trên divider (thêm nội dung) | steps, HUD |
| ★★★ | 22 | output test giả lập, ✔ thành ? | typewriter, steps |
| ★★★ | 23 | ReDoS live widget | widget redos |
| ★★★ | 25 | tắt đèn, người biến mất theo nấc, HUD tắt | tone, SVG người, HUD API |
| ★★★ | 26 | bật đèn, waterfall trace, blocked install | tone, widget trace |
| ★★★ | 27 | thanh earned trust, log append, HUD sáng ba | steps, HUD |
| ★★ | 5, 8, 14, 19 | divider rail và số | CSS |
| ★★ | 10 | EXPLAIN seq scan → index scan | widget explain |
| ★★ | 11 | cột chat sụp khi /clear | widget clear |
| ★★ | 15 | quote typewriter chậm, gạch "done" | typewriter |
| ★★ | 17 | lưới SAST quét dưới bảng | CSS |
| ★★ | 20 | Diátaxis xếp 2×2 | CSS grid transition |
| ★★ | 24 | tối dần 20% | tone |
| ★★ | 28 | terminal typewriter, con trỏ | typewriter |
| ★ | 1 | stagger, con trỏ runtime | stagger |

**Thứ tự làm đề xuất**
1. Hạ tầng: steps + spotlight + stagger + count-up + typewriter + pulse (nửa ngày). Ngay sau bước này, các slide 2, 3, 4, 9, 13, 15, 17, 18, 20, 22, 28 chỉ cần thêm attribute.
2. HUD ba trụ và tone (2 giờ). Mở khoá slide 4, 24, 25, 26, 27.
3. SVG overlay cho pipeline (2 giờ). Slide 7 và 12.
4. Widget theo giá trị: redos (1 giờ), trace (2 giờ), context-meter (1 giờ), npm mini-terminal (1 giờ), explain (1 giờ), clear (1 giờ), người trên ladder (1 giờ).
5. Chạy thử cả deck với `prefers-reduced-motion` bật để chắc mọi bước vẫn lật được.

Tổng khoảng hai ngày làm nếu làm hết; một ngày nếu chỉ làm ★★★.

**Ba thứ cần bạn quyết trước khi làm**
- Slide 21 có thêm bốn chip khung SOP không (thay đổi nội dung, không chỉ hiệu ứng).
- Tên package giả trong slide 16 dùng gì; tôi đề xuất một tên rõ ràng là giả, ví dụ `react-validate-utils-pro`, và ghi trong notes.
- ReDoS ở slide 23 chạy sống bằng phím `d` hay chỉ phát lại số đã đo sẵn. Chạy sống đáng tin vì regex chạy trong trình duyệt, không phụ thuộc mạng; giới hạn n ≤ 28 nên tối đa khoảng 2 giây.
