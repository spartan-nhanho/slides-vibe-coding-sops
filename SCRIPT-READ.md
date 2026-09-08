# Kịch bản đọc — Lecture 9: Vibe Coding SOPs

> Deck 36 slide: bỏ bài tập và checkpoint, khối dark factory 11 slide (23–33) theo năm mục: vấn đề, cấp độ, bốn giai đoạn, kiến trúc, rủi ro. Bản này khác `SCRIPT.md`: mỗi slide có **Hiểu trước khi nói** (kiến thức nền, viết để hiểu chứ không phải để nói) và **Đọc** (lời dẫn nguyên văn, đọc được từ đầu đến cuối). Ai nói slide nào ghi ở tiêu đề. Đọc hết bản này một lượt là nắm được toàn bộ kiến thức của buổi; sau đó chỉ cần cầm `SCRIPT.md` để tra nhanh.

Câu chuyện của buổi, tóm trong ba câu: AI làm việc gõ code rẻ đi. Hiểu, review và đúng thì vẫn đắt như cũ. SOP là quy trình cho phần đắt đó. Ba trụ xuyên suốt: **Context** (cho AI đúng thứ nó cần), **Verification** (không kiểm chứng được thì không ship), **Ownership** (bạn ký tên cho từng dòng).

---

## Khối 1 · Hào · Slide 1–13

### Slide 1 · Vibe Coding SOPs

**Hiểu trước khi nói.** SOP là standard operating procedure, quy trình vận hành chuẩn: một việc lặp lại được viết thành các bước cố định, để ai làm cũng ra cùng kết quả, kể cả lúc mệt. Trong ngành phần mềm, "vibe coding" là cách gọi việc để AI viết code rồi dùng luôn mà không đọc kỹ. Buổi này không cấm dùng AI; nó dạy cách dùng AI mà vẫn ship được code đúng.

**Nói đơn giản.** Buổi này nói về một chuyện rất cụ thể: khi AI viết phần lớn code cho bạn, bạn phải làm gì để code đó không gây hoạ. Câu trả lời là một bộ quy trình, gọi là SOP, giống như checklist của phi công trước khi cất cánh.

**Đọc.** Chủ đề hôm nay là quy trình để ship code có AI tham gia, tức là code mà mình không hoàn toàn tự viết. SOP nghĩa là quy trình vận hành chuẩn: một việc lặp lại, viết thành các bước cố định, để kết quả như nhau bất kể ai làm và làm lúc nào.

Một câu hỏi để vào bài. Tuần này ai đã ship code do AI sinh ra? Và trong số đó, ai đã đọc từng dòng trước khi merge? Khoảng cách giữa hai con số đó chính là nội dung của buổi. Ai cũng dùng AI, rất ít người review đủ. Hôm nay nói về phần review đó.

Cấu trúc: khoảng tám mươi lăm phút, hỏi đáp xen giữa các phần.

---

### Slide 2 · AI doesn't replace you, it forces you up a level

**Hiểu trước khi nói.** Ý cốt lõi: khi AI viết phần lớn code, việc của bạn chuyển từ gõ sang review. Mô hình để hình dung: AI là một junior developer cực nhanh, không mệt, đọc hết tài liệu công khai, nhưng thỉnh thoảng bịa (tên hàm, tên thư viện) và đôi khi phá hỏng mọi thứ vì không hiểu hệ quả. Bạn là tech lead của junior đó. Andrej Karpathy đặt ra từ "vibe coding" tháng 2 năm 2025 với nghĩa "buông theo cảm giác, quên code đi". Simon Willison, một lập trình viên có tiếng, định nghĩa chặt hơn: vibe coding là build phần mềm bằng LLM mà không review code nó viết; hợp cho prototype, sai chỗ cho production. Ông gọi cách làm có kiểm chứng là "vibe engineering".

**Nói đơn giản.** Trước đây bạn là người gõ. Giờ AI gõ, bạn là người kiểm. Giống như bạn lên làm tổ trưởng, có một nhân viên mới rất nhanh nhưng hay nói bừa: bạn không gõ thay nó, nhưng mọi thứ nó nộp ra đều mang tên bạn.

**Đọc.** Hình bên trái là người gõ code. Hình bên phải là người cầm kính lúp soi diff. AI không thay bạn; nó ép bạn đi từ hình trái sang hình phải.

Hãy hình dung AI như một junior developer cực nhanh, không biết mệt, nhưng thỉnh thoảng bịa và đôi khi phá sạch mọi thứ. Bạn là tech lead của junior đó. Tech lead không gõ thay junior, nhưng chịu trách nhiệm cho mọi thứ junior merge. Cách một tech lead tốt làm việc với junior chính là SOP: giao việc rõ, cho đủ context, yêu cầu bằng chứng, đọc diff, rồi ký tên.

Một điều bài này không hứa: code nhanh gấp mười. Bạn sẽ gõ ít hơn, đúng. Nhưng gõ chưa bao giờ là nút thắt. Nút thắt là hiểu vấn đề, review được thay đổi, và đúng ở edge case. Ba việc đó AI không làm rẻ đi.

---

### Slide 3 · Speed is what AI gives for free. Quality isn't.

**Hiểu trước khi nói.** Ba con số, ba nguồn. Veracode 2025: 45% code AI sinh ra không qua benchmark OWASP Top 10 (danh sách mười loại lỗ hổng web phổ biến nhất). Uplevel, nghiên cứu khoảng 800 developer: bug rate tăng khoảng 41% ở đội áp dụng AI mà không có quy trình. Stack Overflow và GitHub 2025: 92% developer dùng AI tool hằng ngày nhưng chỉ 29% tin output. Điểm quan trọng nhất là khoảng cách giữa dùng và tin: người ta dùng thứ mình không tin. SOP là cách biến "không tin" thành "có bước để kiểm".

**Nói đơn giản.** Ba con số chỉ nói một điều: người ta dùng AI rất nhiều nhưng không tin nó, và khi không có quy trình thì bug tăng. Quy trình là thứ biến "không tin" thành "có cách kiểm".

**Đọc.** Ba con số để thấy tại sao cần quy trình.

Bốn mươi lăm phần trăm: gần một nửa code AI sinh ra không qua được benchmark OWASP Top 10, theo Veracode 2025. Nghĩa là nhận code AI mà không kiểm bảo mật thì xác suất mang lỗ hổng đã biết vào production cỡ tung đồng xu.

Khoảng bốn mươi mốt phần trăm: bug rate tăng chừng đó ở các đội áp dụng AI mà không có quy trình, theo Uplevel. Từ khoá là "không có quy trình": cùng công cụ, kết quả phụ thuộc cách dùng.

Và donut cuối: chín mươi hai phần trăm developer dùng AI hằng ngày, nhưng chỉ hai mươi chín phần trăm tin output của nó. Khoảng hở giữa hai vòng chính là chỗ SOP sống. Người ta đang dùng thứ mình không tin. SOP biến "tôi không tin nó" thành "tôi có bước để kiểm nó".

Tốc độ là thứ AI cho không. Chất lượng thì không.

---

### Slide 4 · Every SOP answers one of three questions

**Hiểu trước khi nói.** Ba trụ là khung của cả bài. Context: AI chỉ biết thứ bạn đưa vào, và phần "đưa vào" có giới hạn. Verification: model không tự biết mình sai, nên bằng chứng phải đến từ ngoài model, tức test, build, screenshot. Ownership: với reviewer và production, việc AI viết là vô hình; commit mang tên bạn. Ba chấm C, V, O ở thanh dưới sẽ sáng theo từng slide để nhắc trụ nào đang được nói.

**Nói đơn giản.** Ba câu hỏi để nhớ suốt buổi. Tôi đã đưa AI đủ thông tin chưa (Context)? Tôi có bằng chứng nó chạy đúng chưa (Verification)? Ai ký tên chịu trách nhiệm (Ownership)? Ba chấm ở góc dưới slide chính là ba câu này.

**Đọc.** Mọi SOP hôm nay trả lời một trong ba câu hỏi.

Context: tôi đã cho AI cái gì? AI chỉ tốt bằng thứ bạn đưa vào. Nó không biết repo của bạn, quy ước của team, cái test đang fail, trừ khi bạn đưa. Và chỗ chứa đó có giới hạn, nên quản như quản RAM.

Verification: tôi chứng minh nó chạy được không? Bằng chứng là test pass, build xanh, screenshot thật. Không phải câu "đã xong" của model, vì model không có khả năng tự biết mình sai.

Ownership: ai ký? Bạn ký, cho từng dòng, kể cả dòng AI viết. AI cầm bút, không cầm quyền quyết.

Từ slide này trở đi, ba chấm ở góc dưới sẽ sáng theo trụ của từng slide. Khi nghe một quy tắc, hãy tự hỏi nó thuộc trụ nào.

---

### Slide 5 · Divider · Why AI gets it wrong

**Nói đơn giản.** Chuyển phần: trước khi học cách dùng, hiểu tại sao AI hay sai.

**Đọc.** Phần một, rất ngắn: vì sao AI sai. Hiểu mô hình hoạt động ra sao thì mọi quy tắc phía sau đều có lý do, thay vì là giáo điều phải học thuộc.

---

### Slide 6 · Hallucination is a property, not a bug

