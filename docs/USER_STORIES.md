# User Stories - React Calculator

## Epic 1: Basic Calculator Setup

### US-001: Application Initialization
**As a** user  
**I want** to open the calculator application  
**So that** I can start performing calculations immediately

**Acceptance Criteria:**
- [ ] Application loads without errors
- [ ] Math mode is displayed by default
- [ ] Display shows "0" as initial value
- [ ] All calculator buttons are visible and clickable

---

## Epic 2: Math Mode - Basic Operations

### US-002: Number Input via Button Clicks
**As a** user  
**I want** to enter numbers by clicking on the calculator buttons  
**So that** I can input values for calculations

**Acceptance Criteria:**
- [ ] Clicking number buttons (0-9) displays the number
- [ ] Multiple digits can be entered in sequence
- [ ] Display updates in real-time as numbers are clicked
- [ ] Maximum of 10 digits can be entered
- [ ] Attempting to enter more than 10 digits is prevented

### US-003: Number Input via Keyboard
**As a** user  
**I want** to enter numbers using my keyboard  
**So that** I can input values faster

**Acceptance Criteria:**
- [ ] Pressing number keys (0-9) displays the number
- [ ] Keyboard input works the same as button clicks
- [ ] Both input methods can be used interchangeably
- [ ] 10-digit limit applies to keyboard input

### US-004: Decimal Number Entry
**As a** user  
**I want** to enter decimal numbers  
**So that** I can perform calculations with fractional values

**Acceptance Criteria:**
- [ ] Clicking decimal button adds a decimal point
- [ ] Only one decimal point can be added per number
- [ ] Can enter numbers like "0.5" or ".5"
- [ ] Display shows decimal point clearly
- [ ] Decimal point doesn't count toward 10-digit limit (or does it - needs clarification)

### US-005: Addition Operation
**As a** user  
**I want** to add two numbers  
**So that** I can calculate their sum

**Acceptance Criteria:**
- [ ] Clicking "+" button sets addition operation
- [ ] Display shows first number with "+" symbol
- [ ] Can enter second number after selecting operation
- [ ] Pressing "=" displays the sum
- [ ] Result is posted to `/api/history`
- [ ] History shows entry like "2+3=5"

**Example:** `2 + 3 = 5`

### US-006: Subtraction Operation
**As a** user  
**I want** to subtract one number from another  
**So that** I can calculate the difference

**Acceptance Criteria:**
- [ ] Clicking "-" button sets subtraction operation
- [ ] Display shows first number with "-" symbol
- [ ] Can enter second number after selecting operation
- [ ] Pressing "=" displays the difference
- [ ] Negative results are displayed correctly
- [ ] Result is posted to `/api/history`

**Example:** `5 - 3 = 2`, `2 - 5 = -3`

### US-007: Multiplication Operation
**As a** user  
**I want** to multiply two numbers  
**So that** I can calculate their product

**Acceptance Criteria:**
- [ ] Clicking "×" button sets multiplication operation
- [ ] Display shows first number with "×" symbol
- [ ] Can enter second number after selecting operation
- [ ] Pressing "=" displays the product
- [ ] Result is posted to `/api/history`
- [ ] Handles multiplication by zero correctly

**Example:** `4 × 5 = 20`

### US-008: Division Operation
**As a** user  
**I want** to divide one number by another  
**So that** I can calculate the quotient

**Acceptance Criteria:**
- [ ] Clicking "÷" button sets division operation
- [ ] Display shows first number with "÷" symbol
- [ ] Can enter second number after selecting operation
- [ ] Pressing "=" displays the quotient
- [ ] Result is posted to `/api/history`
- [ ] Handles decimal results appropriately

**Example:** `10 ÷ 2 = 5`, `10 ÷ 3 = 3.333...`

### US-009: Division by Zero
**As a** user  
**I want** to see a clear result when dividing by zero  
**So that** I understand the operation is invalid

**Acceptance Criteria:**
- [ ] Dividing any number by zero shows "Infinity" or "∞"
- [ ] Dividing zero by zero shows "NaN" or appropriate error
- [ ] Result is still posted to `/api/history`
- [ ] Calculator remains functional after the error

**Example:** `5 ÷ 0 = Infinity`, `0 ÷ 0 = NaN`

### US-010: Clear Function
**As a** user  
**I want** to clear my current input  
**So that** I can start a new calculation

