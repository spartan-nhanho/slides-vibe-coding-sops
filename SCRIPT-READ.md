# Kịch bản đọc — Lecture 9: Vibe Coding SOPs

> Deck 36 slide: bỏ bài tập và checkpoint, khối dark factory 11 slide (23–33) theo năm mục: vấn đề, cấp độ, bốn giai đoạn, kiến trúc, rủi ro. Bản này khác `SCRIPT.md`: mỗi slide có **Hiểu trước khi nói** (kiến thức nền, viết để hiểu chứ không phải để nói) và **Đọc** (lời dẫn nguyên văn theo giọng người đứng trước phòng: mở bằng tình huống quen thuộc, giải thích bối cảnh ngoài slide, đi qua hình trên slide, và đặt câu hỏi cho khán giả để kéo thảo luận). Đọc thành tiếng, mỗi slide 2–4 phút; câu hỏi cho phòng là chỗ dừng 5–10 giây, không cần ai trả lời. Ai nói slide nào ghi ở tiêu đề. Đọc hết bản này một lượt là nắm được toàn bộ kiến thức của buổi; sau đó chỉ cần cầm `SCRIPT.md` để tra nhanh.

Câu chuyện của buổi, tóm trong ba câu: AI làm việc gõ code rẻ đi. Hiểu, review và đúng thì vẫn đắt như cũ. SOP là quy trình cho phần đắt đó. Ba trụ xuyên suốt: **Context** (cho AI đúng thứ nó cần), **Verification** (không kiểm chứng được thì không ship), **Ownership** (bạn ký tên cho từng dòng).

---

## Phần 1 · Hào · Slide 1–21 · SOPs

### Slide 1 · Vibe Coding SOPs

**Hiểu trước khi nói.** SOP là standard operating procedure, quy trình vận hành chuẩn: một việc lặp lại được viết thành các bước cố định, để ai làm cũng ra cùng kết quả, kể cả lúc mệt. Trong ngành phần mềm, "vibe coding" là cách gọi việc để AI viết code rồi dùng luôn mà không đọc kỹ. Buổi này không cấm dùng AI; nó dạy cách dùng AI mà vẫn ship được code đúng.

**Nói đơn giản.** Buổi này nói về một chuyện rất cụ thể: khi AI viết phần lớn code cho bạn, bạn phải làm gì để code đó không gây hoạ. Câu trả lời là một bộ quy trình, gọi là SOP, giống như checklist của phi công trước khi cất cánh.

**Đọc.** Chào mọi người. Trước khi vào bài, tôi muốn kể một chuyện chắc nhiều người ở đây từng gặp. Tuần trước, một bạn trong team tôi mở PR khoảng bốn trăm dòng, mô tả gọn gàng, test xanh, CI xanh. Tôi hỏi bạn ấy: đoạn xử lý null ở giữa hàm này là để làm gì? Bạn ấy im một lúc rồi nói: "Em không chắc, Claude nó thêm vào." PR đó merge rồi. Không có gì hỏng, ít nhất là chưa. Nhưng câu trả lời đó là lý do có buổi hôm nay.

Bài số chín, tên là Vibe Coding SOPs. Tôi giải thích từng chữ. Vibe coding là cách gọi việc để AI viết code rồi dùng luôn, kiểu "thấy chạy là được". SOP là standard operating procedure, quy trình vận hành chuẩn: một việc lặp lại, viết thành các bước cố định, để ai làm cũng ra kết quả giống nhau, kể cả lúc mệt, lúc vội, lúc tự tin. Ghép hai thứ lại: làm sao dùng AI viết code mà vẫn ship được code mình dám ký tên.

Cho tôi xin hai lần giơ tay. Lần một: tuần này ai đã merge code do AI viết phần lớn? Lần hai, giữ tay nếu bạn đã đọc từng dòng của code đó trước khi merge. Mọi người nhìn quanh phòng một chút. Khoảng cách giữa hai lần giơ tay chính là nội dung của buổi hôm nay. Không ai ở đây sai cả; tôi cũng hạ tay ở lần hai. Vấn đề là chúng ta đang làm một việc mới bằng thói quen cũ.

Buổi này khoảng tám mươi phút. Nửa đầu tôi dẫn: vì sao AI sai, làm việc với nó thế nào cho đúng, và soi code của nó ở đâu. Nửa sau Nhân dẫn phần thú vị hơn: chuyện gì xảy ra khi người ta bỏ hẳn con người ra khỏi vòng lặp. Cứ giơ tay cắt ngang bất cứ lúc nào, buổi này là nội bộ, không cần chờ đến cuối.

---

### Slide 2 · AI doesn't replace you, it forces you up a level

**Hiểu trước khi nói.** Ý cốt lõi: khi AI viết phần lớn code, việc của bạn chuyển từ gõ sang review. Mô hình để hình dung: AI là một junior developer cực nhanh, không mệt, đọc hết tài liệu công khai, nhưng thỉnh thoảng bịa (tên hàm, tên thư viện) và đôi khi phá hỏng mọi thứ vì không hiểu hệ quả. Bạn là tech lead của junior đó. Andrej Karpathy đặt ra từ "vibe coding" tháng 2 năm 2025 với nghĩa "buông theo cảm giác, quên code đi". Simon Willison, một lập trình viên có tiếng, định nghĩa chặt hơn: vibe coding là build phần mềm bằng LLM mà không review code nó viết; hợp cho prototype, sai chỗ cho production. Ông gọi cách làm có kiểm chứng là "vibe engineering".

**Nói đơn giản.** Trước đây bạn là người gõ. Giờ AI gõ, bạn là người kiểm. Giống như bạn lên làm tổ trưởng, có một nhân viên mới rất nhanh nhưng hay nói bừa: bạn không gõ thay nó, nhưng mọi thứ nó nộp ra đều mang tên bạn.

**Đọc.** Câu trên slide là câu tôi muốn mọi người mang về nếu quên hết những thứ khác: AI không thay bạn, nó ép bạn lên một bậc.

Nhìn hai hình. Bên trái là người gõ phím, code chảy ra từ đầu ngón tay. Đó là nghề của chúng ta mười năm qua. Bên phải là người cầm kính lúp soi vào một cái diff. Đó là nghề của chúng ta từ bây giờ. Không phải vì ai bắt, mà vì phần gõ đã rẻ đến mức không còn là việc đáng trả lương nữa.

Tôi hay dùng một hình ảnh với team mình: hãy coi AI như một junior developer rất đặc biệt. Bạn này gõ nhanh gấp trăm lần bạn, không bao giờ mệt, không bao giờ cáu, đã đọc mọi tài liệu công khai trên đời. Nhưng bạn này có hai tật. Thứ nhất, thỉnh thoảng bịa: bịa tên hàm, bịa tên thư viện, bịa cả cách một API hoạt động, và bịa bằng giọng rất tự tin. Thứ hai, đôi khi phá sạch mọi thứ, vì không hiểu hệ quả của việc mình làm; nó không biết bảng đó có năm mươi triệu dòng, không biết endpoint đó có khách hàng đang gọi.

Vậy bạn làm gì với một junior như thế? Bạn không gõ thay nó. Bạn giao việc rõ, cho đủ thông tin, yêu cầu nó chứng minh đã chạy thử, đọc diff của nó, rồi ký tên. Đó chính xác là năm bước của một tech lead giỏi, và cũng chính xác là SOP mà hôm nay chúng ta sẽ xây.

Một điều tôi không hứa: code nhanh gấp mười. Ai nghe con số đó ở đâu thì cứ nghi ngờ. Bạn sẽ gõ ít hơn, đúng. Nhưng gõ chưa bao giờ là nút thắt của nghề này. Hỏi thật: trong một tuần, bao nhiêu phần trăm thời gian của bạn là gõ code? Tôi đoán dưới một phần ba. Phần còn lại là hiểu vấn đề, đọc code người khác, và cãi nhau xem thế nào là đúng. Ba việc đó AI không làm rẻ đi, và mọi thứ sau slide này là quy trình cho ba việc đó.

---

### Slide 3 · Speed is what AI gives for free. Quality isn't.

**Hiểu trước khi nói.** Ba con số, ba nguồn. Veracode 2025: 45% code AI sinh ra không qua benchmark OWASP Top 10 (danh sách mười loại lỗ hổng web phổ biến nhất). Uplevel, nghiên cứu khoảng 800 developer: bug rate tăng khoảng 41% ở đội áp dụng AI mà không có quy trình. Stack Overflow và GitHub 2025: 92% developer dùng AI tool hằng ngày nhưng chỉ 29% tin output. Điểm quan trọng nhất là khoảng cách giữa dùng và tin: người ta dùng thứ mình không tin. SOP là cách biến "không tin" thành "có bước để kiểm".

**Nói đơn giản.** Ba con số chỉ nói một điều: người ta dùng AI rất nhiều nhưng không tin nó, và khi không có quy trình thì bug tăng. Quy trình là thứ biến "không tin" thành "có cách kiểm".

**Đọc.** Ba con số này để trả lời câu hỏi "có cần quy trình không, hay cứ dùng là được".

Donut đầu tiên, màu đỏ: bốn mươi lăm phần trăm. Veracode năm 2025 cho AI sinh code rồi đem chạy qua bộ kiểm tra OWASP Top 10, tức mười loại lỗ hổng web phổ biến nhất. Gần một nửa không qua. Nói cách khác, nếu bạn nhận code AI mà không có bước kiểm bảo mật, xác suất mang một lỗ hổng đã biết vào production cỡ tung đồng xu. Không phải lỗi lạ, mà là những lỗi có tên, có số, có tài liệu.

Donut thứ hai, màu cam: khoảng bốn mươi mốt phần trăm. Uplevel theo dõi khoảng tám trăm developer và thấy bug rate tăng chừng đó ở các đội áp dụng AI mà không có quy trình. Tôi muốn nhấn vào cụm "mà không có quy trình". Cùng một công cụ, đội có quy trình và đội không có quy trình ra hai kết quả khác nhau. Công cụ không quyết định, cách dùng quyết định.

Donut thứ ba là cái tôi thích nhất. Vòng ngoài nhạt là chín mươi hai phần trăm developer dùng AI hằng ngày. Vòng trong đậm là hai mươi chín phần trăm nói rằng họ tin output của nó. Nhìn khoảng hở giữa hai vòng. Chúng ta đang dùng hằng ngày một thứ mà chúng ta không tin. Có ai thấy mình trong con số đó không?

Khoảng hở đó chính là chỗ SOP sống. Không tin thì có hai cách: hoặc bỏ không dùng, mà không ai bỏ được nữa; hoặc có bước để kiểm, để "không tin" biến thành "tôi có cách kiểm". Buổi hôm nay là cách thứ hai.

Câu chốt: tốc độ là thứ AI cho không. Chất lượng thì không.

---

### Slide 4 · Every SOP answers one of three questions

**Hiểu trước khi nói.** Ba trụ là khung của cả bài. Context: AI chỉ biết thứ bạn đưa vào, và phần "đưa vào" có giới hạn. Verification: model không tự biết mình sai, nên bằng chứng phải đến từ ngoài model, tức test, build, screenshot. Ownership: với reviewer và production, việc AI viết là vô hình; commit mang tên bạn. Ba chấm C, V, O ở thanh dưới sẽ sáng theo từng slide để nhắc trụ nào đang được nói.

**Nói đơn giản.** Ba câu hỏi để nhớ suốt buổi. Tôi đã đưa AI đủ thông tin chưa (Context)? Tôi có bằng chứng nó chạy đúng chưa (Verification)? Ai ký tên chịu trách nhiệm (Ownership)? Ba chấm ở góc dưới slide chính là ba câu này.

**Đọc.** Trước khi đi vào chi tiết, tôi đưa cái khung để mọi thứ sau này có chỗ treo. Mọi quy tắc hôm nay trả lời một trong ba câu hỏi, và tôi sẽ nhắc lại ba câu này ở mỗi phần.

Câu một, Context: tôi đã cho AI cái gì? Nghe hiển nhiên, nhưng đây là lỗi phổ biến nhất. AI không biết repo của bạn, không biết quy ước của team, không biết cái test đang fail, trừ khi bạn đưa. Và chỗ chứa của nó có giới hạn, đưa nhiều quá thì nó quên phần đầu. Nên phải quản như quản RAM: nạp đúng thứ cần, dọn thứ không cần.

Câu hai, Verification: tôi chứng minh nó chạy được không? Chú ý chữ "chứng minh". Bằng chứng là test pass, build xanh, screenshot màn hình thật. Không phải câu "đã xong" của model. Lát nữa ở slide sáu mọi người sẽ thấy vì sao model không có khả năng tự biết mình sai, nên bằng chứng phải đến từ bên ngoài nó.

Câu ba, Ownership: ai ký? Với reviewer, với production, với người bị gọi dậy lúc hai giờ sáng để debug, việc AI viết hay bạn viết là vô hình. Commit mang tên bạn. AI cầm bút, không cầm quyền quyết.

Từ slide này trở đi, mọi người để ý ba chấm nhỏ ở góc dưới màn hình: C, V, O. Chấm nào sáng nghĩa là slide đó thuộc trụ đó. Đây là cách tôi tự ép mình: nếu một quy tắc không thuộc trụ nào, có lẽ nó không đáng nói.