**Hiểu trước khi nói.** LLM (large language model) hoạt động bằng cách dự đoán mảnh chữ tiếp theo có xác suất cao nhất, lặp đi lặp lại. Nó được huấn luyện để tối ưu "nghe hợp lý", không phải "đúng"; bên trong không có bước tra cứu sự thật. Vì thế bịa (hallucination) không phải lỗi hiếm mà là tính chất của cơ chế. Giọng văn tự tin cũng không nói lên độ đúng, vì trong dữ liệu huấn luyện, văn bản đúng thường viết tự tin, nên model học cách viết tự tin bất kể đúng sai. Context window là toàn bộ thứ model "nhìn thấy" trong một lần gọi: system prompt, lịch sử chat, file dán vào, output lệnh. Nó hữu hạn, và chất lượng giảm trước khi hết chỗ: khi context dài, cơ chế attention (so khớp mọi cặp token) bị loãng, model quên chỉ dẫn đầu và sai nhiều hơn. Anthropic gọi hiện tượng này là context rot.

**Nói đơn giản.** AI viết chữ bằng cách đoán chữ tiếp theo cho nghe hợp tai, không phải cho đúng. Nên nó bịa là chuyện bình thường, và bịa bằng giọng rất tự tin. Thêm nữa, trí nhớ ngắn hạn của nó có giới hạn, nhét nhiều quá thì nó quên phần đầu. Vì vậy: chia nhỏ việc trước khi hỏi.

**Đọc.** Bên trái là cách model làm việc. Câu đang viết dở: "the function returns a". Model có bốn ứng viên cho mảnh chữ tiếp theo, mỗi ứng viên một xác suất. Nó chọn "Promise" vì xác suất cao nhất, không phải vì nó đã kiểm tra hàm đó trả về gì. Toàn bộ LLM là phép chọn này lặp lại hàng nghìn lần. Nó tối ưu cho "nghe hợp lý nhất", không phải "đúng nhất". Không có bộ kiểm-sự-thật bên trong. Vì thế bịa không phải bug hiếm gặp; nó là tính chất của cơ chế. Và model bịa vẫn nghe tự tin, vì giọng tự tin có xác suất cao trong dữ liệu nó học. Độ tự tin của câu chữ không mang thông tin về độ đúng.

Thanh phía dưới là context window, tức mọi thứ model nhìn thấy trong một lần gọi: system prompt, lịch sử chat, file bạn dán, output của lệnh. Nó có giới hạn, và quan trọng hơn, nó mục dần khi đầy lên. Nhìn thanh đầy từ trái sang phải: chữ "system prompt" ở đầu mờ đi. Đó là chuyện thật: context càng dài, attention càng loãng, model quên chỉ dẫn ban đầu và sai nhiều hơn.

Hệ quả thực hành: ném một file mười nghìn dòng vào rồi hỏi, nó quên phần đầu và bịa phần sau. Cách xử lý ở dòng cuối: chia nhỏ bài toán trước khi prompt. Bốn thanh xanh, bốn cửa sổ sạch.

Câu chốt: context là tài nguyên bạn phải quản như RAM.

---

### Slide 7 · Your agent doesn't know. It reasons, acts, and observes.

**Hiểu trước khi nói.** Nếu model chỉ dự đoán chữ, tại sao Claude Code hay Cursor agent sửa được bug thật? Vì tool bọc model trong một vòng lặp gọi là ReAct (Reason + Act, từ paper của Yao và cộng sự năm 2022). Reason: model viết ra suy nghĩ về việc cần làm tiếp. Act: model gọi một tool có thật, ví dụ đọc file, chạy test, tìm kiếm, sửa file. Observe: kết quả thật của tool được nạp ngược vào context. Lặp lại đến khi xong hoặc hết ngân sách bước. Bước Observe là chỗ duy nhất sự thật từ bên ngoài đi vào. Chat thường không có bước này, nên chat bịa API mà không có gì phủ định. Từ đó rút ra: agent chỉ đáng tin bằng những gì tool cho nó thấy; không có test thì agent chỉ có thể "nói" là xong.

**Nói đơn giản.** Tool như Claude Code không "biết" gì hơn model, nhưng nó cho model một vòng lặp: nghĩ, làm một việc thật (đọc file, chạy test), nhìn kết quả thật, rồi nghĩ tiếp. Kết quả thật là thứ duy nhất nó tin được. Không có test để chạy thì nó chỉ có thể nói "xong rồi".

**Đọc.** Slide trước nói model không có bộ kiểm-sự-thật. Vậy tại sao agent vẫn sửa được bug thật, chạy được test thật? Vì tool bọc model trong vòng lặp này. Nó có tên là ReAct: reason và act.

Nút một, Reason: model đọc mục tiêu và toàn bộ context, rồi viết ra suy nghĩ, mình cần biết gì tiếp theo. Ví dụ: test đang fail ở file billing test, mình cần đọc billing.js trước.

Nút hai, Act: model chọn một tool và gọi nó với tham số cụ thể. Đọc file, tìm trong repo, chạy node test, sửa một đoạn code. Tool là thứ có thật, chạy bên ngoài model.

Nút ba, Observe: kết quả thật của tool được nạp ngược vào context. Nội dung file, output của test, lỗi compile. Đây là điểm duy nhất trong cả vòng lặp mà sự thật từ bên ngoài đi vào. Nhìn cái cổng nhỏ bên trái: "tool output, the only way in".

Rồi lặp lại cho đến khi xong. Chat thường là một lần: prompt vào, câu trả lời ra, không có observe. Agent là nhiều vòng, mỗi vòng một lần quan sát thật.

Ba hệ quả. Một: agent chỉ đáng tin bằng những gì tool cho nó thấy. Repo không có test thì bước observe chỉ có "file đã ghi", và agent kết luận xong vì không có gì phủ định. Cho nó test, build, lint, ba chip xanh đi vào cổng, là thêm quan sát thật vào vòng lặp. Hai: bước reason là chỗ nó tự tin sai, vì suy nghĩ vẫn là văn bản dự đoán; đọc log tool call quan trọng hơn đọc lời giải thích của agent. Ba: bước act là chỗ phải giới hạn quyền. Đọc file thì thoải mái, chạy test thì được, push hay xoá hay cài package thì phải qua người.

---

### Slide 8 · Divider · AI-Assisted Workflow

**Nói đơn giản.** Chuyển phần: bốn thói quen làm việc với AI.

**Đọc.** Phần 7.1, trái tim của bài. Bốn mục theo thứ tự nhân quả: viết prompt tốt, nuôi và dọn context, vòng lặp tinh chỉnh, và workflow cho task lớn. Tất cả là hệ quả của hai slide vừa rồi: model chỉ có thứ bạn đưa, và thứ bạn đưa có giới hạn.

---

### Slide 9 · More specific = fewer corrections

**Hiểu trước khi nói.** Prompt mơ hồ buộc model đoán, và nó đoán theo kiểu phổ biến nhất trong dữ liệu huấn luyện, tức không phải kiểu của team bạn. Prompt tốt có ba thứ: phạm vi, ràng buộc, tiêu chí thành công. Bốn thói quen từ tài liệu Anthropic và promptingguide.ai: cho ví dụ thay vì mô tả (gọi là few-shot); tài liệu dài đặt đầu prompt, câu hỏi đặt cuối (model chú ý phần cuối hơn); đưa tiêu chí thành công để model tự kiểm; gọi đúng tên kỹ thuật để tra được: few-shot, chain-of-thought (yêu cầu nêu các bước suy luận), prompt chaining (chia thành nhiều prompt nối tiếp).

**Nói đơn giản.** Nói với AI như giao việc cho người mới: nói rõ cần gì, không được gì, và xong là như thế nào. Prompt tệ không phải vì viết dở, mà vì giấu thông tin chỉ mình biết.

**Đọc.** Hai cửa sổ chat. Bên trái, prompt "add tests for foo.py". Model phải đoán test cho hàm nào, case nào, mock hay gọi thật, framework nào. Nó đoán theo kiểu phổ biến nhất, tức không phải kiểu của team bạn, và câu trả lời là cái khối mờ có dấu hỏi. Rồi bạn sửa ba vòng.

Bên phải, cùng câu đó nhưng có phần thêm vào, tô xanh như một dòng diff: cover edge case user đã logout, không dùng mock. Dài hơn không nhiều, nhưng có phạm vi, có ràng buộc, và ngầm có tiêu chí thành công. Câu trả lời có dấu tick.

Bốn thói quen ở hàng dưới. Cho ví dụ thay vì mô tả: "validateEmail, user@example.com ra true, user@.com ra false" tốt hơn một đoạn văn tả hàm. Tài liệu dài đặt đầu prompt, câu hỏi đặt cuối. Đưa sẵn tiêu chí thành công: chạy test sau khi implement. Và gọi đúng tên kỹ thuật để tra được: few-shot, chain-of-thought, prompt chaining.

Câu chốt: prompt tồi không phải vì bạn viết dở tiếng Anh. Nó tồi vì bạn giấu context mà chỉ bạn biết.

---

### Slide 10 · Don't ask "write me the SQL"

**Hiểu trước khi nói.** Postgres có bộ lập kế hoạch (planner) quyết định cách chạy một câu SQL. EXPLAIN cho xem kế hoạch dự kiến; EXPLAIN ANALYZE chạy thật và cho thời gian, số dòng thực tế từng bước. Seq Scan là quét toàn bộ bảng; Index Scan là dùng chỉ mục để nhảy thẳng đến dòng cần. Một prompt tối ưu SQL tốt đưa cho AI đúng thứ một DBA cần: schema, index hiện có, số dòng, câu hiện tại kèm EXPLAIN ANALYZE, version Postgres, mục tiêu. Rồi kiểm chứng bằng cách chạy EXPLAIN thật với câu mới.

