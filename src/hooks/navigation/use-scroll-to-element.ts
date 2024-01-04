import { useCallback } from "react";

export const useScrollToElement = (containerElement: HTMLDivElement | null) => {
  return useCallback(
    (element: Element | null) => {
      if (!containerElement || !element || !(element instanceof HTMLElement))
        return;

      const newScrollPosition =
        element.offsetLeft +
        element.getBoundingClientRect().width / 2 -
        containerElement.getBoundingClientRect().width / 2;

      containerElement.scroll({
        left: newScrollPosition,
        behavior: "smooth",
      });
    },
    [containerElement],
  );
};
