# Ora: AI in every call

An interactive product demo of **Ora**, an AI-native phone system for B2C support teams. It shows how an AI agent could handle a live customer call, brief the human agent before they pick up, and hand the call over smoothly when a person needs to step in.

**Live demo:** https://ora-ai-calls.vercel.app

## What you can try
- **Live Calls**: a simulated incoming call with a pre-call AI briefing (predicted intent, customer value, last order), a live transcript, and a sentiment timeline.
- **Human handoff**: take control of the call, join it, or bring in a human agent, then review the handoff summary.
- **Proactive Outreach**: AI-initiated outreach to customers before they call.
- **Product Insights**: themes and issues aggregated across calls.
- **Team Overview**: agent and AI performance at a glance.

## Status
A front-end prototype built for a hackathon pitch. All call data is simulated in the browser; there is no telephony, backend or real AI model behind it.

## Tech
React, TypeScript, Vite, Tailwind CSS and shadcn/ui. Built with the Lovable AI app builder, so most commits come from its bot account.

## Run locally
```bash
npm install
npm run dev
```
