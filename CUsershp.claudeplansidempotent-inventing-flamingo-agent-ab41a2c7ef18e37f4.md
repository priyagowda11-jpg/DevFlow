# Project and Task Management Exploration Plan

## Goal
Identify why 'Create Project' buttons are unreliable, map the data flow from ProjectForm -> ProjectModal -> storage, and check how tasks are associated with projects.

## Analysis of Current Findings
- **Project Creation Bugs**:
    - `ProjectForm.tsx` initializes `formData` with `stack` but uses `technologies` in the input and `onSubmit`.
    - `ProjectForm.tsx` uses `repositoryUrl` and `demoUrl` in inputs, but `ProjectModal.tsx` expects `githubUrl` and `liveUrl`.
    - `ProjectForm.tsx` attempts `.split(',')` on `formData.technologies` which is initially undefined, likely causing a crash.
    - `ProjectForm.tsx` sends `technologies` array, but `ProjectModal.tsx` looks for `data.stack`.

## Planned Steps

### 1. Deep Dive into Project Creation
- [ ] Confirm bugs in `ProjectForm.tsx` and `ProjectModal.tsx` through code analysis.
- [ ] Check `types/project.ts` and `types/index.ts` to see the expected `Project` interface.

### 2. Investigate Task-Project Association
- [ ] Read `components/tasks/TaskModal.tsx` to see how projects are selected and `projectId` is passed.
- [ ] Read `context/ProjectContext.tsx` to examine `addTask`, `updateTask`, and `allTasks` management.
- [ ] Read `lib/storage.ts` to understand how projects and tasks are stored and linked.
- [ ] Read `lib/task-state.ts` to see its role in task management.

### 3. Data Flow Mapping
- [ ] Map `ProjectForm` -> `ProjectModal` -> `storage.addProject`.
- [ ] Map `TaskModal` -> `ProjectContext` -> `storage`/`task-state`.

### 4. Final Report
- [ ] Synthesize findings into a clear report.
- [ ] Identify exactly where the 'Create Project' buttons fail.
- [ ] Identify any missing or broken links in task-project associations.
