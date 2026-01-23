import React, { useEffect, useMemo, useState } from 'react';
import './Quiz.css';
import { QUIZ_DATA } from './data';

const levels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export default function Quiz({ onStateChange = () => {}, sequential = true }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const level = levels[levelIndex]?.value;
  const levelLabel = levels[levelIndex]?.label;
  const [questions, setQuestions] = useState(() => QUIZ_DATA[levels[0].value] || []);
  const [answers, setAnswers] = useState({}); // { [questionId]: optionIndex }
  const [scored, setScored] = useState(false);
  const [score, setScore] = useState(null); // { correct, total, pct }
  const [results, setResults] = useState([]); // sequence of completed levels
  const [finished, setFinished] = useState(false);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  // Load questions whenever the levelIndex changes
  useEffect(() => {
    const lvl = levels[levelIndex]?.value;
    const qs = QUIZ_DATA[lvl] || [];
    setQuestions(qs);
    setAnswers({});
    setScored(false);
    setScore(null);
  }, [levelIndex]);

  const handleSelect = (qid, idx) => {
    setAnswers(a => ({ ...a, [qid]: idx }));
    if (scored) setScored(false);
  };

  const handleScore = () => {
    let correct = 0;
    for (const q of questions) {
      if (answers[q.id] === q.answer) correct += 1;
    }
    const total = questions.length || 0;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    setScore({ correct, total, pct });
    setScored(true);
  };

  const handleReset = () => {
    setAnswers({});
    setScored(false);
    setScore(null);
  };

  // Bubble state up for parent to collect submissions
  useEffect(() => {
    onStateChange({ level, levelLabel, levelIndex, questions, answers, scored, score, sequence: results, finished });
  }, [onStateChange, level, levelLabel, levelIndex, questions, answers, scored, score, results, finished]);

  const pushCurrentResult = () => {
    if (!score) return;
    const entry = { level, levelLabel, score, answers: { ...answers }, questions, completedAt: Date.now() };
    setResults(prev => {
      // avoid duplicate pushes if user hits buttons repeatedly
      const exists = prev.some(e => e.level === level && e.completedAt === entry.completedAt);
      return exists ? prev : [...prev, entry];
    });
  };

  const handleContinue = () => {
    if (!scored || !score) return;
    pushCurrentResult();
    if (levelIndex < levels.length - 1) {
      setLevelIndex(i => i + 1);
    }
  };

  const handleFinish = () => {
    if (!scored || !score) return;
    pushCurrentResult();
    setFinished(true);
  };

  return (
    <div className="quiz-app">
      <div className="container">
        <section className="controls" aria-label="Test Controls">
          <div className="LevelBadge">Level: {levelLabel}</div>
          {sequential && (
            <div className="Progress">{levelIndex + 1} / {levels.length}</div>
          )}
        </section>

        <section className="quiz" aria-live="polite">
          {questions.map((q, idx) => (
            <article key={q.id} className={`question ${scored ? (answers[q.id] === q.answer ? 'correct' : 'incorrect') : ''}`}>
              <div className="q-title">{idx + 1}. {q.text}</div>
              <div className="options">
                {q.options.map((opt, i) => (
                  <label key={`${q.id}-${i}`} className="option">
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === i}
                      onChange={() => handleSelect(q.id, i)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              <div className="status">
                {scored && (answers[q.id] === q.answer ? 'Correct!' : `Incorrect. ${q.explanation}`)}
              </div>
            </article>
          ))}
          {questions.length === 0 && (
            <div className="empty">No questions available.</div>
          )}
        </section>

        <section className="actions">
          <button className="primary" onClick={handleScore} disabled={questions.length === 0}>Score Test</button>
          <button className="secondary" onClick={handleReset} disabled={questions.length === 0 && answeredCount === 0}>Reset</button>
          {scored && (
            <>
              {levelIndex < levels.length - 1 && (
                <button className="secondary" onClick={handleContinue}>Continue to {levels[levelIndex + 1].label}</button>
              )}
              <button className="primary" onClick={handleFinish}>Finish Here</button>
            </>
          )}
        </section>

        <section className="result" aria-live="polite">
          {scored && score && (
            <span>Score: {score.correct}/{score.total} ({score.pct}%)</span>
          )}
          {!scored && questions.length > 0 && (
            <span>{answeredCount}/{questions.length} answered</span>
          )}
        </section>
      </div>
    </div>
  );
}
