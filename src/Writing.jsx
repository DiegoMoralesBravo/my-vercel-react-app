import React, { useEffect, useState } from 'react';
import './quiz/Quiz.css';

export default function Writing({ onStateChange = () => {} }) {
  const [prompt, setPrompt] = useState('Write a short report about your last vacation (150-200 words).');
  const [text, setText] = useState('');

  useEffect(() => {
    onStateChange({ prompt, text, wordCount: text.trim() ? text.trim().split(/\s+/).length : 0 });
  }, [onStateChange, prompt, text]);

  return (
    <div className="quiz-app" style={{ paddingTop: 16 }}>
      <main className="container">
        <section className="quiz" aria-live="polite">
          <div className="q-title">Writing Task</div>
          <label className="status" htmlFor="writing-prompt">Prompt</label>
          <textarea
            id="writing-prompt"
            className="writing-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
          <label className="status" htmlFor="writing-text">Your Answer</label>
          <textarea
            id="writing-text"
            className="writing-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder="Type your report here..."
          />
          <div className="status">Word count: {text.trim() ? text.trim().split(/\s+/).length : 0}</div>
        </section>
      </main>
    </div>
  );
}