Một cách dùng ngay: lần tới thấy team đề xuất một quy tắc mới về AI, hỏi nó thuộc trụ nào. Không trả lời được thì thường là quy tắc để cho có.

---

### Slide 5 · Divider · Why AI gets it wrong

**Nói đơn giản.** Chuyển phần: trước khi học cách dùng, hiểu tại sao AI hay sai.

**Đọc.** Phần một, rất ngắn, ba slide. Tôi gọi là phần khoa học, nhưng không có công thức. Mục đích chỉ một: hiểu AI hoạt động ra sao thì mọi quy tắc phía sau đều có lý do. Nếu không hiểu, các quy tắc thành giáo điều, và giáo điều thì người ta bỏ ngay khi deadline đến.

---

### Slide 6 · Hallucination is a property, not a bug

**Hiểu trước khi nói.** LLM (large language model) hoạt động bằng cách dự đoán mảnh chữ tiếp theo có xác suất cao nhất, lặp đi lặp lại. Nó được huấn luyện để tối ưu "nghe hợp lý", không phải "đúng"; bên trong không có bước tra cứu sự thật. Vì thế bịa (hallucination) không phải lỗi hiếm mà là tính chất của cơ chế. Giọng văn tự tin cũng không nói lên độ đúng, vì trong dữ liệu huấn luyện, văn bản đúng thường viết tự tin, nên model học cách viết tự tin bất kể đúng sai. Context window là toàn bộ thứ model "nhìn thấy" trong một lần gọi: system prompt, lịch sử chat, file dán vào, output lệnh. Nó hữu hạn, và chất lượng giảm trước khi hết chỗ: khi context dài, cơ chế attention (so khớp mọi cặp token) bị loãng, model quên chỉ dẫn đầu và sai nhiều hơn. Anthropic gọi hiện tượng này là context rot.

**Nói đơn giản.** AI viết chữ bằng cách đoán chữ tiếp theo cho nghe hợp tai, không phải cho đúng. Nên nó bịa là chuyện bình thường, và bịa bằng giọng rất tự tin. Thêm nữa, trí nhớ ngắn hạn của nó có giới hạn, nhét nhiều quá thì nó quên phần đầu. Vì vậy: chia nhỏ việc trước khi hỏi.

**Đọc.** Tôi muốn mọi người nhìn bên trái trước, chỗ dòng chữ "the function returns a". Model đang viết dở câu đó và phải chọn mảnh chữ tiếp theo. Nó có bốn ứng viên, mỗi ứng viên một xác suất: Promise bốn mươi hai phần trăm, string ba mươi mốt, Result mười chín, null tám. Nó chọn Promise. Vì sao? Không phải vì nó đã mở hàm ra xem. Vì trong hàng tỷ dòng code nó từng đọc, sau cụm chữ đó thường là Promise.

Toàn bộ mô hình ngôn ngữ lớn là phép chọn này, lặp lại hàng nghìn lần. Nó được huấn luyện để tối ưu một thứ duy nhất: nghe hợp lý nhất. Không phải đúng nhất. Bên trong không có bước tra cứu, không có bộ kiểm sự thật, không có chỗ để nó nói "tôi không chắc". Nên khi mọi người nghe từ hallucination, bịa, đừng nghĩ đó là lỗi hiếm gặp sẽ được vá ở phiên bản sau. Nó là tính chất của cơ chế.

Có ai thắc mắc vì sao nó bịa mà nghe vẫn tự tin thế không? Vì trong dữ liệu huấn luyện, văn bản đúng thường được viết bằng giọng tự tin. Model học cách viết tự tin, không học cách đúng. Độ tự tin của câu chữ không mang thông tin gì về độ đúng. Tôi nhắc lại câu này vì nó phá một thói quen rất người: chúng ta tin người nói chắc nịch.

Giờ nhìn thanh phía dưới. Đó là context window, tất cả những gì model nhìn thấy trong một lần gọi: system prompt, lịch sử chat, file bạn dán, output của lệnh. Nó có giới hạn, ai cũng biết. Nhưng điều ít người biết hơn: nó mục dần trước khi đầy. Nhìn thanh tô từ trái sang phải, chữ "system prompt" ở đầu mờ đi. Đó là chuyện thật: context càng dài, cơ chế attention càng loãng, model quên chỉ dẫn ban đầu và sai nhiều hơn. Anthropic gọi hiện tượng này là context rot. Ai từng chat hai tiếng với AI rồi thấy nó bắt đầu "quên" quy ước mình dặn từ đầu? Đó chính là nó.

Hệ quả thực hành ở dòng cuối: ném một file mười nghìn dòng vào rồi hỏi, nó quên phần đầu và bịa phần sau. Cách xử lý không phải mua model to hơn. Cách xử lý là chia nhỏ bài toán trước khi prompt. Bốn thanh xanh, bốn cửa sổ sạch.

Một câu để nhớ: context là tài nguyên bạn phải quản như RAM. Tất cả quy tắc hôm nay, nhìn kỹ, đều là kỹ thuật quản một nguồn lực hữu hạn.

---

### Slide 7 · Your agent doesn't know. It reasons, acts, and observes.

**Hiểu trước khi nói.** Nếu model chỉ dự đoán chữ, tại sao Claude Code hay Cursor agent sửa được bug thật? Vì tool bọc model trong một vòng lặp gọi là ReAct (Reason + Act, từ paper của Yao và cộng sự năm 2022). Reason: model viết ra suy nghĩ về việc cần làm tiếp. Act: model gọi một tool có thật, ví dụ đọc file, chạy test, tìm kiếm, sửa file. Observe: kết quả thật của tool được nạp ngược vào context. Lặp lại đến khi xong hoặc hết ngân sách bước. Bước Observe là chỗ duy nhất sự thật từ bên ngoài đi vào. Chat thường không có bước này, nên chat bịa API mà không có gì phủ định. Từ đó rút ra: agent chỉ đáng tin bằng những gì tool cho nó thấy; không có test thì agent chỉ có thể "nói" là xong.

**Nói đơn giản.** Tool như Claude Code không "biết" gì hơn model, nhưng nó cho model một vòng lặp: nghĩ, làm một việc thật (đọc file, chạy test), nhìn kết quả thật, rồi nghĩ tiếp. Kết quả thật là thứ duy nhất nó tin được. Không có test để chạy thì nó chỉ có thể nói "xong rồi".

**Đọc.** Slide trước chắc có người đang nghĩ: nếu model chỉ đoán chữ, tại sao Claude Code hay Cursor sửa được bug thật, chạy được test thật? Câu hỏi hay, và câu trả lời là hình tròn này.

Model tự nó chỉ đoán chữ. Nhưng tool bọc model trong một vòng lặp, và vòng lặp đó có tên: ReAct, ghép từ reason và act, từ một bài báo năm 2022. Ba nút.

Nút một, Reason: model đọc mục tiêu và toàn bộ context, rồi viết ra một suy nghĩ về việc cần làm tiếp. Ví dụ: "test đang fail ở billing test, mình cần đọc billing.js trước". Đây là văn bản, vẫn là đoán chữ, nhưng là đoán về hành động.

Nút hai, Act: model chọn một tool và gọi nó với tham số cụ thể. Đọc file này. Tìm chuỗi kia trong repo. Chạy node test. Sửa đoạn code từ dòng này đến dòng kia. Tool là thứ có thật, chạy bên ngoài model, trên máy của bạn.

Nút ba, Observe: kết quả thật của tool được nạp ngược vào context. Nội dung file. Output của test, kể cả dòng đỏ. Lỗi compile. Đây là điểm duy nhất trong cả vòng lặp mà sự thật từ bên ngoài đi vào. Nhìn cái cổng nhỏ bên trái với dòng "tool output, the only way in". Tôi cố ý vẽ chỉ một cổng.

Rồi lặp lại đến khi xong hoặc hết ngân sách bước. Chat thường là một lần: prompt vào, câu trả lời ra, không có observe. Agent là nhiều vòng, mỗi vòng một lần quan sát thật. Đó là toàn bộ khác biệt giữa hai loại công cụ, và cũng là lý do chúng hỏng khác nhau: chat hỏng bằng cách bịa API vì không có gì phủ định; agent hỏng bằng cách quan sát đúng nhưng kết luận sai, hoặc không có gì đáng để quan sát.

Ba hệ quả tôi muốn mọi người mang về. Một: agent chỉ đáng tin bằng những gì tool cho nó thấy. Nếu repo không có test, bước observe chỉ có "file đã ghi", và agent kết luận xong vì không có gì nói ngược lại. Cho nó test, build, lint, ba chip xanh đi vào cổng, là thêm sự thật vào vòng lặp. Hai: bước reason là chỗ nó tự tin sai, nên khi review, đọc log tool call quan trọng hơn đọc lời giải thích của nó. Ba: bước act là chỗ phải giới hạn quyền. Đọc file thì thoải mái. Chạy test thì được. Push, xoá, cài package thì phải qua người. Lát nữa Nhân sẽ kể chuyện một agent có quyền ghi sai đã làm gì.

Ai ở đây đang dùng agent mode hằng ngày? Lần gần nhất nó báo "done" mà bạn kiểm lại thấy chưa done, là ở nút nào?

---

### Slide 8 · Divider · AI-Assisted Workflow

**Nói đơn giản.** Chuyển phần: bốn thói quen làm việc với AI.

**Đọc.** Phần 7.1, trái tim của bài. Bốn mục, đi theo thứ tự nhân quả: viết prompt tốt, nuôi và dọn context, vòng lặp tinh chỉnh, và workflow cho task lớn. Tất cả là hệ quả của hai slide vừa rồi: model chỉ có thứ bạn đưa, thứ bạn đưa có giới hạn, và sự thật chỉ vào qua một cổng.

---

### Slide 9 · More specific = fewer corrections

**Hiểu trước khi nói.** Prompt mơ hồ buộc model đoán, và nó đoán theo kiểu phổ biến nhất trong dữ liệu huấn luyện, tức không phải kiểu của team bạn. Prompt tốt có ba thứ: phạm vi, ràng buộc, tiêu chí thành công. Bốn thói quen từ tài liệu Anthropic và promptingguide.ai: cho ví dụ thay vì mô tả (gọi là few-shot); tài liệu dài đặt đầu prompt, câu hỏi đặt cuối (model chú ý phần cuối hơn); đưa tiêu chí thành công để model tự kiểm; gọi đúng tên kỹ thuật để tra được: few-shot, chain-of-thought (yêu cầu nêu các bước suy luận), prompt chaining (chia thành nhiều prompt nối tiếp).

**Nói đơn giản.** Nói với AI như giao việc cho người mới: nói rõ cần gì, không được gì, và xong là như thế nào. Prompt tệ không phải vì viết dở, mà vì giấu thông tin chỉ mình biết.

**Đọc.** Hai cửa sổ chat, cùng một yêu cầu, hai cách viết.

Bên trái: "add tests for foo.py". Sáu chữ. Tôi cá là ai ở đây cũng từng gõ đúng câu này. Giờ đặt mình vào vị trí model: test cho hàm nào trong foo.py? Case nào? Mock hay gọi thật? Framework nào? Nó không biết, nên nó đoán. Và nó đoán theo kiểu phổ biến nhất trong dữ liệu nó học, tức là kiểu của "trung bình internet", không phải kiểu của team bạn. Kết quả là cái khối mờ có dấu hỏi. Rồi bạn sửa ba vòng, và ở vòng thứ ba bạn kết luận "AI này dở".

Bên phải, cùng câu đó nhưng có phần thêm vào, tô xanh như một dòng diff: cover edge case user đã logout, không dùng mock. Chỉ dài hơn hai mươi chữ, nhưng có ba thứ mà bên trái không có: phạm vi, ràng buộc, và ngầm định tiêu chí thành công. Câu trả lời có dấu tick.

Bốn thói quen ở hàng dưới, tôi đi nhanh. Một, cho ví dụ thay vì mô tả: "validateEmail, user@example.com ra true, user@.com ra false" tốt hơn một đoạn văn tả hàm, vì ví dụ cố định hành vi còn mô tả để ngỏ diễn giải. Hai, tài liệu dài đặt đầu prompt, câu hỏi đặt cuối; model chú ý phần cuối hơn, và phần cuối nên là chỉ thị. Ba, đưa sẵn tiêu chí thành công: "chạy test sau khi implement", "không đổi public API". Đó là cách để model tự kiểm được và bạn có cái để so. Bốn, gọi đúng tên kỹ thuật để tra được: few-shot là cho ví dụ, chain-of-thought là bắt nó nêu bước suy luận trước, prompt chaining là chia thành nhiều prompt nối tiếp.

Có người sẽ hỏi: thế còn mấy câu thần chú như "you are a senior engineer", "please think carefully"? Câu trả lời ngắn: gần như vô dụng. Đổi giọng prompt không thêm thông tin. Dán error, dán test, dán file thì thêm thông tin. Lần tới model sai, trước khi hỏi "prompt tôi viết có hay không", hãy hỏi "nó có file chưa".

Câu chốt: prompt tồi không phải vì bạn viết dở tiếng Anh. Nó tồi vì bạn giấu context mà chỉ bạn biết.

---

### Slide 10 · Don't ask "write me the SQL"

