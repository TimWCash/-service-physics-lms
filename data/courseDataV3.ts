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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">Our problem-solving approach is built on the <span class="font-semibold text-teal-700">Improvement Kata</span> — a systematic method for achieving challenging goals through iterative learning and experimentation.</p>

          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 p-8 text-white shadow-xl">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

            <h4 class="text-xl font-bold mb-6 flex items-center">
              <span class="text-3xl mr-3">🎯</span> THE IMPROVEMENT KATA
            </h4>
            <div class="space-y-4 relative z-10">
              <div class="flex items-center bg-white/20 backdrop-blur rounded-xl p-4 transform hover:scale-102 transition-transform">
                <span class="w-10 h-10 bg-white text-teal-700 rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg">1</span>
                <div>
                  <span class="font-semibold text-lg">Understand the Direction</span>
                  <p class="text-teal-100 text-sm">Know where you're headed</p>
                </div>
              </div>
              <div class="flex items-center bg-white/20 backdrop-blur rounded-xl p-4 transform hover:scale-102 transition-transform">
                <span class="w-10 h-10 bg-white text-teal-700 rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg">2</span>
                <div>
                  <span class="font-semibold text-lg">Grasp the Current Condition</span>
                  <p class="text-teal-100 text-sm">Understand where you are now</p>
                </div>
              </div>
              <div class="flex items-center bg-white/20 backdrop-blur rounded-xl p-4 transform hover:scale-102 transition-transform">
                <span class="w-10 h-10 bg-white text-teal-700 rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg">3</span>
                <div>
                  <span class="font-semibold text-lg">Establish Next Target</span>
                  <p class="text-teal-100 text-sm">Set your next milestone</p>
                </div>
              </div>
              <div class="flex items-center bg-white/20 backdrop-blur rounded-xl p-4 transform hover:scale-102 transition-transform">
                <span class="w-10 h-10 bg-white text-teal-700 rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg">4</span>
                <div>
                  <span class="font-semibold text-lg">Experiment to Learn</span>
                  <p class="text-teal-100 text-sm">Test, learn, and adapt</p>
                </div>
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">The <span class="font-semibold text-blue-700">PDCA cycle</span> is the foundation of scientific problem-solving. It provides a structured approach to testing ideas and learning from results.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">🔄</span> PDCA FOR PROBLEM SOLVING
              </h4>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="absolute top-0 right-0 text-6xl font-black text-white/20">P</div>
                  <div class="relative z-10">
                    <div class="text-3xl font-black mb-2">PLAN</div>
                    <p class="text-blue-100 text-sm">Define the problem & set targets</p>
                  </div>
                </div>
                <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="absolute top-0 right-0 text-6xl font-black text-white/20">D</div>
                  <div class="relative z-10">
                    <div class="text-3xl font-black mb-2">DO</div>
                    <p class="text-emerald-100 text-sm">Execute your experiment</p>
                  </div>
                </div>
                <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="absolute top-0 right-0 text-6xl font-black text-white/20">C</div>
                  <div class="relative z-10">
                    <div class="text-3xl font-black mb-2">CHECK</div>
                    <p class="text-amber-100 text-sm">Measure & analyze results</p>
                  </div>
                </div>
                <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-500 to-red-600 p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="absolute top-0 right-0 text-6xl font-black text-white/20">A</div>
                  <div class="relative z-10">
                    <div class="text-3xl font-black mb-2">ACT</div>
                    <p class="text-rose-100 text-sm">Standardize or iterate</p>
                  </div>
                </div>
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">The <span class="font-semibold text-purple-700">Cynefin Framework</span> helps us understand the nature of problems and choose appropriate responses.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">🧭</span> CYNEFIN FRAMEWORK
              </h4>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                  <div class="flex items-center mb-2">
                    <span class="text-2xl mr-2">🔬</span>
                    <h5 class="font-bold text-blue-900">Complex</h5>
                  </div>
                  <p class="text-sm text-blue-700 font-medium">Probe → Sense → Respond</p>
                  <p class="text-xs text-blue-600 mt-1">Emergent practice</p>
                </div>
                <div class="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 border-2 border-green-200 hover:border-green-400 transition-colors">
                  <div class="flex items-center mb-2">
                    <span class="text-2xl mr-2">🔧</span>
                    <h5 class="font-bold text-green-900">Complicated</h5>
                  </div>
                  <p class="text-sm text-green-700 font-medium">Sense → Analyze → Respond</p>
                  <p class="text-xs text-green-600 mt-1">Expert practice</p>
                </div>
                <div class="rounded-xl bg-gradient-to-br from-red-50 to-red-100 p-4 border-2 border-red-200 hover:border-red-400 transition-colors">
                  <div class="flex items-center mb-2">
                    <span class="text-2xl mr-2">🚨</span>
                    <h5 class="font-bold text-red-900">Chaotic</h5>
                  </div>
                  <p class="text-sm text-red-700 font-medium">Act → Sense → Respond</p>
                  <p class="text-xs text-red-600 mt-1">Novel practice</p>
                </div>
                <div class="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-4 border-2 border-amber-200 hover:border-amber-400 transition-colors">
                  <div class="flex items-center mb-2">
                    <span class="text-2xl mr-2">✅</span>
                    <h5 class="font-bold text-amber-900">Clear</h5>
                  </div>
                  <p class="text-sm text-amber-700 font-medium">Sense → Categorize → Respond</p>
                  <p class="text-xs text-amber-600 mt-1">Best practice</p>
                </div>
              </div>
              <div class="mt-4 p-3 bg-gray-100 rounded-xl text-center border-2 border-dashed border-gray-300">
                <p class="font-bold text-gray-700">❓ Disorder</p>
                <p class="text-xs text-gray-500">When you don't know which domain you're in</p>
              </div>
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
        <div class="space-y-6">
          <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
            <span class="text-4xl">⏱️</span>
            <div>
              <p class="text-2xl font-bold">1 hour 45 minutes</p>
              <p class="text-indigo-100">Total learning time</p>
            </div>
          </div>

          <p class="text-gray-700 leading-relaxed">Watch the videos, listen to the audio, or read the case studies below. Use the discussion questions to guide your thinking and prepare for coaching sessions.</p>

          <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 p-5 text-white shadow-lg">
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-20">💡</div>
            <div class="relative z-10">
              <p class="font-bold text-lg mb-1">📝 Pro Tip</p>
              <p class="text-amber-50">Take notes as you go and answer the discussion questions. Plan to review your answers with your coach.</p>
            </div>
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
        <div class="space-y-6">
          <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-xl">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div class="flex items-start gap-4 relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-3xl">🎓</span>
              </div>
              <div>
                <h4 class="font-bold text-xl mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-blue-100">Stop here and make notes to answer the discussion questions below. When you next meet with your coach, discuss your responses and any follow-up questions.</p>
              </div>
            </div>
          </div>

          <div class="rounded-xl bg-gray-50 border-2 border-gray-200 p-5">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-2xl">❓</span>
              <h5 class="font-bold text-gray-800">Questions for Your Coach</h5>
            </div>
            <p class="text-sm text-gray-600 mb-4">Use this space to document any additional questions:</p>
            <div class="space-y-2">
              <div class="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                <span class="text-gray-400">•</span>
                <span class="text-gray-400 italic">Your question here...</span>
              </div>
              <div class="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                <span class="text-gray-400">•</span>
                <span class="text-gray-400 italic">Your question here...</span>
              </div>
              <div class="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                <span class="text-gray-400">•</span>
                <span class="text-gray-400 italic">Your question here...</span>
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
        <div class="rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 p-5 flex items-center gap-4">
          <span class="text-3xl">📖</span>
          <div>
            <p class="text-gray-700">Seeing unfamiliar terms?</p>
            <a href="/glossary" class="font-bold text-purple-700 hover:text-purple-900 transition-colors">Check out the Service Physics Glossary →</a>
          </div>
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
      externalUrl: '/pdfs/Shook - Redefining Work.pdf',
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
      externalUrl: '/pdfs/The Solution Fixation Trap.pdf',
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
    },
    {
      id: 'activity-01-quiz',
      title: 'Module 1 Knowledge Check',
      type: 'quiz',
      duration: '5',
      description: 'Test your understanding of the problem solving approach concepts covered in this module.',
      questions: [
        {
          id: 'q-01-01',
          question: 'Which of these statements define a problem?',
          options: [
            'A gap between X and Y',
            'It takes a very long time to do X and Y',
            'People are using X to do Y',
            'There are 14Xs and 14Ys, but demand requires 12Xs and 16Ys',
            'A & C',
            'A & D'
          ],
          correctAnswer: 5,
          explanation: 'A problem is defined as a gap between current state and desired state. Both "A gap between X and Y" and the demand mismatch example represent gaps.'
        },
        {
          id: 'q-01-02',
          question: 'What is beneficial about the Check step in the PDCA (Plan Do Check Act) framework?',
          options: [
            'Ensure that we have designed a test that will prove our hypothesis',
            'Ensure that all cross functional teams have checked their work',
            'Ensures that decisions are based on evidence rather than assumptions',
            'All of the above'
          ],
          correctAnswer: 2,
          explanation: 'The Check step ensures decisions are based on evidence rather than assumptions by reviewing actual results against expected outcomes.'
        },
        {
          id: 'q-01-03',
          question: 'Imagine we want to fix a Boeing airplane engine. We know that fuel is leaking somewhere inside of the engine; we are not sure why. How do you classify and approach this problem using the Cynefin Framework?',
          options: [
            'Clear (Approach: Apply best practice such as standard work or work routines)',
            'Complicated (Approach: Bring in a subject matter expert, such as an airplane mechanic, to run diagnostic tests)',
            'Complex (Approach: Bring a committee of airport personnel consisting of ground crew, pilots, and air traffic control to discuss the problem)',
            'Chaotic (Approach: Bring in the Boeing CEO to set direction and context)'
          ],
          correctAnswer: 1,
          explanation: 'This is a Complicated problem - the cause-effect relationship exists but requires expertise to diagnose. A subject matter expert running diagnostic tests is the appropriate approach.'
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">The <span class="font-semibold text-cyan-700">A3</span> is a structured approach to problem-solving that fits on a single sheet of A3 paper. It guides you through a systematic process of understanding, analyzing, and solving problems.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">📋</span> A3 STRUCTURE
              </h4>
            </div>
            <div class="p-6 space-y-3">
              <div class="flex items-center p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">1</span>
                <div>
                  <p class="font-semibold text-gray-900">Background</p>
                  <p class="text-sm text-gray-500">Why is this important?</p>
                </div>
              </div>
              <div class="flex items-center p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">2</span>
                <div>
                  <p class="font-semibold text-gray-900">Current Condition</p>
                  <p class="text-sm text-gray-500">What is happening now?</p>
                </div>
              </div>
              <div class="flex items-center p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">3</span>
                <div>
                  <p class="font-semibold text-gray-900">Goal/Target</p>
                  <p class="text-sm text-gray-500">What do we want to achieve?</p>
                </div>
              </div>
              <div class="flex items-center p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">4</span>
                <div>
                  <p class="font-semibold text-gray-900">Root Cause Analysis</p>
                  <p class="text-sm text-gray-500">Why is this happening?</p>
                </div>
              </div>
              <div class="flex items-center p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">5</span>
                <div>
                  <p class="font-semibold text-gray-900">Countermeasures</p>
                  <p class="text-sm text-gray-500">What will we try?</p>
                </div>
              </div>
              <div class="flex items-center p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">6</span>
                <div>
                  <p class="font-semibold text-gray-900">Implementation Plan</p>
                  <p class="text-sm text-gray-500">How and when?</p>
                </div>
              </div>
              <div class="flex items-center p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">7</span>
                <div>
                  <p class="font-semibold text-gray-900">Follow-up</p>
                  <p class="text-sm text-gray-500">What were the results?</p>
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">The <span class="font-semibold text-orange-700">5 Whys</span> is a simple but powerful technique for getting to the root cause of a problem by asking "Why?" repeatedly.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">🔍</span> EXAMPLE: 5 WHYS IN ACTION
              </h4>
            </div>
            <div class="p-6">
              <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-rose-600 p-4 text-white mb-4 shadow-lg">
                <div class="absolute right-2 top-2 text-4xl opacity-20">❌</div>
                <p class="font-bold text-lg">Problem: Customer received wrong order</p>
              </div>

              <div class="space-y-2 mb-4 pl-4 border-l-2 border-orange-300">
                <div class="flex items-start gap-2 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <span class="font-bold text-orange-600 whitespace-nowrap">Why 1:</span>
                  <span class="text-gray-700">Packer selected wrong item</span>
                </div>
                <div class="flex items-start gap-2 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <span class="font-bold text-orange-600 whitespace-nowrap">Why 2:</span>
                  <span class="text-gray-700">Barcode scanner wasn't working</span>
                </div>
                <div class="flex items-start gap-2 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <span class="font-bold text-orange-600 whitespace-nowrap">Why 3:</span>
                  <span class="text-gray-700">Battery was dead</span>
                </div>
                <div class="flex items-start gap-2 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <span class="font-bold text-orange-600 whitespace-nowrap">Why 4:</span>
                  <span class="text-gray-700">No charging schedule exists</span>
                </div>
                <div class="flex items-start gap-2 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                  <span class="font-bold text-orange-600 whitespace-nowrap">Why 5:</span>
                  <span class="text-gray-700">Process wasn't designed with equipment maintenance</span>
                </div>
              </div>

              <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white shadow-lg">
                <div class="absolute right-2 top-2 text-4xl opacity-20">✅</div>
                <p class="text-emerald-100 text-sm font-medium">ROOT CAUSE IDENTIFIED</p>
                <p class="font-bold text-lg">No equipment maintenance process</p>
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
        <div class="space-y-6">
          <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl text-white shadow-lg">
            <span class="text-4xl">⏱️</span>
            <div>
              <p class="text-2xl font-bold">1 hour 50 minutes</p>
              <p class="text-cyan-100">Total learning time</p>
            </div>
          </div>

          <p class="text-gray-700 leading-relaxed">Learn about the A3 and 5 Whys through role-play videos and real-world case studies.</p>
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
      videoUrl: 'https://www.youtube.com/watch?v=rJ5qI7ox3mw',
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
      audioUrl: '/audio/Hot Dog Plant.wav',
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
    },
    {
      id: 'activity-02-quiz',
      title: 'Module 2 Knowledge Check',
      type: 'quiz',
      duration: '5',
      description: 'Test your understanding of the problem solving tools covered in this module.',
      questions: [
        {
          id: 'q-02-01',
          question: 'Why is an A3 divided into left- and right-hand sides?',
          options: [
            'To provide an aesthetically pleasing visual format',
            'To organize problem-solving thinking into two sections',
            'To emphasize that 50% of our time should be spent on understanding the problem',
            'To emphasize that most of our time should be spent on solving the problem'
          ],
          correctAnswer: 3,
          explanation: 'The A3 is divided to emphasize that most of our time should be spent on understanding the problem (left side) before moving to solutions (right side).'
        },
        {
          id: 'q-02-02',
          question: 'What is the goal of the left-hand side of the A3?',
          options: [
            'Generate solutions',
            'Understand the problem',
            'Solve the problem'
          ],
          correctAnswer: 1,
          explanation: 'The left-hand side of the A3 focuses on understanding the problem thoroughly before jumping to solutions.'
        },
        {
          id: 'q-02-03',
          question: 'How might we write a hypothesis?',
          options: [
            'Use the 5 Whys framework',
            'Use the problem-solution-outcome framework',
            'Use the 3C\'s Model (Company, Customer, Competitor)',
            'If X, then Y'
          ],
          correctAnswer: 3,
          explanation: 'A hypothesis is written in the "If X, then Y" format, stating a prediction that can be tested.'
        },
        {
          id: 'q-02-04',
          question: 'What might we plot on a 2x2 matrix to help us prioritize problems to solve?',
          options: [
            'Ease & Expected Cost',
            'Incremental Revenue & Expected Cost',
            'Ease & Impact'
          ],
          correctAnswer: 2,
          explanation: 'An Ease vs Impact matrix helps prioritize problems by considering how easy they are to solve and what impact the solution will have.'
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">Understanding waste is fundamental to improvement. The <span class="font-semibold text-red-600">7 types of waste</span> help us identify opportunities for improvement in any process.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">🗑️</span> THE 7 WASTES (TIMWOOD)
              </h4>
            </div>
            <div class="p-4 space-y-2">
              <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-red-50 to-transparent border-l-4 border-red-400 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center font-black text-lg mr-4 shadow">T</span>
                <div><span class="font-bold text-gray-900">Transportation</span><span class="text-gray-600"> — Unnecessary movement of materials</span></div>
              </div>
              <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-orange-50 to-transparent border-l-4 border-orange-400 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg flex items-center justify-center font-black text-lg mr-4 shadow">I</span>
                <div><span class="font-bold text-gray-900">Inventory</span><span class="text-gray-600"> — Excess products/materials</span></div>
              </div>
              <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-amber-400 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg flex items-center justify-center font-black text-lg mr-4 shadow">M</span>
                <div><span class="font-bold text-gray-900">Motion</span><span class="text-gray-600"> — Unnecessary movement of people</span></div>
              </div>
              <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-transparent border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg flex items-center justify-center font-black text-lg mr-4 shadow">W</span>
                <div><span class="font-bold text-gray-900">Waiting</span><span class="text-gray-600"> — Idle time</span></div>
              </div>
              <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-lime-50 to-transparent border-l-4 border-lime-500 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-lime-500 to-lime-600 text-white rounded-lg flex items-center justify-center font-black text-lg mr-4 shadow">O</span>
                <div><span class="font-bold text-gray-900">Overproduction</span><span class="text-gray-600"> — Making more than needed</span></div>
              </div>
              <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-teal-50 to-transparent border-l-4 border-teal-400 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-lg flex items-center justify-center font-black text-lg mr-4 shadow">O</span>
                <div><span class="font-bold text-gray-900">Overprocessing</span><span class="text-gray-600"> — Doing more than required</span></div>
              </div>
              <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-rose-50 to-transparent border-l-4 border-rose-400 hover:shadow-md transition-shadow">
                <span class="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-lg flex items-center justify-center font-black text-lg mr-4 shadow">D</span>
                <div><span class="font-bold text-gray-900">Defects</span><span class="text-gray-600"> — Errors requiring rework</span></div>
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">Not all activity is valuable. Learn to distinguish between <span class="font-semibold text-emerald-600">work that creates value</span> and <span class="font-semibold text-red-600">waste that doesn't</span>.</p>

          <div class="grid grid-cols-2 gap-4">
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-white shadow-xl">
              <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-3xl">✅</span>
                  <h5 class="font-bold text-xl">Value-Added</h5>
                </div>
                <ul class="space-y-2 text-emerald-50">
                  <li class="flex items-start gap-2"><span>•</span> Transforms the product/service</li>
                  <li class="flex items-start gap-2"><span>•</span> Customer willing to pay for it</li>
                  <li class="flex items-start gap-2"><span>•</span> Done right the first time</li>
                </ul>
              </div>
            </div>
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-6 text-white shadow-xl">
              <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-3xl">❌</span>
                  <h5 class="font-bold text-xl">Non-Value (Waste)</h5>
                </div>
                <ul class="space-y-2 text-rose-50">
                  <li class="flex items-start gap-2"><span>•</span> Doesn't transform product</li>
                  <li class="flex items-start gap-2"><span>•</span> Customer won't pay for it</li>
                  <li class="flex items-start gap-2"><span>•</span> Can be eliminated</li>
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
      title: 'Work vs Waste',
      type: 'video',
      duration: '5',
      description: 'Learn to distinguish between value-added work and waste in any process. Understanding this difference is fundamental to improvement.',
      videoUrl: 'https://www.youtube.com/watch?v=0G515SOjhJA',
      thumbnailUrl: '/images/work-vs-waste.jpg',
      discussionQuestions: [
        {
          id: 'dq-03-01-01',
          question: 'How would you define value-added work in your role? What activities do you perform that customers would be willing to pay for?',
          order: 1
        },
        {
          id: 'dq-03-01-02',
          question: 'Think about your typical workday. What percentage of your time is spent on value-added vs non-value-added activities?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-03-02',
      title: 'Service Physics 101 with Steve',
      type: 'video',
      duration: '18',
      description: 'Listen to Steve explain the fundamentals of identifying waste in service operations.',
      videoUrl: 'https://www.youtube.com/watch?v=0G515SOjhJA',
      discussionQuestions: [
        {
          id: 'dq-03-02-01',
          question: 'What types of waste are most common in service operations? How do they differ from manufacturing waste?',
          order: 1
        }
      ]
    },
    {
      id: 'activity-03-03',
      title: 'Burger Assembly: Spotting the 7 Wastes',
      type: 'video',
      duration: '1',
      description: 'Watch this short video identifying the 7 wastes in a burger assembly operation. Can you spot all the waste?',
      videoUrl: 'https://www.youtube.com/watch?v=q6-6-X9i9wM',
      thumbnailUrl: '/images/burger-waste.jpg',
      discussionQuestions: [
        {
          id: 'dq-03-03-01',
          question: 'Which types of waste did you identify in the burger assembly? What surprised you most?',
          order: 1
        },
        {
          id: 'dq-03-03-02',
          question: 'How might these wastes compound and create additional problems in the operation?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-03-04',
      title: 'MOD Pizza Case Study',
      type: 'reading',
      duration: '15',
      description: 'This article outlines a case study done on the problem solving improvement work Service Physics completed at MOD Pizza.',
      externalUrl: 'https://www.moresteam.com/resources/case-studies/pizza-process-challenges',
      thumbnailUrl: '/images/mod-pizza.jpg',
      discussionQuestions: [
        {
          id: 'dq-03-04-01',
          question: 'What was the original problem that MOD thought they had? And what type of problem was it?',
          order: 1
        },
        {
          id: 'dq-03-04-02',
          question: 'How did "going to see" present the actual problem?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-03-05',
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
          id: 'dq-03-05-01',
          question: 'What did your spaghetti diagram reveal about the process? Where were the biggest opportunities for improvement?',
          order: 1
        }
      ]
    },
    {
      id: 'activity-03-quiz',
      title: 'Module 3 Knowledge Check',
      type: 'quiz',
      duration: '5',
      description: 'Test your understanding of identifying problems and waste.',
      questions: [
        {
          id: 'q-03-01',
          question: 'Why is it important to go to the field (gemba)?',
          options: [
            'To personally observe the actual process',
            'To rely on reports and data provided by a third party',
            'To grasp the current condition',
            'To supervise employees more closely to ensure they are adhering to standard operating procedures (SOPs)',
            'All of the above',
            'A & C',
            'A & C & D'
          ],
          correctAnswer: 5,
          explanation: 'Going to gemba is important to personally observe the actual process and grasp the current condition firsthand.'
        },
        {
          id: 'q-03-02',
          question: 'How would we classify labor spend as a key performance indicator?',
          options: [
            'Lagging Indicator',
            'Leading Indicator'
          ],
          correctAnswer: 0,
          explanation: 'Labor spend is a lagging indicator because it measures outcomes that have already occurred.'
        },
        {
          id: 'q-03-03',
          question: 'What is the difference between waste and cost?',
          options: [
            'Waste represents non-value-adding activities, while costs (resources) are incurred for both value-adding and non-value-adding activities',
            'Waste includes only material losses while cost covers all business expenses',
            'Cost is always higher than waste in any process',
            'Waste and cost are the same because both involve spending money',
            'B & C'
          ],
          correctAnswer: 0,
          explanation: 'Waste represents non-value-adding activities, while costs are incurred for both value-adding and non-value-adding activities.'
        },
        {
          id: 'q-03-04',
          question: 'Why is overproduction referred to as the "mother of all wastes"?',
          options: [
            'It is the most expensive type of waste across industry',
            'It leads to, amplifies, and can hide other types of waste, such as excess inventory, transportation, and defects',
            'It is the only type of waste that directly impacts customer satisfaction',
            'It focuses exclusively on producing too many defective products'
          ],
          correctAnswer: 1,
          explanation: 'Overproduction leads to and can hide other types of waste like excess inventory, transportation, and defects.'
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
  timeEstimateMinutes: 40,
  order: 4,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-04-overview-01',
      columnType: 'overview',
      sectionTitle: 'The Gap: Current vs Target',
      contentHtml: `
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">A well-defined problem clearly articulates the <span class="font-semibold text-indigo-600">gap</span> between the current condition and the target condition.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">🎯</span> THE PROBLEM DEFINITION GAP
              </h4>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between gap-4">
                <div class="flex-1 relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-5 text-white shadow-lg">
                  <div class="absolute top-0 right-0 text-6xl opacity-10">📍</div>
                  <p class="font-bold text-lg">Current Condition</p>
                  <p class="text-red-100 text-sm mt-1">What's happening now</p>
                </div>
                <div class="flex flex-col items-center px-2">
                  <div class="text-4xl animate-pulse">➡️</div>
                  <span class="text-xs text-gray-500 font-bold mt-1">THE GAP</span>
                </div>
                <div class="flex-1 relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 p-5 text-white shadow-lg">
                  <div class="absolute top-0 right-0 text-6xl opacity-10">🏆</div>
                  <p class="font-bold text-lg">Target Condition</p>
                  <p class="text-emerald-100 text-sm mt-1">What we want to achieve</p>
                </div>
              </div>
              <div class="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl text-center border-2 border-dashed border-indigo-300">
                <p class="font-black text-xl text-indigo-800">THE GAP = THE PROBLEM</p>
              </div>
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">A good problem statement is <span class="font-semibold text-blue-600">specific</span>, <span class="font-semibold text-blue-600">measurable</span>, and focuses on the gap rather than the solution.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">📝</span> PROBLEM STATEMENT FORMAT
              </h4>
            </div>
            <div class="p-6">
              <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200 mb-4">
                <p class="font-mono text-sm text-blue-900 leading-relaxed">[Process/Area] is experiencing <span class="bg-blue-200 px-1 rounded">[Current Condition with data]</span>, which is <span class="bg-blue-200 px-1 rounded">[X%]</span> away from <span class="bg-blue-200 px-1 rounded">[Target Condition with data]</span>, causing <span class="bg-blue-200 px-1 rounded">[Impact]</span>.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p class="font-bold text-sm text-gray-700 mb-2 flex items-center"><span class="mr-2">💡</span> Example:</p>
                <p class="text-sm text-gray-600 italic leading-relaxed">The customer service team is experiencing an average response time of 48 hours, which is 300% away from our target of 12 hours, causing decreased customer satisfaction scores and increased complaints.</p>
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
        <div class="space-y-6">
          <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
            <span class="text-4xl">⏱️</span>
            <div>
              <p class="text-2xl font-bold">40 minutes</p>
              <p class="text-indigo-100">Total learning time</p>
            </div>
          </div>

          <p class="text-gray-700 leading-relaxed">Learn to write clear, actionable problem statements through examples and practice.</p>
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
        <div class="space-y-6">
          <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-6 text-white shadow-xl">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div class="flex items-start gap-4 relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-3xl">🎓</span>
              </div>
              <div>
                <h4 class="font-bold text-xl mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-blue-100">Write a problem statement for a real issue you're facing and be ready to refine it with your coach.</p>
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
      videoUrl: 'https://www.youtube.com/watch?v=WlTgg4s1sSg',
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
      title: 'Problem Statement Practice: Panda Express Service Delays',
      type: 'video',
      duration: '20',
      description: 'Practice writing a problem statement by observing and analyzing real service delays at Panda Express.',
      videoUrl: 'https://www.youtube.com/watch?v=7WGZ9Pi1YnM',
      thumbnailUrl: '/images/panda-problem-statement.jpg',
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
            <h3 class="text-xl font-bold text-gray-900 mb-4">📋 How to Complete This Activity</h3>

            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 class="font-semibold text-gray-900">Observe the Work</h4>
                  <p class="text-gray-700">Imagine you are observing the work at Panda Express where customers are ordering their dishes as they go down the line. You are following the customer in the gray shirt, noting their time in queue. We are trying to understand what is getting in the way of delivering a consistent and timely experience for the customers with no unnecessary waiting.</p>
                  <p class="text-gray-600 mt-2 italic">Panda Express has a goal of a <strong>3-minute customer service time</strong>. We are watching to see if that plan is in action.</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 class="font-semibold text-gray-900">Review the Time Study Data</h4>
                  <p class="text-gray-700">Review the time study data taken during these observations that capture the current condition.</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 class="font-semibold text-gray-900">Practice Writing a Problem Statement</h4>
                  <p class="text-gray-700">Practice writing a problem statement with the current state observed and potential target.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4 rounded-r-xl">
            <h4 class="font-bold text-blue-900">Problem Statement Template:</h4>
            <p class="font-mono text-sm text-blue-800 mt-2">[Process/Area] is experiencing [Current Condition with data], which is [X%] away from [Target Condition with data], causing [Impact].</p>
          </div>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded-r-xl">
            <h4 class="font-bold text-yellow-900">Checklist - Good problem statements are:</h4>
            <ul class="mt-2 space-y-1 text-yellow-800">
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
          question: 'Based on the observations, what is the gap between the current condition and the target of 3-minute service time?',
          order: 1
        },
        {
          id: 'dq-04-03-02',
          question: 'What problem statement would you write based on the data observed? Remember to include current condition, target, and impact.',
          order: 2
        },
        {
          id: 'dq-04-03-03',
          question: 'Share your problem statement. Does it clearly describe the gap? Is it measurable? Does it focus on the problem rather than a solution?',
          order: 3
        }
      ]
    },
    {
      id: 'activity-04-quiz',
      title: 'Module 4 Knowledge Check',
      type: 'quiz',
      duration: '5',
      description: 'Test your understanding of defining problems.',
      questions: [
        {
          id: 'q-04-01',
          question: 'What is a problem?',
          options: [
            'A headache',
            'A gap',
            'An unsolvable dilemma',
            'A change to be solution-oriented',
            'Something that requires escalation to my boss'
          ],
          correctAnswer: 1,
          explanation: 'A problem is defined as a gap between the current condition and the desired/target condition.'
        },
        {
          id: 'q-04-02',
          question: 'Reflect on this statement: "There isn\'t enough space in the store to add the third point of sale terminal." Is this a well-defined problem?',
          options: [
            'This is not a problem statement because it outlines a lack of something rather than a gap',
            'This is a good problem statement because it identifies the root cause'
          ],
          correctAnswer: 0,
          explanation: 'This is not a well-defined problem statement because it describes a lack of something rather than identifying a measurable gap between current and target conditions.'
        },
        {
          id: 'q-04-03',
          question: 'Reflect on this statement: "We have trouble finding and hiring good people." Is this a well-defined problem?',
          options: [
            'This is a good problem statement',
            'This is not a problem statement because it is vague, general, and non-specific',
            'This is not a problem statement because it does not identify the root cause or indicate an understanding of the work',
            'B & C'
          ],
          correctAnswer: 3,
          explanation: 'This statement is vague, non-specific, and doesn\'t identify root cause or demonstrate understanding of the work process.'
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">Experiments are how we learn and improve. An <span class="font-semibold text-emerald-600">experiment plan</span> helps us test our ideas systematically.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">🧪</span> EXPERIMENT PLAN STRUCTURE
              </h4>
            </div>
            <div class="p-6 space-y-3">
              <div class="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-transparent rounded-xl border-l-4 border-emerald-400 hover:shadow-md transition-shadow">
                <span class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg">1</span>
                <div>
                  <p class="font-bold text-gray-900">What do we expect?</p>
                  <p class="text-sm text-emerald-600">Hypothesis — What we think will happen</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl border-l-4 border-green-400 hover:shadow-md transition-shadow">
                <span class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg">2</span>
                <div>
                  <p class="font-bold text-gray-900">What will we try?</p>
                  <p class="text-sm text-green-600">Test — The specific change we'll make</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-teal-50 to-transparent rounded-xl border-l-4 border-teal-400 hover:shadow-md transition-shadow">
                <span class="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg">3</span>
                <div>
                  <p class="font-bold text-gray-900">How will we know?</p>
                  <p class="text-sm text-teal-600">Measure — How we'll collect data</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-cyan-50 to-transparent rounded-xl border-l-4 border-cyan-400 hover:shadow-md transition-shadow">
                <span class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg">4</span>
                <div>
                  <p class="font-bold text-gray-900">What did we learn?</p>
                  <p class="text-sm text-cyan-600">Results — What actually happened</p>
                </div>
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed"><span class="font-semibold text-lime-600">Point Kaizen</span> are small, rapid experiments that can be completed quickly to test ideas and learn.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-lime-500 to-green-500 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">⚡</span> CHARACTERISTICS OF POINT KAIZEN
              </h4>
            </div>
            <div class="p-6 grid grid-cols-2 gap-4">
              <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-lime-100 to-lime-50 p-4 border-2 border-lime-200 hover:border-lime-400 transition-colors">
                <div class="text-3xl mb-2">🚀</div>
                <p class="font-bold text-gray-900">Quick</p>
                <p class="text-sm text-gray-600">Completed in days or weeks</p>
              </div>
              <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-green-50 p-4 border-2 border-green-200 hover:border-green-400 transition-colors">
                <div class="text-3xl mb-2">🎯</div>
                <p class="font-bold text-gray-900">Focused</p>
                <p class="text-sm text-gray-600">Targets a specific problem</p>
              </div>
              <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 p-4 border-2 border-emerald-200 hover:border-emerald-400 transition-colors">
                <div class="text-3xl mb-2">💰</div>
                <p class="font-bold text-gray-900">Low-cost</p>
                <p class="text-sm text-gray-600">Minimal resources required</p>
              </div>
              <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 p-4 border-2 border-teal-200 hover:border-teal-400 transition-colors">
                <div class="text-3xl mb-2">📊</div>
                <p class="font-bold text-gray-900">Measurable</p>
                <p class="text-sm text-gray-600">Clear before/after data</p>
              </div>
            </div>
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
        <div class="space-y-6">
          <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white shadow-lg">
            <span class="text-4xl">⏱️</span>
            <div>
              <p class="text-2xl font-bold">45 minutes</p>
              <p class="text-emerald-100">Total learning time</p>
            </div>
          </div>

          <p class="text-gray-700 leading-relaxed">Learn how to design and run effective experiments through real-world examples.</p>
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
        <div class="space-y-6">
          <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 p-6 text-white shadow-xl">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div class="flex items-start gap-4 relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-3xl">🎓</span>
              </div>
              <div>
                <h4 class="font-bold text-xl mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-emerald-100">Design a simple experiment you can run in your work environment and discuss it with your coach.</p>
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
          question: 'What were the perceived problems and lagging indicators that Panda Express initially presented with their drive thru operation?',
          order: 1
        },
        {
          id: 'dq-05-02-02',
          question: 'What were the leading indicators we uncovered while grasping the situation?',
          order: 2
        },
        {
          id: 'dq-05-02-03',
          question: 'How did the target condition change as the understanding of the work changed?',
          order: 3
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
    },
    {
      id: 'activity-05-quiz',
      title: 'Module 5 Knowledge Check',
      type: 'quiz',
      duration: '5',
      description: 'Test your understanding of experimentation and learning.',
      questions: [
        {
          id: 'q-05-01',
          question: 'A client team is designing an experiment to evaluate a new work distribution model. Which of the following would be the strongest indicator that their experiment is well-planned?',
          options: [
            'The experiment only includes experienced employees to ensure smooth execution',
            'The team has predefined KPIs, timeframes, roles, controllable factors, and a plan to document uncontrollable variables',
            'The team focuses on flexibility and allows conditions to change naturally',
            'They plan to measure based on subjective feedback rather than structured data collection'
          ],
          correctAnswer: 1,
          explanation: 'A well-planned experiment has predefined KPIs, timeframes, roles, controllable factors, and a plan to document uncontrollable variables.'
        },
        {
          id: 'q-05-02',
          question: 'Point Kaizen relies on iterative testing through the PDCA cycle. What is the key reason for conducting as many loops through PDCA as possible during a Point Kaizen experiment?',
          options: [
            'To minimize the duration of the experiment and reduce costs',
            'To create complexity in the process and test multiple variables at once',
            'To refine and validate hypotheses through continuous learning and improvement',
            'To scale process improvements as quickly as possible across the organization'
          ],
          correctAnswer: 2,
          explanation: 'Multiple PDCA loops allow you to refine and validate hypotheses through continuous learning and improvement.'
        },
        {
          id: 'q-05-03',
          question: 'In the context of process improvement, how can questioning every detail of the current process lead to better results than simply observing the process?',
          options: [
            'Questioning every detail forces a deeper understanding of the underlying assumptions and inefficiencies',
            'Questioning eliminates the need for data collection, making the process faster',
            'Observing the process typically results in identifying inefficiencies without needing to ask questions',
            'Questioning each detail only complicates the process and leads to analysis paralysis'
          ],
          correctAnswer: 0,
          explanation: 'Questioning every detail forces a deeper understanding of underlying assumptions and inefficiencies that may not be visible through observation alone.'
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">Measuring and reviewing results helps us <span class="font-semibold text-amber-600">learn from our experiments</span> and decide on next steps.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">📊</span> RESULTS REVIEW QUESTIONS
              </h4>
            </div>
            <div class="p-6 space-y-3">
              <div class="flex items-center p-4 bg-gradient-to-r from-amber-50 to-transparent rounded-xl border-l-4 border-amber-400 hover:shadow-md transition-shadow">
                <span class="text-3xl mr-4">🎯</span>
                <div>
                  <p class="font-bold text-gray-900">Did we achieve our target?</p>
                  <p class="text-sm text-amber-600">Compare results to hypothesis</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border-l-4 border-orange-400 hover:shadow-md transition-shadow">
                <span class="text-3xl mr-4">💡</span>
                <div>
                  <p class="font-bold text-gray-900">What did we learn?</p>
                  <p class="text-sm text-orange-600">Insights from the data</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-transparent rounded-xl border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
                <span class="text-3xl mr-4">😮</span>
                <div>
                  <p class="font-bold text-gray-900">What surprised us?</p>
                  <p class="text-sm text-yellow-600">Unexpected findings</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-lime-50 to-transparent rounded-xl border-l-4 border-lime-400 hover:shadow-md transition-shadow">
                <span class="text-3xl mr-4">🔄</span>
                <div>
                  <p class="font-bold text-gray-900">What's our next experiment?</p>
                  <p class="text-sm text-lime-600">How do we build on what we learned?</p>
                </div>
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">Effective measurement includes both <span class="font-semibold text-blue-600">quantitative data</span> and <span class="font-semibold text-green-600">qualitative feedback</span> from people affected by the change.</p>

          <div class="grid grid-cols-2 gap-4">
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-xl">
              <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-3xl">📈</span>
                  <h5 class="font-bold text-xl">Quantitative</h5>
                </div>
                <ul class="space-y-2 text-blue-100">
                  <li class="flex items-start gap-2"><span>•</span> Numbers & metrics</li>
                  <li class="flex items-start gap-2"><span>•</span> Time studies</li>
                  <li class="flex items-start gap-2"><span>•</span> Error rates</li>
                  <li class="flex items-start gap-2"><span>•</span> Satisfaction scores</li>
                </ul>
              </div>
            </div>
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl">
              <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-3xl">💬</span>
                  <h5 class="font-bold text-xl">Qualitative</h5>
                </div>
                <ul class="space-y-2 text-green-100">
                  <li class="flex items-start gap-2"><span>•</span> Observations</li>
                  <li class="flex items-start gap-2"><span>•</span> Interviews</li>
                  <li class="flex items-start gap-2"><span>•</span> Open-ended surveys</li>
                  <li class="flex items-start gap-2"><span>•</span> Team discussions</li>
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
        <div class="space-y-6">
          <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white shadow-lg">
            <span class="text-4xl">⏱️</span>
            <div>
              <p class="text-2xl font-bold">45 minutes</p>
              <p class="text-amber-100">Total learning time</p>
            </div>
          </div>

          <p class="text-gray-700 leading-relaxed">Learn how to effectively measure results and gather meaningful feedback.</p>
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
        <div class="space-y-6">
          <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-xl">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div class="flex items-start gap-4 relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-3xl">🎓</span>
              </div>
              <div>
                <h4 class="font-bold text-xl mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-amber-100">Think about how you currently measure success in your work and what you might be missing.</p>
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
      title: 'How to Talk to Humans',
      type: 'reading',
      duration: '20',
      description: 'Read this excerpt from the book How to Talk to Humans for a deeper dive on asking the right questions before and during experiments to capture the stories that will make the work better.',
      externalUrl: '/pdfs/Talking-to-Humans-Excerpt.pdf',
      thumbnailUrl: '/images/talking-to-humans.jpg',
      discussionQuestions: [
        {
          id: 'dq-06-02-01',
          question: 'Why is it more effective to ask experiment participants to share stories about past behavior rather than speculate on future actions?',
          order: 1
        },
        {
          id: 'dq-06-02-02',
          question: 'What role does open-ended questioning play in uncovering unexpected insights, and how can interviewers ensure they are not leading the conversation?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-06-03',
      title: 'Gathering Feedback',
      type: 'reading',
      duration: '25',
      description: 'Learn effective techniques for gathering qualitative feedback through interviews and observations.',
      externalUrl: 'https://www.lean.org/the-lean-post/articles/go-and-see/',
      thumbnailUrl: '/images/go-and-see.jpg',
      discussionQuestions: [
        {
          id: 'dq-06-03-01',
          question: 'What are the key principles for conducting effective observations? How can you avoid bias?',
          order: 1
        },
        {
          id: 'dq-06-03-02',
          question: 'How can you balance quantitative metrics with qualitative feedback in your measurement approach?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-06-quiz',
      title: 'Module 6 Knowledge Check',
      type: 'quiz',
      duration: '5',
      description: 'Test your understanding of measurement and evaluation.',
      questions: [
        {
          id: 'q-06-01',
          question: 'In the Act phase of PDCA, how does documenting results with supporting metrics and observations influence decision-making?',
          options: [
            'It helps create decisions based on gut feelings and observations made during the experiment',
            'It ensures decisions are based on observable facts and insights derived from the data',
            'It limits the possibility of change by relying on pre-existing assumptions',
            'It focuses the decision-making process solely on KPIs without the distraction of qualitative factors'
          ],
          correctAnswer: 1,
          explanation: 'Documenting results with metrics ensures decisions are based on observable facts and insights derived from the data, not assumptions.'
        },
        {
          id: 'q-06-02',
          question: 'How does focusing on fact-based observations during the test help validate or iterate hypotheses more effectively?',
          options: [
            'It ensures the test is interpreted in a way that supports the original hypothesis',
            'It allows for a more emotional response to the outcomes of the test',
            'It helps identify the underlying reasons why a target was or wasn\'t achieved, leading to a clearer understanding of the experiment\'s results',
            'It encourages flexible interpretations of the data, enabling a broader range of conclusions'
          ],
          correctAnswer: 2,
          explanation: 'Fact-based observations help identify underlying reasons why targets were or weren\'t achieved, leading to clearer understanding.'
        },
        {
          id: 'q-06-03',
          question: 'How does asking open-ended questions of operators contribute to the process of iterative improvement in the Check phase?',
          options: [
            'They help uncover subjective feelings, which can distract from objective data collection',
            'They encourage operators to reflect on their experience, helping to understand the reality of their work rather than positive or negative preferences of the experiment',
            'They focus solely on personal satisfaction above just process efficiency',
            'They provide a more emotional and subjective view, which is useful for understanding personal preferences'
          ],
          correctAnswer: 1,
          explanation: 'Open-ended questions encourage operators to reflect on their experience, helping understand the reality of their work.'
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">Continuous improvement means repeating the <span class="font-semibold text-green-600">PDCA cycle</span> over and over, learning and improving with each iteration.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">🔄</span> CONTINUOUS IMPROVEMENT CYCLE
              </h4>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 gap-3">
                <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="absolute top-0 right-0 text-6xl font-black text-white/20">P</div>
                  <div class="relative z-10">
                    <div class="text-2xl font-black mb-1">PLAN</div>
                    <p class="text-blue-100 text-sm">Define & set targets</p>
                  </div>
                </div>
                <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="absolute top-0 right-0 text-6xl font-black text-white/20">D</div>
                  <div class="relative z-10">
                    <div class="text-2xl font-black mb-1">DO</div>
                    <p class="text-emerald-100 text-sm">Execute & experiment</p>
                  </div>
                </div>
                <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="absolute top-0 right-0 text-6xl font-black text-white/20">C</div>
                  <div class="relative z-10">
                    <div class="text-2xl font-black mb-1">CHECK</div>
                    <p class="text-amber-100 text-sm">Measure & analyze</p>
                  </div>
                </div>
                <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-500 to-red-600 p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div class="absolute top-0 right-0 text-6xl font-black text-white/20">A</div>
                  <div class="relative z-10">
                    <div class="text-2xl font-black mb-1">ACT</div>
                    <p class="text-rose-100 text-sm">Standardize or iterate</p>
                  </div>
                </div>
              </div>
              <div class="mt-4 p-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl text-center">
                <p class="text-gray-600 text-sm">Each cycle builds on learning from the previous one ♻️</p>
              </div>
            </div>
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
        <div class="space-y-6">
          <p class="text-lg text-gray-700 leading-relaxed">Sustainable improvement requires both <span class="font-semibold text-purple-600">technical changes</span> and <span class="font-semibold text-purple-600">behavioral changes</span> in how we work.</p>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-4">
              <h4 class="text-white font-bold text-lg flex items-center">
                <span class="text-2xl mr-2">🌳</span> ELEMENTS OF LASTING CHANGE
              </h4>
            </div>
            <div class="p-6 space-y-3">
              <div class="flex items-center p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                <span class="text-3xl mr-4">🔧</span>
                <div>
                  <p class="font-bold text-gray-900">Technical System</p>
                  <p class="text-sm text-blue-600">Tools, processes, and methods</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl border-l-4 border-green-500 hover:shadow-md transition-shadow">
                <span class="text-3xl mr-4">👥</span>
                <div>
                  <p class="font-bold text-gray-900">Social System</p>
                  <p class="text-sm text-green-600">People, relationships, and culture</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-amber-50 to-transparent rounded-xl border-l-4 border-amber-500 hover:shadow-md transition-shadow">
                <span class="text-3xl mr-4">📚</span>
                <div>
                  <p class="font-bold text-gray-900">Knowledge System</p>
                  <p class="text-sm text-amber-600">Training, coaching, and learning</p>
                </div>
              </div>
              <div class="flex items-center p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                <span class="text-3xl mr-4">🎯</span>
                <div>
                  <p class="font-bold text-gray-900">Management System</p>
                  <p class="text-sm text-purple-600">Metrics, reviews, and accountability</p>
                </div>
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
        <div class="space-y-6">
          <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white shadow-lg">
            <span class="text-4xl">⏱️</span>
            <div>
              <p class="text-2xl font-bold">35 minutes</p>
              <p class="text-green-100">Total learning time</p>
            </div>
          </div>

          <p class="text-gray-700 leading-relaxed">Learn what makes improvement sustainable and how to build a culture of continuous improvement.</p>
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
        <div class="space-y-6">
          <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 p-6 text-white shadow-xl">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div class="flex items-start gap-4 relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-3xl">🎓</span>
              </div>
              <div>
                <h4 class="font-bold text-xl mb-2">Prepare for Your Coaching Session</h4>
                <p class="text-green-100">Reflect on your improvement journey through this course and plan your next steps with your coach.</p>
              </div>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 p-6 shadow-xl">
            <div class="absolute top-2 right-4 text-6xl opacity-30">🏆</div>
            <div class="relative z-10">
              <h4 class="font-black text-2xl text-gray-900 mb-3">🎉 Congratulations!</h4>
              <p class="text-gray-800 mb-4">You've completed Problem Solving 101! You now have the foundations to:</p>
              <div class="grid grid-cols-1 gap-2">
                <div class="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                  <span class="text-green-600">✓</span>
                  <span class="text-sm text-gray-800">Identify and define problems systematically</span>
                </div>
                <div class="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                  <span class="text-green-600">✓</span>
                  <span class="text-sm text-gray-800">Use structured problem-solving tools</span>
                </div>
                <div class="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                  <span class="text-green-600">✓</span>
                  <span class="text-sm text-gray-800">Design and run improvement experiments</span>
                </div>
                <div class="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                  <span class="text-green-600">✓</span>
                  <span class="text-sm text-gray-800">Measure and evaluate results</span>
                </div>
                <div class="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                  <span class="text-green-600">✓</span>
                  <span class="text-sm text-gray-800">Build continuous improvement into your work</span>
                </div>
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
      id: 'activity-07-01',
      title: 'Formula 1 Pit Stops: The Art of Continuous Improvement',
      type: 'video',
      duration: '5',
      description: 'See how F1 teams use continuous improvement to shave milliseconds off pit stop times.',
      videoUrl: 'https://www.youtube.com/watch?v=3jrjBwm1Y68',
      thumbnailUrl: '/images/f1-pitstop.jpg',
      discussionQuestions: [
        {
          id: 'dq-07-01-01',
          question: 'What is the time difference between the 1950\'s pit stop and the 2013 pit stop? What type of improvements did you see that contributed to this difference?',
          order: 1
        },
        {
          id: 'dq-07-01-02',
          question: 'How does this improvement illustrate iterative problem solving and continuous improvement?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-07-02',
      title: 'The Failures Inside Boeing',
      type: 'audio',
      duration: '30',
      description: 'Listen to this Wall Street Journal podcast about what happens when continuous improvement culture breaks down inside Boeing\'s 737 factory.',
      externalUrl: 'https://www.wsj.com/podcasts/the-journal/the-failures-inside-boeing-737-factory/82e42092-0815-41f6-8543-144daea416df',
      thumbnailUrl: '/images/boeing-wsj.jpg',
      discussionQuestions: [
        {
          id: 'dq-07-02-01',
          question: 'What warning signs or early indicators of failure were ignored or overlooked before the crisis escalated?',
          order: 1
        },
        {
          id: 'dq-07-02-02',
          question: 'How does the situation at Boeing highlight the importance of a culture of continuous improvement?',
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
  totalActivities: 30, // 24 activities + 6 module quizzes across 7 modules
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
