import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";

function getPrevElement(list: Array<Element>) {
  const sibling = list[0]?.previousElementSibling;

  if (sibling instanceof HTMLElement) {
    return sibling;
  }

  return sibling ?? null;
}

function getNextElement(list: Array<Element>) {
  const sibling = list[list.length - 1]?.nextElementSibling;

  if (sibling instanceof HTMLElement) {
    return sibling;
  }

  return null;
}

export const useCarouselNavigation = (ref: RefObject<HTMLDivElement>) => {
  const [prevElement, setPrevElement] = useState<Element | null>(null);
  const [nextElement, setNextElement] = useState<Element | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const update = () => {
      const rect = element.getBoundingClientRect();

      const visibleElements = Array.from(element.children).filter((child) => {
        const childRect = child.getBoundingClientRect();

        return childRect.left >= rect.left && childRect.right <= rect.right;
      });

      if (visibleElements.length > 0) {
        setPrevElement(getPrevElement(visibleElements));
        setNextElement(getNextElement(visibleElements));
      }
    };

    update();

    element.addEventListener("scroll", update, { passive: true });

    return () => {
      element.removeEventListener("scroll", update);
    };
  }, [ref]);

  const scrollToElement = useCallback(
    (element: Element | null) => {
      const currentNode = ref.current;

      if (!currentNode || !element || !(element instanceof HTMLElement)) return;

      const newScrollPosition =
        element.offsetLeft +
        element.getBoundingClientRect().width / 2 -
        currentNode.getBoundingClientRect().width / 2;

      currentNode.scroll({
        left: newScrollPosition,
        behavior: "smooth",
      });
    },
    [ref],
  );

  const scrollRight = useCallback(
    () => scrollToElement(nextElement),
    [scrollToElement, nextElement],
  );

  const scrollLeft = useCallback(
    () => scrollToElement(prevElement),
    [scrollToElement, prevElement],
  );

  return {
    isAtStart: prevElement === null,
    isAtEnd: nextElement === null,
    scrollRight,
    scrollLeft,
  };
};
