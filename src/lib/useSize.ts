import { RefObject, useEffect, useState } from "react";

export const useSize = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState([0, 0] as [number, number]);
  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    const { width, height } = current.getBoundingClientRect();
    setSize([width, height]);

    const observer = new ResizeObserver(([entry]) => {
      const [{ inlineSize, blockSize }] = entry.borderBoxSize;
      setSize([inlineSize, blockSize]);
    });

    observer.observe(ref.current!);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return size;
};