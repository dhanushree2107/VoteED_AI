import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw, ArrowRight, Timer } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "In which year was the Electronic Voting Machine (EVM) first used in Indian elections?",
    options: ["1977", "1982", "1989", "1998"],
    correct: 1,
    explanation: "EVMs were first used in the 1982 Kerala State Legislative Assembly election in Paravur constituency."
  },
  {
    id: 2,
    question: "What is the minimum age required to vote in Indian elections?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "Article 326 of the Indian Constitution grants the right to vote to every citizen who is 18 years of age or above."
  },
  {
    id: 3,
    question: "How many seats does the Lok Sabha have?",
    options: ["441", "543", "545", "552"],
    correct: 1,
    explanation: "The Lok Sabha has 543 elected seats. A party needs 272 seats for a majority government."
  },
  {
    id: 4,
    question: "What does VVPAT stand for?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Voting Verification Print Audit Tool",
      "Voter Verified Print Audit Technology",
      "Vote Verified Paper Audit Track"
    ],
    correct: 0,
    explanation: "VVPAT (Voter Verified Paper Audit Trail) prints a paper slip showing the candidate voted for, visible for 7 seconds."
  },
  {
    id: 5,
    question: "Which form must be filled for new voter registration in India?",
    options: ["Form 4", "Form 6", "Form 8", "Form 10"],
    correct: 1,
    explanation: "Form 6 is used for new voter registration. Form 8 is for corrections/changes in existing registration."
  },
  {
    id: 6,
    question: "What is the Model Code of Conduct (MCC)?",
    options: [
      "A law passed by Parliament",
      "Guidelines for political parties during elections",
      "Rules for counting votes",
      "Regulations for candidates' education"
    ],
    correct: 1,
    explanation: "The MCC is a set of guidelines issued by the ECI for political parties and candidates to ensure free and fair elections."
  },
  {
    id: 7,
    question: "The Election Commission of India was established on:",
    options: ["26 January 1950", "25 January 1950", "15 August 1947", "2 October 1951"],
    correct: 1,
    explanation: "The Election Commission of India was established on January 25, 1950, one day before India became a Republic."
  },
  {
    id: 8,
    question: "What security deposit must a Lok Sabha candidate pay?",
    options: ["₹10,000", "₹25,000", "₹50,000", "₹1,00,000"],
    correct: 1,
    explanation: "The security deposit for Lok Sabha candidates is ₹25,000 (₹12,500 for SC/ST candidates). It is forfeited if they get less than 1/6th of votes polled."
  },
];

const QuizPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  const q = QUESTIONS[current];
  const progress = ((current) / QUESTIONS.length) * 100;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) {
      setScore(s => s + 1);
    } else {
      setWrongAnswers(prev => [...prev, current]);
    }
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setWrongAnswers([]);
  };

  const getGrade = () => {
    const pct = (score / QUESTIONS.length) * 100;
    if (pct >= 90) return { label: 'Excellent! 🏆', color: 'text-yellow-400' };
    if (pct >= 70) return { label: 'Great! 🎉', color: 'text-emerald-400' };
    if (pct >= 50) return { label: 'Good effort! 📚', color: 'text-blue-400' };
    return { label: 'Keep learning! 💪', color: 'text-orange-400' };
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        {!finished ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Election Quiz</h2>
                <p className="text-slate-400 text-sm">Question {current + 1} of {QUESTIONS.length}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{score}</p>
                <p className="text-slate-500 text-xs">Score</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full mb-8">
              <motion.div
                className="quiz-progress h-full rounded-full"
                animate={{ width: `${((current + (answered ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-6 shadow-xl">
                  <div className="flex items-start gap-3 mb-8">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-600/20 text-primary-400 rounded-full flex items-center justify-center text-sm font-bold">
                      Q{current + 1}
                    </span>
                    <p className="text-white text-lg font-semibold leading-relaxed">{q.question}</p>
                  </div>

                  <div className="space-y-3">
                    {q.options.map((opt, idx) => {
                      let style = 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-primary-500 hover:bg-slate-800';
                      if (answered) {
                        if (idx === q.correct) style = 'bg-emerald-500/10 border-emerald-500 text-emerald-300';
                        else if (idx === selected) style = 'bg-red-500/10 border-red-500 text-red-300';
                        else style = 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-50';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          className={`w-full text-left flex items-center gap-4 px-5 py-4 border rounded-2xl transition-all ${style} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm font-medium">{opt}</span>
                          {answered && idx === q.correct && <CheckCircle className="w-5 h-5 text-emerald-400 ml-auto flex-shrink-0" />}
                          {answered && idx === selected && idx !== q.correct && <XCircle className="w-5 h-5 text-red-400 ml-auto flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 bg-primary-600/10 border border-primary-600/30 rounded-2xl p-4"
                    >
                      <p className="text-primary-300 text-sm font-medium mb-1">💡 Explanation</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
                    </motion.div>
                  )}
                </div>

                {answered && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleNext}
                    className="w-full btn-shine bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
                  >
                    {current < QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-900/30">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Quiz Complete!</h2>
              <p className={`text-xl font-bold mb-6 ${getGrade().color}`}>{getGrade().label}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800 rounded-2xl p-4">
                  <p className="text-3xl font-black text-white">{score}</p>
                  <p className="text-slate-400 text-sm">Correct</p>
                </div>
                <div className="bg-slate-800 rounded-2xl p-4">
                  <p className="text-3xl font-black text-red-400">{QUESTIONS.length - score}</p>
                  <p className="text-slate-400 text-sm">Wrong</p>
                </div>
                <div className="bg-slate-800 rounded-2xl p-4">
                  <p className="text-3xl font-black text-primary-400">{Math.round((score / QUESTIONS.length) * 100)}%</p>
                  <p className="text-slate-400 text-sm">Score</p>
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full h-3 bg-slate-800 rounded-full mb-8">
                <div
                  className="quiz-progress h-full rounded-full"
                  style={{ width: `${(score / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <button
                onClick={handleRestart}
                className="btn-shine bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-2xl flex items-center gap-2 mx-auto hover:opacity-90 transition-all active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default QuizPage;