**Acceptance Criteria:**
- [ ] Clicking "C" button resets display to "0"
- [ ] Current operation is cleared
- [ ] Can immediately start new calculation
- [ ] History is not cleared (only current operation)

### US-011: Execute Calculation
**As a** user  
**I want** to press equals to execute my calculation  
**So that** I can see the result

**Acceptance Criteria:**
- [ ] Pressing "=" executes the pending operation
- [ ] Display shows the result
- [ ] Operation is posted to `/api/history` with operands, operation, and result
- [ ] Can start a new calculation or continue with the result
- [ ] Pressing "=" without complete operation shows appropriate feedback

---

## Epic 3: Math Mode - Max Prime Number Operation

### US-012: Max Prime Number Operation
**As a** user  
**I want** to find the maximum prime number between two numbers  
**So that** I can quickly identify primes in a range

**Acceptance Criteria:**
- [ ] Clicking "P" button sets prime operation
- [ ] Display shows first number with "P" symbol
- [ ] Can enter second number after selecting operation
- [ ] Pressing "=" displays the maximum prime between the two numbers
- [ ] Result is posted to `/api/history`
- [ ] History shows entry like "3P13=13"

**Example:** `3 P 13 = 13`, `20 P 25 = 23`

### US-013: Max Prime Number - No Prime Exists
**As a** user  
**I want** to see "NaN" when no prime exists in the range  
**So that** I understand no valid result exists

**Acceptance Criteria:**
- [ ] When no prime exists between two numbers, display shows "NaN"
- [ ] Result is still posted to `/api/history`
- [ ] Calculator remains functional after showing NaN
- [ ] Can start a new calculation

**Example:** `20 P 19 = NaN`

### US-014: Max Prime Number - Edge Cases
**As a** user  
**I want** the prime operation to handle edge cases gracefully  
**So that** I get consistent and predictable results

**Acceptance Criteria:**
- [ ] Handles when both numbers are the same prime
- [ ] Handles when numbers are in reverse order
- [ ] Handles zero and one as inputs
- [ ] Handles decimal numbers (rounds or shows error)
- [ ] Shows NaN for invalid inputs

---

## Epic 4: Math Mode - Operation History

### US-015: View Calculation History
**As a** user  
**I want** to see a history of my calculations  
**So that** I can review my previous work

**Acceptance Criteria:**
- [ ] History panel displays all completed calculations
- [ ] New calculations appear at the bottom
- [ ] Each entry shows format: "operand1 operation operand2 = result"
- [ ] History is scrollable if it exceeds available space
- [ ] History persists during the session

### US-016: History API Integration
**As a** developer  
**I want** calculation history posted to `/api/history`  
**So that** it can be stored on the server

**Acceptance Criteria:**
- [ ] Each calculation POSTs to `/api/history` when "=" is pressed
- [ ] Request includes operands, operation type, and result
- [ ] Uses MirageJS for mocking initially
- [ ] Local memory stores history temporarily
- [ ] Can easily switch to real API endpoint
- [ ] Failed requests don't break the calculator

### US-017: History with Special Values
**As a** user  
**I want** to see special values (Infinity, NaN) in history  
**So that** I can review all calculations including errors

**Acceptance Criteria:**
- [ ] "Infinity" results display clearly in history
- [ ] "NaN" results display clearly in history
- [ ] Special values don't break history formatting
- [ ] History entry is distinguishable from normal results

---

## Epic 5: Math Mode - Operation Chaining

### US-018: Continue Calculation with Result
**As a** user  
**I want** to use the result of a calculation as the first operand of the next operation  
**So that** I can chain calculations efficiently

**Acceptance Criteria:**
- [ ] After pressing "=", can immediately press an operator to continue
- [ ] Result becomes the first operand of the new operation
- [ ] Display updates to show result + new operator
- [ ] Can enter second operand and complete new calculation

**Example:** `2 + 3 = 5`, then press `× 2 = 10`

### US-019: Start Fresh Calculation After Result
**As a** user  
**I want** to start a completely new calculation after seeing a result  
**So that** I can perform independent calculations

**Acceptance Criteria:**
- [ ] After pressing "=", pressing a number starts fresh calculation
- [ ] Previous result is cleared from display
- [ ] New number becomes first operand of new calculation
- [ ] Can proceed with normal operation flow

### US-020: Change Operation Before Second Operand
**As a** user  
**I want** to change my selected operation before entering the second operand  
**So that** I can correct mistakes without clearing

