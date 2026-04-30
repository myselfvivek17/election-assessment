## STEP 0 — INSTALL DESIGN SKILL FIRST (do this before reading the rest)
Before producing any plan, copy the **Impeccable** design skill into this workspace.

```bash
# from the project root
git clone --depth=1 https://github.com/pbakaus/impeccable .tmp-impeccable
mkdir -p .agent/skills .gemini/skills
cp -r .tmp-impeccable/source/skills/impeccable .agent/skills/
cp -r .tmp-impeccable/dist/gemini/.gemini/skills/* .gemini/skills/ 2>/dev/null || true
rm -rf .tmp-impeccable
```

Verify the skill is loaded by listing files at `.agent/skills/impeccable/SKILL.md`. From this point on, **every UI/UX/CSS decision must run through Impeccable's anti-patterns and commands** (`/audit`, `/critique`, `/polish`, `/normalize`, `/clarify`, `/harden`, `/typeset`, `/layout`, `/adapt`, `/distill`, `/colorize`). Do not invent design — invoke Impeccable.

## ROLE
You are a senior full-stack engineer and product designer building a hackathon submission. Plan first (produce `implementation_plan.md` and `task_list.md` as Antigravity Artifacts), then build. Use the Manager view to parallelise data ingestion, frontend, and backend wherever sensible. Cite which Google service you used for which capability in code comments.

## PROJECT NAME
**Election Sathi** — an interactive, voice-first, multilingual AI assistant that helps every Indian (including low-literacy and first-time voters) understand the election process, timelines, and steps.

## CHOSEN VERTICAL
**Civic Tech / GovTech for India** — voter education and electoral participation.

## THE PROBLEM (use these numbers in the README and in-app copy)
- 2024 Lok Sabha registered voters: 968.8M; turnout 65.79% → ~326M eligible Indians did not vote.
- ~18.5M first-time voters (18–19); ECI says only ~38% of eligible 18–19-year-olds were enrolled.
- Tens of millions of internal migrants are systemically excluded — voting is tied to the registered constituency, no remote voting exists for ordinary migrants.
- ECI's own apps (Voter Helpline, Saksham, KYC, ECINet) suffer OTP failures, English-heavy UX, broken state dropdowns, and document-upload loops.
- 22 scheduled languages, ~1,369 mother tongues; document-heavy forms exclude low-literacy users.
- 2024 was India's first major deepfake/AI-misinformation election; WhatsApp remained the dominant misinformation vector.

## TARGET USERS (design for the hardest case first)
1. Lakshmi, 19, Patna, Hindi-speaking, smartphone but limited English. Just turned 18 — never registered.
2. Ramesh, 34, daily-wage migrant worker registered in UP, working in Mumbai. Cannot afford to travel home.
3. Saraswati, 87, rural Telangana, mobility-impaired, eligible for Form 12D home voting but unaware.
4. Aditya, 22, urban student, sees deepfake WhatsApp forwards daily and wants verifiable answers.

If a feature works for Lakshmi, it works for everyone. Do not design for Aditya first.

## MVP SCOPE (build exactly these, end-to-end)
1. Conversational assistant — voice-in / voice-out + text. Hindi + English at minimum, scaffolded for any of the 22 scheduled languages via Bhashini/AI4Bharat.
2. "Am I registered?" + "How do I register?" — guided Form 6 walkthrough with a document checklist and a "find your BLO" fallback.
3. "Where do I vote? + What to bring?" — polling-station lookup (Google Maps) and a visual card listing the 12 ECI-approved alternative photo IDs. Make absolutely clear the booth slip is NOT valid ID.
4. "Who is on my ballot?" — fetch and summarise candidate KYC (assets, criminal cases, education) for one or two demo constituencies. Use a small static JSON dataset for the demo; document the API integration plan in the README.
5. Polling-day walkthrough — 9-step visual story (Officer 1 → Officer 2 → Officer 3 → EVM → VVPAT → leave). Read aloud on tap.
6. Myth-buster — at least 5 grounded rebuttals (booth slip is ID, EVMs are hackable, lost EPIC = no vote, NOTA winning = re-poll, Aadhaar is mandatory). Every answer must show its ECI/PIB source.
7. Special-needs flows — "Turning 18" countdown nudge for first-timers; "Migrant Mode" with a Form 8 transposition explainer and an honest cost-benefit message; Form 12D home-voting wizard for 85+ and PwD voters with the 5-day-window deadline reminder.
8. Accessibility toggle — large font, high contrast, screen-reader-friendly, "read aloud" on every screen.

Do NOT build: payment, login walls, party endorsement features, candidate comparison, partisan fact-checking. Refuse those at the prompt level.