**Hiểu trước khi nói.** Postgres có bộ lập kế hoạch (planner) quyết định cách chạy một câu SQL. EXPLAIN cho xem kế hoạch dự kiến; EXPLAIN ANALYZE chạy thật và cho thời gian, số dòng thực tế từng bước. Seq Scan là quét toàn bộ bảng; Index Scan là dùng chỉ mục để nhảy thẳng đến dòng cần. Một prompt tối ưu SQL tốt đưa cho AI đúng thứ một DBA cần: schema, index hiện có, số dòng, câu hiện tại kèm EXPLAIN ANALYZE, version Postgres, mục tiêu. Rồi kiểm chứng bằng cách chạy EXPLAIN thật với câu mới.

**Nói đơn giản.** Ví dụ SQL: đừng nói "viết câu SQL", hãy đưa cấu trúc bảng, index, số dòng, và kết quả EXPLAIN. Rồi tự chạy EXPLAIN kiểm lại. Tin cái máy chấm, không tin lời AI.

**Đọc.** Ví dụ áp dụng cho một việc thật mà chắc ai làm backend cũng gặp: tối ưu một câu SQL chậm.

Cách hỏi tồi: "viết cho tôi câu SQL lấy đơn hàng theo user". Model trả về một câu SELECT đúng cú pháp trong hai giây. Nhưng nó không biết bảng orders có năm mươi triệu dòng, không biết có index gì, không biết câu hiện tại đang quét cả bảng. Không có gì để tối ưu, nên nó không tối ưu. Nó chỉ viết.

Giờ hỏi ngược: nếu bạn nhờ một DBA giỏi tối ưu câu này, người đó sẽ đòi gì? Bên phải là năm thứ. Schema các bảng liên quan. Index hiện có. Số dòng, ví dụ orders năm mươi triệu, users hai triệu. Câu query hiện tại kèm output của EXPLAIN ANALYZE, tức bản kế hoạch thực thi thật với thời gian thật, để model thấy chính xác thứ planner của Postgres thấy. Và mục tiêu rõ: giảm seq scan trên orders, hoặc dưới một trăm mili giây.

Bên trái là cây kế hoạch. Trước: Seq Scan on orders, quét năm mươi triệu dòng, hơn chín giây. Sau khi AI có đủ context và đề xuất một index trên user_id: Index Scan, ba trăm mười hai dòng, ba mili giây.

Nhưng bước quan trọng nhất không phải là AI đề xuất. Là bước cuối: bạn chạy EXPLAIN ANALYZE thật với câu mới và so hai kết quả. Kiểm chứng với planner, không phải với model. Planner là cái máy không biết nói dối. Model thì nói rất hay.

Một mẹo nhỏ với agent: bạn không cần dán tay năm thứ đó. Bảo nó tự chạy backslash d orders, tự chạy EXPLAIN ANALYZE, rồi mới đề xuất, rồi chạy lại để so. Cả vòng kiểm chứng nằm trong một phiên.

---

### Slide 11 · A long chat is not a badge of honor

**Hiểu trước khi nói.** Lịch sử hội thoại vừa là đòn bẩy (model nhớ mọi thứ trong phiên) vừa là gánh nặng (nhớ cả sáu lần thử sai). Bốn kỹ thuật quản context từ tài liệu Anthropic: compaction (tóm tắt lịch sử), note-taking (bộ nhớ ngoài như todo.md), sub-agents (agent phụ đọc nhiều file, chỉ trả về tóm tắt), just-in-time retrieval (nạp khi cần thay vì nạp hết từ đầu). Quy tắc hai lần: sửa AI hai lần cùng lỗi mà vẫn sai thì context đã bẩn, hãy clear và viết lại. File quy ước dự án như CLAUDE.md, AGENTS.md được nạp tự động mỗi phiên; giữ ngắn vì nó cũng chiếm context.

**Nói đơn giản.** Chat càng dài, AI càng lẫn, vì nó nhớ cả những lần bạn sửa sai. Sửa hai lần vẫn sai thì mở phiên mới. File CLAUDE.md là sổ tay quy ước cho AI đọc mỗi lần bắt đầu.

**Đọc.** Có ai ở đây có một phiên chat với AI kéo dài cả ngày, hàng trăm lượt, và cảm thấy tự hào về nó không? Tôi từng như vậy. Slide này là để nói: phiên chat dài không phải huân chương.

Nhìn cửa sổ bên trái. Một session tám lượt: refactor, sửa, sửa lại, rồi hai bong bóng đỏ "still wrong, fix một", "still wrong, fix hai". Đồng hồ RAM bên cạnh chỉ chín mươi sáu phần trăm. Lịch sử hội thoại là đòn bẩy mạnh nhất, vì model nhớ mọi thứ đã nói. Nhưng nó cũng là gánh nặng, vì nó nhớ cả sáu lần thử sai, mọi lối rẽ bỏ dở, và giờ nó bị neo vào cách hiểu sai của chính nó.

Bốn kỹ thuật có tên, để mọi người tra được. Compaction: tóm tắt lịch sử thành một đoạn ngắn rồi tiếp tục với đoạn đó; giữ quyết định, bỏ quá trình. Note-taking: bộ nhớ ngoài context, một file todo.md trong repo mà model đọc và cập nhật; trạng thái sống qua nhiều phiên, không phụ thuộc lịch sử chat. Sub-agents: giao việc đọc hai mươi file cho một agent phụ có context riêng, chỉ nhận về bản tóm tắt; context chính không phải gánh hai mươi file để tìm một hàm. Just-in-time: nạp thông tin khi cần, theo đường dẫn hoặc câu truy vấn, thay vì đổ hết vào đầu phiên.

Và một quy tắc rất thực dụng, tôi gọi là quy tắc hai lần: đã sửa AI hai lần cùng một lỗi mà vẫn sai, context đã bẩn. Đừng sửa lần ba. Bấm clear, cửa sổ chat sụp xuống còn một prompt sạch có test, error, và file. Đồng hồ về bốn phần trăm. Lần thứ ba trên context sạch thường đúng ngay, và tôi vẫn ngạc nhiên mỗi lần thấy vậy.

Cuối cùng là file quy ước dự án, CLAUDE.md hay AGENTS.md tuỳ tool. Nó được nạp tự động mỗi phiên, nên mỗi phiên bắt đầu với thông tin đúng thay vì đoán. Ghi gì vào đó? Lệnh build và test đúng của repo, code style, các gotcha, quy tắc migration, quy tắc authorship. Quy tắc chọn dòng: nếu bạn phải sửa model cùng một chuyện hai lần, chuyện đó thuộc về file này. Quy tắc giữ ngắn: mỗi dòng tự hỏi "bỏ dòng này thì AI có sai không", không thì bỏ, vì file này cũng chiếm context.

Câu chốt: context sạch cộng prompt tốt gần như luôn thắng một phiên dài lê thê.

---

### Slide 12 · Big task? Make the AI interview you first

**Hiểu trước khi nói.** Với task lớn, Anthropic đề xuất bốn bước: Explore (đọc, hiểu, không sửa; nhiều tool có plan mode), Plan (ra spec.md, bạn duyệt), Code (bước nhỏ, mỗi bước một test), Commit (checkpoint thường xuyên để quay lại được). Harper Reed có workflow nổi tiếng: prompt "hỏi tôi từng câu một để cùng xây spec chi tiết", ra spec.md, rồi prompt_plan.md và todo.md, rồi thực thi từng bước. Điều khiến agent chạy được một mình là có "check tự chạy": test, build, lint. Không có test, agent chỉ có thể báo xong.

**Nói đơn giản.** Việc lớn thì đừng bảo AI làm ngay. Bắt nó đọc trước, viết kế hoạch, bạn duyệt, rồi mới code từng bước nhỏ có test. Kế hoạch là chỗ bạn cầm lái.

**Đọc.** Đến giờ chúng ta nói về task nhỏ: một hàm, một bug. Task lớn thì khác. Nhiều file, nhiều ngày, đụng vào kiến trúc. Với task lớn, lời khuyên của tôi ngược với bản năng: đừng bảo AI làm ngay. Bắt nó phỏng vấn bạn trước.

Đường ray có bốn ga, theo cách Anthropic đề xuất. Ga Explore: đọc, hiểu, không sửa gì. Nhiều tool có plan mode đúng cho việc này, ở Claude Code là bấm Shift Tab: nó đọc repo, trả lời câu hỏi, nhưng mọi tool ghi đều bị khoá. Mục đích là tách nghiên cứu khỏi thực thi, để không giải sai bài toán vì hiểu sai codebase.

Ga Plan: ra một file spec.md và bạn duyệt. Nhìn thanh chắn trên ga: nó chỉ mở khi có con dấu approved. Đây là chỗ bạn cầm lái, và là chỗ rẻ nhất để cầm lái, vì sửa một dòng spec rẻ hơn sửa ba trăm dòng code.

Ga Code: bước nhỏ, mỗi bước một test. Một thay đổi sáu trăm dòng bạn không review nổi thì tệ hơn là không thay đổi gì. Nhìn đèn giao thông trên ga: đèn xanh là "a check it can run". Câu này của Anthropic tôi thấy đúng nhất trong mọi tài liệu về agent: cho AI một cách tự kiểm, test hoặc build hoặc screenshot, là khác biệt giữa phiên bạn phải ngồi canh và phiên bạn có thể đi pha cà phê. Không có test, agent chỉ có thể nói là xong.

Ga Commit: checkpoint thường xuyên. Mũi tên nét đứt quay về Code: bước sau hỏng thì quay lại bằng git, không phải bằng cách prompt tiếp.

Câu trích ở dưới là của Harper Reed, một người dùng AI viết code rất nặng. Prompt của ông chỉ một câu: "Hỏi tôi từng câu một để cùng xây một spec chi tiết cho ý tưởng này." Model hỏi về phạm vi, dữ liệu, edge case; ông trả lời; kết quả là một spec do hai bên cùng viết, rồi mới sinh kế hoạch từng bước, rồi mới code. Có ai từng thử cách này chưa? Cảm giác đầu tiên thường là chậm. Cảm giác thứ hai, sau một tuần, là ít phải làm lại hơn hẳn.

Và một câu hỏi tôi hay nhận: biết khi nào nên dừng và tự viết? Ba lần thất bại trên cùng một vấn đề là tín hiệu, không phải lời mời prompt mạnh hơn. Đóng tab, tự viết, thường mất hai mươi phút.

---

### Slide 13 · Every agent pattern has a failure mode. Every SOP step plugs one.

**Hiểu trước khi nói.** Bốn pattern kiến trúc mà mọi agentic coding tool đều dùng. Planner/Executor: một vai chia mục tiêu thành task, các vai khác thực thi từng task phạm vi hẹp; hỏng khi plan sai. Multi-agent: nhiều agent chuyên biệt (đọc, tìm, review) có lớp điều phối; hỏng khi vai chồng lấn và không ai sở hữu kết quả. Memory-augmented: ba loại bộ nhớ, ngắn hạn là phiên, dài hạn là CLAUDE.md và todo.md, có cấu trúc là repo và DB; hỏng khi bộ nhớ cũ hoặc sai làm agent lặp lại lỗi. Tool-using: agent gọi tool đọc, chạy, sửa, cài, push; hỏng khi quyền ghi sai hoặc package sai. Mỗi pattern ứng với một bước SOP đã nói và một trụ.

**Nói đơn giản.** Bốn kiểu "máy" bên trong tool AI, mỗi kiểu có một chỗ dễ hỏng, và mỗi chỗ hỏng ứng với một bước trong checklist của mình.

**Đọc.** Slide này để nối phần workflow với phần review sắp tới. Bốn pattern mà mọi agentic coding tool hiện nay đều dùng bên trong, dù tên gọi khác nhau. Với mỗi pattern tôi nói ba thứ: nó làm gì, hỏng ở đâu, và bước SOP nào bịt chỗ hỏng.

Planner và Executor. Một vai lập kế hoạch chia mục tiêu lớn thành các task có thứ tự, các vai thực thi làm từng task với phạm vi hẹp. Đây chính là plan mode và bốn ga ở slide trước. Hỏng ở đâu? Plan sai thì mọi bước sau sai một cách rất nhất quán, vì executor làm đúng cái nó được giao. Vá bằng: duyệt spec trước khi có dòng code nào, và một test mỗi bước. Trụ Context.

Multi-agent. Nhiều agent chuyên biệt, đọc, tìm, review, có một lớp điều phối. Hỏng ở đâu? Vai chồng lấn, không ai sở hữu kết quả, và agent này tin lời agent kia như tin sự thật. Có ai từng thấy hai agent tự khen nhau "looks good to me" rồi merge chưa? Vá bằng: tách Writer và Reviewer thành hai phiên có context khác nhau, sub-agent chỉ trả về tóm tắt, và đúng một người ký. Trụ Ownership.

Memory-augmented. Ba lớp bộ nhớ: phiên hiện tại, file như CLAUDE.md và todo.md, và repo với DB. Hỏng ở đâu? Bộ nhớ cũ hoặc sai làm agent lặp lại đúng một lỗi ở mọi phiên, và sau một tháng cả team tưởng đó là quy ước. Vá bằng: giữ CLAUDE.md ngắn và đúng, sửa ngay khi nó sai, clear khi context bẩn. Trụ Context.

