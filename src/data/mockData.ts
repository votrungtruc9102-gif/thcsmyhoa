import { SubjectMeta, Question, Lesson, SchoolAnnouncement, Exam, SubjectId, GradeLevel, TeacherDocument } from '../types';
import { OFFICIAL_TEXTBOOK_DOCUMENTS, OFFICIAL_TEXTBOOK_LESSONS } from './textbookData';

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'tin-hoc',
    name: 'Tin học',
    shortName: 'Tin',
    icon: 'Laptop',
    color: '#2684FF',
    bgGradient: 'from-blue-500 to-indigo-600',
    description: 'Khoa học máy tính, lập trình Scratch/Python, ứng dụng tin học và đạo đức số THCS.'
  },
  {
    id: 'toan',
    name: 'Toán học',
    shortName: 'Toán',
    icon: 'Calculator',
    color: '#FFB020',
    bgGradient: 'from-amber-500 to-orange-600',
    description: 'Số học, Đại số, Hình học trực quan và Thống kê xác suất theo chương trình mới.'
  },
  {
    id: 'van',
    name: 'Ngữ văn',
    shortName: 'Văn',
    icon: 'BookOpen',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500 to-indigo-600',
    description: 'Đọc hiểu văn bản, rèn luyện Tiếng Việt và kĩ năng viết văn nghị luận, biểu cảm.'
  },
  {
    id: 'tieng-anh',
    name: 'Tiếng Anh',
    shortName: 'Anh',
    icon: 'Languages',
    color: '#22C7E8',
    bgGradient: 'from-cyan-500 to-blue-600',
    description: 'Phát triển 4 kỹ năng Nghe - Nói - Đọc - Viết, ngữ pháp và từ vựng THCS.'
  },
  {
    id: 'khtn',
    name: 'Khoa học tự nhiên',
    shortName: 'KHTN',
    icon: 'Atom',
    color: '#22C55E',
    bgGradient: 'from-emerald-500 to-teal-600',
    description: 'Tích hợp Vật lý, Hóa học và Sinh học khám phá thế giới tự nhiên kỳ thú.'
  },
  {
    id: 'lich-su-dia-ly',
    name: 'Lịch sử và Địa lí',
    shortName: 'Sử - Địa',
    icon: 'Compass',
    color: '#EC4899',
    bgGradient: 'from-pink-500 to-rose-600',
    description: 'Tìm hiểu tiến trình lịch sử dân tộc, thế giới và đặc điểm địa lí tự nhiên, kinh tế - xã hội.'
  },
  {
    id: 'cong-nghe',
    name: 'Công nghệ',
    shortName: 'Công nghệ',
    icon: 'Wrench',
    color: '#F97316',
    bgGradient: 'from-orange-500 to-amber-600',
    description: 'Công nghệ đời sống, kĩ thuật điện, nông nghiệp công nghệ cao và thiết kế kĩ thuật.'
  },
  {
    id: 'gdcd',
    name: 'Giáo dục công dân',
    shortName: 'GDCD',
    icon: 'HeartHandshake',
    color: '#14B8A6',
    bgGradient: 'from-teal-500 to-emerald-600',
    description: 'Giáo dục đạo đức, kĩ năng sống, quyền và nghĩa vụ công dân Việt Nam.'
  },
  {
    id: 'nghe-thuat',
    name: 'Nghệ thuật',
    shortName: 'Nghệ thuật',
    icon: 'Palette',
    color: '#A855F7',
    bgGradient: 'from-purple-500 to-pink-600',
    description: 'Âm nhạc và Mĩ thuật: Phát triển năng lực thẩm mĩ, cảm thụ nghệ thuật và sáng tạo đa phương tiện.'
  },
  {
    id: 'giao-duc-the-chat',
    name: 'Giáo dục thể chất',
    shortName: 'Thể chất',
    icon: 'Activity',
    color: '#06B6D4',
    bgGradient: 'from-cyan-500 to-blue-600',
    description: 'Rèn luyện thể lực, kĩ năng vận động cơ bản, các môn bóng rổ, cầu lông, điền kinh và lối sống khỏe mạnh.'
  },
  {
    id: 'hoat-dong-trai-nghiem',
    name: 'Hoạt động trải nghiệm',
    shortName: 'HĐTN',
    icon: 'Sparkles',
    color: '#F59E0B',
    bgGradient: 'from-amber-500 to-orange-600',
    description: 'Rèn luyện bản thân, xây dựng tình bạn, phát triển kỹ năng xã hội và định hướng nghề nghiệp tương lai.'
  }
];

export const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Phát động phong trào "Tuần lễ Học tập số và Lập trình sáng tạo 2026–2027"',
    category: 'hoat_dong',
    date: '2026-10-25',
    priority: true,
    author: 'Ban Giám Hiệu Trường THCS Mỹ Hòa',
    content: 'Chào mừng năm học 2026–2027, nhà trường phát động tuần lễ thi đua giải đố Tin học & Toán học trực tuyến trên hệ thống trường. Học sinh đạt điểm xuất sắc sẽ được tuyên dương tại lễ chào cờ đầu tuần.'
  },
  {
    id: 'ann-2',
    title: 'Kế hoạch kiểm tra định kỳ học kỳ I môn Tin học và Khoa học tự nhiên',
    category: 'lich_thi',
    date: '2026-10-20',
    priority: false,
    author: 'Tổ Chuyên môn Tin học & KHTN',
    content: 'Các em học sinh các khối 6, 7, 8, 9 lưu ý tham gia làm các bài ôn tập trực tuyến trên cổng học tập trường trước ngày 15/11/2026 để chuẩn bị tốt cho đợt kiểm tra giữa kỳ.'
  },
  {
    id: 'ann-3',
    title: 'Tuyên dương 10 bạn học sinh xuất sắc hoàn thành xuất sắc thử thách Trí tuệ Mỹ Hòa',
    category: 'khen_thuong',
    date: '2026-10-18',
    priority: false,
    author: 'Đoàn Đội Trường THCS Mỹ Hòa',
    content: 'Chúc mừng các em học sinh lớp 6A1, 7A3, 8A2, 9A1 đã dẫn đầu bảng xếp hạng luyện thi tuần vừa qua với tỷ lệ trả lời đúng trên 95%!'
  }
];

export const OFFICIAL_TOPICS = [
  'Chủ đề 1: Máy tính và cộng đồng',
  'Chủ đề 2: Mạng máy tính và Internet',
  'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
  'Chủ đề 4: Ứng dụng tin học',
  'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính'
] as const;

export type OfficialTopic = typeof OFFICIAL_TOPICS[number];

