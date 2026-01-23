// Vercel Serverless Function to send email with quiz + writing results
// For production, configure SMTP creds via environment variables
// and use a trusted provider. This example uses Nodemailer + SMTP.

const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { quiz, writing, meta } = req.body || {};

    // Build email content
    const lines = [];
    lines.push('# English Test Submission');
    if (meta?.student) lines.push(`Student: ${meta.student}`);
    if (quiz) {
      lines.push('\n## Quiz');
      const sequence = quiz.sequence || [];
      if (sequence.length) {
        lines.push('Sequence:');
        sequence.forEach((s, i) => {
          lines.push(`${i + 1}) ${s.levelLabel}: ${s.score.correct}/${s.score.total} (${s.score.pct}%)`);
        });
      } else if (quiz.score) {
        lines.push(`Score: ${quiz.score.correct}/${quiz.score.total} (${quiz.score.pct}%)`);
        if (quiz.level) lines.push(`Level: ${quiz.level}`);
        if (quiz.questions && quiz.answers) {
          lines.push('\nQuestions:');
          quiz.questions.forEach((q, i) => {
            const chosen = quiz.answers[q.id];
            lines.push(`${i + 1}. ${q.text}`);
            lines.push(`   - Answered: ${typeof chosen === 'number' ? q.options[chosen] : '—'}`);
            lines.push(`   - Correct: ${q.options[q.answer]}`);
          });
        }
      }
    }
    if (writing) {
      lines.push('\n## Writing');
      if (writing.prompt) lines.push(`Prompt: ${writing.prompt}`);
      lines.push(`\nSubmission:\n${writing.text || ''}`);
      lines.push(`\nWord count: ${writing.wordCount ?? ''}`);
    }

    const html = lines.map(l => `<div>${l.replace(/</g, '&lt;')}</div>`).join('');

    // Create a transporter; expects env vars to be set in Vercel project
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.RESULTS_TO || 'diegomorales1359@gmail.com';

    await transporter.verify();
    await transporter.sendMail({
      from: process.env.RESULTS_FROM || process.env.SMTP_USER,
      to,
      subject: meta?.subject || 'New English Test Submission',
      html,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
