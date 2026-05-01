# Election Sathi — Demo Script 🗳️

This document outlines the 90-second judging narrative for the Election Sathi project.

## Persona: Lakshmi
**Age**: 19
**Location**: Patna, Bihar
**Challenge**: First-time voter, Hindi-speaking, overwhelmed by complex forms.

---

## 90-Second Script

### 1. The Hook (0-15s)
**Action**: Start on the Home Page (`/`).
**Voice**: "In 2024, nearly 326 million eligible Indians did not vote. Many, like Lakshmi, are first-time voters who find the process intimidating. Meet Election Sathi, a voice-first, multilingual AI assistant that makes democracy accessible to everyone."

### 2. Voice Query & Registration (15-40s)
**Action**: Tap the microphone button.
**Input (Voice)**: "मैं पहली बार वोट दे रही हूँ, कैसे रजिस्टर करूँ?" (I am voting for the first time, how do I register?)
**Action**: AI responds in Hindi, reading aloud the Form 6 steps.
**Voice**: "Notice how Sathi responds in Lakshmi's native language. It's not just text; it's a guide. Gemini Flash identifies her intent and provides the exact ECI Form 6 checklist instantly."

### 3. Booth & ID Verification (40-65s)
**Action**: Navigate to Booth Finder (`/booth`). Show the 12 ID cards.
**Voice**: "One of the biggest myths is that you need a physical Voter ID to vote. Sathi dispels this by showing the 12 ECI-approved alternative IDs, like Aadhaar or a Bank Passbook, ensuring Lakshmi doesn't turn back from the booth."

### 4. KYC & Neutrality (65-80s)
**Action**: Go to Candidate KYC (`/candidates`). Type "Patna Sahib".
**Voice**: "Lakshmi wants to know who she is voting for. Sathi fetches candidate data—including criminal records and assets—without bias. We never recommend a candidate; we only provide the facts grounded in official ECI affidavits."

### 5. Closing & Impact (80-90s)
**Action**: Back to Home.
**Voice**: "By combining Gemini's reasoning with a voice-first UI built on the 'Impeccable' design system, we've removed the barriers of literacy and language. Election Sathi: Empowerment through every voice. Thank you."

---

## Technical Highlights for Judges
*   **Gemini Flash**: Low-latency responses for a smooth voice interaction.
*   **Impeccable Design**: Zero pure grays, large tap targets, and OKLCH color space for a premium, accessible feel.
*   **Web Speech API**: Enables offline-capable voice processing in the browser.
*   **PWA**: Installable on any smartphone, working even in low-bandwidth areas.
