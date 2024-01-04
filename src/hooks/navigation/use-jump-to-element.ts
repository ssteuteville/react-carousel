import { useCallback } from "react";
import { useScrollToElement } from "./use-scroll-to-element";
import { getChildren } from "./get-children";

export const useJumpToElement = (containerElement: HTMLDivElement | null) => {
  const scrollToElement = useScrollToElement(containerElement);
  return useCallback(
    (index: number) => {
      if (containerElement == null) {
        return;
      }
      const elements = getChildren(containerElement);
      const element = elements[index];
      if (!element) {
        return;
      }

      scrollToElement(element);
    },
    [containerElement, scrollToElement],
  );
};
