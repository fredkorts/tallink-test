# Writing React Code - Philosophy & Principles

When I build a React + TypeScript app, I try to optimize for **clarity**, **predictability**, and **change over time**. Code is read many more times than it's written, so I bias toward things that are boring, obvious, and easy to modify.

Here's how that breaks down in my head.

---

## 1. Overall Philosophy

### Start from behavior & UX, not code structure

- Understand the user flows and edge cases first
- Sketch state transitions ("what can happen on this screen?") before choosing libraries
- Avoid over-engineering on day one; grow complexity only when needed

### Single source of truth for each piece of data

- Every important bit of state has a clear owner: URL, global store, React Query cache, local component
- Data flows one way, side effects are explicit and centralized (e.g. in hooks or services)

### Types as a design tool, not a band-aid

- Use TypeScript to model the domain (types, enums, discriminated unions), not just to silence errors
- Prefer precise types over `any`/`unknown`, but don't fight the type system endlessly—refine iteratively

### Prefer composition over cleverness

- Small, focused pieces that do one job well and are easy to wire together
- Avoid "utility frameworks" inside the app; favor simple functions and hooks you can grep and understand

---

## 2. Clean Code & Component Structure

### Component Types

I mentally separate components into a few types:

#### Page / Route components
- Own the high-level data fetching and orchestration
- Wire hooks, stores, and context together
- Very little presentational markup

#### Container / Smart components
- Bridge between data and UI: mapping domain data to props
- Handle "what happens when user clicks X"

#### Presentational / Dumb components
- Pure, mostly stateless (or only local UI state)
- Receive data and callbacks via props
- Easy to snapshot and unit test

### Component Principles

- **Each component should have one reason to change**
- Avoid giant components. If it's > ~200 lines and doing multiple things, I look to split it
- **Clear, descriptive naming**: `UserForm`, `UserFormSection`, `UserFormSubmitButton` > `Form`, `Box`, `Component1`

### Clean Code Rules of Thumb

- **Make the happy path obvious**: Early returns for error/edge-case handling
- **No magic values**: Extract constants and configuration
- **DRY but not dogmatic**: I don't abstract until I see the third similar thing
- **Readable > short**: I'll use a few more lines if it makes the intention crystal clear
- **Consistency wins**: Follow the project's patterns (folder structure, naming, hooks vs HOCs, CSS system)

---

## 3. Pure Components & Hooks

### What "pure" means to me in React

- Given the same props and state, render the same UI
- No side effects in render: no fetch or subscriptions directly in the component body
- Side effects only in `useEffect`/event handlers/custom hooks, and even then:
  - Isolate them
  - Make dependencies explicit

### Practices

**Keep state minimal**: Derive as much as possible from existing props/state instead of duplicating

**Derive values with `useMemo` only when:**
- The calculation is expensive **and**
- It actually affects performance, not "just in case"

**Callbacks (`useCallback`) only when:**
- They are passed to memoized children, **or**
- They're causing real re-render issues

### Custom Hooks

I treat custom hooks as the "service layer" of React:

- `useUserProfile(id)` handles fetching, caching, error states
- `useFormState()` encapsulates form logic and validation
- `useFeatureToggle(key)` hides the details of where toggles come from

#### Custom Hook Rules

- **Name describes what the hook does, not how**: `useAuth`, not `useJwtAndLocalStorage`
- Don't mix UI concerns (like `useState` for modal open) with business concerns (like fetching a user) in the same hook
- Hooks return a simple, consumer-friendly API (data, status flags, handlers), not internal implementation details

---

## 4. Testable Code & Testing Approach

### How I Design for Testability

#### Pure functions for important logic
- Validation, transformations, formatting, decision logic all live in plain TS modules, not JSX files
- These are trivial to unit test

#### Thin components, fat logic modules/hooks
- Components mostly orchestrate hooks and render UI
- Business logic sits in hooks or pure functions that can be tested without rendering DOM

#### Dependency injection via props
- Components receive callbacks or configuration as props instead of importing everything directly
- Makes mocking/testing easier and keeps components reusable

### Testing Strategy (Rough Pyramid)

#### Unit tests
- For pure functions and critical custom hooks
- Example: price calculation, form validation, state reducers, business rules

#### Component tests
- Using something like React Testing Library
- Focus on behavior and accessibility ("when I click X, I see Y"), not implementation details

#### Integration / E2E tests
- For key user journeys: signup, checkout, main flows
- Use Playwright/Cypress to assert the app works "for real" (API can be mocked or staging)

### I Avoid

- Over-testing implementation details (internal state names, specific hook calls)
- Over-mocking everything. Tests should fail when behavior breaks, not be green forever

---

## 5. TypeScript-Specific Principles

- **`strict` mode on**: I treat TS errors as valuable feedback

### Model domain concepts clearly

- Discriminated unions for state machines: `"idle" | "loading" | "success" | "error"`
- Branded types for IDs when it matters: `UserId`, `OrderId`

### Prefer type inference

- Let TS derive types from `as const`, `ReturnType<typeof fn>`, generics, etc.

### Avoid leaking `any` by

- Typing external boundaries (API responses, inputs)
- Building small, typed adapters that isolate unsafe parts

---

## 6. Guardrails & Tooling

- **Prettier + ESLint + TypeScript** as the baseline

### Strict lint rules for

- `no-unused-vars`
- `no-explicit-any`
- `no-floating-promises`
- React hook rules

### CI Requirements

- CI that runs tests, lint, and type-checks on every PR

### Simple Scripts

Simple scripts so anyone can validate quickly:
- `lint`
- `test`
- `typecheck`
- `build`

---

## Key Takeaways

1. **Optimize for readability and maintainability** over cleverness
2. **Start with user behavior**, not technical architecture
3. **Keep components focused** - one responsibility per component
4. **Use TypeScript as a design tool** to model your domain
5. **Test behavior, not implementation** details
6. **Derive state when possible**, minimize duplication
7. **Custom hooks are your service layer** - encapsulate complex logic
8. **Consistency and convention** matter more than individual preferences
