# Implementation Plan: Step 4 - Learning Platform

This plan outlines the implementation of the core learning experience for DevFlow, including course discovery, progress tracking, and the lesson interface.

## 1. Data Architecture

### Type Definitions (`types/index.ts`)
We will expand the type system to support a structured curriculum.
- `Difficulty`: `'Beginner' | 'Intermediate' | 'Advanced'`
- `Category`: `'Frontend' | 'Backend' | 'DevOps' | 'Mobile' | 'CS Fundamentals'`
- `Lesson`:
  - `id: string`
  - `title: string`
  - `content: string` (Rich text/Markdown)
  - `codeExamples: Array<{ language: string, code: string, description: string }>`
  - `exercises: Array<{ question: string, answer: string }>`
- `Module`:
  - `id: string`
  - `title: string`
  - `lessons: Lesson[]`
- `Course`:
  - `id: string`
  - `title: string`
  - `description: string`
  - `category: Category`
  - `difficulty: Difficulty`
  - `thumbnail: string`
  - `modules: Module[]`
  - `averageTime: string`
- `UserCourseProgress`:
  - `courseId: string`
  - `enrolledAt: string`
  - `completedLessonIds: string[]`
  - `currentLessonId: string`

### Mock Dataset (`data/course-data.ts`)
Create a realistic set of 8+ courses:
- React Mastery (Frontend, Beginner)
- Next.js 15 Deep Dive (Frontend, Intermediate)
- Node.js Backend Architecture (Backend, Intermediate)
- Python for Data Science (CS Fundamentals, Beginner)
- Git & GitHub Workflow (DevOps, Beginner)
- TypeScript Advanced Patterns (Frontend, Advanced)
- Docker & Kubernetes Essentials (DevOps, Intermediate)
- System Design Primer (CS Fundamentals, Advanced)

## 2. Local Learning State (`lib/learning-state.ts`)

A centralized state manager using `localStorage` to persist progress without a backend.

### State Structure
`localStorage.getItem('devflow_learning_progress')` will store a map of `courseId` to `UserCourseProgress`.

### Key Logic
- `enrollInCourse(courseId: string)`: Initializes `UserCourseProgress` for a course.
- `markLessonComplete(courseId: string, lessonId: string)`: Adds `lessonId` to `completedLessonIds` and persists.
- `calculateCourseProgress(courseId: string)`: 
  - `(completedLessons.length / totalLessonsInCourse) * 100`
- `getActiveLesson(courseId: string)`: Returns the `currentLessonId` or the first incomplete lesson.
- `setActiveLesson(courseId: string, lessonId: string)`: Updates `currentLessonId`.

## 3. Core Learning Pages

### `/learning` (Personalized Hub)
- **Continue Learning**: A high-visibility card showing the current active course, the last lesson visited, and a "Resume" button.
- **Enrolled Courses**: A grid of `CourseCard`s for all courses the user has started, showing progress bars.
- **Recommended for You**: A curated list of courses the user hasn't enrolled in yet.

### `/courses` (Discovery)
- **Search**: Real-time filtering of courses by title or skill tags.
- **Filters**: 
  - Category dropdown (Frontend, Backend, etc.)
  - Difficulty chips (Beginner, Intermediate, Advanced)
- **Grid Layout**: A responsive grid of `CourseCard`s.

### `/courses/[courseId]` (Course Detail)
- **Hero Section**: Title, category, difficulty, and a large "Enroll Now" or "Continue" button.
- **Stats**: Total modules, total lessons, estimated time.
- **Curriculum Tree**: A structured list of Modules $\rightarrow$ Lessons. 
  - Lessons show a checkmark if completed.
  - Lock icons for locked lessons (if sequential progression is enabled).

### `/courses/[courseId]/lessons/[lessonId]` (Lesson Interface)
- **Layout**: 3-column split.
  - **Left (Curriculum)**: Collapsible sidebar with the course structure. Highlights the active lesson.
  - **Center (Content)**: The primary learning area. Renders `LessonContent` with rich text and formatted code blocks.
  - **Right (Navigation/Progress)**: 
    - Course progress percentage.
    - "Previous Lesson" and "Next Lesson" buttons.
    - "Mark as Complete" button with a success animation.

## 4. UI Components (`components/learning/`)

- **CourseCard**: 
  - Visuals: Thumbnail, title, tags, progress bar (if enrolled), "Start Course" or "Resume" button.
- **CourseFilters**: 
  - Input for search.
  - Filter groups for categories and difficulty.
- **LessonContent**: 
  - Custom rendering for text.
  - `CodeBlock` component: Monospace font, syntax-highlighted look, copy button.
- **EmptyState**: Styled placeholder for "No courses found" or "You haven't enrolled in any courses yet".
- **ErrorState**: Centered error message with a "Back to Courses" button.

## 5. Design & Accessibility

### Content Styling (`app/globals.css`)
Add dedicated styles for the learning experience:
- `.learning-code-block`: Dark background (`--color-neutral-900`), rounded corners, padding, border, monospaced font.
- `.learning-text-body`: Optimized line-height and spacing for long-form reading.
- `.progress-bar-fill`: Smooth transition animation when progress increases.

### Responsive Behavior
- **Mobile**: 
  - Curriculum sidebar becomes a slide-over menu.
  - 3-column layout collapses to a single column (Content $\rightarrow$ Nav $\rightarrow$ Curriculum).

## 6. Verification Strategy

### E2E Test Flow
1. **Discovery**: Visit `/courses` $\rightarrow$ Search "React" $\rightarrow$ Click "React Mastery".
2. **Enrollment**: On `/courses/react-mastery` $\rightarrow$ Click "Enroll Now" $\rightarrow$ Verify the button changes to "Start Learning".
3. **Learning**: Navigate to first lesson $\rightarrow$ Read content $\rightarrow$ Click "Mark as Complete".
4. **Progression**: Verify "Next Lesson" button appears/activates $\rightarrow$ Navigate to second lesson.
5. **Persistence**: Refresh page $\rightarrow$ Verify course is still enrolled and lesson is still marked complete.
6. **Hub**: Visit `/learning` $\rightarrow$ Verify "React Mastery" appears in "Continue Learning" with correct progress %.

## Implementation Sequence

1. `types/index.ts` (Update types)
2. `data/course-data.ts` (Create mock data)
3. `lib/learning-state.ts` (Persistence logic)
4. `components/learning/CourseCard.tsx` & `CourseFilters.tsx`
5. `app/(authenticated)/courses/page.tsx` (Course Discovery)
6. `app/(authenticated)/learning/page.tsx` (Learning Hub)
7. `app/(authenticated)/courses/[courseId]/page.tsx` (Course Detail)
8. `components/learning/LessonContent.tsx` & `CodeBlock.tsx`
9. `app/(authenticated)/courses/[courseId]/lessons/[lessonId]/page.tsx` (Lesson Page)
10. `app/globals.css` (Styling polish)