**Nói đơn giản.** Ví dụ SQL: đừng nói "viết câu SQL", hãy đưa cấu trúc bảng, index, số dòng, và kết quả EXPLAIN. Rồi tự chạy EXPLAIN kiểm lại. Tin cái máy chấm, không tin lời AI.

**Đọc.** Ví dụ áp dụng cho một việc thật.

Đừng hỏi "viết cho tôi câu SQL lấy đơn hàng theo user". Model sẽ trả về một câu SELECT đúng cú pháp. Nó không biết bảng orders có năm mươi triệu dòng, không biết có index gì, không biết câu hiện tại đang quét cả bảng. Không có gì để tối ưu, nên nó không tối ưu.

Bên phải là năm thứ một DBA cần. Schema các bảng liên quan. Index hiện có. Số dòng, ví dụ orders năm mươi triệu. Câu query hiện tại kèm output EXPLAIN ANALYZE, để model thấy chính xác thứ planner thấy. Và mục tiêu rõ: giảm seq scan trên orders, hoặc dưới một trăm mili giây.

Bên trái là cây kế hoạch thực thi. Trước: Seq Scan on orders, năm mươi triệu dòng, hơn chín giây. Sau khi AI có đủ context và đề xuất index: Index Scan, ba trăm mười hai dòng, ba mili giây.

Bước quyết định: bạn chạy EXPLAIN ANALYZE thật với câu mới. Kiểm chứng với planner, không phải với model. Đó là trụ Verification áp vào SQL.

---

### Slide 11 · A long chat is not a badge of honor

**Hiểu trước khi nói.** Lịch sử hội thoại vừa là đòn bẩy (model nhớ mọi thứ trong phiên) vừa là gánh nặng (nhớ cả sáu lần thử sai). Bốn kỹ thuật quản context từ tài liệu Anthropic: compaction (tóm tắt lịch sử), note-taking (bộ nhớ ngoài như todo.md), sub-agents (agent phụ đọc nhiều file, chỉ trả về tóm tắt), just-in-time retrieval (nạp khi cần thay vì nạp hết từ đầu). Quy tắc hai lần: sửa AI hai lần cùng lỗi mà vẫn sai thì context đã bẩn, hãy clear và viết lại. File quy ước dự án như CLAUDE.md, AGENTS.md được nạp tự động mỗi phiên; giữ ngắn vì nó cũng chiếm context.

**Nói đơn giản.** Chat càng dài, AI càng lẫn, vì nó nhớ cả những lần bạn sửa sai. Sửa hai lần vẫn sai thì mở phiên mới. File CLAUDE.md là sổ tay quy ước cho AI đọc mỗi lần bắt đầu.

**Đọc.** Phiên chat dài không phải huân chương. Bên trái là một session tám lượt: refactor, sửa, sửa lại, "still wrong, fix một", "still wrong, fix hai". Đồng hồ RAM chỉ chín mươi sáu phần trăm. Lịch sử hội thoại là đòn bẩy mạnh nhất, vì model nhớ mọi thứ đã nói; và cũng là thứ dễ làm hỏng nhất, vì nó nhớ cả mọi lối rẽ bỏ dở.

Bốn kỹ thuật có tên. Compaction: tóm tắt lịch sử thành một đoạn ngắn rồi tiếp tục với đoạn đó. Note-taking: bộ nhớ ngoài context, một file todo.md trong repo mà model đọc và cập nhật; trạng thái sống qua nhiều phiên. Sub-agents: giao việc đọc hai mươi file cho agent phụ, chỉ nhận về bản tóm tắt. Just-in-time: nạp thông tin khi cần, theo đường dẫn hoặc câu truy vấn, thay vì đổ hết vào đầu.

Và quy tắc hai lần: đã sửa AI hai lần cùng một lỗi mà vẫn sai, context đã bẩn. Nó bị neo vào cách hiểu sai trong lịch sử. Bấm slash clear, cửa sổ chat sụp xuống còn một prompt sạch có test, error, và file. Đồng hồ về bốn phần trăm. Đừng sửa lần ba.

Câu chốt: context sạch cộng prompt tốt gần như luôn thắng một phiên dài lê thê.

---

### Slide 12 · Big task? Make the AI interview you first

**Hiểu trước khi nói.** Với task lớn, Anthropic đề xuất bốn bước: Explore (đọc, hiểu, không sửa; nhiều tool có plan mode), Plan (ra spec.md, bạn duyệt), Code (bước nhỏ, mỗi bước một test), Commit (checkpoint thường xuyên để quay lại được). Harper Reed có workflow nổi tiếng: prompt "hỏi tôi từng câu một để cùng xây spec chi tiết", ra spec.md, rồi prompt_plan.md và todo.md, rồi thực thi từng bước. Điều khiến agent chạy được một mình là có "check tự chạy": test, build, lint. Không có test, agent chỉ có thể báo xong.

**Nói đơn giản.** Việc lớn thì đừng bảo AI làm ngay. Bắt nó đọc trước, viết kế hoạch, bạn duyệt, rồi mới code từng bước nhỏ có test. Kế hoạch là chỗ bạn cầm lái.

**Đọc.** Task nhỏ thì prompt thẳng. Task lớn, nhiều file, nhiều ngày, thì bắt AI phỏng vấn bạn trước khi viết dòng code nào. Đường ray có bốn ga.

Ga Explore: đọc, hiểu, không sửa gì. Nhiều tool có plan mode đúng cho việc này. Mục đích là tách nghiên cứu khỏi thực thi, để không giải sai bài toán.

Ga Plan: ra một file spec.md và bạn duyệt. Nhìn thanh chắn: nó chỉ mở khi có con dấu approved. Đây là chỗ bạn cầm lái, vì sửa spec rẻ hơn sửa code.

Ga Code: bước nhỏ, mỗi bước một test. Nhìn đèn giao thông trên ga: đèn xanh là "a check it can run". Cho AI một cách tự kiểm là khác biệt giữa phiên bạn phải ngồi canh và phiên bạn có thể bỏ đi. Không có test, agent chỉ có thể nói là xong.

Ga Commit: checkpoint thường xuyên. Mũi tên nét đứt quay về Code: bước sau hỏng thì quay lại bằng git, không phải bằng cách prompt tiếp.

Câu trích ở dưới là của Harper Reed: "Hỏi tôi từng câu một để cùng xây một spec chi tiết." Kết quả là spec do hai bên cùng viết. Spec là nơi bạn cầm lái.

---

### Slide 13 · Every agent pattern has a failure mode. Every SOP step plugs one.

**Hiểu trước khi nói.** Bốn pattern kiến trúc mà mọi agentic coding tool đều dùng. Planner/Executor: một vai chia mục tiêu thành task, các vai khác thực thi từng task phạm vi hẹp; hỏng khi plan sai. Multi-agent: nhiều agent chuyên biệt (đọc, tìm, review) có lớp điều phối; hỏng khi vai chồng lấn và không ai sở hữu kết quả. Memory-augmented: ba loại bộ nhớ, ngắn hạn là phiên, dài hạn là CLAUDE.md và todo.md, có cấu trúc là repo và DB; hỏng khi bộ nhớ cũ hoặc sai làm agent lặp lại lỗi. Tool-using: agent gọi tool đọc, chạy, sửa, cài, push; hỏng khi quyền ghi sai hoặc package sai. Mỗi pattern ứng với một bước SOP đã nói và một trụ.

**Nói đơn giản.** Bốn kiểu "máy" bên trong tool AI, mỗi kiểu có một chỗ dễ hỏng, và mỗi chỗ hỏng ứng với một bước trong checklist của mình.

**Đọc.** Bốn pattern mà mọi agentic coding tool hiện nay đều dùng. Với mỗi pattern: nó làm gì, hỏng ở đâu, và bước SOP nào bịt chỗ hỏng.

Planner Executor: một vai lập kế hoạch chia mục tiêu thành task, các vai thực thi làm từng task phạm vi hẹp. Hỏng khi plan sai, vì mọi bước sau sai một cách nhất quán. Vá bằng: duyệt spec trước khi có dòng code nào, và một test mỗi bước. Trụ Context.

Multi-agent: nhiều agent chuyên biệt, đọc, tìm, review, có lớp điều phối. Hỏng khi vai chồng lấn và không ai sở hữu kết quả, agent này tin lời agent kia như tin sự thật. Vá bằng: tách Writer và Reviewer, sub-agent chỉ trả tóm tắt, và đúng một người ký. Trụ Ownership.

Memory-augmented: ba lớp bộ nhớ, session, file như CLAUDE.md và todo.md, và repo với DB. Hỏng khi bộ nhớ cũ hoặc sai làm agent lặp lại đúng một lỗi ở mọi phiên, và ai cũng tưởng đó là quy ước. Vá bằng: giữ CLAUDE.md ngắn và đúng, clear khi context bẩn. Trụ Context.

Tool-using: agent gọi tool đọc, test, sửa, và cả cài package, push. Hỏng khi quyền ghi sai hoặc package sai; hai sự cố sẽ nói ở phần sau. Vá bằng: quyền tối thiểu cho từng tool, cài và push phải qua người. Trụ Verification và Ownership.

Bốn pattern này giải thích vì sao checklist ở phần 7.4 có đúng những bước đó, và bỏ một bước là mở lại đúng một chỗ hỏng.

