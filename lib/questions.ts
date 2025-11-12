import { Question } from './types';

// All 40 questions calibrated for harsh grading (most men should score D/F)
export const questions: Question[] = [
  // ============================================================================
  // CATEGORY 1: FAITH & IDENTITY (12 questions)
  // ============================================================================
  
  // Likert Scale Questions (6)
  {
    id: 'f1',
    category: 1,
    type: 'likert',
    text: 'My sense of worth is primarily derived from God\'s view of me rather than my performance or others\' opinions.',
    scoringKey: {
      '1': 10,
      '2': 25,
      '3': 40,
      '4': 55,
      '5': 70,
      '6': 85,
      '7': 95,
    },
  },
  {
    id: 'f2',
    category: 1,
    type: 'likert',
    text: 'I can identify specific ways my faith shapes how I respond to conflict in my marriage.',
    scoringKey: {
      '1': 15,
      '2': 30,
      '3': 45,
      '4': 60,
      '5': 75,
      '6': 88,
      '7': 98,
    },
  },
  {
    id: 'f3',
    category: 1,
    type: 'likert',
    text: 'When I fail as a husband or father, I know how to return to my spiritual center without shame spiraling.',
    scoringKey: {
      '1': 12,
      '2': 28,
      '3': 42,
      '4': 58,
      '5': 72,
      '6': 86,
      '7': 96,
    },
  },
  {
    id: 'f4',
    category: 1,
    type: 'likert',
    text: 'My identity remains stable even when my spouse is disappointed in me or critical of my choices.',
    scoringKey: {
      '1': 8,
      '2': 22,
      '3': 38,
      '4': 54,
      '5': 68,
      '6': 82,
      '7': 94,
    },
  },
  {
    id: 'f5',
    category: 1,
    type: 'likert',
    text: 'I have a regular spiritual practice (prayer, meditation, study) that grounds me independent of my circumstances.',
    scoringKey: {
      '1': 10,
      '2': 25,
      '3': 42,
      '4': 58,
      '5': 73,
      '6': 87,
      '7': 97,
    },
  },
  {
    id: 'f6',
    category: 1,
    type: 'likert',
    text: 'I can articulate who I am beyond my roles (husband, father, professional) - I know my core identity.',
    scoringKey: {
      '1': 15,
      '2': 30,
      '3': 45,
      '4': 60,
      '5': 74,
      '6': 88,
      '7': 98,
    },
  },

  // Multiple Choice Scenarios (3)
  {
    id: 'f7',
    category: 1,
    type: 'multiple_choice',
    text: 'Your spouse criticizes your parenting in front of the kids. Your immediate internal reaction is:',
    options: [
      'Anger/defensiveness because it threatens my identity as a good father',
      'Shame/withdrawal because it confirms my worst fears about myself',
      'Curiosity about what truth might be in the feedback, anchored in my identity beyond this moment',
      'Dismissiveness because I know better than they do',
    ],
    scoringKey: {
      '0': 20,
      '1': 35,
      '2': 85,
      '3': 15,
    },
  },
  {
    id: 'f8',
    category: 1,
    type: 'multiple_choice',
    text: 'You make a significant mistake at work that affects your family financially. You process this by:',
    options: [
      'Beating myself up and questioning my value as a provider',
      'Hiding the full extent from my wife to protect my image',
      'Acknowledging the failure while remaining grounded in my worth beyond performance',
      'Minimizing it and moving on quickly without processing',
    ],
    scoringKey: {
      '0': 30,
      '1': 25,
      '2': 90,
      '3': 40,
    },
  },
  {
    id: 'f9',
    category: 1,
    type: 'multiple_choice',
    text: 'When facing a major life decision, where do you primarily find your direction?',
    options: [
      'What will make me look successful or respected',
      'What will keep the peace and make others happy',
      'Prayer, reflection, and alignment with my values and calling',
      'What seems most practical or financially beneficial',
    ],
    scoringKey: {
      '0': 35,
      '1': 45,
      '2': 92,
      '3': 55,
    },
  },

  // Frequency Scales (2)
  {
    id: 'f10',
    category: 1,
    type: 'frequency',
    text: 'When emotionally wounded or rejected, I can return to my spiritual center within hours rather than days.',
    scoringKey: {
      'never': 10,
      'rarely': 30,
      'sometimes': 55,
      'often': 75,
      'always': 92,
    },
  },
  {
    id: 'f11',
    category: 1,
    type: 'frequency',
    text: 'My faith directly influences my daily choices and responses (not just Sunday beliefs).',
    scoringKey: {
      'never': 15,
      'rarely': 35,
      'sometimes': 58,
      'often': 78,
      'always': 95,
    },
  },

  // Binary Choice (1)
  {
    id: 'f12',
    category: 1,
    type: 'binary',
    text: 'Which statement is MORE true for you?',
    options: [
      'My worth fluctuates based on my performance and others\' approval',
      'My worth is anchored in something beyond my circumstances',
    ],
    scoringKey: {
      '0': 35,
      '1': 85,
    },
  },

  // ============================================================================
  // CATEGORY 2: SELF-AWARENESS & SELF-REGULATION (15 questions)
  // ============================================================================

  // Likert Scale Questions (7)
  {
    id: 's1',
    category: 2,
    type: 'likert',
    text: 'I can accurately name the specific emotion I\'m feeling within 30 seconds of experiencing it.',
    scoringKey: {
      '1': 10,
      '2': 25,
      '3': 40,
      '4': 55,
      '5': 70,
      '6': 85,
      '7': 95,
    },
  },
  {
    id: 's2',
    category: 2,
    type: 'likert',
    text: 'I know my emotional triggers and can predict when I\'m likely to become dysregulated.',
    scoringKey: {
      '1': 12,
      '2': 28,
      '3': 43,
      '4': 58,
      '5': 72,
      '6': 86,
      '7': 96,
    },
  },
  {
    id: 's3',
    category: 2,
    type: 'likert',
    text: 'I have practical tools I use to self-soothe when emotionally activated (beyond distraction or suppression).',
    scoringKey: {
      '1': 8,
      '2': 24,
      '3': 40,
      '4': 56,
      '5': 71,
      '6': 85,
      '7': 95,
    },
  },
  {
    id: 's4',
    category: 2,
    type: 'likert',
    text: 'I can distinguish between my current emotional response and past wounds being triggered.',
    scoringKey: {
      '1': 10,
      '2': 26,
      '3': 42,
      '4': 58,
      '5': 73,
      '6': 87,
      '7': 97,
    },
  },
  {
    id: 's5',
    category: 2,
    type: 'likert',
    text: 'When stressed, I\'m aware of how my state affects my family and I take responsibility for managing it.',
    scoringKey: {
      '1': 15,
      '2': 30,
      '3': 45,
      '4': 60,
      '5': 74,
      '6': 88,
      '7': 97,
    },
  },
  {
    id: 's6',
    category: 2,
    type: 'likert',
    text: 'I can pause between feeling an emotion and acting on it, even in heated moments.',
    scoringKey: {
      '1': 8,
      '2': 23,
      '3': 39,
      '4': 55,
      '5': 70,
      '6': 85,
      '7': 96,
    },
  },
  {
    id: 's7',
    category: 2,
    type: 'likert',
    text: 'I\'m aware of my body\'s physical signals (tension, heart rate, breathing) and use them as emotional information.',
    scoringKey: {
      '1': 12,
      '2': 28,
      '3': 44,
      '4': 60,
      '5': 75,
      '6': 88,
      '7': 97,
    },
  },

  // Scenario-Based Multiple Choice (4)
  {
    id: 's8',
    category: 2,
    type: 'multiple_choice',
    text: 'Your wife says "We need to talk" unexpectedly. Before she even speaks, you notice physical tension. You:',
    options: [
      'Immediately start planning your defense',
      'Notice the sensation, name it (fear/anxiety), and choose to stay present',
      'Distract yourself or try to lighten the mood to avoid discomfort',
      'Go numb/shut down emotionally',
    ],
    scoringKey: {
      '0': 30,
      '1': 88,
      '2': 40,
      '3': 20,
    },
  },
  {
    id: 's9',
    category: 2,
    type: 'multiple_choice',
    text: 'Your 10-year-old disrespects you in front of your wife. You feel rage rising. In this moment, you:',
    options: [
      'React immediately from anger - yell, punish, or assert dominance',
      'Notice the rage, identify what triggered such intensity, and choose a response that addresses behavior without being controlled by emotion',
      'Suppress the anger and say nothing, but stay internally furious',
      'Leave the situation to avoid doing damage',
    ],
    scoringKey: {
      '0': 15,
      '1': 92,
      '2': 35,
      '3': 55,
    },
  },
  {
    id: 's10',
    category: 2,
    type: 'multiple_choice',
    text: 'When you\'re angry, you:',
    options: [
      'Often don\'t realize it until later or someone points it out',
      'Know it immediately and can articulate why, including any deeper emotions beneath the anger',
      'Know it but struggle to express it without reactivity',
      'Know it and typically blame others for causing it',
    ],
    scoringKey: {
      '0': 25,
      '1': 90,
      '2': 60,
      '3': 35,
    },
  },
  {
    id: 's11',
    category: 2,
    type: 'multiple_choice',
    text: 'After a stressful day at work, you come home and your kids are loud and chaotic. You:',
    options: [
      'Snap at them or withdraw because you can\'t handle more stimulation',
      'Recognize your depleted state, communicate it appropriately, and manage your response',
      'Push through and pretend everything is fine but feel resentful',
      'Escape to your phone, TV, or other distraction',
    ],
    scoringKey: {
      '0': 25,
      '1': 90,
      '2': 45,
      '3': 35,
    },
  },

  // Frequency Scales (3)
  {
    id: 's12',
    category: 2,
    type: 'frequency',
    text: 'I take my frustration out on my family even when they\'re not the source of my stress.',
    scoringKey: {
      'never': 95,
      'rarely': 75,
      'sometimes': 50,
      'often': 25,
      'always': 10,
    },
  },
  {
    id: 's13',
    category: 2,
    type: 'frequency',
    text: 'I use substances, work, screens, or other behaviors to avoid difficult feelings.',
    scoringKey: {
      'never': 95,
      'rarely': 78,
      'sometimes': 55,
      'often': 30,
      'always': 12,
    },
  },
  {
    id: 's14',
    category: 2,
    type: 'frequency',
    text: 'When emotionally activated, I can access my thinking brain and make intentional choices rather than just reacting.',
    scoringKey: {
      'never': 10,
      'rarely': 28,
      'sometimes': 52,
      'often': 75,
      'always': 93,
    },
  },

  // Binary Choice (1)
  {
    id: 's15',
    category: 2,
    type: 'binary',
    text: 'My emotions feel more like:',
    options: [
      'Problems to solve or threats to manage',
      'Information to explore and understand',
    ],
    scoringKey: {
      '0': 35,
      '1': 88,
    },
  },

  // ============================================================================
  // CATEGORY 3: EMPATHY & UNDERSTANDING (13 questions)
  // ============================================================================

  // Likert Scale Questions (6)
  {
    id: 'e1',
    category: 3,
    type: 'likert',
    text: 'I can accurately describe my wife\'s deepest fears without her having to tell me in the moment.',
    scoringKey: {
      '1': 10,
      '2': 25,
      '3': 40,
      '4': 55,
      '5': 70,
      '6': 85,
      '7': 95,
    },
  },
  {
    id: 'e2',
    category: 3,
    type: 'likert',
    text: 'When my wife is upset, I\'m more concerned with understanding her experience than defending myself.',
    scoringKey: {
      '1': 12,
      '2': 28,
      '3': 43,
      '4': 58,
      '5': 73,
      '6': 87,
      '7': 97,
    },
  },
  {
    id: 'e3',
    category: 3,
    type: 'likert',
    text: 'I can identify the unmet needs behind my children\'s difficult behaviors.',
    scoringKey: {
      '1': 15,
      '2': 30,
      '3': 45,
      '4': 60,
      '5': 74,
      '6': 88,
      '7': 96,
    },
  },
  {
    id: 'e4',
    category: 3,
    type: 'likert',
    text: 'I regularly consider how my actions land on my spouse, even when my intentions were good.',
    scoringKey: {
      '1': 10,
      '2': 26,
      '3': 42,
      '4': 58,
      '5': 73,
      '6': 87,
      '7': 96,
    },
  },
  {
    id: 'e5',
    category: 3,
    type: 'likert',
    text: 'I can hold space for my wife\'s pain without needing to fix it, minimize it, or make it about me.',
    scoringKey: {
      '1': 8,
      '2': 24,
      '3': 40,
      '4': 56,
      '5': 71,
      '6': 86,
      '7': 96,
    },
  },
  {
    id: 'e6',
    category: 3,
    type: 'likert',
    text: 'I know what my wife dreams about for her life beyond being a wife and mother.',
    scoringKey: {
      '1': 12,
      '2': 28,
      '3': 44,
      '4': 60,
      '5': 75,
      '6': 88,
      '7': 97,
    },
  },

  // Multiple Choice Scenarios (4)
  {
    id: 'e7',
    category: 3,
    type: 'multiple_choice',
    text: 'When my spouse shares something difficult, I typically:',
    options: [
      'Listen to fully understand their experience, even if it\'s uncomfortable for me',
      'Listen but start formulating my response or defense while they\'re talking',
      'Try to fix the problem or give advice to make them feel better',
      'Minimize or redirect because their pain makes me uncomfortable',
    ],
    scoringKey: {
      '0': 92,
      '1': 50,
      '2': 45,
      '3': 25,
    },
  },
  {
    id: 'e8',
    category: 3,
    type: 'multiple_choice',
    text: 'Your wife says you\'re "emotionally distant." You don\'t feel distant - you\'ve been working hard for the family. This gap reveals:',
    options: [
      'She\'s wrong or overly sensitive - I\'m doing my best',
      'We define "emotional presence" differently, and I need to understand her experience',
      'She\'s not appreciating my efforts and sacrifices',
      'I may have a blind spot about my availability',
    ],
    scoringKey: {
      '0': 20,
      '1': 85,
      '2': 25,
      '3': 75,
    },
  },
  {
    id: 'e9',
    category: 3,
    type: 'multiple_choice',
    text: 'Your child is melting down over something that seems trivial to you. Your internal response is:',
    options: [
      'Frustration - they\'re overreacting and need to toughen up',
      'Curiosity - what\'s really going on beneath this reaction?',
      'Anxiety - I need to fix this quickly so everyone calms down',
      'Dismissiveness - kids are just dramatic, it\'ll pass',
    ],
    scoringKey: {
      '0': 30,
      '1': 92,
      '2': 50,
      '3': 35,
    },
  },
  {
    id: 'e10',
    category: 3,
    type: 'multiple_choice',
    text: 'When there\'s a conflict, my first instinct is to understand:',
    options: [
      'How I can explain my perspective so they understand me',
      'What their experience is and why they feel the way they do',
      'How to resolve this quickly and get back to normal',
      'Who is right and who is wrong',
    ],
    scoringKey: {
      '0': 40,
      '1': 94,
      '2': 48,
      '3': 25,
    },
  },

  // Frequency Scales (2)
  {
    id: 'e11',
    category: 3,
    type: 'frequency',
    text: 'I ask my wife about her inner world (thoughts, feelings, dreams) not just logistics and tasks.',
    scoringKey: {
      'never': 10,
      'rarely': 30,
      'sometimes': 55,
      'often': 78,
      'always': 95,
    },
  },
  {
    id: 'e12',
    category: 3,
    type: 'frequency',
    text: 'When receiving feedback or criticism from my wife, I get defensive rather than curious.',
    scoringKey: {
      'never': 95,
      'rarely': 78,
      'sometimes': 52,
      'often': 28,
      'always': 12,
    },
  },

  // Binary Choice (1)
  {
    id: 'e13',
    category: 3,
    type: 'binary',
    text: 'In conversations with my wife, I\'m generally more focused on:',
    options: [
      'Being understood',
      'Understanding her',
    ],
    scoringKey: {
      '0': 40,
      '1': 88,
    },
  },
];

// Helper function to get questions by category
export function getQuestionsByCategory(category: 1 | 2 | 3): Question[] {
  return questions.filter((q) => q.category === category);
}

// Helper function to get question by id
export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}



