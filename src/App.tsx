import React, { useState, useEffect } from 'react';
import {
  GradeLevel,
  SubjectId,
  Question,
  Exam,
  Lesson,
  UserExamResult,
  LessonMedia,
  UserAccount,
  Assignment,
  AssignmentSubmission,
  Textbook
} from './types';
import { SUBJECTS, INITIAL_ANNOUNCEMENTS, TeacherDocument } from './data/mockData';
import { storageService } from './services/storageService';
import { authService } from './services/authService';
import { NavTab } from './components/navigation/Navbar';
import { Sidebar } from './components/navigation/Sidebar';
import { TopBar } from './components/navigation/TopBar';
import { SubjectGradeDrawer } from './components/subject-grade/SubjectGradeDrawer';
import { Footer } from './components/Footer';
import { LoginModal } from './components/auth/LoginModal';
import { FeedbackModal } from './components/modals/FeedbackModal';
import { AboutModal } from './components/modals/AboutModal';

// Pages
import { HomePage } from './pages/home/HomePage';
import { StudentTextbooksPage } from './pages/textbooks/StudentTextbooksPage';
import { KnowledgePage } from './pages/knowledge/KnowledgePage';
import { PracticePage } from './pages/practice/PracticePage';
import { GamesPage } from './pages/games/GamesPage';
import { StatisticsPage } from './pages/statistics/StatisticsPage';
import { StudentAssignmentsPage } from './pages/assignments/StudentAssignmentsPage';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';

