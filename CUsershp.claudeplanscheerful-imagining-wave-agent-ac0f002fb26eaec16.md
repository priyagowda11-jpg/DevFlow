# Implementation Plan: Step 2 - Authentication + Student Data System

## Overview
Implement a frontend-only authentication system and student data management layer for DevFlow. The system will use `localStorage` for persistence but follow a service-oriented architecture to allow seamless replacement with a real backend API in the future.

## 1. Data Modeling (`types/index.ts`)
Define the core data structures to ensure type safety across the application.

- **`Student` Type**:
  - `id`: string (UUID)
  - `fullName`: string
  - `email`: string
  - `password`: string
  - `college`: string
  - `branch`: string
  - `semester`: number
  - `skills`: string[]
  - `github`: string
  - `linkedin`: string
  - `profilePhoto`: string | null
  - `createdAt`: string (ISO date)

- **`AuthSession` Type**:
  - `userId`: string
  - `token`: string (mock token)
  - `expiresAt`: string

## 2. Authentication Layer

### 2.1 `lib/auth-service.ts` (The "Mock API")
This file will encapsulate all `localStorage` interactions. It should be written as if it were making async API calls (using `Promise`) to simplify future migration.

- **Functions**:
  - `register(studentData: Omit<Student, 'id' | 'createdAt'>)`: 
    - Validate if email already exists in `localStorage`.
    - Generate UUID and timestamp.
    - Save student to `localStorage` (array of students).
  - `login(email, password)`: 
    - Find student by email.
    - Verify password.
    - Create and save `AuthSession` to `localStorage`.
  - `logout()`: Clear `AuthSession` from `localStorage`.
  - `getCurrentUser()`: Retrieve the student object based on the current `AuthSession`.
  - `updateProfile(id, updates)`: Update specific student record in `localStorage`.

### 2.2 `context/AuthContext.tsx` (Global State)
React Context to provide authentication state and methods to the entire component tree.

- **State**:
  - `user`: `Student | null`
  - `isLoading`: `boolean` (true during initial session check)
- **Context Methods**:
  - `signIn(email, password)`: Calls `authService.login` $\rightarrow$ updates `user` state.
  - `signUp(data)`: Calls `authService.register` $\rightarrow$ updates `user` state.
  - `signOut()`: Calls `authService.logout` $\rightarrow$ clears `user` state.
  - `updateUser(updates)`: Calls `authService.updateProfile` $\rightarrow$ updates `user` state.
- **Persistence**: `useEffect` on mount to call `authService.getCurrentUser()` and populate state.

## 3. Routing & Protection

### 3.1 `components/auth/ProtectedRoute.tsx`
A wrapper component to handle access control.

- **Logic**:
  - If `isLoading` is true $\rightarrow$ render `Skeleton` loader.
  - If `!user` and route is protected $\rightarrow$ redirect to `/login`.
  - If `user` and route is `/login` or `/register` $\rightarrow$ redirect to `/dashboard`.
  - Otherwise $\rightarrow$ render children.

### 3.2 Application Layout
Wrap the root layout (or specific route groups) in `AuthProvider`.

## 4. UI Implementation

### 4.1 Public Pages
- **Landing Page (`/`)**:
  - Hero Section: High-impact heading, professional subtext.
  - Benefits Grid: 3-4 cards highlighting DevFlow features.
  - Primary CTAs: "Get Started" (to `/register`) and "Sign In" (to `/login`).
- **Register Page (`/register`)**:
  - Form with fields: Full Name, Email, Password, Confirm Password, College, Branch, Semester.
  - Validation: Email format, password strength, password match, required fields.
  - Error handling: Display inline error messages.
- **Login Page (`/login`)**:
  - Form with Email and Password.
  - "Forgot Password?" link (UI only).
  - Validation: Required fields.

### 4.2 Protected Experience
- **Dashboard (`/dashboard`)**:
  - Header: "Welcome back, [User Name]!"
  - Empty state/Placeholder for future modules.
- **Profile Page (`/profile`)**:
  - View Mode: Display all `Student` data using `Card` components.
  - Edit Mode: Form to update profile details.
  - Use `Avatar` component to display initials if `profilePhoto` is null.
- **Settings Page (`/settings`)**:
  - Account Management: Change password (mock).
  - Session Management: "Logout" button.

## 5. UX & Accessibility Standards
- **Loading States**: Use `Skeleton` components for page transitions and initial auth checks.
- **Error Handling**: 
  - Use consistent error messaging (e.g., "Invalid email or password").
  - Ensure errors are accessible via screen readers (aria-live).
- **Responsiveness**: Use Tailwind CSS to ensure forms and layouts work on mobile, tablet, and desktop.
- **Accessibility**: 
  - Proper `<label>` for every `<input>`.
  - Keyboard navigation for all forms (Tab order).
  - High contrast ratios for text and buttons.

## 6. Implementation Sequence

1. **Types**: Create `types/index.ts`.
2. **Service**: Implement `lib/auth-service.ts`.
3. **Context**: Implement `context/AuthContext.tsx`.
4. **Protection**: Implement `components/auth/ProtectedRoute.tsx`.
5. **Landing**: Build the Hero and CTAs on `/`.
6. **Auth Pages**: Build `/register` $\rightarrow$ `/login`.
7. **Protected Pages**: Build `/dashboard` $\rightarrow$ `/profile` $\rightarrow$ `/settings`.
8. **Refinement**: Add `Skeleton` loaders and final accessibility audit.

## Critical Files for Implementation
- `types/index.ts`
- `lib/auth-service.ts`
- `context/AuthContext.tsx`
- `components/auth/ProtectedRoute.tsx`
- `app/layout.tsx` (to add AuthProvider)