**Trao mic:** "Đó là cách làm việc với AI cho đúng: context, vòng lặp nhỏ, spec trước, và biết agent chạy bằng gì bên trong. Nhưng làm nhanh mà không review được thì vô nghĩa. Phần quan trọng nhất, review và những chỗ AI hỏng âm thầm, Nhân sẽ dẫn."

---

## Khối 2 · Nhân · Slide 14–20

### Slide 14 · Divider · Code Review Process

**Hiểu trước khi nói.** Review code AI khác review code người: code người viết có "hình dạng" trong đầu người viết, reviewer chỉ cần kiểm lại; code AI không có hình dạng trong đầu ai, reviewer phải dựng từ đầu, nên chậm hơn. Bốn trục review: đúng, an toàn, đủ nhanh, test có nghĩa.

**Nói đơn giản.** Chuyển phần: khi AI nộp code, mình soi cái gì.

**Đọc.** Phần 7.2, code review. Review code AI khác review code người ở một điểm: code bạn viết có hình dạng trong đầu bạn, review chỉ là kiểm lại. Code bạn chấp nhận từ AI không có hình dạng trong đầu ai. Review phải dựng hình dạng đó từ đầu, nên chậm hơn, không nhanh hơn. Bốn trục chỉ con người ký được: đúng, an toàn, đủ nhanh, và test có nghĩa. Mỗi trục một quy tắc.

---

### Slide 15 · You have to test what it writes.

**Hiểu trước khi nói.** Câu của Simon Willison: "If you haven't seen it run, it's not a working system." AI mắc lỗi kiểu "deeply inhuman": bịa thư viện, bịa method, tự tin khi sai. Nguy hiểm vì code AI viết sai vẫn trông đúng (tên đẹp, có comment), trong khi reviewer người quen dùng "trông hợp lý" làm bộ lọc. SOP: bắt AI trưng bằng chứng: output test nguyên văn, lệnh đã chạy và kết quả, screenshot. Mẹo Writer/Reviewer: một phiên viết, một phiên context sạch review, vì phiên viết có thiên kiến với code nó vừa viết.

**Nói đơn giản.** Quy tắc số một: phải thấy nó chạy. AI nói "xong, test pass" không có giá trị; bắt nó đưa output test thật.

**Đọc.** Một quy tắc bất di bất dịch, của Simon Willison: bạn phải test thứ nó viết. Chưa thấy nó chạy thì chưa phải hệ thống chạy được.

Nhìn hai cửa sổ. Bên trái, agent nói: "Done, refactored calc, all tests pass, ready to merge." Bên phải, terminal thật: hai test fail. Hai cái này đặt cạnh nhau là cả slide.

Vì sao phải nhấn mạnh điều hiển nhiên này? Vì AI mắc lỗi kiểu rất không giống người. Một junior viết sai thì thường trông sai: tên biến lạ, logic lủng củng. AI viết sai thì trông đúng: đặt tên đẹp, có docstring, có comment, và gọi một method không tồn tại. Reviewer người quen dùng "trông hợp lý" làm bộ lọc đầu, và bộ lọc đó vô hiệu với code AI. Code càng trông chuyên nghiệp, càng ít bị kiểm.

Quy tắc: bắt AI trưng bằng chứng thay vì lời khẳng định. Ba con dấu: output của test nguyên văn, lệnh nó đã chạy và kết quả, screenshot màn hình thật. Không chấp nhận chữ "đã xong" không kèm output.

Mẹo tổ chức: Writer và Reviewer. Một phiên viết code, một phiên khác với context sạch review lại diff. Phiên viết có thiên kiến với code nó vừa viết, giống người. Phiên sạch đọc như người lạ. Kết hợp với quy tắc cuối của người: đọc lại diff như thể người lạ viết, vì đúng là người lạ viết.

---

### Slide 16 · When hallucination becomes a supply-chain attack

**Hiểu trước khi nói.** Slopsquatting, chơi chữ từ typosquatting (đăng ký tên gần giống package nổi tiếng để bẫy người gõ nhầm). Cơ chế: AI gợi ý một package nghe hợp lý nhưng không tồn tại; kẻ tấn công biết model hay bịa tên đó nên đăng ký sẵn trên npm hoặc PyPI kèm mã độc trong install script; bạn hoặc agent của bạn chạy npm install, mã độc chạy với quyền của bạn. Số liệu từ Socket tổng hợp: 576 nghìn mẫu code, 16 model, 19,7% package gợi ý không tồn tại (5,2% ở model thương mại, 21,7% open-source), và 58% tên bịa lặp lại qua nhiều lần chạy, nên mục tiêu dự đoán được. Lockfile không bảo vệ vì nó chỉ khoá version của package đã chọn. SOP: kiểm tra package tồn tại và uy tín (tuổi, lượt tải, maintainer, repo) trước khi cài; npm audit và dependency scanning trong CI; không cho agent tự cài package.

**Nói đơn giản.** AI hay gợi ý tên thư viện không tồn tại. Kẻ xấu biết vậy nên đăng ký sẵn tên đó kèm mã độc. Bạn cài là dính. Kiểm tra thư viện có thật và uy tín trước khi cài.

**Đọc.** Kể như một câu chuyện, theo bốn nút. Nút một: AI gợi ý một package, "use react-validate-utils-pro". Tên nghe rất hợp lý. Nút hai: package đó không tồn tại. Model bịa, vì tên đó có xác suất cao theo mẫu; chuyện này xảy ra gần hai mươi phần trăm số lần. Nút ba: kẻ tấn công biết model hay bịa đúng tên đó, nên đăng ký sẵn trên npm hoặc PyPI, kèm mã độc. Nút bốn: bạn, hoặc agent của bạn, gõ npm install. Script postinstall chạy với quyền của bạn, trên máy dev hoặc trong CI. Hallucination vừa biến thành lỗ hổng supply chain. Người ta gọi là slopsquatting.

Hai con số bên phải, từ nghiên cứu Socket tổng hợp trên năm trăm bảy mươi sáu nghìn mẫu code sinh bởi mười sáu model. Mười chín phẩy bảy phần trăm package được gợi ý không tồn tại. Và đáng sợ hơn: năm mươi tám phần trăm tên bịa lặp lại qua nhiều lần chạy. Attacker không cần đoán mò; chạy model vài lần với prompt phổ biến, lấy đúng tên nó hay bịa, đăng ký. Mục tiêu trở nên dự đoán được.

Vì sao chuyện này mới: typosquatting cũ dựa vào người gõ nhầm, xác suất thấp và ngẫu nhiên. Slopsquatting dựa vào model gợi ý cùng một tên sai cho hàng nghìn người, xác suất cao và có hệ thống.

SOP: trước khi cài bất kỳ package nào AI gợi ý, kiểm tra nó tồn tại trên registry chính thức, đúng tên. Kiểm tra uy tín: tuổi, lượt tải hằng tuần, maintainer, repo có thật không. Cảnh giác với package mới tạo, ít lượt tải, tên gần giống package nổi tiếng. npm audit và dependency scanning trong CI. Và với agent: không cho quyền cài package tự do, cài là bước có người duyệt.

Nếu ai hỏi lockfile có bảo vệ không: lockfile khoá version của package đã chọn, nó không ngăn chọn nhầm package ngay lần đầu.

---

### Slide 17 · Five of the ten, straight out of the model

**Hiểu trước khi nói.** OWASP Top 10 (bản 2021) là danh sách mười loại rủi ro web phổ biến nhất. A01 Broken Access Control: người dùng làm được việc không được phép; IDOR là đổi id trên URL để xem dữ liệu người khác. A02 Cryptographic Failures: key hardcode, hash yếu như MD5 không salt, Math.random() làm token (không phải bộ sinh ngẫu nhiên mật mã, đoán được; dùng crypto.randomBytes hoặc randomUUID). A03 Injection: SQL nối chuỗi, XSS. A04 Insecure Design: tin client cho giá hoặc role. A05 Security Misconfiguration: CORS mở, bucket public, route debug còn sót. SAST (static application security testing) là công cụ quét code tĩnh: Semgrep với ruleset OWASP bắt pattern lỗi, gitleaks quét secret. Nghiên cứu Stanford và NYU: developer dùng AI assistant viết code kém an toàn hơn và tự tin hơn.

**Nói đơn giản.** Năm trong mười loại lỗ hổng phổ biến nhất là thứ AI hay tự tạo ra: quên kiểm tra quyền, hardcode key, nối chuỗi SQL, tin dữ liệu từ client, cấu hình mở. Cần máy quét code trong CI làm lưới đỡ.

**Đọc.** Mười ô là OWASP Top 10, danh sách mười loại rủi ro web phổ biến nhất. Năm ô sáng là năm loại AI hay tạo ra nhất. Đi từng ô.

A01, Broken Access Control. Thiếu auth middleware, IDOR. Cách AI tạo ra: refactor một handler, giữ happy path, đánh rơi đoạn kiểm tra quyền; hoặc sinh endpoint mới mà quên guard vì prompt không nhắc. IDOR là đổi id mười bảy thành mười tám trên URL là xem được đơn hàng người khác. Đây là lỗi review AI phổ biến nhất ngoài đời, và test không bắt được vì test sinh từ cùng happy path.

A02, Cryptographic Failures. API key hardcode, vì AI học từ vô số ví dụ có key giả nên điền một chuỗi trông như key thật. Hash mật khẩu bằng MD5. Và Math.random() làm token: nó không phải bộ sinh ngẫu nhiên mật mã, đoán được từ vài giá trị trước.

