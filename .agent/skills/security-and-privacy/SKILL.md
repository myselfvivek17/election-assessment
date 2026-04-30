# Security and Privacy

Never store EPIC/Aadhaar/phone server-side beyond the active session. No PII in logs or analytics. Sanitize all Gemini outputs before rendering (no raw HTML). Validate all inputs with zod schemas. Use Firebase App Check on every callable function. Apply rate limits.
