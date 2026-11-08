import { GradeLevel, SubjectId, Question, Exam, UserExamResult, Lesson, StudentProfile, LessonMedia, Assignment, AssignmentSubmission, Textbook } from '../types';
import { INITIAL_QUESTIONS, INITIAL_EXAMS, INITIAL_LESSONS, INITIAL_DOCUMENTS, TeacherDocument } from '../data/mockData';
import { INITIAL_LESSON_MEDIA } from '../data/mockMedia';
import { INITIAL_ASSIGNMENTS, INITIAL_SUBMISSIONS } from '../data/mockAssignments';
import { INITIAL_TEXTBOOKS } from '../data/mockTextbooks';

const KEYS = {
  GRADE: 'myhoa_current_grade',
  SUBJECT: 'myhoa_current_subject',
  QUESTIONS: 'myhoa_questions_v1',
  EXAMS: 'myhoa_exams_v1',
  LESSONS: 'myhoa_lessons_v1',
  MEDIA: 'myhoa_lesson_media_v1',
  RESULTS: 'myhoa_exam_results_v1',
  DOCUMENTS: 'myhoa_documents_v1',
  STUDENT_PROFILE: 'myhoa_student_profile_v1',
  ASSIGNMENTS: 'myhoa_assignments_v1',
  SUBMISSIONS: 'myhoa_assignment_submissions_v1',
  TEXTBOOKS: 'myhoa_textbooks_v1'
};

