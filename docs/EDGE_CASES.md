# Edge Cases - React Calculator

## Math Mode Edge Cases

### Input Validation

#### Digit Limits
- [ ] Entering more than 10 digits (should be blocked or truncated)
- [ ] Entering exactly 10 digits then trying to add more
- [ ] 10-digit limit applies to integers vs. decimals (does decimal point count?)
- [ ] Entering 10 digits before decimal point, then adding decimal places

#### Decimal Numbers
- [ ] Multiple decimal points in a single number (e.g., `3.14.159`)
- [ ] Starting input with decimal point (e.g., `.5`)
- [ ] Ending input with decimal point (e.g., `5.`)
- [ ] Entering only a decimal point with no digits
- [ ] Multiple consecutive decimal points (e.g., `3...5`)

#### Leading Zeros
- [ ] Leading zeros for integers (e.g., `007` → should display as `7`)
- [ ] Zero before decimal point (e.g., `0.5` vs `.5`)
- [ ] Multiple leading zeros (e.g., `000123`)

#### Empty/Invalid Input
- [ ] Pressing operator without entering any number first
- [ ] Pressing `=` without any input
- [ ] Pressing `=` with only first operand (no operator selected)
- [ ] Pressing `C` on empty/default state

### Operation Sequencing

#### Multiple Operators
- [ ] Pressing multiple operators in sequence (e.g., `5 + - ×`)
- [ ] Should last operator replace previous, or should it execute pending operation?
- [ ] Pressing operator immediately after another operator

#### Equals Button Behavior
- [ ] Pressing `=` multiple times consecutively (should repeat last operation?)
- [ ] Pressing `=` without completing operation (only first operand entered)
- [ ] Pressing `=` after pressing an operator but before second operand

#### Operation Chaining
- [ ] Continuing calculation after `=` (e.g., `2+3=` then `+5`)
- [ ] Does the result become first operand of next operation?
- [ ] Starting new number vs. continuing with result
- [ ] Pressing number immediately after `=` (should clear or append?)

#### Clear Button
- [ ] Pressing `C` in the middle of entering a number
- [ ] Pressing `C` after selecting an operator
- [ ] Pressing `C` after calculation is complete
- [ ] Does `C` clear history or just current input?

### Basic Operations Edge Cases

#### Addition
- [ ] Adding very large numbers exceeding display capacity
- [ ] Adding numbers resulting in more than 10 digits
- [ ] `0 + 0`
- [ ] Negative result (though no negative input button specified)

#### Subtraction
- [ ] Result is negative (e.g., `2 - 5 = -3`)
- [ ] How to display negative numbers?
- [ ] `0 - 0`
- [ ] Subtracting larger from smaller

#### Multiplication
- [ ] `0 × any number`
- [ ] Result exceeding 10 digits
- [ ] Multiplying decimals with many significant figures
- [ ] Very large numbers creating overflow

#### Division
- [ ] `x / 0` → should display "Infinity" or ∞
- [ ] `0 / 0` → should display "NaN" or "Infinity"?
- [ ] `0 / x` → should display "0"
- [ ] Division resulting in repeating decimals (e.g., `10 / 3 = 3.333...`)
- [ ] Division resulting in very small numbers (e.g., `1 / 999999999`)
- [ ] How many decimal places to show?

### Max Prime Number (P) Operation

#### Input Validation
- [ ] `0 P x` or `x P 0`
- [ ] `1 P x` or `x P 1` (1 is not prime)
- [ ] Negative numbers (e.g., `-5 P 10`)
- [ ] Decimal/float numbers (e.g., `3.5 P 7.2`)
- [ ] Should decimals be rounded or rejected?

#### Prime Logic Edge Cases
- [ ] Both numbers are the same prime (e.g., `5 P 5` → result `5`?)
- [ ] Both numbers are the same non-prime (e.g., `4 P 4` → result `NaN`?)
- [ ] First number larger than second (e.g., `20 P 5`)
- [ ] Numbers where no prime exists in range (e.g., `20 P 19`)
- [ ] Adjacent primes (e.g., `2 P 3`)
- [ ] One number is prime, the other is not (e.g., `5 P 8`)

