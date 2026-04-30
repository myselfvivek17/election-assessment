# Election Sathi 🇮🇳

An interactive, voice-first, multilingual AI assistant PWA for voter education in India. Built with Next.js 15, Gemini Flash, and Tailwind CSS.

## How to Run the App

1. **Environment Variables**: 
   Ensure you have a `.env` or `.env.local` file in the root directory with your Gemini API key:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   ```

2. **Start the Development Server**:
   Run the following command in your terminal:
   ```bash
   npm run dev
   ```

3. **Open the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to interact with Election Sathi.

---

## Project Walkthrough

Here is a summary of the features we built (previously saved in the Antigravity artifact manager):

### Core Features
- **Chat Shell (`/`)**: Voice-first chat interface connected to Google's Gemini Flash model, pre-configured with a strict system prompt to ensure civic neutrality and reliable ECI citations. Integrated with Web Speech API for seamless bilingual interaction.
- **Voter Registration (`/register`)**: Guided Form 6 walkthrough, eligibility checks, and a document checklist.
- **Booth Finder (`/booth`)**: Search functionality paired with the crucial 12 ECI-approved photo IDs display.
- **Know Candidates (`/candidates`)**: Detailed KYC cards highlighting criminal cases and assets.
- **Poll Day Walkthrough (`/poll-day`)**: Interactive 9-step timeline of the voting process with "Read Aloud" capabilities.
- **Myth Buster (`/myths`)**: Debunking critical misinformation around online voting and EVMs.

### Technical Achievements
- **Scaffold & Infrastructure**: Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui. PWA configuration enabled via `next-pwa`.
- **Accessibility & Design**: Adheres to Impeccable design guidelines. All animations respect OS-level `prefers-reduced-motion` settings (using `motion-safe:` prefix). Zero pure grays (OKLCH tinted neutrals).
- **Code Health**: 100% clean `npm run lint` with zero errors. All strict React side-effect issues resolved.