**Acceptance Criteria:**
- [ ] After selecting an operation, pressing another operator changes it
- [ ] First operand is preserved
- [ ] Display updates to show new operator
- [ ] Does not execute the first operation

**Example:** `5 +` then press `-` → display shows `5-`

### US-021: Immediate Execution on Successive Operations
**As a** user  
**I want** the calculator to execute the current operation when I press another operator  
**So that** I can chain calculations without pressing equals each time

**Acceptance Criteria:**
- [ ] When an operation is pending (has first operand, operator, and second operand)
- [ ] Pressing a new operator executes the pending operation immediately
- [ ] Result is displayed and becomes the first operand of the new operation
- [ ] New operator is set and ready for next input
- [ ] Previous operation is posted to history
- [ ] Display shows: result + new operator

**Example:** 
- Input: `3 + 3` → Display: `3+3`
- Press `+` (second operator) → Calculator executes `3 + 3 = 6`
- Display: `6+` (ready for next number)
- History entry created: `3+3=6`
- Continue: input `3` → Display: `6+3`
- Press `=` → Display: `9`
- History entry created: `6+3=9`

**Full chain example:** `3 + 3 + 3 = 9`
- `3` → Display: `3`
- `+` → Display: `3+`
- `3` → Display: `3+3`
- `+` → Executes, Display: `6+`, History: `3+3=6`
- `3` → Display: `6+3`
- `=` → Display: `9`, History: `6+3=9`

---

## Epic 6: Currency Mode - Basic Functionality

### US-022: Switch to Currency Mode
**As a** user  
**I want** to switch from Math mode to Currency mode  
**So that** I can perform currency conversions

**Acceptance Criteria:**
- [ ] Mode toggle/tab switches between Math and Currency
- [ ] Currency mode UI is displayed
- [ ] Two currency selectors are visible
- [ ] Input field for first currency is visible
- [ ] Result field for second currency is visible
- [ ] Currency rates are loaded automatically

### US-023: Load Currency Rates
**As a** user  
**I want** currency rates to load automatically  
**So that** I can start conversions immediately

**Acceptance Criteria:**
- [ ] Rates are fetched from `/api/rates` on mode open
- [ ] Loading indicator shown while fetching
- [ ] Rates populate both currency dropdowns
- [ ] Default currencies are pre-selected
- [ ] Error message shown if rates fail to load

### US-024: Select Source Currency
**As a** user  
**I want** to select my source currency  
**So that** I can convert from that currency

**Acceptance Criteria:**
- [ ] Currency dropdown shows all available currencies
- [ ] Clicking a currency selects it
- [ ] Selected currency is highlighted/indicated
- [ ] If value is entered, conversion recalculates immediately
- [ ] Native select element is used

### US-025: Select Target Currency
**As a** user  
**I want** to select my target currency  
**So that** I can convert to that currency

**Acceptance Criteria:**
- [ ] Currency dropdown shows all available currencies
- [ ] Clicking a currency selects it
- [ ] Selected currency is highlighted/indicated
- [ ] If value is entered, conversion recalculates immediately
- [ ] Native select element is used

### US-026: Enter Amount to Convert
**As a** user  
**I want** to enter an amount in the source currency  
**So that** I can see the converted value

**Acceptance Criteria:**
- [ ] Can type numeric values in input field
- [ ] Decimal values are supported
- [ ] Target currency updates automatically on each keystroke
- [ ] Display shows appropriate decimal precision
- [ ] Invalid characters are rejected

### US-027: View Converted Amount
**As a** user  
**I want** to see the converted amount automatically  
**So that** I don't have to press a button to convert

**Acceptance Criteria:**
- [ ] Target currency field updates in real-time
- [ ] Conversion uses current exchange rates
- [ ] Calculation is accurate
- [ ] Result shows appropriate decimal places
- [ ] Zero amount shows zero in target currency

---

## Epic 7: Currency Mode - Rate Management

### US-028: View Rate Update Time
**As a** user  
**I want** to see when rates were last updated  
**So that** I know if they're current

**Acceptance Criteria:**
- [ ] Timestamp shows time elapsed since last update
- [ ] Format is user-friendly (e.g., "2 minutes ago", "1 hour ago")
- [ ] Updates in real-time or at reasonable intervals
- [ ] Displays on currency mode interface

