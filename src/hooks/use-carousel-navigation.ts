import { useCallback, useEffect, useState } from "react";

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

const getChildren = (element: Element) => {
  return Array.from(element.children);
};

export const useCarouselNavigation = (
  containerElement: HTMLDivElement | null,
) => {
  const [prevElement, setPrevElement] = useState<Element | null>(null);
  const [nextElement, setNextElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!containerElement) {
      return;
    }

    const update = () => {
      const rect = containerElement.getBoundingClientRect();

      const visibleElements = getChildren(containerElement).filter((child) => {
        const childRect = child.getBoundingClientRect();

        return childRect.left >= rect.left && childRect.right <= rect.right;
      });

      if (visibleElements.length > 0) {
        setPrevElement(getPrevElement(visibleElements));
        setNextElement(getNextElement(visibleElements));
      }
    };

    update();

    containerElement.addEventListener("scroll", update, { passive: true });

    return () => {
      containerElement.removeEventListener("scroll", update);
    };
  }, [containerElement]);

  const scrollToElement = useCallback(
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

  const scrollRight = useCallback(
    () => scrollToElement(nextElement),
    [scrollToElement, nextElement],
  );

  const scrollLeft = useCallback(
    () => scrollToElement(prevElement),
    [scrollToElement, prevElement],
  );

  const jumpToElement = useCallback(
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
  return {
    isAtStart: prevElement === null,
    isAtEnd: nextElement === null,
    scrollRight,
    scrollLeft,
    jumpToElement,
  };
};
