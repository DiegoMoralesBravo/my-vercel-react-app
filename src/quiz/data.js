export const QUIZ_DATA = {
  beginner: [
    {
      id: 'b1',
      text: 'Choose the correct article: ___ apple a day.',
      options: ['A', 'An', 'The', 'No article'],
      answer: 1,
      explanation: 'Use "an" before vowel sounds: an apple.'
    },
    {
      id: 'b2',
      text: 'Pick the correct verb form: She ___ to school every day.',
      options: ['go', 'goes', 'is go', 'going'],
      answer: 1,
      explanation: 'Third-person singular present uses -s: she goes.'
    },
    {
      id: 'b3',
      text: 'Find the synonym for "big"',
      options: ['tiny', 'large', 'narrow', 'little'],
      answer: 1,
      explanation: 'Large is a synonym for big.'
    }
  ],
  intermediate: [
    {
      id: 'i1',
      text: 'Choose the correct preposition: I am interested ___ music.',
      options: ['in', 'on', 'at', 'for'],
      answer: 0,
      explanation: 'The fixed expression is "interested in".'
    },
    {
      id: 'i2',
      text: 'Pick the correct sentence.',
      options: [
        'She suggested me to go.',
        'She suggested that I go.',
        'She suggested that I went.',
        'She suggested to I go.'
      ],
      answer: 1,
      explanation: 'Suggest + that + base verb: that I go.'
    },
    {
      id: 'i3',
      text: 'Which word best completes: He was accused ___ the crime.',
      options: ['of', 'for', 'to', 'by'],
      answer: 0,
      explanation: 'Accused of (something).'
    }
  ],
  advanced: [
    {
      id: 'a1',
      text: 'Select the sentence with correct punctuation.',
      options: [
        'However I disagreed with him.',
        'However, I disagreed with him.',
        'However I, disagreed with him.',
        'However I disagreed, with him.'
      ],
      answer: 1,
      explanation: 'Introductory adverbials like "However," take a comma.'
    },
    {
      id: 'a2',
      text: 'Choose the best word: The committee has reached a ___ decision.',
      options: ['unanimous', 'unanimity', 'unanimously', 'unanimate'],
      answer: 0,
      explanation: 'Adjective needed to modify decision: unanimous.'
    },
    {
      id: 'a3',
      text: 'Identify the error: Each of the students have submitted their assignment.',
      options: [
        'Subject-verb agreement with "have"',
        'Pronoun agreement with "their"',
        'Incorrect preposition',
        'No error'
      ],
      answer: 0,
      explanation: '"Each" is singular; use has.'
    }
  ]
};