A03, Injection. SQL nối chuỗi vì prompt nói "dynamic filter" và model chọn cách đơn giản nhất. XSS vì render HTML từ input người dùng không escape.

A04, Insecure Design. Tin client cho giá hoặc role gửi lên trong request. Code đúng cú pháp, sai thiết kế; không linter nào bắt được, chỉ người hiểu nghiệp vụ mới thấy.

A05, Misconfiguration. CORS mở toang "cho nó chạy", bucket public, route debug còn sót lại.

Có nghiên cứu Stanford và NYU: developer dùng AI assistant viết code kém an toàn hơn, và tự tin hơn rằng code mình an toàn. Hai hiệu ứng cộng lại là lý do cần lưới đỡ bằng máy. Nhìn tấm lưới hạ xuống: SAST, quét code tĩnh. Semgrep với ruleset OWASP bắt injection, thiếu auth, crypto yếu. gitleaks quét secret trong diff. Chạy trên mọi PR, fail build khi có finding mức cao. Nó không thay review; nó bắt phần mắt người bỏ khi vội.

---

### Slide 18 · Two places AI is "green but wrong"

**Hiểu trước khi nói.** Performance: bốn mùi. N+1 query là lấy danh sách rồi trong vòng lặp gọi thêm query cho từng phần tử, 101 query thay vì 2. Thiếu index cho cột WHERE mới. Unbounded fetch là findAll không LIMIT trên bảng đã lớn. O(n²) vô tình là includes lồng trong vòng lặp trên hai list. Cả bốn pass unit test vì test chạy trên dữ liệu nhỏ. Test dởm: lạm dụng mock đến mức chỉ assert "hàm đã được gọi"; khẳng định hành vi hiện tại thay vì hành vi đúng (test sinh bằng cách chạy code rồi ghi lại output, nên code sai thì test sai theo và vẫn xanh); coverage cao nhưng assertion vô nghĩa. Phép thử: xoá business rule mà test vẫn pass thì đó không phải test. Số 900_00 là tiền tính bằng cent nguyên thay vì float.

**Nói đơn giản.** Hai kiểu "xanh mà sai": code chậm nhưng test vẫn pass vì test chỉ chạy trên mười dòng; và test do AI sinh chỉ chứng minh hàm được gọi, không chứng minh kết quả đúng. Phép thử: xoá luật nghiệp vụ mà test vẫn xanh thì đó không phải test.

**Đọc.** Hai chỗ code AI xanh mà sai: test pass, CI xanh, và vẫn hỏng ở production. Để ý cái badge góc phải: bốn test pass, trên mười dòng dữ liệu. Nó sẽ xanh suốt slide này.

Bên trái là N+1. Lấy danh sách một trăm đơn hàng, rồi trong vòng lặp gọi thêm một query lấy user của từng đơn. Một trăm lẻ một query thay vì hai. Code trông sạch, mỗi dòng đều hợp lý. Ba mùi còn lại ở dưới: thiếu index cho cột WHERE mới thêm, trên mười dòng không khác gì, trên năm mươi triệu dòng là full scan. findAll không giới hạn trên bảng đã lớn, chạy ổn hai năm rồi một ngày đủ lớn để hết memory. Và O bình phương vô tình, includes lồng trong vòng lặp trên hai list, mười phần tử thì trăm phép so, mười nghìn thì trăm triệu. Cả bốn pass mọi unit test, vì unit test chạy trên dữ liệu nhỏ. Badge vẫn xanh.

Bên phải là test dởm. Donut coverage chín mươi lăm phần trăm, xanh, và bên trong ghi: không rule nào được kiểm chứng. Dòng code dưới là ví dụ: expect spy to have been called. Test này mock hàm giảm giá, gọi total, rồi assert là hàm đã được gọi. Nó xanh dù công thức giảm giá sai hoàn toàn. Kiểu thứ hai: khẳng định hành vi hiện tại thay vì hành vi đúng. Test sinh bằng cách chạy code rồi ghi lại output; nếu code đang sai, test xanh chỉ đóng băng cái sai lại. Test đúng phải dẫn xuất từ yêu cầu: đúng một trăm đơn vị thì giảm mười phần trăm, tổng chín trăm đô, số chín trăm lấy từ spec, không phải từ chạy code.

Phép thử một câu: xoá business rule đi mà test vẫn pass, thì đó không phải test. Nhìn dòng cuối: xoá dòng if qty lớn hơn bằng một trăm, badge vẫn xanh. Chữ "green" trong tiêu đề đổi sang đỏ là vì vậy.

SOP: người viết ít nhất một test edge case mà AI bỏ sót, và tự chạy để thấy nó pass thật. Chốt phần 7.2: AI review được style và lỗi rõ. Bốn thứ chỉ con người ký: đúng, an toàn, đủ nhanh, test có nghĩa.

---

### Slide 19 · Divider · Documentation

**Nói đơn giản.** Chuyển phần: tài liệu.

**Đọc.** Phần 7.3, documentation, một slide. Nguyên tắc: cho AI cầm bút, không cho AI cầm quyền quyết.

---

### Slide 20 · AI drafts; a human reviews and decides

**Hiểu trước khi nói.** Docs từ code an toàn vì nguồn sự thật đã check in, model chỉ tóm tắt thứ nó thấy; ngược lại, sinh code từ văn xuôi mô tả thứ bạn ước là có thì lệch ngay khi một bên đổi. Cảnh báo: docs AI sinh "nghe hợp lý nhưng sai kỹ thuật" đúng ở chỗ phức tạp nhất. Diátaxis (diataxis.fr) chia docs theo hai trục: người đọc đang học hay đang làm, cần thực hành hay lý thuyết; ra bốn loại tutorial, how-to, reference, explanation. Docs khó dùng vì trộn bốn loại vào một trang. ADR (Architecture Decision Record) theo template Nygard: Title, Status, Context, Decision, Consequences; bất biến, quyết định mới thì viết ADR mới supersede cái cũ. AI được draft ADR nhưng không được quyết vì nó bịa rationale team chưa từng bàn. RFC là tài liệu bàn trước khi làm, ADR ghi lại quyết định đã chốt.

**Nói đơn giản.** AI viết nháp tài liệu thì tốt, nhưng quyết định kiến trúc phải là người ký. Tài liệu chia bốn loại cho bốn nhu cầu, trộn lẫn là khó dùng.

**Đọc.** Dòng đầu: code sang docs thì an toàn, vì nguồn sự thật đã check in và model chỉ tóm tắt thứ nó nhìn thấy. Văn xuôi sang code thì drift: sinh code từ một đoạn mô tả thứ bạn ước là có sẽ cho ra thứ trông khớp, và lệch ngay khi một bên thay đổi. Cảnh báo quan trọng: docs AI sinh nghe rất hợp lý nhưng sai kỹ thuật đúng ở những chỗ phức tạp nhất, nơi model phải suy diễn thay vì tóm tắt, và đó cũng là nơi cần docs nhất. Người duyệt tập trung vào chỗ phức tạp.

Lưới bốn ô là Diátaxis. Hai trục: người đọc đang học hay đang làm, và họ cần thực hành hay lý thuyết. Tutorial để học, cầm tay chỉ việc. How-to để làm một việc cụ thể có mục tiêu rõ. Reference để tra cứu chính xác, khô, đầy đủ. Explanation để hiểu vì sao. AI viết loại nào cũng nhanh. Chọn loại nào cho ai là việc của bạn. Phần lớn docs khó dùng vì trộn bốn loại vào một trang.

Bên phải là một tờ ADR, Architecture Decision Record, theo template Nygard: title, status, context, decision, và consequences. ADR bất biến; quyết định mới thì viết ADR mới supersede cái cũ, để lịch sử suy nghĩ còn nguyên. Một ADR là một quyết định kèm điều kiện hết hạn, dòng "revisit when". Không có điều kiện hết hạn thì nó là trang wiki.

Điểm đắt nhất là hai con dấu. "Drafted by AI" thì được. "Decided by" phải là tên người. Model bịa rationale rất trôi chảy, và team sẽ có một tài liệu ghi lý do chưa ai từng bàn. Context và Decision phải do người viết hoặc sửa từng câu.

Chốt: cho AI cầm bút, đừng cho AI cầm quyền quyết. Đây là trụ Ownership.

**Trao mic:** "Biết cái gì cần bắt rồi: đúng, an toàn, đủ nhanh, test có nghĩa, và AI không được quyết. Câu hỏi là làm sao bắt nó mỗi lần, kể cả lúc hai giờ sáng. Hào sẽ đưa khung SOP, rồi kể về một đội đã bỏ hẳn người ra khỏi vòng lặp như thế nào."

---

## Khối 3 · Hào · Slide 21–28

### Slide 21 · SOPs for common tasks

**Hiểu trước khi nói.** Checklist là cho người đã biết làm nhưng sẽ bỏ sót khi vội và tự tin; không ai merge AI diff tồi vì không biết review, họ merge vì nó trông hợp lý và họ đang vội. Khung SOP bốn bước áp cho mọi task: nạp context chuẩn, cho AI cách tự kiểm, verify rủi ro đặc thù của loại task, người ký tên. Rủi ro riêng: service mới (AI mạnh ở boilerplate, verify convention và phân tầng), migration theo Fowler (nhỏ, versioned, forward-only, có rollback, parallel change: expand rồi migrate rồi contract, không drop cột trong cùng release ngừng ghi), endpoint (validate input, authorize mọi endpoint, error contract, pagination), integration test (dependency thật trong container, mỗi test tự dọn, test flaky là test fail). Năm checklist đầy đủ nằm trong README.