export const storageService = {
  getSelectedGrade(): GradeLevel {
    try {
      const val = localStorage.getItem(KEYS.GRADE);
      if (val) {
        const num = parseInt(val, 10);
        if ([6, 7, 8, 9].includes(num)) return num as GradeLevel;
      }
    } catch {
      // ignore
    }
    return 6;
  },

  setSelectedGrade(grade: GradeLevel): void {
    try {
      localStorage.setItem(KEYS.GRADE, grade.toString());
    } catch {
      // ignore
    }
  },

  getSelectedSubject(): SubjectId {
    try {
      const val = localStorage.getItem(KEYS.SUBJECT);
      if (val) return val as SubjectId;
    } catch {
      // ignore
    }
    return 'tin-hoc';
  },

  setSelectedSubject(subjectId: SubjectId): void {
    try {
      localStorage.setItem(KEYS.SUBJECT, subjectId);
    } catch {
      // ignore
    }
  },

  // Questions
  getQuestions(): Question[] {
    try {
      const stored = localStorage.getItem(KEYS.QUESTIONS);
      if (stored) {
        const list: Question[] = JSON.parse(stored);
        const initMap = new Map(INITIAL_QUESTIONS.map(q => [q.id, q]));
        let modified = false;
        const normalized = list.map(q => {
          const init = initMap.get(q.id);
          if (init && q.chapter !== init.chapter) {
            modified = true;
            return { ...q, chapter: init.chapter };
          }
          return q;
        });
        if (modified) {
          this.saveQuestions(normalized);
        }
        return normalized;
      }
    } catch {
      // ignore
    }
    this.saveQuestions(INITIAL_QUESTIONS);
    return INITIAL_QUESTIONS;
  },

  saveQuestions(questions: Question[]): void {
    try {
      localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.error('Error saving questions:', e);
    }
  },

  addQuestion(newQuestion: Question): void {
    const list = this.getQuestions();
    list.unshift(newQuestion);
    this.saveQuestions(list);
  },

  updateQuestion(updated: Question): void {
    const list = this.getQuestions();
    const idx = list.findIndex(q => q.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
      this.saveQuestions(list);
    }
  },

  deleteQuestion(id: string): void {
    const list = this.getQuestions();
    const filtered = list.filter(q => q.id !== id);
    this.saveQuestions(filtered);
  },

  // Exams
  getExams(): Exam[] {
    try {
      const stored = localStorage.getItem(KEYS.EXAMS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    this.saveExams(INITIAL_EXAMS);
    return INITIAL_EXAMS;
  },

  saveExams(exams: Exam[]): void {
    try {
      localStorage.setItem(KEYS.EXAMS, JSON.stringify(exams));
    } catch (e) {
      console.error('Error saving exams:', e);
    }
  },

  addExam(newExam: Exam): void {
    const list = this.getExams();
    list.unshift(newExam);
    this.saveExams(list);
  },

  // Lessons
  getLessons(): Lesson[] {
    try {
      const stored = localStorage.getItem(KEYS.LESSONS);
      if (stored) {
        const list: Lesson[] = JSON.parse(stored);
        const initMap = new Map(INITIAL_LESSONS.map(l => [l.id, l]));
        let modified = false;
        const normalized = list.map(l => {
          const init = initMap.get(l.id);
          if (init && l.chapter !== init.chapter) {
            modified = true;
            return { ...l, chapter: init.chapter };
          }
          return l;
        });

        const tin6Lessons = normalized.filter(l => l.grade === 6 && l.subjectId === 'tin-hoc');
        // Ensure all 17 Grade 6 Tin học lessons from SGK GDPT 2018 are populated
        if (tin6Lessons.length < 17) {
          const initialTin6 = INITIAL_LESSONS.filter(l => l.grade === 6 && l.subjectId === 'tin-hoc');
          const otherLessons = normalized.filter(l => !(l.grade === 6 && l.subjectId === 'tin-hoc'));
          const upgradedTin6 = initialTin6.map(initLesson => {
            const existing = tin6Lessons.find(e => e.id === initLesson.id);
            return existing ? { ...initLesson, attachments: existing.attachments || initLesson.attachments } : initLesson;
          });
          const combined = [...upgradedTin6, ...otherLessons];
          this.saveLessons(combined);
          return combined;
        }

        // Merge any new lessons from INITIAL_LESSONS (for all 11 subjects & grades)
        const existingIds = new Set(normalized.map(l => l.id));
        const missingInitial = INITIAL_LESSONS.filter(l => !existingIds.has(l.id));
        if (missingInitial.length > 0) {
          const combined = [...normalized, ...missingInitial];
          this.saveLessons(combined);
          return combined;
        }

        if (modified) {
          this.saveLessons(normalized);
        }
        return normalized;
      }
    } catch {
      // ignore
    }
    this.saveLessons(INITIAL_LESSONS);
    return INITIAL_LESSONS;
  },

  saveLessons(lessons: Lesson[]): void {
    try {
      localStorage.setItem(KEYS.LESSONS, JSON.stringify(lessons));
    } catch (e) {
      console.error('Error saving lessons:', e);
    }
  },

  addLesson(newLesson: Lesson): void {
    const list = this.getLessons();
    list.unshift(newLesson);
    this.saveLessons(list);
  },

  updateLesson(updated: Lesson): void {
    const list = this.getLessons();
    const idx = list.findIndex(l => l.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
      this.saveLessons(list);
    }
  },

  deleteLesson(id: string): void {
    const list = this.getLessons();
    const filtered = list.filter(l => l.id !== id);
    this.saveLessons(filtered);
  },

  // Lesson Media (Videos & Images)
  getMedia(lessonId?: string): LessonMedia[] {
    try {
      const stored = localStorage.getItem(KEYS.MEDIA);
      let list: LessonMedia[] = [];
      if (stored) {
        list = JSON.parse(stored);
        const existingIds = new Set(list.map(m => m.id));
        const missing = INITIAL_LESSON_MEDIA.filter(m => !existingIds.has(m.id));
        if (missing.length > 0) {
          list = [...list, ...missing];
          this.saveMedia(list);
        }
      } else {
        this.saveMedia(INITIAL_LESSON_MEDIA);
        list = INITIAL_LESSON_MEDIA;
      }
      if (lessonId) {
        return list.filter(m => m.lessonId === lessonId).sort((a, b) => a.sortOrder - b.sortOrder);
      }
      return list.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch {
      return INITIAL_LESSON_MEDIA;
    }
  },

  saveMedia(mediaList: LessonMedia[]): void {
    try {
      localStorage.setItem(KEYS.MEDIA, JSON.stringify(mediaList));
    } catch (e) {
      console.error('Error saving media to localStorage:', e);
    }
  },

  addMedia(item: LessonMedia): void {
    const list = this.getMedia();
    list.push(item);
    this.saveMedia(list);
  },

  updateMedia(item: LessonMedia): void {
    const list = this.getMedia();
    const idx = list.findIndex(m => m.id === item.id);
    if (idx !== -1) {
      list[idx] = item;
      this.saveMedia(list);
    }
  },

  deleteMedia(id: string): void {
    const list = this.getMedia();
    const filtered = list.filter(m => m.id !== id);
    this.saveMedia(filtered);
  },

  // Exam Results
  getExamResults(): UserExamResult[] {
    try {
      const stored = localStorage.getItem(KEYS.RESULTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  },

  saveExamResult(result: UserExamResult): void {
    const list = this.getExamResults();
    list.unshift(result);
    try {
      localStorage.setItem(KEYS.RESULTS, JSON.stringify(list));
      this.updateStudentStatsWithResult(result);
    } catch (e) {
      console.error('Error saving exam result:', e);
    }
  },

  // Documents
  getDocuments(): TeacherDocument[] {
    try {
      const stored = localStorage.getItem(KEYS.DOCUMENTS);
      if (stored) {
        const list: TeacherDocument[] = JSON.parse(stored);
        const existingIds = new Set(list.map(d => d.id));
        const missing = INITIAL_DOCUMENTS.filter(d => !existingIds.has(d.id));
        if (missing.length > 0) {
          const merged = [...list, ...missing];
          this.saveDocuments(merged);
          return merged;
        }
        return list;
      }
    } catch {
      // ignore
    }
    this.saveDocuments(INITIAL_DOCUMENTS);
    return INITIAL_DOCUMENTS;
  },

  saveDocuments(docs: TeacherDocument[]): void {
    try {
      localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs));
    } catch (e) {
      console.error('Error saving documents:', e);
    }
  },

  addDocument(doc: TeacherDocument): void {
    const list = this.getDocuments();
    list.unshift(doc);
    this.saveDocuments(list);
  },

  deleteDocument(id: string): void {
    const list = this.getDocuments();
    const filtered = list.filter(d => d.id !== id);
    this.saveDocuments(filtered);
  },

  updateDocument(doc: TeacherDocument): void {
    const list = this.getDocuments();
    const idx = list.findIndex(d => d.id === doc.id);
    if (idx !== -1) {
      list[idx] = doc;
      this.saveDocuments(list);
    }
  },

  // Student Profile
  getStudentProfile(): StudentProfile {
    try {
      const stored = localStorage.getItem(KEYS.STUDENT_PROFILE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    const defaultProfile: StudentProfile = {
      name: 'Nguyễn Minh Quân',
      grade: 6,
      className: '6A1',
      avatarSeed: 'myhoa-student',
      streakDays: 3,
      totalPoints: 240,
      completedTestsCount: 2,
      averageScore: 8.5,
      badges: ['Chăm chỉ học tập', 'Tân binh Mỹ Hòa', 'Yêu thích Tin học']
    };
    this.saveStudentProfile(defaultProfile);
    return defaultProfile;
  },

  saveStudentProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(KEYS.STUDENT_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving student profile:', e);
    }
  },

  updateStudentStatsWithResult(result: UserExamResult): void {
    const profile = this.getStudentProfile();
    const allResults = this.getExamResults();
    const totalCount = allResults.length;
    const totalScore = allResults.reduce((acc, curr) => acc + curr.score, 0);
    const avg = totalCount > 0 ? Math.round((totalScore / totalCount) * 10) / 10 : result.score;
    
    const pointsGained = Math.round(result.score * 10);
    profile.totalPoints += pointsGained;
    profile.completedTestsCount = totalCount;
    profile.averageScore = avg;

    if (result.score === 10 && !profile.badges.includes('Điểm 10 Xuất sắc')) {
      profile.badges.push('Điểm 10 Xuất sắc');
    }
    if (profile.completedTestsCount >= 5 && !profile.badges.includes('Chiến thần Luyện đề')) {
      profile.badges.push('Chiến thần Luyện đề');
    }

    this.saveStudentProfile(profile);
  },

  // Assignments
  getAssignments(): Assignment[] {
    try {
      const stored = localStorage.getItem(KEYS.ASSIGNMENTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    this.saveAssignments(INITIAL_ASSIGNMENTS);
    return INITIAL_ASSIGNMENTS;
  },

  saveAssignments(assignments: Assignment[]): void {
    try {
      localStorage.setItem(KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    } catch (e) {
      console.error('Error saving assignments:', e);
    }
  },

  addAssignment(assignment: Assignment): void {
    const list = this.getAssignments();
    list.unshift(assignment);
    this.saveAssignments(list);
  },

  updateAssignment(assignment: Assignment): void {
    const list = this.getAssignments();
    const idx = list.findIndex(a => a.id === assignment.id);
    if (idx !== -1) {
      list[idx] = assignment;
      this.saveAssignments(list);
    }
  },

  deleteAssignment(id: string): void {
    const list = this.getAssignments();
    const filtered = list.filter(a => a.id !== id);
    this.saveAssignments(filtered);
  },

  // Submissions
  getSubmissions(): AssignmentSubmission[] {
    try {
      const stored = localStorage.getItem(KEYS.SUBMISSIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    this.saveSubmissions(INITIAL_SUBMISSIONS);
    return INITIAL_SUBMISSIONS;
  },

  saveSubmissions(submissions: AssignmentSubmission[]): void {
    try {
      localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch (e) {
      console.error('Error saving submissions:', e);
    }
  },

  addSubmission(submission: AssignmentSubmission): void {
    const list = this.getSubmissions();
    const existingIdx = list.findIndex(
      s => s.assignmentId === submission.assignmentId && s.studentUid === submission.studentUid
    );
    if (existingIdx !== -1) {
      list[existingIdx] = submission;
    } else {
      list.unshift(submission);
    }
    this.saveSubmissions(list);
  },

  updateSubmission(submission: AssignmentSubmission): void {
    const list = this.getSubmissions();
    const idx = list.findIndex(s => s.id === submission.id);
    if (idx !== -1) {
      list[idx] = submission;
      this.saveSubmissions(list);
    }
  },

  gradeSubmission(
    submissionId: string,
    score: number,
    feedback: string,
    gradedBy: string,
    questionScores?: Record<string, number>
  ): void {
    const list = this.getSubmissions();
    const idx = list.findIndex(s => s.id === submissionId);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        score,
        status: 'graded',
        teacherFeedback: feedback,
        gradedBy,
        gradedAt: new Date().toISOString(),
        ...(questionScores ? { questionScores } : {})
      };
      this.saveSubmissions(list);
    }
  },

  // =========================================================================
  // SÁCH GIÁO KHOA (TEXTBOOKS) - BẢO TOÀN NGUYÊN VẸN URL 100%
  // =========================================================================
  getTextbooks(): Textbook[] {
    try {
      const stored = localStorage.getItem(KEYS.TEXTBOOKS);
      if (stored) {
        const list: Textbook[] = JSON.parse(stored);
        // Loại bỏ các bản ghi Cánh Diều hoặc bản ghi cũ không còn sử dụng
        const sanitized = list.filter(t => t.bookSet !== 'Cánh Diều' && !t.id.includes('canhdieu'));
        
        // Bổ sung các sách từ INITIAL_TEXTBOOKS nếu chưa có
        const existingIds = new Set(sanitized.map(t => t.id));
        const missing = INITIAL_TEXTBOOKS.filter(t => !existingIds.has(t.id));
        const merged = missing.length > 0 ? [...sanitized, ...missing] : sanitized;

        if (merged.length !== list.length) {
          this.saveTextbooks(merged);
        }
        return merged;
      }
    } catch (e) {
      console.warn('Cannot read textbooks from localStorage:', e);
    }
    this.saveTextbooks(INITIAL_TEXTBOOKS);
    return INITIAL_TEXTBOOKS;
  },

  saveTextbooks(textbooks: Textbook[]): void {
    try {
      // Giữ nguyên 100% các chuỗi URL không cắt ngắn
      localStorage.setItem(KEYS.TEXTBOOKS, JSON.stringify(textbooks));
    } catch (e) {
      console.error('Error saving textbooks to localStorage:', e);
    }
  },

  addTextbook(newTextbook: Textbook): void {
    // Preserve full untouched bookUrl (no slicing, no query stripping, no abbreviation)
    const sanitizedBook: Textbook = {
      ...newTextbook,
      bookUrl: newTextbook.bookUrl.trim(),
      updatedAt: new Date().toISOString()
    };
    const list = this.getTextbooks();
    
    // Kiểm tra xem đã có sách cùng khối và môn học chưa. Nếu có, cập nhật bản ghi đó thay vì tạo bản ghi trùng
    const existingIdx = list.findIndex(
      t => t.grade === sanitizedBook.grade && t.subjectId === sanitizedBook.subjectId
    );
    
    if (existingIdx !== -1) {
      list[existingIdx] = {
        ...list[existingIdx],
        ...sanitizedBook,
        id: list[existingIdx].id
      };
    } else {
      list.unshift(sanitizedBook);
    }
    
    this.saveTextbooks(list);

    // Sync to backend persistent API if available
    try {
      fetch('/api/textbooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedBook)
      }).catch(() => {});
    } catch {
      // ignore
    }
  },

  updateTextbook(updated: Textbook): void {
    // Preserve 100% untouched new bookUrl
    const sanitizedBook: Textbook = {
      ...updated,
      bookUrl: updated.bookUrl.trim(),
      updatedAt: new Date().toISOString()
    };
    const list = this.getTextbooks();
    const idx = list.findIndex(t => t.id === sanitizedBook.id);
    if (idx !== -1) {
      list[idx] = sanitizedBook;
      this.saveTextbooks(list);
    } else {
      // Nếu không tìm thấy theo ID, tìm theo khối và môn
      const subIdx = list.findIndex(t => t.grade === sanitizedBook.grade && t.subjectId === sanitizedBook.subjectId);
      if (subIdx !== -1) {
        list[subIdx] = { ...list[subIdx], ...sanitizedBook };
        this.saveTextbooks(list);
      }
    }

    // Sync to backend persistent API if available
    try {
      fetch(`/api/textbooks/${encodeURIComponent(sanitizedBook.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedBook)
      }).catch(() => {});
    } catch {
      // ignore
    }
  },

  deleteTextbook(id: string): void {
    const list = this.getTextbooks();
    const filtered = list.filter(t => t.id !== id);
    this.saveTextbooks(filtered);

    // Sync to backend persistent API if available
    try {
      fetch(`/api/textbooks/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch(() => {});
    } catch {
      // ignore
    }
  },

  toggleTextbookStatus(id: string): void {
    const list = this.getTextbooks();
    const idx = list.findIndex(t => t.id === id);
    if (idx !== -1) {
      const current = list[idx];
      const newStatus = current.status === 'published' ? 'hidden' : 'published';
      list[idx] = {
        ...current,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      this.saveTextbooks(list);

      try {
        fetch(`/api/textbooks/${encodeURIComponent(id)}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        }).catch(() => {});
      } catch {}
    }
  },

  async syncTextbooksWithServer(): Promise<Textbook[]> {
    try {
      const res = await fetch('/api/textbooks');
      if (res.ok) {
        const serverData: Textbook[] = await res.json();
        if (Array.isArray(serverData) && serverData.length > 0) {
          this.saveTextbooks(serverData);
          return serverData;
        }
      }
    } catch {
      // Server may not be running in full-stack mode, fallback to client storage
    }
    return this.getTextbooks();
  },

  resetAllData(): void {
    localStorage.removeItem(KEYS.QUESTIONS);
    localStorage.removeItem(KEYS.EXAMS);
    localStorage.removeItem(KEYS.LESSONS);
    localStorage.removeItem(KEYS.MEDIA);
    localStorage.removeItem(KEYS.RESULTS);
    localStorage.removeItem(KEYS.DOCUMENTS);
    localStorage.removeItem(KEYS.STUDENT_PROFILE);
    localStorage.removeItem(KEYS.ASSIGNMENTS);
    localStorage.removeItem(KEYS.SUBMISSIONS);
    localStorage.removeItem(KEYS.TEXTBOOKS);
    this.saveQuestions(INITIAL_QUESTIONS);
    this.saveExams(INITIAL_EXAMS);
    this.saveLessons(INITIAL_LESSONS);
    this.saveMedia(INITIAL_LESSON_MEDIA);
    this.saveDocuments(INITIAL_DOCUMENTS);
    this.saveAssignments(INITIAL_ASSIGNMENTS);
    this.saveSubmissions(INITIAL_SUBMISSIONS);
    this.saveTextbooks(INITIAL_TEXTBOOKS);
  }
};
