# Counter Component Visual Test Documentation

## Test Overview
This document describes the visual testing procedure for the counter component in the UIGen application.

## Test Objective
Verify that the counter component displays correctly and increments properly when the increment button is clicked.

## Prerequisites
- Server running at http://localhost:3000
- Counter component generated in the UIGen interface

## Test Procedure

### Step 1: Generate Counter Component
1. Open http://localhost:3000 in a browser
2. In the chat interface, enter the following prompt:
   ```
   Create a simple counter component with an increment button
   ```
3. Wait for Claude to generate the component code
4. Verify the component appears in the preview panel

### Step 2: Initial State Verification
**Screenshot Required:** `counter-initial.png`

Verify the following:
- [ ] Counter component is visible in the preview panel
- [ ] Initial counter value displays as `0`
- [ ] Increment button is visible and labeled appropriately (e.g., "Increment", "+", or similar)
- [ ] Component has appropriate styling and is user-friendly

**Expected State:**
- Counter value: 0
- Button state: Ready to click
- No console errors

### Step 3: Increment Button Interaction
Perform the following actions:
1. Click the increment button **once**
   - Verify counter changes from 0 to 1
2. Click the increment button a **second time**
   - Verify counter changes from 1 to 2
3. Click the increment button a **third time**
   - Verify counter changes from 2 to 3

### Step 4: Final State Verification
**Screenshot Required:** `counter-final.png`

Verify the following:
- [ ] Counter displays the value `3`
- [ ] Button remains functional and clickable
- [ ] No visual glitches or rendering issues
- [ ] Component state persists correctly

**Expected State:**
- Counter value: 3
- Button state: Ready for additional clicks
- No console errors

## Test Results

### Screenshots Location
Screenshots should be saved in the following location:
- `counter-initial.png` - Initial state (counter at 0)
- `counter-final.png` - Final state (counter at 3)

### Verification Checklist
- [ ] Counter component renders correctly
- [ ] Initial value is 0
- [ ] Increment button is functional
- [ ] Each click increments the counter by 1
- [ ] Final value after 3 clicks is 3
- [ ] No console errors or warnings
- [ ] Component styling is appropriate
- [ ] User interaction is smooth and responsive

## Component Requirements Verified
Based on this visual test, the counter component should demonstrate:

1. **State Management**: Properly maintains and updates counter state
2. **Event Handling**: Responds correctly to button click events
3. **Rendering**: Displays current count value accurately
4. **User Interaction**: Provides clear, clickable UI elements
5. **Reactivity**: Updates display immediately upon state change

## Additional Notes
- This test validates basic functionality of the component generator
- The counter is a simple but effective test case for state management
- Successfully generating and interacting with the counter demonstrates that:
  - The chat interface correctly communicates with the API
  - Claude's code generation produces valid, executable React code
  - The sandbox iframe properly renders and executes the generated code
  - State management within the sandbox functions correctly

## Manual Testing Instructions
Since automated Playwright testing requires additional tool permissions, this test should be performed manually:

1. Navigate to http://localhost:3000
2. Use the chat to generate a counter component
3. Take screenshot of initial state (counter at 0)
4. Click increment button 3 times
5. Take screenshot of final state (counter at 3)
6. Save screenshots as `counter-initial.png` and `counter-final.png`
7. Verify all items in the verification checklist above

## Future Improvements
To automate this test in the future:
1. Install Playwright as a dev dependency
2. Create `tests/visual/counter.spec.ts` with automated test
3. Configure Playwright to run visual regression testing
4. Set up GitHub Actions workflow to run tests on PRs

Example automated test structure:
```typescript
import { test, expect } from '@playwright/test';

test('counter component increments correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Generate counter component via chat
  await page.fill('[data-testid="chat-input"]', 'Create a counter component');
  await page.click('[data-testid="send-button"]');

  // Wait for component to render
  await page.waitForSelector('[data-testid="preview-frame"]');

  // Take initial screenshot
  await page.screenshot({ path: 'counter-initial.png' });

  // Click increment button 3 times
  const incrementButton = page.frameLocator('iframe').locator('button:has-text("Increment")');
  await incrementButton.click();
  await incrementButton.click();
  await incrementButton.click();

  // Take final screenshot
  await page.screenshot({ path: 'counter-final.png' });

  // Verify final count
  const counter = page.frameLocator('iframe').locator('[data-testid="counter-value"]');
  await expect(counter).toHaveText('3');
});
```

---

**Test Status**: Manual testing required (Playwright tools not currently available)
**Date Created**: 2025-12-28
**Created By**: Claude Code
