import { Capacitor } from "@capacitor/core";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User,
} from "firebase/auth";

const EMAIL_STORAGE_KEY = "senior_home_mods_email_for_sign_in";

/**
 * Handles Google Sign-In:
 * - On Native Android: Uses @capacitor-firebase/authentication to trigger the native
 *   Google Play Services account picker sheet, avoiding Google's webview disallowed_useragent block.
 * - On Web Browser: Uses standard Firebase popup/redirect auth.
 */
export async function nativeOrWebGoogleSignIn(): Promise<{ user?: User | null; success: boolean; error?: string }> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { FirebaseAuthentication } = await import("@capacitor-firebase/authentication");
      const result = await FirebaseAuthentication.signInWithGoogle();

      if (auth && result.credential?.idToken) {
        const credential = GoogleAuthProvider.credential(result.credential.idToken);
        const userCredential = await signInWithCredential(auth, credential);
        return { user: userCredential.user, success: true };
      }
      return { success: true };
    } else {
      if (!auth) {
        return { success: true };
      }
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      return { user: userCredential.user, success: true };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn("Google sign-in status:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Sends a passwordless sign-in email link configured with Android App Links parameters.
 */
export async function sendSignInEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(EMAIL_STORAGE_KEY, email);
    }
    if (!auth) {
      return { success: true };
    }
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const actionCodeSettings = {
      url: `${origin}/sign-in`,
      handleCodeInApp: true,
      android: {
        packageName: "com.seniorhomemods.app",
        installApp: true,
        minimumVersion: "1",
      },
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn("Send email link status:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Completes sign-in if the user opened the app via an email sign-in link.
 */
export async function checkAndCompleteEmailLink(incomingUrl?: string): Promise<{ success: boolean; user?: User | null }> {
  if (typeof window === "undefined" || !auth) {
    return { success: false };
  }

  const currentUrl = incomingUrl || window.location.href;
  if (!isSignInWithEmailLink(auth, currentUrl)) {
    return { success: false };
  }

  let email = window.localStorage.getItem(EMAIL_STORAGE_KEY);
  if (!email) {
    email = window.prompt("Please confirm your email address to complete sign in:");
  }

  if (!email) {
    return { success: false };
  }

  try {
    const result = await signInWithEmailLink(auth, email, currentUrl);
    window.localStorage.removeItem(EMAIL_STORAGE_KEY);
    return { success: true, user: result.user };
  } catch (err) {
    console.warn("Error completing email link sign in:", err);
    return { success: false };
  }
}

/**
 * Listens for incoming Android App Links / deep links when opened from email or browser.
 */
export function setupAppLinksListener(onLinkOpened: (url: string) => void): () => void {
  if (typeof window === "undefined" || !Capacitor.isNativePlatform()) {
    return () => {};
  }

  let removeListener: (() => void) | undefined;
  import("@capacitor/app").then(({ App }) => {
    const listenerPromise = App.addListener("appUrlOpen", (data) => {
      onLinkOpened(data.url);
    });
    removeListener = () => {
      listenerPromise.then((h) => h.remove());
    };
  });

  return () => {
    if (removeListener) removeListener();
  };
}
