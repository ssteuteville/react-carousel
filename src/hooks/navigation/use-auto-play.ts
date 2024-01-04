import { useEffect, useState } from "react";

export const useAutoPlay = ({
  left,
  right,
  enabled,
  isAtEnd,
  isAtStart,
  interval = 3000,
}: {
  left: () => void;
  right: () => void;
  enabled: boolean;
  isAtEnd: boolean;
  isAtStart: boolean;
  interval?: number;
}) => {
  const [autoPlayDirection, setAutoPlayDirection] = useState<
    "right" | "left" | undefined
  >(undefined);

  useEffect(() => {
    if (!enabled) {
      setAutoPlayDirection(undefined);
    } else if (isAtStart) {
      setAutoPlayDirection("right");
    } else if (isAtEnd) {
      setAutoPlayDirection("left");
    }
  }, [enabled, isAtEnd, isAtStart]);

  useEffect(() => {
    if (autoPlayDirection != null) {
      const handle = setInterval(() => {
        if (autoPlayDirection === "right") {
          right();
        }

        if (autoPlayDirection === "left") {
          left();
        }
      }, interval);

      return () => clearInterval(handle);
    }
    return () => {};
  }, [autoPlayDirection, isAtEnd, isAtStart, left, right, interval]);
};
