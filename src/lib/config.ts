// App-wide settings. Values come from .env.local (never put secret keys here).

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";

/** True only when a real Firebase project is set in .env.local (not the placeholders). */
export const isFirebaseConfigured =
  projectId.length > 0 &&
  !projectId.includes("YOUR") &&
  !projectId.includes("[") &&
  apiKey.length > 0 &&
  !apiKey.includes("Placeholder");

export const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "(800) 555-0199";
export const SUPPORT_PHONE_TEL = process.env.NEXT_PUBLIC_SUPPORT_PHONE_TEL || "+18005550199";

/** Turn on the AI chat helper only after the Cloud Function is deployed and approved. */
export const isChatEnabled = process.env.NEXT_PUBLIC_AI_CHAT_ENABLED === "true" && isFirebaseConfigured;

// Official USDA pages (checked Nov 2026).
export const USDA_OFFICE_FINDER_URL = "https://www.rd.usda.gov/find-your-local-area-office";
export const USDA_504_PROGRAM_URL =
  "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-repair-loans-grants";

// Optional Guided Application Support service. Shown in full before any agreement or payment.
// HUD (24 CFR 214.313): fees must be reasonable, disclosed first, and waived for people who can't afford them.
export const SERVICE_FEE = "$150";
export const SERVICE_INCLUDES = [
  "Personalized application preparation guidance",
  "Help organizing required documents",
  "Application readiness review",
];
