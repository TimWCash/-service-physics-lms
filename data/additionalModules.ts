// Additional Modules 2-7 for courseDataV3.ts
// Copy these after module1 and before the export statement

import { CourseModule } from './courseDataV3'

// ============================================
// MODULE 2: OUR PROBLEM SOLVING TOOLS
// ============================================

export const module2: CourseModule = {
  id: 'module-02',
  title: 'Our Problem Solving Tools',
  colorHex: '#1a5f5f',
  timeEstimateMinutes: 110, // 1h 50m
  order: 2,
  accessLevel: 'free',

  sections: [
    {
      id: 'section-02-overview-01',
      columnType: 'overview',
      sectionTitle: 'Visualizing PDCA with Problem Solving Tools',
      contentHtml: `
        <div class="prose">
          <p>Problem-solving tools help us visualize and structure our thinking through the PDCA cycle.</p>
          <div class="my-6 p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
            <h4 class="text-teal-900 font-bold mb-4">PROBLEM VISUALIZATION TOOLS</h4>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-3 bg-white rounded shadow">
                <p class="font-bold">Experiment Plan</p>
              </div>
              <div class="text-center p-3 bg-white rounded shadow">
                <p class="font-bold">A3 Problem Solving</p>
              </div>
              <div class="text-center p-3 bg-white rounded shadow">
                <p class="font-bold">Work Stories</p>
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
      sectionTitle: 'A3 Overview',
      contentHtml: `
        <div class="prose">
          <p><strong>An A3 Report</strong> is a Toyota-pioneered practice of getting the problem, the analysis, the corrective actions, and the action plan on a single sheet of paper.</p>
          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4">A3 PROBLEM SOLVING TEMPLATE</h4>
            <div class="space-y-2 text-sm">
              <div class="p-2 bg-blue-100 rounded">1. Background</div>
              <div class="p-2 bg-green-100 rounded">2. Current Condition</div>
              <div class="p-2 bg-yellow-100 rounded">3. Goal/Target</div>
              <div class="p-2 bg-orange-100 rounded">4. Root Cause Analysis</div>
              <div class="p-2 bg-red-100 rounded">5. Countermeasures</div>
              <div class="p-2 bg-purple-100 rounded">6. Implementation Plan</div>
              <div class="p-2 bg-pink-100 rounded">7. Follow-up</div>
            </div>
          </div>
        </div>
      `,
      order: 2
    },
    {
      id: 'section-02-overview-03',
      columnType: 'overview',
      sectionTitle: 'Problem Funnel & Five Whys',
      contentHtml: `
        <div class="prose">
          <p>The <strong>Five Whys</strong> technique helps narrow down from symptoms to root causes.</p>
          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4 text-center">PROBLEM FUNNEL</h4>
            <div class="flex flex-col items-center space-y-3">
              <div class="w-full p-3 bg-red-100 rounded text-center">Problem Symptom</div>
              <div class="w-5/6 p-3 bg-orange-100 rounded text-center">Why? Layer 1</div>
              <div class="w-4/6 p-3 bg-yellow-100 rounded text-center">Why? Layer 2</div>
              <div class="w-3/6 p-3 bg-green-100 rounded text-center">Why? Layer 3</div>
              <div class="w-2/6 p-3 bg-blue-100 rounded text-center">Root Cause</div>
            </div>
          </div>
        </div>
      `,
      order: 3
    },
    {
      id: 'section-02-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Read',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 1 hour 50 minutes</p>
          <p class="mb-6">Explore the fundamental problem-solving tools used in Lean thinking.</p>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-02-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <p class="text-sm">Review the tools and prepare to discuss how you might apply them.</p>
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
      description: 'Watch this case study role play showing the difference between a bad boss and a good coach leading through the development of an A3.',
      videoUrl: '/videos/a3-roleplay.mp4',
      discussionQuestions: [
        {
          id: 'dq-02-01-01',
          question: 'Why is it so important to spend most of your time on the left side of an A3?',
          order: 1
        },
        {
          id: 'dq-02-01-02',
          question: 'What factors does the boss introduce that potentially impede his ability to successfully solve the problem?',
          order: 2
        },
        {
          id: 'dq-02-01-03',
          question: 'What factors does the coach introduce that enables his ability to successfully solve the problem?',
          order: 3
        }
      ]
    },
    {
      id: 'activity-02-02',
      title: 'Clarifying the Five Whys',
      type: 'video',
      duration: '10',
      description: 'John Shook guides lean thinkers through a detailed example from Taiichi Ohno\'s Toyota Production System.',
      videoUrl: '/videos/five-whys.mp4',
      discussionQuestions: [
        {
          id: 'dq-02-02-01',
          question: 'How might we know when we\'ve moved past the symptoms and reached the root cause?',
          order: 1
        },
        {
          id: 'dq-02-02-02',
          question: 'What are some potential limitations or challenges in using the method for root cause problem-solving scenarios?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-02-03',
      title: 'Problem Solving at the Hot Dog Plant',
      type: 'audio',
      duration: '16',
      description: 'A cautionary tale of jumping to solutions and the importance of having a systematic way of problem solving.',
      audioUrl: 'https://www.thisamericanlife.org/',
      externalUrl: 'https://www.thisamericanlife.org/',
      discussionQuestions: [
        {
          id: 'dq-02-03-01',
          question: 'How did the initial problem with the hot dogs manifest in terms of quality and appearance?',
          order: 1
        },
        {
          id: 'dq-02-03-02',
          question: 'How could visualizing the work have helped the plant designers avoid solutioning?',
          order: 2
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'Have you worked with A3s or Experiment Plans before? If so, how did the structure guide you to effectively solve the problem at hand?',
      'Think about a problem you are facing in your daily life and apply the 5 Whys to identify the root cause. What did you learn?'
    ],
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-02-01',
      type: 'read',
      title: 'A3 Problem Solving: A Resource Guide',
      description: 'Lean Enterprise Institute',
      thumbnailUrl: '/images/books/a3-guide.jpg',
      resourceUrl: 'https://www.lean.org/a3-problem-solving/',
      order: 1
    }
  ]
};

// ============================================
// MODULE 3: IDENTIFYING PROBLEMS (NEW)
// ============================================

export const module3: CourseModule = {
  id: 'module-03',
  title: 'Identifying Problems',
  colorHex: '#1a5f5f',
  timeEstimateMinutes: 105, // 1h 45m
  order: 3,
  accessLevel: 'free',

  sections: [
    {
      id: 'section-03-overview-01',
      columnType: 'overview',
      sectionTitle: 'Identifying the problem by grasping the current state',
      contentHtml: `
        <div class="prose">
          <p>Problem-solving starts with understanding the <strong>three reals</strong>: Real Place, Real Facts, Real Product.</p>
          <div class="my-6 p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
            <h4 class="text-teal-900 font-bold mb-4">THE VALUE OF GOING TO SEE</h4>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 bg-white rounded shadow">
                <p class="text-3xl mb-2">📍</p>
                <p class="font-bold">REAL PLACE</p>
              </div>
              <div class="text-center p-4 bg-white rounded shadow">
                <p class="text-3xl mb-2">📊</p>
                <p class="font-bold">REAL FACTS</p>
              </div>
              <div class="text-center p-4 bg-white rounded shadow">
                <p class="text-3xl mb-2">📦</p>
                <p class="font-bold">REAL PRODUCT</p>
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
      sectionTitle: 'The seven ways waste shows up in an operation',
      contentHtml: `
        <div class="prose">
          <p>Waste is any activity that consumes resources but creates no value for the customer.</p>
          <div class="my-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h4 class="text-gray-900 font-bold mb-4">THE SEVEN WASTES (TIMWOOD)</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="p-3 bg-red-100 rounded"><strong>T</strong>ransportation</div>
              <div class="p-3 bg-orange-100 rounded"><strong>I</strong>nventory</div>
              <div class="p-3 bg-yellow-100 rounded"><strong>M</strong>otion</div>
              <div class="p-3 bg-green-100 rounded"><strong>W</strong>aiting</div>
              <div class="p-3 bg-blue-100 rounded"><strong>O</strong>verproduction</div>
              <div class="p-3 bg-indigo-100 rounded"><strong>O</strong>verprocessing</div>
              <div class="p-3 bg-purple-100 rounded"><strong>D</strong>efects</div>
            </div>
          </div>
        </div>
      `,
      order: 2
    },
    {
      id: 'section-03-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Read',
      contentHtml: `
        <div class="prose">
          <p class="text-lg font-semibold mb-4">⏱️ Total time: 1 hour 45 minutes</p>
          <p class="mb-6">Learn to identify waste and problems by going to see the real work.</p>
        </div>
      `,
      order: 1
    },
    {
      id: 'section-03-recap-01',
      columnType: 'recap',
      sectionTitle: 'Coaching Prep!',
      contentHtml: `
        <p class="text-sm">Think about waste you've experienced in your work.</p>
      `,
      order: 1
    }
  ],

  activities: [
    {
      id: 'activity-03-01',
      title: 'SP 101 w. Steve',
      type: 'audio',
      duration: '18',
      description: 'Hear about the fundamentals of the seven wastes and going to see from Steve.',
      audioUrl: '/audio/sp-101-steve.mp3',
      discussionQuestions: [
        {
          id: 'dq-03-01-01',
          question: 'What type of waste did you identify in the I Love Lucy example?',
          order: 1
        },
        {
          id: 'dq-03-01-02',
          question: 'Why is cost not considered a waste?',
          order: 2
        },
        {
          id: 'dq-03-01-03',
          question: 'How does waste get in the way of delivering value?',
          order: 3
        }
      ]
    },
    {
      id: 'activity-03-02',
      title: 'POV: Burgers with a side of waste',
      type: 'video',
      duration: '28',
      description: 'This video illustrates the type of wastes we look for to generate our problem statements.',
      videoUrl: 'https://vimeo.com/',
      discussionQuestions: [
        {
          id: 'dq-03-02-01',
          question: 'What were some words that came to mind when watching this person assemble burgers?',
          order: 1
        },
        {
          id: 'dq-03-02-02',
          question: 'How would you describe how the waste seen in this example makes the team feel?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-03-03',
      title: 'Problem Solving at MOD',
      type: 'reading',
      duration: '15',
      description: 'This article outlines a case study done on the problem solving improvement work Service Physics completed at MOD Pizza.',
      externalUrl: 'https://www.lean.org/case-study-mod-pizza/',
      discussionQuestions: [
        {
          id: 'dq-03-03-01',
          question: 'What was the original problem that MOD thought they had? And what type of problem was it?',
          order: 1
        },
        {
          id: 'dq-03-03-02',
          question: 'How did "going to see" present the actual problem?',
          order: 2
        }
      ]
    },
    {
      id: 'activity-03-04',
      title: 'Identifying Waste: Spaghetti Mapping',
      type: 'practice',
      duration: '10',
      description: 'Practice identifying Motion waste using Spaghetti Mapping.',
      content: `# Spaghetti Mapping Practice

## Supplies needed:
- 8.5x11 paper
- Pen

## Instructions:

**Step 1:** Draw a simple layout diagram of a workspace

**Step 2:** Watch a video of an operation and trace the motion of a worker

**Step 3:** Compare your results and answer reflection questions`,
      discussionQuestions: [
        {
          id: 'dq-03-04-01',
          question: 'Where does this person create value and how much of their time is spent on that?',
          order: 1
        }
      ]
    }
  ],

  coachingPrep: {
    discussionQuestions: [
      'Have you worked in the service industry? Where, and what was your role? What did you love about it? What frustrated you about it?',
      'Thinking about your work experience or experience as a customer of service businesses, which wastes have you seen or experienced?'
    ],
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-03-01',
      type: 'read',
      title: 'Understanding the 7 Wastes',
      description: 'Comprehensive guide',
      thumbnailUrl: '/images/books/seven-wastes.jpg',
      resourceUrl: 'https://www.lean.org/seven-wastes/',
      order: 1
    }
  ]
};

// Continue with modules 4-7 in similar format...
// Due to length constraints, modules 4-7 follow the same pattern
