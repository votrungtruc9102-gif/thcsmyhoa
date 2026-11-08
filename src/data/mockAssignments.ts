import { Assignment, AssignmentSubmission } from '../types';

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-tin6-01',
    title: 'Bài tập tuần 8: Mạng máy tính và An toàn trên Internet',
    subjectId: 'tin-hoc',
    grade: 6,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    description: 'Học sinh làm các câu hỏi trắc nghiệm, đúng/sai, điền từ và câu hỏi tự luận ngắn về lợi ích và nguy cơ khi sử dụng Internet.',
    durationMinutes: 45,
    dueDate: '2026-11-15T23:59:00Z',
    maxPoints: 10,
    maxAttempts: 2,
    status: 'published',
    targetAudience: 'all_grade',
    targetClasses: ['6A1', '6A2', '6A3'],
    teacherId: 'u-teacher-01',
    teacherName: 'Cô Trần Thị Mai (Tổ trưởng Tin học)',
    createdAt: '2026-10-25T08:00:00Z',
    questions: [
      {
        id: 'q-asg-1',
        type: 'single_choice',
        prompt: 'Mạng máy tính là gì?',
        options: [
          'Tập hợp các máy tính nối với nhau bằng các thiết bị mạng và phương tiện truyền thông để chia sẻ dữ liệu',
          'Một phần mềm dùng để soạn thảo văn bản',
          'Một trang web tìm kiếm thông tin trên mạng Internet',
          'Thiết bị phần cứng dùng để gõ chữ'
        ],
        correctAnswer: 0,
        points: 2,
        explanation: 'Mạng máy tính là tập hợp các máy tính và thiết bị được kết nối với nhau để chia sẻ dữ liệu và tài nguyên.'
      },
      {
        id: 'q-asg-2',
        type: 'multiple_choice',
        prompt: 'Những hành vi nào dưới đây giúp bảo vệ thông tin cá nhân và an toàn trên Internet? (Chọn các phương án đúng)',
        options: [
          'Không chia sẻ mật khẩu tài khoản cho người lạ',
          'Đặt mật khẩu mạnh gồm cả chữ hoa, chữ thường, số và ký tự đặc biệt',
          'Cung cấp địa chỉ nhà và số điện thoại khi đăng nhập bất kỳ trang web lạ nào',
          'Đăng xuất khỏi tài khoản sau khi dùng xong trên máy tính công cộng'
        ],
        correctAnswer: [0, 1, 3],
        points: 2,
        explanation: 'Không chia sẻ mật khẩu, đặt mật khẩu mạnh và đăng xuất trên máy tính công cộng là các thói quen an toàn số cần thiết.'
      },
      {
        id: 'q-asg-3',
        type: 'true_false',
        prompt: 'Thông tin trên mạng Internet luôn luôn chính xác 100% và em có thể tin tưởng hoàn toàn mà không cần kiểm chứng.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1, // 'Sai'
        points: 1.5,
        explanation: 'Thông tin trên mạng rất phong phú nhưng cũng có nhiều thông tin sai lệch, cần đối chiếu với các nguồn uy tín.'
      },
      {
        id: 'q-asg-4',
        type: 'fill_in',
        prompt: 'Điền từ còn thiếu vào chỗ trống: Thiết bị dùng để kết nối các máy tính trong một mạng cục bộ (LAN) thường là bộ chia cổng hoặc thiết bị chuyển mạch có tên tiếng Anh là ___________.',
        correctAnswer: 'Switch',
        points: 1.5,
        explanation: 'Switch (bộ chuyển mạch) là thiết bị trung tâm kết nối các máy tính trong mạng có dây.'
      },
      {
        id: 'q-asg-5',
        type: 'essay',
        prompt: 'Em hãy nêu ít nhất 2 lợi ích của việc sử dụng Internet trong học tập và 1 biện pháp để tránh bị nghiện mạng xã hội.',
        points: 3,
        explanation: 'Học sinh trình bày rõ 2 lợi ích (tìm tài liệu, học trực tuyến...) và 1 biện pháp (lập thời gian biểu, hạn chế dùng điện thoại trước khi ngủ...)'
      }
    ]
  },
  {
    id: 'asg-tin6-02',
    title: 'Thực hành: Khám phá sơ đồ tư duy Mindmap và thông tin số',
    subjectId: 'tin-hoc',
    grade: 6,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    description: 'Thực hành tạo sơ đồ tư duy tóm tắt nội dung một bài học hoặc sở thích cá nhân.',
    durationMinutes: 60,
    dueDate: '2026-11-20T17:00:00Z',
    maxPoints: 10,
    maxAttempts: 3,
    status: 'published',
    targetAudience: 'specific_classes',
    targetClasses: ['6A1'],
    teacherId: 'u-teacher-01',
    teacherName: 'Cô Trần Thị Mai',
    createdAt: '2026-10-27T09:30:00Z',
    questions: [
      {
        id: 'q-asg-p1',
        type: 'practice',
        prompt: 'Em hãy vẽ sơ đồ tư duy (hoặc dùng phần mềm sơ đồ tư duy) chủ đề "Các thành phần chính của máy tính điện tử" gồm: Thiết bị vào, Thiết bị ra, Bộ xử lý trung tâm (CPU), Bộ nhớ (RAM, ROM). Sau đó nhập tóm tắt cấu trúc sơ đồ vào ô bên dưới.',
        points: 10,
        explanation: 'Đánh giá tính đầy đủ của 4 nhánh chính và các ví dụ cụ thể của từng thiết bị.'
      }
    ]
  },
  {
    id: 'asg-toan7-01',
    title: 'Đại số 7: Các phép tính với số hữu tỉ',
    subjectId: 'toan',
    grade: 7,
    chapter: 'Chương 1: Số hữu tỉ',
    description: 'Luyện tập các phép tính cộng trừ nhân chia số hữu tỉ và giải bài toán tìm x.',
    durationMinutes: 30,
    dueDate: '2026-11-18T20:00:00Z',
    maxPoints: 10,
    maxAttempts: 2,
    status: 'published',
    targetAudience: 'all_grade',
    targetClasses: ['7A1', '7A2', '7A3'],
    teacherId: 'u-teacher-02',
    teacherName: 'Thầy Nguyễn Văn An (Tổ Toán - Tin)',
    createdAt: '2026-10-26T14:00:00Z',
    questions: [
      {
        id: 'q-asg-toan-1',
        type: 'single_choice',
        prompt: 'Kết quả của phép tính (-2/3) + (1/6) là:',
        options: ['-1/2', '1/2', '-3/6', '-1/6'],
        correctAnswer: 0,
        points: 2.5,
        explanation: '(-2/3) + (1/6) = (-4/6) + (1/6) = -3/6 = -1/2.'
      },
      {
        id: 'q-asg-toan-2',
        type: 'fill_in',
        prompt: 'Tìm x biết: x - 1/4 = 3/4. Nhập giá trị số của x:',
        correctAnswer: '1',
        points: 2.5,
        explanation: 'x = 3/4 + 1/4 = 4/4 = 1.'
      },
      {
        id: 'q-asg-toan-3',
        type: 'true_false',
        prompt: 'Mọi số tự nhiên đều là số hữu tỉ.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0, // 'Đúng'
        points: 2.5,
        explanation: 'Mọi số tự nhiên n đều có thể biểu diễn dưới dạng n/1 nên đều là số hữu tỉ.'
      },
      {
        id: 'q-asg-toan-4',
        type: 'essay',
        prompt: 'Trình bày các bước tính giá trị biểu thức: A = (-1/2)^2 + (3/4) * (2/3). Viết rõ từng bước.',
        points: 2.5,
        explanation: 'A = 1/4 + 6/12 = 1/4 + 1/2 = 1/4 + 2/4 = 3/4.'
      }
    ]
  }
];

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub-01',
    assignmentId: 'asg-tin6-01',
    assignmentTitle: 'Bài tập tuần 8: Mạng máy tính và An toàn trên Internet',
    studentUid: 'u-student-01',
    studentName: 'Nguyễn Minh Quân',
    studentClass: '6A1',
    studentGrade: 6,
    subjectId: 'tin-hoc',
    status: 'graded',
    submittedAt: '2026-10-28T16:30:00Z',
    timeSpentSeconds: 1420,
    answers: {
      'q-asg-1': 0,
      'q-asg-2': [0, 1, 3],
      'q-asg-3': 1,
      'q-asg-4': 'Switch',
      'q-asg-5': 'Lợi ích: 1. Tìm kiếm tài liệu bài học trực tuyến nhanh chóng. 2. Học các khóa học video trên mạng. Biện pháp: Đặt hẹn giờ 45 phút mỗi ngày khi sử dụng máy tính.'
    },
    questionScores: {
      'q-asg-1': 2,
      'q-asg-2': 2,
      'q-asg-3': 1.5,
      'q-asg-4': 1.5,
      'q-asg-5': 3
    },
    score: 10,
    maxScore: 10,
    teacherFeedback: 'Bài làm rất tốt, trả lời rõ ràng và đưa ra biện pháp hợp lý. Khen ngợi tinh thần học tập của em!',
    gradedAt: '2026-10-29T08:15:00Z',
    gradedBy: 'Cô Trần Thị Mai',
    attemptCount: 1
  },
  {
    id: 'sub-02',
    assignmentId: 'asg-tin6-01',
    assignmentTitle: 'Bài tập tuần 8: Mạng máy tính và An toàn trên Internet',
    studentUid: 'u-student-demo',
    studentName: 'Học sinh THCS Mỹ Hòa (Tài khoản mẫu)',
    studentClass: '6A1',
    studentGrade: 6,
    subjectId: 'tin-hoc',
    status: 'submitted',
    submittedAt: '2026-10-29T19:45:00Z',
    timeSpentSeconds: 1650,
    answers: {
      'q-asg-1': 0,
      'q-asg-2': [0, 1],
      'q-asg-3': 1,
      'q-asg-4': 'switch',
      'q-asg-5': 'Internet giúp em tra từ điển tiếng Anh và xem video giải toán. Để không nghiện mạng xã hội em tắt wifi sau 9h tối.'
    },
    questionScores: {
      'q-asg-1': 2,
      'q-asg-2': 1.5,
      'q-asg-3': 1.5,
      'q-asg-4': 1.5
    },
    score: 6.5,
    maxScore: 10,
    attemptCount: 1
  }
];