**Nói đơn giản.** Một khung bốn bước dùng cho mọi việc: nạp thông tin chuẩn, cho AI cách tự kiểm, soi rủi ro riêng của loại việc đó, người ký tên.

**Đọc.** SOP thực ra là gì: một việc lặp lại, viết thành các bước cố định, để kết quả như nhau bất kể ai làm và mệt đến đâu. Nó là checklist chứ không phải bài giảng. Nó viết cho ngày tệ nhất của bạn, hai giờ sáng, đang vội, đang dở việc khác. Và nó sống: một sự cố thêm một bước, một bước không ai làm theo thì xoá. Checklist không phải cho người chưa biết. Không ai merge một AI diff tồi vì không biết review; họ merge vì nó trông hợp lý, họ đang vội, và họ tự tin.

Checklist cụ thể phụ thuộc stack của team, nên đây là một khung. Tờ giấy có bốn ô. Một, nạp context chuẩn: template của team, một PR mẫu tốt gần đây, file convention, schema. Trụ Context. Hai, cho AI một cách tự kiểm: test, build, lint chạy được trong phiên. Ba, verify điểm rủi ro đặc thù của loại task. Bốn, người ký tên trước khi merge. Trụ Ownership.

Điểm rủi ro theo từng loại task ở dòng cuối. Service mới: đây là chỗ AI mạnh nhất và an toàn nhất, vì boilerplate, DTO, mapper là việc nhàm chán và kiểm chứng được ngay; verify đúng convention, đúng phân tầng, controller không gọi thẳng repository. Migration: nhỏ và tăng dần, versioned cùng code, chỉ đi tới và không sửa migration đã apply, có rollback viết ra trước, và breaking change thì dùng parallel change: thêm cột mới, ghi cả hai, bỏ cột cũ ở release sau; không bao giờ drop cột trong cùng release ngừng ghi vào nó. Endpoint: validate input ở biên, authorize trên mọi endpoint chứ không chỉ cái hiển nhiên, quyết định error contract, pagination từ đầu. Integration test: dependency thật trong container thay vì mock, mỗi test tự dọn dữ liệu, test flaky là test fail.

Năm checklist đầy đủ có trong README của repo. Chốt: SOP không phải để trói tay. Nó là context đóng gói sẵn để lần sau bạn và AI làm đúng ngay từ đầu.

---

### Slide 22 · Even Karpathy retired "vibe coding"

**Hiểu trước khi nói.** Karpathy đặt tên vibe coding tháng 2 năm 2025. Theo kế hoạch bài giảng, tháng 3 năm 2026 ông chuyển sang thuật ngữ Agentic Engineering: developer là người giám sát, điều phối các agent tự chạy nhiều bước, và giám sát chặt hơn vì agent làm nhiều việc hơn giữa hai lần người nhìn vào. Slide này là cây cầu sang dark factory.

**Nói đơn giản.** Người đặt ra từ "vibe coding" đã bỏ nó, chuyển sang mô hình người giám sát agent, và giám sát chặt hơn. Câu hỏi để lại: nếu tự động mãi thì đi đến đâu?

**Đọc.** Từ đây nhìn về phía trước. Dòng thời gian. Tháng hai năm 2025, Karpathy đặt tên vibe coding: giao phó cho cảm giác, quên code đi. Tháng ba năm 2026, chính ông khai tử nó, thẻ bên trái bị gạch, và chuyển sang Agentic Engineering: developer là người giám sát, điều phối các agent tự chạy nhiều bước, và giám sát còn chặt hơn, không lỏng hơn, vì agent làm nhiều việc hơn giữa hai lần người nhìn vào.

Người khai sinh thuật ngữ cũng đã nâng cấp nó theo đúng hướng bài hôm nay: từ quên code đi sang quy trình có giám sát.

Đường thời gian kéo dài vào chỗ mờ, với một dấu hỏi. Nếu mức tự động cứ tăng, agent làm nhiều hơn, người nhìn ít hơn, thì điểm cuối của con đường là gì? Có tên cho nó: dark factory.

---

### Slide 23 · Divider · The Dark Factory

**Hiểu trước khi nói.** Hình dung một xưởng sản xuất mà bên trong không có công nhân, chỉ có máy; người đứng ngoài chỉ đưa vào bản vẽ và tiêu chuẩn nghiệm thu. Đó là dark factory. Với phần mềm: không ai viết code, không ai review, không ai test tay; người chỉ viết yêu cầu và tiêu chí đạt. Năm slide tiếp theo là năm mục của mô hình, đi theo thứ tự: vì sao cần, đang ở đâu, làm thế nào, cấu trúc ra sao, và có thể hỏng ở đâu.

**Đọc.** Mô hình Dark Factory, nhà máy tối, là một triết lý thiết kế quy trình phát triển phần mềm mà ở đó không có con người tham gia viết code, review code hay kiểm thử thủ công. Con người chỉ đóng vai trò viết đặc tả hệ thống, tức specs, và tiêu chí nghiệm thu; toàn bộ phần việc còn lại do các hệ thống tự động thực hiện.

Khối này đi qua năm mục: vấn đề thực tế của việc áp dụng AI hiện nay, khung cấp độ tự động hoá, lộ trình bốn giai đoạn, kiến trúc bốn lớp, và các rủi ro kèm giải pháp.

---

### Slide 24 · 1 · The problem with AI adoption today

**Hiểu trước khi nói.** Xe đã có động cơ nhanh hơn nhưng đường vẫn kẹt ở trạm thu phí. AI giúp gõ code nhanh, nhưng thời gian thật sự mất ở chỗ chờ người review, cãi về style, test tay trên máy cá nhân. Bảng thời gian trên slide là số đo thật của một đội đã dùng AI rất nhiều.

**Đọc.** Vấn đề thực tế của việc áp dụng AI hiện nay. Nút thắt cổ chai bị dịch chuyển: nhiều tổ chức đang ăn mừng quá sớm khi trang bị các công cụ AI hỗ trợ viết code như Cursor, Copilot, Cody giúp lập trình viên gõ code nhanh hơn. Tuy nhiên, tốc độ viết code nhanh hơn chỉ đẩy nút thắt cổ chai xuống các khâu tiếp theo: lập trình viên vẫn phải chờ review code hàng giờ liền, thường chỉ mang tính thủ tục hoặc bắt lỗi phong cách thiết kế, và mất nhiều thời gian kiểm thử thủ công trên localhost.

Thực trạng lãng phí thời gian: qua khảo sát thời gian làm việc thực tế của một đội kỹ sư, phần lớn thời gian bị lãng phí vào các khâu phi sản xuất. Chờ review PR hai đến tám giờ. Trao đổi qua lại về PR ba mươi đến chín mươi phút. Kiểm thử thủ công ba mươi đến sáu mươi phút. Điều tra bug production có khi hai giờ để sửa năm dòng. Viết boilerplate hàng giờ mà không tạo giá trị.

Kết luận: mới tự động hoá được việc gõ, và chỉ việc gõ. Nút thắt không biến mất, nó chuyển xuống khâu review và kiểm thử.

---

### Slide 25 · 2 · Autonomy levels

**Hiểu trước khi nói.** Giống thang xe tự lái. Nấc 1 AI gợi ý từng câu; nấc 2 AI viết cả file, bạn đọc hết, hầu hết team ở đây; nấc 3 AI viết từ yêu cầu, có bộ kiểm định tự chấm, bạn chỉ bấm duyệt; nấc 3.5 vài dịch vụ tự merge; nấc 4 nhà máy tối. Bước khó nhất là từ 2 lên 3, vì phải thay "người đọc code" bằng "máy chấm".

**Đọc.** Khung cấp độ tự động hoá, lấy cảm hứng từ xe tự lái, để định vị một tổ chức đang ở đâu.

Cấp độ một: AI tự động hoàn thành câu lệnh của bạn, con người làm mọi thứ khác. Cấp độ hai: AI viết toàn bộ hàm hoặc file, con người review từng thay đổi nhỏ; hầu hết các đội ngũ hiện nay đang dừng ở đây. Cấp độ ba: AI tạo code từ các bản đặc tả, các kịch bản holdout đóng vai trò kiểm soát chất lượng, con người phê duyệt lượt merge. Cấp độ ba rưỡi: tương tự cấp ba, nhưng một số dịch vụ tự động merge mà không cần con người. Cấp độ bốn, Full Dark Factory: đặc tả đi vào, mã nguồn đã qua kiểm thử tự động được merge ra, quy trình CI/CD sẵn có tự động deploy.

Khoảng cách khó nhất là từ cấp hai lên cấp ba, vì đó là lúc phải thay người đọc code bằng máy kiểm chứng.

---

### Slide 26 · 3 · Phased rollout

**Hiểu trước khi nói.** Như sửa nhà từng phòng: xong phòng nào ở được phòng đó. Dừng ở giai đoạn 1 vẫn có lãi. Và không phải đập pipeline deploy: mọi thứ sau merge y như cũ.

