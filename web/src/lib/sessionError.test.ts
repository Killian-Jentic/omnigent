import { describe, expect, it } from "vitest";
import { latestErrorFromLabels, LATEST_ACTIVITY_ERROR_LABEL_KEY } from "./sessionError";

const labels = (value: string) => ({ [LATEST_ACTIVITY_ERROR_LABEL_KEY]: value });

describe("latestErrorFromLabels", () => {
  it("shows no badge when the label is absent or empty", () => {
    expect(latestErrorFromLabels(undefined, true)).toBeNull();
    expect(latestErrorFromLabels({ other: "1" }, false)).toBeNull();
    expect(latestErrorFromLabels(labels(""), true)).toBeNull();
  });

  it("maps an error label to the error badge regardless of host liveness", () => {
    expect(latestErrorFromLabels(labels("error"), true)).toBe("error");
    expect(latestErrorFromLabels(labels("error"), null)).toBe("error");
  });

  it("keeps a disconnect until the host is back online", () => {
    expect(latestErrorFromLabels(labels("disconnected"), false)).toBe("disconnected");
    expect(latestErrorFromLabels(labels("disconnected"), null)).toBe("disconnected");
    expect(latestErrorFromLabels(labels("disconnected"), true)).toBe("recovered_disconnect");
  });
});
