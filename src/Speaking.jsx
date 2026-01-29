import React, { useEffect, useState } from 'react';
import './quiz/Quiz.css';

export default function Speaking({ onStateChange = () => {} }) {
  const [platform, setPlatform] = useState('dropbox');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    onStateChange({ platform, link, notes });
  }, [onStateChange, platform, link, notes]);

  return (
    <div className="quiz-app" style={{ paddingTop: 16 }}>
      <main className="container">
        <section className="quiz" aria-live="polite">
          <div className="q-title">Speaking Task</div>
          <p className="status">Upload your video to Google Drive or Dropbox and paste the share link below. Ensure link access is set to "Anyone with the link can view".</p>
          <div style={{display:'grid', gap:12}}>
            <label className="status" htmlFor="platform">Platform</label>
            <select id="platform" value={platform} onChange={(e)=>setPlatform(e.target.value)}>
              <option value="dropbox">Dropbox</option>
              <option value="gdrive">Google Drive</option>
              <option value="other">Other</option>
            </select>
            <label className="status" htmlFor="link">Share Link</label>
            <input id="link" value={link} onChange={(e)=>setLink(e.target.value)} placeholder="https://..." />
            <label className="status" htmlFor="notes">Notes (optional)</label>
            <textarea id="notes" rows={6} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Any additional info or context..." />
          </div>
        </section>
      </main>
    </div>
  );
}

