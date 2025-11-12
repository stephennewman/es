import { LearnScenario } from './daily-types';

export const scenarios: LearnScenario[] = [
  // ========== UNDERSTANDING YOURSELF (Self) ==========
  {
    id: 'self-1',
    category: 'self',
    situation: 'Your wife says "You never listen to me." You immediately feel defensive and misunderstood.',
    options: [
      { letter: 'A', text: 'Explain all the times you DID listen to prove her wrong' },
      { letter: 'B', text: 'Say "You\'re right, I\'m sorry" but feel resentful inside' },
      { letter: 'C', text: 'Pause, breathe, and ask "Help me understand what listening looks like to you"' },
      { letter: 'D', text: 'Walk away to avoid conflict' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Excellent. You recognized the defensiveness rising, paused it, and got curious instead. This is emotional regulation + empathy in action.',
      incorrect: {
        A: 'Defensiveness makes it about you being misunderstood instead of her feeling unheard. You\'ve missed the point entirely.',
        B: 'Fake compliance creates distance. She can sense your resentment. This is worse than honest pushback.',
        D: 'Avoidance creates more problems. You\'ve communicated that her feelings make you uncomfortable.',
      },
    },
    difficulty: 1,
    tags: ['defensiveness', 'curiosity', 'breathing', 'empathy'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'self-2',
    category: 'self',
    situation: 'You had a terrible day at work. You walk in the door and your wife immediately asks you to help with dinner.',
    options: [
      { letter: 'A', text: 'Snap: "Can I have five minutes? I just got home!"' },
      { letter: 'B', text: 'Say nothing, help resentfully, and be short with everyone' },
      { letter: 'C', text: '"I need 10 minutes to decompress. Can I help after that?"' },
      { letter: 'D', text: 'Help immediately and suppress your needs' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Perfect. You named your need clearly and directly, and offered a solution. This is mature self-awareness and communication.',
      incorrect: {
        A: 'Your bad day isn\'t her fault. The tone makes her the problem. Use your words before you\'re triggered.',
        B: 'Passive aggression poisons the atmosphere. Your family can feel your resentment even if you say nothing.',
        D: 'Martyrdom isn\'t virtue. Unexpressed needs become resentment. Speak up.',
      },
    },
    difficulty: 1,
    tags: ['self_awareness', 'boundaries', 'directness'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'self-3',
    category: 'self',
    situation: 'You made a decision about finances without consulting your wife. She\'s upset. You think she\'s overreacting.',
    options: [
      { letter: 'A', text: '"You\'re overreacting. It wasn\'t that big a deal."' },
      { letter: 'B', text: '"I\'m sorry you feel that way."' },
      { letter: 'C', text: '"You\'re right. I should have talked to you first. I was wrong."' },
      { letter: 'D', text: 'Defend your decision with logic and facts' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Strong ownership. No deflection, no minimizing. This is how you rebuild trust.',
      incorrect: {
        A: 'You just told her that her feelings are wrong. This is emotional invalidation and creates more distance.',
        B: 'Non-apology. You apologized for her feelings, not your actions. She\'ll feel unseen.',
        D: 'The issue isn\'t whether your decision was logical. It\'s that you operated unilaterally. You missed the point.',
      },
    },
    difficulty: 2,
    tags: ['ownership', 'partnership', 'defensiveness'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'self-4',
    category: 'self',
    situation: 'You notice you\'re scrolling on your phone while your wife is trying to talk to you.',
    options: [
      { letter: 'A', text: 'Keep scrolling but say "Uh huh" to show you\'re listening' },
      { letter: 'B', text: 'Put phone down and say "Sorry, you have my attention now"' },
      { letter: 'C', text: 'Finish what you\'re reading, then engage' },
      { letter: 'D', text: '"Can this wait? I\'m in the middle of something."' },
    ],
    correct_answer: 'B',
    feedback: {
      correct: 'Yes. You caught yourself, owned it, and corrected in real-time. This is integrity in small moments.',
      incorrect: {
        A: 'You\'re not fooling anyone. She knows you\'re not really listening. This is disrespectful.',
        C: 'Your phone is more important than your wife? Priorities, man.',
        D: 'Unless you\'re responding to an emergency, her bid for connection matters more. Choose her.',
      },
    },
    difficulty: 1,
    tags: ['presence', 'respect', 'priorities'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'self-5',
    category: 'self',
    situation: 'You yelled at your kids. You feel terrible but also justified because they were really pushing boundaries.',
    options: [
      { letter: 'A', text: 'Justify it: "They needed to learn. Sometimes you have to yell."' },
      { letter: 'B', text: 'Feel guilty but say nothing' },
      { letter: 'C', text: 'Apologize to kids: "I was wrong to yell. I was overwhelmed. That\'s on me."' },
      { letter: 'D', text: 'Apologize but explain: "I\'m sorry but you guys really pushed me."' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Excellent. You modeled accountability and showed them emotions don\'t excuse behavior. This is powerful parenting.',
      incorrect: {
        A: 'You\'re teaching them that big emotions justify hurtful behavior. Is that what you want them to learn?',
        B: 'They\'re watching. Your shame is teaching them to hide failures, not own them.',
        D: 'The "but" negates the apology. You made it about their behavior, not yours. Own it fully.',
      },
    },
    difficulty: 2,
    tags: ['ownership', 'modeling', 'regulation'],
    created_at: new Date().toISOString(),
  },

  // ========== UNDERSTANDING HER (Wife) ==========
  {
    id: 'wife-1',
    category: 'wife',
    situation: 'Your wife is venting about her frustrating day. She keeps circling back to the same issue.',
    options: [
      { letter: 'A', text: 'Offer solutions: "Have you tried..." or "Why don\'t you just..."' },
      { letter: 'B', text: 'Listen and reflect: "That sounds really frustrating. Tell me more."' },
      { letter: 'C', text: '"You\'ve told me this already. Can we move on?"' },
      { letter: 'D', text: 'Change the subject to lighten the mood' },
    ],
    correct_answer: 'B',
    feedback: {
      correct: 'Perfect. She doesn\'t need fixing. She needs you to hold space for her emotions. This is how she feels known.',
      incorrect: {
        A: 'She didn\'t ask for solutions. Your fixing makes her feel unheard. Just listen.',
        C: 'You just told her that her feelings are inconvenient. She\'ll stop sharing with you.',
        D: 'She\'ll feel dismissed. Stay with her in the hard stuff.',
      },
    },
    difficulty: 1,
    tags: ['listening', 'empathy', 'presence'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'wife-2',
    category: 'wife',
    situation: 'Your wife says "I\'m fine" but her tone and body language say otherwise.',
    options: [
      { letter: 'A', text: 'Take her at her word and move on' },
      { letter: 'B', text: '"You don\'t seem fine. What\'s really going on?"' },
      { letter: 'C', text: '"Why do you always say you\'re fine when you\'re not?"' },
      { letter: 'D', text: 'Give her space and hope it passes' },
    ],
    correct_answer: 'B',
    feedback: {
      correct: 'Good. You\'re reading beneath the words and inviting honesty. This creates safety.',
      incorrect: {
        A: 'You know she\'s not fine. Taking the easy out makes her feel unseen.',
        C: 'This is criticism disguised as concern. You\'ve made her the problem.',
        D: 'Passive. She needs you to pursue understanding, not wait it out.',
      },
    },
    difficulty: 1,
    tags: ['attunement', 'curiosity', 'pursuit'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'wife-3',
    category: 'wife',
    situation: 'Your wife criticizes how you loaded the dishwasher. This is the third time this week she\'s pointed out something you did "wrong."',
    options: [
      { letter: 'A', text: '"If it bothers you so much, you do it!"' },
      { letter: 'B', text: 'Defend your method with logic' },
      { letter: 'C', text: '"I hear you noticing a lot of what I\'m doing wrong lately. What\'s underneath that?"' },
      { letter: 'D', text: 'Silently reload it her way, feeling resentful' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Mature response. You named the pattern without attacking, and got curious about the real issue. The dishwasher isn\'t the dishwasher.',
      incorrect: {
        A: 'Defensive and childish. You\'ve made her the problem.',
        B: 'It\'s not about the dishwasher, man. Look deeper.',
        D: 'Passive aggression creates distance. Say what you\'re feeling.',
      },
    },
    difficulty: 2,
    tags: ['defensiveness', 'curiosity', 'patterns'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'wife-4',
    category: 'wife',
    situation: 'Your wife wants to have a "serious talk" about your relationship. You feel ambushed.',
    options: [
      { letter: 'A', text: '"Can we do this later? I\'m not ready."' },
      { letter: 'B', text: 'Engage now even though you\'re triggered' },
      { letter: 'C', text: '"I want to hear you, but I need 10 minutes to get centered first. Can we start then?"' },
      { letter: 'D', text: 'Shut down emotionally and just let her talk' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Solid. You honored her need AND your need for regulation. This is mature boundary-setting.',
      incorrect: {
        A: 'Too vague. "Later" becomes never. Give her a specific time.',
        B: 'Noble but unwise. You\'ll be reactive. Take the 10 minutes.',
        D: 'You\'re physically present but emotionally gone. She\'ll feel it.',
      },
    },
    difficulty: 2,
    tags: ['boundaries', 'regulation', 'respect'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'wife-5',
    category: 'wife',
    situation: 'Your wife says she feels disconnected from you lately. You\'ve been busy with work and tired.',
    options: [
      { letter: 'A', text: 'Explain how hard you\'ve been working and how tired you are' },
      { letter: 'B', text: '"You\'re right. I\'ve been distant. What do you need from me?"' },
      { letter: 'C', text: '"I\'ve been busy but I still love you."' },
      { letter: 'D', text: 'Promise to do better without getting specific' },
    ],
    correct_answer: 'B',
    feedback: {
      correct: 'Strong ownership and curiosity. You didn\'t defend, you opened the door to reconnection.',
      incorrect: {
        A: 'Your reasons don\'t change her experience. Explaining isn\'t connecting.',
        C: 'She didn\'t question your love. She said she feels disconnected. Different issue.',
        D: 'Empty promises. She needs concrete actions, not intentions.',
      },
    },
    difficulty: 2,
    tags: ['ownership', 'connection', 'defensiveness'],
    created_at: new Date().toISOString(),
  },

  // ========== PARENTING: TODDLERS (2-3yo) ==========
  {
    id: 'toddler-1',
    category: 'toddler',
    situation: 'Your 3-year-old throws a full tantrum in Target because you said no to a toy.',
    options: [
      { letter: 'A', text: 'Give in to stop the tantrum' },
      { letter: 'B', text: 'Threaten consequences: "Stop or you\'re in trouble!"' },
      { letter: 'C', text: 'Get down on her level: "I see you\'re really upset. It\'s hard when we can\'t get what we want."' },
      { letter: 'D', text: 'Ignore her completely until she stops' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Excellent. You stayed regulated, validated her feelings, and held the boundary. This is emotion coaching.',
      incorrect: {
        A: 'You just taught her that tantrums get results. This will get worse.',
        B: 'Her nervous system is overwhelmed. Threats escalate, not de-escalate.',
        D: 'Ignoring teaches her that big emotions make you disappear. She needs your presence.',
      },
    },
    difficulty: 1,
    tags: ['regulation', 'boundaries', 'validation'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'toddler-2',
    category: 'toddler',
    situation: 'Your 2-year-old is melting down at bedtime. You\'re exhausted and losing patience.',
    options: [
      { letter: 'A', text: 'Power through with firmness: "Enough! It\'s bedtime NOW!"' },
      { letter: 'B', text: 'Give in and let her stay up longer' },
      { letter: 'C', text: 'Breathe, regulate yourself, stay calm and consistent with routine' },
      { letter: 'D', text: 'Hand off to your wife' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Perfect. Your regulation is her regulation. You stayed steady when she couldn\'t.',
      incorrect: {
        A: 'Your stress is escalating hers. She needs your calm, not your force.',
        B: 'Inconsistency makes bedtime battles worse. Hold the boundary.',
        D: 'Running from hard parenting moments teaches her you can\'t handle her big emotions.',
      },
    },
    difficulty: 2,
    tags: ['regulation', 'consistency', 'presence'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'toddler-3',
    category: 'toddler',
    situation: 'Your 3-year-old hits her sister. You\'re angry.',
    options: [
      { letter: 'A', text: 'Yell: "We don\'t hit! Go to your room!"' },
      { letter: 'B', text: 'Get down to her level: "Hitting hurts. Use your words. What were you feeling?"' },
      { letter: 'C', text: 'Hit her hand to show her it hurts' },
      { letter: 'D', text: 'Send her to timeout without addressing it' },
    ],
    correct_answer: 'B',
    feedback: {
      correct: 'Great. You stayed regulated, taught empathy, and helped her develop emotional vocabulary.',
      incorrect: {
        A: 'You\'re modeling the behavior you\'re punishing. Yelling about hitting is ironic.',
        C: 'Violence to teach non-violence? Come on, man.',
        D: 'Timeout without teaching is just punishment. She needs to learn better skills.',
      },
    },
    difficulty: 1,
    tags: ['regulation', 'teaching', 'empathy'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'toddler-4',
    category: 'toddler',
    situation: 'Your 2-year-old keeps asking "why?" to everything and you\'re getting annoyed.',
    options: [
      { letter: 'A', text: '"Because I said so!"' },
      { letter: 'B', text: 'Keep answering with patience' },
      { letter: 'C', text: 'Distract her with something else' },
      { letter: 'D', text: 'Ignore the questions' },
    ],
    correct_answer: 'B',
    feedback: {
      correct: 'Good. Her curiosity is development, not defiance. Your patience is building her mind.',
      incorrect: {
        A: 'You just shut down her curiosity and told her questions aren\'t welcome.',
        C: 'She\'s trying to understand her world. Don\'t dismiss that.',
        D: 'Ignoring teaches her that you\'re not interested in her thoughts.',
      },
    },
    difficulty: 1,
    tags: ['patience', 'presence', 'development'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'toddler-5',
    category: 'toddler',
    situation: 'You\'re trying to get toddlers ready for church. They\'re moving slowly and you\'re going to be late.',
    options: [
      { letter: 'A', text: 'Rush them with urgency: "Come on! We\'re late! Hurry up!"' },
      { letter: 'B', text: 'Do everything for them to speed it up' },
      { letter: 'C', text: 'Stay calm, make it a game: "Let\'s see who can get shoes on first!"' },
      { letter: 'D', text: 'Give up and decide not to go' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Smart. You kept your regulation and made it fun. Your calm helps them cooperate.',
      incorrect: {
        A: 'Your stress is contagious. They\'ll resist more when you push harder.',
        B: 'You rob them of learning independence. Long-term thinking.',
        D: 'Quitting teaches them that obstacles mean give up.',
      },
    },
    difficulty: 2,
    tags: ['regulation', 'creativity', 'patience'],
    created_at: new Date().toISOString(),
  },

  // ========== PARENTING: TEEN (14yo) ==========
  {
    id: 'teen-1',
    category: 'teen',
    situation: 'Your 14-year-old rolls her eyes at something you said. Your pride is hurt.',
    options: [
      { letter: 'A', text: '"Don\'t you dare roll your eyes at me!"' },
      { letter: 'B', text: 'Match her energy: Roll your eyes back' },
      { letter: 'C', text: 'Stay calm: "I see you\'re frustrated. Want to talk about it?"' },
      { letter: 'D', text: 'Ignore it' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Strong. You didn\'t take it personally, stayed regulated, and invited connection. This is mature parenting.',
      incorrect: {
        A: 'You made it about respect for you. It\'s actually about her learning to express frustration maturely.',
        B: 'Childish. Be the adult.',
        D: 'Some things you let go. Persistent disrespect isn\'t one of them. Address it calmly.',
      },
    },
    difficulty: 2,
    tags: ['regulation', 'teen_development', 'connection'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'teen-2',
    category: 'teen',
    situation: 'Your 14-year-old wants to go to a party you\'re uncomfortable with. She\'s pushing hard.',
    options: [
      { letter: 'A', text: '"No. End of discussion."' },
      { letter: 'B', text: 'Give in to avoid conflict' },
      { letter: 'C', text: '"Help me understand what appeals to you. Then let me share my concerns."' },
      { letter: 'D', text: 'Ask your wife to be the bad guy' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Excellent. You\'re teaching her decision-making, not just enforcing rules. This is leadership.',
      incorrect: {
        A: 'Authoritarian parenting creates rebellion. Invite dialogue, then decide.',
        B: 'Your job is to lead, not be liked. Hold the boundary.',
        D: 'You\'re ducking leadership. Make the call together, but don\'t hide.',
      },
    },
    difficulty: 2,
    tags: ['boundaries', 'leadership', 'dialogue'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'teen-3',
    category: 'teen',
    situation: 'Your 14-year-old is being short and sassy. You feel disrespected.',
    options: [
      { letter: 'A', text: 'Come down hard: "You will NOT speak to me that way!"' },
      { letter: 'B', text: 'Later, when calm: "I noticed your tone earlier. What\'s going on?"' },
      { letter: 'C', text: 'Ignore it as teenage hormones' },
      { letter: 'D', text: 'Match her energy and be sarcastic back' },
    ],
    correct_answer: 'B',
    feedback: {
      correct: 'Wise. You didn\'t react in the moment, but you also didn\'t let it slide. You addressed it maturely.',
      incorrect: {
        A: 'Escalation creates distance. She\'ll shut down, not open up.',
        C: 'Hormones are real but not an excuse. Address the pattern.',
        D: 'Be the adult. She\'s testing to see if you\'re safe when she\'s hard to love.',
      },
    },
    difficulty: 2,
    tags: ['regulation', 'boundaries', 'timing'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'teen-4',
    category: 'teen',
    situation: 'Your 14-year-old shares something vulnerable about school drama. You want to fix it.',
    options: [
      { letter: 'A', text: 'Jump to solutions: "Here\'s what you should do..."' },
      { letter: 'B', text: 'Minimize: "This won\'t matter in five years."' },
      { letter: 'C', text: 'Listen fully, then ask: "How can I help? Do you want advice or just someone to listen?"' },
      { letter: 'D', text: 'Share a story about when you were her age' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Perfect. You held space, didn\'t fix, and let her direct the conversation. This builds trust.',
      incorrect: {
        A: 'She didn\'t ask for solutions. She wanted to be heard. Listen first.',
        B: 'You just told her that her feelings don\'t matter. Big mistake.',
        D: 'Made it about you, not her. Stay focused on her experience.',
      },
    },
    difficulty: 1,
    tags: ['listening', 'empathy', 'presence'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'teen-5',
    category: 'teen',
    situation: 'You catch your 14-year-old in a lie. You\'re angry and feel betrayed.',
    options: [
      { letter: 'A', text: 'Blow up: "I can\'t believe you lied to me!"' },
      { letter: 'B', text: 'Ground her immediately without discussion' },
      { letter: 'C', text: '"I know you lied. I\'m disappointed. Help me understand why you felt you needed to."' },
      { letter: 'D', text: 'Let it go to preserve the relationship' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Strong. You addressed it directly, expressed your disappointment, but stayed curious. This invites honesty.',
      incorrect: {
        A: 'Your anger will make her defensive. She\'ll shut down. Regulate first.',
        B: 'Consequences without conversation teach nothing. Understand why first.',
        D: 'Lying needs addressing. Letting it slide communicates that trust doesn\'t matter.',
      },
    },
    difficulty: 2,
    tags: ['regulation', 'trust', 'curiosity'],
    created_at: new Date().toISOString(),
  },

  // Additional scenarios for depth...
  {
    id: 'self-6',
    category: 'self',
    situation: 'You realize you\'ve been numbing with alcohol/screens more than usual lately.',
    options: [
      { letter: 'A', text: 'Tell yourself "I deserve to relax"' },
      { letter: 'B', text: 'Feel guilty but keep doing it' },
      { letter: 'C', text: 'Get curious: "What am I avoiding? What do I actually need?"' },
      { letter: 'D', text: 'Make a rule to quit cold turkey tomorrow' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Mature self-awareness. Numbing is always about something underneath. Find it.',
      incorrect: {
        A: 'Numbing isn\'t rest. It\'s avoidance. Be honest.',
        B: 'Shame doesn\'t change behavior. Curiosity does.',
        D: 'Willpower alone fails. Understand the why first.',
      },
    },
    difficulty: 2,
    tags: ['self_awareness', 'avoidance', 'curiosity'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'wife-6',
    category: 'wife',
    situation: 'Your wife starts crying during an argument. You feel manipulated.',
    options: [
      { letter: 'A', text: '"Don\'t cry. Come on."' },
      { letter: 'B', text: 'Assume she\'s trying to manipulate you and get frustrated' },
      { letter: 'C', text: 'Soften: "I see this is really hard for you. Take the time you need."' },
      { letter: 'D', text: 'Walk away until she\'s calm' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Good. You stayed present with her emotion instead of making it about you. This is emotional maturity.',
      incorrect: {
        A: 'Telling her not to feel is dismissive. Let her feel.',
        B: 'Her tears are information, not manipulation. Get curious, not defensive.',
        D: 'She needs you most when she\'s overwhelmed. Stay.',
      },
    },
    difficulty: 2,
    tags: ['empathy', 'defensiveness', 'presence'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'toddler-6',
    category: 'toddler',
    situation: 'Your 3-year-old refuses to get dressed. You\'re on a timeline.',
    options: [
      { letter: 'A', text: 'Force it: Dress her yourself while she fights' },
      { letter: 'B', text: 'Give choices: "Blue shirt or red shirt?"' },
      { letter: 'C', text: 'Threaten: "If you don\'t get dressed, no playground!"' },
      { letter: 'D', text: 'Give up and let her wear pajamas' },
    ],
    correct_answer: 'B',
    feedback: {
      correct: 'Smart. Choices give her autonomy while you maintain the boundary. This is collaborative parenting.',
      incorrect: {
        A: 'Power struggles create more resistance. Work with her development.',
        C: 'Threats create fear, not cooperation. Invite partnership.',
        D: 'Some battles you pick. Getting dressed is non-negotiable.',
      },
    },
    difficulty: 1,
    tags: ['boundaries', 'autonomy', 'creativity'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'teen-6',
    category: 'teen',
    situation: 'Your 14-year-old asks to borrow money. You suspect she\'s not being fully honest about what it\'s for.',
    options: [
      { letter: 'A', text: 'Give it to her without asking questions' },
      { letter: 'B', text: 'Refuse and accuse her of lying' },
      { letter: 'C', text: '"I want to help you. But I need to know what this is really for. Can you be straight with me?"' },
      { letter: 'D', text: 'Grill her with interrogation questions' },
    ],
    correct_answer: 'C',
    feedback: {
      correct: 'Good balance. You\'re inviting honesty while maintaining boundaries. This builds trust.',
      incorrect: {
        A: 'Blind trust isn\'t wise. Ask questions.',
        B: 'Accusations create defensiveness. Invite truth instead.',
        D: 'Interrogation feels like an attack. She\'ll lawyer up. Create safety for honesty.',
      },
    },
    difficulty: 2,
    tags: ['trust', 'boundaries', 'dialogue'],
    created_at: new Date().toISOString(),
  },
];

// Helper functions
export function getScenariosByCategory(category: string): LearnScenario[] {
  return scenarios.filter((s) => s.category === category);
}

export function getRandomScenario(category?: string): LearnScenario {
  const pool = category ? getScenariosByCategory(category) : scenarios;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getScenariosByTags(tags: string[]): LearnScenario[] {
  return scenarios.filter((s) => s.tags.some((tag) => tags.includes(tag)));
}