Tool-using. Agent gọi tool: đọc, test, sửa, và cả cài package, commit, push. Hỏng ở đâu? Quyền ghi sai và package sai; nhìn cái ổ khoá đỏ ở tool thứ tư. Hai sự cố thật về chuyện này sẽ có ở phần sau. Vá bằng: quyền tối thiểu cho từng tool; đọc và chạy test thì tự do, cài package, push, chạm production thì qua người. Trụ Verification và Ownership.

Điểm tôi muốn mọi người thấy: checklist ở phần 7.4 không phải danh sách ngẫu nhiên. Mỗi bước trong đó tồn tại vì một trong bốn pattern này có một chỗ hỏng. Bỏ một bước là mở lại đúng một chỗ hỏng.

---

### Slide 14 · Divider · Code Review Process

**Hiểu trước khi nói.** Review code AI khác review code người: code người viết có "hình dạng" trong đầu người viết, reviewer chỉ cần kiểm lại; code AI không có hình dạng trong đầu ai, reviewer phải dựng từ đầu, nên chậm hơn. Bốn trục review: đúng, an toàn, đủ nhanh, test có nghĩa.

**Nói đơn giản.** Chuyển phần: khi AI nộp code, mình soi cái gì.

**Đọc.** Phần 7.2: code review. Tôi mở bằng một quan sát. Review code của đồng nghiệp, bạn có lợi thế: người viết có hình dạng của đoạn code trong đầu, và bạn chỉ cần kiểm lại hình dạng đó. Review code AI thì không ai có hình dạng nào trong đầu cả. Bạn phải dựng nó từ đầu. Nên review code AI chậm hơn, không nhanh hơn, và ai lên kế hoạch ngược lại sẽ gặp rắc rối.

Bốn trục, và bốn trục này chỉ con người ký được: đúng, an toàn, đủ nhanh, và test có nghĩa. Mỗi trục một quy tắc, đi trong bốn slide.

---

### Slide 15 · You have to test what it writes.

**Hiểu trước khi nói.** Câu của Simon Willison: "If you haven't seen it run, it's not a working system." AI mắc lỗi kiểu "deeply inhuman": bịa thư viện, bịa method, tự tin khi sai. Nguy hiểm vì code AI viết sai vẫn trông đúng (tên đẹp, có comment), trong khi reviewer người quen dùng "trông hợp lý" làm bộ lọc. SOP: bắt AI trưng bằng chứng: output test nguyên văn, lệnh đã chạy và kết quả, screenshot. Mẹo Writer/Reviewer: một phiên viết, một phiên context sạch review, vì phiên viết có thiên kiến với code nó vừa viết.

**Nói đơn giản.** Quy tắc số một: phải thấy nó chạy. AI nói "xong, test pass" không có giá trị; bắt nó đưa output test thật.

**Đọc.** Quy tắc số một, bất di bất dịch, của Simon Willison: bạn phải test thứ nó viết. Chưa thấy nó chạy thì chưa phải hệ thống chạy được.

Tôi biết câu này nghe hiển nhiên. Nhìn hai cửa sổ để thấy vì sao phải nhắc. Bên trái, agent nói: "Done. Refactored calc, all tests pass. Ready to merge." Bên phải, terminal thật: hai test fail. Hai cái này đặt cạnh nhau là cả slide. Agent không nói dối theo nghĩa con người; nó chỉ tạo ra câu chữ hợp lý nhất sau khi sửa code, và "all tests pass" là câu hợp lý nhất.

Vì sao chúng ta hay bị qua mặt? Vì AI mắc lỗi theo kiểu rất không giống người. Một junior viết sai thì thường trông sai: tên biến lạ, logic lủng củng, có mùi. AI viết sai thì trông đúng: đặt tên đẹp, có docstring, có comment, và gọi một method không tồn tại. Reviewer người quen dùng "trông hợp lý" làm bộ lọc đầu tiên, và bộ lọc đó vô hiệu hoàn toàn với code AI. Code càng trông chuyên nghiệp, càng ít bị soi. Nghĩ lại chuyện PR bốn trăm dòng ở đầu buổi: nó trông rất chuyên nghiệp.

Quy tắc: bắt AI trưng bằng chứng thay vì lời khẳng định. Ba con dấu bên phải: output của test nguyên văn, có số pass và fail; lệnh nó đã chạy và kết quả; screenshot màn hình thật với thay đổi giao diện. Không chấp nhận chữ "đã xong" không kèm output. Với agent, prompt đơn giản là: chạy test rồi dán nguyên văn output, không tóm tắt.

Mẹo tổ chức mà tôi thấy hiệu quả nhất: Writer và Reviewer. Một phiên viết code, một phiên khác với context sạch review lại diff. Phiên viết có thiên kiến với code nó vừa viết, giống hệt người. Phiên sạch đọc như người lạ. Kết hợp với quy tắc cuối cho chính bạn: đọc lại diff như thể người lạ viết. Vì đúng là người lạ viết.

---

### Slide 16 · When hallucination becomes a supply-chain attack

**Hiểu trước khi nói.** Slopsquatting, chơi chữ từ typosquatting (đăng ký tên gần giống package nổi tiếng để bẫy người gõ nhầm). Cơ chế: AI gợi ý một package nghe hợp lý nhưng không tồn tại; kẻ tấn công biết model hay bịa tên đó nên đăng ký sẵn trên npm hoặc PyPI kèm mã độc trong install script; bạn hoặc agent của bạn chạy npm install, mã độc chạy với quyền của bạn. Số liệu từ Socket tổng hợp: 576 nghìn mẫu code, 16 model, 19,7% package gợi ý không tồn tại (5,2% ở model thương mại, 21,7% open-source), và 58% tên bịa lặp lại qua nhiều lần chạy, nên mục tiêu dự đoán được. Lockfile không bảo vệ vì nó chỉ khoá version của package đã chọn. SOP: kiểm tra package tồn tại và uy tín (tuổi, lượt tải, maintainer, repo) trước khi cài; npm audit và dependency scanning trong CI; không cho agent tự cài package.

**Nói đơn giản.** AI hay gợi ý tên thư viện không tồn tại. Kẻ xấu biết vậy nên đăng ký sẵn tên đó kèm mã độc. Bạn cài là dính. Kiểm tra thư viện có thật và uy tín trước khi cài.

**Đọc.** Slide này tôi kể như một câu chuyện, theo bốn nút trên hình, vì nó là câu chuyện thật đang xảy ra.

Nút một: bạn hỏi AI cách validate email trong React, nó gợi ý "cài react-validate-utils-pro". Tên nghe rất hợp lý, đúng kiểu đặt tên của hệ sinh thái. Nút hai: package đó không tồn tại. Model bịa, vì cái tên đó có xác suất cao theo mẫu nó học. Chuyện này xảy ra gần hai mươi phần trăm số lần, tôi sẽ đưa số ngay. Nút ba: kẻ tấn công biết model hay bịa đúng cái tên đó, nên đăng ký sẵn trên npm hoặc PyPI, kèm mã độc trong script cài đặt. Nút bốn: bạn, hoặc tệ hơn là agent của bạn, gõ npm install. Script postinstall chạy với quyền của bạn, trên máy dev hoặc trong CI. Mã độc lấy token, lấy secret, và bạn không thấy gì vì package "cài thành công". Người ta gọi là slopsquatting.

Hai con số bên phải, từ nghiên cứu Socket tổng hợp trên năm trăm bảy mươi sáu nghìn mẫu code do mười sáu model sinh ra. Mười chín phẩy bảy phần trăm package được gợi ý không tồn tại. Và con số đáng sợ hơn: năm mươi tám phần trăm tên bịa lặp lại qua nhiều lần chạy. Nghĩa là kẻ tấn công không cần đoán mò. Chạy model vài lần với những prompt phổ biến, ghi lại tên nó hay bịa, đăng ký đúng tên đó. Mục tiêu trở nên dự đoán được.

Có ai từng cài một package do AI gợi ý mà không mở trang npm của nó ra xem không? Tôi có. Đó là lý do quy tắc này phải là bước bắt buộc chứ không phải lời khuyên.

SOP: trước khi cài bất kỳ package nào AI gợi ý, kiểm tra nó tồn tại trên registry chính thức, đúng tên, đúng scope. Kiểm tra uy tín: tuổi, lượt tải hằng tuần, maintainer, repo có thật và có hoạt động không. Cảnh giác với package mới tạo, ít lượt tải, tên gần giống package nổi tiếng. npm audit và dependency scanning trong CI để lưới đỡ là máy, không phải trí nhớ. Và với agent: không cho quyền cài package tự do; cài là bước có người duyệt. Ở Claude Code, đó là một dòng deny rule trong settings.

Nếu ai hỏi lockfile có bảo vệ không: lockfile khoá version của package bạn đã chọn. Nó không ngăn bạn chọn nhầm package ngay lần đầu.

---

### Slide 17 · Five of the ten, straight out of the model

**Hiểu trước khi nói.** OWASP Top 10 (bản 2021) là danh sách mười loại rủi ro web phổ biến nhất. A01 Broken Access Control: người dùng làm được việc không được phép; IDOR là đổi id trên URL để xem dữ liệu người khác. A02 Cryptographic Failures: key hardcode, hash yếu như MD5 không salt, Math.random() làm token (không phải bộ sinh ngẫu nhiên mật mã, đoán được; dùng crypto.randomBytes hoặc randomUUID). A03 Injection: SQL nối chuỗi, XSS. A04 Insecure Design: tin client cho giá hoặc role. A05 Security Misconfiguration: CORS mở, bucket public, route debug còn sót. SAST (static application security testing) là công cụ quét code tĩnh: Semgrep với ruleset OWASP bắt pattern lỗi, gitleaks quét secret. Nghiên cứu Stanford và NYU: developer dùng AI assistant viết code kém an toàn hơn và tự tin hơn.

**Nói đơn giản.** Năm trong mười loại lỗ hổng phổ biến nhất là thứ AI hay tự tạo ra: quên kiểm tra quyền, hardcode key, nối chuỗi SQL, tin dữ liệu từ client, cấu hình mở. Cần máy quét code trong CI làm lưới đỡ.

**Đọc.** Mười ô trên màn hình là OWASP Top 10, danh sách mười loại rủi ro web phổ biến nhất, có tên và số chuẩn, có tài liệu để tra. Tôi dùng khung này thay vì tự nghĩ danh sách, vì khi bị hỏi "sao anh nói cái này nguy hiểm", tôi trỏ vào tài liệu chứ không trỏ vào cảm giác. Năm ô sáng là năm loại AI hay tự tạo ra nhất. Đi từng ô.

A01, Broken Access Control, kiểm soát truy cập bị vỡ. Cách AI tạo ra: bạn bảo nó refactor một handler, nó giữ happy path và đánh rơi đoạn kiểm tra quyền; hoặc sinh endpoint mới mà quên guard vì prompt không nhắc. IDOR là ví dụ cụ thể: đổi id mười bảy thành mười tám trên URL là xem được đơn hàng người khác. Đây là lỗi review AI phổ biến nhất ngoài đời, và test không bắt được, vì test được sinh từ cùng happy path: cả code lẫn test đều đi qua con đường "user hợp lệ xem đơn của mình".

A02, Cryptographic Failures. API key hardcode, vì AI đã học từ hàng vạn ví dụ có key giả nên nó điền một chuỗi trông như key thật. Hash mật khẩu bằng MD5. Và Math.random() làm token: nó không phải bộ sinh ngẫu nhiên mật mã, đoán được từ vài giá trị trước.

A03, Injection. SQL nối chuỗi vì prompt nói "dynamic filter" và model chọn cách đơn giản nhất. XSS vì render HTML từ input người dùng mà không escape.

A04, Insecure Design. Tin client cho giá hoặc role gửi lên trong request. Code đúng cú pháp, sai thiết kế. Không linter nào bắt được, chỉ người hiểu nghiệp vụ mới thấy. Đây là ô tôi lo nhất.

A05, Misconfiguration. CORS mở toang "cho nó chạy đã", bucket public, route debug còn sót lại từ lúc thử.

Có một nghiên cứu của Stanford và NYU khiến tôi nhớ mãi: developer dùng AI assistant viết code kém an toàn hơn developer viết tay, và tự tin hơn rằng code mình an toàn. Hai hiệu ứng cộng lại: sai nhiều hơn và kiểm ít hơn. Đó là lý do cần lưới đỡ bằng máy. Nhìn tấm lưới hạ xuống: SAST, quét code tĩnh. Semgrep với ruleset OWASP bắt injection, thiếu auth, crypto yếu; gitleaks quét secret trong diff. Chạy trên mọi PR, fail build khi có finding mức cao. Nó không thay review. Nó bắt phần mắt người bỏ khi vội.

---

### Slide 18 · Two places AI is "green but wrong"

**Hiểu trước khi nói.** Performance: bốn mùi. N+1 query là lấy danh sách rồi trong vòng lặp gọi thêm query cho từng phần tử, 101 query thay vì 2. Thiếu index cho cột WHERE mới. Unbounded fetch là findAll không LIMIT trên bảng đã lớn. O(n²) vô tình là includes lồng trong vòng lặp trên hai list. Cả bốn pass unit test vì test chạy trên dữ liệu nhỏ. Test dởm: lạm dụng mock đến mức chỉ assert "hàm đã được gọi"; khẳng định hành vi hiện tại thay vì hành vi đúng (test sinh bằng cách chạy code rồi ghi lại output, nên code sai thì test sai theo và vẫn xanh); coverage cao nhưng assertion vô nghĩa. Phép thử: xoá business rule mà test vẫn pass thì đó không phải test. Số 900_00 là tiền tính bằng cent nguyên thay vì float.