### US-029: Manually Refresh Rates
**As a** user  
**I want** to manually refresh exchange rates  
**So that** I can ensure I have the latest data

**Acceptance Criteria:**
- [ ] Reload/refresh icon is visible
- [ ] Clicking icon fetches new rates from `/api/rates`
- [ ] Loading indicator shown during fetch
- [ ] Timestamp updates after successful refresh
- [ ] Conversion recalculates with new rates if amount is entered
- [ ] Error message shown if refresh fails

### US-030: Handle Rate Loading Failure
**As a** user  
**I want** to see a clear message if rates fail to load  
**So that** I understand why conversions aren't working

**Acceptance Criteria:**
- [ ] Error message displayed if API call fails
- [ ] Message is user-friendly
- [ ] Can retry loading rates
- [ ] If old rates exist, can optionally continue using them
- [ ] Calculator doesn't crash on error

---

## Epic 8: Display and Formatting

### US-031: Handle Long Results
**As a** user  
**I want** results formatted appropriately when they're very long  
**So that** I can still read them clearly

**Acceptance Criteria:**
- [ ] Results exceeding 10 digits are handled gracefully
- [ ] Uses scientific notation or truncation as appropriate
- [ ] Display doesn't break or overflow
- [ ] User can understand the value shown

### US-032: Format Decimal Precision
**As a** user  
**I want** decimal results formatted to a reasonable precision  
**So that** results are readable and useful

**Acceptance Criteria:**
- [ ] Repeating decimals are rounded or truncated
- [ ] Precision is consistent across operations
- [ ] Trailing zeros are handled appropriately
- [ ] Very small decimals are formatted clearly

### US-033: Display Negative Numbers
**As a** user  
**I want** negative results displayed clearly  
**So that** I can distinguish them from positive numbers

**Acceptance Criteria:**
- [ ] Negative sign is clearly visible
- [ ] Doesn't break 10-digit display limit
- [ ] Formatting is consistent with positive numbers
- [ ] Works in history display as well

---

## Epic 9: Accessibility

### US-034: Keyboard Navigation
**As a** user with mobility impairments  
**I want** to navigate the calculator using only my keyboard  
**So that** I can perform all operations without a mouse

**Acceptance Criteria:**
- [ ] Can tab through all interactive elements
- [ ] Tab order is logical
- [ ] Focus indicators are clearly visible
- [ ] Enter key activates buttons
- [ ] All functionality accessible via keyboard

### US-035: Screen Reader Support
**As a** visually impaired user  
**I want** the calculator to work with my screen reader  
**So that** I can use it independently

**Acceptance Criteria:**
- [ ] All buttons have descriptive labels
- [ ] Display value is announced
- [ ] Operation results are announced
- [ ] Mode switches are announced
- [ ] Error messages are announced

### US-036: Visual Accessibility
**As a** user with visual impairments  
**I want** the calculator to have good contrast and readability  
**So that** I can see all elements clearly

**Acceptance Criteria:**
- [ ] Color contrast meets WCAG AA standards
- [ ] Text is large enough to read
- [ ] Buttons are large enough to click/tap
- [ ] Focus states are visible
- [ ] Works at different zoom levels

---

## Epic 10: Error Handling and Edge Cases

### US-037: Handle Invalid Number Input
**As a** user  
**I want** invalid input to be rejected gracefully  
**So that** I don't accidentally create errors

**Acceptance Criteria:**
- [ ] Multiple decimal points are prevented
- [ ] Non-numeric characters are rejected (in math mode)
- [ ] Leading zeros are handled appropriately
- [ ] Empty input is handled appropriately

### US-038: Handle Incomplete Operations
**As a** user  
**I want** the calculator to handle incomplete operations gracefully  
**So that** I don't get unexpected errors

**Acceptance Criteria:**
- [ ] Pressing "=" without operation doesn't crash
- [ ] Pressing operator without first number is handled
- [ ] Pressing "=" with only first operand is handled
- [ ] Clear feedback provided for incomplete operations

### US-039: Handle API Failures
**As a** user  
**I want** the calculator to work even if the API is unavailable  
**So that** I can still perform calculations

**Acceptance Criteria:**
- [ ] Math operations work when history API fails
- [ ] History is stored locally if API is unavailable
- [ ] Currency mode shows error but doesn't crash if rates API fails
- [ ] User receives clear feedback about API issues