**Đọc.** Quy trình triển khai bốn giai đoạn. Mỗi giai đoạn đều tự mang lại giá trị độc lập ngay lập tức mà không cần đợi hoàn thành toàn bộ dự án. Giai đoạn một: tối ưu hoá ngữ cảnh cho agent. Giai đoạn hai: phát triển hướng đặc tả với kịch bản holdout. Giai đoạn ba: loại bỏ cổng kiểm soát của con người. Giai đoạn bốn: đạt trạng thái Dark Factory toàn phần. Toàn bộ lộ trình không đụng đến pipeline deploy sẵn có; nó chỉ thay người viết code và người review code.

---

### Slide 27 · Phase 1 · Context optimization

**Hiểu trước khi nói.** AGENTS.md là sổ tay cho nhân viên mới: trăm dòng mục lục, chi tiết để trong docs, cần thì tự đào. Build và test ở máy nó trước khi push. Và thông báo lỗi của linter viết như biển chỉ đường ("rẽ trái ở ngã tư sau") thay vì "sai đường". Đây là trụ Context, và là việc làm được ngay chiều nay.

**Đọc.** Giai đoạn một: tối ưu hoá ngữ cảnh cho agent. Ba việc.

Tài liệu hiển thị thông tin luỹ tiến, progressive disclosure: tạo file AGENTS.md khoảng một trăm dòng làm bản đồ chỉ dẫn tổng quan về cấu trúc dịch vụ, kiến trúc, quy luật code; kết hợp với thư mục docs chứa tài liệu chi tiết về auth, testing, API để agent truy xuất khi cần thiết. Cách tiếp cận này giúp tránh quá tải thông tin cho AI. Nhìn ví dụ bên trái: phần làm gì, kiến trúc, pattern chính, bản đồ thư mục.

Quy tắc build-before-push: ép buộc agent phải tự chạy build và bộ test cục bộ trước khi push code.

Linter hướng dẫn hành động: viết các thông báo lỗi linter dưới dạng chỉ dẫn giải quyết thay vì chỉ mô tả lỗi. Thay vì báo lỗi cấu trúc, linter chỉ rõ: hãy di chuyển type dùng chung sang gói model. Với chỉ dẫn cụ thể, agent sửa đúng ngay lần đầu.

---

### Slide 28 · Phase 2 · Spec-driven development

**Hiểu trước khi nói.** Spec là bản yêu cầu. Yêu cầu tính năng thì nói cần gì; yêu cầu sửa lỗi thì chỉ tả triệu chứng, không gợi ý nguyên nhân, để AI tự điều tra thay vì tin một giả thuyết có thể sai.

**Đọc.** Giai đoạn hai: phát triển hướng đặc tả. Đặc tả dạng Markdown. Lập trình viên viết đặc tả tính năng mới, feature spec, mô tả yêu cầu và ràng buộc; hoặc lỗi cần sửa, bug spec, chỉ mô tả triệu chứng để agent tự tìm nguyên nhân gốc rễ.

Bug spec bên phải không nói tôi nghĩ thiếu null check ở dòng bốn mươi bảy. Nó nói endpoint trả năm trăm khi supplier rỗng, đáng lẽ phải trả bốn trăm với lỗi validation, và dòng cuối: đừng giả định nguyên nhân, hãy điều tra codebase. Vì spec là thứ duy nhất máy nhận, chất lượng spec quyết định chất lượng code.

**Trao mic:** "Spec là đầu vào của máy. Nhưng làm sao biết code sinh ra đúng khi không ai đọc nó? Nhân sẽ nói về bức tường."

---

## Khối 4 · Nhân · Slide 29–36

### Slide 29 · Phase 2 · Holdout scenarios, the core of the system

**Hiểu trước khi nói.** Hình ảnh thi cử. Agent là học sinh, spec là đề bài. Kịch bản holdout là bộ đề kiểm tra viết bằng tiếng Anh thường, cất trong tủ học sinh không được mở. Một AI khác làm giám khảo: đọc đề, tự nghĩ cách gọi API để thử trên một bản chạy tạm, rồi chấm đạt hay không. Bức tường là quy tắc "không được xem đề thi trước"; nếu xem, học sinh học thuộc đáp án thay vì học bài. Chấm ba lần lấy hai, chín mươi phần trăm số đề phải đạt. Đây là slide quan trọng nhất của khối.

**Đọc.** Kịch bản holdout, cốt lõi của hệ thống. Đây là các bài kiểm thử chấp nhận viết bằng tiếng Anh tự nhiên theo định dạng BDD, và được lưu trong thư mục cách ly mà agent viết code không thể truy cập.

Một bộ đánh giá độc lập sử dụng LLM để lập kế hoạch thực hiện các cuộc gọi API kiểm thử trên một môi trường triển khai tạm thời, ephemeral deployment, và đánh giá phản hồi. Nhìn ví dụ: gửi câu SQL có DROP TABLE vào endpoint kiểm tra, kết quả phải là không hợp lệ, và lỗi phải nhắc đến câu lệnh bị cấm.

Kịch bản chạy ba lần, đạt tối thiểu hai trên ba để tính là pass nhằm khử tính bất định của LLM, và tổng tỷ lệ pass phải trên chín mươi phần trăm để vượt qua cổng chất lượng. Agent thi trượt chỉ nhận một dòng thông báo, không bao giờ thấy nội dung kịch bản, nên không thể học vẹt bộ đề.

Cách này giải quyết triệt để vấn đề mục nát glue code của các công cụ kiểm thử BDD truyền thống như Cucumber: không có step definition, bộ đánh giá tự thích ứng khi API đổi, bạn chỉ bảo trì văn bản tiếng Anh.

---

### Slide 30 · Phase 2 · The human role → Phase 3 · Removing the human gate

**Hiểu trước khi nói.** Ở giai đoạn 2 người vẫn bấm duyệt, nhưng đọc bản báo cáo "bao nhiêu đề đạt" thay vì đọc code: năm phút thay vì hai tiếng. Giai đoạn 3 là tập lái: có người kèm đủ lâu và đủ điểm (ba con số) mới được tự lái. Kèm agent dọn nhà hằng tuần để code tự sinh không trôi về bừa bộn. Đây là trụ Ownership: quyền mở dần theo số liệu.

**Đọc.** Vai trò con người ở giai đoạn hai: không đọc code từng dòng nữa mà chuyển sang xem xét báo cáo kết quả của các kịch bản kiểm thử, mất khoảng năm phút thay vì hai giờ.

Giai đoạn ba: loại bỏ cổng kiểm soát của con người. Áp dụng tự động merge cho một số dịch vụ đạt chỉ số an toàn: tỷ lệ pass kịch bản trên chín mươi phần trăm trong hai mươi PR gần nhất, tỷ lệ báo lỗi giả dưới năm phần trăm, và tỷ lệ con người ghi đè hoặc từ chối dưới mười phần trăm. Thay đổi thật sự chỉ là một dòng cấu hình, và ai trong team vẫn chặn được trước khi merge.

Kèm theo là Quality Maintenance Agents, agent bảo trì chất lượng, chạy ngầm hằng tuần để quét code trôi dạt, cập nhật tài liệu lỗi thời và tinh chỉnh các bất nhất trong mã nguồn tự động sinh ra.

---

### Slide 31 · Phase 4 · Full dark factory

**Hiểu trước khi nói.** Giai đoạn 4 gần như chỉ là bật công tắc: tự merge ở mọi dịch vụ đủ điểm, ticket gắn nhãn bot:fix tự thành spec, và dựng bản giả lập cho các dịch vụ bên ngoài hay chập chờn để chấm bài rẻ và nhanh hơn.

**Đọc.** Giai đoạn bốn: đạt trạng thái Dark Factory toàn phần. Mở rộng tự động merge cho mọi dịch vụ đạt chỉ số. Đồng bộ hoá với hệ thống quản lý task như Jira hay Trello: các thẻ dán nhãn bot fix sẽ tự động kích hoạt tạo spec và chạy qua pipeline. Xây dựng Digital Twins, máy chủ ảo hay mock server giả lập các dịch vụ bên ngoài, để giảm chi phí và độ trễ khi chạy kiểm thử kịch bản; chỉ xây khi cần, bắt đầu từ dịch vụ gây phiền nhất.

Trạng thái cuối: kỹ sư viết spec và kịch bản, hệ thống làm phần còn lại. Mọi thứ sau merge vẫn đi qua pipeline CI/CD cũ.

---

### Slide 32 · 4 · Four-layer architecture

**Hiểu trước khi nói.** Bốn tầng nhà: tầng đầu vào là của người; tầng sinh code là máy; tầng chấm là máy nhưng cách ly; tầng merge và deploy dùng hạ tầng cũ. Điều duy nhất phải nhớ: giữa tầng sinh code và tầng chấm phải có tường, không thì agent có thể gian lận.

**Đọc.** Kiến trúc bốn lớp của hệ thống. Lớp Inputs, con người sở hữu: đặc tả, kịch bản holdout, tài liệu AGENTS.md, luật linter. Lớp Code Generation, tự động: agent đọc spec cộng ngữ cảnh repo, tự sinh mã, build, test tại chỗ, tự review và mở PR. Lớp Validation, tự động và cách ly: chạy CI truyền thống, sau đó bộ đánh giá kịch bản chạy thử trên môi trường tạm thời. Lớp Merge và Deploy, tự động cộng infra sẵn có: tự động merge vào nhánh chính và kích hoạt pipeline CI/CD hiện có để deploy.

Lưu ý cực kỳ quan trọng: lớp Code Generation và lớp Validation phải được cách ly hoàn toàn để tránh tình trạng agent gian lận hoặc học vẹt bộ đề thi. Không có bức tường đó thì không có cổng chất lượng.