#### Performance & Range Issues
- [ ] Very large ranges with many primes (e.g., `1 P 1000000`)
- [ ] Performance degradation with large number calculations
- [ ] Numbers creating empty range (e.g., `10 P 5` - reversed order)
- [ ] Identical consecutive primes (e.g., `11 P 13`)

#### Prime Calculation Accuracy
- [ ] Large primes near 10-digit limit
- [ ] Edge of prime ranges (e.g., `2 P 3`, `89 P 97`)
- [ ] Composite numbers only in range (e.g., `8 P 10`)

### Display Issues

#### Number Formatting
- [ ] Results with many decimal places (when to round?)
- [ ] Scientific notation for very large/small numbers
- [ ] How to display numbers exceeding 10 digits?
- [ ] Trailing zeros after decimal (e.g., `5.00` vs `5`)
- [ ] Leading zeros display

#### Result Overflow
- [ ] Result has more than 10 digits
- [ ] Should truncate, round, or use scientific notation?
- [ ] Negative numbers with sign taking up space

#### Special Values
- [ ] Displaying `NaN`
- [ ] Displaying `Infinity` or `∞`
- [ ] Displaying negative infinity
- [ ] Mixing standard numbers with special values in history

### Keyboard Input

#### Key Mapping
- [ ] Keyboard numbers vs. on-screen buttons
- [ ] Enter key as `=`
- [ ] Backspace/Delete key behavior (not specified in requirements)
- [ ] Escape key as `C`?
- [ ] Operator keys (+, -, *, /)
- [ ] How to enter "P" operation via keyboard?

#### Input Conflicts
- [ ] Rapid keyboard input
- [ ] Mixed keyboard and mouse input
- [ ] Browser keyboard shortcuts conflicting (e.g., Ctrl+C)
- [ ] Keyboard input while button animation playing
- [ ] Multiple keys pressed simultaneously

### History Tracking

#### API Integration
- [ ] `/api/history` POST fails (network error)
- [ ] POST request times out
- [ ] API returns error response
- [ ] Should calculations be blocked while POST is pending?
- [ ] Queue multiple operations if API is slow?

#### Local Storage
- [ ] Maximum history length (memory constraints)
- [ ] Clearing history
- [ ] History persistence across page refreshes
- [ ] Syncing local history with API when it becomes available

#### History Data Format
- [ ] How to format "P" operations in history?
- [ ] How to display `Infinity` and `NaN` in history?
- [ ] Long operations exceeding history item width
- [ ] History overflow (scrolling behavior)

---

## Currency Mode Edge Cases

### Rate Loading

#### Initial Load
- [ ] API `/api/rates` fails on initial load
- [ ] Network timeout
- [ ] Empty response from API
- [ ] Malformed JSON response
- [ ] Missing currencies in response

#### Rate Refresh
- [ ] Clicking refresh while previous request is pending
- [ ] Rapid successive refresh clicks
- [ ] Refresh fails but old rates still available
- [ ] Switching tabs during rate refresh
- [ ] Rate refresh takes very long (show loading state?)

#### Rate Data Quality
- [ ] Zero exchange rate
- [ ] Negative exchange rate
- [ ] Extremely large exchange rate (e.g., hyperinflation scenarios)
- [ ] Missing rate for selected currency pair
- [ ] Rate data structure changes

### Currency Selection

#### Dropdown Behavior
- [ ] Selecting same currency for both dropdowns
- [ ] Changing source currency with value already entered
- [ ] Changing target currency with value already entered
- [ ] Empty/null currency selection
- [ ] Currency list order and default selection

#### Circular Conversions
- [ ] Converting A→B then B→A (should return to original value?)
- [ ] Floating point precision errors in conversions
- [ ] Swapping currencies (does value swap too?)

### Input Validation

#### Numeric Input
- [ ] Non-numeric characters
- [ ] Multiple decimal points
- [ ] Negative amounts
- [ ] Zero amount
- [ ] Extremely large amounts (overflow)
- [ ] Extremely small amounts (underflow)

#### Decimal Precision
- [ ] How many decimal places allowed for input?
- [ ] How many decimal places to display for result?
- [ ] Rounding vs. truncation
- [ ] Currency-specific decimal rules (e.g., JPY has no decimals)

#### Empty/Invalid States
- [ ] Empty input field
- [ ] Deleting all input after entering amount
- [ ] Pasting invalid text
- [ ] Input field focus/blur behavior

