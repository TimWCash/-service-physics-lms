export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface LearningActivity {
  id: string;
  title: string;
  type: 'ebook' | 'video' | 'reading' | 'quiz' | 'coaching';
  duration?: string;
  content?: string;
  videoUrl?: string;
  questions?: QuizQuestion[];
}

export interface CourseSection {
  id: string;
  title: string;
  accessLevel: 'free' | 'paid';
  activities: LearningActivity[];
}

export const courseData: CourseSection[] = [
  {
    id: 'section-01',
    title: 'Welcome to Problem Solving 101',
    accessLevel: 'free',
    activities: [
      {
        id: 'activity-01-01',
        title: "Let's dive into Service Physics",
        type: 'ebook',
        content: `# Course Objectives

As you embark on this training, here are some effective tips and tricks to help you learn and internalize the course objectives:

## Understanding the Improvement Kata

- **Break it Down:** Familiarize yourself with each step of the Improvement Kata. Create a flowchart to visualize the process.
- **Practice Scenarios:** Apply the Improvement Kata steps to hypothetical scenarios to solidify your understanding.

## Applying the PDCA Cycle

- **Real-Life Application:** Choose a personal project and apply the PDCA (Plan-Do-Check-Act) cycle to see its effectiveness in action.
- **Group Discussions:** Engage with peers to share experiences using the PDCA cycle and learn different perspectives.

## Exploring the Cynefin Framework

- **Case Studies:** Look for case studies that illustrate the use of the Cynefin Framework. Analyze how problems were classified and managed.
- **Mind Mapping:** Create a mind map to connect different types of problems with their respective handling strategies.

## Utilizing Problem-Solving Visualization Tools

- **Hands-On Practice:** Use an A3 template to document a real problem you're facing. This will help you become familiar with the format.
- **Experiment Plans:** Draft an Experiment Plan for a small-scale experiment related to your interests or work tasks.

## Implementing the 5 Whys Technique

- **Root Cause Analysis:** Pick a recurring issue in your life and practice asking "Why?" iteratively to uncover the root cause.

## Other Key Topics

- Differentiating Leading and Lagging Indicators
- Defining Work and Waste
- Identifying the 7 Wastes
- Visualizing Motion Waste
- Defining a Problem
- Drafting a Target Condition
- Formulating a Problem Statement

**Key Learning Outcomes:**
- Understand and apply the Improvement Kata methodology
- Master the PDCA (Plan-Do-Check-Act) cycle for continuous improvement
- Classify problems using the Cynefin Framework
- Utilize visualization tools like A3 templates for problem documentation
- Implement root cause analysis using the 5 Whys technique
- Differentiate between leading and lagging indicators
- Identify and eliminate the 7 types of waste
- Define problems clearly with target conditions and problem statements
`
      }
    ]
  },
  {
    id: 'section-02',
    title: 'Problem Solving Approach',
    accessLevel: 'free',
    activities: [
      {
        id: 'activity-02-01',
        title: 'Our Problem Solving Approach Overview',
        type: 'reading',
        content: `# Our Problem Solving Approach Overview

Welcome to the Problem Solving Approach section. In this module, you'll learn a structured methodology for identifying, analyzing, and solving complex problems.

## The Foundation

Our approach is built on three key principles:

1. **Understand Before Acting** - Take time to fully comprehend the problem before jumping to solutions
2. **Data-Driven Decisions** - Use facts and evidence to guide your problem-solving process
3. **Continuous Improvement** - Treat every problem as an opportunity to learn and improve

## Key Frameworks You'll Learn

Throughout this section, you'll be introduced to several powerful frameworks that will enhance your problem-solving capabilities.`
      },
      {
        id: 'activity-02-02',
        title: 'Redefining the work',
        type: 'reading',
        content: `# Redefining the Work

One of the most critical steps in problem-solving is redefining how we think about and approach our work.

## What is Work?

Work is any activity that adds value to the customer or moves the process forward. However, much of what we do daily may not actually be work—it could be waste.

## Work vs. Waste

Understanding the distinction between work and waste is fundamental to improvement:

- **Work:** Activities that transform materials or information to meet customer needs
- **Waste:** Activities that consume resources but don't add value

## Reframing Your Perspective

By redefining work through this lens, you can identify opportunities for improvement and focus your energy on activities that truly matter.`
      },
      {
        id: 'activity-02-03',
        title: 'Discussion Questions',
        type: 'quiz',
        questions: [
          {
            id: 'q-02-03-01',
            question: 'What is the first principle of our problem-solving approach?',
            options: [
              'Jump to solutions quickly',
              'Understand before acting',
              'Focus on blame',
              'Ignore data'
            ],
            correctAnswer: 1,
            explanation: 'Understanding the problem fully before taking action is the foundation of effective problem-solving.'
          },
          {
            id: 'q-02-03-02',
            question: 'How should we view every problem according to our approach?',
            options: [
              'As a failure',
              'As someone else\'s responsibility',
              'As an opportunity to learn and improve',
              'As something to avoid'
            ],
            correctAnswer: 2,
            explanation: 'Every problem is an opportunity for learning and continuous improvement.'
          },
          {
            id: 'q-02-03-03',
            question: 'What distinguishes work from waste?',
            options: [
              'The time it takes',
              'Whether it adds value to the customer',
              'How difficult it is',
              'Who performs it'
            ],
            correctAnswer: 1,
            explanation: 'Work adds value to the customer, while waste consumes resources without adding value.'
          }
        ]
      },
      {
        id: 'activity-02-04',
        title: 'What is Cynefin?',
        type: 'video',
        duration: '15:11',
        videoUrl: 'https://www.youtube.com/watch?v=N7oz366X0-8',
        content: `# What is Cynefin?

The Cynefin Framework is a conceptual framework used to aid decision-making. It was created by Dave Snowden in 1999 and helps leaders determine the prevailing operative context to make appropriate choices.

## The Five Domains

1. **Clear (Simple)** - The domain of best practice
2. **Complicated** - The domain of experts
3. **Complex** - The domain of emergence
4. **Chaotic** - The domain of rapid response
5. **Disorder** - When you don't know which domain you're in

Watch the video to learn how to classify problems and choose the right approach for each domain.`
      },
      {
        id: 'activity-02-05',
        title: 'Discussion Questions',
        type: 'quiz',
        questions: [
          {
            id: 'q-02-05-01',
            question: 'How many domains are there in the Cynefin Framework?',
            options: [
              'Three',
              'Four',
              'Five',
              'Six'
            ],
            correctAnswer: 2,
            explanation: 'The Cynefin Framework has five domains: Clear, Complicated, Complex, Chaotic, and Disorder.'
          },
          {
            id: 'q-02-05-02',
            question: 'Which domain requires rapid response?',
            options: [
              'Clear',
              'Complicated',
              'Complex',
              'Chaotic'
            ],
            correctAnswer: 3,
            explanation: 'The Chaotic domain requires rapid response to stabilize the situation.'
          }
        ]
      },
      {
        id: 'activity-02-06',
        title: 'The Solution Fixation Trap',
        type: 'reading',
        content: `# The Solution Fixation Trap

One of the most common pitfalls in problem-solving is jumping to solutions before fully understanding the problem. This is called the Solution Fixation Trap.

## What is Solution Fixation?

Solution Fixation occurs when teams or individuals become attached to a particular solution early in the problem-solving process, often before they've adequately defined or understood the problem.

## Warning Signs

- Proposing solutions in the first meeting
- Dismissing alternative approaches quickly
- Focusing on "how" before understanding "what" and "why"
- Resistance to further problem exploration

## How to Avoid the Trap

1. **Spend time defining the problem** - Resist the urge to solve immediately
2. **Ask "why" multiple times** - Dig deeper into root causes
3. **Encourage diverse perspectives** - Invite different viewpoints
4. **Test your assumptions** - Verify your understanding before acting

## The Cost of Solution Fixation

When we fixate on solutions too early:
- We may solve the wrong problem
- We miss better alternatives
- We waste resources on ineffective solutions
- We fail to address root causes

Remember: A problem well-defined is half-solved.`
      },
      {
        id: 'activity-02-07',
        title: 'Discussion Questions',
        type: 'quiz',
        questions: [
          {
            id: 'q-02-07-01',
            question: 'What is Solution Fixation?',
            options: [
              'A method for solving problems',
              'Becoming attached to a solution before understanding the problem',
              'A type of adhesive',
              'A framework for decision-making'
            ],
            correctAnswer: 1,
            explanation: 'Solution Fixation is when we become attached to a particular solution too early, before fully understanding the problem.'
          },
          {
            id: 'q-02-07-02',
            question: 'What should you do to avoid the Solution Fixation Trap?',
            options: [
              'Propose solutions immediately',
              'Dismiss alternative approaches',
              'Spend time defining the problem',
              'Avoid asking questions'
            ],
            correctAnswer: 2,
            explanation: 'Spending adequate time defining and understanding the problem helps avoid jumping to premature solutions.'
          }
        ]
      },
      {
        id: 'activity-02-08',
        title: 'Coaching Moment',
        type: 'coaching',
        questions: [
          {
            id: 'q-02-08-01',
            question: 'Reflect on a recent problem you encountered. Did you experience Solution Fixation? How could you have approached it differently?',
            options: [
              'Yes, I jumped to a solution too quickly. I should have spent more time understanding the root cause.',
              'No, I thoroughly analyzed the problem before acting.',
              'I\'m not sure - I need to think about this more.',
              'I rarely encounter problems in my work.'
            ],
            correctAnswer: 0,
            explanation: 'Reflecting on our own Solution Fixation tendencies helps us become more aware and improve our problem-solving approach.'
          },
          {
            id: 'q-02-08-02',
            question: 'What is one specific action you will take to avoid Solution Fixation in your next problem-solving situation?',
            options: [
              'I will ask "why" at least 5 times before proposing solutions',
              'I will gather input from at least 3 different perspectives',
              'I will spend dedicated time defining the problem before discussing solutions',
              'All of the above'
            ],
            correctAnswer: 3,
            explanation: 'All of these actions help prevent Solution Fixation. Choose the approach that works best for your situation.'
          }
        ]
      }
    ]
  },
  {
    id: 'section-03',
    title: 'Problem Solving Tools',
    accessLevel: 'free',
    activities: [
      {
        id: 'activity-03-01',
        title: 'The 5 Whys Technique',
        type: 'reading',
        content: `# The 5 Whys Technique

The 5 Whys is a simple but powerful tool for root cause analysis. By asking "Why?" five times, you can peel away the layers of symptoms to reveal the underlying root cause of a problem.

## How It Works

1. **State the problem clearly**
2. **Ask "Why?" did this problem occur**
3. **For each answer, ask "Why?" again**
4. **Repeat until you reach the root cause** (usually around 5 iterations)
5. **Address the root cause**, not just the symptoms

## Example

**Problem:** The website is down

1. **Why?** The server crashed
2. **Why?** It ran out of memory
3. **Why?** A memory leak in the application
4. **Why?** Poor code review process didn't catch the bug
5. **Why?** No automated testing for memory management

**Root Cause:** Lack of automated testing infrastructure

## Best Practices

- Don't stop at the first answer - keep digging
- Involve people who understand the process
- Use facts, not assumptions
- Address the root cause, not symptoms
- Document your analysis`
      },
      {
        id: 'activity-03-02',
        title: 'A3 Problem Solving',
        type: 'reading',
        content: `# A3 Problem Solving

The A3 is a structured problem-solving approach developed by Toyota. Named after the A3-sized paper (11x17 inches) it's written on, this tool forces concise, visual problem-solving.

## The A3 Structure

1. **Background** - What is the context?
2. **Current Condition** - What is happening now?
3. **Goal/Target Condition** - What should be happening?
4. **Root Cause Analysis** - Why is there a gap?
5. **Countermeasures** - What will we do about it?
6. **Implementation Plan** - Who does what by when?
7. **Follow-up** - How will we check results?

## Why Use A3?

- **Forces clarity** - Limited space means focused thinking
- **Visual communication** - Easy to share and discuss
- **Structured approach** - Ensures thorough analysis
- **Documents thinking** - Creates a record of the problem-solving process

## Key Principles

- Go to the gemba (where the work happens)
- Use data and facts
- Involve the people doing the work
- Focus on process, not people
- Iterate and improve`
      },
      {
        id: 'activity-03-03',
        title: 'Fishbone Diagram (Ishikawa)',
        type: 'reading',
        content: `# Fishbone Diagram (Ishikawa Diagram)

The Fishbone Diagram, also known as the Ishikawa Diagram or Cause-and-Effect Diagram, is a visual tool for identifying and organizing potential causes of a problem.

## Structure

The diagram looks like a fish skeleton:
- **Head** - The problem or effect
- **Bones** - Categories of potential causes
- **Sub-bones** - Specific causes within each category

## Common Categories (6 Ms)

1. **Man/People** - Human factors
2. **Method** - Processes and procedures
3. **Machine** - Equipment and tools
4. **Material** - Raw materials and inputs
5. **Measurement** - Data and metrics
6. **Mother Nature/Environment** - External factors

## How to Create One

1. Clearly state the problem at the head
2. Draw the spine and main bones
3. Brainstorm causes for each category
4. Ask "Why?" for each cause
5. Identify the most likely root causes
6. Verify with data

## Benefits

- Organizes complex cause-and-effect relationships
- Encourages team participation
- Helps identify root causes
- Creates visual record of analysis`
      },
      {
        id: 'activity-03-04',
        title: 'Problem Solving Tools Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'q-03-04-01',
            question: 'What is the primary purpose of the 5 Whys technique?',
            options: [
              'To blame someone for the problem',
              'To identify the root cause of a problem',
              'To create more problems',
              'To avoid solving problems'
            ],
            correctAnswer: 1,
            explanation: 'The 5 Whys technique helps peel away symptoms to reveal the underlying root cause of a problem.'
          },
          {
            id: 'q-03-04-02',
            question: 'What does A3 refer to in A3 Problem Solving?',
            options: [
              'A type of car model',
              'The size of paper used (11x17 inches)',
              'A Toyota factory code',
              'The third step in problem solving'
            ],
            correctAnswer: 1,
            explanation: 'A3 refers to the A3-sized paper (11x17 inches) that the problem-solving document is written on.'
          },
          {
            id: 'q-03-04-03',
            question: 'What does the "head" of a Fishbone Diagram represent?',
            options: [
              'The person responsible',
              'The solution',
              'The problem or effect',
              'The first cause'
            ],
            correctAnswer: 2,
            explanation: 'The head of the Fishbone Diagram represents the problem or effect you are analyzing.'
          },
          {
            id: 'q-03-04-04',
            question: 'How many main categories are typically used in a Fishbone Diagram?',
            options: [
              'Three',
              'Four',
              'Six',
              'Eight'
            ],
            correctAnswer: 2,
            explanation: 'The Fishbone Diagram typically uses six main categories, known as the 6 Ms: Man, Method, Machine, Material, Measurement, and Mother Nature.'
          }
        ]
      }
    ]
  },
  {
    id: 'section-04',
    title: 'The Improvement Kata',
    accessLevel: 'free',
    activities: [
      {
        id: 'activity-04-01',
        title: 'Introduction to Improvement Kata',
        type: 'reading',
        content: `# Introduction to Improvement Kata

The Improvement Kata is a systematic approach to continuous improvement developed by Mike Rother. It's a pattern of thinking and acting that helps you navigate uncertainty and improve continuously.

## What is Kata?

In martial arts, a kata is a choreographed pattern of movements practiced to develop skill. Similarly, the Improvement Kata is a pattern of thinking and acting that you practice to develop improvement capability.

## The Four Steps

1. **Understand the Direction** - What is the challenge or vision?
2. **Grasp the Current Condition** - Where are we now?
3. **Establish the Next Target Condition** - Where do we want to be next?
4. **Experiment Toward the Target Condition** - How do we get there?

## Why It Matters

- **Builds capability** - Develops problem-solving muscles
- **Handles uncertainty** - Works when you don't know the answer
- **Creates learning** - Focuses on continuous improvement
- **Empowers people** - Gives everyone a method to improve

## The Scientific Approach

The Improvement Kata uses the scientific method:
- Form a hypothesis
- Design an experiment
- Test the hypothesis
- Learn from results
- Adjust and repeat`
      },
      {
        id: 'activity-04-02',
        title: 'Understanding the Direction',
        type: 'video',
        duration: '12:30',
        videoUrl: '/videos/kata-direction.mp4',
        content: `# Understanding the Direction

The first step in the Improvement Kata is understanding the direction or challenge. This provides context and purpose for your improvement efforts.

## Key Questions

- What is our long-term vision or challenge?
- Why does this matter?
- What are we trying to achieve?
- What is our North Star?

## Characteristics of Good Direction

- **Aspirational** - Beyond current capability
- **Clear** - Easy to understand
- **Meaningful** - Connects to purpose
- **Stable** - Doesn't change frequently

## Examples

- "Become the most customer-centric company"
- "Achieve zero defects"
- "Reduce lead time by 50%"
- "Double our capacity with existing resources"

Watch the video to learn how to identify and articulate your direction.`
      },
      {
        id: 'activity-04-03',
        title: 'Grasping Current Condition',
        type: 'reading',
        content: `# Grasping the Current Condition

Before you can improve, you must understand where you are now. This is about going to the gemba (where the work happens) and observing with fresh eyes.

## How to Grasp Current Condition

1. **Go to the gemba** - Don't rely on reports
2. **Observe the process** - Watch it happen
3. **Measure key metrics** - Quantify what you see
4. **Identify obstacles** - What's preventing the target?
5. **Map the process** - Visualize the flow

## What to Look For

- Actual cycle times
- Wait times and delays
- Quality issues
- Process variations
- Hidden wastes
- Workarounds and shortcuts

## Common Mistakes

- Assuming you know without looking
- Relying only on data and reports
- Spending too little time observing
- Judging instead of learning
- Ignoring process details

## Key Mindset

Approach current condition with:
- **Curiosity** - What's really happening?
- **Humility** - I might be wrong
- **Respect** - Value people's knowledge
- **Patience** - Take time to understand`
      },
      {
        id: 'activity-04-04',
        title: 'Target Condition',
        type: 'reading',
        content: `# Establishing the Target Condition

The Target Condition is where you want to be at a specific point in the near future (typically 2-12 weeks). It's a stepping stone toward your long-term direction.

## Characteristics of Good Target Conditions

1. **Specific** - Clearly defined
2. **Measurable** - You can verify achievement
3. **Achievable** - Within your circle of influence
4. **Time-bound** - Has a deadline
5. **Describes the process** - Not just results

## Target Condition Template

**By [date], we will achieve:**
- [Metric 1]: [Current] → [Target]
- [Metric 2]: [Current] → [Target]
- [Process characteristic]: [Description]

**We will know we've achieved it when:**
- [Observable outcome 1]
- [Observable outcome 2]

## Example

**By March 15, we will achieve:**
- Lead time: 5 days → 3 days
- First-pass quality: 85% → 95%
- Process stability: High variation → Predictable ±10%

**We will know we've achieved it when:**
- Orders consistently ship in 3 days
- Rework reduced by 50%
- Daily metrics show consistent results

## Tips

- Make it challenging but achievable
- Focus on process, not just outcomes
- Start with a short timeframe
- Be specific about what you want to see`
      },
      {
        id: 'activity-04-05',
        title: 'PDCA and Experimentation',
        type: 'reading',
        content: `# PDCA and Experimentation

The PDCA (Plan-Do-Check-Act) cycle is the engine of the Improvement Kata. It's how you experiment your way to the target condition.

## The PDCA Cycle

### Plan
- What do you expect to happen?
- What is your hypothesis?
- How will you test it?
- What will you measure?

### Do
- Run the experiment
- Document what happens
- Collect data
- Stay small and safe

### Check
- What actually happened?
- Did results match prediction?
- What did you learn?
- What was surprising?

### Act
- What's the next experiment?
- Should you adjust the approach?
- Standardize if successful
- Try something different if not

## Rapid Experimentation

- **Small** - Test one change at a time
- **Fast** - Run experiments quickly
- **Safe** - Minimize risk
- **Learning-focused** - Failure teaches

## Experiment Planning

For each experiment, define:
1. **What** are you testing?
2. **Why** do you think it will work?
3. **How** will you test it?
4. **When** will you run it?
5. **Where** will you run it?
6. **Who** will be involved?

## Example Experiment

**Hypothesis:** Reducing batch size from 10 to 5 will reduce lead time

**Plan:** Process 5-unit batches for one day and measure lead time

**Do:** Run the experiment, record data

**Check:** Lead time decreased from 5 days to 3.5 days, as predicted

**Act:** Standardize 5-unit batches and plan next experiment to test batch size of 3`
      },
      {
        id: 'activity-04-06',
        title: 'Improvement Kata Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'q-04-06-01',
            question: 'How many steps are in the Improvement Kata?',
            options: [
              'Two',
              'Three',
              'Four',
              'Five'
            ],
            correctAnswer: 2,
            explanation: 'The Improvement Kata has four steps: Understand the Direction, Grasp Current Condition, Establish Target Condition, and Experiment Toward Target.'
          },
          {
            id: 'q-04-06-02',
            question: 'What does "going to the gemba" mean?',
            options: [
              'Going to the office',
              'Going where the work actually happens',
              'Going to a meeting',
              'Going home'
            ],
            correctAnswer: 1,
            explanation: 'Gemba is a Japanese term meaning "the real place" - where the actual work happens.'
          },
          {
            id: 'q-04-06-03',
            question: 'What is a typical timeframe for a Target Condition?',
            options: [
              '1-2 days',
              '2-12 weeks',
              '6-12 months',
              '2-5 years'
            ],
            correctAnswer: 1,
            explanation: 'A Target Condition is typically set for 2-12 weeks in the future, making it a near-term stepping stone.'
          },
          {
            id: 'q-04-06-04',
            question: 'What does PDCA stand for?',
            options: [
              'Plan-Design-Create-Assess',
              'Plan-Do-Check-Act',
              'Prepare-Deploy-Control-Analyze',
              'Process-Data-Calculate-Apply'
            ],
            correctAnswer: 1,
            explanation: 'PDCA stands for Plan-Do-Check-Act, the continuous improvement cycle.'
          },
          {
            id: 'q-04-06-05',
            question: 'In the Improvement Kata, what is the focus of experiments?',
            options: [
              'Proving you are right',
              'Learning and gaining knowledge',
              'Avoiding failure at all costs',
              'Achieving perfection immediately'
            ],
            correctAnswer: 1,
            explanation: 'Experiments in the Improvement Kata are focused on learning and gaining knowledge, not on being right or avoiding failure.'
          }
        ]
      }
    ]
  },
  {
    id: 'section-05',
    title: 'The 7 Wastes',
    accessLevel: 'free',
    activities: [
      {
        id: 'activity-05-01',
        title: 'Understanding Waste (Muda)',
        type: 'reading',
        content: `# Understanding Waste (Muda)

In Lean thinking, waste (muda in Japanese) is any activity that consumes resources but creates no value for the customer. Identifying and eliminating waste is fundamental to improvement.

## Value vs. Waste

**Value-Adding Activities:**
- Transform the product or service
- Customer willing to pay for it
- Done right the first time

**Non-Value-Adding Activities (Waste):**
- Don't transform the product
- Customer wouldn't pay for it if they knew
- Could be eliminated without affecting output

## The Cost of Waste

Waste impacts your organization through:
- Increased costs
- Longer lead times
- Lower quality
- Reduced capacity
- Employee frustration
- Customer dissatisfaction

## The 7 Wastes (TIMWOOD)

The seven types of waste can be remembered with the acronym TIMWOOD:
- **T**ransportation
- **I**nventory
- **M**otion
- **W**aiting
- **O**verproduction
- **O**verprocessing
- **D**efects

We'll explore each of these in detail in the following activities.`
      },
      {
        id: 'activity-05-02',
        title: 'Transportation Waste',
        type: 'reading',
        content: `# Transportation Waste

Transportation waste occurs when materials, information, or products move unnecessarily. Every movement is an opportunity for damage, delay, and cost without adding value.

## Examples

- Moving materials between buildings
- Excessive email forwarding
- Shipping to remote warehouses and back
- Multiple handoffs between departments
- Long distances between process steps

## Causes

- Poor layout
- Batch processing
- Centralized storage
- Organizational silos
- Lack of planning

## How to Reduce

- Design layouts to minimize distance
- Co-locate related activities
- Use point-of-use storage
- Reduce batch sizes
- Implement pull systems
- Standardize work flow

## Impact

Transportation waste leads to:
- Increased lead time
- Higher costs
- Risk of damage or loss
- Additional handling
- Consumed floor space`
      },
      {
        id: 'activity-05-03',
        title: 'Inventory Waste',
        type: 'reading',
        content: `# Inventory Waste

Inventory waste is having more materials, work-in-progress, or finished goods than needed. While some inventory may be necessary, excess inventory hides problems and ties up resources.

## Types of Inventory

- **Raw materials** - Not yet processed
- **Work-in-progress** - Partially completed
- **Finished goods** - Ready but not delivered
- **Information inventory** - Emails, documents, data waiting to be processed

## Why Inventory Accumulates

- Overproduction
- Long lead times
- Poor scheduling
- Unreliable suppliers
- Just-in-case thinking
- Batch processing

## Hidden Costs

Inventory creates:
- Storage costs
- Obsolescence
- Damage and deterioration
- Hidden quality problems
- Delayed feedback
- Cash tied up
- Difficulty seeing problems

## How to Reduce

- Implement pull systems
- Reduce batch sizes
- Improve reliability
- Shorten lead times
- Better demand forecasting
- Eliminate root causes
- Visual management

## The Power of Low Inventory

Low inventory levels:
- Expose problems quickly
- Increase urgency
- Improve quality
- Reduce waste
- Accelerate learning`
      },
      {
        id: 'activity-05-04',
        title: 'Motion Waste',
        type: 'reading',
        content: `# Motion Waste

Motion waste refers to unnecessary movement by people. While it may seem minor, excessive motion reduces productivity, increases fatigue, and can lead to injuries.

## Examples

- Searching for tools or information
- Reaching for materials
- Walking to printers or supply rooms
- Excessive mouse clicking or scrolling
- Bending or stretching repeatedly
- Switching between applications
- Looking for emails or files

## Causes

- Poor workplace organization
- Inadequate tools
- Poor layout design
- Missing information
- Lack of standardization
- Bad ergonomics

## How to Identify

- Observe the work
- Track movements
- Use spaghetti diagrams
- Ask workers
- Time studies
- Video analysis

## How to Reduce

- Organize workspace (5S)
- Position tools and materials within reach
- Use visual management
- Standardize work
- Improve ergonomics
- Eliminate searching
- Create better systems

## Benefits of Reduction

- Increased productivity
- Reduced fatigue
- Fewer injuries
- Better quality
- Improved morale
- Faster completion`
      },
      {
        id: 'activity-05-05',
        title: 'The 7 Wastes Quiz - Part 1',
        type: 'quiz',
        questions: [
          {
            id: 'q-05-05-01',
            question: 'What does the acronym TIMWOOD stand for?',
            options: [
              'The seven types of waste in Lean',
              'A project management methodology',
              'A type of manufacturing equipment',
              'A quality control framework'
            ],
            correctAnswer: 0,
            explanation: 'TIMWOOD is a mnemonic for the seven types of waste: Transportation, Inventory, Motion, Waiting, Overproduction, Overprocessing, and Defects.'
          },
          {
            id: 'q-05-05-02',
            question: 'Transportation waste refers to:',
            options: [
              'The cost of shipping products',
              'Unnecessary movement of materials or information',
              'Using trucks instead of trains',
              'Long-distance travel by employees'
            ],
            correctAnswer: 1,
            explanation: 'Transportation waste is the unnecessary movement of materials, information, or products that doesn\'t add value.'
          },
          {
            id: 'q-05-05-03',
            question: 'What is a major problem with excess inventory?',
            options: [
              'It improves efficiency',
              'It hides underlying problems',
              'It reduces costs',
              'It speeds up processes'
            ],
            correctAnswer: 1,
            explanation: 'Excess inventory hides problems such as quality issues, process inefficiencies, and supply chain problems.'
          },
          {
            id: 'q-05-05-04',
            question: 'Motion waste includes:',
            options: [
              'Moving products between facilities',
              'Unnecessary movement by people',
              'Exercise during breaks',
              'Walking to meetings'
            ],
            correctAnswer: 1,
            explanation: 'Motion waste refers to unnecessary movement by people, such as searching, reaching, or walking that doesn\'t add value.'
          }
        ]
      },
      {
        id: 'activity-05-06',
        title: 'Waiting Waste',
        type: 'reading',
        content: `# Waiting Waste

Waiting waste occurs whenever work or information is idle, waiting for the next step. This is often the easiest waste to see but can be the hardest to eliminate.

## Examples

- Waiting for approvals
- Waiting for information
- Waiting for equipment
- Waiting for materials
- Waiting for meetings
- Downtime due to breakdowns
- Waiting for batch to complete

## Causes

- Unbalanced processes
- Batch processing
- Unreliable equipment
- Poor scheduling
- Approval bottlenecks
- Lack of resources
- Sequential vs. parallel work

## Impact

Waiting creates:
- Longer lead times
- Reduced throughput
- Lower resource utilization
- Bored or frustrated workers
- Delayed feedback
- Quality issues
- Customer dissatisfaction

## How to Reduce

- Balance workflow
- Eliminate approvals
- Improve reliability
- Reduce batch sizes
- Create parallel paths
- Cross-train workers
- Visual management
- Pull systems

## Hidden Waiting

Watch for:
- Work sitting in queues
- Emails awaiting response
- Documents pending review
- Projects on hold
- Partially completed work`
      },
      {
        id: 'activity-05-07',
        title: 'Overproduction Waste',
        type: 'reading',
        content: `# Overproduction Waste

Overproduction is making more, sooner, or faster than needed. It's considered the worst waste because it causes and amplifies all other wastes.

## Two Types

**Making Too Much:**
- Producing beyond demand
- Creating excess inventory
- Building features no one wants

**Making Too Soon:**
- Producing before needed
- Starting work prematurely
- Creating work-in-progress

## Why It's the Worst Waste

Overproduction leads to:
- Inventory waste (excess products)
- Transportation waste (moving excess)
- Motion waste (handling extra items)
- Waiting waste (queues build up)
- Overprocessing (working on wrong things)
- Defects (quality issues in excess)

## Root Causes

- Large batch sizes
- Long setup times
- Efficiency mindset
- Just-in-case thinking
- Poor scheduling
- Lack of demand visibility
- Incentive systems
- Inflexible equipment

## How to Prevent

- Build to actual demand
- Implement pull systems
- Reduce batch sizes
- Improve flexibility
- Level production
- Better forecasting
- Just-in-time delivery
- Visual demand signals

## Cultural Shift

Moving away from overproduction requires:
- Trust in the system
- Letting go of "just in case"
- Measuring flow, not efficiency
- Accepting some idle time
- Focusing on customer pull`
      },
      {
        id: 'activity-05-08',
        title: 'Overprocessing and Defects',
        type: 'reading',
        content: `# Overprocessing Waste

Overprocessing means doing more work than the customer requires or values. It's working harder than necessary.

## Examples

- Excessive documentation
- Multiple approvals
- Unnecessary features
- Too much detail
- Redundant data entry
- Excessive reporting
- Gold-plating solutions
- Over-engineering

## Causes

- Unclear requirements
- Poor communication
- Legacy processes
- Risk aversion
- Perfectionism
- Lack of standards
- Outdated procedures

## How to Eliminate

- Understand customer value
- Challenge requirements
- Simplify processes
- Standardize work
- Eliminate redundancy
- Question every step
- Focus on "good enough"

---

# Defects Waste

Defects are work that contains errors, is incomplete, or is incorrect. They require rework, inspection, and create customer dissatisfaction.

## Examples

- Errors in documents
- Software bugs
- Incorrect orders
- Missing information
- Quality failures
- Rework
- Scrap
- Customer complaints

## Impact

Defects cause:
- Rework time and cost
- Inspection overhead
- Warranty costs
- Lost customers
- Damaged reputation
- Firefighting
- Low morale

## Root Causes

- Lack of training
- Poor processes
- Inadequate tools
- Unclear standards
- Rushing
- Lack of checking
- Poor communication

## Prevention

- Build quality in
- Mistake-proofing (poka-yoke)
- Standard work
- Training
- Visual management
- Root cause analysis
- Process design
- Feedback loops`
      },
      {
        id: 'activity-05-09',
        title: 'The 7 Wastes Quiz - Part 2',
        type: 'quiz',
        questions: [
          {
            id: 'q-05-09-01',
            question: 'Why is overproduction considered the worst waste?',
            options: [
              'It costs the most money',
              'It causes and amplifies all other wastes',
              'It is the most common waste',
              'It is impossible to eliminate'
            ],
            correctAnswer: 1,
            explanation: 'Overproduction is considered the worst waste because it leads to and amplifies all other types of waste.'
          },
          {
            id: 'q-05-09-02',
            question: 'Waiting waste can be reduced by:',
            options: [
              'Hiring more people',
              'Working faster',
              'Balancing workflow and eliminating bottlenecks',
              'Adding more inventory'
            ],
            correctAnswer: 2,
            explanation: 'Balancing workflow and eliminating bottlenecks helps reduce waiting waste by ensuring smooth flow.'
          },
          {
            id: 'q-05-09-03',
            question: 'Overprocessing waste includes:',
            options: [
              'Working too slowly',
              'Doing more work than the customer requires',
              'Using too many machines',
              'Hiring too many processors'
            ],
            correctAnswer: 1,
            explanation: 'Overprocessing means doing more work than necessary or adding features the customer doesn\'t value.'
          },
          {
            id: 'q-05-09-04',
            question: 'The best way to handle defects is to:',
            options: [
              'Inspect everything at the end',
              'Build quality in from the start',
              'Hire more quality inspectors',
              'Accept some defects as normal'
            ],
            correctAnswer: 1,
            explanation: 'Building quality in from the start prevents defects rather than trying to inspect them out later.'
          },
          {
            id: 'q-05-09-05',
            question: 'What is the eighth waste often added to the original seven?',
            options: [
              'Unused talent/creativity',
              'Too many meetings',
              'Email overload',
              'Social media distractions'
            ],
            correctAnswer: 0,
            explanation: 'Unused talent and creativity of people is often considered the eighth waste - not utilizing people\'s full capabilities.'
          }
        ]
      }
    ]
  },
  {
    id: 'section-06',
    title: 'Visual Management',
    accessLevel: 'paid',
    activities: [
      {
        id: 'activity-06-01',
        title: 'Introduction to Visual Management',
        type: 'reading',
        content: `# Introduction to Visual Management

Visual management is the practice of making important information visible, so anyone can understand the current state at a glance. It's a cornerstone of Lean thinking and continuous improvement.

## What is Visual Management?

Visual management uses visual signals instead of texts or verbal instructions. These visuals make it easy to:
- See the standard
- See the current status
- See deviations from the standard
- Know what action to take

## Core Principles

1. **Visual is better than verbal** - Seeing beats hearing
2. **Simplicity** - Easy to understand in seconds
3. **Standardization** - Consistent across the organization
4. **Location** - Information where it's needed
5. **Actionable** - Clear what to do

## Benefits

- Faster problem identification
- Better communication
- Reduced errors
- Increased transparency
- Empowered employees
- Faster training
- Improved engagement

## Levels of Visual Management

1. **Visual Indicator** - Shows information
2. **Visual Signal** - Alerts to abnormality
3. **Visual Control** - Makes it obvious what to do
4. **Visual Guarantee** - Makes it impossible to do wrong

In the following activities, we'll explore specific visual management tools and techniques.`
      },
      {
        id: 'activity-06-02',
        title: 'Kanban Boards',
        type: 'video',
        duration: '18:45',
        videoUrl: '/videos/kanban-boards.mp4',
        content: `# Kanban Boards

A Kanban board is a visual tool that helps teams manage work in progress and optimize flow. Originally developed for manufacturing, it's now widely used in knowledge work.

## Basic Structure

A Kanban board typically has three columns:
- **To Do** - Work not yet started
- **In Progress** - Work being done now
- **Done** - Completed work

## Key Elements

1. **Cards** - Represent individual work items
2. **Columns** - Represent stages of work
3. **WIP Limits** - Maximum items in each column
4. **Swimlanes** - Horizontal rows for categorization

## Core Practices

- **Visualize workflow** - Make work visible
- **Limit WIP** - Restrict work in progress
- **Manage flow** - Optimize movement through system
- **Make policies explicit** - Clear rules
- **Feedback loops** - Regular reviews
- **Improve collaboratively** - Team-driven improvement

## Benefits

- Visibility of all work
- Identifies bottlenecks
- Limits overload
- Improves flow
- Reduces cycle time
- Increases collaboration

Watch the video to see Kanban boards in action and learn how to set one up for your team.`
      },
      {
        id: 'activity-06-03',
        title: 'Visual Management Quiz',
        type: 'quiz',
        questions: [
          {
            id: 'q-06-03-01',
            question: 'What is the main purpose of visual management?',
            options: [
              'To make the workplace look nice',
              'To make important information visible at a glance',
              'To replace all written documentation',
              'To create more work for employees'
            ],
            correctAnswer: 1,
            explanation: 'Visual management makes important information visible so anyone can quickly understand the current state.'
          },
          {
            id: 'q-06-03-02',
            question: 'What does WIP stand for in Kanban?',
            options: [
              'Work In Production',
              'Work In Progress',
              'Workers In Process',
              'Workflow Implementation Plan'
            ],
            correctAnswer: 1,
            explanation: 'WIP stands for Work In Progress - the amount of work currently being worked on.'
          },
          {
            id: 'q-06-03-03',
            question: 'What is the highest level of visual management?',
            options: [
              'Visual Indicator',
              'Visual Signal',
              'Visual Control',
              'Visual Guarantee'
            ],
            correctAnswer: 3,
            explanation: 'Visual Guarantee is the highest level - it makes it impossible to do the wrong thing.'
          }
        ]
      }
    ]
  }
];

export const courseMetadata = {
  id: 'service-physics-problem-solving-101',
  title: 'Service Physics Problem Solving 101',
  description: 'A comprehensive training program focused on problem-solving methodologies, continuous improvement techniques, and practical application of problem-solving frameworks. Master the Improvement Kata, PDCA cycle, and Lean principles.',
  totalSections: 6,
  instructor: 'Service Physics Academy',
  estimatedDuration: '8-10 hours',
  skillLevel: 'Beginner to Intermediate',
  learningOutcomes: [
    'Apply the Improvement Kata methodology to solve problems systematically',
    'Use PDCA cycles to experiment and learn',
    'Identify and eliminate the 7 types of waste',
    'Utilize problem-solving tools like 5 Whys, A3, and Fishbone diagrams',
    'Implement visual management techniques',
    'Define clear problem statements and target conditions'
  ]
};
