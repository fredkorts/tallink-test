# Project Requirements - React Calculator

## Overview
Build a React Calculator application to help Margaret (accountant) who has misplaced her calculators. The calculator supports two modes: **Math** and **Currency**.

## Design
- Follow [Figma designs](https://www.figma.com/file/gqjeD7VfneerS5ssLPzvb9/Calculator-and-currency-exchange-app?type=design&node-id=2-251&mode=design&t=MVvYb9hVTExx1pYJ-11) as closely as possible
- Math mode is opened by default

---

## Math Mode Requirements

### Input Constraints
- Users can enter up to **10 digits** (integers and floats)
- Input methods: clicking on pad OR keyboard entry

### Supported Operations
1. Addition (+)
2. Subtraction (-)
3. Division (/)
4. Multiplication (×)
5. Max Prime Number (P button)

### Special Buttons
- **C button**: Resets input to "0" and clears current operation
- **= button**: Executes the operation and displays result

### Operation Flow Example: `2 + 31`
1. Press "2" → Display: `2`
2. Press "+" → Display: `2+`
3. Press "3" → Display: `2+3`
4. Press "1" → Display: `2+31`
5. Press "=" → Display: `33`
   - POST request sent to `/api/history`
   - History shows: `2+31=33`

### Max Prime Number (P) Operation
Calculates the maximum prime number between two provided numbers.

**Examples:**
- `3 P 13 = 13`
- `20 P 25 = 23`
- `20 P 19 = NaN` (no prime exists between them)

**Operation Flow Example: `1 P 5`**
1. Press "1" → Display: `1` (previous result cleared)
2. Press "P" → Display: `1P`
3. Press "5" → Display: `1P5`
4. Press "=" → Display: `5`
   - POST request sent to `/api/history`
   - History shows: `1P5=5`

### Error Handling
- **Impossible operations**: Display `NaN`
- **Division by zero**: Display `Infinity` (or Unicode infinity symbol ∞)

### History Tracking
- Each operation must POST to `/api/history` with:
  - Operands
  - Operation type
  - Result
- Use local memory for temporary storage until API is ready
- Implement request mocking (can enable real requests later)

---

## Currency Mode Requirements

### Data Source
- Currency rates available at `/api/rates`

### Functionality
- Two currency selectors (native Select elements)
- User enters value for first currency
- Second currency value calculated automatically based on:
  - Current rates
  - First currency value
  - Selected currencies

### Rate Updates
- Rates downloaded when tab opens
- Display time elapsed since last update
- Reload icon allows manual rate refresh

---

## Development Guidelines

### Architecture
- Use MirageJS for API mocking (see `mirage.js` for details)
- Developer empowered to make UX decisions when requirements are ambiguous
- May use any third-party libraries/frameworks as needed

### Commands
- **Development**: `npm run dev`
- **Build**: `npm run build`

---

## Testing Requirements

- Implement unit tests for robustness and maintainability
- Testing encouraged but not strictly required

---

## Technical Notes

### API Endpoints
- `POST /api/history` - Store operation history
- `GET /api/rates` - Retrieve currency exchange rates

### MirageJS
- Used for server mocking
- Reference `mirage.js` for implementation details
