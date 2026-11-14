import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useIsMobile } from "./use-mobile";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useIsMobile", () => {
  it("updates the mobile state when the media query changes", () => {
    const events = new EventTarget();
    const removeEventListener = vi.fn();
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: events.addEventListener.bind(events),
      removeEventListener,
      dispatchEvent: vi.fn(() => true),
    }));
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(560);
    const { result, unmount } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1280);
    act(() => { events.dispatchEvent(new Event("change")); });
    expect(result.current).toBe(false);
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});