# Ora: AI Calling

Build a complete interactive demo called "Ora" — an AI-native phone system for B2C companies. This is a hackathon demo, not a real app. Everything is simulated/hardcoded to look and feel real.

## Stack

React + Tailwind CSS. Single page app. No backend, no auth, no database. All data is hardcoded.

## Brand

Name: Ora. Tagline: "AI in every call." Clean, modern, minimal design. Dark sidebar, white main area. Professional B2B SaaS aesthetic like Linear or Notion.

## The app has 3 screens navigable from a left sidebar:

---

### SCREEN 1: "Live Calls" (default screen)

This simulates an active incoming call from a customer named "Sarah Chen" about a delayed order.

**Layout: 3 columns**

LEFT COLUMN — Customer Intel (pre-call AI briefing):

- Avatar with initials "SC", name "Sarah Chen", phone "+1 (415) 555-0291"

- AI Predicted Intent badge (purple): "Delayed order enquiry — 91% confidence"

- Customer stats: "Lifetime value: $2,840 | 3 previous calls | Sentiment: Positive"

- Last order card: "Order #4821 — Wireless Headphones — 3 days delayed — Expected Dec 12"

- Section title "AI Briefing" with 3 bullet points:

  - "High-value customer, handle with priority"

  - "Mention express reship option — 78% acceptance rate"

  - "Her daughter's birthday is Dec 15 — time-sensitive"

CENTER COLUMN — Live Call Panel:

- Status bar at top: green pulsing dot "Call in progress" and a timer counting up from 0:00 (actually animates using useEffect + setInterval)

- Animated waveform (CSS animation, 5 bars bouncing at different speeds to simulate audio)

- Below waveform: section titled "AI Co-Pilot" — this is a chat-style feed of AI hints that appear one by one every 7 seconds automatically:

  Hint 1 (appears at 0s): "Customer confirmed order #4821. Delay caused by warehouse issue in Memphis."

  Hint 2 (appears at 7s): "Offer express reship — estimated delivery Dec 13. Cost: $0 to customer."

  Hint 3 (appears at 14s): "She mentioned her daughter's birthday. Acknowledge this — high empathy moment."

  Hint 4 (appears at 21s): "Sentiment positive. She accepted the reship offer. Begin closing."

  Hint 5 (appears at 28s): "Suggest $20 store credit as goodwill gesture. 94% satisfaction rate for this segment."

  Each hint has a small AI sparkle icon and slides in with a fade animation.

- Big button at bottom: toggle between "AI Handling Call" (blue) and "Take Over" (green). Clicking switches mode. When human takes over, a banner appears: "You have control — AI is listening"

RIGHT COLUMN — Resolution Panel:

- Title "Suggested Resolution" with 3 steps that appear progressively:

  Step 1: "Confirm order delay and apologize" — checkbox, auto-checks at 5s

  Step 2: "Offer free express reship" — checkbox, auto-checks at 15s  

  Step 3: "Apply $20 goodwill credit" — checkbox, auto-checks at 28s

- Below: "Auto-filling CRM" section — fields that populate themselves:

  Issue type: "Delayed delivery" (fills at 3s)

  Resolution: "Express reship + credit" (fills at 20s)

  Outcome: "Resolved — customer satisfied" (fills at 32s)

- At bottom: "End Call & Auto-Summarize" button (red). Clicking it shows a modal with a generated call summary, outcome, and "Synced to CRM ✓"

---

### SCREEN 2: "Proactive Outreach"

This is the most unique screen. AI proactively calls customers before they call us.

Header: "AI Outreach — Today" with subtitle "AI identified 14 customers who need proactive contact"

A table with columns: Customer | Trigger Signal | AI Action | Status | Outcome

Rows (6 rows):

1. Marcus Webb | Order delayed 4 days | AI called at 9:02am | Resolved ✓ | Accepted reship, no escalation

2. Priya Nair | Payment failed x2 | AI called at 9:15am | Resolved ✓ | Updated card details

3. Tom Okafor | Subscription about to expire | AI calling now... (pulsing) | In progress | —

4. Lisa Huang | Product recalled (safety) | AI called at 10:30am | Resolved ✓ | Replacement shipped

5. James Arora | 3 failed login attempts | Scheduled 11:00am | Pending | —

6. Chloe Martin | Shipping address invalid | AI called at 8:45am | Resolved ✓ | Address corrected

Clicking any row expands it to show a transcript snippet of what the AI said on the call.

For row 1 (Marcus Webb), expanded transcript:

AI: "Hi Marcus, this is Ora calling from ShopCo. I'm reaching out because I noticed your order #3892 is running 4 days behind schedule — I wanted to get ahead of this for you..."

Marcus: "Oh wow, I hadn't even noticed yet."

AI: "We'd like to offer you a free express reship arriving tomorrow, at no cost. Would that work?"

Marcus: "Yes, that's perfect, thank you."

AI: "Done — you'll get a confirmation in 2 minutes. Have a great day."

[Call duration: 1m 12s | Resolved without human intervention]

At top right: 3 stat cards — "Resolved by AI: 11" | "Escalated to human: 2" | "Avg call time: 1m 8s"

---

### SCREEN 3: "Team & AI Overview"

A simple dashboard showing the collaboration between AI and humans.

Top stat row (4 cards):

- Total calls today: 247

- Handled by AI alone: 189 (77%)

- AI-assisted human calls: 41 (17%)

- Escalated to human only: 17 (6%)

Below: Two columns

LEFT — "Your Team" — 4 agent cards:

Each card: avatar initials, name, status (Available/On call/Break), calls handled today, AI-assist score (e.g. "92% — uses AI suggestions frequently")

Agents: Maya R. (On call), Daniel K. (Available), Sofia T. (Break), Liam J. (On call)

RIGHT — "AI Performance Today" — vertical list of metrics with colored bars:

- Intent prediction accuracy: 94%

- Resolutions without escalation: 77%

- Avg handle time reduction: 38%

- Customer satisfaction (CSAT): 4.8/5

- Proactive issues caught: 14

Below that: a simple horizontal timeline showing a single call lifecycle with 5 stages:

"Pre-call briefing → Call starts → AI co-pilot active → Resolution suggested → Auto-summary" with icons and connecting line

---

## LEFT SIDEBAR (always visible):

- App logo "Ora" with a small phone/wave icon

- Navigation items with icons: Live Calls (phone icon), Proactive Outreach (radar icon), Team Overview (users icon)

- Bottom of sidebar: "AI Status: Active" with green pulsing dot

- Current time displayed

## IMPORTANT DETAILS:

- The call timer on Screen 1 must actually count up in real time using React state + useEffect

- The AI co-pilot hints must auto-appear one by one with timing using useEffect

- The CRM fields must auto-fill with a typewriter-style animation

- The resolution checkboxes must auto-check on a timer

- All transitions should be smooth (use Tailwind transition classes)

- The whole app should feel like a real product, not a mockup

- Use lucide-react for all icons

- Color scheme: sidebar is slate-900, main area is white/gray-50, accent color is violet-600 for AI elements, green for resolved, blue for in-progress

- Make it fully responsive but optimized for a 1280px wide laptop screen for demo purposes

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ora-ai-calls.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/75d8ac21-df74-42d5-a0a3-7c3353d083eb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
