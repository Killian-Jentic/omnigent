export type LatestSessionError = "error" | "disconnected" | "recovered_disconnect";

/** Server-maintained latest-activity error: "error", "disconnected" or "" (absent means none). */
export const LATEST_ACTIVITY_ERROR_LABEL_KEY = "omnigent.latest_activity_error";

/**
 * Map the server's latest-activity label to the sidebar badge. A disconnect stops
 * being a badge once its host is back online.
 */
export function latestErrorFromLabels(
  labels: Readonly<Record<string, string>> | undefined,
  hostOnline: boolean | null | undefined,
): LatestSessionError | null {
  const value = labels?.[LATEST_ACTIVITY_ERROR_LABEL_KEY];
  if (value === "error") return "error";
  if (value === "disconnected") {
    return hostOnline === true ? "recovered_disconnect" : "disconnected";
  }
  return null;
}
