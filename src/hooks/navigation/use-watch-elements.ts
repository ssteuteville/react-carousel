import { useEffect, useState } from "react";
import { getChildren } from "./get-children";

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

export const useWatchElements = (containerElement: HTMLDivElement | null) => {
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

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // children added or removed
        if (mutation.type === "childList") {
          update();
        }
      }
    });

    mutationObserver.observe(containerElement, { childList: true });

    const resizeObserver = new ResizeObserver(update);

    resizeObserver.observe(containerElement);
    return () => {
      containerElement.removeEventListener("scroll", update);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [containerElement]);

  return {
    prevElement,
    nextElement,
  };
};
