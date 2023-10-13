import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function useMeasure() {
  const elementRef = useRef(null);
  const [rect, setRect] = useState(null);

  const getRect = useCallback((element) => {
    const { width, height, top, right, bottom, left } =
      element.getBoundingClientRect();
    return { width, height, top, right, bottom, left };
  }, []);

  const ref = useCallback(
    (element) => {
      if (!element) return;
      if (!rect) setRect(getRect(element));
      elementRef.current = element;
    },
    [getRect, rect]
  );

  useEffect(() => {
    function handleWindowResize() {
      setRect(getRect(elementRef.current));
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return useMemo(() => ({ ref, ...rect }), [rect, ref]);
}

export default useMeasure;