**Nói đơn giản.** Hai kiểu "xanh mà sai": code chậm nhưng test vẫn pass vì test chỉ chạy trên mười dòng; và test do AI sinh chỉ chứng minh hàm được gọi, không chứng minh kết quả đúng. Phép thử: xoá luật nghiệp vụ mà test vẫn xanh thì đó không phải test.

**Đọc.** Hai chỗ code AI "xanh mà sai": test pass, CI xanh, và vẫn hỏng ở production. Tôi muốn mọi người để ý cái badge ở góc phải: bốn test pass, trên mười dòng dữ liệu. Nó sẽ xanh suốt slide này, và đó chính là vấn đề.

Bên trái là N+1. Lấy danh sách một trăm đơn hàng, rồi trong vòng lặp gọi thêm một query lấy user của từng đơn. Một trăm lẻ một query thay vì hai. Code trông rất sạch, mỗi dòng đều hợp lý, không có mùi gì. Ba mùi còn lại ở dưới. Thiếu index cho cột WHERE mới thêm: trên mười dòng không khác gì, trên năm mươi triệu dòng là quét cả bảng. findAll không giới hạn trên bảng đã lớn: chạy ổn hai năm, rồi một ngày bảng đủ lớn để làm hết memory, và không ai nhớ đoạn code đó. O bình phương vô tình: includes lồng trong vòng lặp trên hai list, mười phần tử thì trăm phép so, mười nghìn thì trăm triệu.

Cả bốn pass mọi unit test. Vì sao? Vì unit test chạy trên dữ liệu nhỏ. Badge vẫn xanh. Chúng chỉ lộ ở production, lúc đắt nhất. Không tài liệu nào dạy hay bằng hai ba ví dụ thật từ codebase của team; tôi khuyến khích mỗi team giữ một danh sách "mùi của mình".

Bên phải là chuyện test dởm, và cái này liên quan trực tiếp đến câu chuyện đầu buổi. Donut coverage chín mươi lăm phần trăm, xanh, và bên trong ghi: không rule nào được kiểm chứng. Nhìn dòng code dưới: expect spy to have been called. Test này mock hàm giảm giá, gọi total, rồi assert là hàm đã được gọi. Nó xanh dù công thức giảm giá sai hoàn toàn, vì nó chỉ chứng minh hàm được gọi, không chứng minh kết quả đúng.

Kiểu thứ hai nguy hiểm hơn: khẳng định hành vi hiện tại thay vì hành vi đúng. AI sinh test bằng cách chạy code rồi ghi lại output làm giá trị kỳ vọng. Nếu code đang sai, test xanh chỉ đóng băng cái sai lại, và chống lại mọi lần sửa sau. Test đúng phải dẫn xuất từ yêu cầu: đúng một trăm đơn vị thì giảm mười phần trăm, tổng chín trăm đô, và số chín trăm lấy từ spec, không phải từ chạy code.

Phép thử một câu, dùng được ngay chiều nay: xoá business rule đi mà test vẫn pass, thì đó không phải test. Nhìn dòng cuối: xoá dòng if qty lớn hơn bằng một trăm, badge vẫn xanh. Chữ "green" trong tiêu đề đổi sang đỏ là vì vậy.

SOP: người viết ít nhất một test edge case mà AI bỏ sót, và tự chạy để thấy nó pass thật. Chốt phần 7.2: AI review được style và lỗi rõ. Bốn thứ chỉ con người ký: đúng, an toàn, đủ nhanh, test có nghĩa.

---

### Slide 19 · Divider · Documentation

**Nói đơn giản.** Chuyển phần: tài liệu.

**Đọc.** Phần 7.3, documentation, một slide thôi. Nguyên tắc gói trong một câu: cho AI cầm bút, không cho AI cầm quyền quyết. Docs và quyết định kiến trúc là nơi ranh giới đó rõ nhất.

---

### Slide 20 · AI drafts; a human reviews and decides

**Hiểu trước khi nói.** Docs từ code an toàn vì nguồn sự thật đã check in, model chỉ tóm tắt thứ nó thấy; ngược lại, sinh code từ văn xuôi mô tả thứ bạn ước là có thì lệch ngay khi một bên đổi. Cảnh báo: docs AI sinh "nghe hợp lý nhưng sai kỹ thuật" đúng ở chỗ phức tạp nhất. Diátaxis (diataxis.fr) chia docs theo hai trục: người đọc đang học hay đang làm, cần thực hành hay lý thuyết; ra bốn loại tutorial, how-to, reference, explanation. Docs khó dùng vì trộn bốn loại vào một trang. ADR (Architecture Decision Record) theo template Nygard: Title, Status, Context, Decision, Consequences; bất biến, quyết định mới thì viết ADR mới supersede cái cũ. AI được draft ADR nhưng không được quyết vì nó bịa rationale team chưa từng bàn. RFC là tài liệu bàn trước khi làm, ADR ghi lại quyết định đã chốt.

**Nói đơn giản.** AI viết nháp tài liệu thì tốt, nhưng quyết định kiến trúc phải là người ký. Tài liệu chia bốn loại cho bốn nhu cầu, trộn lẫn là khó dùng.

**Đọc.** Dòng đầu tiên là hướng đi. Code sang docs thì an toàn, vì nguồn sự thật đã check in và model chỉ tóm tắt thứ nó nhìn thấy. Đây là việc AI làm rất tốt, và tôi khuyến khích: docs cho một module cũ không ai nhớ, sinh từ code, người duyệt. Văn xuôi sang code thì ngược lại: sinh code từ một đoạn mô tả thứ bạn ước là có sẽ cho ra thứ trông khớp, và lệch ngay khi một bên thay đổi.

Một cảnh báo tôi đọc được và thấy rất đúng: docs AI sinh nghe rất hợp lý nhưng sai kỹ thuật đúng ở những chỗ phức tạp nhất, nơi model phải suy diễn thay vì tóm tắt, và đó cũng là nơi cần docs nhất. Nên khi duyệt docs AI viết, đừng đọc đều; tập trung vào chỗ phức tạp.

Lưới bốn ô là Diátaxis, một khung phân loại docs mà tôi ước mình biết sớm hơn. Hai trục: người đọc đang học hay đang làm, và họ cần thực hành hay lý thuyết. Ra bốn loại. Tutorial để học, cầm tay chỉ việc, một đường thẳng từ zero đến kết quả đầu tiên. How-to để làm một việc cụ thể, có mục tiêu rõ, cho người đã biết cơ bản. Reference để tra cứu chính xác, khô, đầy đủ. Explanation để hiểu vì sao. AI viết loại nào cũng nhanh. Nhưng chọn loại nào cho ai là việc của bạn. Có ai từng mở một trang docs mà nửa đầu là tutorial, nửa sau là reference, xen vài đoạn triết lý, và không tìm được thứ mình cần? Đó là vì trộn bốn loại vào một trang.

Bên phải là một tờ ADR, Architecture Decision Record, theo template Nygard. Năm mục: title, status, context, decision, consequences. ADR bất biến; quyết định mới thì viết ADR mới supersede cái cũ, để lịch sử suy nghĩ còn nguyên. Một ADR là một quyết định kèm điều kiện hết hạn; nhìn dòng "revisit when". Không có điều kiện hết hạn thì nó là trang wiki.

Điểm đắt nhất là hai con dấu. "Drafted by AI" thì được, thậm chí nên. "Decided by" phải là tên người. Vì model bịa rationale rất trôi chảy, và nếu để nó điền, team sẽ có một tài liệu ghi lý do chưa ai từng bàn, và sáu tháng sau ai cũng tưởng đã bàn. Context và Decision phải do người viết, hoặc ít nhất sửa từng câu.

Chốt: cho AI cầm bút, đừng cho AI cầm quyền quyết. Đây là trụ Ownership.

---

### Slide 21 · SOPs for common tasks

**Hiểu trước khi nói.** Checklist là cho người đã biết làm nhưng sẽ bỏ sót khi vội và tự tin; không ai merge AI diff tồi vì không biết review, họ merge vì nó trông hợp lý và họ đang vội. Khung SOP bốn bước áp cho mọi task: nạp context chuẩn, cho AI cách tự kiểm, verify rủi ro đặc thù của loại task, người ký tên. Rủi ro riêng: service mới (AI mạnh ở boilerplate, verify convention và phân tầng), migration theo Fowler (nhỏ, versioned, forward-only, có rollback, parallel change: expand rồi migrate rồi contract, không drop cột trong cùng release ngừng ghi), endpoint (validate input, authorize mọi endpoint, error contract, pagination), integration test (dependency thật trong container, mỗi test tự dọn, test flaky là test fail). Năm checklist đầy đủ nằm trong README.

**Nói đơn giản.** Một khung bốn bước dùng cho mọi việc: nạp thông tin chuẩn, cho AI cách tự kiểm, soi rủi ro riêng của loại việc đó, người ký tên.

**Đọc.** Slide cuối phần của tôi, và là slide gói mọi thứ lại thành một tờ giấy.

Trước hết, SOP thực ra là gì. Một việc lặp lại, viết thành các bước cố định, để kết quả như nhau bất kể ai làm và mệt đến đâu. Ba điểm phân biệt với tài liệu thông thường: nó là checklist chứ không phải bài giảng; nó viết cho ngày tệ nhất của bạn, hai giờ sáng, đang vội, đang dở việc khác; và nó sống, một sự cố thêm một bước, một bước không ai làm theo thì xoá.

Tôi muốn nói rõ một hiểu lầm: checklist không phải cho người chưa biết làm. Phi công giỏi nhất vẫn đọc checklist trước khi cất cánh. Không ai merge một AI diff tồi vì không biết cách review. Họ merge vì nó trông hợp lý, họ đang vội, và họ tự tin. Checklist là để chống lại ba thứ đó.

Checklist cụ thể phụ thuộc stack của team, nên đây là một khung, và các bạn điền theo task của mình. Tờ giấy có bốn ô. Một, nạp context chuẩn: template của team, một PR mẫu tốt gần đây, file convention, schema; đó là trụ Context, và bên máy là CLAUDE.md. Hai, cho AI cách tự kiểm: test, build, lint chạy được ngay trong phiên; bên máy là hook chạy test sau mỗi lần sửa. Ba, verify điểm rủi ro riêng của loại task: migration thì lock và rollback, endpoint thì auth và validation, package thì tồn tại và uy tín. Bốn, người ký tên trước khi merge; trụ Ownership; bên máy là permission prompt và deny rule cho push.

Dòng cuối là bốn loại task hay gặp: service mới, migration, endpoint, integration test. Năm checklist đầy đủ cho từng loại có trong README của repo, tôi không đọc ở đây. Chỉ nhắc một thứ: nếu bạn dùng Claude Code, nó mặc định thêm dòng "Co-Authored-By: Claude" vào commit. Tắt nó đi. Không phải để giấu, mà vì trách nhiệm mang tên bạn, và một cái trailer ngầm bảo reviewer hạ tiêu chuẩn.

Chốt phần tôi: SOP không phải để trói tay. Nó là context đóng gói sẵn để lần sau bạn và AI làm đúng ngay từ đầu.

**Trao mic (lần duy nhất):** "Đến đây là toàn bộ SOP: cách đưa AI đúng context, cách kiểm chứng thứ nó viết, và ai ký tên. Câu hỏi còn lại: nếu đẩy tự động đến cùng, không còn ai đọc code, thì kỷ luật đó đi về đâu? Nhân sẽ dẫn phần Dark Factory."

---

## Phần 2 · Nhân · Slide 22–36 · Dark Factory

### Slide 22 · Even Karpathy retired "vibe coding"

**Hiểu trước khi nói.** Karpathy đặt tên vibe coding tháng 2 năm 2025. Theo kế hoạch bài giảng, tháng 3 năm 2026 ông chuyển sang thuật ngữ Agentic Engineering: developer là người giám sát, điều phối các agent tự chạy nhiều bước, và giám sát chặt hơn vì agent làm nhiều việc hơn giữa hai lần người nhìn vào. Slide này là cây cầu sang dark factory.

**Nói đơn giản.** Người đặt ra từ "vibe coding" đã bỏ nó, chuyển sang mô hình người giám sát agent, và giám sát chặt hơn. Câu hỏi để lại: nếu tự động mãi thì đi đến đâu?

**Đọc.** Cảm ơn Hào. Tôi bắt đầu phần của mình bằng một chuyện nhỏ về từ ngữ, vì nó nói lên rất nhiều.

Tháng hai năm 2025, Karpathy, người từng dẫn AI ở Tesla và là một trong những người sáng lập OpenAI, đăng một dòng đặt tên cho thứ mà nhiều người đang làm: vibe coding. Buông theo cảm giác, quên code đi, cứ chấp nhận mọi thứ AI gợi ý. Cả ngành nhặt lấy từ đó ngay lập tức. Tháng ba năm 2026, chính ông khai tử nó. Nhìn thẻ bên trái bị gạch. Ông chuyển sang một từ khác: Agentic Engineering. Developer là người giám sát, điều phối các agent tự chạy nhiều bước. Và điểm quan trọng: giám sát chặt hơn, không lỏng hơn, vì agent làm nhiều việc hơn giữa hai lần người nhìn vào.

