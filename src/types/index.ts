export type GradeLevel = 6 | 7 | 8 | 9;

export type SubjectId =
  | 'tin-hoc'
  | 'toan'
  | 'van'
  | 'tieng-anh'
  | 'khtn'
  | 'lich-su-dia-ly'
  | 'cong-nghe'
  | 'gdcd'
  | 'nghe-thuat'
  | 'giao-duc-the-chat'
  | 'hoat-dong-trai-nghiem';

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
}

export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';

export interface Question {
  id: string;
  subjectId: SubjectId;
  grade: GradeLevel;
  semester: 1 | 2;
  chapter: string;
  difficulty: DifficultyLevel;
  content: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  tags?: string[];
  createdDate?: string;
  author?: string;
}

export interface Exam {
  id: string;
  title: string;
  subjectId: SubjectId;
  grade: GradeLevel;
  semester: 1 | 2;
  durationMinutes: number;
  questionIds: string[];
  description: string;
  examType: '15_phut' | 'giua_ky' | 'cuoi_ky' | 'luyen_tap';
  isOfficial?: boolean;
}

export interface UserExamResult {
  id: string;
  examId: string;
  examTitle: string;
  subjectId: SubjectId;
  grade: GradeLevel;
  studentName: string;
  score: number; // Scale 0 - 10
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, number>; // questionIndex -> selectedAnswerIndex
  completedAt: string;
}

export type MediaType = 'video' | 'image';
export type MediaStatus = 'draft' | 'published';

export interface LessonMedia {
  id: string;
  lessonId: string;
  type: MediaType;
  title: string;
  description: string;
  sourceUrl: string;
  embedUrl?: string; // Normalized secure embed link for video
  altText?: string;  // For images
  caption?: string;  // For images
  sortOrder: number;
  status: MediaStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  subjectId: SubjectId;
  grade: GradeLevel;
  semester: 1 | 2;
  chapter: string;
  summary: string;
  keyPoints: string[];
  contentMarkdown: string;
  sampleExercises?: {
    question: string;
    solution: string;
  }[];
  attachments?: {
    name: string;
    fileType: 'pdf' | 'docx' | 'pptx';
    size: string;
  }[];
  media?: LessonMedia[];
  // Metadata for textbook synchronization & publishing
  sourceDocId?: string;
  bookSeries?: string;
  bookTitle?: string;
  pageReference?: string;
  orderIndex?: number;
  learningObjectives?: string[];
  isPublished?: boolean;
  reviewStatus?: 'cho_duyet' | 'da_xac_nhan';
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  category: 'hoc_tap' | 'hoat_dong' | 'lich_thi' | 'khen_thuong';
  date: string;
  content: string;
  priority?: boolean;
  author: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requirement: string;
}

export interface StudentProfile {
  name: string;
  grade: GradeLevel;
  className: string;
  avatarSeed: string;
  streakDays: number;
  totalPoints: number;
  completedTestsCount: number;
  averageScore: number;
  badges: string[];
}

export interface TeacherProfile {
  name: string;
  subject: string;
  title: string;
  department: string;
}

export type UserRole = 'student' | 'teacher';

export interface UserAccount {
  uid: string;
  username: string;
  email?: string;
  displayName: string;
  role: UserRole;
  grade?: GradeLevel;
  className?: string;
  avatarSeed?: string;
  isActive: boolean;
  passwordHash: string; // SHA-256 hash (never plain text)
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: UserAccount;
  token: string;
  expiresAt: number;
}

export type DocumentFileType = 'pdf' | 'docx' | 'pptx' | 'txt' | 'xlsx' | 'json';

export type DocReadingStatus = 'chua_doc' | 'dang_doc' | 'da_doc' | 'dang_quet' | 'loi';

export type DocProcessingStatus =
  | 'chua_xu_ly'
  | 'dang_doc'
  | 'dang_phan_tich'
  | 'dang_tao_bai_hoc'
  | 'da_xu_ly'
  | 'can_kiem_tra'
  | 'cho_xac_nhan'
  | 'da_xac_nhan'
  | 'da_xuat_ban'
  | 'that_bai';

export interface TeacherDocument {
  id: string;
  title: string;
  fileName: string;
  fileType: DocumentFileType;
  fileSize: string;
  subjectId: SubjectId;
  grade: GradeLevel;
  topic: string;
  bookSeries?: string; // Bộ sách (Kết nối tri thức, Chân trời sáng tạo, Cánh diều, Global Success)
  academicYear: string;
  schoolYear?: string; // Alias for UI display (e.g. 2026-2027)
  uploadedBy: string;
  uploadedAt: string;
  status: 'da_tai_len' | 'da_xu_ly' | 'da_xac_nhan';
  readingStatus?: DocReadingStatus;
  processingStatus?: DocProcessingStatus;
  recognizedChapters?: number;
  recognizedLessons?: number;
  successLessons?: number;
  needsReviewLessons?: number;
  isPublished?: boolean;
  description: string;
  source: string;
  linkedLessonId?: string;
  fileContentBase64?: string; // For client-side preview / storage
  extractedSummary?: string;
  extractedKeyPoints?: string[];
  suggestedQuestions?: {
    type: string;
    question: string;
    answer: string;
    level: string;
  }[];
}

export type AssignmentQuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'true_false'
  | 'fill_in'
  | 'essay'
  | 'practice';

export interface AssignmentQuestion {
  id: string;
  type: AssignmentQuestionType;
  prompt: string;
  options?: string[]; // For single_choice, multiple_choice, true_false
  correctAnswer?: number | number[] | boolean | string; // Index, indices, boolean, or string
  points: number;
  explanation?: string;
  codeSnippet?: string;
  imageUrl?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: SubjectId;
  grade: GradeLevel;
  chapter: string;
  description: string;
  durationMinutes: number; // 0 for unlimited / homework
  dueDate: string;
  maxPoints: number;
  maxAttempts: number;
  status: 'draft' | 'published' | 'closed';
  targetAudience: 'all_grade' | 'specific_classes' | 'selected_students';
  targetClasses?: string[]; // e.g. ['6A1', '6A2']
  teacherId: string;
  teacherName: string;
  createdAt: string;
  questions: AssignmentQuestion[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentUid: string;
  studentName: string;
  studentClass: string;
  studentGrade: GradeLevel;
  subjectId: SubjectId;
  status: 'submitted' | 'graded' | 'in_progress';
  submittedAt: string;
  timeSpentSeconds: number;
  answers: Record<string, any>; // questionId -> answer
  questionScores?: Record<string, number>; // questionId -> score
  score: number;
  maxScore: number;
  teacherFeedback?: string;
  gradedAt?: string;
  gradedBy?: string;
  attemptCount: number;
}

export type TextbookStatus = 'published' | 'hidden';

export interface Textbook {
  id: string;
  grade: GradeLevel;
  subjectId: SubjectId | string;
  subjectName?: string;
  bookSet: string; // e.g. "Kết nối tri thức với cuộc sống", "Chân trời sáng tạo", "Cánh Diều", "Global Success"
  title: string;
  bookUrl: string; // Full untruncated URL strictly preserved with all query params
  embedUrl?: string; // Optional dedicated embed URL
  coverUrl?: string;
  description?: string;
  status: TextbookStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}