export const INITIAL_LESSONS: Lesson[] = [
  // ==========================================
  // TIN HỌC LỚP 6: TRỌN BỘ 17 BÀI HỌC CHUẨN GDPT 2018
  // (Sách giáo khoa Kết nối tri thức với cuộc sống - THCS Mỹ Hòa)
  // ==========================================
  
  // --- CHỦ ĐỀ 1: MÁY TÍNH VÀ CỘNG ĐỒNG (HỌC KỲ 1) ---
  {
    id: 'tin6-b1',
    title: 'Bài 1: Thông tin và dữ liệu',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    summary: 'Phân biệt khái niệm thông tin, dữ liệu, vật mang tin và tầm quan trọng của thông tin trong học tập và đời sống.',
    keyPoints: [
      'Thông tin là những hiểu biết của con người về thế giới xung quanh và về chính bản thân mình.',
      'Dữ liệu là thông tin dưới dạng văn bản, chữ số, hình ảnh, âm thanh được ghi lại trên vật mang tin.',
      'Vật mang tin là phương tiện lưu giữ và truyền đạt dữ liệu (sách vở, thẻ nhớ, ổ đĩa, bảng thông báo).',
      'Thông tin có vai trò quyết định, giúp con người nhận thức đúng đắn và đưa ra các hành động hợp lý.'
    ],
    contentMarkdown: `### 1. Thông tin và dữ liệu
Mỗi ngày chúng ta tiếp nhận vô số điều từ thế giới xung quanh: tiếng còi xe, dự báo thời tiết, lời thầy cô giảng bài, dòng tin tức trên báo...
* **Thông tin (Information)**: Là sự hiểu biết có được sau khi tiếp nhận và xử lý dữ liệu. Ví dụ: Đọc bảng điểm và biết mình đạt điểm 10 môn Tin học.
* **Dữ liệu (Data)**: Là các con số, chữ viết, hình ảnh, ký hiệu hoặc âm thanh thô chưa qua phân tích được lưu trữ hoặc truyền đi. Ví dụ: Dòng chữ "Tin học: 10".
* **Vật mang tin**: Là phương tiện dùng để lưu giữ và truyền đạt dữ liệu như: trang vở, đĩa CD, thẻ nhớ USB, bảng thông báo trường THCS Mỹ Hòa.

### 2. Tầm quan trọng của thông tin
* Thông tin đem lại sự hiểu biết cho con người, định hướng hành vi và suy nghĩ.
* Giúp con người đưa ra các quyết định chính xác trong học tập, lao động và sinh hoạt thường nhật.
* **Ví dụ thực tế**: Thấy biển báo giao thông "Đoạn đường hay xảy ra tai nạn, đi chậm", người lái xe chủ động giảm tốc độ để đảm bảo an toàn.

> **💡 Em cần nhớ:**
> Dữ liệu là đầu vào, não bộ xử lý dữ liệu để tạo ra thông tin. Thông tin giúp ta hành động đúng đắn!`,
    sampleExercises: [
      {
        question: 'Tiếng còi của trọng tài vang lên kết thúc trận đấu bóng đá giữa lớp 6A1 và 6A2 là thông tin hay dữ liệu?',
        solution: 'Âm thanh tiếng còi truyền trong không khí là dữ liệu âm thanh. Khi các cầu thủ và khán giả nghe thấy và hiểu rằng thời gian thi đấu đã hết thì đó là thông tin.'
      }
    ],
    attachments: [
      { name: 'Tom_tat_Tin_hoc_6_Bai1_THCS_My_Hoa.pdf', fileType: 'pdf', size: '1.4 MB' },
      { name: 'So_do_tu_duy_Thong_tin_Du_lieu.pptx', fileType: 'pptx', size: '2.8 MB' }
    ]
  },
  {
    id: 'tin6-b2',
    title: 'Bài 2: Xử lí thông tin',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    summary: 'Nắm vững 4 hoạt động cơ bản của quá trình xử lí thông tin và vai trò của máy tính trong hoạt động thông tin.',
    keyPoints: [
      '4 hoạt động xử lý thông tin cơ bản: Thu nhận -> Lưu trữ -> Xử lí -> Truyền (trao đổi).',
      'Bộ não con người là trung tâm xử lý thông tin tinh vi nhất, tiếp nhận qua 5 giác quan.',
      'Máy tính hỗ trợ con người thực hiện cả 4 hoạt động thông tin với tốc độ cực nhanh và độ chuẩn xác cao.',
      'Máy tính gồm 4 khối chức năng: Thiết bị vào, Bộ nhớ, Bộ xử lý (CPU) và Thiết bị ra.'
    ],
    contentMarkdown: `### 1. Quá trình xử lí thông tin của con người
Mọi hoạt động tư duy và sinh hoạt của con người đều xoay quanh chu trình 4 bước:
1. **Thu nhận thông tin**: Nhờ các giác quan (mắt nhìn, tai nghe, mũi ngửi, lưỡi nếm, da cảm nhận).
2. **Lưu trữ thông tin**: Bộ não ghi nhớ hoặc ghi chép vào nhật ký, vẽ tranh, chụp ảnh.
3. **Xử lí thông tin**: Bộ não liên kết kiến thức đã có để suy luận, tính toán và đưa ra kết luận.
4. **Truyền / Trao đổi thông tin**: Nói chuyện, nhắn tin, gửi email, thuyết trình trước lớp.

### 2. Máy tính trong hoạt động xử lí thông tin
Máy tính được chế tạo mô phỏng quá trình xử lý thông tin của con người:
* **Thiết bị vào (Input)**: Bàn phím, chuột, micro, máy quét, camera -> thu nhận dữ liệu.
* **Bộ nhớ (Storage)**: RAM (tạm thời), ổ cứng SSD/HDD, thẻ nhớ USB -> lưu trữ dữ liệu.
* **Bộ xử lý trung tâm (CPU)**: Bộ não của máy tính, tính toán hàng tỷ phép tính mỗi giây -> xử lý dữ liệu.
* **Thiết bị ra (Output)**: Màn hình, máy in, loa -> truyền và hiển thị kết quả.

> **💡 Em cần nhớ:**
> Máy tính xử lý thông tin nhanh, chính xác và không biết mệt mỏi, nhưng không thể thay thế cảm xúc và tư duy đạo đức của con người.`,
    sampleExercises: [
      {
        question: 'Hãy chỉ ra 4 hoạt động xử lý thông tin khi em nghe thầy giáo đọc bài toán và viết lời giải vào vở kiểm tra?',
        solution: '1. Thu nhận: Tai nghe tiếng thầy đọc đề. 2. Xử lí: Não suy nghĩ tìm phương pháp giải. 3. Lưu trữ: Não ghi nhớ công thức và các bước. 4. Truyền: Tay cầm bút viết lời giải vào trang giấy để nộp cho thầy.'
      }
    ],
    attachments: [
      { name: 'Bai_giang_Dien_tu_Tin_6_Bai2.pptx', fileType: 'pptx', size: '3.6 MB' },
      { name: 'Phieu_hoc_tap_Xu_li_thong_tin.pdf', fileType: 'pdf', size: '850 KB' }
    ]
  },
  {
    id: 'tin6-b3',
    title: 'Bài 3: Thông tin trong máy tính',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    summary: 'Hiểu bản chất biểu diễn dữ liệu bằng dãy bit trong máy tính và các đơn vị đo dung lượng thông tin (Bit, Byte, KB, MB, GB, TB).',
    keyPoints: [
      'Máy tính chỉ xử lý và hiểu được dãy bit (gồm hai ký hiệu số 0 và 1).',
      'Bit (viết tắt của binary digit) là đơn vị nhỏ nhất để đo lượng thông tin trong máy tính.',
      'Mọi dạng dữ liệu (văn bản, hình ảnh, âm thanh) đều được mã hóa thành các dãy bit liên tiếp.',
      'Bảng đơn vị đo: 1 Byte = 8 Bit; 1 KB = 1024 B; 1 MB = 1024 KB; 1 GB = 1024 MB; 1 TB = 1024 GB.'
    ],
    contentMarkdown: `### 1. Biểu diễn thông tin trong máy tính
* Mạch điện tử trong máy tính chỉ có hai trạng thái vật lý: Có điện (được quy ước là số **1**) hoặc Không có điện (quy ước là số **0**).
* **Dãy bit**: Dãy các ký hiệu 0 và 1 liên tiếp dùng để đại diện cho một ký tự, một điểm ảnh hoặc một nốt nhạc.
* **Số hóa dữ liệu**: Quá trình chuyển đổi dữ liệu thực tế (chữ cái, bức ảnh, bài hát) thành dạng dãy bit để máy tính có thể lưu trữ và xử lý.

### 2. Các đơn vị đo lượng dữ liệu
Đơn vị cơ bản nhất là **bit** (ký hiệu: b), kết hợp 8 bit tạo thành **Byte** (ký hiệu: B).
Bảng quy chuẩn đơn vị (bội số của 1024 = 2^10):
* **Byte (B)** = 8 bit
* **Kilobyte (KB)** = 1 024 Byte (tương đương khoảng 1 trang văn bản)
* **Megabyte (MB)** = 1 024 KB (tương đương 1 bài hát MP3 chất lượng cao khoảng 3-5 MB)
* **Gigabyte (GB)** = 1 024 MB (tương đương 1 bộ phim HD hoặc thẻ nhớ điện thoại)
* **Terabyte (TB)** = 1 024 GB (dung lượng ổ cứng máy tính để bàn, máy chủ)

> **💡 Em cần nhớ:**
> Dãy bit là ngôn ngữ duy nhất của máy tính. Mỗi ký tự em gõ trên bàn phím đều được chuyển đổi thành một chuỗi bit gồm 0 và 1!`,
    sampleExercises: [
      {
        question: 'Một thẻ nhớ có dung lượng 16 GB có thể chứa được bao nhiêu bức ảnh chụp từ điện thoại, biết mỗi bức ảnh có dung lượng trung bình khoảng 4 MB?',
        solution: 'Đổi: 16 GB = 16 x 1024 MB = 16 384 MB. Số ảnh chứa được: 16 384 / 4 = 4 096 bức ảnh.'
      }
    ],
    attachments: [
      { name: 'Bang_quy_doi_don_vi_luu_tru_Tin6.pdf', fileType: 'pdf', size: '920 KB' }
    ]
  },

  // --- CHỦ ĐỀ 2: MẠNG MÁY TÍNH VÀ INTERNET (HỌC KỲ 1) ---
  {
    id: 'tin6-b4',
    title: 'Bài 4: Mạng máy tính',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    summary: 'Khái niệm mạng máy tính, các thành phần chính và phân loại mạng có dây, mạng không dây.',
    keyPoints: [
      'Mạng máy tính là tập hợp các máy tính và thiết bị được kết nối với nhau để truyền thông tin và chia sẻ tài nguyên.',
      '3 thành phần chính: Thiết bị đầu cuối, Thiết bị kết nối và Phần mềm mạng.',
      'Lợi ích: Chia sẻ dữ liệu nhanh chóng, dùng chung thiết bị đắt tiền (máy in, máy quét, ổ cứng mạng).',
      'Phân loại theo môi trường truyền dẫn: Mạng có dây (cáp mạng) và Mạng không dây (sóng vô tuyến Wi-Fi).'
    ],
    contentMarkdown: `### 1. Mạng máy tính là gì?
Trước khi có mạng máy tính, muốn sao chép tài liệu từ máy này sang máy khác phải dùng đĩa mềm hoặc thẻ nhớ USB rất bất tiện.
* **Khái niệm**: Mạng máy tính là một nhóm gồm từ hai máy tính hoặc thiết bị số trở lên, được liên kết vật lý hoặc sóng vô tuyến với nhau để trao đổi dữ liệu và chia sẻ tài nguyên.
* **Lợi ích**:
  - Chia sẻ tập tin (văn bản, bài giảng, hình ảnh) tức thời.
  - Dùng chung thiết bị ngoại vi (ví dụ phòng tin học THCS Mỹ Hòa có 40 máy tính cùng dùng chung 1 máy in).
  - Tiết kiệm chi phí đầu tư và tăng hiệu quả cộng tác.

### 2. Các thành phần của mạng máy tính
1. **Thiết bị đầu cuối (End Devices)**: Máy tính bàn (PC), máy tính xách tay (Laptop), điện thoại thông minh, máy in mạng.
2. **Thiết bị kết nối (Networking Devices)**:
   - Cáp mạng (cáp xoắn đôi, cáp quang) và Giắc cắm mạng RJ45.
   - Bộ chia cổng mạng (Switch) và Bộ định tuyến (Router).
   - Điểm truy cập không dây (Access Point / Bộ phát Wi-Fi).
3. **Phần mềm mạng**: Hệ điều hành mạng, trình điều khiển cạc mạng và các giao thức truyền thông.

> **💡 Em cần nhớ:**
> Mạng không dây tiện lợi, linh hoạt và thẩm mỹ nhưng mạng có dây cho tốc độ truyền dữ liệu ổn định và bảo mật cao hơn.`,
    sampleExercises: [
      {
        question: 'Tại phòng thực hành Tin học trường THCS Mỹ Hòa, có 1 máy in được nối vào mạng để tất cả học sinh in bài thu hoạch. Đây là ví dụ về lợi ích nào của mạng máy tính?',
        solution: 'Đây là ví dụ về lợi ích dùng chung phần cứng (chia sẻ thiết bị ngoại vi), giúp nhà trường tiết kiệm chi phí mua nhiều máy in.'
      }
    ],
    attachments: [
      { name: 'Mo_hinh_mang_phong_tin_hoc_THCS_My_Hoa.pdf', fileType: 'pdf', size: '2.1 MB' }
    ]
  },
  {
    id: 'tin6-b5',
    title: 'Bài 5: Internet',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    summary: 'Khám phá mạng toàn cầu Internet, các đặc trưng cốt lõi và những dịch vụ hữu ích phục vụ học tập, đời sống.',
    keyPoints: [
      'Internet là mạng liên kết hàng triệu mạng máy tính trên quy mô toàn thế giới.',
      'Đặc điểm: Phạm vi toàn cầu, không thuộc quyền sở hữu của bất kỳ cá nhân hay quốc gia nào.',
      'Các dịch vụ phổ biến: World Wide Web (tra cứu tin tức), Thư điện tử (Email), Hội nghị trực tuyến, Đào tạo từ xa.',
      'Cần có nhà cung cấp dịch vụ Internet (ISP) như VNPT, Viettel, FPT để kết nối máy tính vào mạng.'
    ],
    contentMarkdown: `### 1. Internet là gì?
Internet (Inter-network) ra đời từ cuối thế kỷ 20 và đã làm thay đổi hoàn toàn thế giới:
* Mạng máy tính khổng lồ kết nối hàng tỷ người dùng ở khắp năm châu.
* Được duy trì bởi các tổ chức quốc tế cùng thiết lập chuẩn giao thức chung (TCP/IP).
* Để vào được Internet, hộ gia đình hoặc nhà trường phải đăng ký qua Nhà cung cấp dịch vụ Internet (**ISP - Internet Service Provider**).

### 2. Lợi ích to lớn của Internet
* **Học tập và nghiên cứu**: Thư viện số, từ điển trực tuyến, khóa học online E-learning.
* **Giao tiếp và kết nối**: Gọi video, nhắn tin, mạng xã hội, diễn đàn học tập.
* **Giải trí**: Nghe nhạc, xem phim giáo dục, trò chơi trí tuệ.
* **Kinh tế - xã hội**: Mua sắm trực tuyến, ngân hàng số, dịch vụ công trực tuyến.

> **💡 Em cần nhớ:**
> Internet là kho tàng tri thức khổng lồ nhưng cũng chứa thông tin sai lệch, học sinh cần biết chọn lọc thông tin từ các nguồn chính thống!`,
    sampleExercises: [
      {
        question: 'Có người cho rằng Internet là của công ty Google hoặc của một quốc gia cụ thể. Nhận định đó đúng hay sai? Vì sao?',
        solution: 'Nhận định đó là SAI. Internet là mạng công cộng toàn cầu, không thuộc sở hữu của bất kỳ cá nhân, công ty hay quốc gia nào. Các công ty như Google chỉ cung cấp dịch vụ trên nền tảng Internet.'
      }
    ],
    attachments: [
      { name: 'Lich_su_phat_trien_Internet.pdf', fileType: 'pdf', size: '1.8 MB' }
    ]
  },

  // --- CHỦ ĐỀ 3: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN (HỌC KỲ 1) ---
  {
    id: 'tin6-b6',
    title: 'Bài 6: Mạng thông tin toàn cầu',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    summary: 'Tìm hiểu World Wide Web (WWW), trang web, website, địa chỉ website và cách sử dụng trình duyệt web.',
    keyPoints: [
      'World Wide Web (gọi tắt là Web hay WWW) là hệ thống thông tin liên kết toàn cầu trên nền tảng Internet.',
      'Website là tập hợp các trang web liên quan được tổ chức dưới một địa chỉ truy cập duy nhất (URL).',
      'Siêu văn bản (Hypertext) là văn bản tích hợp hình ảnh, âm thanh, video và chứa các siêu liên kết (Hyperlink).',
      'Trình duyệt web (Web Browser) là phần mềm giúp người dùng xem và tương tác với các trang web (Chrome, Edge, Cốc Cốc).'
    ],
    contentMarkdown: `### 1. World Wide Web và Website
* **Trang web (Web page)**: Là văn bản được tạo bằng ngôn ngữ đánh dấu, hiển thị trên màn hình qua trình duyệt.
* **Trang chủ (Home page)**: Là trang web đầu tiên xuất hiện khi em gõ địa chỉ của website.
* **Địa chỉ website (URL)**: Dòng định danh duy nhất của website trên Internet.
  - Ví dụ cổng trường: \`http://thcsmyhoa.edu.vn\`
  - Ký tự \`https://\` biểu thị giao thức truyền tải siêu văn bản an toàn mã hóa.
* **Siêu liên kết (Hyperlink)**: Đoạn chữ hoặc hình ảnh khi nhấp chuột vào sẽ tự động chuyển hướng tới một trang web khác.

### 2. Sử dụng trình duyệt web
* Các trình duyệt phổ biến: Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Cốc Cốc.
* Các nút điều hướng cơ bản:
  - Nút Mũi tên trái (Back): Quay lại trang web trước đó.
  - Nút Mũi tên phải (Forward): Đi tới trang kế tiếp.
  - Nút Tải lại (Reload / F5): Làm mới dữ liệu trang web.
  - Thanh địa chỉ: Nơi gõ tên miền hoặc từ khóa cần truy cập.

> **💡 Em cần nhớ:**
> Khi con trỏ chuột di chuyển vào siêu liên kết, con trỏ thường chuyển thành hình bàn tay chỉ ngón trỏ!`,
    sampleExercises: [
      {
        question: 'Phân biệt sự khác nhau giữa Internet và World Wide Web (Web)?',
        solution: 'Internet là hạ tầng mạng lưới vật lý kết nối các máy tính với nhau; còn World Wide Web là một dịch vụ thông tin chạy trên nền Internet, cho phép xem các trang web liên kết với nhau bằng siêu liên kết.'
      }
    ],
    attachments: [
      { name: 'Huong_dan_su_dung_trinh_duyet_web_an_toan.pdf', fileType: 'pdf', size: '1.1 MB' }
    ]
  },
  {
    id: 'tin6-b7',
    title: 'Bài 7: Tìm kiếm thông tin trên Internet',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    summary: 'Sử dụng máy tìm kiếm, xác định từ khóa hiệu quả và rèn luyện kĩ năng chọn lọc thông tin đáng tin cậy.',
    keyPoints: [
      'Máy tìm kiếm (Search Engine) là hệ thống phần mềm chuyên dụng hỗ trợ tìm kiếm thông tin trên mạng (Google, Bing).',
      'Từ khóa (Keyword) là từ hoặc cụm từ ngắn gọn thể hiện chính xác nội dung em muốn tìm.',
      'Sử dụng dấu ngoặc kép "" để tìm kiếm chính xác nguyên văn cụm từ.',
      'Biết cách đánh giá độ tin cậy của thông tin: Tác giả, cơ quan chủ quản, thời điểm xuất bản.'
    ],
    contentMarkdown: `### 1. Máy tìm kiếm và từ khóa
* Khi cần tra cứu tài liệu học tập, máy tìm kiếm giúp quét hàng triệu website chỉ trong một phần nghìn giây.
* **Cách lựa chọn từ khóa thông minh**:
  - Chọn từ ngữ cô đọng, tránh dùng câu dài dòng.
  - Ví dụ: Thay vì gõ *"Thầy cô cho em hỏi bài tập tin học lớp 6 trang 25 làm thế nào"*, em nên gõ: \`Tin học 6 trang 25\`.

### 2. Các mẹo tìm kiếm nâng cao
1. **Tìm cụm từ chính xác**: Đặt trong dấu ngoặc kép.
   - Ví dụ: \`"Trường THCS Mỹ Hòa"\` -> Kết quả trả về bắt buộc phải có đầy đủ cụm từ này theo đúng thứ tự.
2. **Tìm theo định dạng tệp**: Thêm cú pháp \`filetype:pdf\` hoặc \`filetype:pptx\`.
   - Ví dụ: \`Thuật toán lớp 6 filetype:pdf\`.
3. **Loại trừ từ không mong muốn**: Dùng dấu trừ \`-\`.
   - Ví dụ: \`Virus máy tính -covid\` -> Loại bỏ các bài viết về virus y tế Corona.

### 3. Đánh giá độ tin cậy của thông tin
* Ưu tiên các trang có tên miền giáo dục (\`.edu.vn\`), chính phủ (\`.gov.vn\`), các nhà xuất bản uy tín.
* Kiểm tra ngày đăng để đảm bảo thông tin không bị lỗi thời.
* Cảnh giác với những bài viết giật gân, thiếu nguồn gốc tác giả.`,
    sampleExercises: [
      {
        question: 'Em muốn tìm chính xác các bài viết về lịch sử hình thành trường THCS Mỹ Hòa, em nên nhập từ khóa tìm kiếm như thế nào vào Google?',
        solution: 'Em nên đặt cụm từ trong dấu ngoặc kép: "Lịch sử trường THCS Mỹ Hòa" hoặc "THCS Mỹ Hòa" lịch sử.'
      }
    ],
    attachments: [
      { name: 'Ky_nang_tra_cuu_Google_danh_cho_hoc_sinh.pdf', fileType: 'pdf', size: '1.5 MB' }
    ]
  },
  {
    id: 'tin6-b8',
    title: 'Bài 8: Thư điện tử',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    summary: 'Hiểu cấu trúc hòm thư điện tử (Email), cách gửi nhận thư đính kèm tệp và văn hóa giao tiếp số.',
    keyPoints: [
      'Thư điện tử (Electronic Mail - Email) là phương thức gửi và nhận thư qua mạng máy tính.',
      'Ưu điểm: Tốc độ tức thời, chi phí gần như miễn phí, có thể đính kèm tệp tin đa phương tiện và gửi cho nhiều người cùng lúc.',
      'Cấu trúc địa chỉ email chuẩn: <Tên người dùng>@<Tên miền nhà cung cấp> (Ví dụ: hocsinh.myhoa@gmail.com).',
      'Tuân thủ phép lịch sự số: Tiêu đề rõ ràng, lời chào mở đầu, nội dung súc tích và chữ ký cuối thư.'
    ],
    contentMarkdown: `### 1. Khái niệm và cấu trúc Email
* Thư truyền thống mất từ vài ngày đến hàng tuần qua đường bưu điện; trong khi email chỉ mất vài giây để truyền đến người nhận dù ở cách xa nửa vòng trái đất.
* **Cấu trúc địa chỉ**:
  \`\`\`
  thcsmyhoa.txbm@vinhlong.edu.vn
  |___________|   |______________|
    Tên hộp thư    Tên miền máy chủ email
  \`\`\`
  - Ký hiệu \`@\` (đọc là "a còng" / "at") là bắt buộc trong mọi địa chỉ thư điện tử.
  - Tên hộp thư viết liền không dấu, không chứa khoảng trắng.

### 2. Các trường trong giao diện soạn thư
* **Đến (To)**: Địa chỉ email của người nhận chính.
* **Chủ đề / Tiêu đề (Subject)**: Tóm tắt ngắn gọn mục đích bức thư (ví dụ: *Nộp bài tập Tin học 6 - Nguyễn Văn A 6A1*). Tuyệt đối không để trống tiêu đề.
* **Nội dung thư**: Soạn thảo lời chào, nội dung chi tiết và lời cảm ơn.
* **Đính kèm tệp (Biểu tượng kẹp ghim 📎)**: Chọn gửi kèm file văn bản Word, file trình chiếu PowerPoint, ảnh chụp bài làm.

### 3. Văn hóa ứng xử khi dùng Email
* Không viết hoa toàn bộ nội dung (trong văn hóa số, viết hoa toàn bộ tương đương với việc quát tháo).
* Không chia sẻ mật khẩu hòm thư cho bạn bè.
* Cảnh giác không bấm vào liên kết lạ hoặc mở tệp đính kèm từ người gửi không quen biết.`,
    sampleExercises: [
      {
        question: 'Trong các địa chỉ sau, địa chỉ nào là địa chỉ thư điện tử hợp lệ? A. thcs my hoa@gmail.com; B. hocsinh.myhoa@gmail.com; C. hocsinh@myhoa@edu.vn',
        solution: 'Địa chỉ B (hocsinh.myhoa@gmail.com) là hợp lệ. Địa chỉ A sai vì có dấu cách; địa chỉ C sai vì có 2 ký hiệu @.'
      }
    ],
    attachments: [
      { name: 'Cac_quy_tac_ung_xu_email_chuan_muc.pdf', fileType: 'pdf', size: '780 KB' }
    ]
  },

  // --- CHỦ ĐỀ 4: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HÓA TRONG MÔI TRƯỜNG SỐ (HỌC KỲ 1) ---
  {
    id: 'tin6-b9',
    title: 'Bài 9: An toàn thông tin trên Internet',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    summary: 'Nhận diện các mối nguy hại trên không gian mạng và rèn luyện kĩ năng tự bảo vệ thông tin cá nhân, phòng chống mã độc.',
    keyPoints: [
      'Thông tin cá nhân (họ tên, ngày sinh, địa chỉ nhà, số điện thoại, mật khẩu) cần được giữ kín tuyệt đối.',
      'Các rủi ro mạng phổ biến: Bị lộ thông tin riêng tư, lừa đảo trực tuyến, virus và phần mềm gián điệp, bắt nạt qua mạng.',
      'Quy tắc đặt mật khẩu an toàn: Tối thiểu 8 ký tự, kết hợp chữ hoa, chữ thường, chữ số và ký tự đặc biệt.',
      'Tôn trọng bản quyền tác giả: Không sao chép công sức của người khác khi chưa được phép.'
    ],
    contentMarkdown: `### 1. Tầm quan trọng của an toàn thông tin
Khi tham gia Internet, mỗi hành động của chúng ta đều để lại "dấu chân kỹ thuật số". Kẻ xấu có thể lợi dụng thông tin cá nhân để mạo danh, tống tiền hoặc lừa đảo người thân của em.
* **Các thông tin KHÔNG ĐƯỢC tùy tiện đăng tải lên mạng xã hội**:
  - Địa chỉ nhà riêng, số điện thoại cá nhân và của bố mẹ.
  - Vị trí hiện tại theo thời gian thực (check-in khi nhà không có người lớn).
  - Tên đăng nhập và mật khẩu tài khoản học tập, mạng xã hội.

### 2. Các biện pháp bảo vệ bản thân trên môi trường số
1. **Thiết lập mật khẩu mạnh**:
   - Mật khẩu yếu: \`123456\`, \`admin\`, \`nguyenvana\` (dễ bị đoán ra trong vài giây).
   - Mật khẩu mạnh: \`MyHoa@2026!#\`, \`TinHoc6#Kntt\`.
2. **Cảnh giác trước tin nhắn lạ**:
   - Không bấm vào các thông báo trúng thưởng điện thoại, xe máy giả mạo.
   - Luôn hỏi ý kiến cha mẹ, thầy cô khi gặp các tình huống đe dọa hoặc tin nhắn tống tiền trên mạng.
3. **Phòng chống mã độc (Malware, Virus)**:
   - Cài đặt phần mềm diệt virus bản quyền.
   - Thường xuyên sao lưu dữ liệu quan trọng ra ổ cứng ngoài hoặc Google Drive.

> **💡 Quy tắc 5 KHÔNG dành cho học sinh THCS Mỹ Hòa:**
> 1. Không kết bạn với người lạ không rõ danh tính.
> 2. Không chia sẻ mật khẩu cho bất kỳ ai.
> 3. Không mở tệp đính kèm lạ.
> 4. Không tin vào thông tin giật gân chưa kiểm chứng.
> 5. Không dùng lời lẽ thô tục, xúc phạm người khác trên mạng.`,
    sampleExercises: [
      {
        question: 'Khi nhận được tin nhắn từ một tài khoản lạ xưng là ban quản trị mạng yêu cầu em cung cấp mật khẩu tài khoản để nâng cấp miễn phí, em cần làm gì?',
        solution: 'Tuyệt đối không cung cấp mật khẩu. Báo ngay cho thầy cô hoặc cha mẹ biết vì các ban quản trị hệ thống chân chính không bao giờ hỏi mật khẩu của người dùng qua tin nhắn.'
      }
    ],
    attachments: [
      { name: 'Cam_nang_An_toan_khong_gian_mang_THCS.pdf', fileType: 'pdf', size: '2.5 MB' }
    ]
  },

  // --- CHỦ ĐỀ 5: ỨNG DỤNG TIN HỌC (HỌC KỲ 2) ---
  {
    id: 'tin6-b10',
    title: 'Bài 10: Sơ đồ tư duy',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 2,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    summary: 'Khái niệm sơ đồ tư duy (Mind Map), ưu điểm của phương pháp ghi nhớ thị giác và cách vẽ sơ đồ tư duy bằng phần mềm máy tính.',
    keyPoints: [
      'Sơ đồ tư duy là phương pháp ghi chép trực quan kết hợp từ khóa, hình vẽ, đường nối và màu sắc đa dạng.',
      'Cấu trúc gồm: Chủ đề chính ở trung tâm, các nhánh chính (ý lớn) tỏa ra xung quanh, và các nhánh phụ (chi tiết).',
      'Giúp kích thích cả hai bán cầu não, liên kết kiến thức logic và nhớ lâu hơn rất nhiều so với ghi chép văn bản thông thường.',
      'Có thể vẽ tay trên giấy hoặc dùng phần mềm máy tính như MindMup, Canva, XMind, GitMind.'
    ],
    contentMarkdown: `### 1. Sơ đồ tư duy là gì?
Sơ đồ tư duy (Mind Map) do chuyên gia Tony Buzan sáng tạo, mô phỏng cấu trúc tế bào thần kinh não bộ:
* **Chủ đề chính**: Đặt ở vị trí trung tâm trang giấy, thường vẽ hình minh họa nổi bật kèm màu sắc rực rỡ.
* **Nhánh chính**: Tỏa ra từ trung tâm, mang các từ khóa quan trọng thể hiện các luận điểm lớn.
* **Nhánh phụ / Nhánh con**: Mọc ra từ nhánh chính để bổ sung chi tiết, ví dụ cụ thể.

### 2. Các bước thiết kế sơ đồ tư duy
1. Xác định chủ đề trung tâm (Ví dụ: *Chương trình Tin học lớp 6*).
2. Vẽ các nhánh chính cấp 1 (Ví dụ: 6 Chủ đề từ Chủ đề 1 đến Chủ đề 6).
3. Thêm các nhánh phụ cấp 2, cấp 3 thể hiện các bài học và nội dung cốt lõi.
4. Chèn biểu tượng (icon), hình vẽ minh họa và tô màu khác biệt cho từng nhánh để dễ phân biệt.

### 3. Ưu thế khi vẽ sơ đồ tư duy bằng phần mềm máy tính
* Dễ dàng chỉnh sửa, di chuyển nhánh mà không phải tẩy xóa bẩn giấy.
* Tự động căn chỉnh bố cục gọn gàng, đẹp mắt.
* Chia sẻ tệp và xuất file dưới dạng ảnh (PNG, JPG) hoặc tài liệu PDF để in ấn nhanh chóng.`,
    sampleExercises: [
      {
        question: 'Hãy nêu các thành phần cơ bản của một sơ đồ tư duy tóm tắt bài học lịch sử?',
        solution: 'Thành phần gồm: 1. Ý trung tâm (Tên triều đại hoặc sự kiện lịch sử); 2. Các nhánh chính (Thời gian, Nguyên nhân, Diễn biến, Ý nghĩa); 3. Các nhánh phụ (Chi tiết từng trận đánh, nhân vật lịch sử tiêu biểu).'
      }
    ],
    attachments: [
      { name: 'Mau_So_do_tu_duy_cac_mon_hoc_lop_6.pdf', fileType: 'pdf', size: '3.2 MB' }
    ]
  },
  {
    id: 'tin6-b11',
    title: 'Bài 11: Định dạng văn bản',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 2,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    summary: 'Kỹ năng định dạng kí tự, định dạng đoạn văn bản chuẩn mực khoa học bằng phần mềm soạn thảo văn bản.',
    keyPoints: [
      'Định dạng văn bản giúp bài viết mạch lạc, đẹp mắt, nhấn mạnh trọng tâm và dễ đọc hiểu.',
      'Định dạng kí tự: Phông chữ (Font), Cỡ chữ (Size), Kiểu chữ (Đậm Bold, Nghiêng Italic, Gạch chân Underline) và Màu sắc (Color).',
      'Định dạng đoạn văn bản: Căn lề (Trái, Phải, Giữa, Đều 2 bên), Khoảng cách giãn dòng (Line Spacing), Thụt đầu dòng (First line indent).',
      'Quy tắc gõ chữ tiếng Việt chuẩn: Gõ từ ngữ trước, dấu sau theo bảng mã Unicode và kiểu gõ Telex / Vni.'
    ],
    contentMarkdown: `### 1. Định dạng kí tự
Thay đổi đặc điểm bề ngoài của các con chữ:
* **Phông chữ (Font)**: Nên dùng phông chữ chuẩn Unicode như \`Times New Roman\`, \`Arial\`, \`Calibri\`.
* **Cỡ chữ (Size)**: Tiêu đề bài thường cỡ 14-16 pt, nội dung chính cỡ 13-14 pt.
* **Các phím tắt nhanh**:
  - \`Ctrl + B\`: Bật / tắt chữ **đậm** (Bold).
  - \`Ctrl + I\`: Bật / tắt chữ *nghiêng* (Italic).
  - \`Ctrl + U\`: Bật / tắt chữ <u>gạch chân</u> (Underline).

### 2. Định dạng đoạn văn bản
* **Căn lề (Alignment)**:
  - Căn lề trái (\`Ctrl + L\`): Mặc định cho văn bản thông thường.
  - Căn giữa (\`Ctrl + E\`): Thường dùng cho tiêu đề, tên tác giả, thơ.
  - Căn lề phải (\`Ctrl + R\`): Dùng cho ngày tháng năm ở cuối đơn từ.
  - Căn đều hai bên (\`Ctrl + J\`): Giúp trang sách, bài báo thẳng tắp và chuyên nghiệp ở cả hai bên lề.
* **Khoảng cách dòng (Line Spacing)**: Thường thiết lập độ giãn dòng \`1.15\` hoặc \`1.5 lines\` để mắt không bị mỏi khi đọc.`,
    sampleExercises: [
      {
        question: 'Khi trình bày một bài thơ 4 câu trong Microsoft Word, em nên chọn kiểu căn lề nào để trang thơ trông cân đối và đẹp mắt nhất?',
        solution: 'Em nên chọn căn giữa (Center - Ctrl + E) để các dòng thơ được căn đều ở chính giữa trang giấy.'
      }
    ],
    attachments: [
      { name: 'Bang_tong_hop_phim_tat_Word_lop_6.pdf', fileType: 'pdf', size: '1.2 MB' }
    ]
  },
  {
    id: 'tin6-b12',
    title: 'Bài 12: Trình bày thông tin ở dạng bảng',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 2,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    summary: 'Cách tạo bảng (Table), chèn thêm, xóa bớt hàng cột, gộp tách ô và định dạng bảng biểu trực quan.',
    keyPoints: [
      'Bảng (Table) giúp thông tin được cô đọng, dễ so sánh, đối chiếu số liệu và tìm kiếm nhanh chóng.',
      'Cấu trúc bảng gồm các hàng (Row), cột (Column) và giao điểm giữa hàng với cột gọi là ô (Cell).',
      'Thao tác cơ bản: Chèn bảng (\`Insert -> Table\`), thêm/xóa hàng cột, gộp ô (\`Merge Cells\`), tách ô (\`Split Cells\`).',
      'Căn chỉnh nội dung trong ô (giữa ô, trên ô, dưới ô) và tô màu viền nền để làm nổi bật hàng tiêu đề.'
    ],
    contentMarkdown: `### 1. Lợi ích khi trình bày thông tin dạng bảng
So với đoạn văn bản miêu tả dài dòng, bảng biểu mang lại sự rõ ràng vượt trội:
* Giúp người xem nắm bắt ngay thông tin chỉ trong một cái nhìn.
* Ứng dụng quen thuộc: Thời khóa biểu trường THCS Mỹ Hòa, Danh sách xếp loại học lực, Bảng theo dõi trực nhật.

### 2. Các thao tác kỹ thuật với bảng
1. **Chèn bảng**: Vào dải lệnh \`Insert\` -> chọn \`Table\` -> kéo rê chuột để chọn số hàng và số cột mong muốn.
2. **Thêm / Xóa hàng cột**:
   - Nhấp chuột phải vào ô -> chọn \`Insert\` (chèn trên, dưới, trái, phải).
   - Chọn \`Delete Rows\` để xóa hàng hoặc \`Delete Columns\` để xóa cột.
3. **Gộp ô (Merge Cells)**: Bôi đen nhiều ô liền kề -> nhấp chuột phải chọn \`Merge Cells\` (thường dùng cho tiêu đề bảng).
4. **Trang trí bảng**:
   - Áp dụng các mẫu phong cách có sẵn trong \`Table Design\`.
   - Chọn màu nền (\`Shading\`) nổi bật cho hàng đầu tiên (Header Row).`,
    sampleExercises: [
      {
        question: 'Em cần tạo bảng Thời khóa biểu học tập gồm 5 buổi học (từ thứ Hai đến thứ Sáu) và mỗi buổi có 5 tiết học. Bảng cần bao nhiêu hàng và bao nhiêu cột?',
        solution: 'Bảng cần: 6 cột (1 cột ghi Tiết học + 5 cột thứ từ Thứ 2 đến Thứ 6) và 6 hàng (1 hàng tiêu đề các thứ + 5 hàng ghi 5 tiết học).'
      }
    ],
    attachments: [
      { name: 'Mau_Thoi_khoa_bieu_dep_lop_6.docx', fileType: 'docx', size: '650 KB' }
    ]
  },
  {
    id: 'tin6-b13',
    title: 'Bài 13: Thực hành: Tìm kiếm và thay thế',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 2,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    summary: 'Sử dụng công cụ Find & Replace để chỉnh sửa lỗi chính tả hàng loạt và chèn hình ảnh minh họa sinh động vào tài liệu.',
    keyPoints: [
      'Công cụ Tìm kiếm (Find - phím tắt Ctrl + F) giúp tìm nhanh một từ hoặc cụm từ bất kỳ trong văn bản dài hàng chục trang.',
      'Công cụ Thay thế (Replace - phím tắt Ctrl + H) giúp tự động sửa đổi hàng loạt từ sai chính tả chỉ bằng 1 cú nhấp chuột.',
      'Chèn hình ảnh minh họa (Insert Picture) làm tài liệu sống động, hấp dẫn và dễ hiểu hơn.',
      'Tùy chỉnh bố cục hình ảnh với văn bản (Wrap Text: In Line with Text, Square, Tight, Behind Text).'
    ],
    contentMarkdown: `### 1. Công cụ Tìm kiếm và Thay thế
* Khi gõ một bài thu hoạch dài, nếu em lỡ viết sai từ *"Trường THCS Mĩ Hòa"* thành *"Trường THCS Mỹ Hòa"*, việc đi tìm từng chữ để sửa bằng tay sẽ mất rất nhiều thời gian và dễ bỏ sót.
* **Cách thực hiện thay thế hàng loạt**:
  1. Nhấn tổ hợp phím \`Ctrl + H\` để mở hộp thoại *Find and Replace*.
  2. Tại ô **Find what**: Nhập từ cần tìm kiếm.
  3. Tại ô **Replace with**: Nhập từ mới chính xác cần thay thế vào.
  4. Nhấn nút **Replace All** để phần mềm tự động sửa tất cả các vị trí trong toàn bộ tài liệu.

### 2. Chèn và bố trí hình ảnh minh họa
* **Cách chèn ảnh**: Vào dải lệnh \`Insert\` -> chọn \`Pictures\` -> chọn ảnh từ máy tính.
* **Thay đổi kích thước**: Nhấp chuột vào ảnh, kéo rê các nốt tròn ở 4 góc để phóng to thu nhỏ mà không làm méo hình.
* **Tùy chọn Wrap Text (Bố cục ảnh với chữ)**:
  - \`In Line with Text\`: Coi ảnh như một ký tự văn bản.
  - \`Square\` / \`Tight\`: Chữ tự động uốn lượn ôm sát xung quanh khung hình chữ nhật của bức ảnh.
  - \`Behind Text\`: Đặt ảnh chìm dưới nền chữ (thường dùng làm hình nền mờ).`,
    sampleExercises: [
      {
        question: 'Phím tắt nào giúp mở nhanh tính năng Thay thế (Replace) trong Microsoft Word? Nhấn Replace khác gì so với Replace All?',
        solution: 'Phím tắt là Ctrl + H. Nút Replace chỉ thay thế từ ở vị trí con trỏ hiện tại; còn Replace All sẽ thay thế toàn bộ tất cả các từ trùng khớp trong toàn bộ tài liệu.'
      }
    ],
    attachments: [
      { name: 'Bai_thuc_hanh_chen_anh_va_thay_the.pdf', fileType: 'pdf', size: '1.7 MB' }
    ]
  },
  {
    id: 'tin6-b14',
    title: 'Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 2,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    summary: 'Dự án thực hành tích hợp: Thiết lập trang in, căn lề văn bản, chèn số trang tự động và hoàn thiện cuốn Sổ lưu niệm lớp 6.',
    keyPoints: [
      'Định dạng trang in (Page Setup): Căn lề giấy (Lề trên, dưới, trái, phải), hướng giấy (Dọc - Portrait hoặc Ngang - Landscape).',
      'Đánh số trang tự động (Page Number) và tạo tiêu đề đầu trang/chân trang (Header & Footer).',
      'Vận dụng tổng hợp: Soạn thảo văn bản, định dạng chữ, tạo bảng danh sách thành viên và chèn ảnh kỷ niệm lớp.',
      'Xuất bản tài liệu ra định dạng chuẩn PDF và quy trình in ấn thực tế.'
    ],
    contentMarkdown: `### 1. Mục tiêu dự án Sổ lưu niệm lớp 6
Cuối năm học lớp 6, học sinh vận dụng toàn bộ kiến thức soạn thảo đã học để tạo nên sản phẩm kỷ niệm ý nghĩa ghi lại hình ảnh thầy cô, bạn bè, lưu bút và ước mơ tuổi học trò.

### 2. Các bước kỹ thuật hoàn thiện sản phẩm
1. **Thiết lập trang in (Page Layout / Layout)**:
   - Hướng trang: Giấy dọc (\`Orientation -> Portrait\`).
   - Khổ giấy chuẩn: Khổ A4 (\`Size -> A4: 210 x 297 mm\`).
   - Căn lề chuẩn văn bản: Lề trên: 2 cm; Lề dưới: 2 cm; Lề trái: 3 cm (để đóng gáy sách); Lề phải: 1.5 cm.
2. **Tạo Header & Footer**:
   - Header: Ghi tên *"Trường THCS Mỹ Hòa - Sổ lưu niệm lớp 6A"*.
   - Footer: Chèn số trang tự động ở góc dưới cùng giữa trang.
3. **Trang trí trang bìa nghệ thuật**:
   - Dùng tính năng \`Page Borders\` tạo đường viền trang nhã cho trang đầu tiên.
   - Chèn WordArt tạo tiêu đề uốn lượn bắt mắt.
4. **Kiểm tra trước khi in (Print Preview)**:
   - Nhấn \`Ctrl + P\` xem trước bố cục để tránh lỗi tràn dòng hoặc trang trắng thừa.`,
    sampleExercises: [
      {
        question: 'Tại sao khi đóng gáy một cuốn sổ hoặc tập bài thu hoạch, người ta thường phải đặt lề bên trái rộng hơn các lề khác (khoảng 3cm)?',
        solution: 'Vì lề bên trái cần chừa một khoảng trống đủ rộng để dập ghim hoặc dán gáy sách, nếu căn lề quá hẹp thì phần chữ bên trong sẽ bị gáy sách che khuất không đọc được.'
      }
    ],
    attachments: [
      { name: 'Mau_So_luu_niem_hoc_sinh_lop_6_My_Hoa.docx', fileType: 'docx', size: '4.8 MB' }
    ]
  },

  // --- CHỦ ĐỀ 6: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH (HỌC KỲ 2) ---
  {
    id: 'tin6-b15',
    title: 'Bài 15: Thuật toán',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 2,
    chapter: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
    summary: 'Khái niệm thuật toán, các tính chất cơ bản và 2 phương pháp mô tả thuật toán: Liệt kê các bước và Sơ đồ khối.',
    keyPoints: [
      'Thuật toán (Algorithm) là một dãy các chỉ dẫn rõ ràng, tuần tự từng bước để từ đầu vào (Input) đạt được kết quả đầu ra (Output).',
      'Đặc trưng của thuật toán: Tính xác định (mỗi bước chỉ có 1 cách hiểu), Tính dừng (phải kết thúc sau số bước hữu hạn), Tính đúng đắn.',
      'Hai cách mô tả thuật toán: Liệt kê bằng ngôn ngữ tự nhiên và Dùng sơ đồ khối trực quan.',
      'Quy ước hình khối trong sơ đồ khối: Hình ôvan (Bắt đầu/Kết thúc), Hình chữ nhật (Thao tác tính toán), Hình thoi (Kiểm tra điều kiện), Hình bình hành (Nhập/Xuất).'
    ],
    contentMarkdown: `### 1. Thuật toán là gì?
Trong cuộc sống hàng ngày, chúng ta liên tục thực hiện các thuật toán mà không hề nhận ra: Cách pha một ấm trà, công thức làm bánh ngọt, các bước giải phương trình toán học...
* **Đầu vào (Input)**: Thông tin hoặc dữ liệu ban đầu đã biết.
* **Đầu ra (Output)**: Kết quả mong muốn nhận được sau khi thực hiện xong thuật toán.
* **Định nghĩa**: Thuật toán là dãy hữu hạn các bước chỉ dẫn chính xác, có trình tự logic rõ ràng để từ Input giải quyết trọn vẹn vấn đề thành Output.

### 2. Các quy ước chuẩn trong sơ đồ khối (Flowchart)
* **Hình ôvan (Oval)**: Đánh dấu điểm **BẮT ĐẦU** hoặc **KẾT THÚC** của thuật toán.
* **Hình bình hành**: Thao tác **NHẬP DỮ LIỆU** từ bàn phím hoặc **XUẤT KẾT QUẢ** ra màn hình.
* **Hình chữ nhật**: Các bước **TÍNH TOÁN**, gán giá trị hoặc thao tác xử lý cụ thể.
* **Hình thoi**: Điểm **KIỂM TRA ĐIỀU KIỆN** rẽ nhánh (chỉ có hai nhánh đi ra: Đúng hoặc Sai).
* **Mũi tên**: Chỉ hướng di chuyển của luồng thực thi dữ liệu.`,
    sampleExercises: [
      {
        question: 'Hãy xác định Input và Output của thuật toán: "Tìm số lớn nhất trong hai số a và b"?',
        solution: 'Input: Hai số thực a và b. Output: Giá trị lớn nhất (Max) trong hai số đó.'
      }
    ],
    attachments: [
      { name: 'Cac_mau_so_do_khoi_thuat_toan_co_ban.pdf', fileType: 'pdf', size: '1.6 MB' }
    ]
  },
  {
    id: 'tin6-b16',
    title: 'Bài 16: Các cấu trúc điều khiển',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 2,
    chapter: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
    summary: 'Nắm vững 3 cấu trúc điều khiển nền tảng của mọi chương trình máy tính: Tuần tự, Rẽ nhánh và Lặp.',
    keyPoints: [
      'Cấu trúc tuần tự (Sequence): Các lệnh được thực hiện lần lượt theo thứ tự viết từ trên xuống dưới.',
      'Cấu trúc rẽ nhánh (Selection): Thực hiện hành động dựa trên việc kiểm tra điều kiện đúng hay sai (Dạng thiếu: "Nếu... thì..."; Dạng đủ: "Nếu... thì... không thì...").',
      'Cấu trúc lặp (Loop): Lặp lại một nhóm thao tác nhiều lần cho đến khi thỏa mãn điều kiện dừng.',
      'Mọi thuật toán phức tạp trên thế giới đều được xây dựng từ sự kết hợp của 3 cấu trúc này.'
    ],
    contentMarkdown: `### 1. Cấu trúc tuần tự
* Là cấu trúc tự nhiên và đơn giản nhất.
* Máy tính thực hiện lệnh 1, sau khi hoàn thành mới chuyển sang lệnh 2, rồi đến lệnh 3... không bỏ qua hay nhảy cóc bước nào.

### 2. Cấu trúc rẽ nhánh
Cho phép chương trình đưa ra quyết định khác nhau tùy theo hoàn cảnh thực tế:
* **Dạng thiếu (Nếu... thì...)**:
  - *Ví dụ*: **Nếu** trời mưa **thì** em mang theo áo mưa khi đến trường.
* **Dạng đủ (Nếu... thì... nếu không thì...)**:
  - *Ví dụ*: **Nếu** điểm trung bình >= 8.0 **thì** xếp loại Giỏi, **nếu không thì** xếp loại Khá.

### 3. Cấu trúc lặp
Tiết kiệm thời gian và công sức khi phải lặp đi lặp lại một công việc:
* **Lặp với số lần biết trước**: Đếm từ 1 đến 10, chạy 3 vòng quanh sân thể dục.
* **Lặp với điều kiện dừng**: Vặn chặt ốc vít cho đến khi không vặn được nữa mới dừng; làm bài tập cho đến khi hiểu bài.`,
    sampleExercises: [
      {
        question: 'Câu nói: "Nếu đèn đỏ thì dừng lại, nếu đèn xanh thì được phép đi tiếp" mô tả cấu trúc điều khiển nào?',
        solution: 'Đây là cấu trúc rẽ nhánh dạng đủ (Nếu điều kiện đúng thì thực hiện hành động 1, nếu sai thì thực hiện hành động 2).'
      }
    ],
    attachments: [
      { name: 'Mo_hinh_3_cau_truc_dieu_khien_lap_trinh.pdf', fileType: 'pdf', size: '1.9 MB' }
    ]
  },
  {
    id: 'tin6-b17',
    title: 'Bài 17: Chương trình máy tính',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 2,
    chapter: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
    summary: 'Hiểu mối liên hệ giữa thuật toán và chương trình, làm quen ngôn ngữ lập trình trực quan Scratch để tạo trò chơi đầu tiên.',
    keyPoints: [
      'Chương trình máy tính là bản dịch của thuật toán sang ngôn ngữ lập trình để máy tính có thể hiểu và thực thi.',
      'Ngôn ngữ lập trình trực quan (Scratch) sử dụng các khối lệnh nhiều màu sắc ghép nối như trò chơi ghép hình Lego.',
      'Giao diện Scratch gồm: Sân khấu (Stage), Nhân vật (Sprite), Khu vực khối lệnh (Blocks Palette) và Vùng lắp ráp kịch bản (Script Area).',
      'Thực hành lập trình điều khiển nhân vật di chuyển, đổi màu áo, phát âm thanh và tương tác phím bấm.'
    ],
    contentMarkdown: `### 1. Thuật toán và chương trình máy tính
* Máy tính không thể trực tiếp hiểu được tiếng Việt hay tiếng Anh. Để máy tính thực thi được thuật toán, con người phải viết lại các bước bằng **ngôn ngữ lập trình** (Programming Language).
* **Chương trình máy tính (Computer Program)**: Là tập hợp các chỉ dẫn được viết bằng một ngôn ngữ lập trình cụ thể để điều khiển máy tính giải quyết nhiệm vụ.

### 2. Làm quen với môi trường Scratch
Scratch là ngôn ngữ lập trình trực quan nổi tiếng do Viện Công nghệ Massachusetts (MIT) phát triển cho học sinh:
* **Nhân vật (Sprite)**: Chú mèo Scratch hoặc các nhân vật người, bóng, xe cộ do em vẽ hoặc chọn từ thư viện.
* **Sân khấu (Stage)**: Không gian hiển thị nơi nhân vật biểu diễn hành động (tọa độ x từ -240 đến 240, tọa độ y từ -180 đến 180).
* **Các nhóm khối lệnh chính**:
  - \`Motion (Chuyển động - Xanh dương)\`: Di chuyển, xoay góc, đi tới tọa độ (x, y).
  - \`Looks (Ngoại hình - Tím)\`: Đổi trang phục, đổi kích thước, nói lời thoại.
  - \`Sound (Âm thanh - Hồng tím)\`: Phát tiếng kêu meo meo, nốt nhạc.
  - \`Events (Sự kiện - Vàng)\`: "Khi bấm vào lá cờ xanh", "Khi bấm phím cách".
  - \`Control (Điều khiển - Cam)\`: Lặp lại 10 lần, liên tục (forever), nếu... thì...

### 3. Dự án: Lập trình chú mèo di chuyển theo bàn phím
1. Kéo khối sự kiện: \`Khi bấm vào lá cờ xanh\`.
2. Gắn khối điều khiển: \`Liên tục\`.
3. Bên trong khối liên tục, lồng khối rẽ nhánh: \`Nếu phím Mũi tên phải được bấm thì: Đổi hướng 90 độ, Di chuyển 10 bước, Sang trang phục kế tiếp\`.
4. Nhấn lá cờ xanh trên sân khấu để thưởng thức trò chơi đầu tay của em!`,
    sampleExercises: [
      {
        question: 'Trong môi trường lập trình Scratch, khối lệnh "Khi bấm vào lá cờ xanh" (When green flag clicked) thuộc nhóm lệnh nào và giữ vai trò gì?',
        solution: 'Khối lệnh này thuộc nhóm Lệnh Sự kiện (Events), giữ vai trò kích hoạt khởi động bắt đầu chương trình khi người chơi bấm nút lá cờ xanh.'
      }
    ],
    attachments: [
      { name: 'Huong_dan_lap_trinh_Scratch_co_ban_lop_6.pdf', fileType: 'pdf', size: '3.8 MB' },
      { name: 'Du_an_Mau_Tro_choi_Chu_Meo_Bat_Ca.sb3', fileType: 'pptx', size: '2.2 MB' }
    ]
  },
  // Tin học Lớp 7
  {
    id: 'tin7-b1',
    title: 'Bài 1: Thiết bị vào - ra và an toàn dữ liệu',
    subjectId: 'tin-hoc',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    summary: 'Phân loại các thiết bị vào ra hiện đại và nguyên tắc bảo vệ dữ liệu cá nhân trên môi trường mạng.',
    keyPoints: [
      'Thiết bị vào ra thế hệ mới: màn hình cảm ứng, bút số, máy in 3D.',
      'Sao lưu dữ liệu (Backup) định kỳ tránh mất mát do hỏng phần cứng hoặc virus.',
      'Đặt mật khẩu mạnh, không chia sẻ thông tin cá nhân với người lạ trên Internet.'
    ],
    contentMarkdown: `### 1. Thiết bị vào - ra thế hệ mới
Màn hình cảm ứng (Touchscreen) vừa là thiết bị vào (khi chạm tay nhập lệnh) vừa là thiết bị ra (khi hiển thị hình ảnh).
### 2. An toàn dữ liệu
* Luôn cập nhật phần mềm diệt virus.
* Sao lưu tài liệu học tập lên Google Drive hoặc USB dự phòng.`
  },
  // Tin học Lớp 8
  {
    id: 'tin8-b1',
    title: 'Bài 1: Lịch sử phát triển máy tính điện tử',
    subjectId: 'tin-hoc',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    summary: 'Năm thế hệ máy tính điện tử từ đèn điện tử chân không đến vi mạch tích hợp siêu lớn và trí tuệ nhân tạo.',
    keyPoints: [
      'Thế hệ 1: Đèn điện tử chân không (ENIAC).',
      'Thế hệ 2: Bóng bán dẫn (Transistor).',
      'Thế hệ 3: Mạch tích hợp (IC).',
      'Thế hệ 4: Vi xử lý VLSI (Microprocessor).',
      'Thế hệ 5: Trí tuệ nhân tạo (AI) và máy tính lượng tử.'
    ],
    contentMarkdown: `Máy tính đã trải qua quá trình thu nhỏ kích thước từ những căn phòng hàng chục tấn xuống các thiết bị cầm tay nhỏ gọn như điện thoại thông minh ngày nay.`
  },
  // Tin học Lớp 9
  {
    id: 'tin9-b1',
    title: 'Bài 1: Nhận thức về thế giới số và Trí tuệ nhân tạo (AI)',
    subjectId: 'tin-hoc',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    summary: 'Khám phá cuộc cách mạng công nghiệp 4.0, ứng dụng của AI và trách nhiệm công dân số.',
    keyPoints: [
      'Trí tuệ nhân tạo (AI) là khả năng của máy tính thực hiện các công việc đòi hỏi trí thông minh con người.',
      'Ứng dụng AI: nhận diện giọng nói, xe tự lái, dịch thuật, chẩn đoán y tế.',
      'Sử dụng công nghệ có trách nhiệm: tôn trọng bản quyền, bảo vệ quyền riêng tư số.'
    ],
    contentMarkdown: `Học sinh THCS Mỹ Hòa tự hào là thế hệ công dân số tương lai, cần trang bị tư duy phản biện và kĩ năng an toàn trên không gian mạng.`
  },
  // Toán học Lớp 6
  {
    id: 'toan6-b1',
    title: 'Bài 1: Tập hợp các số tự nhiên. Ghi số tự nhiên',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    summary: 'Làm quen với tập hợp N, N*, cách viết tập hợp bằng liệt kê phần tử hoặc nêu dấu hiệu đặc trưng.',
    keyPoints: [
      'Tập hợp số tự nhiên ký hiệu là N = {0; 1; 2; 3; ...}',
      'Tập hợp các số tự nhiên khác 0 ký hiệu là N* = {1; 2; 3; ...}',
      'Các phần tử trong tập hợp cách nhau bằng dấu chấm phẩy (;).'
    ],
    contentMarkdown: `### 1. Khái niệm tập hợp
Tập hợp là một khái niệm cơ bản của toán học. Ví dụ: Tập hợp các học sinh lớp 6A trường THCS Mỹ Hòa, tập hợp các ngón tay trên một bàn tay.
### 2. Cách cho một tập hợp
- Cách 1: Liệt kê các phần tử. Ví dụ: A = {1; 2; 3; 4; 5}.
- Cách 2: Nêu dấu hiệu đặc trưng cho các phần tử của tập hợp.`
  },
  // Tiếng Anh Lớp 6
  {
    id: 'eng6-b1',
    title: 'Unit 1: My New School - Vocabulary & Grammar',
    subjectId: 'tieng-anh',
    grade: 6,
    semester: 1,
    chapter: 'Unit 1: My New School',
    summary: 'School items, subjects, Present Simple tense and expressions used in secondary school life.',
    keyPoints: [
      'School things: compass, calculator, pencil sharpener, textbook, uniform.',
      'Present Simple tense: S + V(s/es) for regular habits and school timetables.',
      'Adverbs of frequency: always, usually, often, sometimes, never.'
    ],
    contentMarkdown: `### Grammar: The Present Simple Tense
- Affirmative: I/You/We/They + V (base form). He/She/It + V-s/es.
- Example: We study at My Hoa Secondary School every morning.
- Negative: S + don't / doesn't + V.`
  },
  // Khoa học tự nhiên Lớp 6
  {
    id: 'khtn6-b1',
    title: 'Bài 1: Giới thiệu về Khoa học tự nhiên và Kính lúp, Kính hiển vi',
    subjectId: 'khtn',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Mở đầu về KHTN',
    summary: 'Phương pháp học tập KHTN, quy tắc an toàn trong phòng thực hành và cách sử dụng kính lúp, kính hiển vi quang học.',
    keyPoints: [
      'KHTN nghiên cứu các hiện tượng tự nhiên, tính chất và quy luật biến đổi của các chất, năng lượng và sự sống.',
      'Kính lúp dùng để quan sát các vật thể nhỏ có kích thước từ vài mm đến dưới 1mm.',
      'Kính hiển vi quang học có độ phóng đại từ 40 đến 1000 lần, dùng quan sát tế bào sinh vật.'
    ],
    contentMarkdown: `Khoa học tự nhiên giúp học sinh giải thích các hiện tượng kỳ thú xung quanh ta: vì sao có mưa, tại sao cây cối có màu xanh, và làm thế nào để bảo vệ nguồn nước sạch tại Mỹ Hòa.`
  },
  // All synchronized lessons extracted from official textbooks across subjects and grades
  ...OFFICIAL_TEXTBOOK_LESSONS
];