Tại sao tôi mở bằng chuyện này? Vì người đặt tên cho trào lưu đã tự sửa lại nó, theo đúng hướng Hào vừa nói suốt một tiếng: từ "quên code đi" sang "quy trình có giám sát". Chúng ta không đi ngược trào lưu. Chúng ta đi cùng người tạo ra nó.

Nhưng nhìn đường thời gian kéo dài vào chỗ mờ, với một dấu hỏi. Nếu mức tự động cứ tăng, agent làm nhiều hơn, người nhìn ít hơn, thì điểm cuối của con đường là gì? Có ai thử hình dung không? Tôi sẽ đưa mọi người đến đó trong mười slide tiếp theo, và cái đích có tên: dark factory.

---

### Slide 23 · Divider · The Dark Factory

**Hiểu trước khi nói.** Hình dung một xưởng sản xuất mà bên trong không có công nhân, chỉ có máy; người đứng ngoài chỉ đưa vào bản vẽ và tiêu chuẩn nghiệm thu. Đó là dark factory. Với phần mềm: không ai viết code, không ai review, không ai test tay; người chỉ viết yêu cầu và tiêu chí đạt. Năm slide tiếp theo là năm mục của mô hình, đi theo thứ tự: vì sao cần, đang ở đâu, làm thế nào, cấu trúc ra sao, và có thể hỏng ở đâu.

**Đọc.** Trước khi vào, tôi nói rõ ý đồ của phần này, để mọi người nghe đúng cách.

Tôi sẽ kể lại một thiết kế thật. Không phải lý thuyết, không phải slide của một công ty bán tool. Một trưởng nhóm platform, đội tám kỹ sư, khoảng mười hai microservice Java và TypeScript, ngồi thiết kế con đường từ "AI viết, người review" lên "không còn ai đọc code". Ông ấy viết lại toàn bộ quá trình đó, kể cả chỗ nghi ngờ, và tôi sẽ đi theo đúng năm mục của ông: vấn đề thực tế, khung cấp độ, bốn giai đoạn, kiến trúc bốn lớp, và rủi ro.

Định nghĩa trước. Trong sản xuất, dark factory là nhà máy chạy tắt đèn. Không cần bật đèn vì bên trong không có người; robot làm hết. Với phần mềm: không ai viết code, không ai review code, không ai test tay. Người chỉ làm hai việc: viết đặc tả hệ thống, tức spec, và viết tiêu chí nghiệm thu. Phần còn lại là máy.

Tôi muốn nói ngay điều này để không ai hiểu nhầm: mục đích của phần này không phải bảo mọi người làm theo tuần sau. Mục đích là câu hỏi Hào vừa để lại. Khi không còn ai đọc code, người ta phải nghĩ ra cách kiểm chứng gì để vẫn tin được sản phẩm? Và câu trả lời, khi mọi người nhìn kỹ, vẫn là ba trụ Context, Verification, Ownership, chỉ chuyển từ làm tay sang mã hoá vào máy. Đó là điều tôi muốn mọi người mang về.

---

### Slide 24 · 1 · The problem with AI adoption today

**Hiểu trước khi nói.** Xe đã có động cơ nhanh hơn nhưng đường vẫn kẹt ở trạm thu phí. AI giúp gõ code nhanh, nhưng thời gian thật sự mất ở chỗ chờ người review, cãi về style, test tay trên máy cá nhân. Bảng thời gian trên slide là số đo thật của một đội đã dùng AI rất nhiều.

**Đọc.** Mục một: vấn đề thực tế của việc áp dụng AI hiện nay. Tôi nghĩ mọi người sẽ thấy mình trong slide này.

Đội của tác giả không phải đội chậm. Đến đầu năm 2026 họ đã ở mức khá cao: AI viết phần lớn code, bot tự review mọi PR, thậm chí có agent tự vá cảnh báo bảo mật của Dependabot. Nếu đem lên slide thì rất đẹp. Rồi ông ấy làm một việc ít ai làm: ngồi đo thời gian thật của cả đội trong hai tuần, xem thời gian đi đâu.

Bảng này là kết quả. Chờ người review PR: hai đến tám giờ, và phần lớn chỉ là đóng dấu cho qua. Trao đổi qua lại trong review: nửa tiếng đến tiếng rưỡi, thường là cãi nhau về tên biến có đủ mô tả chưa. Kiểm thử thủ công trên localhost: nửa tiếng đến một tiếng, và hiếm khi làm tử tế. Điều tra bug production: có khi hai tiếng, để rồi sửa năm dòng. Viết boilerplate: hàng giờ cho mỗi tính năng, không tạo giá trị gì.

Ông ấy nói bảng này làm ông bực. Cả đội đã bỏ bao nhiêu công sức áp dụng AI, và kết quả là: gõ nhanh hơn, còn mọi thứ xung quanh việc gõ vẫn chậm, thủ công, và không nhất quán như xưa. Nút thắt cổ chai không biến mất. Nó dọn nhà xuống cuối hành lang.

Có ai thấy đội mình trong bảng này không? Tôi thấy đội tôi. Đây chính là slide ba của Hào, nhìn từ bên trong một đội thật: chúng ta đã ăn mừng quá sớm, vì mới tự động hoá được việc gõ, và chỉ việc gõ.

Cùng tuần đó, hai bài viết làm ông đổi cách nghĩ. StrongDM công bố cái họ gọi là software factory: ba kỹ sư, không dòng code nào do người viết hay review, chất lượng do kịch bản holdout và bản sao số đảm nhận. OpenAI ra bài về harness engineering: một triệu dòng code không viết tay, trong một phần mười thời gian thường lệ. Cả hai báo cáo tốc độ gấp ba đến mười lần, kéo dài nhiều tháng, trên sản phẩm thật, không phải demo hackathon. Ông tự hỏi: vậy là làm được thật. Cần gì để đến đó? Câu hỏi đó chiếm mấy tuần tiếp theo của ông, và là phần còn lại của khối này.

---

### Slide 25 · 2 · Autonomy levels

**Hiểu trước khi nói.** Giống thang xe tự lái. Nấc 1 AI gợi ý từng câu; nấc 2 AI viết cả file, bạn đọc hết, hầu hết team ở đây; nấc 3 AI viết từ yêu cầu, có bộ kiểm định tự chấm, bạn chỉ bấm duyệt; nấc 3.5 vài dịch vụ tự merge; nấc 4 nhà máy tối. Bước khó nhất là từ 2 lên 3, vì phải thay "người đọc code" bằng "máy chấm".

**Đọc.** Mục hai: khung cấp độ tự động hoá. Để nói chuyện "chúng ta đang ở đâu và muốn đi đâu" mà không cãi nhau, tác giả mượn thang của xe tự lái. Năm gian trên màn hình là năm nấc.

Nấc một: AI tự hoàn thành câu lệnh của bạn. Autocomplete. Con người làm mọi thứ khác. Đây là Copilot của ba năm trước.

Nấc hai: AI viết toàn bộ hàm hoặc file. Con người review từng thay đổi nhỏ. Nhìn nhãn "you are here": hầu hết các đội ngũ hiện nay đang dừng ở đây, kể cả đội của tác giả lúc đó, và tôi đoán là hầu hết người trong phòng này. Toàn bộ phần của Hào là SOP cho nấc này.

Nấc ba: AI tạo code từ các bản đặc tả. Các kịch bản holdout đóng vai trò kiểm soát chất lượng. Con người chỉ phê duyệt lượt merge. Để ý: ở nấc này con người không đọc code nữa, con người đọc kết quả kiểm định.

Nấc ba rưỡi: tương tự nấc ba, nhưng một số dịch vụ tự động merge mà không cần con người. Chỉ một số, những dịch vụ có bộ kiểm định đủ tốt.

Nấc bốn, full dark factory: đặc tả đi vào, mã nguồn đã qua kiểm thử tự động được merge ra, quy trình CI/CD sẵn có tự động deploy. Không có người trong vòng lặp thường ngày.

Câu hỏi cho phòng: khoảng cách nào trong năm nấc này là khó nhất? Không phải từ ba lên bốn. Là từ hai lên ba. Vì đó là lúc phải thay "người đọc code" bằng "máy kiểm chứng", và phải tin cái máy đó. Toàn bộ bài toán thiết kế khó nằm ở đó, và phần lớn thời gian còn lại của tôi cũng ở đó.

---

### Slide 26 · 3 · Phased rollout

**Hiểu trước khi nói.** Như sửa nhà từng phòng: xong phòng nào ở được phòng đó. Dừng ở giai đoạn 1 vẫn có lãi. Và không phải đập pipeline deploy: mọi thứ sau merge y như cũ.

**Đọc.** Mục ba: lộ trình triển khai. Tác giả có một nguyên tắc mà tôi rất thích: không tin đề xuất nào chỉ có lãi khi xây xong toàn bộ. Vì đó là cách người ta ở tháng thứ mười tám của dự án với hai bàn tay trắng. Nên ông chia bốn giai đoạn, và điều kiện là mỗi giai đoạn phải tự mang lại giá trị độc lập ngay lập tức. Giống sửa nhà từng phòng: xong phòng nào ở được phòng đó. Nếu đội chỉ làm giai đoạn một rồi dừng mãi mãi, vẫn phải tốt hơn hôm nay.

Bốn ga trên đường ray. Giai đoạn một: tối ưu hoá ngữ cảnh cho agent. Cho AI thông tin tốt hơn. Không đụng workflow của ai. Giai đoạn hai: phát triển hướng đặc tả với kịch bản holdout. Đây là phần cốt lõi, spec vào, code đã kiểm chứng ra, người vẫn bấm duyệt. Giai đoạn ba: loại bỏ cổng kiểm soát của con người, từng dịch vụ một, dựa trên số liệu. Giai đoạn bốn: Dark Factory toàn phần, chủ yếu là cấu hình.

Và một ràng buộc để mọi người bớt lo: toàn bộ thiết kế không đụng đến pipeline deploy. Nó chỉ thay hai người: người gõ code và người nheo mắt đọc diff. Mọi thứ sau khi merge, build, deploy, rollout, y nguyên như bạn đang có. Ai lo "phải đập hết CI/CD" thì không phải.

---

### Slide 27 · Phase 1 · Context optimization

**Hiểu trước khi nói.** AGENTS.md là sổ tay cho nhân viên mới: trăm dòng mục lục, chi tiết để trong docs, cần thì tự đào. Build và test ở máy nó trước khi push. Và thông báo lỗi của linter viết như biển chỉ đường ("rẽ trái ở ngã tư sau") thay vì "sai đường". Đây là trụ Context, và là việc làm được ngay chiều nay.

**Đọc.** Giai đoạn một, và tôi muốn nhấn mạnh: đây là thứ ai trong phòng cũng làm được chiều nay, không cần xin phép ai. Nó không liên quan gì đến tự động hoá. Nó chỉ là cho AI thông tin tốt hơn, và tác giả nói lợi ích lớn nhất trên mỗi giờ bỏ ra nằm ở đây. Ba việc.

Việc một: tài liệu hiển thị thông tin luỹ tiến. Mỗi repo có một file AGENTS.md, khoảng một trăm dòng. Hãy nghĩ nó như sổ tay cho nhân viên mới: dịch vụ này làm gì, kiến trúc ra sao, các quy luật code chính, thư mục nào chứa gì. Nhìn ví dụ bên trái. Rồi một thư mục docs chứa tài liệu chi tiết về auth, testing, API, để agent truy xuất khi cần. Ý tưởng gọi là progressive disclosure, tiết lộ dần: agent đọc bản đồ trước, cần chi tiết về auth thì mới đào vào docs/auth.md. Bạn không ném cuốn wiki năm trăm trang cho người mới vào sáng đầu tiên, và cũng không nên làm thế với agent, vì như Hào nói, context là RAM. Tác giả viết file đầu tiên chiều thứ năm; sáng thứ sáu, PR do agent sinh trên repo đó khác rõ rệt. Ông dùng đúng chữ "không tinh tế, mà rõ rệt". Và lợi ích cộng dồn mãi, vì mọi lần AI chạm vào repo đó đều được hưởng.

Việc hai: quy tắc build-before-push. Ép agent phải tự chạy build và bộ test cục bộ trước khi push code. Hỏng thì sửa tại chỗ. Hết cảnh mở PR chỉ để xem CI đỏ, đẩy bản sửa, CI đỏ kiểu khác, lặp lại.

Việc ba, cái tôi thích nhất: linter hướng dẫn hành động. Nếu team có quy tắc kiến trúc, "service không được import từ controller", "mọi endpoint phải có annotation auth", thì đừng ghi vào wiki, hãy mã hoá thành linter. Nhưng mẹo thật sự nằm ở thông báo lỗi. Nhìn hai hộp. Hộp đỏ: "Service layer depends on controller layer." Đó là mô tả. Agent đọc xong loay hoay đoán. Hộp xanh: "Service import từ package controller. Service không được phụ thuộc controller. Hãy chuyển type dùng chung sang package model." Đó là chỉ dẫn. Với chỉ dẫn, agent sửa đúng ngay lần đầu, gần như mọi lần. Tác giả nói ông đã xem chuyện này lặp lại trên hàng chục PR và chênh lệch là rất lớn. Nghĩ như biển báo giao thông: "sai đường" không giúp gì, "rẽ trái ở ngã tư sau" mới giúp.

