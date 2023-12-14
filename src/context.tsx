import { createContext, useCallback, useContext, useState } from "react";
import { useCarouselNavigation } from "./hooks/use-carousel-navigation";
import type { FC, PropsWithChildren, RefCallback } from "react";

export interface CarouselApi {
  containerRef: RefCallback<HTMLDivElement>;
  containerElement: HTMLDivElement | null;
  navigation: {
    isAtStart: boolean;
    isAtEnd: boolean;
    scrollRight: () => void;
    scrollLeft: () => void;
    jumpToElement: (index: number) => void;
  };
}

const carouselContext = createContext<CarouselApi>({
  containerRef: () => {},
  containerElement: null,
  navigation: {
    isAtStart: false,
    isAtEnd: false,
    scrollLeft: () => {},
    scrollRight: () => {},
    jumpToElement: () => {},
  },
});

export const useCarousel = (): CarouselApi => {
  const [containerElement, setContainerElement] =
    useState<HTMLDivElement | null>(null);
  const containerRef = useCallback((element: HTMLDivElement | null) => {
    setContainerElement(element);
  }, []);
  const navigation = useCarouselNavigation(containerElement);

  return {
    containerElement,
    containerRef,
    navigation,
  };
};

export const useCarouselContext = () => useContext(carouselContext);

export const CarouselProvider: FC<PropsWithChildren<CarouselApi>> = ({
  children,
  ...api
}) => (
  <carouselContext.Provider value={api}>{children}</carouselContext.Provider>
);