---

### Slide 33 · 5 · Risks and mitigations

**Hiểu trước khi nói.** Bốn rủi ro, mỗi cái một cách đỡ: giám khảo chấm sai (chấm ba lần, cổng 90%, người soát 50 PR đầu, CI cũ vẫn chạy); kỹ sư không muốn thôi viết code (đổi vai lên định nghĩa sản phẩm và kiểm soát chất lượng); tốn tiền API (giới hạn ba lần thử, cảnh báo token); đề kiểm tra lỗi thời (giám khảo tự thích nghi, agent bảo trì hằng tuần).

**Đọc.** Các rủi ro tiềm ẩn và giải pháp. Bộ đánh giá duyệt nhầm code lỗi: giảm thiểu bằng cách chạy kịch bản ba lần, duy trì cổng pass chín mươi phần trăm, kiểm toán thủ công năm mươi PR đầu tiên, và giữ nguyên bộ CI/CD truyền thống chạy sau merge.

Kháng cự từ đội ngũ kỹ sư: kỹ sư thường gắn bản sắc cá nhân với việc trực tiếp viết code. Giải pháp là chuyển dịch vai trò của họ sang việc định nghĩa sản phẩm và kiểm soát chất lượng, kỹ thuật sản phẩm cao cấp hơn.

Chi phí API tăng cao: giới hạn cứng tối đa ba lần thử lại cho mỗi bản đặc tả và thiết lập giám sát token kèm cảnh báo.

Kịch bản kiểm thử bị lỗi thời: đánh giá bằng LLM tự động thích ứng với thay đổi cấu trúc API mà không cần bảo trì glue code, kết hợp bảo trì hằng tuần bởi agent chuyên trách.

Và một sự cố để nhớ: một agent có quyền ghi sai đã xoá một phẩy chín triệu dòng production. Dù tự động đến đâu, người cấp quyền vẫn sở hữu sự cố. Đó là lý do slide sau nói về việc nhìn thấy agent đang làm gì.

---

### Slide 34 · If you can't observe your agent, you can't trust it.

**Hiểu trước khi nói.** Observability cho agent có ba lớp. Logging: ghi có cấu trúc từng hành động (request, tool, tham số, kết quả, exception) với trace id và timestamp; log do hệ thống ghi thì đáng tin, "báo cáo" do model viết thì không. Tracing: nối log thành đường thực thi, thứ tự bước và tool call, độ trễ từng bước; cho phép lần ngược từ hành động về suy luận. Audit trail: bản ghi chống sửa, kiểm soát truy cập, trả lời quyết định gì, đọc dữ liệu gì, ai duyệt; log để debug, audit để chịu trách nhiệm. Ba nhóm metric: vận hành (latency, token), tin cậy (tỷ lệ fail, tỷ lệ escalate), governance (chạm dữ liệu nhạy cảm, vi phạm policy). Stack mã nguồn mở: OpenTelemetry sinh log và trace, Jaeger xem trace, Prometheus gom metric, Grafana hiển thị; cùng stack team đã dùng cho service. Observability phải thiết kế từ đầu, không gắn sau sự cố.

**Nói đơn giản.** Muốn tin một agent tự chạy thì phải nhìn thấy nó đã làm gì: log từng hành động, nối thành đường đi, và một bản ghi không sửa được để truy trách nhiệm.

**Đọc.** Đèn bật lại. Slide trước để lại câu hỏi: agent tự chạy không ai xem, làm sao biết nó đã làm gì. Đây là một dashboard, và câu trả lời có ba lớp.

Hàng trên là metric. Latency, token mỗi lần chạy, và số lần escalate lên người, ba lần một ngày. Con số escalate đáng xem nhất: nó nói thẳng agent đang ở nấc nào của thang.

Dòng log là lớp một, logging: ghi có cấu trúc từng hành động của agent. Request đến, tool nó chọn, tham số, kết quả, exception nếu có, kèm trace id và timestamp. Điểm quan trọng: log do hệ thống ghi thì đáng tin. Báo cáo do model tự viết thì không, vì nó cũng là văn bản dự đoán.

Waterfall là lớp hai, tracing: nối các log rời thành một đường thực thi. Agent suy luận, đọc file, chạy test thấy hai fail, sửa file, chạy test lại không fail, rồi định npm install. Nhìn được thứ tự, độ trễ từng bước. Đây là thứ cho phép trả lời "vì sao nó xoá file đó" bằng cách lần ngược từ hành động về quan sát và suy luận trước đó, thay vì hỏi lại model và nhận một lời giải thích bịa sau sự việc.

Chuỗi khối dưới cùng là lớp ba, audit trail: bản ghi chống sửa, kiểm soát truy cập. Trả lời ba câu của trách nhiệm: quyết định gì đã được đưa ra, dữ liệu nào đã được đọc, có người duyệt hay không và là ai. Nhìn khối ba: edit được approved bởi nhân. Khối năm: install bị chặn vì không được duyệt. Log để debug; audit để chịu trách nhiệm, append-only, không ai kể cả agent xoá được.

Stack ở dòng cuối: OpenTelemetry, Jaeger, Prometheus, Grafana. Cùng stack team backend đã dùng cho service. Agent chỉ là một service nữa cần được quan sát. Nguyên tắc: observability là lớp thiết kế từ đầu, không phải monitoring gắn thêm sau sự cố. Nếu bạn không quan sát được hành vi của agent, bạn không thể tin nó.

---

### Slide 35 · Full autonomy doesn't remove humans, it changes their shape

**Hiểu trước khi nói.** Cú lật của cái kết. Earned trust: quyền của agent mở dần theo độ tin cậy đã chứng minh, read-only rồi write vào branch rồi staging rồi production; giới hạn blast radius mỗi agent bằng quyền tối thiểu và tách credential. DeepSeek Harness: harness là lớp bao quanh model (vòng lặp gọi tool, quản context, ghi log); harness mã nguồn mở này theo triết lý mọi thứ là plugin và có session log append-only, inspect được, mọi prompt, tool call, context, token. Nối về đầu buổi: earned trust là trụ Verification bằng cơ chế, audit trail là trụ Ownership bằng cơ chế. SOP hôm nay là bản thủ công của cùng kỷ luật; người viết guardrail phải hiểu SOP. Framing bắt buộc: review đổi hình, không phải hết cần review.

**Nói đơn giản.** Tự động hoàn toàn không bỏ con người, chỉ đổi việc của con người: từ đọc từng dòng sang đặt giới hạn quyền và đọc log. Ba trụ đầu buổi vẫn còn nguyên, chỉ chuyển từ làm tay sang làm bằng máy.

**Đọc.** Đây là cú lật của cái kết. Tự động hoàn toàn không bỏ con người ra khỏi hệ thống. Nó đổi hình con người. Review không mất; review đổi từ đọc từng PR sang thiết kế cổng và đọc log.

Cầu thang bên trái là earned trust. Không ai giao production cho agent ngày đầu. Quyền mở dần theo độ tin cậy đã chứng minh: read-only, agent chỉ đọc và đề xuất. Write vào branch, agent tạo PR, người merge. Staging, agent deploy lên môi trường thử. Production, agent deploy thật, có giới hạn, và một người vẫn giữ cần gạt. Mỗi bậc là một giai đoạn quan sát: làm đúng đủ lâu thì mở bậc tiếp. Và giới hạn blast radius của mỗi agent: quyền tối thiểu cho việc của nó, tách credential, không có quyền xoá hàng loạt nếu việc không cần. Đó là bài học một phẩy chín triệu dòng.

Bên phải là DeepSeek Harness, một harness agent mã nguồn mở. Harness là lớp bao quanh model: vòng lặp gọi tool, quản context, ghi log. Triết lý mọi thứ là plugin, kể cả vòng lặp agent, nên từng phần thay được và kiểm được riêng. Điểm cho bài này: session log append-only, inspect được. Mọi prompt, mọi tool call, mọi context đã nạp, mọi token. Không sửa được, không xoá được. Nhìn dãy khối: chỉ nối thêm, không bao giờ bớt.

Giờ nhìn lại đầu buổi. Earned trust là trụ Verification mã hoá thành cơ chế: không tin lời, chỉ tin hành vi đã quan sát. Audit trail là trụ Ownership mã hoá thành cơ chế: mọi hành động có người chịu trách nhiệm truy ra được. SOP hôm nay là bản thủ công của cùng một kỷ luật. Hôm nay bạn chạy checklist bằng tay. Ngày mai bạn viết checklist đó thành guardrail và cổng cho agent. Người viết guardrail phải hiểu SOP, vì guardrail chính là SOP. Ba chấm sáng lại cả ba. Kỷ luật scale lên. Nó không biến mất.

---

### Slide 36 · You are the one who signs.

**Nói đơn giản.** Kết: tốc độ AI cho không, chất lượng bạn phải tự giữ. Không giải thích được dòng nào thì dòng đó không được vào.

**Đọc.** Bạn là người ký. Ba trụ gói lại thành một câu: tốc độ là phần AI cho không; chất lượng là phần bạn phải tự giữ; SOP là cách giữ nó mà không phải chậm lại.

Câu để mang về: nếu bạn không giải thích được dòng đó, nó không được vào. Đó là SOP ngắn nhất, và là bước một của mọi checklist hôm nay.

Cảm ơn mọi người. Hai chúng tôi nhận câu hỏi: về workflow, AGENTS.md và spec thì Hào; về security, docs, holdout và phần tương lai thì tôi.
