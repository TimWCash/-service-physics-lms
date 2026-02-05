// Service Physics LMS - Course Data v3
// 7-Module Structure with 3-Column Layout

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface DiscussionQuestion {
  id: string;
  question: string;
  order: number;
}

export interface LearningActivity {
  id: string;
  title: string;
  type: 'ebook' | 'video' | 'audio' | 'reading' | 'quiz' | 'coaching' | 'practice';
  duration?: string;
  content?: string;
  videoUrl?: string;
  audioUrl?: string;
  externalUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  questions?: QuizQuestion[];
  discussionQuestions?: DiscussionQuestion[];
}

export interface ModuleSection {
  id: string;
  columnType: 'overview' | 'dive_in' | 'recap';
  sectionTitle: string;
  contentHtml: string;
  order: number;
}

export interface CoachingPrep {
  discussionQuestions: string[];
  knowledgeCheckUrl?: string;
  glossaryNote: string;
}

export interface DeepDiveResource {
  id: string;
  type: 'read' | 'watch';
  title: string;
  description?: string;
  thumbnailUrl?: string;
  resourceUrl: string;
  order: number;
}

export interface CourseModule {
  id: string;
  title: string;
  colorHex: string;
  timeEstimateMinutes: number;
  order: number;
  accessLevel: 'free' | 'paid';
  sections: ModuleSection[];
  activities: LearningActivity[];
  coachingPrep: CoachingPrep;
  deepDiveResources: DeepDiveResource[];
}

// ============================================
// MODULE 1: OUR PROBLEM SOLVING APPROACH
// ============================================

