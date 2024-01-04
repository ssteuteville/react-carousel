import { useCallback, useState } from "react";
import { useWatchElements } from "./use-watch-elements";
import { useScrollToElement } from "./use-scroll-to-element";
import { useJumpToElement } from "./use-jump-to-element";
import { useAutoPlay } from "./use-auto-play";

export interface UseCarouselNavigationOptions {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const useCarouselNavigation = (
  containerElement: HTMLDivElement | null,
  { autoPlay, autoPlayInterval }: UseCarouselNavigationOptions = {},
) => {
  const { prevElement, nextElement } = useWatchElements(containerElement);
  const [canAutoplay, setCanAutoPlay] = useState(!!autoPlay);
  const isAtStart = prevElement === null;
  const isAtEnd = nextElement === null;

  const scrollToElement = useScrollToElement(containerElement);

  const scrollRight = useCallback(
    (automated: boolean = false) => {
      if (!automated) {
        setCanAutoPlay(false);
      }
      scrollToElement(nextElement);
    },
    [scrollToElement, nextElement],
  );

  const scrollLeft = useCallback(
    (automated: boolean = false) => {
      if (!automated) {
        setCanAutoPlay(false);
      }
      scrollToElement(prevElement);
    },
    [scrollToElement, prevElement],
  );

  const automatedRight = useCallback(() => {
    scrollRight(true);
  }, [scrollRight]);

  const automatedLeft = useCallback(() => {
    scrollLeft(true);
  }, [scrollLeft]);

  useAutoPlay({
    left: automatedLeft,
    right: automatedRight,
    isAtEnd,
    isAtStart,
    enabled: canAutoplay,
    interval: autoPlayInterval,
  });

  const jumpToElement = useJumpToElement(containerElement);

  return {
    isAtStart,
    isAtEnd,
    scrollRight,
    scrollLeft,
    jumpToElement,
  };
};