## TECH STACK (Google-first — this maps to the "Google Services" rubric)
- IDE / agent: Google Antigravity with Gemini 3 Pro (planning + code generation), Gemini 3 Flash (chat replies), Gemini 2.5 Computer Use (only if needed for browser scraping).
- LLM API: Gemini API (`gemini-3-pro` for reasoning, `gemini-3-flash` for chat) via Vertex AI or AI Studio key. Use grounding with Google Search for any time-sensitive answer.
- Frontend: Next.js 15 (App Router) + Tailwind, deployed as a PWA (offline-first, installable). shadcn/ui for components.
- **Design language:** Impeccable skill (`.agent/skills/impeccable`). Every component goes through `/audit` → `/normalize` → `/polish` before merge. Per Impeccable: tinted neutrals (no pure gray), modular type scale, no card-in-card, OKLCH for color, dignified motion (no elastic/bounce), tap targets ≥48px (already enforced by accessibility skill).
- Backend: Firebase — Auth (phone OTP), Firestore (user state, reminders), Cloud Functions for serverless endpoints, Firebase Hosting for the PWA, Firebase App Check for abuse prevention.
- Maps: Google Maps Platform — Places + Directions for polling-station lookup and walking directions.
- Voice:
  - Primary demo: Web Speech API (works offline, zero cost, easy demo).
  - Production claim: Bhashini API for Indic ASR/TTS, with AI4Bharat IndicWhisper / IndicTTS as fallback. Stub the Bhashini call behind an interface so the swap is one line.
- Translation: Gemini for inline translation; document IndicTrans2/3 as fallback.
- Data layer:
  - Static JSON for demo polling-stations and candidate-KYC samples (keep it tiny — under 1MB).
  - Document the production data sources: voters.eci.gov.in, ECINet KYC module, MyNeta, OGD Platform India (data.gov.in).
- Analytics: Firebase Analytics with anonymised events only. Never log PII.

Optional WhatsApp/IVR channel: stub the integration with a clean interface (`/lib/channels/`) so you can plug in Twilio/Exotel later. Don't actually build it for the MVP.

## ARCHITECTURE (target this)
/app                   Next.js 15 App Router (PWA)
  /(routes)
    /                 Home: language picker → main chat
    /register         Form 6 wizard
    /booth            Polling-station finder
    /candidates       KYC summary
    /poll-day         9-step walkthrough
    /myths            Myth-buster
    /home-voting      Form 12D wizard
/components           UI primitives (large-text, high-contrast variants)
/lib
  /ai                 Gemini client, prompt templates, source-grounding
  /channels           Voice (web speech), Bhashini stub, WhatsApp stub
  /data               Static JSON datasets (booths, candidates, myths)
  /firebase           Auth, firestore helpers
/functions            Firebase Cloud Functions
/public               Icons, PWA manifest, sample audio
/.agent/skills        Antigravity Skills (see below)
/tests                Vitest + Playwright

## ANTIGRAVITY SKILLS (1 installed + 5 to create)
The Impeccable skill is already installed in Step 0. Generate the five `SKILL.md` files below in `.agent/skills/` BEFORE writing any feature code, and reference all six in every prompt.

0. **`impeccable/`** (installed) — Frontend design backbone. All UI work obeys Impeccable's anti-patterns: no Inter, no purple gradients, no nested cards, no gray-on-color, no bounce easing. Use OKLCH-tinted neutrals, modular type scales, and respect `prefers-reduced-motion`. After every UI milestone, the agent MUST run `/audit` then `/critique` then `/polish` and commit the diff.

1. `civic-neutrality/SKILL.md` — Always cite an ECI / PIB / SVEEP source link with every factual claim. Never name a preferred party or candidate. Refuse opinions on whom to vote for; redirect to the candidate KYC view. Never reproduce party slogans or campaign material.
2. `indic-localization/SKILL.md` — All user-facing strings live in `/lib/i18n/{lang}.json`. Never hardcode strings in components. Default language Hindi; fall back to English. Add stubs for `te`, `ta`, `bn`, `mr`.
3. `accessibility/SKILL.md` — Every interactive element has an aria-label. Tap targets ≥48×48px. Contrast ≥WCAG AA. Every screen has a "read aloud" button. No reliance on colour alone.
4. `security-and-privacy/SKILL.md` — Never store EPIC/Aadhaar/phone server-side beyond the active session. No PII in logs or analytics. Sanitize all Gemini outputs before rendering (no raw HTML). Validate all inputs with zod schemas. Use Firebase App Check on every callable function. Apply rate limits.
5. `misinfo-guardrails/SKILL.md` — If a user asks the bot to evaluate a specific candidate's claim, refuse and offer the candidate's official KYC affidavit instead. Only debunk process-level myths from a curated list.

## EVALUATION CRITERIA — MAP EVERY DECISION TO ONE
Add a `## How we addressed each rubric` section in the README with concrete bullet points. Use this as the checklist while building:

