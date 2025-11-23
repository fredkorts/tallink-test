# AI Code Instructions

## CLEAN CODE RULES (ALWAYS FOLLOW)

1. **Make the happy path obvious** - Early returns for error/edge-case handling
2. **No magic values** - Extract constants and configuration
3. **DRY but not dogmatic** - Don't abstract until third similar thing
4. **Readable > short** - Use more lines if intention is clearer
5. **Consistency wins** - Follow existing project patterns
6. **One reason to change** - Each component/function has single responsibility
7. **Clear, descriptive naming** - `UserFormSubmitButton` > `Button1`

---

## WRITING COMPONENTS

### Component Types

**Page/Route Components:**
- Own high-level data fetching and orchestration
- Wire hooks, stores, context together
- Minimal presentational markup
- Example: `MathCalculator.jsx`

**Container/Smart Components:**
- Bridge data and UI
- Handle "what happens when user clicks X"
- Map domain data to props
- Example: `HistoryPanel.jsx`

**Presentational/Dumb Components:**
- Pure, mostly stateless (or only local UI state)
- Receive data and callbacks via props
- Easy to test
- Example: `Button.jsx`, `Display.jsx`

### Component Structure

```jsx
import React from 'react';
import PropTypes from 'prop-types'; // or TypeScript types

// 1. Component definition
function ComponentName({ prop1, prop2, onAction }) {
  // 2. Hooks at top (useState, useEffect, custom hooks)
  const [localState, setLocalState] = useState(initialValue);
  const { data, loading } = useCustomHook();
  
  // 3. Derived values (no useMemo unless performance issue)
  const derivedValue = computeFromProps(prop1, prop2);
  
  // 4. Event handlers
  const handleClick = () => {
    // Do something
    onAction(data);
  };
  
  // 5. Early returns for edge cases
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  // 6. Main render (happy path)
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
}

// 7. PropTypes or TypeScript interface
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onAction: PropTypes.func.isRequired,
};

export default ComponentName;
```

### Component Rules

- **Keep < 200 lines** - Split if doing multiple things
- **No side effects in render** - No fetch/subscriptions in component body
- **Pure rendering** - Same props/state = same UI
- **Side effects only in** useEffect/event handlers/custom hooks
- **Props for dependency injection** - Don't import everything directly
- **Extract constants** - No magic strings/numbers in JSX

---

## WRITING HOOKS

### Custom Hook Purpose

Treat hooks as "service layer" of React:
- `useUserProfile(id)` - Handles fetching, caching, error states
- `useFormState()` - Encapsulates form logic and validation
- `useCalculator()` - Calculator state machine

### Hook Structure

```javascript
import { useState, useEffect, useCallback } from 'react';

function useCustomHook(param) {
  // 1. State declarations
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 2. Side effects
  useEffect(() => {
    // Fetch or subscribe
    // Make dependencies explicit
    
    return () => {
      // Cleanup
    };
  }, [param]); // Explicit dependencies
  
  // 3. Handler functions
  const handleAction = useCallback(() => {
    // Only use useCallback if:
    // - Passed to memoized children, OR
    // - Causing real re-render issues
  }, [dependencies]);
  
  // 4. Return consumer-friendly API
  return {
    data,
    loading,
    error,
    handleAction,
    // Return simple API, not internal implementation details
  };
}

export default useCustomHook;
```

### Hook Rules

- **Name describes WHAT, not HOW** - `useAuth` not `useJwtAndLocalStorage`
- **Don't mix concerns** - UI state (modal open) ≠ business logic (fetch user)
- **Return simple API** - Data, status flags, handlers (not internals)
- **Make dependencies explicit** - Always specify useEffect dependencies
- **Isolate side effects** - Keep them contained and testable

### State Management

- **Keep state minimal** - Derive as much as possible from props/state
- **useMemo only when:**
  - Calculation is expensive AND
  - Actually affects performance (not "just in case")
- **useCallback only when:**
  - Passed to memoized children OR
  - Causing real re-render issues

---

## WRITING TYPES (TYPESCRIPT)

### Type Principles

- **Use strict mode** - Treat TS errors as valuable feedback
- **Model domain concepts clearly**
- **Prefer type inference** - Let TS derive when possible
- **Avoid `any`** - Type external boundaries

### Type Patterns

**Discriminated Unions for State Machines:**
```typescript
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error };
```

**Branded Types for IDs:**
```typescript
type UserId = string & { readonly brand: unique symbol };
type OrderId = string & { readonly brand: unique symbol };
```

**Type External Boundaries:**
```typescript
// API responses
interface ApiResponse {
  data: UserData;
  status: number;
}

// Adapter to isolate unsafe parts
function parseApiResponse(raw: unknown): ApiResponse {
  // Validate and type
}
```

**Prefer Inference:**
```typescript
const OPERATIONS = {
  ADD: '+',
  SUBTRACT: '-',
} as const;

type Operation = typeof OPERATIONS[keyof typeof OPERATIONS]; // '+' | '-'
```

