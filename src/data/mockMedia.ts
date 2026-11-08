import { LessonMedia } from '../types';

export const INITIAL_LESSON_MEDIA: LessonMedia[] = [
  // Tin học 6 - Bài 1
  {
    id: 'media-tin6-b1-v1',
    lessonId: 'tin6-b1',
    type: 'video',
    title: 'Video Bài giảng: Khái niệm Thông tin và Dữ liệu trong thế giới số',
    description: 'Video trực quan minh họa sự khác biệt giữa thông tin, dữ liệu và vật mang tin trong đời sống hàng ngày của học sinh THCS Mỹ Hòa.',
    sourceUrl: 'https://www.youtube.com/watch?v=0h5Gpn_Vp80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/0h5Gpn_Vp80?rel=0&autoplay=0',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Thầy Nguyễn Văn An (Tổ Tin học)',
    createdAt: '2026-10-15T08:00:00Z',
    updatedAt: '2026-10-15T08:00:00Z'
  },
  {
    id: 'media-tin6-b1-v2',
    lessonId: 'tin6-b1',
    type: 'video',
    title: 'Video Bổ trợ: Giác quan con người và thiết bị thu nhận thông tin',
    description: 'Khám phá cách con người dùng mắt, tai, mũi để tiếp nhận thông tin từ môi trường xung quanh.',
    sourceUrl: 'https://www.youtube.com/watch?v=mD0kY8FpGHY',
    embedUrl: 'https://www.youtube-nocookie.com/embed/mD0kY8FpGHY?rel=0&autoplay=0',
    sortOrder: 2,
    status: 'published',
    createdBy: 'Cô Trần Thị Mai (Tổ Tin học)',
    createdAt: '2026-10-16T09:30:00Z',
    updatedAt: '2026-10-16T09:30:00Z'
  },
  {
    id: 'media-tin6-b1-img1',
    lessonId: 'tin6-b1',
    type: 'image',
    title: 'Sơ đồ tư duy: Mối quan hệ giữa Thông tin - Dữ liệu - Vật mang tin',
    description: 'Sơ đồ cấu trúc trực quan tóm tắt bài 1 giúp học sinh ghi nhớ trước khi làm bài trắc nghiệm.',
    sourceUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80',
    altText: 'Sơ đồ tư duy trực quan về thông tin và dữ liệu số',
    caption: 'Hình 1.1: Mô hình chuyển hóa từ dữ liệu thô thành thông tin hữu ích trong não bộ con người.',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Thầy Nguyễn Văn An',
    createdAt: '2026-10-15T10:00:00Z',
    updatedAt: '2026-10-15T10:00:00Z'
  },
  {
    id: 'media-tin6-b1-img2',
    lessonId: 'tin6-b1',
    type: 'image',
    title: 'Ví dụ các loại vật mang tin trong thực tế',
    description: 'Các vật mang tin từ truyền thống (sách, biển báo giao thông) đến hiện đại (thẻ nhớ USB, ổ cứng).',
    sourceUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&auto=format&fit=crop&q=80',
    altText: 'Sách giáo khoa, bảng thông báo và máy tính',
    caption: 'Hình 1.2: Các dạng vật mang tin phổ biến tại trường học.',
    sortOrder: 2,
    status: 'published',
    createdBy: 'Cô Trần Thị Mai',
    createdAt: '2026-10-16T11:00:00Z',
    updatedAt: '2026-10-16T11:00:00Z'
  },

  // Tin học 6 - Bài 2
  {
    id: 'media-tin6-b2-v1',
    lessonId: 'tin6-b2',
    type: 'video',
    title: 'Video Bài giảng: 4 Hoạt động cơ bản trong xử lý thông tin',
    description: 'Tìm hiểu quy trình: Thu nhận -> Lưu trữ -> Xử lý -> Trao đổi thông tin qua các ví dụ gần gũi.',
    sourceUrl: 'https://www.youtube.com/watch?v=AkFi90lZmXA',
    embedUrl: 'https://www.youtube-nocookie.com/embed/AkFi90lZmXA?rel=0&autoplay=0',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Tổ Tin học THCS Mỹ Hòa',
    createdAt: '2026-10-17T08:00:00Z',
    updatedAt: '2026-10-17T08:00:00Z'
  },
  {
    id: 'media-tin6-b2-img1',
    lessonId: 'tin6-b2',
    type: 'image',
    title: 'Sơ đồ chu trình xử lý thông tin',
    description: 'Quy trình tiếp nhận từ môi trường đến bộ não và truyền đạt tới người khác.',
    sourceUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    altText: 'Sơ đồ luồng dữ liệu 4 bước',
    caption: 'Hình 2.1: Chu trình 4 bước xử lý thông tin của máy tính và con người.',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Tổ Tin học',
    createdAt: '2026-10-17T09:00:00Z',
    updatedAt: '2026-10-17T09:00:00Z'
  },

  // Tin học 6 - Bài 3
  {
    id: 'media-tin6-b3-v1',
    lessonId: 'tin6-b3',
    type: 'video',
    title: 'Video Thực hành: Cấu tạo phần cứng máy tính và các thiết bị vào - ra',
    description: 'Quan sát các linh kiện thực tế: Bàn phím, chuột, màn hình, CPU, RAM và bo mạch chủ.',
    sourceUrl: 'https://www.youtube.com/watch?v=ExxFxD4OSZ0',
    embedUrl: 'https://www.youtube-nocookie.com/embed/ExxFxD4OSZ0?rel=0&autoplay=0',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Thầy Lê Hoàng',
    createdAt: '2026-10-18T14:00:00Z',
    updatedAt: '2026-10-18T14:00:00Z'
  },
  {
    id: 'media-tin6-b3-img1',
    lessonId: 'tin6-b3',
    type: 'image',
    title: 'Cận cảnh bộ vi xử lý trung tâm (CPU)',
    description: 'Vi xử lý đóng vai trò như bộ não điều khiển máy tính.',
    sourceUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1000&auto=format&fit=crop&q=80',
    altText: 'Linh kiện chip CPU máy tính',
    caption: 'Hình 3.1: Bộ vi xử lý trung tâm (CPU) thực hiện hàng triệu phép tính mỗi giây.',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Thầy Lê Hoàng',
    createdAt: '2026-10-18T15:00:00Z',
    updatedAt: '2026-10-18T15:00:00Z'
  },

  // Tin học 6 - Bài 4: Mạng máy tính
  {
    id: 'media-tin6-b4-v1',
    lessonId: 'tin6-b4',
    type: 'video',
    title: 'Video Bài giảng: Mạng máy tính và các thành phần kết nối',
    description: 'Tìm hiểu cáp mạng, Switch, Router và cách các máy tính trong phòng thực hành kết nối với nhau.',
    sourceUrl: 'https://www.youtube.com/watch?v=2_b9L3wN62E',
    embedUrl: 'https://www.youtube-nocookie.com/embed/2_b9L3wN62E?rel=0&autoplay=0',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Thầy Nguyễn Văn An',
    createdAt: '2026-10-18T16:00:00Z',
    updatedAt: '2026-10-18T16:00:00Z'
  },
  {
    id: 'media-tin6-b4-img1',
    lessonId: 'tin6-b4',
    type: 'image',
    title: 'Sơ đồ mạng có dây và mạng không dây Wi-Fi',
    description: 'Mô hình kết nối các thiết bị thông minh qua Access Point và Switch trong trường học.',
    sourceUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1000&auto=format&fit=crop&q=80',
    altText: 'Cáp mạng và thiết bị chuyển mạch',
    caption: 'Hình 4.1: Các thiết bị mạng phổ biến trong phòng máy trường THCS Mỹ Hòa.',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Thầy Nguyễn Văn An',
    createdAt: '2026-10-18T16:30:00Z',
    updatedAt: '2026-10-18T16:30:00Z'
  },

  // Tin học 6 - Bài 10: Sơ đồ tư duy
  {
    id: 'media-tin6-b10-v1',
    lessonId: 'tin6-b10',
    type: 'video',
    title: 'Video Thực hành: Hướng dẫn vẽ sơ đồ tư duy bằng phần mềm MindMup',
    description: 'Thao tác tạo nhánh chính, nhánh phụ, đổi màu sắc và xuất sơ đồ tư duy phục vụ ôn thi.',
    sourceUrl: 'https://www.youtube.com/watch?v=wLWV0XN7K1g',
    embedUrl: 'https://www.youtube-nocookie.com/embed/wLWV0XN7K1g?rel=0&autoplay=0',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Cô Trần Thị Mai',
    createdAt: '2026-10-19T09:00:00Z',
    updatedAt: '2026-10-19T09:00:00Z'
  },
  {
    id: 'media-tin6-b10-img1',
    lessonId: 'tin6-b10',
    type: 'image',
    title: 'Mẫu sơ đồ tư duy tóm tắt kiến thức Tin học',
    description: 'Ví dụ trực quan về việc tổ chức ý tưởng bằng màu sắc và hình vẽ.',
    sourceUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1000&auto=format&fit=crop&q=80',
    altText: 'Sơ đồ tư duy ghi chép nhiều màu sắc',
    caption: 'Hình 10.1: Minh họa sơ đồ tư duy giúp ghi nhớ lâu và phát triển óc sáng tạo.',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Cô Trần Thị Mai',
    createdAt: '2026-10-19T09:30:00Z',
    updatedAt: '2026-10-19T09:30:00Z'
  },

  // Tin học 6 - Bài 15: Thuật toán
  {
    id: 'media-tin6-b15-v1',
    lessonId: 'tin6-b15',
    type: 'video',
    title: 'Video Bài giảng: Thuật toán và cách vẽ sơ đồ khối Flowchart',
    description: 'Học cách sử dụng hình ôvan, hình thoi, hình chữ nhật và mũi tên để mô tả thuật toán.',
    sourceUrl: 'https://www.youtube.com/watch?v=kM9ASKAni_s',
    embedUrl: 'https://www.youtube-nocookie.com/embed/kM9ASKAni_s?rel=0&autoplay=0',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Thầy Lê Hoàng',
    createdAt: '2026-10-20T10:00:00Z',
    updatedAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'media-tin6-b15-img1',
    lessonId: 'tin6-b15',
    type: 'image',
    title: 'Quy ước các hình khối trong thuật toán',
    description: 'Bảng tra cứu nhanh ý nghĩa từng khối hình: Oval, Bình hành, Chữ nhật, Hình thoi.',
    sourceUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&auto=format&fit=crop&q=80',
    altText: 'Sơ đồ khối và lưu đồ giải thuật',
    caption: 'Hình 15.1: Các khối hình chuẩn trong mô tả thuật toán Tin học THCS.',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Thầy Lê Hoàng',
    createdAt: '2026-10-20T10:30:00Z',
    updatedAt: '2026-10-20T10:30:00Z'
  },

  // Tin học 6 - Bài 17: Chương trình máy tính Scratch
  {
    id: 'media-tin6-b17-v1',
    lessonId: 'tin6-b17',
    type: 'video',
    title: 'Video Dự án: Lập trình trò chơi Scratch đầu tiên cho học sinh lớp 6',
    description: 'Từng bước ghép các khối lệnh sự kiện, chuyển động và điều khiển chú mèo bắt cá.',
    sourceUrl: 'https://www.youtube.com/watch?v=jXUZaf5D12A',
    embedUrl: 'https://www.youtube-nocookie.com/embed/jXUZaf5D12A?rel=0&autoplay=0',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Tổ Tin học THCS Mỹ Hòa',
    createdAt: '2026-10-21T14:00:00Z',
    updatedAt: '2026-10-21T14:00:00Z'
  },

  // Toán 6 - Bài 1
  {
    id: 'media-toan6-b1-v1',
    lessonId: 'toan6-b1',
    type: 'video',
    title: 'Video Bài giảng: Tập hợp số tự nhiên và cách ghi số',
    description: 'Hướng dẫn viết tập hợp bằng phương pháp liệt kê và nêu dấu hiệu đặc trưng.',
    sourceUrl: 'https://www.youtube.com/watch?v=0h5Gpn_Vp80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/0h5Gpn_Vp80?rel=0&autoplay=0',
    sortOrder: 1,
    status: 'published',
    createdBy: 'Tổ Toán THCS Mỹ Hòa',
    createdAt: '2026-10-19T08:00:00Z',
    updatedAt: '2026-10-19T08:00:00Z'
  }
];
