import { Lesson, TeacherDocument } from '../types';

// ============================================================================
// BẢNG DANH MỤC TOÀN BỘ FILE SÁCH GIÁO KHOA ĐÃ TẢI LÊN (THEO PHẦN III & IV)
// Trường THCS Mỹ Hòa - Năm học 2026–2027
// ============================================================================

export const OFFICIAL_TEXTBOOK_DOCUMENTS: TeacherDocument[] = [
  // --- MÔN TOÁN HỌC ---
  {
    id: 'sgk-toan-6',
    title: 'Sách giáo khoa Toán 6 - Tập 1 (Chương trình GDPT 2018)',
    fileName: 'SGK_Toan_6_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '28.4 MB',
    subjectId: 'toan',
    grade: 6,
    topic: 'Chương 1: Tập hợp các số tự nhiên & Chương 2: Tính chia hết',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán - Tin)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 6,
    successLessons: 6,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Sách giáo khoa Toán 6 tập 1 bản chuẩn Nhà xuất bản Giáo dục Việt Nam. Đầy đủ lý thuyết số tự nhiên, ước và bội, hình học trực quan.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-7',
    title: 'Sách giáo khoa Toán 7 - Tập 1',
    fileName: 'SGK_Toan_7_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '31.2 MB',
    subjectId: 'toan',
    grade: 7,
    topic: 'Chương 1: Số hữu tỉ & Chương 2: Số thực',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Đỗ Thị Hồng (Tổ Toán)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Số hữu tỉ và các phép tính, biểu diễn số hữu tỉ trên trục số, số vô tỉ và căn bậc hai số học.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-8',
    title: 'Sách giáo khoa Toán 8 - Tập 1',
    fileName: 'SGK_Toan_8_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '29.8 MB',
    subjectId: 'toan',
    grade: 8,
    topic: 'Chương 1: Đa thức & Chương 2: Hằng đẳng thức đáng nhớ',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Đơn thức, đa thức nhiều biến, 7 hằng đẳng thức đáng nhớ và phương pháp phân tích đa thức thành nhân tử.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-9',
    title: 'Sách giáo khoa Toán 9 - Tập 1',
    fileName: 'SGK_Toan_9_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '34.5 MB',
    subjectId: 'toan',
    grade: 9,
    topic: 'Chương 1: Phương trình và hệ phương trình & Chương 2: Căn thức',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Văn Hưng (Tổ Toán)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Phương trình bậc nhất hai ẩn, hệ phương trình, căn bậc hai và căn bậc ba theo chuẩn chương trình mới.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- MÔN NGỮ VĂN ---
  {
    id: 'sgk-van-6',
    title: 'Sách giáo khoa Ngữ văn 6 - Tập 1',
    fileName: 'SGK_Ngu_van_6_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '25.6 MB',
    subjectId: 'van',
    grade: 6,
    topic: 'Bài 1: Tôi và các bạn & Bài 2: Gõ cửa trái tim',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Phạm Thị Thu Hà (Tổ Ngữ văn)',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Đọc hiểu truyện đồng thoại (Bài học đường đời đầu tiên - Tô Hoài), thơ lục bát và thực hành tiếng Việt.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-7',
    title: 'Sách giáo khoa Ngữ văn 7 - Tập 1',
    fileName: 'SGK_Ngu_van_7_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '26.8 MB',
    subjectId: 'van',
    grade: 7,
    topic: 'Bài 1: Bầu trời tuổi thơ & Bài 2: Khúc nhạc tâm hồn',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Phạm Thị Thu Hà (Tổ Ngữ văn)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Văn bản Người đàn ông cô độc giữa rừng (Đoàn Giỏi), thơ bốn chữ, năm chữ và rèn luyện kỹ năng viết bài văn biểu cảm.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-8',
    title: 'Sách giáo khoa Ngữ văn 8 - Tập 1',
    fileName: 'SGK_Ngu_van_8_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '27.4 MB',
    subjectId: 'van',
    grade: 8,
    topic: 'Bài 1: Câu chuyện của lịch sử & Bài 2: Vẻ đẹp cổ điển',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Hoàng Minh Đức (Tổ Ngữ văn)',
    uploadedAt: '2026-10-17',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Truyện lịch sử (Lá cờ thêu sáu chữ vàng), thơ Đường luật, từ tượng hình, từ tượng thanh và viết bài nghị luận xã hội.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-9',
    title: 'Sách giáo khoa Ngữ văn 9 - Tập 1',
    fileName: 'SGK_Ngu_van_9_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '30.1 MB',
    subjectId: 'van',
    grade: 9,
    topic: 'Bài 1: Trái tim người thầy & Bài 2: Khát vọng sống',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Hoàng Minh Đức (Tổ Ngữ văn)',
    uploadedAt: '2026-10-18',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Truyện truyền kì (Chuyện người con gái Nam Xương), thơ hiện đại Việt Nam và rèn luyện kỹ năng phân tích tác phẩm văn học.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- MÔN TIẾNG ANH ---
  {
    id: 'sgk-tienganh-6',
    title: 'Tiếng Anh 6 - Global Success (Student Book)',
    fileName: 'English_6_Global_Success_Student_Book.pdf',
    fileType: 'pdf',
    fileSize: '36.5 MB',
    subjectId: 'tieng-anh',
    grade: 6,
    topic: 'Unit 1: My New School & Unit 2: My House',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trịnh Mỹ Duyên (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Chương trình Tiếng Anh 6 chuẩn quốc tế Global Success. Rèn luyện 4 kỹ năng Nghe - Nói - Đọc - Viết, thì Hiện tại đơn và từ vựng trường học.',
    source: 'NXB Giáo dục Việt Nam & Pearson'
  },
  {
    id: 'sgk-tienganh-7',
    title: 'Tiếng Anh 7 - Global Success (Student Book)',
    fileName: 'English_7_Global_Success_Student_Book.pdf',
    fileType: 'pdf',
    fileSize: '38.2 MB',
    subjectId: 'tieng-anh',
    grade: 7,
    topic: 'Unit 1: Hobbies & Unit 2: Healthy Living',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trịnh Mỹ Duyên (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Từ vựng sở thích cá nhân, câu phức, lối sống lành mạnh, thì Quá khứ đơn và cấu trúc lời khuyên với should / shouldn\'t.',
    source: 'NXB Giáo dục Việt Nam & Pearson'
  },
  {
    id: 'sgk-tienganh-8',
    title: 'Tiếng Anh 8 - Global Success (Student Book)',
    fileName: 'English_8_Global_Success_Student_Book.pdf',
    fileType: 'pdf',
    fileSize: '39.0 MB',
    subjectId: 'tieng-anh',
    grade: 8,
    topic: 'Unit 1: Leisure Time & Unit 2: Life in the Countryside',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Đặng Tuấn Kiệt (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Từ vựng hoạt động giải trí, động từ chỉ sở thích đi kèm V-ing / to V, so sánh hơn của trạng từ và cuộc sống nông thôn.',
    source: 'NXB Giáo dục Việt Nam & Pearson'
  },
  {
    id: 'sgk-tienganh-9',
    title: 'Tiếng Anh 9 - Global Success (Student Book)',
    fileName: 'English_9_Global_Success_Student_Book.pdf',
    fileType: 'pdf',
    fileSize: '41.5 MB',
    subjectId: 'tieng-anh',
    grade: 9,
    topic: 'Unit 1: Local Community & Unit 2: City Life',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Đặng Tuấn Kiệt (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Làng nghề truyền thống, cụm động từ (Phrasal Verbs), câu phức chỉ lý do/kết quả và cuộc sống đô thị hiện đại.',
    source: 'NXB Giáo dục Việt Nam & Pearson'
  },

  // --- MÔN KHOA HỌC TỰ NHIÊN ---
  {
    id: 'sgk-khtn-6',
    title: 'Sách giáo khoa Khoa học tự nhiên 6',
    fileName: 'SGK_KHTN_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '42.1 MB',
    subjectId: 'khtn',
    grade: 6,
    topic: 'Chương 1: Mở đầu KHTN & Chương 2: Các thể của chất',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Vũ Thị Lan (Tổ Tự nhiên)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Phương pháp nghiên cứu khoa học, đo chiều dài, khối lượng, thời gian, nhiệt độ; ba thể của chất (rắn, lỏng, khí) và sự chuyển thể.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-khtn-7',
    title: 'Sách giáo khoa Khoa học tự nhiên 7',
    fileName: 'SGK_KHTN_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '45.0 MB',
    subjectId: 'khtn',
    grade: 7,
    topic: 'Chủ đề 1: Nguyên tử và Bảng tuần hoàn & Chủ đề 2: Phân tử',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Vũ Thị Lan (Tổ Tự nhiên)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Cấu tạo nguyên tử (proton, neutron, electron), bảng tuần hoàn các nguyên tố hóa học Mendeleev và liên kết hóa học.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-khtn-8',
    title: 'Sách giáo khoa Khoa học tự nhiên 8',
    fileName: 'SGK_KHTN_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '46.7 MB',
    subjectId: 'khtn',
    grade: 8,
    topic: 'Chương 1: Phản ứng hóa học & Chương 2: Acid - Base',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Bùi Quốc Bảo (Tổ Tự nhiên)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Biến đổi vật lý và hóa học, định luật bảo toàn khối lượng, mol, dung dịch, thang pH và các hợp chất vô cơ.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-khtn-9',
    title: 'Sách giáo khoa Khoa học tự nhiên 9',
    fileName: 'SGK_KHTN_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '48.2 MB',
    subjectId: 'khtn',
    grade: 9,
    topic: 'Chương 1: Năng lượng và công cơ học & Chương 2: Điện thế',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Bùi Quốc Bảo (Tổ Tự nhiên)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Động năng, thế năng, cơ năng, định luật Ohm, điện trở dây dẫn, đoạn mạch nối tiếp và song song.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- MÔN LỊCH SỬ VÀ ĐỊA LÍ ---
  {
    id: 'sgk-lsdl-6',
    title: 'Sách giáo khoa Lịch sử và Địa lí 6',
    fileName: 'SGK_Lich_su_va_Dia_li_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '32.4 MB',
    subjectId: 'lich-su-dia-ly',
    grade: 6,
    topic: 'Phần Lịch sử: Nguồn gốc loài người & Phần Địa lí: Trái Đất',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Nguyễn Thị Thủy (Tổ Sử - Địa)',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Quá trình tiến hóa từ vượn thành người, xã hội nguyên thủy, hình dạng, kích thước và chuyển động của Trái Đất.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-lsdl-7',
    title: 'Sách giáo khoa Lịch sử và Địa lí 7',
    fileName: 'SGK_Lich_su_va_Dia_li_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '34.0 MB',
    subjectId: 'lich-su-dia-ly',
    grade: 7,
    topic: 'Lịch sử Tây Âu thời trung đại & Địa lí Châu Âu',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Nguyễn Thị Thủy (Tổ Sử - Địa)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Sự hình thành chế độ phong kiến Tây Âu, các cuộc phát kiến địa lí lớn và đặc điểm tự nhiên châu Âu.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-lsdl-8',
    title: 'Sách giáo khoa Lịch sử và Địa lí 8',
    fileName: 'SGK_Lich_su_va_Dia_li_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '35.8 MB',
    subjectId: 'lich-su-dia-ly',
    grade: 8,
    topic: 'Cách mạng tư sản & Vị trí địa lí Việt Nam',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Văn Thành (Tổ Sử - Địa)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Cách mạng tư sản Anh, Pháp, Bắc Mỹ; vị trí địa lí, phạm vi lãnh thổ và địa hình đồi núi Việt Nam.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-lsdl-9',
    title: 'Sách giáo khoa Lịch sử và Địa lí 9',
    fileName: 'SGK_Lich_su_va_Dia_li_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '37.1 MB',
    subjectId: 'lich-su-dia-ly',
    grade: 9,
    topic: 'Thế giới sau Chiến tranh thế giới thứ hai & Địa lí dân cư Việt Nam',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Văn Thành (Tổ Sử - Địa)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Trật tự thế giới hai cực Ianta, phong trào giải phóng dân tộc, dân số và cơ cấu dân số các dân tộc Việt Nam.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- MÔN GIÁO DỤC CÔNG DÂN ---
  {
    id: 'sgk-gdcd-6',
    title: 'Sách giáo khoa Giáo dục công dân 6',
    fileName: 'SGK_GDCD_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '21.5 MB',
    subjectId: 'gdcd',
    grade: 6,
    topic: 'Bài 1: Tự hào truyền thống gia đình & Bài 2: Yêu thương con người',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Mai Tuyết Nhung (Tổ GDCD)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Giáo dục truyền thống gia đình, dòng họ, lòng nhân ái, sự sẻ chia và kỹ năng tự nhận thức bản thân của học sinh lớp 6.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-gdcd-7',
    title: 'Sách giáo khoa Giáo dục công dân 7',
    fileName: 'SGK_GDCD_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '22.0 MB',
    subjectId: 'gdcd',
    grade: 7,
    topic: 'Bài 1: Tự hào về di sản văn hóa & Bài 2: Quan tâm cảm thông',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Mai Tuyết Nhung (Tổ GDCD)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Bảo vệ di sản văn hóa vật thể và phi vật thể, kỹ năng lắng nghe, quan tâm và cảm thông chia sẻ trong tập thể.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-gdcd-8',
    title: 'Sách giáo khoa Giáo dục công dân 8',
    fileName: 'SGK_GDCD_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '23.4 MB',
    subjectId: 'gdcd',
    grade: 8,
    topic: 'Bài 1: Tôn trọng sự đa dạng của các dân tộc & Bài 2: Lao động',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Mai Tuyết Nhung (Tổ GDCD)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Tôn trọng sự khác biệt văn hóa, quyền bình đẳng dân tộc, lao động cần cù, sáng tạo và bảo vệ môi trường.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-gdcd-9',
    title: 'Sách giáo khoa Giáo dục công dân 9',
    fileName: 'SGK_GDCD_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '24.1 MB',
    subjectId: 'gdcd',
    grade: 9,
    topic: 'Bài 1: Chí công vô tư & Bài 2: Tự chủ trong cuộc sống',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Mai Tuyết Nhung (Tổ GDCD)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Phẩm chất chí công vô tư, tính tự chủ, lòng yêu hòa bình và tình hữu nghị giữa các dân tộc trên thế giới.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- MÔN CÔNG NGHỆ ---
  {
    id: 'sgk-congnghe-6',
    title: 'Sách giáo khoa Công nghệ 6',
    fileName: 'SGK_Cong_nghe_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '25.0 MB',
    subjectId: 'cong-nghe',
    grade: 6,
    topic: 'Chương 1: Nhà ở & Chương 2: Bảo quản và chế biến thực phẩm',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trương Tấn Phát (Tổ Kỹ thuật)',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kiến trúc nhà ở, ngôi nhà thông minh, an toàn tiết kiệm năng lượng, dinh dưỡng học đường và chế biến món ăn.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-congnghe-7',
    title: 'Sách giáo khoa Công nghệ 7',
    fileName: 'SGK_Cong_nghe_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '26.3 MB',
    subjectId: 'cong-nghe',
    grade: 7,
    topic: 'Chương 1: Trồng trọt công nghệ cao & Chương 2: Chăn nuôi',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trương Tấn Phát (Tổ Kỹ thuật)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Quy trình gieo trồng rau sạch, nhà màng thông minh, phòng trừ sâu bệnh hữu cơ và kỹ thuật chăn nuôi gia súc, gia cầm.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-congnghe-8',
    title: 'Sách giáo khoa Công nghệ 8',
    fileName: 'SGK_Cong_nghe_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '27.9 MB',
    subjectId: 'cong-nghe',
    grade: 8,
    topic: 'Chương 1: Vẽ kỹ thuật & Chương 2: Cơ khí và Điện',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trương Tấn Phát (Tổ Kỹ thuật)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Tiêu chuẩn bản vẽ kỹ thuật, hình chiếu vuông góc, vật liệu cơ khí và nguyên lý an toàn trong sử dụng điện gia đình.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-congnghe-9',
    title: 'Sách giáo khoa Công nghệ 9',
    fileName: 'SGK_Cong_nghe_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '28.8 MB',
    subjectId: 'cong-nghe',
    grade: 9,
    topic: 'Định hướng nghề nghiệp & Lắp đặt mạng điện trong nhà',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trương Tấn Phát (Tổ Kỹ thuật)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Thị trường lao động kỹ thuật, sơ đồ nguyên lý và thực hành lắp mạch điện chiếu sáng bảng điện gia đình.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- MÔN NGHỆ THUẬT ---
  {
    id: 'sgk-nghethuat-6',
    title: 'Sách giáo khoa Nghệ thuật 6 (Âm nhạc & Mĩ thuật)',
    fileName: 'SGK_Nghe_thuat_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '31.5 MB',
    subjectId: 'nghe-thuat',
    grade: 6,
    topic: 'Chủ đề 1: Tuổi học trò & Chủ đề 2: Hòa sắc thiên nhiên',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Hoàng Thảo Linh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Lý thuyết âm nhạc (nốt nhạc, nhịp 2/4), học hát bài ca tuổi thơ; yếu tố tạo hình mĩ thuật (chấm, nét, mảng, màu sắc).',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-nghethuat-7',
    title: 'Sách giáo khoa Nghệ thuật 7 (Âm nhạc & Mĩ thuật)',
    fileName: 'SGK_Nghe_thuat_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '32.8 MB',
    subjectId: 'nghe-thuat',
    grade: 7,
    topic: 'Chủ đề 1: Giai điệu mùa thu & Chủ đề 2: Chữ nghệ thuật',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Hoàng Thảo Linh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Nhịp 3/4, ký hiệu âm nhạc phương Tây, nghệ thuật chữ biểu cảm trong thiết kế đồ họa học đường.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-nghethuat-8',
    title: 'Sách giáo khoa Nghệ thuật 8 (Âm nhạc & Mĩ thuật)',
    fileName: 'SGK_Nghe_thuat_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '33.2 MB',
    subjectId: 'nghe-thuat',
    grade: 8,
    topic: 'Chủ đề 1: Âm nhạc dân gian & Chủ đề 2: Phù điêu đắp nổi',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trần Quang Vinh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Dân ca ba miền Việt Nam, nhạc cụ truyền thống dân tộc, điêu khắc phù điêu và tạo hình không gian 3D.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-nghethuat-9',
    title: 'Sách giáo khoa Nghệ thuật 9 (Âm nhạc & Mĩ thuật)',
    fileName: 'SGK_Nghe_thuat_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '34.6 MB',
    subjectId: 'nghe-thuat',
    grade: 9,
    topic: 'Chủ đề 1: Nhạc kịch thế giới & Chủ đề 2: Thiết kế thời trang',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trần Quang Vinh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-17',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Lịch sử âm nhạc cổ điển thế giới (Mozart, Beethoven), nghệ thuật thị giác và phác thảo trang phục hiện đại.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- MÔN GIÁO DỤC THỂ CHẤT ---
  {
    id: 'sgk-thechat-6',
    title: 'Sách giáo khoa Giáo dục thể chất 6',
    fileName: 'SGK_GD_The_chat_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '19.4 MB',
    subjectId: 'giao-duc-the-chat',
    grade: 6,
    topic: 'Chủ đề: Đội hình đội ngũ & Bài tập thể dục phát triển chung',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Trọng Nhân (Tổ Thể chất)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Các tư thế đứng nghiêm, nghỉ, quay phải, quay trái, biến đổi đội hình và bài thể dục liên hoàn 8 động tác.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-thechat-7',
    title: 'Sách giáo khoa Giáo dục thể chất 7',
    fileName: 'SGK_GD_The_chat_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '20.1 MB',
    subjectId: 'giao-duc-the-chat',
    grade: 7,
    topic: 'Chủ đề: Chạy cự ly ngắn & Kỹ thuật tâng bóng',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Trọng Nhân (Tổ Thể chất)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kỹ thuật xuất phát thấp, chạy lao, chạy giữa quãng, về đích cự ly 60m và kỹ thuật khống chế bóng cơ bản.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-thechat-8',
    title: 'Sách giáo khoa Giáo dục thể chất 8',
    fileName: 'SGK_GD_The_chat_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '21.0 MB',
    subjectId: 'giao-duc-the-chat',
    grade: 8,
    topic: 'Chủ đề: Kỹ thuật nhảy xa kiểu ngồi & Cầu lông',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Phan Hoàng Anh (Tổ Thể chất)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Giai đoạn chạy đà, giậm nhảy, bay trên không, tiếp đất nhảy xa và kỹ thuật đánh cầu cao sâu thuận tay.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-thechat-9',
    title: 'Sách giáo khoa Giáo dục thể chất 9',
    fileName: 'SGK_GD_The_chat_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '21.8 MB',
    subjectId: 'giao-duc-the-chat',
    grade: 9,
    topic: 'Chủ đề: Kỹ thuật bóng rổ & Chạy bền cự ly trung bình',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Phan Hoàng Anh (Tổ Thể chất)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kỹ thuật ném rổ một tay trên vai, dẫn bóng luồn cọc, phân phối sức trên đường chạy 800m - 1500m.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- MÔN HOẠT ĐỘNG TRẢI NGHIỆM ---
  {
    id: 'sgk-hdtn-6',
    title: 'Hoạt động trải nghiệm, hướng nghiệp 6',
    fileName: 'SGK_HDTN_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '24.2 MB',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 6,
    topic: 'Chủ đề 1: Khám phá trường THCS & Chủ đề 2: Xây dựng nếp sống',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trần Kim Yến (Tổng Phụ trách Đội)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Thích ứng môi trường học tập cấp THCS, rèn luyện thói quen tự giác, quản lý thời gian và thiết lập tình bạn đẹp.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-hdtn-7',
    title: 'Hoạt động trải nghiệm, hướng nghiệp 7',
    fileName: 'SGK_HDTN_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '25.0 MB',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 7,
    topic: 'Chủ đề 1: Phát triển mối quan hệ hòa đồng & Chủ đề 2: Tự chủ tài chính',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trần Kim Yến (Tổng Phụ trách Đội)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kỹ năng giải quyết bất đồng trong nhóm, ứng xử văn minh trên không gian mạng và quản lý chi tiêu cá nhân hợp lý.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-hdtn-8',
    title: 'Hoạt động trải nghiệm, hướng nghiệp 8',
    fileName: 'SGK_HDTN_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '26.1 MB',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 8,
    topic: 'Chủ đề 1: Khám phá nghề truyền thống & Chủ đề 2: Tình nguyện vì cộng đồng',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Võ Quốc Tuấn (Phó Hiệu trưởng)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Khảo sát các làng nghề thủ công địa phương, xây dựng kế hoạch dự án tình nguyện môi trường và an sinh xã hội.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-hdtn-9',
    title: 'Hoạt động trải nghiệm, hướng nghiệp 9',
    fileName: 'SGK_HDTN_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '27.5 MB',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 9,
    topic: 'Chủ đề 1: Định hướng con đường sau THCS & Chủ đề 2: Kỹ năng thích ứng',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Võ Quốc Tuấn (Phó Hiệu trưởng)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 3,
    successLessons: 3,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Phân tích năng lực bản thân, tìm hiểu hệ thống trường THPT, giáo dục nghề nghiệp và chuẩn bị tâm lý cho kỳ thi tuyển sinh vào lớp 10.',
    source: 'NXB Giáo dục Việt Nam'
  }
];

// ============================================================================
// HỆ THỐNG BÀI HỌC CHUẨN TRÍCH XUẤT TỪ SÁCH GIÁO KHOA CHO CÁC MÔN VÀ KHỐI LỚP
// Bảo toàn nguyên vẹn 17 bài Tin học 6, bổ sung đầy đủ các môn học khác
// ============================================================================

export const OFFICIAL_TEXTBOOK_LESSONS: Lesson[] = [
  // ==========================================================================
  // 1. MÔN TOÁN HỌC (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- TOÁN 6 ---
  {
    id: 'toan6-b2',
    title: 'Bài 2: Các phép tính với số tự nhiên',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Toán 6 Tập 1',
    pageReference: 'Trang 11 - 15',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm vững tính chất giao hoán, kết hợp, phân phối của phép cộng và phép nhân.',
      'Thực hiện thành thạo phép chia hết và phép chia có dư trong tập hợp số tự nhiên.',
      'Vận dụng tính toán nhanh và giải quyết các bài toán thực tiễn.'
    ],
    summary: 'Rèn luyện kỹ năng thực hiện các phép tính cộng, trừ, nhân, chia số tự nhiên và tính toán hợp lý bằng tính chất giao hoán, kết hợp.',
    keyPoints: [
      'Phép cộng và phép nhân có tính chất giao hoán: a + b = b + a; a . b = b . a.',
      'Tính chất kết hợp: (a + b) + c = a + (b + c); (a . b) . c = a . (b . c).',
      'Tính chất phân phối của phép nhân đối với phép cộng: a . (b + c) = a . b + a . c.',
      'Trong phép chia có dư: Số bị chia = (Số chia . Thương) + Số dư (0 < Số dư < Số chia).'
    ],
    contentMarkdown: `### 1. Phép cộng và phép nhân số tự nhiên
* **Tính chất giao hoán**: Khi đổi chỗ các số hạng trong một tổng (hoặc các thừa số trong một tích), tổng (hoặc tích) không thay đổi.
* **Tính chất kết hợp**: Muốn cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba.
* **Tính chất phân phối**: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$.
* **Ví dụ tính nhanh**:
  $$47 \\cdot 36 + 47 \\cdot 64 = 47 \\cdot (36 + 64) = 47 \\cdot 100 = 4700$$

### 2. Phép trừ và phép chia hết
* Với hai số tự nhiên $a$ và $b$, nếu $a \\ge b$ thì luôn có duy nhất số tự nhiên $c$ sao cho $b + c = a$. Ký hiệu: $a - b = c$.
* Nếu có số tự nhiên $q$ sao cho $a = b \\cdot q$ thì ta nói $a$ chia hết cho $b$. Ký hiệu: $a : b = q$.

### 3. Phép chia có dư
* Cho hai số tự nhiên $a$ và $b$ ($b \\ne 0$). Luôn tìm được hai số tự nhiên $q$ và $r$ duy nhất sao cho:
  $$a = b \\cdot q + r \\quad (0 \\le r < b)$$
* Nếu $r = 0$, ta có phép chia hết. Nếu $r > 0$, ta có phép chia có dư với số dư $r$ luôn nhỏ hơn số chia $b$.`,
    sampleExercises: [
      {
        question: 'Tính một cách hợp lí: A = 125 . 1972 . 8?',
        solution: 'Áp dụng tính chất giao hoán và kết hợp: A = (125 . 8) . 1972 = 1000 . 1972 = 1 972 000.'
      },
      {
        question: 'Một lớp học có 43 học sinh cần đi tham quan bằng xe ô tô 7 chỗ. Hỏi cần ít nhất bao nhiêu xe để chở hết học sinh?',
        solution: 'Ta có phép chia: 43 : 7 = 6 (dư 1). Vì còn dư 1 học sinh nên cần thêm 1 xe nữa. Vậy số xe ít nhất là 6 + 1 = 7 xe.'
      }
    ]
  },
  {
    id: 'toan6-b3',
    title: 'Bài 3: Lũy thừa với số mũ tự nhiên',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Toán 6 Tập 1',
    pageReference: 'Trang 16 - 19',
    orderIndex: 3,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu khái niệm lũy thừa bậc n của a, cơ số và số mũ.',
      'Thành thạo quy tắc nhân, chia hai lũy thừa cùng cơ số.',
      'Viết các số tự nhiên dưới dạng tổng các lũy thừa của 10.'
    ],
    summary: 'Lũy thừa bậc n của số tự nhiên a là tích của n thừa số bằng nhau, mỗi thừa số bằng a. Quy tắc nhân và chia hai lũy thừa cùng cơ số.',
    keyPoints: [
      'Lũy thừa: a^n = a . a . ... . a (n thừa số a, n thuộc N*). a gọi là cơ số, n gọi là số mũ.',
      'Nhân hai lũy thừa cùng cơ số: a^m . a^n = a^(m+n).',
      'Chia hai lũy thừa cùng cơ số: a^m : a^n = a^(m-n) (với a khác 0, m >= n). Quy ước: a^0 = 1 (a khác 0).'
    ],
    contentMarkdown: `### 1. Khái niệm lũy thừa
Lũy thừa bậc $n$ của $a$ (ký hiệu $a^n$) là tích của $n$ thừa số bằng nhau, mỗi thừa số bằng $a$:
$$a^n = \\underbrace{a \\cdot a \\cdot \\dots \\cdot a}_{n \\text{ thừa số } a} \\quad (n \\in \\mathbb{N}^*)$$
* $a$ được gọi là **cơ số**.
* $n$ được gọi là **số mũ**.
* **Đặc biệt**: $a^2$ còn gọi là $a$ bình phương; $a^3$ còn gọi là $a$ lập phương.

### 2. Nhân hai lũy thừa cùng cơ số
Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ:
$$a^m \\cdot a^n = a^{m+n}$$

### 3. Chia hai lũy thừa cùng cơ số
Khi chia hai lũy thừa cùng cơ số (khác 0), ta giữ nguyên cơ số và lấy số mũ của số bị chia trừ đi số mũ của số chia:
$$a^m : a^n = a^{m-n} \\quad (a \\ne 0; m \\ge n)$$
* **Quy ước**: $a^0 = 1$ với mọi $a \\ne 0$.`,
    sampleExercises: [
      {
        question: 'Viết kết quả phép tính dưới dạng một lũy thừa: a) 3^4 . 3^5; b) 5^8 : 5^3?',
        solution: 'a) 3^4 . 3^5 = 3^(4+5) = 3^9. b) 5^8 : 5^3 = 5^(8-3) = 5^5.'
      }
    ]
  },

  // --- TOÁN 7 ---
  {
    id: 'toan7-b1',
    title: 'Bài 1: Tập hợp các số hữu tỉ',
    subjectId: 'toan',
    grade: 7,
    semester: 1,
    chapter: 'Chương 1: Số hữu tỉ',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Toán 7 Tập 1',
    pageReference: 'Trang 6 - 10',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết số hữu tỉ và ký hiệu tập hợp Q.',
      'Biểu diễn số hữu tỉ trên trục số và so sánh hai số hữu tỉ.',
      'Nhận biết số đối của một số hữu tỉ.'
    ],
    summary: 'Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b thuộc Z, b khác 0. Tập hợp các số hữu tỉ ký hiệu là Q.',
    keyPoints: [
      'Số hữu tỉ là số viết được dưới dạng phân số a/b (a, b thuộc Z; b khác 0).',
      'Tập hợp các số hữu tỉ được ký hiệu là Q. Ta có N thuộc Z thuộc Q.',
      'Mỗi số hữu tỉ được biểu diễn bởi một điểm trên trục số.',
      'Hai số hữu tỉ có điểm biểu diễn cách đều gốc O và nằm về hai phía gọi là hai số đối nhau.'
    ],
    contentMarkdown: `### 1. Số hữu tỉ là gì?
* **Định nghĩa**: Số hữu tỉ là số có thể viết dưới dạng phân số $\\frac{a}{b}$, trong đó $a, b \\in \\mathbb{Z}$ và $b \\ne 0$.
* Tập hợp các số hữu tỉ được ký hiệu là $\\mathbb{Q}$.
* **Ví dụ**:
  * Các số $3; -0,5; 0; 2\\frac{1}{3}$ đều là số hữu tỉ vì:
  $$3 = \\frac{3}{1}; \\quad -0,5 = \\frac{-1}{2}; \\quad 0 = \\frac{0}{1}; \\quad 2\\frac{1}{3} = \\frac{7}{3}$$

### 2. Thứ tự trong tập hợp số hữu tỉ
* Với hai số hữu tỉ bất kỳ $x, y$, ta luôn có một trong ba trường hợp: $x < y$ hoặc $x = y$ hoặc $x > y$.
* Nếu $x < y$ thì trên trục số nằm ngang, điểm $x$ nằm bên trái điểm $y$.
* Số hữu tỉ lớn hơn 0 gọi là số hữu tỉ dương. Số hữu tỉ nhỏ hơn 0 gọi là số hữu tỉ âm. Số 0 không là số hữu tỉ dương cũng không là số hữu tỉ âm.`,
    sampleExercises: [
      {
        question: 'Trong các số sau, số nào là số hữu tỉ: 0,6; -1,25; 1 1/3; -5?',
        solution: 'Tất cả các số trên đều là số hữu tỉ vì đều viết được dưới dạng phân số a/b (a, b thuộc Z, b khác 0).'
      }
    ]
  },

  // --- TOÁN 8 ---
  {
    id: 'toan8-b1',
    title: 'Bài 1: Đơn thức và đa thức nhiều biến',
    subjectId: 'toan',
    grade: 8,
    semester: 1,
    chapter: 'Chương 1: Đa thức',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Toán 8 Tập 1',
    pageReference: 'Trang 5 - 10',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết đơn thức, đa thức nhiều biến.',
      'Xác định hệ số, phần biến và bậc của đơn thức thu gọn.',
      'Cộng trừ các đơn thức đồng dạng.'
    ],
    summary: 'Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến. Đa thức là một tổng của những đơn thức.',
    keyPoints: [
      'Đơn thức thu gọn gồm hai phần: hệ số (phần số) và phần biến.',
      'Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến có trong đơn thức đó.',
      'Hai đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và có cùng phần biến.'
    ],
    contentMarkdown: `### 1. Đơn thức và đơn thức thu gọn
* **Đơn thức**: Là biểu thức đại số chỉ gồm một số, một biến, hoặc một tích giữa các số và các biến.
  * Ví dụ: $3; \\quad x^2y; \\quad -\\frac{1}{2}x^3yz^2$.
* **Đơn thức thu gọn**: Là đơn thức chỉ gồm tích của một số với các biến, mà mỗi biến chỉ được viết một lần dưới dạng nâng lên lũy thừa với số mũ nguyên dương.
* **Bậc của đơn thức**: Là tổng số mũ của tất cả các biến có trong đơn thức thu gọn. Ví dụ đơn thức $4x^3y^2z$ có bậc là $3 + 2 + 1 = 6$.

### 2. Đa thức nhiều biến
* Đa thức là một tổng của những đơn thức. Mỗi đơn thức trong tổng gọi là một hạng tử của đa thức đó.
* Đa thức thu gọn là đa thức không còn hai hạng tử nào đồng dạng.`,
    sampleExercises: [
      {
        question: 'Thu gọn đơn thức sau và tìm bậc của nó: A = 2x^2y . (-3)xy^3?',
        solution: 'A = [2 . (-3)] . (x^2 . x) . (y . y^3) = -6x^3y^4. Bậc của đơn thức là 3 + 4 = 7.'
      }
    ]
  },

  // --- TOÁN 9 ---
  {
    id: 'toan9-b1',
    title: 'Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn',
    subjectId: 'toan',
    grade: 9,
    semester: 1,
    chapter: 'Chương 1: Phương trình và hệ hai phương trình bậc nhất hai ẩn',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Toán 9 Tập 1',
    pageReference: 'Trang 6 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết phương trình bậc nhất hai ẩn dạng ax + by = c (a khác 0 hoặc b khác 0).',
      'Hiểu nghiệm của phương trình và tập nghiệm biểu diễn trên mặt phẳng tọa độ Oxy.',
      'Nhận biết hệ hai phương trình bậc nhất hai ẩn.'
    ],
    summary: 'Phương trình bậc nhất hai ẩn x và y là hệ thức dạng ax + by = c, trong đó a, b và c là các số đã biết, a và b không đồng thời bằng 0.',
    keyPoints: [
      'Phương trình bậc nhất hai ẩn ax + by = c luôn có vô số nghiệm.',
      'Tập nghiệm của phương trình ax + by = c được biểu diễn bởi đường thẳng ax + by = c trên mặt phẳng tọa độ Oxy.',
      'Hệ hai phương trình bậc nhất hai ẩn có nghiệm chung là giao điểm của hai đường thẳng biểu diễn tập nghiệm.'
    ],
    contentMarkdown: `### 1. Phương trình bậc nhất hai ẩn
* **Định nghĩa**: Phương trình bậc nhất hai ẩn $x$ và $y$ là hệ thức dạng:
  $$ax + by = c$$
  trong đó $a, b, c$ là các số đã biết ($a$ và $b$ không đồng thời bằng 0).
* **Nghiệm của phương trình**: Cặp số $(x_0; y_0)$ thỏa mãn $a x_0 + b y_0 = c$ được gọi là một nghiệm của phương trình.
* **Số nghiệm**: Phương trình bậc nhất hai ẩn luôn có vô số nghiệm. Tập hợp các điểm biểu diễn nghiệm của nó là một đường thẳng trong mặt phẳng tọa độ $Oxy$.

### 2. Hệ hai phương trình bậc nhất hai ẩn
* Cho hệ phương trình:
  $$\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}$$
* Nếu hai đường thẳng cắt nhau: Hệ có nghiệm duy nhất.
* Nếu hai đường thẳng song song: Hệ vô nghiệm.
* Nếu hai đường thẳng trùng nhau: Hệ có vô số nghiệm.`,
    sampleExercises: [
      {
        question: 'Cặp số (1; 2) có phải là nghiệm của phương trình 2x + 3y = 8 không?',
        solution: 'Thay x = 1, y = 2 vào vế trái ta có: 2(1) + 3(2) = 2 + 6 = 8 = Vế phải. Vậy (1; 2) là một nghiệm của phương trình.'
      }
    ]
  },

  // ==========================================================================
  // 2. MÔN NGỮ VĂN (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- VĂN 6 ---
  {
    id: 'van6-b1',
    title: 'Bài 1: Đọc hiểu văn bản "Bài học đường đời đầu tiên" (Trích Dế Mèn phiêu lưu kí - Tô Hoài)',
    subjectId: 'van',
    grade: 6,
    semester: 1,
    chapter: 'Bài 1: Tôi và các bạn',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Ngữ văn 6 Tập 1',
    pageReference: 'Trang 12 - 19',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu đặc điểm truyện đồng thoại: nhân vật loài vật được nhân hóa sinh động.',
      'Phân tích ngoại hình, tính cách kiêu căng của Dế Mèn và hậu quả gây ra cái chết của Dế Choắt.',
      'Rút ra bài học đạo đức về lòng khiêm tốn, biết yêu thương và chịu trách nhiệm về hành vi của mình.'
    ],
    summary: 'Phân tích truyện đồng thoại "Bài học đường đời đầu tiên", nghệ thuật miêu tả loài vật của nhà văn Tô Hoài và bài học ứng xử cho tuổi trẻ.',
    keyPoints: [
      'Thể loại: Truyện đồng thoại - Nhân vật loài vật mang đặc tính sinh học tự nhiên kết hợp đặc điểm tâm lý, tính cách của con người.',
      'Ngôi kể: Ngôi thứ nhất (Dế Mèn tự xưng "tôi"), tạo sự chân thực, gần gũi.',
      'Nghệ thuật miêu tả: Sử dụng hệ thống tính từ, động từ gợi cảm độc đáo (càng mẫm bóng, vuốt cứng, cánh óng ánh).',
      'Ý nghĩa bài học: Thói hung hăng, kiêu ngạo có thể dẫn đến hậu quả tai hại khôn lường.'
    ],
    contentMarkdown: `### 1. Bức tranh chân dung Dế Mèn - chàng dế thanh niên cường tráng
* **Ngoại hình khỏe đẹp**: Đôi càng mẫm bóng, những cái vuốt ở chân cứng dần và nhọn hoắt, đôi cánh dài chấm đuôi, đầu to và nổi từng tảng rất bướng.
* **Hành động tự tin**: Co cẳng lên đạp phanh phách vào các ngọn cỏ, đi đứng oai vệ, nhai ngoàm ngoạp...
* **Điểm hạn chế trong tính cách**: Tự phụ, ngộ nhận sức mạnh của mình, coi thường mọi người xung quanh (đặc biệt là người hàng xóm Dế Choắt gầy gò, ốm yếu).

### 2. Sự việc trêu chọc chị Cốc và cái chết thương tâm của Dế Choắt
* Vì hiếu thắng và muốn chứng tỏ bản thân, Dế Mèn đã hát trêu chị Cốc rồi chui tọt vào hang sâu lẩn trốn.
* Chị Cốc nổi giận đã giáng những nhát mỏ chí mạng xuống Dế Choắt tội nghiệp đang ở ngoài cửa hang.
* **Lời trăng trối của Dế Choắt**: *"Ở đời mà có thói hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn rồi cũng mang vạ vào mình đấy."*

### 3. Sự thức tỉnh và Bài học đường đời đầu tiên
* Đứng trước mộ Dế Choắt, Dế Mèn cúi đầu ăn năn, hối hận tột cùng.
* Dế Mèn học được bài học đắt giá về sự khiêm nhường, thấu hiểu và lòng nhân ái.`,
    sampleExercises: [
      {
        question: 'Hãy chỉ ra tác dụng của ngôi kể thứ nhất trong đoạn trích "Bài học đường đời đầu tiên"?',
        solution: 'Ngôi kể thứ nhất (Dế Mèn xưng "tôi") giúp câu chuyện trở nên chân thực, đáng tin cậy; nhân vật trực tiếp bộc lộ dòng cảm xúc, từ kiêu ngạo đến hối hận ăn năn sâu sắc.'
      }
    ]
  },

  // --- VĂN 7 ---
  {
    id: 'van7-b1',
    title: 'Bài 1: Đọc hiểu văn bản "Người đàn ông cô độc giữa rừng" (Đoàn Giỏi)',
    subjectId: 'van',
    grade: 7,
    semester: 1,
    chapter: 'Bài 1: Bầu trời tuổi thơ',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Ngữ văn 7 Tập 1',
    pageReference: 'Trang 13 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Cảm nhận vẻ đẹp thiên nhiên rừng tràm U Minh và con người Nam Bộ chất phác, hào sảng.',
      'Phân tích nhân vật chú Võ Tòng qua ngoại hình, hành động và tấm lòng yêu nước.',
      'Nắm bắt đặc sắc nghệ thuật miêu tả không gian và ngôn ngữ đậm chất Nam Bộ.'
    ],
    summary: 'Trích đoạn tiểu thuyết "Đất rừng phương Nam" khắc họa hình tượng chú Võ Tòng kiên cường, trượng nghĩa giữa rừng U Minh hoang dã.',
    keyPoints: [
      'Bối cảnh không gian: Căn lều đơn sơ giữa rừng tràm U Minh mênh mông, đậm chất huyền bí.',
      'Nhân vật Võ Tòng: Khuôn mặt có vết sẹo dài vết tích đánh hổ, tính cách bộc trực, phóng khoáng, dũng cảm.',
      'Tấm lòng với kháng chiến: Tự tay rèn mũi tên tẩm thuốc độc giết giặc Pháp bảo vệ quê hương.'
    ],
    contentMarkdown: `### 1. Nhân vật Võ Tòng - người con kiên cường của đất rừng Nam Bộ
* **Hoàn cảnh sống**: Sống một mình trong căn lều lá nép bên gốc cây tràm cổ thụ giữa rừng U Minh hoang vu.
* **Chiến tích đánh hổ**: Từng tay không đả bại hổ dữ cứu dân làng, mang vết sẹo lớn trên má như huân chương của lòng dũng cảm.
* **Khí chất người nghĩa sĩ**: Sẵn sàng chia sẻ thịt nai, can rượu với khách; ngày đêm rèn hàng trăm mũi tên có tẩm độc nọc rắn để cung cấp cho đội du kích đánh giặc.

### 2. Vẻ đẹp tâm hồn chú Võ Tòng
* Tuy bề ngoài dữ dằn, xù xì nhưng chú mang một trái tim đôn hậu, yêu thiên nhiên và gắn bó máu thịt với độc lập của Tổ quốc.`,
    sampleExercises: [
      {
        question: 'Chi tiết chú Võ Tòng trao những mũi tên tẩm thuốc độc cho ông Hai thể hiện phẩm chất gì?',
        solution: 'Chi tiết này thể hiện lòng yêu nước sâu sắc, tinh thần tự nguyện cống hiến cho cuộc kháng chiến chống thực dân Pháp của đồng bào Nam Bộ.'
      }
    ]
  },

  // --- VĂN 8 ---
  {
    id: 'van8-b1',
    title: 'Bài 1: Đọc hiểu văn bản "Lá cờ thêu sáu chữ vàng" (Nguyễn Huy Tưởng)',
    subjectId: 'van',
    grade: 8,
    semester: 1,
    chapter: 'Bài 1: Câu chuyện của lịch sử',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Ngữ văn 8 Tập 1',
    pageReference: 'Trang 10 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu đặc trưng của truyện lịch sử: tôn trọng sự thật lịch sử kết hợp hư cấu nghệ thuật.',
      'Khắc họa chân dung người anh hùng thiếu niên Trần Quốc Toản với tinh thần yêu nước và lòng căm thù giặc sục sôi.',
      'Phân tích chi tiết nghệ thuật bóp nát quả cam giàu ý nghĩa biểu tượng.'
    ],
    summary: 'Hình tượng người anh hùng thiếu niên Trần Quốc Toản tại hội nghị Bình Than với khát vọng xuất quân giết giặc cứu nước và chi tiết bóp nát quả cam.',
    keyPoints: [
      'Thể loại: Truyện lịch sử tái hiện hào khí Đông A thời nhà Trần chống quân xâm lược Nguyên - Mông.',
      'Nhân vật Trần Quốc Toản: Mới 16 tuổi nhưng mang chí khí anh hùng ngút trời, uất ức vì tuổi nhỏ không được dự bàn việc nước.',
      'Chi tiết bóp nát quả cam: Phản ánh sự dồn nén nội tâm tột bậc của lòng căm giặc và ý chí quyết chiến.'
    ],
    contentMarkdown: `### 1. Tâm trạng Trần Quốc Toản khi đứng bên bờ sông Bình Than
* Chàng thiếu niên bồn chồn, sốt ruột khi nhìn thấy thuyền rồng của vua và các vương hầu bàn kế đánh giặc.
* Nỗi trăn trở thiêng liêng: *"Đất nước lâm nguy, sao ta lại có thể đứng ngoài cuộc?"*.

### 2. Cuộc gặp gỡ với vua Trần Nhân Tông và chi tiết bóp nát quả cam
* Vua Trần Nhân Tông khen ngợi chí khí yêu nước nhưng dặn dò chàng vì tuổi còn nhỏ nên chưa thể tham gia quân cơ, thưởng cho một quả cam quý.
* Uất ức vì không được cùng các tướng lĩnh xung trận giết giặc, hai bàn tay Quốc Toản siết chặt, bóp nát quả cam quý lúc nào không hay.
* **Hành động quyết liệt sau đó**: Trở về tập hợp gia nô, thêu lên lá cờ lớn sáu chữ vàng: **"Phá cường địch, báo hoàng ân"**.`,
    sampleExercises: [
      {
        question: 'Ý nghĩa của chi tiết Trần Quốc Toản vô tình bóp nát quả cam?',
        solution: 'Chi tiết thể hiện sự căm giận giặc sục sôi và lòng khao khát cháy bỏng được ra trận cứu nước của người thiếu niên anh hùng.'
      }
    ]
  },

  // --- VĂN 9 ---
  {
    id: 'van9-b1',
    title: 'Bài 1: Đọc hiểu văn bản "Chuyện người con gái Nam Xương" (Nguyễn Dữ)',
    subjectId: 'van',
    grade: 9,
    semester: 1,
    chapter: 'Bài 1: Vẻ đẹp người phụ nữ trong văn học trung đại',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Ngữ văn 9 Tập 1',
    pageReference: 'Trang 11 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Cảm nhận vẻ đẹp phẩm chất truyền thống của nàng Vũ Nương: hiếu thảo, thủy chung, đảm đang.',
      'Hiểu nguyên nhân bi kịch oan khuất của người phụ nữ dưới chế độ phong kiến nam quyền độc đoán.',
      'Phân tích chi tiết cái bóng trên vách và yếu tố kỳ ảo đặc trưng của thể loại truyền kì.'
    ],
    summary: 'Tác phẩm truyền kì mạn lục tiêu biểu phản ánh số phận bi thương nhưng ngời sáng nhân phẩm của Vũ Nương bên dòng sông Hoàng Giang.',
    keyPoints: [
      'Thể loại: Truyện truyền kì - Văn xuôi chữ Hán xen lẫn yếu tố hiện thực và kỳ ảo, hoang đường.',
      'Phẩm chất Vũ Nương: Dung hạnh vẹn toàn, chăm sóc mẹ chồng chu đáo, một lòng son sắt đợi chồng đi lính trở về.',
      'Nút thắt bi kịch: Lời nói ngây thơ của bé Đản và tính đa nghi, ghen tuông mù quáng của Trương Sinh.',
      'Giá trị nhân đạo: Bày tỏ niềm xót thương sâu sắc cho thân phận người phụ nữ trong xã hội cũ.'
    ],
    contentMarkdown: `### 1. Vẻ đẹp nhân phẩm của Vũ Nương
* **Là người vợ thủy chung**: Khi tiễn chồng ra trận, nàng không màng công danh áo gấm, chỉ cầu mong chồng trở về bình an. Trong suốt ba năm xa cách, nàng giữ trọn lòng trinh bạch.
* **Là người con dâu hiếu thảo**: Mẹ chồng ốm, nàng hết lòng thuốc thang, cúng bái; khi mẹ mất, nàng lo liệu tang ma chu tất như cha mẹ đẻ.
* **Là người mẹ hiền thương con**: Một mình nuôi nấng bé Đản, vì sợ con thiếu thốn tình cha nên đã trỏ bóng mình trên vách nói đó là cha Đản.

### 2. Nỗi oan khiên và cái chết bi thảm
* Trương Sinh đi lính về, tính khí ghen tuông gia trưởng, chỉ nghe lời ngây thơ của đứa trẻ ba tuổi đã đánh đuổi vợ ra khỏi nhà mà không cho nàng cơ hội giãi bày.
* Bất lực trước sự bế tắc, Vũ Nương gieo mình xuống dòng sông Hoàng Giang để lấy cái chết minh chứng cho tấm lòng trong sạch.`,
    sampleExercises: [
      {
        question: 'Phân tích vai trò của chi tiết "cái bóng" trong truyện "Chuyện người con gái Nam Xương"?',
        solution: 'Cái bóng vừa là nút thắt mở ra bi kịch oan khuất (qua lời bé Đản), vừa là nút mở cởi bỏ mối oan (khi Trương Sinh nhìn thấy bóng mình trên vách), tạo nên cấu trúc truyện chặt chẽ và kịch tính.'
      }
    ]
  },

  // ==========================================================================
  // 3. MÔN TIẾNG ANH (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- ANH 6 ---
  {
    id: 'eng6-b2',
    title: 'Unit 2: My House - Rooms and Prepositions of Place',
    subjectId: 'tieng-anh',
    grade: 6,
    semester: 1,
    chapter: 'Unit 2: My House',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    bookTitle: 'English 6 Global Success',
    pageReference: 'Pages 16 - 21',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Learn vocabulary about types of houses, rooms, and household furniture.',
      'Master prepositions of place: in, on, behind, under, next to, between, in front of.',
      'Describe your dream house with there is / there are.'
    ],
    summary: 'Vocabulary for rooms in the house, pieces of furniture, and grammar focus on Prepositions of Place and There is / There are.',
    keyPoints: [
      'Types of houses: town house, country house, villa, stilt house, flat.',
      'Prepositions of place: in, on, under, behind, in front of, next to, between A and B.',
      'Grammar: There is + singular noun; There are + plural nouns.'
    ],
    contentMarkdown: `### 1. Vocabulary: Types of Houses & Rooms
* **Rooms**: living room, bedroom, kitchen, bathroom, hall, attic.
* **Furniture**: sofa, wardrobe, cupboard, fridge, cooker, dishwasher, poster.

### 2. Grammar: Prepositions of Place
* **in**: The cat is in the box.
* **on**: The lamp is on the table.
* **next to**: The desk is next to the bed.
* **between**: The bookshelf is between the television and the sofa.
* **behind**: The garden is behind the house.
* **in front of**: There is a big tree in front of My Hoa School.

### 3. Sentence Structure: There is / There are
* **Affirmative**:
  * *There is a microwave in the kitchen.*
  * *There are three picture frames on the wall.*
* **Questions**:
  * *Is there a garden? Yes, there is. / No, there isn't.*
  * *Are there any chairs? Yes, there are. / No, there aren't.*`,
    sampleExercises: [
      {
        question: 'Complete the sentence with "There is" or "There are": ______ two pillows on the bed?',
        solution: 'There are two pillows on the bed (vì two pillows là danh từ số nhiều).'
      }
    ]
  },

  // --- ANH 7 ---
  {
    id: 'eng7-b1',
    title: 'Unit 1: Hobbies - Verbs of Liking and the Present Simple',
    subjectId: 'tieng-anh',
    grade: 7,
    semester: 1,
    chapter: 'Unit 1: Hobbies',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    bookTitle: 'English 7 Global Success',
    pageReference: 'Pages 8 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Acquire vocabulary about hobbies: gardening, making models, horse riding, collecting stamps.',
      'Use verbs of liking/disliking followed by Gerunds (V-ing).',
      'Talk about personal benefits of hobbies.'
    ],
    summary: 'Explore interesting hobbies, express preferences using like, love, enjoy, hate + V-ing, and review the Present Simple tense.',
    keyPoints: [
      'Hobbies vocabulary: gardening, pottery making, bird watching, cycling, origami.',
      'Verbs of liking: like, love, adore, enjoy, fancy + V-ing.',
      'Verbs of disliking: dislike, hate, detest + V-ing.'
    ],
    contentMarkdown: `### 1. Vocabulary: Common Hobbies
* **Indoor hobbies**: playing chess, making origami, cooking, collecting coins.
* **Outdoor hobbies**: horse riding, gardening, roller-skating, playing badminton.

### 2. Verbs of liking / disliking + Gerund (V-ing)
* When following verbs of preference, we usually use the **V-ing** form:
  * *I **love gardening** because it makes me feel peaceful.*
  * *Nam **enjoys playing** soccer with his classmates after school.*
  * *My sister **hates doing** the dishes in winter.*

### 3. Benefits of Hobbies
* Hobbies help us reduce stress, develop creativity, stay healthy, and make new friends.`,
    sampleExercises: [
      {
        question: 'Put the verb in brackets into the correct form: She enjoys (make) ______ ceramic pots in her free time?',
        solution: 'She enjoys making ceramic pots in her free time.'
      }
    ]
  },

  // --- ANH 8 ---
  {
    id: 'eng8-b1',
    title: 'Unit 1: Leisure Time - Expressing Preferences & Leisure Activities',
    subjectId: 'tieng-anh',
    grade: 8,
    semester: 1,
    chapter: 'Unit 1: Leisure Time',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    bookTitle: 'English 8 Global Success',
    pageReference: 'Pages 8 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Learn phrases for leisure activities: hanging out, surfing the net, doing DIY, messaging friends.',
      'Differentiate between V-ing and to-infinitive after verbs of liking.',
      'Discuss healthy balance between online and offline leisure activities.'
    ],
    summary: 'Modern leisure activities among teenagers, using verbs of liking/disliking with gerunds or infinitives.',
    keyPoints: [
      'Leisure activities: doing DIY (Do-it-yourself), browsing social media, crafting.',
      'Verbs taking both V-ing and to-V with little difference in meaning: like, love, prefer, hate.'
    ],
    contentMarkdown: `### 1. Vocabulary: Teen Leisure Activities
* *doing DIY*: making handicrafts or repairing things by yourself.
* *hanging out with friends*: spending relaxed time with peers.
* *surfing the internet*: finding information or watching funny videos online.

### 2. Grammar: Verbs of Liking with to-Infinitive and Gerund
* *I prefer **reading** books to **watching** TV.*
* *Tom prefers **to stay** at home on rainy weekends.*`,
    sampleExercises: [
      {
        question: 'Choose the correct form: Minh is crazy about (play / playing) video games?',
        solution: 'playing (vì sau giới từ "about" luôn đi kèm V-ing).'
      }
    ]
  },

  // --- ANH 9 ---
  {
    id: 'eng9-b1',
    title: 'Unit 1: Local Community - Traditional Crafts and Phrasal Verbs',
    subjectId: 'tieng-anh',
    grade: 9,
    semester: 1,
    chapter: 'Unit 1: Local Community',
    bookSeries: 'Global Success (Bộ GD&ĐT)',
    bookTitle: 'English 9 Global Success',
    pageReference: 'Pages 8 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Master vocabulary of traditional handicrafts and local artisan communities.',
      'Understand and use common Phrasal Verbs in context (look after, pass down, close down, turn up).',
      'Appreciate cultural preservation in Vietnam.'
    ],
    summary: 'Discovering traditional craft villages across Vietnam, specialized artisans, and practicing high-frequency phrasal verbs.',
    keyPoints: [
      'Traditional crafts: pottery, lacquerware, conical hat making, silk weaving.',
      'Phrasal verbs: pass down (truyền lại), look after (chăm sóc), set off (khởi hành), live on (sống dựa vào).'
    ],
    contentMarkdown: `### 1. Traditional Craft Villages
* **Bat Trang**: Famous for ceramic pottery.
* **Van Phuc**: Renowned for authentic Vietnamese silk weaving.
* **Tay Ho (Hue)**: Well-known for poetic conical hats (nón lá bài thơ).

### 2. Phrasal Verbs (Cụm động từ)
* A phrasal verb consists of a verb and a particle (preposition or adverb):
  * **pass down**: *The secret of making this lacquerware is passed down from generation to generation.*
  * **look forward to + V-ing**: *Students are looking forward to visiting the pottery village.*
  * **deal with**: *Local artisans have to deal with high raw material costs.*`,
    sampleExercises: [
      {
        question: 'Replace the underlined word with a suitable phrasal verb: "This craft has been handed over from fathers to sons"?',
        solution: 'handed over can be replaced by "passed down".'
      }
    ]
  },

  // ==========================================================================
  // 4. MÔN KHOA HỌC TỰ NHIÊN (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- KHTN 6 ---
  {
    id: 'khtn6-b2',
    title: 'Bài 2: Các thể của chất và sự chuyển thể',
    subjectId: 'khtn',
    grade: 6,
    semester: 1,
    chapter: 'Chương 2: Các thể của chất',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK KHTN 6',
    pageReference: 'Trang 25 - 31',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nêu được đặc điểm cơ bản về hình dạng và thể tích của 3 thể: rắn, lỏng, khí.',
      'Mô tả các quá trình chuyển thể: nóng chảy, đông đặc, bay hơi, ngưng tụ, sôi.',
      'Giải thích hiện tượng vòng tuần hoàn của nước trong tự nhiên.'
    ],
    summary: 'Tìm hiểu đặc điểm cấu tạo phân tử ở thể rắn, lỏng, khí và các hiện tượng chuyển thể trong đời sống hàng ngày.',
    keyPoints: [
      'Thể rắn: Các hạt liên kết chặt chẽ, có hình dạng và thể tích xác định, rất khó bị nén.',
      'Thể lỏng: Các hạt liên kết lỏng lẻo hơn, có thể tích xác định nhưng hình dạng phụ thuộc bình chứa.',
      'Thể khí (hơi): Các hạt chuyển động hỗn loạn tự do, không có hình dạng và thể tích xác định, rất dễ bị nén.',
      'Sự chuyển thể: Nóng chảy (rắn -> lỏng), Đông đặc (lỏng -> rắn), Bay hơi (lỏng -> khí), Ngưng tụ (khí -> lỏng).'
    ],
    contentMarkdown: `### 1. Ba thể cơ bản của chất
Mọi vật thể xung quanh chúng ta đều được cấu tạo từ các chất. Một chất có thể tồn tại ở ba thể:
* **Thể rắn (Solid)**: Có hình dạng và thể tích xác định. Ví dụ: Viên bi sắt, khối nước đá, quyển sách.
* **Thể lỏng (Liquid)**: Có thể tích xác định nhưng không có hình dạng xác định (chiếm hình dạng của phần bình chứa nó). Ví dụ: Nước uống, dầu ăn, xăng.
* **Thể khí (Gas)**: Không có hình dạng và thể tích xác định, lan tỏa chiếm toàn bộ thể tích bình chứa. Ví dụ: Không khí, hơi nước, khí oxygen.

### 2. Sự chuyển thể của chất
* **Nóng chảy**: Quá trình chất chuyển từ thể rắn sang thể lỏng khi được đun nóng (đá tan thành nước ở 0 độ C).
* **Đông đặc**: Quá trình chất chuyển từ thể lỏng sang thể rắn khi được làm lạnh.
* **Bay hơi**: Quá trình chất chuyển từ thể lỏng sang thể khí diễn ra ở bề mặt chất lỏng (nước bốc hơi từ ao hồ).
* **Ngưng tụ**: Quá trình chất chuyển từ thể khí sang thể lỏng khi gặp lạnh (sương đọng trên lá cây ban sớm).`,
    sampleExercises: [
      {
        question: 'Tại sao khi đun nước sôi ta thấy có các giọt nước li ti bám dưới mặt dưới của nắp vung?',
        solution: 'Vì hơi nước nóng bốc lên chạm vào mặt nắp vung có nhiệt độ thấp hơn nên ngưng tụ thành các giọt nước lỏng.'
      }
    ]
  },

  // --- KHTN 7 ---
  {
    id: 'khtn7-b1',
    title: 'Bài 1: Nguyên tử và cấu tạo nguyên tử',
    subjectId: 'khtn',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề 1: Nguyên tử - Nguyên tố hóa học',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK KHTN 7',
    pageReference: 'Trang 14 - 19',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Trình bày mô hình nguyên tử của Rutherford - Bohr.',
      'Nêu cấu tạo nguyên tử gồm hạt nhân mang điện dương và lớp vỏ electron mang điện âm.',
      'Giải thích nguyên tử trung hòa về điện (số proton = số electron).'
    ],
    summary: 'Nguyên tử là hạt vô cùng nhỏ bé và trung hòa về điện, cấu tạo gồm hạt nhân chứa proton (p), neutron (n) và vỏ chứa các electron (e).',
    keyPoints: [
      'Nguyên tử gồm hạt nhân ở trung tâm và lớp vỏ có các electron quay xung quanh.',
      'Hạt nhân gồm proton mang điện tích +1 và neutron không mang điện.',
      'Lớp vỏ gồm các electron mang điện tích -1 chuyển động rất nhanh quanh hạt nhân.',
      'Trong nguyên tử: Số proton = Số electron nên nguyên tử trung hòa về điện.'
    ],
    contentMarkdown: `### 1. Mô hình nguyên tử Rutherford - Bohr
* Nguyên tử có kích thước vô cùng nhỏ bé (khoảng $10^{-10}$ mét).
* Cấu trúc nguyên tử tương tự như hệ Mặt Trời thu nhỏ:
  * **Hạt nhân** nằm ở trung tâm (như Mặt Trời).
  * **Các electron** chuyển động xung quanh hạt nhân trên những quỹ đạo xác định tạo thành các lớp electron (như các hành tinh).

### 2. Khối lượng và kích thước nguyên tử
* Khối lượng của electron rất nhỏ (chỉ bằng khoảng 1/1836 khối lượng proton), do đó khối lượng của nguyên tử hầu như tập trung toàn bộ ở hạt nhân.`,
    sampleExercises: [
      {
        question: 'Một nguyên tử Carbon có 6 proton trong hạt nhân. Hỏi nguyên tử Carbon có bao nhiêu electron ở lớp vỏ?',
        solution: 'Vì nguyên tử trung hòa về điện (số p = số e), nên nguyên tử Carbon có đúng 6 electron ở lớp vỏ.'
      }
    ]
  },

  // --- KHTN 8 ---
  {
    id: 'khtn8-b1',
    title: 'Bài 1: Biến đổi vật lý và biến đổi hóa học. Phản ứng hóa học',
    subjectId: 'khtn',
    grade: 8,
    semester: 1,
    chapter: 'Chương 1: Phản ứng hóa học',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK KHTN 8',
    pageReference: 'Trang 10 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Phân biệt hiện tượng biến đổi vật lý và biến đổi hóa học.',
      'Nhận biết các dấu hiệu chứng tỏ có phản ứng hóa học xảy ra (đổi màu, sinh khí, tạo kết tủa, tỏa nhiệt).',
      'Viết phương trình chữ của phản ứng hóa học.'
    ],
    summary: 'Biến đổi vật lý không tạo ra chất mới, biến đổi hóa học có tạo ra chất mới. Phản ứng hóa học là quá trình biến đổi chất này thành chất khác.',
    keyPoints: [
      'Biến đổi vật lý: Chất bị biến đổi về hình dạng, kích thước, trạng thái nhưng vẫn giữ nguyên là chất ban đầu.',
      'Biến đổi hóa học: Có sự biến đổi từ chất này thành chất khác (có chất mới sinh ra).',
      'Dấu hiệu có phản ứng hóa học: Xuất hiện chất khí, chất kết tủa, thay đổi màu sắc, tỏa nhiệt hoặc phát sáng.'
    ],
    contentMarkdown: `### 1. Sự biến đổi chất
* **Hiện tượng vật lý**: Khi hòa tan đường vào nước, nước đường vẫn giữ vị ngọt của đường. Khi bẻ cong thanh sắt, thanh sắt chỉ đổi hình dạng. Đó là biến đổi vật lý vì không có chất mới tạo thành.
* **Hiện tượng hóa học**: Khi đốt cháy mẩu than trong không khí tạo ra khí carbon dioxide; đinh sắt để lâu trong không khí ẩm bị gỉ sét màu nâu đỏ. Đó là biến đổi hóa học vì đã tạo thành chất mới hoàn toàn.

### 2. Định luật bảo toàn khối lượng
* Trong một phản ứng hóa học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất tham gia phản ứng.`,
    sampleExercises: [
      {
        question: 'Hiện tượng nào sau đây là biến đổi hóa học: a) Băng tan ở hai cực; b) Thức ăn bị ôi thiu?',
        solution: 'a) Băng tan là biến đổi vật lý (chuyển thể từ rắn sang lỏng). b) Thức ăn ôi thiu là biến đổi hóa học (vi khuẩn phân hủy tạo ra các chất mới có mùi chua, độc).'
      }
    ]
  },

  // --- KHTN 9 ---
  {
    id: 'khtn9-b1',
    title: 'Bài 1: Công cơ học và Công suất',
    subjectId: 'khtn',
    grade: 9,
    semester: 1,
    chapter: 'Chương 1: Năng lượng cơ học',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK KHTN 9',
    pageReference: 'Trang 8 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết điều kiện để có công cơ học: có lực tác dụng vào vật và vật dịch chuyển theo phương của lực.',
      'Áp dụng công thức tính công A = F . s và đơn vị Jun (J).',
      'Hiểu khái niệm công suất P = A / t đặc trưng cho tốc độ sinh công.'
    ],
    summary: 'Khái niệm công cơ học, công thức tính công A = F.s, đơn vị Jun và ý nghĩa vật lý của công suất.',
    keyPoints: [
      'Công cơ học chỉ xuất hiện khi có lực tác dụng vào vật và làm vật dịch chuyển: A = F . s.',
      'Đơn vị của công là Jun (J): 1 J = 1 N . 1 m.',
      'Công suất (P) xác định bằng công thực hiện được trong một đơn vị thời gian: P = A / t (đơn vị Oát - W).'
    ],
    contentMarkdown: `### 1. Khi nào có công cơ học?
* Thuật ngữ công cơ học chỉ dùng trong trường hợp có **lực tác dụng** lên vật và vật **chuyển dời** theo phương không vuông góc với phương của lực.
* **Công thức tính công cơ học**:
  $$A = F \\cdot s$$
  Trong đó:
  * $A$: Công của lực $F$ (đơn vị: Jun - $\\text{J}$).
  * $F$: Lực tác dụng vào vật (đơn vị: Niutơn - $\\text{N}$).
  * $s$: Quãng đường vật dịch chuyển (đơn vị: mét - $\\text{m}$).

### 2. Công suất
* Công suất là đại lượng đặc trưng cho mức độ thực hiện công nhanh hay chậm của người hoặc máy móc:
  $$\\mathcal{P} = \\frac{A}{t}$$
* Đơn vị công suất là Oát (Watt, ký hiệu là $\\text{W}$). $1 \\text{ kW} = 1000 \\text{ W}$.`,
    sampleExercises: [
      {
        question: 'Một học sinh kéo một xô nước có trọng lượng 50N lên cao 3m. Tính công thực hiện được?',
        solution: 'Công thực hiện là: A = F . s = 50N . 3m = 150 Jun (J).'
      }
    ]
  },

  // ==========================================================================
  // 5. MÔN LỊCH SỬ VÀ ĐỊA LÍ (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- SỬ ĐỊA 6 ---
  {
    id: 'lsdl6-b1',
    title: 'Bài 1: Nguồn gốc loài người và dấu tích người nguyên thủy ở Việt Nam',
    subjectId: 'lich-su-dia-ly',
    grade: 6,
    semester: 1,
    chapter: 'Phần Lịch sử: Xã hội nguyên thủy',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Lịch sử và Địa lí 6',
    pageReference: 'Trang 14 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Trình bày được quá trình tiến hóa từ Vượn người thành Người tối cổ rồi thành Người tinh khôn.',
      'Xác định các địa điểm khảo cổ phát hiện dấu tích Người tối cổ trên lãnh thổ Việt Nam (Thẩm Khuyên, Núi Đọ, An Khê).',
      'Đánh giá vai trò của lao động trong quá trình hoàn thiện cơ thể người.'
    ],
    summary: 'Quá trình tiến hóa hàng triệu năm của loài người và những phát hiện khảo cổ học vô giá khẳng định Việt Nam là một trong những cái nôi người cổ.',
    keyPoints: [
      'Tiến trình tiến hóa: Vượn người (khoảng 5-6 triệu năm trước) -> Người tối cổ (khoảng 4 triệu năm) -> Người tinh khôn (khoảng 15 vạn năm).',
      'Phát minh quan trọng nhất: Thuần hóa và sử dụng lửa giúp sưởi ấm, xua đuổi thú dữ và ăn chín.',
      'Dấu tích tại Việt Nam: Hang Thẩm Khuyên, Thẩm Hai (Lạng Sơn), Núi Đọ (Thanh Hóa), Rộc Tưng (An Khê - Gia Lai).'
    ],
    contentMarkdown: `### 1. Quá trình tiến hóa từ Vượn người thành Người
* **Vượn người**: Sống cách ngày nay khoảng 5 - 6 triệu năm, có thể đi bằng hai chi sau nhưng thể tích não còn nhỏ.
* **Người tối cổ**: Xuất hiện khoảng 4 triệu năm trước, đã hoàn toàn đi đứng bằng hai chân, đôi bàn tay giải phóng để cầm nắm công cụ ghè đẽo bằng đá.
* **Người tinh khôn**: Xuất hiện khoảng 15 vạn năm trước, cấu tạo cơ thể cơ bản giống như người ngày nay, thể tích não phát triển lớn.

### 2. Dấu tích của Người nguyên thủy trên đất nước Việt Nam
* Các nhà khảo cổ học đã tìm thấy răng của Người tối cổ tại hang Thẩm Khuyên, Thẩm Hai (Lạng Sơn) có niên đại 30-40 vạn năm.
* Rìu đá ghè đẽo thô sơ được phát hiện tại Núi Đọ (Thanh Hóa) và An Khê (Gia Lai).`,
    sampleExercises: [
      {
        question: 'Tại sao việc phát minh ra lửa được coi là bước ngoặt vĩ đại nhất trong lịch sử tiến hóa của loài người?',
        solution: 'Lửa giúp con người sưởi ấm trong mùa đông khắc nghiệt, xua đuổi thú dữ ăn thịt, nướng chín thức ăn giúp não bộ phát triển nhanh hơn.'
      }
    ]
  },

  // --- SỬ ĐỊA 7 ---
  {
    id: 'lsdl7-b1',
    title: 'Bài 1: Sự hình thành và phát triển của xã hội phong kiến ở Tây Âu',
    subjectId: 'lich-su-dia-ly',
    grade: 7,
    semester: 1,
    chapter: 'Chương 1: Tây Âu từ thế kỉ V đến nửa đầu thế kỉ XVI',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Lịch sử và Địa lí 7',
    pageReference: 'Trang 10 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nêu được sự sụp đổ của đế quốc La Mã và các vương quốc của người Man tộc.',
      'Phân tích hai giai cấp cơ bản trong xã hội phong kiến Tây Âu: Lãnh chúa phong kiến và Nông nô.',
      'Hiểu đặc điểm kinh tế tự cấp tự túc trong lãnh địa phong kiến.'
    ],
    summary: 'Quá trình xác lập chế độ phong kiến Tây Âu sau khi đế chế La Mã tan rã, đặc điểm lãnh địa phong kiến khép kín và thành thị trung đại.',
    keyPoints: [
      'Hai giai cấp cơ bản: Lãnh chúa (nắm ruộng đất, quyền lực, bóc lột) và Nông nô (phụ thuộc, nộp tô thuế nặng nề).',
      'Lãnh địa phong kiến: Đơn vị kinh tế - chính trị khép kín, tự cung tự cấp của lãnh chúa.',
      'Thành thị trung đại ra đời (thế kỉ XI) phá vỡ tính cát cứ khép kín, thúc đẩy kinh tế hàng hóa phát triển.'
    ],
    contentMarkdown: `### 1. Sự hình thành chế độ phong kiến Tây Âu
* Cuối thế kỉ V, các bộ tộc người Giéc-man từ phương Bắc tràn xuống tiêu diệt đế quốc La Mã cổ đại.
* Tướng lĩnh quân sự và quý tộc Giéc-man chiếm đoạt ruộng đất màu mỡ, được phong tước vị, trở thành tầng lớp **Lãnh chúa phong kiến**.
* Nông dân bị cướp ruộng đất biến thành **Nông nô**, phải phụ thuộc vào lãnh chúa.

### 2. Lãnh địa phong kiến Tây Âu
* Mỗi lãnh địa là một pháo đài kiên cố có hào sâu bao quanh, có lâu đài, nhà thờ và ruộng đất canh tác.
* Mọi nhu cầu từ thức ăn, vải vóc, vũ khí đều do nông nô tự sản xuất bên trong lãnh địa, không trao đổi buôn bán với bên ngoài.`,
    sampleExercises: [
      {
        question: 'Tại sao nói "Thành thị trung đại là những bông hoa rực rỡ nhất của thời kì trung cổ"?',
        solution: 'Vì thành thị đem lại không khí tự do, giải phóng nông nô khỏi xiềng xích phong kiến, phát triển thương mại và khai sinh các trường đại học đầu tiên.'
      }
    ]
  },

  // ==========================================================================
  // 6. MÔN GIÁO DỤC CÔNG DÂN (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- GDCD 6 ---
  {
    id: 'gdcd6-b1',
    title: 'Bài 1: Tự hào về truyền thống gia đình, dòng họ',
    subjectId: 'gdcd',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề: Tự hào truyền thống quê hương, gia đình',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK GDCD 6',
    pageReference: 'Trang 5 - 9',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu được thế nào là truyền thống gia đình, dòng họ tốt đẹp (hiếu học, cần cù, nhân nghĩa, yêu nước, giữ nghề truyền thống).',
      'Nhận thức được ý nghĩa của truyền thống gia đình đối với sự trưởng thành của mỗi cá nhân.',
      'Có hành động cụ thể để giữ gìn và phát huy truyền thống vẻ vang của dòng họ mình.'
    ],
    summary: 'Giáo dục lòng tự hào về truyền thống tốt đẹp của gia đình, quê hương và trách nhiệm của học sinh trong việc phát huy những giá trị đạo đức quý báu.',
    keyPoints: [
      'Truyền thống gia đình, dòng họ là những giá trị tốt đẹp được truyền từ đời này sang đời khác.',
      'Các truyền thống tiêu biểu: Hiếu học, hiếu thảo, cần cù lao động, yêu thương đùm bọc, nghề thủ công truyền thống.',
      'Trách nhiệm học sinh: Cố gắng chăm ngoan, học giỏi, không làm điều gì tổn hại đến danh dự gia đình.'
    ],
    contentMarkdown: `### 1. Truyền thống gia đình, dòng họ là gì?
* Là những giá trị văn hóa, đạo đức, nghề nghiệp tốt đẹp được vun đắp, gìn giữ và lưu truyền qua nhiều thế hệ.
* **Ví dụ**:
  * Gia đình có truyền thống hiếu học, nhiều thế hệ đỗ đạt làm thầy giáo, bác sĩ cống hiến cho xã hội.
  * Dòng họ giữ gìn nghề gia truyền như nghề làm gốm, dệt chiếu, bốc thuốc nam cứu người.

### 2. Ý nghĩa và trách nhiệm của thế hệ trẻ
* Tự hào về truyền thống tiếp thêm cho chúng ta sự tự tin, động lực vượt qua khó khăn để vươn lên thành công.
* Học sinh Trường THCS Mỹ Hòa cần không ngừng tu dưỡng đạo đức, kính yêu ông bà cha mẹ để làm rạng danh gia đình.`,
    sampleExercises: [
      {
        question: 'Nếu trong dòng họ của em có nghề truyền thống nhưng hiện nay ít người theo, em sẽ có thái độ và hành động như thế nào?',
        solution: 'Em sẽ tôn trọng, tìm hiểu sâu sắc về nghề đó, giới thiệu vẻ đẹp của nghề truyền thống tới bạn bè và cân nhắc việc học tập cải tiến để giữ nghề.'
      }
    ]
  },

  // ==========================================================================
  // 7. MÔN CÔNG NGHỆ (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- CÔNG NGHỆ 6 ---
  {
    id: 'congnghe6-b1',
    title: 'Bài 1: Khái quát về nhà ở và ngôi nhà thông minh (Smart Home)',
    subjectId: 'cong-nghe',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Nhà ở',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Công nghệ 6',
    pageReference: 'Trang 7 - 13',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nêu vai trò của nhà ở đối với đời sống con người.',
      'Nhận biết các khu vực chức năng trong nhà ở và cấu trúc xây dựng cơ bản.',
      'Trình bày đặc điểm của ngôi nhà thông minh: tiện nghi, an toàn và tiết kiệm năng lượng.'
    ],
    summary: 'Tìm hiểu vai trò của nhà ở, kiến trúc nhà đặc trưng ở Việt Nam và xu hướng ngôi nhà thông minh ứng dụng công nghệ số hiện đại.',
    keyPoints: [
      'Vai trò nhà ở: Nơi trú ngụ, bảo vệ con người trước các tác động thời tiết, thiên tai; nơi sinh hoạt ấm cúng của gia đình.',
      'Kiến trúc nhà ở Việt Nam: Nhà nông thôn truyền thống, nhà phố, nhà chung cư cao tầng, nhà sàn vùng cao.',
      'Ngôi nhà thông minh (Smart Home): Được trang bị hệ thống tự động hóa điều khiển đèn, nhiệt độ, khóa cửa bằng điện thoại hoặc giọng nói.'
    ],
    contentMarkdown: `### 1. Vai trò của nhà ở
* Nhà ở là công trình xây dựng phục vụ nhu cầu sinh hoạt của con người, đem lại cảm giác bình yên, thư giãn sau giờ học tập và làm việc.
* Các khu vực chính trong nhà: Phòng khách, phòng ngủ, phòng bếp - ăn, khu vệ sinh, ban công...

### 2. Đặc điểm của Ngôi nhà thông minh (Smart Home)
* **Tiện nghi vượt trội**: Tự động bật đèn khi có người bước vào phòng, rèm cửa mở khi trời sáng.
* **Tiết kiệm năng lượng**: Tự động tắt máy lạnh khi không có người trong phòng, dùng pin năng lượng mặt trời.
* **An ninh an toàn**: Hệ thống camera báo động gửi cảnh báo khẩn cấp về điện thoại khi có người lạ đột nhập.`,
    sampleExercises: [
      {
        question: 'Hãy kể tên 3 thiết bị tự động trong ngôi nhà thông minh mà em biết?',
        solution: 'Đèn cảm ứng chuyển động, khóa cửa nhận diện vân tay/khuôn mặt, robot hút bụi tự động.'
      }
    ]
  },

  // ==========================================================================
  // 8. MÔN NGHỆ THUẬT (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- NGHỆ THUẬT 6 ---
  {
    id: 'nghethuat6-b1',
    title: 'Bài 1: Khám phá các yếu tố tạo hình trong Mĩ thuật (Chấm, nét, hình, mảng, màu sắc)',
    subjectId: 'nghe-thuat',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề: Các yếu tố tạo hình Mĩ thuật',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Nghệ thuật 6',
    pageReference: 'Trang 8 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết các yếu tố tạo hình cơ bản trong mĩ thuật: chấm, nét, hình, mảng, màu sắc, không gian.',
      'Biết cách phối hợp các nét vẽ thẳng, cong, gấp khúc để thể hiện cảm xúc trong tranh.',
      'Sáng tạo bức tranh sinh động về trường lớp THCS Mỹ Hòa.'
    ],
    summary: 'Tìm hiểu ngôn ngữ thị giác cơ bản của hội họa: chấm, nét, hình, mảng, hòa sắc màu nóng - màu lạnh và thực hành sáng tạo nghệ thuật.',
    keyPoints: [
      'Chấm: Yếu tố tạo hình cơ bản nhất, tập hợp nhiều chấm tạo nên sắc độ và khối.',
      'Nét: Chuyển động của chấm, có nét thẳng, nét lượn sóng, nét đứt, biểu thị cảm xúc mạnh mẽ hoặc êm dịu.',
      'Màu sắc: Màu cơ bản (Đỏ, Vàng, Lam), màu nhị hợp (Cam, Lục, Tím), gam màu nóng gợi ấm áp, gam màu lạnh gợi mát mẻ.'
    ],
    contentMarkdown: `### 1. Ngôn ngữ tạo hình trong Mĩ thuật
* Bất kỳ một bức tranh nghệ thuật nào cũng được tạo nên từ sự kết hợp hài hòa của các yếu tố cơ bản:
  * **Chấm**: Điểm xuất phát của mọi hình ảnh thị giác.
  * **Nét vẽ**: Định hình ranh giới, biểu đạt cảm xúc và nhịp điệu của tác phẩm.
  * **Hình và Mảng**: Không gian hai chiều được bao bọc bởi các đường nét khép kín.
  * **Màu sắc**: Đem lại sức sống và truyền tải rung cảm tâm hồn của người họa sĩ.

### 2. Hòa sắc và ứng dụng
* Phối màu tương phản (Đỏ - Lục, Vàng - Tím) tạo ấn tượng nổi bật.
* Phối màu tương đồng mang lại cảm giác êm dịu, hài hòa.`,
    sampleExercises: [
      {
        question: 'Ba màu cơ bản (màu gốc) trong hội họa là những màu nào?',
        solution: 'Ba màu cơ bản là: Đỏ (Red), Vàng (Yellow) và Lam (Blue).'
      }
    ]
  },

  // ==========================================================================
  // 9. MÔN GIÁO DỤC THỂ CHẤT (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- THỂ CHẤT 6 ---
  {
    id: 'thechat6-b1',
    title: 'Bài 1: Kỹ thuật Đội hình đội ngũ và Bài tập thể dục phát triển chung',
    subjectId: 'giao-duc-the-chat',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề: Đội hình đội ngũ & Thể dục rèn luyện',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Giáo dục thể chất 6',
    pageReference: 'Trang 6 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Thực hiện chuẩn xác khẩu lệnh và động tác: Đứng nghiêm, đứng nghỉ, quay phải, quay trái, quay đằng sau.',
      'Biết cách dóng hàng dọc, dóng hàng ngang, điểm số báo cáo.',
      'Thuộc và tập đều các động tác vươn thở, tay, chân, lườn trong bài thể dục buổi sáng.'
    ],
    summary: 'Rèn luyện tác phong nhanh nhẹn, kỷ luật tập thể qua các bài tập đội hình đội ngũ và bài thể dục phát triển thể lực toàn diện.',
    keyPoints: [
      'Đứng nghiêm: Gót chân chạm nhau, hai bàn chân mở hình chữ V góc khoảng 60 độ, ngực ưỡn, mắt nhìn thẳng.',
      'Quay phải: Lấy gót chân phải và mũi chân trái làm trụ, quay một góc 90 độ sang phải.',
      'Khởi động kỹ các khớp cổ tay, cổ chân, khớp gối trước khi vận động mạnh để tránh chấn thương.'
    ],
    contentMarkdown: `### 1. Ý nghĩa của rèn luyện thể chất
* Thể dục thể thao giúp tăng cường sức đề kháng, phát triển chiều cao, giữ cho tinh thần luôn tỉnh táo và sảng khoái trong học tập.

### 2. Kỹ thuật Đội hình đội ngũ căn bản
1. **Khẩu lệnh "Nghiêm!"**: Thân người đứng thẳng, hai tay buông thẳng tự nhiên, các ngón tay khép hờ.
2. **Khẩu lệnh "Nghỉ!"**: Dồn trọng tâm sang một chân, chân kia hơi chùng xuống tự nhiên.
3. **Kỹ thuật quay đằng sau**: Quay một góc 180 độ từ bên phải ra sau, lấy gót chân phải và mũi chân trái làm trụ.`,
    sampleExercises: [
      {
        question: 'Tại sao trước khi chạy bền hoặc đá bóng, chúng ta bắt buộc phải khởi động kỹ các khớp?',
        solution: 'Khởi động giúp làm nóng cơ bắp, tăng lượng máu lưu thông đến các chi và tiết chất nhờn ở ổ khớp, giúp tránh trật khớp, chuột rút và căng cơ.'
      }
    ]
  },

  // ==========================================================================
  // 10. MÔN HOẠT ĐỘNG TRẢI NGHIỆM (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- HĐTN 6 ---
  {
    id: 'hdtn6-b1',
    title: 'Chủ đề 1: Khám phá trường THCS Mỹ Hòa và Xây dựng nếp sống học tập tự giác',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Em với nhà trường',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    bookTitle: 'SGK Hoạt động trải nghiệm 6',
    pageReference: 'Trang 5 - 11',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Tìm hiểu truyền thống và các phòng ban, thư viện, phòng máy tính của Trường THCS Mỹ Hòa.',
      'Lập thời gian biểu khoa học cân đối giữa học tập, thể thao và giúp đỡ gia đình.',
      'Rèn luyện kỹ năng tự phục vụ và xây dựng tình bạn đoàn kết, gắn bó trong lớp.'
    ],
    summary: 'Hướng dẫn học sinh lớp 6 nhanh chóng thích nghi với môi trường trung học cơ sở, xây dựng phương pháp học tập chủ động và văn hóa ứng xử học đường.',
    keyPoints: [
      'Khác biệt giữa Tiểu học và THCS: Nhiều môn học hơn, nhiều thầy cô bộ môn phụ trách, cần tính tự học cao.',
      'Nguyên tắc quản lý thời gian hiệu quả: Lập danh sách việc cần làm (To-do list), ưu tiên việc quan trọng trước.',
      'Văn hóa học đường Mỹ Hòa: Kính thầy, mến bạn, giữ gìn vệ sinh khuôn viên trường lớp xanh - sạch - đẹp.'
    ],
    contentMarkdown: `### 1. Thích ứng với môi trường học tập mới tại THCS Mỹ Hòa
* Bước vào lớp 6 là một bước ngoặt lớn. Các em được học tập với nhiều thầy cô giáo viên bộ môn tâm huyết, tham gia các phòng thực hành thí nghiệm và câu lạc bộ Tin học sáng tạo.
* **Bí quyết hòa nhập**: Hãy cởi mở mỉm cười chào hỏi thầy cô, chủ động giúp đỡ bạn bè cùng bàn và tích cực giơ tay phát biểu xây dựng bài.

### 2. Thiết lập Thời gian biểu cá nhân
* **Buổi sáng**: Thức dậy lúc 6h00, tập thể dục, ăn sáng đầy đủ dinh dưỡng và có mặt tại trường trước 6h45.
* **Buổi chiều**: Tham gia các hoạt động thể thao (cầu lông, bóng rổ), phụ giúp cha mẹ việc nhà.
* **Buổi tối**: Dành 2 tiếng ôn bài và chuẩn bị sách vở cho ngày hôm sau theo đúng thời khóa biểu.`,
    sampleExercises: [
      {
        question: 'Hãy nêu 3 thói quen học tập tốt mà một học sinh lớp 6 cần rèn luyện ngay từ đầu năm học?',
        solution: '1. Ghi chép bài đầy đủ và ôn lại bài ngay trong ngày; 2. Tự giác làm bài tập về nhà trước khi chơi game; 3. Chủ động hỏi thầy cô những phần kiến thức chưa hiểu rõ.'
      }
    ]
  }
];