### Component Types

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'operator';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, disabled, children }) => {
  // Implementation
};
```

### Hook Types

```typescript
interface UseCalculatorResult {
  currentInput: string;
  result: number | null;
  handleNumberInput: (digit: string) => void;
  handleOperator: (op: Operation) => void;
  handleEquals: () => void;
  handleClear: () => void;
}

function useCalculator(): UseCalculatorResult {
  // Implementation
}
```

---

## WRITING TESTS

### Testing Strategy (Pyramid)

**Unit Tests (Most):**
- Pure functions and critical custom hooks
- Example: price calculation, form validation, state reducers, business rules

**Component Tests (Medium):**
- Use React Testing Library
- Focus on behavior and accessibility
- "When I click X, I see Y" (not implementation details)

**Integration/E2E Tests (Least):**
- Key user journeys: signup, checkout, main flows
- Playwright/Cypress for real app testing

### What to Test

✅ **DO Test:**
- Public API/behavior
- User interactions and outcomes
- Accessibility (proper labels, keyboard navigation)
- Error states and edge cases
- Business logic in pure functions

❌ **DON'T Test:**
- Implementation details (internal state names, hook calls)
- Third-party library internals
- Styles (unless critical to functionality)

### Unit Test Structure

```javascript
import { describe, it, expect } from 'vitest'; // or jest
import { add, divide } from './operations';

describe('operations', () => {
  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    
    it('handles negative numbers', () => {
      expect(add(-2, 3)).toBe(1);
    });
    
    it('handles decimals', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });
  
  describe('divide', () => {
    it('divides two numbers', () => {
      expect(divide(6, 2)).toBe(3);
    });
    
    it('returns Infinity for division by zero', () => {
      expect(divide(5, 0)).toBe(Infinity);
    });
    
    it('returns NaN for 0/0', () => {
      expect(divide(0, 0)).toBe(NaN);
    });
  });
});
```

### Component Test Structure

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button onClick={() => {}} disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  it('has accessible label', () => {
    render(<Button onClick={() => {}} aria-label="Submit form">Submit</Button>);
    expect(screen.getByLabelText('Submit form')).toBeInTheDocument();
  });
});
```

### Hook Test Structure

```javascript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCalculator from './useCalculator';

describe('useCalculator', () => {
  it('initializes with empty input', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.currentInput).toBe('');
  });
  
  it('handles number input', () => {
    const { result } = renderHook(() => useCalculator());
    
    act(() => {
      result.current.handleNumberInput('5');
    });
    
    expect(result.current.currentInput).toBe('5');
  });
  
  it('performs addition', () => {
    const { result } = renderHook(() => useCalculator());
    
    act(() => {
      result.current.handleNumberInput('2');
      result.current.handleOperator('+');
      result.current.handleNumberInput('3');
      result.current.handleEquals();
    });
    
    expect(result.current.result).toBe(5);
  });
});
```

### Test Principles

- **Test behavior, not implementation**
- **Tests should fail when behavior breaks** (not be green forever)
- **Avoid over-mocking** - Mock only external dependencies
- **Use descriptive test names** - Should read like documentation
- **Arrange, Act, Assert** - Clear test structure
- **Test edge cases** - Empty, null, zero, negative, overflow, etc.

---

## FILE NAMING CONVENTIONS

- **Components**: PascalCase - `MathCalculator.jsx`
- **Hooks**: camelCase with "use" prefix - `useCalculator.js`
- **Utils/Services**: camelCase - `operations.js`, `historyService.js`
- **Tests**: Match file with `.test` suffix - `operations.test.js`
- **Types**: PascalCase with `.types.ts` suffix - `math.types.ts`

---

## IMPORT ORDER

```javascript
// 1. React and external libraries
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 2. Internal components
import Button from '@/components/Common/Button';
import Display from './Display';

// 3. Hooks
import useCalculator from '../hooks/useCalculator';

// 4. Utils and services
import { add, subtract } from '../utils/operations';
import { postHistory } from '@/services/historyService';

// 5. Constants
import { MAX_DIGITS } from '@/utils/constants';

// 6. Styles
import './styles.css';
```

---

## CRITICAL REMINDERS

1. **Start from behavior** - Understand user flows and edge cases first
2. **Single source of truth** - Each piece of data has ONE clear owner
3. **Types are design tools** - Model the domain, don't just silence errors
4. **Composition over cleverness** - Small, focused pieces that do one job
5. **Pure functions for logic** - Business logic in testable pure functions, not JSX
6. **Thin components, fat logic** - Components orchestrate, logic lives elsewhere
7. **No premature optimization** - useMemo/useCallback only when measured need
8. **Explicit dependencies** - Always specify useEffect dependencies correctly
9. **Accessibility first** - Proper labels, keyboard support, ARIA when needed
10. **Test behavior** - "When user does X, they see Y" (not implementation)
