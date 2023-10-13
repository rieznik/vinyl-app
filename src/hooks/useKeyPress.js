import { useEffect } from "react";

function useKeyPress(keyCode, cb) {
  if (typeof cb !== "function") {
    throw new Error("Passed callback is not a function");
  }

  if (typeof keyCode !== "string") {
    throw new Error(`keyCode should be a string, e.g. "KeyA", "Space"`);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === keyCode) {
        event.preventDefault();
        cb();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
}

export default useKeyPress;