### US-040: Handle Rapid Input
**As a** user  
**I want** the calculator to handle rapid button clicks  
**So that** it doesn't lag or produce errors

**Acceptance Criteria:**
- [ ] Multiple rapid clicks don't create duplicate inputs
- [ ] Animation doesn't break with rapid clicking
- [ ] Calculator remains responsive
- [ ] No race conditions with API calls

### US-041: Preserve State Appropriately
**As a** user  
**I want** my state preserved when switching modes  
**So that** I don't lose work accidentally

**Acceptance Criteria:**
- [ ] Clear behavior when switching modes (preserve or clear)
- [ ] History behavior is predictable
- [ ] Input values handled appropriately
- [ ] User understands what will be preserved/cleared

---

## Epic 11: Performance and Reliability

### US-042: Fast Prime Number Calculation
**As a** user  
**I want** prime number calculations to complete quickly  
**So that** the calculator doesn't freeze

**Acceptance Criteria:**
- [ ] Prime calculations for reasonable ranges complete in < 1 second
- [ ] UI remains responsive during calculation
- [ ] Very large ranges are handled (timeout or optimization)
- [ ] Loading indicator shown for slow calculations

### US-043: Efficient History Management
**As a** user  
**I want** the history to remain performant even with many entries  
**So that** the calculator doesn't slow down

**Acceptance Criteria:**
- [ ] Can handle at least 100 history entries without lag
- [ ] Scrolling history is smooth
- [ ] Memory usage is reasonable
- [ ] Option to clear old history if needed

### US-044: Reliable API Mocking
**As a** developer  
**I want** reliable API mocking with MirageJS  
**So that** development and testing are smooth

**Acceptance Criteria:**
- [ ] MirageJS is properly configured
- [ ] Mock endpoints match expected real API format
- [ ] Can easily toggle between mock and real API
- [ ] Mock data is realistic and helpful for testing

---

## Epic 12: UI/UX Polish

### US-045: Match Figma Design
**As a** stakeholder  
**I want** the calculator to match the Figma designs  
**So that** brand consistency is maintained

**Acceptance Criteria:**
- [ ] Layout matches Figma
- [ ] Colors match Figma
- [ ] Typography matches Figma
- [ ] Spacing and sizing match Figma
- [ ] Button styles match Figma

### US-046: Responsive Design
**As a** user on different devices  
**I want** the calculator to work on my device  
**So that** I can use it anywhere

**Acceptance Criteria:**
- [ ] Works on desktop screens
- [ ] Works on tablet screens
- [ ] Works on mobile phones
- [ ] Touch targets are appropriately sized
- [ ] Layout adapts to screen size

### US-047: Button Feedback
**As a** user  
**I want** visual feedback when I click buttons  
**So that** I know my input was registered

**Acceptance Criteria:**
- [ ] Buttons show hover state
- [ ] Buttons show active/pressed state
- [ ] Keyboard input shows same feedback as clicks
- [ ] Feedback is immediate and noticeable
- [ ] Animation is smooth

### US-048: Loading States
**As a** user  
**I want** to see loading indicators when data is being fetched  
**So that** I know the app is working

**Acceptance Criteria:**
- [ ] Loading indicator shown when fetching rates
- [ ] Loading indicator shown for slow calculations
- [ ] Loading indicators are visually clear
- [ ] User can't trigger duplicate requests during loading
- [ ] Timeout shown if request takes too long

---

## Epic 13: Testing and Quality

### US-049: Unit Test Coverage
**As a** developer  
**I want** comprehensive unit tests  
**So that** bugs are caught early

**Acceptance Criteria:**
- [ ] Core calculation functions are tested
- [ ] Prime number algorithm is tested
- [ ] Input validation is tested
- [ ] Currency conversion logic is tested
- [ ] Edge cases are covered

### US-050: Integration Testing
**As a** developer  
**I want** integration tests for component interactions  
**So that** features work together correctly

**Acceptance Criteria:**
- [ ] Mode switching tested
- [ ] API integration tested
- [ ] History functionality tested
- [ ] User workflows tested

### US-051: Build and Deploy
**As a** developer  
**I want** simple build and deploy processes  
**So that** the app can be easily deployed

**Acceptance Criteria:**
- [ ] `npm run dev` starts development server
- [ ] `npm run build` creates production build
- [ ] Build is optimized for production
- [ ] No console errors or warnings
- [ ] App is deployable to standard hosting
