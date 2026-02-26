import React, { useState } from 'react';

export default function AccessGate({ onSuccess }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e?.preventDefault?.();
    if (pwd === '12345') {
      setError('');
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="GateWrap">
      <form className="GateCard" onSubmit={submit}>
        <h2 className="GateTitle">Enter Access Key</h2>
        <p className="GateHint">Please enter the access key provided by your instructor.</p>
        <label className="FieldLabel" htmlFor="gate-pass">Access Key</label>
        <input
          id="gate-pass"
          className="FieldInput"
          type="password"
          value={pwd}
          onChange={(e)=>setPwd(e.target.value)}
          placeholder="e.g., 12345"
        />
        {error ? <div className="DangerText" role="alert">{error}</div> : null}
        <button type="submit" className="PrimaryBtn" style={{ marginTop: 8 }}>Continue</button>
      </form>
    </div>
  );
}

