import { Course } from '@/types';

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Full Stack Web Development',
    description: 'Master the art of building complete web applications from scratch using the modern MERN stack.',
    instructor: 'Sarah Drasner',
    category: 'Full Stack',
    difficulty: 'Beginner',
    duration: '12 Weeks',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'CSS'],
    modules: [
      {
        id: 'mod-1',
        title: 'Web Fundamentals',
        lessons: [
          {
            id: 'les-1-1',
            title: 'HTML Foundations',
            content: 'HTML is the skeleton of every webpage. In this lesson, we cover semantic tags and structure.',
            codeExamples: [{ title: 'Basic HTML', language: 'html', code: '<div>Hello World</div>' }],
            keyPoints: ['Semantic HTML', 'DOM structure', 'Accessibility'],
            duration: '15m'
          },
          {
            id: 'les-1-2',
            title: 'CSS Fundamentals',
            content: 'Styling your HTML to make it visually appealing using modern CSS techniques.',
            codeExamples: [{ title: 'CSS Flexbox', language: 'css', code: '.container { display: flex; }' }],
            keyPoints: ['Box Model', 'Flexbox', 'CSS Grid'],
            duration: '20m'
          },
          {
            id: 'les-1-3',
            title: 'Responsive Design',
            content: 'Ensure your website looks great on all devices using media queries and fluid grids.',
            codeExamples: [{ title: 'Media Query', language: 'css', code: '@media (max-width: 600px) { ... }' }],
            keyPoints: ['Mobile First', 'Viewports', 'Fluid Layouts'],
            duration: '25m'
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'JavaScript Mastery',
        lessons: [
          {
            id: 'les-2-1',
            title: 'JavaScript Fundamentals',
            content: 'The core concepts of JS: variables, types, and basic logic.',
            codeExamples: [{ title: 'Variable Declaration', language: 'javascript', code: 'const greeting = "Hello";' }],
            keyPoints: ['Scope', 'Closure', 'Hoisting'],
            duration: '30m'
          },
          {
            id: 'les-2-2',
            title: 'Async JavaScript',
            content: 'Handling asynchronous operations with Promises and Async/Await.',
            codeExamples: [{ title: 'Async/Await', language: 'javascript', code: 'async function getData() { await fetch(...) }' }],
            keyPoints: ['Event Loop', 'Promises', 'Callbacks'],
            duration: '30m'
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'React & TypeScript',
    description: 'Build type-safe, scalable user interfaces with the most popular frontend library.',
    instructor: 'Dan Abramov',
    category: 'Frontend',
    difficulty: 'Intermediate',
    duration: '8 Weeks',
    skills: ['React', 'TypeScript', 'Hooks', 'State Management'],
    modules: [
      {
        id: 'mod-rt-1',
        title: 'React Fundamentals',
        lessons: [
          {
            id: 'les-rt-1',
            title: 'What is a Component?',
            content: 'Components are the building blocks of React applications. They allow you to split the UI into independent, reusable pieces.',
            codeExamples: [{ title: 'Simple Component', language: 'typescript', code: 'const Welcome = () => <h1>Hello!</h1>;' }],
            keyPoints: ['Reusability', 'Composition', 'Declarative UI'],
            duration: '20m'
          },
          {
            id: 'les-rt-2',
            title: 'JSX and Props',
            content: 'JSX allows us to write HTML-like code in JS. Props are used to pass data from parent to child components.',
            codeExamples: [{ title: 'Using Props', language: 'typescript', code: 'const User = ({ name }: { name: string }) => <div>{name}</div>;' }],
            keyPoints: ['Dynamic content', 'Unidirectional data flow', 'Props typing'],
            duration: '25m'
          }
        ]
      },
      {
        id: 'mod-rt-2',
        title: 'State Management',
        lessons: [
          {
            id: 'les-rt-3',
            title: 'useState Hook',
            content: 'Manage local state within a component to make it interactive.',
            codeExamples: [{ title: 'useState example', language: 'typescript', code: 'const [count, setCount] = useState(0);' }],
            keyPoints: ['State updates', 'Asynchronous nature', 'Re-renders'],
            duration: '30m'
          },
          {
            id: 'les-rt-4',
            title: 'useEffect and Lifecycle',
            content: 'Handling side effects like API calls or manual DOM manipulations.',
            codeExamples: [{ title: 'useEffect fetch', language: 'typescript', code: 'useEffect(() => { fetchData(); }, []);' }],
            keyPoints: ['Dependency array', 'Cleanup functions', 'Mounting/Unmounting'],
            duration: '30m'
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Next.js Development',
    description: 'Build production-ready applications with Server-Side Rendering and Static Site Generation.',
    instructor: 'Lee Robinson',
    category: 'Frontend',
    difficulty: 'Intermediate',
    duration: '6 Weeks',
    skills: ['Next.js', 'React', 'SSR', 'SSG', 'App Router'],
    modules: [
      {
        id: 'mod-nx-1',
        title: 'Core Concepts',
        lessons: [
          {
            id: 'les-nx-1',
            title: 'The App Router',
            content: 'Understanding the new file-based routing system in Next.js 13+.',
            codeExamples: [{ title: 'Route Structure', language: 'typescript', code: '// app/about/page.tsx' }],
            keyPoints: ['Layouts', 'Pages', 'Nested Routes'],
            duration: '30m'
          }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Node.js & REST APIs',
    description: 'Build scalable backend services and secure APIs with Node.js and Express.',
    instructor: 'Ryan Dahl',
    category: 'Backend',
    difficulty: 'Intermediate',
    duration: '10 Weeks',
    skills: ['Node.js', 'Express', 'REST', 'Middleware', 'Authentication'],
    modules: [
      {
        id: 'mod-node-1',
        title: 'Server Basics',
        lessons: [
          {
            id: 'les-node-1',
            title: 'Event Loop',
            content: 'Deep dive into how Node.js handles concurrency.',
            codeExamples: [{ title: 'setTimeout', language: 'javascript', code: 'setTimeout(() => console.log("Hi"), 100);' }],
            keyPoints: ['Call Stack', 'Task Queue', 'Non-blocking I/O'],
            duration: '40m'
          }
        ]
      }
    ]
  },
  {
    id: 'course-5',
    title: 'Python for Developers',
    description: 'Leverage Python for scripting, automation, and data processing.',
    instructor: 'Guido van Rossum',
    category: 'Programming',
    difficulty: 'Beginner',
    duration: '8 Weeks',
    skills: ['Python', 'Scripting', 'Data Analysis', 'Automation'],
    modules: [
      {
        id: 'mod-py-1',
        title: 'Python Core',
        lessons: [
          {
            id: 'les-py-1',
            title: 'Data Structures',
            content: 'Mastering lists, dictionaries, and tuples in Python.',
            codeExamples: [{ title: 'Dict Example', language: 'python', code: 'my_dict = {"key": "value"}' }],
            keyPoints: ['Immutability', 'Indexing', 'Key-Value pairs'],
            duration: '30m'
          }
        ]
      }
    ]
  },
  {
    id: 'course-6',
    title: 'Git & GitHub',
    description: 'Master version control and collaborative development workflows.',
    instructor: 'Linus Torvalds',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '4 Weeks',
    skills: ['Git', 'GitHub', 'Branching', 'Pull Requests'],
    modules: [
      {
        id: 'mod-git-1',
        title: 'VCS Basics',
        lessons: [
          {
            id: 'les-git-1',
            title: 'The Git Workflow',
            content: 'Understanding the staging area and commit history.',
            codeExamples: [{ title: 'Commit', language: 'bash', code: 'git commit -m "Initial commit"' }],
            keyPoints: ['Staging', 'Committing', 'History'],
            duration: '20m'
          }
        ]
      }
    ]
  },
  {
    id: 'course-7',
    title: 'Database Fundamentals',
    description: 'Design efficient data models for relational and non-relational databases.',
    instructor: 'Michael Stonebraker',
    category: 'Programming',
    difficulty: 'Intermediate',
    duration: '10 Weeks',
    skills: ['SQL', 'MongoDB', 'Schema Design', 'Indexing'],
    modules: [
      {
        id: 'mod-db-1',
        title: 'Relational Databases',
        lessons: [
          {
            id: 'les-db-1',
            title: 'Normalization',
            content: 'Organizing data to reduce redundancy and improve integrity.',
            codeExamples: [{ title: 'JOIN Example', language: 'sql', code: 'SELECT * FROM users JOIN orders ON users.id = orders.user_id;' }],
            keyPoints: ['1NF', '2NF', '3NF', 'Referential Integrity'],
            duration: '45m'
          }
        ]
      }
    ]
  },
  {
    id: 'course-8',
    title: 'AI Engineering Foundations',
    description: 'Introduction to building LLM-powered applications and AI agent architectures.',
    instructor: 'Andrej Karpathy',
    category: 'AI',
    difficulty: 'Advanced',
    duration: '12 Weeks',
    skills: ['LLMs', 'Prompt Engineering', 'RAG', 'AI Agents'],
    modules: [
      {
        id: 'mod-ai-1',
        title: 'LLM Basics',
        lessons: [
          {
            id: 'les-ai-1',
            title: 'Prompt Design',
            content: 'The art of guiding LLMs to produce high-quality, consistent outputs.',
            codeExamples: [{ title: 'System Prompt', language: 'markdown', code: 'You are a professional code reviewer...' }],
            keyPoints: ['Few-shot prompting', 'Chain-of-thought', 'System messages'],
            duration: '40m'
          }
        ]
      }
    ]
  }
];