const module1: CourseModule = {
  id: 'module-01',
  title: 'Our Problem Solving Approach',
  colorHex: '#214557', // Service Physics brand teal
  timeEstimateMinutes: 105, // 1h 45m
  order: 1,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-01-overview-01',
      columnType: 'overview',
      sectionTitle: 'A scientific approach to improvement',
      contentHtml: `
        <div class="prose">
          <p>Our problem-solving approach is built on the <strong>Improvement Kata</strong>, a systematic method for achieving challenging goals through iterative learning and experimentation.</p>

          <div class="my-6 p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
            <h4 class="text-teal-900 font-bold mb-4">THE IMPROVEMENT KATA</h4>
            <div class="space-y-2">
              <div class="flex items-center">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                <span>Understand the Direction</span>
              </div>
              <div class="flex items-center">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                <span>Grasp the Current Condition</span>
              </div>
              <div class="flex items-center">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                <span>Establish Next Target</span>
              </div>
              <div class="flex items-center">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
                <span>Experiment to Learn</span>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-01-overview-02',
      columnType: 'overview',
      sectionTitle: 'Why Plan, Do, Check, Act',
      contentHtml: `
        <div class="prose">
          <p>The PDCA cycle is the foundation of scientific problem-solving. It provides a structured approach to testing ideas and learning from results.</p>

          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4 text-center">PDCA FOR PROBLEM SOLVING</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">P</div>
                <p class="font-semibold">Define the problem</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">D</div>
                <p class="font-semibold">Grasp the situation</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">C</div>
                <p class="font-semibold">Experiment to learn</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">A</div>
                <p class="font-semibold">Evaluate results</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 2
    },
    {
      id: 'section-01-overview-03',
      columnType: 'overview',
      sectionTitle: 'Using Cynefin to light the way',
      contentHtml: `
        <div class="prose">
          <p>The Cynefin Framework helps us understand the nature of problems and choose appropriate responses.</p>

          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4 text-center">CYNEFIN FRAMEWORK</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-blue-100 rounded">
                <h5 class="font-bold">Complex</h5>
                <p class="text-sm">Probe → Sense → Respond</p>
              </div>
              <div class="p-4 bg-green-100 rounded">
                <h5 class="font-bold">Complicated</h5>
                <p class="text-sm">Sense → Analyze → Respond</p>
              </div>
              <div class="p-4 bg-red-100 rounded">
                <h5 class="font-bold">Chaotic</h5>
                <p class="text-sm">Act → Sense → Respond</p>
              </div>
              <div class="p-4 bg-yellow-100 rounded">
                <h5 class="font-bold">Clear</h5>
                <p class="text-sm">Sense → Categorize → Respond</p>
              </div>
            </div>
            <div class="mt-4 p-3 bg-gray-200 rounded text-center">
              <p class="font-bold text-sm">Disorder (Center)</p>
              <p class="text-xs">Don't know which domain you're in</p>
            </div>
          </div>
        </div>
      `,
      order: 3
    },

    // DIVE IN COLUMN
    {
      id: 'section-01-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Read',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 1 hour 45 minutes</p>
          <p class="mb-6">Watch the videos, listen to the audio, or read the case studies below. Use the discussion questions to guide your thinking and prepare for coaching sessions.</p>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p class="font-semibold">📝 Pro Tip:</p>
            <p>Take notes as you go and answer the discussion questions. Plan to review your answers with your coach.</p>
          </div>
        </div>
      `,
      order: 1
    },

    // RECAP COLUMN
    {
      id: 'section-01-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <div class="prose">
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div class="flex items-start mb-4">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 class="font-bold text-lg mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-sm">Stop here and make notes to answer the discussion questions below. When you next meet with your coach, discuss your responses and any follow-up questions to build your understanding.</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-6">
            <div class="flex items-start mb-3">
              <svg class="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="flex-1">
                <h5 class="font-bold mb-2">Additional Questions for Your Coach</h5>
                <p class="text-sm text-gray-600 mb-3">Use this space to document any additional questions:</p>
                <ul class="space-y-2">
                  <li class="flex"><span class="mr-2">•</span><span class="text-gray-400">[ Your question here ]</span></li>
                  <li class="flex"><span class="mr-2">•</span><span class="text-gray-400">[ Your question here ]</span></li>
                  <li class="flex"><span class="mr-2">•</span><span class="text-gray-400">[ Your question here ]</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-01-recap-02',
      columnType: 'recap',
      sectionTitle: 'Glossary Reference',
      contentHtml: `
        <div class="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
          <p class="text-sm">Seeing terms or words in here that you are unfamiliar with? <a href="/glossary" class="text-purple-600 font-semibold hover:underline">Check out the Service Physics Glossary</a> for definitions.</p>
        </div>
      `,
      order: 2
    }
  ],

  activities: [
    {
      id: 'activity-01-00',
      title: 'Introduction to Service Physics',
      type: 'video',
      duration: '2',
      description: 'A quick introduction to the Service Physics approach and what you\'ll learn in this course.',
      videoUrl: 'https://www.youtube.com/watch?v=DvSWcxSJvmo',
      thumbnailUrl: '/images/sp-intro.jpg',
      discussionQuestions: [
        {
          id: 'dq-01-00-01',
          question: 'What aspects of the Service Physics approach resonate most with your current work challenges?',
          order: 1
        }
      ]
    },
    {
      id: 'activity-01-01',
      title: 'Redefining the work',
      type: 'reading',
      duration: '45',
      description: 'Read this article by John Shook, chairman and CEO of the Lean Enterprise Institute, about adding meaning to work through problem-solving.',
      thumbnailUrl: '/images/john-shook.jpg',
      externalUrl: 'https://www.lean.org/the-lean-post/articles/redefining-work/',
      discussionQuestions: [
        {
          id: 'dq-01-01-01',
          question: 'How does the perspective shift of adding meaning to "mundane" work influence problem-solving and continuous improvement in the workplace?',
          order: 1
        },
        {
          id: 'dq-01-01-02',
          question: 'How can the principles of lean thinking, such as focusing on value creation and continuous improvement, be applied to redefine work and enhance its value for both the employee and the organization?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-01-02',
      title: 'What is Cynefin?',
      type: 'video',
      duration: '18',
      description: 'Watch this video by Dave Snowden, a management consultant and researcher, and the creator of the Cynefin Framework.',
      videoUrl: 'https://www.youtube.com/watch?v=N7oz366X0-8',
      thumbnailUrl: '/images/dave-snowden.jpg',
      discussionQuestions: [
        {
          id: 'dq-01-02-01',
          question: 'What is the main purpose of the Cynefin Framework? How does it challenge or expand upon traditional approaches to problem-solving and decision-making?',
          order: 1
        },
        {
          id: 'dq-01-02-02',
          question: 'How can recognizing the domain of a particular situation influence the approach to problem-solving?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-01-03',
      title: 'The Solution Fixation Trap',
      type: 'reading',
      duration: '18',
      description: 'An experiment done in the Harvard Business School about the effects of getting stuck solutioning.',
      externalUrl: 'https://hbr.org/2023/05/is-your-team-caught-in-a-solution-fixation-trap',
      thumbnailUrl: '/images/solution-fixation.jpg',
      discussionQuestions: [
        {
          id: 'dq-01-03-01',
          question: 'Can you share an example from your own experience where you\'ve observed this trap in action? What were the consequences, and in retrospect, how might you/your team have avoided it?',
          order: 1
        },
        {
          id: 'dq-01-03-02',
          question: 'What factors contribute to a team or group developing solution fixation? What might get in the way of spending time analyzing the problem?',
          order: 2
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'What is a personal goal you have set for yourself? How have you / might you grasp your current condition using a data-driven approach?',
      'Think about a problem you are facing in your daily life and apply the Cynefin Framework. What type of problem do you have? What is your approach to solving the problem?'
    ],
    knowledgeCheckUrl: '/knowledge-check/module-1',
    glossaryNote: 'Seeing terms or words in here that you are unfamiliar with? Check out the Service Physics Glossary for definitions.'
  },

  deepDiveResources: [
    {
      id: 'ddr-01-01',
      type: 'read',
      title: 'The Improvement Kata',
      description: 'By Mike Rother',
      thumbnailUrl: '/images/books/improvement-kata.jpg',
      resourceUrl: 'https://www.lean.org/improvement-kata/',
      order: 1
    },
    {
      id: 'ddr-01-02',
      type: 'watch',
      title: 'Introduction to Cynefin',
      description: 'Dave Snowden explains the framework',
      thumbnailUrl: '/images/videos/cynefin-intro.jpg',
      resourceUrl: 'https://www.youtube.com/watch?v=N7oz366X0-8',
      order: 1
    }
  ]
};

// ============================================
// MODULE 2: OUR PROBLEM SOLVING TOOLS
// ============================================

const module2: CourseModule = {
  id: 'module-02',
  title: 'Our Problem Solving Tools',
  colorHex: '#2a5667', // Slightly lighter teal
  timeEstimateMinutes: 110,
  order: 2,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-02-overview-01',
      columnType: 'overview',
      sectionTitle: 'The A3 Problem Solving Process',
      contentHtml: `
        <div class="prose">
          <p>The A3 is a structured approach to problem-solving that fits on a single sheet of A3 paper. It guides you through a systematic process of understanding, analyzing, and solving problems.</p>

          <div class="my-6 p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
            <h4 class="text-teal-900 font-bold mb-4">A3 STRUCTURE</h4>
            <div class="space-y-3">
              <div class="flex items-start">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
                <div>
                  <p class="font-semibold">Background</p>
                  <p class="text-sm text-gray-600">Why is this important?</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
                <div>
                  <p class="font-semibold">Current Condition</p>
                  <p class="text-sm text-gray-600">What is happening now?</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
                <div>
                  <p class="font-semibold">Goal/Target</p>
                  <p class="text-sm text-gray-600">What do we want to achieve?</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">4</span>
                <div>
                  <p class="font-semibold">Root Cause Analysis</p>
                  <p class="text-sm text-gray-600">Why is this happening?</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">5</span>
                <div>
                  <p class="font-semibold">Countermeasures</p>
                  <p class="text-sm text-gray-600">What will we try?</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">6</span>
                <div>
                  <p class="font-semibold">Implementation Plan</p>
                  <p class="text-sm text-gray-600">How and when?</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">7</span>
                <div>
                  <p class="font-semibold">Follow-up</p>
                  <p class="text-sm text-gray-600">What were the results?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-02-overview-02',
      columnType: 'overview',
      sectionTitle: 'The 5 Whys Technique',
      contentHtml: `
        <div class="prose">
          <p>The 5 Whys is a simple but powerful technique for getting to the root cause of a problem by asking "Why?" repeatedly.</p>

          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4">EXAMPLE: 5 WHYS</h4>
            <div class="space-y-3">
              <div class="p-3 bg-white rounded border-l-4 border-red-400">
                <p class="font-semibold text-red-900">Problem: Customer received wrong order</p>
              </div>
              <div class="pl-4">
                <p class="text-sm"><strong>Why 1:</strong> Packer selected wrong item</p>
                <p class="text-sm"><strong>Why 2:</strong> Barcode scanner wasn't working</p>
                <p class="text-sm"><strong>Why 3:</strong> Battery was dead</p>
                <p class="text-sm"><strong>Why 4:</strong> No charging schedule exists</p>
                <p class="text-sm"><strong>Why 5:</strong> Process wasn't designed with equipment maintenance in mind</p>
              </div>
              <div class="p-3 bg-green-50 rounded border-l-4 border-green-400">
                <p class="font-semibold text-green-900">Root Cause: No equipment maintenance process</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 2
    },

    // DIVE IN COLUMN
    {
      id: 'section-02-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Read',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 1 hour 50 minutes</p>
          <p class="mb-6">Learn about the A3 and 5 Whys through role-play videos and real-world case studies.</p>
        </div>
      `,
      order: 1
    },

    // RECAP COLUMN
    {
      id: 'section-02-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <div class="prose">
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div class="flex items-start mb-4">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 class="font-bold text-lg mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-sm">Stop here and reflect on the A3 and 5 Whys tools. When you next meet with your coach, discuss your responses to the questions below.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    }
  ],

  activities: [
    {
      id: 'activity-02-01',
      title: 'Good Coach Bad Coach: A3 Role Play',
      type: 'video',
      duration: '30',
      description: 'Watch this role-play demonstration showing effective and ineffective coaching approaches when working through an A3 problem-solving process.',
      videoUrl: 'https://vimeo.com/123456789',
      thumbnailUrl: '/images/good-bad-coach.jpg',
      discussionQuestions: [
        {
          id: 'dq-02-01-01',
          question: 'What were the key differences between the good coach and bad coach approaches? How did these differences impact the problem-solving process?',
          order: 1
        },
        {
          id: 'dq-02-01-02',
          question: 'What coaching behaviors would you want to adopt when helping others work through problems?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-02-02',
      title: 'The 5 Whys Technique',
      type: 'video',
      duration: '5',
      description: 'Learn how to use the 5 Whys technique to get to the root cause of a problem.',
      videoUrl: 'https://www.youtube.com/watch?v=SrlYkx41wEE',
      thumbnailUrl: '/images/five-whys.jpg',
      discussionQuestions: [
        {
          id: 'dq-02-02-01',
          question: 'What are the most common mistakes people make when using the 5 Whys? How can you avoid these pitfalls?',
          order: 1
        },
        {
          id: 'dq-02-02-02',
          question: 'Think of a problem you\'re facing. Practice asking "Why?" 5 times to find the root cause.',
          order: 2
        }
      ]
    },
    {
      id: 'activity-02-03',
      title: 'Problem Solving at the Hot Dog Plant',
      type: 'audio',
      duration: '16',
      description: 'Listen to this audio case study about applying structured problem-solving at a food manufacturing facility.',
      audioUrl: '/audio/hot-dog-plant.mp3',
      thumbnailUrl: '/images/hot-dog-plant.jpg',
      discussionQuestions: [
        {
          id: 'dq-02-03-01',
          question: 'How did the team identify the root cause of the problem? What tools did they use?',
          order: 1
        },
        {
          id: 'dq-02-03-02',
          question: 'What role did data play in their problem-solving process?',
          order: 2
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'Have you worked with A3s or Experiment Plans before? What was your experience like?',
      'Think about a problem you\'re currently facing. Walk through how you would apply the 5 Whys to find the root cause.',
      'What challenges do you anticipate in using these structured problem-solving tools in your work?'
    ],
    knowledgeCheckUrl: '/knowledge-check/module-2',
    glossaryNote: 'Seeing terms or words in here that you are unfamiliar with? Check out the Service Physics Glossary for definitions.'
  },

  deepDiveResources: [
    {
      id: 'ddr-02-01',
      type: 'read',
      title: 'Managing to Learn',
      description: 'Using the A3 management process by John Shook',
      thumbnailUrl: '/images/books/managing-to-learn.jpg',
      resourceUrl: 'https://www.lean.org/managing-to-learn/',
      order: 1
    },
    {
      id: 'ddr-02-02',
      type: 'read',
      title: 'Understanding A3 Thinking',
      description: 'A critical component of Toyota\'s PDCA management system',
      thumbnailUrl: '/images/books/understanding-a3.jpg',
      resourceUrl: 'https://www.lean.org/understanding-a3-thinking/',
      order: 2
    }
  ]
};

// ============================================
// MODULE 3: IDENTIFYING PROBLEMS
// ============================================

const module3: CourseModule = {
  id: 'module-03',
  title: 'Identifying Problems',
  colorHex: '#3397af', // Brighter teal
  timeEstimateMinutes: 105,
  order: 3,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-03-overview-01',
      columnType: 'overview',
      sectionTitle: 'The 7 Types of Waste',
      contentHtml: `
        <div class="prose">
          <p>Understanding waste is fundamental to improvement. The 7 types of waste help us identify opportunities for improvement in any process.</p>

          <div class="my-6 p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
            <h4 class="text-teal-900 font-bold mb-4">THE 7 WASTES (TIMWOOD)</h4>
            <div class="space-y-2">
              <div class="p-3 bg-white rounded flex items-center">
                <span class="font-bold text-teal-600 mr-3">T</span>
                <span><strong>Transportation</strong> - Unnecessary movement of materials</span>
              </div>
              <div class="p-3 bg-white rounded flex items-center">
                <span class="font-bold text-teal-600 mr-3">I</span>
                <span><strong>Inventory</strong> - Excess products/materials</span>
              </div>
              <div class="p-3 bg-white rounded flex items-center">
                <span class="font-bold text-teal-600 mr-3">M</span>
                <span><strong>Motion</strong> - Unnecessary movement of people</span>
              </div>
              <div class="p-3 bg-white rounded flex items-center">
                <span class="font-bold text-teal-600 mr-3">W</span>
                <span><strong>Waiting</strong> - Idle time</span>
              </div>
              <div class="p-3 bg-white rounded flex items-center">
                <span class="font-bold text-teal-600 mr-3">O</span>
                <span><strong>Overproduction</strong> - Making more than needed</span>
              </div>
              <div class="p-3 bg-white rounded flex items-center">
                <span class="font-bold text-teal-600 mr-3">O</span>
                <span><strong>Overprocessing</strong> - Doing more than required</span>
              </div>
              <div class="p-3 bg-white rounded flex items-center">
                <span class="font-bold text-teal-600 mr-3">D</span>
                <span><strong>Defects</strong> - Errors requiring rework</span>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-03-overview-02',
      columnType: 'overview',
      sectionTitle: 'Work vs Waste',
      contentHtml: `
        <div class="prose">
          <p>Not all activity is valuable. Learn to distinguish between work that creates value and waste that doesn't.</p>

          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-green-50 rounded border-2 border-green-400">
                <h5 class="font-bold text-green-900 mb-2">Value-Added Work</h5>
                <ul class="text-sm space-y-1">
                  <li>• Transforms the product/service</li>
                  <li>• Customer willing to pay for it</li>
                  <li>• Done right the first time</li>
                </ul>
              </div>
              <div class="p-4 bg-red-50 rounded border-2 border-red-400">
                <h5 class="font-bold text-red-900 mb-2">Non-Value-Added (Waste)</h5>
                <ul class="text-sm space-y-1">
                  <li>• Doesn't transform product</li>
                  <li>• Customer won't pay for it</li>
                  <li>• Can be eliminated</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 2
    },

    // DIVE IN COLUMN
    {
      id: 'section-03-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Practice',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 1 hour 45 minutes</p>
          <p class="mb-6">Learn to identify waste and problems in real-world scenarios through videos, case studies, and practical exercises.</p>
        </div>
      `,
      order: 1
    },

    // RECAP COLUMN
    {
      id: 'section-03-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <div class="prose">
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div class="flex items-start mb-4">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 class="font-bold text-lg mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-sm">Practice identifying waste in your own work environment and prepare to discuss with your coach.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    }
  ],

  activities: [
    {
      id: 'activity-03-01',
      title: 'Service Physics 101 with Steve',
      type: 'audio',
      duration: '18',
      description: 'Listen to Steve explain the fundamentals of identifying waste in service operations.',
      audioUrl: '/audio/sp-101-steve.mp3',
      thumbnailUrl: '/images/steve-sp101.jpg',
      discussionQuestions: [
        {
          id: 'dq-03-01-01',
          question: 'What types of waste are most common in service operations? How do they differ from manufacturing waste?',
          order: 1
        }
      ]
    },
    {
      id: 'activity-03-02',
      title: 'Burger Assembly: Spotting the 7 Wastes',
      type: 'video',
      duration: '1',
      description: 'Watch this short video identifying the 7 wastes in a burger assembly operation. Can you spot all the waste?',
      videoUrl: 'https://www.youtube.com/watch?v=q6-6-X9i9wM',
      thumbnailUrl: '/images/burger-waste.jpg',
      discussionQuestions: [
        {
          id: 'dq-03-02-01',
          question: 'Which types of waste did you identify in the burger assembly? What surprised you most?',
          order: 1
        },
        {
          id: 'dq-03-02-02',
          question: 'How might these wastes compound and create additional problems in the operation?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-03-03',
      title: 'MOD Pizza Case Study',
      type: 'reading',
      duration: '15',
      description: 'Read about how MOD Pizza used waste identification to improve their operations.',
      externalUrl: 'https://example.com/mod-pizza-case-study',
      thumbnailUrl: '/images/mod-pizza.jpg',
      discussionQuestions: [
        {
          id: 'dq-03-03-01',
          question: 'What approach did MOD Pizza take to identify and eliminate waste? What were the results?',
          order: 1
        }
      ]
    },
    {
      id: 'activity-03-04',
      title: 'Spaghetti Mapping Practice',
      type: 'practice',
      duration: '10',
      description: 'Practice creating a spaghetti diagram to visualize movement waste in a process.',
      content: `
        <div class="prose">
          <h3>Create Your Own Spaghetti Diagram</h3>
          <p>Choose a process you're familiar with and map the physical movement involved.</p>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <h4 class="font-bold">Instructions:</h4>
            <ol>
              <li>Draw a simple floor plan of the area</li>
              <li>Mark starting and ending points</li>
              <li>Trace the path of movement with a line</li>
              <li>Identify opportunities to reduce unnecessary motion</li>
            </ol>
          </div>
        </div>
      `,
      discussionQuestions: [
        {
          id: 'dq-03-04-01',
          question: 'What did your spaghetti diagram reveal about the process? Where were the biggest opportunities for improvement?',
          order: 1
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'Walk through your typical workday and identify examples of each type of waste. Which type of waste do you see most often?',
      'Think of a process you\'re involved in. What percentage of the time spent is value-added vs non-value-added?',
      'What barriers might prevent you from eliminating waste in your work environment?'
    ],
    knowledgeCheckUrl: '/knowledge-check/module-3',
    glossaryNote: 'Seeing terms or words in here that you are unfamiliar with? Check out the Service Physics Glossary for definitions.'
  },

  deepDiveResources: [
    {
      id: 'ddr-03-01',
      type: 'read',
      title: 'Learning to See',
      description: 'Value stream mapping to add value and eliminate muda',
      thumbnailUrl: '/images/books/learning-to-see.jpg',
      resourceUrl: 'https://www.lean.org/learning-to-see/',
      order: 1
    },
    {
      id: 'ddr-03-02',
      type: 'watch',
      title: 'The 7 Wastes in Healthcare',
      description: 'Real examples from healthcare operations',
      thumbnailUrl: '/images/videos/7-wastes-healthcare.jpg',
      resourceUrl: 'https://www.youtube.com/watch?v=example',
      order: 1
    }
  ]
};

// ============================================
// MODULE 4: DEFINING PROBLEMS
// ============================================

const module4: CourseModule = {
  id: 'module-04',
  title: 'Defining Problems',
  colorHex: '#42a5b8', // Lighter blue-teal
  timeEstimateMinutes: 110,
  order: 4,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-04-overview-01',
      columnType: 'overview',
      sectionTitle: 'The Gap: Current vs Target',
      contentHtml: `
        <div class="prose">
          <p>A well-defined problem clearly articulates the gap between the current condition and the target condition.</p>

          <div class="my-6 p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
            <h4 class="text-teal-900 font-bold mb-4 text-center">THE PROBLEM DEFINITION GAP</h4>
            <div class="flex items-center justify-between">
              <div class="flex-1 p-4 bg-red-100 rounded border-2 border-red-400 text-center">
                <p class="font-bold text-red-900">Current Condition</p>
                <p class="text-sm mt-2">What's happening now</p>
              </div>
              <div class="px-4">
                <svg class="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div class="flex-1 p-4 bg-green-100 rounded border-2 border-green-400 text-center">
                <p class="font-bold text-green-900">Target Condition</p>
                <p class="text-sm mt-2">What we want to achieve</p>
              </div>
            </div>
            <div class="mt-4 p-4 bg-white rounded text-center">
              <p class="font-bold">THE GAP = THE PROBLEM</p>
            </div>
          </div>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-04-overview-02',
      columnType: 'overview',
      sectionTitle: 'Problem Statement Template',
      contentHtml: `
        <div class="prose">
          <p>A good problem statement is specific, measurable, and focuses on the gap rather than the solution.</p>

          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4">PROBLEM STATEMENT FORMAT</h4>
            <div class="p-4 bg-blue-50 rounded border-l-4 border-blue-400">
              <p class="font-mono text-sm mb-3">[Process/Area] is experiencing [Current Condition with data], which is [X%] away from [Target Condition with data], causing [Impact].</p>

              <div class="mt-4 pt-4 border-t border-blue-200">
                <p class="font-bold text-sm mb-2">Example:</p>
                <p class="text-sm italic">The customer service team is experiencing an average response time of 48 hours, which is 300% away from our target of 12 hours, causing decreased customer satisfaction scores and increased complaints.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 2
    },

    // DIVE IN COLUMN
    {
      id: 'section-04-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Practice',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 1 hour 50 minutes</p>
          <p class="mb-6">Learn to write clear, actionable problem statements through examples and practice.</p>
        </div>
      `,
      order: 1
    },

    // RECAP COLUMN
    {
      id: 'section-04-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <div class="prose">
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div class="flex items-start mb-4">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 class="font-bold text-lg mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-sm">Write a problem statement for a real issue you're facing and be ready to refine it with your coach.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    }
  ],

  activities: [
    {
      id: 'activity-04-01',
      title: 'Moneyball: Defining the Problem',
      type: 'video',
      duration: '5',
      description: 'Watch this clip from Moneyball showing how redefining the problem led to a breakthrough solution.',
      videoUrl: 'https://www.youtube.com/watch?v=rTEQFss-1Ck',
      thumbnailUrl: '/images/moneyball.jpg',
      discussionQuestions: [
        {
          id: 'dq-04-01-01',
          question: 'How did reframing the problem change the approach to solving it? What assumptions were challenged?',
          order: 1
        }
      ]
    },
    {
      id: 'activity-04-02',
      title: 'Panda Express Drive-Thru Case Study',
      type: 'video',
      duration: '10',
      description: 'A real-world case study walking through how to define a complex operational problem at Panda Express.',
      videoUrl: 'https://www.youtube.com/watch?v=kUZFDYBSNAY',
      thumbnailUrl: '/images/panda-case.jpg',
      discussionQuestions: [
        {
          id: 'dq-04-02-01',
          question: 'What data was used to define the current condition? How did this help clarify the problem?',
          order: 1
        },
        {
          id: 'dq-04-02-02',
          question: 'How did the team avoid jumping to solutions before fully defining the problem?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-04-03',
      title: 'Problem Statement Practice',
      type: 'practice',
      duration: '9',
      description: 'Practice writing and refining problem statements using real scenarios.',
      content: `
        <div class="prose">
          <h3>Write Your Problem Statement</h3>
          <p>Use the template to write a clear problem statement for a real issue you're facing.</p>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <h4 class="font-bold">Template:</h4>
            <p class="font-mono text-sm">[Process/Area] is experiencing [Current Condition with data], which is [X%] away from [Target Condition with data], causing [Impact].</p>
          </div>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <h4 class="font-bold">Checklist - Good problem statements are:</h4>
            <ul>
              <li>☐ Specific (not vague)</li>
              <li>☐ Measurable (includes data)</li>
              <li>☐ Focused on the gap (not the solution)</li>
              <li>☐ Showing impact (why it matters)</li>
            </ul>
          </div>
        </div>
      `,
      discussionQuestions: [
        {
          id: 'dq-04-03-01',
          question: 'Share your problem statement. Does it clearly describe the gap? Is it measurable? Does it focus on the problem rather than a solution?',
          order: 1
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'Bring a problem you\'re currently facing. Work with your coach to write a clear problem statement using the template.',
      'What\'s the difference between a problem and a solution? Why is it important to distinguish between the two?',
      'How can you gather data to support your problem definition?'
    ],
    knowledgeCheckUrl: '/knowledge-check/module-4',
    glossaryNote: 'Seeing terms or words in here that you are unfamiliar with? Check out the Service Physics Glossary for definitions.'
  },

  deepDiveResources: [
    {
      id: 'ddr-04-01',
      type: 'read',
      title: 'The Problem-Solving A3',
      description: 'How to define problems effectively',
      thumbnailUrl: '/images/books/problem-solving-a3.jpg',
      resourceUrl: 'https://www.lean.org/problem-solving-a3/',
      order: 1
    },
    {
      id: 'ddr-04-02',
      type: 'watch',
      title: 'The Power of Problem Definition',
      description: 'TEDx talk on why problem definition matters',
      thumbnailUrl: '/images/videos/problem-definition.jpg',
      resourceUrl: 'https://www.youtube.com/watch?v=example',
      order: 1
    }
  ]
};

// ============================================
// MODULE 5: EXPERIMENT TO LEARN
// ============================================

const module5: CourseModule = {
  id: 'module-05',
  title: 'Experiment to Learn',
  colorHex: '#22c55e', // Service Physics yellow-green accent
  timeEstimateMinutes: 45,
  order: 5,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-05-overview-01',
      columnType: 'overview',
      sectionTitle: 'The Experiment Plan',
      contentHtml: `
        <div class="prose">
          <p>Experiments are how we learn and improve. An experiment plan helps us test our ideas systematically.</p>

          <div class="my-6 p-6 bg-green-50 rounded-lg border-2 border-green-200">
            <h4 class="text-green-900 font-bold mb-4">EXPERIMENT PLAN STRUCTURE</h4>
            <div class="space-y-3">
              <div class="p-3 bg-white rounded">
                <p class="font-semibold">Step 1: What do we expect?</p>
                <p class="text-sm text-gray-600">Hypothesis - What we think will happen</p>
              </div>
              <div class="p-3 bg-white rounded">
                <p class="font-semibold">Step 2: What will we try?</p>
                <p class="text-sm text-gray-600">Test - The specific change we'll make</p>
              </div>
              <div class="p-3 bg-white rounded">
                <p class="font-semibold">Step 3: How will we know?</p>
                <p class="text-sm text-gray-600">Measure - How we'll collect data</p>
              </div>
              <div class="p-3 bg-white rounded">
                <p class="font-semibold">Step 4: What did we learn?</p>
                <p class="text-sm text-gray-600">Results - What actually happened</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-05-overview-02',
      columnType: 'overview',
      sectionTitle: 'Point Kaizen',
      contentHtml: `
        <div class="prose">
          <p>Point Kaizen are small, rapid experiments that can be completed quickly to test ideas and learn.</p>

          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4">CHARACTERISTICS OF POINT KAIZEN</h4>
            <ul class="space-y-2">
              <li class="flex items-start">
                <span class="text-green-600 font-bold mr-2">✓</span>
                <span><strong>Quick:</strong> Can be completed in days or weeks</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 font-bold mr-2">✓</span>
                <span><strong>Focused:</strong> Targets a specific problem</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 font-bold mr-2">✓</span>
                <span><strong>Low-cost:</strong> Minimal resources required</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 font-bold mr-2">✓</span>
                <span><strong>Measurable:</strong> Clear before/after data</span>
              </li>
            </ul>
          </div>
        </div>
      `,
      order: 2
    },

    // DIVE IN COLUMN
    {
      id: 'section-05-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 45 minutes</p>
          <p class="mb-6">Learn how to design and run effective experiments through real-world examples.</p>
        </div>
      `,
      order: 1
    },

    // RECAP COLUMN
    {
      id: 'section-05-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <div class="prose">
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div class="flex items-start mb-4">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 class="font-bold text-lg mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-sm">Design a simple experiment you can run in your work environment and discuss it with your coach.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    }
  ],

  activities: [
    {
      id: 'activity-05-01',
      title: 'ERACS: Panda Express Drive-Thru',
      type: 'video',
      duration: '2',
      description: 'See how ERACS (Eliminate, Reduce, Automate, Combine, Simplify) is applied to improve the Panda Express drive-thru experience.',
      videoUrl: 'https://www.youtube.com/watch?v=DvSWcxSJvmo',
      thumbnailUrl: '/images/eracs-panda.jpg',
      discussionQuestions: [
        {
          id: 'dq-05-01-01',
          question: 'What is ERACS? How was each element (Eliminate, Reduce, Automate, Combine, Simplify) applied in this example?',
          order: 1
        },
        {
          id: 'dq-05-01-02',
          question: 'How might you apply ERACS to a process in your own work?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-05-02',
      title: 'Panda Drive-Thru Experiment',
      type: 'video',
      duration: '3',
      description: 'Watch a quick experiment in action at the Panda Express drive-thru.',
      videoUrl: 'https://www.youtube.com/watch?v=dvX21ltUCg8',
      thumbnailUrl: '/images/panda-drivethru.jpg',
      discussionQuestions: [
        {
          id: 'dq-05-02-01',
          question: 'What was the hypothesis being tested? What did they measure?',
          order: 1
        }
      ]
    },
    {
      id: 'activity-05-03',
      title: 'Experiment Plan Walk-Through',
      type: 'video',
      duration: '5',
      description: 'A detailed walkthrough of how to create and execute an experiment plan.',
      videoUrl: 'https://www.youtube.com/watch?v=DYpC9o-HTas',
      thumbnailUrl: '/images/experiment-plan.jpg',
      discussionQuestions: [
        {
          id: 'dq-05-03-01',
          question: 'What are the key components of a good experiment plan?',
          order: 1
        },
        {
          id: 'dq-05-03-02',
          question: 'How do you know when an experiment is "done"? What makes results conclusive?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-05-04',
      title: 'ERACS Practice: Point Kaizen at Home',
      type: 'practice',
      duration: '60',
      description: 'Apply ERACS to improve a process in your own life. Download the worksheet, choose a regular activity (like making coffee or packing lunch), and work through each step to create a measurable improvement.',
      externalUrl: '/templates/eracs-practice-worksheet.html',
      thumbnailUrl: '/images/eracs-practice.jpg',
      content: `
        <div class="prose max-w-none">
          <h3>Practice ERACS at Home</h3>
          <p>It's your turn! With this practice exercise, you'll identify a problem to solve with process improvement in your own life and apply the Point Kaizen methodology.</p>

          <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
            <h4 class="font-bold text-green-800">Download the Worksheet</h4>
            <p class="text-green-700">Use the downloadable PDF worksheet to guide you through this exercise.</p>
            <a href="/templates/eracs-practice-worksheet.html" class="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" download>
              📥 Download ERACS Worksheet (PDF)
            </a>
          </div>

          <h4>Step 1: Setup & Problem Definition</h4>
          <p>Choose a regular activity in your life that is:</p>
          <ul>
            <li>Relatively frequently repeated</li>
            <li>Can be broken down into a clear list of tasks</li>
            <li>Has clear value delivery (a beverage to drink, clean clothes to wear, etc.)</li>
          </ul>

          <p><strong>Example Ideas:</strong> Brewing coffee, making a toasted sandwich, making a smoothie, morning routine, packing lunch</p>

          <h4>Step 2: Break Down The Job</h4>
          <p>Video yourself completing this task 1-2 times to capture the current state with data. List each step, noting:</p>
          <ul>
            <li>Machine, Hand, or Both?</li>
            <li>How long does each step take?</li>
          </ul>
          <p>Create a spaghetti map of your movement during the process.</p>

          <h4>Step 3: Apply ERACS</h4>
          <p>Question every detail using the ERACS framework:</p>
          <ul>
            <li><strong>E</strong>liminate - Remove unnecessary steps</li>
            <li><strong>R</strong>earrange - Reorder for better flow</li>
            <li><strong>A</strong>dd/Subtract - Add missing elements, remove excess</li>
            <li><strong>C</strong>ombine - Merge steps when practical</li>
            <li><strong>S</strong>implify - Make each step repeatable and predictable</li>
          </ul>

          <h4>Step 4: Test & Compare</h4>
          <p>Video yourself completing the improved process. Compare:</p>
          <ul>
            <li>Did you achieve your target improvement?</li>
            <li>Are quality standards maintained or improved?</li>
          </ul>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <h4 class="font-bold">Coaching Session</h4>
            <p>Once complete, schedule time with your coach to share your worksheet and walk through your process improvement.</p>
          </div>
        </div>
      `,
      discussionQuestions: [
        {
          id: 'dq-05-04-01',
          question: 'What process did you choose to improve? Why did you select it?',
          order: 1
        },
        {
          id: 'dq-05-04-02',
          question: 'Which ERACS element had the biggest impact on your process? What surprised you?',
          order: 2
        },
        {
          id: 'dq-05-04-03',
          question: 'What was your before and after time? What percentage improvement did you achieve?',
          order: 3
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'Have you run experiments or kaizen events before? What was your experience?',
      'Think of a small change you could test in your work. What would you measure to know if it worked?',
      'What barriers might prevent you from running quick experiments in your organization?'
    ],
    knowledgeCheckUrl: '/knowledge-check/module-5',
    glossaryNote: 'Seeing terms or words in here that you are unfamiliar with? Check out the Service Physics Glossary for definitions.'
  },

  deepDiveResources: [
    {
      id: 'ddr-05-01',
      type: 'read',
      title: 'The Lean Startup',
      description: 'Build-Measure-Learn approach to experimentation',
      thumbnailUrl: '/images/books/lean-startup.jpg',
      resourceUrl: 'https://www.amazon.com/Lean-Startup-Eric-Ries/dp/0307887898',
      order: 1
    },
    {
      id: 'ddr-05-02',
      type: 'read',
      title: 'Kaizen Express',
      description: 'Fundamentals of kaizen and continuous improvement',
      thumbnailUrl: '/images/books/kaizen-express.jpg',
      resourceUrl: 'https://www.lean.org/kaizen-express/',
      order: 2
    }
  ]
};

// ============================================
// MODULE 6: MEASURE
// ============================================

const module6: CourseModule = {
  id: 'module-06',
  title: 'Measure',
  colorHex: '#16a34a', // Deeper green accent
  timeEstimateMinutes: 45,
  order: 6,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-06-overview-01',
      columnType: 'overview',
      sectionTitle: 'Reviewing Experiment Results',
      contentHtml: `
        <div class="prose">
          <p>Measuring and reviewing results helps us learn from our experiments and decide on next steps.</p>

          <div class="my-6 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-600">
            <h4 class="text-yellow-900 font-bold mb-4">RESULTS REVIEW QUESTIONS</h4>
            <div class="space-y-3">
              <div class="p-3 bg-white rounded">
                <p class="font-semibold">Did we achieve our target?</p>
                <p class="text-sm text-gray-600">Compare results to hypothesis</p>
              </div>
              <div class="p-3 bg-white rounded">
                <p class="font-semibold">What did we learn?</p>
                <p class="text-sm text-gray-600">Insights from the data</p>
              </div>
              <div class="p-3 bg-white rounded">
                <p class="font-semibold">What surprised us?</p>
                <p class="text-sm text-gray-600">Unexpected findings</p>
              </div>
              <div class="p-3 bg-white rounded">
                <p class="font-semibold">What's our next experiment?</p>
                <p class="text-sm text-gray-600">How do we build on what we learned?</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-06-overview-02',
      columnType: 'overview',
      sectionTitle: 'Capturing Feedback',
      contentHtml: `
        <div class="prose">
          <p>Effective measurement includes both quantitative data and qualitative feedback from people affected by the change.</p>

          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4">TYPES OF FEEDBACK</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-blue-50 rounded">
                <h5 class="font-bold mb-2">Quantitative</h5>
                <ul class="text-sm space-y-1">
                  <li>• Numbers & metrics</li>
                  <li>• Time studies</li>
                  <li>• Error rates</li>
                  <li>• Customer satisfaction scores</li>
                </ul>
              </div>
              <div class="p-4 bg-green-50 rounded">
                <h5 class="font-bold mb-2">Qualitative</h5>
                <ul class="text-sm space-y-1">
                  <li>• Observations</li>
                  <li>• Interviews</li>
                  <li>• Open-ended surveys</li>
                  <li>• Team discussions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 2
    },

    // DIVE IN COLUMN
    {
      id: 'section-06-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 45 minutes</p>
          <p class="mb-6">Learn how to effectively measure results and gather meaningful feedback.</p>
        </div>
      `,
      order: 1
    },

    // RECAP COLUMN
    {
      id: 'section-06-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <div class="prose">
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div class="flex items-start mb-4">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 class="font-bold text-lg mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-sm">Think about how you currently measure success in your work and what you might be missing.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 1
    }
  ],

  activities: [
    {
      id: 'activity-06-01',
      title: 'Reviewing Your Experiment Results',
      type: 'video',
      duration: '5',
      description: 'Learn how to review experiment results and determine next steps using the experiment plan framework.',
      videoUrl: 'https://www.youtube.com/watch?v=DYpC9o-HTas',
      thumbnailUrl: '/images/experiment-review.jpg',
      discussionQuestions: [
        {
          id: 'dq-06-01-01',
          question: 'How do you distinguish between facts and opinions when reviewing results? Why does this matter?',
          order: 1
        },
        {
          id: 'dq-06-01-02',
          question: 'What should you do when the results don\'t match your hypothesis?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-06-02',
      title: 'Gathering Feedback',
      type: 'reading',
      duration: '25',
      description: 'Learn effective techniques for gathering qualitative feedback through interviews and observations.',
      externalUrl: 'https://www.lean.org/the-lean-post/articles/go-and-see/',
      thumbnailUrl: '/images/go-and-see.jpg',
      discussionQuestions: [
        {
          id: 'dq-06-02-01',
          question: 'What are the key principles for conducting effective observations? How can you avoid bias?',
          order: 1
        },
        {
          id: 'dq-06-02-02',
          question: 'How can you balance quantitative metrics with qualitative feedback in your measurement approach?',
          order: 2
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'What metrics do you currently use to measure success in your work? Are they leading or lagging indicators?',
      'How do you currently gather feedback from people affected by changes? What could you improve?',
      'Share an example where data revealed something unexpected. How did you respond?'
    ],
    knowledgeCheckUrl: '/knowledge-check/module-6',
    glossaryNote: 'Seeing terms or words in here that you are unfamiliar with? Check out the Service Physics Glossary for definitions.'
  },

  deepDiveResources: [
    {
      id: 'ddr-06-01',
      type: 'read',
      title: 'Measuring What Matters',
      description: 'OKRs and the art of setting objectives',
      thumbnailUrl: '/images/books/measure-what-matters.jpg',
      resourceUrl: 'https://www.whatmatters.com/',
      order: 1
    },
    {
      id: 'ddr-06-02',
      type: 'read',
      title: 'The Mom Test',
      description: 'How to talk to customers and learn if your business is a good idea',
      thumbnailUrl: '/images/books/mom-test.jpg',
      resourceUrl: 'https://www.momtestbook.com/',
      order: 2
    }
  ]
};

// ============================================
// MODULE 7: EVALUATION & CONTINUOUS IMPROVEMENT
// ============================================

const module7: CourseModule = {
  id: 'module-07',
  title: 'Evaluation & Continuous Improvement',
  colorHex: '#15803d', // Dark green accent
  timeEstimateMinutes: 35,
  order: 7,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-07-overview-01',
      columnType: 'overview',
      sectionTitle: 'The PDCA Cycle',
      contentHtml: `
        <div class="prose">
          <p>Continuous improvement means repeating the PDCA cycle over and over, learning and improving with each iteration.</p>

          <div class="my-6 p-6 bg-orange-50 rounded-lg border-2 border-orange-300">
            <h4 class="text-orange-900 font-bold mb-4 text-center">CONTINUOUS IMPROVEMENT CYCLE</h4>
            <div class="relative">
              <div class="flex justify-center items-center">
                <svg class="w-64 h-64" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#d2691e" stroke-width="2" stroke-dasharray="5,5"/>
                  <g transform="rotate(-90 100 100)">
                    <path d="M 100 20 A 80 80 0 0 1 180 100" fill="#3b82f6" opacity="0.7"/>
                    <path d="M 180 100 A 80 80 0 0 1 100 180" fill="#10b981" opacity="0.7"/>
                    <path d="M 100 180 A 80 80 0 0 1 20 100" fill="#f59e0b" opacity="0.7"/>
                    <path d="M 20 100 A 80 80 0 0 1 100 20" fill="#ef4444" opacity="0.7"/>
                  </g>
                  <text x="100" y="40" text-anchor="middle" class="text-sm font-bold">PLAN</text>
                  <text x="160" y="105" text-anchor="middle" class="text-sm font-bold">DO</text>
                  <text x="100" y="170" text-anchor="middle" class="text-sm font-bold">CHECK</text>
                  <text x="40" y="105" text-anchor="middle" class="text-sm font-bold">ACT</text>
                </svg>
              </div>
            </div>
            <p class="text-center mt-4 text-sm">Each cycle builds on the learning from the previous one</p>
          </div>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-07-overview-02',
      columnType: 'overview',
      sectionTitle: 'Anatomy of Improvement',
      contentHtml: `
        <div class="prose">
          <p>Sustainable improvement requires both technical changes and behavioral changes in how we work.</p>

          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4">ELEMENTS OF LASTING CHANGE</h4>
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 rounded">
                <p class="font-semibold">🔧 Technical System</p>
                <p class="text-sm">Tools, processes, and methods</p>
              </div>
              <div class="p-3 bg-green-50 rounded">
                <p class="font-semibold">👥 Social System</p>
                <p class="text-sm">People, relationships, and culture</p>
              </div>
              <div class="p-3 bg-yellow-50 rounded">
                <p class="font-semibold">📚 Knowledge System</p>
                <p class="text-sm">Training, coaching, and learning</p>
              </div>
              <div class="p-3 bg-purple-50 rounded">
                <p class="font-semibold">🎯 Management System</p>
                <p class="text-sm">Metrics, reviews, and accountability</p>
              </div>
            </div>
          </div>
        </div>
      `,
      order: 2
    },

    // DIVE IN COLUMN
    {
      id: 'section-07-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Read',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 35 minutes</p>
          <p class="mb-6">Learn what makes improvement sustainable and how to build a culture of continuous improvement.</p>
        </div>
      `,
      order: 1
    },

    // RECAP COLUMN
    {
      id: 'section-07-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <div class="prose">
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <div class="flex items-start mb-4">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 class="font-bold text-lg mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-sm">Reflect on your improvement journey through this course and plan your next steps with your coach.</p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h4 class="font-bold text-green-900 mb-3">🎉 Congratulations!</h4>
            <p class="text-sm mb-3">You've completed the Problem Solving 101 course. You now have the foundations to:</p>
            <ul class="text-sm space-y-1">
              <li>• Identify and define problems systematically</li>
              <li>• Use structured problem-solving tools</li>
              <li>• Design and run improvement experiments</li>
              <li>• Measure and evaluate results</li>
              <li>• Build continuous improvement into your work</li>
            </ul>
          </div>
        </div>
      `,
      order: 1
    }
  ],

  activities: [
    {
      id: 'activity-07-01',
      title: 'Formula 1 Pit Stops: The Art of Continuous Improvement',
      type: 'video',
      duration: '5',
      description: 'See how F1 teams use continuous improvement to shave milliseconds off pit stop times.',
      videoUrl: 'https://www.youtube.com/watch?v=example',
      thumbnailUrl: '/images/f1-pitstop.jpg',
      discussionQuestions: [
        {
          id: 'dq-07-01-01',
          question: 'What enables F1 teams to improve pit stops to under 2 seconds? What systems and practices support this level of performance?',
          order: 1
        },
        {
          id: 'dq-07-01-02',
          question: 'How can you apply the principles of F1 pit stop improvement to your own work?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-07-02',
      title: 'Boeing and the Cost of Cutting Corners',
      type: 'reading',
      duration: '30',
      description: 'Read this Wall Street Journal analysis of what happens when continuous improvement culture breaks down.',
      externalUrl: 'https://www.wsj.com/articles/boeing-737-max-investigation',
      thumbnailUrl: '/images/boeing-wsj.jpg',
      discussionQuestions: [
        {
          id: 'dq-07-02-01',
          question: 'What organizational factors led to Boeing\'s quality problems? How did culture play a role?',
          order: 1
        },
        {
          id: 'dq-07-02-02',
          question: 'What safeguards can organizations put in place to maintain a culture of continuous improvement and quality?',
          order: 2
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'Looking back on this course, what was the most valuable insight or tool you learned?',
      'What is one improvement you want to make in your work in the next 30 days? How will you apply what you\'ve learned?',
      'How can you help build a culture of continuous improvement in your organization?',
      'What barriers to continuous improvement do you see in your workplace? How might you address them?'
    ],
    knowledgeCheckUrl: '/knowledge-check/module-7',
    glossaryNote: 'Seeing terms or words in here that you are unfamiliar with? Check out the Service Physics Glossary for definitions.'
  },

  deepDiveResources: [
    {
      id: 'ddr-07-01',
      type: 'read',
      title: 'The Toyota Way',
      description: '14 Management Principles from the World\'s Greatest Manufacturer',
      thumbnailUrl: '/images/books/toyota-way.jpg',
      resourceUrl: 'https://www.amazon.com/Toyota-Way-Management-Principles-Manufacturer/dp/0071392319',
      order: 1
    },
    {
      id: 'ddr-07-02',
      type: 'read',
      title: 'The High-Velocity Edge',
      description: 'How the leading organizations use operational excellence to beat the competition',
      thumbnailUrl: '/images/books/high-velocity-edge.jpg',
      resourceUrl: 'https://www.amazon.com/High-Velocity-Edge-Operational-Excellence-Competition/dp/1259860906',
      order: 2
    },
    {
      id: 'ddr-07-03',
      type: 'watch',
      title: 'Building a Culture of Continuous Improvement',
      description: 'TEDx talk on creating lasting organizational change',
      thumbnailUrl: '/images/videos/culture-improvement.jpg',
      resourceUrl: 'https://www.youtube.com/watch?v=example',
      order: 1
    }
  ]
};

// ============================================
// EXPORT ALL MODULES
// ============================================

export const courseModules: CourseModule[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7
];

export const courseMetadata = {
  id: 'service-physics-problem-solving-101',
  title: 'Service Physics Problem Solving 101',
  description: 'Master the art of problem-solving with proven frameworks, practical tools, and real-world applications.',
  totalModules: 7,
  totalActivities: 17, // 3+3+4+3+2+2+2 = 17 activities across all 7 modules
  instructor: 'Service Physics Academy',
  estimatedDuration: '7-8 hours',
  skillLevel: 'Beginner to Intermediate',
  learningOutcomes: [
    'Apply the Improvement Kata methodology to solve problems systematically',
    'Use PDCA cycles to experiment and learn',
    'Identify and eliminate the 7 types of waste',
    'Utilize problem-solving tools like 5 Whys, A3, and Fishbone diagrams',
    'Define clear problem statements and target conditions',
    'Design and execute improvement experiments',
    'Measure and evaluate results effectively'
  ]
};
