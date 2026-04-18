
## Plan: Ora v2 — Handoff, Audio, Collaboration & Insights

I'll extend the existing Ora demo with 4 connected features. All hardcoded, no backend.

### 1. Audio system (foundation — built first)

Create `src/lib/audio.ts`:
- `AudioManager` singleton with `muted` state + `subscribe()` for React.
- `playTone(freq, duration)` and `playSequence([{freq,dur}])` using Web Audio API (sine, soft gain envelope to avoid clicks).
- `playRingtone()`, `playHoldMusic()` (loop), `stopHoldMusic()`, `playConnect()`, `playDisconnect()`, `playHintChime()` (800Hz, 200ms).
- External URLs (`soundjay.com`) loaded into `HTMLAudioElement`. All `.play()` calls wrapped in try/catch — silent failure on autoplay block.

Create `src/hooks/useAudio.ts` exposing `{ muted, toggleMute, play* }`.

Add a top header bar in `src/pages/Index.tsx` (above main content) with screen title + mute toggle (Volume2 / VolumeX icon). Persists across screens via the manager singleton.

### 2. Sidebar update

Update `Sidebar.tsx` `Screen` type to add `"handoff"` and `"insights"`. New icons: `SplitSquareHorizontal`, `BarChart3`. Update `titles` map in `Index.tsx` and route to new components.

### 3. Feature 1 — Handoff system (modify `LiveCalls.tsx`)

Add state: `onHold`, `holdSeconds`, `showJoinModal`, `humanJoined`, `countdown` (15→0).

UI additions:
- AI Co-Pilot panel: new "Involve Human Agent" button (UserPlus icon). Auto-pulses red `animate-pulse` after `visibleHints.length >= 4`. Tooltip on hover.
- Center call panel: new violet "Join This Call" button next to existing toggle.
- When triggered → `onHold=true`: waveform replaced with pulsing "Customer on hold…" banner + hold timer (interval increments `holdSeconds`). Trigger `playHoldMusic()`.
- Full-screen modal `<HandoffReviewModal>`: large countdown (text-7xl), Progress bar (existing `progress.tsx`) depleting from 100→0, briefing card with all listed context, "I'm ready — connect me now" button.
- On countdown 0 or skip: close modal, `humanJoined=true`, stop hold music, `playConnect()`, banner becomes green "You are live — AI is co-piloting", waveform resumes. Brief simulated voice playback (use a Web Speech API `SpeechSynthesisUtterance` saying "Thank you for holding…" — wrapped in try/catch).
- Floating bottom-right `<CustomerView>` card: phone UI (Phone icon), "Please hold…" text, mirrored hold timer. Renders only while `onHold && !humanJoined`.

### 4. Feature 2 — Audio wiring

- On `LiveCalls` mount: `playRingtone()` twice then auto-clear (use timeouts). Optional "Simulate Incoming Call" replay button in header of call panel.
- On each new hint becoming visible (track previous count via ref): `playHintChime()`.
- On End Call button: `playDisconnect()` then show summary.
- Hold/connect already wired in Feature 1.

### 5. Feature 3 — `ActiveHandoff.tsx` (new)

Two-column grid `grid-cols-2` with center divider.
- **Left** (`bg-info-soft/30`): "Ora AI" header w/ Sparkles + green badge. Vertical timeline of 8 timestamped actions (dot + line via border-l). "Data extracted" card (key/value rows). Green "Passed to human" badge.
- **Center divider**: absolute vertical line w/ centered chip "Handoff point: 9:04:12" + `ArrowLeftRight` icon.
- **Right** (`bg-success-soft/30`): "Maya R." header + Live badge. Briefing card. Live transcript: array of 5 lines, `useEffect` adds one every 6s with fade-slide-in animation. Working `<Textarea>` for notes (local state). "Resolve & Return to AI" button → toast + reset.

### 6. Feature 4 — `ProductInsights.tsx` (new)

- Header with title, date-range `<Select>` (shadcn), violet "Download Report" button (Download icon).
- 4 stat cards reusing existing card style.
- Table (`table.tsx`) with 7 hardcoded rows. Priority shown as colored dot + text. Each `<TableRow>` clickable → toggles `expandedId` state; expanded row shows transcript summary + handoff moment + human action in a `<TableRow>` with full colspan.
- CSS bar chart: 5 rows, each is a flex row `[label | bar div with width % | count]`. Widths: 100%, 56%, 44%, 33%, 22%. Color via `bg-destructive`, `bg-warning`, etc.
- Recommendations: 3 cards in `grid-cols-3`, border-l-4 in red/red/yellow.
- Download CSV: build string from rows array, `new Blob([csv], {type:'text/csv'})`, `URL.createObjectURL`, anchor click, revoke. Filename `ora-product-insights-dec2024.csv`.

### Files to create
- `src/lib/audio.ts`
- `src/hooks/useAudio.ts`
- `src/components/ora/ActiveHandoff.tsx`
- `src/components/ora/ProductInsights.tsx`
- `src/components/ora/CustomerView.tsx`
- `src/components/ora/HandoffReviewModal.tsx`

### Files to modify
- `src/components/ora/Sidebar.tsx` — add 2 nav items + types
- `src/components/ora/LiveCalls.tsx` — handoff buttons, hold state, audio hooks
- `src/pages/Index.tsx` — header bar w/ mute toggle, new screen routes
- `src/index.css` — add subtle pulse-red keyframe if needed (or reuse `animate-pulse`)

### Technical notes
- Audio singleton avoids duplicate playback across re-renders.
- All external audio URLs may be CORS/autoplay-blocked — wrapped in try/catch, no UI errors.
- Countdown uses `setInterval` cleared on unmount/skip.
- Transcript animation reuses existing `animate-fade-slide-in` class.
- CSV generation is pure client-side, no library needed.

