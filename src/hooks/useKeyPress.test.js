import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useKeyPress from "./useKeyPress.js";

describe("useKeyPress", () => {
  it("calls callback when correct key pressed", async () => {
    const user = userEvent.setup();
    const keyCode = "Space";
    const cb = vi.fn();
    renderHook(() => useKeyPress(keyCode, cb));

    await user.keyboard(" ");

    expect(cb).toHaveBeenCalledOnce();
  });

  it("does not call callback when wrong key pressed", async () => {
    const user = userEvent.setup();
    const keyCode = "Space";
    const cb = vi.fn();
    renderHook(() => useKeyPress(keyCode, cb));

    await user.keyboard("Esc");

    expect(cb).not.toBeCalled();
  });

  it("throws an error when key code is not a string", async () => {
    const keyCode = 32;
    const cb = vi.fn();

    expect(() => useKeyPress(keyCode, cb)).toThrowError();
  });

  it("throws an error when callback is not a function", async () => {
    const keyCode = "Esc";
    const cb = "not a callback";

    expect(() => useKeyPress(keyCode, cb)).toThrowError();
  });
});