### Calculation Accuracy

#### Precision Issues
- [ ] Floating point arithmetic errors (e.g., 0.1 + 0.2)
- [ ] Rounding errors accumulating over multiple conversions
- [ ] Very small rates creating tiny results
- [ ] Very large rates creating huge results

#### Edge Values
- [ ] Converting 0
- [ ] Converting maximum safe integer
- [ ] Converting decimal with many places
- [ ] Result exceeding safe number range

### Time Display

#### Elapsed Time Formatting
- [ ] Just loaded (0 seconds)
- [ ] Less than 1 minute (show seconds)
- [ ] Less than 1 hour (show minutes)
- [ ] Less than 1 day (show hours)
- [ ] Days old
- [ ] Weeks/months old (stale data warning?)

#### Time Update
- [ ] Does elapsed time update in real-time?
- [ ] Update interval (every second, minute?)
- [ ] Time zone considerations
- [ ] System clock changes

---

## Mode Switching

### State Preservation
- [ ] Switching from Math to Currency with pending calculation
- [ ] Switching from Currency to Math with values entered
- [ ] Does mode switch clear all state?
- [ ] History preservation across mode switches

### UI State
- [ ] Active mode indicator
- [ ] Mode switch during API request
- [ ] Mode switch during keyboard input
- [ ] Animation/transition timing

---

## General Application Edge Cases

### Performance

#### Resource Management
- [ ] Memory leaks from accumulating history
- [ ] Too many event listeners
- [ ] Rapid button clicks causing lag
- [ ] Animation frame drops
- [ ] Large dataset rendering (long history)

#### Computation
- [ ] Prime number calculation taking too long
- [ ] Blocking main thread with heavy calculations
- [ ] Should use Web Workers for prime calculations?

### Browser Compatibility

#### APIs & Features
- [ ] Browser doesn't support certain JS features
- [ ] CSS features not supported
- [ ] Local storage disabled/full
- [ ] Cookies disabled (if used)

#### Display
- [ ] Different screen sizes (responsive design)
- [ ] High DPI displays
- [ ] Browser zoom levels
- [ ] Font rendering differences

### Network Issues

#### Offline Mode
- [ ] Using app with no internet connection
- [ ] Connection lost mid-operation
- [ ] Slow/unstable connection

#### MirageJS vs Real API
- [ ] Switching from mock to real API
- [ ] Different response times/formats
- [ ] Mock data vs. real data discrepancies
- [ ] Development vs. production environment

### Accessibility

#### Screen Readers
- [ ] All buttons have proper labels
- [ ] Result announcements
- [ ] Error message announcements
- [ ] Mode switching announcements

#### Keyboard Navigation
- [ ] Tab order through calculator buttons
- [ ] Focus indicators visible
- [ ] All functionality accessible without mouse

#### Visual Accessibility
- [ ] Color contrast ratios
- [ ] Font size and readability
- [ ] Button sizes for touch/click targets

### Error Recovery

#### Graceful Degradation
- [ ] API unavailable (use cached data?)
- [ ] Partial feature failure
- [ ] Fallback UI states
- [ ] Error messages user-friendly

#### State Recovery
- [ ] Recovering from invalid state
- [ ] Resetting to default state
- [ ] Handling corrupted local storage

---

## Testing Considerations

### Unit Tests Needed For:
- [ ] Each mathematical operation
- [ ] Prime number algorithm
- [ ] Input validation logic
- [ ] Number formatting/display
- [ ] Currency conversion calculations
- [ ] Rate parsing and storage

### Integration Tests Needed For:
- [ ] API interactions (mocked)
- [ ] Mode switching
- [ ] History management
- [ ] Keyboard and click input together

### E2E Tests Needed For:
- [ ] Complete calculation workflows
- [ ] Currency conversion workflows
- [ ] Error scenarios
- [ ] Cross-browser testing

---

## Security Considerations

### Input Sanitization
- [ ] Prevent XSS through input fields
- [ ] Validate all numeric inputs server-side (if API stores them)
- [ ] Rate limiting on API requests

### Data Privacy
- [ ] What data is logged/tracked?
- [ ] GDPR compliance if applicable
- [ ] Secure API communication (HTTPS)
