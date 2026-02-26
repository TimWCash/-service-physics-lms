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

// Interactive Practice Form Field Types
export interface PracticeFormField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'table' | 'upload' | 'timing-scale';
  label: string;
  placeholder?: string;
  options?: string[]; // For select fields
  columns?: TableColumn[]; // For table fields
  minRows?: number; // For table fields
  maxRows?: number; // For table fields
  scaleMin?: number; // For timing-scale
  scaleMax?: number; // For timing-scale
  scaleUnit?: string; // For timing-scale (e.g., 'sec')
  required?: boolean;
  helpText?: string;
}

export interface TableColumn {
  id: string;
  header: string;
  type: 'text' | 'number' | 'select';
  options?: string[]; // For select columns
  width?: string;
}

export interface PracticeSection {
  id: string;
  title: string;
  description?: string;
  fields: PracticeFormField[];
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
  practiceSections?: PracticeSection[]; // For interactive practice worksheets
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
  colorHex: '#1e4d5e', // Brand teal
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
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">Our problem-solving approach is built on the <strong>Improvement Kata</strong> — a four-step approach to scientific thinking.</p>
          <img src="/images/improvement-kata.png" alt="The Improvement Kata - A four-step approach to scientific thinking" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 1
    },
    {
      id: 'section-01-overview-02',
      columnType: 'overview',
      sectionTitle: 'Why Plan, Do, Check, Act',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">The <strong>PDCA cycle</strong> is the foundation of scientific problem-solving. It provides a structured approach to testing ideas and learning from results.</p>
          <img src="/images/pdca-problem-solving.png" alt="PDCA for Problem Solving - Plan, Do, Check, Act cycle" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 2
    },
    {
      id: 'section-01-overview-03',
      columnType: 'overview',
      sectionTitle: 'Using Cynefin to light the way',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">The <strong>Cynefin Framework</strong> helps us understand the nature of problems and choose appropriate responses. Problem solving moves us towards clarity, but not everything can be made clear.</p>
          <img src="/images/cynefin-framework.png" alt="Cynefin Framework - Complex, Complicated, Chaotic, Clear quadrants" class="w-full rounded-xl shadow-md" />
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
        <div class="space-y-5">
          <div class="flex items-center gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p class="text-lg font-bold text-surface-800">1 hour 45 minutes</p>
              <p class="text-sm text-surface-500">Total learning time</p>
            </div>
          </div>

          <p class="text-surface-600 leading-relaxed">Watch the videos, listen to the audio, or read the case studies below. Use the discussion questions to guide your thinking and prepare for discussions with your principal.</p>

          <div class="flex items-start gap-3 p-4 bg-accent-50 border border-accent-200 rounded-lg">
            <svg class="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
            <div>
              <p class="font-semibold text-accent-800 text-sm mb-1">Pro Tip</p>
              <p class="text-sm text-accent-700">Take notes as you go and answer the discussion questions. Plan to review your answers with your principal.</p>
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
        <p class="text-sm">Stop here and make notes to answer the discussion questions below. When you next meet with your principal, discuss your responses and any follow-up questions.</p>
      `,
      order: 1
    }
  ],

  activities: [
    {
      id: 'activity-01-intro',
      title: 'Module Overview: Our Problem Solving Approach',
      type: 'reading',
      duration: '10',
      description: 'Learn about the Improvement Kata, PDCA cycle, and Cynefin Framework that form the foundation of our problem-solving approach.',
      content: `
        <div class="space-y-10">
          <!-- Section 1: Improvement Kata -->
          <div>
            <h2 class="text-2xl font-bold text-surface-800 mb-4">A Scientific Approach to Improvement</h2>
            <p class="text-base text-surface-600 leading-relaxed mb-6">Our approach to problem solving begins with the Lean concept of the <strong>Improvement Kata</strong>, a framework focused on iterative learning, continuous improvement, and data-driven decision making. It was used to develop the scientific problem-solving method of PDCA (Plan - Do - Check - Act) and designed to be embedded in an organization's work processes.</p>
            <p class="text-surface-500 italic mb-6"><strong>Kata</strong> is a Japanese word meaning "form."</p>

            <img src="/images/improvement-kata.png" alt="The Improvement Kata - A four-step approach to scientific thinking" class="w-full rounded-xl shadow-md mb-6" />

            <div class="bg-primary-50 border-l-4 border-primary-400 rounded-r-xl p-6">
              <p class="text-surface-600 leading-relaxed">Think of the Improvement Kata like <strong>training for a marathon</strong>. You don't wake up one day and run 26.2 miles — you set a <em>challenge</em> (complete a marathon), assess your <em>current condition</em> (how far can you run today?), establish <em>target conditions</em> (increase distance to 5 miles, then 10, then 20), and run controlled <em>experiments</em> (try new pacing strategies, adjust hydration, test different shoes) to continuously improve.</p>
            </div>
          </div>

          <!-- Section 2: PDCA -->
          <div>
            <h2 class="text-2xl font-bold text-surface-800 mb-4">Why Plan, Do, Check, Act</h2>

            <img src="/images/pdca-problem-solving.png" alt="PDCA for Problem Solving - Plan, Do, Check, Act cycle" class="w-full rounded-xl shadow-md mb-6" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-primary-50 rounded-xl p-5 border border-primary-200">
                <h4 class="font-bold text-primary-800 mb-2">Systematic Problem Solving</h4>
                <p class="text-sm text-primary-700">This approach minimizes guesswork and helps ensure that solutions address the root cause of an issue in a structured way.</p>
              </div>
              <div class="bg-success-50 rounded-lg p-5 border border-success-200">
                <h4 class="font-bold text-success-800 mb-2">Continuous Improvement</h4>
                <p class="text-sm text-success-700">PDCA is iterative — once you finish a cycle, you use what you learned to refine and improve further.</p>
              </div>
              <div class="bg-info-50 rounded-lg p-5 border border-info-200">
                <h4 class="font-bold text-info-800 mb-2">Data-Driven Decisions</h4>
                <p class="text-sm text-info-700">The CHECK step ensures that decisions are based on evidence rather than assumptions.</p>
              </div>
              <div class="bg-accent-50 rounded-lg p-5 border border-accent-200">
                <h4 class="font-bold text-accent-800 mb-2">Risk Management</h4>
                <p class="text-sm text-accent-700">By starting on a small scale (DO), teams can test changes without committing significant resources.</p>
              </div>
            </div>
          </div>

          <!-- Section 3: Cynefin -->
          <div>
            <h2 class="text-2xl font-bold text-surface-800 mb-4">Using Cynefin to Light the Way</h2>
            <p class="text-base text-surface-600 leading-relaxed mb-6">Throughout our Improvement Kata, it is important to understand what type of problem(s) you are facing and the strategies that can be applied to the approach. This can provide clear direction and reduce spin.</p>
            <p class="text-surface-600 leading-relaxed mb-6">We use The <strong>Cynefin</strong> (kuh-nev-in) Framework as a useful tool to help us identify the nature of problems and guide us in choosing the right approach for solving them.</p>

            <img src="/images/cynefin-framework-2.png" alt="Cynefin Framework - Complex, Complicated, Chaotic, Clear quadrants" class="w-full rounded-xl shadow-md mb-6" />

            <div class="space-y-3">
              <div class="flex items-start gap-3 bg-surface-50 rounded-lg p-4">
                <span class="w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">1</span>
                <div>
                  <h4 class="font-semibold text-surface-800">Classify Problems</h4>
                  <p class="text-surface-500 text-sm">It divides problems into five domains — Clear, Complicated, Complex, Chaos, and Disorder.</p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-surface-50 rounded-lg p-4">
                <span class="w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">2</span>
                <div>
                  <h4 class="font-semibold text-surface-800">Improve Decision-Making</h4>
                  <p class="text-surface-500 text-sm">By recognizing the type of problem, you can apply the appropriate method (e.g., creating standard work for clear problems, applying experts for complicated ones, establishing a committee for complex issues).</p>
                </div>
              </div>
              <div class="flex items-start gap-3 bg-surface-50 rounded-lg p-4">
                <span class="w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">3</span>
                <div>
                  <h4 class="font-semibold text-surface-800">Alignment</h4>
                  <p class="text-surface-500 text-sm">It provides a shared language for teams, improving collaboration and clarity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      discussionQuestions: []
    },
    {
      id: 'activity-01-00',
      title: 'Introduction to Service Physics',
      type: 'video',
      duration: '2',
      description: 'A quick introduction to the Service Physics approach and what you\'ll learn in this course.',
      videoUrl: 'https://www.youtube.com/watch?v=DvSWcxSJvmo',
      thumbnailUrl: '/images/sp-logo-full.png',
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
      thumbnailUrl: '/images/cynefin-framework.png',
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
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-01-01',
      type: 'read',
      title: 'The Improvement Kata',
      description: 'By Mike Rother',
      thumbnailUrl: '/images/improvement-kata.png',
      resourceUrl: 'https://www.lean.org/improvement-kata/',
      order: 1
    },
    {
      id: 'ddr-01-02',
      type: 'watch',
      title: 'Introduction to Cynefin',
      description: 'Dave Snowden explains the framework',
      thumbnailUrl: '/images/cynefin-framework-2.png',
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
  colorHex: '#2d5a7b', // Deep slate blue
  timeEstimateMinutes: 110,
  order: 2,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-02-overview-01',
      columnType: 'overview',
      sectionTitle: 'Effort Impact Matrix',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">Problem prioritization is the structured process of evaluating, ranking, and selecting which problems to address first. The <strong>Effort Impact Matrix</strong> helps us focus time and resources on the issues that will drive the greatest value.</p>
          <p class="text-base text-surface-600 leading-relaxed">Effective prioritization is not just about solving problems — it's about solving the <strong>right problems</strong>, in the right order, with the right level of effort.</p>
          <img src="/images/effort-impact-matrix.png" alt="Effort Impact Matrix - High/Low Impact vs Hard/Easy to Implement" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 1
    },
    {
      id: 'section-02-overview-02',
      columnType: 'overview',
      sectionTitle: 'Problem Funnel & Five Whys',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">The <strong>Problem Funnel</strong> and <strong>Five Whys</strong> are helpful tools in the Plan phase of the PDCA, helping to define problems clearly and identify their root causes.</p>
          <p class="text-base text-surface-600 leading-relaxed">The Problem Funnel ensures teams focus on the right issue by progressively narrowing broad or vague concerns into a specific, actionable problem statement. The Five Whys further support root cause analysis by repeatedly asking "why" to uncover the fundamental reason behind a problem.</p>
          <img src="/images/problem-funnel.png" alt="Problem Funnel - Narrowing from perception to root cause" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 2
    },
    {
      id: 'section-02-overview-03',
      columnType: 'overview',
      sectionTitle: 'A3 Overview',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">An <strong>A3 Report</strong> is a Toyota-pioneered practice of getting the problem, the analysis, the corrective actions, and the action plan down on a single sheet of large (A3) paper, often with the use of graphics.</p>
          <p class="text-base text-surface-600 leading-relaxed">At Toyota, A3 reports have evolved into a standard method for summarizing problem-solving exercises, status reports, and planning exercises like value-stream mapping. Consider the left side of the A3 a tool for <strong>Plan</strong> and the right side a tool for <strong>Do, Check, and Act</strong>.</p>
          <img src="/images/a3-template.png" alt="A3 Report Template" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 3
    },
    {
      id: 'section-02-overview-04',
      columnType: 'overview',
      sectionTitle: 'Experiment Plan Overview',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed"><strong>Experiment plans</strong> are used at Service Physics to provide structure and visualization to improvement building work. Starting with the problem statements we gathered from grasping the situation and baseline data, we develop hypotheses to be tested and align on the KPIs and supporting metrics that will provide clarity.</p>
          <p class="text-base text-surface-600 leading-relaxed">Similar to the A3, the majority of this tool is used for planning: Problem Statement, Hypothesis, Learning Goals, KPI & Supporting Measures of Success, and Action Items. The Results section is used for <strong>Check</strong> and Next Steps can be used for <strong>Act</strong>.</p>
          <img src="/images/experiment-plan-template.png" alt="Experiment Plan Template" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 4
    },

    // DIVE IN COLUMN
    {
      id: 'section-02-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Read',
      contentHtml: `
        <div class="space-y-5">
          <div class="flex items-center gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p class="text-lg font-bold text-surface-800">1 hour 50 minutes</p>
              <p class="text-sm text-surface-500">Total learning time</p>
            </div>
          </div>

          <p class="text-surface-600 leading-relaxed">Learn about the A3 and 5 Whys through role-play videos and real-world case studies.</p>
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
        <p class="text-sm">Stop here and reflect on the A3 and 5 Whys tools. When you next meet with your principal, discuss your responses to the questions below.</p>
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
      thumbnailUrl: '/images/a3-template.png',
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
      thumbnailUrl: '/images/problem-funnel.png',
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
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-02-01',
      type: 'read',
      title: 'Managing to Learn',
      description: 'Using the A3 management process by John Shook',
      thumbnailUrl: '/images/a3-template.png',
      resourceUrl: 'https://www.lean.org/managing-to-learn/',
      order: 1
    },
    {
      id: 'ddr-02-02',
      type: 'read',
      title: 'Understanding A3 Thinking',
      description: 'A critical component of Toyota\'s PDCA management system',
      thumbnailUrl: '/images/a3-template.png',
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
  colorHex: '#3d6b8c', // Steel blue
  timeEstimateMinutes: 105,
  order: 3,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-03-overview-01',
      columnType: 'overview',
      sectionTitle: 'The Value of Going to See',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">Before we can identify problems, we must go and see for ourselves. <strong>The Three Reals</strong> — Real Facts, Real Place, Real Product — ensure we base our understanding on direct observation, not assumptions.</p>
          <p class="text-base text-surface-600 leading-relaxed">Understanding the difference between <strong>lagging indicators</strong> (the water bill is high) and <strong>leading indicators</strong> (equipment is broken) is critical to identifying the actual problem.</p>
          <img src="/images/three-reals.png" alt="The Three Reals - Real Facts, Real Place, Real Product" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 1
    },
    {
      id: 'section-03-overview-02',
      columnType: 'overview',
      sectionTitle: 'Work vs Waste',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed"><strong>Work</strong> creates value for customers. <strong>Waste</strong> destroys value for customers. <strong>Incidental waste</strong> is necessary until we find a better way.</p>
          <p class="text-base text-surface-600 leading-relaxed">Most business activity is waste. Waste is sneaky — and it looks like work! Waste gets heavier with growth.</p>
          <img src="/images/work-vs-waste.png" alt="Work vs Waste - Value creation vs value destruction" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 2
    },
    {
      id: 'section-03-overview-03',
      columnType: 'overview',
      sectionTitle: 'The Seven Wastes',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">Waste creates no value. The seven wastes are: <strong>Inventory</strong> (too much or too little), <strong>Over-processing</strong> (unnecessary steps), <strong>Defects</strong> (rework), <strong>Transportation</strong> (moving materials), <strong>Overproduction</strong> (excess output), <strong>Motion</strong> (unnecessary movement), and <strong>Waiting</strong> (delays).</p>
          <p class="text-base text-surface-600 leading-relaxed">Waste is not cost: <strong>Time. Money. Space.</strong></p>
          <img src="/images/seven-wastes.png" alt="The Seven Wastes" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 3
    },

    // DIVE IN COLUMN
    {
      id: 'section-03-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Practice',
      contentHtml: `
        <div class="space-y-5">
          <div class="flex items-center gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p class="text-lg font-bold text-surface-800">1 hour 45 minutes</p>
              <p class="text-sm text-surface-500">Total learning time</p>
            </div>
          </div>

          <p class="text-surface-600 leading-relaxed">Learn to identify waste and problems in real-world scenarios through videos, case studies, and practical exercises.</p>
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
        <p class="text-sm">Practice identifying waste in your own work environment and prepare to discuss with your principal.</p>
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
      thumbnailUrl: '/images/work-vs-waste.png',
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
      thumbnailUrl: '/images/seven-wastes.png',
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
      duration: '15',
      description: 'Practice creating a spaghetti diagram to visualize movement waste in a process. Watch the video, draw your spaghetti map, and analyze the motion.',
      content: `
        <div class="prose max-w-none">
          <div class="bg-primary-50 border border-primary-200 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-bold text-surface-800 mb-2">Identifying Waste: Spaghetti Mapping</h3>
            <p class="text-surface-600">One of the best ways to capture motion in a process is Spaghetti Mapping. This practice will help you visualize and quantify motion waste.</p>
          </div>

          <div class="bg-accent-50 border-l-4 border-accent-400 p-4 my-4">
            <h4 class="font-bold text-surface-800">Instructions</h4>
            <ol class="text-surface-600 mt-2 space-y-2">
              <li><strong>Step 1:</strong> Grab a piece of paper and draw this diagram - a simple floor plan of a workspace</li>
              <li><strong>Step 2:</strong> Watch the video of an operation at the beginning of the problem solving process and trace the motion of the barista in the red apron (currently at the register). Don't let your pen leave the paper until the video is over!</li>
              <li><strong>Step 3:</strong> Compare your results and review the questions below</li>
            </ol>
          </div>

          <div class="grid grid-cols-2 gap-4 my-6">
            <div class="bg-surface-100 rounded-xl p-4 border-2 border-dashed border-surface-300">
              <p class="font-bold text-center text-surface-500 mb-2">DRAW THIS</p>
              <p class="text-sm text-center text-surface-400">Simple floor plan layout</p>
            </div>
            <div class="bg-accent-50 rounded-lg p-4 border-2 border-accent-200">
              <p class="font-bold text-center text-accent-800 mb-2">MOTION = WORK</p>
              <p class="text-sm text-center text-accent-700">Count in the barista in the red apron. What did you see?</p>
            </div>
          </div>
        </div>
      `,
      practiceSections: [
        {
          id: 'spaghetti_setup',
          title: 'Spaghetti Mapping Exercise',
          description: 'Complete the mapping exercise while watching the video.',
          fields: [
            {
              id: 'spaghetti_map_upload',
              type: 'upload',
              label: 'Upload Your Spaghetti Map Drawing',
              helpText: 'Take a photo of your completed spaghetti diagram and upload it here.'
            },
            {
              id: 'motion_count',
              type: 'number',
              label: 'How many times did the barista cross the workspace?',
              placeholder: '0'
            },
            {
              id: 'motion_observations',
              type: 'textarea',
              label: 'What patterns did you observe in the movement?',
              placeholder: 'Describe what you noticed about the motion waste...'
            },
            {
              id: 'improvement_ideas',
              type: 'textarea',
              label: 'What improvements would you suggest to reduce this motion?',
              placeholder: 'List ideas for reducing unnecessary movement...'
            }
          ]
        }
      ],
      discussionQuestions: [
        {
          id: 'dq-03-05-01',
          question: 'What did your spaghetti diagram reveal about the process? Where were the biggest opportunities for improvement?',
          order: 1
        },
        {
          id: 'dq-03-05-02',
          question: 'How much of the motion you observed was value-added vs. waste?',
          order: 2
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
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-03-01',
      type: 'read',
      title: 'Learning to See',
      description: 'Value stream mapping to add value and eliminate muda',
      resourceUrl: 'https://www.lean.org/learning-to-see/',
      order: 1
    },
    {
      id: 'ddr-03-02',
      type: 'watch',
      title: 'The 7 Wastes in Healthcare',
      description: 'Real examples from healthcare operations',
      thumbnailUrl: '/images/seven-wastes.png',
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
  colorHex: '#4a7c72', // Sage green-teal
  timeEstimateMinutes: 40,
  order: 4,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-04-overview-01',
      columnType: 'overview',
      sectionTitle: 'Defining the Gap',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">Kaizen requires that we define problems in a very specific way — the <strong>gap between our current condition and our target</strong>. There are a lot of things within our problem (pain points, cause points, root causes) which, while important, can distract us from taking that first step in the right direction: measuring the gap.</p>
          <img src="/images/defining-problems-gap.png" alt="Defining Problems - The gap between current condition and target" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 1
    },
    {
      id: 'section-04-overview-02',
      columnType: 'overview',
      sectionTitle: 'Writing a Good Problem Statement',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">A good problem statement is observable, measurable, and stated as a gap — not the absence of a solution you have in mind, and not blame.</p>
          <p class="text-base text-surface-600 leading-relaxed"><strong>Best Practices:</strong> Be Specific, Focus on Facts, Keep it Concise, Use Clear Language, Be Objective. Remember that a problem is not the absence of a potential solution you believe is a good idea.</p>
          <img src="/images/problem-statement-examples.png" alt="Writing a Good Problem Statement - Is vs Is Not" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 2
    },
    {
      id: 'section-04-overview-03',
      columnType: 'overview',
      sectionTitle: 'Defining the Target',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">When defining the target, consider the challenge and make it <strong>SMART</strong>: Specific, Measurable, Achievable, Relevant, and Timebound.</p>
          <p class="text-base text-surface-600 leading-relaxed">Ask yourself: What are the business goals? What are the industry benchmarks? What waste exists that can be removed? How can we increase focus on value delivery? What does the customer expect?</p>
          <img src="/images/smart-targets.png" alt="Defining the Target - SMART goals" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 3
    },

    // DIVE IN COLUMN
    {
      id: 'section-04-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen/Practice',
      contentHtml: `
        <div class="space-y-5">
          <div class="flex items-center gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p class="text-lg font-bold text-surface-800">40 minutes</p>
              <p class="text-sm text-surface-500">Total learning time</p>
            </div>
          </div>

          <p class="text-surface-600 leading-relaxed">Learn to write clear, actionable problem statements through examples and practice.</p>
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
        <p class="text-sm">Write a problem statement for a real issue you're facing and be ready to refine it with your principal.</p>
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
      thumbnailUrl: '/images/defining-problems-gap.png',
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
      thumbnailUrl: '/images/problem-statement-examples.png',
      content: `
        <div class="space-y-6">
          <div class="bg-accent-50 border-l-4 border-accent-400 p-6 rounded-r-lg">
            <h3 class="text-xl font-bold text-surface-800 mb-4">How to Complete This Activity</h3>

            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 class="font-semibold text-surface-800">Observe the Work</h4>
                  <p class="text-surface-600">Imagine you are observing the work at Panda Express where customers are ordering their dishes as they go down the line. You are following the customer in the gray shirt, noting their time in queue. We are trying to understand what is getting in the way of delivering a consistent and timely experience for the customers with no unnecessary waiting.</p>
                  <p class="text-surface-500 mt-2 italic">Panda Express has a goal of a <strong>3-minute customer service time</strong>. We are watching to see if that plan is in action.</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 class="font-semibold text-surface-800">Review the Time Study Data</h4>
                  <p class="text-surface-600">Review the time study data taken during these observations that capture the current condition.</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 class="font-semibold text-surface-800">Practice Writing a Problem Statement</h4>
                  <p class="text-surface-600">Practice writing a problem statement with the current state observed and potential target.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-primary-50 border-l-4 border-primary-400 p-4 my-4 rounded-r-xl">
            <h4 class="font-bold text-primary-900">Problem Statement Template:</h4>
            <p class="font-mono text-sm text-primary-800 mt-2">[Process/Area] is experiencing [Current Condition with data], which is [X%] away from [Target Condition with data], causing [Impact].</p>
          </div>

          <div class="bg-accent-50 border-l-4 border-accent-400 p-4 my-4 rounded-r-lg">
            <h4 class="font-bold text-surface-800">Checklist - Good problem statements are:</h4>
            <ul class="mt-2 space-y-1 text-surface-600">
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
      'Bring a problem you\'re currently facing. Work with your principal to write a clear problem statement using the template.',
      'What\'s the difference between a problem and a solution? Why is it important to distinguish between the two?',
      'How can you gather data to support your problem definition?'
    ],
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-04-01',
      type: 'read',
      title: 'The Problem-Solving A3',
      description: 'How to define problems effectively',
      thumbnailUrl: '/images/a3-template.png',
      resourceUrl: 'https://www.lean.org/problem-solving-a3/',
      order: 1
    },
    {
      id: 'ddr-04-02',
      type: 'watch',
      title: 'The Power of Problem Definition',
      description: 'TEDx talk on why problem definition matters',
      thumbnailUrl: '/images/defining-problems-gap.png',
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
  colorHex: '#5a7064', // Muted olive
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
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed"><strong>Experiment plans</strong> are used at Service Physics to provide structure and visualization to improvement work. The key components are: Problem Statement, Hypothesis, Learning Goals, KPI & Supporting Measures of Success, Experiment Design, Action Items, Results, and Next Steps.</p>
          <img src="/images/experiment-plan.png" alt="Experiment Plan Template" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 1
    },
    {
      id: 'section-05-overview-02',
      columnType: 'overview',
      sectionTitle: 'Kaizen Tools & Methods',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">Kaizen asks three key questions: <strong>What is the work?</strong> How does the work get done? <strong>Where does waste exist?</strong> We use tools like Work Stories, Balance Boarding, Value Stream Mapping, Spaghetti Mapping, 5S, ERACS, Pull Based Inventory, Work Routines, and Task Responsibility Tracking.</p>
          <img src="/images/kaizen-tools.png" alt="Kaizen Tools and Methods" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 2
    },
    {
      id: 'section-05-overview-03',
      columnType: 'overview',
      sectionTitle: 'ERACS Process Improvement',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed"><strong>ERACS</strong> is a 4-step plan to create a new work method: (1) Break Down the Job — capture the current state, (2) Question Every Detail — why, what, where, when, who, how, (3) Develop the New Method — Eliminate, Rearrange, Add/Subtract, Combine, Simplify, (4) Test the New Method — implement, measure impact, confirm quality and safety.</p>
          <img src="/images/eracs-process.png" alt="ERACS Process Improvement Approach" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 3
    },

    // DIVE IN COLUMN
    {
      id: 'section-05-dive-in-01',
      columnType: 'dive_in',
      sectionTitle: 'Watch/Listen',
      contentHtml: `
        <div class="space-y-5">
          <div class="flex items-center gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p class="text-lg font-bold text-surface-800">45 minutes</p>
              <p class="text-sm text-surface-500">Total learning time</p>
            </div>
          </div>

          <p class="text-surface-600 leading-relaxed">Learn how to design and run effective experiments through real-world examples.</p>
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
        <p class="text-sm">Design a simple experiment you can run in your work environment and discuss it with your principal.</p>
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
      thumbnailUrl: '/images/eracs-process.png',
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
      thumbnailUrl: '/images/experiment-plan-template.png',
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
      thumbnailUrl: '/images/experiment-plan.png',
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
      description: 'Apply ERACS to improve a process in your own life. Use this interactive worksheet to work through each step and create a measurable improvement.',
      thumbnailUrl: '/images/kaizen-tools.png',
      content: `
        <div class="prose max-w-none">
          <div class="bg-primary-50 border border-primary-200 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-bold text-surface-800 mb-2">Practicing Problem Solving with ERACS</h3>
            <p class="text-surface-600">It's your turn! Identify a problem to solve with process improvement within your very own world and apply the Point Kaizen methodology.</p>
          </div>

          <div class="bg-accent-50 border-l-4 border-accent-400 p-4 my-4">
            <h4 class="font-bold text-surface-800">How to use this worksheet</h4>
            <ol class="text-surface-600 mt-2 space-y-1">
              <li>1. Follow the sections from left to right (Setup → Test & Compare)</li>
              <li>2. Video yourself completing the task to capture the current state</li>
              <li>3. Fill in each section below as you work through the exercise</li>
              <li>4. Schedule time with your principal to review your process improvement</li>
            </ol>
          </div>
        </div>
      `,
      practiceSections: [
        {
          id: 'setup',
          title: 'Setup & Problem Definition',
          description: 'Choose a regular activity in your life that is frequently repeated, can be broken down into tasks, and has clear value delivery.',
          fields: [
            {
              id: 'chosen_process',
              type: 'text',
              label: 'Chosen Process to Conduct Point Kaizen',
              placeholder: 'e.g., Brewing coffee, Making a smoothie, Packing lunch',
              helpText: 'Choose something you do regularly that can be measured and improved.'
            },
            {
              id: 'context_challenge',
              type: 'textarea',
              label: 'Provide Context or Challenge',
              placeholder: 'What frustrates you about this process? What would you like to improve?',
              helpText: 'Describe why you selected this process and what challenges you face.'
            },
            {
              id: 'problem_statement',
              type: 'textarea',
              label: 'Problem Statement',
              placeholder: '[Process] is currently taking [X time/steps], which is [Y%] away from my target of [Z], causing [impact]...',
              helpText: 'Write a clear problem statement using the format: Current Condition + Gap + Target + Impact'
            },
            {
              id: 'quality_standards',
              type: 'textarea',
              label: 'Quality Standards',
              placeholder: 'What quality standards must be maintained? (e.g., taste, cleanliness, completeness)',
              helpText: 'Define what "good" looks like - these standards must be maintained in your improved process.'
            }
          ]
        },
        {
          id: 'step1_breakdown',
          title: 'Step 1: Break Down The Job',
          description: 'Video yourself completing this task 1-2 times to capture the current state with data. List each step of your chosen process.',
          fields: [
            {
              id: 'process_steps_before',
              type: 'table',
              label: 'Capture Everything - Current Process Steps',
              helpText: 'List the current steps you take to carry out your chosen process. Use a stopwatch to time each step.',
              columns: [
                { id: 'step', header: 'Process Step', type: 'text', width: '50%' },
                { id: 'machine_hand', header: 'Machine, Hand, Both', type: 'select', options: ['Machine', 'Hand', 'Both'] },
                { id: 'time_sec', header: 'How Long (Sec)', type: 'number' }
              ],
              minRows: 5,
              maxRows: 15
            },
            {
              id: 'before_total_time',
              type: 'timing-scale',
              label: 'Total Time for Current Process',
              helpText: 'Calculate and enter your total process time',
              scaleMin: 0,
              scaleMax: 600,
              scaleUnit: 'sec'
            },
            {
              id: 'before_spaghetti_map',
              type: 'upload',
              label: 'Upload Spaghetti Map Drawing Here',
              helpText: 'Using paper and pen, draw the basic layout of your workspace and trace the motion as you conduct the process.'
            },
            {
              id: 'before_work_story',
              type: 'textarea',
              label: 'Before Work Story',
              placeholder: 'Describe your current state work story - what you observe happening step by step...',
              helpText: 'Create a work story using the template: describe what happens at each phase of the process.'
            }
          ]
        },
        {
          id: 'step2_question',
          title: 'Step 2: Question Every Detail',
          description: 'Record your ideas and questions related to your process experiment. Challenge every step.',
          fields: [
            {
              id: 'questions_findings',
              type: 'table',
              label: 'Question / Finding / Decision Table',
              helpText: 'For each step, ask: Why do we do it this way? Is it necessary? Can it be improved?',
              columns: [
                { id: 'question', header: 'Question', type: 'text', width: '35%' },
                { id: 'finding', header: 'Finding', type: 'text', width: '35%' },
                { id: 'decision', header: 'Decision', type: 'text', width: '30%' }
              ],
              minRows: 5,
              maxRows: 12
            }
          ]
        },
        {
          id: 'step3_eracs',
          title: 'Step 3: Develop The New Method – Apply ERACS',
          description: 'Record your ERACS improvement steps to the process.',
          fields: [
            {
              id: 'eracs_eliminate',
              type: 'textarea',
              label: 'E - Eliminate the unnecessary',
              placeholder: 'What steps can be removed entirely without affecting quality?'
            },
            {
              id: 'eracs_rearrange',
              type: 'textarea',
              label: 'R - Rearrange process steps for a more efficient sequence',
              placeholder: 'How can you reorder steps for better flow?'
            },
            {
              id: 'eracs_add_subtract',
              type: 'textarea',
              label: 'A - Add/Subtract process elements that are missing or in excess',
              placeholder: 'What needs to be added? What can be removed?'
            },
            {
              id: 'eracs_combine',
              type: 'textarea',
              label: 'C - Combine process steps when practical',
              placeholder: 'Which steps can be merged or done simultaneously?'
            },
            {
              id: 'eracs_simplify',
              type: 'textarea',
              label: 'S - Simplify at each step to create repeatable, predictable, quality work',
              placeholder: 'How can you make each step easier and more consistent?'
            }
          ]
        },
        {
          id: 'step4_test',
          title: 'Step 4: Test & Compare',
          description: 'Video yourself completing this task 1-2 times so you can capture the improved process with data.',
          fields: [
            {
              id: 'process_steps_after',
              type: 'table',
              label: 'New Work Method - Improved Process Steps',
              helpText: 'List the process steps for the new improved method.',
              columns: [
                { id: 'step', header: 'Process Step', type: 'text', width: '50%' },
                { id: 'machine_hand', header: 'Machine, Hand, Both', type: 'select', options: ['Machine', 'Hand', 'Both'] },
                { id: 'time_sec', header: 'How Long (Sec)', type: 'number' }
              ],
              minRows: 5,
              maxRows: 15
            },
            {
              id: 'after_total_time',
              type: 'timing-scale',
              label: 'Total Time for Improved Process',
              helpText: 'Calculate and enter your new total process time',
              scaleMin: 0,
              scaleMax: 600,
              scaleUnit: 'sec'
            },
            {
              id: 'after_spaghetti_map',
              type: 'upload',
              label: 'Upload New Method Spaghetti Map',
              helpText: 'Document the spaghetti map of the improved process.'
            },
            {
              id: 'after_work_story',
              type: 'textarea',
              label: 'New Method Work Story',
              placeholder: 'Create an updated work story for your new method...',
              helpText: 'Describe what happens in the improved process step by step.'
            }
          ]
        },
        {
          id: 'reflection',
          title: 'Reflection & Results',
          description: 'Evaluate your improvement and document what you learned.',
          fields: [
            {
              id: 'original_problem_statement',
              type: 'textarea',
              label: 'Original Problem Statement',
              placeholder: 'Copy your original problem statement here for reference...'
            },
            {
              id: 'quality_standards_reflection',
              type: 'textarea',
              label: 'Quality Standards - has the new method kept standards in place or improved adherence?',
              placeholder: 'Note your observations about quality in the improved process...'
            },
            {
              id: 'target_achievement',
              type: 'textarea',
              label: 'Target - has the new method achieved the goal you set out to achieve in improving the process?',
              placeholder: 'Did you hit your target? What was the improvement percentage?'
            },
            {
              id: 'time_improvement',
              type: 'text',
              label: 'Time Improvement (Before → After)',
              placeholder: 'e.g., 180 sec → 120 sec = 33% improvement'
            },
            {
              id: 'key_learnings',
              type: 'textarea',
              label: 'Key Learnings',
              placeholder: 'What did you learn from this exercise? What surprised you?'
            }
          ]
        }
      ],
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
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-05-01',
      type: 'read',
      title: 'The Lean Startup',
      description: 'Build-Measure-Learn approach to experimentation',
      resourceUrl: 'https://www.amazon.com/Lean-Startup-Eric-Ries/dp/0307887898',
      order: 1
    },
    {
      id: 'ddr-05-02',
      type: 'read',
      title: 'Kaizen Express',
      description: 'Fundamentals of kaizen and continuous improvement',
      thumbnailUrl: '/images/kaizen-tools.png',
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
  colorHex: '#6b5e7a', // Muted plum
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
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">The <strong>Check</strong> phase of PDCA is where we measure: What does the data say? Did we achieve the target condition? Why or why not? Identify any gaps and unexpected outcomes. Recap using data and metrics showing planned vs actual outcomes.</p>
          <img src="/images/experiment-results.png" alt="Reviewing Experiment Results" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 1
    },
    {
      id: 'section-06-overview-02',
      columnType: 'overview',
      sectionTitle: 'Feedback from the Field',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed">Effective measurement includes both quantitative data and <strong>qualitative feedback</strong> from people affected by the change. Go to the gemba, talk to the people doing the work, and listen to what they're experiencing.</p>
          <img src="/images/feedback-from-field.png" alt="Feedback from the Field" class="w-full rounded-xl shadow-md" />
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
        <div class="space-y-5">
          <div class="flex items-center gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p class="text-lg font-bold text-surface-800">45 minutes</p>
              <p class="text-sm text-surface-500">Total learning time</p>
            </div>
          </div>

          <p class="text-surface-600 leading-relaxed">Learn how to effectively measure results and gather meaningful feedback.</p>
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
        <p class="text-sm">Think about how you currently measure success in your work and what you might be missing.</p>
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
      thumbnailUrl: '/images/experiment-results.png',
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
      thumbnailUrl: '/images/feedback-from-field.png',
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
      thumbnailUrl: '/images/three-reals.png',
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
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-06-01',
      type: 'read',
      title: 'Measuring What Matters',
      description: 'OKRs and the art of setting objectives',
      resourceUrl: 'https://www.whatmatters.com/',
      order: 1
    },
    {
      id: 'ddr-06-02',
      type: 'read',
      title: 'The Mom Test',
      description: 'How to talk to customers and learn if your business is a good idea',
      thumbnailUrl: '/images/feedback-from-field.png',
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
  colorHex: '#4a6b5a', // Forest teal
  timeEstimateMinutes: 35,
  order: 7,
  accessLevel: 'free',

  sections: [
    // OVERVIEW COLUMN
    {
      id: 'section-07-overview-01',
      columnType: 'overview',
      sectionTitle: 'The Anatomy of Improvement',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed"><strong>Kaizen PDCA</strong> is the problem-solving fuel for operational transformation across a system. Through leader-led cascades, it drives improvements in cycle time, team experience, production capacity, labor, and guest satisfaction — supported by coaching, training, company culture, leadership, mission & vision, and strategy.</p>
          <img src="/images/anatomy-of-improvement.png" alt="The Anatomy of Improvement - Kaizen PDCA as fuel for operational transformation" class="w-full rounded-xl shadow-md" />
        </div>
      `,
      order: 1
    },
    {
      id: 'section-07-overview-02',
      columnType: 'overview',
      sectionTitle: 'Improvement Approach',
      contentHtml: `
        <div class="space-y-4">
          <p class="text-base text-surface-600 leading-relaxed"><strong>Troubleshooting</strong> closes the gap to our current standard; <strong>data-driven innovation</strong> raises the bar. Both are essential — troubleshooting restores performance to baseline, while innovation pushes the standard higher.</p>
          <img src="/images/improvement-approach.png" alt="Improvement Approach - Troubleshooting vs data-driven innovation" class="w-full rounded-xl shadow-md" />
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
        <div class="space-y-5">
          <div class="flex items-center gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <div>
              <p class="text-lg font-bold text-surface-800">35 minutes</p>
              <p class="text-sm text-surface-500">Total learning time</p>
            </div>
          </div>

          <p class="text-surface-600 leading-relaxed">Learn what makes improvement sustainable and how to build a culture of continuous improvement.</p>
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
        <p class="text-sm">Reflect on your improvement journey through this course and plan your next steps with your principal.</p>
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
      thumbnailUrl: '/images/improvement-approach.png',
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
    knowledgeCheckUrl: undefined,
    glossaryNote: ''
  },

  deepDiveResources: [
    {
      id: 'ddr-07-01',
      type: 'read',
      title: 'The Toyota Way',
      description: '14 Management Principles from the World\'s Greatest Manufacturer',
      thumbnailUrl: '/images/anatomy-of-improvement.png',
      resourceUrl: 'https://www.amazon.com/Toyota-Way-Management-Principles-Manufacturer/dp/0071392319',
      order: 1
    },
    {
      id: 'ddr-07-02',
      type: 'read',
      title: 'The High-Velocity Edge',
      description: 'How the leading organizations use operational excellence to beat the competition',
      thumbnailUrl: '/images/improvement-approach.png',
      resourceUrl: 'https://www.amazon.com/High-Velocity-Edge-Operational-Excellence-Competition/dp/1259860906',
      order: 2
    },
    {
      id: 'ddr-07-03',
      type: 'watch',
      title: 'Building a Culture of Continuous Improvement',
      description: 'TEDx talk on creating lasting organizational change',
      thumbnailUrl: '/images/anatomy-of-improvement.png',
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
