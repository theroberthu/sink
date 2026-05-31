// Lightweight anonymous session id. No user accounts in V1.
// Stored in localStorage so we can correlate clicks and submissions for one visitor.

const SESSION_KEY = "scf_session_id";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `scf_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Returns a stable anonymous session id for the current browser.
 * Safe to call on the server, where it returns a transient id that is not persisted.
 */
export function getSessionId(): string {
  if (typeof window === "undefined") {
    return generateId();
  }

  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) {
      return existing;
    }
    const fresh = generateId();
    window.localStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    // localStorage can throw in private mode. Fall back to a transient id.
    return generateId();
  }
}
