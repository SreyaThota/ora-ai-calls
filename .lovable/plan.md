
## Plan: Fix call control button states after call ends

### Problem
After the call ends (summary modal shown), the "End Call" button stays active and other controls behave inconsistently. The user wants:
1. **End Call button** → disabled once the call has ended
2. **You Control / AI Handling toggle** and **Join This Call** button → also disabled once the call has ended (they shouldn't be actionable when no call is in progress)

(Re-reading the request: "activate You Control button and Join this call should activate" — this reads ambiguously, but in context of "when the call is off, end call has to be disabled," the consistent interpretation is that ending the call should deactivate all live-call controls. I'll confirm with one quick question to be safe.)

### Changes (single file: `src/components/ora/LiveCalls.tsx`)

1. **Add `callEnded` state** — set to `true` inside `handleEndCall` (alongside opening the summary modal). Stop the call timer when true.

2. **Disable End Call button** when `callEnded` is true (opacity-50, cursor-not-allowed, no onClick effect).

3. **Disable the AI/Human toggle and Join This Call buttons** when `callEnded` is true (extend the existing `disabled` conditions which already cover `humanJoined` / `onHold`).

4. **Disable "Involve Human Agent" button** too for consistency.

5. **Status bar** — when `callEnded`, show a neutral "Call ended" label with a gray dot instead of the green pulsing "Call in progress".

6. **Waveform** — freeze (render static bars at 60% height with no animation) when `callEnded`.

### Notes
- Closing the summary modal will NOT reset `callEnded` — the call remains ended until the page is refreshed (matches current demo behavior, no "new call" button exists).
- No other files need changes.

