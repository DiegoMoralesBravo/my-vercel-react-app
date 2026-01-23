import './App.css';
import React, { useMemo, useState } from 'react';
import Quiz from './quiz/Quiz';
import Writing from './Writing';

const tabs = [
  { key: 'general', label: 'General Quiz' },
  { key: 'writing', label: 'Writing' },
  { key: 'other', label: 'Other' },
];

function App() {
  const [active, setActive] = useState('general');
  const [quizState, setQuizState] = useState(null);
  const [writingState, setWritingState] = useState(null);
  const [student, setStudent] = useState('');

  const summary = useMemo(() => {
    if (!quizState) return null;
    const seq = quizState.sequence || [];
    if (seq.length === 0) return null;
    const lines = seq.map(s => `${s.levelLabel}: ${s.score.correct}/${s.score.total} (${s.score.pct}%)`);
    return `Progress — ${lines.join(' | ')}`;
  }, [quizState]);

  return (
    <div className="App">
      <header className="Banner">
        <div className="Banner-inner">
          <div className="Brand">English Test Online</div>
          <nav className="Nav">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`NavBtn ${active === t.key ? 'active' : ''}`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {active === 'general' && <Quiz onStateChange={setQuizState} />}
      {active === 'writing' && <Writing onStateChange={setWritingState} />}
      {active === 'other' && (
        <div className="Section">
          <p>Other test section (coming soon).</p>
        </div>
      )}

      <div className="Section">
        {summary && <div className="Summary">{summary}</div>}
        <div className="SubmitRow">
          <label htmlFor="student" className="FieldLabel">Student name/email</label>
          <input id="student" className="FieldInput" value={student} onChange={(e)=>setStudent(e.target.value)} placeholder="Name or email" />
          <button className="PrimaryBtn" onClick={async ()=>{
            const payload = {
              quiz: quizState,
              writing: writingState,
              meta: { student }
            };
            try{
              const resp = await fetch('/api/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
              if(!resp.ok) throw new Error('Request failed');
              alert('Sent!');
            }catch(err){
              alert('Failed to send. Check server logs or configuration.');
            }
          }}>Send Results</button>
        </div>
      </div>
    </div>
  );
}

export default App;