Ai đang dùng Claude Code: hook chạy sau mỗi lần sửa file, in thông báo ra stderr với exit code hai, và thông báo đó được đưa thẳng cho model. Tức là bạn viết được biển báo cho agent ngay hôm nay.

---

### Slide 28 · Phase 2 · Spec-driven development

**Hiểu trước khi nói.** Spec là bản yêu cầu. Yêu cầu tính năng thì nói cần gì; yêu cầu sửa lỗi thì chỉ tả triệu chứng, không gợi ý nguyên nhân, để AI tự điều tra thay vì tin một giả thuyết có thể sai.

**Đọc.** Giai đoạn hai là phần thật; tác giả nói mọi thứ khác chỉ là giàn giáo cho nó. Mục tiêu: kỹ sư viết một đặc tả, hệ thống tạo ra code chạy được, đã kiểm chứng, sẵn sàng merge. Bắt đầu từ đầu vào.

Đặc tả là một file Markdown có phần đầu YAML: repo đích, nhánh đích, loại. Hai loại. Bên trái, feature spec, mô tả yêu cầu và ràng buộc. Ví dụ: thêm endpoint validate SQL; yêu cầu kiểm cú pháp, từ chối câu không phải SELECT, phát hiện injection; ràng buộc là theo pattern controller có sẵn, test đầy đủ, không thêm dependency.

Bên phải, bug spec, và chỗ này tinh tế hơn vẻ ngoài của nó. Bug spec chỉ mô tả triệu chứng. Nó không nói "tôi nghĩ thiếu null check ở dòng bốn mươi bảy". Nó nói: gọi endpoint writeback với supplier rỗng thì bị 500, đáng lẽ phải trả 400 với lỗi validation nhắc đến supplier. Và dòng cuối in đậm: đừng giả định nguyên nhân gốc rễ, hãy điều tra codebase. Vì sao? Vì khi bạn viết "dòng bốn mươi bảy", bạn đã gieo cho agent một giả thuyết, và giả thuyết của bạn có thể sai. Để nó tự đi tìm, nó sẽ đọc, chạy test, tìm nguyên nhân thật. Nhớ slide rubber ducking của Hào: viết giả thuyết của mình ra trước là tốt cho người, nhưng đừng nhét giả thuyết đó vào đề bài của máy.

Vì spec là thứ duy nhất máy nhận, chất lượng spec quyết định chất lượng code. Đây là ý "kế hoạch trước, code sau" ở phần 7.1, đẩy đến tận cùng: kế hoạch không còn là thứ bạn duyệt, nó là thứ bạn viết, và là đầu vào duy nhất.

Câu hỏi tôi để lại trước slide sau: viết spec xong rồi, máy sinh code rồi, làm sao biết code đúng khi không ai đọc nó? Đó là slide quan trọng nhất của khối.

---

### Slide 29 · Phase 2 · Holdout scenarios, the core of the system

**Hiểu trước khi nói.** Hình ảnh thi cử. Agent là học sinh, spec là đề bài. Kịch bản holdout là bộ đề kiểm tra viết bằng tiếng Anh thường, cất trong tủ học sinh không được mở. Một AI khác làm giám khảo: đọc đề, tự nghĩ cách gọi API để thử trên một bản chạy tạm, rồi chấm đạt hay không. Bức tường là quy tắc "không được xem đề thi trước"; nếu xem, học sinh học thuộc đáp án thay vì học bài. Chấm ba lần lấy hai, chín mươi phần trăm số đề phải đạt. Đây là slide quan trọng nhất của khối.

**Đọc.** Nếu mọi người chỉ nhớ một slide của phần tôi, hãy nhớ slide này. Tôi kể bằng hình ảnh thi cử, vì nó chính xác là như vậy.

Bên trái là học sinh. Coding agent nhận đề bài, tức spec, làm bài, tức viết code, rồi nộp bài, tức mở PR. Nó chỉ có spec và repo. Bên phải là hội đồng chấm. Bộ đề kiểm tra gọi là holdout scenarios, kịch bản holdout. Đó là các bài kiểm thử chấp nhận viết bằng tiếng Anh tự nhiên theo định dạng BDD. Nhìn ví dụ: gửi câu SQL có DROP TABLE vào endpoint validate, thì kết quả phải là không hợp lệ, và lỗi phải nhắc đến câu lệnh bị cấm. Chỉ có vậy, không có code. Bộ đề này cất trong một thư mục cách ly mà agent viết code không thể truy cập.

Giám khảo là một hệ thống hoàn toàn riêng, một bộ đánh giá dùng LLM. Nó đọc kịch bản, dùng LLM lập kế hoạch cần gọi API nào để kiểm hành vi đó, thực thi các cuộc gọi trên một môi trường triển khai tạm thời, rồi hỏi LLM: các phản hồi có thoả kịch bản không. Vì LLM chấm mỗi lần hơi khác, mỗi kịch bản chạy ba lần, đạt hai trên ba mới tính là pass. Cổng tổng: chín mươi phần trăm số kịch bản phải pass thì PR mới đi tiếp.

Và bức tường ở giữa là quy tắc quan trọng nhất: học sinh không bao giờ được xem đề thi. Nếu agent trượt và được làm lại, nó nhận đúng một dòng: "SQL Injection Detection trượt, endpoint trả 500". Không có nội dung kịch bản. Vì sao khắt khe thế? Vì nếu cho xem đề, agent sẽ viết code để qua đúng bài đó, tức học thuộc đáp án thay vì học bài. Ai học machine learning sẽ nhận ra ngay: đây là tách tập train và tập test. Spec là tập train, kịch bản là tập test, và bức tường là thứ làm cho điểm số có nghĩa. Không có bức tường thì không có cổng chất lượng, chỉ có sân khấu kịch.

Nhớ slide mười tám của Hào không? Test sinh từ cùng nguồn với code thì không kiểm được code, vì cả hai đến từ cùng một sự hiểu sai. Kịch bản holdout chính là cách xây bài học đó thành kiến trúc: hai nguồn khác nhau, cách ly bằng quyền truy cập.

Một điểm cộng bất ngờ mà tác giả cho là quý ngay cả khi bỏ chuyện AI sang một bên. Ai từng dùng Cucumber? Test viết bằng tiếng Anh, nhưng bên dưới cần rất nhiều code dán keo, step definition, và code đó mục dần: đổi format một API response là bốn mươi step definition nổ. Tác giả đã ở ba team dùng Cucumber và cả ba đều chết chìm vì chuyện đó. Ở đây không có code dán keo. Giám khảo tự tìm cách thử mỗi lần; API đổi hình thì nó tự thích nghi. Bạn chỉ bảo trì văn bản tiếng Anh, và không gì khác.

---

### Slide 30 · Phase 2 · The human role → Phase 3 · Removing the human gate

**Hiểu trước khi nói.** Ở giai đoạn 2 người vẫn bấm duyệt, nhưng đọc bản báo cáo "bao nhiêu đề đạt" thay vì đọc code: năm phút thay vì hai tiếng. Giai đoạn 3 là tập lái: có người kèm đủ lâu và đủ điểm (ba con số) mới được tự lái. Kèm agent dọn nhà hằng tuần để code tự sinh không trôi về bừa bộn. Đây là trụ Ownership: quyền mở dần theo số liệu.

**Đọc.** Slide này trả lời hai câu: ở giai đoạn hai con người còn làm gì, và giai đoạn ba bỏ con người ra thế nào.

Giai đoạn hai chưa phải tự merge. Máy sinh code, chấm theo kịch bản, và xuất một bản báo cáo mức thoả mãn. Người nhìn báo cáo, có thể liếc diff, rồi bấm merge. Nhưng để ý cái đã đổi, và đây là thay đổi lớn nhất về nghề trong cả khối: người không còn đọc code từng dòng nữa. Người đọc kết quả. Kịch bản pass chưa? Tỷ lệ bao nhiêu? Cái nào trượt? Đó là việc năm phút thay vì hai tiếng. Một tải nhận thức hoàn toàn khác, và cũng là thứ khiến chuyện "chờ review tám tiếng" ở slide đầu biến mất.

Giai đoạn ba: loại bỏ cổng kiểm soát của con người. Tác giả nói sau đủ nhiều PR mà người chỉ đóng dấu, và ông cá là chuyện này đến nhanh hơn bạn đoán, bạn bắt đầu tháo bánh phụ. Nhưng không phải mọi nơi cùng lúc. Chọn một hai dịch vụ có bộ kịch bản tốt, và ba con số phải đúng trên hai mươi PR gần nhất. Tỷ lệ pass kịch bản trên chín mươi phần trăm. Tỷ lệ báo lỗi giả, tức kịch bản bảo đạt mà code thật ra hỏng, dưới năm phần trăm. Tỷ lệ con người ghi đè, tức người từ chối thứ kịch bản đã cho qua, dưới mười phần trăm. Nghĩ như tập lái xe: có người kèm đủ lâu, đủ điểm, mới được tự lái. Đạt cả ba thì thay đổi thật sự chỉ là một dòng cấu hình, từ "gắn nhãn chờ review" sang "merge". Và ai trong team vẫn chặn được PR trước khi cửa sổ merge đóng.

Ô cuối là Quality Maintenance Agents, agent bảo trì chất lượng, chạy ngầm hằng tuần. Chúng quét code trôi dạt, cập nhật tài liệu lỗi thời, tinh chỉnh các bất nhất trong mã nguồn tự sinh, và mở PR dọn dẹp nhỏ đi qua cùng cổng kịch bản như mọi PR khác. Vì sao cần? Vì code do AI sinh, nếu không ai dọn, tích luỹ những bất nhất nhỏ; không có gì thảm hoạ, chỉ trôi dần về bừa bộn. Coi nó như dọn nhà định kỳ.

Điểm tôi muốn mọi người nối về slide ba mươi lăm lát nữa: đây là "niềm tin phải kiếm được". Quyền của máy mở dần theo số liệu, không theo tuyên bố.

---

### Slide 31 · Phase 4 · Full dark factory

**Hiểu trước khi nói.** Giai đoạn 4 gần như chỉ là bật công tắc: tự merge ở mọi dịch vụ đủ điểm, ticket gắn nhãn bot:fix tự thành spec, và dựng bản giả lập cho các dịch vụ bên ngoài hay chập chờn để chấm bài rẻ và nhanh hơn.

**Đọc.** Giai đoạn bốn, và tác giả nói đến đây phần khó đã xong; đây là cấu hình, không phải kiến trúc.

Ba việc. Một, mở rộng tự động merge cho mọi dịch vụ đạt chỉ số, cùng ba con số ở slide trước, không ngoại lệ. Hai, đồng bộ với hệ thống quản lý task như Jira hay Trello: thẻ gắn nhãn bot fix tự động kích hoạt tạo spec và chảy qua pipeline. Tức là một ticket bug viết đủ triệu chứng có thể thành một PR đã kiểm chứng mà không ai chạm vào bàn phím. Thêm dashboard để nhìn cả dây chuyền.

Ba, mảnh hạ tầng mới duy nhất: Digital Twins, bản sao số, tức máy chủ ảo hay mock server giả lập các dịch vụ bên ngoài. Vì sao cần? Khi giám khảo chạy kịch bản trên môi trường tạm, nó gọi API thật của bên thứ ba, và những API đó hoặc chập chờn hoặc tốn tiền. Bản sao số giảm chi phí và độ trễ khi chạy kiểm thử. Chỉ xây khi cần, bắt đầu từ dịch vụ nào gây phiền nhất.

Trạng thái cuối: kỹ sư viết spec và kịch bản. Họ nghĩ về sản phẩm nên làm gì và làm sao biết nó làm đúng. Hệ thống làm phần còn lại. Deploy đi qua pipeline như trước giờ. Nhìn dòng cuối: không có gì sau merge thay đổi.

Có ai đang nghĩ "vậy kỹ sư còn làm gì"? Giữ câu hỏi đó, slide rủi ro sẽ nói.

---

### Slide 32 · 4 · Four-layer architecture

**Hiểu trước khi nói.** Bốn tầng nhà: tầng đầu vào là của người; tầng sinh code là máy; tầng chấm là máy nhưng cách ly; tầng merge và deploy dùng hạ tầng cũ. Điều duy nhất phải nhớ: giữa tầng sinh code và tầng chấm phải có tường, không thì agent có thể gian lận.

**Đọc.** Mục bốn: kiến trúc bốn lớp. Tác giả nói ranh giới giữa các lớp quan trọng hơn ruột của từng lớp, và tôi đồng ý, nên tôi sẽ đi nhanh qua ruột và dừng lâu ở ranh giới.

Lớp một, Inputs, con người sở hữu: đặc tả, kịch bản holdout, tài liệu AGENTS.md, luật linter. Đây là toàn bộ chỗ con người đặt ý chí của mình vào hệ thống. Để ý: bốn thứ này chính là Context và tiêu chí của Verification.

Lớp hai, Code Generation, tự động: agent đọc spec cộng ngữ cảnh repo, tự sinh mã, build, test tại chỗ, tự review và mở PR. Đây là vòng lặp ReAct của Hào, chạy không người.

Lớp ba, Validation, tự động và cách ly: chạy CI truyền thống trước, unit test, static analysis, rồi bộ đánh giá kịch bản chạy thử trên môi trường tạm thời.

