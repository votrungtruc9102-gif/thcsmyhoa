import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Sparkles,
  Trophy,
  RotateCw,
  Zap,
  Layers,
  HelpCircle,
  CheckCircle,
  XCircle,
  Timer,
  Play,
  RotateCcw,
  Star,
  Brain
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GradeLevel, SubjectMeta, Question } from '../../types';
import { MATCHING_GAME_PAIRS, WORD_GUESS_LIST, TermPair, WordGuess } from '../../data/mockData';

interface GamesPageProps {
  grade: GradeLevel;
  subject: SubjectMeta;
  questions: Question[];
  onOpenDrawer: () => void;
  onAddScore: (points: number) => void;
}

type GameMode = 'hub' | 'wheel' | 'matching' | 'speed' | 'word_guess' | 'flash_tilt';

export const GamesPage: React.FC<GamesPageProps> = ({
  grade,
  subject,
  questions,
  onOpenDrawer,
  onAddScore
}) => {
  const [activeGame, setActiveGame] = useState<GameMode>('hub');

  // Filter questions for current grade & subject
  const availableQuestions = questions.filter(
    q => q.grade === grade && q.subjectId === subject.id
  );

  // ----------------------------------------------------
  // 1. LUCKY WHEEL (VÒNG QUAY MAY MẮN)
  // ----------------------------------------------------
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelQuestion, setWheelQuestion] = useState<Question | null>(null);
  const [selectedWheelOption, setSelectedWheelOption] = useState<number | null>(null);
  const [wheelResultMsg, setWheelResultMsg] = useState<string>('');

  const spinWheel = () => {
    if (isSpinning || availableQuestions.length === 0) return;
    setIsSpinning(true);
    setWheelQuestion(null);
    setSelectedWheelOption(null);
    setWheelResultMsg('');

    const randomDeg = 1440 + Math.floor(Math.random() * 360);
    setWheelRotation(prev => prev + randomDeg);

    setTimeout(() => {
      setIsSpinning(false);
      // Pick random question
      const randomQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setWheelQuestion(randomQ);
    }, 2800);
  };

  const handleWheelAnswer = (optIndex: number) => {
    if (!wheelQuestion || selectedWheelOption !== null) return;
    setSelectedWheelOption(optIndex);

    if (optIndex === wheelQuestion.correctAnswerIndex) {
      setWheelResultMsg('🎉 Chính xác! Bạn nhận được +20 điểm thưởng!');
      onAddScore(20);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    } else {
      setWheelResultMsg('Chưa đúng rồi! ' + wheelQuestion.explanation);
    }
  };

  // ----------------------------------------------------
  // 2. MATCHING PAIRS (GHÉP CẶP CÂU HỎI VÀ ĐÁP ÁN)
  // ----------------------------------------------------
  const [matchingCards, setMatchingCards] = useState<{ id: string; text: string; pairId: string; type: 'term' | 'def' }[]>([]);
  const [selectedMatchFirst, setSelectedMatchFirst] = useState<{ id: string; pairId: string } | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [matchingScore, setMatchingScore] = useState(0);

  const initMatchingGame = () => {
    const rawPairs = MATCHING_GAME_PAIRS.slice(0, 4);
    const cards: { id: string; text: string; pairId: string; type: 'term' | 'def' }[] = [];
    rawPairs.forEach(p => {
      cards.push({ id: `${p.id}-term`, text: p.term, pairId: p.id, type: 'term' });
      cards.push({ id: `${p.id}-def`, text: p.definition, pairId: p.id, type: 'def' });
    });
    // Shuffle
    cards.sort(() => Math.random() - 0.5);
    setMatchingCards(cards);
    setMatchedPairIds(new Set());
    setSelectedMatchFirst(null);
    setMatchingScore(0);
  };

  const handleCardClick = (card: { id: string; pairId: string }) => {
    if (matchedPairIds.has(card.pairId)) return;
    if (!selectedMatchFirst) {
      setSelectedMatchFirst(card);
    } else {
      if (selectedMatchFirst.id === card.id) {
        setSelectedMatchFirst(null);
        return;
      }
      if (selectedMatchFirst.pairId === card.pairId) {
        // Match!
        const next = new Set(matchedPairIds);
        next.add(card.pairId);
        setMatchedPairIds(next);
        setSelectedMatchFirst(null);
        setMatchingScore(prev => prev + 15);
        onAddScore(15);
        if (next.size === matchingCards.length / 2) {
          try {
            confetti({ particleCount: 100, spread: 80 });
          } catch {}
        }
      } else {
        // Wrong match
        setSelectedMatchFirst(null);
      }
    }
  };

  // ----------------------------------------------------
  // 3. SPEED CHALLENGE (THỬ THÁCH 60 GIÂY)
  // ----------------------------------------------------
  const [speedQuestions, setSpeedQuestions] = useState<Question[]>([]);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(60);
  const [speedScore, setSpeedScore] = useState(0);
  const [isSpeedRunning, setIsSpeedRunning] = useState(false);
  const [speedGameOver, setSpeedGameOver] = useState(false);

  const startSpeedGame = () => {
    const list = [...availableQuestions].sort(() => 0.5 - Math.random());
    setSpeedQuestions(list);
    setSpeedIndex(0);
    setSpeedTimeLeft(60);
    setSpeedScore(0);
    setSpeedGameOver(false);
    setIsSpeedRunning(true);
  };

  useEffect(() => {
    if (!isSpeedRunning || speedTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setSpeedTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSpeedRunning(false);
          setSpeedGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSpeedRunning, speedTimeLeft]);

  const handleSpeedAnswer = (optIndex: number) => {
    const currentQ = speedQuestions[speedIndex];
    if (!currentQ) return;
    if (optIndex === currentQ.correctAnswerIndex) {
      setSpeedScore(prev => prev + 10);
      onAddScore(10);
    }
    if (speedIndex < speedQuestions.length - 1) {
      setSpeedIndex(prev => prev + 1);
    } else {
      setIsSpeedRunning(false);
      setSpeedGameOver(true);
    }
  };

  // ----------------------------------------------------
  // 4. WORD GUESS (ĐOÁN TỪ KHÓA)
  // ----------------------------------------------------
  const [wordIdx, setWordIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wordWrongCount, setWordWrongCount] = useState(0);

  const currentWordItem = WORD_GUESS_LIST[wordIdx % WORD_GUESS_LIST.length];
  const targetWord = currentWordItem.word.toUpperCase();

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.has(letter)) return;
    const next = new Set(guessedLetters);
    next.add(letter);
    setGuessedLetters(next);
    if (!targetWord.includes(letter)) {
      setWordWrongCount(prev => prev + 1);
    } else {
      // Check if complete
      const allFound = targetWord.split('').every(ch => next.has(ch) || ch === ' ');
      if (allFound) {
        onAddScore(25);
        try {
          confetti({ particleCount: 80, spread: 70 });
        } catch {}
      }
    }
  };

  const nextWord = () => {
    setWordIdx(prev => prev + 1);
    setGuessedLetters(new Set());
    setWordWrongCount(0);
  };

  // ----------------------------------------------------
  // 5. NGHIÊNG ĐẦU / FLASH TILT
  // ----------------------------------------------------
  const [flashIdx, setFlashIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashKnownCount, setFlashKnownCount] = useState(0);

  const currentFlash = availableQuestions[flashIdx % (availableQuestions.length || 1)];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
              Đấu trường trò chơi giáo dục
            </span>
            <span className="text-xs text-slate-400 font-medium">• THCS Mỹ Hòa</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
            Vừa chơi vừa học: {subject.name} — Khối {grade}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Biến kiến thức sách vở thành các thử thách tương tác sinh động: Vòng quay may mắn, Ghép cặp thuật ngữ, Đoán từ khóa và Thử thách 60 giây.
          </p>
        </div>

        <button
          onClick={onOpenDrawer}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 hover:border-blue-400 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0 self-start md:self-auto"
        >
          <Layers className="w-4 h-4 text-[#2684FF]" />
          <span>Đổi môn hoặc khối khác</span>
        </button>
      </div>

      {/* GAME HUB MENU */}
      {activeGame === 'hub' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Lucky Wheel */}
          <div
            onClick={() => setActiveGame('wheel')}
            className="group p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-white border border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 mb-4 group-hover:rotate-45 transition-transform duration-300">
                <RotateCw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#172B4D]">
                1. Vòng quay may mắn
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Quay kim may mắn để nhận ngẫu nhiên câu hỏi trắc nghiệm từ ngân hàng đề và cộng điểm thi đua tức thì.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Thưởng +20đ mỗi câu</span>
              <span className="group-hover:translate-x-1 transition-transform">Chơi ngay →</span>
            </div>
          </div>

          {/* Card 2: Matching Pairs */}
          <div
            onClick={() => {
              initMatchingGame();
              setActiveGame('matching');
            }}
            className="group p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-white border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#172B4D]">
                2. Ghép cặp câu hỏi và đáp án
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Lật mở các thẻ để ghép đúng thuật ngữ tin học với định nghĩa chính xác. Rèn luyện trí nhớ và phản xạ.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Ghi nhớ khái niệm</span>
              <span className="group-hover:translate-x-1 transition-transform">Chơi ngay →</span>
            </div>
          </div>

          {/* Card 3: Speed Challenge */}
          <div
            onClick={() => {
              startSpeedGame();
              setActiveGame('speed');
            }}
            className="group p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-white border border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#172B4D]">
                3. Thử thách trả lời nhanh 60s
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Đồng hồ đếm ngược 60 giây! Trả lời càng nhiều câu hỏi liên tiếp càng ghi được combo điểm cao.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Đua tốc độ tư duy</span>
              <span className="group-hover:translate-x-1 transition-transform">Chơi ngay →</span>
            </div>
          </div>

          {/* Card 4: Word Guessing */}
          <div
            onClick={() => {
              setGuessedLetters(new Set());
              setWordWrongCount(0);
              setActiveGame('word_guess');
            }}
            className="group p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-white border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#172B4D]">
                4. Đoán từ khóa bí mật
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Đọc gợi ý của thầy cô và đoán từng chữ cái để tìm ra thuật ngữ công nghệ bí ẩn trước khi hết lượt đoán.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>Đoán chữ cái tiếng Anh/Tin</span>
              <span className="group-hover:translate-x-1 transition-transform">Chơi ngay →</span>
            </div>
          </div>

          {/* Card 5: Flashcard Tilt */}
          <div
            onClick={() => {
              setFlashIdx(0);
              setIsFlipped(false);
              setFlashKnownCount(0);
              setActiveGame('flash_tilt');
            }}
            className="group p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-white border border-cyan-200 hover:border-cyan-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#172B4D]">
                5. Thẻ ghi nhớ nhanh (Flashcards)
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Lật thẻ câu hỏi và xem đáp án tức thì. Phân loại câu đã thuộc và câu cần ôn tập lại.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cyan-100 flex items-center justify-between text-xs font-bold text-cyan-700">
              <span>Luyện trí nhớ dài hạn</span>
              <span className="group-hover:translate-x-1 transition-transform">Chơi ngay →</span>
            </div>
          </div>
        </div>
      )}

      {/* 1. LUCKY WHEEL GAME INTERFACE */}
      {activeGame === 'wheel' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveGame('hub')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                ← Quay lại sảnh trò chơi
              </button>
              <h3 className="text-base font-extrabold text-[#172B4D]">
                Vòng quay may mắn: {subject.name} Lớp {grade}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* The Wheel */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Needle */}
                <div className="absolute -top-3 z-20 w-6 h-8 text-red-600 drop-shadow-md">
                  ▼
                </div>

                {/* Rotating Circle */}
                <div
                  className="w-56 h-56 rounded-full border-8 border-amber-400 shadow-xl flex items-center justify-center transition-all duration-[2800ms] ease-out relative overflow-hidden"
                  style={{
                    transform: `rotate(${wheelRotation}deg)`,
                    background: 'conic-gradient(#2684FF 0deg 45deg, #FFB020 45deg 90deg, #22C55E 90deg 135deg, #8B5CF6 135deg 180deg, #22C7E8 180deg 225deg, #EC4899 225deg 270deg, #F97316 270deg 315deg, #14B8A6 315deg 360deg)'
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center font-black text-xs text-slate-800">
                    THCS Mỹ Hòa
                  </div>
                </div>
              </div>

              <button
                onClick={spinWheel}
                disabled={isSpinning || availableQuestions.length === 0}
                className={`mt-6 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md cursor-pointer transition-all ${
                  isSpinning
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20 active:scale-95'
                }`}
              >
                <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                {isSpinning ? 'Đang quay...' : 'Quay Vòng May Mắn!'}
              </button>
            </div>

            {/* Question Display */}
            <div className="md:col-span-7">
              {wheelQuestion ? (
                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-4 animate-scaleUp">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-100">
                      Câu hỏi từ vòng quay
                    </span>
                    <span className="text-xs text-slate-500">{wheelQuestion.chapter}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#172B4D]">
                    {wheelQuestion.content}
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5">
                    {wheelQuestion.options.map((opt, optIdx) => {
                      const isSelected = selectedWheelOption === optIdx;
                      const isCorrect = optIdx === wheelQuestion.correctAnswerIndex;

                      let btnStyle = 'bg-white hover:bg-blue-50 border-slate-200 text-slate-700';
                      if (selectedWheelOption !== null) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-100 border-red-500 text-red-900';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={selectedWheelOption !== null}
                          onClick={() => handleWheelAnswer(optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-100 font-bold text-xs flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {wheelResultMsg && (
                    <div className="p-3 rounded-xl bg-white border border-blue-200 text-xs text-slate-700 font-medium">
                      {wheelResultMsg}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-500">
                  <RotateCw className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                  <p className="text-sm font-bold text-slate-700">Hãy nhấn nút "Quay Vòng May Mắn"</p>
                  <p className="text-xs text-slate-500 mt-1">Hệ thống sẽ chọn ngẫu nhiên một câu hỏi thú vị để bạn thử sức!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. MATCHING PAIRS GAME INTERFACE */}
      {activeGame === 'matching' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveGame('hub')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                ← Quay lại sảnh trò chơi
              </button>
              <h3 className="text-base font-extrabold text-[#172B4D]">
                Ghép cặp thuật ngữ: {subject.name} Lớp {grade}
              </h3>
            </div>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Điểm đạt được: +{matchingScore}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {matchingCards.map(card => {
              const isMatched = matchedPairIds.has(card.pairId);
              const isSelected = selectedMatchFirst?.id === card.id;

              return (
                <button
                  key={card.id}
                  disabled={isMatched}
                  onClick={() => handleCardClick(card)}
                  className={`p-4 min-h-[110px] rounded-2xl border-2 flex flex-col justify-center text-center transition-all cursor-pointer ${
                    isMatched
                      ? 'border-emerald-300 bg-emerald-50/80 text-emerald-800 opacity-80 cursor-default'
                      : isSelected
                      ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-400 text-blue-900 shadow-md'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-800 shadow-xs'
                  }`}
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    {card.type === 'term' ? 'Thuật ngữ' : 'Khái niệm'}
                  </span>
                  <span className={`text-xs sm:text-sm font-bold ${card.type === 'term' ? 'text-blue-700 text-base' : 'text-slate-700'}`}>
                    {card.text}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={initMatchingGame}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Chơi ván mới
            </button>
          </div>
        </div>
      )}

      {/* 3. SPEED CHALLENGE GAME INTERFACE */}
      {activeGame === 'speed' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveGame('hub')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                ← Quay lại sảnh trò chơi
              </button>
              <h3 className="text-base font-extrabold text-[#172B4D]">
                Thử thách 60 giây tốc độ
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-xl border border-red-200">
                <Timer className="w-4 h-4 animate-spin" />
                {speedTimeLeft}s
              </div>
              <div className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                Điểm: {speedScore}
              </div>
            </div>
          </div>

          {speedGameOver ? (
            <div className="p-8 text-center rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 space-y-4">
              <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
              <h4 className="text-xl font-black text-[#172B4D]">
                Hết giờ! Bạn đã đạt {speedScore} điểm!
              </h4>
              <p className="text-xs text-slate-600">
                Thật tuyệt vời, điểm số đã được cộng dồn vào bảng thành tích cá nhân của bạn.
              </p>
              <button
                onClick={startSpeedGame}
                className="px-5 py-2.5 rounded-xl bg-[#2684FF] text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Chơi lại lượt mới
              </button>
            </div>
          ) : speedQuestions[speedIndex] ? (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Câu hỏi số {speedIndex + 1}/{speedQuestions.length}</span>
                <span>Chủ đề: {speedQuestions[speedIndex].chapter}</span>
              </div>

              <h4 className="text-lg font-bold text-[#172B4D] leading-snug">
                {speedQuestions[speedIndex].content}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {speedQuestions[speedIndex].options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSpeedAnswer(optIdx)}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 text-xs sm:text-sm font-medium text-left transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* 4. WORD GUESS GAME INTERFACE */}
      {activeGame === 'word_guess' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveGame('hub')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                ← Quay lại sảnh trò chơi
              </button>
              <h3 className="text-base font-extrabold text-[#172B4D]">
                Đoán từ khóa công nghệ: {subject.name}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Lỗi: {wordWrongCount} / 6
            </span>
          </div>

          <div className="text-center space-y-6 max-w-xl mx-auto">
            {/* Hint Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              💡 <strong>Gợi ý:</strong> {currentWordItem.hint}
            </div>

            {/* Word Display (Letters) */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {targetWord.split('').map((char, idx) => {
                const isGuessed = guessedLetters.has(char) || char === ' ';
                return (
                  <div
                    key={idx}
                    className={`w-10 h-12 sm:w-12 sm:h-14 rounded-xl border-2 font-black text-lg sm:text-xl flex items-center justify-center ${
                      char === ' '
                        ? 'border-transparent w-4'
                        : isGuessed
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-300 bg-slate-50 text-transparent'
                    }`}
                  >
                    {isGuessed ? char : '_'}
                  </div>
                );
              })}
            </div>

            {/* Alphabet Keyboard */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto pt-4">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
                const isUsed = guessedLetters.has(letter);
                return (
                  <button
                    key={letter}
                    disabled={isUsed || wordWrongCount >= 6}
                    onClick={() => handleLetterGuess(letter)}
                    className={`w-8 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                      isUsed
                        ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-blue-50 hover:border-blue-400'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={nextWord}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 cursor-pointer"
              >
                Chuyển từ khóa tiếp theo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. FLASHCARD TILT INTERFACE */}
      {activeGame === 'flash_tilt' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveGame('hub')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                ← Quay lại sảnh trò chơi
              </button>
              <h3 className="text-base font-extrabold text-[#172B4D]">
                Thẻ nhớ Flashcard nhanh
              </h3>
            </div>
            <span className="text-xs font-bold text-blue-700">
              Đã thuộc: {flashKnownCount} thẻ
            </span>
          </div>

          {currentFlash ? (
            <div className="max-w-md mx-auto space-y-6">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[220px] p-6 rounded-3xl bg-gradient-to-tr from-purple-50 via-white to-blue-50 border-2 border-purple-200 shadow-md flex flex-col justify-between cursor-pointer hover:border-purple-400 transition-all select-none"
              >
                <div className="text-[11px] font-bold text-purple-600 uppercase flex items-center justify-between">
                  <span>{currentFlash.chapter}</span>
                  <span className="text-slate-400">Nhấn thẻ để lật</span>
                </div>

                <div className="my-auto text-center py-4">
                  {!isFlipped ? (
                    <div className="text-base font-extrabold text-[#172B4D]">
                      {currentFlash.content}
                    </div>
                  ) : (
                    <div className="space-y-2 animate-fadeIn">
                      <div className="text-xs font-bold text-emerald-700 uppercase">Đáp án chính xác:</div>
                      <div className="text-base font-bold text-emerald-900">
                        {currentFlash.options[currentFlash.correctAnswerIndex]}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pt-2">
                        {currentFlash.explanation}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center text-[10px] text-slate-400 font-medium">
                  {!isFlipped ? 'Chạm để xem đáp án & giải thích' : 'Chạm để quay lại câu hỏi'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashIdx(prev => prev + 1);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Chưa thuộc, cần học lại
                </button>
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashKnownCount(prev => prev + 1);
                    setFlashIdx(prev => prev + 1);
                    onAddScore(10);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  Đã thuộc (+10đ)
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-slate-500">Chưa có câu hỏi cho môn này.</div>
          )}
        </div>
      )}
    </div>
  );
};