- **Code Quality** — TypeScript strict mode, ESLint + Prettier, conventional commits, no `any`, max function length 50 lines, components ≤200 lines, JSDoc on every exported function. Frontend additionally passes `npx impeccable detect src/` with zero anti-pattern hits in CI.
- **Accessibility** — Voice-first, large-text mode, high-contrast theme, screen-reader-tested, keyboard-only navigable, captions on all audio, simple language (Class 5 reading level in English; equivalent in Hindi), iconography on every option, no hard dependence on text. Visual hierarchy, type, spacing, motion, and color audited via Impeccable `/audit` and `/critique` on every route.
- Security — Firebase App Check, zod input validation, no secrets in repo (`.env.example` only), CSP headers, output sanitization, rate limiting on Cloud Functions, OWASP-aware. No PII in client logs. Document the threat model briefly.
- Efficiency — Edge runtime where possible, image optimisation via `next/image`, lazy-load every route, cache Gemini responses for static FAQs, debounce voice inputs, use `gemini-3-flash` for chat and `gemini-3-pro` only for complex flows. Bundle size budget: ≤200KB JS first load.
- Testing — Vitest unit tests for `/lib/**`, Playwright E2E for the three critical flows (register, find-booth, poll-day-walkthrough), accessibility tests via axe-core, ≥70% line coverage on `/lib`. Provide a `pnpm test` script and a CI workflow file.
- Google Services — Gemini 3 Pro/Flash, grounding with Google Search, Firebase Auth/Firestore/Functions/Hosting/App Check/Analytics, Google Maps Platform. List each one and the file path where it's used in the README.

## DELIVERABLES
1. ONE Git repository, single branch (`main`), <10MB total. Use `.gitignore` aggressively (no `node_modules`, no large binaries, no audio files >100KB — generate audio at runtime). Include a `LICENSE` (MIT) and `.env.example`.
2. README.md with these sections in this order:
   - Title + one-line tagline
   - Chosen vertical (Civic Tech / GovTech for India)
   - The problem (3–4 stat-driven sentences from the numbers above)
   - Approach and logic (the four design principles: voice-first, source-grounded, neutral, accessible)
   - How the solution works (architecture diagram in Mermaid, user flow per persona)
   - How we addressed each evaluation rubric (mapped bullets)
   - **Design system & Impeccable** (which Impeccable commands were run on which routes, with before/after screenshots from the `/audit` artifacts)
   - Google Services used (table: service → purpose → file path)
   - Setup & run locally (5-minute path; assume the reader has Node 20 and a Gemini API key)
   - Demo script (90-second narrative for judges)
   - Assumptions and caveats (no live ECI API; static demo data for candidates; English+Hindi only in MVP; production would use Bhashini for full 22-language support; SIR/EVM political controversies are not adjudicated; voter PII never persisted)
   - Roadmap (WhatsApp Business API, IVR for feature phones, full 22-language Bhashini integration, ECI partnership for live data)
   - Acknowledgments (ECI, SVEEP, AI4Bharat, Bhashini, Sarvam, Janaagraha, ADR/MyNeta)
3. A short `DEMO.md` with the exact judging-day script, including the persona walkthrough.
4. A `prompts/` folder with the system prompts used for Gemini, so judges can audit neutrality and grounding.

## FIRST FOUR ACTIONS (do these in order, output Artifacts after each)
1. Read this PRD. Produce `implementation_plan.md` with a milestone-broken plan, file tree, and risk list. STOP and let me review before writing code.
2. Once I approve, scaffold the Next.js + Firebase + PWA project, create the five `SKILL.md` files, set up CI, and commit.
3. Build the chat shell with Gemini Flash + voice in/out + language toggle. Demo on `/`.
4. Then build the four core flows in parallel via Manager view: register, booth, candidates, poll-day-walkthrough. After each flow lands, the agent runs `/audit <flow>` then `/critique <flow>` then `/polish <flow>` and commits the result as a separate "design pass" commit. Final pass before submission: `/audit` and `/polish` on the whole app.
## CONSTRAINTS (hard)
- Single Git branch, <10MB.
- No login required to read anything; phone OTP only when the user opts into reminders.
- No party logos, no candidate photos beyond official ECI affidavit data.
- Every factual claim shows its source (clickable link to ECI/PIB).
- Default safe response if Gemini is unsure: "I'm not certain — here's the official ECI page for this question: <link>."
- All copy at Class-5 reading level. Test with `text-readability` lib.
- The app must be usable with the phone on silent and one hand.

## TONE OF THE BOT
Warm, neutral, like a helpful neighbourhood election volunteer. Never partisan. Never preachy. Never scolds the user for not knowing. Always offers a "What next?" button.

## ONE THING I CARE ABOUT MOST
Trust. A judge — and a real voter — must be able to click any answer and see the ECI source behind it within one tap. If you have to choose between a clever feature and clearer source-citation, pick the citation.

---

Now begin with action 1: produce `implementation_plan.md` only. Do not write code yet.