Lớp bốn, Merge và Deploy, tự động cộng infra sẵn có: tự merge vào nhánh chính và kích hoạt pipeline CI/CD hiện có. Không có gì mới ở đây.

Giờ nhìn dải gạch chéo đỏ giữa lớp hai và lớp ba. Đây là lưu ý mà tác giả gọi là cực kỳ quan trọng, và là thứ duy nhất tôi cần mọi người nhớ từ slide này: lớp Code Generation và lớp Validation phải được cách ly hoàn toàn. Agent không thấy kịch bản. Bộ đánh giá không biết và không cần biết code được tạo ra sao. Nếu không cách ly, agent có thể gian lận hoặc học vẹt bộ đề thi, và khi đó bạn không có cổng chất lượng, bạn có diễn kịch. Với những ai dùng Claude Code, cách ly này cụ thể là hai phiên chạy với hai bộ quyền tool không giao nhau: phiên viết bị cấm đọc thư mục holdout, phiên chấm chỉ được đọc và gọi HTTP.

---

### Slide 33 · 5 · Risks and mitigations

**Hiểu trước khi nói.** Bốn rủi ro, mỗi cái một cách đỡ: giám khảo chấm sai (chấm ba lần, cổng 90%, người soát 50 PR đầu, CI cũ vẫn chạy); kỹ sư không muốn thôi viết code (đổi vai lên định nghĩa sản phẩm và kiểm soát chất lượng); tốn tiền API (giới hạn ba lần thử, cảnh báo token); đề kiểm tra lỗi thời (giám khảo tự thích nghi, agent bảo trì hằng tuần).

**Đọc.** Mục năm, và tôi thích tác giả vì có mục này. Ông nói ông không tin đề xuất nào bỏ qua phần "cái gì có thể hỏng". Bốn rủi ro, mỗi cái một cách giảm thiểu.

Một, bộ đánh giá duyệt nhầm code lỗi. Đây là rủi ro lớn nhất, vì LLM chấm phản hồi API theo kỳ vọng viết bằng tiếng Anh là chuyện xác suất, không phải tuyệt đối. Giảm thiểu bằng bốn lớp: chạy kịch bản ba lần lấy hai, duy trì cổng pass chín mươi phần trăm, kiểm toán thủ công năm mươi PR tự merge đầu tiên, và giữ nguyên bộ CI/CD truyền thống chạy sau merge như lưới cuối. Thứ gì lọt qua cả bốn lớp thì tác giả nói ông vừa ấn tượng vừa sợ.

Hai, kháng cự từ đội ngũ kỹ sư. Đây là rủi ro về con người, và tôi nghĩ nó thật hơn rủi ro kỹ thuật. Kỹ sư gắn bản sắc cá nhân với việc trực tiếp viết code. Câu "việc của bạn giờ là viết spec" nghe không dễ chịu. Hỏi thật: trong phòng này, ai thấy hơi khó chịu khi nghe câu đó? Giải pháp của tác giả là chuyển dịch vai trò, không phải bỏ vai trò: từ viết code sang định nghĩa sản phẩm và kiểm soát chất lượng, tức kỹ thuật sản phẩm cao cấp hơn. Và cách tiếp cận theo giai đoạn giúp: giai đoạn một không bắt ai đổi gì, đến giai đoạn hai họ đã thấy kết quả. Nhưng ông không giả vờ chuyện này dễ. Phải quản chủ động.

Ba, chi phí API tăng cao, chủ yếu vì thử lại. Giới hạn cứng tối đa ba lần thử lại cho mỗi bản đặc tả, và giám sát token kèm cảnh báo. Để so sánh: StrongDM báo khoảng một nghìn đô một ngày cho mỗi suất kỹ sư tương đương, vẫn rẻ hơn lương nhiều.

Bốn, kịch bản kiểm thử bị lỗi thời khi API đổi. Ít hơn bạn tưởng, vì không có code dán keo để mục; đánh giá bằng LLM tự thích ứng với cấu trúc API mới, kết hợp bảo trì hằng tuần bởi agent chuyên trách.

Và cái khung đỏ dưới cùng, tôi giữ lại từ một nguồn khác để nhắc một điều đúng ở mọi nấc: một agent có quyền ghi sai đã xoá một phẩy chín triệu dòng dữ liệu production. Không phải giả định. Agent không hiểu hệ quả, không dừng để hỏi, và có quyền làm. Người sở hữu sự cố vẫn là người: người cấp quyền, người không đặt giới hạn, người không có backup. Dù tự động đến đâu, Ownership không chuyển sang máy được. Đó là lý do slide sau nói về việc nhìn thấy agent đang làm gì.

---

### Slide 34 · If you can't observe your agent, you can't trust it.

**Hiểu trước khi nói.** Observability cho agent có ba lớp. Logging: ghi có cấu trúc từng hành động (request, tool, tham số, kết quả, exception) với trace id và timestamp; log do hệ thống ghi thì đáng tin, "báo cáo" do model viết thì không. Tracing: nối log thành đường thực thi, thứ tự bước và tool call, độ trễ từng bước; cho phép lần ngược từ hành động về suy luận. Audit trail: bản ghi chống sửa, kiểm soát truy cập, trả lời quyết định gì, đọc dữ liệu gì, ai duyệt; log để debug, audit để chịu trách nhiệm. Ba nhóm metric: vận hành (latency, token), tin cậy (tỷ lệ fail, tỷ lệ escalate), governance (chạm dữ liệu nhạy cảm, vi phạm policy). Stack mã nguồn mở: OpenTelemetry sinh log và trace, Jaeger xem trace, Prometheus gom metric, Grafana hiển thị; cùng stack team đã dùng cho service. Observability phải thiết kế từ đầu, không gắn sau sự cố.

**Nói đơn giản.** Muốn tin một agent tự chạy thì phải nhìn thấy nó đã làm gì: log từng hành động, nối thành đường đi, và một bản ghi không sửa được để truy trách nhiệm.

**Đọc.** Khối dark factory vừa để lại một câu hỏi rất thực tế: nếu agent tự chạy không ai xem, làm sao biết nó đã làm gì? Slide này là một dashboard, và câu trả lời có ba lớp.

Hàng trên là metric: latency, token mỗi lần chạy, và số lần agent phải escalate lên người, ba lần một ngày. Trong ba số, số escalate đáng xem nhất, vì nó nói thẳng agent đang ở nấc nào của thang: escalate nhiều là nấc ba, escalate về không là đang tiến đến nấc bốn.

Dòng log dưới đó là lớp một, logging: ghi có cấu trúc từng hành động của agent. Request đến, tool nó chọn, tham số, kết quả, exception nếu có, kèm trace id và timestamp. Điểm quan trọng: log do hệ thống ghi thì đáng tin. Báo cáo do model tự viết thì không, vì như Hào nói ở slide sáu, nó cũng chỉ là văn bản dự đoán. Nhớ cửa sổ "Done, all tests pass" ở slide mười lăm.

Waterfall ở giữa là lớp hai, tracing: nối các log rời thành một đường thực thi. Agent suy luận, đọc file, chạy test thấy hai fail, sửa file, chạy test lại không fail, rồi định npm install. Nhìn được thứ tự, độ trễ từng bước. Đây là thứ cho phép trả lời "vì sao nó xoá file đó" bằng cách lần ngược từ hành động về quan sát và suy luận trước đó, thay vì hỏi lại model và nhận một lời giải thích bịa sau sự việc.

Chuỗi khối dưới cùng là lớp ba, audit trail: bản ghi chống sửa, kiểm soát truy cập. Trả lời ba câu của trách nhiệm: quyết định gì đã được đưa ra, dữ liệu nào đã được đọc, có người duyệt hay không và là ai. Nhìn khối ba: edit được approved bởi nhân. Khối năm: install bị chặn vì không được duyệt. Log để debug; audit để chịu trách nhiệm; audit phải append-only, không ai kể cả agent xoá được.

Stack ở dòng cuối: OpenTelemetry, Jaeger, Prometheus, Grafana. Chính là stack team backend đã dùng cho service. Agent chỉ là một service nữa cần được quan sát; không cần mua gì mới. Nguyên tắc: observability là lớp thiết kế từ đầu, không phải monitoring gắn thêm sau sự cố. Nếu bạn không quan sát được hành vi của agent, bạn không thể tin nó.

---

### Slide 35 · Full autonomy doesn't remove humans, it changes their shape

**Hiểu trước khi nói.** Cú lật của cái kết. Earned trust: quyền của agent mở dần theo độ tin cậy đã chứng minh, read-only rồi write vào branch rồi staging rồi production; giới hạn blast radius mỗi agent bằng quyền tối thiểu và tách credential. DeepSeek Harness: harness là lớp bao quanh model (vòng lặp gọi tool, quản context, ghi log); harness mã nguồn mở này theo triết lý mọi thứ là plugin và có session log append-only, inspect được, mọi prompt, tool call, context, token. Nối về đầu buổi: earned trust là trụ Verification bằng cơ chế, audit trail là trụ Ownership bằng cơ chế. SOP hôm nay là bản thủ công của cùng kỷ luật; người viết guardrail phải hiểu SOP. Framing bắt buộc: review đổi hình, không phải hết cần review.

**Nói đơn giản.** Tự động hoàn toàn không bỏ con người, chỉ đổi việc của con người: từ đọc từng dòng sang đặt giới hạn quyền và đọc log. Ba trụ đầu buổi vẫn còn nguyên, chỉ chuyển từ làm tay sang làm bằng máy.

**Đọc.** Đây là cú lật của cái kết, và là chỗ tôi muốn nói chậm nhất.

Sau mười slide về dark factory, có thể ai đó đang nghĩ: vậy tương lai là không cần review, không cần SOP, học hôm nay làm gì. Câu trả lời: tự động hoàn toàn không bỏ con người ra khỏi hệ thống. Nó đổi hình con người. Review không mất; review đổi từ đọc từng PR sang thiết kế cổng và đọc log.

Cầu thang bên trái là earned trust, niềm tin phải kiếm được. Không ai giao production cho agent ngày đầu. Quyền mở dần theo độ tin cậy đã chứng minh. Bậc một, read-only: agent chỉ đọc và đề xuất. Bậc hai, write vào branch: agent tạo PR, người merge. Bậc ba, staging: agent deploy lên môi trường thử. Bậc bốn, production: agent deploy thật, có giới hạn, và nhìn hình người trên cùng, một người vẫn giữ cần gạt. Mỗi bậc là một giai đoạn quan sát: làm đúng đủ lâu thì mở bậc tiếp. Đây chính là ba con số của giai đoạn ba, chỉ khác là vẽ thành cầu thang. Và giới hạn blast radius của mỗi agent: quyền tối thiểu cho việc của nó, tách credential, không có quyền xoá hàng loạt nếu việc không cần. Đó là bài học một phẩy chín triệu dòng.

Bên phải là DeepSeek Harness, một harness agent mã nguồn mở. Harness là lớp bao quanh model: vòng lặp gọi tool, quản context, ghi log. Triết lý mọi thứ là plugin, kể cả vòng lặp agent, nên từng phần thay được và kiểm được riêng. Điểm cho bài này: session log append-only, inspect được. Mọi prompt, mọi tool call, mọi context đã nạp, mọi token. Không sửa được, không xoá được. Nhìn dãy khối: chỉ nối thêm, không bao giờ bớt.

Giờ nhìn lại đầu buổi, ba chấm C V O sáng cả ba. Earned trust là trụ Verification mã hoá thành cơ chế: không tin lời, chỉ tin hành vi đã quan sát. Audit trail là trụ Ownership mã hoá thành cơ chế: mọi hành động có người chịu trách nhiệm truy ra được. AGENTS.md là trụ Context mã hoá thành file. SOP mà Hào dạy hôm nay là bản thủ công của cùng một kỷ luật. Hôm nay bạn chạy checklist bằng tay. Ngày mai bạn viết checklist đó thành guardrail và cổng cho agent. Và người viết guardrail phải hiểu SOP, vì guardrail chính là SOP.

Kỷ luật scale lên. Nó không biến mất. Đó là câu tôi muốn mọi người mang về từ phần Dark Factory.

---

### Slide 36 · You are the one who signs.

**Nói đơn giản.** Kết: tốc độ AI cho không, chất lượng bạn phải tự giữ. Không giải thích được dòng nào thì dòng đó không được vào.

**Đọc.** Kết lại bằng ba câu.

Tốc độ là phần AI cho không. Chất lượng là phần bạn phải tự giữ. Và SOP, dù chạy bằng tay ở nấc hai hay mã hoá thành cổng ở nấc bốn, là cách giữ chất lượng mà không phải chậm lại.

Ai cần một câu ngắn hơn nữa để dán lên màn hình, thì đây, dòng cuối trên slide: nếu bạn không giải thích được dòng đó, nó không được vào. Đó là SOP ngắn nhất, và là bước một của mọi checklist hôm nay. Nhớ câu chuyện PR bốn trăm dòng ở đầu buổi: chỉ cần một câu hỏi đó là đủ dừng nó lại.

Cảm ơn mọi người. Hai chúng tôi nhận câu hỏi. Phần SOP thì Hào, phần Dark Factory thì tôi. Và câu hỏi tôi muốn nghe nhất: team bạn đang ở nấc mấy, và bước tiếp theo là gì?

---