export function App() {
  // Global Subject & Grade State
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(() => storageService.getSelectedGrade());
  const [currentSubjectId, setCurrentSubjectId] = useState<SubjectId>(() => storageService.getSelectedSubject());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Mobile Sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals state
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => authService.getCurrentUser());

  // Data collections from Storage
  const [questions, setQuestions] = useState<Question[]>(() => storageService.getQuestions());
  const [exams, setExams] = useState<Exam[]>(() => storageService.getExams());
  const [lessons, setLessons] = useState<Lesson[]>(() => storageService.getLessons());
  const [mediaList, setMediaList] = useState<LessonMedia[]>(() => storageService.getMedia());
  const [examResults, setExamResults] = useState<UserExamResult[]>(() => storageService.getExamResults());
  const [documents, setDocuments] = useState<TeacherDocument[]>(() => storageService.getDocuments());
  const [studentProfile, setStudentProfile] = useState(() => storageService.getStudentProfile());
  const [assignments, setAssignments] = useState<Assignment[]>(() => storageService.getAssignments());
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => storageService.getSubmissions());
  const [textbooks, setTextbooks] = useState<Textbook[]>(() => storageService.getTextbooks());

  // Background server sync for persistent textbooks across devices/browsers
  useEffect(() => {
    storageService.syncTextbooksWithServer().then((synced) => {
      if (synced && synced.length > 0) {
        setTextbooks(synced);
      }
    });
  }, []);

  // Selected lesson for detail modal
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Sync current subject object
  const currentSubjectObj = SUBJECTS.find((s) => s.id === currentSubjectId) || SUBJECTS[0];

  const isTeacher = currentUser?.role === 'teacher';

  // Apply new Grade & Subject from Drawer / Homepage quick cards
  const handleApplySubjectGrade = (newGrade: GradeLevel, newSubjectId: SubjectId) => {
    setCurrentGrade(newGrade);
    setCurrentSubjectId(newSubjectId);
    storageService.setSelectedGrade(newGrade);
    storageService.setSelectedSubject(newSubjectId);
  };

  // Helper stats for drawer and indicators
  const getSubjectStats = (g: GradeLevel, sId: SubjectId) => {
    const lCount = lessons.filter((l) => l.grade === g && l.subjectId === sId).length;
    const qCount = questions.filter((q) => q.grade === g && q.subjectId === sId).length;
    return { lessonsCount: lCount, questionsCount: qCount };
  };

  // Login handler
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    if (user.role === 'teacher') {
      setActiveTab('teacher');
    } else {
      if (user.grade) {
        setCurrentGrade(user.grade);
        storageService.setSelectedGrade(user.grade);
      }
      setActiveTab('home');
    }
  };

  // Logout handler
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    if (activeTab === 'teacher') {
      setActiveTab('home');
    }
  };

  // Media Handlers
  const handleAddMedia = (item: LessonMedia) => {
    storageService.addMedia(item);
    setMediaList(storageService.getMedia());
  };

  const handleUpdateMedia = (item: LessonMedia) => {
    storageService.updateMedia(item);
    setMediaList(storageService.getMedia());
  };

  const handleDeleteMedia = (id: string) => {
    storageService.deleteMedia(id);
    setMediaList(storageService.getMedia());
  };

  // Assignments Handlers
  const handleAddAssignment = (asg: Assignment) => {
    storageService.addAssignment(asg);
    setAssignments(storageService.getAssignments());
  };

  const handleUpdateAssignment = (asg: Assignment) => {
    storageService.updateAssignment(asg);
    setAssignments(storageService.getAssignments());
  };

  const handleDeleteAssignment = (id: string) => {
    storageService.deleteAssignment(id);
    setAssignments(storageService.getAssignments());
  };

  // Submissions Handlers
  const handleSubmitAssignment = (sub: AssignmentSubmission) => {
    storageService.addSubmission(sub);
    setSubmissions(storageService.getSubmissions());
    alert('Nộp bài tập thành công! Kết quả đã được lưu trữ an toàn trên hệ thống.');
  };

  const handleGradeSubmission = (
    submissionId: string,
    score: number,
    feedback: string,
    gradedBy: string,
    questionScores?: Record<string, number>
  ) => {
    storageService.gradeSubmission(submissionId, score, feedback, gradedBy, questionScores);
    setSubmissions(storageService.getSubmissions());
  };

  // Exam result handler
  const handleSaveExamResult = (result: UserExamResult) => {
    storageService.saveExamResult(result);
    setExamResults(storageService.getExamResults());
    setStudentProfile(storageService.getStudentProfile());
  };

  // Add score from games
  const handleAddGameScore = (pts: number) => {
    const updated = { ...studentProfile, totalPoints: studentProfile.totalPoints + pts };
    storageService.saveStudentProfile(updated);
    setStudentProfile(updated);
  };

  // Textbook Handlers
  const handleAddTextbook = (b: Textbook) => {
    storageService.addTextbook(b);
    setTextbooks(storageService.getTextbooks());
  };

  const handleUpdateTextbook = (b: Textbook) => {
    storageService.updateTextbook(b);
    setTextbooks(storageService.getTextbooks());
  };

  const handleDeleteTextbook = (id: string) => {
    storageService.deleteTextbook(id);
    setTextbooks(storageService.getTextbooks());
  };

  const handleToggleTextbookStatus = (id: string) => {
    storageService.toggleTextbookStatus(id);
    setTextbooks(storageService.getTextbooks());
  };

  // Reset all data handler
  const handleResetData = () => {
    storageService.resetAllData();
    setQuestions(storageService.getQuestions());
    setExams(storageService.getExams());
    setLessons(storageService.getLessons());
    setMediaList(storageService.getMedia());
    setExamResults([]);
    setDocuments(storageService.getDocuments());
    setStudentProfile(storageService.getStudentProfile());
    setAssignments(storageService.getAssignments());
    setSubmissions(storageService.getSubmissions());
    setTextbooks(storageService.getTextbooks());
  };

  // Global real calculated statistics
  const totalQuestions = questions.length;
  const completedTests = examResults.length;
  const totalScoreSum = examResults.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = completedTests > 0 ? Math.round((totalScoreSum / completedTests) * 10) / 10 : 0;
  const totalLessons = lessons.length;
  const totalCorrectAll = examResults.reduce((acc, curr) => acc + curr.correctCount, 0);
  const totalQuestionsAnsweredAll = examResults.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const accuracyRate =
    totalQuestionsAnsweredAll > 0
      ? Math.round((totalCorrectAll / totalQuestionsAnsweredAll) * 100)
      : 0;

  // Filter lessons for current Grade & Subject for quick view on Home
  const currentLessons = lessons.filter(
    (l) => l.grade === currentGrade && l.subjectId === currentSubjectId
  );

  return (
    <div className="min-h-screen bg-[#F5F9FF] text-[#172B4D] flex font-sans selection:bg-[#2684FF]/20 selection:text-[#2684FF]">
      {/* 1. Left Fixed Sidebar (Navy Dark) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'teacher' && !isTeacher) {
            setIsLoginModalOpen(true);
            return;
          }
          setActiveTab(tab);
        }}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        currentUser={currentUser}
        onOpenTeacherAuth={() => setIsLoginModalOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Right Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Toolbar (Reordered: Search -> Class/Subject -> Teacher Mode -> Login) */}
        <TopBar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          grade={currentGrade}
          subject={currentSubjectObj}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          currentUser={currentUser}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          onOpenTeacherMode={() => {
            if (isTeacher) {
              setActiveTab('teacher');
            } else {
              setIsLoginModalOpen(true);
            }
          }}
          announcements={INITIAL_ANNOUNCEMENTS}
          lessons={lessons}
          onSelectLesson={(lesson) => {
            setSelectedLesson(lesson);
            setActiveTab('knowledge');
          }}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {activeTab === 'home' && (
            <HomePage
              onNavigate={setActiveTab}
              currentGrade={currentGrade}
              currentSubject={currentSubjectObj}
              onOpenDrawer={() => setIsDrawerOpen(true)}
              onSelectGrade={(g) => handleApplySubjectGrade(g, currentSubjectId)}
              onSelectSubject={(sId) => handleApplySubjectGrade(currentGrade, sId)}
              announcements={INITIAL_ANNOUNCEMENTS}
              totalQuestions={totalQuestions}
              completedTests={completedTests}
              averageScore={averageScore}
              totalLessons={totalLessons}
              accuracyRate={accuracyRate}
              currentLessons={currentLessons}
              onSelectLesson={(lesson) => {
                setSelectedLesson(lesson);
                setActiveTab('knowledge');
              }}
              isTeacher={isTeacher}
              onOpenTeacherAuth={() => setIsLoginModalOpen(true)}
            />
          )}

          {/* SÁCH GIÁO KHOA CHO HỌC SINH (SECTION III) */}
          {activeTab === 'textbooks' && (
            <StudentTextbooksPage
              textbooks={textbooks}
              currentGrade={currentGrade}
              currentSubjectId={currentSubjectId}
              onApplySubjectGrade={handleApplySubjectGrade}
              currentUser={currentUser}
              onAddTextbook={handleAddTextbook}
              onUpdateTextbook={handleUpdateTextbook}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {activeTab === 'assignments' && (
            <StudentAssignmentsPage
              currentGrade={currentGrade}
              currentSubject={currentSubjectObj}
              currentUser={currentUser}
              assignments={assignments}
              submissions={submissions}
              onSubmitAssignment={handleSubmitAssignment}
              onOpenLogin={() => setIsLoginModalOpen(true)}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {activeTab === 'knowledge' && (
            <KnowledgePage
              grade={currentGrade}
              subject={currentSubjectObj}
              lessons={lessons}
              mediaList={mediaList}
              onOpenDrawer={() => setIsDrawerOpen(true)}
              selectedLesson={selectedLesson}
              onSelectLesson={setSelectedLesson}
            />
          )}

          {activeTab === 'practice' && (
            <PracticePage
              grade={currentGrade}
              subject={currentSubjectObj}
              exams={exams}
              questions={questions}
              onOpenDrawer={() => setIsDrawerOpen(true)}
              examResults={examResults}
              onSaveResult={handleSaveExamResult}
            />
          )}

          {activeTab === 'games' && (
            <GamesPage
              grade={currentGrade}
              subject={currentSubjectObj}
              questions={questions}
              onOpenDrawer={() => setIsDrawerOpen(true)}
              onAddScore={handleAddGameScore}
            />
          )}

          {activeTab === 'statistics' && (
            <StatisticsPage
              examResults={examResults}
              profile={studentProfile}
              grade={currentGrade}
              subject={currentSubjectObj}
              onOpenDrawer={() => setIsDrawerOpen(true)}
              onResetData={handleResetData}
            />
          )}

          {/* Protected Teacher Area with Route Guard per Phần II & VII */}
          {activeTab === 'teacher' &&
            (isTeacher ? (
              <TeacherDashboard
                questions={questions}
                onAddQuestion={(newQ) => {
                  storageService.addQuestion(newQ);
                  setQuestions(storageService.getQuestions());
                }}
                onUpdateQuestion={(updated) => {
                  storageService.updateQuestion(updated);
                  setQuestions(storageService.getQuestions());
                }}
                onDeleteQuestion={(id) => {
                  storageService.deleteQuestion(id);
                  setQuestions(storageService.getQuestions());
                }}
                exams={exams}
                onAddExam={(newEx) => {
                  storageService.addExam(newEx);
                  setExams(storageService.getExams());
                }}
                lessons={lessons}
                onAddLesson={(newLes) => {
                  storageService.addLesson(newLes);
                  setLessons(storageService.getLessons());
                }}
                onUpdateLesson={(updated) => {
                  storageService.updateLesson(updated);
                  setLessons(storageService.getLessons());
                }}
                onDeleteLesson={(id) => {
                  storageService.deleteLesson(id);
                  setLessons(storageService.getLessons());
                }}
                documents={documents}
                onAddDocument={(newDoc) => {
                  storageService.addDocument(newDoc);
                  setDocuments(storageService.getDocuments());
                }}
                onUpdateDocument={(updatedDoc) => {
                  storageService.updateDocument(updatedDoc);
                  setDocuments(storageService.getDocuments());
                }}
                onDeleteDocument={(id) => {
                  storageService.deleteDocument(id);
                  setDocuments(storageService.getDocuments());
                }}
                mediaList={mediaList}
                onAddMedia={handleAddMedia}
                onUpdateMedia={handleUpdateMedia}
                onDeleteMedia={handleDeleteMedia}
                assignments={assignments}
                onAddAssignment={handleAddAssignment}
                onUpdateAssignment={handleUpdateAssignment}
                onDeleteAssignment={handleDeleteAssignment}
                submissions={submissions}
                onGradeSubmission={handleGradeSubmission}
                textbooks={textbooks}
                onAddTextbook={handleAddTextbook}
                onUpdateTextbook={handleUpdateTextbook}
                onDeleteTextbook={handleDeleteTextbook}
                onToggleTextbookStatus={handleToggleTextbookStatus}
                onLogout={handleLogout}
                currentGrade={currentGrade}
                currentSubject={currentSubjectObj}
                currentUser={currentUser}
              />
            ) : (
              <div className="p-8 sm:p-12 text-center rounded-3xl bg-white border border-red-200 shadow-sm space-y-4 max-w-lg mx-auto my-12 animate-fadeIn">
                <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#172B4D]">
                    Từ chối quyền truy cập
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed bg-amber-50 p-3 rounded-2xl border border-amber-200 text-amber-900 font-medium">
                    "Tài khoản học sinh không có quyền truy cập khu vực giáo viên. Vui lòng đăng nhập bằng tài khoản giáo viên được cấp quyền."
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('home')}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Về Trang chủ học sinh
                  </button>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    Đăng nhập tài khoản Giáo viên
                  </button>
                </div>
              </div>
            ))}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Mandatory Sliding Drawer for Subject & Grade */}
      <SubjectGradeDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentGrade={currentGrade}
        currentSubjectId={currentSubjectId}
        onApply={handleApplySubjectGrade}
        getSubjectStats={getSubjectStats}
      />

      {/* Login Authentication Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Feedback Modal (Hồi đáp) */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        currentGrade={currentGrade}
      />

      {/* About School Modal (Giới thiệu) */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

export default App;