export const INITIAL_QUESTIONS: Question[] = [
  // Tin học 6
  {
    id: 'tin6-q1',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'nhan_biet',
    content: 'Thiết bị nào sau đây là thiết bị vào (Input) của máy tính?',
    options: ['Màn hình', 'Bàn phím (Keyboard)', 'Loa máy tính', 'Máy in laser'],
    correctAnswerIndex: 1,
    explanation: 'Bàn phím giúp người dùng nhập văn bản, ký tự và câu lệnh vào máy tính nên là thiết bị vào. Màn hình, loa và máy in là thiết bị ra.',
    tags: ['phần cứng', 'thiết bị vào ra'],
    createdDate: '2026-10-01',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q2',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'thong_hieu',
    content: 'Khi em nhìn thấy biển báo cấm rẽ trái trên đường giao thông, điều gì sau đây chính là thông tin mà em tiếp nhận được?',
    options: [
      'Màu sơn đỏ và vạch kẻ trắng trên biển báo',
      'Tấm kim loại hình tròn cắm ở góc phố',
      'Biết được rằng phương tiện không được phép rẽ vào con đường phía bên trái',
      'Độ cao của cột sắt cắm biển báo'
    ],
    correctAnswerIndex: 2,
    explanation: 'Hình vẽ và màu sắc là dữ liệu (vật mang tin là biển báo kim loại). Sự hiểu biết "không được phép rẽ trái" nảy sinh trong tâm trí chính là thông tin.',
    tags: ['thông tin', 'dữ liệu'],
    createdDate: '2026-10-02',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q3',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'nhan_biet',
    content: 'Bộ phận nào được coi là "bộ não" thực hiện tính toán và điều khiển hoạt động của máy tính?',
    options: ['Bộ xử lý trung tâm (CPU)', 'Ổ cứng SSD', 'Thanh nhớ RAM', 'Bộ nguồn điện'],
    correctAnswerIndex: 0,
    explanation: 'CPU (Central Processing Unit) là bộ xử lý trung tâm, có vai trò điều khiển và xử lý toàn bộ dữ liệu của máy tính.',
    tags: ['CPU', 'phần cứng'],
    createdDate: '2026-10-03',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q4',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'van_dung',
    content: 'Bạn Minh muốn gửi một bức ảnh chụp kỷ yếu lớp 6A trường THCS Mỹ Hòa cho bạn Nam đang ở xa. Minh nên sử dụng dịch vụ Internet nào là phù hợp và nhanh chóng nhất?',
    options: [
      'Gửi thư qua bưu điện truyền thống',
      'Gửi qua thư điện tử (Email) hoặc ứng dụng nhắn tin học đường',
      'Lưu vào đĩa mềm rồi cất giữ',
      'Đợi đến khi gặp mặt trực tiếp mới cho xem'
    ],
    correctAnswerIndex: 1,
    explanation: 'Thư điện tử hoặc ứng dụng nhắn tin qua mạng Internet cho phép gửi dữ liệu hình ảnh kỹ thuật số gần như tức thì với khoảng cách xa.',
    tags: ['Internet', 'trao đổi thông tin'],
    createdDate: '2026-10-04',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q5',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    difficulty: 'nhan_biet',
    content: 'Mạng máy tính là gì?',
    options: [
      'Nhiều máy tính để cùng một phòng học',
      'Tập hợp các máy tính được kết nối với nhau để truyền thông tin và chia sẻ tài nguyên',
      'Một chiếc máy tính cấu hình cực mạnh',
      'Màn hình kết nối với cây máy tính'
    ],
    correctAnswerIndex: 1,
    explanation: 'Mạng máy tính gồm các máy tính và thiết bị được kết nối với nhau thông qua dây cáp hoặc sóng vô tuyến để trao đổi dữ liệu và chia sẻ tài nguyên (như máy in, tệp tin).',
    tags: ['mạng máy tính'],
    createdDate: '2026-10-05',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q6',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    difficulty: 'thong_hieu',
    content: 'Đâu là một ví dụ về từ khóa tìm kiếm hiệu quả khi em muốn tìm "Đề cương ôn tập Tin học 6 học kỳ 1 trường THCS Mỹ Hòa"?',
    options: [
      '"ơi google tìm cho em bài tin học lớp 6 với nha"',
      '"Đề cương Tin học 6 học kỳ 1 THCS Mỹ Hòa"',
      '"Bài tập trường"',
      '"Tìm kiếm thông tin"'
    ],
    correctAnswerIndex: 1,
    explanation: 'Từ khóa tìm kiếm nên ngắn gọn, chứa các danh từ chính, lớp học, học kỳ và tên trường để công cụ tìm kiếm lọc kết quả chính xác nhất.',
    tags: ['tìm kiếm', 'từ khóa'],
    createdDate: '2026-10-06',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  // Tin học 7
  {
    id: 'tin7-q1',
    subjectId: 'tin-hoc',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'nhan_biet',
    content: 'Thiết bị nào sau đây vừa là thiết bị vào vừa là thiết bị ra?',
    options: ['Màn hình cảm ứng (Touchscreen)', 'Bàn phím cơ', 'Chuột quang', 'Tai nghe chụp tai'],
    correctAnswerIndex: 0,
    explanation: 'Màn hình cảm ứng nhận thao tác chạm của ngón tay (vào) và đồng thời hiển thị hình ảnh phản hồi (ra).',
    tags: ['thiết bị vào ra'],
    createdDate: '2026-10-07',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin7-q2',
    subjectId: 'tin-hoc',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    difficulty: 'thong_hieu',
    content: 'Trong phần mềm bảng tính điện tử (như Excel/Google Sheets), công thức nào sau đây dùng để tính tổng các ô từ A1 đến A5?',
    options: ['=SUM(A1:A5)', '=AVERAGE(A1:A5)', '=COUNT(A1:A5)', '=MAX(A1:A5)'],
    correctAnswerIndex: 0,
    explanation: 'Hàm SUM(A1:A5) dùng để tính tổng các giá trị số trong dải ô từ A1 đến A5.',
    tags: ['bảng tính', 'hàm SUM'],
    createdDate: '2026-10-08',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  // Tin học 8
  {
    id: 'tin8-q1',
    subjectId: 'tin-hoc',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'nhan_biet',
    content: 'Máy tính điện tử thế hệ thứ nhất sử dụng linh kiện điện tử cơ bản nào?',
    options: ['Đèn điện tử chân không', 'Bóng bán dẫn', 'Mạch tích hợp (IC)', 'Bộ vi xử lý siêu lớn'],
    correctAnswerIndex: 0,
    explanation: 'Thế hệ thứ nhất (những năm 1940-1950) dùng đèn điện tử chân không, kích thước rất to lớn và tiêu thụ nhiều điện năng.',
    tags: ['lịch sử máy tính'],
    createdDate: '2026-10-09',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin8-q2',
    subjectId: 'tin-hoc',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
    difficulty: 'thong_hieu',
    content: 'Trong thuật toán tìm kiếm tuần tự (Sequential Search), trường hợp nào thuật toán sẽ dừng lại ngay ở bước đầu tiên?',
    options: [
      'Phần tử cần tìm nằm ở vị trí đầu tiên của danh sách',
      'Phần tử cần tìm nằm ở vị trí cuối cùng',
      'Danh sách không chứa phần tử cần tìm',
      'Danh sách đã được sắp xếp giảm dần'
    ],
    correctAnswerIndex: 0,
    explanation: 'Tìm kiếm tuần tự duyệt từ phần tử đầu tiên, do đó nếu phần tử đầu tiên trùng với giá trị cần tìm thì thuật toán lập tức tìm thấy và kết thúc.',
    tags: ['thuật toán', 'tìm kiếm tuần tự'],
    createdDate: '2026-10-10',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  // Tin học 9
  {
    id: 'tin9-q1',
    subjectId: 'tin-hoc',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    difficulty: 'nhan_biet',
    content: 'Trí tuệ nhân tạo (AI - Artificial Intelligence) thường được ứng dụng trong lĩnh vực nào sau đây?',
    options: [
      'Nhận diện khuôn mặt và trợ lý ảo thông minh',
      'Làm dây điện kim loại truyền thống',
      'Đốt than sưởi ấm thủ công',
      'Đóng đinh vào bảng gỗ'
    ],
    correctAnswerIndex: 0,
    explanation: 'Nhận diện khuôn mặt, xe tự hành, trợ lý ảo và dịch thuật ngôn ngữ tự động là những ứng dụng tiêu biểu của AI hiện đại.',
    tags: ['AI', 'công nghệ mới'],
    createdDate: '2026-10-11',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  // Toán học 6
  {
    id: 'toan6-q1',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    difficulty: 'nhan_biet',
    content: 'Tập hợp các chữ số của số tự nhiên 2026 là:',
    options: ['{2; 0; 2; 6}', '{0; 2; 6}', '{2; 0; 6; 2}', '{2026}'],
    correctAnswerIndex: 1,
    explanation: 'Trong tập hợp, mỗi phần tử chỉ được liệt kê một lần. Số 2026 gồm các chữ số 0, 2, 6 nên tập hợp là {0; 2; 6}.',
    tags: ['tập hợp', 'số tự nhiên'],
    createdDate: '2026-10-12',
    author: 'Tổ Toán THCS Mỹ Hòa'
  },
  {
    id: 'toan6-q2',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    difficulty: 'thong_hieu',
    content: 'Số nào sau đây chia hết cho cả 2; 3; 5 và 9?',
    options: ['120', '180', '135', '250'],
    correctAnswerIndex: 1,
    explanation: 'Số chia hết cho 2 và 5 phải có tận cùng bằng 0 (120, 180, 250). Số chia hết cho 9 phải có tổng các chữ số chia hết cho 9: 1 + 8 + 0 = 9 (chia hết cho 9 và 3). Vậy là số 180.',
    tags: ['dấu hiệu chia hết'],
    createdDate: '2026-10-13',
    author: 'Tổ Toán THCS Mỹ Hòa'
  },
  // Tiếng Anh 6
  {
    id: 'eng6-q1',
    subjectId: 'tieng-anh',
    grade: 6,
    semester: 1,
    chapter: 'Unit 1: My New School',
    difficulty: 'nhan_biet',
    content: 'Lan and Mai ______ to My Hoa Secondary School by bicycle every day.',
    options: ['go', 'goes', 'going', 'is going'],
    correctAnswerIndex: 0,
    explanation: 'Chủ ngữ "Lan and Mai" là ngôi thứ 3 số nhiều, thì hiện tại đơn với thói quen hàng ngày (every day) dùng động từ nguyên mẫu: "go".',
    tags: ['grammar', 'present simple'],
    createdDate: '2026-10-14',
    author: 'Tổ Ngoại ngữ THCS Mỹ Hòa'
  },
  // KHTN 6
  {
    id: 'khtn6-q1',
    subjectId: 'khtn',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Mở đầu về KHTN',
    difficulty: 'nhan_biet',
    content: 'Dụng cụ nào sau đây dùng để đo nhiệt độ trong phòng thí nghiệm khoa học tự nhiên?',
    options: ['Cân đồng hồ', 'Nhiệt kế', 'Lực kế', 'Thước dây'],
    correctAnswerIndex: 1,
    explanation: 'Nhiệt kế là dụng cụ chuyên dụng để đo nhiệt độ.',
    tags: ['dụng cụ đo', 'nhiệt độ'],
    createdDate: '2026-10-15',
    author: 'Tổ KHTN THCS Mỹ Hòa'
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-tin6-15p-1',
    title: 'Kiểm tra 15 phút: Thông tin và Máy tính (Bài 1 - 3)',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    durationMinutes: 15,
    examType: '15_phut',
    questionIds: ['tin6-q1', 'tin6-q2', 'tin6-q3', 'tin6-q4', 'tin6-q5'],
    description: 'Bài kiểm tra nhanh đánh giá mức độ hiểu biết về thông tin, dữ liệu, thiết bị vào/ra và mạng máy tính cơ bản.',
    isOfficial: true
  },
  {
    id: 'exam-tin6-gk1',
    title: 'Đề ôn tập Giữa học kỳ I - Tin học 6 (Chuẩn GDPT 2018)',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    durationMinutes: 45,
    examType: 'giua_ky',
    questionIds: ['tin6-q1', 'tin6-q2', 'tin6-q3', 'tin6-q4', 'tin6-q5', 'tin6-q6'],
    description: 'Đề kiểm tra giữa kỳ khảo sát toàn diện kiến thức Chủ đề 1, 2, 3 môn Tin học 6 trường THCS Mỹ Hòa.',
    isOfficial: true
  },
  {
    id: 'exam-tin7-15p',
    title: 'Kiểm tra 15 phút - Tin học 7: Thiết bị vào ra & Bảng tính',
    subjectId: 'tin-hoc',
    grade: 7,
    semester: 1,
    durationMinutes: 15,
    examType: '15_phut',
    questionIds: ['tin7-q1', 'tin7-q2'],
    description: 'Trắc nghiệm củng cố kiến thức thiết bị vào ra và ứng dụng bảng tính.',
    isOfficial: true
  },
  {
    id: 'exam-toan6-15p',
    title: 'Kiểm tra 15 phút - Toán 6: Số tự nhiên & Dấu hiệu chia hết',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    durationMinutes: 15,
    examType: '15_phut',
    questionIds: ['toan6-q1', 'toan6-q2'],
    description: 'Kiểm tra nhanh kiến thức tập hợp và các dấu hiệu chia hết trong tập hợp số tự nhiên.',
    isOfficial: true
  }
];

export type { TeacherDocument };

export const INITIAL_DOCUMENTS: TeacherDocument[] = [
  ...OFFICIAL_TEXTBOOK_DOCUMENTS,
  {
    id: 'doc-1',
    title: 'Giáo án Tin học 6 - Bài 1: Thông tin và thu nhận thông tin (Kế hoạch bài dạy)',
    fileName: 'KHBD_Tin6_Bai1_THCS_My_Hoa.docx',
    fileType: 'docx',
    fileSize: '450 KB',
    subjectId: 'tin-hoc',
    grade: 6,
    topic: 'Chủ đề 1: Máy tính và cộng đồng',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Văn An (Tổ Tin học)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    description: 'Kế hoạch bài dạy chi tiết phát triển năng lực tin học theo công văn hướng dẫn.',
    source: 'Tổ Chuyên môn Tin học THCS Mỹ Hòa',
    linkedLessonId: 'tin6-b1'
  },
  {
    id: 'doc-2',
    title: 'Ngân hàng câu hỏi trắc nghiệm Tin học 6 - Học kỳ 1 (Chuẩn cấu trúc JSON)',
    fileName: 'Ngan_hang_Trac_nghiem_Tin6_HK1.json',
    fileType: 'json',
    fileSize: '85 KB',
    subjectId: 'tin-hoc',
    grade: 6,
    topic: 'Toàn bộ HK1',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trần Thị Mai (Trưởng bộ môn Tin)',
    uploadedAt: '2026-10-18',
    status: 'da_xac_nhan',
    description: 'Bộ 50 câu hỏi trắc nghiệm 4 mức độ nhận thức phục vụ xây dựng đề kiểm tra.',
    source: 'Ngân hàng đề Sở GD&ĐT'
  },
  {
    id: 'doc-3',
    title: 'Bài trình chiếu PowerPoint: Thiết bị vào - ra máy tính',
    fileName: 'Bai_giang_Thiet_bi_vao_ra.pptx',
    fileType: 'pptx',
    fileSize: '4.2 MB',
    subjectId: 'tin-hoc',
    grade: 7,
    topic: 'Chủ đề 1: Máy tính và cộng đồng',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Hoàng (Tổ Tin học)',
    uploadedAt: '2026-10-22',
    status: 'da_xu_ly',
    description: 'Slide trình chiếu minh họa trực quan các thiết bị ngoại vi và cổng kết nối.',
    source: 'Tự biên soạn'
  }
];

export interface TermPair {
  id: string;
  term: string;
  definition: string;
  subjectId: SubjectId;
  grade: GradeLevel;
}

export const MATCHING_GAME_PAIRS: TermPair[] = [
  { id: 'p1', term: 'CPU', definition: 'Bộ não xử lý trung tâm điều khiển hoạt động của máy tính', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p2', term: 'Bàn phím', definition: 'Thiết bị vào giúp người dùng nhập văn bản và câu lệnh', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p3', term: 'Màn hình', definition: 'Thiết bị ra hiển thị kết quả xử lý của máy tính', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p4', term: 'Vật mang tin', definition: 'Phương tiện lưu giữ và truyền đạt dữ liệu như sổ tay, thẻ nhớ', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p5', term: 'RAM', definition: 'Bộ nhớ tạm thời bị mất dữ liệu khi tắt máy tính', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p6', term: 'Mạng máy tính', definition: 'Các máy tính kết nối để truyền thông tin và chia sẻ tài nguyên', subjectId: 'tin-hoc', grade: 6 }
];

export interface WordGuess {
  word: string;
  hint: string;
  subjectId: SubjectId;
  grade: GradeLevel;
}

export const WORD_GUESS_LIST: WordGuess[] = [
  { word: 'INTERNET', hint: 'Mạng máy tính toàn cầu kết nối hàng triệu thiết bị trên khắp thế giới.', subjectId: 'tin-hoc', grade: 6 },
  { word: 'DATABASE', hint: 'Cơ sở dữ liệu được lưu trữ có tổ chức để dễ dàng truy xuất.', subjectId: 'tin-hoc', grade: 7 },
  { word: 'ALGORITHM', hint: 'Dãy các chỉ dẫn từng bước rõ ràng để giải quyết một bài toán.', subjectId: 'tin-hoc', grade: 8 },
  { word: 'HARDWARE', hint: 'Phần cứng vật lý của máy tính mà em có thể chạm vào được.', subjectId: 'tin-hoc', grade: 6 },
  { word: 'SOFTWARE', hint: 'Phần mềm và các chương trình chỉ thị cho máy tính hoạt động.', subjectId: 'tin-hoc', grade: 6 }
];
